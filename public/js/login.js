// frontend/public/js/login.js
// Constants
const API_BASE_URL = process.env.API_URL || 'https://univ-lib-backend.onrender.com/api';
const LOGIN_ATTEMPT_LIMIT = 5;
const LOGIN_ATTEMPT_TIMEOUT = 15 * 60 * 1000; // 15 minutes
const TOAST_DURATION = 3000;

// Translations
const translations = {
  en: {
    universityLibrary: "University Library",
    login: "Login",
    register: "Register",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    firstName: "First Name",
    familyName: "Family Name",
    studentId: "Student ID (e.g., 202412345678)",
    idCard: "Upload Student ID Card (optional)",
    faculty: "Faculty",
    selectFaculty: "Select Faculty",
    academicYear: "Academic Year",
    selectYear: "Select Year",
    major: "Major",
    phone: "Phone",
    passwordHint: "Password must be at least 8 characters",
    registerLink: "Don't have an account? Register",
    loginLink: "Already have an account? Login",
    invalidEmail: "Invalid email format",
    invalidPassword: "Password must be at least 8 characters",
    passwordMismatch: "Passwords do not match",
    invalidStudentId: "Student ID must be in the correct format (e.g., 202412345678)",
    invalidPhone: "Phone number must be 9-12 digits",
    invalidIdCardSize: "ID card file size exceeds 5MB",
    invalidIdCardType: "ID card must be an image file",
    requiredFirstName: "First name is required",
    requiredFamilyName: "Family name is required",
    requiredFaculty: "Faculty is required",
    requiredAcademicYear: "Academic year is required",
    requiredMajor: "Major is required",
    loginFailed: "Login failed",
    invalidCredentials: "Invalid email or password",
    unverifiedUser: "Please verify your email to log in",
    serverError: "Server error, please try again later",
    tooManyAttempts: "Too many login attempts. Try again later.",
    registrationFailed: "Registration failed",
    emailInUse: "Email already in use",
    invalidData: "Invalid registration data",
    processing: "Processing...",
    loginSuccess: "Login Successful",
    registerSuccess: "Registration Successful",
    showPassword: "Show password",
    hidePassword: "Hide password",
    facultyOptions: {
      scienceAndTechnology: "Faculty of Science and Technology",
      exactSciences: "Faculty of Exact Sciences",
      humanitiesAndSocialSciences: "Faculty of Humanities and Social Sciences",
      economicSciences: "Faculty of Economic, Commercial, and Management Sciences",
      lawAndPoliticalSciences: "Faculty of Law and Political Sciences",
      artsAndLanguages: "Faculty of Arts and Languages",
      islamicSciences: "Faculty of Islamic Sciences",
      naturalAndLifeSciences: "Faculty of Natural and Life Sciences"
    },
    yearOptions: {
      L1: "1st Year (L1)",
      L2: "2nd Year (L2)",
      L3: "3rd Year (L3)",
      M1: "4th Year (M1)",
      M2: "5th Year (M2)",
      D: "Final Years (D)"
    }
  },
  ar: {
    universityLibrary: "مكتبة الجامعة",
    login: "تسجيل الدخول",
    register: "تسجيل",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    confirmPassword: "تأكيد كلمة المرور",
    firstName: "الاسم الشخصي",
    familyName: "الاسم العائلي",
    studentId: "رقم الطالب (مثال: 202412345678)",
    idCard: "رفع بطاقة الطالب (اختياري)",
    faculty: "الكلية",
    selectFaculty: "اختر الكلية",
    academicYear: "السنة الدراسية",
    selectYear: "اختر السنة",
    major: "التخصص",
    phone: "رقم الهاتف",
    passwordHint: "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل",
    registerLink: "ليس لديك حساب؟ سجل الآن",
    loginLink: "لديك حساب بالفعل؟ تسجيل الدخول",
    invalidEmail: "تنسيق البريد الإلكتروني غير صالح",
    invalidPassword: "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل",
    passwordMismatch: "كلمات المرور غير متطابقة",
    invalidStudentId: "تنسيق رقم الطالب غير صالح (مثال: 202412345678)",
    invalidPhone: "يجب أن يتكون رقم الهاتف من 9-12 أرقام",
    invalidIdCardSize: "حجم ملف بطاقة الطالب يتجاوز 5 ميجابايت",
    invalidIdCardType: "يجب أن تكون بطاقة الطالب ملف صورة",
    requiredFirstName: "الاسم الشخصي مطلوب",
    requiredFamilyName: "الاسم العائلي مطلوب",
    requiredFaculty: "الكلية مطلوبة",
    requiredAcademicYear: "السنة الدراسية مطلوبة",
    requiredMajor: "التخصص مطلوب",
    loginFailed: "فشل تسجيل الدخول",
    invalidCredentials: "البريد الإلكتروني أو كلمة المرور غير صالحة",
    unverifiedUser: "يرجى التحقق من بريدك الإلكتروني لتسجيل الدخول",
    serverError: "خطأ في الخادم، يرجى المحاولة مرة أخرى لاحقًا",
    tooManyAttempts: "محاولات تسجيل دخول كثيرة جدًا. حاول مرة أخرى لاحقًا.",
    registrationFailed: "فشل التسجيل",
    emailInUse: "البريد الإلكتروني مستخدم بالفعل",
    invalidData: "بيانات التسجيل غير صالحة",
    processing: "جاري المعالجة...",
    loginSuccess: "تسجيل الدخول ناجح",
    registerSuccess: "التسجيل ناجح",
    showPassword: "إظهار كلمة المرور",
    hidePassword: "إخفاء كلمة المرور",
    facultyOptions: {
      scienceAndTechnology: "كلية العلوم والتكنولوجيا",
      exactSciences: "كلية العلوم الدقيقة",
      humanitiesAndSocialSciences: "كلية العلوم الإنسانية والاجتماعية",
      economicSciences: "كلية العلوم الاقتصادية والتجارية وعلوم التسيير",
      lawAndPoliticalSciences: "كلية الحقوق والعلوم السياسية",
      artsAndLanguages: "كلية الآداب واللغات",
      islamicSciences: "كلية العلوم الإسلامية",
      naturalAndLifeSciences: "كلية العلوم الطبيعية والحياتية"
    },
    yearOptions: {
      L1: "السنة الأولى (L1)",
      L2: "السنة الثانية (L2)",
      L3: "السنة الثالثة (L3)",
      M1: "السنة الرابعة (M1)",
      M2: "السنة الخامسة (M2)",
      D: "السنوات النهائية (D)"
    }
  }
};

