// src/pages/QuestionnairePage.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { questions } from "@/data/questions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import {
  Leaf,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Clock,
  Loader2,
  Moon,
  Monitor,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

const API_URL = "https://saheel18-mental-health-api.hf.space/predict";

// Step 0 = demographics, steps 1–20 = questions
const DEMOGRAPHICS_STEP = 0;

// Group display metadata
const GROUP_META = {
  "PHQ-9": {
    label: "PHQ-9 — Depression Screening",
    instruction: "Over the last 2 weeks, how often have you been bothered by the following?",
    color: "border-primary/20 bg-[hsl(var(--soft-green)/0.6)]",
    textColor: "text-primary",
  },
  "GAD-7": {
    label: "GAD-7 — Anxiety Screening",
    instruction: "Over the last 2 weeks, how often have you been bothered by the following?",
    color: "border-[hsl(var(--accent)/0.3)] bg-[hsl(var(--soft-peach)/0.5)]",
    textColor: "text-[hsl(var(--accent))]",
  },
  "MSSQ": {
    label: "MSSQ — Academic Stress",
    instruction: "How often do you experience the following due to academic pressure?",
    color: "border-primary/20 bg-[hsl(var(--soft-green)/0.6)]",
    textColor: "text-primary",
  },
  "UCLA": {
    label: "UCLA Loneliness Scale",
    instruction: "How often do you feel the following?",
    color: "border-[hsl(var(--accent)/0.3)] bg-[hsl(var(--soft-peach)/0.5)]",
    textColor: "text-[hsl(var(--accent))]",
  },
};

