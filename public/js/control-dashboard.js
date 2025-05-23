// frontend/public/admin-librarian/js/control-dashboard.js
const API_URL = 'https://univ-lib-backend.onrender.com/api';

// Translations for English and Arabic
const translations = {
  en: {
    dashboard: 'Dashboard',
    manageStudents: 'Manage Students',
    manageBooks: 'Manage Books',
    manageReservations: 'Manage Reservations',
    manageFines: 'Manage Fines',
    manageLibrarians: 'Manage Librarians',
    homepage: 'Homepage',
    logout: 'Logout',
    welcomeAdmin: 'Welcome, Admin',
    adminOverview: 'Manage librarians, students, books, and reservations from this dashboard.',
    welcomeLibrarian: 'Welcome, Librarian',
    librarianOverview: 'Manage students, books, reservations, and fines from this dashboard.',
    quickActions: 'Quick Actions',
    addLibrarian: 'Add Librarian',
    addStudent: 'Add Student',
    addBook: 'Add Book',
    viewReservations: 'View Reservations',
    bookManagement: 'Book Management',
    title: 'Title',
    isbn: 'ISBN',
    status: 'Status',
    authors: 'Authors',
    actions: 'Actions',
    edition: 'Edition',
    publisher: 'Publisher',
    publicationYear: 'Publication Year',
    pageCount: 'Page Count',
    language: 'Language',
    digitalCopyUrl: 'Digital Copy URL',
    keywords: 'Keywords',
    coverImage: 'Cover Image',
    available: 'Available',
    checkedOut: 'Checked Out',
    reserved: 'Reserved',
    underMaintenance: 'Under Maintenance',
    lost: 'Lost',
    close: 'Close',
    saveBook: 'Save Book',
    edit: 'Edit',
    delete: 'Delete',
    view: 'View',
    name: 'Name',
    email: 'Email',
    studentId: 'Student ID',
    firstName: 'First Name',
    familyName: 'Family Name',
    password: 'Password',
    faculty: 'Faculty',
    facultyLabel: 'Faculty',
    selectFaculty: 'Select Faculty',
    facultyST: 'Faculty of Science and Technology',
    facultySMA: 'Faculty of Exact Sciences',
    facultyHSS: 'Faculty of Humanities and Social Sciences',
    facultyECMS: 'Faculty of Economic, Commercial, and Management Sciences',
    facultyLPS: 'Faculty of Law and Political Sciences',
    facultyAL: 'Faculty of Arts and Languages',
    facultyIS: 'Faculty of Islamic Sciences',
    facultyENL: 'Faculty of Natural, and Life Sciences',
    studentList: 'Student List',
    librarianList: 'Librarian List',
    paymentFilter: 'Filter by Payment Status',
    all: 'All',
    unpaid: 'Unpaid',
    paid: 'Paid',
    student: 'Student',
    book: 'Book',
    amount: 'Amount',
    created: 'Created',
    confirmAction: 'Confirm Action',
    cancel: 'Cancel',
    confirm: 'Confirm',
    requestDate: 'Request Date',
    home: 'Home',
    welcome: 'Welcome',
    homeOverview: 'This is the University Library System. Navigate to your dashboard to manage library resources.',
    goToDashboard: 'Go to Dashboard',
    systemOverview: 'System Overview',
    overviewDescription: 'The library system allows Admins to manage librarians, students, books, and reservations, while Librarians manage students, books, reservations, and fines.',
    librarySystem: 'Library System',
    accessDeniedAdmin: 'Access denied: Admins only',
    accessDeniedRole: 'Access denied: Invalid role',
    failedLoadBooks: 'Failed to load books',
    failedSaveBook: 'Failed to save book',
    failedUploadImage: 'Failed to upload image',
    bookUpdated: 'Book updated successfully',
    bookCreated: 'Book created successfully',
    bookDeleted: 'Book deleted successfully',
    failedDeleteBook: 'Failed to delete book',
    failedAddStudent: 'Failed to add student',
    studentAdded: 'Student added successfully',
    failedLoadStudents: 'Failed to load students',
    failedAddLibrarian: 'Failed to add librarian',
    librarianAdded: 'Librarian added successfully',
    failedLoadLibrarians: 'Failed to load librarians',
    failedLoadReservations: 'Failed to load reservations',
    failedUpdateReservation: 'Failed to update reservation',
    reservationApproved: 'Reservation approved',
    reservationRejected: 'Reservation rejected',
    failedLoadFines: 'Failed to load fines',
    failedUpdateFine: 'Failed to update fine',
    finePaid: 'Fine marked as paid'
  },
  ar: {
    dashboard: 'لوحة التحكم',
    manageStudents: 'إدارة الطلاب',
    manageBooks: 'إدارة الكتب',
    manageReservations: 'إدارة الحجوزات',
    manageFines: 'إدارة الغرامات',
    manageLibrarians: 'إدارة أمناء المكتبة',
    homepage: 'الصفحة الرئيسية',
    logout: 'تسجيل الخروج',
    welcomeAdmin: 'مرحبًا، المسؤول',
    adminOverview: 'إدارة أمناء المكتبة، الطلاب، الكتب، والحجوزات من لوحة التحكم هذه.',
    welcomeLibrarian: 'مرحبًا، أمين المكتبة',
    librarianOverview: 'إدارة الطلاب، الكتب، الحجوزات، والغرامات من لوحة التحكم هذه.',
    quickActions: 'إجراءات سريعة',
    addLibrarian: 'إضافة أمين مكتبة',
    addStudent: 'إضافة طالب',
    addBook: 'إضافة كتاب',
    viewReservations: 'عرض الحجوزات',
    bookManagement: 'إدارة الكتب',
    title: 'العنوان',
    isbn: 'رقم ISBN',
    status: 'الحالة',
    authors: 'المؤلفون',
    actions: 'الإجراءات',
    edition: 'الإصدار',
    publisher: 'الناشر',
    publicationYear: 'سنة النشر',
    pageCount: 'عدد الصفحات',
    language: 'اللغة',
    digitalCopyUrl: 'رابط النسخة الرقمية',
    keywords: 'الكلمات المفتاحية',
    coverImage: 'صورة الغلاف',
    available: 'متاح',
    checkedOut: 'مستعار',
    reserved: 'محجوز',
    underMaintenance: 'تحت الصيانة',
    lost: 'مفقود',
    close: 'إغلاق',
    saveBook: 'حفظ الكتاب',
    edit: 'تعديل',
    delete: 'حذف',
    view: 'عرض',
    name: 'الاسم',
    email: 'البريد الإلكتروني',
    studentId: 'رقم الطالب',
    firstName: 'الاسم الأول',
    familyName: 'اسم العائلة',
    password: 'كلمة المرور',
    faculty: 'الكلية',
    facultyLabel: 'الكلية',
    selectFaculty: 'اختر الكلية',
    facultyST: 'كلية العلوم والتكنولوجيا',
    facultySMA: 'كلية العلوم الدقيقة',
    facultyHSS: 'كلية العلوم الإنسانية والاجتماعية',
    facultyECMS: 'كلية العلوم الاقتصادية والتجارية وعلوم التسيير',
    facultyLPS: 'كلية الحقوق والعلوم السياسية',
    facultyAL: 'كلية الآداب واللغات',
    facultyIS: 'كلية العلوم الإسلامية',
    facultyENL: 'كلية العلوم الطبيعية والحياة',
    studentList: 'قائمة الطلاب',
    librarianList: 'قائمة أمناء المكتبة',
    paymentFilter: 'تصفية حسب حالة الدفع',
    all: 'الكل',
    unpaid: 'غير مدفوع',
    paid: 'مدفوع',
    student: 'الطالب',
    book: 'الكتاب',
    amount: 'المبلغ',
    created: 'تاريخ الإنشاء',
    confirmAction: 'تأكيد الإجراء',
    cancel: 'إلغاء',
    confirm: 'تأكيد',
    requestDate: 'تاريخ الطلب',
    home: 'الرئيسية',
    welcome: 'مرحبًا',
    homeOverview: 'هذا هو نظام مكتبة الجامعة. انتقل إلى لوحة التحكم الخاصة بك لإدارة موارد المكتبة.',
    goToDashboard: 'الذهاب إلى لوحة التحكم',
    systemOverview: 'نظرة عامة على النظام',
    overviewDescription: 'يسمح نظام المكتبة للمسؤولين بإدارة أمناء المكتبة، الطلاب، الكتب، والحجوزات، بينما يدير أمناء المكتبة الطلاب، الكتب، الحجوزات، والغرامات.',
    librarySystem: 'نظام المكتبة',
    accessDeniedAdmin: 'الوصول مرفوض: للمسؤولين فقط',
    accessDeniedRole: 'الوصول مرفوض: دور غير صالح',
    failedLoadBooks: 'فشل تحميل الكتب',
    failedSaveBook: 'فشل حفظ الكتاب',
    failedUploadImage: 'فشل رفع الصورة',
    bookUpdated: 'تم تحديث الكتاب بنجاح',
    bookCreated: 'تم إنشاء الكتاب بنجاح',
    bookDeleted: 'تم حذف الكتاب بنجاح',
    failedDeleteBook: 'فشل حذف الكتاب',
    failedAddStudent: 'فشل إضافة الطالب',
    studentAdded: 'تم إضافة الطالب بنجاح',
    failedLoadStudents: 'فشل تحميل الطلاب',
    failedAddLibrarian: 'فشل إضافة أمين المكتبة',
    librarianAdded: 'تم إضافة أمين المكتبة بنجاح',
    failedLoadLibrarians: 'فشل تحميل أمناء المكتبة',
    failedLoadReservations: 'فشل تحميل الحجوزات',
    failedUpdateReservation: 'فشل تحديث الحجز',
    reservationApproved: 'تمت الموافقة على الحجز',
    reservationRejected: 'تم رفض الحجز',
    failedLoadFines: 'فشل تحميل الغرامات',
    failedUpdateFine: 'فشل تحديث الغرامة',
    finePaid: 'تم تسجيل الغرامة كمدفوعة'
  }
};

