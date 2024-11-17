import React from 'react';
import { UtensilsCrossed, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function HeroSection() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleHungryClick = () => {
    if (user) {
      navigate('/chat');
    } else {
      navigate('/onboarding');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-4 top-1/4 w-24 h-24 bg-primary/20 rounded-full blur-xl opacity-60" />
        <div className="absolute right-1/4 bottom-1/4 w-32 h-32 bg-secondary/20 rounded-full blur-xl opacity-60" />
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="flex justify-center">
            <div className="p-3 bg-white rounded-2xl shadow-xl">
              <UtensilsCrossed className="w-12 h-12 text-primary" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-heading font-bold text-textColor">
            Hungry for
            <span className="text-primary"> Ideas?</span>
          </h1>
          
          <p className="max-w-xl mx-auto text-xl font-body text-textColor/80">
            Let our AI chef inspire your next meal with personalized recommendations
          </p>

          <button 
            onClick={handleHungryClick}
            className="group relative inline-flex items-center justify-center px-8 py-4 text-xl font-heading font-bold text-white bg-primary rounded-full overflow-hidden transition-all duration-300 ease-out hover:bg-primary-hover hover:scale-105 hover:shadow-xl active:scale-95"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"/>
            <Sparkles className="w-6 h-6 mr-2 animate-pulse" />
            <span className="relative">I'M HUNGRY</span>
          </button>

          <div className="pt-8 flex justify-center space-x-6">
            <div className="text-center">
              <div className="text-3xl font-heading font-bold text-textColor">10k+</div>
              <div className="text-sm font-body text-textColor/70">Recipe Ideas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-heading font-bold text-textColor">24/7</div>
              <div className="text-sm font-body text-textColor/70">AI Assistant</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-heading font-bold text-textColor">100%</div>
              <div className="text-sm font-body text-textColor/70">Personalized</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}