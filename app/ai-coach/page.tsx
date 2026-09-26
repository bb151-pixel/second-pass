import type { Metadata } from "next";
import Link from "next/link";
import { site, services } from "@/lib/site";
import { COACH_MODES } from "@/lib/coach-modes";

export const metadata: Metadata = {
  title: "AI Practice Coach for the LSAT, GMAT & Admissions | Second Pass",
  description:
    "An AI practice coach that teaches the Second Pass way: original practice questions, feedback on your reasoning, and summaries for your tutor. $29/month.",
};

export default function AiCoach() {
  const plan = services.find((s) => s.id === "coach");
  const signUp =
    plan?.paymentLink ||
    `mailto:${site.email}?subject=${encodeURIComponent("AI Practice Coach subscription")}&body=${encodeURIComponent(
      "Hi Brittany,\n\nI'd like to sign up for the AI Practice Coach.\n\nName:\nWhat I'm studying for:\n",
    )}`;

  return (
    <main>
      <section className="hero">
        <div className="wrap">
          <div className="eyebrow">AI Practice Coach</div>
          <h1>A practice partner that makes you think.</h1>
          <p className="lead">
            It asks for your reasoning before it confirms anything, points to exactly where your logic broke, and
            has you explain the fix back, the same way sessions work at {site.brand}.
          </p>
          <div className="cta">
            <a href={signUp} className="btn btn-primary">Get access · {plan?.price ?? "$29"}/month</a>
            <Link href="/practice" className="btn btn-ghost">I have an access code</Link>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <h2>How it works</h2>
          <div className="grid grid-3 steps" style={{ marginTop: 28 }}>
            <div className="card">
              <h3>Practice</h3>
              <p className="muted">Ask for an original practice question, paste one you missed, or ask about a concept. Suggested replies keep you moving.</p>
            </div>
            <div className="card">
              <h3>Explain it back</h3>
              <p className="muted">You walk through your process. The coach asks the question that shows you where your reasoning broke, and doesn't just hand you the answer.</p>
            </div>
            <div className="card">
              <h3>Send a summary</h3>
              <p className="muted">One click turns your practice into a short report for your tutor, so your next session starts where you need it.</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap split split-top">
          <div>
            <h2>Subjects</h2>
            <ul className="facts">{COACH_MODES.map((m) => <li key={m.id}>{m.label}</li>)}</ul>
          </div>
          <div>
            <h2>Good to know</h2>
            <ul className="facts">
              <li>Included with every tutoring package, or {plan?.price ?? "$29"}/month on its own.</li>
              <li>Practice questions are original, written in the style of the real exam, not copied from official tests.</li>
              <li>For essays and resumes, it gives feedback only and never writes for you.</li>
              <li>Your practice chats aren't saved on this site. Starting a new session clears them.</li>
              <li>It's a practice tool, not a replacement for a tutor, and it won't promise scores or admissions results.</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
