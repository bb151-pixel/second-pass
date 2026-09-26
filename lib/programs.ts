// ─────────────────────────────────────────────────────────────
//  SUBJECT PAGES, BOOTCAMPS, AND PACKAGES. Edit the text between the
//  quotes and save. Each program gets its own page at /tutoring/<slug>.
//  Prices marked PLACEHOLDER are suggestions: set your own.
// ─────────────────────────────────────────────────────────────

import type { Service } from "./site";

export type Program = {
  slug: string; // page address: /tutoring/<slug>
  name: string; // short name used in menus and cards
  cardBlurb: string; // one line for the home page card
  eyebrow: string;
  headline: string;
  intro: string;
  metaTitle: string; // browser tab / Google title
  metaDescription: string;
  aboutTitle: string;
  about: string[]; // facts about the test or subject
  helpWith: string[]; // what sessions cover
  approach: string; // how Brittany teaches it
  packages: Service[];
  coachMode: string; // which AI coach subject the "Practice" button opens
  bootcamps?: string[]; // ids from the bootcamps list below
};

const oneOnOne = (id: string, blurb: string): Service => ({
  id,
  name: "Single Session",
  price: "$95",
  unit: "per hour",
  blurb,
  features: ["60-min 1:1 session", "Online or in Houston", "7 days of AI Practice Coach"],
  paymentLink: "",
});

const tenPack = (id: string, name: string, blurb: string): Service => ({
  id,
  name,
  price: "$950",
  unit: "10 hours at $95/hour",
  blurb,
  features: ["10 × 60-min 1:1 sessions", "Personalized study plan", "Unlimited AI Practice Coach", "Pre-session practice summaries"],
  paymentLink: "",
  featured: true,
});

