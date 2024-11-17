import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Leaf, Cookie, ThumbsUp, ThumbsDown, Mail, 
  Timer, Smile, AlertCircle, Globe, ChefHat, Clock
} from 'lucide-react';
import WelcomeScreen from './onboarding/WelcomeScreen';
import DietarySelector from './onboarding/DietarySelector';
import CuisineSelector from './onboarding/CuisineSelector';
import SignUpForm from './auth/SignUpForm';
import Footer from './Footer';
import OnboardingHeader from './onboarding/OnboardingHeader';
import { Preference } from './onboarding/types';
import { UserPreferences } from '../lib/supabase';

export default function OnboardingFlow() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [userPreferences, setUserPreferences] = useState<UserPreferences | null>(null);
  
  // State for all preferences
  const [dietaryRestrictions, setDietaryRestrictions] = useState<Preference[]>([
    { id: 'vegetarian', label: '🌱 Vegetarian', selected: false },
    { id: 'vegan', label: '🥑 Vegan', selected: false },
    { id: 'glutenFree', label: '🍞 Gluten-Free', selected: false },
    { id: 'dairyFree', label: '🧀 Dairy-Free', selected: false },
    { id: 'noRestrictions', label: '🍗 No Restrictions', selected: false },
  ]);

  const [cuisinePreferences, setCuisinePreferences] = useState<Preference[]>([
    { id: 'italian', label: 'Italian', selected: false },
    { id: 'mexican', label: 'Mexican', selected: false },
    { id: 'french', label: 'French', selected: false },
    { id: 'asian', label: 'Asian', selected: false },
    { id: 'mediterranean', label: 'Mediterranean', selected: false },
    { id: 'american', label: 'American', selected: false },
    { id: 'middleEastern', label: 'Middle Eastern', selected: false },
  ]);

  const [cookingLevel, setCookingLevel] = useState('');
  const [timeAvailability, setTimeAvailability] = useState('');
  const [lovedIngredients, setLovedIngredients] = useState('');
  const [dislikedIngredients, setDislikedIngredients] = useState('');
  const [moodBased, setMoodBased] = useState(false);
  const [otherCuisines, setOtherCuisines] = useState('');

  const steps = [
    {
      title: 'Welcome',
      subtitle: '',
      icon: null,
      content: <WelcomeScreen onStart={() => setStep(step + 1)} />
    },
    {
      title: 'Dietary Preferences',
      subtitle: 'First things first—do you have any dietary preferences or restrictions we should keep in mind?',
      icon: Leaf,
      content: (
        <DietarySelector
          restrictions={dietaryRestrictions}
          onChange={setDietaryRestrictions}
        />
      )
    },
    {
      title: 'Favorite Cuisines',
      subtitle: 'Now, let\'s talk flavors. What cuisines make your taste buds dance?',
      icon: Globe,
      content: (
        <div className="space-y-4">
          <CuisineSelector
            cuisines={cuisinePreferences}
            onChange={setCuisinePreferences}
            maxSelections={3}
          />
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Other cuisines you love?
            </label>
            <input
              type="text"
              value={otherCuisines}
              onChange={(e) => setOtherCuisines(e.target.value)}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              placeholder="E.g., Korean, Spanish, etc."
            />
          </div>
        </div>
      )
    },
    {
      title: 'Cooking Experience',
      subtitle: 'How confident are you in the kitchen?',
      icon: ChefHat,
      content: (
        <div className="grid grid-cols-1 gap-3">
          {[
            { id: 'beginner', label: '🔪 Beginner', desc: 'I need easy peasy recipes' },
            { id: 'intermediate', label: '🍳 Intermediate', desc: "I'm comfortable with most dishes" },
            { id: 'advanced', label: '👩‍🍳 Advanced', desc: "I'm basically a pro at this" }
          ].map((level) => (
            <button
              key={level.id}
              onClick={() => setCookingLevel(level.id)}
              className={`p-6 rounded-xl border-2 transition-all ${
                cookingLevel === level.id
                  ? 'border-orange-500 bg-orange-50 text-orange-700'
                  : 'border-gray-200 hover:border-orange-200'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="text-left">
                  <p className="font-semibold text-lg">{level.label}</p>
                  <p className="text-sm text-gray-600">{level.desc}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      )
    },
    {
      title: 'Time Availability',
      subtitle: 'How much time do you usually have to whip up something tasty?',
      icon: Clock,
      content: (
        <div className="grid grid-cols-1 gap-3">
          {[
            { id: 'quick', label: '⏱ Quick Bites', time: 'Less than 15 minutes' },
            { id: 'medium', label: '⏲️ Regular Cooking', time: '15-30 minutes' },
            { id: 'long', label: '⏳ Leisure Cooking', time: 'More than 30 minutes' }
          ].map((timeOption) => (
            <button
              key={timeOption.id}
              onClick={() => setTimeAvailability(timeOption.id)}
              className={`p-6 rounded-xl border-2 transition-all ${
                timeAvailability === timeOption.id
                  ? 'border-orange-500 bg-orange-50 text-orange-700'
                  : 'border-gray-200 hover:border-orange-200'
              }`}
            >
              <div className="text-left">
                <p className="font-semibold text-lg">{timeOption.label}</p>
                <p className="text-sm text-gray-600">{timeOption.time}</p>
              </div>
            </button>
          ))}
        </div>
      )
    },
    {
      title: 'Ingredient Preferences',
      subtitle: 'Any ingredients you love or hate?',
      icon: Cookie,
      content: (
        <div className="space-y-6">
          <div className="space-y-6">
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-3">
                ❤️ Ingredients you love
              </label>
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={lovedIngredients}
                  onChange={(e) => setLovedIngredients(e.target.value)}
                  className="flex-1 h-12 px-4 rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 text-base"
                  placeholder="E.g., garlic, avocado, cheese"
                />
              </div>
            </div>
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-3">
                🚫 Ingredients you dislike
              </label>
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={dislikedIngredients}
                  onChange={(e) => setDislikedIngredients(e.target.value)}
                  className="flex-1 h-12 px-4 rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 text-base"
                  placeholder="E.g., mushrooms, olives"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center pt-4">
            <button
              onClick={() => setStep(Math.max(0, step - 1))}
              className="px-6 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors duration-200"
            >
              Back
            </button>
            <button
              onClick={() => setStep(step + 1)}
              className="px-8 py-2.5 rounded-lg text-white bg-primary hover:bg-primary-hover transition-colors duration-200"
            >
              {lovedIngredients || dislikedIngredients ? 'Next' : 'Skip'}
            </button>
          </div>
        </div>
      )
    },
    {
      title: 'Mood-Based Cooking',
      subtitle: 'Do your meal choices depend on your mood?',
      icon: Smile,
      content: (
        <div className="grid grid-cols-1 gap-3">
          <button
            onClick={() => setMoodBased(true)}
            className={`p-6 rounded-xl border-2 transition-all ${
              moodBased === true
                ? 'border-orange-500 bg-orange-50 text-orange-700'
                : 'border-gray-200 hover:border-orange-200'
            }`}
          >
            <p className="font-semibold">😎 Yes, my meals match my mood!</p>
          </button>
          <button
            onClick={() => setMoodBased(false)}
            className={`p-6 rounded-xl border-2 transition-all ${
              moodBased === false
                ? 'border-orange-500 bg-orange-50 text-orange-700'
                : 'border-gray-200 hover:border-orange-200'
            }`}
          >
            <p className="font-semibold">🤷‍♀️ Nah, food is food</p>
          </button>
        </div>
      )
    },
    {
      title: 'Create Your Account',
      subtitle: 'Almost there! Let\'s save your preferences.',
      icon: Mail,
      content: userPreferences ? (
        <SignUpForm
          preferences={userPreferences}
          onSuccess={() => navigate('/chat')}
        />
      ) : (
        <div>Loading...</div>
      )
    }
  ];

  const handleComplete = () => {
    const preferences: UserPreferences = {
      dietary: dietaryRestrictions.filter(r => r.selected).map(r => r.id),
      cuisines: [
        ...cuisinePreferences.filter(c => c.selected).map(c => c.id),
        ...(otherCuisines ? [otherCuisines] : [])
      ],
      cooking_level: cookingLevel,
      time_availability: timeAvailability,
      ingredients: {
        loved: lovedIngredients.split(',').map(i => i.trim()).filter(Boolean),
        disliked: dislikedIngredients.split(',').map(i => i.trim()).filter(Boolean)
      },
      mood_based: moodBased
    };

    setUserPreferences(preferences);
    setStep(steps.length - 1);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <OnboardingHeader />
      
      <div className="flex-grow bg-gradient-to-br from-orange-50 to-red-50 py-20 px-4">
        <div className="max-w-2xl mx-auto mt-16">
          {/* Progress bar */}
          <div className="mb-8">
            <div className="h-2 bg-gray-200 rounded-full">
              <div 
                className="h-full bg-orange-500 rounded-full transition-all duration-500"
                style={{ width: `${((step + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {step === 0 ? (
              steps[0].content
            ) : (
              <>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="p-3 bg-orange-100 rounded-xl">
                    {steps[step].icon && React.createElement(steps[step].icon, { 
                      className: "w-6 h-6 text-orange-500"
                    })}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {steps[step].title}
                    </h2>
                    <p className="text-gray-600">{steps[step].subtitle}</p>
                  </div>
                </div>

                <div className="mb-8">
                  {steps[step].content}
                </div>

                {step < steps.length - 2 && step !== 5 && (
                  <div className="flex justify-between">
                    <button
                      onClick={() => setStep(Math.max(0, step - 1))}
                      className="px-6 py-2 rounded-lg text-gray-600 hover:bg-gray-100"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setStep(step + 1)}
                      className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                    >
                      Next
                    </button>
                  </div>
                )}
                {step === steps.length - 2 && (
                  <div className="flex justify-between">
                    <button
                      onClick={() => setStep(Math.max(0, step - 1))}
                      className="px-6 py-2 rounded-lg text-gray-600 hover:bg-gray-100"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleComplete}
                      className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                    >
                      Complete
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}