'use client';

import { useState } from 'react';

interface Room {
  id: number;
  name: string;
  type: string;
  users: number;
  capacity: number;
  status: string;
}

interface RoomSettingsPanelProps {
  room: Room;
  isOpen: boolean;
  onClose: () => void;
  onSave: (settings: any) => void;
}

export default function RoomSettingsPanel({ room, isOpen, onClose, onSave }: RoomSettingsPanelProps) {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    general: {
      name: room.name,
      description: '',
      capacity: room.capacity,
      isPublic: true,
      allowGuests: false,
      moderatorApproval: false
    },
    audio: {
      enableMicrophone: true,
      enableSpeakers: true,
      noiseReduction: true,
      echoCancellation: true,
      backgroundMusic: false,
      volumeLevel: 75
    },
    video: {
      enableCamera: true,
      videoQuality: 'hd',
      allowScreenShare: true,
      recordSessions: false,
      backgroundBlur: true
    },
    interaction: {
      enableChat: true,
      enableWhiteboard: true,
      enablePolls: true,
      enableQuiz: true,
      enableRaiseHand: true,
      enableBreakoutRooms: false
    },
    access: {
      passwordProtected: false,
      password: '',
      waitingRoom: false,
      maxParticipants: room.capacity,
      allowLateJoin: true,
      lockRoom: false
    },
    notifications: {
      joinLeaveAlerts: true,
      chatNotifications: true,
      handRaiseAlerts: true,
      reminderAlerts: true,
      emailNotifications: false
    }
  });

  if (!isOpen) return null;

  const tabs = [
    { id: 'general', name: 'عام', icon: 'ri-settings-3-line' },
    { id: 'audio', name: 'الصوت', icon: 'ri-volume-up-line' },
    { id: 'video', name: 'الفيديو', icon: 'ri-camera-line' },
    { id: 'interaction', name: 'التفاعل', icon: 'ri-chat-3-line' },
    { id: 'access', name: 'الوصول', icon: 'ri-lock-line' },
    { id: 'notifications', name: 'الإشعارات', icon: 'ri-notification-line' }
  ];

  const handleSave = () => {
    onSave(settings);
    onClose();
  };

  const updateSetting = (category: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value
      }
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <i className="ri-settings-3-line text-2xl"></i>
              </div>
              <div>
                <h2 className="text-2xl font-bold">إعدادات الغرفة</h2>
                <p className="text-blue-100">{room.name}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer"
            >
              <i className="ri-close-line text-xl"></i>
            </button>
          </div>
        </div>

        <div className="flex h-full max-h-[600px]">
          {/* Sidebar */}
          <div className="w-64 bg-gray-50 border-r border-gray-200 overflow-y-auto">
            <div className="p-4">
              <nav className="space-y-2">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-right transition-all cursor-pointer ${
                      activeTab === tab.id
                        ? 'bg-blue-100 text-blue-700 border border-blue-200'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                    }`}
                  >
                    <i className={`${tab.icon} text-lg`}></i>
                    <span className="font-medium">{tab.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              {/* General Settings */}
              {activeTab === 'general' && (
                <div className="space-y-6">
                  <div className="border-b border-gray-200 pb-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">الإعدادات العامة</h3>
                    <p className="text-gray-600">إدارة المعلومات الأساسية للغرفة</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">اسم الغرفة</label>
                      <input
                        type="text"
                        value={settings.general.name}
                        onChange={(e) => updateSetting('general', 'name', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">السعة القصوى</label>
                      <input
                        type="number"
                        value={settings.general.capacity}
                        onChange={(e) => updateSetting('general', 'capacity', Number(e.target.value))}
                        min="1"
                        max="500"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">وصف الغرفة</label>
                    <textarea
                      value={settings.general.description}
                      onChange={(e) => updateSetting('general', 'description', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="أضف وصفاً للغرفة..."
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-800">غرفة عامة</h4>
                        <p className="text-sm text-gray-600">يمكن للجميع العثور على هذه الغرفة</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.general.isPublic}
                        onChange={(e) => updateSetting('general', 'isPublic', e.target.checked)}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-800">السماح للضيوف</h4>
                        <p className="text-sm text-gray-600">السماح للمستخدمين غير المسجلين بالانضمام</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.general.allowGuests}
                        onChange={(e) => updateSetting('general', 'allowGuests', e.target.checked)}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-800">موافقة المشرف</h4>
                        <p className="text-sm text-gray-600">يتطلب موافقة المشرف قبل الانضمام</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.general.moderatorApproval}
                        onChange={(e) => updateSetting('general', 'moderatorApproval', e.target.checked)}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Audio Settings */}
              {activeTab === 'audio' && (
                <div className="space-y-6">
                  <div className="border-b border-gray-200 pb-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">إعدادات الصوت</h3>
                    <p className="text-gray-600">تخصيص تجربة الصوت في الغرفة</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-800">تفعيل الميكروفون</h4>
                        <p className="text-sm text-gray-600">السماح للمستخدمين باستخدام الميكروفون</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.audio.enableMicrophone}
                        onChange={(e) => updateSetting('audio', 'enableMicrophone', e.target.checked)}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-800">تقليل الضوضاء</h4>
                        <p className="text-sm text-gray-600">تقليل ضوضاء الخلفية تلقائياً</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.audio.noiseReduction}
                        onChange={(e) => updateSetting('audio', 'noiseReduction', e.target.checked)}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-800">إلغاء الصدى</h4>
                        <p className="text-sm text-gray-600">منع صدى الصوت في المحادثات</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.audio.echoCancellation}
                        onChange={(e) => updateSetting('audio', 'echoCancellation', e.target.checked)}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">مستوى الصوت الافتراضي</label>
                      <div className="px-4">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={settings.audio.volumeLevel}
                          onChange={(e) => updateSetting('audio', 'volumeLevel', Number(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-sm text-gray-600 mt-2">
                          <span>صامت</span>
                          <span className="font-medium">{settings.audio.volumeLevel}%</span>
                          <span>عالي</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Video Settings */}
              {activeTab === 'video' && (
                <div className="space-y-6">
                  <div className="border-b border-gray-200 pb-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">إعدادات الفيديو</h3>
                    <p className="text-gray-600">تخصيص تجربة الفيديو والمشاركة المرئية</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-800">تفعيل الكاميرا</h4>
                        <p className="text-sm text-gray-600">السماح للمستخدمين بتشغيل الكاميرا</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.video.enableCamera}
                        onChange={(e) => updateSetting('video', 'enableCamera', e.target.checked)}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">جودة الفيديو</label>
                      <select
                        value={settings.video.videoQuality}
                        onChange={(e) => updateSetting('video', 'videoQuality', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="low">منخفضة (480p)</option>
                        <option value="medium">متوسطة (720p)</option>
                        <option value="hd">عالية (1080p)</option>
                        <option value="4k">فائقة (4K)</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-800">مشاركة الشاشة</h4>
                        <p className="text-sm text-gray-600">السماح بمشاركة الشاشة والعروض التقديمية</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.video.allowScreenShare}
                        onChange={(e) => updateSetting('video', 'allowScreenShare', e.target.checked)}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-800">تسجيل الجلسات</h4>
                        <p className="text-sm text-gray-600">تسجيل الجلسات تلقائياً للمراجعة لاحقاً</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.video.recordSessions}
                        onChange={(e) => updateSetting('video', 'recordSessions', e.target.checked)}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-800">ضبابية الخلفية</h4>
                        <p className="text-sm text-gray-600">تطبيق تأثير ضبابي على خلفية الفيديو</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.video.backgroundBlur}
                        onChange={(e) => updateSetting('video', 'backgroundBlur', e.target.checked)}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Interaction Settings */}
              {activeTab === 'interaction' && (
                <div className="space-y-6">
                  <div className="border-b border-gray-200 pb-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">أدوات التفاعل</h3>
                    <p className="text-gray-600">تخصيص الأدوات التفاعلية المتاحة في الغرفة</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-800">المحادثة النصية</h4>
                        <p className="text-sm text-gray-600">إرسال الرسائل النصية</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.interaction.enableChat}
                        onChange={(e) => updateSetting('interaction', 'enableChat', e.target.checked)}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-800">السبورة الذكية</h4>
                        <p className="text-sm text-gray-600">استخدام السبورة للشرح</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.interaction.enableWhiteboard}
                        onChange={(e) => updateSetting('interaction', 'enableWhiteboard', e.target.checked)}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-800">استطلاعات الرأي</h4>
                        <p className="text-sm text-gray-600">إنشاء استطلاعات سريعة</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.interaction.enablePolls}
                        onChange={(e) => updateSetting('interaction', 'enablePolls', e.target.checked)}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-800">الاختبارات السريعة</h4>
                        <p className="text-sm text-gray-600">إجراء اختبارات تفاعلية</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.interaction.enableQuiz}
                        onChange={(e) => updateSetting('interaction', 'enableQuiz', e.target.checked)}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-800">رفع اليد</h4>
                        <p className="text-sm text-gray-600">طلب الإذن للتحدث</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.interaction.enableRaiseHand}
                        onChange={(e) => updateSetting('interaction', 'enableRaiseHand', e.target.checked)}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-800">الغرف الفرعية</h4>
                        <p className="text-sm text-gray-600">تقسيم المشاركين لمجموعات</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.interaction.enableBreakoutRooms}
                        onChange={(e) => updateSetting('interaction', 'enableBreakoutRooms', e.target.checked)}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Access Settings */}
              {activeTab === 'access' && (
                <div className="space-y-6">
                  <div className="border-b border-gray-200 pb-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">التحكم في الوصول</h3>
                    <p className="text-gray-600">إدارة من يمكنه الوصول للغرفة وكيفية الانضمام</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-800">حماية بكلمة مرور</h4>
                        <p className="text-sm text-gray-600">تتطلب كلمة مرور للدخول</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.access.passwordProtected}
                        onChange={(e) => updateSetting('access', 'passwordProtected', e.target.checked)}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                      />
                    </div>

                    {settings.access.passwordProtected && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">كلمة المرور</label>
                        <input
                          type="password"
                          value={settings.access.password}
                          onChange={(e) => updateSetting('access', 'password', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="أدخل كلمة مرور قوية"
                        />
                      </div>
                    )}

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-800">غرفة الانتظار</h4>
                        <p className="text-sm text-gray-600">وضع المنضمين في انتظار الموافقة</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.access.waitingRoom}
                        onChange={(e) => updateSetting('access', 'waitingRoom', e.target.checked)}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">الحد الأقصى للمشاركين</label>
                      <input
                        type="number"
                        value={settings.access.maxParticipants}
                        onChange={(e) => updateSetting('access', 'maxParticipants', Number(e.target.value))}
                        min="1"
                        max="1000"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-800">السماح بالانضمام المتأخر</h4>
                        <p className="text-sm text-gray-600">السماح بالدخول بعد بداية الجلسة</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.access.allowLateJoin}
                        onChange={(e) => updateSetting('access', 'allowLateJoin', e.target.checked)}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-800">قفل الغرفة</h4>
                        <p className="text-sm text-gray-600">منع انضمام مشاركين جدد</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.access.lockRoom}
                        onChange={(e) => updateSetting('access', 'lockRoom', e.target.checked)}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Settings */}
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <div className="border-b border-gray-200 pb-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">إعدادات الإشعارات</h3>
                    <p className="text-gray-600">تخصيص التنبيهات والإشعارات في الغرفة</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-800">تنبيهات الدخول والخروج</h4>
                        <p className="text-sm text-gray-600">إظهار تنبيه عند انضمام أو مغادرة الأعضاء</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.notifications.joinLeaveAlerts}
                        onChange={(e) => updateSetting('notifications', 'joinLeaveAlerts', e.target.checked)}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-800">إشعارات المحادثة</h4>
                        <p className="text-sm text-gray-600">تنبيه عند وصول رسائل جديدة</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.notifications.chatNotifications}
                        onChange={(e) => updateSetting('notifications', 'chatNotifications', e.target.checked)}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-800">تنبيهات رفع اليد</h4>
                        <p className="text-sm text-gray-600">إشعار عند رفع أحد المشاركين يده</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.notifications.handRaiseAlerts}
                        onChange={(e) => updateSetting('notifications', 'handRaiseAlerts', e.target.checked)}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-800">تذكيرات الجلسات</h4>
                        <p className="text-sm text-gray-600">إرسال تذكيرات قبل بداية الجلسات</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.notifications.reminderAlerts}
                        onChange={(e) => updateSetting('notifications', 'reminderAlerts', e.target.checked)}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-800">الإشعارات عبر البريد الإلكتروني</h4>
                        <p className="text-sm text-gray-600">إرسال إشعارات مهمة للبريد الإلكتروني</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.notifications.emailNotifications}
                        onChange={(e) => updateSetting('notifications', 'emailNotifications', e.target.checked)}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              آخر تحديث: {new Date().toLocaleDateString('ar-SA')}
            </div>
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors cursor-pointer whitespace-nowrap"
              >
                إلغاء
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
              >
                حفظ الإعدادات
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}