# Tutoring App: Launch Guide

Your own tutoring website with booking, payments and an AI Practice Coach.
Files you'll normally edit (plain text between quotes; no coding needed):

- **`lib/site.ts`**: brand, headline, contact email, home-page packages, bio, reviews
- **`lib/programs.ts`**: each subject page (LSAT, GMAT, Executive Assessment, Admissions, Business), its packages and prices, and the bootcamps
- **`lib/coach-playbook.ts`**: how the AI coach teaches, per-subject notes, suggestions, and the tutor summary
- **`lib/coach-modes.ts`**: the AI coach's subject list and starter suggestions

## Run it on your computer

1. Double-click **`Start Tutoring Site.bat`**. The site opens in your browser at http://localhost:3000.
2. Keep the black window open while you use the site. Close it to stop.
3. On the AI Practice page, enter one of your access codes from the `PRACTICE_ACCESS_CODES` line in `.env.local`.

Your API key lives in `.env.local`. On a new computer, copy `.env.example` to `.env.local` and paste your key in.

## Where the site lives online

| Site | Address | What it is |
|---|---|---|
| Full app | https://secondpassprep.netlify.app | Everything, including the live AI coach. Netlify free plan, configured by `netlify.toml`. |
| Old GitHub Pages address | https://bb151-pixel.github.io/second-pass/docs/ | `docs/index.html` now just forwards visitors to the Netlify site. Nothing to keep in sync. |

**Updating the live sites:** commit your changes, then:

- **Netlify (full app):** from this folder, run `npx.cmd netlify-cli deploy --build --prod`.
  The Netlify site isn't connected to GitHub, so pushing alone doesn't update it.
- **Code backup (and the GitHub Pages forwarding page):** push to GitHub:

```
& "C:\Program Files\Git\cmd\git.exe" -C "<this folder>" push
```

**Netlify free plan limits:** 300 credits per month. Each Netlify deploy costs 15 credits (about 20 per month),
so batch your edits into one deploy. Changes that only touch `docs/` or this README don't need a Netlify deploy.
If credits run out, Netlify takes the site offline until the next month. Check usage under Netlify → Billing.

## Still to set up

| Step | Service | What to do |
|---|---|---|
| Scheduling | cal.com (free) | Create an account and event types ("Free 15-min consult", "60-min session"). Put your username in `lib/site.ts` → `calUsername`. |
| Payments | stripe.com | Create a Payment Link for each package. Paste each link into `lib/site.ts` → `paymentLink`. Stripe charges ~2.9% + 30¢ (vs. Wyzant's 25%). |

## Giving students AI access

In Netlify, open your project → **Project configuration → Environment variables**, and edit `PRACTICE_ACCESS_CODES`.
Add a code per student, separated by commas (for example, a code for each student plus your own).
To revoke access, remove the code and save; the change takes effect at the next deploy (15 credits).
Never write real access codes in this repository or README: the repository is public.

## Wyzant note

Wyzant's terms prohibit moving students you met through Wyzant off the platform.
Use this site for **new** clients from referrals, LinkedIn, pre-law advisors, school groups, Google and so on.

## Roadmap

- **Phase 1 (now):** Own site, direct booking and payments, AI coach as a premium perk.
- **Phase 2:** Student logins (e.g. Clerk) and automatic access after Stripe checkout, with progress saved per student.
- **Phase 3:** Add tutors in `lib/site.ts` → `tutors`, then per-tutor booking pages and a revenue split (Stripe Connect).
