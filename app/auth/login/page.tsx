'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
    twoFactor: false
  });
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showTwoFactor) {
      setShowTwoFactor(true);
    } else {
      // Process login with 2FA
      console.log('تسجيل الدخول مع المصادقة الثنائية');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <i className="ri-building-line text-white text-2xl"></i>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">تسجيل الدخول</h1>
          <p className="text-gray-600">ادخل إلى المساحة الافتراضية</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {!showTwoFactor ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  البريد الإلكتروني أو رقم الهاتف
                </label>
                <input
                  type="text"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder="أدخل بريدك الإلكتروني أو رقم الهاتف"
                  required
                />
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  كلمة المرور
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="أدخل كلمة المرور"
                    required
                  />
                </div>
              </div>

              {/* Remember Me & 2FA */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.remember}
                    onChange={(e) => setFormData({...formData, remember: e.target.checked})}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="mr-2 text-sm text-gray-600">تذكرني</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.twoFactor}
                    onChange={(e) => setFormData({...formData, twoFactor: e.target.checked})}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="mr-2 text-sm text-gray-600">المصادقة الثنائية</span>
                </label>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
              >
                تسجيل الدخول
              </button>

              {/* Forgot Password */}
              <div className="text-center">
                <Link href="/auth/forgot-password" className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                  نسيت كلمة المرور؟
                </Link>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-center mb-6">
                <i className="ri-shield-check-line text-4xl text-blue-600 mb-2"></i>
                <h2 className="text-xl font-bold text-gray-800 mb-2">المصادقة الثنائية</h2>
                <p className="text-gray-600 text-sm">أدخل الرمز المرسل إلى هاتفك</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  رمز التحقق
                </label>
                <input
                  type="text"
                  value={twoFactorCode}
                  onChange={(e) => setTwoFactorCode(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-2xl tracking-widest"
                  placeholder="000000"
                  maxLength={6}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
              >
                تأكيد الدخول
              </button>

              <button
                type="button"
                onClick={() => setShowTwoFactor(false)}
                className="w-full text-gray-600 py-2 text-sm hover:text-gray-800 cursor-pointer"
              >
                العودة للخلف
              </button>
            </form>
          )}

          {/* SSO Options */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">أو سجل الدخول باستخدام</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer">
                <i className="ri-google-fill text-red-500 text-lg"></i>
                <span className="mr-2">Google</span>
              </button>
              <button className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer">
                <i className="ri-microsoft-fill text-blue-500 text-lg"></i>
                <span className="mr-2">Microsoft</span>
              </button>
            </div>
          </div>

          {/* Register Link */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              ليس لديك حساب؟
              <Link href="/auth/register" className="text-blue-600 hover:text-blue-800 font-medium mr-1 cursor-pointer">
                إنشاء حساب جديد
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}