import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { bootcamps, type Bootcamp } from "@/lib/programs";

export const metadata: Metadata = {
  title: "Small-Group LSAT & GMAT Bootcamps | Second Pass",
  description:
    "Multi-week small-group LSAT and GMAT bootcamps of up to 6 students, taught with the Second Pass out-loud method.",
};

// Until enrollment opens, the button opens a pre-filled email to join the waitlist.
function waitlistLink(b: Bootcamp) {
  const subject = encodeURIComponent(`Waitlist: ${b.name}`);
  const body = encodeURIComponent(
    `Hi Brittany,\n\nPlease add me to the waitlist for the ${b.name}.\n\nName:\nTest date (if known):\nDays and times that work for me:\n`,
  );
  return `mailto:${site.email}?subject=${subject}&body=${body}`;
}

export default function Bootcamps() {
  return (
    <main>
      <section className="hero">
        <div className="wrap">
          <div className="eyebrow">Small-group bootcamps</div>
          <h1>Small groups. Everyone talks.</h1>
          <p className="lead">
            Multi-week courses of up to 6 students. You'll explain your reasoning out loud, hear how other
            students think, and get the same direct feedback as a 1:1 session, for a fraction of the per-hour price.
          </p>
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <div className="grid grid-3">
            {bootcamps.map((b) => (
              <div className="card camp" id={b.id} key={b.id}>
                <span className="tag">{b.test}</span>
                <h3>{b.name}</h3>
                <div className="price">{b.price}</div>
                <div className="unit">{b.format} · {b.seats}</div>
                <p className="muted">{b.blurb}</p>
                <ul>{b.includes.map((x) => <li key={x}>{x}</li>)}</ul>
                <p className="schedule">
                  {b.schedule || "Dates are set once enough students join. The waitlist is free and there's no commitment."}
                </p>
                {b.enrollLink ? (
                  <a href={b.enrollLink} className="btn btn-primary">Enroll</a>
                ) : (
                  <a href={waitlistLink(b)} className="btn btn-primary">Join the waitlist</a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap" style={{ textAlign: "center" }}>
          <h2>Want 1:1 instead?</h2>
          <p className="muted">Private sessions move at your pace and focus only on your weak spots.</p>
          <Link href="/#subjects" className="btn btn-ghost">See 1:1 tutoring</Link>
        </div>
      </section>
    </main>
  );
}