// Utility Functions
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

const showError = (element, message) => {
  const alert = document.createElement('div');
  alert.className = 'alert alert-danger';
  alert.textContent = message;
  element.prepend(alert);
  gsap.from(alert, { opacity: 0, y: -20, duration: 0.5 });
  setTimeout(() => alert.remove(), 3000);
};

const showSuccess = (element, message) => {
  const alert = document.createElement('div');
  alert.className = 'alert alert-success';
  alert.textContent = message;
  element.prepend(alert);
  gsap.from(alert, { opacity: 0, y: -20, duration: 0.5 });
  setTimeout(() => alert.remove(), 3000);
};

const animateRows = (list) => {
  gsap.from(list.querySelectorAll('tr'), {
    opacity: 0,
    y: 20,
    stagger: 0.1,
    duration: 0.5
  });
};

const initI18next = () => {
  const savedLang = localStorage.getItem('language') || 'en';
  i18next.use(i18nextBrowserLanguageDetector).init({
    lng: savedLang,
    fallbackLng: 'en',
    resources: {
      en: { translation: translations.en },
      ar: { translation: translations.ar }
    }
  }, () => {
    updateUILanguage();
  });
};

const updateUILanguage = () => {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = i18next.t(el.dataset.i18n);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = i18next.t(el.dataset.i18nPlaceholder);
  });
  document.body.style.direction = i18next.language === 'ar' ? 'rtl' : 'ltr';
  const langButton = document.getElementById('language-toggle');
  if (langButton) {
    langButton.textContent = i18next.language === 'ar' ? 'EN' : 'AR';
  }
};

