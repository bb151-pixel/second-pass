import type { Metadata } from "next";
import { site } from "@/lib/site";
import { tutorOpenings } from "@/lib/programs";

export const metadata: Metadata = {
  title: "Teach with Second Pass | Tutor Jobs: LSAT, MCAT, CPA & Bar",
  description:
    "Second Pass is hiring tutors for the LSAT, MCAT, CPA Exam, and bar exam. Teach online with our method, our students, and our AI practice coach.",
};

// The Apply button opens a pre-filled email; applicants attach their resume.
const applyLink = (subject?: string) =>
  `mailto:${site.email}?subject=${encodeURIComponent(`Tutor application${subject ? `: ${subject}` : ""}`)}&body=${encodeURIComponent(
    "Hi Brittany,\n\nI'd like to apply to tutor with Second Pass.\n\nName:\nSubject(s):\nScores or credentials:\nTutoring or teaching experience:\nWeekly availability:\n\nMy resume is attached.\n",
  )}`;

export default function Teach() {
  return (
    <main>
      <section className="hero">
        <div className="wrap">
          <div className="eyebrow">Teach with {site.brand}</div>
          <h1>Great scorers aren't always great teachers. We want both.</h1>
          <p className="lead">
            {site.brand} is growing, and we're looking for tutors who can do more than know the material: tutors
            who can get a student to explain it back.
          </p>
          <div className="cta">
            <a href={applyLink()} className="btn btn-primary">Apply by email</a>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <h2>Open roles</h2>
          <div className="grid grid-4" style={{ marginTop: 28 }}>
            {tutorOpenings.map((o) => (
              <div className="card camp" key={o.subject}>
                <h3>{o.subject} tutor</h3>
                <ul>{o.lookingFor.map((x) => <li key={x}>{x}</li>)}</ul>
                <a href={applyLink(o.subject)} className="btn btn-ghost btn-sm">Apply</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap split split-top">
          <div>
            <h2>How we teach</h2>
            <ul className="facts">
              <li>Students do the talking. They walk through their reasoning out loud, and explain every answer back.</li>
              <li>We lead, we don't tell. When a student is wrong, we ask the question that shows them where their reasoning broke.</li>
              <li>Warm and patient, but direct. We say plainly when something is wrong and exactly why.</li>
            </ul>
          </div>
          <div>
            <h2>What you get</h2>
            <ul className="facts">
              <li>Students: we handle marketing, booking, and payments, so you can focus on teaching.</li>
              <li>An AI practice coach for your students between sessions, set up to teach our method.</li>
              <li>A pre-session summary of what each student practiced and where they struggled.</li>
              <li>A flexible schedule, taught online.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap narrow">
          <h2>How to apply</h2>
          <ol className="facts">
            <li>Email us with your subject, scores or credentials, experience, and availability, and attach your resume.</li>
            <li>If it's a fit, we'll set up a short call.</li>
            <li>You'll teach a 20-minute sample lesson using our method.</li>
          </ol>
          <p style={{ marginTop: 20 }}>
            <a href={applyLink()} className="btn btn-primary">Apply by email</a>
          </p>
        </div>
      </section>
    </main>
  );
}
