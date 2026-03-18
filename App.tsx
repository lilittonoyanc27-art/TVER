import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  ChevronRight, 
  Star,
  Sparkles,
  Heart,
  Info,
  Gamepad2,
  Play
} from 'lucide-react';

// --- Types ---

type Section = 'intro' | 'numbers-theory' | 'numbers-game' | 'greetings' | 'tener-theory' | 'tener-quiz';

export default function App() {
  const [activeSection, setActiveSection] = useState<Section>('intro');
  const [gameScore, setGameScore] = useState(0);
  const [currentNumberIndex, setCurrentNumberIndex] = useState(0);
  const [showGameFeedback, setShowGameFeedback] = useState(false);
  const [selectedNumberOption, setSelectedNumberOption] = useState<string | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);

  // Tener Quiz State
  const [tenerQuizScore, setTenerQuizScore] = useState(0);
  const [currentTenerIndex, setCurrentTenerIndex] = useState(0);
  const [showTenerFeedback, setShowTenerFeedback] = useState(false);
  const [selectedTenerOption, setSelectedTenerOption] = useState<string | null>(null);
  const [isTenerGameOver, setIsTenerGameOver] = useState(false);

  const TENER_CONJUGATION = [
    { p: 'Yo', v: 'tengo', a: 'Ես ունեմ' },
    { p: 'Tú', v: 'tienes', a: 'Դու ունես' },
    { p: 'Él / Ella / Usted', v: 'tiene', a: 'Նա ունի / Դուք ունեք (հարգալից)' },
    { p: 'Nosotros / Nosotras', v: 'tenemos', a: 'Մենք ունենք' },
    { p: 'Vosotros / Vosotras', v: 'tenéis', a: 'Դուք ունեք' },
    { p: 'Ellos / Ellas / Ustedes', v: 'tienen', a: 'Նրանք ունեն / Դուք ունեք (հարգալից հոգնակի)' },
  ];

  const TENER_QUIZ_QUESTIONS = [
    { q: 'Yo ___ un perro.', s: 'tengo', options: ['tengo', 'tienes', 'tiene'], a: 'Ես ունեմ շուն:' },
    { q: '¿Tú ___ hambre?', s: 'tienes', options: ['tengo', 'tienes', 'tenemos'], a: 'Դու սովա՞ծ ես (ունե՞ս սով):' },
    { q: 'Ella ___ veinte años.', s: 'tiene', options: ['tienen', 'tiene', 'tenéis'], a: 'Նա քսան տարեկան է (ունի քսան տարի):' },
    { q: 'Nosotros ___ una casa grande.', s: 'tenemos', options: ['tenemos', 'tienen', 'tengo'], a: 'Մենք ունենք մեծ տուն:' },
    { q: '¿Ustedes ___ sed?', s: 'tienen', options: ['tienes', 'tienen', 'tiene'], a: 'Դուք ծարա՞վ եք (ունե՞ք ծարավ):' },
    { q: 'Ellos ___ muchos libros.', s: 'tienen', options: ['tenemos', 'tienen', 'tengo'], a: 'Նրանք շատ գրքեր ունեն:' },
    { q: 'Él ___ un gato.', s: 'tiene', options: ['tengo', 'tiene', 'tienes'], a: 'Նա ունի կատու:' },
    { q: 'Vosotros ___ clase de español.', s: 'tenéis', options: ['tenemos', 'tenéis', 'tienen'], a: 'Դուք ունեք իսպաներենի դաս:' },
    { q: 'Usted ___ un coche azul.', s: 'tiene', options: ['tengo', 'tiene', 'tienen'], a: 'Դուք (հարգալից) ունեք կապույտ մեքենա:' },
    { q: 'Nosotras ___ mucho frío.', s: 'tenemos', options: ['tenemos', 'tienen', 'tengo'], a: 'Մենք (իգական) շատ մրսում ենք (ունենք ցուրտ):' },
    { q: 'Ellas ___ una idea.', s: 'tienen', options: ['tiene', 'tienen', 'tenemos'], a: 'Նրանք (իգական) մի գաղափար ունեն:' },
    { q: '¿___ tú una hermana?', s: 'tienes', options: ['tengo', 'tienes', 'tiene'], a: 'Դու քույր ունե՞ս:' },
  ];

  const GREETINGS = [
    { s: '¡Hola!', a: 'Ողջույն', e: 'Hello' },
    { s: '¡Buenos días!', a: 'Բարի լույս', e: 'Good morning' },
    { s: '¡Buenas tardes!', a: 'Բարի օր', e: 'Good afternoon' },
    { s: '¡Buenas noches!', a: 'Բարի երեկո / Բարի գիշեր', e: 'Good evening/night' },
    { s: '¿Cómo estás?', a: 'Ինչպե՞ս ես', e: 'How are you?' },
    { s: 'Bien, gracias.', a: 'Լավ եմ, շնորհակալություն', e: 'Well, thanks' },
    { s: '¿Cómo te llamas?', a: 'Ի՞նչ է քո անունը', e: "What's your name?" },
    { s: 'Me llamo...', a: 'Իմ անունն է...', e: 'My name is...' },
    { s: 'Mucho gusto.', a: 'Հաճելի է ծանոթանալ', e: 'Nice to meet you' },
    { s: 'Por favor.', a: 'Խնդրում եմ', e: 'Please' },
    { s: 'Gracias.', a: 'Շնորհակալություն', e: 'Thank you' },
    { s: 'De nada.', a: 'Խնդրեմ (ի պատասխան շնորհակալության)', e: "You're welcome" },
    { s: '¡Adiós!', a: 'Ցտեսություն', e: 'Goodbye' },
    { s: '¡Hasta luego!', a: 'Մինչ հանդիպում', e: 'See you later' },
  ];

  const NUMBERS_1_20 = [
    { n: 1, s: 'uno' }, { n: 2, s: 'dos' }, { n: 3, s: 'tres' }, { n: 4, s: 'cuatro' }, { n: 5, s: 'cinco' },
    { n: 6, s: 'seis' }, { n: 7, s: 'siete' }, { n: 8, s: 'ocho' }, { n: 9, s: 'nueve' }, { n: 10, s: 'diez' },
    { n: 11, s: 'once' }, { n: 12, s: 'doce' }, { n: 13, s: 'trece' }, { n: 14, s: 'catorce' }, { n: 15, s: 'quince' },
    { n: 16, s: 'dieciséis' }, { n: 17, s: 'diecisiete' }, { n: 18, s: 'dieciocho' }, { n: 19, s: 'diecinueve' }, { n: 20, s: 'veinte' }
  ];

  const NUMBERS_TENS = [
    { n: 10, s: 'diez' }, { n: 20, s: 'veinte' }, { n: 30, s: 'treinta' }, { n: 40, s: 'cuarenta' },
    { n: 50, s: 'cincuenta' }, { n: 60, s: 'sesenta' }, { n: 70, s: 'setenta' }, { n: 80, s: 'ochenta' },
    { n: 90, s: 'noventa' }, { n: 100, s: 'cien' }
  ];

  const NUMBER_GAME_QUESTIONS = [
    { n: 7, s: 'siete', options: ['seis', 'siete', 'ocho'] },
    { n: 12, s: 'doce', options: ['once', 'doce', 'trece'] },
    { n: 16, s: 'dieciséis', options: ['dieciséis', 'diecisiete', 'diez'] },
    { n: 25, s: 'veinticinco', options: ['veinte', 'veinticinco', 'treinta'] },
    { n: 40, s: 'cuarenta', options: ['cincuenta', 'cuarenta', 'treinta'] },
    { n: 60, s: 'sesenta', options: ['setenta', 'sesenta', 'cincuenta'] },
    { n: 90, s: 'noventa', options: ['ochenta', 'noventa', 'cien'] },
    { n: 14, s: 'catorce', options: ['quince', 'catorce', 'trece'] },
    { n: 3, s: 'tres', options: ['dos', 'tres', 'cuatro'] },
    { n: 100, s: 'cien', options: ['mil', 'cien', 'diez'] },
    { n: 19, s: 'diecinueve', options: ['dieciocho', 'diecinueve', 'veinte'] },
    { n: 80, s: 'ochenta', options: ['setenta', 'ochenta', 'noventa'] },
  ];

  const handleNumberGameAnswer = (option: string) => {
    if (showGameFeedback) return;
    setSelectedNumberOption(option);
    setShowGameFeedback(true);
    if (option === NUMBER_GAME_QUESTIONS[currentNumberIndex].s) {
      setGameScore(prev => prev + 1);
    }
  };

  const nextNumberQuestion = () => {
    if (currentNumberIndex === NUMBER_GAME_QUESTIONS.length - 1) {
      setIsGameOver(true);
    } else {
      setShowGameFeedback(false);
      setSelectedNumberOption(null);
      setCurrentNumberIndex(prev => prev + 1);
    }
  };

  const resetGame = () => {
    setGameScore(0);
    setCurrentNumberIndex(0);
    setShowGameFeedback(false);
    setSelectedNumberOption(null);
    setIsGameOver(false);
  };

  const handleTenerQuizAnswer = (option: string) => {
    if (showTenerFeedback) return;
    setSelectedTenerOption(option);
    setShowTenerFeedback(true);
    if (option === TENER_QUIZ_QUESTIONS[currentTenerIndex].s) {
      setTenerQuizScore(prev => prev + 1);
    }
  };

  const nextTenerQuestion = () => {
    if (currentTenerIndex === TENER_QUIZ_QUESTIONS.length - 1) {
      setIsTenerGameOver(true);
    } else {
      setShowTenerFeedback(false);
      setSelectedTenerOption(null);
      setCurrentTenerIndex(prev => prev + 1);
    }
  };

  const resetTenerGame = () => {
    setTenerQuizScore(0);
    setCurrentTenerIndex(0);
    setShowTenerFeedback(false);
    setSelectedTenerOption(null);
    setIsTenerGameOver(false);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'intro':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="relative overflow-hidden bg-indigo-600 rounded-[40px] p-8 text-white shadow-2xl shadow-indigo-500/20">
              <Sparkles className="absolute top-4 right-4 w-12 h-12 text-white/20 animate-pulse" />
              <div className="mb-4">
                <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-widest">
                  Գայանեի համար
                </span>
              </div>
              <h2 className="text-4xl font-black mb-4 leading-tight uppercase tracking-tight">Իսպաներենի Թվերը</h2>
              <p className="text-indigo-100 text-lg leading-relaxed font-medium">
                Սովորիր հաշվել իսպաներենով 1-ից մինչև 100:
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="p-8 bg-white border border-slate-200 rounded-[40px] shadow-sm flex items-center gap-6">
                <div className="w-20 h-20 bg-indigo-100 rounded-3xl flex items-center justify-center shrink-0">
                  <BookOpen className="w-10 h-10 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 mb-2">Թվեր (1-100)</h3>
                  <p className="text-slate-500 font-medium leading-relaxed">
                    Իմացիր, թե ինչպես են հնչում և գրվում թվերը իսպաներենում:
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button 
                onClick={() => setActiveSection('numbers-theory')}
                className="w-full py-6 bg-indigo-600 text-white rounded-[32px] font-black text-xl flex items-center justify-center gap-3 hover:bg-indigo-700 transition-all active:scale-95 shadow-xl"
              >
                ԹՎԵՐ (1-100)
                <BookOpen className="w-6 h-6" />
              </button>
              <button 
                onClick={() => setActiveSection('greetings')}
                className="w-full py-6 bg-emerald-600 text-white rounded-[32px] font-black text-xl flex items-center justify-center gap-3 hover:bg-emerald-700 transition-all active:scale-95 shadow-xl"
              >
                ՈՂՋՈՒՅՆՆԵՐ
                <Heart className="w-6 h-6" />
              </button>
              <button 
                onClick={() => setActiveSection('tener-theory')}
                className="w-full py-6 bg-rose-600 text-white rounded-[32px] font-black text-xl flex items-center justify-center gap-3 hover:bg-rose-700 transition-all active:scale-95 shadow-xl"
              >
                TENER ԲԱՅԸ
                <Info className="w-6 h-6" />
              </button>
              <button 
                onClick={() => setActiveSection('tener-quiz')}
                className="w-full py-6 bg-amber-500 text-white rounded-[32px] font-black text-xl flex items-center justify-center gap-3 hover:bg-amber-600 transition-all active:scale-95 shadow-xl"
              >
                TENER ԽԱՂ
                <Gamepad2 className="w-6 h-6" />
              </button>
            </div>
          </motion.div>
        );

      case 'numbers-theory':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="space-y-12 pb-20"
          >
            <div className="bg-indigo-600 text-white rounded-[40px] p-10 relative overflow-hidden shadow-xl shadow-indigo-500/20">
              <Sparkles className="absolute top-4 right-4 w-12 h-12 text-white/20 animate-pulse" />
              <h2 className="text-4xl font-black mb-4 leading-tight">ԹՎԵՐ (LOS NÚMEROS)</h2>
              <p className="text-indigo-100 text-xl leading-relaxed font-medium">
                Սովորիր հաշվել իսպաներենով: Սկսենք 1-ից 20-ը և տասնյակները:
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center text-white font-black">1</div>
                <h3 className="text-2xl font-black text-slate-900">1-ից 20-ը</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
                {NUMBERS_1_20.map((item, i) => (
                  <div key={i} className="p-6 bg-white border border-slate-200 rounded-3xl flex flex-col items-center shadow-sm hover:border-indigo-300 transition-all hover:scale-105">
                    <span className="text-3xl font-black text-indigo-600 mb-1">{item.n}</span>
                    <span className="text-slate-600 font-bold text-lg">{item.s}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center text-white font-black">2</div>
                <h3 className="text-2xl font-black text-slate-900">Տասնյակներ (10-100)</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                {NUMBERS_TENS.map((item, i) => (
                  <div key={i} className="p-6 bg-purple-50 border border-purple-100 rounded-3xl flex flex-col items-center shadow-sm hover:border-purple-300 transition-all hover:scale-105">
                    <span className="text-3xl font-black text-purple-600 mb-1">{item.n}</span>
                    <span className="text-slate-600 font-bold text-lg">{item.s}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-10 bg-slate-900 text-white rounded-[40px] space-y-6">
              <h4 className="text-2xl font-black flex items-center gap-3">
                <Info className="w-6 h-6 text-indigo-400" />
                Գրամատիկա
              </h4>
              <div className="space-y-4 text-slate-300 font-medium leading-relaxed">
                <p>👉 16-ից 19 թվերը կազմվում են **dieci** + թիվը (օրինակ՝ 10+6 = dieciséis):</p>
                <p>👉 21-ից 29 թվերը սկսվում են **veinti**-ով (օրինակ՝ 21 = veintiuno):</p>
                <p>👉 30-ից հետո օգտագործում ենք **y** (և) բառը (օրինակ՝ 31 = treinta y uno):</p>
              </div>
            </div>
          </motion.div>
        );

      case 'numbers-game':
        if (isGameOver) {
          return (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="space-y-8 text-center"
            >
              <div className="bg-indigo-600 text-white rounded-[40px] p-12 shadow-xl">
                <Sparkles className="w-16 h-16 mx-auto mb-6 text-yellow-400" />
                <h2 className="text-4xl font-black mb-4 uppercase tracking-tight">Խաղն ավարտվեց!</h2>
                <p className="text-indigo-100 text-xl font-medium mb-8">
                  Քո միավորները: <span className="text-white text-3xl font-black">{gameScore} / {NUMBER_GAME_QUESTIONS.length}</span>
                </p>
                <button 
                  onClick={resetGame}
                  className="px-12 py-5 bg-white text-indigo-600 rounded-full font-black text-xl hover:bg-indigo-50 transition-all active:scale-95 shadow-xl"
                >
                  ԿՐԿՆԵԼ
                </button>
              </div>
            </motion.div>
          );
        }
        const q = NUMBER_GAME_QUESTIONS[currentNumberIndex];
        return (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="space-y-8"
          >
            <div className="bg-indigo-600 text-white rounded-[40px] p-10 text-center relative overflow-hidden">
              <Star className="absolute top-4 right-4 w-12 h-12 text-white/10" />
              <p className="text-indigo-200 font-black uppercase tracking-[0.3em] mb-2">Թվերի Խաղ</p>
              <h2 className="text-5xl font-black mb-4">Ինչպե՞ս է այս թիվը</h2>
              <div className="text-8xl font-black bg-white/10 backdrop-blur-md rounded-3xl p-8 inline-block mt-4">
                {q.n}
              </div>
              <div className="mt-8 flex justify-center gap-2">
                {NUMBER_GAME_QUESTIONS.map((_, i) => (
                  <div key={i} className={`w-3 h-3 rounded-full ${i === currentNumberIndex ? 'bg-white' : 'bg-white/20'}`} />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {q.options.map((opt, i) => {
                const isCorrect = opt === q.s;
                const isSelected = selectedNumberOption === opt;
                let btnClass = "bg-white border-slate-200 text-slate-900 hover:border-indigo-300";
                
                if (showGameFeedback) {
                  if (isCorrect) btnClass = "bg-emerald-500 border-emerald-400 text-white scale-105";
                  else if (isSelected) btnClass = "bg-red-500 border-red-400 text-white";
                  else btnClass = "opacity-30";
                }

                return (
                  <button
                    key={i}
                    onClick={() => handleNumberGameAnswer(opt)}
                    className={`p-8 rounded-[32px] border-2 font-black text-2xl transition-all shadow-sm ${btnClass}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            <AnimatePresence>
              {showGameFeedback && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="text-center"
                >
                  <button 
                    onClick={nextNumberQuestion}
                    className="px-12 py-5 bg-slate-900 text-white rounded-full font-black text-xl hover:bg-slate-800 transition-all active:scale-95 shadow-xl"
                  >
                    ՀԱՋՈՐԴԸ
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="text-center text-slate-400 font-black uppercase tracking-widest text-sm">
              Միավորներ: {gameScore} / {NUMBER_GAME_QUESTIONS.length}
            </div>
          </motion.div>
        );

      case 'greetings':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="space-y-12 pb-20"
          >
            <div className="bg-emerald-600 text-white rounded-[40px] p-10 relative overflow-hidden shadow-xl shadow-emerald-500/20">
              <Heart className="absolute top-4 right-4 w-12 h-12 text-white/20 animate-pulse" />
              <h2 className="text-4xl font-black mb-4 leading-tight uppercase tracking-tight">ՈՂՋՈՒՅՆՆԵՐ ԵՎ ՖՐԱԶՆԵՐ</h2>
              <p className="text-emerald-100 text-xl leading-relaxed font-medium">
                Ամենակարևոր բառերն ու արտահայտությունները իսպաներենով շփվելու համար:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {GREETINGS.map((item, i) => (
                <div key={i} className="p-8 bg-white border border-slate-200 rounded-[40px] shadow-sm hover:border-emerald-300 transition-all hover:shadow-md group">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-3xl font-black text-emerald-600 group-hover:scale-110 transition-transform inline-block">
                      {item.s}
                    </span>
                    <span className="text-slate-300 font-bold text-xs uppercase tracking-widest">
                      {item.e}
                    </span>
                  </div>
                  <p className="text-slate-600 font-bold text-lg leading-relaxed">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-10 bg-slate-900 text-white rounded-[40px] space-y-6">
              <h4 className="text-2xl font-black flex items-center gap-3">
                <Info className="w-6 h-6 text-emerald-400" />
                Խորհուրդ
              </h4>
              <p className="text-slate-300 font-medium leading-relaxed">
                Իսպաներենում հարցական և բացականչական նշանները դրվում են նաև նախադասության սկզբում՝ շրջված տեսքով (**¿** և **¡**): Սա օգնում է նախապես իմանալ նախադասության տոնայնությունը:
              </p>
            </div>
          </motion.div>
        );

      case 'tener-theory':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="space-y-12 pb-20"
          >
            <div className="bg-rose-600 text-white rounded-[40px] p-10 relative overflow-hidden shadow-xl shadow-rose-500/20">
              <Info className="absolute top-4 right-4 w-12 h-12 text-white/20 animate-pulse" />
              <h2 className="text-4xl font-black mb-4 leading-tight uppercase tracking-tight">TENER ԲԱՅԸ (ՈՒՆԵՆԱԼ)</h2>
              <p className="text-rose-100 text-xl leading-relaxed font-medium">
                Իսպաներենի ամենակարևոր բայերից մեկը: Այն օգտագործվում է ոչ միայն սեփականություն, այլև տարիք և զգացողություններ արտահայտելու համար:
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-[40px] overflow-hidden shadow-sm">
              <div className="bg-slate-50 p-6 border-b border-slate-200">
                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Խոնարհումը (Presente)</h3>
              </div>
              <div className="divide-y divide-slate-100">
                {TENER_CONJUGATION.map((item, i) => (
                  <div key={i} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <span className="text-slate-400 font-bold w-32">{item.p}</span>
                      <span className="text-2xl font-black text-rose-600">{item.v}</span>
                    </div>
                    <span className="text-slate-500 font-medium">{item.a}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-10 bg-slate-900 text-white rounded-[40px] space-y-6">
              <h4 className="text-2xl font-black flex items-center gap-3">
                <Info className="w-6 h-6 text-rose-400" />
                Կարևոր է իմանալ
              </h4>
              <ul className="space-y-4 text-slate-300 font-medium leading-relaxed">
                <li className="flex gap-3">
                  <span className="text-rose-400 font-black">1.</span>
                  <span>**Տարիք:** Իսպաներենում մենք ոչ թե «ենք» այսքան տարեկան, այլ «ունենք» տարիներ: (Yo tengo 20 años):</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-rose-400 font-black">2.</span>
                  <span>**Զգացողություններ:** Շատ զգացողություններ արտահայտվում են TENER-ով՝ սով (hambre), ծարավ (sed), վախ (miedo):</span>
                </li>
              </ul>
            </div>
          </motion.div>
        );

      case 'tener-quiz':
        if (isTenerGameOver) {
          return (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="space-y-8 text-center"
            >
              <div className="bg-amber-500 text-white rounded-[40px] p-12 shadow-xl">
                <Sparkles className="w-16 h-16 mx-auto mb-6 text-white" />
                <h2 className="text-4xl font-black mb-4 uppercase tracking-tight">Վիկտորինան ավարտվեց!</h2>
                <p className="text-amber-50 text-xl font-medium mb-8">
                  Քո միավորները: <span className="text-white text-3xl font-black">{tenerQuizScore} / {TENER_QUIZ_QUESTIONS.length}</span>
                </p>
                <button 
                  onClick={resetTenerGame}
                  className="px-12 py-5 bg-white text-amber-600 rounded-full font-black text-xl hover:bg-amber-50 transition-all active:scale-95 shadow-xl"
                >
                  ԿՐԿՆԵԼ
                </button>
              </div>
            </motion.div>
          );
        }
        const tq = TENER_QUIZ_QUESTIONS[currentTenerIndex];
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="bg-white border border-slate-200 rounded-[40px] p-10 shadow-sm text-center">
              <h3 className="text-slate-400 font-black uppercase tracking-widest text-sm mb-6">
                Հարց {currentTenerIndex + 1} / {TENER_QUIZ_QUESTIONS.length}
              </h3>
              <div className="text-4xl font-black text-slate-900 mb-6 leading-tight">
                {tq.q.split('___').map((part, i) => (
                  <React.Fragment key={i}>
                    {part}
                    {i === 0 && (
                      <span className="inline-block min-w-[120px] border-b-4 border-amber-400 text-amber-600 px-2">
                        {selectedTenerOption || '...'}
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </div>
              <p className="text-slate-500 font-medium italic">{tq.a}</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {tq.options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleTenerQuizAnswer(option)}
                  disabled={showTenerFeedback}
                  className={`
                    p-6 rounded-[32px] text-xl font-black transition-all active:scale-95 border-2
                    ${!showTenerFeedback 
                      ? 'bg-white border-slate-100 text-slate-700 hover:border-amber-400 hover:bg-amber-50' 
                      : option === tq.s
                        ? 'bg-emerald-500 border-emerald-500 text-white'
                        : option === selectedTenerOption
                          ? 'bg-rose-500 border-rose-500 text-white'
                          : 'bg-white border-slate-100 text-slate-300'
                    }
                  `}
                >
                  {option}
                </button>
              ))}
            </div>

            {showTenerFeedback && (
              <motion.button
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                onClick={nextTenerQuestion}
                className="w-full py-6 bg-slate-900 text-white rounded-[32px] font-black text-xl flex items-center justify-center gap-3 hover:bg-slate-800 transition-all active:scale-95 shadow-xl"
              >
                {currentTenerIndex === TENER_QUIZ_QUESTIONS.length - 1 ? 'ՏԵՍՆԵԼ ԱՐԴՅՈՒՆՔԸ' : 'ՀԱՋՈՐԴԸ'}
                <ChevronRight className="w-6 h-6" />
              </motion.button>
            )}

            <div className="text-center text-slate-400 font-black uppercase tracking-widest text-sm">
              Միավորներ: {tenerQuizScore} / {TENER_QUIZ_QUESTIONS.length}
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-pink-100">
      {/* Sidebar / Navigation */}
      <nav className="fixed top-0 left-0 h-full w-20 md:w-72 bg-white border-r border-slate-200 z-50 flex flex-col p-4 md:p-8">
        <div className="mb-12 flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-indigo-600/20">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <h1 className="hidden md:block text-xl font-black tracking-tighter uppercase">Spanish Guide</h1>
        </div>

        <div className="flex-1 space-y-2">
          {[
            { id: 'intro', icon: Sparkles, label: 'Ներածություն' },
            { id: 'greetings', icon: Heart, label: 'Ողջույններ' },
            { id: 'numbers-theory', icon: BookOpen, label: 'Թվեր (1-100)' },
            { id: 'numbers-game', icon: Gamepad2, label: 'Թվերի Խաղ' },
            { id: 'tener-theory', icon: Info, label: 'Tener Բայը' },
            { id: 'tener-quiz', icon: Gamepad2, label: 'Tener Խաղ' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id as Section)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all group ${
                activeSection === item.id 
                  ? 'bg-indigo-50 text-indigo-600' 
                  : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
              }`}
            >
              <item.icon className={`w-6 h-6 shrink-0 ${activeSection === item.id ? 'text-indigo-600' : ''}`} />
              <span className="hidden md:block font-black text-sm uppercase tracking-wider">{item.label}</span>
            </button>
          ))}
        </div>

        <div className="mt-auto hidden md:block">
          <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">Spanish Guide</p>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              Սովորիր իսպաներեն հեշտ և արագ:
            </p>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="pl-20 md:pl-72 min-h-screen">
        <div className="max-w-4xl mx-auto py-12 px-6 md:py-20 md:px-12">
          <AnimatePresence mode="wait">
            {renderContent()}
          </AnimatePresence>
        </div>
      </main>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 p-4 z-40 flex items-center justify-between">
        <span className="font-black tracking-tighter uppercase text-sm">Spanish Guide</span>
        <BookOpen className="w-6 h-6 text-indigo-600" />
      </div>
    </div>
  );
}
