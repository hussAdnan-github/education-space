'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Organization {
  id: number;
  name: string;
  type: string;
  location: string;
  manager: string;
  users: number;
  spaces: number;
  revenue: number;
  status: 'active' | 'suspended' | 'pending';
  foundedYear: number;
  email: string;
  phone: string;
  website: string;
  address: string;
  managerEmail: string;
  managerPhone: string;
  employees: number;
  departments: string[];
  activeProjects: number;
  storageUsed: number;
  storageLimit: number;
  securityLevel: string;
  lastBackup: string;
  features: string[];
  customizations: string[];
  satisfactionRating: number;
  supportTickets: number;
  subscriptionPlan: string;
  nextBilling: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  organization: string;
  status: 'active' | 'inactive' | 'suspended';
  lastLogin: string;
  joinDate: string;
  avatar: string;
}

interface Complaint {
  id: number;
  title: string;
  description: string;
  user: string;
  organization: string;
  priority: 'high' | 'medium' | 'low';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  category: string;
  createdAt: string;
  resolvedAt?: string;
  assignedTo?: string;
}

interface FinancialData {
  id: number;
  organization: string;
  plan: string;
  monthlyRevenue: number;
  yearlyRevenue: number;
  paymentStatus: 'paid' | 'pending' | 'overdue';
  nextPayment: string;
  transactions: number;
  lastPayment: string;
}

