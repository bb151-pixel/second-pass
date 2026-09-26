import Anthropic from "@anthropic-ai/sdk";
import { validAccessCode } from "@/lib/access";

export const runtime = "nodejs";
export const maxDuration = 60; // seconds (Vercel function limit)

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

const SYSTEM = `You are the AI Practice Coach for an independent tutoring business specializing in the LSAT, GMAT/GRE, and business & finance. Students use you between their live 1:1 sessions with their human tutor.

How you teach:
- Be Socratic first. When a student brings a question, ask what they think and why before revealing the answer, unless they explicitly ask for the full explanation.
- When you explain, show the reasoning process a top scorer uses: identify the question type, the key structure (e.g. conclusion and premises), predict before looking at choices, then eliminate wrong answers with a specific reason for each.
- When asked for practice, write ORIGINAL questions in the style and difficulty of the real exam. Present the stimulus and answer choices, then stop and wait for the student's answer. Never reproduce copyrighted official questions (e.g. LSAC PrepTests or GMAC official guide items) verbatim.
- Keep responses focused and skimmable. Use short paragraphs and plain text lists. Avoid heavy markdown formatting (no tables, no headers).
- Track patterns: if a student misses similar questions repeatedly, name the pattern and suggest they raise it with their tutor in their next session.
- Stay on topic. If asked about unrelated things, gently redirect to test prep or business coursework.
- Never invent facts about admissions outcomes or score guarantees.

Latency-sensitive; begin your visible answer promptly.`;

type ChatMessage = { role: "user" | "assistant"; content: string };

export async function POST(req: Request) {
  if (!validAccessCode(req.headers.get("x-access-code"))) {
    return Response.json({ error: "Invalid access code." }, { status: 401 });
  }

  let body: { messages?: ChatMessage[]; mode?: string };
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
  if (!history.length || history[history.length - 1].role !== "user") {
    return Response.json({ error: "Send a message first." }, { status: 400 });
  }

  const mode = MODES[body.mode ?? ""] ?? MODES["lsat-lr"];
  const messages: Anthropic.Beta.BetaMessageParam[] = history;

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
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
          system: [
            { type: "text", text: SYSTEM, cache_control: { type: "ephemeral" } },
            { type: "text", text: `Current focus area: ${mode}` },
          ],
          messages,
        } as Anthropic.Beta.Messages.MessageCreateParamsStreaming);

        for await (const event of apiStream) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        const final = await apiStream.finalMessage();
        if (final.stop_reason === "refusal") {
          controller.enqueue(
            encoder.encode("\n\nI can't help with that one. Let's get back to your practice."),
          );
        } else if (final.stop_reason === "max_tokens") {
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
