import React from 'react';
import { Preference } from './types';

interface DietarySelectorProps {
  restrictions: Preference[];
  onChange: (updated: Preference[]) => void;
}

export default function DietarySelector({ restrictions, onChange }: DietarySelectorProps) {
  const handleSelection = (selectedId: string) => {
    const updatedRestrictions = restrictions.map(r => ({
      ...r,
      selected: r.id === selectedId
    }));
    onChange(updatedRestrictions);
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      {restrictions.map((restriction) => (
        <button
          key={restriction.id}
          onClick={() => handleSelection(restriction.id)}
          className={`p-4 rounded-xl border-2 transition-all ${
            restriction.selected 
              ? 'border-orange-500 bg-orange-50 text-orange-700'
              : 'border-gray-200 hover:border-orange-200'
          }`}
        >
          {restriction.label}
        </button>
      ))}
    </div>
  );
}