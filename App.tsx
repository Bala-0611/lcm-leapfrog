
import React, { useState, useEffect, useCallback } from 'react';
import { NumberInput } from './components/NumberInput';
import { Frog } from './components/Frog';
import { ResultsPanel } from './components/ResultsPanel';
import { getLcmExplanation } from './services/geminiService';

const MAX_NUMBER = 20;
const MIN_NUMBER = 2;
const ANIMATION_SPEED = 400; // ms
const MAX_JUMPS = 100;

const App: React.FC = () => {
  const [num1, setNum1] = useState<number>(3);
  const [num2, setNum2] = useState<number>(4);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [frog1Pos, setFrog1Pos] = useState<number>(0);
  const [frog2Pos, setFrog2Pos] = useState<number>(0);
  const [multiples1, setMultiples1] = useState<number[]>([]);
  const [multiples2, setMultiples2] = useState<number[]>([]);
  const [lcm, setLcm] = useState<number | null>(null);
  const [error, setError] = useState<string>('');
  const [maxDisplayNumber, setMaxDisplayNumber] = useState<number>(num1 * num2);

  const resetGame = useCallback(() => {
    setIsAnimating(false);
    setFrog1Pos(0);
    setFrog2Pos(0);
    setMultiples1([]);
    setMultiples2([]);
    setLcm(null);
    setError('');
  }, []);

  const handleAnimate = () => {
    if (num1 < MIN_NUMBER || num1 > MAX_NUMBER || num2 < MIN_NUMBER || num2 > MAX_NUMBER) {
      setError(`Please enter numbers between ${MIN_NUMBER} and ${MAX_NUMBER}.`);
      return;
    }
    if (num1 === num2) {
      setError(`Numbers must be different for a fun game!`);
      return;
    }

    resetGame();
    setIsAnimating(true);
    setMaxDisplayNumber(Math.max(30, num1 * num2 + 2));

    let currentPos1 = 0;
    let currentPos2 = 0;
    let tempMultiples1: number[] = [];
    let tempMultiples2: number[] = [];
    let jumpCount = 0;

    const animationInterval = setInterval(() => {
      jumpCount++;
      let newPos1 = currentPos1;
      let newPos2 = currentPos2;

      // Frog 1 jumps if its next position is smaller or equal
      if(currentPos1 + num1 <= currentPos2 + num2 || currentPos2 === 0){
          if(currentPos1 !== 0 || tempMultiples1.length === 0){
             newPos1 = currentPos1 + num1;
             tempMultiples1 = [...tempMultiples1, newPos1];
             setMultiples1(tempMultiples1);
             setFrog1Pos(newPos1);
             currentPos1 = newPos1;
          }
      }

      // Frog 2 jumps if its next position is smaller or equal
      if(currentPos2 + num2 <= currentPos1 || currentPos1 === 0){
          if(currentPos2 !== 0 || tempMultiples2.length === 0){
             newPos2 = currentPos2 + num2;
             tempMultiples2 = [...tempMultiples2, newPos2];
             setMultiples2(tempMultiples2);
             setFrog2Pos(newPos2);
             currentPos2 = newPos2;
          }
      }


      if (currentPos1 === currentPos2 && currentPos1 !== 0) {
        setLcm(currentPos1);
        setIsAnimating(false);
        clearInterval(animationInterval);
      } else if (jumpCount > MAX_JUMPS) {
        setError("That's a lot of jumps! Maybe try smaller numbers.");
        setIsAnimating(false);
        clearInterval(animationInterval);
      }
    }, ANIMATION_SPEED);
  };

  useEffect(() => {
    resetGame();
  }, [num1, num2, resetGame]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-100 to-blue-200 text-gray-800 p-4 sm:p-8 flex flex-col items-center">
      <header className="text-center mb-6">
        <h1 className="text-5xl sm:text-6xl font-black text-cyan-800 drop-shadow-md">LCM Leapfrog</h1>
        <p className="text-lg text-cyan-700 mt-2">Find where the frogs meet to learn the Least Common Multiple!</p>
      </header>
      
      <main className="w-full max-w-6xl bg-white/50 backdrop-blur-sm rounded-2xl shadow-lg p-6 flex flex-col items-center">
        <div className="w-full max-w-md mb-6 p-4 bg-white/70 rounded-xl shadow">
          <div className="flex justify-around items-center space-x-4">
            <NumberInput label="Frog 1 Jumps By" value={num1} onChange={setNum1} color="green" disabled={isAnimating} />
            <NumberInput label="Frog 2 Jumps By" value={num2} onChange={setNum2} color="blue" disabled={isAnimating} />
          </div>
          {error && <p className="text-red-600 text-center mt-3 font-semibold">{error}</p>}
          <div className="flex justify-center space-x-4 mt-4">
            <button
              onClick={handleAnimate}
              disabled={isAnimating}
              className="px-8 py-3 bg-yellow-400 text-yellow-900 font-bold rounded-full shadow-md hover:bg-yellow-500 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed transition-all transform hover:scale-105"
            >
              {isAnimating ? 'Jumping...' : 'Start Jumping!'}
            </button>
            <button
              onClick={resetGame}
              disabled={isAnimating}
              className="px-8 py-3 bg-red-400 text-red-900 font-bold rounded-full shadow-md hover:bg-red-500 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed transition-all transform hover:scale-105"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="w-full p-4 overflow-x-auto">
          <div className="relative h-40 flex items-center" style={{ minWidth: `${maxDisplayNumber * 4}rem` }}>
             {/* Water background */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-blue-400 rounded-lg opacity-50"></div>
            {/* Number Line */}
            {[...Array(maxDisplayNumber + 1).keys()].map(i => (
              <div key={i} className="flex-shrink-0 w-16 h-28 flex flex-col items-center justify-end relative">
                <span className="text-sm font-bold text-cyan-900 mb-1">{i}</span>
                <div className={`w-14 h-14 rounded-full transition-all duration-300 ${lcm === i ? 'bg-yellow-300 shadow-lg scale-110' : 'bg-green-400'}`}></div>
                {lcm === i && <div className="absolute top-0 text-3xl">⭐</div>}
              </div>
            ))}
            <div className="absolute bottom-10 left-0 transition-transform duration-300 ease-out" style={{ transform: `translateX(${frog1Pos * 4 - 1.5}rem)`}}>
                <Frog color="green" />
            </div>
             <div className="absolute bottom-10 left-0 transition-transform duration-300 ease-out" style={{ transform: `translateX(${frog2Pos * 4 - 1.5}rem)`}}>
                <Frog color="blue" />
            </div>
          </div>
        </div>

        <ResultsPanel
          num1={num1}
          num2={num2}
          multiples1={multiples1}
          multiples2={multiples2}
          lcm={lcm}
          getExplanation={getLcmExplanation}
        />
      </main>

       <footer className="text-center mt-8 text-cyan-600 text-sm">
        <p>Created with fun and learning in mind.</p>
      </footer>
    </div>
  );
};

export default App;

