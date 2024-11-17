import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import ChatInterface from './components/ChatInterface';
import OnboardingFlow from './components/OnboardingFlow';
import LoginPage from './components/auth/LoginPage';
import HelpPage from './components/pages/HelpPage';
import ContactPage from './components/pages/ContactPage';
import TeamPage from './components/pages/TeamPage';
import TermsPage from './components/pages/TermsPage';
import PrivacyPage from './components/pages/PrivacyPage';
import FeaturesPage from './components/pages/FeaturesPage';
import { useAuth } from './contexts/AuthContext';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? <>{children}</> : <Navigate to="/login" />;
}

function HomePage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Footer />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <main className="relative min-h-screen flex flex-col">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/onboarding" element={<OnboardingFlow />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route 
              path="/chat" 
              element={
                <PrivateRoute>
                  <ChatInterface />
                </PrivateRoute>
              } 
            />
          </Routes>
        </main>
      </Router>
    </AuthProvider>
  );
}

export default App;