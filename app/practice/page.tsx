"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { site } from "@/lib/site";

// "summary" messages are the pre-session reports; they're shown in the chat
// but never sent back to the coach as conversation.
type Msg = { role: "user" | "assistant" | "summary"; content: string };

const MODES = [
  { id: "lsat-lr", label: "LSAT · Logical Reasoning" },
  { id: "lsat-rc", label: "LSAT · Reading Comp" },
  { id: "gmat", label: "GMAT / GRE" },
  { id: "finance", label: "Business & Finance" },
];

// Starter suggestions shown before the first message, per subject.
const QUICK: Record<string, string[]> = {
  "lsat-lr": [
    "Give me a medium Flaw question",
    "Give me a hard Necessary Assumption question",
    "Give me a Strengthen question",
    "Quiz me on finding the conclusion",
    "Help me review a question I missed",
    "How do I predict before reading the choices?",
  ],
  "lsat-rc": [
    "Give me a short RC passage with 3 questions",
    "Give me a comparative passage set",
    "Help me find the author's position",
    "Quiz me on main point questions",
    "How should I read a science passage?",
    "Help me review an RC question I missed",
  ],
  gmat: [
    "Give me a GMAT data sufficiency question",
    "Give me a GRE quantitative comparison question",
    "Give me a critical reasoning question",
    "Quiz me on percentages and ratios",
    "How do I approach boldface questions?",
    "Help me review a question I missed",
  ],
  finance: [
    "Quiz me on NPV and IRR",
    "Give me a WACC practice problem",
    "Walk me through a simple DCF",
    "How do the 3 financial statements link?",
    "Quiz me on journal entries",
    "Help me with a homework concept",
  ],
};

// The coach ends each reply with "[[suggest]] a | b | c" (see
// lib/coach-playbook.ts). Split that off so it becomes buttons, and hide a
// half-streamed marker so it never flashes on screen.
const MARKER = "[[suggest]]";
function splitReply(text: string): { body: string; suggestions: string[] } {
  const i = text.indexOf(MARKER);
  if (i >= 0) {
    const suggestions = text
      .slice(i + MARKER.length)
      .split("|")
      .map((s) => s.trim())
      .filter((s) => s && s.length <= 80)
      .slice(0, 3);
    return { body: text.slice(0, i).trimEnd(), suggestions };
  }
  for (let k = MARKER.length - 1; k > 0; k--) {
    if (text.endsWith(MARKER.slice(0, k))) return { body: text.slice(0, -k), suggestions: [] };
  }
  return { body: text, suggestions: [] };
}

function getStored(key: string) {
  try { return localStorage.getItem(key); } catch { return null; }
}
function setStored(key: string, val: string) {
  try { localStorage.setItem(key, val); } catch { /* storage unavailable */ }
}

