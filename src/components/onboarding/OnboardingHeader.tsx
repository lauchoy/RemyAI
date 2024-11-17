import React from 'react';
import { ChefHat } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function OnboardingHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-16">
          <Link to="/" className="flex items-center">
            <ChefHat className="w-8 h-8 text-primary" />
            <span className="ml-2 text-xl font-heading font-bold text-textColor">RemyAI</span>
          </Link>
        </div>
      </div>
    </header>
  );
}