
'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Institution {
  id: string;
  name: string;
  type: string;
  location: string;
  establishedYear: number;
  totalUsers: number;
  activeUsers: number;
  totalSpaces: number;
  subscriptionPlan: string;
  monthlyRevenue: number;
  lastActivity: string;
  status: 'active' | 'suspended' | 'pending';
  managerInfo: {
    name: string;
    email: string;
    phone: string;
    lastLogin: string;
  };
  settings: {
    maxUsers: number;
    features: string[];
    customizations: string[];
    securityLevel: string;
  };
  statistics: {
    totalRevenue: number;
    growthRate: number;
    satisfactionScore: number;
    supportTickets: number;
  };
}

export default function OrganizationPage() {
  const [institutions, setInstitutions] = useState<Institution[]>([
    {
      id: '1',
      name: 'مدرسة النور الابتدائية',
      type: 'مدرسة',
      location: 'الرياض، السعودية',
      establishedYear: 2010,
      totalUsers: 245,
      activeUsers: 189,
      totalSpaces: 12,
      subscriptionPlan: 'مميز',
      monthlyRevenue: 1199,
      lastActivity: 'منذ ساعتين',
      status: 'active',
      managerInfo: {
        name: 'أحمد محمد السالم',
        email: 'ahmed@alnoor-school.edu.sa',
        phone: '+966501234567',
        lastLogin: 'منذ 3 ساعات'
      },
      settings: {
        maxUsers: 300,
        features: ['المكتبة الرقمية', 'نظام الحضور', 'التقييم الإلكتروني'],
        customizations: ['الشعار المخصص', 'الألوان المؤسسية', 'التقارير المتقدمة'],
        securityLevel: 'عالي'
      },
      statistics: {
        totalRevenue: 14388,
        growthRate: 15.2,
        satisfactionScore: 4.7,
        supportTickets: 2
      }
    },
    {
      id: '2',
      name: 'جامعة الملك سعود',
      type: 'جامعة',
      location: 'الرياض، السعودية',
      establishedYear: 1957,
      totalUsers: 1250,
      activeUsers: 892,
      totalSpaces: 45,
      subscriptionPlan: 'مؤسسي',
      monthlyRevenue: 4599,
      lastActivity: 'منذ دقائق',
      status: 'active',
      managerInfo: {
        name: 'د. سارة أحمد الخالد',
        email: 'sara.alkhalid@ksu.edu.sa',
        phone: '+966112345678',
        lastLogin: 'منذ ساعة'
      },
      settings: {
        maxUsers: 2000,
        features: ['نظام إدارة التعلم', 'المكتبة الرقمية', 'النشر العلمي', 'البحث المتقدم'],
        customizations: ['بوابة مخصصة', 'تطبيق الجوال', 'التكامل مع الأنظمة'],
        securityLevel: 'عالي جداً'
      },
      statistics: {
        totalRevenue: 55188,
        growthRate: 8.5,
        satisfactionScore: 4.9,
        supportTickets: 0
      }
    },
    {
      id: '3',
      name: 'مستشفى الملك فهد',
      type: 'مستشفى',
      location: 'جدة، السعودية',
      establishedYear: 1985,
      totalUsers: 650,
      activeUsers: 487,
      totalSpaces: 28,
      subscriptionPlan: 'طبي متخصص',
      monthlyRevenue: 2899,
      lastActivity: 'منذ 30 دقيقة',
      status: 'active',
      managerInfo: {
        name: 'د. محمد عبدالله القحطاني',
        email: 'mohammed.alqahtani@kfh.med.sa',
        phone: '+966126789012',
        lastLogin: 'منذ ساعتين'
      },
      settings: {
        maxUsers: 800,
        features: ['نظام إدارة المرضى', 'الملفات الطبية', 'جدولة المواعيد'],
        customizations: ['واجهة طبية', 'تقارير طبية', 'الأمان المتقدم'],
        securityLevel: 'عالي جداً'
      },
      statistics: {
        totalRevenue: 34788,
        growthRate: 12.3,
        satisfactionScore: 4.8,
        supportTickets: 1
      }
    }
  ]);

  const [selectedInstitution, setSelectedInstitution] = useState<Institution | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [showActionsModal, setShowActionsModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('');

  // إجراءات الأزرار الأساسية
  const handleViewDetails = (institution: Institution) => {
    setSelectedInstitution(institution);
    setShowDetailsModal(true);
  };

  const handleEdit = (institution: Institution) => {
    setSelectedInstitution(institution);
    setShowEditModal(true);
  };

  const handleSettings = (institution: Institution) => {
    setSelectedInstitution(institution);
    setShowSettingsModal(true);
  };

  const handleSuspend = (institution: Institution) => {
    setSelectedInstitution(institution);
    setShowSuspendModal(true);
  };

  // إجراءات إضافية
  const handleMoreActions = (institution: Institution) => {
    setSelectedInstitution(institution);
    setShowActionsModal(true);
  };

  const handleSendMessage = (institution: Institution) => {
    console.log(`إرسال رسالة إلى ${institution.name}`);
    alert(`تم إرسال رسالة إلى ${institution.name}`);
  };

  const handleExportData = (institution: Institution) => {
    console.log(`تصدير بيانات ${institution.name}`);
    alert(`جاري تصدير بيانات ${institution.name}`);
  };

  const handleResetPassword = (institution: Institution) => {
    if (confirm(`هل أنت متأكد من إعادة تعيين كلمة مرور المدير لـ ${institution.name}؟`)) {
      console.log(`إعادة تعيين كلمة المرور لـ ${institution.name}`);
      alert(`تم إرسال رابط إعادة تعيين كلمة المرور إلى ${institution.managerInfo.email}`);
    }
  };

  const handleUpgradeSubscription = (institution: Institution) => {
    console.log(`ترقية اشتراك ${institution.name}`);
    alert(`جاري معالجة طلب ترقية الاشتراك لـ ${institution.name}`);
  };

  const handleDeleteInstitution = (institution: Institution) => {
    if (confirm(`هل أنت متأكد من حذف ${institution.name}؟ هذا الإجراء لا يمكن التراجع عنه.`)) {
      if (confirm('يرجى كتابة "حذف" للتأكيد النهائي')) {
        setInstitutions(prev => prev.filter(inst => inst.id !== institution.id));
        alert(`تم حذف ${institution.name} بنجاح`);
        setShowActionsModal(false);
      }
    }
  };

  const confirmSuspension = () => {
    if (selectedInstitution) {
      const newStatus = selectedInstitution.status === 'active' ? 'suspended' : 'active';
      setInstitutions(prev => 
        prev.map(inst => 
          inst.id === selectedInstitution.id 
            ? { ...inst, status: newStatus }
            : inst
        )
      );
      alert(`تم ${newStatus === 'suspended' ? 'تعليق' : 'تفعيل'} ${selectedInstitution.name} بنجاح`);
      setShowSuspendModal(false);
    }
  };

  const saveEdit = () => {
    if (selectedInstitution) {
      setInstitutions(prev => 
        prev.map(inst => 
          inst.id === selectedInstitution.id 
            ? selectedInstitution
            : inst
        )
      );
      alert(`تم حفظ التعديلات لـ ${selectedInstitution.name} بنجاح`);
      setShowEditModal(false);
    }
  };

  const saveSettings = () => {
    if (selectedInstitution) {
      setInstitutions(prev => 
        prev.map(inst => 
          inst.id === selectedInstitution.id 
            ? selectedInstitution
            : inst
        )
      );
      alert(`تم حفظ الإعدادات لـ ${selectedInstitution.name} بنجاح`);
      setShowSettingsModal(false);
    }
  };

  const institutionTypes = [...new Set(institutions.map(inst => inst.type))];
  const filteredInstitutions = selectedFilter 
    ? institutions.filter(inst => inst.type === selectedFilter)
    : institutions;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <i className="ri-building-line text-white text-xl"></i>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">إدارة المؤسسات</h1>
                <p className="text-sm text-gray-600">إدارة ومراقبة جميع المؤسسات المسجلة</p>
              </div>
            </div>
            <Link href="/admin/platform" className="text-gray-600 hover:text-gray-800 cursor-pointer">
              العودة للوحة التحكم
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 pr-8"
              >
                <option value="">جميع أنواع المؤسسات</option>
                {institutionTypes.map(type => (
                  <option key={type} value={type}>
                    {type} ({institutions.filter(inst => inst.type === type).length})
                  </option>
                ))}
              </select>
            </div>
            <div className="flex space-x-2">
              {institutionTypes.slice(0, 4).map(type => (
                <button
                  key={type}
                  onClick={() => setSelectedFilter(selectedFilter === type ? '' : type)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    selectedFilter === type
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {institutionTypes.map(type => {
            const typeInstitutions = institutions.filter(inst => inst.type === type);
            const totalUsers = typeInstitutions.reduce((sum, inst) => sum + inst.totalUsers, 0);
            return (
              <div key={type} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-800">{type}</h3>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <i className={`${
                      type === 'مدرسة' ? 'ri-school-line' :
                      type === 'جامعة' ? 'ri-graduation-cap-line' :
                      type === 'مستشفى' ? 'ri-hospital-line' :
                      'ri-building-line'
                    } text-blue-600 text-xl`}></i>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-gray-800">{typeInstitutions.length}</div>
                  <div className="text-sm text-gray-600">{totalUsers} مستخدم نشط</div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(typeInstitutions.length / institutions.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Institutions Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المؤسسة</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">النوع</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الموقع</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المستخدمين</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الخطة</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الإيرادات</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الحالة</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">النشاط</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredInstitutions.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center">
                        <i className="ri-building-line text-4xl text-gray-400 mb-4"></i>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد مؤسسات</h3>
                        <p className="text-gray-500">
                          {selectedFilter ? `لا توجد مؤسسات من نوع "${selectedFilter}"` : 'لم يتم العثور على أي مؤسسات'}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredInstitutions.map((institution) => (
                    <tr key={institution.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                              <span className="text-white font-bold text-sm">
                                {institution.name.charAt(0)}
                              </span>
                            </div>
                          </div>
                          <div className="mr-4">
                            <div className="text-sm font-medium text-gray-900">{institution.name}</div>
                            <div className="text-sm text-gray-500">تأسست {institution.establishedYear}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {institution.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {institution.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center">
                          <div className="flex-1">
                            <div className="text-sm font-medium">{institution.activeUsers}/{institution.totalUsers}</div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                              <div 
                                className="bg-green-600 h-1.5 rounded-full"
                                style={{ width: `${(institution.activeUsers / institution.totalUsers) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {institution.subscriptionPlan}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${institution.monthlyRevenue}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          institution.status === 'active' ? 'bg-green-100 text-green-800' :
                          institution.status === 'suspended' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {institution.status === 'active' ? 'نشط' :
                           institution.status === 'suspended' ? 'معلق' : 'قيد المراجعة'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {institution.lastActivity}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleViewDetails(institution)}
                            className="text-blue-600 hover:text-blue-800 cursor-pointer"
                            title="عرض التفاصيل"
                          >
                            <i className="ri-eye-line"></i>
                          </button>
                          <button
                            onClick={() => handleEdit(institution)}
                            className="text-green-600 hover:text-green-800 cursor-pointer"
                            title="تعديل"
                          >
                            <i className="ri-edit-line"></i>
                          </button>
                          <button
                            onClick={() => handleSettings(institution)}
                            className="text-purple-600 hover:text-purple-800 cursor-pointer"
                            title="إعدادات"
                          >
                            <i className="ri-settings-line"></i>
                          </button>
                          <button
                            onClick={() => handleSuspend(institution)}
                            className="text-red-600 hover:text-red-800 cursor-pointer"
                            title={institution.status === 'active' ? 'تعليق' : 'تفعيل'}
                          >
                            <i className={institution.status === 'active' ? 'ri-pause-circle-line' : 'ri-play-circle-line'}></i>
                          </button>
                          <button
                            onClick={() => handleMoreActions(institution)}
                            className="text-gray-600 hover:text-gray-800 cursor-pointer"
                            title="المزيد من الإجراءات"
                          >
                            <i className="ri-more-2-line"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedInstitution && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">تفاصيل {selectedInstitution.name}</h2>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  <i className="ri-close-line text-gray-600"></i>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Basic Info */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-gray-800">المعلومات الأساسية</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-500">اسم المؤسسة</label>
                      <p className="text-gray-800 font-medium">{selectedInstitution.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">النوع</label>
                      <p className="text-gray-800">{selectedInstitution.type}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">الموقع</label>
                      <p className="text-gray-800">{selectedInstitution.location}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">سنة التأسيس</label>
                      <p className="text-gray-800">{selectedInstitution.establishedYear}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-gray-800">معلومات المدير</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-500">الاسم</label>
                      <p className="text-gray-800 font-medium">{selectedInstitution.managerInfo.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">البريد الإلكتروني</label>
                      <p className="text-gray-800">{selectedInstitution.managerInfo.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">رقم الهاتف</label>
                      <p className="text-gray-800">{selectedInstitution.managerInfo.phone}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">آخر تسجيل دخول</label>
                      <p className="text-gray-800">{selectedInstitution.managerInfo.lastLogin}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Statistics */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">الإحصائيات</h3>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{selectedInstitution.totalUsers}</div>
                    <div className="text-sm text-blue-800">إجمالي المستخدمين</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{selectedInstitution.activeUsers}</div>
                    <div className="text-sm text-green-800">المستخدمين النشطين</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{selectedInstitution.totalSpaces}</div>
                    <div className="text-sm text-purple-800">المساحات</div>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">${selectedInstitution.statistics.totalRevenue}</div>
                    <div className="text-sm text-orange-800">إجمالي الإيرادات</div>
                  </div>
                </div>
              </div>

              {/* Financial Info */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">المعلومات المالية</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">الخطة الحالية</label>
                    <p className="text-gray-800 font-medium">{selectedInstitution.subscriptionPlan}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">الإيرادات الشهرية</label>
                    <p className="text-gray-800 font-medium">${selectedInstitution.monthlyRevenue}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">معدل النمو</label>
                    <p className="text-green-600 font-medium">+{selectedInstitution.statistics.growthRate}%</p>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">الميزات المفعلة</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedInstitution.settings.features.map((feature, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors cursor-pointer whitespace-nowrap"
              >
                إغلاق
              </button>
              <button
                onClick={() => {
                  setShowDetailsModal(false);
                  handleEdit(selectedInstitution);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
              >
                تعديل
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedInstitution && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">تعديل {selectedInstitution.name}</h2>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  <i className="ri-close-line text-gray-600"></i>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">اسم المؤسسة</label>
                  <input
                    type="text"
                    value={selectedInstitution.name}
                    onChange={(e) => setSelectedInstitution({...selectedInstitution, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">النوع</label>
                  <select
                    value={selectedInstitution.type}
                    onChange={(e) => setSelectedInstitution({...selectedInstitution, type: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 pr-8"
                  >
                    <option value="مدرسة">مدرسة</option>
                    <option value="جامعة">جامعة</option>
                    <option value="مستشفى">مستشفى</option>
                    <option value="شركة">شركة</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الموقع</label>
                <input
                  type="text"
                  value={selectedInstitution.location}
                  onChange={(e) => setSelectedInstitution({...selectedInstitution, location: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">اسم المدير</label>
                  <input
                    type="text"
                    value={selectedInstitution.managerInfo.name}
                    onChange={(e) => setSelectedInstitution({
                      ...selectedInstitution,
                      managerInfo: {...selectedInstitution.managerInfo, name: e.target.value}
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
                  <input
                    type="email"
                    value={selectedInstitution.managerInfo.email}
                    onChange={(e) => setSelectedInstitution({
                      ...selectedInstitution,
                      managerInfo: {...selectedInstitution.managerInfo, email: e.target.value}
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">رقم الهاتف</label>
                <input
                  type="tel"
                  value={selectedInstitution.managerInfo.phone}
                  onChange={(e) => setSelectedInstitution({
                    ...selectedInstitution,
                    managerInfo: {...selectedInstitution.managerInfo, phone: e.target.value}
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors cursor-pointer whitespace-nowrap"
              >
                إلغاء
              </button>
              <button
                onClick={saveEdit}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer whitespace-nowrap"
              >
                حفظ التعديلات
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettingsModal && selectedInstitution && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">إعدادات {selectedInstitution.name}</h2>
                <button
                  onClick={() => setShowSettingsModal(false)}
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  <i className="ri-close-line text-gray-600"></i>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الحد الأقصى للمستخدمين</label>
                <input
                  type="number"
                  value={selectedInstitution.settings.maxUsers}
                  onChange={(e) => setSelectedInstitution({
                    ...selectedInstitution,
                    settings: {...selectedInstitution.settings, maxUsers: Number(e.target.value)}
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">مستوى الأمان</label>
                <select
                  value={selectedInstitution.settings.securityLevel}
                  onChange={(e) => setSelectedInstitution({
                    ...selectedInstitution,
                    settings: {...selectedInstitution.settings, securityLevel: e.target.value}
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 pr-8"
                >
                  <option value="منخفض">منخفض</option>
                  <option value="متوسط">متوسط</option>
                  <option value="عالي">عالي</option>
                  <option value="عالي جداً">عالي جداً</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">الميزات المفعلة</label>
                <div className="space-y-2">
                  {['المكتبة الرقمية', 'نظام الحضور', 'التقييم الإلكتروني', 'النشر العلمي', 'البحث المتقدم'].map(feature => (
                    <label key={feature} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedInstitution.settings.features.includes(feature)}
                        onChange={(e) => {
                          const features = e.target.checked
                            ? [...selectedInstitution.settings.features, feature]
                            : selectedInstitution.settings.features.filter(f => f !== feature);
                          setSelectedInstitution({
                            ...selectedInstitution,
                            settings: {...selectedInstitution.settings, features}
                          });
                        }}
                        className="w-4 h-4 text-blue-600 mr-2"
                      />
                      <span className="text-gray-700">{feature}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">التخصيصات</label>
                <div className="space-y-2">
                  {['الشعار المخصص', 'الألوان المؤسسية', 'التقارير المتقدمة', 'بوابة مخصصة'].map(customization => (
                    <label key={customization} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedInstitution.settings.customizations.includes(customization)}
                        onChange={(e) => {
                          const customizations = e.target.checked
                            ? [...selectedInstitution.settings.customizations, customization]
                            : selectedInstitution.settings.customizations.filter(c => c !== customization);
                          setSelectedInstitution({
                            ...selectedInstitution,
                            settings: {...selectedInstitution.settings, customizations}
                          });
                        }}
                        className="w-4 h-4 text-blue-600 mr-2"
                      />
                      <span className="text-gray-700">{customization}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowSettingsModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors cursor-pointer whitespace-nowrap"
              >
                إلغاء
              </button>
              <button
                onClick={saveSettings}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors cursor-pointer whitespace-nowrap"
              >
                حفظ الإعدادات
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Suspend Modal */}
      {showSuspendModal && selectedInstitution && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">
                {selectedInstitution.status === 'active' ? 'تعليق المؤسسة' : 'تفعيل المؤسسة'}
              </h2>
            </div>

            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  selectedInstitution.status === 'active' ? 'bg-red-100' : 'bg-green-100'
                }`}>
                  <i className={`${
                    selectedInstitution.status === 'active' ? 'ri-pause-circle-line text-red-600' : 'ri-play-circle-line text-green-600'
                  } text-xl`}></i>
                </div>
                <div className="mr-4">
                  <h3 className="font-bold text-gray-800">{selectedInstitution.name}</h3>
                  <p className="text-gray-600 text-sm">{selectedInstitution.type} - {selectedInstitution.location}</p>
                </div>
              </div>

              <div className={`p-4 rounded-lg ${
                selectedInstitution.status === 'active' ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'
              }`}>
                <p className={`text-sm ${selectedInstitution.status === 'active' ? 'text-red-800' : 'text-green-800'}`}>
                  {selectedInstitution.status === 'active' 
                    ? '⚠️ سيتم منع جميع المستخدمين من الوصول إلى النظام مؤقتاً. يمكن إعادة التفعيل في أي وقت.'
                    : '✅ سيتم إعادة تفعيل المؤسسة وتمكين جميع المستخدمين من الوصول للنظام.'
                  }
                </p>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowSuspendModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors cursor-pointer whitespace-nowrap"
              >
                إلغاء
              </button>
              <button
                onClick={confirmSuspension}
                className={`px-4 py-2 rounded-lg text-white transition-colors cursor-pointer whitespace-nowrap ${
                  selectedInstitution.status === 'active' 
                    ? 'bg-red-600 hover:bg-red-700' 
                    : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {selectedInstitution.status === 'active' ? 'تعليق المؤسسة' : 'تفعيل المؤسسة'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* More Actions Modal */}
      {showActionsModal && selectedInstitution && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">إجراءات إضافية</h2>
                <button
                  onClick={() => setShowActionsModal(false)}
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  <i className="ri-close-line text-gray-600"></i>
                </button>
              </div>
              <p className="text-gray-600 text-sm mt-2">{selectedInstitution.name}</p>
            </div>

            <div className="p-6 space-y-3">
              <button
                onClick={() => {
                  handleSendMessage(selectedInstitution);
                  setShowActionsModal(false);
                }}
                className="w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer text-right"
              >
                <div className="flex items-center">
                  <i className="ri-mail-send-line text-blue-600 text-xl"></i>
                  <div className="mr-3">
                    <div className="font-medium text-gray-800">إرسال رسالة</div>
                    <div className="text-sm text-gray-600">إرسال إشعار أو رسالة للمؤسسة</div>
                  </div>
                </div>
              </button>

              <button
                onClick={() => {
                  handleExportData(selectedInstitution);
                  setShowActionsModal(false);
                }}
                className="w-full p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors cursor-pointer text-right"
              >
                <div className="flex items-center">
                  <i className="ri-download-line text-green-600 text-xl"></i>
                  <div className="mr-3">
                    <div className="font-medium text-gray-800">تصدير البيانات</div>
                    <div className="text-sm text-gray-600">تحميل تقرير شامل عن المؤسسة</div>
                  </div>
                </div>
              </button>

              <button
                onClick={() => {
                  handleResetPassword(selectedInstitution);
                  setShowActionsModal(false);
                }}
                className="w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors cursor-pointer text-right"
              >
                <div className="flex items-center">
                  <i className="ri-lock-password-line text-orange-600 text-xl"></i>
                  <div className="mr-3">
                    <div className="font-medium text-gray-800">إعادة تعيين كلمة المرور</div>
                    <div className="text-sm text-gray-600">إرسال رابط إعادة التعيين للمدير</div>
                  </div>
                </div>
              </button>

              <button
                onClick={() => {
                  handleUpgradeSubscription(selectedInstitution);
                  setShowActionsModal(false);
                }}
                className="w-full p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors cursor-pointer text-right"
              >
                <div className="flex items-center">
                  <i className="ri-vip-crown-line text-purple-600 text-xl"></i>
                  <div className="mr-3">
                    <div className="font-medium text-gray-800">ترقية الاشتراك</div>
                    <div className="text-sm text-gray-600">ترقية تلقائية لخطة أعلى</div>
                  </div>
                </div>
              </button>

              <button
                onClick={() => handleDeleteInstitution(selectedInstitution)}
                className="w-full p-4 bg-red-50 hover:bg-red-100 rounded-lg transition-colors cursor-pointer text-right"
              >
                <div className="flex items-center">
                  <i className="ri-delete-bin-line text-red-600 text-xl"></i>
                  <div className="mr-3">
                    <div className="font-medium text-gray-800">حذف المؤسسة</div>
                    <div className="text-sm text-gray-600">حذف نهائي مع جميع البيانات</div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}