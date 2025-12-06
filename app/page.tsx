'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <i className="ri-building-line text-white text-xl"></i>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                المساحات الافتراضية
              </h1>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/dashboard" className="text-gray-600 hover:text-blue-600 transition-colors cursor-pointer">
                لوحة التحكم
              </Link>
              <Link href="/spaces" className="text-gray-600 hover:text-blue-600 transition-colors cursor-pointer">
                المساحات
              </Link>
              <Link href="/profile" className="text-gray-600 hover:text-blue-600 transition-colors cursor-pointer">
                الملف الشخصي
              </Link>
              <Link href="/login" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap">
                تسجيل الدخول
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        className="relative py-20 px-6"
        style={{
          backgroundImage: `url('https://readdy.ai/api/search-image?query=Modern%20virtual%20reality%20workspace%20with%20digital%20environment%2C%20futuristic%20office%20spaces%2C%20holographic%20displays%2C%20clean%20minimalist%20design%2C%20soft%20blue%20lighting%2C%20people%20collaborating%20in%20virtual%20space%2C%20high-tech%20atmosphere%2C%20professional%20setting%2C%203D%20rendered%20virtual%20world&width=1200&height=600&seq=hero1&orientation=landscape')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-indigo-900/60"></div>
        <div className="relative container mx-auto text-center text-white max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            مرحباً بك في عالم
            <span className="block text-yellow-300">المساحات الافتراضية</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed">
            تجربة غنية ومتكاملة للتعلم والعمل في بيئات افتراضية تحاكي الواقع
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="bg-yellow-500 text-blue-900 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-yellow-400 transition-all transform hover:scale-105 cursor-pointer whitespace-nowrap">
              ابدأ الآن مجاناً
            </Link>
            <Link href="/demo" className="border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white hover:text-blue-900 transition-all cursor-pointer whitespace-nowrap">
              شاهد العرض التوضيحي
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">ميزات المنصة</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              منصة شاملة مصممة لتلبية احتياجات المدارس والجامعات والمكاتب
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-100">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <i className="ri-user-settings-line text-blue-600 text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">إدارة المستخدمين</h3>
              <p className="text-gray-600 leading-relaxed">
                تسجيل مرن عبر البريد الإلكتروني أو SSO، تخصيص كامل للملف الشخصي، مصادقة ثنائية، وإدارة الأدوار والصلاحيات
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-100">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                <i className="ri-map-2-line text-green-600 text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">التنقل الافتراضي</h3>
              <p className="text-gray-600 leading-relaxed">
                خريطة تفاعلية، تنقل حر بين الغرف، صوت مكاني، وإنشاء غرف مخصصة بديكورات ووظائف محددة
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-100">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                <i className="ri-chat-3-line text-purple-600 text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">التواصل والتعاون</h3>
              <p className="text-gray-600 leading-relaxed">
                دردشة عامة وخاصة، مشاركة الشاشة، سبورة ذكية، رفع الملفات، وربط أدوات خارجية مثل Google Docs
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-100">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6">
                <i className="ri-task-line text-orange-600 text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">إدارة المهام</h3>
              <p className="text-gray-600 leading-relaxed">
                إنشاء وتعيين المهام، تسليم الملفات، تقييم وملاحظات، ولوحة تتبع حالة الأنشطة
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-100">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mb-6">
                <i className="ri-calendar-event-line text-red-600 text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">إدارة الفعاليات</h3>
              <p className="text-gray-600 leading-relaxed">
                تنظيم الحصص والمؤتمرات، جدولة الفعاليات، دعوة المشاركين، وحجز مسبق للغرف الافتراضية
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-100">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6">
                <i className="ri-shield-check-line text-indigo-600 text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">الأمان والحماية</h3>
              <p className="text-gray-600 leading-relaxed">
                تشفير البيانات، نسخ احتياطية، حماية الخصوصية، وضوابط أمان متقدمة لحماية جميع المعلومات
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="container mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-12">أرقام تتحدث عن نفسها</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
              <div className="text-4xl font-bold text-yellow-300 mb-2">10,000+</div>
              <div className="text-blue-100">مستخدم نشط</div>
            </div>
            <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
              <div className="text-4xl font-bold text-yellow-300 mb-2">500+</div>
              <div className="text-blue-100">مؤسسة تعليمية</div>
            </div>
            <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
              <div className="text-4xl font-bold text-yellow-300 mb-2">50,000+</div>
              <div className="text-blue-100">جلسة افتراضية</div>
            </div>
            <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
              <div className="text-4xl font-bold text-yellow-300 mb-2">98%</div>
              <div className="text-blue-100">رضا المستخدمين</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            جاهز لتجربة المستقبل؟
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            انضم إلى آلاف المؤسسات التي تستخدم منصتنا لتحسين تجربة التعلم والعمل
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 cursor-pointer whitespace-nowrap">
              ابدأ مجاناً الآن
            </Link>
            <Link href="/contact" className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-600 hover:text-white transition-all cursor-pointer whitespace-nowrap">
              تواصل معنا
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <i className="ri-building-line text-white"></i>
                </div>
                <h3 className="text-xl font-bold">المساحات الافتراضية</h3>
              </div>
              <p className="text-gray-400 leading-relaxed">
                منصة رائدة في مجال التعليم والعمل الافتراضي
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">المنتج</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/features" className="hover:text-white transition-colors cursor-pointer">الميزات</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors cursor-pointer">الأسعار</Link></li>
                <li><Link href="/demo" className="hover:text-white transition-colors cursor-pointer">العرض التوضيحي</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">الدعم</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-white transition-colors cursor-pointer">مركز المساعدة</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors cursor-pointer">تواصل معنا</Link></li>
                <li><Link href="/tutorials" className="hover:text-white transition-colors cursor-pointer">الدروس التعليمية</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">الشركة</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors cursor-pointer">من نحن</Link></li>
                <li><Link href="/careers" className="hover:text-white transition-colors cursor-pointer">الوظائف</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors cursor-pointer">سياسة الخصوصية</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 المساحات الافتراضية. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}