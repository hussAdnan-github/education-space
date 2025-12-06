
'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Student {
  id: number;
  name: string;
  email: string;
  grade: string;
  status: 'active' | 'inactive' | 'suspended';
  enrollmentDate: string;
  parentPhone: string;
  lastActivity: string;
  totalPoints: number;
  completedAssignments: number;
  totalAssignments: number;
}

interface Teacher {
  id: number;
  name: string;
  email: string;
  subject: string;
  phone: string;
  hireDate: string;
  status: 'active' | 'inactive' | 'on_leave';
  studentsCount: number;
  classesCount: number;
  rating: number;
  salary: number;
}

interface SchoolStats {
  totalStudents: number;
  totalTeachers: number;
  totalClasses: number;
  monthlyRevenue: number;
  activeSpaces: number;
  pendingApplications: number;
  completionRate: number;
  satisfactionRate: number;
}

interface FinancialRecord {
  id: number;
  type: 'tuition' | 'fee' | 'expense' | 'salary';
  description: string;
  amount: number;
  date: string;
  status: 'paid' | 'pending' | 'overdue';
  category: string;
}

export default function SchoolOwnerDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [showAddTeacherModal, setShowAddTeacherModal] = useState(false);
  const [showFinancialModal, setShowFinancialModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showStudentProfileModal, setShowStudentProfileModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const [schoolStats] = useState<SchoolStats>({
    totalStudents: 245,
    totalTeachers: 18,
    totalClasses: 12,
    monthlyRevenue: 125000,
    activeSpaces: 8,
    pendingApplications: 7,
    completionRate: 87,
    satisfactionRate: 94
  });

  const [students, setStudents] = useState<Student[]>([
    {
      id: 1,
      name: 'أحمد محمد السعيد',
      email: 'ahmed@example.com',
      grade: 'الصف الثامن',
      status: 'active',
      enrollmentDate: '2023-09-01',
      parentPhone: '+966-50-123-4567',
      lastActivity: '2024-01-20 14:30',
      totalPoints: 850,
      completedAssignments: 45,
      totalAssignments: 50
    },
    {
      id: 2,
      name: 'فاطمة علي الخالد',
      email: 'fatima@example.com',
      grade: 'الصف التاسع',
      status: 'active',
      enrollmentDate: '2023-09-01',
      parentPhone: '+966-55-987-6543',
      lastActivity: '2024-01-20 16:15',
      totalPoints: 920,
      completedAssignments: 48,
      totalAssignments: 50
    },
    {
      id: 3,
      name: 'محمد حسن العتيبي',
      email: 'mohammed@example.com',
      grade: 'الصف السابع',
      status: 'inactive',
      enrollmentDate: '2023-09-15',
      parentPhone: '+966-56-111-2222',
      lastActivity: '2024-01-18 10:20',
      totalPoints: 650,
      completedAssignments: 32,
      totalAssignments: 50
    }
  ]);

  const [teachers, setTeachers] = useState<Teacher[]>([
    {
      id: 1,
      name: 'د. عبدالله أحمد',
      email: 'abdullah@school.com',
      subject: 'الرياضيات',
      phone: '+966-50-111-1111',
      hireDate: '2020-09-01',
      status: 'active',
      studentsCount: 65,
      classesCount: 4,
      rating: 4.8,
      salary: 8000
    },
    {
      id: 2,
      name: 'أ. سارة محمد',
      email: 'sara@school.com',
      subject: 'اللغة العربية',
      phone: '+966-55-222-2222',
      hireDate: '2021-01-15',
      status: 'active',
      studentsCount: 72,
      classesCount: 5,
      rating: 4.9,
      salary: 7500
    },
    {
      id: 3,
      name: 'أ. خالد العمري',
      email: 'khalid@school.com',
      subject: 'العلوم',
      phone: '+966-56-333-3333',
      hireDate: '2019-08-20',
      status: 'on_leave',
      studentsCount: 58,
      classesCount: 3,
      rating: 4.6,
      salary: 7800
    }
  ]);

  const [financialRecords] = useState<FinancialRecord[]>([
    {
      id: 1,
      type: 'tuition',
      description: 'رسوم دراسية - يناير 2024',
      amount: 85000,
      date: '2024-01-01',
      status: 'paid',
      category: 'إيرادات'
    },
    {
      id: 2,
      type: 'salary',
      description: 'راتب المعلمين - يناير',
      amount: -45000,
      date: '2024-01-01',
      status: 'paid',
      category: 'مصروفات'
    },
    {
      id: 3,
      type: 'expense',
      description: 'فواتير الكهرباء والماء',
      amount: -3500,
      date: '2024-01-15',
      status: 'paid',
      category: 'مصروفات'
    },
    {
      id: 4,
      type: 'fee',
      description: 'رسوم النشاطات الإضافية',
      amount: 12000,
      date: '2024-01-10',
      status: 'pending',
      category: 'إيرادات'
    }
  ]);

  const [schoolSettings, setSchoolSettings] = useState({
    schoolName: 'مدرسة الفيصلية الأهلية',
    schoolEmail: 'info@faisaliah.edu.sa',
    schoolPhone: '+966-12-6543210',
    schoolAddress: 'جدة، حي الفيصلية، المملكة العربية السعودية',
    academicYear: '2023-2024',
    maxStudentsPerClass: 25,
    tuitionFee: 3500,
    registrationFee: 500,
    allowOnlinePayments: true,
    sendEmailNotifications: true,
    parentPortalEnabled: true,
    autoBackup: true
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      case 'on_leave': return 'bg-yellow-100 text-yellow-800';
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'SAR'
    }).format(Math.abs(amount));
  };

  const handleAddStudent = () => {
    console.log('إضافة طالب جديد');
    setShowAddStudentModal(false);
  };

  const handleAddTeacher = () => {
    console.log('إضافة معلم جديد');
    setShowAddTeacherModal(false);
  };

  const handleViewStudentProfile = (student: Student) => {
    setSelectedStudent(student);
    setShowStudentProfileModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg flex items-center justify-center">
                <i className="ri-school-line text-white text-xl"></i>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">لوحة تحكم مالك المدرسة</h1>
                <p className="text-sm text-gray-600">{schoolSettings.schoolName}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-green-50 px-4 py-2 rounded-lg">
                <span className="text-sm text-green-800 font-medium">
                  {schoolStats.totalStudents} طالب مسجل
                </span>
              </div>
              <Link href="/dashboard" className="text-gray-600 hover:text-gray-800 cursor-pointer">
                العودة
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Quick Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">إجمالي الطلاب</p>
                <p className="text-2xl font-bold text-blue-600">{schoolStats.totalStudents}</p>
                <p className="text-xs text-green-600 mt-1">+5% عن الشهر الماضي</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <i className="ri-group-line text-blue-600 text-xl"></i>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">المعلمون</p>
                <p className="text-2xl font-bold text-green-600">{schoolStats.totalTeachers}</p>
                <p className="text-xs text-green-600 mt-1">جميعهم نشطون</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <i className="ri-user-star-line text-green-600 text-xl"></i>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">الإيرادات الشهرية</p>
                <p className="text-2xl font-bold text-purple-600">{formatCurrency(schoolStats.monthlyRevenue)}</p>
                <p className="text-xs text-green-600 mt-1">+12% عن الشهر الماضي</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <i className="ri-money-dollar-circle-line text-purple-600 text-xl"></i>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">معدل الرضا</p>
                <p className="text-2xl font-bold text-orange-600">{schoolStats.satisfactionRate}%</p>
                <p className="text-xs text-green-600 mt-1">ممتاز</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <i className="ri-star-line text-orange-600 text-xl"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h3 className="text-lg font-bold text-gray-800 mb-4">الإجراءات السريعة</h3>
          <div className="grid md:grid-cols-4 gap-4">
            <button
              onClick={() => setShowAddStudentModal(true)}
              className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg hover:from-blue-100 hover:to-blue-200 transition-all cursor-pointer"
            >
              <i className="ri-user-add-line text-blue-600 text-2xl mb-2 block"></i>
              <span className="text-blue-800 font-medium">إضافة طالب</span>
            </button>
            
            <button
              onClick={() => setShowAddTeacherModal(true)}
              className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg hover:from-green-100 hover:to-green-200 transition-all cursor-pointer"
            >
              <i className="ri-user-star-line text-green-600 text-2xl mb-2 block"></i>
              <span className="text-green-800 font-medium">إضافة معلم</span>
            </button>
            
            <Link
              href="/admin/create-assignment"
              className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg hover:from-purple-100 hover:to-purple-200 transition-all cursor-pointer block text-center"
            >
              <i className="ri-file-add-line text-purple-600 text-2xl mb-2 block"></i>
              <span className="text-purple-800 font-medium">إنشاء واجب</span>
            </Link>
            
            <button
              onClick={() => setShowFinancialModal(true)}
              className="p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg hover:from-orange-100 hover:to-orange-200 transition-all cursor-pointer"
            >
              <i className="ri-bar-chart-line text-orange-600 text-2xl mb-2 block"></i>
              <span className="text-orange-800 font-medium">التقارير المالية</span>
            </button>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h3 className="text-lg font-bold text-gray-800 mb-4">الوصول السريع</h3>
          <div className="grid md:grid-cols-4 lg:grid-cols-8 gap-3">
            <Link href="/communication" 
              className="p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg hover:from-blue-100 hover:to-blue-200 transition-all cursor-pointer text-center">
              <i className="ri-chat-3-line text-blue-600 text-xl mb-1 block"></i>
              <span className="text-blue-800 font-medium text-xs">المحادثات</span>
            </Link>
            
            <Link href="/assignments" 
              className="p-3 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg hover:from-purple-100 hover:to-purple-200 transition-all cursor-pointer text-center">
              <i className="ri-task-line text-purple-600 text-xl mb-1 block"></i>
              <span className="text-purple-800 font-medium text-xs">الواجبات</span>
            </Link>
            
            <button className="p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg hover:from-green-100 hover:to-green-200 transition-all cursor-pointer text-center">
              <i className="ri-question-line text-green-600 text-xl mb-1 block"></i>
              <span className="text-green-800 font-medium text-xs">الاختبارات</span>
            </button>
            
            <button className="p-3 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg hover:from-yellow-100 hover:to-yellow-200 transition-all cursor-pointer text-center">
              <i className="ri-notification-3-line text-yellow-600 text-xl mb-1 block"></i>
              <span className="text-yellow-800 font-medium text-xs">الإشعارات</span>
            </button>
            
            <button className="p-3 bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-lg hover:from-indigo-100 hover:to-indigo-200 transition-all cursor-pointer text-center">
              <i className="ri-survey-line text-indigo-600 text-xl mb-1 block"></i>
              <span className="text-indigo-800 font-medium text-xs">الاستبيان والتقييم</span>
            </button>
            
            <Link href="/profile" 
              className="p-3 bg-gradient-to-r from-teal-50 to-teal-100 rounded-lg hover:from-teal-100 hover:to-teal-200 transition-all cursor-pointer text-center">
              <i className="ri-user-settings-line text-teal-600 text-xl mb-1 block"></i>
              <span className="text-teal-800 font-medium text-xs">البروفايل</span>
            </Link>
            
            <button className="p-3 bg-gradient-to-r from-pink-50 to-pink-100 rounded-lg hover:from-pink-100 hover:to-pink-200 transition-all cursor-pointer text-center">
              <i className="ri-vip-crown-line text-pink-600 text-xl mb-1 block"></i>
              <span className="text-pink-800 font-medium text-xs">إدارة الاشتراكات</span>
            </button>
            
            <button className="p-3 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg hover:from-orange-100 hover:to-orange-200 transition-all cursor-pointer text-center">
              <i className="ri-file-chart-line text-orange-600 text-xl mb-1 block"></i>
              <span className="text-orange-800 font-medium text-xs">التقارير</span>
            </button>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white rounded-xl shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex overflow-x-auto">
              {[
                { id: 'overview', name: 'نظرة عامة', icon: 'ri-dashboard-line' },
                { id: 'students', name: 'إدارة الطلاب', icon: 'ri-group-line' },
                { id: 'teachers', name: 'إدارة المعلمين', icon: 'ri-user-star-line' },
                { id: 'classes', name: 'الفصول الدراسية', icon: 'ri-school-line' },
                { id: 'finances', name: 'الشؤون المالية', icon: 'ri-money-dollar-circle-line' },
                { id: 'reports', name: 'التقارير', icon: 'ri-file-chart-line' },
                { id: 'settings', name: 'الإعدادات', icon: 'ri-settings-line' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 text-sm font-medium border-b-2 cursor-pointer whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <i className={`${tab.icon} mr-2`}></i>
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="grid md:grid-cols-2 gap-8">
              {/* Recent Activities */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">النشاطات الحديثة</h3>
                <div className="space-y-4">
                  {[
                    { icon: 'ri-user-add-line', text: 'تم تسجيل طالب جديد: أحمد محمد', time: 'منذ ساعة', color: 'text-green-600' },
                    { icon: 'ri-money-dollar-circle-line', text: 'تم استلام دفعة رسوم دراسية', time: 'منذ ساعتين', color: 'text-blue-600' },
                    { icon: 'ri-file-add-line', text: 'تم إنشاء واجب جديد في الرياضيات', time: 'منذ 3 ساعات', color: 'text-purple-600' },
                    { icon: 'ri-star-line', text: 'تقييم إيجابي من ولي أمر', time: 'منذ 4 ساعات', color: 'text-orange-600' }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <i className={`${activity.icon} ${activity.color} text-xl`}></i>
                      <div className="flex-1">
                        <p className="text-gray-800 text-sm font-medium">{activity.text}</p>
                        <p className="text-gray-500 text-xs">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">مؤشرات الأداء</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600 text-sm">معدل إكمال الواجبات</span>
                      <span className="text-gray-800 font-medium">{schoolStats.completionRate}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${schoolStats.completionRate}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600 text-sm">معدل الحضور</span>
                      <span className="text-gray-800 font-medium">92%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600 text-sm">رضا أولياء الأمور</span>
                      <span className="text-gray-800 font-medium">{schoolStats.satisfactionRate}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full" 
                        style={{ width: `${schoolStats.satisfactionRate}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600 text-sm">استخدام المنصة</span>
                      <span className="text-gray-800 font-medium">89%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-600 h-2 rounded-full" style={{ width: '89%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Students Tab */}
          {activeTab === 'students' && (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-800">قائمة الطلاب</h3>
                  <button
                    onClick={() => setShowAddStudentModal(true)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <i className="ri-add-line mr-2"></i>
                    إضافة طالب
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-right text-sm font-medium text-gray-900">الطالب</th>
                      <th className="px-6 py-4 text-right text-sm font-medium text-gray-900">الصف</th>
                      <th className="px-6 py-4 text-right text-sm font-medium text-gray-900">تاريخ التسجيل</th>
                      <th className="px-6 py-4 text-right text-sm font-medium text-gray-900">الحالة</th>
                      <th className="px-6 py-4 text-right text-sm font-medium text-gray-900">النقاط</th>
                      <th className="px-6 py-4 text-right text-sm font-medium text-gray-900">الواجبات</th>
                      <th className="px-6 py-4 text-right text-sm font-medium text-gray-900">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {students.map((student) => (
                      <tr key={student.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                              <i className="ri-user-line text-indigo-600"></i>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{student.name}</p>
                              <p className="text-sm text-gray-500">{student.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{student.grade}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {new Date(student.enrollmentDate).toLocaleDateString('ar-SA')}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(student.status)}`}>
                            {student.status === 'active' ? 'نشط' : student.status === 'inactive' ? 'غير نشط' : 'معلق'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-indigo-600">{student.totalPoints}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {student.completedAssignments}/{student.totalAssignments}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <button 
                              onClick={() => handleViewStudentProfile(student)}
                              className="text-blue-600 hover:text-blue-800 cursor-pointer" 
                              title="عرض الملف"
                            >
                              <i className="ri-eye-line"></i>
                            </button>
                            <button className="text-green-600 hover:text-green-800 cursor-pointer" title="تعديل">
                              <i className="ri-edit-line"></i>
                            </button>
                            <button className="text-orange-600 hover:text-orange-800 cursor-pointer" title="التواصل">
                              <i className="ri-message-line"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Teachers Tab */}
          {activeTab === 'teachers' && (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-800">إدارة المعلمين</h3>
                  <button
                    onClick={() => setShowAddTeacherModal(true)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <i className="ri-add-line mr-2"></i>
                    إضافة معلم
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-right text-sm font-medium text-gray-900">المعلم</th>
                      <th className="px-6 py-4 text-right text-sm font-medium text-gray-900">المادة</th>
                      <th className="px-6 py-4 text-right text-sm font-medium text-gray-900">عدد الطلاب</th>
                      <th className="px-6 py-4 text-right text-sm font-medium text-gray-900">التقييم</th>
                      <th className="px-6 py-4 text-right text-sm font-medium text-gray-900">الراتب</th>
                      <th className="px-6 py-4 text-right text-sm font-medium text-gray-900">الحالة</th>
                      <th className="px-6 py-4 text-right text-sm font-medium text-gray-900">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {teachers.map((teacher) => (
                      <tr key={teacher.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                              <i className="ri-user-star-line text-green-600"></i>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{teacher.name}</p>
                              <p className="text-sm text-gray-500">{teacher.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{teacher.subject}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{teacher.studentsCount}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <span className="text-yellow-500 mr-1">★</span>
                            <span className="text-sm font-medium">{teacher.rating}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{formatCurrency(teacher.salary)}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(teacher.status)}`}>
                            {teacher.status === 'active' ? 'نشط' : teacher.status === 'inactive' ? 'غير نشط' : 'في إجازة'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <button className="text-blue-600 hover:text-blue-800 cursor-pointer" title="عرض الملف">
                              <i className="ri-eye-line"></i>
                            </button>
                            <button className="text-green-600 hover:text-green-800 cursor-pointer" title="تعديل">
                              <i className="ri-edit-line"></i>
                            </button>
                            <button className="text-purple-600 hover:text-purple-800 cursor-pointer" title="الراتب">
                              <i className="ri-money-dollar-circle-line"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Classes Tab */}
          {activeTab === 'classes' && (
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: 'الصف السابع - أ', students: 22, teacher: 'د. عبدالله أحمد', subject: 'الرياضيات', time: '08:00 - 09:30', status: 'active' },
                { name: 'الصف الثامن - ب', students: 25, teacher: 'أ. سارة محمد', subject: 'العربية', time: '10:00 - 11:30', status: 'active' },
                { name: 'الصف التاسع - أ', students: 20, teacher: 'أ. خالد العمري', subject: 'العلوم', time: '12:00 - 13:30', status: 'inactive' },
                { name: 'الصف السابع - ب', students: 24, teacher: 'د. فاطمة علي', subject: 'الإنجليزية', time: '14:00 - 15:30', status: 'active' },
                { name: 'الصف الثامن - أ', students: 23, teacher: 'أ. محمد حسن', subject: 'التاريخ', time: '08:00 - 09:30', status: 'active' },
                { name: 'الصف التاسع - ب', students: 21, teacher: 'أ. عائشة أحمد', subject: 'الجغرافيا', time: '10:00 - 11:30', status: 'active' }
              ].map((classItem, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-800">{classItem.name}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(classItem.status)}`}>
                      {classItem.status === 'active' ? 'نشط' : 'غير نشط'}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <i className="ri-user-star-line mr-2"></i>
                      <span>{classItem.teacher}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <i className="ri-book-line mr-2"></i>
                      <span>{classItem.subject}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <i className="ri-group-line mr-2"></i>
                      <span>{classItem.students} طالب</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <i className="ri-time-line mr-2"></i>
                      <span>{classItem.time}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex space-x-2">
                    <button className="flex-1 bg-indigo-50 text-indigo-600 py-2 px-3 rounded-lg hover:bg-indigo-100 transition-colors cursor-pointer whitespace-nowrap text-sm">
                      <i className="ri-eye-line mr-1"></i>
                      عرض
                    </button>
                    <button className="flex-1 bg-green-50 text-green-600 py-2 px-3 rounded-lg hover:bg-green-100 transition-colors cursor-pointer whitespace-nowrap text-sm">
                      <i className="ri-edit-line mr-1"></i>
                      تعديل
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Finances Tab */}
          {activeTab === 'finances' && (
            <div className="space-y-6">
              {/* Financial Summary */}
              <div className="grid md:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">الإيرادات الشهرية</p>
                      <p className="text-2xl font-bold text-green-600">
                        {formatCurrency(financialRecords.filter(r => r.amount > 0).reduce((sum, r) => sum + r.amount, 0))}
                      </p>
                    </div>
                    <i className="ri-arrow-up-line text-green-600 text-2xl"></i>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">المصروفات الشهرية</p>
                      <p className="text-2xl font-bold text-red-600">
                        {formatCurrency(financialRecords.filter(r => r.amount < 0).reduce((sum, r) => sum + Math.abs(r.amount), 0))}
                      </p>
                    </div>
                    <i className="ri-arrow-down-line text-red-600 text-2xl"></i>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">الرصيد الحالي</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {formatCurrency(financialRecords.reduce((sum, r) => sum + r.amount, 0))}
                      </p>
                    </div>
                    <i className="ri-wallet-line text-blue-600 text-2xl"></i>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">المدفوعات المعلقة</p>
                      <p className="text-2xl font-bold text-orange-600">
                        {formatCurrency(financialRecords.filter(r => r.status === 'pending').reduce((sum, r) => sum + Math.abs(r.amount), 0))}
                      </p>
                    </div>
                    <i className="ri-time-line text-orange-600 text-2xl"></i>
                  </div>
                </div>
              </div>

              {/* Financial Records Table */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-bold text-gray-800">السجل المالي</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-right text-sm font-medium text-gray-900">النوع</th>
                        <th className="px-6 py-4 text-right text-sm font-medium text-gray-900">الوصف</th>
                        <th className="px-6 py-4 text-right text-sm font-medium text-gray-900">المبلغ</th>
                        <th className="px-6 py-4 text-right text-sm font-medium text-gray-900">التاريخ</th>
                        <th className="px-6 py-4 text-right text-sm font-medium text-gray-900">الحالة</th>
                        <th className="px-6 py-4 text-right text-sm font-medium text-gray-900">الفئة</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {financialRecords.map((record) => (
                        <tr key={record.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              record.type === 'tuition' ? 'bg-blue-100 text-blue-800' :
                              record.type === 'fee' ? 'bg-green-100 text-green-800' :
                              record.type === 'salary' ? 'bg-purple-100 text-purple-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {record.type === 'tuition' ? 'رسوم دراسية' :
                               record.type === 'fee' ? 'رسوم إضافية' :
                               record.type === 'salary' ? 'راتب' : 'مصروف'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">{record.description}</td>
                          <td className="px-6 py-4">
                            <span className={`text-sm font-medium ${
                              record.amount > 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {record.amount > 0 ? '+' : ''}{formatCurrency(record.amount)}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {new Date(record.date).toLocaleDateString('ar-SA')}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(record.status)}`}>
                              {record.status === 'paid' ? 'مدفوع' : record.status === 'pending' ? 'معلق' : 'متأخر'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">{record.category}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Reports Tab */}
          {activeTab === 'reports' && (
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">تقارير الأداء الأكاديمي</h3>
                <div className="space-y-3">
                  <button className="w-full bg-blue-50 text-blue-700 py-3 px-4 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer whitespace-nowrap text-right">
                    <i className="ri-file-chart-line mr-2"></i>
                    تقرير درجات الطلاب الشهري
                  </button>
                  <button className="w-full bg-green-50 text-green-700 py-3 px-4 rounded-lg hover:bg-green-100 transition-colors cursor-pointer whitespace-nowrap text-right">
                    <i className="ri-bar-chart-box-line mr-2"></i>
                    تقرير الحضور والغياب
                  </button>
                  <button className="w-full bg-purple-50 text-purple-700 py-3 px-4 rounded-lg hover:bg-purple-100 transition-colors cursor-pointer whitespace-nowrap text-right">
                    <i className="ri-award-line mr-2"></i>
                    تقرير أداء المعلمين
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">التقارير المالية</h3>
                <div className="space-y-3">
                  <button className="w-full bg-orange-50 text-orange-700 py-3 px-4 rounded-lg hover:bg-orange-100 transition-colors cursor-pointer whitespace-nowrap text-right">
                    <i className="ri-money-dollar-circle-line mr-2"></i>
                    تقرير الإيرادات والمصروفات
                  </button>
                  <button className="w-full bg-red-50 text-red-700 py-3 px-4 rounded-lg hover:bg-red-100 transition-colors cursor-pointer whitespace-nowrap text-right">
                    <i className="ri-file-excel-line mr-2"></i>
                    تقرير الرسوم المتأخرة
                  </button>
                  <button className="w-full bg-indigo-50 text-indigo-700 py-3 px-4 rounded-lg hover:bg-indigo-100 transition-colors cursor-pointer whitespace-nowrap text-right">
                    <i className="ri-pie-chart-line mr-2"></i>
                    التحليل المالي السنوي
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-6">إعدادات المدرسة</h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-gray-800 mb-3">المعلومات الأساسية</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">اسم المدرسة</label>
                        <input
                          type="text"
                          value={schoolSettings.schoolName}
                          onChange={(e) => setSchoolSettings(prev => ({ ...prev, schoolName: e.target.value }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
                        <input
                          type="email"
                          value={schoolSettings.schoolEmail}
                          onChange={(e) => setSchoolSettings(prev => ({ ...prev, schoolEmail: e.target.value }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">رقم الهاتف</label>
                        <input
                          type="tel"
                          value={schoolSettings.schoolPhone}
                          onChange={(e) => setSchoolSettings(prev => ({ ...prev, schoolPhone: e.target.value }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-800 mb-3">الإعدادات الأكاديمية</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">العام الدراسي</label>
                        <input
                          type="text"
                          value={schoolSettings.academicYear}
                          onChange={(e) => setSchoolSettings(prev => ({ ...prev, academicYear: e.target.value }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">الحد الأقصى للطلاب في الفصل</label>
                        <input
                          type="number"
                          value={schoolSettings.maxStudentsPerClass}
                          onChange={(e) => setSchoolSettings(prev => ({ ...prev, maxStudentsPerClass: Number(e.target.value) }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-gray-800 mb-3">الرسوم الدراسية</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">الرسوم الدراسية الشهرية</label>
                        <input
                          type="number"
                          value={schoolSettings.tuitionFee}
                          onChange={(e) => setSchoolSettings(prev => ({ ...prev, tuitionFee: Number(e.target.value) }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">رسوم التسجيل</label>
                        <input
                          type="number"
                          value={schoolSettings.registrationFee}
                          onChange={(e) => setSchoolSettings(prev => ({ ...prev, registrationFee: Number(e.target.value) }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-800 mb-3">الإعدادات العامة</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">السماح بالدفع الإلكتروني</span>
                        <input
                          type="checkbox"
                          checked={schoolSettings.allowOnlinePayments}
                          onChange={(e) => setSchoolSettings(prev => ({ ...prev, allowOnlinePayments: e.target.checked }))}
                          className="w-4 h-4 text-indigo-600"
                        />
                      </div>
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">إرسال إشعارات البريد الإلكتروني</span>
                        <input
                          type="checkbox"
                          checked={schoolSettings.sendEmailNotifications}
                          onChange={(e) => setSchoolSettings(prev => ({ ...prev, sendEmailNotifications: e.target.checked }))}
                          className="w-4 h-4 text-indigo-600"
                        />
                      </div>
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">تفعيل بوابة أولياء الأمور</span>
                        <input
                          type="checkbox"
                          checked={schoolSettings.parentPortalEnabled}
                          onChange={(e) => setSchoolSettings(prev => ({ ...prev, parentPortalEnabled: e.target.checked }))}
                          className="w-4 h-4 text-indigo-600"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end space-x-4">
                <button className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition-colors cursor-pointer whitespace-nowrap">
                  إلغاء
                </button>
                <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer whitespace-nowrap">
                  حفظ الإعدادات
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Student Modal */}
      {showAddStudentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">إضافة طالب جديد</h2>
                <button
                  onClick={() => setShowAddStudentModal(false)}
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  <i className="ri-close-line text-gray-600"></i>
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">اسم الطالب</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="أدخل اسم الطالب"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="أدخل البريد الإلكتروني"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الصف الدراسي</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 pr-8">
                  <option value="">اختر الصف</option>
                  <option value="grade7">الصف السابع</option>
                  <option value="grade8">الصف الثامن</option>
                  <option value="grade9">الصف التاسع</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">رقم هاتف ولي الأمر</label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="+966-50-123-4567"
                />
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex space-x-3">
              <button
                onClick={() => setShowAddStudentModal(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition-colors cursor-pointer whitespace-nowrap"
              >
                إلغاء
              </button>
              <button
                onClick={handleAddStudent}
                className="flex-1 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer whitespace-nowrap"
              >
                إضافة الطالب
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Teacher Modal */}
      {showAddTeacherModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">إضافة معلم جديد</h2>
                <button
                  onClick={() => setShowAddTeacherModal(false)}
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  <i className="ri-close-line text-gray-600"></i>
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">اسم المعلم</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="أدخل اسم المعلم"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="أدخل البريد الإلكتروني"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">المادة الدراسية</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 pr-8">
                  <option value="">اختر المادة</option>
                  <option value="math">الرياضيات</option>
                  <option value="arabic">اللغة العربية</option>
                  <option value="english">اللغة الإنجليزية</option>
                  <option value="science">العلوم</option>
                  <option value="history">التاريخ</option>
                  <option value="geography">الجغرافيا</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">رقم الهاتف</label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="+966-50-123-4567"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الراتب الشهري</label>
                <input
                  type="number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="8000"
                />
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex space-x-3">
              <button
                onClick={() => setShowAddTeacherModal(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition-colors cursor-pointer whitespace-nowrap"
              >
                إلغاء
              </button>
              <button
                onClick={handleAddTeacher}
                className="flex-1 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer whitespace-nowrap"
              >
                إضافة المعلم
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Student Profile Modal */}
      {showStudentProfileModal && selectedStudent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-full flex items-center justify-center">
                    <i className="ri-user-line text-white text-2xl"></i>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{selectedStudent.name}</h2>
                    <p className="text-gray-600">{selectedStudent.email}</p>
                    <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full mt-2 ${getStatusColor(selectedStudent.status)}`}>
                      {selectedStudent.status === 'active' ? 'نشط' : selectedStudent.status === 'inactive' ? 'غير نشط' : 'معلق'}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setShowStudentProfileModal(false)}
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  <i className="ri-close-line text-gray-600 text-xl"></i>
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {/* Academic Performance */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-blue-800">الأداء الأكاديمي</h3>
                    <i className="ri-book-line text-blue-600 text-xl"></i>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-blue-700 text-sm">النقاط الإجمالية</span>
                      <span className="font-bold text-blue-800">{selectedStudent.totalPoints}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-700 text-sm">الواجبات المكتملة</span>
                      <span className="font-bold text-blue-800">{selectedStudent.completedAssignments}/{selectedStudent.totalAssignments}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-700 text-sm">معدل الإنجاز</span>
                      <span className="font-bold text-blue-800">{Math.round((selectedStudent.completedAssignments / selectedStudent.totalAssignments) * 100)}%</span>
                    </div>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-green-800">المعلومات الشخصية</h3>
                    <i className="ri-user-3-line text-green-600 text-xl"></i>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <span className="text-green-700 text-sm block">الصف الدراسي</span>
                      <span className="font-bold text-green-800">{selectedStudent.grade}</span>
                    </div>
                    <div>
                      <span className="text-green-700 text-sm block">تاريخ التسجيل</span>
                      <span className="font-bold text-green-800">{new Date(selectedStudent.enrollmentDate).toLocaleDateString('ar-SA')}</span>
                    </div>
                    <div>
                      <span className="text-green-700 text-sm block">هاتف ولي الأمر</span>
                      <span className="font-bold text-green-800">{selectedStudent.parentPhone}</span>
                    </div>
                  </div>
                </div>

                {/* Activity Status */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-purple-800">النشاط الأخير</h3>
                    <i className="ri-time-line text-purple-600 text-xl"></i>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <span className="text-purple-700 text-sm block">آخر نشاط</span>
                      <span className="font-bold text-purple-800">{new Date(selectedStudent.lastActivity).toLocaleString('ar-SA')}</span>
                    </div>
                    <div>
                      <span className="text-purple-700 text-sm block">حالة الحضور</span>
                      <span className="font-bold text-purple-800">منتظم</span>
                    </div>
                    <div>
                      <span className="text-purple-700 text-sm block">المشاركة</span>
                      <span className="font-bold text-purple-800">نشط</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Detailed Information Tabs */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex border-b border-gray-200 mb-6">
                  <button className="px-4 py-2 text-sm font-medium text-indigo-600 border-b-2 border-indigo-600">
                    <i className="ri-file-list-line mr-2"></i>
                    الدرجات والواجبات
                  </button>
                  <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 ml-6">
                    <i className="ri-calendar-line mr-2"></i>
                    سجل الحضور
                  </button>
                  <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 ml-6">
                    <i className="ri-chat-3-line mr-2"></i>
                    التواصل
                  </button>
                </div>

                {/* Grades and Assignments */}
                <div className="space-y-4">
                  <h4 className="font-bold text-gray-800 mb-4">آخر الواجبات والدرجات</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { subject: 'الرياضيات', assignment: 'واجب الجبر الخطي', grade: 95, maxGrade: 100, date: '2024-01-20', status: 'completed' },
                      { subject: 'العلوم', assignment: 'تجربة الكثافة', grade: 88, maxGrade: 100, date: '2024-01-19', status: 'completed' },
                      { subject: 'اللغة العربية', assignment: 'تحليل النص الأدبي', grade: 92, maxGrade: 100, date: '2024-01-18', status: 'completed' },
                      { subject: 'التاريخ', assignment: 'بحث الحضارات القديمة', grade: 0, maxGrade: 100, date: '2024-01-22', status: 'pending' }
                    ].map((item, index) => (
                      <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium text-gray-800">{item.subject}</h5>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            item.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {item.status === 'completed' ? 'مكتمل' : 'معلق'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{item.assignment}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">{new Date(item.date).toLocaleDateString('ar-SA')}</span>
                          {item.status === 'completed' ? (
                            <span className={`font-bold ${
                              item.grade >= 90 ? 'text-green-600' : 
                              item.grade >= 80 ? 'text-blue-600' : 
                              item.grade >= 70 ? 'text-yellow-600' : 'text-red-600'
                            }`}>
                              {item.grade}/{item.maxGrade}
                            </span>
                          ) : (
                            <span className="text-yellow-600 font-medium text-sm">في انتظار التسليم</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Performance Chart */}
                <div className="mt-8">
                  <h4 className="font-bold text-gray-800 mb-4">تطور الأداء الأكاديمي</h4>
                  <div className="bg-white rounded-lg p-6 border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-600">متوسط الدرجات الشهرية</span>
                      <span className="text-sm font-medium text-gray-800">اتجاه تصاعدي ↗</span>
                    </div>
                    <div className="space-y-3">
                      {[
                        { month: 'سبتمبر', average: 82, color: 'bg-blue-500' },
                        { month: 'أكتوبر', average: 85, color: 'bg-green-500' },
                        { month: 'نوفمبر', average: 88, color: 'bg-green-500' },
                        { month: 'ديسمبر', average: 91, color: 'bg-green-500' },
                        { month: 'يناير', average: 93, color: 'bg-green-500' }
                      ].map((month, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <span className="text-sm text-gray-600 w-16">{month.month}</span>
                          <div className="flex-1 bg-gray-200 rounded-full h-3">
                            <div 
                              className={`${month.color} h-3 rounded-full transition-all duration-500`}
                              style={{ width: `${month.average}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-800 w-12">{month.average}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex justify-between">
                <div className="flex space-x-3">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap">
                    <i className="ri-edit-line mr-2"></i>
                    تعديل البيانات
                  </button>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors cursor-pointer whitespace-nowrap">
                    <i className="ri-message-line mr-2"></i>
                    إرسال رسالة
                  </button>
                  <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors cursor-pointer whitespace-nowrap">
                    <i className="ri-file-download-line mr-2"></i>
                    تصدير التقرير
                  </button>
                </div>
                <button
                  onClick={() => setShowStudentProfileModal(false)}
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors cursor-pointer whitespace-nowrap"
                >
                  إغلاق
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