// API Functions
const api = {
  login: async ({ email, password }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || translations[i18next.language].serverError);
      }
      if (!['ADMIN', 'LIBRARIAN', 'STUDENT'].includes(data.role)) {
        throw new Error(translations[i18next.language].invalidData);
      }
      localStorage.setItem('token', data.token);
      localStorage.setItem('userRole', data.role);
      return { ok: true, role: data.role };
    } catch (error) {
      return { ok: false, message: error.message };
    }
  },
  registerUser: async (formData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/register`, {
        method: 'POST',
        body: formData,
        credentials: 'include'
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || translations[i18next.language].serverError);
      }
      return { ok: true };
    } catch (error) {
      return { ok: false, message: error.message };
    }
  }
};

// Utility Functions
const showToast = (message, type = 'info') => {
  const toast = document.createElement('div');
  toast.className = `toast alert-${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('fade-out');
    setTimeout(() => toast.remove(), 300);
  }, TOAST_DURATION);
};

const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

const checkLoginAttempts = () => {
  const attempts = JSON.parse(localStorage.getItem('loginAttempts') || '{}');
  const now = Date.now();
  if (attempts.count >= LOGIN_ATTEMPT_LIMIT && now - attempts.lastAttempt < LOGIN_ATTEMPT_TIMEOUT) {
    const remaining = Math.ceil((LOGIN_ATTEMPT_TIMEOUT - (now - attempts.lastAttempt)) / 60000);
    return { allowed: false, message: `${translations[i18next.language].tooManyAttempts} (${remaining} min)` };
  }
  return { allowed: true };
};

