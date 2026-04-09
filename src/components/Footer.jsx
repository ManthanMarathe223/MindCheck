// src/components/Footer.jsx
import { Brain, Heart, Phone } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background mt-auto">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Brain className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-foreground">
                Mind<span className="text-primary">Check</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              A community engagement project for early depression detection using machine learning. Your mental health matters.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold text-foreground">Quick Links</h4>
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Home</Link>
            <Link to="/dataset" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Dataset Analysis</Link>
            <Link to="/questionnaire" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Self Assessment</Link>
          </div>

          {/* Crisis Resources */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5 text-primary" />
              Crisis Helplines
            </h4>
            <p className="text-sm text-muted-foreground">
              <strong>iCall:</strong> 9152987821
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Vandrevala Foundation:</strong> 1860-2662-345
            </p>
            <p className="text-xs text-muted-foreground mt-1 italic">
              If you or someone you know is in crisis, please reach out immediately.
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 rounded-xl bg-muted/50 border border-border/60">
          <p className="text-xs text-muted-foreground text-center">
            <strong>Disclaimer:</strong> MindCheck is a research project and not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of a qualified healthcare professional for clinical concerns.
          </p>
        </div>

        <div className="mt-8 border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            Made with <Heart className="h-3 w-3 text-[hsl(var(--warmth))] fill-[hsl(var(--warmth))]" /> by the MindCheck Team · PCCOE CEP 2024–25
          </p>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} MindCheck. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
