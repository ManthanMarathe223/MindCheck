// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { LogOut, Menu, X, Moon, Sun, Leaf } from "lucide-react";
import { useState, useEffect } from "react";

const scrollTop = () => window.scrollTo({ top: 0, behavior: "instant" });

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/");
    scrollTop();
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/journey", label: "Our Journey" },
    { to: "/dataset", label: "Dataset Analysis" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass border-b border-border/50 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/" onClick={scrollTop} className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-md group-hover:shadow-lg transition-shadow">
            <Leaf className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-heading text-2xl font-bold text-foreground tracking-tight">
            Mind<span className="text-primary">Check</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={scrollTop}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side: theme toggle + auth + CTA */}
        <div className="hidden md:flex items-center gap-3">
          {/* Dark mode toggle */}
          <button
            id="theme-toggle-desktop"
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-border/60 bg-card hover:bg-muted text-muted-foreground hover:text-foreground transition-all duration-200"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          {user ? (
            <div className="flex items-center gap-3">
              {/* User avatar */}
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold uppercase">
                {user.email?.charAt(0) || "U"}
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2">
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/login" onClick={scrollTop}>Login</Link>
              </Button>
              <Button
                size="sm"
                asChild
                className="bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent)/0.9)] text-white shadow-md"
              >
                <Link to="/questionnaire" onClick={scrollTop}>Take the Test</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile: theme + hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            id="theme-toggle-mobile"
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-border/60 bg-card text-muted-foreground"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            className="text-muted-foreground hover:text-foreground"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-border bg-card px-6 py-4 flex flex-col gap-4 animate-fade-in">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm font-medium text-foreground"
              onClick={() => { setMenuOpen(false); scrollTop(); }}
            >
              {link.label}
            </Link>
          ))}
          {user ? (
            <Button variant="outline" size="sm" onClick={() => { handleLogout(); setMenuOpen(false); }}>
              <LogOut className="h-4 w-4 mr-2" /> Logout
            </Button>
          ) : (
            <div className="flex flex-col gap-2">
              <Button variant="ghost" size="sm" asChild onClick={() => { setMenuOpen(false); scrollTop(); }}>
                <Link to="/login">Login</Link>
              </Button>
              <Button
                size="sm"
                asChild
                className="bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent)/0.9)] text-white"
                onClick={() => { setMenuOpen(false); scrollTop(); }}
              >
                <Link to="/questionnaire">Take the Test</Link>
              </Button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
