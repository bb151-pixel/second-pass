import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { programs, programBySlug, bootcampById } from "@/lib/programs";
import PricingCard from "@/components/PricingCard";

type Props = { params: Promise<{ slug: string }> };

// One page per subject, built from lib/programs.ts at build time.
export const dynamicParams = false;
export function generateStaticParams() {
  return programs.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = programBySlug((await params).slug);
  return p ? { title: p.metaTitle, description: p.metaDescription } : {};
}

export default async function ProgramPage({ params }: Props) {
  const p = programBySlug((await params).slug);
  if (!p) notFound();
  const camps = (p.bootcamps ?? []).map(bootcampById).filter((b) => b !== undefined);

  return (
    <main>
      <section className="hero">
        <div className="wrap">
          <div className="eyebrow">{p.eyebrow}</div>
          <h1>{p.headline}</h1>
          <p className="lead">{p.intro}</p>
          <div className="cta">
            <Link href="/book" className="btn btn-primary">Book a free 15-min consult</Link>
            <Link href={`/practice?mode=${p.coachMode}`} className="btn btn-ghost">Practice with the AI Coach</Link>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap split split-top">
          <div>
            <h2>{p.aboutTitle}</h2>
            <ul className="facts">{p.about.map((a) => <li key={a}>{a}</li>)}</ul>
          </div>
          <div>
            <h2>What we'll work on</h2>
            <ul className="facts">{p.helpWith.map((h) => <li key={h}>{h}</li>)}</ul>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap narrow">
          <div className="eyebrow">How I teach it</div>
          <p className="approach">{p.approach}</p>
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <div className="eyebrow">Pricing</div>
          <h2>{p.name} packages</h2>
          <div className="grid grid-3" style={{ marginTop: 32 }}>
            {p.packages.map((s) => <PricingCard s={s} key={s.id} />)}
          </div>
          {camps.length > 0 && (
            <div className="camp-strip">
              <b>Prefer a small group?</b>{" "}
              {camps.map((c, i) => (
                <span key={c.id}>
                  {i > 0 && " · "}
                  <Link href={`/bootcamps#${c.id}`}>{c.name}</Link> ({c.price})
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      <section>
        <div className="wrap" style={{ textAlign: "center" }}>
          <h2>Not sure where to start?</h2>
          <p className="muted">Book a free 15-minute consult and we'll figure out the right plan.</p>
          <Link href="/book" className="btn btn-primary">Book a free consult</Link>
        </div>
      </section>
    </main>
  );
}