const switchLanguage = () => {
  const newLang = i18next.language === 'en' ? 'ar' : 'en';
  i18next.changeLanguage(newLang, () => {
    localStorage.setItem('language', newLang);
    updateUILanguage();
  });
};

const setupSidebar = () => {
  const toggleBtn = document.getElementById('toggle-btn');
  const sidebar = document.getElementById('sidebar');
  const mainContent = document.getElementById('main-content');
  if (toggleBtn && sidebar && mainContent) {
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
      toggleBtn.classList.toggle('collapsed');
      mainContent.classList.toggle('expanded');
    });
  }
  const logoutBtn = document.getElementById('logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      window.location.href = './login.html';
    });
  }
  const langButton = document.getElementById('language-toggle');
  if (langButton) {
    langButton.addEventListener('click', switchLanguage);
  }
  if (currentUserRole === 'LIBRARIAN') {
    const librarianLink = document.querySelector('a[href="/admin-librarian/admin-librarians.html"]');
    if (librarianLink) {
      librarianLink.parentElement.style.display = 'none';
    }
  }
};

// API Functions
const getAllUsers = async () => {
  try {
    const response = await fetch(`${API_URL}/user`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    if (!response.ok) throw new Error('Failed to fetch users');
    return await response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    return { ok: false, msg: 'Network error' };
  }
};

const signup = async (formData) => {
  try {
    const response = await fetch(`${API_URL}/user/signup`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      body: formData
    });
    if (!response.ok) throw new Error('Failed to sign up');
    return await response.json();
  } catch (error) {
    console.error('Error signing up:', error);
    return { ok: false, msg: 'Network error' };
  }
};