const updateLoginAttempts = (reset = false) => {
  if (reset) {
    localStorage.removeItem('loginAttempts');
    return;
  }
  const attempts = JSON.parse(localStorage.getItem('loginAttempts') || '{}');
  attempts.count = (attempts.count || 0) + 1;
  attempts.lastAttempt = Date.now();
  localStorage.setItem('loginAttempts', JSON.stringify(attempts));
};

// Core Functions
const initializeI18next = () => {
  if (typeof i18next === 'undefined') {
    showToast('Translation library not loaded.', 'error');
    return false;
  }
  const savedLang = localStorage.getItem('language') || 'en';
  i18next.init({
    lng: savedLang,
    fallbackLng: 'en',
    resources: {
      en: { translation: translations.en },
      ar: { translation: translations.ar }
    }
  }, (err) => {
    if (err) {
      showToast('Failed to initialize translations.', 'error');
      return;
    }
    updateUILanguage(savedLang);
  });
  return true;
};

const updateUILanguage = (lang) => {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    el.textContent = i18next.t(key);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = i18next.t(el.dataset.i18nPlaceholder);
  });
  document.querySelectorAll('[data-i18n-aria-label]').forEach(el => {
    el.setAttribute('aria-label', i18next.t(el.dataset.i18nAriaLabel));
  });
  document.body.style.direction = lang === 'ar' ? 'rtl' : 'ltr';
  const langButton = document.querySelector('.lang-btn.active');
  if (langButton) {
    langButton.textContent = lang === 'ar' ? 'EN' : 'AR';
  }
};

const toggleForms = (showLogin) => {
  const { loginSection, registerSection } = elements;
  document.querySelectorAll('.is-invalid').forEach(el => {
    el.classList.remove('is-invalid');
    const feedback = el.parentNode.querySelector('.invalid-feedback');
    if (feedback) feedback.remove();
  });

  if (showLogin) {
    registerSection.classList.add('d-none');
    loginSection.classList.remove('d-none');
    loginSection.style.animation = 'fadeInUp 0.6s forwards';
  } else {
    loginSection.classList.add('d-none');
    registerSection.classList.remove('d-none');
    registerSection.style.animation = 'fadeInUp 0.6s forwards';
  }
  updateButtonState(elements.loginForm);
  updateButtonState(elements.registerForm);
};

const handleLanguageChange = (lang) => {
  if (!i18next) return;
  const langSpinner = document.createElement('span');
  langSpinner.className = 'spinner-border spinner-border-sm ms-2';
  const activeBtn = document.querySelector('.lang-btn.active');
  if (activeBtn) activeBtn.appendChild(langSpinner);

  i18next.changeLanguage(lang, (err) => {
    if (err) {
      showToast('Failed to change language.', 'error');
      return;
    }
    localStorage.setItem('language', lang);
    updateUILanguage(lang);
    document.body.style.direction = lang === 'ar' ? 'rtl' : 'ltr';
    document.querySelectorAll(`.${lang}`).forEach(el => el.classList.remove('d-none'));
    document.querySelectorAll(`.${lang === 'ar' ? 'en' : 'ar'}`).forEach(el => el.classList.add('d-none'));
    elements.authForms.forEach(form => {
      form.style.animation = 'fadeInUp 0.4s forwards';
    });

    const { illusAr, illusEn } = elements;
    if (illusAr && illusEn) {
      const activeIllus = lang === 'ar' ? illusAr : illusEn;
      const inactiveIllus = lang === 'ar' ? illusEn : illusAr;
      inactiveIllus.style.animation = 'fadeOut 0.7s forwards';
      setTimeout(() => {
        inactiveIllus.classList.remove('active');
        activeIllus.classList.add('active');
        activeIllus.style.animation = 'fadeIn 0.7s forwards';
      }, 200);
    }
    if (activeBtn) langSpinner.remove();
  });
};

const animateButton = (button) => {
  button.style.transform = 'scale(0.95)';
  setTimeout(() => button.style.transform = 'scale(1)', 150);
};

const updatePasswordStrength = (password) => {
  const { passwordStrengthBar } = elements;
  if (!passwordStrengthBar) return;
  const strengthBar = passwordStrengthBar;
  const length = password.length;
  strengthBar.parentNode.classList.remove('weak', 'medium', 'strong');
  if (length < 8) {
    strengthBar.parentNode.classList.add('weak');
    strengthBar.style.width = '30%';
  } else if (length < 12) {
    strengthBar.parentNode.classList.add('medium');
    strengthBar.style.width = '60%';
  } else {
    strengthBar.parentNode.classList.add('strong');
    strengthBar.style.width = '100%';
  }
};

