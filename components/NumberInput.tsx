
import React from 'react';

interface NumberInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  color: 'green' | 'blue';
  disabled: boolean;
}

export const NumberInput: React.FC<NumberInputProps> = ({ label, value, onChange, color, disabled }) => {
  const colorClasses = {
    green: 'border-green-500 focus:ring-green-400 text-green-700',
    blue: 'border-blue-500 focus:ring-blue-400 text-blue-700',
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = parseInt(e.target.value, 10);
    if (!isNaN(num)) {
      onChange(num);
    } else if (e.target.value === '') {
      onChange(0);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <label className={`font-bold mb-1 ${color === 'green' ? 'text-green-700' : 'text-blue-700'}`}>{label}</label>
      <input
        type="number"
        value={value}
        onChange={handleChange}
        min="2"
        max="20"
        disabled={disabled}
        className={`w-24 h-16 text-4xl font-bold text-center rounded-lg border-4 transition-all duration-300 focus:ring-4 focus:outline-none disabled:bg-gray-200 ${colorClasses[color]}`}
      />
    </div>
  );
};
