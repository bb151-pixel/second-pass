import Link from "next/link";
import { site, services } from "@/lib/site";

export const metadata = { title: `Book a session — ${site.brand}` };

export default function Book() {
  const paid = services.filter((s) => s.paymentLink);
  return (
    <main>
      <section style={{ paddingTop: 48 }}>
        <div className="wrap">
          <div className="eyebrow">Book</div>
          <h1>Pick a time that works</h1>
          <p className="muted">Start with a free 15-minute consult, or book a paid session directly.</p>

          {site.calUsername ? (
            <iframe
              className="cal-frame"
              src={`https://cal.com/${site.calUsername}?embed=true&theme=light`}
              title="Booking calendar"
            />
          ) : (
            <div className="notice">
              <b>Calendar not connected yet.</b> Create a free account at cal.com, then put your
              username in <code>lib/site.ts</code> → <code>calUsername</code>. Until then, email{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a> to book.
            </div>
          )}

          {paid.length > 0 && (
            <div style={{ marginTop: 40 }}>
              <h2>Prefer to pay up front?</h2>
              <div className="grid grid-3">
                {paid.map((s) => (
                  <a key={s.id} href={s.paymentLink} className="card" style={{ textDecoration: "none" }}>
                    <h3>{s.name}</h3>
                    <div className="price">{s.price}</div>
                    <div className="unit">{s.unit}</div>
                  </a>
                ))}
              </div>
            </div>
          )}
          <p style={{ marginTop: 32 }}><Link href="/#pricing">← See all packages</Link></p>
        </div>
      </section>
    </main>
  );
}