export const programs: Program[] = [
  {
    slug: "lsat",
    name: "LSAT",
    cardBlurb: "Logical Reasoning, Reading Comprehension, and test strategy",
    eyebrow: "LSAT tutoring",
    headline: "Learn to read the LSAT the way it's written.",
    intro:
      "1:1 coaching built on one idea: by the end, you should be able to explain every answer back in your own words. Online, or in person in Houston.",
    metaTitle: "LSAT Tutoring in Houston & Online | Second Pass",
    metaDescription:
      "1:1 LSAT tutoring from a Rice MBA candidate: Logical Reasoning, Reading Comprehension, and a study plan built around your target score.",
    aboutTitle: "About the LSAT",
    about: [
      "Scored 120 to 180.",
      "Two Logical Reasoning sections and one Reading Comprehension section count toward your score, plus one unscored experimental section.",
      "Logic Games were removed in August 2024.",
      "LSAT Argumentative Writing is completed separately and sent to schools with your score.",
    ],
    helpWith: [
      "A diagnostic review and a study plan built around your target score and test date",
      "Every Logical Reasoning question type: Flaw, Assumption, Strengthen, Weaken, Inference, and more",
      "Reading Comprehension: the main point, the author's position, and passage structure",
      "Timing, and knowing when to move on",
      "Deciding when you're ready to test, and whether to retake",
    ],
    approach:
      "You'll talk through every question out loud: restate the stimulus, say what the question is really asking, find the conclusion, name the gap, and predict before you look at the choices. When you miss one, I won't just give you the answer. I'll ask the question that shows you where your reasoning broke, and you'll explain the fix back to me.",
    packages: [
      oneOnOne("lsat-single", "Target a weak section, review a practice test, or try a session."),
      tenPack("lsat-10", "LSAT 10-Pack", "The full plan: study schedule, weekly sessions, and unlimited practice."),
    ],
    coachMode: "lsat-lr",
    bootcamps: ["lsat-lr-bootcamp", "lsat-rc-bootcamp"],
  },
  {
    slug: "gmat",
    name: "GMAT",
    cardBlurb: "GMAT Focus Edition: Quant, Verbal, and Data Insights",
    eyebrow: "GMAT tutoring",
    headline: "The GMAT rewards clear reasoning. Let's build it.",
    intro:
      "1:1 coaching for the GMAT Focus Edition from a Rice MBA candidate who knows what business schools are looking for.",
    metaTitle: "GMAT Tutoring in Houston & Online | Second Pass",
    metaDescription:
      "1:1 GMAT Focus Edition tutoring: Quantitative Reasoning, Verbal Reasoning, and Data Insights, from a Rice MBA candidate.",
    aboutTitle: "About the GMAT Focus Edition",
    about: [
      "Three 45-minute sections: Quantitative Reasoning, Verbal Reasoning, and Data Insights.",
      "Scored 205 to 805.",
      "No geometry, no sentence correction, and no essay.",
      "Verbal is Critical Reasoning and Reading Comprehension, which use the same argument skills as the LSAT.",
    ],
    helpWith: [
      "A diagnostic and a study plan around your application deadlines",
      "Critical Reasoning: finding the conclusion, naming the gap, and predicting",
      "Data Insights: data sufficiency, table analysis, graphics, and multi-source reasoning",
      "Quant problem solving without a calculator",
      "Pacing and question selection",
    ],
    approach:
      "Before you calculate or read the choices, you'll say what the question is really asking and how you'll attack it. For Critical Reasoning, you'll use the same out-loud process my LSAT students use. For data sufficiency, you'll judge each statement on its own before combining them.",
    packages: [
      oneOnOne("gmat-single", "Target a section, review a practice exam, or try a session."),
      tenPack("gmat-10", "GMAT 10-Pack", "A full plan: study schedule, weekly sessions, and unlimited practice."),
    ],
    coachMode: "gmat",
    bootcamps: ["gmat-cr-bootcamp"],
  },
  {
    slug: "executive-assessment",
    name: "Executive Assessment",
    cardBlurb: "The 90-minute exam for Executive MBA applicants",
    eyebrow: "Executive Assessment tutoring",
    headline: "Efficient prep for busy professionals.",
    intro:
      "Focused 1:1 coaching for the Executive Assessment, built around a working professional's schedule.",
    metaTitle: "Executive Assessment Tutoring | Second Pass",
    metaDescription:
      "1:1 Executive Assessment (EA) tutoring for Executive MBA applicants: Integrated Reasoning, Verbal, and Quant.",
    aboutTitle: "About the Executive Assessment",
    about: [
      "A 90-minute exam with three 30-minute sections: Integrated Reasoning, Verbal Reasoning, and Quantitative Reasoning.",
      "Designed for experienced professionals applying to Executive MBA programs.",
      "Many EMBA programs accept it in place of the GMAT or GRE. Check each school's requirements.",
    ],
    helpWith: [
      "A short, focused plan that fits around work",
      "Integrated Reasoning: tables, graphics, and multi-source questions",
      "Verbal: critical reasoning and reading comprehension",
      "Refreshing the math you haven't used in years",
      "Pacing a 30-minute section",
    ],
    approach:
      "Your time is limited, so every session targets the questions costing you the most points. You'll explain your approach before solving, which makes gaps show up fast and keeps the fixes sticking between sessions.",
    packages: [
      oneOnOne("ea-single", "Target a section, review a practice exam, or try a session."),
      {
        id: "ea-5",
        name: "EA Fast Track",
        price: "$475", // PLACEHOLDER
        unit: "5 hours at $95/hour",
        blurb: "A compact plan for professionals on a deadline.",
        features: ["5 × 60-min 1:1 sessions", "Focused study plan", "Unlimited AI Practice Coach"],
        paymentLink: "",
        featured: true,
      },
    ],
    coachMode: "ea",
  },
  {
    slug: "admissions",
    name: "Admissions",
    cardBlurb: "Law school and MBA essays, resumes, and interviews",
    eyebrow: "Admissions coaching",
    headline: "Your application, in your voice, at its strongest.",
    intro:
      "Coaching for law school and MBA applications. I give detailed feedback and ask the questions that make your writing sharper. You do the writing, so every word stays yours.",
    metaTitle: "Law School & MBA Admissions Coaching | Second Pass",
    metaDescription:
      "Feedback-based coaching for law school and MBA personal statements, essays, resumes, and interviews, from a Rice MBA candidate.",
    aboutTitle: "What's included",
    about: [
      "Personal statements, diversity statements, and addenda for law school",
      "MBA essays and short-answer questions",
      "Resumes and cover letters",
      "Mock interviews with specific feedback",
    ],
    helpWith: [
      "Finding the right story, not the most common one",
      "Structure: does every paragraph earn its place?",
      "Clarity and concision, line by line",
      "Resume bullets that show results, not just duties",
      "Interview answers that sound like you, not a script",
    ],
    approach:
      "Feedback only, never ghostwriting. You'll get specific notes on what's working and what isn't, plus the questions that help you find better material. Admissions readers are looking for your voice, and the best way to protect it is for you to do the writing.",
    packages: [
      {
        id: "adm-statement",
        name: "Personal Statement Coaching",
        price: "$350", // PLACEHOLDER
        unit: "per statement",
        blurb: "From first idea to final draft.",
        features: ["Brainstorming session (60 min)", "Up to 3 rounds of written feedback", "Final read-through"],
        paymentLink: "",
        featured: true,
      },
      {
        id: "adm-resume",
        name: "Resume & Cover Letter",
        price: "$150", // PLACEHOLDER
        unit: "per package",
        blurb: "Bullets that show impact.",
        features: ["Written feedback on your resume", "Written feedback on one cover letter", "One follow-up round"],
        paymentLink: "",
      },
      {
        id: "adm-interview",
        name: "Interview Prep",
        price: "$190", // PLACEHOLDER
        unit: "2 mock interviews",
        blurb: "Practice until your answers sound like you.",
        features: ["Two 45-min mock interviews", "Specific feedback after each", "School-specific questions"],
        paymentLink: "",
      },
      {
        id: "adm-complete",
        name: "Complete Application",
        price: "$650", // PLACEHOLDER
        unit: "per application cycle",
        blurb: "Everything above, together.",
        features: ["Personal statement coaching", "Resume feedback", "One addendum or short essay", "One mock interview"],
        paymentLink: "",
      },
    ],
    coachMode: "admissions",
  },
  {
    slug: "business",
    name: "Business & Finance",
    cardBlurb: "Accounting, corporate finance, valuation, and Excel",
    eyebrow: "Business & finance tutoring",
    headline: "Make the numbers make sense.",
    intro:
      "1:1 help with undergraduate and MBA business courses, from someone taking them now at Rice.",
    metaTitle: "Business, Finance & Accounting Tutoring | Second Pass",
    metaDescription:
      "1:1 tutoring for business coursework: financial accounting, corporate finance, valuation, statistics, and Excel modeling.",
    aboutTitle: "Subjects",
    about: [
      "Financial accounting and the three financial statements",
      "Corporate finance: time value of money, NPV, IRR, and WACC",
      "Valuation: DCF and multiples",
      "Business statistics",
      "Excel modeling",
    ],
    helpWith: [
      "Homework concepts you're stuck on (I'll teach the concept, not do the assignment)",
      "Exam review and practice problems",
      "Building intuition for why a formula works",
      "Excel models, step by step",
    ],
    approach:
      "You'll explain each step back before we move on, so the concept holds up on the exam, not just on the homework. We'll predict an answer's rough size before calculating, which catches most mistakes before they happen.",
    packages: [
      oneOnOne("biz-single", "Get unstuck on a concept or prepare for an exam."),
      {
        id: "biz-5",
        name: "Exam Prep 5-Pack",
        price: "$475", // PLACEHOLDER
        unit: "5 hours at $95/hour",
        blurb: "Steady support through a course or before an exam.",
        features: ["5 × 60-min 1:1 sessions", "Practice problems", "Unlimited AI Practice Coach"],
        paymentLink: "",
        featured: true,
      },
    ],
    coachMode: "finance",
  },
];

