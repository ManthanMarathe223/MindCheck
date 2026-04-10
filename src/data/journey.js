// src/data/journey.js
// ─────────────────────────────────────────────────────────────────────────────
// TIMELINE IMAGE INSTRUCTIONS
// Place images in /public/journey/
// Naming: journey1.jpeg, journey2.jpeg, journey3.jpeg, journey4.jpg, journey5.jpeg, journey6.jpeg
// ─────────────────────────────────────────────────────────────────────────────

export const journeyEvents = [
  {
    id: 1,
    title: "The Spark",
    description:
      "The idea was born during a college discussion about rising student stress and the lack of early mental health detection tools.",
    imagePath: "/journey/journey1.jpeg",
    imageAlt: "Team brainstorming session about mental health detection",
  },
  {
    id: 2,
    title: "Consulting the Experts",
    description:
      "We met with psychiatrists and college counselors to understand the real challenges in diagnosing depression early.",
    imagePath: "/journey/journey2.jpeg",
    imageAlt: "Meeting with psychiatrists and college counselors",
  },
  {
    id: 3,
    title: "Choosing Our Instruments",
    description:
      "After research, we finalized GAD-7, PHQ-9, UCLA Loneliness Scale, and MSSQ-40 as our psychometric tools.",
    imagePath: "/journey/journey3.jpeg",
    imageAlt: "Research materials and psychometric instrument selection",
  },
  {
    id: 4,
    title: "Building the Survey",
    description:
      "Designed and tested a Google Form combining all four instruments for student-friendly data collection.",
    imagePath: "/journey/journey4.jpg",
    imageAlt: "Designing the survey form for data collection",
  },
  {
    id: 5,
    title: "Floating the Form",
    description:
      "Distributed the survey across PCCOE departments. Students from all years participated.",
    imagePath: "/journey/journey5.jpeg",
    imageAlt: "Students filling out the survey across campus",
  },
  {
    id: 6,
    title: "Training the Model",
    description:
      "Collected 1000+ responses and trained our ML model. Deployed on Hugging Face Spaces.",
    imagePath: "/journey/journey6.jpeg",
    imageAlt: "Team working on ML model training and deployment",
  },
];

// Gallery images: place photos in /public/gallery/
// Naming: gallery1.jpeg, gallery2.jpeg ... gallery12.jpeg
export const galleryPhotos = [
  "/gallery/gallery1.HEIC",
  "/gallery/gallery2.HEIC",
  "/gallery/gallery3.HEIC",
  "/gallery/gallery4.HEIC",
  "/gallery/gallery5.jpg",
  "/gallery/gallery6.jpg",
  "/gallery/gallery7.jpeg",
  "/gallery/gallery8.jpg",
  "/gallery/gallery9.jpeg",
  "/gallery/gallery10.jpeg",
  "/gallery/gallery11.jpeg",
  "/gallery/gallery12.jpeg",
];
