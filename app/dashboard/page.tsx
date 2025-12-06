
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import VirtualClassroom from './VirtualClassroom';
import UserPanel from './UserPanel';
import ControlPanel from './ControlPanel';
import VirtualClock from '../components/VirtualClock';
import AIAssistant from '../components/AIAssistant';

export default function Dashboard() {
  const [selectedRoom, setSelectedRoom] = useState('classroom1');
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(false);
  const [aiAssistantActive, setAiAssistantActive] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('spaces');
  const [currentUser, setCurrentUser] = useState({
    id: 1,
    name: 'أحمد محمد',
    role: 'طالب', // يمكن أن يكون: 'طالب', 'معلم', 'مدير_منصة'
    avatar: 'student-male',
    position: { x: 200, y: 150 },
    achievements: ['first_login', 'homework_master'],
    points: 250
  });

  // خيارات مختلفة حسب نوع المستخدم
  const getUserSpecificOptions = (role: string) => {
    switch (role) {
      case 'مدير_منصة':
        return [
          { id: 'analytics', name: 'التحليلات', icon: 'ri-bar-chart-line', href: '/admin/platform' },
          { id: 'users', name: 'إدارة المستخدمين', icon: 'ri-team-line', href: '/admin/users' },
          { id: 'organizations', name: 'المؤسسات', icon: 'ri-building-line', href: '/admin/organization' },
          { id: 'settings', name: 'إعدادات النظام', icon: 'ri-settings-line', href: '/admin/platform' }
        ];
      case 'معلم':
        return [
          { id: 'classes', name: 'فصولي', icon: 'ri-school-line', href: '/admin/teacher' },
          { id: 'assignments', name: 'الواجبات', icon: 'ri-task-line', href: '/assignments' },
          { id: 'grades', name: 'الدرجات', icon: 'ri-award-line', href: '/admin/teacher' },
          { id: 'students', name: 'الطلاب', icon: 'ri-group-line', href: '/admin/teacher' }
        ];
      case 'طالب':
      default:
        return [
          { id: 'assignments', name: 'واجباتي', icon: 'ri-task-line', href: '/assignments' },
          { id: 'grades', name: 'درجاتي', icon: 'ri-award-line', href: '/profile' },
          { id: 'games', name: 'الألعاب', icon: 'ri-gamepad-line', href: '/games' },
          { id: 'communication', name: 'التواصل', icon: 'ri-chat-3-line', href: '/communication' }
        ];
    }
  };

  const userOptions = getUserSpecificOptions(currentUser.role);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex">
      {/* Sidebar */}
      <div className={`bg-white/95 backdrop-blur-sm shadow-xl transition-all duration-300 flex flex-col ${
        sidebarCollapsed ? 'w-20' : 'w-80'
      }`}>
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-200/50">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <i className="ri-building-line text-white text-xl"></i>
                </div>
                <div>
                  <span className="text-gray-800 font-bold text-lg">المدرسة الافتراضية</span>
                  <div className="text-xs text-gray-500">منصة التعليم التفاعلي</div>
                </div>
              </Link>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors cursor-pointer"
            >
              <i className={`ri-${sidebarCollapsed ? 'arrow-right' : 'arrow-left'}-s-line text-gray-600`}></i>
            </button>
          </div>
        </div>

        {!sidebarCollapsed ? (
          <>
            {/* User Profile Section */}
            <div className="p-6 border-b border-gray-200/50 bg-gradient-to-r from-blue-50 to-purple-50">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                  <i className="ri-user-line text-2xl"></i>
                </div>
                <div className="flex-1">
                  <h3 className="text-gray-800 font-bold text-lg">{currentUser.name}</h3>
                  <p className="text-gray-600 text-sm">{currentUser.role}</p>
                  <div className="flex items-center mt-2 space-x-2">
                    <div className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                      متصل
                    </div>
                    <div className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs">
                      <i className="ri-coin-line mr-1"></i>
                      {currentUser.points} نقطة
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab('spaces')}
                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors cursor-pointer ${
                  activeTab === 'spaces'
                    ? 'text-blue-600 bg-blue-50 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                <i className="ri-building-2-line mr-2"></i>
                المساحات
              </button>
              <button
                onClick={() => setActiveTab('tools')}
                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors cursor-pointer ${
                  activeTab === 'tools'
                    ? 'text-blue-600 bg-blue-50 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                <i className="ri-tools-line mr-2"></i>
                الأدوات
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto">
              {activeTab === 'spaces' && (
                <div className="p-4 space-y-4">
                  {/* Quick Actions - خاص بكل نوع مستخدم */}
                  <div className="space-y-3">
                    <h3 className="text-gray-800 font-bold text-sm">الإجراءات السريعة</h3>
                    {userOptions.map(option => (
                      <Link
                        key={option.id}
                        href={option.href}
                        className="w-full p-3 bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 rounded-lg flex items-center space-x-3 transition-all cursor-pointer"
                      >
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white">
                          <i className={`${option.icon} text-sm`}></i>
                        </div>
                        <span className="text-gray-800 font-medium">{option.name}</span>
                      </Link>
                    ))}
                  </div>

                  {/* Available Spaces */}
                  <div className="space-y-3">
                    <h3 className="text-gray-800 font-bold text-sm">المساحات المتاحة</h3>
                    <div className="space-y-2">
                      {[
                        { id: 'main_hall', name: 'القاعة الرئيسية', users: 45, status: 'active', icon: 'ri-presentation-line', color: 'purple' },
                        { id: 'classroom1', name: 'الفصل الأول', users: 12, status: 'active', icon: 'ri-school-line', color: 'blue' },
                        { id: 'library', name: 'المكتبة الرقمية', users: 8, status: 'available', icon: 'ri-book-open-line', color: 'green' },
                        { id: 'lab', name: 'المختبر العلمي', users: 6, status: 'available', icon: 'ri-flask-line', color: 'orange' },
                        { id: 'playground', name: 'الساحة الترفيهية', users: 15, status: 'busy', icon: 'ri-football-line', color: 'pink' },
                        { id: 'cafeteria', name: 'الكافيتيريا', users: 20, status: 'available', icon: 'ri-restaurant-line', color: 'yellow' }
                      ].map(space => (
                        <button
                          key={space.id}
                          onClick={() => setSelectedRoom(space.id)}
                          className={`w-full p-3 rounded-lg flex items-center justify-between transition-all cursor-pointer ${
                            selectedRoom === space.id
                              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                              : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              selectedRoom === space.id ? 'bg-white/20' : `bg-${space.color}-100`
                            }`}>
                              <i className={`${space.icon} ${
                                selectedRoom === space.id ? 'text-white' : `text-${space.color}-600`
                              }`}></i>
                            </div>
                            <div className="text-right">
                              <div className="font-medium text-sm">{space.name}</div>
                              <div className={`text-xs ${
                                selectedRoom === space.id ? 'text-white/80' : 'text-gray-500'
                              }`}>
                                {space.users} مستخدم
                              </div>
                            </div>
                          </div>
                          <div className={`w-3 h-3 rounded-full ${
                            space.status === 'active' ? 'bg-green-400' :
                            space.status === 'busy' ? 'bg-red-400' : 'bg-gray-400'
                          }`}></div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="space-y-3">
                    <h3 className="text-gray-800 font-bold text-sm">النشاط الأخير</h3>
                    <div className="space-y-2">
                      {[
                        { user: 'د. محمد علي', action: 'بدأ محاضرة في الفصل الأول', time: 'منذ 5 دقائق', icon: 'ri-play-circle-line' },
                        { user: 'سارة أحمد', action: 'انضمت للمكتبة الرقمية', time: 'منذ 10 دقائق', icon: 'ri-user-add-line' },
                        { user: 'عمر حسن', action: 'حصل على نقاط إضافية', time: 'منذ 15 دقيقة', icon: 'ri-trophy-line' }
                      ].map((activity, index) => (
                        <div key={index} className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <i className={`${activity.icon} text-blue-600`}></i>
                            <div className="flex-1">
                              <p className="text-gray-800 text-sm font-medium">{activity.user}</p>
                              <p className="text-gray-600 text-xs">{activity.action}</p>
                              <p className="text-gray-500 text-xs">{activity.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'tools' && (
                <div className="p-4">
                  <ControlPanel 
                    selectedRoom={selectedRoom}
                    setSelectedRoom={setSelectedRoom}
                    isAudioEnabled={isAudioEnabled}
                    setIsAudioEnabled={setIsAudioEnabled}
                    isVideoEnabled={isVideoEnabled}
                    setIsVideoEnabled={setIsVideoEnabled}
                  />
                </div>
              )}
            </div>

            {/* Virtual Clock */}
            <div className="p-4 border-t border-gray-200/50">
              <VirtualClock />
            </div>
          </>
        ) : (
          /* Collapsed Sidebar Icons */
          <div className="flex flex-col items-center space-y-4 p-4 flex-1">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white">
              <i className="ri-user-line"></i>
            </div>
            {userOptions.slice(0, 4).map(option => (
              <Link
                key={option.id}
                href={option.href}
                className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center text-gray-600 hover:text-blue-600 transition-all cursor-pointer"
              >
                <i className={option.icon}></i>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200/50 shadow-sm px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Room Info */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3 bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 rounded-xl">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white">
                  <i className="ri-school-line"></i>
                </div>
                <div>
                  <h2 className="font-bold text-gray-800">{selectedRoom === 'classroom1' ? 'الفصل الأول' : 'المساحة الحالية'}</h2>
                  <p className="text-sm text-gray-600">حصة الرياضيات</p>
                </div>
              </div>

              {/* Connection Status */}
              <div className="flex items-center space-x-2 bg-green-50 px-3 py-2 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-700 text-sm font-medium">متصل - 15 مستخدم</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-4">
              {/* Audio/Video Controls */}
              <div className="flex space-x-2">
                <button
                  onClick={() => setIsAudioEnabled(!isAudioEnabled)}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                    isAudioEnabled 
                      ? 'bg-green-500 hover:bg-green-600 text-white' 
                      : 'bg-red-500 hover:bg-red-600 text-white'
                  }`}
                >
                  <i className={`${isAudioEnabled ? 'ri-mic-line' : 'ri-mic-off-line'}`}></i>
                </button>
                
                <button
                  onClick={() => setIsVideoEnabled(!isVideoEnabled)}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                    isVideoEnabled 
                      ? 'bg-green-500 hover:bg-green-600 text-white' 
                      : 'bg-red-500 hover:bg-red-600 text-white'
                  }`}
                >
                  <i className={`${isVideoEnabled ? 'ri-camera-line' : 'ri-camera-off-line'}`}></i>
                </button>
              </div>

              {/* AI Assistant Toggle */}
              <button 
                onClick={() => setAiAssistantActive(!aiAssistantActive)}
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                  aiAssistantActive 
                    ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                }`}
              >
                <i className="ri-robot-line"></i>
              </button>

              {/* Notifications */}
              <button className="relative w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors cursor-pointer">
                <i className="ri-notification-line text-gray-600"></i>
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-3 bg-gray-100 hover:bg-gray-200 rounded-lg px-3 py-2 transition-colors cursor-pointer"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white">
                    <i className="ri-user-line text-sm"></i>
                  </div>
                  <div className="hidden md:block text-right">
                    <div className="text-gray-800 font-medium text-sm">{currentUser.name}</div>
                    <div className="text-gray-500 text-xs">{currentUser.role}</div>
                  </div>
                  <i className={`ri-arrow-down-s-line text-gray-500 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`}></i>
                </button>

                {/* User Dropdown */}
                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="font-medium text-gray-800">{currentUser.name}</div>
                      <div className="text-sm text-gray-500">{currentUser.role}</div>
                    </div>
                    <Link href="/profile" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 cursor-pointer">
                      <i className="ri-user-settings-line mr-3 text-gray-500"></i>
                      الملف الشخصي
                    </Link>
                    <Link href="/communication" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 cursor-pointer">
                      <i className="ri-chat-3-line mr-3 text-gray-500"></i>
                      الرسائل
                    </Link>
                    <div className="border-t border-gray-100 my-2"></div>
                    <button className="flex items-center px-4 py-2 text-red-600 hover:bg-red-50 w-full cursor-pointer">
                      <i className="ri-logout-circle-line mr-3"></i>
                      تسجيل الخروج
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Virtual Classroom */}
        <div className="flex-1 bg-white/50">
          <VirtualClassroom 
            selectedRoom={selectedRoom}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        </div>
      </div>

      {/* AI Assistant */}
      <AIAssistant 
        currentUser={currentUser}
        isActive={aiAssistantActive}
        onClose={() => setAiAssistantActive(false)}
      />

      {/* Click outside to close dropdowns */}
      {userMenuOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setUserMenuOpen(false)}
        ></div>
      )}
    </div>
  );
}
