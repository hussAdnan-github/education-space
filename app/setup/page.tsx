
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SetupPage() {
  const [selectedType, setSelectedType] = useState('high_school');
  const [selectedStyle, setSelectedStyle] = useState('simple');
  const [selectedCapacity, setSelectedCapacity] = useState('5-15');
  const [currentStep, setCurrentStep] = useState(1);
  const [spaceName, setSpaceName] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('');
  const [selectedComponents, setSelectedComponents] = useState<string[]>([
    'main_hall', 'classroom', 'teachers_room', 'playground'
  ]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    'board_games', 'gamification', 'ai_assistant', 'virtual_clock'
  ]);

  // معلومات الترخيص والمؤسسة
  const [organizationInfo, setOrganizationInfo] = useState({
    isExistingOrganization: false,
    organizationName: '',
    licenseNumber: '',
    establishmentDate: '',
    country: '',
    city: '',
    address: '',
    phone: '',
    email: '',
    website: '',
    organizationType: '',
    numberOfEmployees: '',
    legalRepresentative: '',
    legalRepresentativePosition: '',
    legalRepresentativePhone: '',
    taxNumber: '',
    commercialRecord: ''
  });

  // معلومات الدفع
  const [paymentInfo, setPaymentInfo] = useState({
    paymentMethod: '',
    billingCycle: 'monthly',
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
    billingAddress: '',
    agreeToTerms: false
  });

  const spaceTypes = {
    high_school: {
      name: 'المدارس الثانوية الافتراضية',
      description: 'فصول دراسية تفاعلية مع ساحات استراحة رقمية',
      icon: 'ri-school-line',
      features: ['فصول دراسية تفاعلية 3D', 'ساحات استراحة رقمية', 'سبورات ذكية', 'نظام حضور وتقييم', 'مشاركة المحتوى المرئي'],
      basePrice: 10,
      plans: [
        { id: 'basic', name: 'أساسية', price: 10, students: 30, staff: 5, rooms: '1 قاعة + مكتب إدارة' },
        { id: 'advanced', name: 'متقدمة', price: 20, students: 75, staff: 10, rooms: '2 قاعات + 2 مكاتب', popular: true },
        { id: 'custom', name: 'مخصصة', price: 50, students: '150+', staff: '15+', rooms: 'تصميم حسب الطلب' }
      ]
    },
    university: {
      name: 'الجامعات الافتراضية',
      description: 'قاعات محاضرات ومكاتب أعضاء هيئة التدريس',
      icon: 'ri-building-2-line',
      features: ['قاعات محاضرات الكبيرة', 'مكتبة رقمية شاملة', 'مكاتب أكاديمية', 'بيئة آمنة ومحمية', 'نظام مساقات مرن'],
      basePrice: 25,
      plans: [
        { id: 'basic', name: 'أساسية', price: 25, students: 50, staff: 8, rooms: '1 قاعة + مكتبة + 2 مكاتب' },
        { id: 'advanced', name: 'متقدمة', price: 50, students: 150, staff: 20, rooms: '3 قاعات + مكتبة + 5 مكاتب', popular: true },
        { id: 'custom', name: 'مخصصة', price: 100, students: '300+', staff: '30+', rooms: 'تصميم حسب الطلب' }
      ]
    },
    training: {
      name: 'المعاهد التدريبية والمهارية',
      description: 'دورات احترافية وتدريب مهني متخصص',
      icon: 'ri-trophy-line',
      features: ['قاعات تدريب مرنة', 'أدوات تقييم فورية', 'شهادات رقمية', 'استضافة مدربين خارجيين', 'تسجيل الجلسات'],
      basePrice: 15,
      plans: [
        { id: 'basic', name: 'أساسية', price: 15, students: 25, staff: 3, rooms: '1 قاعة تدريب + مكتب' },
        { id: 'advanced', name: 'متقدمة', price: 35, students: 60, staff: 8, rooms: '2 قاعات + مختبر + 2 مكاتب', popular: true },
        { id: 'custom', name: 'مخصصة', price: 70, students: '100+', staff: '12+', rooms: 'قاعات متخصصة حسب المجال' }
      ]
    },
    remote_office: {
      name: 'مكاتب العمل عن بُعد',
      description: 'بيئة عمل تعاونية للفرق والموظفين',
      icon: 'ri-briefcase-line',
      features: ['مكاتب شخصية مخصصة', 'غرف اجتماعات متقدمة', 'أدوات تعاون مشتركة', 'تتبع الحضور والإنتاجية', 'بيئة اجتماعية رقمية'],
      basePrice: 15,
      plans: [
        { id: 'basic', name: 'أساسية', price: 15, students: 5, staff: 2, rooms: 'مكتب واحد افتراضي' },
        { id: 'advanced', name: 'متقدمة', price: 70, students: 15, staff: 5, rooms: 'مكتبين + قاعتين اجتماعات + صالة انتظار', popular: true },
        { id: 'custom', name: 'مخصصة', price: 120, students: '30+', staff: '10+', rooms: 'تصميم حسب الطلب + علامة تجارية' }
      ]
    },
    events: {
      name: 'الفعاليات الرقمية والمؤتمرات',
      description: 'ندوات ومؤتمرات وفعاليات تفاعلية',
      icon: 'ri-presentation-line',
      features: ['قاعات رئيسية للندوات', 'أكشاك عرض افتراضية', 'لقاءات تشبيك حرة', 'نظام حجز الجلسات', 'دعم البث المباشر'],
      basePrice: 40,
      plans: [
        { id: 'basic', name: 'أساسية', price: 40, students: 100, staff: 10, rooms: 'قاعة رئيسية + 3 أكشاك' },
        { id: 'advanced', name: 'متقدمة', price: 80, students: 300, staff: 20, rooms: '2 قاعات + 8 أكشاك + مناطق تشبيك', popular: true },
        { id: 'custom', name: 'مخصصة', price: 150, students: '500+', staff: '30+', rooms: 'مؤتمر كامل مع كافة المرافق' }
      ]
    }
  };

  const interactiveComponents = [
    { id: 'main_hall', name: 'قاعة رئيسية', description: 'المكان الرئيسي للقاءات والمحاضرات', icon: 'ri-presentation-line', essential: true },
    { id: 'classroom', name: 'غرفة الصف أو الاجتماع', description: 'مزودة بسبورة ذكية وتفاعلات مباشرة', icon: 'ri-school-line', essential: true },
    { id: 'teachers_room', name: 'غرفة المعلمين أو المشرفين', description: 'مساحة خاصة للمعلمين والمنظمين', icon: 'ri-user-star-line', essential: true },
    { id: 'playground', name: 'ساحة ترفيهية', description: 'مكان للتفاعل غير الرسمي بين المستخدمين', icon: 'ri-football-line', essential: true },
    { id: 'cafeteria', name: 'غرفة الطعام/الاستراحة', description: 'تحاكي بيئة الأكل الجماعي', icon: 'ri-restaurant-line' },
    { id: 'bathroom', name: 'الحمّامات الافتراضية', description: 'عنصر رمزي يعزز حس الواقع', icon: 'ri-door-line' },
    { id: 'game_room', name: 'غرفة اللعب', description: 'ألعاب تعليمية وذهنية للطلاب', icon: 'ri-gamepad-line' },
    { id: 'lobby', name: 'الردهة/اللوبي', description: 'مكان الاستقبال والتوجيه العام', icon: 'ri-door-open-line' },
    { id: 'exhibition', name: 'غرفة العرض/المعارض', description: 'للأنشطة والمشاريع والعروض', icon: 'ri-gallery-line' }
  ];

  const competitiveFeatures = [
    { id: 'board_games', name: 'ألعاب لوحية تفاعلية', description: 'شطرنج، مونوبولي، وألعاب جماعية', icon: 'ri-chess-line' },
    { id: 'educational_games', name: 'ألعاب تعليمية مصغرة', description: 'لتعليم الرياضيات واللغة والمنطق', icon: 'ri-book-open-line' },
    { id: 'gamification', name: 'نظام إنجازات/نقاط', description: 'شارات ومكافآت رقمية للتحفيز', icon: 'ri-trophy-line' },
    { id: 'private_screen', name: 'شاشة عرض شخصية', description: 'مساحة شخصية لكل مستخدم', icon: 'ri-computer-line' },
    { id: 'status_light', name: 'مؤشر الحالة', description: 'يوضح حالة المستخدم (متاح، مشغول، إلخ)', icon: 'ri-signal-tower-line' },
    { id: 'smart_map', name: 'خريطة تنقل ذكية', description: 'للتنقل البصري بين المناطق', icon: 'ri-map-pin-line' },
    { id: 'ai_assistant', name: 'مساعد افتراضي صوتي', description: 'توجيه ذكي واقتراحات مفيدة', icon: 'ri-robot-line' },
    { id: 'virtual_clock', name: 'نظام محاكاة الوقت', description: 'محاكاة الجدول الزمني مع التنبيهات', icon: 'ri-time-line' }
  ];

  const styles = [
    { id: 'comfortable', name: 'مريح', description: 'بيئة دافئة ومريحة', icon: 'ri-home-heart-line' },
    { id: 'modern', name: 'عصري', description: 'تصميم حديث وأنيق', icon: 'ri-building-2-line' },
    { id: 'natural', name: 'طبيعي', description: 'بيئة طبيعية مهدئة', icon: 'ri-leaf-line' },
    { id: 'simple', name: 'بسيط', description: 'تصميم نظيف ومرتب', icon: 'ri-layout-line' }
  ];

  const capacities = [
    { id: '5-15', name: '5-15 شخص', size: 'صغير' },
    { id: '16-30', name: '16-30 شخص', size: 'متوسط' },
    { id: '31-60', name: '31-60 شخص', size: 'كبير' },
    { id: '61-100', name: '61-100 شخص', size: 'كبير جداً' },
    { id: '100+', name: '100+ شخص', size: 'ضخم' }
  ];

  const countries = [
    'المملكة العربية السعودية', 'الإمارات العربية المتحدة', 'الكويت', 'قطر', 'البحرين', 'عمان',
    'مصر', 'الأردن', 'لبنان', 'سوريا', 'العراق', 'المغرب', 'تونس', 'الجزائر', 'ليبيا', 'السودان'
  ];

  const organizationTypes = [
    'مؤسسة تعليمية حكومية', 'مؤسسة تعليمية خاصة', 'جامعة', 'معهد تدريب', 'شركة خاصة', 
    'مؤسسة غير ربحية', 'مؤسسة حكومية', 'مستشفى', 'مركز طبي', 'أخرى'
  ];

  const paymentMethods = [
    { id: 'visa', name: 'Visa', icon: 'ri-bank-card-line' },
    { id: 'mastercard', name: 'Mastercard', icon: 'ri-bank-card-2-line' },
    { id: 'mada', name: 'مدى', icon: 'ri-bank-card-line' },
    { id: 'applepay', name: 'Apple Pay', icon: 'ri-apple-line' },
    { id: 'googlepay', name: 'Google Pay', icon: 'ri-google-line' },
    { id: 'paypal', name: 'PayPal', icon: 'ri-paypal-line' }
  ];

  // موجودة مسبقًا في الكود الأصلي
  const typeKeywords = {
    high_school: 'Virtual high school classroom interior with student desks, modern whiteboard, educational posters, bright lighting, academic environment',
    university: 'University lecture hall interior with tiered seating, projection screen, professional academic setting, modern lighting',
    training: 'Professional training room interior with conference table, presentation screen, modern office furniture, corporate environment',
    remote_office: 'Modern remote office workspace with desk setups, meeting areas, collaborative zones, contemporary business interior',
    events: 'Conference center interior with auditorium seating, stage area, exhibition booths, professional event space'
  };

  const styleKeywords = {
    comfortable: 'warm cozy interior design with soft lighting, comfortable furniture, welcoming atmosphere',
    modern: 'sleek contemporary interior design with clean lines, modern furniture, minimalist aesthetic',
    natural: 'natural interior design with wood elements, plants, natural lighting, organic materials',
    simple: 'minimalist clean interior design with simple furniture, neutral colors, uncluttered space'
  };

  const toggleComponent = (componentId: string) => {
    const component = interactiveComponents.find(c => c.id === componentId);
    if (component?.essential) return; // لا يمكن إلغاء المكونات الأساسية
    
    setSelectedComponents(prev => 
      prev.includes(componentId) 
        ? prev.filter(id => id !== componentId)
        : [...prev, componentId]
    );
  };

  const toggleFeature = (featureId: string) => {
    setSelectedFeatures(prev => 
      prev.includes(featureId) 
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    );
  };

  const nextStep = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = () => {
    console.log('إعداد الفضاء مكتمل:', {
      type: selectedType,
      style: selectedStyle,
      capacity: selectedCapacity,
      plan: selectedPlan,
      name: spaceName,
      components: selectedComponents,
      features: selectedFeatures,
      organization: organizationInfo,
      payment: paymentInfo
    });
  };

  const currentType = spaceTypes[selectedType as keyof typeof spaceTypes];
  const currentPlan = currentType?.plans.find(p => p.id === selectedPlan);
  const totalAmount = currentPlan ? (paymentInfo.billingCycle === 'annual' ? currentPlan.price * 12 * 0.8 : currentPlan.price) : 0;

  // خطوة معلومات المؤسسة والترخيص
  if (currentStep === 5) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <header className="bg-white/90 backdrop-blur-sm shadow-sm border-b border-indigo-200">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <Link href="/dashboard" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <i className="ri-building-line text-white text-xl"></i>
                </div>
                <h1 className="text-xl font-bold text-gray-800">إعداد الفضاء التعليمي</h1>
              </Link>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>الخطوة 5 من 6</span>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-6 py-12 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">معلومات المؤسسة والترخيص</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">أدخل معلومات مؤسستك الرسمية وبيانات الترخيص</p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
            {/* نوع المؤسسة */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-800 mb-4">نوع المؤسسة</h3>
              <div className="flex space-x-4 mb-6">
                <button
                  onClick={() => setOrganizationInfo({...organizationInfo, isExistingOrganization: false})}
                  className={`flex-1 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                    !organizationInfo.isExistingOrganization 
                      ? 'border-blue-500 bg-blue-50 text-blue-700' 
                      : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300'
                  }`}
                >
                  <i className="ri-user-line text-2xl mb-2"></i>
                  <div className="font-medium">مستخدم فردي</div>
                  <div className="text-sm opacity-80">للاستخدام الشخصي أو التجريبي</div>
                </button>
                <button
                  onClick={() => setOrganizationInfo({...organizationInfo, isExistingOrganization: true})}
                  className={`flex-1 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                    organizationInfo.isExistingOrganization 
                      ? 'border-blue-500 bg-blue-50 text-blue-700' 
                      : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300'
                  }`}
                >
                  <i className="ri-building-2-line text-2xl mb-2"></i>
                  <div className="font-medium">مؤسسة قائمة</div>
                  <div className="text-sm opacity-80">لديك مؤسسة مرخصة في الواقع</div>
                </button>
              </div>
            </div>

            {/* معلومات المؤسسة - تظهر فقط إذا كانت مؤسسة قائمة */}
            {organizationInfo.isExistingOrganization && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">اسم المؤسسة *</label>
                    <input
                      type="text"
                      value={organizationInfo.organizationName}
                      onChange={(e) => setOrganizationInfo({...organizationInfo, organizationName: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="مثال: جامعة الملك سعود"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">نوع المؤسسة *</label>
                    <select 
                      value={organizationInfo.organizationType}
                      onChange={(e) => setOrganizationInfo({...organizationInfo, organizationType: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
                    >
                      <option value="">اختر نوع المؤسسة</option>
                      {organizationTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">رقم الترخيص *</label>
                    <input
                      type="text"
                      value={organizationInfo.licenseNumber}
                      onChange={(e) => setOrganizationInfo({...organizationInfo, licenseNumber: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="مثال: 123456789"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">تاريخ التأسيس</label>
                    <input
                      type="date"
                      value={organizationInfo.establishmentDate}
                      onChange={(e) => setOrganizationInfo({...organizationInfo, establishmentDate: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">الدولة *</label>
                    <select 
                      value={organizationInfo.country}
                      onChange={(e) => setOrganizationInfo({...organizationInfo, country: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
                    >
                      <option value="">اختر الدولة</option>
                      {countries.map(country => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">المدينة *</label>
                    <input
                      type="text"
                      value={organizationInfo.city}
                      onChange={(e) => setOrganizationInfo({...organizationInfo, city: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="مثال: الرياض"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">العنوان الكامل *</label>
                  <textarea
                    value={organizationInfo.address}
                    onChange={(e) => setOrganizationInfo({...organizationInfo, address: e.target.value})}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="العنوان التفصيلي للمؤسسة"
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">رقم الهاتف *</label>
                    <input
                      type="tel"
                      value={organizationInfo.phone}
                      onChange={(e) => setOrganizationInfo({...organizationInfo, phone: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+966XXXXXXXXX"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني *</label>
                    <input
                      type="email"
                      value={organizationInfo.email}
                      onChange={(e) => setOrganizationInfo({...organizationInfo, email: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="info@organization.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">الموقع الإلكتروني</label>
                    <input
                      type="url"
                      value={organizationInfo.website}
                      onChange={(e) => setOrganizationInfo({...organizationInfo, website: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://www.organization.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">عدد الموظفين</label>
                    <select 
                      value={organizationInfo.numberOfEmployees}
                      onChange={(e) => setOrganizationInfo({...organizationInfo, numberOfEmployees: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
                    >
                      <option value="">اختر عدد الموظفين</option>
                      <option value="1-10">1-10 موظفين</option>
                      <option value="11-50">11-50 موظف</option>
                      <option value="51-200">51-200 موظف</option>
                      <option value="201-500">201-500 موظف</option>
                      <option value="500+">أكثر من 500 موظف</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">الرقم الضريبي</label>
                    <input
                      type="text"
                      value={organizationInfo.taxNumber}
                      onChange={(e) => setOrganizationInfo({...organizationInfo, taxNumber: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="300000000000003"
                    />
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h4 className="text-md font-bold text-gray-800 mb-4">معلومات الممثل القانوني</h4>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">اسم الممثل القانوني *</label>
                      <input
                        type="text"
                        value={organizationInfo.legalRepresentative}
                        onChange={(e) => setOrganizationInfo({...organizationInfo, legalRepresentative: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="الاسم الكامل"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">المنصب *</label>
                      <input
                        type="text"
                        value={organizationInfo.legalRepresentativePosition}
                        onChange={(e) => setOrganizationInfo({...organizationInfo, legalRepresentativePosition: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="مثال: المدير العام"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">رقم الهاتف *</label>
                      <input
                        type="tel"
                        value={organizationInfo.legalRepresentativePhone}
                        onChange={(e) => setOrganizationInfo({...organizationInfo, legalRepresentativePhone: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="+966XXXXXXXXX"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">رقم السجل التجاري</label>
                  <input
                    type="text"
                    value={organizationInfo.commercialRecord}
                    onChange={(e) => setOrganizationInfo({...organizationInfo, commercialRecord: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="مثال: 1010000000"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={prevStep}
              className="bg-gray-200 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-300 transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-arrow-right-line ml-2"></i>
              السابق
            </button>

            <button
              onClick={nextStep}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all cursor-pointer whitespace-nowrap"
            >
              التالي: الدفع والاشتراك
              <i className="ri-arrow-left-line mr-2"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // خطوة الدفع والاشتراك
  if (currentStep === 6) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <header className="bg-white/90 backdrop-blur-sm shadow-sm border-b border-indigo-200">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <Link href="/dashboard" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <i className="ri-building-line text-white text-xl"></i>
                </div>
                <h1 className="text-xl font-bold text-gray-800">إعداد الفضاء التعليمي</h1>
              </Link>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>الخطوة 6 من 6</span>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-6 py-12 max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">الدفع والاشتراك</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">اختر طريقة الدفع وأكمل عملية الاشتراك</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* معلومات الطلب */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
                <h3 className="text-lg font-bold text-gray-800 mb-4">ملخص الطلب</h3>
                
                <div className="space-y-4 pb-4 border-b border-gray-200">
                  <div className="flex justify-between">
                    <span className="text-gray-600">نوع الفضاء:</span>
                    <span className="font-medium">{currentType?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">الخطة:</span>
                    <span className="font-medium">{currentPlan?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">اسم الفضاء:</span>
                    <span className="font-medium">{spaceName || 'غير محدد'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">المكونات:</span>
                    <span className="font-medium">{selectedComponents.length} مكون</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">المزايا الإضافية:</span>
                    <span className="font-medium">{selectedFeatures.length} ميزة</span>
                  </div>
                </div>

                <div className="py-4 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">دورة الفوترة:</span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setPaymentInfo({...paymentInfo, billingCycle: 'monthly'})}
                        className={`px-3 py-1 rounded-full text-sm transition-colors cursor-pointer ${
                          paymentInfo.billingCycle === 'monthly'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        شهري
                      </button>
                      <button
                        onClick={() => setPaymentInfo({...paymentInfo, billingCycle: 'annual'})}
                        className={`px-3 py-1 rounded-full text-sm transition-colors cursor-pointer ${
                          paymentInfo.billingCycle === 'annual'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        سنوي (-20%)
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      السعر الأساسي ({paymentInfo.billingCycle === 'annual' ? 'سنوي' : 'شهري'}):
                    </span>
                    <span className="font-medium">
                      ${paymentInfo.billingCycle === 'annual' ? (currentPlan?.price || 0) * 12 : currentPlan?.price || 0}
                    </span>
                  </div>
                  {paymentInfo.billingCycle === 'annual' && (
                    <div className="flex justify-between text-green-600">
                      <span>خصم سنوي (20%):</span>
                      <span>-${((currentPlan?.price || 0) * 12 * 0.2).toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-bold text-gray-800 pt-2 border-t border-gray-200">
                    <span>المجموع:</span>
                    <span>${totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* نموذج الدفع */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-800 mb-6">معلومات الدفع</h3>

                {/* طرق الدفع */}
                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-4">طريقة الدفع</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {paymentMethods.map(method => (
                      <button
                        key={method.id}
                        onClick={() => setPaymentInfo({...paymentInfo, paymentMethod: method.id})}
                        className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                          paymentInfo.paymentMethod === method.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex flex-col items-center space-y-2">
                          <i className={`${method.icon} text-2xl ${
                            paymentInfo.paymentMethod === method.id ? 'text-blue-600' : 'text-gray-600'
                          }`}></i>
                          <span className="text-sm font-medium">{method.name}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* معلومات البطاقة */}
                {(paymentInfo.paymentMethod === 'visa' || paymentInfo.paymentMethod === 'mastercard' || paymentInfo.paymentMethod === 'mada') && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">رقم البطاقة *</label>
                      <input
                        type="text"
                        value={paymentInfo.cardNumber}
                        onChange={(e) => setPaymentInfo({...paymentInfo, cardNumber: e.target.value})}
                        placeholder="0000 0000 0000 0000"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">اسم حامل البطاقة *</label>
                      <input
                        type="text"
                        value={paymentInfo.cardHolder}
                        onChange={(e) => setPaymentInfo({...paymentInfo, cardHolder: e.target.value})}
                        placeholder="الاسم كما يظهر على البطاقة"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">تاريخ الانتهاء *</label>
                        <input
                          type="text"
                          value={paymentInfo.expiryDate}
                          onChange={(e) => setPaymentInfo({...paymentInfo, expiryDate: e.target.value})}
                          placeholder="MM/YY"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">رمز الأمان (CVV) *</label>
                        <input
                          type="text"
                          value={paymentInfo.cvv}
                          onChange={(e) => setPaymentInfo({...paymentInfo, cvv: e.target.value})}
                          placeholder="123"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">عنوان الفوترة *</label>
                      <textarea
                        value={paymentInfo.billingAddress}
                        onChange={(e) => setPaymentInfo({...paymentInfo, billingAddress: e.target.value})}
                        rows={3}
                        placeholder="العنوان الكامل للفوترة"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                )}

                {/* الموافقة على الشروط */}
                <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={paymentInfo.agreeToTerms}
                      onChange={(e) => setPaymentInfo({...paymentInfo, agreeToTerms: e.target.checked})}
                      className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="terms" className="text-sm text-gray-700">
                      أوافق على <a href="#" className="text-blue-600 hover:underline">شروط الخدمة</a> و 
                      <a href="#" className="text-blue-600 hover:underline">سياسة الخصوصية</a>. 
                      كما أوافق على بدء الاشتراك فوراً وأتفهم أنني سأتم تحصيل الرسوم بناءً على دورة الفوترة المختارة.
                    </label>
                  </div>
                </div>

                {/* معلومات الأمان */}
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-2 text-green-800">
                    <i className="ri-shield-check-line"></i>
                    <span className="text-sm font-medium">
                      معاملتك محمية بتشفير SSL 256-bit ولا نحتفظ بمعلومات البطاقة الائتمانية
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* أزرار التنقل */}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={prevStep}
              className="bg-gray-200 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-300 transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-arrow-right-line ml-2"></i>
              السابق
            </button>

            <button
              onClick={handleFinish}
              disabled={!paymentInfo.paymentMethod || !paymentInfo.agreeToTerms}
              className={`px-8 py-4 rounded-xl text-lg font-semibold transition-all cursor-pointer whitespace-nowrap ${
                paymentInfo.paymentMethod && paymentInfo.agreeToTerms
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 shadow-lg transform hover:scale-105'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <i className="ri-secure-payment-line ml-2"></i>
              تأكيد الدفع والبدء (${totalAmount.toFixed(2)})
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <header className="bg-white/90 backdrop-blur-sm shadow-sm border-b border-indigo-200">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <Link href="/dashboard" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <i className="ri-building-line text-white text-xl"></i>
                </div>
                <h1 className="text-xl font-bold text-gray-800">إعداد الفضاء التعليمي</h1>
              </Link>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>الخطوة 2 من 6</span>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-6 py-12 max-w-7xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">اختيار المكونات التفاعلية</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">حدد المساحات والمكونات التي تحتاجها في فضائك التعليمي</p>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">المكونات التفاعلية الأساسية</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {interactiveComponents.map(component => (
                <button
                  key={component.id}
                  onClick={() => toggleComponent(component.id)}
                  disabled={component.essential}
                  className={`p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer text-right ${
                    selectedComponents.includes(component.id)
                      ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-transparent shadow-xl'
                      : component.essential
                      ? 'bg-green-50 border-green-200 text-green-800'
                      : 'bg-white border-gray-200 text-gray-700 hover:border-indigo-300 hover:shadow-lg'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <i className={`${component.icon} text-3xl ${
                      selectedComponents.includes(component.id) ? 'text-white' : 
                      component.essential ? 'text-green-600' : 'text-indigo-600'
                    }`}></i>
                    {component.essential && (
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                        أساسي
                      </span>
                    )}
                    {selectedComponents.includes(component.id) && !component.essential && (
                      <i className="ri-check-line text-2xl text-white"></i>
                    )}
                  </div>
                  <h3 className="font-bold text-lg mb-2">{component.name}</h3>
                  <p className={`text-sm ${
                    selectedComponents.includes(component.id) ? 'text-white/90' :
                    component.essential ? 'text-green-700' : 'text-gray-600'
                  }`}>
                    {component.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">المزايا التنافسية الإضافية</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {competitiveFeatures.map(feature => (
                <button
                  key={feature.id}
                  onClick={() => toggleFeature(feature.id)}
                  className={`p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer text-center ${
                    selectedFeatures.includes(feature.id)
                      ? 'bg-gradient-to-br from-purple-500 to-pink-600 text-white border-transparent shadow-xl'
                      : 'bg-white border-gray-200 text-gray-700 hover:border-purple-300 hover:shadow-lg'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <i className={`${feature.icon} text-3xl ${
                      selectedFeatures.includes(feature.id) ? 'text-white' : 'text-purple-600'
                    }`}></i>
                    {selectedFeatures.includes(feature.id) && (
                      <i className="ri-check-line text-2xl text-white"></i>
                    )}
                  </div>
                  <h3 className="font-bold text-lg mb-2">{feature.name}</h3>
                  <p className={`text-sm ${
                    selectedFeatures.includes(feature.id) ? 'text-white/90' : 'text-gray-600'
                  }`}>
                    {feature.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={prevStep}
              className="bg-gray-200 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-300 transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-arrow-right-line ml-2"></i>
              السابق
            </button>
            
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-2">
                تم اختيار {selectedComponents.length} مكون و {selectedFeatures.length} ميزة
              </div>
            </div>

            <button
              onClick={nextStep}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all cursor-pointer whitespace-nowrap"
            >
              التالي: اختيار الخطة
              <i className="ri-arrow-left-line mr-2"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 3) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <header className="bg-white/90 backdrop-blur-sm shadow-sm border-b border-indigo-200">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <Link href="/dashboard" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <i className="ri-building-line text-white text-xl"></i>
                </div>
                <h1 className="text-xl font-bold text-gray-800">إعداد الفضاء التعليمي</h1>
              </Link>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>الخطوة 3 من 6</span>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-6 py-12 max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">اختيار خطة الاشتراك</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">اختر الخطة المناسبة لاحتياجاتك وميزانيتك</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-indigo-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4">ملخص اختياراتك</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-700 mb-2">نوع الفضاء:</h4>
                <p className="text-indigo-600 font-bold">{currentType.name}</p>
                <h4 className="font-medium text-gray-700 mb-2 mt-4">المكونات المختارة:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedComponents.map(compId => {
                    const comp = interactiveComponents.find(c => c.id === compId);
                    return (
                      <span key={compId} className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-sm">
                        {comp?.name}
                      </span>
                    );
                  })}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-2">المزايا الإضافية:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedFeatures.map(featId => {
                    const feat = competitiveFeatures.find(f => f.id === featId);
                    return (
                      <span key={featId} className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-sm">
                        {feat?.name}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {currentType.plans.map(plan => (
              <button
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`p-8 rounded-3xl border-2 transition-all duration-300 cursor-pointer relative ${
                  selectedPlan === plan.id
                    ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-transparent shadow-2xl transform scale-105'
                    : 'bg-white border-gray-200 text-gray-700 hover:border-indigo-300 hover:shadow-xl'
                } ${plan.popular ? 'border-indigo-400' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                      الأكثر شعبية
                    </span>
                  </div>
                )}
                
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className={`text-lg ${selectedPlan === plan.id ? 'text-white/80' : 'text-gray-500'}`}>/شهرياً</span>
                  </div>
                  
                  <div className="space-y-4 text-right">
                    <div className="flex items-center justify-between">
                      <span className={selectedPlan === plan.id ? 'text-white/90' : 'text-gray-600'}>عدد المستخدمين:</span>
                      <span className="font-bold">{plan.students}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={selectedPlan === plan.id ? 'text-white/90' : 'text-gray-600'}>الكادر الإداري:</span>
                      <span className="font-bold">{plan.staff}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={selectedPlan === plan.id ? 'text-white/90' : 'text-gray-600'}>المساحات:</span>
                      <span className="font-bold text-sm">{plan.rooms}</span>
                    </div>
                  </div>

                  <div className={`mt-6 pt-6 border-t ${
                    selectedPlan === plan.id ? 'border-white/20' : 'border-gray-200'
                  }`}>
                    <div className="text-center">
                      <div className={`text-sm ${selectedPlan === plan.id ? 'text-white/80' : 'text-gray-500'}`}>
                        وفر 20% مع الاشتراك السنوي
                      </div>
                      <div className="text-lg font-bold">
                        ${Math.round(plan.price * 12 * 0.8)}/سنوياً
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="flex justify-between items-center mt-12">
            <button
              onClick={prevStep}
              className="bg-gray-200 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-300 transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-arrow-right-line ml-2"></i>
              السابق
            </button>

            <button
              onClick={nextStep}
              disabled={!selectedPlan}
              className={`px-6 py-3 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                selectedPlan
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              التالي: تسمية الفضاء
              <i className="ri-arrow-left-line mr-2"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 4) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <header className="bg-white/90 backdrop-blur-sm shadow-sm border-b border-indigo-200">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <Link href="/dashboard" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <i className="ri-building-line text-white text-xl"></i>
                </div>
                <h1 className="text-xl font-bold text-gray-800">إعداد الفضاء التعليمي</h1>
              </Link>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>الخطوة 4 من 6</span>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-6 py-12 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">تسمية فضائك التعليمي</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">اختر اسماً مميزاً لفضائك التعليمي الافتراضي</p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
            <div className="mb-6">
              <label className="block text-lg font-bold text-gray-800 mb-3">اسم الفضاء التعليمي:</label>
              <input
                type="text"
                value={spaceName}
                onChange={(e) => setSpaceName(e.target.value)}
                placeholder="مثال: أكاديمية المستقبل الافتراضية"
                className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-indigo-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">ملخص الإعداد النهائي</h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-gray-700">نوع الفضاء:</h4>
                  <p className="text-indigo-600 font-medium">{currentType.name}</p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-700">الخطة:</h4>
                  <p className="text-purple-600 font-medium">{currentPlan?.name} - ${currentPlan?.price}/شهرياً</p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-700">السعة:</h4>
                  <p className="text-blue-600 font-medium">{selectedCapacity} مستخدم</p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-700">طابع التصميم:</h4>
                  <p className="text-green-600 font-medium">{styles.find(s => s.id === selectedStyle)?.name}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-gray-700">المكونات ({selectedComponents.length}):</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedComponents.slice(0, 4).map(compId => {
                      const comp = interactiveComponents.find(c => c.id === compId);
                      return (
                        <span key={compId} className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-sm">
                          {comp?.name}
                        </span>
                      );
                    })}
                    {selectedComponents.length > 4 && (
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm">
                        +{selectedComponents.length - 4} أخرى
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-700">المزايا الإضافية ({selectedFeatures.length}):</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedFeatures.slice(0, 3).map(featId => {
                      const feat = competitiveFeatures.find(f => f.id === featId);
                      return (
                        <span key={featId} className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-sm">
                          {feat?.name}
                        </span>
                      );
                    })}
                    {selectedFeatures.length > 3 && (
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm">
                        +{selectedFeatures.length - 3} أخرى
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={prevStep}
              className="bg-gray-200 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-300 transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-arrow-right-line ml-2"></i>
              السابق
            </button>

            <button
              onClick={nextStep}
              disabled={!spaceName.trim()}
              className={`px-6 py-3 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                spaceName.trim()
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              التالي: معلومات المؤسسة
              <i className="ri-arrow-left-line mr-2"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ... existing code for other steps remains the same ...

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <header className="bg-white/90 backdrop-blur-sm shadow-sm border-b border-indigo-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                <i className="ri-building-line text-white text-xl"></i>
              </div>
              <h1 className="text-xl font-bold text-gray-800">إعداد الفضاء التعليمي</h1>
            </Link>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>الخطوة 1 من 6</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12 max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">إنشاء فضائك التعليمي الافتراضي</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">اختر نوع المساحة والتصميم المناسب لاحتياجاتك التعليمية</p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">نوع الفضاء التعليمي</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(spaceTypes).map(([key, type]) => (
              <button
                key={key}
                onClick={() => setSelectedType(key)}
                className={`p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer text-right ${
                  selectedType === key
                    ? 'bg-gradient-to-br from-blue-500 to-cyan-600 text-white border-transparent shadow-xl transform scale-105'
                    : 'bg-white border-gray-200 text-gray-700 hover:border-indigo-300 hover:shadow-lg'
                }`}
              >
                <div className="flex flex-col items-center text-center mb-4">
                  <i className={`${type.icon} text-4xl mb-3 ${selectedType === key ? 'text-white' : 'text-indigo-600'}`}></i>
                  <h3 className="font-bold text-lg mb-2">{type.name}</h3>
                  <p className={`text-sm ${selectedType === key ? 'text-white/90' : 'text-gray-600'}`}>{type.description}</p>
                </div>
                <div className="space-y-2">
                  {type.features.slice(0, 3).map((feature, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <i className={`ri-check-line mr-2 ${selectedType === key ? 'text-white/80' : 'text-green-500'}`}></i>
                      <span className={selectedType === key ? 'text-white/90' : 'text-gray-600'}>{feature}</span>
                    </div>
                  ))}
                </div>
                <div className={`mt-4 pt-4 border-t ${selectedType === key ? 'border-white/20' : 'border-gray-200'}`}>
                  <div className="text-center">
                    <div className={`text-sm ${selectedType === key ? 'text-white/80' : 'text-gray-500'}`}>يبدأ من</div>
                    <div className={`text-2xl font-bold ${selectedType === key ? 'text-white' : 'text-indigo-600'}`}>${type.basePrice}</div>
                    <div className={`text-xs ${selectedType === key ? 'text-white/80' : 'text-gray-500'}`}>شهرياً</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-10">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">طابع التصميم</h2>
              <div className="grid grid-cols-2 gap-4">
                {styles.map(style => (
                  <button
                    key={style.id}
                    onClick={() => setSelectedStyle(style.id)}
                    className={`p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                      selectedStyle === style.id
                        ? 'bg-gradient-to-br from-gray-500 to-slate-600 text-white border-transparent shadow-lg transform scale-105'
                        : 'bg-white border-gray-200 text-gray-700 hover:border-indigo-300 hover:shadow-md'
                    }`}
                  >
                    <div className="flex flex-col items-center text-center">
                      <i className={`${style.icon} text-3xl mb-3`}></i>
                      <span className="font-bold text-lg">{style.name}</span>
                      <p className={`text-sm mt-1 ${selectedStyle === style.id ? 'text-white/90' : 'text-gray-600'}`}>{style.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">سعة المساحة</h2>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {capacities.map(capacity => (
                  <button
                    key={capacity.id}
                    onClick={() => setSelectedCapacity(capacity.id)}
                    className={`p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                      selectedCapacity === capacity.id
                        ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg transform scale-105'
                        : 'bg-white border-gray-200 text-gray-700 hover:border-indigo-300 hover:shadow-md'
                    }`}
                  >
                    <div className="text-center">
                      <div className={`text-2xl font-bold mb-1 ${selectedCapacity === capacity.id ? 'text-yellow-300' : 'text-blue-600'}`}>
                        {capacity.id}
                      </div>
                      <div className="text-sm font-medium">{capacity.name}</div>
                      <div className={`text-xs mt-1 ${selectedCapacity === capacity.id ? 'opacity-80' : 'opacity-80'}`}>{capacity.size}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="sticky top-8">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-indigo-200">
              <div className="p-6 bg-gradient-to-r from-blue-500 to-cyan-600 text-white">
                <h3 className="text-xl font-bold">معاينة الفضاء التعليمي</h3>
                <p className="text-white/90 mt-1">{currentType.name} - {styles.find(s => s.id === selectedStyle)?.name} - {selectedCapacity} شخص</p>
              </div>
              <div className="relative">
                <div
                  className="w-full h-80 bg-cover bg-center object-top"
                  style={{
                    backgroundImage: `url("https://readdy.ai/api/search-image?query=$%7BtypeKeywords%5BselectedType%20as%20keyof%20typeof%20typeKeywords%5D%7D%20with%20$%7BstyleKeywords%5BselectedStyle%20as%20keyof%20typeof%20styleKeywords%5D%7D%2C%20top-down%20architectural%20view%2C%203D%20rendered%20space%2C%20professional%20interior%20design&width=600&height=400&seq=${selectedType}${selectedStyle}&orientation=landscape")`
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
                    <div className="flex items-center space-x-2 text-sm">
                      <i className="ri-group-line text-gray-600"></i>
                      <span className="text-gray-800 font-medium">{selectedCapacity} شخص</span>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
                    <div className="flex items-center space-x-2 text-sm">
                      <i className={`${currentType.icon} text-gray-600`}></i>
                      <span className="text-gray-800 font-medium">{styles.find(s => s.id === selectedStyle)?.name}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 space-y-3">
                <h4 className="font-bold text-gray-800 mb-4">المميزات المضمنة:</h4>
                <div className="space-y-2">
                  {currentType.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <i className="ri-check-line text-green-500"></i>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <button
            onClick={nextStep}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg cursor-pointer whitespace-nowrap"
          >
            التالي: اختيار المكونات
            <i className="ri-arrow-left-line mr-3"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
