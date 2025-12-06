
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function TeacherAdminPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [teacherInfo, setTeacherInfo] = useState({
    name: 'د. فاطمة أحمد',
    department: 'كلية الهندسة',
    subjects: ['الرياضيات المتقدمة', 'الفيزياء التطبيقية'],
    totalStudents: 156,
    activeClasses: 8,
    completedAssignments: 45,
    pendingGrading: 12
  });

  const [mySpaces, setMySpaces] = useState([
    { id: 1, name: 'فصل الرياضيات A', students: 25, status: 'active', nextClass: '2024-01-21 10:00', subject: 'الرياضيات المتقدمة' },
    { id: 2, name: 'مختبر الفيزياء', students: 15, status: 'scheduled', nextClass: '2024-01-21 14:00', subject: 'الفيزياء التطبيقية' },
    { id: 3, name: 'قاعة المراجعة', students: 30, status: 'inactive', nextClass: null, subject: 'مراجعة عامة' }
  ]);

  const [students, setStudents] = useState([
    { id: 1, name: 'أحمد محمد', class: 'فصل الرياضيات A', grade: 85, attendance: 92, lastActivity: '2024-01-20', status: 'active' },
    { id: 2, name: 'سارة خالد', class: 'مختبر الفيزياء', grade: 78, attendance: 88, lastActivity: '2024-01-19', status: 'active' },
    { id: 3, name: 'محمد عبدالله', class: 'فصل الرياضيات A', grade: 92, attendance: 95, lastActivity: '2024-01-20', status: 'active' },
    { id: 4, name: 'فاطمة علي', class: 'مختبر الفيزياء', grade: 0, attendance: 65, lastActivity: '2024-01-18', status: 'warning' }
  ]);

  const [assignments, setAssignments] = useState([
    { id: 1, title: 'واجب الجبر الخطي', class: 'فصل الرياضيات A', dueDate: '2024-01-25', submitted: 20, total: 25, status: 'active' },
    { id: 2, title: 'تجربة الكثافة', class: 'مختبر الفيزياء', dueDate: '2024-01-23', submitted: 12, total: 15, status: 'active' },
    { id: 3, title: 'مشروع التفاضل', class: 'فصل الرياضيات A', dueDate: '2024-01-20', submitted: 25, total: 25, status: 'completed' }
  ]);

  const [newAssignment, setNewAssignment] = useState({
    title: '',
    description: '',
    class: '',
    dueDate: '',
    totalMarks: 100
  });

  const getStatusColor = (status: string) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      scheduled: 'bg-blue-100 text-blue-800',
      inactive: 'bg-gray-100 text-gray-800',
      warning: 'bg-red-100 text-red-800',
      completed: 'bg-purple-100 text-purple-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const handleCreateAssignment = () => {
    if (newAssignment.title && newAssignment.class && newAssignment.dueDate) {
      const assignment = {
        id: assignments.length + 1,
        title: newAssignment.title,
        class: newAssignment.class,
        dueDate: newAssignment.dueDate,
        submitted: 0,
        total: mySpaces.find(space => space.name === newAssignment.class)?.students || 0,
        status: 'active'
      };
      setAssignments([...assignments, assignment]);
      setNewAssignment({ title: '', description: '', class: '', dueDate: '', totalMarks: 100 });
    }
  };

  const calculateGradeColor = (grade: number) => {
    if (grade >= 90) return 'text-green-600';
    if (grade >= 80) return 'text-blue-600';
    if (grade >= 70) return 'text-yellow-600';
    if (grade >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <i className="ri-user-star-line text-white text-xl"></i>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{teacherInfo.name}</h1>
                <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">معلم - {teacherInfo.department}</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-7

0 transition-col

ors cursor-pointer whitespace-nowrap">
                <i className="ri-video-line mr-2"></i>
                بدء محاضرة مباشرة
              </button>
              <Link href="/dashboard" className="text-gray-600 hover:text-gray-800 cursor-pointer">
                العودة للوحة الرئيسية
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Teacher Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">إجمالي الطلاب</p>
                <p className="text-2xl font-bold text-gray-800">{teacherInfo.totalStudents}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <i className="ri-group-line text-blue-600 text-xl"></i>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">الفصول النشطة</p>
                <p className="text-2xl font-bold text-green-600">{teacherInfo.activeClasses}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <i className="ri-school-line text-green-600 text-xl"></i>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">الواجبات المكتملة</p>
                <p className="text-2xl font-bold text-purple-600">{teacherInfo.completedAssignments}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <i className="ri-task-line text-purple-600 text-xl"></i>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">في انتظار التصحيح</p>
                <p className="text-2xl font-bold text-red-600">{teacherInfo.pendingGrading}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <i className="ri-edit-line text-red-600 text-xl"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-8">
          <div className="p-6">
            <nav className="flex flex-wrap gap-2">
              {[
                { id: 'overview', name: 'نظرة عامة', icon: 'ri-dashboard-line' },
                { id: 'spaces', name: 'فصولي الدراسية', icon: 'ri-school-line' },
                { id: 'students', name: 'الطلاب', icon: 'ri-group-line' },
                { id: 'assignments', name: 'الواجبات والمهام', icon: 'ri-task-line' },
                { id: 'grades', name: 'الدرجات والتقييم', icon: 'ri-medal-line' },
                { id: 'schedule', name: 'الجدول الدراسي', icon: 'ri-calendar-line' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 text-sm font-medium rounded-full cursor-pointer whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">المحاضرات القادمة</h3>
                <div className="space-y-4">
                  {mySpaces.filter(space => space.nextClass).map((space) => (
                    <div key={space.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-800">{space.name}</p>
                        <p className="text-sm text-gray-600">{space.subject}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-blue-600">{space.nextClass}</p>
                        <p className="text-xs text-gray-500">{space.students} طالب</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">إحصائيات سريعة</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">متوسط الحضور</span>
                    <span className="font-bold text-green-600">89%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">متوسط الدرجات</span>
                    <span className="font-bold text-blue-600">82.5</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">الواجبات المرسلة</span>
                    <span className="font-bold text-purple-600">32/40</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">تقييم الطلاب</span>
                    <span className="font-bold text-yellow-600">4.7/5</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* My Spaces Tab */}
          {activeTab === 'spaces' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-800">فصولي الدراسية</h3>
                <Link href="/setup" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap">
                  <i className="ri-add-line mr-2"></i>
                  إنشاء فصل جديد
                </Link>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mySpaces.map((space) => (
                  <div key={space.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-bold text-gray-800">{space.name}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(space.status)}`}>
                        {space.status === 'active' ? 'نشط' : space.status === 'scheduled' ? 'مجدول' : 'غير نشط'}
                      </span>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <p><strong>المادة:</strong> {space.subject}</p>
                      <p><strong>عدد الطلاب:</strong> {space.students}</p>
                      {space.nextClass && (
                        <p><strong>المحاضرة القادمة:</strong> {new Date(space.nextClass).toLocaleString('ar-SA')}</p>
                      )}
                    </div>
                    <div className="flex justify-between">
                      <button className="text-blue-600 hover:text-blue-800 text-sm cursor-pointer">
                        <i className="ri-door-open-line mr-1"></i>
                        دخول الفصل
                      </button>
                      <button className="text-green-600 hover:text-green-800 text-sm cursor-pointer">
                        <i className="ri-settings-line mr-1"></i>
                        إعدادات
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Students Tab */}
          {activeTab === 'students' && (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-800">قائمة الطلاب</h3>
                  <div className="flex space-x-3">
                    <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 pr-8">
                      <option value="">جميع الفصول</option>
                      {mySpaces.map(space => (
                        <option key={space.id} value={space.name}>{space.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-right text-sm font-medium text-gray-900">الطالب</th>
                      <th className="px-6 py-4 text-right text-sm font-medium text-gray-900">الفصل</th>
                      <th className="px-6 py-4 text-right text-sm font-medium text-gray-900">الدرجة</th>
                      <th className="px-6 py-4 text-right text-sm font-medium text-gray-900">الحضور</th>
                      <th className="px-6 py-4 text-right text-sm font-medium text-gray-900">آخر نشاط</th>
                      <th className="px-6 py-4 text-right text-sm font-medium text-gray-900">الحالة</th>
                      <th className="px-6 py-4 text-right text-sm font-medium text-gray-900">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {students.map((student) => (
                      <tr key={student.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <i className="ri-user-line text-blue-600"></i>
                            </div>
                            <p className="font-medium text-gray-900">{student.name}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{student.class}</td>
                        <td className="px-6 py-4">
                          <span className={`text-sm font-medium ${calculateGradeColor(student.grade)}`}>
                            {student.grade || 'لم يقيم'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-sm ${student.attendance >= 80 ? 'text-green-600' : 'text-red-600'}`}>
                            {student.attendance}%
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {new Date(student.lastActivity).toLocaleDateString('ar-SA')}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(student.status)}`}>
                            {student.status === 'active' ? 'نشط' : 'تحذير'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <button className="text-blue-600 hover:text-blue-800 cursor-pointer" title="عرض الملف">
                              <i className="ri-user-line"></i>
                            </button>
                            <button className="text-green-600 hover:text-green-800 cursor-pointer" title="إرسال رسالة">
                              <i className="ri-mail-line"></i>
                            </button>
                            <button className="text-purple-600 hover:text-purple-800 cursor-pointer" title="تقييم">
                              <i className="ri-star-line"></i>
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

          {/* Assignments Tab */}
          {activeTab === 'assignments' && (
            <div className="space-y-6">
              {/* Create New Assignment */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">إنشاء واجب جديد</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="عنوان الواجب"
                    value={newAssignment.title}
                    onChange={(e) => setNewAssignment({...newAssignment, title: e.target.value})}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                  <select
                    value={newAssignment.class}
                    onChange={(e) => setNewAssignment({...newAssignment, class: e.target.value})}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 pr-8"
                  >
                    <option value="">اختر الفصل</option>
                    {mySpaces.map(space => (
                      <option key={space.id} value={space.name}>{space.name}</option>
                    ))}
                  </select>
                  <input
                    type="datetime-local"
                    value={newAssignment.dueDate}
                    onChange={(e) => setNewAssignment({...newAssignment, dueDate: e.target.value})}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    type="number"
                    placeholder="الدرجة الكاملة"
                    value={newAssignment.totalMarks}
                    onChange={(e) => setNewAssignment({...newAssignment, totalMarks: parseInt(e.target.value)})}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <textarea
                  placeholder="وصف الواجب وتعليماته..."
                  value={newAssignment.description}
                  onChange={(e) => setNewAssignment({...newAssignment, description: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 mt-4"
                />
                <button
                  onClick={handleCreateAssignment}
                  className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors cursor-pointer whitespace-nowrap mt-4"
                >
                  <i className="ri-add-line mr-2"></i>
                  إنشاء الواجب
                </button>
              </div>

              {/* Assignments List */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-bold text-gray-800">قائمة الواجبات</h3>
                </div>
                <div className="grid gap-4 p-6">
                  {assignments.map((assignment) => (
                    <div key={assignment.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-800">{assignment.title}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(assignment.status)}`}>
                          {assignment.status === 'active' ? 'نشط' : 'مكتمل'}
                        </span>
                      </div>
                      <div className="grid md:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div>
                          <strong>الفصل:</strong> {assignment.class}
                        </div>
                        <div>
                          <strong>موعد التسليم:</strong> {new Date(assignment.dueDate).toLocaleDateString('ar-SA')}
                        </div>
                        <div>
                          <strong>المرسل:</strong> {assignment.submitted}/{assignment.total}
                        </div>
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-800 cursor-pointer">
                            <i className="ri-eye-line mr-1"></i>
                            عرض
                          </button>
                          <button className="text-green-600 hover:text-green-800 cursor-pointer">
                            <i className="ri-edit-line mr-1"></i>
                            تعديل
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Grades Tab */}
          {activeTab === 'grades' && (
            <div className="space-y-6">
              {/* Grade Summary Cards */}
              <div className="grid md:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">متوسط الدرجات العام</p>
                      <p className="text-2xl font-bold text-blue-600">82.5</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <i className="ri-bar-chart-line text-blue-600 text-xl"></i>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center text-sm">
                    <i className="ri-arrow-up-line text-green-500 mr-1"></i>
                    <span className="text-green-500">+3.2%</span>
                    <span className="text-gray-500 ml-2">من الشهر الماضي</span>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">الطلاب المتفوقون</p>
                      <p className="text-2xl font-bold text-green-600">28</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <i className="ri-trophy-line text-green-600 text-xl"></i>
                    </div>
                  </div>
                  <div className="mt-3 text-sm text-gray-600">
                    درجات أعلى من 85%
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">يحتاجون مساعدة</p>
                      <p className="text-2xl font-bold text-red-600">8</p>
                    </div>
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <i className="ri-alarm-warning-line text-red-600 text-xl"></i>
                    </div>
                  </div>
                  <div className="mt-3 text-sm text-gray-600">
                    درجات أقل من 60%
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">الواجبات المصححة</p>
                      <p className="text-2xl font-bold text-purple-600">45/57</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <i className="ri-check-double-line text-purple-600 text-xl"></i>
                    </div>
                  </div>
                  <div className="mt-3 text-sm text-gray-600">
                    12 في انتظار التصحيح
                  </div>
                </div>
              </div>

              {/* Grade Distribution Chart */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">توزيع الدرجات</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">ممتاز (90-100)</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 h-3 bg-gray-200 rounded-full">
                            <div className="w-[45%] h-full bg-green-500 rounded-full"></div>
                          </div>
                          <span className="text-sm font-medium text-gray-700">18 طالب</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">جيد جداً (80-89)</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 h-3 bg-gray-200 rounded-full">
                            <div className="w-[35%] h-full bg-blue-500 rounded-full"></div>
                          </div>
                          <span className="text-sm font-medium text-gray-700">14 طالب</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">جيد (70-79)</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 h-3 bg-gray-200 rounded-full">
                            <div className="w-[25%] h-full bg-yellow-500 rounded-full"></div>
                          </div>
                          <span className="text-sm font-medium text-gray-700">10 طلاب</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">مقبول (60-69)</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 h-3 bg-gray-200 rounded-full">
                            <div className="w-[15%] h-full bg-orange-500 rounded-full"></div>
                          </div>
                          <span className="text-sm font-medium text-gray-700">6 طلاب</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">راسب (أقل من 60)</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 h-3 bg-gray-200 rounded-full">
                            <div className="w-[10%] h-full bg-red-500 rounded-full"></div>
                          </div>
                          <span className="text-sm font-medium text-gray-700">4 طلاب</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="relative w-48 h-48">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#e5e7eb"
                          strokeWidth="3"
                        />
                        <path
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="3"
                          strokeDasharray="45, 100"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-800">82.5%</div>
                          <div className="text-sm text-gray-600">متوسط النجاح</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Grades & Quick Grading */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Recent Grades */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-800">آخر الدرجات المدخلة</h3>
                    <button className="text-blue-600 hover:text-blue-800 text-sm cursor-pointer">
                      عرض الكل
                    </button>
                  </div>
                  <div className="space-y-3">
                    {[
                      { student: 'أحمد محمد', assignment: 'واجب الجبر', grade: 92, maxGrade: 100, date: '2024-01-20' },
                      { student: 'فاطمة أحمد', assignment: 'اختبار الهندسة', grade: 87, maxGrade: 100, date: '2024-01-19' },
                      { student: 'محمد عبدالله', assignment: 'مش 프로젝트 الإحصاء', grade: 95, maxGrade: 100, date: '2024-01-19' },
                      { student: 'سارة خالد', assignment: 'واجب التفاضل', grade: 78, maxGrade: 100, date: '2024-01-18' },
                      { student: 'عمر حسن', assignment: 'اختبار الجبر', grade: 85, maxGrade: 100, date: '2024-01-18' }
                    ].map((grade, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 text-sm">{grade.student}</p>
                          <p className="text-xs text-gray-600">{grade.assignment}</p>
                        </div>
                        <div className="text-right">
                          <p className={`font-bold ${calculateGradeColor(grade.grade)}`}>
                            {grade.grade}/{grade.maxGrade}
                          </p>
                          <p className="text-xs text-gray-500">{new Date(grade.date).toLocaleDateString('ar-SA')}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Grading */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">تصحيح سريع</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">اختر الواجب</label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 pr-8">
                        <option value="">اختر الواجب للتصحيح</option>
                        <option value="math_hw1">واجب الجبر الخطي</option>
                        <option value="physics_exp">تجربة الكثافة</option>
                        <option value="math_project">مشروع التفاضل</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">اختر الطالب</label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 pr-8">
                        <option value="">اختر الطالب</option>
                        <option value="1">أحمد محمد</option>
                        <option value="2">سارة خالد</option>
                        <option value="3">محمد عبدالله</option>
                        <option value="4">فاطمة علي</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">الدرجة</label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          placeholder="85"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">من</label>
                        <input
                          type="number"
                          min="0"
                          placeholder="100"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">ملاحظات (اختياري)</label>
                      <textarea
                        rows={3}
                        placeholder="أضف ملاحظات أو تعليقات للطالب..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors cursor-pointer whitespace-nowrap">
                      <i className="ri-save-line mr-2"></i>
                      حفظ الدرجة
                    </button>
                  </div>
                </div>
              </div>

              {/* Grade Analytics */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">تحليلات الأداء</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-700">أداء الفصول</h4>
                    <div className="space-y-3">
                      {[
                        { class: 'فصل الرياضيات A', average: 85.2, students: 25, color: 'bg-green-500' },
                        { class: 'مختبر الفيزياء', average: 78.9, students: 15, color: 'bg-blue-500' },
                        { class: 'قاعة المراجعة', average: 82.1, students: 30, color: 'bg-purple-500' }
                      ].map((classData, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className={`w-3 h-3 ${classData.color} rounded-full`}></div>
                            <span className="text-sm text-gray-700">{classData.class}</span>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium text-gray-800">{classData.average}%</div>
                            <div className="text-xs text-gray-500">{classData.students} طالب</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-700">أداء المواد</h4>
                    <div className="space-y-3">
                      {[
                        { subject: 'الرياضيات المتقدمة', average: 83.5, trend: 'up' },
                        { subject: 'الفيزياء التطبيقية', average: 79.2, trend: 'down' },
                        { subject: 'الإحصاء والاحتمالات', average: 86.1, trend: 'up' }
                      ].map((subject, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">{subject.subject}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-gray-800">{subject.average}%</span>
                            <i className={`${subject.trend === 'up' ? 'ri-arrow-up-line text-green-500' : 'ri-arrow-down-line text-red-500'} text-sm`}></i>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-700">إحصائيات سريعة</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">أعلى درجة</span>
                        <span className="text-sm font-bold text-green-600">98/100</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">أقل درجة</span>
                        <span className="text-sm font-bold text-red-600">45/100</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">الوسيط</span>
                        <span className="text-sm font-bold text-blue-600">81</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">الانحراف المعياري</span>
                        <span className="text-sm font-bold text-purple-600">12.3</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">معدل النجاح</span>
                        <span className="text-sm font-bold text-green-600">92.3%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Export & Reports */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">التقارير والتصدير</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-700">تصدير الدرجات</h4>
                    <div className="flex space-x-2">
                      <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors cursor-pointer whitespace-nowrap text-sm">
                        <i className="ri-file-excel-2-line mr-2"></i>
                        Excel
                      </button>
                      <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors cursor-pointer whitespace-nowrap text-sm">
                        <i className="ri-file-pdf-line mr-2"></i>
                        PDF
                      </button>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap text-sm">
                        <i className="ri-share-line mr-2"></i>
                        مشاركة
                      </button>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-700">تقارير مخصصة</h4>
                    <div className="flex space-x-2">
                      <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors cursor-pointer whitespace-nowrap text-sm">
                        <i className="ri-bar-chart-box-line mr-2"></i>
                        تقرير شامل
                      </button>
                      <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors cursor-pointer whitespace-nowrap text-sm">
                        <i className="ri-user-star-line mr-2"></i>
                        تقرير فردي
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Schedule Tab */}
          {activeTab === 'schedule' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">الجدول الدراسي</h3>
                <div className="grid grid-cols-7 gap-2 mb-6">
                  {['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'].map(day => (
                    <div key={day} className="text-center font-medium text-gray-700 py-2">
                      {day}
                    </div>
                  ))}
                  {/* Schedule grid will be added here */}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
