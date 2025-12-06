
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ProfilePage() {
  const [schoolData, setSchoolData] = useState({
    name: 'مدرسة الأمل الثانوية',
    type: 'مدرسة ثانوية',
    location: 'صنعاء، اليمن',
    foundedYear: 2010,
    address: 'صنعاء - اليمن',
    rating: 4.8,
    description: 'مدرسة ثانوية مطورة تقدم تعليم عالي الجودة باستخدام أحدث التقنيات التعليمية والبيئة التفاعلية، تهدف إلى إعداد جيل واع ومتميز قادر على مواجهة تحديات المستقبل وتطبيق فلسفة التعليم الحديث',
    curriculum: 'المنهج اليمني المعتمد مع أنشطة تطبيقية حديثة',
    logo: null,
    coverImage: null,
    statistics: {
      students: 450,
      teachers: 35,
      graduates: 1200,
      subjects: 15
    },
    contact: {
      phone: '+967-1-234567',
      email: 'info@alamal-school.edu.ye',
      website: 'alamal-school.edu.ye',
      fax: '+967-1-234568',
      socialMedia: {
        facebook: 'https://facebook.com/alamalschool',
        twitter: 'https://twitter.com/alamalschool',
        instagram: 'https://instagram.com/alamalschool',
        telegram: 'https://t.me/alamalschool'
      }
    },
    schedule: {
      morningShift: 'من 7:30 ص إلى 12:30 م',
      breakTime: 'من 9:45 ص إلى 10:00 ص',
      extraClasses: 'من 1:00 م إلى 4:00 م (حسب الحاجة)',
      activities: 'من 4:00 م إلى 6:00 م (لكل المشتركين)'
    },
    fees: {
      registration: 50000,
      annual: 150000,
      books: 25000,
      activities: 20000,
      insurance: 30000
    },
    programs: [
      {
        id: 1,
        name: 'حصة تقوية للصف التاسع',
        specialty: 'اللغة الإنجليزية',
        teacher: 'أ. فاطمة محمد',
        schedule: 'الأحد والثلاثاء 5:30 - 4:00م',
        duration: 'شهري',
        capacity: 15,
        fees: 25000
      },
      {
        id: 2,
        name: 'دورة إعداد للثانوية العامة',
        specialty: 'الرياضيات',
        teacher: 'م. أحمد سالم',
        schedule: 'السبت والاثنين 7:00 - 4:30م',
        duration: '6 أشهر',
        capacity: 20,
        fees: 30000
      },
      {
        id: 3,
        name: 'برنامج تقوية اللغة الإنجليزية',
        specialty: 'اللغة الإنجليزية',
        teacher: 'أ. سارة علي',
        schedule: 'الأحد والخميس 4:30 - 3:00م',
        duration: '4 أشهر',
        capacity: 12,
        fees: 28000
      },
      {
        id: 4,
        name: 'دورة العلوم التطبيقية',
        specialty: 'فيزياء وكيمياء',
        teacher: 'د. عبدالله حسن',
        schedule: 'السبت والاثنين 7:30 - 6:00م',
        duration: '5 أشهر',
        capacity: 18,
        fees: 35000
      }
    ]
  });

  const [staff, setStaff] = useState([
    {
      id: 1,
      name: 'أ. محمد العلي',
      position: 'مدير المدرسة',
      department: 'إدارة تعليمية',
      experience: 15,
      contact: 'مباشر',
      photo: null
    },
    {
      id: 2,
      name: 'أ. فاطمة محمد',
      position: 'رئيسة قسم اللغة الإنجليزية',
      department: 'أدب إنجليزي',
      experience: 12,
      contact: 'مباشر',
      photo: null
    },
    {
      id: 3,
      name: 'م. أحمد سالم',
      position: 'مدرس رياضيات',
      department: 'رياضيات تطبيقية',
      experience: 10,
      contact: 'مباشر',
      photo: null
    },
    {
      id: 4,
      name: 'أ. سارة علي',
      position: 'مدرسة لغة إنجليزية',
      department: 'لغة إنجليزية',
      experience: 8,
      contact: 'مباشر',
      photo: null
    },
    {
      id: 5,
      name: 'د. عبدالله حسن',
      position: 'مدرس علوم',
      department: 'فيزياء وكيمياء',
      experience: 14,
      contact: 'مباشر',
      photo: null
    },
    {
      id: 6,
      name: 'أ. مريم قاسم',
      position: 'مرشدة تربوية',
      department: 'علم النفس التربوي',
      experience: 9,
      contact: 'مباشر',
      photo: null
    }
  ]);

  const [features, setFeatures] = useState([
    'فصول ذكية تفاعلية',
    'مختبرات علمية متطورة',
    'مكتبة رقمية شاملة',
    'برامج لتطوير المهارات',
    'أنشطة رياضية وثقافية'
  ]);

  const [availableActivities, setAvailableActivities] = useState([
    'كرة القدم',
    'السباحة',
    'الرسم',
    'الموسيقى',
    'الروبوتات'
  ]);

  const [facilities, setFacilities] = useState([
    'مختبرات علمية متطورة',
    'مكتبة رقمية شاملة',
    'صالة رياضية',
    'قاعة مؤتمرات'
  ]);

  const [languages, setLanguages] = useState([
    'العربية (رئيسية)',
    'الإنجليزية',
    'الفرنسية (اختيارية)'
  ]);

  const [academicRequirements, setAcademicRequirements] = useState([
    'إنهاء الصف التاسع بمعدل لا يقل عن 75%',
    'اجتياز المقابلة الشخصية',
    'تقديم الشهادة الأصلية',
    'إجراء جلسة توجيهية مع المرشدة التربوية'
  ]);

  const [requiredDocuments, setRequiredDocuments] = useState([
    'شهادة الميلاد الأصل وصورة',
    'شهادة الصف التاسع الأصل وصورة',
    'صورة شخصية',
    'بطاقة هوية الأب أو ولي الأمر',
    'تقرير طبي'
  ]);

  const handleImageUpload = (type: 'logo' | 'cover', event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (type === 'logo') {
          setSchoolData(prev => ({ ...prev, logo: e.target?.result as string }));
        } else {
          setSchoolData(prev => ({ ...prev, coverImage: e.target?.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStaffPhotoUpload = (staffId: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setStaff(prev => prev.map(member => 
          member.id === staffId 
            ? { ...member, photo: e.target?.result as string }
            : member
        ));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProgram = () => {
    const newProgram = {
      id: schoolData.programs.length + 1,
      name: 'برنامج جديد',
      specialty: '',
      teacher: '',
      schedule: '',
      duration: '',
      capacity: 0,
      fees: 0
    };
    setSchoolData(prev => ({
      ...prev,
      programs: [...prev.programs, newProgram]
    }));
  };

  const handleRemoveProgram = (id: number) => {
    setSchoolData(prev => ({
      ...prev,
      programs: prev.programs.filter(program => program.id !== id)
    }));
  };

  const addStaffMember = () => {
    const newMember = {
      id: staff.length + 1,
      name: 'عضو هيئة تدريس جديد',
      position: '',
      department: '',
      experience: 0,
      contact: 'مباشر',
      photo: null
    };
    setStaff([...staff, newMember]);
  };

  const removeStaffMember = (id: number) => {
    setStaff(staff.filter(member => member.id !== id));
  };

  const addFeature = () => {
    setFeatures([...features, 'ميزة جديدة']);
  };

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const addActivity = () => {
    setAvailableActivities([...availableActivities, 'نشط جديد']);
  };

  const removeActivity = (index: number) => {
    setAvailableActivities(availableActivities.filter((_, i) => i !== index));
  };

  const addFacility = () => {
    setFacilities([...facilities, 'مرفق جديد']);
  };

  const removeFacility = (index: number) => {
    setFacilities(facilities.filter((_, i) => i !== index));
  };

  const addLanguage = () => {
    setLanguages([...languages, 'لغة جديدة']);
  };

  const removeLanguage = (index: number) => {
    setLanguages(languages.filter((_, i) => i !== index));
  };

  const addAcademicRequirement = () => {
    setAcademicRequirements([...academicRequirements, 'شرط جديد']);
  };

  const removeAcademicRequirement = (index: number) => {
    setAcademicRequirements(academicRequirements.filter((_, i) => i !== index));
  };

  const addRequiredDocument = () => {
    setRequiredDocuments([...requiredDocuments, 'وثيقة جديدة']);
  };

  const removeRequiredDocument = (index: number) => {
    setRequiredDocuments(requiredDocuments.filter((_, i) => i !== index));
  };

  const handleSaveAll = () => {
    console.log('حفظ جميع البيانات:', {
      schoolData,
      staff,
      features,
      availableActivities,
      facilities,
      languages,
      academicRequirements,
      requiredDocuments
    });
    
    // عرض رسالة تأكيد
    alert('تم حفظ جميع البيانات بنجاح! ستظهر التغييرات للزوار فوراً.');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
                <i className="ri-settings-line text-white text-xl"></i>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">لوحة تحكم المنشأة التعليمية</h1>
                <p className="text-gray-600 text-sm">تحكم كامل في بيانات مدرستك التي تظهر للزوار</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Link href="/dashboard" className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer whitespace-nowrap">
                العودة للوحة التحكم
              </Link>
              <button
                onClick={handleSaveAll}
                className="px-6 py-2 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap bg-green-600 text-white hover:bg-green-700"
              >
                <i className="ri-save-line mr-2"></i>
                حفظ جميع التغييرات
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* صور المدرسة - الأيقونة والشريط */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <i className="ri-image-line mr-3 text-purple-600"></i>
              صور المدرسة
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* أيقونة المدرسة */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-700">أيقونة المدرسة (الشعار)</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                  {schoolData.logo ? (
                    <div className="space-y-4">
                      <img 
                        src={schoolData.logo} 
                        alt="شعار المدرسة" 
                        className="w-32 h-32 object-cover rounded-xl mx-auto border-4 border-blue-200"
                      />
                      <button
                        onClick={() => setSchoolData(prev => ({ ...prev, logo: null }))}
                        className="text-red-600 hover:text-red-800 text-sm cursor-pointer"
                      >
                        <i className="ri-delete-bin-line mr-1"></i>
                        حذف الصورة
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="w-32 h-32 bg-gray-100 rounded-xl mx-auto flex items-center justify-center">
                        <i className="ri-image-add-line text-4xl text-gray-400"></i>
                      </div>
                      <div>
                        <p className="text-gray-600 mb-4">ارفع شعار المدرسة</p>
                        <label className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap">
                          <i className="ri-upload-line mr-2"></i>
                          اختيار صورة
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload('logo', e)}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-500">الحد الأقصى: 2 ميجابايت، الأبعاد المفضلة: 200x200 بكسل</p>
              </div>

              {/* صورة الشريط العلوي */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-700">صورة الشريط العلوي (الغلاف)</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                  {schoolData.coverImage ? (
                    <div className="space-y-4">
                      <img 
                        src={schoolData.coverImage} 
                        alt="صورة الغلاف" 
                        className="w-full h-32 object-cover rounded-xl border-4 border-green-200"
                      />
                      <button
                        onClick={() => setSchoolData(prev => ({ ...prev, coverImage: null }))}
                        className="text-red-600 hover:text-red-800 text-sm cursor-pointer"
                      >
                        <i className="ri-delete-bin-line mr-1"></i>
                        حذف الصورة
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="w-full h-32 bg-gray-100 rounded-xl flex items-center justify-center">
                        <i className="ri-landscape-line text-4xl text-gray-400"></i>
                      </div>
                      <div>
                        <p className="text-gray-600 mb-4">ارفع صورة الشريط العلوي</p>
                        <label className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors cursor-pointer whitespace-nowrap">
                          <i className="ri-upload-line mr-2"></i>
                          اختيار صورة
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload('cover', e)}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-500">الحد الأقصى: 5 ميجابايت، الأبعاد المفضلة: 1200x400 بكسل</p>
              </div>
            </div>
          </div>

          {/* البيانات الأساسية للمدرسة */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <i className="ri-school-line mr-3 text-blue-600"></i>
                البيانات الأساسية للمدرسة
              </h2>
              <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">معلومات عامة</div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">اسم المدرسة *</label>
                <input
                  type="text"
                  value={schoolData.name}
                  onChange={(e) => setSchoolData({...schoolData, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus-ring-2 focus:ring-blue-5 focus:border-transparent"
                  placeholder="اسم المدرسة"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">نوع المدرسة *</label>
                <select
                  value={schoolData.type}
                  onChange={(e) => setSchoolData({...schoolData, type: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus-ring-2 focus:ring-blue-5 focus:border-transparent pr-8"
                >
                  <option value="مدرسة ابتدائية">مدرسة ابتدائية</option>
                  <option value="مدرسة متوسطة">مدرسة متوسطة</option>
                  <option value="مدرسة ثانوية">مدرسة ثانوية</option>
                  <option value="مدرسة أساسية">مدرسة أساسية</option>
                  <option value="معهد تقني">معهد تقني</option>
                  <option value="جامعة">جامعة</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الموقع *</label>
                <input
                  type="text"
                  value={schoolData.location}
                  onChange={(e) => setSchoolData({...schoolData, location: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus-ring-2 focus:ring-blue-5 focus:border-transparent"
                  placeholder="المدينة، البلد"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">سنة التأسيس *</label>
                <input
                  type="number"
                  value={schoolData.foundedYear}
                  onChange={(e) => setSchoolData({...schoolData, foundedYear: Number(e.target.value)})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus-ring-2 focus:ring-blue-5 focus:border-transparent"
                  placeholder="2010"
                  min="1900"
                  max="2030"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">العنوان التفصيلي *</label>
                <input
                  type="text"
                  value={schoolData.address}
                  onChange={(e) => setSchoolData({...schoolData, address: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus-ring-2 focus:ring-blue-5 focus:border-transparent"
                  placeholder="العنوان الكامل"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">تقييم المدرسة</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    value={schoolData.rating}
                    onChange={(e) => setSchoolData({...schoolData, rating: Number(e.target.value)})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus-ring-2 focus:ring-blue-5 focus:border-transparent"
                    placeholder="4.8"
                    min="0"
                    max="5"
                    step="0.1"
                  />
                  <div className="text-yellow-500 text-2xl">
                    <i className="ri-star-fill"></i>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">نبذة تعريفية شاملة *</label>
                <textarea
                  value={schoolData.description}
                  onChange={(e) => setSchoolData({...schoolData, description: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus-ring-2 focus:ring-blue-5 focus:border-transparent"
                  placeholder="اكتب نبذة شاملة عن المدرسة وفلسفتها التعليمية..."
                />
              </div>
            </div>
          </div>

          {/* الإحصائيات */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <i className="ri-bar-chart-line mr-3 text-green-600"></i>
              إحصائيات المدرسة
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">عدد الطلاب</label>
                <input
                  type="number"
                  value={schoolData.statistics.students}
                  onChange={(e) => setSchoolData({
                    ...schoolData,
                    statistics: {...schoolData.statistics, students: parseInt(e.target.value) || 0}
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus-ring-2 focus:ring-blue-5 focus:border-transparent"
                  placeholder="450"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">عدد المعلمين</label>
                <input
                  type="number"
                  value={schoolData.statistics.teachers}
                  onChange={(e) => setSchoolData({
                    ...schoolData,
                    statistics: {...schoolData.statistics, teachers: parseInt(e.target.value) || 0}
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus-ring-2 focus:ring-blue-5 focus:border-transparent"
                  placeholder="35"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">عدد الخريجين</label>
                <input
                  type="number"
                  value={schoolData.statistics.graduates}
                  onChange={(e) => setSchoolData({
                    ...schoolData,
                    statistics: {...schoolData.statistics, graduates: parseInt(e.target.value) || 0}
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus-ring-2 focus:ring-blue-5 focus:border-transparent"
                  placeholder="1200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">عدد المواد</label>
                <input
                  type="number"
                  value={schoolData.statistics.subjects}
                  onChange={(e) => setSchoolData({
                    ...schoolData,
                    statistics: {...schoolData.statistics, subjects: parseInt(e.target.value) || 0}
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus-ring-2 focus:ring-blue-5 focus-border-transparent"
                  placeholder="15"
                />
              </div>
            </div>
          </div>

          {/* معلومات الاتصال */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <i className="ri-phone-line mr-3 text-purple-600"></i>
              معلومات الاتصال
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-gray-700">معلومات الاتصال الأساسية</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الهاتف الرئيسي *</label>
                  <input
                    type="tel"
                    value={schoolData.contact.phone}
                    onChange={(e) => setSchoolData({
                      ...schoolData,
                      contact: {...schoolData.contact, phone: e.target.value}
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus-ring-2 focus:ring-blue-5 focus-border-transparent"
                    placeholder="+967-1-234567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني *</label>
                  <input
                    type="email"
                    value={schoolData.contact.email}
                    onChange={(e) => setSchoolData({
                      ...schoolData,
                      contact: {...schoolData.contact, email: e.target.value}
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus-ring-2 focus:ring-blue-5 focus-border-transparent"
                    placeholder="info@school.edu.ye"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الموقع الإلكتروني</label>
                  <input
                    type="url"
                    value={schoolData.contact.website}
                    onChange={(e) => setSchoolData({
                      ...schoolData,
                      contact: {...schoolData.contact, website: e.target.value}
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus-ring-2 focus:ring-blue-5 focus-border-transparent"
                    placeholder="www.school.edu.ye"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الفاكس</label>
                  <input
                    type="tel"
                    value={schoolData.contact.fax || ''}
                    onChange={(e) => setSchoolData({
                      ...schoolData,
                      contact: {...schoolData.contact, fax: e.target.value}
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus-ring-2 focus:ring-blue-5 focus-border-transparent"
                    placeholder="+967-1-234568"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-lg font-bold text-gray-700">وسائل التواصل الاجتماعي</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">فيسبوك</label>
                  <input
                    type="url"
                    value={schoolData.contact.socialMedia.facebook}
                    onChange={(e) => setSchoolData({
                      ...schoolData,
                      contact: {
                        ...schoolData.contact,
                        socialMedia: {...schoolData.contact.socialMedia, facebook: e.target.value}
                      }
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus-ring-2 focus:ring-blue-5 focus-border-transparent"
                    placeholder="https://facebook.com/school"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">تويتر</label>
                  <input
                    type="url"
                    value={schoolData.contact.socialMedia.twitter}
                    onChange={(e) => setSchoolData({
                      ...schoolData,
                      contact: {
                        ...schoolData.contact,
                        socialMedia: {...schoolData.contact.socialMedia, twitter: e.target.value}
                      }
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus-ring-2 focus:ring-blue-5 focus-border-transparent"
                    placeholder="https://twitter.com/school"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">إنستغرام</label>
                  <input
                    type="url"
                    value={schoolData.contact.socialMedia.instagram}
                    onChange={(e) => setSchoolData({
                      ...schoolData,
                      contact: {
                        ...schoolData.contact,
                        socialMedia: {...schoolData.contact.socialMedia, instagram: e.target.value}
                      }
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus-ring-2 focus:ring-blue-5 focus-border-transparent"
                    placeholder="https://instagram.com/school"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">تيليجرام</label>
                  <input
                    type="url"
                    value={schoolData.contact.socialMedia.telegram}
                    onChange={(e) => setSchoolData({
                      ...schoolData,
                      contact: {
                        ...schoolData.contact,
                        socialMedia: {...schoolData.contact.socialMedia, telegram: e.target.value}
                      }
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus-ring-2 focus:ring-blue-5 focus-border-transparent"
                    placeholder="https://t.me/school"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* أوقات الدوام */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <i className="ri-calendar-line mr-3 text-orange-600"></i>
              أوقات الدوام
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الدوام الصباحي</label>
                <input
                  type="text"
                  value={schoolData.schedule.morningShift}
                  onChange={(e) => setSchoolData({
                    ...schoolData,
                    schedule: {...schoolData.schedule, morningShift: e.target.value}
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus-ring-2 focus:ring-blue-5 focus-border-transparent"
                  placeholder="من 7:30 ص إلى 12:30 م"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">وقت الاستراحة</label>
                <input
                  type="text"
                  value={schoolData.schedule.breakTime}
                  onChange={(e) => setSchoolData({
                    ...schoolData,
                    schedule: {...schoolData.schedule, breakTime: e.target.value}
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus-ring-2 focus:ring-blue-5 focus-border-transparent"
                  placeholder="من 9:45 ص إلى 10:00 ص"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الحصص الإضافية</label>
                <input
                  type="text"
                  value={schoolData.schedule.extraClasses}
                  onChange={(e) => setSchoolData({
                    ...schoolData,
                    schedule: {...schoolData.schedule, extraClasses: e.target.value}
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus-ring-2 focus:ring-blue-5 focus-border-transparent"
                  placeholder="من 1:00 م إلى 4:00 م (حسب الحاجة)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الأنشطة اللاصفية</label>
                <input
                  type="text"
                  value={schoolData.schedule.activities}
                  onChange={(e) => setSchoolData({
                    ...schoolData,
                    schedule: {...schoolData.schedule, activities: e.target.value}
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus-ring-2 focus:ring-blue-5 focus-border-transparent"
                  placeholder="من 4:00 م إلى 6:00 م (لكل المشتركين)"
                />
              </div>
            </div>
          </div>

          {/* البرامج والخدمات التعليمية */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <i className="ri-book-line mr-3 text-indigo-600"></i>
                البرامج والخدمات التعليمية
              </h2>
              <button
                onClick={handleAddProgram}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-add-line mr-2"></i>
                إضافة برنامج
              </button>
            </div>
            
            <div className="space-y-6">
              {schoolData.programs.map((program, index) => (
                <div key={program.id} className="border border-gray-200 rounded-xl p-6 bg-gray-50">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-800">برنامج #{index + 1}</h3>
                    <button
                      onClick={() => handleRemoveProgram(program.id)}
                      className="text-red-600 hover:text-red-800 cursor-pointer"
                    >
                      <i className="ri-delete-bin-line"></i>
                    </button>
                  </div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">اسم البرنامج</label>
                      <input
                        type="text"
                        value={program.name}
                        onChange={(e) => {
                          const updatedPrograms = schoolData.programs.map(p => 
                            p.id === program.id ? {...p, name: e.target.value} : p
                          );
                          setSchoolData({...schoolData, programs: updatedPrograms});
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus-ring-2 focus:ring-blue-5 focus-border-transparent text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">التخصص/المادة</label>
                      <input
                        type="text"
                        value={program.specialty}
                        onChange={(e) => {
                          const updatedPrograms = schoolData.programs.map(p => 
                            p.id === program.id ? {...p, specialty: e.target.value} : p
                          );
                          setSchoolData({...schoolData, programs: updatedPrograms});
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus-ring-2 focus:ring-blue-5 focus-border-transparent text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">المعلم المسؤول</label>
                      <input
                        type="text"
                        value={program.teacher}
                        onChange={(e) => {
                          const updatedPrograms = schoolData.programs.map(p => 
                            p.id === program.id ? {...p, teacher: e.target.value} : p
                          );
                          setSchoolData({...schoolData, programs: updatedPrograms});
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus-ring-2 focus:ring-blue-5 focus-border-transparent text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">مواعيد البرنامج</label>
                      <input
                        type="text"
                        value={program.schedule}
                        onChange={(e) => {
                          const updatedPrograms = schoolData.programs.map(p => 
                            p.id === program.id ? {...p, schedule: e.target.value} : p
                          );
                          setSchoolData({...schoolData, programs: updatedPrograms});
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus-ring-2 focus:ring-blue-5 focus-border-transparent text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">المدة</label>
                      <input
                        type="text"
                        value={program.duration}
                        onChange={(e) => {
                          const updatedPrograms = schoolData.programs.map(p => 
                            p.id === program.id ? {...p, duration: e.target.value} : p
                          );
                          setSchoolData({...schoolData, programs: updatedPrograms});
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus-ring-2 focus:ring-blue-5 focus-border-transparent text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">سعة البرنامج</label>
                      <input
                        type="number"
                        value={program.capacity}
                        onChange={(e) => {
                          const updatedPrograms = schoolData.programs.map(p => 
                            p.id === program.id ? {...p, capacity: parseInt(e.target.value) || 0} : p
                          );
                          setSchoolData({...schoolData, programs: updatedPrograms});
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus-ring-2 focus:ring-blue-5 focus-border-transparent text-sm"
                      />
                    </div>

                    <div className="md:col-span-2 lg:col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">الرسوم (ريال)</label>
                      <input
                        type="number"
                        value={program.fees}
                        onChange={(e) => {
                          const updatedPrograms = schoolData.programs.map(p => 
                            p.id === program.id ? {...p, fees: parseInt(e.target.value) || 0} : p
                          );
                          setSchoolData({...schoolData, programs: updatedPrograms});
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus-ring-2 focus:ring-blue-5 focus-border-transparent text-sm"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* كادر المدرسة */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <i className="ri-team-line mr-3 text-teal-600"></i>
                كادر المدرسة
              </h2>
              <button
                onClick={addStaffMember}
                className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-add-line mr-2"></i>
                إضافة عضو
              </button>
            </div>

            <div className="space-y-6">
              {staff.map((member, index) => (
                <div key={member.id} className="border border-gray-200 rounded-xl p-6 bg-gray-50">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-800">عضو #{index + 1}</h3>
                    <button
                      onClick={() => removeStaffMember(member.id)}
                      className="text-red-600 hover:text-red-800 cursor-pointer"
                    >
                      <i className="ri-delete-bin-line"></i>
                    </button>
                  </div>
                  
                  {/* صورة العضو */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">صورة العضو</label>
                    <div className="flex items-center space-x-4">
                      <div className="w-20 h-20 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
                        {member.photo ? (
                          <img 
                            src={member.photo} 
                            alt={member.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <i className="ri-user-line text-2xl text-gray-400"></i>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer text-sm whitespace-nowrap">
                          <i className="ri-camera-line mr-1"></i>
                          {member.photo ? 'تغيير الصورة' : 'إضافة صورة'}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleStaffPhotoUpload(member.id, e)}
                            className="hidden"
                          />
                        </label>
                        {member.photo && (
                          <button
                            onClick={() => setStaff(prev => prev.map(m => 
                              m.id === member.id ? { ...m, photo: null } : m
                            ))}
                            className="block text-red-600 hover:text-red-800 text-sm cursor-pointer"
                          >
                            <i className="ri-delete-bin-line mr-1"></i>
                            حذف الصورة
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">الاسم الكامل</label>
                      <input
                        type="text"
                        value={member.name}
                        onChange={(e) => {
                          const updatedStaff = staff.map(m => 
                            m.id === member.id ? { ...m, name: e.target.value } : m
                          );
                          setStaff(updatedStaff);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus-ring-2 focus:ring-blue-5 focus-border-transparent text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">المنصب/الوظيفة</label>
                      <input
                        type="text"
                        value={member.position}
                        onChange={(e) => {
                          const updatedStaff = staff.map(m => 
                            m.id === member.id ? { ...m, position: e.target.value } : m
                          );
                          setStaff(updatedStaff);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus-ring-2 focus:ring-blue-5 focus-border-transparent text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">التخصص/القسم</label>
                      <input
                        type="text"
                        value={member.department}
                        onChange={(e) => {
                          const updatedStaff = staff.map(m => 
                            m.id === member.id ? { ...m, department: e.target.value } : m
                          );
                          setStaff(updatedStaff);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus-ring-2 focus:ring-blue-5 focus-border-transparent text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">سنوات الخبرة</label>
                      <input
                        type="number"
                        value={member.experience}
                        onChange={(e) => {
                          const updatedStaff = staff.map(m => 
                            m.id === member.id ? { ...m, experience: Number(e.target.value) } : m
                          );
                          setStaff(updatedStaff);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus-ring-2 focus:ring-blue-5 focus-border-transparent text-sm"
                      />
                    </div>

                    <div className="md:col-span-2 lg:col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">وسيلة التواصل</label>
                      <select
                        value={member.contact}
                        onChange={(e) => {
                          const updatedStaff = staff.map(m => 
                            m.id === member.id ? { ...m, contact: e.target.value } : m
                          );
                          setStaff(updatedStaff);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus-ring-2 focus:ring-blue-5 focus-border-transparent text-sm pr-8"
                      >
                        <option value="مباشر">مباشر</option>
                        <option value="بريد إلكتروني">بريد إلكتروني</option>
                        <option value="هاتف">هاتف</option>
                        <option value="واتساب">واتساب</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* الرسوم والتكاليف */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <i className="ri-money-dollar-circle-line mr-3 text-yellow-600"></i>
              الرسوم والتكاليف
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">رسوم التسجيل (ريال)</label>
                <input
                  type="number"
                  value={schoolData.fees.registration}
                  onChange={(e) => setSchoolData({
                    ...schoolData,
                    fees: {...schoolData.fees, registration: parseInt(e.target.value) || 0}
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus-ring-2 focus:ring-blue-5 focus-border-transparent"
                  placeholder="50000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الرسوم الدراسية السنوية (ريال)</label>
                <input
                  type="number"
                  value={schoolData.fees.annual}
                  onChange={(e) => setSchoolData({
                    ...schoolData,
                    fees: {...schoolData.fees, annual: parseInt(e.target.value) || 0}
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus-ring-2 focus:ring-blue-5 focus-border-transparent"
                  placeholder="150000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">رسوم الكتب والمواد (ريال)</label>
                <input
                  type="number"
                  value={schoolData.fees.books}
                  onChange={(e) => setSchoolData({
                    ...schoolData,
                    fees: {...schoolData.fees, books: parseInt(e.target.value) || 0}
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus-ring-2 focus:ring-blue-5 focus-border-transparent"
                  placeholder="25000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">رسوم الأنشطة (ريال)</label>
                <input
                  type="number"
                  value={schoolData.fees.activities}
                  onChange={(e) => setSchoolData({
                    ...schoolData,
                    fees: {...schoolData.fees, activities: parseInt(e.target.value) || 0}
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus-ring-2 focus:ring-blue-5 focus-border-transparent"
                  placeholder="20000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">التأمين القابل للاسترداد (ريال)</label>
                <input
                  type="number"
                  value={schoolData.fees.insurance}
                  onChange={(e) => setSchoolData({
                    ...schoolData,
                    fees: {...schoolData.fees, insurance: parseInt(e.target.value) || 0}
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus-ring-2 focus:ring-blue-5 focus-border-transparent"
                  placeholder="30000"
                />
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 flex flex-col justify-center">
                <h3 className="text-sm font-medium text-gray-700 mb-2">إجمالي التكاليف السنوية</h3>
                <div className="text-2xl font-bold text-indigo-700">
                  {(schoolData.fees.registration + schoolData.fees.annual + schoolData.fees.books + schoolData.fees.activities + schoolData.fees.insurance).toLocaleString()} ريال
                </div>
              </div>
            </div>
          </div>

          {/* المميزات والخدمات */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <i className="ri-star-line mr-3 text-pink-600"></i>
                المميزات والخدمات
              </h2>
              <button
                onClick={addFeature}
                className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-add-line mr-2"></i>
                إضافة ميزة
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3 bg-gray-50 rounded-lg p-4">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => {
                      const updatedFeatures = features.map((f, i) => 
                        i === index ? e.target.value : f
                      );
                      setFeatures(updatedFeatures);
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus-ring-2 focus:ring-blue-5 focus-border-transparent text-sm"
                  />
                  <button
                    onClick={() => removeFeature(index)}
                    className="text-red-600 hover:text-red-800 cursor-pointer"
                  >
                    <i className="ri-delete-bin-line"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* الأنشطة والمرافق */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <i className="ri-building-line mr-3 text-cyan-600"></i>
              الأنشطة والمرافق
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-700">الأنشطة المتاحة</h3>
                  <button
                    onClick={addActivity}
                    className="bg-cyan-600 text-white px-3 py-1 rounded-lg hover:bg-cyan-700 transition-colors cursor-pointer text-sm whitespace-nowrap"
                  >
                    <i className="ri-add-line mr-1"></i>
                    إضافة
                  </button>
                </div>
                <div className="space-y-3">
                  {availableActivities.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3 bg-gray-50 rounded-lg p-3">
                      <input
                        type="text"
                        value={activity}
                        onChange={(e) => {
                          const updatedActivities = availableActivities.map((a, i) => 
                            i === index ? e.target.value : a
                          );
                          setAvailableActivities(updatedActivities);
                        }}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus-ring-2 focus:ring-blue-5 focus-border-transparent text-sm"
                      />
                      <button
                        onClick={() => removeActivity(index)}
                        className="text-red-600 hover:text-red-800 cursor-pointer"
                      >
                        <i className="ri-delete-bin-line text-sm"></i>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-700">المرافق المتاحة</h3>
                  <button
                    onClick={addFacility}
                    className="bg-cyan-600 text-white px-3 py-1 rounded-lg hover:bg-cyan-700 transition-colors cursor-pointer text-sm whitespace-nowrap"
                  >
                    <i className="ri-add-line mr-1"></i>
                    إضافة
                  </button>
                </div>
                <div className="space-y-3">
                  {facilities.map((facility, index) => (
                    <div key={index} className="flex items-center space-x-3 bg-gray-50 rounded-lg p-3">
                      <input
                        type="text"
                        value={facility}
                        onChange={(e) => {
                          const updatedFacilities = facilities.map((f, i) => 
                            i === index ? e.target.value : f
                          );
                          setFacilities(updatedFacilities);
                        }}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus-ring-2 focus:ring-blue-5 focus-border-transparent text-sm"
                      />
                      <button
                        onClick={() => removeFacility(index)}
                        className="text-red-600 hover:text-red-800 cursor-pointer"
                      >
                        <i className="ri-delete-bin-line text-sm"></i>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">المناهج المعتمدة</label>
              <textarea
                value={schoolData.curriculum}
                onChange={(e) => setSchoolData({
                  ...schoolData,
                  curriculum: e.target.value
                })}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus-ring-2 focus:ring-blue-5 focus-border-transparent"
                placeholder="وصف المناهج المعتمدة..."
              />
            </div>
          </div>

          {/* معلومات إضافية */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <i className="ri-information-line mr-3 text-red-600"></i>
              معلومات إضافية مهمة
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">اللغات المعتمدة</label>
                <div className="space-y-2">
                  {languages.map((language, index) => (
                    <div key={index} className="flex items-center space-x-3 bg-gray-50 rounded-lg p-3">
                      <input
                        type="text"
                        value={language}
                        onChange={(e) => {
                          const updatedLanguages = languages.map((l, i) => 
                            i === index ? e.target.value : l
                          );
                          setLanguages(updatedLanguages);
                        }}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus-ring-2 focus:ring-blue-5 focus-border-transparent text-sm"
                      />
                      <button
                        onClick={() => {
                          const updatedLanguages = languages.filter((_, i) => i !== index);
                          setLanguages(updatedLanguages);
                        }}
                        className="text-red-600 hover:text-red-800 cursor-pointer"
                      >
                        <i className="ri-delete-bin-line text-sm"></i>
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      setLanguages([...languages, 'لغة جديدة']);
                    }}
                    className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    <i className="ri-add-line mr-2"></i>
                    إضافة لغة
                  </button>
                </div>
              </div>

              {/* شروط القبول */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الشروط الأكاديمية</label>
                  <div className="space-y-2">
                    {academicRequirements.map((requirement, index) => (
                      <div key={index} className="flex items-center space-x-3 bg-gray-50 rounded-lg p-3">
                        <input
                          type="text"
                          value={requirement}
                          onChange={(e) => {
                            const updatedRequirements = academicRequirements.map((r, i) => 
                              i === index ? e.target.value : r
                            );
                            setAcademicRequirements(updatedRequirements);
                          }}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus-ring-2 focus:ring-blue-5 focus-border-transparent text-sm"
                        />
                        <button
                          onClick={() => {
                            const updatedRequirements = academicRequirements.filter((_, i) => i !== index);
                            setAcademicRequirements(updatedRequirements);
                          }}
                          className="text-red-600 hover:text-red-800 cursor-pointer"
                        >
                          <i className="ri-delete-bin-line text-sm"></i>
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        setAcademicRequirements([...academicRequirements, 'شرط جديد']);
                      }}
                      className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors cursor-pointer text-sm"
                    >
                      <i className="ri-add-line mr-2"></i>
                      إضافة شرط
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الوثائق المطلوبة</label>
                  <div className="space-y-2">
                    {requiredDocuments.map((document, index) => (
                      <div key={index} className="flex items-center space-x-3 bg-gray-50 rounded-lg p-3">
                        <input
                          type="text"
                          value={document}
                          onChange={(e) => {
                            const updatedDocuments = requiredDocuments.map((d, i) => 
                              i === index ? e.target.value : d
                            );
                            setRequiredDocuments(updatedDocuments);
                          }}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus-ring-2 focus:ring-blue-5 focus-border-transparent text-sm"
                        />
                        <button
                          onClick={() => {
                            const updatedDocuments = requiredDocuments.filter((_, i) => i !== index);
                            setRequiredDocuments(updatedDocuments);
                          }}
                          className="text-red-600 hover:text-red-800 cursor-pointer"
                        >
                          <i className="ri-delete-bin-line text-sm"></i>
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        setRequiredDocuments([...requiredDocuments, 'وثيقة جديدة']);
                      }}
                      className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors cursor-pointer text-sm"
                    >
                      <i className="ri-add-line mr-2"></i>
                      إضافة وثيقة
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* زر الحفظ النهائي */}
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-xl font-bold text-gray-800 mb-4">هل أنت مستعد لحفظ التغييرات؟</h3>
              <p className="text-gray-600 mb-6">
                سيتم حفظ جميع البيانات التي قمت بإدخالها وستظهر فوراً للزوار في الموقع التعريفي للمدرسة. 
                تأكد من مراجعة جميع المعلومات قبل الحفظ.
              </p>
              
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleSaveAll}
                  className="px-12 py-4 rounded-xl font-bold text-lg transition-all duration-300 cursor-pointer whitespace-nowrap bg-gradient-to-r from-green-600 to-blue-600 text-white hover:from-green-700 hover:to-blue-700 hover:shadow-xl"
                >
                  <i className="ri-save-line mr-3"></i>
                  حفظ ونشر جميع البيانات
                </button>

                <Link
                  href="/dashboard"
                  className="px-8 py-4 bg-gray-500 text-white rounded-xl font-bold hover:bg-gray-600 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-arrow-right-line mr-2"></i>
                  العودة بدون حفظ
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