const validateLoginForm = (formData) => {
  const errors = {};
  if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    errors.email = 'invalidEmail';
  }
  if (formData.password.length < 8) {
    errors.password = 'invalidPassword';
  }
  return errors;
};

const validateRegisterForm = (formData) => {
  const errors = {};
  if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    errors.email = 'invalidEmail';
  }
  if (formData.password.length < 8) {
    errors.password = 'invalidPassword';
  }
  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = 'passwordMismatch';
  }
  if (!/^(199[0-9]|20[0-1][0-9]|202[0-4])[0-9]{8}$/.test(formData.studentId)) {
    errors.studentId = 'invalidStudentId';
  }
  if (!/^[0-9]{9,12}$/.test(formData.phone.replace(/^\+?\d{0,3}/, ''))) {
    errors.phone = 'invalidPhone';
  }
  if (formData.idCard) {
    const maxSize = 5 * 1024 * 1024;
    if (formData.idCard.size > maxSize) {
      errors.idCard = 'invalidIdCardSize';
    }
    if (!formData.idCard.type.startsWith('image/')) {
      errors.idCard = 'invalidIdCardType';
    }
  }
  if (!formData.firstName || formData.firstName.trim() === '') {
    errors.firstName = 'requiredFirstName';
  }
  if (!formData.familyName || formData.familyName.trim() === '') {
    errors.familyName = 'requiredFamilyName';
  }
  if (!formData.faculty) {
    errors.faculty = 'requiredFaculty';
  }
  if (!formData.academicYear) {
    errors.academicYear = 'requiredAcademicYear';
  }
  if (!formData.major || formData.major.trim() === '') {
    errors.major = 'requiredMajor';
  }
  return errors;
};

const updateButtonState = (form) => {
  if (!form) return;
  const button = form.querySelector('button');
  if (!button) return;
  const inputs = form.querySelectorAll('input[required], select[required]');
  let isValid = true;
  inputs.forEach(input => {
    if (!input.value || (input.tagName === 'SELECT' && !input.value)) {
      isValid = false;
    }
  });
  button.disabled = !isValid;
};

const handleLogin = async (e) => {
  e.preventDefault();
  const button = e.target.querySelector('button');
  if (!button || button.disabled) return;

  const attemptCheck = checkLoginAttempts();
  if (!attemptCheck.allowed) {
    showToast(attemptCheck.message, 'error');
    return;
  }

  button.disabled = true;
  animateButton(button);
  const originalText = button.innerHTML;
  button.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> ${i18next.t('processing')}`;

  try {
    const email = document.getElementById('loginInput')?.value;
    const password = document.getElementById('loginPassword')?.value;

    if (!email || !password) {
      throw new Error(i18next.t('loginFailed'));
    }

    const loginErrors = validateLoginForm({ email, password });
    if (Object.keys(loginErrors).length > 0) {
      for (const [field, key] of Object.entries(loginErrors)) {
        const element = document.getElementById(field === 'email' ? 'loginInput' : 'loginPassword');
        if (element) {
          element.classList.add('is-invalid');
          const existingFeedback = element.parentNode.querySelector('.invalid-feedback');
          if (existingFeedback) existingFeedback.remove();
          const feedback = document.createElement('div');
          feedback.className = 'invalid-feedback';
          feedback.textContent = i18next.t(key);
          element.parentNode.appendChild(feedback);
        }
      }
      throw new Error(i18next.t('loginFailed'));
    }

    const data = await api.login({ email, password });

    if (data.ok) {
      updateLoginAttempts(true);
      showToast(i18next.t('loginSuccess'), 'success');
      button.innerHTML = `<i class="fas fa-check-circle"></i> ${i18next.t('loginSuccess')}`;
      const redirectUrl = {
        ADMIN: './admin-librarian/admin-dashboard.html',
        LIBRARIAN: './admin-librarian/librarian-dashboard.html',
        STUDENT: './student/student-dashboard.html'
      }[data.role] || '/main/home.html';

      setTimeout(() => {
        try {
          window.location.href = redirectUrl;
        } catch (err) {
          showToast('Redirect failed.', 'error');
          button.innerHTML = originalText;
          button.disabled = false;
        }
      }, 1500);
    } else {
      updateLoginAttempts();
      throw new Error(
        data.message.includes('not verified') ? i18next.t('unverifiedUser') :
        data.message.includes('Invalid') ? i18next.t('invalidCredentials') :
        i18next.t('serverError')
      );
    }
  } catch (error) {
    showToast(error.message, 'error');
    button.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${error.message}`;
    setTimeout(() => {
      button.innerHTML = originalText;
      button.disabled = false;
    }, 2000);
  }
};

