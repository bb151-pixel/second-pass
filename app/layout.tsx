import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { programs } from "@/lib/programs";
import "./globals.css";

export const metadata: Metadata = {
  title: `${site.brand} — LSAT, GMAT & Admissions Tutoring`,
  description: site.tagline,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav className="nav">
          <div className="wrap">
            <Link href="/" className="logo">{site.brand}</Link>
            <div className="nav-links">
              <Link href="/#subjects" className="hide-sm">Tutoring</Link>
              <Link href="/bootcamps" className="hide-sm">Bootcamps</Link>
              <Link href="/ai-coach">AI Coach</Link>
              <Link href="/book" className="btn btn-primary btn-sm">
                <span className="hide-sm">Book a session</span><span className="show-sm">Book</span>
              </Link>
            </div>
          </div>
        </nav>
        {children}
        <footer>
          <div className="wrap footer-grid">
            <div>
              <div className="logo">{site.brand}</div>
              <p className="muted" style={{ marginTop: 8 }}>{site.city}</p>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </div>
            <div>
              <div className="footer-head">Tutoring</div>
              {programs.map((p) => (
                <Link key={p.slug} href={`/tutoring/${p.slug}`}>{p.name}</Link>
              ))}
            </div>
            <div>
              <div className="footer-head">More</div>
              <Link href="/bootcamps">Bootcamps</Link>
              <Link href="/ai-coach">AI Practice Coach</Link>
              <Link href="/practice">Student practice login</Link>
              <Link href="/book">Book a session</Link>
            </div>
          </div>
          <div className="wrap" style={{ marginTop: 24 }}>
            <span>© {new Date().getFullYear()} {site.brand}</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