const createBook = async (data) => {
  try {
    const response = await fetch(`${API_URL}/book`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to create book');
    return await response.json();
  } catch (error) {
    console.error('Error creating book:', error);
    return { ok: false, msg: 'Network error' };
  }
};

const updateBook = async (bookId, data) => {
  try {
    const response = await fetch(`${API_URL}/book/${bookId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to update book');
    return await response.json();
  } catch (error) {
    console.error('Error updating book:', error);
    return { ok: false, msg: 'Network error' };
  }
};

const deleteBook = async (bookId) => {
  try {
    const response = await fetch(`${API_URL}/book/${bookId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    if (!response.ok) throw new Error('Failed to delete book');
    return await response.json();
  } catch (error) {
    console.error('Error deleting book:', error);
    return { ok: false, msg: 'Network error' };
  }
};

const uploadBookImage = async (bookId, imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);
  try {
    const response = await fetch(`${API_URL}/book/image/${bookId}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      body: formData
    });
    if (!response.ok) throw new Error('Failed to upload image');
    return await response.json();
  } catch (error) {
    console.error('Error uploading image:', error);
    return { ok: false, msg: 'Network error' };
  }
};

const getAllReservations = async () => {
  try {
    const response = await fetch(`${API_URL}/reservation`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    if (!response.ok) throw new Error('Failed to fetch reservations');
    return await response.json();
  } catch (error) {
    console.error('Error fetching reservations:', error);
    return { ok: false, msg: 'Network error' };
  }
};

const updateReservation = async (reservationId, status) => {
  try {
    const response = await fetch(`${API_URL}/reservation/${reservationId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status })
    });
    if (!response.ok) throw new Error('Failed to update reservation');
    return await response.json();
  } catch (error) {
    console.error('Error updating reservation:', error);
    return { ok: false, msg: 'Network error' };
  }
};

