// src/data/questions.js
// ─────────────────────────────────────────────────────────────────────────────
// TODO: Replace these sample questions with the full validated GAD-7 or PHQ-9
//       questionnaire once approved by the clinical / research team.
//       PHQ-9 reference: https://www.phqscreeners.com/
//       GAD-7 reference: https://www.phqscreeners.com/select-screener/7
// ─────────────────────────────────────────────────────────────────────────────

export const questions = [
  {
    id: "q1",
    text: "Over the last 2 weeks, how often have you felt little interest or pleasure in doing things?",
    options: [
      { label: "Not at all",         value: "0" },
      { label: "Several days",        value: "1" },
      { label: "More than half the days", value: "2" },
      { label: "Nearly every day",    value: "3" },
    ],
  },
  {
    id: "q2",
    text: "How often have you been feeling down, depressed, or hopeless?",
    options: [
      { label: "Not at all",         value: "0" },
      { label: "Several days",        value: "1" },
      { label: "More than half the days", value: "2" },
      { label: "Nearly every day",    value: "3" },
    ],
  },
  {
    id: "q3",
    text: "How often have you had trouble falling or staying asleep, or sleeping too much?",
    options: [
      { label: "Not at all",         value: "0" },
      { label: "Several days",        value: "1" },
      { label: "More than half the days", value: "2" },
      { label: "Nearly every day",    value: "3" },
    ],
  },
  {
    id: "q4",
    text: "How often have you been feeling tired or having little energy?",
    options: [
      { label: "Not at all",         value: "0" },
      { label: "Several days",        value: "1" },
      { label: "More than half the days", value: "2" },
      { label: "Nearly every day",    value: "3" },
    ],
  },
  {
    id: "q5",
    text: "How often have you had trouble concentrating on things such as reading or watching TV?",
    options: [
      { label: "Not at all",         value: "0" },
      { label: "Several days",        value: "1" },
      { label: "More than half the days", value: "2" },
      { label: "Nearly every day",    value: "3" },
    ],
  },
];
