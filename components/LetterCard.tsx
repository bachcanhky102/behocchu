import React from 'react';
import { LetterData } from '../types';

interface LetterCardProps {
  data: LetterData;
  onClick: () => void;
  isLarge?: boolean;
}

export const LetterCard: React.FC<LetterCardProps> = ({ data, onClick, isLarge = false }) => {
  return (
    <button
      onClick={onClick}
      className={`
        relative flex flex-col items-center justify-center 
        rounded-3xl shadow-xl transition-all duration-300
        hover:-translate-y-2 hover:shadow-2xl active:scale-95
        border-4 border-white/50 backdrop-blur-sm
        ${data.color}
        ${isLarge ? 'w-full h-64 p-8' : 'aspect-square p-2'}
      `}
    >
      <span className={`font-black text-white drop-shadow-md ${isLarge ? 'text-9xl' : 'text-5xl'}`}>
        {data.char}
      </span>
      
      {isLarge && (
        <div className="mt-4 text-center">
           <span className="text-6xl animate-bounce-slow block mb-2">{data.emoji}</span>
           <span className="text-3xl font-bold text-white uppercase tracking-wide drop-shadow-sm">{data.word}</span>
        </div>
      )}
    </button>
  );
};