export default function Practice() {
  const [code, setCode] = useState<string | null>(null);
  const [codeInput, setCodeInput] = useState("");
  const [gateError, setGateError] = useState("");
  const [mode, setMode] = useState("lsat-lr");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState<number | null>(null);
  const [followUps, setFollowUps] = useState<string[]>([]);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setCode(getStored("practiceCode")); }, []);
  useEffect(() => { logRef.current?.scrollTo(0, logRef.current.scrollHeight); }, [messages, followUps]);

  async function unlock(e: React.FormEvent) {
    e.preventDefault();
    setGateError("");
    const res = await fetch("/api/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: codeInput }),
    });
    if (res.ok) {
      setStored("practiceCode", codeInput.trim());
      setCode(codeInput.trim());
    } else {
      setGateError("That code didn't work. Check with your tutor.");
    }
  }

  const practice = messages.filter((m) => m.role !== "summary");
  const canSummarize = practice.some((m) => m.role === "assistant" && m.content);

  // Streams a reply from the coach into a new message of the given role.
  async function stream(base: Msg[], role: "assistant" | "summary", task?: "summary") {
    if (!code) return;
    setMessages([...base, { role, content: "" }]);
    if (role === "assistant") setFollowUps([]);
    setBusy(true);
    try {
      const res = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-access-code": code },
        body: JSON.stringify({ messages: base.filter((m) => m.role !== "summary"), mode, task }),
      });
      if (res.status === 401) {
        setStored("practiceCode", "");
        setCode(null);
        return;
      }
      if (!res.ok || !res.body) throw new Error(await res.text());

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        const content = role === "assistant" ? splitReply(acc).body : acc;
        setMessages([...base, { role, content }]);
      }
      if (role === "assistant") setFollowUps(splitReply(acc).suggestions);
    } catch {
      setMessages([...base, { role, content: "Something went wrong. Please try again." }]);
    } finally {
      setBusy(false);
    }
  }

  function send(text: string) {
    const content = text.trim();
    if (!content || busy) return;
    setInput("");
    stream([...messages, { role: "user", content }], "assistant");
  }

  // Suggestions on screen right now: starters before the first message,
  // then the coach's follow-ups.
  const suggestions = messages.length === 0 ? QUICK[mode] : followUps;

  // A suggestion ending in ":" is a sentence starter for the student to
  // finish, so it goes into the text box instead of being sent.
  const isStarter = (q: string) => q.endsWith(":");
  const textRef = useRef<HTMLTextAreaElement>(null);
  function pickSuggestion(q: string) {
    if (isStarter(q)) {
      setInput(q + " ");
      textRef.current?.focus();
    } else {
      send(q);
    }
  }

  // Tab in an empty box fills in the first suggestion; Tab again cycles.
  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
      return;
    }
    if (e.key === "Tab" && !e.shiftKey && suggestions.length > 0) {
      const at = suggestions.findIndex((q) => q === input.trimEnd());
      if (input === "" || at >= 0) {
        e.preventDefault();
        const q = suggestions[(at + 1) % suggestions.length];
        setInput(isStarter(q) ? q + " " : q);
      }
    }
  }

  function newSession() {
    setMessages([]);
    setFollowUps([]);
  }

  function summarize() {
    if (busy || !canSummarize) return;
    stream(messages, "summary", "summary");
  }

  async function copy(text: string, i: number) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(i);
      setTimeout(() => setCopied(null), 2000);
    } catch { /* clipboard unavailable */ }
  }

  function emailLink(text: string) {
    const subject = encodeURIComponent("Practice summary before our next session");
    return `mailto:${site.email}?subject=${subject}&body=${encodeURIComponent(text)}`;
  }

  if (!code) {
    return (
      <main className="gate">
        <div className="eyebrow">AI Practice Coach</div>
        <h1 style={{ fontSize: "2rem" }}>Enter your access code</h1>
        <p className="muted">Your code comes with any tutoring package or the monthly AI Coach plan.</p>
        <form onSubmit={unlock}>
          <input value={codeInput} onChange={(e) => setCodeInput(e.target.value)} placeholder="ACCESS CODE" autoFocus />
          {gateError && <p className="error">{gateError}</p>}
          <button className="btn btn-primary" style={{ width: "100%" }} disabled={!codeInput.trim()}>Unlock</button>
        </form>
        <p className="muted" style={{ marginTop: 24 }}>No code? <Link href="/#pricing">See plans</Link></p>
      </main>
    );
  }

  return (
    <main className="chat-shell">
      <div className="chat-top">
        <select value={mode} onChange={(e) => setMode(e.target.value)} aria-label="Subject">
          {MODES.map((m) => <option key={m.id} value={m.id}>{m.label}</option>)}
        </select>
        <div className="chat-actions">
          <button className="btn btn-ghost btn-sm" onClick={summarize} disabled={busy || !canSummarize}
            title="A short report on what you practiced, to send Brittany before your session">
            Summary for Brittany
          </button>
          <button className="btn btn-ghost btn-sm" onClick={newSession} disabled={busy}>New session</button>
        </div>
      </div>

      <div className="chat-log" ref={logRef}>
        {messages.length === 0 && (
          <div className="msg system">
            <p><b>Hi! I'm your practice coach.</b> Ask for a practice question, paste one you're stuck on, or ask about a concept.</p>
            <div className="quick" style={{ justifyContent: "center" }}>
              {QUICK[mode].map((q) => <button key={q} className="chip" onClick={() => send(q)}>{q}</button>)}
            </div>
          </div>
        )}
        {messages.map((m, i) => {
          const streaming = busy && i === messages.length - 1;
          if (m.role === "summary") {
            return (
              <div key={i} className="msg summary">
                <div className="summary-title">Summary for Brittany</div>
                {m.content || (streaming ? "Writing your summary…" : "")}
                {m.content && !streaming && (
                  <div className="summary-actions">
                    <button className="btn btn-ghost btn-sm" onClick={() => copy(m.content, i)}>
                      {copied === i ? "Copied!" : "Copy"}
                    </button>
                    <a className="btn btn-primary btn-sm" href={emailLink(m.content)}>Email to Brittany</a>
                  </div>
                )}
              </div>
            );
          }
          return (
            <div key={i} className={`msg ${m.role}`}>
              {m.content || (streaming ? "Thinking…" : "")}
            </div>
          );
        })}
        {messages.length > 0 && !busy && followUps.length > 0 && (
          <div className="quick follow-ups" aria-label="Suggested replies">
            {followUps.map((q) => (
              <button key={q} className={`chip${isStarter(q) ? " chip-starter" : ""}`} onClick={() => pickSuggestion(q)}
                title={isStarter(q) ? "Adds this to your message so you can finish it" : undefined}>
                {q}{isStarter(q) ? " …" : ""}
              </button>
            ))}
          </div>
        )}
      </div>

      <form className="chat-input" onSubmit={(e) => { e.preventDefault(); send(input); }}>
        <textarea
          ref={textRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={
            suggestions.length > 0 && !busy
              ? `Type your answer, or press Tab for "${suggestions[0]}"`
              : "Type your answer or question…  (Shift+Enter for a new line)"
          }
          rows={2}
        />
        <button className="btn btn-primary" disabled={busy || !input.trim()}>Send</button>
      </form>
    </main>
  );
}
