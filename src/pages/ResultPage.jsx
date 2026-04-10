// src/pages/ResultPage.jsx
// ─────────────────────────────────────────────────────────────────────────────
// This page displays the ML model prediction from the Hugging Face API.
// The prediction object is passed via React Router location.state from
// the QuestionnairePage after a successful API call.
//
// TODO: Update the prediction parsing below if the API response format changes.
//       Current expected response: { prediction: string, score?: number, ... }
// ─────────────────────────────────────────────────────────────────────────────

import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Leaf,
  AlertCircle,
  RefreshCw,
  HeartPulse,
  Phone,
  BookOpen,
  ArrowLeft,
  CheckCircle2,
  ShieldAlert,
  Moon,
  Monitor,
  User,
} from "lucide-react";

const resources = [
  { icon: <Phone className="h-4 w-4" />, title: "iCall Helpline", desc: "9152987821", href: "tel:9152987821" },
  { icon: <HeartPulse className="h-4 w-4" />, title: "Vandrevala Foundation", desc: "1860-2662-345", href: "tel:18602662345" },
  { icon: <BookOpen className="h-4 w-4" />, title: "PHQ-9 Screener Info", desc: "phqscreeners.com", href: "https://www.phqscreeners.com/" },
];

/**
 * Determine risk level from the prediction object.
 * TODO: Adjust this logic based on your actual API response format.
 */
function parseResult(prediction, answers) {
  if (!prediction) {
    // Fallback if no prediction (API not available)
    const totalScore = Object.values(answers).reduce(
      (sum, v) => sum + parseInt(v, 10),
      0
    );
    const maxScore = Object.keys(answers).length * 3;
    const pct = totalScore / maxScore;

    return {
      label: pct < 0.33 ? "Not Depressed" : pct < 0.66 ? "Moderate Risk" : "Depressed",
      riskLevel: pct < 0.33 ? "low" : pct < 0.66 ? "moderate" : "high",
      score: totalScore,
      maxScore,
      description: "This result is based on a simple score calculation. The ML model prediction was not available.",
      isPlaceholder: true,
    };
  }

  // Parse the prediction from the API
  // TODO: Update these fields to match your actual API response keys
  const predLabel =
    prediction.prediction ||
    prediction.result ||
    prediction.label ||
    "Unknown";

  const score = prediction.score ?? prediction.confidence ?? null;

  // Determine risk level from prediction label
  const lowerLabel = predLabel.toLowerCase();
  let riskLevel = "moderate";
  if (lowerLabel.includes("not") || lowerLabel.includes("low") || lowerLabel.includes("no")) {
    riskLevel = "low";
  } else if (lowerLabel.includes("high") || lowerLabel.includes("severe")) {
    riskLevel = "high";
  } else if (lowerLabel.includes("depress") || lowerLabel.includes("yes") || lowerLabel.includes("moderate")) {
    riskLevel = "high";
  }

  const riskLabels = {
    low: "Not Depressed",
    moderate: "Moderate Risk — Consider Professional Guidance",
    high: "Depressed",
  };

  return {
    label: riskLabels[riskLevel],
    riskLevel,
    score,
    maxScore: null,
    description: `Model prediction: ${predLabel}${score != null ? ` (confidence: ${typeof score === "number" ? (score * 100).toFixed(1) + "%" : score})` : ""}`,
    isPlaceholder: false,
    rawPrediction: predLabel,
  };
}

