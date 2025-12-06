
'use client';

import { useState } from 'react';

interface ControlPanelProps {
  selectedRoom: string;
  setSelectedRoom: (room: string) => void;
  isAudioEnabled: boolean;
  setIsAudioEnabled: (enabled: boolean) => void;
  isVideoEnabled: boolean;
  setIsVideoEnabled: (enabled: boolean) => void;
}

export default function ControlPanel({
  selectedRoom,
  setSelectedRoom,
  isAudioEnabled,
  setIsAudioEnabled,
  isVideoEnabled,
  setIsVideoEnabled
}: ControlPanelProps) {
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [showWhiteboard, setShowWhiteboard] = useState(false);
  const [volume, setVolume] = useState(75);
  const [activeSection, setActiveSection] = useState('controls');

  const rooms = [
    { id: 'classroom1', name: 'الفصل الأول', icon: 'ri-school-line', users: 12, status: 'active' },
    { id: 'classroom2', name: 'المختبر العلمي', icon: 'ri-flask-line', users: 8, status: 'available' },
    { id: 'library', name: 'المكتبة', icon: 'ri-book-open-line', users: 15, status: 'busy' },
    { id: 'meeting', name: 'قاعة الاجتماعات', icon: 'ri-team-line', users: 6, status: 'available' }
  ];

  const tools = [
    { id: 'whiteboard', name: 'السبورة الذكية', icon: 'ri-artboard-line', active: showWhiteboard, color: 'purple' },
    { id: 'poll', name: 'استطلاع رأي', icon: 'ri-bar-chart-line', active: false, color: 'blue' },
    { id: 'quiz', name: 'اختبار سريع', icon: 'ri-question-line', active: false, color: 'green' },
    { id: 'breakout', name: 'غرف فرعية', icon: 'ri-group-2-line', active: false, color: 'orange' }
  ];

  const quickActions = [
    { id: 'record', name: 'بدء التسجيل', icon: 'ri-record-circle-line', color: 'from-red-500 to-pink-600' },
    { id: 'share', name: 'مشاركة الرابط', icon: 'ri-share-line', color: 'from-blue-500 to-cyan-600' },
    { id: 'present', name: 'بدء العرض', icon: 'ri-slideshow-line', color: 'from-purple-500 to-indigo-600' }
  ];

  const handleRoomChange = (roomId: string) => {
    setSelectedRoom(roomId);
  };

  const toggleTool = (toolId: string) => {
    if (toolId === 'whiteboard') {
      setShowWhiteboard(!showWhiteboard);
    }
  };

  const getRoomStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700 border-green-200';
      case 'busy': return 'bg-red-100 text-red-700 border-red-200';
      case 'available': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getToolColor = (color: string, active: boolean) => {
    if (active) {
      switch (color) {
        case 'purple': return 'bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-lg';
        case 'blue': return 'bg-gradient-to-br from-blue-500 to-cyan-600 text-white shadow-lg';
        case 'green': return 'bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg';
        case 'orange': return 'bg-gradient-to-br from-orange-500 to-red-600 text-white shadow-lg';
        default: return 'bg-gray-100 text-gray-700';
      }
    }
    return 'bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200';
  };

  return (
    <div className="bg-white border-t border-gray-200">
      {/* Section Tabs */}
      <div className="flex border-b border-gray-100">
        {[
          { id: 'controls', name: 'التحكم', icon: 'ri-equalizer-line' },
          { id: 'rooms', name: 'الغرف', icon: 'ri-building-line' },
          { id: 'tools', name: 'الأدوات', icon: 'ri-tools-line' }
        ].map(section => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`flex-1 px-3 py-3 text-sm font-medium transition-all cursor-pointer ${
              activeSection === section.id
                ? 'text-blue-600 bg-blue-50 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-center">
              <i className={`${section.icon} mr-2`}></i>
              <span className="hidden sm:inline">{section.name}</span>
            </div>
          </button>
        ))}
      </div>

      <div className="p-4 max-h-96 overflow-y-auto">
        {activeSection === 'controls' && (
          <div className="space-y-6">
            {/* Audio/Video Controls */}
            <div className="space-y-4">
              <h3 className="text-gray-800 font-bold text-sm flex items-center">
                <i className="ri-volume-up-line mr-2 text-blue-600"></i>
                التحكم الصوتي والمرئي
              </h3>
              
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setIsAudioEnabled(!isAudioEnabled)}
                  className={`p-4 rounded-xl flex flex-col items-center space-y-2 transition-all duration-300 cursor-pointer ${
                    isAudioEnabled 
                      ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg hover:shadow-xl' 
                      : 'bg-gradient-to-br from-red-500 to-pink-600 text-white shadow-lg hover:shadow-xl'
                  }`}
                >
                  <i className={`${isAudioEnabled ? 'ri-mic-line' : 'ri-mic-off-line'} text-xl`}></i>
                  <span className="text-sm font-medium">الميكروفون</span>
                  <span className="text-xs opacity-80">{isAudioEnabled ? 'مُفعل' : 'مُعطل'}</span>
                </button>

                <button
                  onClick={() => setIsVideoEnabled(!isVideoEnabled)}
                  className={`p-4 rounded-xl flex flex-col items-center space-y-2 transition-all duration-300 cursor-pointer ${
                    isVideoEnabled 
                      ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg hover:shadow-xl' 
                      : 'bg-gradient-to-br from-red-500 to-pink-600 text-white shadow-lg hover:shadow-xl'
                  }`}
                >
                  <i className={`${isVideoEnabled ? 'ri-camera-line' : 'ri-camera-off-line'} text-xl`}></i>
                  <span className="text-sm font-medium">الكاميرا</span>
                  <span className="text-xs opacity-80">{isVideoEnabled ? 'مُفعلة' : 'مُعطلة'}</span>
                </button>
              </div>

              {/* Additional Controls */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setIsScreenSharing(!isScreenSharing)}
                  className={`p-3 rounded-lg flex items-center space-x-2 transition-all cursor-pointer ${
                    isScreenSharing 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <i className="ri-computer-line"></i>
                  <span className="text-sm">مشاركة الشاشة</span>
                </button>

                <button className="p-3 rounded-lg flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all cursor-pointer">
                  <i className="ri-hand-heart-line"></i>
                  <span className="text-sm">رفع اليد</span>
                </button>
              </div>
            </div>

            {/* Volume Control */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-800 font-medium text-sm flex items-center">
                  <i className="ri-volume-down-line mr-2 text-blue-600"></i>
                  مستوى الصوت
                </span>
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">{volume}%</span>
              </div>
              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${volume}%, #e5e7eb ${volume}%, #e5e7eb 100%)`
                  }}
                />
              </div>
            </div>

            {/* Connection Status */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 border border-green-200">
              <h4 className="font-bold text-gray-800 text-sm mb-3">حالة الاتصال</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-sm">جودة الشبكة:</span>
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-4 bg-green-500 rounded"></div>
                      <div className="w-2 h-4 bg-green-500 rounded"></div>
                      <div className="w-2 h-4 bg-green-500 rounded"></div>
                      <div className="w-2 h-4 bg-gray-300 rounded"></div>
                    </div>
                    <span className="text-green-600 font-medium text-sm">ممتاز</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-sm">زمن الاستجابة:</span>
                  <span className="text-green-600 font-medium text-sm">12ms</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'rooms' && (
          <div className="space-y-4">
            <h3 className="text-gray-800 font-bold text-sm flex items-center">
              <i className="ri-building-line mr-2 text-blue-600"></i>
              الغرف المتاحة
            </h3>
            
            <div className="space-y-3">
              {rooms.map(room => (
                <button
                  key={room.id}
                  onClick={() => handleRoomChange(room.id)}
                  className={`w-full p-4 rounded-xl transition-all duration-200 cursor-pointer ${
                    selectedRoom === room.id 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      selectedRoom === room.id ? 'bg-white/20' : 'bg-gray-200'
                    }`}>
                      <i className={`${room.icon} text-xl ${selectedRoom === room.id ? 'text-white' : 'text-gray-600'}`}></i>
                    </div>
                    <div className="flex-1 text-right">
                      <div className="font-bold">{room.name}</div>
                      <div className="flex items-center justify-between mt-1">
                        <span className={`text-sm ${selectedRoom === room.id ? 'text-white/80' : 'text-gray-500'}`}>
                          {room.users} مستخدم
                        </span>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium border ${
                          selectedRoom === room.id ? 'bg-white/20 text-white border-white/30' : getRoomStatusColor(room.status)
                        }`}>
                          {room.status === 'active' ? 'نشط' : room.status === 'busy' ? 'مشغول' : 'متاح'}
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'tools' && (
          <div className="space-y-6">
            {/* Teaching Tools */}
            <div className="space-y-4">
              <h3 className="text-gray-800 font-bold text-sm flex items-center">
                <i className="ri-tools-line mr-2 text-blue-600"></i>
                أدوات التدريس
              </h3>
              
              <div className="grid grid-cols-2 gap-3">
                {tools.map(tool => (
                  <button
                    key={tool.id}
                    onClick={() => toggleTool(tool.id)}
                    className={`p-4 rounded-xl flex flex-col items-center space-y-2 transition-all duration-300 cursor-pointer ${getToolColor(tool.color, tool.active)}`}
                  >
                    <i className={`${tool.icon} text-xl`}></i>
                    <span className="text-sm font-medium text-center leading-tight">{tool.name}</span>
                    {tool.active && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-4">
              <h3 className="text-gray-800 font-bold text-sm flex items-center">
                <i className="ri-flashlight-line mr-2 text-blue-600"></i>
                إجراءات سريعة
              </h3>
              
              <div className="space-y-3">
                {quickActions.map(action => (
                  <button
                    key={action.id}
                    className={`w-full p-3 bg-gradient-to-r ${action.color} text-white rounded-lg hover:shadow-lg transition-all duration-300 cursor-pointer whitespace-nowrap`}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <i className={action.icon}></i>
                      <span className="font-medium">{action.name}</span>
                    </div>
                  </button>
                ))}
                
                <button className="w-full p-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 cursor-pointer whitespace-nowrap">
                  <div className="flex items-center justify-center space-x-2">
                    <i className="ri-logout-circle-line"></i>
                    <span className="font-medium">مغادرة الغرفة</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
