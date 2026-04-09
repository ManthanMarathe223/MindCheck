// src/pages/QuestionnairePage.jsx
// ─────────────────────────────────────────────────────────────────────────────
// TODO: Replace sample questions (from @/data/questions.js) with full
//       validated GAD-7 or PHQ-9 questionnaire once approved.
// TODO: On submit, replace placeholder result with an actual ML model API call.
//       API endpoint will go here: POST /api/predict  { answers: [...] }
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { questions } from "@/data/questions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Brain, ChevronRight, ChevronLeft, CheckCircle2, Clock, AlertCircle } from "lucide-react";

export default function QuestionnairePage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep) / questions.length) * 100;
  const isAnswered = !!answers[currentQuestion?.id];
  const allAnswered = questions.every((q) => answers[q.id]);

  const handleAnswer = (value) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) setCurrentStep((s) => s + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  };

  const handleSubmit = () => {
    // TODO: Replace this block with a real ML model API call
    // Example:
    //   const response = await fetch("/api/predict", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ answers }),
    //   });
    //   const result = await response.json();
    //   navigate("/result", { state: { result } });
    setSubmitted(true);
  };

  const handleViewResult = () => {
    navigate("/result", { state: { answers } });
  };

  // ── Submitted / result preview ──────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card className="max-w-md w-full border-border/60 shadow-xl text-center">
          <CardContent className="pt-10 pb-10 flex flex-col items-center gap-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle2 className="h-10 w-10 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Assessment Complete</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Your responses have been recorded. The ML model analysis will be available once the prediction endpoint is integrated.
              </p>
            </div>

            {/* TODO: Remove this placeholder card and show real ML result once model is connected */}
            <Card className="w-full border-dashed border-amber-500/50 bg-amber-500/5">
              <CardContent className="pt-4 pb-4 flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                <div className="text-left">
                  <p className="text-sm font-semibold text-amber-600 dark:text-amber-400">Model Coming Soon</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Your answers have been saved. The depression risk prediction model is currently under development.
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => { setSubmitted(false); setCurrentStep(0); setAnswers({}); }}>
                Retake
              </Button>
              <Button onClick={handleViewResult}>
                View Result Page
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ── Questionnaire ────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="border-b border-border bg-gradient-to-r from-[hsl(var(--calm)/0.06)] via-muted/20 to-[hsl(var(--hope)/0.06)] py-10">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <Badge variant="secondary" className="mb-3 gap-2">
            <Clock className="h-3 w-3" /> ~2 minutes
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Mental Health Assessment</h1>
          <p className="text-muted-foreground text-sm">
            Answer honestly. Your responses are private and not stored on any external server.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-2xl px-6 py-12">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-muted-foreground font-medium">
              Question {currentStep + 1} of {questions.length}
            </span>
            <span className="text-xs text-primary font-semibold">{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question card */}
        <Card className="border-border/60 shadow-md">
          <CardHeader className="pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 mb-4">
              <Brain className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="text-xl leading-relaxed text-foreground">
              {currentQuestion.text}
            </CardTitle>
            <CardDescription>Over the last 2 weeks</CardDescription>
          </CardHeader>

          <CardContent>
            <RadioGroup
              value={answers[currentQuestion.id] || ""}
              onValueChange={handleAnswer}
              className="gap-3"
            >
              {currentQuestion.options.map((opt) => (
                <Label
                  key={opt.value}
                  htmlFor={`opt-${opt.value}`}
                  className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-150 ${
                    answers[currentQuestion.id] === opt.value
                      ? "border-primary bg-primary/5"
                      : "border-border bg-muted/20 hover:border-primary/40 hover:bg-primary/5"
                  }`}
                >
                  <RadioGroupItem value={opt.value} id={`opt-${opt.value}`} />
                  <span className="text-sm font-normal text-foreground">{opt.label}</span>
                </Label>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0}
            className="gap-2"
          >
            <ChevronLeft className="h-4 w-4" /> Back
          </Button>

          {currentStep < questions.length - 1 ? (
            <Button onClick={handleNext} disabled={!isAnswered} className="gap-2">
              Next <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={!allAnswered} className="gap-2">
              Submit <CheckCircle2 className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Question dots nav */}
        <div className="flex justify-center gap-2 mt-8">
          {questions.map((q, i) => (
            <button
              key={i}
              onClick={() => setCurrentStep(i)}
              className={`h-2 rounded-full transition-all ${
                i === currentStep ? "w-6 bg-primary" : answers[q.id] ? "w-2 bg-primary/50" : "w-2 bg-border"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