export default function ResultPage() {
  const location = useLocation();
  const answers = location.state?.answers || {};
  const prediction = location.state?.prediction || null;
  const demographics = location.state?.demographics || null;

  const result = parseResult(prediction, answers);

  const riskColors = {
    low: {
      ring: "border-emerald-500/40 bg-emerald-500/5",
      icon: "text-emerald-500",
      dot: "bg-emerald-500",
      iconEl: <CheckCircle2 className="h-10 w-10 text-emerald-500" />,
      labelColor: "text-emerald-600",
    },
    moderate: {
      ring: "border-[hsl(var(--accent)/0.5)] bg-[hsl(var(--soft-peach))]",
      icon: "text-[hsl(var(--accent))]",
      dot: "bg-[hsl(var(--accent))]",
      iconEl: <AlertCircle className="h-10 w-10 text-[hsl(var(--accent))]" />,
      labelColor: "text-[hsl(var(--accent))]",
    },
    high: {
      ring: "border-red-500/40 bg-red-500/5",
      icon: "text-red-500",
      dot: "bg-red-500",
      iconEl: <ShieldAlert className="h-10 w-10 text-red-500" />,
      labelColor: "text-red-600",
    },
  };

  const colors = riskColors[result.riskLevel];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-[hsl(var(--soft-green)/0.3)] flex flex-col">
      <div className="mx-auto max-w-2xl w-full px-6 py-14 flex-1">
        {/* Back */}
        <Button variant="ghost" size="sm" asChild className="mb-8 -ml-2 gap-2 text-muted-foreground">
          <Link to="/questionnaire">
            <ArrowLeft className="h-4 w-4" /> Retake Assessment
          </Link>
        </Button>

        {/* ── Primary Result Card — Depressed / Not Depressed ── */}
        <Card className={`border-2 ${colors.ring} shadow-xl mb-8 animate-scale-in`}>
          <CardHeader className="text-center pb-4 pt-10">
            <div className="flex justify-center mb-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-background relative">
                {colors.iconEl}
                <span className={`absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full ${colors.dot} shadow-md`} />
              </div>
            </div>
            <CardTitle className={`font-heading text-3xl font-bold ${colors.labelColor}`}>
              {result.label}
            </CardTitle>
            {result.score != null && (
              <CardDescription className="mt-1">
                {result.maxScore
                  ? `Score: ${result.score} / ${result.maxScore}`
                  : `Confidence: ${typeof result.score === "number" ? (result.score * 100).toFixed(1) + "%" : result.score}`}
              </CardDescription>
            )}
          </CardHeader>

          <CardContent className="flex flex-col gap-6 pb-8">
            {/* Prediction detail */}
            <div className={`flex items-start gap-3 p-4 rounded-xl border ${
              result.isPlaceholder
                ? "border-[hsl(var(--accent)/0.3)] bg-[hsl(var(--soft-peach))]"
                : "border-primary/30 bg-[hsl(var(--soft-green))]"
            }`}>
              {result.isPlaceholder ? (
                <AlertCircle className="h-5 w-5 text-[hsl(var(--accent))] shrink-0 mt-0.5" />
              ) : (
                <Leaf className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              )}
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {result.isPlaceholder ? "Offline Result" : "ML Model Prediction"}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {result.description}
                </p>
                {result.rawPrediction && (
                  <Badge variant="secondary" className="mt-2">
                    {result.rawPrediction}
                  </Badge>
                )}
              </div>
            </div>

            <Separator />

            {/* Demographics summary */}
            {demographics && (
              <>
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3 font-heading">Your Profile</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/40 text-sm">
                      <Moon className="h-4 w-4 text-primary shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground">Sleep</p>
                        <p className="font-medium text-foreground">{demographics.sleepingHours} hrs</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/40 text-sm">
                      <Monitor className="h-4 w-4 text-primary shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground">Screen Time</p>
                        <p className="font-medium text-foreground">{demographics.screenTime} hrs</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/40 text-sm">
                      <User className="h-4 w-4 text-primary shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground">Age</p>
                        <p className="font-medium text-foreground">{demographics.age}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/40 text-sm">
                      <User className="h-4 w-4 text-primary shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground">Gender</p>
                        <p className="font-medium text-foreground">{demographics.gender}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />
              </>
            )}

            {/* Answer summary */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3 font-heading">Your Responses</h3>
              <div className="flex flex-col gap-2">
                {Object.entries(answers).map(([qId, val]) => {
                  // Build a friendly label from the question ID
                  const friendlyId = qId
                    .replace(/^phq(\d+)$/, "PHQ-9 · Q$1")
                    .replace(/^gad(\d+)$/, "GAD-7 · Q$1")
                    .replace(/^ucla(\d+)$/, "UCLA · Q$1")
                    .replace(/^mssq(\d+)$/, "MSSQ-40 · Q$1");
                  return (
                    <div key={qId} className="flex justify-between items-center p-3 rounded-lg bg-muted/40 text-sm">
                      <span className="text-muted-foreground">{friendlyId}</span>
                      <Badge variant="secondary">Score: {val}</Badge>
                    </div>
                  );
                })}
                {Object.keys(answers).length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">No answers found. Please complete the assessment first.</p>
                )}
              </div>
            </div>

            <Separator />

            {/* Resources */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3 font-heading">Mental Health Resources</h3>
              <div className="flex flex-col gap-3">
                {resources.map((r) => (
                  <a key={r.title} href={r.href} target="_blank" rel="noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl border border-border/60 hover:border-primary/30 hover:bg-[hsl(var(--soft-green)/0.3)] transition-all group">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[hsl(var(--soft-green))] text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      {r.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{r.title}</p>
                      <p className="text-xs text-muted-foreground">{r.desc}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <div className="flex items-start justify-center gap-2 text-xs text-center text-muted-foreground px-4">
          <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5 text-[hsl(var(--accent))]" />
          <p>MindCheck is not a diagnostic tool. Results are not a substitute for professional psychiatric evaluation. If you are in crisis, please call a helpline immediately.</p>
        </div>

        <div className="flex justify-center mt-6">
          <Button variant="outline" asChild className="gap-2">
            <Link to="/questionnaire">
              <RefreshCw className="h-4 w-4" /> Take Again
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
