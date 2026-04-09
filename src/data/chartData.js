// src/data/chartData.js
// ─────────────────────────────────────────────────────────────────────────────
// TODO: Replace all hardcoded data below with real dataset values fetched from
//       your backend / ML pipeline or a CSV import once the dataset is finalized.
// ─────────────────────────────────────────────────────────────────────────────

/** Bar chart — Depression prevalence across age groups */
export const ageGroupData = [
  { ageGroup: "15–24", depressed: 28, nonDepressed: 72 },
  { ageGroup: "25–34", depressed: 35, nonDepressed: 65 },
  { ageGroup: "35–44", depressed: 30, nonDepressed: 70 },
  { ageGroup: "45–54", depressed: 22, nonDepressed: 78 },
  { ageGroup: "55–64", depressed: 18, nonDepressed: 82 },
  { ageGroup: "65+",   depressed: 14, nonDepressed: 86 },
];

/** Pie chart — Dataset class distribution */
export const classDistributionData = [
  { name: "Depressed",     value: 412 },
  { name: "Not Depressed", value: 588 },
];

/** Line chart — PHQ-9 score trends over survey months */
export const phqTrendData = [
  { month: "Jan", avgScore: 7.2 },
  { month: "Feb", avgScore: 8.1 },
  { month: "Mar", avgScore: 7.8 },
  { month: "Apr", avgScore: 9.3 },
  { month: "May", avgScore: 8.7 },
  { month: "Jun", avgScore: 10.1 },
  { month: "Jul", avgScore: 9.5 },
  { month: "Aug", avgScore: 8.9 },
];

/** Bar chart — Common symptoms frequency */
export const symptomsData = [
  { symptom: "Low Energy",      count: 520 },
  { symptom: "Sleep Issues",    count: 480 },
  { symptom: "Loss of Interest",count: 430 },
  { symptom: "Hopelessness",    count: 390 },
  { symptom: "Poor Appetite",   count: 345 },
  { symptom: "Concentration",   count: 310 },
];

/** Pie chart colors — calm teal & soft lavender */
export const PIE_COLORS = ["#3d9b8f", "#9b8ec4"];

/** Bar / Line chart colors */
export const CHART_COLORS = {
  depressed:    "#3d9b8f",
  nonDepressed: "#9b8ec4",
  line:         "#5ba8a0",
  symptoms:     "#3d9b8f",
};
