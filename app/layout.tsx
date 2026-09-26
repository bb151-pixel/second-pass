import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  title: `${site.brand} — LSAT & Business Tutoring`,
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
              <Link href="/#pricing" className="hide-sm">Pricing</Link>
              <Link href="/#about" className="hide-sm">About</Link>
              <Link href="/practice">AI Practice</Link>
              <Link href="/book" className="btn btn-primary btn-sm">Book a session</Link>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
