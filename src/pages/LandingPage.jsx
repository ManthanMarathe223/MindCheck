// src/pages/LandingPage.jsx
import { Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { symptoms } from "@/data/symptoms";
import { models } from "@/data/models";
import { heroSlides } from "@/data/heroSlides";
import { teamMembers } from "@/data/team";
import { blogs } from "@/data/blogs";
import {
  ArrowRight,
  HeartPulse,
  Lightbulb,
  Users,
  ChevronDown,
  BookOpen,
  Beaker,
  ExternalLink,
  Calendar,
  // Symptom icons
  CloudRain,
  MinusCircle,
  BatteryLow,
  Moon,
  BrainCircuit,
  HeartCrack,
  // Model icons
  ClipboardList,
  Activity,
  GraduationCap,
  // Understanding Depression icons
  Brain,
  GitBranch,
  BarChart2,
  CheckCircle2,
} from "lucide-react";

// Inline SVG icons (lucide-react removed brand icons in v1.7+)
const GithubIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);
const LinkedinIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

/* ── Symptom icon map ── */
const symptomIconMap = {
  CloudRain: <CloudRain className="h-6 w-6 text-primary" />,
  MinusCircle: <MinusCircle className="h-6 w-6 text-primary" />,
  BatteryLow: <BatteryLow className="h-6 w-6 text-primary" />,
  Moon: <Moon className="h-6 w-6 text-primary" />,
  BrainCircuit: <BrainCircuit className="h-6 w-6 text-primary" />,
  HeartCrack: <HeartCrack className="h-6 w-6 text-primary" />,
};

/* ── Model icon map ── */
const modelIconMap = {
  ClipboardList: <ClipboardList className="h-7 w-7" />,
  Activity: <Activity className="h-7 w-7" />,
  Users: <Users className="h-7 w-7" />,
  GraduationCap: <GraduationCap className="h-7 w-7" />,
};

/* ── About cards ── */
const aboutCards = [
  {
    icon: <Beaker className="h-6 w-6" />,
    title: "What We Do",
    desc: "We collect psychometric data from students using validated instruments — PHQ-9, GAD-7, UCLA Loneliness Scale, and MSSQ-40 — to build a machine learning model for early depression detection.",
  },
  {
    icon: <HeartPulse className="h-6 w-6" />,
    title: "Why It Matters",
    desc: "Depression is the leading cause of disability worldwide, yet most college students never get screened. Early detection through accessible tools can save lives and connect students to help sooner.",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Who We Are",
    desc: "A team of PCCOE engineering students on a mission to bridge the gap between technology and mental health — turning our community engagement project into real impact.",
  },
];

const stats = [
  { value: "1000+", label: "Survey Responses" },
  { value: "4", label: "Validated Instruments" },
  { value: "1", label: "College Community" },
];

/* ── Student mental health stats ── */
const mentalHealthStats = [
  { value: "60%", desc: "of mental illnesses begin before age 25" },
  { value: "60%", desc: "of college students show signs of depression" },
  { value: "70%", desc: "experience anxiety or emotional distress" },
  { value: "60th", desc: "India ranks 60th out of 84 countries in youth mental well-being" },
  { value: "0.75", desc: "psychiatrists per 100,000 people in India (recommended: 3)" },
  { value: "70–92%", desc: "of people with mental disorders receive no treatment" },
];

/* ── Stages of depression pills ── */
const depressionStages = [
  {
    label: "Mild",
    desc: "Low mood, daily activities manageable",
    color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
  },
  {
    label: "Moderate",
    desc: "Noticeable difficulty in studies and relationships",
    color: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  },
  {
    label: "Severe",
    desc: "Intense symptoms, needs immediate help",
    color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  },
];

/* ── How depression occurs list ── */
const depressionCauses = [
  "Biological factors",
  "Psychological patterns",
  "Social isolation",
  "Academic pressure and life events",
];