const getAllFines = async () => {
  try {
    const response = await fetch(`${API_URL}/fine`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    if (!response.ok) throw new Error('Failed to fetch fines');
    return await response.json();
  } catch (error) {
    console.error('Error fetching fines:', error);
    return { ok: false, msg: 'Network error' };
  }
};

const updateFine = async (fineId, status) => {
  try {
    const response = await fetch(`${API_URL}/fine/${fineId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status })
    });
    if (!response.ok) throw new Error('Failed to update fine');
    return await response.json();
  } catch (error) {
    console.error('Error updating fine:', error);
    return { ok: false, msg: 'Network error' };
  }
};

// Authentication
let currentUserRole = null;

const checkAuth = async (restrictToAdmin = false) => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.log('No token found, redirecting to ./login.html');
    window.location.href = './login.html';
    return false;
  }
  try {
    const response = await fetch(`${API_URL}/user/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!response.ok) throw new Error('Unauthorized');
    const { data } = await response.json();
    console.log('Auth check response:', data);
    currentUserRole = data.role;
    if (restrictToAdmin && data.role !== 'ADMIN') {
      showError(document.querySelector('.main-content'), i18next.t('accessDeniedAdmin'));
      window.location.href = data.role === 'LIBRARIAN' ? '/admin-librarian/librarian-dashboard.html' : '/student/student-dashboard.html';
      return false;
    }
    if (data.role === 'STUDENT') {
      console.log('Student role detected, redirecting to /student/student-dashboard.html');
      window.location.href = '/student/student-dashboard.html';
      return false;
    }
    if (!['ADMIN', 'LIBRARIAN'].includes(data.role)) {
      showError(document.querySelector('.main-content'), i18next.t('accessDeniedRole'));
      console.log('Invalid role detected, redirecting to ./login.html');
      window.location.href = './login.html';
      return false;
    }
    return true;
  } catch (error) {
    console.error('Auth error:', error);
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    console.log('Auth failed, redirecting to ./login.html');
    window.location.href = './login.html';
    return false;
  }
};

// Book Management
const loadBooks = async () => {
  try {
    const response = await fetch(`${API_URL}/book/all`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    if (!response.ok) throw new Error('Failed to fetch books');
    const { data } = await response.json();
    displayBooks(data);
  } catch (error) {
    console.error('Error loading books:', error);
    showError(document.querySelector('.main-content'), i18next.t('failedLoadBooks'));
  }
};

const displayBooks = (books) => {
  const tbody = document.getElementById('bookTableBody');
  if (!tbody) return;
  tbody.innerHTML = '';
  books.forEach(book => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${book.title}</td>
      <td>${book.isbn}</td>
      <td><span class="badge badge-${book.status === 'AVAILABLE' ? 'success' : 'danger'}">${i18next.t(book.status.toLowerCase())}</span></td>
      <td>${book.authors.join(', ')}</td>
      <td>
        <button class="btn btn-sm btn-outline-primary me-1" onclick="controlDashboard.editBook('${book.id}')"><i class="fas fa-edit"></i> <span data-i18n="edit">Edit</span></button>
        <button class="btn btn-sm btn-outline-danger me-1" onclick="controlDashboard.deleteBook('${book.id}')"><i class="fas fa-trash"></i> <span data-i18n="delete">Delete</span></button>
        <a href="/main/reservations.html?bookId=${book.id}" class="btn btn-sm btn-outline-info"><i class="fas fa-eye"></i> <span data-i18n="view">View</span></a>
      </td>
    `;
    tbody.appendChild(tr);
  });
  animateRows(tbody);
};

const setupBookForm = () => {
  const addBookBtn = document.getElementById('addBookBtn');
  const bookForm = document.getElementById('bookForm');
  if (addBookBtn) {
    addBookBtn.addEventListener('click', () => {
      document.getElementById('bookModalLabel').textContent = i18next.t('addBook');
      bookForm.reset();
      document.getElementById('bookId').value = '';
      new bootstrap.Modal(document.getElementById('bookModal')).show();
    });
  }
  if (bookForm) {
    bookForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const bookId = document.getElementById('bookId').value;
      const fields = {
        isbn: document.getElementById('isbn').value,
        title: document.getElementById('title').value,
        edition: document.getElementById('edition').value,
        publisher: document.getElementById('publisher').value,
        publicationYear: parseInt(document.getElementById('publicationYear').value) || undefined,
        pageCount: parseInt(document.getElementById('pageCount').value) || undefined,
        language: document.getElementById('language').value,
        digitalCopyUrl: document.getElementById('digitalCopyUrl').value,
        authors: document.getElementById('authors').value.split(',').map(s => s.trim()).filter(Boolean),
        keywords: document.getElementById('keywords').value.split(',').map(s => s.trim()).filter(Boolean),
        status: document.getElementById('status').value
      };
      const coverImage = document.getElementById('coverImage').files[0];
      try {
        let response;
        if (bookId) {
          response = await updateBook(bookId, fields);
        } else {
          response = await createBook(fields);
        }
        if (!response.ok) {
          showError(bookForm, response.msg || i18next.t('failedSaveBook'));
          return;
        }
        if (coverImage && response.data?.id) {
          const imageResponse = await uploadBookImage(response.data.id, coverImage);
          if (!imageResponse.ok) {
            showError(bookForm, imageResponse.msg || i18next.t('failedUploadImage'));
          }
        }
        showSuccess(bookForm, i18next.t(bookId ? 'bookUpdated' : 'bookCreated'));
        bootstrap.Modal.getInstance(document.getElementById('bookModal')).hide();
        loadBooks();
      } catch (error) {
        console.error('Error saving book:', error);
        showError(bookForm, i18next.t('failedSaveBook'));
      }
    });
  }
};

const editBook = async (bookId) => {
  try {
    const response = await fetch(`${API_URL}/book/${bookId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    if (!response.ok) throw new Error('Failed to fetch book');
    const { data } = await response.json();
    document.getElementById('bookId').value = data.id;
    document.getElementById('isbn').value = data.isbn;
    document.getElementById('title').value = data.title;
    document.getElementById('edition').value = data.edition;
    document.getElementById('publisher').value = data.publisher;
    document.getElementById('publicationYear').value = data.publicationYear;
    document.getElementById('pageCount').value = data.pageCount;
    document.getElementById('language').value = data.language;
    document.getElementById('digitalCopyUrl').value = data.digitalCopyUrl;
    document.getElementById('authors').value = data.authors.join(', ');
    document.getElementById('keywords').value = data.keywords.join(', ');
    document.getElementById('status').value = data.status;
    document.getElementById('bookModalLabel').textContent = i18next.t('editBook');
    new bootstrap.Modal(document.getElementById('bookModal')).show();
  } catch (error) {
    console.error('Error editing book:', error);
    showError(document.querySelector('.main-content'), i18next.t('failedLoadBook'));
  }
};

const deleteBookAction = async (bookId) => {
  try {
    const response = await deleteBook(bookId);
    if (!response.ok) {
      showError(document.querySelector('.main-content'), response.msg || i18next.t('failedDeleteBook'));
      return;
    }
    showSuccess(document.querySelector('.main-content'), i18next.t('bookDeleted'));
    loadBooks();
  } catch (error) {
    console.error('Error deleting book:', error);
    showError(document.querySelector('.main-content'), i18next.t('failedDeleteBook'));
  }
};

// Student Management
const setupStudentForm = () => {
  const studentForm = document.getElementById('add-student-form');
  if (studentForm) {
    studentForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('firstName', document.getElementById('firstName').value);
      formData.append('familyName', document.getElementById('familyName').value);
      formData.append('studentId', document.getElementById('studentId').value);
      formData.append('email', document.getElementById('email').value);
      formData.append('password', document.getElementById('password').value);
      formData.append('faculty', document.getElementById('faculty').value);
      formData.append('role', 'STUDENT');
      try {
        const response = await signup(formData);
        if (!response.ok) {
          showError(studentForm, response.msg || i18next.t('failedAddStudent'));
          return;
        }
        showSuccess(studentForm, i18next.t('studentAdded'));
        studentForm.reset();
        loadStudents();
      } catch (error) {
        console.error('Error adding student:', error);
        showError(studentForm, i18next.t('failedAddStudent'));
      }
    });
  }
};

const loadStudents = async () => {
  try {
    const response = await getAllUsers();
    if (!response.ok) throw new Error('Failed to fetch students');
    const students = response.data.filter(user => user.role === 'STUDENT');
    displayStudents(students);
  } catch (error) {
    console.error('Error loading students:', error);
    showError(document.querySelector('.main-content'), i18next.t('failedLoadStudents'));
  }
};

const displayStudents = (students) => {
  const tbody = document.getElementById('student-list');
  if (!tbody) return;
  tbody.innerHTML = '';
  students.forEach(student => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${student.firstName} ${student.familyName}</td>
      <td>${student.studentId}</td>
      <td>${student.email}</td>
      <td><span class="badge badge-${student.status === 'ACTIVE' ? 'success' : 'danger'}">${student.status}</span></td>
      <td>
        <button class="btn btn-sm btn-outline-primary me-1" onclick="controlDashboard.editStudent('${student.id}')"><i class="fas fa-edit"></i> <span data-i18n="edit">Edit</span></button>
        <button class="btn btn-sm btn-outline-danger me-1" onclick="controlDashboard.deleteStudent('${student.id}')"><i class="fas fa-trash"></i> <span data-i18n="delete">Delete</span></button>
      </td>
    `;
    tbody.appendChild(tr);
  });
  animateRows(tbody);
};

// Librarian Management
const setupLibrarianForm = () => {
  const librarianForm = document.getElementById('add-librarian-form');
  if (librarianForm) {
    librarianForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('firstName', document.getElementById('firstName').value);
      formData.append('familyName', document.getElementById('familyName').value);
      formData.append('email', document.getElementById('email').value);
      formData.append('password', document.getElementById('password').value);
      formData.append('role', 'LIBRARIAN');
      try {
        const response = await signup(formData);
        if (!response.ok) {
          showError(librarianForm, response.msg || i18next.t('failedAddLibrarian'));
          return;
        }
        showSuccess(librarianForm, i18next.t('librarianAdded'));
        librarianForm.reset();
        loadLibrarians();
      } catch (error) {
        console.error('Error adding librarian:', error);
        showError(librarianForm, i18next.t('failedAddLibrarian'));
      }
    });
  }
};

const loadLibrarians = async () => {
  try {
    const response = await getAllUsers();
    if (!response.ok) throw new Error('Failed to fetch librarians');
    const librarians = response.data.filter(user => user.role === 'LIBRARIAN');
    displayLibrarians(librarians);
  } catch (error) {
    console.error('Error loading librarians:', error);
    showError(document.querySelector('.main-content'), i18next.t('failedLoadLibrarians'));
  }
};

const displayLibrarians = (librarians) => {
  const tbody = document.getElementById('librarian-list');
  if (!tbody) return;
  tbody.innerHTML = '';
  librarians.forEach(librarian => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${librarian.firstName} ${librarian.familyName}</td>
      <td>${librarian.email}</td>
      <td><span class="badge badge-${librarian.status === 'ACTIVE' ? 'success' : 'danger'}">${librarian.status}</span></td>
      <td>
        <button class="btn btn-sm btn-outline-primary me-1" onclick="controlDashboard.editLibrarian('${librarian.id}')"><i class="fas fa-edit"></i> <span data-i18n="edit">Edit</span></button>
        <button class="btn btn-sm btn-outline-danger me-1" onclick="controlDashboard.deleteLibrarian('${librarian.id}')"><i class="fas fa-trash"></i> <span data-i18n="delete">Delete</span></button>
      </td>
    `;
    tbody.appendChild(tr);
  });
  animateRows(tbody);
};

