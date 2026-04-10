// src/data/models.js
// Psychometric model/instrument cards for the Landing Page — expanded with detail fields

export const models = [
  {
    name: "PHQ-9",
    fullName: "Patient Health Questionnaire",
    badge: "Validated",
    badgeVariant: "default",
    description:
      "A 9-item self-report questionnaire used globally to screen, diagnose, and measure severity of depression.",
    measures: "Depression severity (minimal to severe)",
    questionCount: "9 questions",
    scoreRange: "Scores 0–27",
    detail:
      "Screens for depressive episodes | Used globally in clinical settings",
    icon: "ClipboardList",
  },
  {
    name: "GAD-7",
    fullName: "Generalized Anxiety Disorder Scale",
    badge: "Validated",
    badgeVariant: "default",
    description:
      "A 7-item tool for screening and measuring severity of generalized anxiety disorder — often co-occurring with depression.",
    measures: "Anxiety severity and frequency",
    questionCount: "7 questions",
    scoreRange: "Scores 0–21",
    detail:
      "Detects generalized anxiety | Validated in primary care",
    icon: "Activity",
  },
  {
    name: "UCLA Loneliness Scale",
    fullName: "UCLA Loneliness Scale (Version 3)",
    badge: "Research Grade",
    badgeVariant: "secondary",
    description:
      "A 20-item scale measuring subjective feelings of loneliness and social isolation — a significant risk factor for depression.",
    measures: "Perceived social isolation & loneliness",
    questionCount: "20 items",
    scoreRange: "Composite score",
    detail:
      "Measures perceived social isolation | Used in university research",
    icon: "Users",
  },
  {
    name: "MSSQ-40",
    fullName: "Medical Student Stressor Questionnaire",
    badge: "Research Grade",
    badgeVariant: "secondary",
    description:
      "A 40-item tool assessing academic, social, and environmental stressors faced by students — adapted for our college context.",
    measures: "Social support & academic stress levels",
    questionCount: "40 items",
    scoreRange: "Multi-domain",
    detail:
      "Measures social support from family and friends | Predicts resilience",
    icon: "GraduationCap",
  },
];
