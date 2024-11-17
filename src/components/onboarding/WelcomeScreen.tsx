import React from 'react';
import { Heart, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface WelcomeScreenProps {
  onStart: () => void;
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="text-center space-y-8">
      <div className="absolute top-4 left-4">
        <Link 
          to="/" 
          className="inline-flex items-center text-gray-600 hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          <span className="font-body">Back to Home</span>
        </Link>
      </div>

      <div className="flex justify-center">
        <div className="p-4 bg-orange-100 rounded-full">
          <Heart className="w-8 h-8 text-primary" />
        </div>
      </div>
      
      <div className="space-y-4">
        <h1 className="text-4xl font-heading text-textColor">
          Welcome
        </h1>
        <p className="text-xl font-body text-textColor/80 max-w-md mx-auto leading-relaxed">
          Let's help you find the good stuff—recipes that match your taste, mood, and style. Ready to dive in?
        </p>
      </div>

      <button
        onClick={onStart}
        className="inline-flex items-center px-8 py-4 text-lg font-heading text-white bg-primary rounded-xl hover:bg-primary-hover transition-colors duration-200 transform hover:scale-105"
      >
        Let's Get Started
      </button>
    </div>
  );
}