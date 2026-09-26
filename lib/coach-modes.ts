// The subjects in the AI coach's dropdown, with the starter suggestions shown
// before a student's first message. The coach's teaching guidance for each
// subject lives in lib/coach-playbook.ts under the same id.

export type CoachMode = { id: string; label: string; starters: string[] };

export const COACH_MODES: CoachMode[] = [
  {
    id: "lsat-lr",
    label: "LSAT · Logical Reasoning",
    starters: [
      "Give me a medium Flaw question",
      "Give me a hard Necessary Assumption question",
      "Give me a Strengthen question",
      "Quiz me on finding the conclusion",
      "Help me review a question I missed",
      "How do I predict before reading the choices?",
    ],
  },
  {
    id: "lsat-rc",
    label: "LSAT · Reading Comp",
    starters: [
      "Give me a short RC passage with 3 questions",
      "Give me a comparative passage set",
      "Help me find the author's position",
      "Quiz me on main point questions",
      "How should I read a science passage?",
      "Help me review an RC question I missed",
    ],
  },
  {
    id: "gmat",
    label: "GMAT Focus",
    starters: [
      "Give me a GMAT Critical Reasoning question",
      "Give me a data sufficiency question",
      "Give me a Quant problem-solving question",
      "Give me a two-part analysis question",
      "How do I approach data sufficiency?",
      "Help me review a question I missed",
    ],
  },
  {
    id: "ea",
    label: "Executive Assessment",
    starters: [
      "Give me an Integrated Reasoning question",
      "Give me a Critical Reasoning question",
      "Give me a Quant question",
      "How is the EA different from the GMAT?",
      "How should I pace a 30-minute section?",
      "Help me review a question I missed",
    ],
  },
  {
    id: "admissions",
    label: "Admissions · Essays & Interviews",
    starters: [
      "Give me feedback on my personal statement opening",
      "Help me brainstorm personal statement topics",
      "Run a mock law school interview",
      "Run a mock MBA interview",
      "Give me feedback on a resume bullet",
      "What makes a strong addendum?",
    ],
  },
  {
    id: "finance",
    label: "Business & Finance",
    starters: [
      "Quiz me on NPV and IRR",
      "Give me a WACC practice problem",
      "Walk me through a simple DCF",
      "How do the 3 financial statements link?",
      "Quiz me on journal entries",
      "Help me with a homework concept",
    ],
  },
];

export const DEFAULT_MODE = "lsat-lr";
export const isCoachMode = (id: string | null | undefined): id is string =>
  !!id && COACH_MODES.some((m) => m.id === id);