const handleRegister = async (e) => {
  e.preventDefault();
  const button = e.target.querySelector('button');
  if (!button || button.disabled) return;

  button.disabled = true;
  animateButton(button);
  const originalText = button.innerHTML;
  button.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> ${i18next.t('processing')}`;

  try {
    const formData = new FormData();
    formData.append('firstName', document.getElementById('firstName')?.value || '');
    formData.append('familyName', document.getElementById('familyName')?.value || '');
    formData.append('studentId', document.getElementById('studentId')?.value || '');
    formData.append('faculty', document.getElementById('faculty')?.value || '');
    formData.append('academicYear', document.getElementById('academicYear')?.value || '');
    formData.append('major', document.getElementById('major')?.value || '');
    formData.append('email', document.getElementById('email')?.value || '');
    formData.append('phone', document.getElementById('phoneNumber')?.value || '');
    formData.append('password', document.getElementById('registerPassword')?.value || '');
    formData.append('confirmPassword', document.getElementById('confirmPassword')?.value || '');
    const idCard = document.getElementById('idCard')?.files[0];
    if (idCard) formData.append('idCard', idCard);
    formData.append('role', 'STUDENT');

    const validationData = {
      firstName: formData.get('firstName'),
      familyName: formData.get('familyName'),
      studentId: formData.get('studentId'),
      faculty: formData.get('faculty'),
      academicYear: formData.get('academicYear'),
      major: formData.get('major'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
      idCard
    };

    const errors = validateRegisterForm(validationData);
    if (Object.keys(errors).length > 0) {
      for (const [field, key] of Object.entries(errors)) {
        const element = document.getElementById(field === 'confirmPassword' ? 'confirmPassword' : field);
        if (element) {
          element.classList.add('is-invalid');
          const existingFeedback = element.parentNode.querySelector('.invalid-feedback');
          if (existingFeedback) existingFeedback.remove();
          const feedback = document.createElement('div');
          feedback.className = 'invalid-feedback';
          feedback.textContent = i18next.t(key);
          element.parentNode.appendChild(feedback);
        }
      }
      throw new Error(i18next.t('registrationFailed'));
    }

    const response = await api.registerUser(formData);

    if (response.ok) {
      showToast(i18next.t('registerSuccess'), 'success');
      button.innerHTML = `<i class="fas fa-check-circle"></i> ${i18next.t('registerSuccess')}`;
      setTimeout(() => {
        elements.registerForm.reset();
        toggleForms(true);
        button.innerHTML = originalText;
        button.disabled = false;
      }, 1500);
    } else {
      throw new Error(
        response.message.includes('already exists') ? i18next.t('emailInUse') :
        response.message.includes('Invalid') ? i18next.t('invalidData') :
        i18next.t('serverError')
      );
    }
  } catch (error) {
    showToast(error.message, 'error');
    button.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${error.message}`;
    setTimeout(() => {
      button.innerHTML = originalText;
      button.disabled = false;
    }, 2000);
  }
};

const togglePasswordVisibility = (button) => {
  const targetId = button.dataset.target;
  const input = document.getElementById(targetId);
  const icon = button.querySelector('i');
  if (!input || !icon) return;

  if (input.type === 'password') {
    input.type = 'text';
    icon.classList.remove('fa-eye');
    icon.classList.add('fa-eye-slash');
    button.setAttribute('aria-label', i18next.t('hidePassword'));
    button.dataset.i18nAriaLabel = 'hidePassword';
  } else {
    input.type = 'password';
    icon.classList.remove('fa-eye-slash');
    icon.classList.add('fa-eye');
    button.setAttribute('aria-label', i18next.t('showPassword'));
    button.dataset.i18nAriaLabel = 'showPassword';
  }
};

