
import React, { useState } from 'react';

interface ResultsPanelProps {
  num1: number;
  num2: number;
  multiples1: number[];
  multiples2: number[];
  lcm: number | null;
  getExplanation: (num1: number, num2: number, lcm: number) => Promise<string>;
}

export const ResultsPanel: React.FC<ResultsPanelProps> = ({ num1, num2, multiples1, multiples2, lcm, getExplanation }) => {
  const [explanation, setExplanation] = useState<string>('');
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const handleExplainClick = async () => {
    if (!lcm) return;
    setIsFetching(true);
    setExplanation('');
    const result = await getExplanation(num1, num2, lcm);
    setExplanation(result);
    setIsFetching(false);
  };

  const hasResults = multiples1.length > 0 || multiples2.length > 0;

  return (
    <div className="w-full max-w-4xl mt-6 p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-center text-cyan-800 mb-4">Jump Tracker</h2>
      {!hasResults && <p className="text-center text-gray-500">Press "Start Jumping!" to see the results.</p>}
      
      {hasResults && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-green-100 rounded-lg">
            <h3 className="font-bold text-lg text-green-800">Frog 1's Jumps (Multiples of {num1})</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {multiples1.map((m, i) => (
                <span key={i} className="px-3 py-1 bg-green-500 text-white font-bold rounded-full text-sm">{m}</span>
              ))}
            </div>
          </div>
          <div className="p-4 bg-blue-100 rounded-lg">
            <h3 className="font-bold text-lg text-blue-800">Frog 2's Jumps (Multiples of {num2})</h3>
             <div className="flex flex-wrap gap-2 mt-2">
              {multiples2.map((m, i) => (
                <span key={i} className="px-3 py-1 bg-blue-500 text-white font-bold rounded-full text-sm">{m}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      {lcm !== null && (
        <div className="mt-6 text-center p-6 bg-yellow-100 border-2 border-yellow-300 rounded-xl">
          <h3 className="text-4xl font-black text-yellow-800">🎉 Success! 🎉</h3>
          <p className="text-xl text-yellow-700 mt-2">
            The first lily pad they both landed on is <span className="font-bold text-2xl">{lcm}</span>.
          </p>
          <p className="text-2xl font-bold text-yellow-900 mt-1">
            The Least Common Multiple (LCM) of {num1} and {num2} is {lcm}!
          </p>
          <div className="mt-4">
            <button
              onClick={handleExplainClick}
              disabled={isFetching}
              className="px-6 py-2 bg-purple-500 text-white font-bold rounded-full shadow-md hover:bg-purple-600 disabled:bg-gray-400 transition-all transform hover:scale-105"
            >
              {isFetching ? 'Thinking...' : 'Explain it differently!'}
            </button>
            {isFetching && <div className="mt-2 text-purple-700">Getting a simple explanation from our AI friend...</div>}
            {explanation && (
              <div className="mt-4 p-4 bg-white/80 rounded-lg text-left text-gray-700 prose">
                {explanation.split('\n').map((line, i) => <p key={i}>{line}</p>)}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
