// src/components/Footer.jsx
import { Heart, Phone } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="MindCheck" className="h-8 w-8 object-contain mix-blend-multiply dark:mix-blend-screen" />
              <span className="font-heading font-bold text-lg text-foreground">
                Mind<span className="text-primary">Check</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A community engagement project by PCCOE students — using technology to support mental health awareness.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold text-foreground font-heading">Navigate</h4>
            <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">Home</Link>
            <Link to="/journey" className="text-sm text-muted-foreground hover:text-primary transition-colors">Our Journey</Link>
            <Link to="/dataset" className="text-sm text-muted-foreground hover:text-primary transition-colors">Dataset Analysis</Link>
            <Link to="/questionnaire" className="text-sm text-muted-foreground hover:text-primary transition-colors">Self Assessment</Link>
          </div>

          {/* Crisis Resources */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold text-foreground font-heading flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5 text-[hsl(var(--accent))]" />
              Crisis Helplines
            </h4>
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">iCall:</strong> 9152987821
            </p>
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Vandrevala:</strong> 1860-2662-345
            </p>
            <p className="text-xs text-muted-foreground mt-1 italic">
              You're never alone. Reach out if you need help.
            </p>
          </div>

          {/* Disclaimer */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold text-foreground font-heading">Disclaimer</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              MindCheck is a research project and not a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional.
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            Made with <Heart className="h-3 w-3 text-[hsl(var(--accent))] fill-[hsl(var(--accent))]" /> by the MindCheck Team · PCCOE CEP 2026
          </p>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} MindCheck. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
