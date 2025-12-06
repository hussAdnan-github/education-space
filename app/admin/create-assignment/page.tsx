'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Question {
  id: string;
  type: 'multiple_choice' | 'true_false' | 'short_answer' | 'essay' | 'fill_blank';
  question: string;
  options?: string[];
  correctAnswer?: string | number;
  points: number;
  explanation?: string;
}

interface Assignment {
  title: string;
  description: string;
  type: 'homework' | 'quiz' | 'exam' | 'project';
  subject: string;
  class: string;
  dueDate: string;
  duration?: number; // in minutes for timed assignments
  totalPoints: number;
  instructions: string;
  questions: Question[];
  allowLateSubmission: boolean;
  showResults: boolean;
  randomizeQuestions: boolean;
  attempts: number;
}

export default function CreateAssignmentPage() {
  const [activeStep, setActiveStep] = useState(1);
  const [assignment, setAssignment] = useState<Assignment>({
    title: '',
    description: '',
    type: 'homework',
    subject: '',
    class: '',
    dueDate: '',
    duration: 60,
    totalPoints: 0,
    instructions: '',
    questions: [],
    allowLateSubmission: true,
    showResults: true,
    randomizeQuestions: false,
    attempts: 1
  });

  const [currentQuestion, setCurrentQuestion] = useState<Question>({
    id: '',
    type: 'multiple_choice',
    question: '',
    options: ['', '', '', ''],
    correctAnswer: '',
    points: 10,
    explanation: ''
  });

  const [showPreview, setShowPreview] = useState(false);

  const subjects = [
    'الرياضيات', 'العلوم', 'اللغة العربية', 'اللغة الإنجليزية',
    'التاريخ', 'الجغرافيا', 'الفيزياء', 'الكيمياء', 'الأحياء',
    'التربية الإسلامية', 'الحاسوب', 'الفنون'
  ];

  const classes = [
    'الصف الأول الثانوي', 'الصف الثاني الثانوي', 'الصف الثالث الثانوي',
    'فصل الرياضيات A', 'فصل العلوم B', 'مختبر الفيزياء',
    'قاعة الحاسوب', 'فصل اللغة الإنجليزية'
  ];

  const questionTypes = [
    { id: 'multiple_choice', name: 'اختيار من متعدد', icon: 'ri-list-check' },
    { id: 'true_false', name: 'صح أم خطأ', icon: 'ri-checkbox-line' },
    { id: 'short_answer', name: 'إجابة قصيرة', icon: 'ri-edit-line' },
    { id: 'essay', name: 'مقال', icon: 'ri-file-text-line' },
    { id: 'fill_blank', name: 'ملء الفراغات', icon: 'ri-input-cursor-move' }
  ];

  const addQuestion = () => {
    if (!currentQuestion.question.trim()) return;

    const newQuestion = {
      ...currentQuestion,
      id: Date.now().toString()
    };

    setAssignment(prev => ({
      ...prev,
      questions: [...prev.questions, newQuestion],
      totalPoints: prev.totalPoints + currentQuestion.points
    }));

    setCurrentQuestion({
      id: '',
      type: 'multiple_choice',
      question: '',
      options: ['', '', '', ''],
      correctAnswer: '',
      points: 10,
      explanation: ''
    });
  };

  const removeQuestion = (questionId: string) => {
    const question = assignment.questions.find(q => q.id === questionId);
    if (question) {
      setAssignment(prev => ({
        ...prev,
        questions: prev.questions.filter(q => q.id !== questionId),
        totalPoints: prev.totalPoints - question.points
      }));
    }
  };

  const updateQuestionOption = (index: number, value: string) => {
    const newOptions = [...(currentQuestion.options || [])];
    newOptions[index] = value;
    setCurrentQuestion(prev => ({ ...prev, options: newOptions }));
  };

  const saveAssignment = () => {
    console.log('حفظ الواجب:', assignment);
    // هنا يمكن إضافة منطق الحفظ
  };

  const publishAssignment = () => {
    console.log('نشر الواجب:', assignment);
    // هنا يمكن إضافة منطق النشر
  };

  const getQuestionTypeIcon = (type: string) => {
    return questionTypes.find(qt => qt.id === type)?.icon || 'ri-question-line';
  };

  const steps = [
    { id: 1, name: 'معلومات أساسية', icon: 'ri-file-text-line' },
    { id: 2, name: 'إضافة الأسئلة', icon: 'ri-question-line' },
    { id: 3, name: 'الإعدادات', icon: 'ri-settings-line' },
    { id: 4, name: 'المراجعة والنشر', icon: 'ri-eye-line' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center">
                <i className="ri-file-add-line text-white text-xl"></i>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">إنشاء واجب / اختبار جديد</h1>
                <p className="text-sm text-gray-600">إنشاء وإدارة الواجبات والاختبارات بسهولة</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowPreview(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-eye-line mr-2"></i>
                معاينة
              </button>
              <Link href="/admin/teacher" className="text-gray-600 hover:text-gray-800 cursor-pointer">
                العودة
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Progress Steps */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex-1 flex items-center">
                <div className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-colors ${
                      activeStep >= step.id
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                    onClick={() => setActiveStep(step.id)}
                  >
                    <i className={step.icon}></i>
                  </div>
                  <span className={`ml-3 font-medium ${
                    activeStep >= step.id ? 'text-green-600' : 'text-gray-600'
                  }`}>
                    {step.name}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-4 rounded ${
                    activeStep > step.id ? 'bg-green-600' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Basic Information */}
        {activeStep === 1 && (
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">المعلومات الأساسية</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">عنوان الواجب/الاختبار *</label>
                <input
                  type="text"
                  value={assignment.title}
                  onChange={(e) => setAssignment(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="مثال: اختبار الفصل الأول في الرياضيات"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">نوع المهمة *</label>
                <select
                  value={assignment.type}
                  onChange={(e) => setAssignment(prev => ({ ...prev, type: e.target.value as any }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 pr-8"
                >
                  <option value="homework">واجب منزلي</option>
                  <option value="quiz">اختبار قصير</option>
                  <option value="exam">امتحان</option>
                  <option value="project">مشروع</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">المادة *</label>
                <select
                  value={assignment.subject}
                  onChange={(e) => setAssignment(prev => ({ ...prev, subject: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 pr-8"
                >
                  <option value="">اختر المادة</option>
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الفصل/الشعبة *</label>
                <select
                  value={assignment.class}
                  onChange={(e) => setAssignment(prev => ({ ...prev, class: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 pr-8"
                >
                  <option value="">اختر الفصل</option>
                  {classes.map(cls => (
                    <option key={cls} value={cls}>{cls}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">موعد التسليم *</label>
                <input
                  type="datetime-local"
                  value={assignment.dueDate}
                  onChange={(e) => setAssignment(prev => ({ ...prev, dueDate: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>

              {(assignment.type === 'quiz' || assignment.type === 'exam') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">مدة الاختبار (بالدقائق)</label>
                  <input
                    type="number"
                    value={assignment.duration}
                    onChange={(e) => setAssignment(prev => ({ ...prev, duration: Number(e.target.value) }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    min="5"
                    max="300"
                  />
                </div>
              )}
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">وصف الواجب/الاختبار</label>
              <textarea
                value={assignment.description}
                onChange={(e) => setAssignment(prev => ({ ...prev, description: e.target.value }))}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="أضف وصفاً تفصيلياً للواجب أو الاختبار..."
              />
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">تعليمات خاصة</label>
              <textarea
                value={assignment.instructions}
                onChange={(e) => setAssignment(prev => ({ ...prev, instructions: e.target.value }))}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="أضف تعليمات خاصة للطلاب حول كيفية حل الواجب..."
              />
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setActiveStep(2)}
                disabled={!assignment.title || !assignment.subject || !assignment.class}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors cursor-pointer whitespace-nowrap"
              >
                التالي: إضافة الأسئلة
                <i className="ri-arrow-left-line mr-2"></i>
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Add Questions */}
        {activeStep === 2 && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Question Creator */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm p-8">
                <h2 className="text-xl font-bold text-gray-800 mb-6">إضافة سؤال جديد</h2>
                
                {/* Question Type Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">نوع السؤال</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {questionTypes.map(type => (
                      <button
                        key={type.id}
                        onClick={() => setCurrentQuestion(prev => ({ 
                          ...prev, 
                          type: type.id as any,
                          options: type.id === 'multiple_choice' ? ['', '', '', ''] : undefined
                        }))}
                        className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                          currentQuestion.type === type.id
                            ? 'border-green-500 bg-green-50 text-green-800'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <i className={`${type.icon} text-xl mb-2 block`}></i>
                        <span className="text-sm font-medium">{type.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Question Text */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">نص السؤال *</label>
                  <textarea
                    value={currentQuestion.question}
                    onChange={(e) => setCurrentQuestion(prev => ({ ...prev, question: e.target.value }))}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="اكتب السؤال هنا..."
                  />
                </div>

                {/* Question Options Based on Type */}
                {currentQuestion.type === 'multiple_choice' && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">الخيارات</label>
                    <div className="space-y-3">
                      {currentQuestion.options?.map((option, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <input
                            type="radio"
                            name="correctAnswer"
                            value={index}
                            checked={currentQuestion.correctAnswer === index.toString()}
                            onChange={(e) => setCurrentQuestion(prev => ({ ...prev, correctAnswer: e.target.value }))}
                            className="text-green-600"
                          />
                          <input
                            type="text"
                            value={option}
                            onChange={(e) => updateQuestionOption(index, e.target.value)}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                            placeholder={`الخيار ${index + 1}`}
                          />
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-2">اختر الإجابة الصحيحة بالنقر على الدائرة المناسبة</p>
                  </div>
                )}

                {currentQuestion.type === 'true_false' && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">الإجابة الصحيحة</label>
                    <div className="flex space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="trueFalse"
                          value="true"
                          checked={currentQuestion.correctAnswer === 'true'}
                          onChange={(e) => setCurrentQuestion(prev => ({ ...prev, correctAnswer: e.target.value }))}
                          className="text-green-600 mr-2"
                        />
                        صح
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="trueFalse"
                          value="false"
                          checked={currentQuestion.correctAnswer === 'false'}
                          onChange={(e) => setCurrentQuestion(prev => ({ ...prev, correctAnswer: e.target.value }))}
                          className="text-green-600 mr-2"
                        />
                        خطأ
                      </label>
                    </div>
                  </div>
                )}

                {(currentQuestion.type === 'short_answer' || currentQuestion.type === 'fill_blank') && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">الإجابة المثالية</label>
                    <input
                      type="text"
                      value={currentQuestion.correctAnswer}
                      onChange={(e) => setCurrentQuestion(prev => ({ ...prev, correctAnswer: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      placeholder="اكتب الإجابة المثالية..."
                    />
                  </div>
                )}

                {/* Points and Explanation */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">النقاط</label>
                    <input
                      type="number"
                      value={currentQuestion.points}
                      onChange={(e) => setCurrentQuestion(prev => ({ ...prev, points: Number(e.target.value) }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      min="1"
                      max="100"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">شرح الإجابة (اختياري)</label>
                  <textarea
                    value={currentQuestion.explanation}
                    onChange={(e) => setCurrentQuestion(prev => ({ ...prev, explanation: e.target.value }))}
                    rows={2}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="أضف شرحاً للإجابة الصحيحة..."
                  />
                </div>

                <button
                  onClick={addQuestion}
                  disabled={!currentQuestion.question.trim()}
                  className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-add-line mr-2"></i>
                  إضافة السؤال
                </button>
              </div>
            </div>

            {/* Questions List */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">الأسئلة المضافة</h3>
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  {assignment.questions.length} سؤال
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {assignment.questions.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <i className="ri-question-line text-3xl mb-2 block"></i>
                    <p>لم تتم إضافة أسئلة بعد</p>
                  </div>
                ) : (
                  assignment.questions.map((question, index) => (
                    <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">
                            {index + 1}
                          </span>
                          <i className={`${getQuestionTypeIcon(question.type)} text-gray-600`}></i>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">{question.points} نقطة</span>
                          <button
                            onClick={() => removeQuestion(question.id)}
                            className="text-red-600 hover:text-red-800 cursor-pointer"
                          >
                            <i className="ri-delete-bin-line"></i>
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-800 text-sm">{question.question}</p>
                      {question.type === 'multiple_choice' && question.options && (
                        <div className="mt-2 space-y-1">
                          {question.options.map((option, optIndex) => (
                            <div key={optIndex} className={`text-xs px-2 py-1 rounded ${
                              question.correctAnswer === optIndex.toString() 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-600'
                            }`}>
                              {option}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">إجمالي النقاط:</span>
                  <span className="font-bold text-green-600">{assignment.totalPoints}</span>
                </div>
              </div>

              {assignment.questions.length > 0 && (
                <div className="mt-6 space-y-3">
                  <button
                    onClick={() => setActiveStep(1)}
                    className="w-full bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    السابق
                  </button>
                  <button
                    onClick={() => setActiveStep(3)}
                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    التالي: الإعدادات
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Settings */}
        {activeStep === 3 && (
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">إعدادات الواجب/الاختبار</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-800">إعدادات التسليم</h3>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-800">السماح بالتسليم المتأخر</h4>
                    <p className="text-sm text-gray-600">يمكن للطلاب التسليم بعد الموعد المحدد</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={assignment.allowLateSubmission}
                      onChange={(e) => setAssignment(prev => ({ ...prev, allowLateSubmission: e.target.checked }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-800">إظهار النتائج فوراً</h4>
                    <p className="text-sm text-gray-600">إظهار النتائج للطلاب بعد التسليم مباشرة</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={assignment.showResults}
                      onChange={(e) => setAssignment(prev => ({ ...prev, showResults: e.target.checked }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-800">ترتيب الأسئلة عشوائياً</h4>
                    <p className="text-sm text-gray-600">عرض الأسئلة بترتيب مختلف لكل طالب</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={assignment.randomizeQuestions}
                      onChange={(e) => setAssignment(prev => ({ ...prev, randomizeQuestions: e.target.checked }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">عدد المحاولات المسموحة</label>
                  <select
                    value={assignment.attempts}
                    onChange={(e) => setAssignment(prev => ({ ...prev, attempts: Number(e.target.value) }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 pr-8"
                  >
                    <option value={1}>محاولة واحدة فقط</option>
                    <option value={2}>محاولتان</option>
                    <option value={3}>3 محاولات</option>
                    <option value={-1}>محاولات غير محدودة</option>
                  </select>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-800">معلومات إضافية</h3>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">ملخص الواجب/الاختبار</h4>
                  <div className="space-y-2 text-sm text-blue-700">
                    <p><strong>العنوان:</strong> {assignment.title || 'غير محدد'}</p>
                    <p><strong>النوع:</strong> {assignment.type === 'homework' ? 'واجب منزلي' : assignment.type === 'quiz' ? 'اختبار قصير' : assignment.type === 'exam' ? 'امتحان' : 'مشروع'}</p>
                    <p><strong>المادة:</strong> {assignment.subject || 'غير محدد'}</p>
                    <p><strong>الفصل:</strong> {assignment.class || 'غير محدد'}</p>
                    <p><strong>عدد الأسئلة:</strong> {assignment.questions.length}</p>
                    <p><strong>إجمالي النقاط:</strong> {assignment.totalPoints}</p>
                    <p><strong>موعد التسليم:</strong> {assignment.dueDate ? new Date(assignment.dueDate).toLocaleString('ar-SA') : 'غير محدد'}</p>
                    {assignment.duration && (
                      <p><strong>مدة الاختبار:</strong> {assignment.duration} دقيقة</p>
                    )}
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-medium text-yellow-800 mb-2">نصائح مهمة</h4>
                  <ul className="space-y-1 text-sm text-yellow-700">
                    <li>• تأكد من مراجعة جميع الأسئلة قبل النشر</li>
                    <li>• تحقق من الإجابات الصحيحة للأسئلة</li>
                    <li>• أضف تعليمات واضحة للطلاب</li>
                    <li>• حدد وقتاً كافياً للإجابة على جميع الأسئلة</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <button
                onClick={() => setActiveStep(2)}
                className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-arrow-right-line mr-2"></i>
                السابق
              </button>
              <button
                onClick={() => setActiveStep(4)}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors cursor-pointer whitespace-nowrap"
              >
                التالي: المراجعة والنشر
                <i className="ri-arrow-left-line mr-2"></i>
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Review and Publish */}
        {activeStep === 4 && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-xl font-bold text-gray-800 mb-6">مراجعة نهائية</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">معلومات الواجب</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">العنوان:</span>
                      <span className="font-medium">{assignment.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">النوع:</span>
                      <span className="font-medium">
                        {assignment.type === 'homework' ? 'واجب منزلي' : 
                         assignment.type === 'quiz' ? 'اختبار قصير' : 
                         assignment.type === 'exam' ? 'امتحان' : 'مشروع'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">المادة:</span>
                      <span className="font-medium">{assignment.subject}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">الفصل:</span>
                      <span className="font-medium">{assignment.class}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">موعد التسليم:</span>
                      <span className="font-medium">
                        {new Date(assignment.dueDate).toLocaleString('ar-SA')}
                      </span>
                    </div>
                    {assignment.duration && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">المدة:</span>
                        <span className="font-medium">{assignment.duration} دقيقة</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">إحصائيات الأسئلة</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">إجمالي الأسئلة:</span>
                      <span className="font-medium">{assignment.questions.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">إجمالي النقاط:</span>
                      <span className="font-medium">{assignment.totalPoints}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">اختيار من متعدد:</span>
                      <span className="font-medium">
                        {assignment.questions.filter(q => q.type === 'multiple_choice').length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">صح أم خطأ:</span>
                      <span className="font-medium">
                        {assignment.questions.filter(q => q.type === 'true_false').length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">إجابة قصيرة:</span>
                      <span className="font-medium">
                        {assignment.questions.filter(q => q.type === 'short_answer').length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">مقالية:</span>
                      <span className="font-medium">
                        {assignment.questions.filter(q => q.type === 'essay').length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h3 className="text-lg font-medium text-gray-800 mb-4">إجراءات النشر</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <button
                  onClick={saveAssignment}
                  className="flex items-center justify-center space-x-3 bg-blue-600 text-white py-4 px-6 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-save-line text-xl"></i>
                  <div>
                    <div className="font-medium">حفظ كمسودة</div>
                    <div className="text-sm opacity-90">احفظ للمراجعة والتعديل لاحقاً</div>
                  </div>
                </button>

                <button
                  onClick={publishAssignment}
                  className="flex items-center justify-center space-x-3 bg-green-600 text-white py-4 px-6 rounded-lg hover:bg-green-700 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-send-plane-line text-xl"></i>
                  <div>
                    <div className="font-medium">نشر الآن</div>
                    <div className="text-sm opacity-90">إتاحة الواجب للطلاب فوراً</div>
                  </div>
                </button>
              </div>

              <div className="mt-6 flex justify-between">
                <button
                  onClick={() => setActiveStep(3)}
                  className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-arrow-right-line mr-2"></i>
                  السابق
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">معاينة الواجب/الاختبار</h2>
                <button
                  onClick={() => setShowPreview(false)}
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  <i className="ri-close-line text-gray-600"></i>
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Assignment Header */}
              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h1 className="text-2xl font-bold text-blue-800 mb-2">{assignment.title}</h1>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700">
                  <div>
                    <p><strong>المادة:</strong> {assignment.subject}</p>
                    <p><strong>الفصل:</strong> {assignment.class}</p>
                  </div>
                  <div>
                    <p><strong>موعد التسليم:</strong> {new Date(assignment.dueDate).toLocaleString('ar-SA')}</p>
                    {assignment.duration && (
                      <p><strong>المدة:</strong> {assignment.duration} دقيقة</p>
                    )}
                  </div>
                </div>
                {assignment.description && (
                  <p className="mt-3 text-blue-800">{assignment.description}</p>
                )}
                {assignment.instructions && (
                  <div className="mt-3 p-3 bg-white rounded border border-blue-200">
                    <strong className="text-blue-800">تعليمات:</strong>
                    <p className="text-blue-700 mt-1">{assignment.instructions}</p>
                  </div>
                )}
              </div>

              {/* Questions Preview */}
              <div className="space-y-6">
                {assignment.questions.map((question, index) => (
                  <div key={question.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {index + 1}
                        </span>
                        <i className={`${getQuestionTypeIcon(question.type)} text-gray-600`}></i>
                      </div>
                      <span className="text-sm text-gray-600">{question.points} نقطة</span>
                    </div>
                    
                    <h3 className="text-lg font-medium text-gray-800 mb-4">{question.question}</h3>

                    {question.type === 'multiple_choice' && question.options && (
                      <div className="space-y-2">
                        {question.options.map((option, optIndex) => (
                          <label key={optIndex} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                            <input type="radio" name={`preview-${question.id}`} className="text-blue-600" />
                            <span>{option}</span>
                          </label>
                        ))}
                      </div>
                    )}

                    {question.type === 'true_false' && (
                      <div className="space-y-2">
                        <label className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                          <input type="radio" name={`preview-${question.id}`} className="text-blue-600" />
                          <span>صح</span>
                        </label>
                        <label className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                          <input type="radio" name={`preview-${question.id}`} className="text-blue-600" />
                          <span>خطأ</span>
                        </label>
                      </div>
                    )}

                    {(question.type === 'short_answer' || question.type === 'fill_blank') && (
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                        placeholder="اكتب إجابتك هنا..."
                        disabled
                      />
                    )}

                    {question.type === 'essay' && (
                      <textarea
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                        placeholder="اكتب مقالك هنا..."
                        disabled
                      />
                    )}

                    {question.explanation && (
                      <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                        <strong className="text-yellow-800">ملاحظة:</strong>
                        <p className="text-yellow-700 mt-1">{question.explanation}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-medium cursor-pointer whitespace-nowrap" disabled>
                  تسليم الواجب (معاينة فقط)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}