import React, { useState, useEffect, useCallback } from 'react';
import { ALPHABET } from './constants';
import { LetterData, Screen, QuizQuestion } from './types';
import { LetterCard } from './components/LetterCard';
import { Button } from './components/Button';
import { Confetti } from './components/Confetti';
import { generateFunRhyme } from './services/geminiService';

export default function App() {
  const [screen, setScreen] = useState<Screen>('HOME');
  const [selectedLetter, setSelectedLetter] = useState<LetterData | null>(null);
  const [quizQuestion, setQuizQuestion] = useState<QuizQuestion | null>(null);
  const [score, setScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [rhyme, setRhyme] = useState<string>('');
  const [isLoadingRhyme, setIsLoadingRhyme] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  // --- Voice Loading ---
  useEffect(() => {
    const loadVoices = () => {
      const avail = window.speechSynthesis.getVoices();
      setVoices(avail);
    };
    
    loadVoices();
    // Chrome loads voices asynchronously
    window.speechSynthesis.onvoiceschanged = loadVoices;
    
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  // --- Sound Utilities ---
  const speak = useCallback((text: string, rate = 0.8) => {
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel(); // Stop previous
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Attempt to find a robust Vietnamese voice
    // 1. Exact match for Vietnam locale
    // 2. Any voice containing 'vi' (often 'vi-VN' or 'Google Tiếng Việt')
    const viVoice = voices.find(v => v.lang === 'vi-VN') || 
                    voices.find(v => v.lang.includes('vi'));

    if (viVoice) {
      utterance.voice = viVoice;
      utterance.lang = viVoice.lang;
    } else {
      // Fallback if no specific voice object found yet, though lang property usually works alone
      utterance.lang = 'vi-VN';
    }

    utterance.rate = rate;
    utterance.pitch = 1.1; // Slightly higher pitch for kids
    window.speechSynthesis.speak(utterance);
  }, [voices]);

  const playCorrectSound = () => {
    speak("Đúng rồi! Bé giỏi quá!");
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const playWrongSound = () => {
    speak("Chưa đúng rồi, bé thử lại nhé!");
  };

  // --- Navigation & Logic ---

  const handleLetterClick = async (letter: LetterData) => {
    setSelectedLetter(letter);
    setRhyme(''); // Reset rhyme
    
    // Explicitly say "Chữ" (Letter) to ensure Vietnamese context
    speak(`Chữ ${letter.char}. ${letter.word}`);

    // AI Generation
    setIsLoadingRhyme(true);
    try {
        const genRhyme = await generateFunRhyme(letter.word);
        setRhyme(genRhyme);
    } catch (e) {
        console.error(e);
    } finally {
        setIsLoadingRhyme(false);
    }
  };

  const closeDetail = () => {
    setSelectedLetter(null);
    window.speechSynthesis.cancel();
  };

  const startQuiz = () => {
    setScreen('QUIZ');
    setScore(0);
    generateQuizQuestion();
  };

  const generateQuizQuestion = () => {
    const target = ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
    // Get 2 incorrect options
    let options = [target];
    while (options.length < 3) {
      const random = ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
      if (!options.find(o => o.char === random.char)) {
        options.push(random);
      }
    }
    // Shuffle
    options = options.sort(() => Math.random() - 0.5);
    
    setQuizQuestion({ targetLetter: target, options });
    
    // Delay speech slightly to allow render
    setTimeout(() => {
        speak(`Bé hãy tìm chữ ${target.char} nào?`);
    }, 500);
  };

  const handleQuizAnswer = (answer: LetterData) => {
    if (!quizQuestion) return;

    if (answer.char === quizQuestion.targetLetter.char) {
      setScore(s => s + 1);
      playCorrectSound();
      setTimeout(generateQuizQuestion, 2000);
    } else {
      playWrongSound();
    }
  };

  // --- Renders ---

  const renderHome = () => (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-blue-100 to-pink-100 space-y-8 text-center">
      <div className="animate-wiggle">
        <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 drop-shadow-md p-4">
          Bé Vui Học Chữ
        </h1>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6 w-full max-w-2xl justify-center">
        <Button onClick={() => setScreen('LEARN')} size="lg" className="w-full md:w-auto bg-gradient-to-r from-green-400 to-emerald-500 border-green-600">
          🏫 Học Chữ
        </Button>
        <Button onClick={startQuiz} size="lg" className="w-full md:w-auto bg-gradient-to-r from-orange-400 to-red-500 border-red-600">
          🎮 Trò Chơi
        </Button>
      </div>
      
      <div className="absolute bottom-4 text-gray-500 text-sm">
        Phiên bản AI hỗ trợ kể chuyện vui nhộn
      </div>
    </div>
  );

  const renderLearn = () => (
    <div className="min-h-screen bg-sky-50 p-4 pb-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6 sticky top-0 bg-sky-50/90 backdrop-blur-md z-10 py-2">
            <Button onClick={() => setScreen('HOME')} variant="secondary">⬅️ Về Nhà</Button>
            <h2 className="text-3xl font-bold text-sky-600">Bảng Chữ Cái</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {ALPHABET.map((letter) => (
            <LetterCard 
              key={letter.char} 
              data={letter} 
              onClick={() => handleLetterClick(letter)} 
            />
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedLetter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-pop">
          <div className="relative bg-white rounded-[3rem] p-6 md:p-10 w-full max-w-lg shadow-2xl border-8 border-sky-200">
            <button 
              onClick={closeDetail}
              className="absolute top-4 right-4 w-12 h-12 bg-gray-100 rounded-full text-2xl font-bold text-gray-500 hover:bg-red-100 hover:text-red-500 transition-colors"
            >
              ✕
            </button>
            
            <div className="flex flex-col items-center">
               <LetterCard data={selectedLetter} onClick={() => speak(`Chữ ${selectedLetter.char}`)} isLarge />
               
               <div className="mt-6 space-y-3 w-full text-center">
                   <div className="flex justify-center gap-4">
                      <Button onClick={() => speak(`Chữ ${selectedLetter.char}`)} className="bg-yellow-400 border-yellow-600 text-black">
                         🔊 Nghe Chữ
                      </Button>
                      <Button onClick={() => speak(selectedLetter.word)} className="bg-pink-400 border-pink-600">
                         🔊 Nghe Từ
                      </Button>
                   </div>

                   <div className="bg-blue-50 rounded-2xl p-4 mt-4 min-h-[100px] flex flex-col justify-center items-center">
                      {isLoadingRhyme ? (
                        <div className="animate-pulse text-blue-400">✨ Đang nghĩ thơ vui...</div>
                      ) : rhyme ? (
                        <>
                           <p className="text-xl text-blue-800 font-medium italic">"{rhyme}"</p>
                           <button 
                             onClick={() => speak(rhyme)} 
                             className="mt-2 text-3xl hover:scale-110 transition-transform"
                             title="Đọc thơ"
                           >
                            🗣️
                           </button>
                        </>
                      ) : (
                        <p className="text-gray-400">Không có thơ rồi...</p>
                      )}
                   </div>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderQuiz = () => (
    <div className="min-h-screen bg-indigo-50 p-4 flex flex-col items-center">
       {showConfetti && <Confetti />}
       
       <div className="w-full max-w-4xl flex justify-between items-center mb-8">
          <Button onClick={() => setScreen('HOME')} variant="secondary">⬅️ Thoát</Button>
          <div className="bg-white px-6 py-2 rounded-full shadow-md text-2xl font-bold text-yellow-500 border-2 border-yellow-400">
             ⭐ {score}
          </div>
       </div>

       {quizQuestion && (
         <div className="flex flex-col items-center w-full max-w-2xl animate-pop">
            <div className="text-center mb-10">
                <h3 className="text-3xl md:text-5xl font-bold text-indigo-800 mb-4">
                  Tìm chữ <span className="text-red-500 text-6xl inline-block transform hover:scale-110 transition-transform cursor-pointer" onClick={() => speak(`Chữ ${quizQuestion.targetLetter.char}`)}>{quizQuestion.targetLetter.char}</span>
                </h3>
                <button 
                  onClick={() => speak(`Bé hãy tìm chữ ${quizQuestion.targetLetter.char} nào?`)}
                  className="bg-indigo-100 hover:bg-indigo-200 text-indigo-600 px-4 py-2 rounded-full font-bold transition-colors"
                >
                  🔊 Nghe lại câu hỏi
                </button>
            </div>

            <div className="grid grid-cols-3 gap-4 md:gap-8 w-full">
              {quizQuestion.options.map((option, idx) => (
                <LetterCard 
                  key={idx} 
                  data={option} 
                  onClick={() => handleQuizAnswer(option)} 
                />
              ))}
            </div>
         </div>
       )}
    </div>
  );

  return (
    <div className="font-sans text-slate-800 select-none">
      {screen === 'HOME' && renderHome()}
      {screen === 'LEARN' && renderLearn()}
      {screen === 'QUIZ' && renderQuiz()}
    </div>
  );
}