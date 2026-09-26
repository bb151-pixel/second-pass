// ─────────────────────────────────────────────────────────────
//  EDIT THIS FILE to customize your business. No coding needed —
//  just change the text between the quotes and save.
// ─────────────────────────────────────────────────────────────

export const site = {
  brand: "Second Pass",
  tagline: "Your best LSAT score is one smart second pass away.",
  subhead:
    "1:1 coaching for the LSAT, plus GMAT/GRE and business & finance courses — with an AI practice coach that works with you between sessions.",
  email: "hello@example.com", // your business email
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

// Placeholder prices — set these to what you want to charge.
export const services: Service[] = [
  {
    id: "single",
    name: "Single Session",
    price: "$150",
    unit: "per hour",
    blurb: "Try a session, target a weak section, or get a diagnostic review.",
    features: ["60-min 1:1 session", "Diagnostic review", "7 days of AI Practice Coach"],
    paymentLink: "",
  },
  {
    id: "pack10",
    name: "LSAT 10-Pack",
    price: "$1,350",
    unit: "10 hours · save $150",
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
    title: "Founder · LSAT & Business Tutor",
    bio: "Rice MBA. I've helped students on Wyzant raise their LSAT scores and master business coursework. I focus on teaching you how the test thinks, not just drilling questions.",
    subjects: ["LSAT", "GMAT", "Finance", "Accounting"],
  },
];

// Add real quotes (with permission) from your students. The reviews
// section stays hidden on the site until at least one is added. Example:
// { quote: "My LSAT went from 158 to 169!", who: "Jordan, admitted to UT Law" },
export const testimonials: { quote: string; who: string }[] = [];
