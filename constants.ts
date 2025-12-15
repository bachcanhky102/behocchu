import { LetterData } from './types';

// Palette for cards to make them colorful
const COLORS = [
  'bg-red-400', 'bg-orange-400', 'bg-amber-400', 
  'bg-yellow-400', 'bg-lime-400', 'bg-green-400', 
  'bg-emerald-400', 'bg-teal-400', 'bg-cyan-400', 
  'bg-sky-400', 'bg-blue-400', 'bg-indigo-400', 
  'bg-violet-400', 'bg-purple-400', 'bg-fuchsia-400', 
  'bg-pink-400', 'bg-rose-400'
];

export const ALPHABET: LetterData[] = [
  { char: 'A', word: 'Cái Ao', emoji: '🌊', color: COLORS[0] },
  { char: 'Ă', word: 'Mặt Trăng', emoji: '🌙', color: COLORS[1] },
  { char: 'Â', word: 'Cái Cân', emoji: '⚖️', color: COLORS[2] },
  { char: 'B', word: 'Con Bò', emoji: '🐮', color: COLORS[3] },
  { char: 'C', word: 'Con Cá', emoji: '🐟', color: COLORS[4] },
  { char: 'D', word: 'Trái Dừa', emoji: '🥥', color: COLORS[5] },
  { char: 'Đ', word: 'Đu Đủ', emoji: '🥭', color: COLORS[6] },
  { char: 'E', word: 'Xe Em Bé', emoji: '🛒', color: COLORS[7] },
  { char: 'Ê', word: 'Con Ếch', emoji: '🐸', color: COLORS[8] },
  { char: 'G', word: 'Con Gà', emoji: '🐔', color: COLORS[9] },
  { char: 'H', word: 'Bông Hoa', emoji: '🌺', color: COLORS[10] },
  { char: 'I', word: 'Viên Bi', emoji: '🔮', color: COLORS[11] },
  { char: 'K', word: 'Cây Kéo', emoji: '✂️', color: COLORS[12] },
  { char: 'L', word: 'Quả Lê', emoji: '🍐', color: COLORS[13] },
  { char: 'M', word: 'Con Mèo', emoji: '🐱', color: COLORS[14] },
  { char: 'N', word: 'Cái Nơ', emoji: '🎀', color: COLORS[15] },
  { char: 'O', word: 'Con Ong', emoji: '🐝', color: COLORS[16] },
  { char: 'Ô', word: 'Cái Ô', emoji: '☂️', color: COLORS[0] },
  { char: 'Ơ', word: 'Lá Cờ', emoji: '🇻🇳', color: COLORS[1] },
  { char: 'P', word: 'Đèn Pin', emoji: '🔦', color: COLORS[2] },
  { char: 'Q', word: 'Quả Quýt', emoji: '🍊', color: COLORS[3] },
  { char: 'R', word: 'Con Rùa', emoji: '🐢', color: COLORS[4] },
  { char: 'S', word: 'Con Sóc', emoji: '🐿️', color: COLORS[5] },
  { char: 'T', word: 'Trái Tim', emoji: '❤️', color: COLORS[6] },
  { char: 'U', word: 'Cái Xúc Xích', emoji: '🌭', color: COLORS[7] }, // Closest visual match for kids
  { char: 'Ư', word: 'Sư Tử', emoji: '🦁', color: COLORS[8] },
  { char: 'V', word: 'Con Vịt', emoji: '🦆', color: COLORS[9] },
  { char: 'X', word: 'Xe Đạp', emoji: '🚲', color: COLORS[10] },
  { char: 'Y', word: 'Y Tá', emoji: '👩‍⚕️', color: COLORS[11] },
];