// Reservation Management
const loadReservations = async () => {
  try {
    const response = await getAllReservations();
    if (!response.ok) throw new Error('Failed to fetch reservations');
    const { data } = await response.json();
    displayReservations(data);
  } catch (error) {
    console.error('Error loading reservations:', error);
    showError(document.querySelector('.main-content'), i18next.t('failedLoadReservations'));
  }
};

const displayReservations = (reservations) => {
  const tbody = document.getElementById('reservation-list');
  if (!tbody) return;
  tbody.innerHTML = '';
  reservations.forEach(reservation => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${reservation.student?.firstName} ${reservation.student?.familyName}</td>
      <td>${reservation.book?.title}</td>
      <td>${new Date(reservation.requestDate).toLocaleDateString()}</td>
      <td><span class="badge badge-${reservation.status === 'PENDING' ? 'warning' : reservation.status === 'APPROVED' ? 'success' : 'danger'}">${reservation.status}</span></td>
      <td>
        <button class="btn btn-sm btn-outline-primary me-1" onclick="controlDashboard.approveReservation('${reservation.id}')"><i class="fas fa-check"></i> <span data-i18n="approve">Approve</span></button>
        <button class="btn btn-sm btn-outline-danger me-1" onclick="controlDashboard.rejectReservation('${reservation.id}')"><i class="fas fa-times"></i> <span data-i18n="reject">Reject</span></button>
      </td>
    `;
    tbody.appendChild(tr);
  });
  animateRows(tbody);
};

const approveReservation = async (reservationId) => {
  try {
    const response = await updateReservation(reservationId, 'APPROVED');
    if (!response.ok) {
      showError(document.querySelector('.main-content'), response.msg || i18next.t('failedUpdateReservation'));
      return;
    }
    showSuccess(document.querySelector('.main-content'), i18next.t('reservationApproved'));
    loadReservations();
  } catch (error) {
    console.error('Error approving reservation:', error);
    showError(document.querySelector('.main-content'), i18next.t('failedUpdateReservation'));
  }
};

const rejectReservation = async (reservationId) => {
  try {
    const response = await updateReservation(reservationId, 'REJECTED');
    if (!response.ok) {
      showError(document.querySelector('.main-content'), response.msg || i18next.t('failedUpdateReservation'));
      return;
    }
    showSuccess(document.querySelector('.main-content'), i18next.t('reservationRejected'));
    loadReservations();
  } catch (error) {
    console.error('Error rejecting reservation:', error);
    showError(document.querySelector('.main-content'), i18next.t('failedUpdateReservation'));
  }
};

// Fines Management
const loadFines = async (filter = 'all') => {
  try {
    const response = await getAllFines();
    if (!response.ok) throw new Error('Failed to fetch fines');
    let { data } = await response.json();
    if (filter === 'paid') data = data.filter(fine => fine.status === 'PAID');
    if (filter === 'unpaid') data = data.filter(fine => fine.status === 'UNPAID');
    displayFines(data);
  } catch (error) {
    console.error('Error loading fines:', error);
    showError(document.querySelector('.main-content'), i18next.t('failedLoadFines'));
  }
};

const displayFines = (fines) => {
  const tbody = document.getElementById('finesTableBody');
  if (!tbody) return;
  tbody.innerHTML = '';
  fines.forEach(fine => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${fine.student?.firstName} ${fine.student?.familyName}</td>
      <td>${fine.book?.title}</td>
      <td>${fine.amount}</td>
      <td><span class="badge badge-${fine.status === 'PAID' ? 'success' : 'danger'}">${i18next.t(fine.status.toLowerCase())}</span></td>
      <td>${new Date(fine.createdAt).toLocaleDateString()}</td>
      <td>
        <button class="btn btn-sm btn-outline-primary me-1" onclick="controlDashboard.markFinePaid('${fine.id}')"><i class="fas fa-check"></i> <span data-i18n="markPaid">Mark Paid</span></button>
      </td>
    `;
    tbody.appendChild(tr);
  });
  animateRows(tbody);
};

