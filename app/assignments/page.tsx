'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Assignment {
  id: string;
  title: string;
  description: string;
  course: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded' | 'overdue';
  grade?: number;
  maxGrade: number;
  submissionType: 'file' | 'text' | 'link';
  feedback?: string;
  teacherName: string;
  createdAt: string;
}

interface Submission {
  id: string;
  assignmentId: string;
  type: 'file' | 'text' | 'link';
  content: string;
  fileName?: string;
  submittedAt: string;
  grade?: number;
  feedback?: string;
}

export default function AssignmentsPage() {
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [submissionType, setSubmissionType] = useState<'file' | 'text' | 'link'>('text');
  const [submissionContent, setSubmissionContent] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const assignments: Assignment[] = [
    {
      id: '1',
      title: 'مشروع البرمجة النهائي',
      description: 'تطوير تطبيق ويب متكامل باستخدام React و Node.js يحتوي على نظام إدارة المحتوى',
      course: 'هندسة البرمجيات',
      dueDate: '2024-02-15T23:59:00',
      status: 'pending',
      maxGrade: 100,
      submissionType: 'file',
      teacherName: 'د. محمد علي',
      createdAt: '2024-01-15T10:00:00'
    },
    {
      id: '2',
      title: 'تقرير تحليل البيانات',
      description: 'تحليل مجموعة بيانات حقيقية وكتابة تقرير شامل عن النتائج والتوصيات',
      course: 'علم البيانات',
      dueDate: '2024-02-10T23:59:00',
      status: 'submitted',
      maxGrade: 50,
      submissionType: 'file',
      teacherName: 'د. سارة أحمد',
      createdAt: '2024-01-10T14:30:00'
    },
    {
      id: '3',
      title: 'مناقشة الفصل الثالث',
      description: 'مشاركة آرائكم حول محتوى الفصل الثالث من الكتاب المقرر وطرح أسئلة للنقاش',
      course: 'مقدمة في علم الحاسوب',
      dueDate: '2024-02-05T23:59:00',
      status: 'graded',
      grade: 45,
      maxGrade: 50,
      submissionType: 'text',
      feedback: 'عمل ممتاز! أظهرت فهماً عميقاً للمفاهيم. يمكن تحسين التنظيم قليلاً.',
      teacherName: 'أ. عمر حسن',
      createdAt: '2024-01-05T09:15:00'
    },
    {
      id: '4',
      title: 'عرض تقديمي - الأمن السيبراني',
      description: 'إعداد عرض تقديمي لمدة 15 دقيقة حول أحد مواضيع الأمن السيبراني',
      course: 'أمن المعلومات',
      dueDate: '2024-01-25T23:59:00',
      status: 'overdue',
      maxGrade: 75,
      submissionType: 'link',
      teacherName: 'د. فاطمة محمد',
      createdAt: '2024-01-01T16:45:00'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'submitted': return 'bg-blue-100 text-blue-800';
      case 'graded': return 'bg-green-100 text-green-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'معلق';
      case 'submitted': return 'مُسلم';
      case 'graded': return 'مُقيم';
      case 'overdue': return 'متأخر';
      default: return 'غير محدد';
    }
  };

  const filteredAssignments = assignments.filter(assignment => {
    if (activeTab === 'all') return true;
    return assignment.status === activeTab;
  });

  const handleSubmission = () => {
    if (!selectedAssignment) return;

    const newSubmission: Submission = {
      id: Date.now().toString(),
      assignmentId: selectedAssignment.id,
      type: submissionType,
      content: submissionContent,
      fileName: selectedFile?.name,
      submittedAt: new Date().toISOString()
    };

    console.log('تم إرسال الواجب:', newSubmission);
    setShowSubmissionModal(false);
    setSubmissionContent('');
    setSelectedFile(null);
    setSelectedAssignment(null);
  };

  const isOverdue = (dueDate: string) => {
    return new Date() > new Date(dueDate);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/" className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <i className="ri-task-line text-white text-xl"></i>
              </Link>
              <h1 className="text-2xl font-bold text-gray-800">إدارة المهام والواجبات</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-blue-50 px-4 py-2 rounded-lg">
                <span className="text-sm text-blue-800 font-medium">
                  {assignments.filter(a => a.status === 'pending').length} واجب معلق
                </span>
              </div>
              <Link href="/dashboard" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap">
                العودة للوحة التحكم
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <i className="ri-time-line text-yellow-600 text-xl"></i>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{assignments.filter(a => a.status === 'pending').length}</p>
                <p className="text-sm text-gray-600">واجبات معلقة</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <i className="ri-check-line text-blue-600 text-xl"></i>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{assignments.filter(a => a.status === 'submitted').length}</p>
                <p className="text-sm text-gray-600">واجبات مُسلمة</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <i className="ri-star-line text-green-600 text-xl"></i>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{assignments.filter(a => a.status === 'graded').length}</p>
                <p className="text-sm text-gray-600">واجبات مُقيمة</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <i className="ri-alarm-warning-line text-red-600 text-xl"></i>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{assignments.filter(a => a.status === 'overdue').length}</p>
                <p className="text-sm text-gray-600">واجبات متأخرة</p>
              </div>
            </div>
          </div>
        </div>

        {/* External Tools Integration */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <i className="ri-links-line mr-2 text-purple-600"></i>
            التكامل مع الأدوات الخارجية
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <i className="ri-vidicon-line text-blue-600"></i>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-800">Zoom</p>
                <p className="text-sm text-gray-600">البث المباشر في القاعات</p>
              </div>
            </button>

            <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <i className="ri-google-line text-green-600"></i>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-800">Google Workspace</p>
                <p className="text-sm text-gray-600">مزامنة التقويمات والمستندات</p>
              </div>
            </button>

            <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <i className="ri-microsoft-line text-purple-600"></i>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-800">Microsoft Teams</p>
                <p className="text-sm text-gray-600">تكامل المهام والاجتماعات</p>
              </div>
            </button>
          </div>
        </div>

        {/* Assignments List */}
        <div className="bg-white rounded-xl shadow-sm">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex">
              {[
                { id: 'pending', label: 'معلقة', count: assignments.filter(a => a.status === 'pending').length },
                { id: 'submitted', label: 'مُسلمة', count: assignments.filter(a => a.status === 'submitted').length },
                { id: 'graded', label: 'مُقيمة', count: assignments.filter(a => a.status === 'graded').length },
                { id: 'overdue', label: 'متأخرة', count: assignments.filter(a => a.status === 'overdue').length },
                { id: 'all', label: 'الكل', count: assignments.length }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 text-sm font-medium border-b-2 cursor-pointer whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </nav>
          </div>

          {/* Assignments */}
          <div className="p-6">
            {filteredAssignments.length === 0 ? (
              <div className="text-center py-12">
                <i className="ri-task-line text-4xl text-gray-400 mb-4 block"></i>
                <p className="text-gray-600">لا توجد واجبات في هذه الفئة</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredAssignments.map(assignment => (
                  <div key={assignment.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-bold text-gray-800">{assignment.title}</h3>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(assignment.status)}`}>
                            {getStatusText(assignment.status)}
                          </span>
                          {isOverdue(assignment.dueDate) && assignment.status === 'pending' && (
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                              متأخر
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 mb-3">{assignment.description}</p>
                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                          <span className="flex items-center">
                            <i className="ri-book-line mr-1"></i>
                            {assignment.course}
                          </span>
                          <span className="flex items-center">
                            <i className="ri-user-line mr-1"></i>
                            {assignment.teacherName}
                          </span>
                          <span className="flex items-center">
                            <i className="ri-calendar-line mr-1"></i>
                            موعد التسليم: {formatDate(assignment.dueDate)}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        {assignment.grade !== undefined ? (
                          <div className="text-right mb-2">
                            <span className="text-2xl font-bold text-green-600">{assignment.grade}</span>
                            <span className="text-gray-500">/{assignment.maxGrade}</span>
                          </div>
                        ) : (
                          <div className="text-right mb-2">
                            <span className="text-gray-500">من {assignment.maxGrade} درجة</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {assignment.feedback && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                        <h4 className="font-medium text-green-800 mb-2">تعليقات المعلم:</h4>
                        <p className="text-green-700 text-sm">{assignment.feedback}</p>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <i className={`${
                          assignment.submissionType === 'file' ? 'ri-file-line' :
                          assignment.submissionType === 'text' ? 'ri-edit-line' : 'ri-link'
                        }`}></i>
                        <span>
                          نوع التسليم: {
                            assignment.submissionType === 'file' ? 'رفع ملف' :
                            assignment.submissionType === 'text' ? 'كتابة مباشرة' : 'رابط'
                          }
                        </span>
                      </div>

                      <div className="flex space-x-2">
                        {assignment.status === 'pending' && (
                          <button
                            onClick={() => {
                              setSelectedAssignment(assignment);
                              setSubmissionType(assignment.submissionType);
                              setShowSubmissionModal(true);
                            }}
                            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors cursor-pointer whitespace-nowrap"
                          >
                            <i className="ri-upload-line mr-1"></i>
                            تسليم الواجب
                          </button>
                        )}
                        <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer whitespace-nowrap">
                          <i className="ri-eye-line mr-1"></i>
                          عرض التفاصيل
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Submission Modal */}
      {showSubmissionModal && selectedAssignment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">تسليم الواجب</h2>
                <button
                  onClick={() => setShowSubmissionModal(false)}
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  <i className="ri-close-line text-gray-600"></i>
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <h3 className="font-bold text-gray-800 mb-2">{selectedAssignment.title}</h3>
                <p className="text-gray-600 text-sm">{selectedAssignment.description}</p>
                <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                  <span>الدرجة: {selectedAssignment.maxGrade}</span>
                  <span>موعد التسليم: {formatDate(selectedAssignment.dueDate)}</span>
                </div>
              </div>

              {/* Submission Type Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">نوع التسليم</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { type: 'text', label: 'كتابة مباشرة', icon: 'ri-edit-line' },
                    { type: 'file', label: 'رفع ملف', icon: 'ri-file-line' },
                    { type: 'link', label: 'إضافة رابط', icon: 'ri-link' }
                  ].map(option => (
                    <button
                      key={option.type}
                      onClick={() => setSubmissionType(option.type as any)}
                      className={`p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                        submissionType === option.type
                          ? 'border-purple-500 bg-purple-50 text-purple-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <i className={`${option.icon} text-xl mb-2 block`}></i>
                      <span className="text-sm font-medium">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Submission Content */}
              <div className="mb-6">
                {submissionType === 'text' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">المحتوى</label>
                    <textarea
                      value={submissionContent}
                      onChange={(e) => setSubmissionContent(e.target.value)}
                      rows={8}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="اكتب إجابتك هنا..."
                    />
                  </div>
                )}

                {submissionType === 'file' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">اختر الملف</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <input
                        type="file"
                        onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                        className="hidden"
                        id="file-upload"
                      />
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                          <i className="ri-upload-cloud-line text-purple-600 text-xl"></i>
                        </div>
                        <p className="text-gray-600 mb-2">انقر لاختيار ملف أو اسحبه هنا</p>
                        <p className="text-sm text-gray-500">PDF, DOC, DOCX, JPG, PNG (حد أقصى 10MB)</p>
                      </label>
                      {selectedFile && (
                        <div className="mt-4 p-3 bg-purple-50 rounded-lg">
                          <p className="text-purple-800 font-medium">{selectedFile.name}</p>
                          <p className="text-purple-600 text-sm">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {submissionType === 'link' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">الرابط</label>
                    <input
                      type="url"
                      value={submissionContent}
                      onChange={(e) => setSubmissionContent(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="https://example.com"
                    />
                    <p className="text-sm text-gray-500 mt-2">أدخل رابط مشروعك أو عرضك التقديمي</p>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowSubmissionModal(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-400 transition-colors cursor-pointer whitespace-nowrap"
                >
                  إلغاء
                </button>
                <button
                  onClick={handleSubmission}
                  disabled={!submissionContent && !selectedFile}
                  className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors cursor-pointer whitespace-nowrap"
                >
                  تسليم الواجب
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}