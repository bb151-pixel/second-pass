import Anthropic from "@anthropic-ai/sdk";
import { validAccessCode } from "@/lib/access";
import { COACH_PLAYBOOK, SUGGESTIONS_GUIDE, SUMMARY_INSTRUCTIONS } from "@/lib/coach-playbook";

export const runtime = "nodejs";
export const maxDuration = 60; // seconds (hosting function limit)

// Swap to "claude-sonnet-5" to cut AI costs ~60% if volume grows.
const MODEL = "claude-opus-5";
const MAX_TURNS = 30;
const MAX_CHARS = 8000;

const client = new Anthropic();

const MODES: Record<string, string> = {
  "lsat-lr":
    "LSAT Logical Reasoning: argument structure, assumptions, strengthen/weaken, flaw, inference, parallel reasoning, principle questions.",
  "lsat-rc":
    "LSAT Reading Comprehension: main point, author's attitude, passage structure, inference and comparative passages.",
  gmat: "GMAT / GRE: quantitative reasoning, data insights, critical reasoning, and verbal.",
  finance:
    "Business & finance coursework: corporate finance, time value of money, valuation (DCF, multiples), financial accounting, financial statement analysis, and Excel modeling.",
};

type ChatMessage = { role: "user" | "assistant"; content: string };

export async function POST(req: Request) {
  const accessCode = req.headers.get("x-access-code");
  if (!validAccessCode(accessCode)) {
    return Response.json({ error: "Invalid access code." }, { status: 401 });
  }

  let body: { messages?: ChatMessage[]; mode?: string; task?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Bad request." }, { status: 400 });
  }

  const history = (body.messages ?? [])
    .filter(
      (m) =>
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0,
    )
    .slice(-MAX_TURNS)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }));

  // The API requires the conversation to start with a user turn.
  while (history.length && history[0].role !== "user") history.shift();

  const mode = MODES[body.mode ?? ""] ?? MODES["lsat-lr"];
  const isSummary = body.task === "summary";

  let system: Anthropic.Beta.BetaTextBlockParam[];
  let messages: Anthropic.Beta.BetaMessageParam[];

  if (isSummary) {
    // Turn the practice conversation into a pre-session report for Brittany.
    if (!history.some((m) => m.role === "assistant")) {
      return Response.json({ error: "Practice a little first." }, { status: 400 });
    }
    const transcript = history
      .map((m) => `${m.role === "user" ? "Student" : "Coach"}: ${m.content}`)
      .join("\n\n");
    system = [{ type: "text", text: SUMMARY_INSTRUCTIONS }];
    messages = [
      {
        role: "user",
        content: `Student access code: ${accessCode!.trim().toUpperCase()}\nFocus area: ${mode}\n\nTranscript:\n\n${transcript}`,
      },
    ];
  } else {
    if (!history.length || history[history.length - 1].role !== "user") {
      return Response.json({ error: "Send a message first." }, { status: 400 });
    }
    system = [
      { type: "text", text: COACH_PLAYBOOK },
      { type: "text", text: SUGGESTIONS_GUIDE, cache_control: { type: "ephemeral" } },
      { type: "text", text: `Current focus area: ${mode}` },
    ];
    messages = history;
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        let sentText = false;
        let final: Anthropic.Beta.BetaMessage | undefined;
        // Rarely a reply comes back with no visible text; retry once so the
        // student never sees a blank message.
        for (let attempt = 0; attempt < 2 && !sentText; attempt++) {
          const apiStream = client.beta.messages.stream({
            model: MODEL,
            max_tokens: 16000,
            betas: ["server-side-fallback-2026-07-01"],
            // If a request is ever declined by safety classifiers, the API
            // retries it on Anthropic's recommended fallback model.
            fallbacks: "default",
            // "medium" starts answering in ~1-2s. The default ("high") spent
            // 10-18s reasoning silently before the first word appeared.
            output_config: { effort: "medium" },
            system,
            messages,
          } as Anthropic.Beta.Messages.MessageCreateParamsStreaming);

          for await (const event of apiStream) {
            if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
              sentText = true;
              controller.enqueue(encoder.encode(event.delta.text));
            }
          }
          final = await apiStream.finalMessage();
          if (final.stop_reason === "refusal") break;
        }
        if (!sentText && final?.stop_reason !== "refusal") {
          controller.enqueue(encoder.encode("Sorry, I lost my train of thought. Could you send that again?"));
        } else if (final?.stop_reason === "refusal") {
          controller.enqueue(
            encoder.encode("\n\nI can't help with that one. Let's get back to your practice."),
          );
        } else if (final?.stop_reason === "max_tokens") {
          controller.enqueue(encoder.encode("\n\n(Response cut short. Ask me to continue.)"));
        }
      } catch (err) {
        console.error("AI coach error:", err);
        const msg =
          err instanceof Anthropic.RateLimitError
            ? "The coach is busy right now. Please try again in a minute."
            : "Something went wrong reaching the coach. Please try again.";
        controller.enqueue(encoder.encode(`\n\n${msg}`));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
  });
}
