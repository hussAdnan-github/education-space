
'use client';

import { useState, useRef, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  role: string;
  avatar: string;
  status: 'available' | 'busy' | 'meeting' | 'dnd';
  position: { x: number; y: number };
  achievements: string[];
  points: number;
}

interface InteractiveZone {
  id: string;
  type: 'main_hall' | 'classroom' | 'teachers_room' | 'playground' | 'cafeteria' | 'bathroom' | 'game_room' | 'lobby' | 'exhibition';
  name: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  color: string;
  icon: string;
  capacity: number;
  currentUsers: number;
}

interface VirtualClassroomProps {
  selectedRoom: string;
  currentUser: User;
  setCurrentUser: (user: User) => void;
}

export default function VirtualClassroom({ selectedRoom, currentUser, setCurrentUser }: VirtualClassroomProps) {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'أحمد محمد', role: 'طالب', avatar: 'student-male', status: 'available', position: { x: 200, y: 150 }, achievements: ['first_login', 'homework_master'], points: 250 },
    { id: 2, name: 'فاطمة أحمد', role: 'طالبة', avatar: 'student-female', status: 'busy', position: { x: 350, y: 200 }, achievements: ['perfect_attendance'], points: 180 },
    { id: 3, name: 'د. محمد علي', role: 'معلم', avatar: 'teacher-male', status: 'meeting', position: { x: 500, y: 100 }, achievements: ['mentor', 'innovator'], points: 500 },
    { id: 4, name: 'سارة خالد', role: 'طالبة', avatar: 'student-female', status: 'available', position: { x: 150, y: 300 }, achievements: ['team_player'], points: 120 },
    { id: 5, name: 'عمر حسن', role: 'طالب', avatar: 'student-male', status: 'dnd', position: { x: 400, y: 350 }, achievements: ['quiz_champion'], points: 300 }
  ]);

  const [interactiveZones] = useState<InteractiveZone[]>([
    { id: 'main_hall', type: 'main_hall', name: 'القاعة الرئيسية', position: { x: 300, y: 80 }, size: { width: 200, height: 120 }, color: 'bg-purple-500/30', icon: 'ri-presentation-line', capacity: 50, currentUsers: 15 },
    { id: 'classroom1', type: 'classroom', name: 'غرفة الصف الأولى', position: { x: 100, y: 250 }, size: { width: 150, height: 100 }, color: 'bg-blue-500/30', icon: 'ri-school-line', capacity: 30, currentUsers: 12 },
    { id: 'teachers_room', type: 'teachers_room', name: 'غرفة المعلمين', position: { x: 550, y: 200 }, size: { width: 120, height: 80 }, color: 'bg-green-500/30', icon: 'ri-user-star-line', capacity: 10, currentUsers: 3 },
    { id: 'playground', type: 'playground', name: 'الساحة الترفيهية', position: { x: 350, y: 400 }, size: { width: 180, height: 120 }, color: 'bg-yellow-500/30', icon: 'ri-football-line', capacity: 40, currentUsers: 8 },
    { id: 'cafeteria', type: 'cafeteria', name: 'غرفة الطعام', position: { x: 80, y: 450 }, size: { width: 140, height: 80 }, color: 'bg-orange-500/30', icon: 'ri-restaurant-line', capacity: 25, currentUsers: 6 },
    { id: 'game_room', type: 'game_room', name: 'غرفة الألعاب', position: { x: 580, y: 350 }, size: { width: 120, height: 100 }, color: 'bg-pink-500/30', icon: 'ri-gamepad-line', capacity: 15, currentUsers: 4 },
    { id: 'lobby', type: 'lobby', name: 'الردهة', position: { x: 250, y: 550 }, size: { width: 200, height: 60 }, color: 'bg-indigo-500/30', icon: 'ri-door-open-line', capacity: 20, currentUsers: 7 },
    { id: 'exhibition', type: 'exhibition', name: 'غرفة المعارض', position: { x: 480, y: 450 }, size: { width: 140, height: 90 }, color: 'bg-teal-500/30', icon: 'ri-gallery-line', capacity: 30, currentUsers: 5 }
  ]);

  const [showGameModal, setShowGameModal] = useState(false);
  const [selectedGame, setSelectedGame] = useState('');
  const [showAchievements, setShowAchievements] = useState(false);
  const [aiAssistantActive, setAiAssistantActive] = useState(false);
  const [virtualTime, setVirtualTime] = useState('09:30');
  const [isDragging, setIsDragging] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const games = [
    { id: 'chess', name: 'الشطرنج', icon: 'ri-chess-line', players: '2' },
    { id: 'monopoly', name: 'مونوبولي', icon: 'ri-building-line', players: '2-6' },
    { id: 'math_quiz', name: 'مسابقة الرياضيات', icon: 'ri-calculator-line', players: '1-10' },
    { id: 'word_game', name: 'لعبة الكلمات', icon: 'ri-book-open-line', players: '2-8' },
    { id: 'puzzle', name: 'الألغاز المنطقية', icon: 'ri-puzzle-line', players: '1-4' }
  ];

  const achievements = [
    { id: 'first_login', name: 'أول تسجيل دخول', icon: 'ri-login-circle-line', color: 'text-blue-500' },
    { id: 'homework_master', name: 'بطل الواجبات', icon: 'ri-trophy-line', color: 'text-yellow-500' },
    { id: 'perfect_attendance', name: 'الحضور المثالي', icon: 'ri-calendar-check-line', color: 'text-green-500' },
    { id: 'mentor', name: 'المرشد', icon: 'ri-user-heart-line', color: 'text-purple-500' },
    { id: 'innovator', name: 'المبتكر', icon: 'ri-lightbulb-line', color: 'text-orange-500' },
    { id: 'team_player', name: 'روح الفريق', icon: 'ri-team-line', color: 'text-indigo-500' },
    { id: 'quiz_champion', name: 'بطل المسابقات', icon: 'ri-medal-line', color: 'text-red-500' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setVirtualTime(`${hours}:${minutes}`);
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
  };

  const handleZoneClick = (zone: InteractiveZone) => {
    console.log(`الانتقال إلى ${zone.name}`);
    // هنا يمكن إضافة منطق الانتقال بين المناطق
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && selectedUser && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const updatedUser = { ...selectedUser, position: { x, y } };
      setUsers(prev => prev.map(u => u.id === selectedUser.id ? updatedUser : u));
      if (selectedUser.id === currentUser.id) {
        setCurrentUser(updatedUser);
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setSelectedUser(null);
  };

  const handleMouseDown = (user: User) => {
    setIsDragging(true);
    setSelectedUser(user);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-400';
      case 'busy': return 'bg-yellow-400';
      case 'meeting': return 'bg-red-400';
      case 'dnd': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available': return 'متاح';
      case 'busy': return 'مشغول';
      case 'meeting': return 'في اجتماع';
      case 'dnd': return 'لا تزعج';
      default: return 'غير متصل';
    }
  };

  const getAvatarIcon = (avatar: string) => {
    switch (avatar) {
      case 'teacher-male': return 'ri-user-star-line';
      case 'teacher-female': return 'ri-user-heart-line';
      case 'student-male': return 'ri-user-3-line';
      case 'student-female': return 'ri-user-2-line';
      default: return 'ri-user-line';
    }
  };

  const roomBackgrounds = {
    classroom1: "url('https://readdy.ai/api/search-image?query=Virtual%20classroom%20interior%20with%20wooden%20floors%2C%20modern%20desks%2C%20chairs%2C%20whiteboard%2C%20bookshelves%2C%20bright%20lighting%2C%20educational%20environment%2C%20top-down%20view%2C%20clean%20organized%20space%2C%20school%20furniture%20arrangement&width=800&height=600&seq=classroom1&orientation=landscape')",
    classroom2: "url('https://readdy.ai/api/search-image?query=Science%20laboratory%20virtual%20room%20with%20lab%20tables%2C%20equipment%2C%20cabinets%2C%20modern%20lighting%2C%20educational%20setting%2C%20top-down%20perspective%2C%20organized%20workspace%2C%20professional%20environment&width=800&height=600&seq=lab1&orientation=landscape')",
    library: "url('https://readdy.ai/api/search-image?query=Virtual%20library%20interior%20with%20bookshelves%2C%20reading%20tables%2C%20comfortable%20chairs%2C%20quiet%20study%20area%2C%20warm%20lighting%2C%20academic%20atmosphere%2C%20top-down%20view%2C%20organized%20layout&width=800&height=600&seq=library1&orientation=landscape')",
    meeting: "url('https://readdy.ai/api/search-image?query=Virtual%20meeting%20room%20with%20conference%20table%2C%20office%20chairs%2C%20presentation%20screen%2C%20professional%20lighting%2C%20business%20environment%2C%20top-down%20view%2C%20modern%20office%20design&width=800&height=600&seq=meeting1&orientation=landscape')"
  };

  return (
    <div className="relative w-full h-full bg-gray-700 overflow-hidden">
      {/* Room Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: roomBackgrounds[selectedRoom as keyof typeof roomBackgrounds] }}
      ></div>

      {/* Interactive Zones */}
      <div 
        ref={containerRef}
        className="relative w-full h-full cursor-crosshair"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {/* Zones */}
        {interactiveZones.map(zone => (
          <div
            key={zone.id}
            onClick={() => handleZoneClick(zone)}
            className={`absolute ${zone.color} border-2 border-white/50 rounded-xl cursor-pointer hover:bg-opacity-50 transition-all flex flex-col items-center justify-center text-white`}
            style={{
              left: zone.position.x,
              top: zone.position.y,
              width: zone.size.width,
              height: zone.size.height
            }}
          >
            <i className={`${zone.icon} text-2xl mb-2`}></i>
            <span className="text-sm font-medium text-center">{zone.name}</span>
            <div className="text-xs mt-1 bg-black/30 px-2 py-1 rounded">
              {zone.currentUsers}/{zone.capacity}
            </div>
          </div>
        ))}

        {/* Users/Avatars */}
        {users.map(user => (
          <div
            key={user.id}
            className={`absolute flex flex-col items-center cursor-pointer transform transition-all duration-200 ${
              user.id === currentUser.id ? 'scale-110' : 'hover:scale-105'
            }`}
            style={{
              left: user.position.x - 25,
              top: user.position.y - 25
            }}
            onClick={() => handleUserClick(user)}
            onMouseDown={() => handleMouseDown(user)}
          >
            {/* Avatar Circle */}
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-xl border-2 ${
              user.role === 'معلم' ? 'bg-purple-600 border-purple-400' :
              user.role === 'طالب' ? 'bg-blue-600 border-blue-400' :
              'bg-green-600 border-green-400'
            } ${user.id === currentUser.id ? 'ring-2 ring-yellow-400' : ''}`}>
              <i className={getAvatarIcon(user.avatar)}></i>
            </div>
            
            {/* Status Indicator */}
            <div className={`absolute -top-1 -right-1 w-4 h-4 ${getStatusColor(user.status)} rounded-full border-2 border-white`}></div>

            {/* Name Label */}
            <div className="mt-1 px-2 py-1 bg-black/70 rounded text-white text-xs whitespace-nowrap">
              {user.name}
            </div>

            {/* Points Badge */}
            <div className="mt-1 px-2 py-1 bg-yellow-600/80 rounded-full text-yellow-100 text-xs flex items-center">
              <i className="ri-coin-line mr-1"></i>
              {user.points}
            </div>
          </div>
        ))}
      </div>

      {/* Virtual Time & AI Assistant */}
      <div className="absolute top-4 left-4 space-y-2">
        <div className="bg-black/70 rounded-lg px-4 py-2 text-white">
          <div className="flex items-center space-x-2">
            <i className="ri-time-line"></i>
            <span>الوقت الافتراضي: {virtualTime}</span>
          </div>
        </div>
        
        <button
          onClick={() => setAiAssistantActive(!aiAssistantActive)}
          className={`bg-black/70 rounded-lg px-4 py-2 text-white hover:bg-black/80 transition-colors cursor-pointer ${
            aiAssistantActive ? 'ring-2 ring-blue-400' : ''
          }`}
        >
          <i className="ri-robot-line mr-2"></i>
          المساعد الذكي
        </button>
      </div>

      {/* Room Info & Quick Actions */}
      <div className="absolute top-4 right-4 space-y-2">
        <div className="bg-black/70 rounded-lg px-4 py-2 text-white">
          <div className="flex items-center space-x-2">
            <i className="ri-home-4-line"></i>
            <span>البيئة التفاعلية</span>
            <span className="text-green-400">({users.length} مستخدم)</span>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => setShowGameModal(true)}
            className="bg-pink-600/80 rounded-lg px-3 py-2 text-white hover:bg-pink-700/80 transition-colors cursor-pointer whitespace-nowrap"
          >
            <i className="ri-gamepad-line mr-1"></i>
            الألعاب
          </button>
          
          <button
            onClick={() => setShowAchievements(true)}
            className="bg-yellow-600/80 rounded-lg px-3 py-2 text-white hover:bg-yellow-700/80 transition-colors cursor-pointer whitespace-nowrap"
          >
            <i className="ri-trophy-line mr-1"></i>
            الإنجازات
          </button>
        </div>
      </div>

      {/* Smart Navigation Map */}
      <div className="absolute bottom-4 right-4 w-40 h-32 bg-black/70 rounded border border-gray-600">
        <div className="p-2">
          <h4 className="text-white text-xs font-medium mb-2">الخريطة الذكية</h4>
          <div className="relative w-full h-full">
            {interactiveZones.map(zone => (
              <div
                key={`mini-${zone.id}`}
                className={`absolute ${zone.color} rounded cursor-pointer hover:opacity-80`}
                style={{
                  left: (zone.position.x / 800) * 136,
                  top: (zone.position.y / 600) * 100,
                  width: (zone.size.width / 800) * 136,
                  height: (zone.size.height / 600) * 100,
                  minWidth: '8px',
                  minHeight: '6px'
                }}
                onClick={() => handleZoneClick(zone)}
                title={zone.name}
              ></div>
            ))}
            {users.map(user => (
              <div
                key={`mini-user-${user.id}`}
                className={`absolute w-2 h-2 rounded-full ${
                  user.role === 'معلم' ? 'bg-purple-400' : 'bg-blue-400'
                }`}
                style={{
                  left: (user.position.x / 800) * 136,
                  top: (user.position.y / 600) * 100
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Games Modal */}
      {showGameModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full m-4">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">الألعاب التفاعلية</h2>
                <button
                  onClick={() => setShowGameModal(false)}
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  <i className="ri-close-line text-gray-600"></i>
                </button>
              </div>
            </div>
            <div className="p-6 space-y-3">
              {games.map(game => (
                <button
                  key={game.id}
                  onClick={() => {
                    setSelectedGame(game.id);
                    setShowGameModal(false);
                  }}
                  className="w-full p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-right cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <i className={`${game.icon} text-2xl text-blue-600`}></i>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800">{game.name}</h3>
                      <p className="text-sm text-gray-600">{game.players} لاعبين</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Achievements Modal */}
      {showAchievements && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full m-4">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">الإنجازات والنقاط</h2>
                <button
                  onClick={() => setShowAchievements(false)}
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  <i className="ri-close-line text-gray-600"></i>
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-blue-600">{currentUser.points}</div>
                <div className="text-gray-600">إجمالي النقاط</div>
              </div>
              <div className="space-y-3">
                {achievements.map(achievement => (
                  <div
                    key={achievement.id}
                    className={`p-3 rounded-lg border-2 ${
                      currentUser.achievements.includes(achievement.id)
                        ? 'border-green-200 bg-green-50'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <i className={`${achievement.icon} text-xl ${
                        currentUser.achievements.includes(achievement.id)
                          ? achievement.color
                          : 'text-gray-400'
                      }`}></i>
                      <div className="flex-1">
                        <h3 className={`font-medium ${
                          currentUser.achievements.includes(achievement.id)
                            ? 'text-gray-800'
                            : 'text-gray-500'
                        }`}>
                          {achievement.name}
                        </h3>
                      </div>
                      {currentUser.achievements.includes(achievement.id) && (
                        <i className="ri-check-line text-green-600"></i>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Assistant Panel */}
      {aiAssistantActive && (
        <div className="absolute bottom-20 left-4 w-80 bg-white rounded-xl shadow-xl border">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-bold text-gray-800 flex items-center">
              <i className="ri-robot-line mr-2 text-blue-600"></i>
              المساعد الذكي
            </h3>
          </div>
          <div className="p-4 space-y-3">
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-blue-800">
                <i className="ri-lightbulb-line mr-1"></i>
                لديك محاضرة في غرفة الصف الأولى خلال 10 دقائق
              </p>
            </div>
            <div className="bg-yellow-50 p-3 rounded-lg">
              <p className="text-sm text-yellow-800">
                <i className="ri-alarm-warning-line mr-1"></i>
                تذكير: واجب الرياضيات مستحق اليوم
              </p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <p className="text-sm text-green-800">
                <i className="ri-trophy-line mr-1"></i>
                تهانينا! حصلت على إنجاز جديد "الحضور المثالي"
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
