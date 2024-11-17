import React from 'react';
import { ArrowLeft, ChefHat, Brain, Clock, Heart, Sparkles, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';

export default function FeaturesPage() {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Recommendations",
      description: "Get personalized recipe suggestions based on your preferences, dietary restrictions, and cooking style.",
      benefits: [
        "Smart ingredient substitutions",
        "Personalized difficulty levels",
        "Dietary restriction aware"
      ]
    },
    {
      icon: Clock,
      title: "Time-Aware Cooking",
      description: "Find recipes that fit your schedule, whether you have 15 minutes or 2 hours.",
      benefits: [
        "Quick meal suggestions",
        "Prep time estimates",
        "Time-saving tips"
      ]
    },
    {
      icon: Heart,
      title: "Preference Learning",
      description: "Our AI learns from your interactions to better understand your taste preferences.",
      benefits: [
        "Taste profile creation",
        "Cuisine preferences",
        "Ingredient favorites"
      ]
    },
    {
      icon: MessageSquare,
      title: "Interactive Chat",
      description: "Chat with our AI chef for real-time cooking guidance and recipe suggestions.",
      benefits: [
        "24/7 assistance",
        "Step-by-step guidance",
        "Cooking tips"
      ]
    },
    {
      icon: Sparkles,
      title: "Creative Cooking",
      description: "Discover new recipes and get inspired with unique cooking suggestions.",
      benefits: [
        "Weekly recipe inspiration",
        "Seasonal recommendations",
        "Trending dishes"
      ]
    },
    {
      icon: ChefHat,
      title: "Skill Development",
      description: "Grow your cooking skills with recipes matched to your experience level.",
      benefits: [
        "Progressive difficulty",
        "Technique tutorials",
        "Cooking tips"
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 px-4 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="max-w-6xl mx-auto">
          <Link 
            to="/" 
            className="inline-flex items-center text-gray-600 hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            <span>Back to Home</span>
          </Link>

          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4">
              Powerful Features for Every Cook
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover how RemyAI makes cooking easier, more enjoyable, and perfectly tailored to you
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                
                <h2 className="text-2xl font-heading font-bold text-gray-900 mb-3">
                  {feature.title}
                </h2>
                
                <p className="text-gray-600 mb-6">
                  {feature.description}
                </p>
                
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              to="/onboarding"
              className="inline-flex items-center px-8 py-4 bg-primary text-white rounded-xl hover:bg-primary-hover transition-colors text-lg font-heading font-semibold"
            >
              Get Started Now
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}