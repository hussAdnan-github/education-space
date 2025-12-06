
'use client';

import { useState, useEffect } from 'react';

interface Notification {
  id: string;
  type: 'reminder' | 'achievement' | 'warning' | 'info';
  title: string;
  message: string;
  time: string;
  priority: 'high' | 'medium' | 'low';
  action?: string;
}

interface AIAssistantProps {
  currentUser: {
    name: string;
    role: string;
    position: { x: number; y: number };
  };
  isActive: boolean;
  onClose: () => void;
}

export default function AIAssistant({ currentUser, isActive, onClose }: AIAssistantProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [assistantSettings, setAssistantSettings] = useState({
    voiceEnabled: true,
    reminderFrequency: 'normal',
    smartSuggestions: true,
    quietHours: false
  });

  useEffect(() => {
    if (isActive) {
      generateSmartNotifications();
      const interval = setInterval(generateSmartNotifications, 30000); // كل 30 ثانية
      return () => clearInterval(interval);
    }
  }, [isActive, currentUser]);

  const generateSmartNotifications = () => {
    const currentTime = new Date();
    const hour = currentTime.getHours();
    const minute = currentTime.getMinutes();

    const possibleNotifications: Omit<Notification, 'id' | 'time'>[] = [
      {
        type: 'reminder',
        title: 'تذكير: محاضرة قادمة',
        message: `لديك محاضرة في غرفة الصف الأولى خلال 10 دقائق`,
        priority: 'high',
        action: 'انتقل للغرفة'
      },
      {
        type: 'achievement',
        title: 'إنجاز جديد!',
        message: 'تهانينا! حصلت على شارة "الحضور المثالي"',
        priority: 'medium',
        action: 'عرض الإنجازات'
      },
      {
        type: 'warning',
        title: 'تذكير مهم',
        message: 'واجب الرياضيات مستحق اليوم قبل 5:00 م',
        priority: 'high',
        action: 'عرض الواجبات'
      },
      {
        type: 'info',
        title: 'اقتراح ذكي',
        message: 'هناك 3 زملاء في المكتبة، مناسب للدراسة الجماعية',
        priority: 'low',
        action: 'انتقل للمكتبة'
      },
      {
        type: 'reminder',
        title: 'وقت الاستراحة',
        message: 'لقد كنت نشطاً لمدة ساعتين، وقت لاستراحة قصيرة!',
        priority: 'medium',
        action: 'انتقل للكافيتيريا'
      },
      {
        type: 'info',
        title: 'نشاط جماعي',
        message: 'بدأت لعبة شطرنج في غرفة الألعاب، انضم للمشاهدة',
        priority: 'low',
        action: 'انتقل لغرفة الألعاب'
      }
    ];

    // إضافة إشعارات ذكية بناءً على الوقت والسياق
    if (hour === 9 && minute < 30) {
      possibleNotifications.push({
        type: 'reminder',
        title: 'بداية اليوم الدراسي',
        message: 'صباح الخير! جاهز لبداية يوم تعليمي رائع؟',
        priority: 'medium'
      });
    }

    if (hour === 12 && minute < 30) {
      possibleNotifications.push({
        type: 'info',
        title: 'وقت الغداء',
        message: 'حان وقت استراحة الغداء، الكافيتيريا مفتوحة الآن',
        priority: 'low',
        action: 'انتقل للكافيتيريا'
      });
    }

    // اخترار إشعار عشوائي
    const randomNotification = possibleNotifications[Math.floor(Math.random() * possibleNotifications.length)];
    const newNotification: Notification = {
      ...randomNotification,
      id: Date.now().toString(),
      time: currentTime.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })
    };

    setNotifications(prev => {
      const updated = [newNotification, ...prev.slice(0, 4)]; // أحدث 5 إشعارات
      return updated;
    });

    // تحديث الرسالة الحالية
    setCurrentMessage(randomNotification.message);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'reminder': return 'ri-alarm-line';
      case 'achievement': return 'ri-trophy-line';
      case 'warning': return 'ri-alert-line';
      case 'info': return 'ri-information-line';
      default: return 'ri-notification-line';
    }
  };

  const getNotificationColor = (type: string, priority: string) => {
    if (priority === 'high') {
      return 'bg-red-50 border-red-200 text-red-800';
    }
    
    switch (type) {
      case 'reminder': return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'achievement': return 'bg-green-50 border-green-200 text-green-800';
      case 'warning': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'info': return 'bg-purple-50 border-purple-200 text-purple-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    // هنا يمكن إضافة منطق التعرف على الصوت
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false);
        setCurrentMessage('فهمت طلبك، جاري البحث عن أفضل الحلول...');
      }, 3000);
    }
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  if (!isActive) return null;

  return (
    <div className="fixed bottom-20 left-4 w-96 bg-white rounded-2xl shadow-2xl border z-50 max-h-[600px] overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <i className="ri-robot-line text-xl"></i>
            </div>
            <div>
              <h3 className="font-bold">المساعد الذكي</h3>
              <p className="text-sm opacity-90">مرحباً {currentUser.name}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer"
            >
              <i className="ri-settings-line"></i>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer"
            >
              <i className="ri-close-line"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <h4 className="font-bold text-gray-800 mb-3">إعدادات المساعد</h4>
          <div className="space-y-3">
            <label className="flex items-center justify-between">
              <span className="text-sm text-gray-700">التحكم الصوتي</span>
              <input
                type="checkbox"
                checked={assistantSettings.voiceEnabled}
                onChange={(e) => setAssistantSettings({...assistantSettings, voiceEnabled: e.target.checked})}
                className="w-4 h-4 text-blue-600"
              />
            </label>
            <label className="flex items-center justify-between">
              <span className="text-sm text-gray-700">الاقتراحات الذكية</span>
              <input
                type="checkbox"
                checked={assistantSettings.smartSuggestions}
                onChange={(e) => setAssistantSettings({...assistantSettings, smartSuggestions: e.target.checked})}
                className="w-4 h-4 text-blue-600"
              />
            </label>
            <label className="flex items-center justify-between">
              <span className="text-sm text-gray-700">الوضع الصامت</span>
              <input
                type="checkbox"
                checked={assistantSettings.quietHours}
                onChange={(e) => setAssistantSettings({...assistantSettings, quietHours: e.target.checked})}
                className="w-4 h-4 text-blue-600"
              />
            </label>
          </div>
        </div>
      )}

      {/* Current Message */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
            <i className="ri-chat-3-line text-blue-600"></i>
          </div>
          <div className="flex-1">
            <p className="text-gray-800 text-sm leading-relaxed">{currentMessage}</p>
            <div className="flex items-center space-x-2 mt-2">
              <button
                onClick={handleVoiceInput}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                  isListening 
                    ? 'bg-red-100 text-red-600' 
                    : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                }`}
              >
                <i className={`${isListening ? 'ri-mic-off-line' : 'ri-mic-line'} mr-1`}></i>
                {isListening ? 'إيقاف الاستماع' : 'استخدام الصوت'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="p-4 max-h-80 overflow-y-auto">
        <h4 className="font-bold text-gray-800 mb-3 flex items-center">
          <i className="ri-notification-line mr-2"></i>
          الإشعارات الذكية
        </h4>
        
        {notifications.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <i className="ri-notification-off-line text-3xl mb-2 block"></i>
            <p className="text-sm">لا توجد إشعارات حالياً</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map(notification => (
              <div
                key={notification.id}
                className={`p-3 rounded-lg border ${getNotificationColor(notification.type, notification.priority)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-2 flex-1">
                    <i className={`${getNotificationIcon(notification.type)} text-lg mt-0.5`}></i>
                    <div className="flex-1">
                      <h5 className="font-medium text-sm">{notification.title}</h5>
                      <p className="text-xs mt-1 leading-relaxed">{notification.message}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs opacity-75">{notification.time}</span>
                        {notification.action && (
                          <button className="text-xs font-medium hover:underline cursor-pointer">
                            {notification.action}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => dismissNotification(notification.id)}
                    className="w-6 h-6 bg-black/10 rounded-full flex items-center justify-center hover:bg-black/20 transition-colors cursor-pointer ml-2"
                  >
                    <i className="ri-close-line text-xs"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="grid grid-cols-2 gap-2">
          <button className="bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap">
            <i className="ri-map-pin-line mr-1"></i>
            أين أنا؟
          </button>
          <button className="bg-green-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors cursor-pointer whitespace-nowrap">
            <i className="ri-calendar-line mr-1"></i>
            جدولي
          </button>
          <button className="bg-purple-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors cursor-pointer whitespace-nowrap">
            <i className="ri-lightbulb-line mr-1"></i>
            اقتراحات
          </button>
          <button className="bg-orange-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors cursor-pointer whitespace-nowrap">
            <i className="ri-question-line mr-1"></i>
            مساعدة
          </button>
        </div>
      </div>
    </div>
  );
}
