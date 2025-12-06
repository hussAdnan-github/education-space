'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'todo' | 'in_progress' | 'review' | 'completed';
  assignedTo: TeamMember[];
  createdBy: string;
  dueDate: string;
  category: string;
  tags: string[];
  attachments: number;
  comments: number;
  progress: number;
  estimatedHours: number;
  actualHours?: number;
  department: string;
}

interface TeamMember {
  id: string;
  name: string;
  avatar: string;
  role: string;
  department: string;
  status: 'online' | 'offline' | 'busy' | 'away';
}

export default function VirtualOfficeTasksPage() {
  const [activeView, setActiveView] = useState<'board' | 'list' | 'calendar' | 'analytics'>('board');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [selectedAssignee, setSelectedAssignee] = useState<string>('all');
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const teamMembers: TeamMember[] = [
    { id: '1', name: 'أحمد محمد', avatar: 'manager', role: 'مدير المشروع', department: 'الإدارة', status: 'online' },
    { id: '2', name: 'فاطمة أحمد', avatar: 'developer', role: 'مطور ويب', department: 'التطوير', status: 'online' },
    { id: '3', name: 'محمد علي', avatar: 'designer', role: 'مصمم جرافيك', department: 'التصميم', status: 'busy' },
    { id: '4', name: 'سارة خالد', avatar: 'analyst', role: 'محلل بيانات', department: 'التحليل', status: 'away' },
    { id: '5', name: 'عمر حسن', avatar: 'tester', role: 'مختبر جودة', department: 'الجودة', status: 'online' },
    { id: '6', name: 'نورا سالم', avatar: 'marketing', role: 'أخصائي تسويق', department: 'التسويق', status: 'offline' }
  ];

  const tasks: Task[] = [
    {
      id: '1',
      title: 'تطوير نظام إدارة المحتوى',
      description: 'إنشاء نظام شامل لإدارة المحتوى الرقمي مع واجهة سهلة الاستخدام',
      priority: 'high',
      status: 'in_progress',
      assignedTo: [teamMembers[1], teamMembers[4]],
      createdBy: 'أحمد محمد',
      dueDate: '2024-02-20T23:59:00',
      category: 'تطوير',
      tags: ['نظام', 'محتوى', 'واجهة'],
      attachments: 3,
      comments: 8,
      progress: 65,
      estimatedHours: 40,
      actualHours: 26,
      department: 'التطوير'
    },
    {
      id: '2',
      title: 'تصميم الهوية البصرية الجديدة',
      description: 'إعداد دليل الهوية البصرية الشامل للشركة مع جميع العناصر التصميمية',
      priority: 'medium',
      status: 'review',
      assignedTo: [teamMembers[2]],
      createdBy: 'سارة خالد',
      dueDate: '2024-02-15T17:00:00',
      category: 'تصميم',
      tags: ['هوية', 'تصميم', 'علامة تجارية'],
      attachments: 12,
      comments: 15,
      progress: 90,
      estimatedHours: 25,
      actualHours: 23,
      department: 'التصميم'
    },
    {
      id: '3',
      title: 'تحليل بيانات العملاء الشهرية',
      description: 'إعداد تقرير شامل عن سلوك العملاء واتجاهات السوق للشهر الماضي',
      priority: 'high',
      status: 'todo',
      assignedTo: [teamMembers[3]],
      createdBy: 'فاطمة أحمد',
      dueDate: '2024-02-12T15:00:00',
      category: 'تحليل',
      tags: ['بيانات', 'عملاء', 'تقرير'],
      attachments: 5,
      comments: 3,
      progress: 0,
      estimatedHours: 16,
      department: 'التحليل'
    },
    {
      id: '4',
      title: 'اختبار التطبيق المحمول',
      description: 'إجراء اختبارات شاملة لجميع وظائف التطبيق وإعداد تقرير الأخطاء',
      priority: 'urgent',
      status: 'in_progress',
      assignedTo: [teamMembers[4], teamMembers[1]],
      createdBy: 'محمد علي',
      dueDate: '2024-02-10T18:00:00',
      category: 'جودة',
      tags: ['اختبار', 'تطبيق', 'أخطاء'],
      attachments: 7,
      comments: 12,
      progress: 40,
      estimatedHours: 20,
      actualHours: 8,
      department: 'الجودة'
    },
    {
      id: '5',
      title: 'حملة التسويق الرقمي الجديدة',
      description: 'إعداد وتنفيذ حملة تسويقية شاملة عبر جميع منصات التواصل الاجتماعي',
      priority: 'medium',
      status: 'completed',
      assignedTo: [teamMembers[5]],
      createdBy: 'نورا سالم',
      dueDate: '2024-02-05T16:00:00',
      category: 'تسويق',
      tags: ['حملة', 'تسويق', 'وسائل اجتماعية'],
      attachments: 15,
      comments: 20,
      progress: 100,
      estimatedHours: 30,
      actualHours: 28,
      department: 'التسويق'
    }
  ];

  const departments = ['الإدارة', 'التطوير', 'التصميم', 'التحليل', 'الجودة', 'التسويق'];
  const categories = ['تطوير', 'تصميم', 'تحليل', 'جودة', 'تسويق', 'إدارة'];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'todo': return 'bg-gray-100 text-gray-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'review': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'todo': return 'للقيام';
      case 'in_progress': return 'قيد التنفيذ';
      case 'review': return 'للمراجعة';
      case 'completed': return 'مكتمل';
      default: return 'غير محدد';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'low': return 'منخفضة';
      case 'medium': return 'متوسطة';
      case 'high': return 'عالية';
      case 'urgent': return 'عاجلة';
      default: return 'غير محدد';
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = selectedPriority === 'all' || task.priority === selectedPriority;
    const matchesDepartment = selectedDepartment === 'all' || task.department === selectedDepartment;
    const matchesAssignee = selectedAssignee === 'all' || 
                           task.assignedTo.some(member => member.id === selectedAssignee);
    
    return matchesSearch && matchesPriority && matchesDepartment && matchesAssignee;
  });

  const getTasksByStatus = (status: string) => {
    return filteredTasks.filter(task => task.status === status);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-SA', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getAvatarColor = (role: string) => {
    switch (role) {
      case 'مدير المشروع': return 'from-purple-500 to-indigo-600';
      case 'مطور ويب': return 'from-blue-500 to-cyan-600';
      case 'مصمم جرافيك': return 'from-pink-500 to-rose-600';
      case 'محلل بيانات': return 'from-green-500 to-emerald-600';
      case 'مختبر جودة': return 'from-orange-500 to-red-600';
      case 'أخصائي تسويق': return 'from-teal-500 to-blue-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const isOverdue = (dueDate: string) => {
    return new Date() > new Date(dueDate);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <i className="ri-task-line text-white text-xl"></i>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">إدارة مهام المكتب الافتراضي</h1>
                <p className="text-sm text-gray-600">تنظيم وتتبع مهام فريق العمل</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowTaskModal(true)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-add-line mr-2"></i>
                مهمة جديدة
              </button>
              <Link href="/dashboard" className="text-gray-600 hover:text-gray-800 cursor-pointer">
                العودة
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <i className="ri-file-list-3-line text-blue-600 text-xl"></i>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{tasks.length}</p>
                <p className="text-sm text-gray-600">إجمالي المهام</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <i className="ri-time-line text-yellow-600 text-xl"></i>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{tasks.filter(t => t.status === 'todo').length}</p>
                <p className="text-sm text-gray-600">مهام معلقة</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <i className="ri-play-line text-indigo-600 text-xl"></i>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{tasks.filter(t => t.status === 'in_progress').length}</p>
                <p className="text-sm text-gray-600">قيد التنفيذ</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <i className="ri-eye-line text-purple-600 text-xl"></i>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{tasks.filter(t => t.status === 'review').length}</p>
                <p className="text-sm text-gray-600">للمراجعة</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <i className="ri-check-line text-green-600 text-xl"></i>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{tasks.filter(t => t.status === 'completed').length}</p>
                <p className="text-sm text-gray-600">مكتملة</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
            <div className="lg:col-span-2">
              <div className="relative">
                <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  placeholder="البحث في المهام..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>

            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 pr-8"
            >
              <option value="all">جميع الأولويات</option>
              <option value="urgent">عاجلة</option>
              <option value="high">عالية</option>
              <option value="medium">متوسطة</option>
              <option value="low">منخفضة</option>
            </select>

            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 pr-8"
            >
              <option value="all">جميع الأقسام</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>

            <select
              value={selectedAssignee}
              onChange={(e) => setSelectedAssignee(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 pr-8"
            >
              <option value="all">جميع الموظفين</option>
              {teamMembers.map(member => (
                <option key={member.id} value={member.id}>{member.name}</option>
              ))}
            </select>

            <div className="flex bg-gray-100 rounded-lg p-1">
              {[
                { id: 'board', icon: 'ri-layout-grid-line', label: 'لوحة' },
                { id: 'list', icon: 'ri-list-check-2', label: 'قائمة' }
              ].map(view => (
                <button
                  key={view.id}
                  onClick={() => setActiveView(view.id as any)}
                  className={`flex-1 flex items-center justify-center py-2 px-3 rounded-md text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    activeView === view.id
                      ? 'bg-white text-indigo-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <i className={`${view.icon} text-sm mr-1`}></i>
                  {view.label}
                </button>
              ))}
            </div>
          </div>

          {/* Team Members Online */}
          <div className="flex items-center justify-between border-t pt-4">
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-gray-700">الفريق متصل:</span>
              <div className="flex space-x-2">
                {teamMembers.filter(m => m.status === 'online').map(member => (
                  <div key={member.id} className="relative">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${getAvatarColor(member.role)} flex items-center justify-center text-white text-xs font-medium`}>
                      {member.name.charAt(0)}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="text-sm text-gray-600">
              {teamMembers.filter(m => m.status === 'online').length}/{teamMembers.length} متصل
            </div>
          </div>
        </div>

        {/* Board View */}
        {activeView === 'board' && (
          <div className="grid lg:grid-cols-4 gap-6">
            {[
              { status: 'todo', title: 'للقيام', color: 'border-gray-300', bgColor: 'bg-gray-50' },
              { status: 'in_progress', title: 'قيد التنفيذ', color: 'border-blue-300', bgColor: 'bg-blue-50' },
              { status: 'review', title: 'للمراجعة', color: 'border-purple-300', bgColor: 'bg-purple-50' },
              { status: 'completed', title: 'مكتمل', color: 'border-green-300', bgColor: 'bg-green-50' }
            ].map(column => (
              <div key={column.status} className={`bg-white rounded-xl shadow-sm border-t-4 ${column.color}`}>
                <div className={`${column.bgColor} p-4 rounded-t-xl border-b`}>
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-gray-800">{column.title}</h3>
                    <span className="bg-white px-2 py-1 rounded-full text-sm font-medium text-gray-600">
                      {getTasksByStatus(column.status).length}
                    </span>
                  </div>
                </div>
                
                <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
                  {getTasksByStatus(column.status).map(task => (
                    <div
                      key={task.id}
                      onClick={() => setSelectedTask(task)}
                      className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-medium text-gray-800 text-sm leading-tight">{task.title}</h4>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(task.priority)}`}>
                          {getPriorityText(task.priority)}
                        </span>
                      </div>
                      
                      <p className="text-xs text-gray-600 mb-3 line-clamp-2">{task.description}</p>
                      
                      {task.progress > 0 && (
                        <div className="mb-3">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-gray-600">التقدم</span>
                            <span className="font-medium text-gray-800">{task.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-indigo-600 h-2 rounded-full transition-all"
                              style={{ width: `${task.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="flex -space-x-1">
                            {task.assignedTo.slice(0, 2).map(member => (
                              <div
                                key={member.id}
                                className={`w-6 h-6 rounded-full bg-gradient-to-br ${getAvatarColor(member.role)} flex items-center justify-center text-white text-xs border-2 border-white`}
                              >
                                {member.name.charAt(0)}
                              </div>
                            ))}
                            {task.assignedTo.length > 2 && (
                              <div className="w-6 h-6 rounded-full bg-gray-400 flex items-center justify-center text-white text-xs border-2 border-white">
                                +{task.assignedTo.length - 2}
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3 text-xs text-gray-500">
                          {task.comments > 0 && (
                            <span className="flex items-center">
                              <i className="ri-chat-3-line mr-1"></i>
                              {task.comments}
                            </span>
                          )}
                          {task.attachments > 0 && (
                            <span className="flex items-center">
                              <i className="ri-attachment-2 mr-1"></i>
                              {task.attachments}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <div className="flex items-center justify-between text-xs">
                          <span className={`text-gray-600 ${isOverdue(task.dueDate) ? 'text-red-600' : ''}`}>
                            <i className="ri-calendar-line mr-1"></i>
                            {formatDate(task.dueDate)}
                          </span>
                          <span className="text-gray-500">{task.department}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* List View */}
        {activeView === 'list' && (
          <div className="bg-white rounded-xl shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-right py-4 px-6 text-sm font-medium text-gray-700">المهمة</th>
                    <th className="text-right py-4 px-6 text-sm font-medium text-gray-700">الأولوية</th>
                    <th className="text-right py-4 px-6 text-sm font-medium text-gray-700">الحالة</th>
                    <th className="text-right py-4 px-6 text-sm font-medium text-gray-700">المعين إليه</th>
                    <th className="text-right py-4 px-6 text-sm font-medium text-gray-700">موعد الانتهاء</th>
                    <th className="text-right py-4 px-6 text-sm font-medium text-gray-700">التقدم</th>
                    <th className="text-right py-4 px-6 text-sm font-medium text-gray-700">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredTasks.map(task => (
                    <tr key={task.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6">
                        <div>
                          <h4 className="font-medium text-gray-800">{task.title}</h4>
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{task.description}</p>
                          <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                            <span>{task.department}</span>
                            {task.comments > 0 && (
                              <span className="flex items-center">
                                <i className="ri-chat-3-line mr-1"></i>
                                {task.comments}
                              </span>
                            )}
                            {task.attachments > 0 && (
                              <span className="flex items-center">
                                <i className="ri-attachment-2 mr-1"></i>
                                {task.attachments}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(task.priority)}`}>
                          {getPriorityText(task.priority)}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(task.status)}`}>
                          {getStatusText(task.status)}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex -space-x-1">
                          {task.assignedTo.slice(0, 3).map(member => (
                            <div
                              key={member.id}
                              className={`w-8 h-8 rounded-full bg-gradient-to-br ${getAvatarColor(member.role)} flex items-center justify-center text-white text-xs border-2 border-white`}
                              title={member.name}
                            >
                              {member.name.charAt(0)}
                            </div>
                          ))}
                          {task.assignedTo.length > 3 && (
                            <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white text-xs border-2 border-white">
                              +{task.assignedTo.length - 3}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`text-sm ${isOverdue(task.dueDate) ? 'text-red-600 font-medium' : 'text-gray-600'}`}>
                          {formatDate(task.dueDate)}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-indigo-600 h-2 rounded-full"
                              style={{ width: `${task.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-700 min-w-0">
                            {task.progress}%
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setSelectedTask(task)}
                            className="w-8 h-8 bg-blue-100 hover:bg-blue-200 rounded-lg flex items-center justify-center text-blue-600 transition-colors cursor-pointer"
                          >
                            <i className="ri-eye-line text-sm"></i>
                          </button>
                          <button className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center text-gray-600 transition-colors cursor-pointer">
                            <i className="ri-edit-line text-sm"></i>
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
      </div>

      {/* Task Details Modal */}
      {selectedTask && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${getPriorityColor(selectedTask.priority)}`}>
                    {getPriorityText(selectedTask.priority)}
                  </span>
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(selectedTask.status)}`}>
                    {getStatusText(selectedTask.status)}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedTask(null)}
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  <i className="ri-close-line text-gray-600"></i>
                </button>
              </div>
            </div>

            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{selectedTask.title}</h2>
              <p className="text-gray-600 mb-6">{selectedTask.description}</p>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-gray-800 mb-3">معلومات المهمة</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">القسم:</span>
                        <span className="font-medium">{selectedTask.department}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">الفئة:</span>
                        <span className="font-medium">{selectedTask.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">الساعات المقدرة:</span>
                        <span className="font-medium">{selectedTask.estimatedHours} ساعة</span>
                      </div>
                      {selectedTask.actualHours && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">الساعات الفعلية:</span>
                          <span className="font-medium">{selectedTask.actualHours} ساعة</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-gray-600">موعد الانتهاء:</span>
                        <span className={`font-medium ${isOverdue(selectedTask.dueDate) ? 'text-red-600' : ''}`}>
                          {formatDate(selectedTask.dueDate)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-800 mb-3">التقدم</h3>
                    <div className="bg-gray-200 rounded-full h-3 mb-2">
                      <div 
                        className="bg-indigo-600 h-3 rounded-full transition-all"
                        style={{ width: `${selectedTask.progress}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-gray-600">{selectedTask.progress}% مكتمل</div>
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-800 mb-3">العلامات</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedTask.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-gray-800 mb-3">فريق العمل</h3>
                    <div className="space-y-3">
                      {selectedTask.assignedTo.map(member => (
                        <div key={member.id} className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${getAvatarColor(member.role)} flex items-center justify-center text-white`}>
                            {member.name.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-gray-800">{member.name}</div>
                            <div className="text-sm text-gray-600">{member.role}</div>
                          </div>
                          <div className={`w-3 h-3 rounded-full ${
                            member.status === 'online' ? 'bg-green-500' :
                            member.status === 'busy' ? 'bg-red-500' :
                            member.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                          }`}></div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-800 mb-3">الإحصائيات</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-blue-600">{selectedTask.comments}</div>
                        <div className="text-sm text-blue-800">تعليقات</div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-green-600">{selectedTask.attachments}</div>
                        <div className="text-sm text-green-800">مرفقات</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex space-x-4">
                  <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer whitespace-nowrap">
                    <i className="ri-edit-line mr-2"></i>
                    تعديل المهمة
                  </button>
                  <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors cursor-pointer whitespace-nowrap">
                    <i className="ri-check-line mr-2"></i>
                    تحديث الحالة
                  </button>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap">
                    <i className="ri-chat-3-line mr-2"></i>
                    إضافة تعليق
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Task Modal */}
      {showTaskModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">إنشاء مهمة جديدة</h2>
                <button
                  onClick={() => setShowTaskModal(false)}
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  <i className="ri-close-line text-gray-600"></i>
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">عنوان المهمة *</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="أدخل عنوان المهمة"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">الأولوية *</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 pr-8">
                      <option value="low">منخفضة</option>
                      <option value="medium">متوسطة</option>
                      <option value="high">عالية</option>
                      <option value="urgent">عاجلة</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">وصف المهمة</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="أدخل وصف تفصيلي للمهمة"
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">القسم</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 pr-8">
                      {departments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">الفئة</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 pr-8">
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">الساعات المقدرة</label>
                    <input
                      type="number"
                      min="1"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">موعد الانتهاء *</label>
                    <input
                      type="datetime-local"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">تعيين إلى</label>
                    <select multiple className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 h-32">
                      {teamMembers.map(member => (
                        <option key={member.id} value={member.id}>{member.name} - {member.role}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">العلامات</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="أدخل العلامات مفصولة بفواصل"
                  />
                </div>
              </div>

              <div className="mt-8 flex space-x-4">
                <button
                  onClick={() => setShowTaskModal(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-400 transition-colors cursor-pointer whitespace-nowrap"
                >
                  إلغاء
                </button>
                <button className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors cursor-pointer whitespace-nowrap">
                  إنشاء المهمة
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}