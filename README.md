# Tutoring App: Launch Guide

Your own tutoring website with booking, payments and an AI Practice Coach.
Everything you'll normally edit is in **`lib/site.ts`** (brand name, prices, bio, links).

## Run it on your computer

1. Double-click **`Start Tutoring Site.bat`**. The site opens in your browser at http://localhost:3000.
2. Keep the black window open while you use the site. Close it to stop.
3. On the AI Practice page, enter an access code from `PRACTICE_ACCESS_CODES` in `.env.local` (default: `DEMO2026`).

Your API key lives in `.env.local`. On a new computer, copy `.env.example` to `.env.local` and paste your key in.

## Go live (about an hour, $0 to start)

| Step | Service | What to do |
|---|---|---|
| 1. Scheduling | cal.com (free) | Create an account and event types ("Free 15-min consult", "60-min session"). Put your username in `lib/site.ts` → `calUsername`. |
| 2. Payments | stripe.com | Create a Payment Link for each package. Paste each link into `lib/site.ts` → `paymentLink`. Stripe charges ~2.9% + 30¢ (vs. Wyzant's 25%). |
| 3. AI key | console.anthropic.com | Create an API key and add a small prepaid balance ($10–20). Set a monthly spend limit. |
| 4. Hosting | github.com + vercel.com (free) | Upload this folder to a GitHub repo, then "Import Project" in Vercel. In Vercel → Settings → Environment Variables, add `ANTHROPIC_API_KEY` and `PRACTICE_ACCESS_CODES`. |
| 5. Domain | Vercel or Namecheap (~$12/yr) | Buy a domain (e.g. yourbrandprep.com) and connect it in Vercel → Domains. |

## Giving students AI access

Add a code per student (or per cohort) to `PRACTICE_ACCESS_CODES` in Vercel, e.g. `SMITH-LSAT,JONES-LSAT,FALL26`.
To revoke access, remove the code and redeploy.

## Wyzant note

Wyzant's terms prohibit moving students you met through Wyzant off the platform.
Use this site for **new** clients from referrals, LinkedIn, pre-law advisors, school groups, Google and so on.

## Roadmap

- **Phase 1 (now):** Own site, direct booking and payments, AI coach as a premium perk.
- **Phase 2:** Student logins (e.g. Clerk) and automatic access after Stripe checkout, with progress saved per student.
- **Phase 3:** Add tutors in `lib/site.ts` → `tutors`, then per-tutor booking pages and a revenue split (Stripe Connect).
