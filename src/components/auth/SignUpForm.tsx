import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { supabase } from '../../lib/supabase';
import type { UserPreferences } from '../../lib/supabase';

const RATE_LIMIT_COOLDOWN = 60; // seconds

const signUpSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword']
});

interface SignUpFormProps {
  preferences: UserPreferences;
  onSuccess: () => void;
}

export default function SignUpForm({ preferences, onSuccess }: SignUpFormProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [cooldownTime, setCooldownTime] = useState(0);

  useEffect(() => {
    let timer: number;
    if (cooldownTime > 0) {
      timer = window.setInterval(() => {
        setCooldownTime(time => Math.max(0, time - 1));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [cooldownTime]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cooldownTime > 0) {
      setError(`Please wait ${cooldownTime} seconds before trying again`);
      return;
    }

    setError('');
    setLoading(true);

    try {
      // Validate form data
      signUpSchema.parse({ email, password, confirmPassword });

      // Transform preferences to match DB schema
      const dbPreferences = {
        dietary: preferences.dietary,
        cuisines: preferences.cuisines,
        cooking_level: preferences.cooking_level,
        time_availability: preferences.time_availability,
        loved_ingredients: preferences.ingredients.loved,
        disliked_ingredients: preferences.ingredients.disliked,
        mood_based: preferences.mood_based
      };

      // Sign up user with email confirmation disabled
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: {
          data: dbPreferences,
          emailRedirectTo: `${window.location.origin}/chat`
        }
      });

      if (authError) {
        console.error('Sign up error:', authError);
        
        if (authError.status === 429) {
          setCooldownTime(RATE_LIMIT_COOLDOWN);
          setError('Too many attempts. Please wait a minute before trying again.');
          return;
        }

        throw authError;
      }

      if (authData.user) {
        // Store user preferences
        const { error: preferencesError } = await supabase
          .from('user_preferences')
          .insert([{
            user_id: authData.user.id,
            ...dbPreferences
          }])
          .select()
          .single();

        if (preferencesError) {
          console.error('Failed to save preferences:', preferencesError);
          // Continue with sign up even if preferences fail to save
          // We can handle this later in the onboarding flow
        }

        // Redirect to chat immediately after signup
        navigate('/chat');
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-sm text-gray-600">
          Create an account to save your preferences and get personalized recommendations
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg">
            {error}
          </div>
        )}
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 border border-transparent rounded-lg shadow-sm text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>
    </div>
  );
}