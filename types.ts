export interface LetterData {
  char: string;
  word: string;
  emoji: string;
  color: string;
  soundText?: string; // Phonetic or how to say it
}

export type Screen = 'HOME' | 'LEARN' | 'QUIZ';

export interface QuizQuestion {
  targetLetter: LetterData;
  options: LetterData[];
}
