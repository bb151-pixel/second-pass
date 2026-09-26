// ─────────────────────────────────────────────────────────────
//  EDIT THIS FILE to customize your business. No coding needed —
//  just change the text between the quotes and save.
// ─────────────────────────────────────────────────────────────

export const site = {
  brand: "Second Pass",
  tagline: "Your best LSAT score is one smart second pass away.",
  subhead:
    "1:1 LSAT coaching from a Rice MBA candidate, plus GMAT/GRE, business & finance, and admissions support — with an AI practice coach that works with you between sessions.",

  // The numbers in the row under the headline. Keep these true and current.
  stats: [
    { big: "4.8★", small: "from 73 student ratings" },
    { big: "180+", small: "hours tutored" },
    { big: "Rice", small: "MBA candidate" },
    { big: "1:1", small: "online or in Houston" },
  ],
  email: "brittbroussard16@gmail.com", // your business email
  city: "Houston, TX · Online everywhere",

  // Scheduling: create a free account at cal.com and put your username here
  // (e.g. "broussard-prep" if your link is cal.com/broussard-prep).
  calUsername: "",

  // A promo code students can enter on the Practice page to try the AI coach.
  // The real list of codes lives in .env.local (PRACTICE_ACCESS_CODES).
  demoNote: "Students get an access code with any package.",
};

export type Service = {
  id: string;
  name: string;
  price: string;
  unit: string;
  blurb: string;
  features: string[];
  // Create a Payment Link in Stripe (dashboard.stripe.com → Payment Links)
  // and paste it here. Leave blank to send people to the booking page instead.
  paymentLink: string;
  featured?: boolean;
};

export const services: Service[] = [
  {
    id: "single",
    name: "Single Session",
    price: "$95",
    unit: "per hour",
    blurb: "Try a session, target a weak section, or get a diagnostic review.",
    features: ["60-min 1:1 session", "Diagnostic review", "7 days of AI Practice Coach"],
    paymentLink: "",
  },
  {
    id: "pack10",
    name: "LSAT 10-Pack",
    price: "$950",
    unit: "10 hours at $95/hour",
    blurb: "The full plan: study schedule, weekly sessions, and unlimited practice.",
    features: [
      "10 × 60-min 1:1 sessions",
      "Personalized study plan",
      "Unlimited AI Practice Coach",
      "Text support between sessions",
    ],
    paymentLink: "",
    featured: true,
  },
  {
    id: "coach",
    name: "AI Practice Coach",
    price: "$29",
    unit: "per month",
    blurb: "Self-paced: unlimited practice questions and explanations, 24/7.",
    features: ["LSAT LR & RC drills", "GMAT/GRE & finance practice", "Step-by-step explanations"],
    paymentLink: "",
  },
];

export const subjects = [
  { name: "LSAT", detail: "Logical Reasoning, Reading Comprehension, test strategy" },
  { name: "GMAT & GRE", detail: "Quant, verbal, data insights" },
  { name: "Business & Finance", detail: "Corporate finance, accounting, valuation, Excel" },
  { name: "Admissions & Career", detail: "Personal statements, resumes, cover letters, interview prep" },
];

// Tutors. Today it's just you — to grow into a marketplace later,
// add more people to this list and they'll appear on the site.
export type Tutor = {
  name: string;
  title: string;
  bio: string;
  subjects: string[];
};

export const tutors: Tutor[] = [
  {
    name: "Brittany Broussard",
    title: "Founder · MBA Candidate, Rice University · Former Professional Ballet Dancer",
    bio: "I'm an MBA candidate at Rice University. Before business school, I spent several years dancing professionally with Alberta Ballet while earning my Commerce & Business Administration degree from the University of Alabama, magna cum laude. Ballet taught me what the LSAT rewards: a disciplined, repeatable process. In our sessions, you'll explain your reasoning out loud, we'll pinpoint exactly where it breaks down, and we'll fix the habit behind the mistake, not just the question in front of you.",
    subjects: ["LSAT", "MBA coursework", "Financial Accounting", "Business", "Essays & Personal Statements", "Interview Prep"],
  },
];

// Student reviews. Paste each student's words between the quotes after
// `quote:` once they've said it's OK to use them. Any review left blank
// stays hidden, and the whole section hides if all are blank.
// Tip: a 1–3 sentence excerpt reads better on the site than a full review.
export const testimonials: { quote: string; who: string }[] = [
  // Naomi's review on Wyzant ("patient and diligent tutor")
  { quote: "", who: "LSAT student · 19 lessons" },
  // Jay's review on Wyzant ("A Tutor Who Truly Cares")
  { quote: "", who: "LSAT student · 8 lessons" },
  // Magdalene's review on Wyzant ("Amazing and Patient Tutor")
  { quote: "", who: "Resume & cover letter student" },
];
