# Tutoring App: Launch Guide

Your own tutoring website with booking, payments and an AI Practice Coach.
Everything you'll normally edit is in **`lib/site.ts`** (brand name, prices, bio, links).

## Run it on your computer

1. Double-click **`Start Tutoring Site.bat`**. The site opens in your browser at http://localhost:3000.
2. Keep the black window open while you use the site. Close it to stop.
3. On the AI Practice page, enter an access code from `PRACTICE_ACCESS_CODES` in `.env.local` (default: `DEMO2026`).

Your API key lives in `.env.local`. On a new computer, copy `.env.example` to `.env.local` and paste your key in.

## Where the site lives online

| Site | Address | What it is |
|---|---|---|
| Full app | Render (free plan). See the address in your Render dashboard | Everything, including the live AI coach. Configured by `render.yaml`. |
| Static page | https://bb151-pixel.github.io/second-pass/docs/ | `docs/index.html` on GitHub Pages. No AI coach. Mirrors `lib/site.ts`, so update both. |

**Updating the live sites:** commit your changes, then push to GitHub:

```
& "C:\Program Files\Git\cmd\git.exe" -C "<this folder>" push
```

Render and GitHub Pages both rebuild automatically from GitHub within a few minutes.
The Render free plan sleeps after ~15 minutes without visitors; the next visit takes about a minute to wake it.

## Still to set up

| Step | Service | What to do |
|---|---|---|
| Scheduling | cal.com (free) | Create an account and event types ("Free 15-min consult", "60-min session"). Put your username in `lib/site.ts` → `calUsername`. |
| Payments | stripe.com | Create a Payment Link for each package. Paste each link into `lib/site.ts` → `paymentLink`. Stripe charges ~2.9% + 30¢ (vs. Wyzant's 25%). |

## Giving students AI access

In Render, open the **second-pass** service → **Environment**, and edit `PRACTICE_ACCESS_CODES`.
Add a code per student, separated by commas, e.g. `TEST-G5KDU2,SMITH-LSAT,JONES-LSAT`.
To revoke access, remove the code and save. Render restarts the site automatically.
Don't use `DEMO2026` online: it appears in this public repository.

## Wyzant note

Wyzant's terms prohibit moving students you met through Wyzant off the platform.
Use this site for **new** clients from referrals, LinkedIn, pre-law advisors, school groups, Google and so on.

## Roadmap

- **Phase 1 (now):** Own site, direct booking and payments, AI coach as a premium perk.
- **Phase 2:** Student logins (e.g. Clerk) and automatic access after Stripe checkout, with progress saved per student.
- **Phase 3:** Add tutors in `lib/site.ts` → `tutors`, then per-tutor booking pages and a revenue split (Stripe Connect).