export default function QuestionnairePage() {
  const navigate = useNavigate();

  // Page state
  const [currentStep, setCurrentStep] = useState(DEMOGRAPHICS_STEP);
  const [answers, setAnswers] = useState({}); // { q1: 0, q2: 2, ... }
  const [submitting, setSubmitting] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  // Demographics
  const [sleepingHours, setSleepingHours] = useState(7);
  const [screenTime, setScreenTime] = useState(5);

  // Derived
  const totalSteps = questions.length + 1; // +1 for demographics
  const isDemographicsStep = currentStep === DEMOGRAPHICS_STEP;
  const questionIndex = currentStep - 1; // 0-based index into questions[]
  const currentQuestion = isDemographicsStep ? null : questions[questionIndex];
  const prevQuestion = questionIndex > 0 ? questions[questionIndex - 1] : null;

  const progress = (currentStep / totalSteps) * 100;

  // An answer of 0 is valid — check !== undefined
  const isAnswered = (q) => answers[q.id] !== undefined;
  const isCurrentAnswered = currentQuestion ? isAnswered(currentQuestion) : false;
  const allAnswered = questions.every(isAnswered);

  // Detect group change to show section headers
  const isNewGroup =
    currentQuestion &&
    (!prevQuestion || prevQuestion.group !== currentQuestion.group);

  const handleAnswer = (strValue) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: Number(strValue) }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) setCurrentStep((s) => s + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  };

  const handleSubmit = async () => {
    setSubmitAttempted(true);
    if (!allAnswered) {
      toast.error("Incomplete", { description: "Please answer all questions before submitting." });
      return;
    }
    setSubmitting(true);

    // Sleeping hours — "Less then" is intentional typo matching the dataset
    const mapSleepingHours = (v) => {
      if (v <= 4.5) return "Less then 5 hours";
      if (v <= 6.5) return "5 to 6 hours";
      if (v <= 8)   return "7 to 8 hours";
      return "More than 8 hours";
    };

    const mapScreenTime = (v) => {
      if (v <= 2)   return "Less than 2 hours";
      if (v <= 4)   return "2 to 4 hours";
      if (v <= 6)   return "4 to 6 hours";
      return "More than 6 hours";
    };

    // All 14 question keys use the same frequency scale
    const frequencyMap = ["Not at all", "Several days", "More than half the days", "Nearly every day"];
    const f = (id) => frequencyMap[Math.min(answers[id], 3)];

    // Sending ONLY the 14 keys the model expects (+ 2 demographic fields = 16 total).
    // Keys q1, q3, q5, q13, q15, q16 are intentionally omitted — model doesn't use them.
    // NOTE: If the API returns 422, verify key "20." below matches the dataset exactly.
    const payload = {
      "Sleeping hours": mapSleepingHours(sleepingHours),
      "Screening time": mapScreenTime(screenTime),
      "2. Have you been feeling unusually sad, low, or hopeless about the future?":                                            f("q2"),
      "4. Do you feel physically drained or out of energy, even without doing heavy work?":                                   f("q4"),
      "6. Do you frequently feel like you are failing in life or letting your parents down?":                                 f("q6"),
      "7. Is it hard for you to focus on lectures, reading assignments, or even watching a movie?":                          f("q7"),
      "8. Do you often feel restless, nervous, or constantly \"on edge\"?":                                                  f("q8"),
      "9. Do you find it impossible to stop worrying, even when you try to distract yourself?":                              f("q9"),
      "10. Are you overthinking and stressing out about too many different things at once?":                                  f("q10"),
      "11. Do you find it difficult to just sit back, relax, and clear your mind?":                                          f("q11"),
      "12. Do you ever get a sudden feeling of panic, like something terrible is about to happen?":                          f("q12"),
      "14. How much does the fear of failing exams or getting low grades stress you out?":                                   f("q14"),
      "17. Does the feeling of \"falling behind\" the rest of the class in your studies cause you stress?":                  f("q17"),
      "18. How often do you feel like you don't have close friends to genuinely talk to or hang out with?":                  f("q18"),
      "19. How often do you feel ignored or left out by your peer group or classmates?":                                     f("q19"),
      "20. How often do you feel completely disconnected or isolated from the people around you?":                            f("q20"),
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`API returned ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();

      // result.prediction is a plain string (e.g. "Depressed" / "Not Depressed")
      navigate("/result", {
        state: {
          answers,
          prediction: result.prediction,
          demographics: { sleepingHours, screenTime },
        },
      });
    } catch (err) {
      console.error("ML API Error:", err);
      toast.error("Prediction Failed", {
        description: err.message || "Failed to connect to the prediction API. Please try again.",
      });
      setSubmitting(false);
    }
  };

  // ── Submitting overlay ─────────────────────────────────────────────────────
  if (submitting) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card className="max-w-md w-full border-border/60 shadow-xl text-center">
          <CardContent className="pt-10 pb-10 flex flex-col items-center gap-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[hsl(var(--soft-green))]">
              <Loader2 className="h-10 w-10 text-primary animate-spin" />
            </div>
            <div>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
                Analyzing Your Responses
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Our ML model is processing your answers. This may take a few seconds…
              </p>
            </div>
            <div className="w-full">
              <Progress value={100} className="h-2 animate-pulse" />
            </div>
            <div className="w-full space-y-3">
              <div className="h-3 bg-muted rounded-full animate-pulse" />
              <div className="h-3 bg-muted rounded-full animate-pulse w-3/4 mx-auto" />
              <div className="h-3 bg-muted rounded-full animate-pulse w-1/2 mx-auto" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ── Main form ──────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background">
      {/* Page header */}
      <section className="relative overflow-hidden py-10">
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[hsl(var(--soft-green)/0.5)] via-background to-[hsl(var(--soft-peach)/0.3)]" />
        <div className="mx-auto max-w-2xl px-6 text-center">
          <Badge variant="secondary" className="mb-3 gap-2">
            <Clock className="h-3 w-3" /> ~5 minutes · 20 questions
          </Badge>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
            Mental Health Assessment
          </h1>
          <p className="text-muted-foreground text-sm">
            Answer honestly. Your responses are private and not stored on any external server.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-2xl px-6 py-10">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-muted-foreground font-medium">
              {isDemographicsStep
                ? "Step 1 of 2: Your Details"
                : `Question ${questionIndex + 1} of ${questions.length}`}
            </span>
            <span className="text-xs text-primary font-semibold">{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* ── DEMOGRAPHICS STEP ── */}
        {isDemographicsStep && (
          <Card className="border-border/60 shadow-md animate-fade-in">
            <CardHeader className="pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[hsl(var(--soft-green))] mb-4">
                <Leaf className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="font-heading text-xl text-foreground">
                A Few Details First
              </CardTitle>
              <CardDescription>
                These help our model give a more personalised result.
              </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-8">
              {/* Sleeping Hours */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Moon className="h-4 w-4 text-primary" />
                  <Label className="text-sm font-medium text-foreground">
                    Sleeping Hours per Day
                  </Label>
                  <Badge variant="secondary" className="ml-auto text-xs tabular-nums">
                    {sleepingHours} hrs
                  </Badge>
                </div>
                <Slider
                  value={[sleepingHours]}
                  onValueChange={(val) => setSleepingHours(val[0])}
                  min={1}
                  max={12}
                  step={0.5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1 hr</span>
                  <span>12 hrs</span>
                </div>
              </div>

              {/* Screen Time */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Monitor className="h-4 w-4 text-primary" />
                  <Label className="text-sm font-medium text-foreground">
                    Daily Screen Time (hours)
                  </Label>
                  <Badge variant="secondary" className="ml-auto text-xs tabular-nums">
                    {screenTime} hrs
                  </Badge>
                </div>
                <Slider
                  value={[screenTime]}
                  onValueChange={(val) => setScreenTime(val[0])}
                  min={1}
                  max={16}
                  step={0.5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1 hr</span>
                  <span>16 hrs</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* ── QUESTION STEP ── */}
        {!isDemographicsStep && currentQuestion && (
          <div className="flex flex-col gap-4">
            {/* Group header — only shown when group changes */}
            {isNewGroup && (() => {
              const meta = GROUP_META[currentQuestion.group];
              return (
                <div className={`rounded-xl border p-4 animate-fade-in ${meta.color}`}>
                  <p className={`text-xs font-bold uppercase tracking-widest mb-0.5 ${meta.textColor}`}>
                    {meta.label}
                  </p>
                  <p className="text-sm text-muted-foreground">{meta.instruction}</p>
                </div>
              );
            })()}

            {/* Question card */}
            <Card
              key={currentQuestion.id}
              className="border-border/60 shadow-md animate-fade-in"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[hsl(var(--soft-green))]">
                    <Leaf className="h-5 w-5 text-primary" />
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {currentQuestion.group} · {questionIndex + 1}/{questions.length}
                  </Badge>
                </div>
                <CardTitle className="font-heading text-xl leading-relaxed text-foreground">
                  {currentQuestion.text}
                </CardTitle>
                {submitAttempted && !isAnswered(currentQuestion) && (
                  <div className="flex items-center gap-1.5 mt-2 text-red-500 text-xs">
                    <AlertCircle className="h-3.5 w-3.5" />
                    Please select an answer to continue.
                  </div>
                )}
              </CardHeader>

              <CardContent>
                <RadioGroup
                  value={answers[currentQuestion.id] !== undefined ? String(answers[currentQuestion.id]) : ""}
                  onValueChange={handleAnswer}
                  className="gap-3"
                >
                  {currentQuestion.options.map((opt) => {
                    const isSelected = answers[currentQuestion.id] === opt.value;
                    return (
                      <Label
                        key={opt.value}
                        htmlFor={`opt-${currentQuestion.id}-${opt.value}`}
                        className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-150 ${
                          isSelected
                            ? "border-primary bg-[hsl(var(--soft-green))] shadow-sm"
                            : "border-border bg-muted/20 hover:border-primary/40 hover:bg-[hsl(var(--soft-green)/0.3)]"
                        }`}
                      >
                        <RadioGroupItem
                          value={String(opt.value)}
                          id={`opt-${currentQuestion.id}-${opt.value}`}
                        />
                        <span className="text-sm font-normal text-foreground">{opt.label}</span>
                        {isSelected && (
                          <CheckCircle2 className="h-4 w-4 text-primary ml-auto shrink-0" />
                        )}
                      </Label>
                    );
                  })}
                </RadioGroup>
              </CardContent>
            </Card>
          </div>
        )}

        {/* ── NAVIGATION ── */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0}
            className="gap-2"
          >
            <ChevronLeft className="h-4 w-4" /> Back
          </Button>

          {currentStep < totalSteps - 1 ? (
            <Button
              onClick={handleNext}
              disabled={!isDemographicsStep && !isCurrentAnswered}
              className="gap-2"
            >
              Next <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={submitting}
              className="gap-2 bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent)/0.9)] text-white"
            >
              Submit <CheckCircle2 className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* ── DOT NAVIGATION ── */}
        <div className="flex justify-center gap-1.5 mt-8 flex-wrap">
          {/* Demographics dot */}
          <button
            onClick={() => setCurrentStep(DEMOGRAPHICS_STEP)}
            className={`h-2 rounded-full transition-all ${
              currentStep === DEMOGRAPHICS_STEP
                ? "w-6 bg-[hsl(var(--accent))]"
                : "w-2 bg-[hsl(var(--accent)/0.4)]"
            }`}
            aria-label="Go to details step"
          />
          {/* Question dots */}
          {questions.map((q, i) => (
            <button
              key={q.id}
              onClick={() => setCurrentStep(i + 1)}
              className={`h-2 rounded-full transition-all ${
                i + 1 === currentStep
                  ? "w-6 bg-primary"
                  : answers[q.id] !== undefined
                  ? "w-2 bg-primary/50"
                  : "w-2 bg-border"
              }`}
              aria-label={`Go to question ${i + 1}`}
            />
          ))}
        </div>

        {/* Completion indicator */}
        {!isDemographicsStep && (
          <p className="text-center text-xs text-muted-foreground mt-4">
            {Object.keys(answers).length} of {questions.length} questions answered
          </p>
        )}
      </div>
    </div>
  );
}