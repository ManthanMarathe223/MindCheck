// src/pages/LandingPage.jsx
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  BarChart3,
  ClipboardList,
  ShieldCheck,
  Sparkles,
  Users,
  ArrowRight,
  HeartPulse,
  GraduationCap,
  Leaf,
  CloudRain,
  Sun,
} from "lucide-react";

const steps = [
  {
    icon: <ClipboardList className="h-6 w-6" />,
    title: "Take the Assessment",
    desc: "Answer a short, evidence-based questionnaire about your recent mood, sleep, and energy levels.",
  },
  {
    icon: <Brain className="h-6 w-6" />,
    title: "AI Analysis",
    desc: "Our machine learning model analyzes your responses against a curated depression dataset.",
  },
  {
    icon: <HeartPulse className="h-6 w-6" />,
    title: "Get Insights",
    desc: "Receive a personalized risk insight and guidance on next steps — privately and securely.",
  },
];

const team = [
  { name: "Team Member 1", role: "ML & Backend", initial: "A" },
  { name: "Team Member 2", role: "Frontend & UI", initial: "B" },
  { name: "Team Member 3", role: "Data Analysis", initial: "C" },
  { name: "Team Member 4", role: "Research Lead", initial: "D" },
];

const stats = [
  { value: "1,000+", label: "Dataset Records" },
  { value: "5", label: "Assessment Questions" },
  { value: "92%", label: "Model Accuracy (placeholder)" },
  { value: "100%", label: "Private & Secure" },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-[hsl(var(--calm)/0.08)] py-24 md:py-36">
        {/* Background decoration — soft calming blobs */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-1/4 h-72 w-72 rounded-full bg-[hsl(var(--calm)/0.1)] blur-3xl" />
          <div className="absolute bottom-10 right-1/4 h-96 w-96 rounded-full bg-[hsl(var(--hope)/0.08)] blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-[hsl(var(--serenity)/0.06)] blur-3xl" />
        </div>

        <div className="mx-auto max-w-6xl px-6 text-center">
          <Badge variant="outline" className="mb-6 gap-2 border-primary/30 text-primary px-4 py-1.5">
            <Leaf className="h-3.5 w-3.5" />
            Community Engagement Project · PCCOE 2024–25
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6">
            Your Mental Health{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(var(--calm))] to-[hsl(var(--hope))]">
              Matters
            </span>
            <br />
            <span className="text-4xl md:text-5xl font-semibold text-muted-foreground">
              Early Detection Saves Lives
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            MindCheck uses machine learning to analyze depression risk factors.
            Take an evidence-based self-assessment and gain meaningful insights — in a safe, private space.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gap-2 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow" asChild>
              <Link to="/login?tab=signup">
                Start Assessment <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/dataset">View Dataset Analysis</Link>
            </Button>
          </div>

          {/* Stats row */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col gap-1">
                <span className="text-3xl font-bold text-primary">{s.value}</span>
                <span className="text-sm text-muted-foreground">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awareness Banner */}
      <section className="py-10 bg-gradient-to-r from-[hsl(var(--calm)/0.08)] via-background to-[hsl(var(--hope)/0.08)]">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <CloudRain className="h-5 w-5 text-[hsl(var(--serenity))]" />
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Did You Know?</span>
            <Sun className="h-5 w-5 text-[hsl(var(--warmth))]" />
          </div>
          <p className="text-lg text-foreground font-medium leading-relaxed">
            Depression affects over <span className="text-primary font-bold">280 million</span> people worldwide.
            Yet nearly <span className="text-[hsl(var(--hope))] font-bold">75%</span> of people in developing countries
            receive <span className="underline decoration-primary/40 underline-offset-4">no treatment</span> at all.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Early screening can make a real difference. You're not alone.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-muted/30" id="how-it-works">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">How It Works</Badge>
            <h2 className="text-4xl font-bold text-foreground mb-4">Three Simple Steps</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Our process is designed to be quick, private, and meaningful — helping you understand your mental well-being in minutes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <Card key={i} className="border-border/60 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group">
                <CardContent className="pt-8 pb-8 flex flex-col items-center text-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    {step.icon}
                  </div>
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-bold text-muted-foreground">
                    {i + 1}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-4">Why MindCheck</Badge>
              <h2 className="text-4xl font-bold text-foreground mb-6">
                Research-Backed,<br />Privacy-First
              </h2>
              <div className="flex flex-col gap-6">
                {[
                  { icon: <ShieldCheck className="h-5 w-5 text-primary" />, title: "Private & Secure", desc: "Your responses are never shared. All analysis happens securely." },
                  { icon: <BarChart3 className="h-5 w-5 text-primary" />, title: "Data-Driven", desc: "Built on a real depression dataset with rigorous statistical analysis." },
                  { icon: <GraduationCap className="h-5 w-5 text-primary" />, title: "Academically Grounded", desc: "Aligned with established PHQ-9 and GAD-7 clinical screening tools." },
                ].map((f) => (
                  <div key={f.title} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      {f.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{f.title}</h4>
                      <p className="text-sm text-muted-foreground">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual card */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--calm)/0.2)] to-[hsl(var(--hope)/0.2)] rounded-3xl blur-xl" />
              <Card className="relative border-border/60 bg-card/80 backdrop-blur-sm">
                <CardContent className="pt-8 pb-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                      <Brain className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">Assessment Preview</p>
                      <p className="text-xs text-muted-foreground">5 questions · ~2 minutes</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {["Mood & Feelings", "Sleep Quality", "Energy Levels", "Concentration", "Interest in Activities"].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                        <span className="text-sm text-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-muted/30" id="team">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 gap-2">
              <Users className="h-3.5 w-3.5" /> Our Team
            </Badge>
            <h2 className="text-4xl font-bold text-foreground mb-4">Meet the Team</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              A multidisciplinary group of engineering students passionate about using technology for mental health awareness.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((member) => (
              <Card key={member.name} className="border-border/60 hover:border-primary/30 hover:shadow-md transition-all text-center group">
                <CardContent className="pt-8 pb-6 flex flex-col items-center gap-3">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[hsl(var(--calm))] to-[hsl(var(--hope))] text-white text-xl font-bold shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-shadow">
                    {member.initial}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{member.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{member.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-[hsl(var(--calm)/0.1)] via-background to-[hsl(var(--hope)/0.1)]">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <div className="flex justify-center mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <HeartPulse className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Ready to Check In<br />with Your Mind?
          </h2>
          <p className="text-lg text-muted-foreground mb-10">
            Taking care of your mental health is a sign of strength. It takes less than 2 minutes and is completely free.
          </p>
          <Button size="lg" className="gap-2 shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-shadow" asChild>
            <Link to="/login?tab=signup">
              Get Started for Free <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <p className="mt-4 text-xs text-muted-foreground">
            Not a substitute for professional medical advice. If you're in crisis, please reach out to a helpline.
          </p>
        </div>
      </section>
    </div>
  );
}