export default function PlatformAdminPage() {
  const [activeTab, setActiveTab] = useState('financial');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedOrganization, setSelectedOrganization] = useState<Organization | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAddOrganizationModal, setShowAddOrganizationModal] = useState(false);
  const [showEditOrganizationModal, setShowEditOrganizationModal] = useState(false);
  const [showSettingsOrganizationModal, setShowSettingsOrganizationModal] = useState(false);
  const [showCreateOrganizationModal, setShowCreateOrganizationModal] = useState(false);

  const [organizations, setOrganizations] = useState<Organization[]>([
    {
      id: 1,
      name: 'جامعة الملك سعود',
      type: 'جامعة',
      location: 'الرياض',
      manager: 'د. عبدالله أحمد',
      users: 15420,
      spaces: 145,
      revenue: 850000,
      status: 'active',
      foundedYear: 1957,
      email: 'info@ksu.edu.sa',
      phone: '+966-11-4677580',
      website: 'www.ksu.edu.sa',
      address: 'الرياض، المملكة العربية السعودية',
      managerEmail: 'dean@ksu.edu.sa',
      managerPhone: '+966-50-1234567',
      employees: 3200,
      departments: ['كلية الهندسة', 'كلية الطب', 'كلية علوم الحاسب', 'كلية الإدارة'],
      activeProjects: 45,
      storageUsed: 750,
      storageLimit: 1000,
      securityLevel: 'عالي',
      lastBackup: '2024-01-20',
      features: ['البث المباشر', 'المعامل الافتراضية', 'نظام الاختبارات', 'المكتبة الرقمية'],
      customizations: ['الشعار المخصص', 'الألوان المؤسسية', 'القوالب المخصصة'],
      satisfactionRating: 4.8,
      supportTickets: 12,
      subscriptionPlan: 'Enterprise',
      nextBilling: '2024-02-15'
    },
    {
      id: 2,
      name: 'مدارس الفيصلية الأهلية',
      type: 'مدرسة',
      location: 'جدة',
      manager: 'أ. سارة محمد',
      users: 2840,
      spaces: 35,
      revenue: 145000,
      status: 'active',
      foundedYear: 1995,
      email: 'info@faisaliah.edu.sa',
      phone: '+966-12-6543210',
      website: 'www.faisaliah-schools.com',
      address: 'جدة، حي الفيصلية، المملكة العربية السعودية',
      managerEmail: 'principal@faisaliah.edu.sa',
      managerPhone: '+966-55-9876543',
      employees: 185,
      departments: ['المرحلة الابتدائية', 'المرحلة المتوسطة', 'المرحلة الثانوية', 'رياض الأطفال'],
      activeProjects: 12,
      storageUsed: 180,
      storageLimit: 250,
      securityLevel: 'متوسط',
      lastBackup: '2024-01-19',
      features: ['الفصول الافتراضية', 'نظام الدرجات', 'تطبيق أولياء الأمور'],
      customizations: ['التقويم المدرسي', 'نظام الإشعارات'],
      satisfactionRating: 4.5,
      supportTickets: 3,
      subscriptionPlan: 'Professional',
      nextBilling: '2024-02-10'
    },
    {
      id: 3,
      name: 'معهد البحوث التقنية',
      type: 'معهد',
      location: 'الدمام',
      manager: 'د. محمد علي',
      users: 890,
      spaces: 18,
      revenue: 95000,
      status: 'suspended',
      foundedYear: 2010,
      email: 'contact@techresearch.sa',
      phone: '+966-13-8765432',
      website: 'www.tech-research.org',
      address: 'الدمام، المنطقة الشرقية، المملكة العربية السعودية',
      managerEmail: 'director@techresearch.sa',
      managerPhone: '+966-56-1122334',
      employees: 125,
      departments: ['أبحاث الذكاء الاصطناعي', 'هندسة البرمجيات', 'أمن المعلومات'],
      activeProjects: 8,
      storageUsed: 320,
      storageLimit: 500,
      securityLevel: 'عالي جداً',
      lastBackup: '2024-01-18',
      features: ['المختبرات الافتراضية', 'منصة الأبحاث', 'نظام إدارة المشاريع'],
      customizations: ['واجهة الباحثين', 'نظام النشر العلمي'],
      satisfactionRating: 4.2,
      supportTickets: 8,
      subscriptionPlan: 'Research',
      nextBilling: '2024-02-25'
    }
  ]);

  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'أحمد محمد', email: 'ahmed@ksu.edu.sa', role: 'طالب', organization: 'جامعة الملك سعود', status: 'active', lastLogin: '2024-01-20 14:30', joinDate: '2023-09-15', avatar: 'student-male' },
    { id: 2, name: 'فاطمة سالم', email: 'fatima@faisaliah.edu.sa', role: 'معلمة', organization: 'مدارس الفيصلية الأهلية', status: 'active', lastLogin: '2024-01-20 09:15', joinDate: '2022-08-20', avatar: 'teacher-female' },
    { id: 3, name: 'محمد علي', email: 'mohammed@techresearch.sa', role: 'باحث', organization: 'معهد البحوث التقنية', status: 'suspended', lastLogin: '2024-01-15 16:45', joinDate: '2021-03-10', avatar: 'researcher-male' },
    { id: 4, name: 'سارة أحمد', email: 'sara@ksu.edu.sa', role: 'أستاذة', organization: 'جامعة الملك سعود', status: 'active', lastLogin: '2024-01-20 11:20', joinDate: '2020-01-05', avatar: 'professor-female' }
  ]);

  const [complaints, setComplaints] = useState<Complaint[]>([
    { id: 1, title: 'مشكلة في الوصول للمحاضرات', description: 'لا أستطيع الوصول لمحاضرات مادة الرياضيات', user: 'أحمد محمد', organization: 'جامعة الملك سعود', priority: 'high', status: 'open', category: 'تقني', createdAt: '2024-01-20 10:30' },
    { id: 2, title: 'طلب إضافة ميزة جديدة', description: 'نحتاج لإضافة نظام تقييم الطلاب', user: 'سارة محمد', organization: 'مدارس الفيصلية الأهلية', priority: 'medium', status: 'in_progress', category: 'طلب ميزة', createdAt: '2024-01-19 14:15', assignedTo: 'فريق التطوير' },
    { id: 3, title: 'مشكلة في الفوترة', description: 'لم يتم خصم المبلغ الصحيح من الحساب', user: 'محمد علي', organization: 'معهد البحوث التقنية', priority: 'high', status: 'resolved', category: 'مالي', createdAt: '2024-01-18 09:45', resolvedAt: '2024-01-19 15:30' }
  ]);

  const [financialData, setFinancialData] = useState<FinancialData[]>([
    { id: 1, organization: 'جامعة الملك سعود', plan: 'Enterprise', monthlyRevenue: 85000, yearlyRevenue: 850000, paymentStatus: 'paid', nextPayment: '2024-02-15', transactions: 145, lastPayment: '2024-01-15' },
    { id: 2, organization: 'مدارس الفيصلية الأهلية', plan: 'Professional', monthlyRevenue: 14500, yearlyRevenue: 145000, paymentStatus: 'paid', nextPayment: '2024-02-10', transactions: 68, lastPayment: '2024-01-10' },
    { id: 3, organization: 'معهد البحوث التقنية', plan: 'Research', monthlyRevenue: 9500, yearlyRevenue: 95000, paymentStatus: 'overdue', nextPayment: '2024-01-25', transactions: 32, lastPayment: '2023-12-25' }
  ]);

  // ... existing code ...

  const handleViewDetails = (organization: Organization) => {
    setSelectedOrganization(organization);
    setShowDetailsModal(true);
  };

  const handleEditOrganization = (organization: Organization) => {
    setSelectedOrganization(organization);
    setShowEditModal(true);
  };

  const handleToggleStatus = (organization: Organization) => {
    const newStatus = organization.status === 'active' ? 'suspended' : 'active';
    setOrganizations(prev => 
      prev.map(org => 
        org.id === organization.id 
          ? { ...org, status: newStatus }
          : org
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'paid': return 'bg-green-100 text-green-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'open': return 'bg-red-100 text-red-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const [systemSettings, setSystemSettings] = useState({
    maintenanceMode: false,
    newRegistrations: true,
    maxUsersPerOrg: 5000,
    maxSpacesPerOrg: 100,
    backupFrequency: 'daily',
    sessionTimeout: 120,
    maxFileSize: 50,
    emailNotifications: true,
    autoUpdates: true
  });

  const handleAddOrganization = () => {
    // Implementation from original code (adjusted to match new state shape if needed)
    // This placeholder retains original behavior
    alert('Add organization functionality needs to be implemented.');
  };

  const updateSubscriptionLimits = (subscriptionId: string) => {
    // Placeholder from original code
  };

  const getRoleColor = (role: string) => {
    const colors = {
      admin: 'bg-red-100 text-red-800',
      teacher: 'bg-purple-100 text-purple-800',
      student: 'bg-blue-100 text-blue-800'
    };
    return colors[role as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStoragePercentage = (used: number, max: number) => {
    return Math.round((used / max) * 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <i className="ri-dashboard-line text-white text-xl"></i>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">لوحة تحكم المنصة</h1>
                <p className="text-sm text-gray-600">إدارة شاملة للمنصة التعليمية</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-blue-50 px-4 py-2 rounded-lg">
                <span className="text-sm text-blue-800 font-medium">
                  {organizations.filter(org => org.status === 'active').length} مؤسسة نشطة
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
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">إجمالي المؤسسات</p>
                <p className="text-2xl font-bold text-gray-800">{organizations.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <i className="ri-building-2-line text-blue-600 text-xl"></i>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">إجمالي المستخدمين</p>
                <p className="text-2xl font-bold text-green-600">
                  {organizations.reduce((sum, org) => sum + org.users, 0).toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <i className="ri-group-line text-green-600 text-xl"></i>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">الإيرادات الشهرية</p>
                <p className="text-2xl font-bold text-purple-600">
                  {financialData.reduce((sum, data) => sum + data.monthlyRevenue, 0).toLocaleString()} ر.س
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <i className="ri-money-dollar-circle-line text-purple-600 text-xl"></i>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">الشكاوي المفتوحة</p>
                <p className="text-2xl font-bold text-red-600">
                  {complaints.filter(c => c.status === 'open').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <i className="ri-customer-service-line text-red-600 text-xl"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex overflow-x-auto">
              {[
                { id: 'overview', name: 'نظرة عامة', icon: 'ri-dashboard-line' },
                { id: 'organizations', name: 'المؤسسات', icon: 'ri-building-2-line' },
                { id: 'users', name: 'إدارة المستخدمين', icon: 'ri-group-line' },
                { id: 'complaints', name: 'الشكاوي', icon: 'ri-customer-service-line' },
                { id: 'financial', name: 'الشؤون المالية', icon: 'ri-money-dollar-circle-line' },
                { id: 'settings', name: 'إعدادات النظام', icon: 'ri-settings-line' },
                { id: 'security', name: 'الأمان', icon: 'ri-shield-line' },
                { id: 'reports', name: 'التقارير', icon: 'ri-file-chart-line' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 text-sm font-medium border-b-2 cursor-pointer whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-600'
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
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">إحصائيات سريعة</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">المؤسسات النشطة</span>
                    <span className="font-bold text-green-600">
                      {organizations.filter(org => org.status === 'active').length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">المؤسسات المعلقة</span>
                    <span className="font-bold text-red-600">
                      {organizations.filter(org => org.status === 'suspended').length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">متوسط المستخدمين</span>
                    <span className="font-bold text-blue-600">
                      {Math.round(organizations.reduce((sum, org) => sum + org.users, 0) / organizations.length)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">آخر الأنشطة</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <i className="ri-user-add-line text-blue-600"></i>
                    <div>
                      <p className="text-sm font-medium">مستخدم جديد انضم</p>
                      <p className="text-xs text-gray-500">منذ 5 دقائق</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <i className="ri-money-dollar-circle-line text-green-600"></i>
                    <div>
                      <p className="text-sm font-medium">دفعة جديدة تم استلامها</p>
                      <p className="text-xs text-gray-500">منذ ساعة</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Organizations Tab */}
          {activeTab === 'organizations' && (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-800">قائمة المؤسسات</h3>
                  <button 
                    onClick={() => setShowCreateModal(true)}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <i className="ri-add-line mr-2"></i>
                    إضافة مؤسسة
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-right text-sm font-medium text-gray-900">المؤسسة</th>
                      <th className="px-6 py-4 text-right text-sm font-medium text-gray-900">النوع</th>
                      <th className="px-6 py-4 text-right text-sm font-medium text-gray-900">الموقع</th>
                      <th className="px-6 py-4 text-right text-sm font-medium text-gray-900">المدير</th>
                      <th className="px-6 py-4 text-right text-sm font-medium text-gray-900">المستخدمين</th>
                      <th className="px-6 py-4 text-right text-sm font-medium text-gray-900">المساحات</th>
                      <th className="px-6 py-4 text-right text-sm font-medium text-gray-900">الإيراد</th>
                      <th className="px-6 py-4 text-right text-sm font-medium text-gray-900">الحالة</th>
                      <th className="px-6 py-4 text-right text-sm font-medium text-gray-900">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {organizations.map((org) => (
                      <tr key={org.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{org.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{org.type}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{org.location}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{org.manager}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{org.users.toLocaleString()}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{org.spaces}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{org.revenue.toLocaleString()} ر.س</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(org.status)}`}>
                            {org.status === 'active' ? 'نشط' : org.status === 'suspended' ? 'معلق' : 'معلق'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <button 
                              onClick={() => handleViewDetails(org)}
                              className="text-blue-600 hover:text-blue-800 cursor-pointer" 
                              title="عرض التفاصيل"
                            >
                              <i className="ri-eye-line"></i>
                            </button>
                            <button 
                              onClick={() => handleEditOrganization(org)}
                              className="text-green-600 hover:text-green-800 cursor-pointer" 
                              title="تعديل"
                            >
                              <i className="ri-edit-line"></i>
                            </button>
                            <button 
                              onClick={() => setShowSettingsModal(true)}
                              className="text-purple-600 hover:text-purple-800 cursor-pointer" 
                              title="الإعدادات"
                            >
                              <i className="ri-settings-line"></i>
                            </button>
                            <button 
                              onClick={() => handleToggleStatus(org)}
                              className="text-orange-600 hover:text-orange-800 cursor-pointer" 
                              title={org.status === 'active' ? 'تعليق' : 'تفعيل'}
                            >
                              <i className={org.status === 'active' ? 'ri-pause-line' : 'ri-play-line'}></i>
                            </button>
                            <div className="relative group">
                              <button className="text-gray-600 hover:text-gray-800 cursor-pointer" title="المزيد">
                                <i className="ri-more-2-line"></i>
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-bold text-gray-800">إدارة المستخدمين</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-right text-sm font-medium text-gray-900">المستخدم</th>
                      <th className="px-6 py-4 text-right text-sm font-medium text-gray-900">البريد الإلكتروني</th>
                      <th className="px-6 py-4 text-right text-sm font-medium text-gray-900">الدور</th>
                      <th className="px-6 py-4 text-right text-sm font-medium text-gray-900">المؤسسة</th>
                      <th className="px-6 py-4 text-right text-sm font-medium text-gray-900">آخر دخول</th>
                      <th className="px-6 py-4 text-right text-sm font-medium text-gray-900">الحالة</th>
                      <th className="px-6 py-4 text-right text-sm font-medium text-gray-900">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <i className="ri-user-line text-blue-600"></i>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{user.name}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{user.email}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{user.role}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{user.organization}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{user.lastLogin}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(user.status)}`}>
                            {user.status === 'active' ? 'نشط' : user.status === 'suspended' ? 'معلق' : 'غير نشط'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <button className="text-blue-600 hover:text-blue-800 cursor-pointer" title="عرض الملف">
                              <i className="ri-user-line"></i>
                            </button>
                            <button className="text-green-600 hover:text-green-800 cursor-pointer" title="تعديل">
                              <i className="ri-edit-line"></i>
                            </button>
                            <button className="text-red-600 hover:text-red-800 cursor-pointer" title="حذف">
                              <i className="ri-delete-bin-line"></i>
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

          {/* Complaints Tab */}
          {activeTab === 'complaints' && (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-bold text-gray-800">إدارة الشكاوي</h3>
              </div>
              <div className="p-6 space-y-4">
                {complaints.map((complaint) => (
                  <div key={complaint.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-800">{complaint.title}</h4>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          complaint.priority === 'high' ? 'bg-red-100 text-red-800' :
                          complaint.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {complaint.priority === 'high' ? 'عالية' : complaint.priority === 'medium' ? 'متوسطة' : 'منخفضة'}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(complaint.status)}`}>
                          {complaint.status === 'open' ? 'مفتوح' : 
                           complaint.status === 'in_progress' ? 'قيد المعالجة' :
                           complaint.status === 'resolved' ? 'محلول' : 'مغلق'}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{complaint.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div>
                        <span>{complaint.user} - {complaint.organization}</span>
                      </div>
                      <div>
                        <span>{complaint.createdAt}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Financial Tab */}
          {activeTab === 'financial' && (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-bold text-gray-800">الشؤون المالية</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-right text-sm font-medium text-gray-900">المؤسسة</th>
                      <th className="px-6 py-4 text-right text-sm font-medium text-gray-900">الخطة</th>
                      <th className="px-6 py-4 text-right text-sm font-medium text-gray-900">الإيراد الشهري</th>
                      <th className="px-6 py-4 text-right text-sm font-medium text-gray-900">الإيراد السنوي</th>
                      <th className="px-6 py-4 text-right text-sm font-medium text-gray-900">حالة الدفع</th>
                      <th className="px-6 py-4 text-right text-sm font-medium text-gray-900">الدفعة القادمة</th>
                      <th className="px-6 py-4 text-right text-sm font-medium text-gray-900">المعاملات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {financialData.map((data) => (
                      <tr key={data.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{data.organization}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{data.plan}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{data.monthlyRevenue.toLocaleString()} ر.س</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{data.yearlyRevenue.toLocaleString()} ر.س</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(data.paymentStatus)}`}>
                            {data.paymentStatus === 'paid' ? 'مدفوع' : data.paymentStatus === 'pending' ? 'معلق' : 'متأخر'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{data.nextPayment}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{data.transactions}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-6">إعدادات النظام</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-800">إعدادات عامة</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">تفعيل التسجيل الجديد</span>
                      <input type="checkbox" className="w-4 h-4 text-purple-600" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">إرسال إشعارات البريد الإلكتروني</span>
                      <input type="checkbox" className="w-4 h-4 text-purple-600" defaultChecked />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-800">إعدادات الأمان</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">المصادقة الثنائية</span>
                      <input type="checkbox" className="w-4 h-4 text-purple-600" />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">تسجيل العمليات</span>
                      <input type="checkbox" className="w-4 h-4 text-purple-600" defaultChecked />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-6">الأمان والحماية</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-3 mb-2">
                    <i className="ri-shield-check-line text-green-600 text-xl"></i>
                    <span className="font-medium text-green-800">مستوى الأمان: عالي</span>
                  </div>
                  <p className="text-sm text-green-600">جميع الأنظمة محمية</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-3 mb-2">
                    <i className="ri-database-2-line text-blue-600 text-xl"></i>
                    <span className="font-medium text-blue-800">النسخ الاحتياطي</span>
                  </div>
                  <p className="text-sm text-blue-600">آخر نسخة: اليوم 03:00</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-3 mb-2">
                    <i className="ri-alert-line text-yellow-600 text-xl"></i>
                    <span className="font-medium text-yellow-800">تحديثات الأمان</span>
                  </div>
                  <p className="text-sm text-yellow-600">3 تحديثات متاحة</p>
                </div>
              </div>
            </div>
          )}

          {/* Reports Tab */}
          {activeTab === 'reports' && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-6">التقارير والإحصائيات</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-800 mb-4">تقارير الاستخدام</h4>
                  <div className="space-y-3">
                    <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap">
                      <i className="ri-file-chart-line mr-2"></i>
                      تقرير شهري شامل
                    </button>
                    <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors cursor-pointer whitespace-nowrap">
                      <i className="ri-bar-chart-box-line mr-2"></i>
                      إحصائيات المستخدمين
                    </button>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-4">التقارير المالية</h4>
                  <div className="space-y-3">
                    <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors cursor-pointer whitespace-nowrap">
                      <i className="ri-money-dollar-circle-line mr-2"></i>
                      تقرير الإيرادات
                    </button>
                    <button className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors cursor-pointer whitespace-nowrap">
                      <i className="ri-file-excel-line mr-2"></i>
                      تصدير البيانات
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedOrganization && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">تفاصيل المؤسسة</h2>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  <i className="ri-close-line text-gray-600"></i>
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Quick Stats */}
              <div className="grid md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-600">{selectedOrganization.users.toLocaleString()}</div>
                  <div className="text-sm text-blue-700">إجمالي المستخدمين</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600">{selectedOrganization.spaces}</div>
                  <div className="text-sm text-green-700">المساحات النشطة</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-purple-600">{selectedOrganization.revenue.toLocaleString()}</div>
                  <div className="text-sm text-purple-700">الإيرادات الشهرية</div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-yellow-600">{selectedOrganization.satisfactionRating}/5</div>
                  <div className="text-sm text-yellow-700">تقييم الرضا</div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-gray-800">المعلومات الأساسية</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">اسم المؤسسة:</span>
                      <span className="font-medium">{selectedOrganization.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">النوع:</span>
                      <span className="font-medium">{selectedOrganization.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">سنة التأسيس:</span>
                      <span className="font-medium">{selectedOrganization.foundedYear}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">الموقع:</span>
                      <span className="font-medium">{selectedOrganization.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">الموقع الإلكتروني:</span>
                      <span className="font-medium text-blue-600">{selectedOrganization.website}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">العنوان:</span>
                      <span className="font-medium">{selectedOrganization.address}</span>
                    </div>
                  </div>

                  <h4 className="text-md font-bold text-gray-800 mt-6">معلومات المدير</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">الاسم:</span>
                      <span className="font-medium">{selectedOrganization.manager}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">البريد الإلكتروني:</span>
                      <span className="font-medium">{selectedOrganization.managerEmail}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">الهاتف:</span>
                      <span className="font-medium">{selectedOrganization.managerPhone}</span>
                    </div>
                  </div>
                </div>

                {/* Additional Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-gray-800">الإحصائيات التفصيلية</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">عدد الموظفين:</span>
                      <span className="font-medium">{selectedOrganization.employees}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">المشاريع النشطة:</span>
                      <span className="font-medium">{selectedOrganization.activeProjects}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">تذاكر الدعم:</span>
                      <span className="font-medium">{selectedOrganization.supportTickets}</span>
                    </div>
                  </div>

                  <h4 className="text-md font-bold text-gray-800 mt-6">الأقسام</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedOrganization.departments.map((dept, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                        {dept}
                      </span>
                    ))}
                  </div>

                  <h4 className="text-md font-bold text-gray-800 mt-6">المميزات المفعلة</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedOrganization.features.map((feature, index) => (
                      <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Storage Usage */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-3">استخدام التخزين</h4>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">المستخدم</span>
                  <span className="text-sm font-medium">{selectedOrganization.storageUsed}GB / {selectedOrganization.storageLimit}GB</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${(selectedOrganization.storageUsed / selectedOrganization.storageLimit) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 flex space-x-3">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap">
                  <i className="ri-mail-line mr-2"></i>
                  إرسال رسالة
                </button>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors cursor-pointer whitespace-nowrap">
                  <i className="ri-download-line mr-2"></i>
                  تصدير البيانات
                </button>
                <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors cursor-pointer whitespace-nowrap">
                  <i className="ri-key-line mr-2"></i>
                  إعادة تعيين كلمة المرور
                </button>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors cursor-pointer whitespace-nowrap">
                  <i className="ri-vip-crown-line mr-2"></i>
                  ترقية الاشتراك
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
