
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function GamesPage() {
  const [selectedCategory, setSelectedCategory] = useState('board');
  const [activeGame, setActiveGame] = useState<string | null>(null);

  const gameCategories = [
    { id: 'board', name: 'ألعاب لوحية', icon: 'ri-chess-line', count: 8 },
    { id: 'educational', name: 'ألعاب تعليمية', icon: 'ri-book-open-line', count: 12 },
    { id: 'puzzle', name: 'الألغاز', icon: 'ri-puzzle-line', count: 6 },
    { id: 'multiplayer', name: 'متعددة اللاعبين', icon: 'ri-team-line', count: 10 }
  ];

  const boardGames = [
    { id: 'chess', name: 'الشطرنج', description: 'لعبة استراتيجية كلاسيكية', players: '2', time: '30-60 دقيقة', difficulty: 'متقدم', icon: 'ri-chess-line' },
    { id: 'checkers', name: 'الداما', description: 'لعبة تكتيكية ممتعة', players: '2', time: '15-30 دقيقة', difficulty: 'متوسط', icon: 'ri-grid-line' },
    { id: 'monopoly', name: 'مونوبولي', description: 'لعبة العقارات الشهيرة', players: '2-6', time: '60-120 دقيقة', difficulty: 'سهل', icon: 'ri-building-line' },
    { id: 'scrabble', name: 'تكوين الكلمات', description: 'لعبة تحدي المفردات', players: '2-4', time: '45-60 دقيقة', difficulty: 'متوسط', icon: 'ri-font-size-2' },
    { id: 'backgammon', name: 'طاولة الزهر', description: 'لعبة الحظ والمهارة', players: '2', time: '20-40 دقيقة', difficulty: 'متوسط', icon: 'ri-dice-line' },
    { id: 'ludo', name: 'الطائرة', description: 'لعبة عائلية كلاسيكية', players: '2-4', time: '20-30 دقيقة', difficulty: 'سهل', icon: 'ri-plane-line' },
    { id: 'dominos', name: 'الدومينو', description: 'لعبة الأرقام والتطابق', players: '2-4', time: '15-25 دقيقة', difficulty: 'سهل', icon: 'ri-rectangle-line' },
    { id: 'tic_tac_toe', name: 'إكس أو', description: 'لعبة سريعة ومسلية', players: '2', time: '2-5 دقائق', difficulty: 'سهل', icon: 'ri-grid-fill' }
  ];

  const educationalGames = [
    { id: 'math_race', name: 'سباق الرياضيات', description: 'حل المسائل بأسرع وقت', players: '1-8', time: '10-15 دقيقة', difficulty: 'متوسط', icon: 'ri-calculator-line' },
    { id: 'word_builder', name: 'بناء الكلمات', description: 'تكوين كلمات من الحروف', players: '1-6', time: '15-20 دقيقة', difficulty: 'سهل', icon: 'ri-text' },
    { id: 'geography_quiz', name: 'مسابقة الجغرافيا', description: 'اختبر معرفتك بالعالم', players: '1-10', time: '20-30 دقيقة', difficulty: 'متوسط', icon: 'ri-earth-line' },
    { id: 'history_timeline', name: 'خط زمني تاريخي', description: 'رتب الأحداث التاريخية', players: '1-5', time: '25-35 دقيقة', difficulty: 'متقدم', icon: 'ri-time-line' },
    { id: 'science_lab', name: 'المختبر العلمي', description: 'تجارب علمية تفاعلية', players: '1-4', time: '30-45 دقيقة', difficulty: 'متقدم', icon: 'ri-flask-line' },
    { id: 'language_match', name: 'مطابقة اللغات', description: 'تعلم كلمات جديدة', players: '1-6', time: '15-25 دقيقة', difficulty: 'متوسط', icon: 'ri-translate-2' }
  ];

  const puzzleGames = [
    { id: 'jigsaw', name: 'تركيب الصور', description: 'قطع أحجية كلاسيكية', players: '1-4', time: '20-60 دقيقة', difficulty: 'متوسط', icon: 'ri-puzzle-line' },
    { id: 'sudoku', name: 'سودوكو', description: 'لعبة الأرقام المنطقية', players: '1', time: '15-45 دقيقة', difficulty: 'متقدم', icon: 'ri-grid-line' },
    { id: 'crossword', name: 'الكلمات المتقاطعة', description: 'حل الكلمات والمعاني', players: '1-2', time: '20-40 دقيقة', difficulty: 'متوسط', icon: 'ri-hashtag' },
    { id: 'logic_grid', name: 'شبكة المنطق', description: 'حل الألغاز المنطقية', players: '1', time: '25-50 دقيقة', difficulty: 'متقدم', icon: 'ri-mind-map' }
  ];

  const multiplayerGames = [
    { id: 'trivia', name: 'الثقافة العامة', description: 'أسئلة متنوعة تنافسية', players: '2-12', time: '20-30 دقيقة', difficulty: 'متوسط', icon: 'ri-question-line' },
    { id: 'drawing_guess', name: 'ارسم واستنتج', description: 'لعبة الرسم والتخمين', players: '4-10', time: '15-25 دقيقة', difficulty: 'سهل', icon: 'ri-brush-line' },
    { id: 'word_association', name: 'ربط الكلمات', description: 'ربط الكلمات بسرعة', players: '3-8', time: '10-20 دقيقة', difficulty: 'سهل', icon: 'ri-links-line' },
    { id: 'memory_match', name: 'مطابقة الذاكرة', description: 'تذكر وطابق البطاقات', players: '2-6', time: '10-15 دقيقة', difficulty: 'سهل', icon: 'ri-brain-line' }
  ];

  const getCurrentGames = () => {
    switch (selectedCategory) {
      case 'board': return boardGames;
      case 'educational': return educationalGames;
      case 'puzzle': return puzzleGames;
      case 'multiplayer': return multiplayerGames;
      default: return boardGames;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'سهل': return 'bg-green-100 text-green-800';
      case 'متوسط': return 'bg-yellow-100 text-yellow-800';
      case 'متقدم': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const startGame = (gameId: string) => {
    setActiveGame(gameId);
    console.log(`بدء اللعبة: ${gameId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/dashboard" className="w-10 h-10 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg flex items-center justify-center">
                <i className="ri-gamepad-line text-white text-xl"></i>
              </Link>
              <h1 className="text-2xl font-bold text-gray-800">مركز الألعاب التفاعلية</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                <i className="ri-user-line mr-1"></i>
                12 لاعب متصل
              </div>
              <Link href="/dashboard" className="text-gray-600 hover:text-gray-800 cursor-pointer">
                العودة للمدرسة الافتراضية
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Game Categories */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {gameCategories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`p-6 rounded-2xl transition-all cursor-pointer ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-700 hover:shadow-md'
              }`}
            >
              <div className="text-center">
                <i className={`${category.icon} text-3xl mb-3 block`}></i>
                <h3 className="font-bold text-lg mb-1">{category.name}</h3>
                <p className="text-sm opacity-75">{category.count} لعبة</p>
              </div>
            </button>
          ))}
        </div>

        {/* Category Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {gameCategories.find(cat => cat.id === selectedCategory)?.name}
          </h2>
          <div className="text-sm text-gray-600">
            {getCurrentGames().length} لعبة متاحة
          </div>
        </div>

        {/* Games Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {getCurrentGames().map(game => (
            <div key={game.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <i className={`${game.icon} text-white text-2xl`}></i>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(game.difficulty)}`}>
                    {game.difficulty}
                  </span>
                </div>

                <h3 className="font-bold text-lg text-gray-800 mb-2">{game.name}</h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{game.description}</p>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">عدد اللاعبين:</span>
                    <span className="font-medium text-gray-700">{game.players}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">مدة اللعب:</span>
                    <span className="font-medium text-gray-700">{game.time}</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => startGame(game.id)}
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-4 rounded-lg font-medium hover:shadow-md transition-all cursor-pointer whitespace-nowrap"
                  >
                    <i className="ri-play-line mr-2"></i>
                    ابدأ اللعب
                  </button>
                  <button className="bg-gray-100 text-gray-600 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer">
                    <i className="ri-information-line"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold">156</h3>
                <p className="opacity-90">إجمالي الألعاب المكتملة</p>
              </div>
              <i className="ri-trophy-line text-3xl opacity-75"></i>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold">24</h3>
                <p className="opacity-90">الألعاب النشطة الآن</p>
              </div>
              <i className="ri-play-circle-line text-3xl opacity-75"></i>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold">89</h3>
                <p className="opacity-90">لاعب مسجل</p>
              </div>
              <i className="ri-user-line text-3xl opacity-75"></i>
            </div>
          </div>
        </div>

        {/* Tournament Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">البطولات القادمة</h2>
            <p className="text-gray-600">انضم إلى المنافسات والفوز بجوائز مميزة</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">بطولة الشطرنج الكبرى</h3>
                <i className="ri-chess-line text-2xl"></i>
              </div>
              <p className="mb-4 opacity-90">بطولة أسبوعية للشطرنج مع جوائز قيمة</p>
              <div className="flex items-center justify-between">
                <span className="text-sm">البداية: غداً 7:00 م</span>
                <button className="bg-white text-orange-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors cursor-pointer whitespace-nowrap">
                  انضم الآن
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">مسابقة الرياضيات السريعة</h3>
                <i className="ri-calculator-line text-2xl"></i>
              </div>
              <p className="mb-4 opacity-90">تحدي حل المسائل في أسرع وقت ممكن</p>
              <div className="flex items-center justify-between">
                <span className="text-sm">البداية: الجمعة 4:00 م</span>
                <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors cursor-pointer whitespace-nowrap">
                  انضم الآن
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Game Modal */}
      {activeGame && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full m-4">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">بدء اللعبة</h2>
                <button
                  onClick={() => setActiveGame(null)}
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  <i className="ri-close-line text-gray-600"></i>
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-play-line text-white text-3xl"></i>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">جاري بدء اللعبة...</h3>
                <p className="text-gray-600 mb-6">انتظر قليلاً بينما نجهز اللعبة لك</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full animate-pulse" style={{ width: '75%' }}></div>
                </div>
                <button
                  onClick={() => setActiveGame(null)}
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors cursor-pointer whitespace-nowrap"
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