/* ── Hero Background Image ── */
function HeroBgImage({ src, isActive }) {
  const [err, setErr] = useState(false);
  if (err) return null;
  return (
    <img
      src={src}
      alt=""
      onError={() => setErr(true)}
      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
        isActive ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}

/* ── Team Photo ── */
function TeamPhoto({ src, name }) {
  const [err, setErr] = useState(false);
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (err || !src) {
    return (
      <div className="w-full aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-[hsl(var(--soft-green))] flex items-center justify-center">
        <span className="text-3xl font-bold text-primary font-heading">{initials}</span>
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={name}
      onError={() => setErr(true)}
      className="w-full aspect-square rounded-2xl object-cover"
    />
  );
}

/* ── Blog tag color mapping ── */
const tagColors = {
  Awareness: "bg-[hsl(var(--soft-peach))] text-[hsl(var(--accent))]",
  Research: "bg-[hsl(var(--soft-green))] text-primary",
  "Data Insights": "bg-secondary text-secondary-foreground",
};

export default function LandingPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [textKey, setTextKey] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setTextKey((k) => k + 1);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 4000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const slide = heroSlides[currentSlide];

  return (
    <div className="flex flex-col">
      {/* ─── Section A: Hero with Sliding Background ─── */}
      <section className="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden">
        {/* Background images */}
        {heroSlides.map((s, i) => (
          <HeroBgImage key={i} src={s.image} isActive={i === currentSlide} />
        ))}

        {/* Fallback gradient if no images */}
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--soft-green))] via-background to-[hsl(var(--soft-peach)/0.5)] -z-10" />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Text — left aligned */}
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto max-w-6xl px-6 w-full">
            <div className="max-w-2xl" key={textKey}>
              <Badge
                variant="outline"
                className="mb-6 gap-2 border-white/30 text-white/90 px-4 py-1.5 text-xs font-medium hero-text-animate"
              >
                <Lightbulb className="h-3.5 w-3.5" />
                PCCOE Community Engagement Project · 2026
              </Badge>

              <h1 className="font-heading text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white mb-4 leading-tight hero-text-animate">
                {slide.heading}
              </h1>

              <p className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed hero-text-animate" style={{ animationDelay: "0.5s" }}>
                {slide.subtext}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 hero-text-animate" style={{ animationDelay: "0.7s" }}>
                <Button
                  size="lg"
                  asChild
                  className="gap-2 bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent)/0.9)] text-white shadow-lg hover:shadow-xl transition-all"
                >
                  <Link to="/questionnaire">
                    Take the Assessment <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="gap-2 border-2 border-white text-white bg-white/20 hover:bg-white/30 backdrop-blur-sm font-medium"
                >
                  <a href="#about">
                    Learn More <ChevronDown className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => { setCurrentSlide(i); setTextKey((k) => k + 1); }}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentSlide ? "w-8 bg-white" : "w-2 bg-white/40"
              }`}
            />
          ))}
        </div>
      </section>

      {/* ─── Section B: About the Project ─── */}
      <section id="about" className="py-24 bg-card">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-16 animate-fade-in-up">
            <p className="text-sm font-medium text-primary uppercase tracking-wider mb-2">About the Project</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              Built with Purpose
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              From a classroom idea to a real-world impact project — here's what drives us.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {aboutCards.map((card, i) => (
              <Card
                key={card.title}
                className="border-border/60 hover:border-primary/30 hover:shadow-xl transition-all duration-300 group animate-fade-in-up"
                style={{ animationDelay: `${(i + 1) * 100}ms` }}
              >
                <CardContent className="pt-8 pb-8 flex flex-col gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[hsl(var(--soft-green))] text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    {card.icon}
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-foreground">{card.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Section C: Models We Use ─── */}
      <section className="py-24 bg-card">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-8 animate-fade-in-up">
            <p className="text-sm font-medium text-primary uppercase tracking-wider mb-2">Methodology</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              Our Approach
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              We combine multiple validated psychometric instruments to build a comprehensive picture of mental well-being.
            </p>
          </div>

          {/* Why These 4? */}
          <div className="max-w-3xl mx-auto text-center mb-12 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
            <div className="p-6 rounded-2xl bg-[hsl(var(--soft-green)/0.5)] border border-primary/10">
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                Why These 4 Instruments?
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Depression rarely exists in isolation. By combining the PHQ-9 (depression), GAD-7 (anxiety),
                UCLA Loneliness Scale (social isolation), and MSSQ-40 (stressors &amp; social support), we capture
                the interconnected factors that contribute to mental health — giving our ML model a richer,
                multi-dimensional input for more accurate early detection.
              </p>
            </div>
          </div>

          {/* 2×2 grid on desktop, single column on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {models.map((m, i) => (
              <Card
                key={m.name}
                className="border-border/60 hover:border-primary/30 hover:shadow-xl transition-all duration-300 group animate-fade-in-up"
                style={{ animationDelay: `${(i + 1) * 120}ms` }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[hsl(var(--soft-green))] text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                      {modelIconMap[m.icon]}
                    </div>
                    <Badge variant={m.badgeVariant}>{m.badge}</Badge>
                  </div>
                  <CardTitle className="font-heading text-xl">{m.name}</CardTitle>
                  <CardDescription className="text-sm">{m.fullName}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0 flex flex-col gap-3">
                  <p className="text-sm text-muted-foreground leading-relaxed">{m.description}</p>

                  {/* Meta badges row */}
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs font-normal">
                      {m.questionCount}
                    </Badge>
                    <Badge variant="outline" className="text-xs font-normal">
                      {m.scoreRange}
                    </Badge>
                  </div>

                  <p className="text-xs text-muted-foreground italic">{m.detail}</p>
                  <p className="text-xs text-primary font-medium">Measures: {m.measures}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Section C2: Understanding Depression ─── */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-16 animate-fade-in-up">
            <p className="text-sm font-medium text-primary uppercase tracking-wider mb-2">Context</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              Understanding Depression
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              The scale of the challenge — and why early detection matters more than ever.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left column — 3 sub-sections */}
            <div className="flex flex-col gap-8 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
              {/* Sub-section 1: What is Depression? */}
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[hsl(var(--soft-green))] text-primary mt-0.5">
                  <Brain className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-foreground mb-2">What is Depression?</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Depression is more than just feeling sad. It is a serious mental health condition that affects
                    how a person thinks, feels, and behaves — impacting daily life, studies, relationships, and
                    overall well-being.
                  </p>
                </div>
              </div>

              {/* Sub-section 2: How Does It Occur? */}
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[hsl(var(--soft-green))] text-primary mt-0.5">
                  <GitBranch className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-foreground mb-2">How Does It Occur?</h3>
                  <ul className="flex flex-col gap-2">
                    {depressionCauses.map((cause) => (
                      <li key={cause} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                        {cause}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Sub-section 3: Stages of Depression */}
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[hsl(var(--soft-green))] text-primary mt-0.5">
                  <BarChart2 className="h-5 w-5" />
                </div>
                <div className="w-full">
                  <h3 className="font-heading text-lg font-bold text-foreground mb-3">Stages of Depression</h3>
                  <div className="flex flex-col gap-3">
                    {depressionStages.map((stage) => (
                      <div
                        key={stage.label}
                        className={`flex flex-col sm:flex-row sm:items-center gap-1.5 rounded-xl px-4 py-3 ${stage.color}`}
                      >
                        <span className="font-semibold text-sm shrink-0">{stage.label}:</span>
                        <span className="text-sm opacity-90">{stage.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right column — stat cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
              {mentalHealthStats.map((stat, i) => (
                <Card
                  key={i}
                  className="border-border/60 hover:border-primary/30 hover:shadow-md transition-all duration-300"
                >
                  <CardContent className="pt-6 pb-6 flex flex-col gap-1.5">
                    <span className="font-heading text-3xl font-bold text-primary leading-none">
                      {stat.value}
                    </span>
                    <p className="text-sm text-muted-foreground leading-relaxed">{stat.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Section D: Depression Awareness ─── */}
      <section className="py-24 bg-[hsl(var(--soft-green))]">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-16 animate-fade-in-up">
            <p className="text-sm font-medium text-primary uppercase tracking-wider mb-2">Awareness</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              Know the Signs
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Depression often goes unnoticed. Recognizing these symptoms is the first step toward healing.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {symptoms.map((s, i) => (
              <Card
                key={s.title}
                className="bg-card/80 backdrop-blur-sm border-border/40 hover:shadow-lg hover:border-primary/20 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${(i + 1) * 100}ms` }}
              >
                <CardContent className="pt-6 pb-6 flex flex-col gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[hsl(var(--soft-green))] text-primary">
                    {symptomIconMap[s.icon]}
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-foreground">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Section E: Stats Banner ─── */}
      <section className="py-16 bg-primary">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col gap-1">
                <span className="text-4xl md:text-5xl font-bold text-primary-foreground font-heading">
                  {s.value}
                </span>
                <span className="text-sm text-primary-foreground/70 font-medium">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Section F: Meet the Team ─── */}
      <section className="py-24 bg-card">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-16 animate-fade-in-up">
            <p className="text-sm font-medium text-primary uppercase tracking-wider mb-2">The People</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              Meet the Team
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              A passionate group of PCCOE students turning technology into a force for mental health.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, i) => (
              <Card
                key={member.name}
                className="border-border/60 hover:border-primary/20 hover:shadow-xl transition-all duration-300 group overflow-hidden animate-fade-in-up"
                style={{ animationDelay: `${(i + 1) * 100}ms` }}
              >
                <CardContent className="p-0">
                  <div className="p-4 pb-0">
                    <TeamPhoto src={member.photo} name={member.name} />
                  </div>
                  <div className="p-5 text-center">
                    <h3 className="font-heading text-lg font-bold text-foreground">{member.name}</h3>
                    {/* role and github fields kept for reference but not displayed */}
                    <p className="text-xs text-muted-foreground mt-0.5">{member.department}</p>
                    {member.linkedin && member.linkedin !== "https://linkedin.com/in/" && (
                      <div className="flex justify-center mt-4">
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground text-muted-foreground transition-colors"
                        >
                          <LinkedinIcon className="h-4 w-4" />
                        </a>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Section G: Blog ─── */}
      <section className="py-24 bg-[hsl(var(--soft-green)/0.3)]">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-16 animate-fade-in-up">
            <p className="text-sm font-medium text-primary uppercase tracking-wider mb-2">Knowledge</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              From Our Blog
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Insights, research updates, and mental health awareness articles from our team
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogs.map((blog, i) => (
              <Card
                key={blog.id}
                className="border-border/60 hover:border-primary/30 hover:shadow-xl transition-all duration-300 group overflow-hidden animate-fade-in-up flex flex-col"
                style={{ animationDelay: `${(i + 1) * 120}ms` }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={`text-xs font-medium ${tagColors[blog.tag] || "bg-secondary text-secondary-foreground"}`}>
                      {blog.tag}
                    </Badge>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {blog.date}
                    </span>
                  </div>
                  <CardTitle className="font-heading text-lg leading-snug group-hover:text-primary transition-colors">
                    {blog.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 flex-1 flex flex-col justify-between gap-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {blog.excerpt}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="self-start gap-2 text-primary hover:text-primary/80 p-0 h-auto font-medium"
                  >
                    <a href={blog.link} target="_blank" rel="noreferrer">
                      Read More <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Section H: CTA ─── */}
      <section className="py-28 bg-gradient-to-br from-[hsl(var(--soft-peach))] via-background to-[hsl(var(--soft-green)/0.5)]">
        <div className="mx-auto max-w-3xl px-6 text-center animate-fade-in-up">
          <div className="flex justify-center mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[hsl(var(--accent)/0.15)]">
              <HeartPulse className="h-8 w-8 text-[hsl(var(--accent))]" />
            </div>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
            Ready to Take the<br />First Step?
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-lg mx-auto">
            It takes just a few minutes. Your responses are private, and taking care of your mental health is always a sign of strength.
          </p>
          <Button
            size="lg"
            asChild
            className="gap-2 bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent)/0.9)] text-white shadow-xl hover:shadow-2xl transition-all"
          >
            <Link to="/questionnaire">
              Start the Assessment <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <p className="mt-5 text-xs text-muted-foreground">
            Not a substitute for professional medical advice. If you're in crisis, please reach out to a helpline.
          </p>
        </div>
      </section>
    </div>
  );
}
