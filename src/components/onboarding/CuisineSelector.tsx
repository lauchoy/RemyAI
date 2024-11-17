import React from 'react';
import { Preference } from './types';

interface CuisineSelectorProps {
  cuisines: Preference[];
  onChange: (updated: Preference[]) => void;
  maxSelections?: number;
}

export default function CuisineSelector({ 
  cuisines, 
  onChange, 
  maxSelections = 3 
}: CuisineSelectorProps) {
  const handleSelection = (selectedId: string) => {
    const selectedCount = cuisines.filter(c => c.selected).length;
    const isSelected = cuisines.find(c => c.id === selectedId)?.selected;

    // Allow deselection or selection if under max limit
    if (isSelected || selectedCount < maxSelections) {
      const updatedCuisines = cuisines.map(c => ({
        ...c,
        selected: c.id === selectedId ? !c.selected : c.selected
      }));
      onChange(updatedCuisines);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {cuisines.map((cuisine) => (
          <button
            key={cuisine.id}
            onClick={() => handleSelection(cuisine.id)}
            disabled={!cuisine.selected && cuisines.filter(c => c.selected).length >= maxSelections}
            className={`p-4 rounded-xl border-2 transition-all ${
              cuisine.selected 
                ? 'border-orange-500 bg-orange-50 text-orange-700'
                : 'border-gray-200 hover:border-orange-200 disabled:opacity-50 disabled:cursor-not-allowed'
            }`}
          >
            {cuisine.label}
          </button>
        ))}
      </div>
      <p className="text-sm text-gray-500 mt-2">
        Select up to {maxSelections} cuisines ({cuisines.filter(c => c.selected).length} selected)
      </p>
    </div>
  );
}