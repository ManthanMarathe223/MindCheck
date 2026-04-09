// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Brain, LogOut, Menu, X, Moon, Sun } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary shadow-md group-hover:shadow-primary/40 transition-shadow">
            <Brain className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">
            Mind<span className="text-primary">Check</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Home
          </Link>
          <Link to="/dataset" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Dataset
          </Link>
          {user && (
            <Link to="/questionnaire" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Assessment
            </Link>
          )}
        </div>

        {/* Right side: theme toggle + auth */}
        <div className="hidden md:flex items-center gap-3">
          {/* Dark mode toggle */}
          <button
            id="theme-toggle-desktop"
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-all duration-200"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>

          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground truncate max-w-[180px]">{user.email}</span>
              <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2">
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/login">Log In</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/login?tab=signup">Get Started</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile: theme toggle + hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            id="theme-toggle-mobile"
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>
          <button className="text-muted-foreground" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-border bg-background px-6 py-4 flex flex-col gap-4">
          <Link to="/" className="text-sm font-medium" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/dataset" className="text-sm font-medium" onClick={() => setMenuOpen(false)}>Dataset</Link>
          {user && (
            <Link to="/questionnaire" className="text-sm font-medium" onClick={() => setMenuOpen(false)}>Assessment</Link>
          )}
          {user ? (
            <Button variant="outline" size="sm" onClick={() => { handleLogout(); setMenuOpen(false); }}>
              <LogOut className="h-4 w-4 mr-2" /> Logout
            </Button>
          ) : (
            <Button size="sm" asChild onClick={() => setMenuOpen(false)}>
              <Link to="/login">Get Started</Link>
            </Button>
          )}
        </div>
      )}
    </header>
  );
}
