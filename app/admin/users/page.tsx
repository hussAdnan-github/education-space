'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function UsersManagementPage() {
  const [users, setUsers] = useState([
    { id: 1, name: 'أحمد محمد', email: 'ahmed@example.com', role: 'student', status: 'active', joinDate: '2024-01-15', lastLogin: '2024-01-20', avatar: 'student-male' },
    { id: 2, name: 'فاطمة أحمد', email: 'fatima@example.com', role: 'teacher', status: 'active', joinDate: '2024-01-10', lastLogin: '2024-01-19', avatar: 'teacher-female' },
    { id: 3, name: 'د. محمد علي', email: 'dr.mohamed@example.com', role: 'admin', status: 'active', joinDate: '2024-01-05', lastLogin: '2024-01-20', avatar: 'teacher-male' },
    { id: 4, name: 'سارة خالد', email: 'sara@example.com', role: 'student', status: 'inactive', joinDate: '2024-01-12', lastLogin: '2024-01-18', avatar: 'student-female' },
    { id: 5, name: 'عمر حسن', email: 'omar@example.com', role: 'employee', status: 'active', joinDate: '2024-01-08', lastLogin: '2024-01-20', avatar: 'employee' }
  ]);

  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);

  const roles = [
    { id: 'all', name: 'جميع الأدوار' },
    { id: 'student', name: 'طالب', color: 'bg-blue-100 text-blue-800' },
    { id: 'teacher', name: 'معلم', color: 'bg-purple-100 text-purple-800' },
    { id: 'admin', name: 'مدير', color: 'bg-red-100 text-red-800' },
    { id: 'employee', name: 'موظف', color: 'bg-green-100 text-green-800' },
    { id: 'visitor', name: 'زائر', color: 'bg-gray-100 text-gray-800' }
  ];

  const permissions = {
    student: ['view_content', 'submit_assignments', 'join_rooms'],
    teacher: ['view_content', 'create_assignments', 'manage_rooms', 'grade_assignments'],
    admin: ['full_access', 'manage_users', 'system_settings'],
    employee: ['view_content', 'join_meetings', 'access_tools'],
    visitor: ['view_content', 'limited_access']
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleSelectUser = (userId: number) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    setSelectedUsers(
      selectedUsers.length === filteredUsers.length 
        ? [] 
        : filteredUsers.map(user => user.id)
    );
  };

  const handleDeleteUsers = () => {
    if (confirm(`هل أنت متأكد من حذف ${selectedUsers.length} مستخدم؟`)) {
      setUsers(prev => prev.filter(user => !selectedUsers.includes(user.id)));
      setSelectedUsers([]);
    }
  };

  const handleStatusChange = (status: string) => {
    setUsers(prev => prev.map(user => 
      selectedUsers.includes(user.id) ? { ...user, status } : user
    ));
    setSelectedUsers([]);
  };

  const getRoleInfo = (roleId: string) => {
    return roles.find(role => role.id === roleId) || roles[0];
  };

  const getAvatarIcon = (avatar: string) => {
    const avatarMap: { [key: string]: string } = {
      'student-male': 'ri-user-3-line',
      'student-female': 'ri-user-2-line',
      'teacher-male': 'ri-user-star-line',
      'teacher-female': 'ri-user-heart-line',
      'admin': 'ri-admin-line',
      'employee': 'ri-briefcase-line'
    };
    return avatarMap[avatar] || 'ri-user-line';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/dashboard" className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <i className="ri-building-line text-white text-xl"></i>
              </Link>
              <h1 className="text-2xl font-bold text-gray-800">إدارة المستخدمين</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowUserModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-user-add-line mr-2"></i>
                إضافة مستخدم
              </button>
              <Link href="/dashboard" className="text-gray-600 hover:text-gray-800 cursor-pointer">
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
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">إجمالي المستخدمين</p>
                <p className="text-2xl font-bold text-gray-800">{users.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <i className="ri-group-line text-blue-600 text-xl"></i>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">المستخدمون النشطون</p>
                <p className="text-2xl font-bold text-green-600">{users.filter(u => u.status === 'active').length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <i className="ri-user-line text-green-600 text-xl"></i>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">المعلمون</p>
                <p className="text-2xl font-bold text-purple-600">{users.filter(u => u.role === 'teacher').length}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <i className="ri-user-star-line text-purple-600 text-xl"></i>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">الطلاب</p>
                <p className="text-2xl font-bold text-blue-600">{users.filter(u => u.role === 'student').length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <i className="ri-graduation-cap-line text-blue-600 text-xl"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <div className="relative">
                <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  placeholder="البحث عن مستخدم..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
              >
                {roles.map(role => (
                  <option key={role.id} value={role.id}>{role.name}</option>
                ))}
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
              >
                <option value="all">جميع الحالات</option>
                <option value="active">نشط</option>
                <option value="inactive">غير نشط</option>
              </select>
            </div>
            
            {selectedUsers.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">تم تحديد {selectedUsers.length} مستخدم</span>
                <button
                  onClick={() => handleStatusChange('active')}
                  className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors cursor-pointer whitespace-nowrap"
                >
                  تفعيل
                </button>
                <button
                  onClick={() => handleStatusChange('inactive')}
                  className="bg-yellow-600 text-white px-3 py-1 rounded text-sm hover:bg-yellow-700 transition-colors cursor-pointer whitespace-nowrap"
                >
                  إلغاء تفعيل
                </button>
                <button
                  onClick={handleDeleteUsers}
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors cursor-pointer whitespace-nowrap"
                >
                  حذف
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-right">
                    <input
                      type="checkbox"
                      checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                      onChange={handleSelectAll}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-gray-900">المستخدم</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-gray-900">الدور</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-gray-900">الحالة</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-gray-900">تاريخ الانضمام</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-gray-900">آخر دخول</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-gray-900">الصلاحيات</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-gray-900">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map(user => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => handleSelectUser(user.id)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
                          user.role === 'teacher' ? 'bg-purple-600' :
                          user.role === 'admin' ? 'bg-red-600' :
                          user.role === 'employee' ? 'bg-green-600' :
                          'bg-blue-600'
                        }`}>
                          <i className={`${getAvatarIcon(user.avatar)} text-sm`}></i>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleInfo(user.role).color || 'bg-gray-100 text-gray-800'}`}>
                        {getRoleInfo(user.role).name}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        user.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {user.status === 'active' ? 'نشط' : 'غير نشط'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {new Date(user.joinDate).toLocaleDateString('ar-SA')}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {new Date(user.lastLogin).toLocaleDateString('ar-SA')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {permissions[user.role as keyof typeof permissions]?.slice(0, 2).map((permission, index) => (
                          <span key={index} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                            {permission}
                          </span>
                        ))}
                        {permissions[user.role as keyof typeof permissions]?.length > 2 && (
                          <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                            +{permissions[user.role as keyof typeof permissions].length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setEditingUser(user)}
                          className="text-blue-600 hover:text-blue-800 cursor-pointer"
                          title="تعديل"
                        >
                          <i className="ri-edit-line"></i>
                        </button>
                        <button
                          onClick={() => {
                            if (confirm('هل أنت متأكد من حذف هذا المستخدم؟')) {
                              setUsers(prev => prev.filter(u => u.id !== user.id));
                            }
                          }}
                          className="text-red-600 hover:text-red-800 cursor-pointer"
                          title="حذف"
                        >
                          <i className="ri-delete-bin-line"></i>
                        </button>
                        <button className="text-gray-600 hover:text-gray-800 cursor-pointer" title="عرض التفاصيل">
                          <i className="ri-eye-line"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <i className="ri-user-line text-4xl text-gray-400 mb-4"></i>
              <p className="text-gray-500">لا توجد نتائج مطابقة للبحث</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-gray-700">
            عرض 1 إلى {filteredUsers.length} من أصل {users.length} مستخدم
          </p>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 cursor-pointer">
              السابق
            </button>
            <button className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm">
              1
            </button>
            <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 cursor-pointer">
              التالي
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}