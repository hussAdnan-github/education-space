
'use client';

import { useState, useEffect } from 'react';

interface ScheduleItem {
  id: string;
  title: string;
  time: string;
  type: 'class' | 'break' | 'lunch' | 'meeting' | 'activity';
  duration: number;
  location?: string;
  reminder?: boolean;
}

interface VirtualClockProps {
  onScheduleUpdate?: (items: ScheduleItem[]) => void;
}

export default function VirtualClock({ onScheduleUpdate }: VirtualClockProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [scheduleMode, setScheduleMode] = useState<'school' | 'office' | 'conference'>('school');
  const [nextEvent, setNextEvent] = useState<ScheduleItem | null>(null);
  const [showSchedule, setShowSchedule] = useState(false);

  const schedules = {
    school: [
      { id: '1', title: 'الطابور الصباحي', time: '07:30', type: 'activity' as const, duration: 15, location: 'الساحة الرئيسية' },
      { id: '2', title: 'الحصة الأولى - رياضيات', time: '08:00', type: 'class' as const, duration: 45, location: 'الفصل الأول' },
      { id: '3', title: 'الحصة الثانية - لغة عربية', time: '08:50', type: 'class' as const, duration: 45, location: 'الفصل الثاني' },
      { id: '4', title: 'الفسحة', time: '09:35', type: 'break' as const, duration: 20, location: 'الساحة الترفيهية' },
      { id: '5', title: 'الحصة الثالثة - علوم', time: '09:55', type: 'class' as const, duration: 45, location: 'المختبر' },
      { id: '6', title: 'الحصة الرابعة - اجتماعيات', time: '10:45', type: 'class' as const, duration: 45, location: 'الفصل الثالث' },
      { id: '7', title: 'استراحة الغداء', time: '11:30', type: 'lunch' as const, duration: 30, location: 'الكافيتيريا' },
      { id: '8', title: 'الحصة الخامسة - رياضة', time: '12:00', type: 'activity' as const, duration: 45, location: 'الصالة الرياضية' }
    ],
    office: [
      { id: '1', title: 'بداية الدوام', time: '09:00', type: 'activity' as const, duration: 0 },
      { id: '2', title: 'اجتماع الفريق الأسبوعي', time: '09:30', type: 'meeting' as const, duration: 60, location: 'قاعة الاجتماعات' },
      { id: '3', title: 'فترة التركيز', time: '10:30', type: 'activity' as const, duration: 120 },
      { id: '4', title: 'استراحة القهوة', time: '12:30', type: 'break' as const, duration: 15, location: 'صالة الاستراحة' },
      { id: '5', title: 'وقت الغداء', time: '13:00', type: 'lunch' as const, duration: 60, location: 'الكافيتيريا' },
      { id: '6', title: 'اجتماع المراجعة', time: '14:00', type: 'meeting' as const, duration: 45, location: 'غرفة المؤتمرات' },
      { id: '7', title: 'نهاية الدوام', time: '17:00', type: 'activity' as const, duration: 0 }
    ],
    conference: [
      { id: '1', title: 'التسجيل والاستقبال', time: '08:30', type: 'activity' as const, duration: 30, location: 'الردهة' },
      { id: '2', title: 'الجلسة الافتتاحية', time: '09:00', type: 'meeting' as const, duration: 60, location: 'القاعة الكبرى' },
      { id: '3', title: 'ورشة العمل الأولى', time: '10:15', type: 'class' as const, duration: 90, location: 'قاعة A' },
      { id: '4', title: 'استراحة القهوة', time: '11:45', type: 'break' as const, duration: 15 },
      { id: '5', title: 'العرض التقديمي الرئيسي', time: '12:00', type: 'meeting' as const, duration: 45, location: 'القاعة الكبرى' },
      { id: '6', title: 'وقت الغداء', time: '13:00', type: 'lunch' as const, duration: 60 },
      { id: '7', title: 'ورشة العمل الثانية', time: '14:00', type: 'class' as const, duration: 75, location: 'قاعة B' }
    ]
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const currentSchedule = schedules[scheduleMode];
    const now = currentTime;
    const currentTimeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    const upcomingEvents = currentSchedule.filter(item => item.time > currentTimeString);
    setNextEvent(upcomingEvents.length > 0 ? upcomingEvents[0] : null);

    if (onScheduleUpdate) {
      onScheduleUpdate(currentSchedule);
    }
  }, [currentTime, scheduleMode, onScheduleUpdate]);

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'class': return 'ri-book-open-line';
      case 'break': return 'ri-cup-line';
      case 'lunch': return 'ri-restaurant-line';
      case 'meeting': return 'ri-team-line';
      case 'activity': return 'ri-star-line';
      default: return 'ri-time-line';
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'class': return 'text-blue-600 bg-blue-100';
      case 'break': return 'text-green-600 bg-green-100';
      case 'lunch': return 'text-orange-600 bg-orange-100';
      case 'meeting': return 'text-purple-600 bg-purple-100';
      case 'activity': return 'text-pink-600 bg-pink-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getModeLabel = (mode: string) => {
    switch (mode) {
      case 'school': return 'اليوم المدرسي';
      case 'office': return 'يوم العمل';
      case 'conference': return 'جدول المؤتمر';
      default: return 'الجدول اليومي';
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ar-SA', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ar-SA', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border p-6">
      {/* Digital Clock */}
      <div className="text-center mb-6">
        <div className="text-4xl font-bold text-gray-800 mb-2 font-mono">
          {formatTime(currentTime)}
        </div>
        <div className="text-sm text-gray-600">
          {formatDate(currentTime)}
        </div>
      </div>

      {/* Schedule Mode Selector */}
      <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
        {(['school', 'office', 'conference'] as const).map(mode => (
          <button
            key={mode}
            onClick={() => setScheduleMode(mode)}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
              scheduleMode === mode
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {getModeLabel(mode)}
          </button>
        ))}
      </div>

      {/* Next Event */}
      {nextEvent && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mb-4 border border-blue-200">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getEventColor(nextEvent.type)}`}>
              <i className={`${getEventIcon(nextEvent.type)} text-lg`}></i>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-800">{nextEvent.title}</h3>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                <span className="flex items-center">
                  <i className="ri-time-line mr-1"></i>
                  {nextEvent.time}
                </span>
                {nextEvent.location && (
                  <span className="flex items-center">
                    <i className="ri-map-pin-line mr-1"></i>
                    {nextEvent.location}
                  </span>
                )}
              </div>
            </div>
            <div className="text-left">
              <div className="text-xs text-blue-600 font-medium">القادم</div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="flex space-x-2 mb-4">
        <button
          onClick={() => setShowSchedule(!showSchedule)}
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
        >
          <i className="ri-calendar-line mr-2"></i>
          {showSchedule ? 'إخفاء الجدول' : 'عرض الجدول'}
        </button>
        <button className="bg-gray-100 text-gray-600 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer">
          <i className="ri-notification-line"></i>
        </button>
      </div>

      {/* Schedule List */}
      {showSchedule && (
        <div className="space-y-2 max-h-64 overflow-y-auto">
          <h4 className="font-bold text-gray-800 text-sm mb-3">جدول اليوم</h4>
          {schedules[scheduleMode].map(item => {
            const isUpcoming = item.time > formatTime(currentTime).slice(0, 5);
            const isCurrent = item.time <= formatTime(currentTime).slice(0, 5) && 
                             nextEvent && nextEvent.id !== item.id;
            
            return (
              <div
                key={item.id}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  isCurrent ? 'bg-green-50 border border-green-200' :
                  isUpcoming ? 'bg-blue-50 border border-blue-200' :
                  'bg-gray-50 border border-gray-200'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getEventColor(item.type)}`}>
                  <i className={`${getEventIcon(item.type)} text-sm`}></i>
                </div>
                <div className="flex-1">
                  <h5 className="font-medium text-gray-800 text-sm">{item.title}</h5>
                  <div className="flex items-center space-x-3 text-xs text-gray-600 mt-1">
                    <span>{item.time}</span>
                    {item.duration > 0 && <span>{item.duration} دقيقة</span>}
                    {item.location && <span>{item.location}</span>}
                  </div>
                </div>
                {isCurrent && (
                  <div className="text-xs text-green-600 font-medium">جاري</div>
                )}
                {isUpcoming && item.id === nextEvent?.id && (
                  <div className="text-xs text-blue-600 font-medium">القادم</div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Time Stats */}
      <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-200">
        <div className="text-center">
          <div className="text-lg font-bold text-green-600">
            {schedules[scheduleMode].filter(item => item.type === 'class').length}
          </div>
          <div className="text-xs text-gray-600">حصص اليوم</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-blue-600">
            {schedules[scheduleMode].filter(item => item.type === 'break' || item.type === 'lunch').length}
          </div>
          <div className="text-xs text-gray-600">فترات راحة</div>
        </div>
      </div>
    </div>
  );
}
