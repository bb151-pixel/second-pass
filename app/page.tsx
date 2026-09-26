import Link from "next/link";
import { site, services, subjects, tutors, testimonials } from "@/lib/site";

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="wrap">
          <div className="eyebrow">LSAT · GMAT · GRE · Business & Finance</div>
          <h1>{site.tagline}</h1>
          <p className="lead">{site.subhead}</p>
          <div className="cta">
            <Link href="/book" className="btn btn-primary">Book a free 15-min consult</Link>
            <Link href="/practice" className="btn btn-ghost">Try the AI Practice Coach</Link>
          </div>
          <div className="stats">
            <div><b>1:1</b><span>Personalized coaching</span></div>
            <div><b>24/7</b><span>AI practice between sessions</span></div>
            <div><b>Online</b><span>{site.city}</span></div>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <div className="eyebrow">What I teach</div>
          <h2>Built for high-stakes tests and business school</h2>
          <div className="grid grid-3" style={{ marginTop: 28 }}>
            {subjects.map((s) => (
              <div className="card" key={s.name}>
                <h3>{s.name}</h3>
                <p className="muted" style={{ margin: 0 }}>{s.detail}</p>
              </div>
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
            {services.map((s) => (
              <div className={`card${s.featured ? " featured" : ""}`} key={s.id}>
                <h3>{s.name}</h3>
                <div className="price">{s.price}</div>
                <div className="unit">{s.unit}</div>
                <p className="muted">{s.blurb}</p>
                <ul>{s.features.map((f) => <li key={f}>{f}</li>)}</ul>
                {s.paymentLink ? (
                  <a href={s.paymentLink} className={`btn ${s.featured ? "btn-primary" : "btn-ghost"}`}>Buy now</a>
                ) : (
                  <Link href="/book" className={`btn ${s.featured ? "btn-primary" : "btn-ghost"}`}>Get started</Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about">
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

      <footer>
        <div className="wrap">
          <span>© {new Date().getFullYear()} {site.brand}</span>
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </div>
      </footer>
    </main>
  );
}
