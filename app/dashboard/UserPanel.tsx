
'use client';

import { useState } from 'react';

interface User {
  id: number;
  name: string;
  role: string;
  avatar: string;
  position: { x: number; y: number };
}

interface UserPanelProps {
  currentUser: User;
}

export default function UserPanel({ currentUser }: UserPanelProps) {
  const [activeTab, setActiveTab] = useState('users');
  const [chatMessage, setChatMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  const users = [
    { id: 1, name: 'أحمد محمد', role: 'طالب', status: 'online', avatar: 'student-male', lastSeen: 'الآن' },
    { id: 2, name: 'فاطمة أحمد', role: 'طالبة', status: 'online', avatar: 'student-female', lastSeen: 'منذ دقيقتين' },
    { id: 3, name: 'د. محمد علي', role: 'معلم', status: 'online', avatar: 'teacher-male', lastSeen: 'الآن' },
    { id: 4, name: 'سارة خالد', role: 'طالبة', status: 'away', avatar: 'student-female', lastSeen: 'منذ 5 دقائق' },
    { id: 5, name: 'عمر حسن', role: 'طالب', status: 'online', avatar: 'student-male', lastSeen: 'منذ دقيقة' }
  ];

  const chatMessages = [
    { id: 1, user: 'د. محمد علي', message: 'أهلاً وسهلاً بكم في الحصة', time: '10:30', type: 'teacher', avatar: 'teacher-male' },
    { id: 2, user: 'أحمد محمد', message: 'صباح الخير دكتور', time: '10:31', type: 'student', avatar: 'student-male' },
    { id: 3, user: 'فاطمة أحمد', message: 'هل يمكنني طرح سؤال؟', time: '10:32', type: 'student', avatar: 'student-female' },
    { id: 4, user: 'د. محمد علي', message: 'بالطبع، تفضلي', time: '10:33', type: 'teacher', avatar: 'teacher-male' },
    { id: 5, user: 'سارة خالد', message: 'شكراً لكم على الشرح الرائع', time: '10:35', type: 'student', avatar: 'student-female' }
  ];

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      setChatMessage('');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'busy': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online': return 'متصل';
      case 'away': return 'غائب';
      case 'busy': return 'مشغول';
      default: return 'غير متصل';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'معلم': return 'bg-purple-100 text-purple-700';
      case 'طالب': return 'bg-blue-100 text-blue-700';
      case 'طالبة': return 'bg-pink-100 text-pink-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getAvatarGradient = (role: string) => {
    switch (role) {
      case 'معلم': return 'from-purple-500 to-indigo-600';
      case 'طالب': return 'from-blue-500 to-cyan-600';
      case 'طالبة': return 'from-pink-500 to-rose-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Enhanced Tab Navigation */}
      <div className="flex border-b border-gray-200">
        <button
          className={`flex-1 px-4 py-4 text-sm font-medium transition-all duration-200 cursor-pointer relative ${
            activeTab === 'users' 
              ? 'text-blue-600 bg-blue-50' 
              : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
          }`}
          onClick={() => setActiveTab('users')}
        >
          <div className="flex items-center justify-center space-x-2">
            <i className="ri-group-line"></i>
            <span>المستخدمون</span>
            <div className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">
              {users.length}
            </div>
          </div>
          {activeTab === 'users' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
          )}
        </button>
        
        <button
          className={`flex-1 px-4 py-4 text-sm font-medium transition-all duration-200 cursor-pointer relative ${
            activeTab === 'chat' 
              ? 'text-blue-600 bg-blue-50' 
              : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
          }`}
          onClick={() => setActiveTab('chat')}
        >
          <div className="flex items-center justify-center space-x-2">
            <i className="ri-chat-3-line"></i>
            <span>المحادثة</span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          {activeTab === 'chat' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
          )}
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'users' && (
          <div className="h-full flex flex-col">
            {/* Search Bar */}
            <div className="p-4 border-b border-gray-100">
              <div className="relative">
                <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  placeholder="البحث عن المستخدمين..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Current User Profile */}
            <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getAvatarGradient(currentUser.role)} flex items-center justify-center text-white shadow-lg`}>
                  <i className="ri-user-line text-lg"></i>
                </div>
                <div className="flex-1">
                  <div className="text-gray-800 font-bold">{currentUser.name}</div>
                  <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(currentUser.role)}`}>
                    {currentUser.role}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="w-8 h-8 bg-white/80 hover:bg-white rounded-lg flex items-center justify-center text-gray-600 hover:text-blue-600 transition-all shadow-sm cursor-pointer">
                    <i className="ri-settings-line text-sm"></i>
                  </button>
                  <button className="w-8 h-8 bg-white/80 hover:bg-white rounded-lg flex items-center justify-center text-gray-600 hover:text-green-600 transition-all shadow-sm cursor-pointer">
                    <i className="ri-notification-line text-sm"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Users List */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-2">
                {filteredUsers.length > 0 ? (
                  <div className="space-y-1">
                    {filteredUsers.map(user => (
                      <div key={user.id} className="group flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-all duration-200 cursor-pointer">
                        <div className="relative">
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${getAvatarGradient(user.role)} flex items-center justify-center text-white shadow-md`}>
                            <i className="ri-user-line text-sm"></i>
                          </div>
                          <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusColor(user.status)} rounded-full border-2 border-white shadow-sm`}></div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="text-gray-800 font-medium truncate">{user.name}</div>
                          <div className="flex items-center space-x-2">
                            <span className={`inline-block px-2 py-0.5 rounded-full text-xs ${getRoleColor(user.role)}`}>
                              {user.role}
                            </span>
                            <span className="text-xs text-gray-500">{user.lastSeen}</span>
                          </div>
                        </div>
                        
                        <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="w-7 h-7 bg-blue-100 hover:bg-blue-200 rounded-lg flex items-center justify-center text-blue-600 transition-colors cursor-pointer">
                            <i className="ri-message-3-line text-xs"></i>
                          </button>
                          <button className="w-7 h-7 bg-green-100 hover:bg-green-200 rounded-lg flex items-center justify-center text-green-600 transition-colors cursor-pointer">
                            <i className="ri-phone-line text-xs"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <i className="ri-search-line text-4xl text-gray-300 mb-3"></i>
                    <p className="text-gray-500">لا توجد نتائج للبحث</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'chat' && (
          <div className="h-full flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-green-50 to-blue-50">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center text-white">
                  <i className="ri-chat-3-line"></i>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">المحادثة العامة</h3>
                  <p className="text-sm text-gray-600">الفصل الأول</p>
                </div>
                <div className="flex-1"></div>
                <button className="w-8 h-8 bg-white/80 hover:bg-white rounded-lg flex items-center justify-center text-gray-600 hover:text-blue-600 transition-all shadow-sm cursor-pointer">
                  <i className="ri-more-2-line"></i>
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages.map(msg => (
                <div key={msg.id} className={`flex space-x-3 ${msg.type === 'teacher' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${getAvatarGradient(msg.type === 'teacher' ? 'معلم' : 'طالب')} flex items-center justify-center text-white flex-shrink-0`}>
                    <i className="ri-user-line text-xs"></i>
                  </div>
                  <div className={`flex-1 ${msg.type === 'teacher' ? 'text-right' : ''}`}>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm font-medium text-gray-800">{msg.user}</span>
                      <span className="text-xs text-gray-500">{msg.time}</span>
                    </div>
                    <div className={`inline-block max-w-xs rounded-2xl px-4 py-2 ${
                      msg.type === 'teacher' 
                        ? 'bg-gradient-to-br from-purple-500 to-indigo-600 text-white' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      <p className="text-sm">{msg.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Enhanced Chat Input */}
            <div className="p-4 border-t border-gray-100 bg-gray-50">
              <div className="flex items-end space-x-3">
                <button className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-xl flex items-center justify-center text-gray-600 transition-colors cursor-pointer">
                  <i className="ri-attachment-line"></i>
                </button>
                
                <div className="flex-1">
                  <textarea
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    placeholder="اكتب رسالتك هنا..."
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    rows={2}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                </div>
                
                <button 
                  onClick={handleSendMessage}
                  disabled={!chatMessage.trim()}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-white transition-all cursor-pointer ${
                    chatMessage.trim() 
                      ? 'bg-gradient-to-br from-blue-500 to-purple-600 hover:shadow-lg' 
                      : 'bg-gray-300 cursor-not-allowed'
                  }`}
                >
                  <i className="ri-send-plane-line"></i>
                </button>
              </div>
              
              {/* Quick Actions */}
              <div className="flex space-x-2 mt-3">
                <button className="flex items-center px-3 py-1 bg-white rounded-full text-xs text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer">
                  <i className="ri-emotion-line mr-1"></i>
                  رموز تعبيرية
                </button>
                <button className="flex items-center px-3 py-1 bg-white rounded-full text-xs text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors cursor-pointer">
                  <i className="ri-hand-heart-line mr-1"></i>
                  رفع اليد
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
