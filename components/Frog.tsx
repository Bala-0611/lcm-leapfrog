
import React from 'react';

interface FrogProps {
  color: 'green' | 'blue';
}

export const Frog: React.FC<FrogProps> = ({ color }) => {
  const colors = {
    green: {
      body: '#4ade80', // green-400
      spots: '#166534', // green-800
      eye: '#22c55e' // green-500
    },
    blue: {
      body: '#60a5fa', // blue-400
      spots: '#1e40af', // blue-800
      eye: '#3b82f6' // blue-500
    }
  };

  const selectedColor = colors[color];

  return (
    <svg width="80" height="80" viewBox="0 0 100 100" className="drop-shadow-lg">
      <g transform="translate(0, 10)">
        {/* Body */}
        <ellipse cx="50" cy="50" rx="35" ry="25" fill={selectedColor.body} />
        {/* Spots */}
        <circle cx="35" cy="45" r="5" fill={selectedColor.spots} />
        <circle cx="65" cy="55" r="7" fill={selectedColor.spots} />
        <circle cx="50" cy="60" r="4" fill={selectedColor.spots} />
        {/* Eyes */}
        <circle cx="30" cy="30" r="12" fill="white" />
        <circle cx="70" cy="30" r="12" fill="white" />
        <circle cx="30" cy="30" r="6" fill={selectedColor.eye} />
        <circle cx="70" cy="30" r="6" fill={selectedColor.eye} />
        <circle cx="28" cy="28" r="2" fill="black" />
        <circle cx="68" cy="28" r="2" fill="black" />
        {/* Mouth */}
        <path d="M 40 65 Q 50 70 60 65" stroke="black" fill="transparent" strokeWidth="2" />
        {/* Legs */}
        <path d="M 15 60 Q 5 75 15 90" stroke={selectedColor.body} fill="transparent" strokeWidth="8" strokeLinecap="round" />
        <path d="M 85 60 Q 95 75 85 90" stroke={selectedColor.body} fill="transparent" strokeWidth="8" strokeLinecap="round" />
      </g>
    </svg>
  );
};
