'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: '',
    organization: '',
    avatar: 'default',
    terms: false
  });

  const roles = [
    { id: 'student', name: 'طالب', icon: 'ri-graduation-cap-line' },
    { id: 'teacher', name: 'معلم', icon: 'ri-user-star-line' },
    { id: 'admin', name: 'مدير', icon: 'ri-admin-line' },
    { id: 'employee', name: 'موظف', icon: 'ri-briefcase-line' },
    { id: 'visitor', name: 'زائر', icon: 'ri-user-line' }
  ];

  const avatars = [
    { id: 'student-male', name: 'طالب', icon: 'ri-user-3-line' },
    { id: 'student-female', name: 'طالبة', icon: 'ri-user-2-line' },
    { id: 'teacher-male', name: 'معلم', icon: 'ri-user-star-line' },
    { id: 'teacher-female', name: 'معلمة', icon: 'ri-user-heart-line' },
    { id: 'admin', name: 'مدير', icon: 'ri-admin-line' },
    { id: 'employee', name: 'موظف', icon: 'ri-briefcase-line' }
  ];

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('إنشاء حساب جديد:', formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <i className="ri-user-add-line text-white text-2xl"></i>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">إنشاء حساب جديد</h1>
          <p className="text-gray-600">انضم إلى المساحة الافتراضية</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            {[1, 2, 3].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= stepNum ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {stepNum}
                </div>
                {stepNum < 3 && (
                  <div className={`w-12 h-1 mx-2 ${
                    step > stepNum ? 'bg-blue-600' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            {/* Step 1: Basic Information */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-800 text-center mb-6">المعلومات الأساسية</h2>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">الاسم الأول</label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="أحمد"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">اسم العائلة</label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="محمد"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="ahmed@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">رقم الهاتف</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="+966 50 123 4567"
                    required
                  />
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
                >
                  التالي
                </button>
              </div>
            )}

            {/* Step 2: Security & Role */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-800 text-center mb-6">الأمان والدور</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">كلمة المرور</label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="كلمة مرور قوية"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">تأكيد كلمة المرور</label>
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="أعد كتابة كلمة المرور"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">اختر دورك</label>
                  <div className="grid grid-cols-1 gap-3">
                    {roles.map((role) => (
                      <label key={role.id} className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="radio"
                          name="role"
                          value={role.id}
                          checked={formData.role === role.id}
                          onChange={(e) => setFormData({...formData, role: e.target.value})}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <i className={`${role.icon} text-lg text-gray-600 mx-3`}></i>
                        <span className="text-sm font-medium text-gray-700">{role.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">المؤسسة (اختياري)</label>
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={(e) => setFormData({...formData, organization: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="اسم المدرسة أو الجامعة"
                  />
                </div>

                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={handlePrevious}
                    className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-400 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    السابق
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    التالي
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Avatar & Terms */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-800 text-center mb-6">الشخصية الافتراضية</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">اختر شخصيتك الافتراضية</label>
                  <div className="grid grid-cols-2 gap-3">
                    {avatars.map((avatar) => (
                      <label key={avatar.id} className="flex flex-col items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="radio"
                          name="avatar"
                          value={avatar.id}
                          checked={formData.avatar === avatar.id}
                          onChange={(e) => setFormData({...formData, avatar: e.target.value})}
                          className="sr-only"
                        />
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-xl mb-2 ${
                          formData.avatar === avatar.id ? 'bg-blue-600' : 'bg-gray-400'
                        }`}>
                          <i className={avatar.icon}></i>
                        </div>
                        <span className="text-sm font-medium text-gray-700">{avatar.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      checked={formData.terms}
                      onChange={(e) => setFormData({...formData, terms: e.target.checked})}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
                      required
                    />
                    <span className="mr-2 text-sm text-gray-600">
                      أوافق على 
                      <Link href="/terms" className="text-blue-600 hover:text-blue-800 mx-1 cursor-pointer">شروط الاستخدام</Link>
                      و
                      <Link href="/privacy" className="text-blue-600 hover:text-blue-800 mx-1 cursor-pointer">سياسة الخصوصية</Link>
                    </span>
                  </label>
                </div>

                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={handlePrevious}
                    className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-400 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    السابق
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    إنشاء الحساب
                  </button>
                </div>
              </div>
            )}
          </form>

          {/* Login Link */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              لديك حساب بالفعل؟
              <Link href="/auth/login" className="text-blue-600 hover:text-blue-800 font-medium mr-1 cursor-pointer">
                تسجيل الدخول
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}