const markFinePaid = async (fineId) => {
  try {
    const response = await updateFine(fineId, 'PAID');
    if (!response.ok) {
      showError(document.querySelector('.main-content'), response.msg || i18next.t('failedUpdateFine'));
      return;
    }
    showSuccess(document.querySelector('.main-content'), i18next.t('finePaid'));
    loadFines(document.getElementById('paymentFilter')?.value || 'all');
  } catch (error) {
    console.error('Error marking fine as paid:', error);
    showError(document.querySelector('.main-content'), i18next.t('failedUpdateFine'));
  }
};

const setupFinesFilter = () => {
  const paymentFilter = document.getElementById('paymentFilter');
  if (paymentFilter) {
    paymentFilter.addEventListener('change', () => {
      loadFines(paymentFilter.value);
    });
  }
};

// Home Page Setup
const setupHomePage = () => {
  const dashboardLink = document.getElementById('dashboard-link');
  const goToDashboardBtn = document.getElementById('go-to-dashboard');
  if (dashboardLink && goToDashboardBtn) {
    const dashboardUrl = currentUserRole === 'ADMIN' ? '/admin-librarian/admin-dashboard.html' : '/admin-librarian/librarian-dashboard.html';
    dashboardLink.href = dashboardUrl;
    goToDashboardBtn.addEventListener('click', () => {
      window.location.href = dashboardUrl;
    });
  }
};

