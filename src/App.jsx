// src/App.jsx
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/routes/ProtectedRoute";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Pages
import LandingPage from "@/pages/LandingPage";
import DatasetAnalysis from "@/pages/DatasetAnalysis";
import QuestionnairePage from "@/pages/QuestionnairePage";
import ResultPage from "@/pages/ResultPage";
import AuthPage from "@/pages/AuthPage";

export default function App() {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="flex-1">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/dataset" element={<DatasetAnalysis />} />
            <Route path="/login" element={<AuthPage />} />

            {/* Protected routes — require authentication */}
            <Route
              path="/questionnaire"
              element={
                <ProtectedRoute>
                  <QuestionnairePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/result"
              element={
                <ProtectedRoute>
                  <ResultPage />
                </ProtectedRoute>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<LandingPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}
