// src/data/questions.js

export const options = [
  { label: "Not at all", value: 0 },
  { label: "Several days", value: 1 },
  { label: "More than half the days", value: 2 },
  { label: "Nearly every day", value: 3 },
];

export const questions = [
  // PHQ-9 — Depression Screening (Q1–Q7)
  { id: "q1",  group: "PHQ-9", text: "Little interest or pleasure in doing things?",                                                                         options },
  { id: "q2",  group: "PHQ-9", text: "Feeling down, depressed, or hopeless?",                                                                                 options },
  { id: "q3",  group: "PHQ-9", text: "Trouble falling or staying asleep, or sleeping too much?",                                                              options },
  { id: "q4",  group: "PHQ-9", text: "Feeling tired or having little energy?",                                                                                options },
  { id: "q5",  group: "PHQ-9", text: "Poor appetite or overeating?",                                                                                          options },
  { id: "q6",  group: "PHQ-9", text: "Feeling bad about yourself — or that you are a failure or have let yourself or your family down?",                      options },
  { id: "q7",  group: "PHQ-9", text: "Trouble concentrating on things, such as reading or watching lectures?",                                                options },

  // GAD-7 — Anxiety Screening (Q8–Q12)
  { id: "q8",  group: "GAD-7", text: "Feeling nervous, anxious, or on edge?",                                                                                 options },
  { id: "q9",  group: "GAD-7", text: "Not being able to stop or control worrying?",                                                                           options },
  { id: "q10", group: "GAD-7", text: "Worrying too much about different things?",                                                                             options },
  { id: "q11", group: "GAD-7", text: "Trouble relaxing?",                                                                                                     options },
  { id: "q12", group: "GAD-7", text: "Feeling afraid as if something awful might happen?",                                                                    options },

  // MSSQ — Academic Stress (Q13–Q17)
  { id: "q13", group: "MSSQ",  text: "Feeling overwhelmed by heavy academic workload or assignments?",                                                        options },
  { id: "q14", group: "MSSQ",  text: "Fear of failing examinations or getting poor marks?",                                                                   options },
  { id: "q15", group: "MSSQ",  text: "Feeling pressure from parents or family to study or perform well?",                                                     options },
  { id: "q16", group: "MSSQ",  text: "Feeling unable to answer questions from teachers?",                                                                     options },
  { id: "q17", group: "MSSQ",  text: "Feeling that you are falling behind in your study schedule?",                                                           options },

  // UCLA Loneliness Scale (Q18–Q20)
  { id: "q18", group: "UCLA",  text: "How often do you feel that you lack companionship?",                                                                    options },
  { id: "q19", group: "UCLA",  text: "How often do you feel left out?",                                                                                       options },
  { id: "q20", group: "UCLA",  text: "How often do you feel isolated from others?",                                                                           options },
];