export type Bootcamp = {
  id: string;
  name: string;
  test: string;
  format: string;
  price: string;
  seats: string;
  blurb: string;
  includes: string[];
  // Set when dates are fixed. Until then, the page shows "Join the waitlist".
  schedule: string;
  enrollLink: string; // Stripe Payment Link once enrollment opens
};

export const bootcamps: Bootcamp[] = [
  {
    id: "lsat-lr-bootcamp",
    name: "LSAT Logical Reasoning Bootcamp",
    test: "LSAT",
    format: "4 weeks · 8 live online sessions (75 min each)", // PLACEHOLDER
    price: "$300", // PLACEHOLDER
    seats: "Up to 6 students",
    blurb: "Master the core question types with the out-loud method, in a small group where everyone talks.",
    includes: [
      "Flaw, Assumption, Strengthen, Weaken, Inference, and more",
      "Weekly practice sets between sessions",
      "AI Practice Coach for the length of the course",
      "A progress note on your recurring mistakes",
    ],
    schedule: "",
    enrollLink: "",
  },
  {
    id: "lsat-rc-bootcamp",
    name: "LSAT Reading Comprehension Bootcamp",
    test: "LSAT",
    format: "3 weeks · 6 live online sessions (75 min each)", // PLACEHOLDER
    price: "$225", // PLACEHOLDER
    seats: "Up to 6 students",
    blurb: "Learn to find the main point, the author's position, and the structure of any passage.",
    includes: [
      "Passage mapping and structure",
      "Comparative passages",
      "AI Practice Coach for the length of the course",
      "A progress note on your recurring mistakes",
    ],
    schedule: "",
    enrollLink: "",
  },
  {
    id: "gmat-cr-bootcamp",
    name: "GMAT Critical Reasoning Bootcamp",
    test: "GMAT",
    format: "3 weeks · 6 live online sessions (60 min each)", // PLACEHOLDER
    price: "$225", // PLACEHOLDER
    seats: "Up to 6 students",
    blurb: "The argument skills behind Critical Reasoning, taught by an LSAT specialist.",
    includes: [
      "Assumption, Strengthen, Weaken, and Evaluate questions",
      "Boldface and paradox questions",
      "AI Practice Coach for the length of the course",
      "A progress note on your recurring mistakes",
    ],
    schedule: "",
    enrollLink: "",
  },
];

export const programBySlug = (slug: string) => programs.find((p) => p.slug === slug);
export const bootcampById = (id: string) => bootcamps.find((b) => b.id === id);
