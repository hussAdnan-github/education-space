'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Space {
  id: string;
  name: string;
  type: 'classroom' | 'lab' | 'library' | 'meeting' | 'auditorium';
  capacity: number;
  currentUsers: number;
  features: string[];
  status: 'available' | 'busy' | 'maintenance';
  image: string;
  description: string;
}

export default function SpaceTestPage() {
  const [selectedSpace, setSelectedSpace] = useState<string>('');
  const [testMode, setTestMode] = useState<'quick' | 'detailed' | 'interactive'>('quick');
  const [isTestRunning, setIsTestRunning] = useState(false);
  const [testResults, setTestResults] = useState<any>(null);

  const spaces: Space[] = [
    {
      id: 'classroom1',
      name: 'الفصل الأول - الرياضيات',
      type: 'classroom',
      capacity: 30,
      currentUsers: 0,
      features: ['سبورة ذكية', 'نظام صوتي', 'كاميرات', 'مشاركة الشاشة'],
      status: 'available',
      image: 'https://readdy.ai/api/search-image?query=Modern%20virtual%20classroom%20with%20smart%20whiteboard%2C%20desks%20arranged%20in%20rows%2C%20natural%20lighting%2C%20educational%20technology%2C%20interactive%20displays%2C%20clean%20organized%20space&width=400&height=250&seq=classroom1&orientation=landscape',
      description: 'فصل دراسي مجهز بأحدث التقنيات التعليمية'
    },
    {
      id: 'lab1',
      name: 'المختبر العلمي المتقدم',
      type: 'lab',
      capacity: 20,
      currentUsers: 0,
      features: ['معدات مختبرية افتراضية', 'محاكاة التجارب', 'أدوات القياس', 'نظام الأمان'],
      status: 'available',
      image: 'https://readdy.ai/api/search-image?query=Advanced%20science%20laboratory%20with%20modern%20equipment%2C%20lab%20benches%2C%20safety%20equipment%2C%20scientific%20instruments%2C%20bright%20clean%20environment%2C%20educational%20setting&width=400&height=250&seq=lab1&orientation=landscape',
      description: 'مختبر علمي متكامل للتجارب والأبحاث'
    },
    {
      id: 'library1',
      name: 'المكتبة الرقمية الشاملة',
      type: 'library',
      capacity: 50,
      currentUsers: 0,
      features: ['مجموعة كتب رقمية', 'محركات بحث متقدمة', 'مساحات دراسة', 'نظام الفهرسة'],
      status: 'available',
      image: 'https://readdy.ai/api/search-image?query=Modern%20digital%20library%20with%20comfortable%20seating%2C%20bookshelves%2C%20study%20areas%2C%20natural%20lighting%2C%20peaceful%20atmosphere%2C%20educational%20environment&width=400&height=250&seq=library1&orientation=landscape',
      description: 'مكتبة رقمية غنية بالمصادر التعليمية'
    },
    {
      id: 'meeting1',
      name: 'قاعة الاجتماعات التنفيذية',
      type: 'meeting',
      capacity: 15,
      currentUsers: 0,
      features: ['طاولة اجتماعات دائرية', 'نظام العرض المتقدم', 'تقنية الواقع المختلط', 'تسجيل الجلسات'],
      status: 'available',
      image: 'https://readdy.ai/api/search-image?query=Executive%20meeting%20room%20with%20round%20conference%20table%2C%20modern%20chairs%2C%20presentation%20screens%2C%20professional%20lighting%2C%20business%20environment&width=400&height=250&seq=meeting1&orientation=landscape',
      description: 'قاعة اجتماعات مصممة للقرارات المهمة'
    },
    {
      id: 'auditorium1',
      name: 'المدرج الكبير',
      type: 'auditorium',
      capacity: 200,
      currentUsers: 0,
      features: ['مقاعد متدرجة', 'نظام صوتي متطور', 'إضاءة احترافية', 'منصة عرض'],
      status: 'maintenance',
      image: 'https://readdy.ai/api/search-image?query=Large%20auditorium%20with%20tiered%20seating%2C%20stage%20platform%2C%20professional%20lighting%2C%20modern%20acoustic%20system%2C%20academic%20atmosphere&width=400&height=250&seq=auditorium1&orientation=landscape',
      description: 'مدرج كبير للمحاضرات والفعاليات'
    }
  ];

  const testScenarios = [
    {
      id: 'audio_video',
      name: 'اختبار الصوت والفيديو',
      description: 'فحص جودة الصوت والصورة',
      duration: '2 دقيقة'
    },
    {
      id: 'connectivity',
      name: 'اختبار الاتصال',
      description: 'فحص استقرار الشبكة وسرعة الاستجابة',
      duration: '1 دقيقة'
    },
    {
      id: 'features',
      name: 'اختبار المميزات',
      description: 'فحص جميع أدوات الفضاء التفاعلية',
      duration: '5 دقائق'
    },
    {
      id: 'capacity',
      name: 'اختبار السعة',
      description: 'محاكاة الحد الأقصى للمستخدمين',
      duration: '3 دقائق'
    }
  ];

  const runTest = async () => {
    if (!selectedSpace) return;
    
    setIsTestRunning(true);
    setTestResults(null);

    // محاكاة عملية الاختبار
    await new Promise(resolve => setTimeout(resolve, 3000));

    const mockResults = {
      overallScore: Math.floor(Math.random() * 20) + 80, // درجة بين 80-100
      audioQuality: Math.floor(Math.random() * 20) + 80,
      videoQuality: Math.floor(Math.random() * 20) + 80,
      connectivity: Math.floor(Math.random() * 20) + 80,
      features: Math.floor(Math.random() * 20) + 80,
      latency: Math.floor(Math.random() * 30) + 10, // بين 10-40ms
      recommendations: [
        'جودة الصوت ممتازة',
        'الاتصال مستقر',
        'جميع المميزات تعمل بشكل صحيح'
      ]
    };

    setTestResults(mockResults);
    setIsTestRunning(false);
  };

  const getSpaceTypeIcon = (type: string) => {
    switch (type) {
      case 'classroom': return 'ri-school-line';
      case 'lab': return 'ri-flask-line';
      case 'library': return 'ri-book-open-line';
      case 'meeting': return 'ri-team-line';
      case 'auditorium': return 'ri-presentation-line';
      default: return 'ri-building-line';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-700 border-green-200';
      case 'busy': return 'bg-red-100 text-red-700 border-red-200';
      case 'maintenance': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200/50 shadow-sm px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                <i className="ri-building-line text-white text-lg"></i>
              </div>
              <div>
                <span className="text-gray-800 font-bold text-lg">اختبار الفضاءات</span>
                <div className="text-xs text-gray-500">فحص وتقييم جودة المساحات الافتراضية</div>
              </div>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="bg-blue-50 px-3 py-1 rounded-full">
              <span className="text-blue-700 text-sm font-medium">
                <i className="ri-check-line mr-1"></i>
                نظام الاختبار نشط
              </span>
            </div>
            <Link href="/dashboard" className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-gray-700 transition-colors cursor-pointer">
              <i className="ri-arrow-right-line mr-2"></i>
              العودة للوحة التحكم
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Panel - Space Selection */}
          <div className="lg:col-span-2 space-y-6">
            {/* Test Mode Selection */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <i className="ri-settings-3-line mr-3 text-blue-600"></i>
                نوع الاختبار
              </h2>
              
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { id: 'quick', name: 'اختبار سريع', desc: 'فحص أساسي للمميزات', time: '1-2 دقيقة', icon: 'ri-flashlight-line' },
                  { id: 'detailed', name: 'اختبار مفصل', desc: 'فحص شامل لجميع الجوانب', time: '5-7 دقائق', icon: 'ri-search-line' },
                  { id: 'interactive', name: 'اختبار تفاعلي', desc: 'اختبار عملي مع المحاكاة', time: '10-15 دقيقة', icon: 'ri-play-line' }
                ].map(mode => (
                  <button
                    key={mode.id}
                    onClick={() => setTestMode(mode.id as any)}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 text-right cursor-pointer ${
                      testMode === mode.id
                        ? 'border-blue-500 bg-blue-50 text-blue-800'
                        : 'border-gray-200 bg-white hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-lg mb-3 flex items-center justify-center ${
                      testMode === mode.id ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
                    }`}>
                      <i className={`${mode.icon} text-xl`}></i>
                    </div>
                    <h3 className="font-bold mb-1">{mode.name}</h3>
                    <p className="text-sm opacity-75 mb-2">{mode.desc}</p>
                    <div className="text-xs font-medium">{mode.time}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Space Selection */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <i className="ri-building-2-line mr-3 text-blue-600"></i>
                اختيار الفضاء المراد اختباره
              </h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                {spaces.map(space => (
                  <div
                    key={space.id}
                    onClick={() => setSelectedSpace(space.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                      selectedSpace === space.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="relative mb-3">
                      <img
                        src={space.image}
                        alt={space.name}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(space.status)}`}>
                        {space.status === 'available' ? 'متاح' : space.status === 'busy' ? 'مشغول' : 'صيانة'}
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        selectedSpace === space.id ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
                      }`}>
                        <i className={`${getSpaceTypeIcon(space.type)} text-lg`}></i>
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800">{space.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{space.description}</p>
                        
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>السعة: {space.capacity}</span>
                          <span>المستخدمون: {space.currentUsers}</span>
                        </div>
                        
                        <div className="mt-2 flex flex-wrap gap-1">
                          {space.features.slice(0, 2).map(feature => (
                            <span key={feature} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                              {feature}
                            </span>
                          ))}
                          {space.features.length > 2 && (
                            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                              +{space.features.length - 2}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel - Test Controls & Results */}
          <div className="space-y-6">
            {/* Test Control Panel */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <i className="ri-play-circle-line mr-3 text-green-600"></i>
                لوحة التحكم
              </h3>
              
              {selectedSpace ? (
                <div className="space-y-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white">
                        <i className={getSpaceTypeIcon(spaces.find(s => s.id === selectedSpace)?.type || '')}></i>
                      </div>
                      <div>
                        <div className="font-medium text-blue-800">
                          {spaces.find(s => s.id === selectedSpace)?.name}
                        </div>
                        <div className="text-sm text-blue-600">جاهز للاختبار</div>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={runTest}
                    disabled={isTestRunning}
                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 cursor-pointer whitespace-nowrap ${
                      isTestRunning
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl'
                    }`}
                  >
                    {isTestRunning ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                        <span>جاري الاختبار...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <i className="ri-play-fill"></i>
                        <span>بدء الاختبار</span>
                      </div>
                    )}
                  </button>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <i className="ri-cursor-line text-3xl mb-2 block"></i>
                  <p>اختر فضاءً لبدء الاختبار</p>
                </div>
              )}
            </div>

            {/* Test Scenarios */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <i className="ri-list-check-line mr-3 text-purple-600"></i>
                سيناريوهات الاختبار
              </h3>
              
              <div className="space-y-3">
                {testScenarios.map(scenario => (
                  <div key={scenario.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800">{scenario.name}</h4>
                        <p className="text-sm text-gray-600">{scenario.description}</p>
                      </div>
                      <div className="text-xs text-gray-500 font-medium">
                        {scenario.duration}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Test Results */}
            {testResults && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <i className="ri-bar-chart-line mr-3 text-green-600"></i>
                  نتائج الاختبار
                </h3>
                
                <div className="space-y-4">
                  {/* Overall Score */}
                  <div className="text-center p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl">
                    <div className={`text-3xl font-bold ${getScoreColor(testResults.overallScore)}`}>
                      {testResults.overallScore}%
                    </div>
                    <div className="text-gray-600">النتيجة الإجمالية</div>
                  </div>
                  
                  {/* Detailed Scores */}
                  <div className="space-y-3">
                    {[
                      { label: 'جودة الصوت', value: testResults.audioQuality, icon: 'ri-volume-up-line' },
                      { label: 'جودة الفيديو', value: testResults.videoQuality, icon: 'ri-camera-line' },
                      { label: 'الاتصال', value: testResults.connectivity, icon: 'ri-wifi-line' },
                      { label: 'المميزات', value: testResults.features, icon: 'ri-tools-line' }
                    ].map(item => (
                      <div key={item.label} className="flex items-center justify-between p-2">
                        <div className="flex items-center space-x-2">
                          <i className={`${item.icon} text-gray-600`}></i>
                          <span className="text-sm text-gray-700">{item.label}</span>
                        </div>
                        <div className={`font-bold ${getScoreColor(item.value)}`}>
                          {item.value}%
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Latency */}
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">زمن الاستجابة</span>
                      <span className="font-bold text-blue-600">{testResults.latency}ms</span>
                    </div>
                  </div>
                  
                  {/* Recommendations */}
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-800">التوصيات:</h4>
                    {testResults.recommendations.map((rec: string, index: number) => (
                      <div key={index} className="flex items-center space-x-2 text-sm text-green-700">
                        <i className="ri-check-line"></i>
                        <span>{rec}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors cursor-pointer whitespace-nowrap">
                    <i className="ri-download-line mr-2"></i>
                    تحميل التقرير
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}