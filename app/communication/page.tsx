
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CommunicationPage() {
  const [activeTab, setActiveTab] = useState('chat');
  const [selectedChannel, setSelectedChannel] = useState('general');
  const [message, setMessage] = useState('');
  const [showCreateChannel, setShowCreateChannel] = useState(false);

  const channels = [
    { id: 'general', name: 'عام', type: 'public', members: 45, unread: 3 },
    { id: 'questions', name: 'الأسئلة', type: 'public', members: 38, unread: 7 },
    { id: 'resources', name: 'الموارد', type: 'public', members: 25, unread: 0 },
    { id: 'discussions', name: 'النقاشات', type: 'public', members: 32, unread: 2 },
    { id: 'teachers', name: 'المعلمون', type: 'private', members: 8, unread: 1 },
    { id: 'students', name: 'الطلاب', type: 'private', members: 35, unread: 5 }
  ];

  const messages = {
    general: [
      { id: 1, user: 'د. محمد علي', role: 'teacher', message: 'أهلاً وسهلاً بكم جميعاً في المنصة الجديدة', time: '10:30', avatar: 'teacher-male' },
      { id: 2, user: 'أحمد محمد', role: 'student', message: 'شكراً دكتور، المنصة رائعة جداً', time: '10:32', avatar: 'student-male' },
      { id: 3, user: 'فاطمة أحمد', role: 'student', message: 'هل يمكننا رفع الملفات هنا؟', time: '10:35', avatar: 'student-female' },
      { id: 4, user: 'د. محمد علي', role: 'teacher', message: 'نعم، يمكنكم رفع الملفات والمشاركة بكل سهولة', time: '10:36', avatar: 'teacher-male' }
    ],
    questions: [
      { id: 5, user: 'سارة خالد', role: 'student', message: 'لدي سؤال حول الواجب الأول', time: '09:15', avatar: 'student-female' },
      { id: 6, user: 'عمر حسن', role: 'student', message: 'متى موعد تسليم المشروع؟', time: '09:20', avatar: 'student-male' }
    ]
  };

  const notifications = [
    { id: 1, type: 'message', title: 'رسالة جديدة من د. محمد علي', content: 'تم إضافة مهمة جديدة للفصل', time: '5 دقائق', read: false },
    { id: 2, type: 'assignment', title: 'مهمة جديدة: الرياضيات', content: 'موعد التسليم: غداً الساعة 11:59 م', time: '15 دقيقة', read: false },
    { id: 3, type: 'room', title: 'دعوة لغرفة اجتماع', content: 'اجتماع الفريق يبدأ خلال 30 دقيقة', time: '20 دقيقة', read: true },
    { id: 4, type: 'system', title: 'تحديث النظام', content: 'تم إضافة ميزات جديدة للمنصة', time: '1 ساعة', read: true }
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      console.log('إرسال رسالة:', message);
      setMessage('');
    }
  };

  const getCurrentMessages = () => {
    return messages[selectedChannel as keyof typeof messages] || [];
  };

  const getChannelInfo = (channelId: string) => {
    return channels.find(ch => ch.id === channelId) || channels[0];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/dashboard" className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <i className="ri-chat-3-line text-white text-xl"></i>
              </Link>
              <h1 className="text-2xl font-bold text-gray-800">التواصل والتفاعل</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer">
                <i className="ri-notification-3-line text-gray-600"></i>
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {notifications.filter(n => !n.read).length}
                </span>
              </button>
              <Link href="/dashboard" className="text-gray-600 hover:text-gray-800 cursor-pointer">
                العودة للوحة التحكم
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Tab Navigation */}
            <div className="bg-white rounded-xl shadow-sm mb-6">
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab('chat')}
                  className={`flex-1 px-4 py-3 text-sm font-medium cursor-pointer whitespace-nowrap ${
                    activeTab === 'chat' 
                      ? 'text-blue-600 border-b-2 border-blue-600' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <i className="ri-chat-3-line ml-2"></i>
                  المحادثات
                </button>
                <button
                  onClick={() => setActiveTab('notifications')}
                  className={`flex-1 px-4 py-3 text-sm font-medium cursor-pointer whitespace-nowrap relative ${
                    activeTab === 'notifications' 
                      ? 'text-blue-600 border-b-2 border-blue-600' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <i className="ri-notification-3-line ml-2"></i>
                  الإشعارات
                  {notifications.filter(n => !n.read).length > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {notifications.filter(n => !n.read).length}
                    </span>
                  )}
                </button>
              </div>

              {/* Chat Channels */}
              {activeTab === 'chat' && (
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-gray-800">القنوات</h3>
                    <button
                      onClick={() => setShowCreateChannel(true)}
                      className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center hover:bg-blue-200 transition-colors cursor-pointer"
                    >
                      <i className="ri-add-line text-blue-600 text-sm"></i>
                    </button>
                  </div>
                  <div className="space-y-2">
                    {channels.map(channel => (
                      <button
                        key={channel.id}
                        onClick={() => setSelectedChannel(channel.id)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors cursor-pointer ${
                          selectedChannel === channel.id 
                            ? 'bg-blue-50 text-blue-600' 
                            : 'hover:bg-gray-50 text-gray-700'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <i className={`${channel.type === 'private' ? 'ri-lock-line' : 'ri-hashtag'} text-sm`}></i>
                          <span className="text-sm font-medium">{channel.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">{channel.members}</span>
                          {channel.unread > 0 && (
                            <span className="w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                              {channel.unread}
                            </span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Notifications List */}
              {activeTab === 'notifications' && (
                <div className="p-4 max-h-96 overflow-y-auto">
                  <div className="space-y-3">
                    {notifications.map(notification => (
                      <div
                        key={notification.id}
                        className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                          !notification.read 
                            ? 'bg-blue-50 border-blue-200' 
                            : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            notification.type === 'message' ? 'bg-blue-100' :
                            notification.type === 'assignment' ? 'bg-green-100' :
                            notification.type === 'room' ? 'bg-purple-100' : 'bg-gray-100'
                          }`}>
                            <i className={`text-sm ${
                              notification.type === 'message' ? 'ri-message-3-line text-blue-600' :
                              notification.type === 'assignment' ? 'ri-task-line text-green-600' :
                              notification.type === 'room' ? 'ri-team-line text-purple-600' : 'ri-information-line text-gray-600'
                            }`}></i>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-800">{notification.title}</p>
                            <p className="text-xs text-gray-600 mt-1">{notification.content}</p>
                            <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                          </div>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <h3 className="font-medium text-gray-800 mb-4">إجراءات سريعة</h3>
              <div className="space-y-2">
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap">
                  <i className="ri-video-line ml-2"></i>
                  بدء اجتماع فيديو
                </button>
                <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors cursor-pointer whitespace-nowrap">
                  <i className="ri-share-line ml-2"></i>
                  مشاركة الشاشة
                </button>
                <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors cursor-pointer whitespace-nowrap">
                  <i className="ri-presentation-line ml-2"></i>
                  فتح السبورة الذكية
                </button>
              </div>
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="lg:col-span-3">
            {activeTab === 'chat' && (
              <div className="bg-white rounded-xl shadow-sm h-[600px] flex flex-col">
                {/* Chat Header */}
                <div className="border-b border-gray-200 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <i className={`${getChannelInfo(selectedChannel).type === 'private' ? 'ri-lock-line' : 'ri-hashtag'} text-blue-600`}></i>
                      </div>
                      <div>
                        <h2 className="font-bold text-gray-800">{getChannelInfo(selectedChannel).name}</h2>
                        <p className="text-sm text-gray-600">{getChannelInfo(selectedChannel).members} عضو</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer">
                        <i className="ri-phone-line text-gray-600 text-sm"></i>
                      </button>
                      <button className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer">
                        <i className="ri-video-line text-gray-600 text-sm"></i>
                      </button>
                      <button className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer">
                        <i className="ri-more-line text-gray-600 text-sm"></i>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 p-4 overflow-y-auto space-y-4">
                  {getCurrentMessages().map(msg => (
                    <div key={msg.id} className="flex items-start space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
                        msg.role === 'teacher' ? 'bg-purple-600' : 'bg-blue-600'
                      }`}>
                        <i className={`${
                          msg.avatar === 'teacher-male' ? 'ri-user-star-line' :
                          msg.avatar === 'teacher-female' ? 'ri-user-heart-line' :
                          msg.avatar === 'student-male' ? 'ri-user-3-line' : 'ri-user-2-line'
                        } text-sm`}></i>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-gray-800">{msg.user}</span>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            msg.role === 'teacher' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {msg.role === 'teacher' ? 'معلم' : 'طالب'}
                          </span>
                          <span className="text-xs text-gray-500">{msg.time}</span>
                        </div>
                        <p className="text-gray-700 bg-gray-50 rounded-lg px-3 py-2">{msg.message}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-4">
                  <div className="flex items-center space-x-3">
                    <button
                      type="button"
                      className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer"
                    >
                      <i className="ri-attachment-line text-gray-600"></i>
                    </button>
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="اكتب رسالتك هنا..."
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                    <button
                      type="button"
                      className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer"
                    >
                      <i className="ri-emotion-line text-gray-600"></i>
                    </button>
                    <button
                      type="submit"
                      className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer"
                    >
                      <i className="ri-send-plane-line text-white"></i>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Notifications Detail View */}
            {activeTab === 'notifications' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-800">جميع الإشعارات</h2>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium cursor-pointer">
                    تحديد الكل كمقروء
                  </button>
                </div>

                <div className="space-y-4">
                  {notifications.map(notification => (
                    <div
                      key={notification.id}
                      className={`p-4 rounded-lg border transition-colors cursor-pointer ${
                        !notification.read 
                          ? 'bg-blue-50 border-blue-200' 
                          : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          notification.type === 'message' ? 'bg-blue-100' :
                          notification.type === 'assignment' ? 'bg-green-100' :
                          notification.type === 'room' ? 'bg-purple-100' : 'bg-gray-100'
                        }`}>
                          <i className={`text-lg ${
                            notification.type === 'message' ? 'ri-message-3-line text-blue-600' :
                            notification.type === 'assignment' ? 'ri-task-line text-green-600' :
                            notification.type === 'room' ? 'ri-team-line text-purple-600' : 'ri-information-line text-gray-600'
                          }`}></i>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium text-gray-800">{notification.title}</h3>
                            <span className="text-sm text-gray-500">{notification.time}</span>
                          </div>
                          <p className="text-gray-600">{notification.content}</p>
                          <div className="flex items-center space-x-3 mt-3">
                            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium cursor-pointer">
                              عرض التفاصيل
                            </button>
                            <button className="text-gray-600 hover:text-gray-800 text-sm cursor-pointer">
                              تحديد كمقروء
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create Channel Modal */}
      {showCreateChannel && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">إنشاء قناة جديدة</h2>
                <button
                  onClick={() => setShowCreateChannel(false)}
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  <i className="ri-close-line text-gray-600"></i>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">اسم القناة</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder="مثال: النقاشات العلمية"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الوصف</label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder="وصف مختصر للقناة..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">نوع القناة</label>
                <div className="space-y-3">
                  <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input type="radio" name="channelType" value="public" className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" defaultChecked />
                    <div className="mr-3">
                      <div className="flex items-center space-x-2">
                        <i className="ri-hashtag text-gray-600"></i>
                        <span className="font-medium text-gray-800">عامة</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">يمكن لأي شخص الانضمام والمشاركة</p>
                    </div>
                  </label>
                  <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input type="radio" name="channelType" value="private" className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                    <div className="mr-3">
                      <div className="flex items-center space-x-2">
                        <i className="ri-lock-line text-gray-600"></i>
                        <span className="font-medium text-gray-800">خاصة</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">للأعضاء المدعوين فقط</p>
                    </div>
                  </label>
                </div>
              </div>

              <div className="flex space-x-4 pt-6">
                <button
                  onClick={() => setShowCreateChannel(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-400 transition-colors cursor-pointer whitespace-nowrap"
                >
                  إلغاء
                </button>
                <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap">
                  إنشاء القناة
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
