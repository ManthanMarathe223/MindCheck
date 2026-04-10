// src/data/questions.js

export const options = [
  { label: "Not at all", value: 0 },
  { label: "Several days", value: 1 },
  { label: "More than half the days", value: 2 },
  { label: "Nearly every day", value: 3 },
];

export const questions = [
  { id: "q1",  group: "PHQ-9",  text: "Little interest or pleasure in doing things?" },
  { id: "q2",  group: "PHQ-9",  text: "Feeling down, depressed, or hopeless?" },
  { id: "q3",  group: "PHQ-9",  text: "Trouble falling or staying asleep, or sleeping too much?" },
  { id: "q4",  group: "PHQ-9",  text: "Feeling tired or having little energy?" },
  { id: "q5",  group: "PHQ-9",  text: "Poor appetite or overeating?" },
  { id: "q6",  group: "PHQ-9",  text: "Feeling bad about yourself — or that you are a failure or have let yourself or your family down?" },
  { id: "q7",  group: "PHQ-9",  text: "Trouble concentrating on things, such as reading or watching lectures?" },
  { id: "q8",  group: "GAD-7",  text: "Feeling nervous, anxious, or on edge?" },
  { id: "q9",  group: "GAD-7",  text: "Not being able to stop or control worrying?" },
  { id: "q10", group: "GAD-7",  text: "Worrying too much about different things?" },
  { id: "q11", group: "GAD-7",  text: "Trouble relaxing?" },
  { id: "q12", group: "GAD-7",  text: "Feeling afraid as if something awful might happen?" },
  { id: "q13", group: "MSSQ",   text: "Feeling overwhelmed by heavy academic workload or assignments?" },
  { id: "q14", group: "MSSQ",   text: "Fear of failing examinations or getting poor marks?" },
  { id: "q15", group: "MSSQ",   text: "Feeling pressure from parents or family to study or perform well?" },
  { id: "q16", group: "MSSQ",   text: "Feeling unable to answer questions from teachers?" },
  { id: "q17", group: "MSSQ",   text: "Feeling that you are falling behind in your study schedule?" },
  { id: "q18", group: "UCLA",   text: "How often do you feel that you lack companionship?" },
  { id: "q19", group: "UCLA",   text: "How often do you feel left out?" },
  { id: "q20", group: "UCLA",   text: "How often do you feel isolated from others?" },
];
