// src/data/journey.js
// ─────────────────────────────────────────────────────────────────────────────
// IMAGE INSTRUCTIONS
// Place images in /public/journey/
// Naming: journey1.jpg, journey2.jpg, journey3.jpg, journey4.jpg, journey5.jpg, journey6.jpg
// Supported formats: .jpg .jpeg .png .webp
// ─────────────────────────────────────────────────────────────────────────────

export const journeyEvents = [
  {
    id: 1,
    date: "January 2025",
    title: "The Spark",
    description:
      "The idea was born during a college discussion about rising student stress and the lack of early mental health detection tools.",
    imagePath: "/journey/journey1.jpeg",
    imageAlt: "Team brainstorming session about mental health detection",
  },
  {
    id: 2,
    date: "February 2025",
    title: "Consulting the Experts",
    description:
      "We met with psychiatrists and college counselors to understand the real challenges in diagnosing depression early.",
    imagePath: "/journey/journey2.jpeg",
    imageAlt: "Meeting with psychiatrists and college counselors",
  },
  {
    id: 3,
    date: "March 2025",
    title: "Choosing Our Instruments",
    description:
      "After research, we finalized GAD-7, PHQ-9, UCLA Loneliness Scale, and MSSQ-40 as our psychometric tools.",
    imagePath: "/journey/journey3.jpeg",
    imageAlt: "Research materials and psychometric instrument selection",
  },
  {
    id: 4,
    date: "April 2025",
    title: "Building the Survey",
    description:
      "Designed and tested a Google Form combining all four instruments for student-friendly data collection.",
    imagePath: "/journey/journey4.jpg",
    imageAlt: "Designing the survey form for data collection",
  },
  {
    id: 5,
    date: "May 2025",
    title: "Floating the Form",
    description:
      "Distributed the survey across PCCOE departments. Students from all years participated.",
    imagePath: "/journey/journey5.jpeg",
    imageAlt: "Students filling out the survey across campus",
  },
  {
    id: 6,
    date: "June 2025",
    title: "Training the Model",
    description:
      "Collected 200+ responses and trained our ML model. Deployed on Hugging Face Spaces.",
    imagePath: "/journey/journey6.jpeg",
    imageAlt: "Team working on ML model training and deployment",
  },
];

/** Field work photo paths for the slider and masonry gallery */
export const fieldWorkPhotos = [
  "/journey/journey1.jpeg",
  "/journey/journey2.jpeg",
  "/journey/journey3.jpg",
  "/journey/journey4.jpg",
  "/journey/journey5.jpeg",
  "/journey/hero.jpeg",
];
