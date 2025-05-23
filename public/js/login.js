// frontend/public/js/login.js
// API functions
const api = {
  login: async ({ email, password }) => {
    console.log('Attempting login with:', { email });
    try {
      const response = await fetch('https://univ-lib-backend.onrender.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      console.log('Login API response:', data);
      if (!response.ok) throw new Error(data.message || 'Login failed');
      if (!['ADMIN', 'LIBRARIAN', 'STUDENT'].includes(data.role)) {
        console.error('Invalid role received:', data.role);
        throw new Error('Invalid user role');
      }
      localStorage.setItem('token', data.token);
      localStorage.setItem('userRole', data.role);
      return { ok: true, role: data.role };
    } catch (error) {
      console.error('Login API error:', error);
      return { ok: false, message: error.message };
    }
  },
  registerUser: async (formData) => {
    console.log('Attempting registration with:', Object.fromEntries(formData));
    try {
      const response = await fetch('https://univ-lib-backend.onrender.com/api/user/register', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      console.log('Register response:', data);
      if (!response.ok) throw new Error(data.message || 'Registration failed');
      return { ok: true };
    } catch (error) {
      console.error('Register API error:', error);
      return { ok: false, message: error.message };
    }
  }
};

// Translations (unchanged)
const translations = {
  en: {
    universityLibrary: "University Library",
    login: "Login",
    register: "Register",
    email: "Email",
    password: "Password",
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
    invalidStudentId: "Student ID must be in the correct format (e.g., 202412345678)",
    invalidPhone: "Phone number must be 9 digits",
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
    invalidStudentId: "تنسيق رقم الطالب غير صالح (مثال: 202412345678)",
    invalidPhone: "يجب أن يتكون رقم الهاتف من 9 أرقام",
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

document.addEventListener("DOMContentLoaded", () => {
  console.log("login.js loaded at", new Date().toISOString());

  try {
    // Initialize i18next
    const savedLang = localStorage.getItem('language') || 'en';
    console.log('Initializing i18next with language:', savedLang);
    i18next.init({
      lng: savedLang,
      fallbackLng: 'en',
      resources: {
        en: { translation: translations.en },
        ar: { translation: translations.ar }
      }
    }, (err) => {
      if (err) console.error("i18next initialization failed:", err);
      updateUILanguage();
    });

    function updateUILanguage() {
      console.log('Updating UI language to:', i18next.language);
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        const keys = key.split('.');
        let translation = i18next.t(keys[0]);
        if (keys.length > 1) {
          translation = translation[keys[1]];
        }
        el.textContent = translation;
      });
      document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        el.placeholder = i18next.t(el.dataset.i18nPlaceholder);
      });
      document.querySelectorAll('[data-i18n-aria-label]').forEach(el => {
        el.setAttribute('aria-label', i18next.t(el.dataset.i18nAriaLabel));
      });
      document.body.style.direction = i18next.language === 'ar' ? 'rtl' : 'ltr';
      const langButton = document.querySelector('.lang-btn.active');
      if (langButton) {
        langButton.textContent = i18next.language === 'ar' ? 'EN' : 'AR';
      }
    }

    // Element references
    const elements = {
      loginForm: document.getElementById("loginForm"),
      registerForm: document.getElementById("registerForm"),
      loginSection: document.getElementById("login-form"),
      registerSection: document.getElementById("register-form"),
      showRegisterLinks: document.querySelectorAll(".show-register"),
      showLoginLinks: document.querySelectorAll(".show-login"),
      langButtons: document.querySelectorAll(".lang-btn"),
      authForms: document.querySelectorAll(".auth-form"),
      illusAr: document.getElementById("illus-ar"),
      illusEn: document.getElementById("illus-en"),
      passwordInput: document.getElementById("registerPassword"),
      passwordStrengthBar: document.querySelector(".password-strength-bar")
    };

    // Log element references
    console.log('Element references:', {
      loginForm: !!elements.loginForm,
      registerForm: !!elements.registerForm,
      loginSection: !!elements.loginSection,
      registerSection: !!elements.registerSection
    });

    // Check for critical elements
    if (!elements.loginForm || !elements.registerForm || !elements.loginSection || !elements.registerSection) {
      console.error("Critical form elements missing. Check login.html for IDs: loginForm, registerForm, login-form, register-form");
      return;
    }

    const toggleForms = (showLogin) => {
      console.log('Toggling forms, showLogin:', showLogin);
      document.querySelectorAll('.is-invalid').forEach(el => {
        el.classList.remove('is-invalid');
        const feedback = el.parentNode.querySelector('.invalid-feedback');
        if (feedback) feedback.remove();
      });

      if (showLogin) {
        elements.registerSection.classList.add("d-none");
        elements.loginSection.classList.remove("d-none");
        elements.loginSection.style.animation = "fadeInUp 0.6s forwards";
      } else {
        elements.loginSection.classList.add("d-none");
        elements.registerSection.classList.remove("d-none");
        elements.registerSection.style.animation = "fadeInUp 0.6s forwards";
      }
      updateButtonState(elements.loginForm);
      updateButtonState(elements.registerForm);
    };

    const handleLanguageChange = (lang) => {
      console.log('Changing language to:', lang);
      i18next.changeLanguage(lang, (err) => {
        if (err) console.error("Language change failed:", err);
        localStorage.setItem('language', lang);
        updateUILanguage();
        document.body.style.direction = lang === 'ar' ? 'rtl' : 'ltr';
        document.querySelectorAll(`.${lang}`).forEach(el => el.classList.remove("d-none"));
        document.querySelectorAll(`.${lang === 'ar' ? 'en' : 'ar'}`).forEach(el => el.classList.add("d-none"));
        elements.authForms.forEach(form => {
          form.style.animation = "fadeInUp 0.4s forwards";
        });

        if (elements.illusAr && elements.illusEn) {
          const activeIllus = lang === 'ar' ? elements.illusAr : elements.illusEn;
          const inactiveIllus = lang === 'ar' ? elements.illusEn : elements.illusAr;
          inactiveIllus.style.animation = "fadeOut 0.7s forwards";
          setTimeout(() => {
            inactiveIllus.classList.remove("active");
            activeIllus.classList.add("active");
            activeIllus.style.animation = "fadeIn 0.7s forwards";
          }, 200);
        }
      });
    };

    const animateButton = (button) => {
      button.style.transform = "scale(0.95)";
      setTimeout(() => button.style.transform = "scale(1)", 150);
    };

    const updatePasswordStrength = (password) => {
      if (!elements.passwordStrengthBar) return;
      const strengthBar = elements.passwordStrengthBar;
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
      console.log('Validating login form:', formData);
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
      console.log('Validating register form:', formData);
      const errors = {};
      if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        errors.email = 'invalidEmail';
      }
      if (!/^(199[0-9]|20[0-1][0-9]|202[0-4])[0-9]{8}$/.test(formData.studentId)) {
        errors.studentId = 'invalidStudentId';
      }
      if (!/^[0-9]{9}$/.test(formData.phone.replace('+213', ''))) {
        errors.phone = 'invalidPhone';
      }
      if (formData.idCard) {
        const maxSize = 5 * 1024 * 1024;
        if (formData.idCard.size > maxSize) {
          errors.idCard = 'invalidIdCardSize';
        }
        if (!formData.idCard.type.startsWith("image/")) {
          errors.idCard = 'invalidIdCardType';
        }
      }
      if (!formData.firstName || formData.firstName.trim() === "") {
        errors.firstName = 'requiredFirstName';
      }
      if (!formData.familyName || formData.familyName.trim() === "") {
        errors.familyName = 'requiredFamilyName';
      }
      if (!formData.faculty) {
        errors.faculty = 'requiredFaculty';
      }
      if (!formData.academicYear) {
        errors.academicYear = 'requiredAcademicYear';
      }
      if (!formData.major || formData.major.trim() === "") {
        errors.major = 'requiredMajor';
      }
      return errors;
    };

    const updateButtonState = (form) => {
      if (!form) return;
      const button = form.querySelector("button");
      if (!button) return;
      const inputs = form.querySelectorAll("input[required], select[required]");
      let isValid = true;
      inputs.forEach(input => {
        if (!input.value || (input.tagName === 'SELECT' && !input.value)) {
          isValid = false;
        }
      });
      button.disabled = !isValid;
      console.log('Button state updated for form:', form.id, 'isValid:', isValid);
    };

    const handleLogin = async (e) => {
      e.preventDefault();
      console.log('Login form submitted at', new Date().toISOString());
      const button = e.target.querySelector("button");
      if (!button || button.disabled) {
        console.warn("Login button disabled or missing");
        return;
      }

      button.disabled = true;
      animateButton(button);

      const originalText = button.innerHTML;
      button.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> ${i18next.t('processing')}`;

      try {
        const email = document.getElementById("loginInput")?.value;
        const password = document.getElementById("loginPassword")?.value;

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
          button.innerHTML = `<i class="fas fa-check-circle"></i> ${i18next.t('loginSuccess')}`;
          console.log('Login successful, user role:', data.role);
          const redirectUrl = {
            ADMIN: './admin-librarian/admin-dashboard.html',
            LIBRARIAN: './admin-librarian/librarian-dashboard.html',
            STUDENT: './student/student-dashboard.html'
          }[data.role] || '/login.html';
          console.log(`Attempting redirect to: ${redirectUrl}`);

          // Validate redirect URL
          try {
            const response = await fetch(redirectUrl, { method: 'HEAD' });
            if (!response.ok) {
              console.warn(`Redirect URL ${redirectUrl} not found (status: ${response.status})`);
              throw new Error('Invalid redirect URL');
            }
            console.log(`Redirect URL ${redirectUrl} is valid`);
          } catch (err) {
            console.error('Redirect URL validation failed:', err);
            redirectUrl = '/login.html';
            console.log(`Falling back to: ${redirectUrl}`);
          }

          setTimeout(() => {
            try {
              console.log('Executing redirect to:', redirectUrl);
              window.location.href = redirectUrl;
            } catch (err) {
              console.error('Redirect failed:', err);
              button.innerHTML = `<i class="fas fa-exclamation-circle"></i> Redirect failed`;
              setTimeout(() => {
                button.innerHTML = originalText;
                button.disabled = false;
              }, 2000);
            }
          }, 1500);
        } else {
          throw new Error(
            data.message?.includes("not verified") ? i18next.t('unverifiedUser') :
            data.message?.includes("Invalid") ? i18next.t('invalidCredentials') :
            i18next.t('serverError')
          );
        }
      } catch (error) {
        console.error("Login error:", error);
        button.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${error.message}`;
        setTimeout(() => {
          button.innerHTML = originalText;
          button.disabled = false;
        }, 2000);
      }
    };

    const handleRegister = async (e) => {
      e.preventDefault();
      console.log('Register form submitted');
      const button = e.target.querySelector("button");
      if (!button || button.disabled) {
        console.warn("Register button disabled or missing");
        return;
      }

      button.disabled = true;
      animateButton(button);

      const originalText = button.innerHTML;
      button.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> ${i18next.t('processing')}`;

      try {
        const formData = new FormData();
        formData.append('firstName', document.getElementById("firstName")?.value || "");
        formData.append('familyName', document.getElementById("familyName")?.value || "");
        formData.append('studentId', document.getElementById("studentId")?.value || "");
        formData.append('faculty', document.getElementById("faculty")?.value || "");
        formData.append('academicYear', document.getElementById("academicYear")?.value || "");
        formData.append('major', document.getElementById("major")?.value || "");
        formData.append('email', document.getElementById("email")?.value || "");
        formData.append('phone', `+213${document.getElementById("phoneNumber")?.value || ""}`);
        formData.append('password', document.getElementById("registerPassword")?.value || "");
        const idCard = document.getElementById("idCard")?.files[0];
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
          idCard: idCard
        };

        const errors = validateRegisterForm(validationData);
        if (Object.keys(errors).length > 0) {
          for (const [field, key] of Object.entries(errors)) {
            const element = document.getElementById(field);
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
          button.innerHTML = `<i class="fas fa-check-circle"></i> ${i18next.t('registerSuccess')}`;
          setTimeout(() => {
            elements.registerForm.reset();
            toggleForms(true);
            button.innerHTML = originalText;
            button.disabled = false;
          }, 1500);
        } else {
          throw new Error(
            response.message?.includes("already exists") ? i18next.t('emailInUse') :
            response.message?.includes("Invalid") ? i18next.t('invalidData') :
            i18next.t('serverError')
          );
        }
      } catch (error) {
        console.error("Register error:", error);
        button.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${error.message}`;
        setTimeout(() => {
          button.innerHTML = originalText;
          button.disabled = false;
        }, 2000);
      }
    };

    // Show Password Toggle
    const togglePasswordVisibility = (button) => {
      console.log('Show password button clicked:', button.id, 'Target:', button.dataset.target);
      const targetId = button.dataset.target;
      const input = document.getElementById(targetId);
      const icon = button.querySelector('i');
      if (!input || !icon) {
        console.error('Input or icon not found for target:', targetId);
        return;
      }
      if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
        button.setAttribute('aria-label', i18next.t('hidePassword'));
        button.dataset.i18nAriaLabel = 'hidePassword';
        console.log('Password shown for:', targetId);
      } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
        button.setAttribute('aria-label', i18next.t('showPassword'));
        button.dataset.i18nAriaLabel = 'showPassword';
        console.log('Password hidden for:', targetId);
      }
    };

    // Setup Show Password Buttons with MutationObserver
    const setupShowPasswordButtons = () => {
      const buttons = document.querySelectorAll('.show-password-btn');
      console.log('Setting up show-password buttons, found:', buttons.length);
      buttons.forEach(button => {
        // Remove existing listeners to prevent duplicates
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
        newButton.addEventListener('click', (e) => {
          console.log('Click event triggered on button:', newButton.id);
          togglePasswordVisibility(newButton);
        });
      });
      return buttons.length;
    };

    // Initial setup
    setupShowPasswordButtons();

    // Observe DOM changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        if (mutation.addedNodes.length || mutation.removedNodes.length) {
          const buttonCount = setupShowPasswordButtons();
          if (buttonCount > 0) {
            console.log('Show-password buttons re-initialized due to DOM change');
            observer.disconnect();
          }
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Fallback: Retry after 1s if no buttons found
    setTimeout(() => {
      const buttons = document.querySelectorAll('.show-password-btn');
      if (buttons.length === 0) {
        console.warn('No show-password buttons found after 1s, final retry');
        setupShowPasswordButtons();
      }
    }, 1000);

    // Event listeners
    elements.showRegisterLinks.forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        console.log('Show register form');
        toggleForms(false);
      });
    });

    elements.showLoginLinks.forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        console.log('Show login form');
        toggleForms(true);
      });
    });

    elements.langButtons.forEach(button => {
      button.addEventListener("click", function() {
        const lang = this.dataset.lang;
        if (!lang) {
          console.error("Language button missing data-lang attribute");
          return;
        }
        animateButton(this);
        elements.langButtons.forEach(btn => btn.classList.remove("active"));
        this.classList.add("active");
        handleLanguageChange(lang);
      });
    });

    elements.loginForm.addEventListener("submit", handleLogin);
    elements.registerForm.addEventListener("submit", handleRegister);

    document.querySelectorAll('input[required], select[required]').forEach(input => {
      input.addEventListener('input', () => {
        input.classList.remove('is-invalid');
        const feedback = input.parentNode.querySelector('.invalid-feedback');
        if (feedback) feedback.remove();
        updateButtonState(input.closest("form"));
      });
    });

    if (elements.passwordInput && elements.passwordStrengthBar) {
      elements.passwordInput.addEventListener('input', () => {
        updatePasswordStrength(elements.passwordInput.value);
      });
    }

    // Initialize button states
    updateButtonState(elements.loginForm);
    updateButtonState(elements.registerForm);

    // Load saved language preference
    handleLanguageChange(savedLang);
    elements.langButtons.forEach(btn => {
      if (btn.dataset.lang === savedLang) btn.classList.add("active");
    });

    console.log('Login script initialized successfully');
  } catch (error) {
    console.error('Critical error in login.js:', error);
  }
});