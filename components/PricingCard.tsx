import Link from "next/link";
import type { Service } from "@/lib/site";

// One package card. Links to Stripe when a payment link is set,
// otherwise to the booking page.
export default function PricingCard({ s }: { s: Service }) {
  const style = s.featured ? "btn-primary" : "btn-ghost";
  return (
    <div className={`card${s.featured ? " featured" : ""}`}>
      <h3>{s.name}</h3>
      <div className="price">{s.price}</div>
      <div className="unit">{s.unit}</div>
      <p className="muted">{s.blurb}</p>
      <ul>{s.features.map((f) => <li key={f}>{f}</li>)}</ul>
      {s.paymentLink ? (
        <a href={s.paymentLink} className={`btn ${style}`}>Buy now</a>
      ) : (
        <Link href="/book" className={`btn ${style}`}>Get started</Link>
      )}
    </div>
  );
}