// Element References
const elements = {
  loginForm: document.getElementById('loginForm'),
  registerForm: document.getElementById('registerForm'),
  loginSection: document.getElementById('login-form'),
  registerSection: document.getElementById('register-form'),
  showRegisterLinks: document.querySelectorAll('.show-register'),
  showLoginLinks: document.querySelectorAll('.show-login'),
  langButtons: document.querySelectorAll('.lang-btn'),
  authForms: document.querySelectorAll('.auth-form'),
  illusAr: document.getElementById('illus-ar'),
  illusEn: document.getElementById('illus-en'),
  passwordInput: document.getElementById('registerPassword'),
  passwordStrengthBar: document.querySelector('.password-strength-bar')
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  if (!elements.loginForm || !elements.registerForm || !elements.loginSection || !elements.registerSection) {
    showToast('Form elements missing. Please check HTML.', 'error');
    return;
  }

  if (!initializeI18next()) return;

  // Event Listeners
  elements.showRegisterLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      toggleForms(false);
    });
  });

  elements.showLoginLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      toggleForms(true);
    });
  });

  elements.langButtons.forEach(button => {
    button.addEventListener('click', () => {
      const lang = button.dataset.lang;
      if (!lang) return;
      animateButton(button);
      elements.langButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      handleLanguageChange(lang);
    });
  });

  elements.loginForm.addEventListener('submit', handleLogin);
  elements.registerForm.addEventListener('submit', handleRegister);

  document.querySelectorAll('input[required], select[required]').forEach(input => {
    input.addEventListener('input', debounce(() => {
      input.classList.remove('is-invalid');
      const feedback = input.parentNode.querySelector('.invalid-feedback');
      if (feedback) feedback.remove();
      updateButtonState(input.closest('form'));

      // Real-time validation
      const form = input.closest('form');
      const formData = form === elements.loginForm
        ? {
            email: document.getElementById('loginInput')?.value || '',
            password: document.getElementById('loginPassword')?.value || ''
          }
        : {
            firstName: document.getElementById('firstName')?.value || '',
            familyName: document.getElementById('familyName')?.value || '',
            studentId: document.getElementById('studentId')?.value || '',
            faculty: document.getElementById('faculty')?.value || '',
            academicYear: document.getElementById('academicYear')?.value || '',
            major: document.getElementById('major')?.value || '',
            email: document.getElementById('email')?.value || '',
            phone: document.getElementById('phoneNumber')?.value || '',
            password: document.getElementById('registerPassword')?.value || '',
            confirmPassword: document.getElementById('confirmPassword')?.value || '',
            idCard: document.getElementById('idCard')?.files[0]
          };
      const errors = form === elements.loginForm ? validateLoginForm(formData) : validateRegisterForm(formData);
      if (errors[input.id]) {
        input.classList.add('is-invalid');
        const existingFeedback = input.parentNode.querySelector('.invalid-feedback');
        if (existingFeedback) existingFeedback.remove();
        const feedback = document.createElement('div');
        feedback.className = 'invalid-feedback';
        feedback.textContent = i18next.t(errors[input.id]);
        input.parentNode.appendChild(feedback);
      }
    }, 300));
  });

  if (elements.passwordInput && elements.passwordStrengthBar) {
    elements.passwordInput.addEventListener('input', () => {
      updatePasswordStrength(elements.passwordInput.value);
    });
  }

  // Password Toggle
  document.querySelectorAll('.show-password-btn').forEach(button => {
    button.addEventListener('click', () => togglePasswordVisibility(button));
  });

  // Initialize button states
  updateButtonState(elements.loginForm);
  updateButtonState(elements.registerForm);

  // Load saved language
  const savedLang = localStorage.getItem('language') || 'en';
  handleLanguageChange(savedLang);
  elements.langButtons.forEach(btn => {
    if (btn.dataset.lang === savedLang) btn.classList.add('active');
  });
});