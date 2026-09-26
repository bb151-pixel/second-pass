import Link from "next/link";
import { site, services, tutors, testimonials as allTestimonials } from "@/lib/site";
import { programs } from "@/lib/programs";
import PricingCard from "@/components/PricingCard";

export default function Home() {
  const testimonials = allTestimonials.filter((t) => t.quote.trim());
  return (
    <main>
      <section className="hero">
        <div className="wrap">
          <div className="eyebrow">LSAT · GMAT · Executive Assessment · Admissions · Business</div>
          <h1>{site.tagline}</h1>
          <p className="lead">{site.subhead}</p>
          <div className="cta">
            <Link href="/book" className="btn btn-primary">Book a free 15-min consult</Link>
            <Link href="/practice" className="btn btn-ghost">Try the AI Practice Coach</Link>
          </div>
          <div className="stats">
            {site.stats.map((s) => (
              <div key={s.small}><b>{s.big}</b><span>{s.small}</span></div>
            ))}
          </div>
        </div>
      </section>

      <section className="band" id="subjects">
        <div className="wrap">
          <div className="eyebrow">What I teach</div>
          <h2>Built for high-stakes tests and business school</h2>
          <div className="grid grid-4" style={{ marginTop: 28 }}>
            {programs.map((p) => (
              <Link href={`/tutoring/${p.slug}`} className="card card-link" key={p.slug}>
                <h3>{p.name}</h3>
                <p className="muted">{p.cardBlurb}</p>
                <span className="more">Learn more →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="eyebrow">How it works</div>
          <h2>A plan, a coach, and practice that never sleeps</h2>
          <div className="grid grid-3 steps" style={{ marginTop: 28 }}>
            <div className="card">
              <h3>Free consult</h3>
              <p className="muted" style={{ margin: 0 }}>We review your goals, timeline, and a diagnostic to find where your points are.</p>
            </div>
            <div className="card">
              <h3>1:1 sessions</h3>
              <p className="muted" style={{ margin: 0 }}>Weekly live sessions focused on the question types costing you the most.</p>
            </div>
            <div className="card">
              <h3>AI practice</h3>
              <p className="muted" style={{ margin: 0 }}>Drill with the AI coach between sessions. It explains the reasoning, not just the answer.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="band">
        <div className="wrap">
          <div className="eyebrow">Pricing</div>
          <h2>Simple packages, no platform fees</h2>
          <div className="grid grid-3" style={{ marginTop: 32 }}>
            {services.map((s) => <PricingCard s={s} key={s.id} />)}
          </div>
          <p className="muted" style={{ marginTop: 24 }}>
            Admissions packages and subject-specific plans are on each <a href="#subjects">subject page</a>.
          </p>
        </div>
      </section>

      <section>
        <div className="wrap split">
          <div>
            <div className="eyebrow">Small-group bootcamps</div>
            <h2>Learn alongside a few other students</h2>
            <p className="muted">
              Focused multi-week courses of up to 6 students, taught with the same out-loud method as 1:1
              sessions, for a fraction of the per-hour price.
            </p>
            <Link href="/bootcamps" className="btn btn-primary">See bootcamps</Link>
          </div>
          <div>
            <div className="eyebrow">AI Practice Coach</div>
            <h2>Practice any time, on your own</h2>
            <p className="muted">
              Original practice questions, feedback on your reasoning, and a summary to send your tutor before
              each session. Included with packages, or $29/month on its own.
            </p>
            <Link href="/ai-coach" className="btn btn-ghost">Learn about the AI Coach</Link>
          </div>
        </div>
      </section>

      <section id="about" className="band">
        <div className="wrap">
          <div className="eyebrow">Your tutor{tutors.length > 1 ? "s" : ""}</div>
          <div className="grid grid-3">
            {tutors.map((t) => (
              <div className="card" key={t.name} style={{ gridColumn: tutors.length === 1 ? "1 / -1" : undefined }}>
                <h2 style={{ marginBottom: 4 }}>{t.name}</h2>
                <p className="muted">{t.title}</p>
                <p>{t.bio}</p>
                <div>{t.subjects.map((s) => <span className="tag" key={s}>{s}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {testimonials.length > 0 && <section className="band">
        <div className="wrap">
          <div className="eyebrow">Students</div>
          <div className="grid grid-3">
            {testimonials.map((t, i) => (
              <div className="card" key={i}>
                <blockquote>“{t.quote}”</blockquote>
                <p className="muted" style={{ marginTop: 12, marginBottom: 0 }}>— {t.who}</p>
              </div>
            ))}
          </div>
        </div>
      </section>}

      <section>
        <div className="wrap" style={{ textAlign: "center" }}>
          <h2>Ready to find your points?</h2>
          <p className="muted">Book a free consult. We'll build your plan together.</p>
          <Link href="/book" className="btn btn-primary">Book a free consult</Link>
        </div>
      </section>
    </main>
  );
}
