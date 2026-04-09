// src/pages/ResultPage.jsx
// ─────────────────────────────────────────────────────────────────────────────
// TODO: Replace this placeholder result with the actual prediction returned by
//       the ML model API. The result object should contain:
//         - riskLevel: "low" | "moderate" | "high"
//         - score: number (e.g., PHQ-9 score)
//         - recommendation: string
// ─────────────────────────────────────────────────────────────────────────────

import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Brain,
  AlertCircle,
  RefreshCw,
  HeartPulse,
  Phone,
  BookOpen,
  ArrowLeft,
} from "lucide-react";

const resources = [
  { icon: <Phone className="h-4 w-4" />, title: "iCall Helpline", desc: "9152987821", href: "#" },
  { icon: <HeartPulse className="h-4 w-4" />, title: "Vandrevala Foundation", desc: "1860-2662-345", href: "#" },
  { icon: <BookOpen className="h-4 w-4" />, title: "PHQ-9 Screener Info", desc: "phqscreeners.com", href: "https://www.phqscreeners.com/" },
];

export default function ResultPage() {
  const location = useLocation();
  const answers = location.state?.answers || {};

  // TODO: Replace dummy values below with real API response
  const placeholderResult = {
    riskLevel: "moderate",
    score: 8,
    label: "Moderate Symptoms",
    description:
      "Based on your responses, you may be experiencing moderate depressive symptoms. This is a placeholder result — the ML model is not yet connected.",
    color: "amber",
  };

  const riskColors = {
    low:      { badge: "secondary", ring: "border-green-500/40  bg-green-500/5",  icon: "text-green-500",  dot: "bg-green-500" },
    moderate: { badge: "outline",   ring: "border-amber-500/40  bg-amber-500/5",  icon: "text-amber-500",  dot: "bg-amber-500" },
    high:     { badge: "destructive", ring: "border-red-500/40  bg-red-500/5",    icon: "text-red-500",    dot: "bg-red-500"   },
  };

  const colors = riskColors[placeholderResult.riskLevel];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-[hsl(var(--calm)/0.04)] flex flex-col">
      <div className="mx-auto max-w-2xl w-full px-6 py-14 flex-1">
        {/* Back */}
        <Button variant="ghost" size="sm" asChild className="mb-8 -ml-2 gap-2 text-muted-foreground">
          <Link to="/questionnaire">
            <ArrowLeft className="h-4 w-4" /> Retake Assessment
          </Link>
        </Button>

        {/* Result card */}
        <Card className={`border-2 ${colors.ring} shadow-xl mb-8`}>
          <CardHeader className="text-center pb-4 pt-10">
            <div className="flex justify-center mb-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 relative">
                <Brain className="h-10 w-10 text-primary" />
                <span className={`absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full ${colors.dot} shadow-md`} />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-foreground">{placeholderResult.label}</CardTitle>
            <CardDescription className="mt-1">
              PHQ-9 Equivalent Score:{" "}
              <span className="font-semibold text-foreground">{placeholderResult.score} / 27</span>
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-6 pb-8">
            {/* Placeholder notice */}
            <div className="flex items-start gap-3 p-4 rounded-xl border border-amber-500/30 bg-amber-500/5">
              <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-amber-600 dark:text-amber-400">Model Coming Soon</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {placeholderResult.description}
                  {/* TODO: Remove this notice and render real ML prediction result here */}
                </p>
              </div>
            </div>

            <Separator />

            {/* Dummy answer summary */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">Your Responses</h3>
              <div className="flex flex-col gap-2">
                {Object.entries(answers).map(([qId, val]) => (
                  <div key={qId} className="flex justify-between items-center p-3 rounded-lg bg-muted/40 text-sm">
                    <span className="text-muted-foreground capitalize">{qId.replace("q", "Question ")}</span>
                    <Badge variant="secondary">Score: {val}</Badge>
                  </div>
                ))}
                {Object.keys(answers).length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">No answers found. Please complete the assessment first.</p>
                )}
              </div>
            </div>

            <Separator />

            {/* Resources */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">Mental Health Resources</h3>
              <div className="flex flex-col gap-3">
                {resources.map((r) => (
                  <a key={r.title} href={r.href} target="_blank" rel="noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl border border-border/60 hover:border-primary/30 hover:bg-primary/5 transition-all group">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
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
        <p className="text-xs text-center text-muted-foreground px-4">
          ⚠️ MindCheck is not a diagnostic tool. Results are not a substitute for professional psychiatric evaluation. If you are in crisis, please call a helpline immediately.
        </p>

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
