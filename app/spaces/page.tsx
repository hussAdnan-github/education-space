'use client';

import { useState } from 'react';
import Link from 'next/link';
import RoomSettingsPanel from '../components/RoomSettingsPanel';

export default function VirtualSpacesPage() {
  const [selectedSpace, setSelectedSpace] = useState('school');
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [showRoomSettings, setShowRoomSettings] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [newRoom, setNewRoom] = useState({
    name: '',
    type: 'classroom',
    description: '',
    capacity: 30,
    features: []
  });

  const spaces = [
    {
      id: 'school',
      name: 'المدرسة الافتراضية',
      description: 'بيئة تعليمية شاملة للطلاب والمعلمين',
      rooms: 12,
      users: 45,
      icon: 'ri-school-line',
      image: "url('https://readdy.ai/api/search-image?query=Virtual%20school%20building%20interior%20with%20classrooms%2C%20library%2C%20laboratory%2C%20cafeteria%2C%20modern%20educational%20environment%2C%20bright%20lighting%2C%20clean%20organized%20layout%2C%20top-down%20view&width=400&height=300&seq=school1&orientation=landscape')"
    },
    {
      id: 'university',
      name: 'الجامعة الافتراضية',
      description: 'مساحة أكاديمية للتعليم العالي والبحث',
      rooms: 25,
      users: 120,
      icon: 'ri-building-2-line',
      image: "url('https://readdy.ai/api/search-image?query=Virtual%20university%20campus%20with%20lecture%20halls%2C%20research%20labs%2C%20library%2C%20meeting%20rooms%2C%20academic%20environment%2C%20professional%20lighting%2C%20modern%20architecture&width=400&height=300&seq=university1&orientation=landscape')"
    },
    {
      id: 'office',
      name: 'المكتب الافتراضي',
      description: 'مساحة عمل تعاونية للفرق والشركات',
      rooms: 18,
      users: 85,
      icon: 'ri-building-line',
      image: "url('https://readdy.ai/api/search-image?query=Virtual%20office%20space%20with%20meeting%20rooms%2C%20workstations%2C%20conference%20halls%2C%20break%20areas%2C%20professional%20business%20environment%2C%20modern%20furniture&width=400&height=300&seq=office1&orientation=landscape')"
    }
  ];

  const roomTypes = [
    { id: 'classroom', name: 'فصل دراسي', icon: 'ri-presentation-line', features: ['whiteboard', 'projector', 'desks'] },
    { id: 'laboratory', name: 'مختبر', icon: 'ri-flask-line', features: ['equipment', 'safety', 'experiments'] },
    { id: 'library', name: 'مكتبة', icon: 'ri-book-open-line', features: ['books', 'quiet', 'research'] },
    { id: 'meeting', name: 'قاعة اجتماعات', icon: 'ri-team-line', features: ['conference', 'presentation', 'video'] },
    { id: 'cafeteria', name: 'كافيتيريا', icon: 'ri-restaurant-line', features: ['social', 'break', 'networking'] },
    { id: 'auditorium', name: 'قاعة محاضرات', icon: 'ri-mic-line', features: ['large', 'presentation', 'audio'] }
  ];

  const spaceRooms = {
    school: [
      { id: 1, name: 'الفصل الأول - الرياضيات', type: 'classroom', users: 25, capacity: 30, status: 'active' },
      { id: 2, name: 'مختبر العلوم', type: 'laboratory', users: 15, capacity: 20, status: 'active' },
      { id: 3, name: 'المكتبة الرئيسية', type: 'library', users: 8, capacity: 50, status: 'active' },
      { id: 4, name: 'قاعة الاجتماعات', type: 'meeting', users: 12, capacity: 15, status: 'active' },
      { id: 5, name: 'الكافيتيريا', type: 'cafeteria', users: 35, capacity: 60, status: 'active' },
      { id: 6, name: 'قاعة المحاضرات الكبرى', type: 'auditorium', users: 0, capacity: 100, status: 'inactive' }
    ],
    university: [
      { id: 7, name: 'قاعة المحاضرات A', type: 'auditorium', users: 80, capacity: 120, status: 'active' },
      { id: 8, name: 'مختبر الكيمياء', type: 'laboratory', users: 20, capacity: 25, status: 'active' },
      { id: 9, name: 'مكتبة الكلية', type: 'library', users: 45, capacity: 100, status: 'active' },
      { id: 10, name: 'غرفة اجتماع الأساتذة', type: 'meeting', users: 8, capacity: 12, status: 'active' }
    ],
    office: [
      { id: 11, name: 'قاعة الاجتماعات الرئيسية', type: 'meeting', users: 15, capacity: 20, status: 'active' },
      { id: 12, name: 'غرفة العصف الذهني', type: 'meeting', users: 6, capacity: 8, status: 'active' },
      { id: 13, name: 'صالة الاستراحة', type: 'cafeteria', users: 12, capacity: 30, status: 'active' },
      { id: 14, name: 'قاعة العروض التقديمية', type: 'auditorium', users: 25, capacity: 50, status: 'active' }
    ]
  };

  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('إنشاء غرفة جديدة:', newRoom);
    setShowCreateRoom(false);
    setNewRoom({ name: '', type: 'classroom', description: '', capacity: 30, features: [] });
  };

  const handleRoomSettings = (room: any) => {
    setSelectedRoom(room);
    setShowRoomSettings(true);
  };

  const handleSaveRoomSettings = (settings: any) => {
    console.log('حفظ إعدادات الغرفة:', settings);
    // هنا يمكن إضافة منطق حفظ الإعدادات
  };

  const getRoomTypeInfo = (typeId: string) => {
    return roomTypes.find(type => type.id === typeId) || roomTypes[0];
  };

  const getCurrentSpace = () => {
    return spaces.find(space => space.id === selectedSpace) || spaces[0];
  };

  const getCurrentRooms = () => {
    return spaceRooms[selectedSpace as keyof typeof spaceRooms] || [];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/dashboard" className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <i className="ri-building-line text-white text-xl"></i>
              </Link>
              <h1 className="text-2xl font-bold text-gray-800">المساحات الافتراضية</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowCreateRoom(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-add-line mr-2"></i>
                إنشاء غرفة
              </button>
              <Link href="/dashboard" className="text-gray-600 hover:text-gray-800 cursor-pointer">
                العودة للوحة التحكم
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Space Selection */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {spaces.map(space => (
            <div
              key={space.id}
              onClick={() => setSelectedSpace(space.id)}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-all transform hover:scale-105 ${
                selectedSpace === space.id ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              <div 
                className="h-48 bg-cover bg-center relative"
                style={{ backgroundImage: space.image }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="flex items-center space-x-2 mb-2">
                    <i className={`${space.icon} text-2xl`}></i>
                    <h3 className="text-xl font-bold">{space.name}</h3>
                  </div>
                  <p className="text-sm opacity-90">{space.description}</p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">{space.rooms}</p>
                      <p className="text-sm text-gray-600">غرفة</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">{space.users}</p>
                      <p className="text-sm text-gray-600">مستخدم</p>
                    </div>
                  </div>
                  {selectedSpace === space.id && (
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <i className="ri-check-line text-blue-600"></i>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Space Overview */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
                <i className={`${getCurrentSpace().icon} text-blue-600 text-2xl`}></i>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{getCurrentSpace().name}</h2>
                <p className="text-gray-600">{getCurrentSpace().description}</p>
              </div>
            </div>
            <div className="text-left">
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600">{getCurrentRooms().length}</p>
                  <p className="text-sm text-gray-600">إجمالي الغرف</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600">{getCurrentRooms().filter(r => r.status === 'active').length}</p>
                  <p className="text-sm text-gray-600">نشطة</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-orange-600">{getCurrentRooms().reduce((sum, r) => sum + r.users, 0)}</p>
                  <p className="text-sm text-gray-600">مستخدم</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Map Placeholder */}
          <div className="bg-gray-100 rounded-xl h-64 flex items-center justify-center mb-6">
            <div className="text-center">
              <i className="ri-map-2-line text-4xl text-gray-400 mb-2"></i>
              <p className="text-gray-600">خريطة تفاعلية للمساحة</p>
              <p className="text-sm text-gray-500">انقر على الغرف للدخول إليها</p>
            </div>
          </div>
        </div>

        {/* Rooms Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getCurrentRooms().map(room => (
            <div key={room.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      room.status === 'active' ? 'bg-green-100' : 'bg-gray-100'
                    }`}>
                      <i className={`${getRoomTypeInfo(room.type).icon} text-lg ${
                        room.status === 'active' ? 'text-green-600' : 'text-gray-400'
                      }`}></i>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">{room.name}</h3>
                      <p className="text-sm text-gray-600">{getRoomTypeInfo(room.type).name}</p>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    room.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {room.status === 'active' ? 'نشطة' : 'غير نشطة'}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">المستخدمون الحاليون:</span>
                    <span className="font-medium text-gray-800">{room.users}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">السعة القصوى:</span>
                    <span className="font-medium text-gray-800">{room.capacity}</span>
                  </div>
                  
                  {/* Capacity Bar */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <span>الإشغال</span>
                      <span>{Math.round((room.users / room.capacity) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          (room.users / room.capacity) > 0.8 ? 'bg-red-500' :
                          (room.users / room.capacity) > 0.6 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${(room.users / room.capacity) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Room Features */}
                  <div className="flex flex-wrap gap-1 mt-3">
                    {getRoomTypeInfo(room.type).features.map((feature, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-2 mt-6">
                  <Link
                    href={`/dashboard?room=${room.id}`}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors text-center cursor-pointer whitespace-nowrap"
                  >
                    دخول الغرفة
                  </Link>
                  <button 
                    onClick={() => handleRoomSettings(room)}
                    className="bg-gray-100 text-gray-600 py-2 px-4 rounded-lg text-sm hover:bg-gray-200 transition-colors cursor-pointer"
                  >
                    <i className="ri-settings-line"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {getCurrentRooms().length === 0 && (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <i className="ri-home-4-line text-4xl text-gray-400 mb-4"></i>
            <h3 className="text-xl font-bold text-gray-800 mb-2">لا توجد غرف في هذه المساحة</h3>
            <p className="text-gray-600 mb-6">ابدأ بإنشاء غرفة جديدة لاستخدام هذه المساحة</p>
            <button
              onClick={() => setShowCreateRoom(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
            >
              إنشاء غرفة جديدة
            </button>
          </div>
        )}
      </div>

      {/* Room Settings Panel */}
      {selectedRoom && (
        <RoomSettingsPanel
          room={selectedRoom}
          isOpen={showRoomSettings}
          onClose={() => {
            setShowRoomSettings(false);
            setSelectedRoom(null);
          }}
          onSave={handleSaveRoomSettings}
        />
      )}

      {/* Create Room Modal */}
      {showCreateRoom && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">إنشاء غرفة جديدة</h2>
                <button
                  onClick={() => setShowCreateRoom(false)}
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  <i className="ri-close-line text-gray-600"></i>
                </button>
              </div>
            </div>

            <form onSubmit={handleCreateRoom} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">اسم الغرفة</label>
                <input
                  type="text"
                  value={newRoom.name}
                  onChange={(e) => setNewRoom({...newRoom, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="مثال: فصل الرياضيات المتقدمة"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">نوع الغرفة</label>
                <div className="grid grid-cols-2 gap-3">
                  {roomTypes.map(type => (
                    <label
                      key={type.id}
                      className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${
                        newRoom.type === type.id 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <input
                        type="radio"
                        name="roomType"
                        value={type.id}
                        checked={newRoom.type === type.id}
                        onChange={(e) => setNewRoom({...newRoom, type: e.target.value})}
                        className="sr-only"
                      />
                      <i className={`${type.icon} text-lg text-gray-600 ml-2`}></i>
                      <span className="text-sm font-medium text-gray-700">{type.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الوصف</label>
                <textarea
                  value={newRoom.description}
                  onChange={(e) => setNewRoom({...newRoom, description: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="وصف مختصر للغرفة وغرضها..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">السعة القصوى</label>
                <input
                  type="number"
                  value={newRoom.capacity}
                  onChange={(e) => setNewRoom({...newRoom, capacity: Number(e.target.value)})}
                  min="1"
                  max="200"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex space-x-4 pt-6">
                <button
                  type="button"
                  onClick={() => setShowCreateRoom(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-400 transition-colors cursor-pointer whitespace-nowrap"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
                >
                  إنشاء الغرفة
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