// Global Control Dashboard Object
const controlDashboard = {
  editBook,
  deleteBook: deleteBookAction,
  approveReservation,
  rejectReservation,
  markFinePaid,
  editStudent: async (studentId) => {
    alert('Edit student functionality not implemented yet.');
  },
  deleteStudent: async (studentId) => {
    alert('Delete student functionality not implemented yet.');
  },
  editLibrarian: async (librarianId) => {
    alert('Edit librarian functionality not implemented yet.');
  },
  deleteLibrarian: async (librarianId) => {
    alert('Delete librarian functionality not implemented yet.');
  }
};

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
  initI18next();
  const isHomePage = window.location.pathname.includes('home.html');
  const isLibrarianPage = window.location.pathname.includes('/admin-librarian/librarian-dashboard.html');
  const isAdminOnlyPage = window.location.pathname.includes('/admin-librarian/admin-librarians.html');
  await checkAuth(isAdminOnlyPage);
  setupSidebar();
  if (isHomePage) {
    setupHomePage();
  }
  if (window.location.pathname.includes('admin-books.html')) {
    setupBookForm();
    loadBooks();
  }
  if (window.location.pathname.includes('admin-students.html')) {
    setupStudentForm();
    loadStudents();
  }
  if (window.location.pathname.includes('admin-librarians.html')) {
    setupLibrarianForm();
    loadLibrarians();
  }
  if (window.location.pathname.includes('admin-reservations.html')) {
    loadReservations();
  }
  if (window.location.pathname.includes('librarian-fines.html')) {
    setupFinesFilter();
    loadFines();
  }
});