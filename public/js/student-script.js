import i18next from 'https://cdn.jsdelivr.net/npm/i18next@23.11.5/dist/umd/i18next.min.js';
import LanguageDetector from 'https://cdn.jsdelivr.net/npm/i18next-browser-languagedetector@8.0.0/dist/umd/i18nextBrowserLanguageDetector.min.js';
import { gsap } from 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';

const API_URL = 'http://localhost:5000/api';

// Consolidated translations
const translations = {
  en: {
    translation: {
      libraryTitle: 'University Library',
      home: 'Home',
      dashboard: 'Dashboard',
      browseBooks: 'Browse Books',
      myReservations: 'My Reservations',
      myFines: 'My Fines',
      profile: 'Profile',
      logout: 'Logout',
      welcomeStudent: 'Welcome',
      homeOverview: 'Your library hub: explore books, manage reservations, check fines, and update your profile with ease.',
      dashboardOverview: 'Manage your library activities: browse books, reserve titles, check fines, and update your profile.',
      quickActions: 'Quick Actions',
      activeReservations: 'Active Reservations',
      outstandingFines: 'Outstanding Fines',
      booksBorrowed: 'Books Borrowed',
      recentReservations: 'Recent Reservations',
      recentFines: 'Recent Fines',
      viewDetails: 'View Details',
      viewReservations: 'View Reservations',
      viewFines: 'View Fines',
      updateProfile: 'Update Profile',
      search: 'Search',
      searchPlaceholder: 'Search by title, author, ISBN, or keyword...',
      reserve: 'Reserve',
      reserveBook: 'Reserve Book',
      startDate: 'Start Date',
      returnDate: 'Return Date',
      cancel: 'Cancel',
      bookTitle: 'Book Title',
      amount: 'Amount',
      status: 'Status',
      createdAt: 'Created',
      actions: 'Actions',
      cancelReservation: 'Cancel Reservation',
      confirm: 'Confirm',
      myProfile: 'My Profile',
      firstName: 'First Name',
      familyName: 'Family Name',
      email: 'Email',
      phone: 'Phone',
      profilePic: 'Profile Picture',
      changePicture: 'Change Picture',
      studentDetails: 'Student Details',
      studentId: 'Student ID',
      faculty: 'Faculty',
      academicYear: 'Academic Year',
      major: 'Major',
      studentDashboard: 'Student Dashboard',
      borrowBook: 'Borrow Book',
      borrowedBooks: 'Borrowed Books',
      homepage: 'Homepage',
      selectBook: 'Select Book',
      pendingRequests: 'Pending Requests',
      requestDate: 'Request Date',
      edit: 'Edit',
      requestSubmitted: 'Borrow request submitted',
      requestUpdated: 'Borrow request updated',
      requestCancelled: 'Borrow request cancelled',
      networkError: 'Network error',
      error: 'Error',
      borrowDate: 'Borrow Date'
    }
  },
  ar: {
    translation: {
      libraryTitle: 'مكتبة الجامعة',
      home: 'الرئيسية',
      dashboard: 'لوحة التحكم',
      browseBooks: 'تصفح الكتب',
      myReservations: 'حجوزاتي',
      myFines: 'غراماتي',
      profile: 'الملف الشخصي',
      logout: 'تسجيل الخروج',
      welcomeStudent: 'مرحباً',
      homeOverview: 'مركز مكتبتك: استكشف الكتب، وأدر الحجوزات، وتحقق من الغرامات، وقم بتحديث ملفك الشخصي بسهولة.',
      dashboardOverview: 'إدارة أنشطتك في المكتبة: تصفح الكتب، احجز العناوين، تحقق من الغرامات، وقم بتحديث ملفك الشخصي.',
      quickActions: 'إجراءات سريعة',
      activeReservations: 'الحجوزات النشطة',
      outstandingFines: 'الغرامات المستحقة',
      booksBorrowed: 'الكتب المستعارة',
      recentReservations: 'الحجوزات الأخيرة',
      recentFines: 'الغرامات الأخيرة',
      viewDetails: 'عرض التفاصيل',
      viewReservations: 'عرض الحجوزات',
      viewFines: 'عرض الغرامات',
      updateProfile: 'تحديث الملف الشخصي',
      search: 'بحث',
      searchPlaceholder: 'ابحث حسب العنوان، المؤلف، ISBN، أو الكلمة المفتاحية...',
      reserve: 'حجز',
      reserveBook: 'حجز كتاب',
      startDate: 'تاريخ البدء',
      returnDate: 'تاريخ الإرجاع',
      cancel: 'إلغاء',
      bookTitle: 'عنوان الكتاب',
      amount: 'المبلغ',
      status: 'الحالة',
      createdAt: 'تاريخ الإنشاء',
      actions: 'الإجراءات',
      cancelReservation: 'إلغاء الحجز',
      confirm: 'تأكيد',
      myProfile: 'ملفي الشخصي',
      firstName: 'الاسم الأول',
      familyName: 'اسم العائلة',
      email: 'البريد الإلكتروني',
      phone: 'الهاتف',
      profilePic: 'صورة الملف الشخصي',
      changePicture: 'تغيير الصورة',
      studentDetails: 'تفاصيل الطالب',
      studentId: 'رقم الطالب',
      faculty: 'الكلية',
      academicYear: 'السنة الأكاديمية',
      major: 'التخصص',
      studentDashboard: 'لوحة تحكم الطالب',
      borrowBook: 'استعارة كتاب',
      borrowedBooks: 'الكتب المستعارة',
      homepage: 'الصفحة الرئيسية',
      selectBook: 'اختر كتابًا',
      pendingRequests: 'الطلبات المعلقة',
      requestDate: 'تاريخ الطلب',
      edit: 'تعديل',
      requestSubmitted: 'تم تقديم طلب الاستعارة',
      requestUpdated: 'تم تحديث طلب الاستعارة',
      requestCancelled: 'تم إلغاء طلب الاستعارة',
      networkError: 'خطأ في الشبكة',
      error: 'خطأ',
      borrowDate: 'تاريخ الاستعارة'
    }
  }
};

// Initialize i18next
function initI18next(callback) {
  i18next.use(LanguageDetector).init({
    fallbackLng: 'en',
    resources: translations
  }, (err) => {
    if (err) console.error('i18next error:', err);
    updateContent();
    if (callback) callback();
  });
}

function updateContent() {
  document.querySelectorAll('[data-i18n]').forEach(elem => {
    const key = elem.getAttribute('data-i18n');
    if (key.includes('[placeholder]')) {
      elem.placeholder = i18next.t(key.split('[placeholder]')[1]);
    } else {
      elem.textContent = i18next.t(key);
    }
  });
  document.body.setAttribute('lang', i18next.language);
  document.body.style.direction = i18next.language === 'ar' ? 'rtl' : 'ltr';
}

// Check authentication
async function checkAuth() {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = '/main/login.html';
    return false;
  }

  try {
    const response = await fetch(`${API_URL}/user/`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!response.ok) throw new Error('Unauthorized');
    const { data } = await response.json();
    if (data.role !== 'STUDENT') {
      alert(i18next.t('error') + ': Access denied. Student role required.');
      window.location.href = '/main/index.html';
      return false;
    }
    return data;
  } catch (error) {
    console.error('Auth error:', error);
    localStorage.removeItem('token');
    window.location.href = '/main/login.html';
    return false;
  }
}

// Logout
function setupLogout() {
  const logoutBtn = document.getElementById('logoutBtn') || document.getElementById('logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('token');
      window.location.href = '/main/login.html';
    });
  }
}

// Utility: Debounce
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// Utility: Show Error
function showError(container, message) {
  const errorDiv = document.createElement('div');
  errorDiv.className = 'alert alert-danger';
  errorDiv.textContent = message;
  container.prepend(errorDiv);
  setTimeout(() => errorDiv.remove(), 3000);
}

// Utility: Show Success
function showSuccess(container, message) {
  const successDiv = document.createElement('div');
  successDiv.className = 'alert alert-success';
  successDiv.textContent = message;
  container.prepend(successDiv);
  setTimeout(() => successDiv.remove(), 3000);
}

// Home Page
async function initHome() {
  const user = await checkAuth();
  if (!user) return;
  document.getElementById('studentName').textContent = `${user.firstName} ${user.familyName}`;
  setupLogout();
  loadHomeData();
}

async function loadHomeData() {
  try {
    const [reservationsResponse, finesResponse] = await Promise.all([
      fetch(`${API_URL}/reservation/user`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }),
      fetch(`${API_URL}/fine/user`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
    ]);

    if (!reservationsResponse.ok || !finesResponse.ok) throw new Error('Failed to load data');

    const { data: reservations } = await reservationsResponse.json();
    const { data: fines } = await finesResponse.json();

    const activeReservations = reservations.filter(r => r.status === 'APPROVED' || r.status === 'PENDING');
    const borrowedBooks = reservations.filter(r => r.status === 'CONFIRMED');
    const unpaidFines = fines.filter(f => !f.paid);

    document.getElementById('reservationCount').textContent = activeReservations.length;
    document.getElementById('finesCount').textContent = unpaidFines.length;
    document.getElementById('borrowedCount').textContent = borrowedBooks.length;

    displayRecentReservations(reservations.slice(0, 5));
    displayRecentFines(fines.filter(f => !f.paid).slice(0, 5));
  } catch (error) {
    console.error('Error loading home data:', error);
    showError(document.querySelector('.container'), i18next.t('error') + ': Failed to load data');
  }
}

async function displayRecentReservations(reservations) {
  const list = document.getElementById('reservationsList');
  list.innerHTML = reservations.length ? '' : '<li class="list-group-item" data-i18n="error">No recent reservations</li>';

  for (const res of reservations) {
    try {
      const bookResponse = await fetch(`${API_URL}/book/${res.bookId}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
      const { data: book } = await bookResponse.json();
      const li = document.createElement('li');
      li.className = 'list-group-item d-flex justify-content-between align-items-center';
      li.innerHTML = `
        ${book.title} - ${res.status}
        <span class="badge badge-${res.status === 'APPROVED' ? 'success' : 'danger'}">${new Date(res.returnDate).toLocaleDateString()}</span>
      `;
      list.appendChild(li);
    } catch (error) {
      console.error('Error fetching book:', error);
    }
  }
  gsap.from(list.children, { opacity: 0, y: 20, stagger: 0.1, duration: 0.5 });
}

async function displayRecentFines(fines) {
  const list = document.getElementById('finesList');
  list.innerHTML = fines.length ? '' : '<li class="list-group-item" data-i18n="error">No recent fines</li>';

  for (const fine of fines) {
    try {
      const resResponse = await fetch(`${API_URL}/reservation/${fine.reservationId}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
      const { data: res } = await resResponse.json();
      const bookResponse = await fetch(`${API_URL}/book/${res.bookId}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
      const { data: book } = await bookResponse.json();
      const li = document.createElement('li');
      li.className = 'list-group-item d-flex justify-content-between align-items-center';
      li.innerHTML = `
        ${book.title} - $${fine.amount.toFixed(2)}
        <span class="badge badge-danger">Unpaid</span>
      `;
      list.appendChild(li);
    } catch (error) {
      console.error('Error fetching fine details:', error);
    }
  }
  gsap.from(list.children, { opacity: 0, y: 20, stagger: 0.1, duration: 0.5 });
}

// Browse Books (basic search)
async function initBrowseBooks() {
  if (!(await checkAuth())) return;
  setupLogout();
  loadBooks();
  document.getElementById('searchBtn').addEventListener('click', () => {
    const query = document.getElementById('searchInput').value.toLowerCase();
    loadBooks(query);
  });
}

async function loadBooks(query = '') {
  try {
    const response = await fetch(`${API_URL}/book/all`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
    if (!response.ok) throw new Error('Failed to fetch books');
    const { data } = await response.json();
    const filteredBooks = query ? data.filter(book =>
      book.title.toLowerCase().includes(query) ||
      book.authors.some(a => a.toLowerCase().includes(query)) ||
      book.keywords.some(k => k.toLowerCase().includes(query))
    ) : data;
    displayBooks(filteredBooks, 'browse-books');
  } catch (error) {
    console.error('Error loading books:', error);
    showError(document.getElementById('booksGrid'), i18next.t('error') + ': Failed to load books');
  }
}

function displayBooks(books, page) {
  const grid = document.getElementById('booksGrid');
  grid.innerHTML = books.map(book => `
    <div class="col">
      <div class="card h-100">
        <img src="${book.coverUrl || 'https://via.placeholder.com/150'}" class="card-img-top" alt="${book.title}">
        <div class="card-body">
          <h5 class="card-title">${book.title}</h5>
          <p class="card-text">${book.authors.join(', ')}</p>
          <p class="card-text"><small class="text-muted">${book.status}</small></p>
        </div>
        <div class="card-footer">
          ${page === 'student-books' ? `<a href="/student/book-details.html?id=${book.id}" class="btn btn-primary w-100" data-i18n="viewDetails">View Details</a>` : ''}
          <button class="btn btn-${page === 'student-books' ? 'secondary' : 'primary'} w-100 ${page === 'student-books' ? 'mt-2' : ''}" onclick="reserveBook('${book.id}', '${book.title}')" ${book.status !== 'AVAILABLE' ? 'disabled' : ''} data-i18n="reserve">Reserve</button>
        </div>
      </div>
    </div>
  `).join('');
  gsap.from(grid.children, { opacity: 0, y: 20, stagger: 0.1, duration: 0.5 });
}

// Student Books (advanced search with filters)
async function initStudentBooks() {
  if (!(await checkAuth())) return;
  setupLogout();
  setupFilters();
  loadBooks('', {});
}

async function setupFilters() {
  try {
    const response = await fetch(`${API_URL}/book/all`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
    if (!response.ok) throw new Error('Failed to fetch books');
    const { data } = await response.json();

    const keywords = [...new Set(data.flatMap(book => book.keywords))].sort();
    const languages = [...new Set(data.map(book => book.language))].sort();

    const keywordSelect = document.getElementById('keywordFilter');
    keywords.forEach(keyword => {
      const option = document.createElement('option');
      option.value = keyword;
      option.textContent = keyword;
      keywordSelect.appendChild(option);
    });

    const languageSelect = document.getElementById('languageFilter');
    languages.forEach(language => {
      const option = document.createElement('option');
      option.value = language;
      option.textContent = language;
      languageSelect.appendChild(option);
    });
  } catch (error) {
    console.error('Error setting up filters:', error);
    showError(document.querySelector('.container'), i18next.t('error') + ': Failed to set up filters');
  }

  document.getElementById('searchBtn').addEventListener('click', applyFilters);
  document.getElementById('keywordFilter').addEventListener('change', applyFilters);
  document.getElementById('languageFilter').addEventListener('change', applyFilters);
  document.getElementById('statusFilter').addEventListener('change', applyFilters);
}

function applyFilters() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const filters = {
    keyword: document.getElementById('keywordFilter').value,
    language: document.getElementById('languageFilter').value,
    status: document.getElementById('statusFilter').value
  };
  loadBooks(query, filters);
}

async function loadBooks(query = '', filters = {}) {
  try {
    const response = await fetch(`${API_URL}/book/all`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
    if (!response.ok) throw new Error('Failed to fetch books');
    const { data } = await response.json();
    const filteredBooks = filterBooks(data, query, filters);
    displayBooks(filteredBooks, 'student-books');
  } catch (error) {
    console.error('Error loading books:', error);
    showError(document.getElementById('booksGrid'), i18next.t('error') + ': Failed to load books');
  }
}

function filterBooks(books, query, filters) {
  return books.filter(book => {
    const matchesQuery = !query || (
      book.title.toLowerCase().includes(query) ||
      book.authors.some(a => a.toLowerCase().includes(query)) ||
      book.isbn.toLowerCase().includes(query) ||
      book.keywords.some(k => k.toLowerCase().includes(query))
    );
    const matchesKeyword = !filters.keyword || book.keywords.includes(filters.keyword);
    const matchesLanguage = !filters.language || book.language === filters.language;
    const matchesStatus = !filters.status || book.status === filters.status;
    return matchesQuery && matchesKeyword && matchesLanguage && matchesStatus;
  });
}

// Reserve Book
window.reserveBook = function(id, title) {
  document.getElementById('reserveBookDetails').textContent = i18next.t('reserveBook') + `: "${title}"`;
  document.getElementById('bookId').value = id;
  document.getElementById('startDate').value = new Date().toISOString().split('T')[0];
  document.getElementById('returnDate').value = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  new bootstrap.Modal(document.getElementById('reserveModal')).show();
};

document.addEventListener('submit', (e) => {
  if (e.target.id === 'reserveForm') {
    e.preventDefault();
    const bookId = document.getElementById('bookId').value;
    const startDate = document.getElementById('startDate').value;
    const returnDate = document.getElementById('returnDate').value;

    fetch(`${API_URL}/reservation/`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ bookId, startDate, returnDate, status: 'PENDING' })
    })
      .then(response => response.json())
      .then(result => {
        if (!result.ok && !result.status === 200) throw new Error('Failed to reserve book');
        showSuccess(document.getElementById('reserveModal'), i18next.t('requestSubmitted'));
        bootstrap.Modal.getInstance(document.getElementById('reserveModal')).hide();
        if (window.location.pathname.includes('browse-books.html')) loadBooks();
        else if (window.location.pathname.includes('student-books.html')) applyFilters();
      })
      .catch(error => {
        console.error('Error reserving book:', error);
        showError(document.getElementById('reserveModal'), i18next.t('error') + ': ' + error.message);
      });
  }
});

// My Reservations
async function initReservations() {
  if (!(await checkAuth())) return;
  setupLogout();
  loadReservations();
}

async function loadReservations() {
  try {
    const response = await fetch(`${API_URL}/reservation/user`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
    if (!response.ok) throw new Error('Failed to fetch reservations');
    const { data } = await response.json();
    displayReservations(data);
  } catch (error) {
    console.error('Error loading reservations:', error);
    showError(document.getElementById('reservationsTableBody'), i18next.t('error') + ': Failed to load reservations');
  }
}

async function displayReservations(reservations) {
  const tbody = document.getElementById('reservationsTableBody');
  tbody.innerHTML = '';

  for (const res of reservations) {
    try {
      const bookResponse = await fetch(`${API_URL}/book/${res.bookId}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
      const { data: book } = await bookResponse.json();
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${book.title}</td>
        <td>${new Date(res.startDate).toLocaleDateString()}</td>
        <td>${new Date(res.returnDate).toLocaleDateString()}</td>
        <td><span class="badge badge-${res.status === 'APPROVED' ? 'success' : 'danger'}">${res.status}</span></td>
        <td>
          ${res.status === 'PENDING' ? `<button class="btn btn-sm btn-outline-danger" onclick="cancelReservation('${res.id}', '${book.title}')">Cancel</button>` : ''}
        </td>
      `;
      tbody.appendChild(tr);
    } catch (error) {
      console.error('Error fetching book:', error);
    }
  }
  gsap.from(tbody.children, { opacity: 0, y: 20, stagger: 0.1, duration: 0.5 });
}

window.cancelReservation = async function(id, title) {
  document.getElementById('cancelReservationDetails').textContent = i18next.t('cancelReservation') + `: "${title}"?`;
  const modal = new bootstrap.Modal(document.getElementById('cancelModal'));
  document.getElementById('confirmCancelBtn').onclick = async () => {
    try {
      const response = await fetch(`${API_URL}/reservation/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: 'CANCELED' })
      });
      if (!response.ok) throw new Error('Failed to cancel reservation');
      showSuccess(document.getElementById('cancelModal'), i18next.t('requestCancelled'));
      modal.hide();
      loadReservations();
    } catch (error) {
      console.error('Error canceling reservation:', error);
      showError(document.getElementById('cancelModal'), i18next.t('error') + ': ' + error.message);
    }
  };
  modal.show();
};

// My Fines
async function initFines() {
  if (!(await checkAuth())) return;
  setupLogout();
  loadFines();
}

async function loadFines() {
  try {
    const response = await fetch(`${API_URL}/fine/user`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
    if (!response.ok) throw new Error('Failed to fetch fines');
    const { data } = await response.json();
    displayFines(data);
  } catch (error) {
    console.error('Error loading fines:', error);
    showError(document.getElementById('finesTableBody'), i18next.t('error') + ': Failed to load fines');
  }
}

async function displayFines(fines) {
  const tbody = document.getElementById('finesTableBody');
  tbody.innerHTML = '';

  for (const fine of fines) {
    try {
      const resResponse = await fetch(`${API_URL}/reservation/${fine.reservationId}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
      const { data: res } = await resResponse.json();
      const bookResponse = await fetch(`${API_URL}/book/${res.bookId}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
      const { data: book } = await bookResponse.json();
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${book.title}</td>
        <td>$${fine.amount.toFixed(2)}</td>
        <td><span class="badge badge-${fine.paid ? 'success' : 'danger'}">${fine.paid ? 'Paid' : 'Unpaid'}</span></td>
        <td>${new Date(fine.createdAt).toLocaleDateString()}</td>
      `;
      tbody.appendChild(tr);
    } catch (error) {
      console.error('Error fetching fine details:', error);
    }
  }
  gsap.from(tbody.children, { opacity: 0, y: 20, stagger: 0.1, duration: 0.5 });
}

// Profile
async function initProfile() {
  if (!(await checkAuth())) return;
  setupLogout();
  loadProfile();
  setupProfilePicPreview();
}

async function loadProfile() {
  try {
    const response = await fetch(`${API_URL}/user/`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
    if (!response.ok) throw new Error('Failed to fetch profile');
    const { data } = await response.json();

    document.getElementById('firstName').value = data.firstName;
    document.getElementById('familyName').value = data.familyName;
    document.getElementById('email').value = data.email;
    document.getElementById('phone').value = data.phone;
    document.getElementById('studentId').textContent = data.studentId || 'N/A';
    document.getElementById('faculty').textContent = data.faculty || 'N/A';
    document.getElementById('academicYear').textContent = data.academicYear || 'N/A';
    document.getElementById('major').textContent = data.major || 'N/A';

    const profilePic = document.getElementById('profilePic');
    if (data.idProfilePic) {
      profilePic.src = data.idProfilePic;
      gsap.from(profilePic, { opacity: 0, scale: 0.8, duration: 0.5, ease: 'back.out(1.7)' });
    }
  } catch (error) {
    console.error('Error loading profile:', error);
    showError(document.querySelector('.container'), i18next.t('error') + ': Failed to load profile');
  }
}

function setupProfilePicPreview() {
  const input = document.getElementById('idProfilePic');
  const preview = document.getElementById('profilePic');

  input.addEventListener('change', () => {
    const file = input.files[0];
    if (!file) return;

    const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      showError(document.querySelector('.card-body'), i18next.t('error') + ': Please upload a PNG, JPEG, or JPG image.');
      input.value = '';
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      showError(document.querySelector('.card-body'), i18next.t('error') + ': Image size must be less than 2MB.');
      input.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      preview.src = e.target.result;
      gsap.from(preview, { opacity: 0, scale: 0.8, duration: 0.5, ease: 'back.out(1.7)' });
    };
    reader.readAsDataURL(file);
  });
}

document.addEventListener('submit', (e) => {
  if (e.target.id === 'profileForm') {
    e.preventDefault();
    const formData = new FormData();
    formData.append('firstName', document.getElementById('firstName').value);
    formData.append('familyName', document.getElementById('familyName').value);
    formData.append('email', document.getElementById('email').value);
    formData.append('phone', document.getElementById('phone').value);
    const profilePic = document.getElementById('idProfilePic').files[0];
    if (profilePic) formData.append('idProfilePic', profilePic);

    fetch(`${API_URL}/user/`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      body: formData
    })
      .then(response => response.json())
      .then(result => {
        if (!result.ok && !result.status === 200) {
          throw new Error(result.msg || 'Failed to update profile');
        }
        showSuccess(document.querySelector('.card-body'), i18next.t('updateProfile') + ' successful');
        loadProfile();
      })
      .catch(error => {
        console.error('Error updating profile:', error);
        showError(document.querySelector('.card-body'), i18next.t('error') + ': ' + error.message);
      });
  }
});

// Borrow Book
async function initBorrow() {
  if (!(await checkAuth())) return;
  setupSidebar();
  setupLogout();
  loadBooksForBorrow();
  loadBorrowRequests();

  const borrowForm = document.getElementById('borrow-book-form');
  if (borrowForm) {
    borrowForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const bookId = document.getElementById('bookId').value;

      try {
        const response = await fetch(`${API_URL}/reservation`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({ bookId, status: 'PENDING' })
        });
        const result = await response.json();
        if (result.ok) {
          showSuccess(borrowForm, i18next.t('requestSubmitted'));
          borrowForm.reset();
          loadBorrowRequests();
        } else {
          showError(borrowForm, result.msg || i18next.t('error'));
        }
      } catch (error) {
        console.error('Error submitting borrow request:', error);
        showError(borrowForm, i18next.t('networkError'));
      }
    });
  }
}

async function loadBooksForBorrow() {
  const select = document.getElementById('bookId');
  if (!select) return;

  try {
    const response = await fetch(`${API_URL}/book/all`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
    const { data } = await response.json();
    select.innerHTML = `<option value="" disabled selected data-i18n="selectBook">${i18next.t('selectBook')}</option>` +
      data.filter(book => book.status === 'AVAILABLE').map(book => `<option value="${book.id}">${book.title}</option>`).join('');
  } catch (error) {
    console.error('Error loading books:', error);
    select.innerHTML = `<option value="" disabled selected data-i18n="error">${i18next.t('networkError')}</option>`;
  }
}

async function loadBorrowRequests() {
  const list = document.getElementById('request-list');
  if (!list) return;

  try {
    const response = await fetch(`${API_URL}/reservation/user`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
    const { data } = await response.json();
    const userId = JSON.parse(atob(localStorage.getItem('token').split('.')[1])).id;
    const requests = data.filter(r => r.userId === userId && r.status === 'PENDING');
    list.innerHTML = requests.map(request => `
      <tr>
        <td>${request.book.title}</td>
        <td>${new Date(request.requestDate).toLocaleDateString()}</td>
        <td>${request.status}</td>
        <td>
          <button class="btn btn-primary edit-request" data-id="${request.id}" data-book-id="${request.bookId}" data-i18n="edit">${i18next.t('edit')}</button>
          <button class="btn btn-danger cancel-request" data-id="${request.id}" data-i18n="cancel">${i18next.t('cancel')}</button>
        </td>
      </tr>
    `).join('');
    animateRows(list);
    setupRequestActions();
  } catch (error) {
    console.error('Error loading requests:', error);
    list.innerHTML = `<tr><td colspan="4" data-i18n="error">${i18next.t('networkError')}</td></tr>`;
  }
}

function setupRequestActions() {
  document.querySelectorAll('.edit-request').forEach(btn => {
    btn.addEventListener('click', async () => {
      const requestId = btn.dataset.id;
      const currentBookId = btn.dataset.bookId;
      const modal = document.getElementById('edit-request-modal');
      const editForm = document.getElementById('edit-request-form');
      const bookSelect = document.getElementById('edit-bookId');

      try {
        const response = await fetch(`${API_URL}/book/all`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
        const { data } = await response.json();
        bookSelect.innerHTML = data.filter(book => book.status === 'AVAILABLE').map(book => `
          <option value="${book.id}" ${book.id === currentBookId ? 'selected' : ''}>${book.title}</option>
        `).join('');
      } catch (error) {
        console.error('Error loading books:', error);
        showError(modal, i18next.t('networkError'));
        return;
      }

      modal.classList.remove('hidden');
      gsap.from(modal, { opacity: 0, scale: 0.8, duration: 0.3 });

      editForm.onsubmit = async (e) => {
        e.preventDefault();
        const newBookId = bookSelect.value;

        try {
          const response = await fetch(`${API_URL}/reservation/${requestId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ bookId: newBookId })
          });
          const result = await response.json();
          if (result.ok) {
            showSuccess(modal, i18next.t('requestUpdated'));
            modal.classList.add('hidden');
            loadBorrowRequests();
          } else {
            showError(modal, result.msg || i18next.t('error'));
          }
        } catch (error) {
          console.error('Error updating request:', error);
          showError(modal, i18next.t('networkError'));
        }
      };
    });
  });

  document.querySelectorAll('.cancel-request').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.dataset.id;
      try {
        const response = await fetch(`${API_URL}/reservation/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        const result = await response.json();
        if (result.ok) {
          showSuccess(btn.closest('.card'), i18next.t('requestCancelled'));
          loadBorrowRequests();
        } else {
          showError(btn.closest('.card'), result.msg || i18next.t('error'));
        }
      } catch (error) {
        console.error('Error canceling request:', error);
        showError(btn.closest('.card'), i18next.t('networkError'));
      }
    });
  });

  const closeModal = document.getElementById('close-modal');
  if (closeModal) {
    closeModal.addEventListener('click', () => {
      document.getElementById('edit-request-modal').classList.add('hidden');
    });
  }
}

function animateRows(list) {
  gsap.from(list.querySelectorAll('tr'), { opacity: 0, y: 20, stagger: 0.1, duration: 0.5 });
}

// Borrowed Books
async function initBorrowed() {
  if (!(await checkAuth())) return;
  setupSidebar();
  setupLogout();
  loadBorrowedBooks();
}

async function loadBorrowedBooks() {
  const list = document.getElementById('borrowed-list');
  if (!list) return;

  try {
    const response = await fetch(`${API_URL}/reservation/user`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
    const { data } = await response.json();
    const userId = JSON.parse(atob(localStorage.getItem('token').split('.')[1])).id;
    const borrowed = data.filter(r => r.userId === userId && r.status === 'CONFIRMED');
    list.innerHTML = borrowed.map(reservation => `
      <tr>
        <td>${reservation.book.title}</td>
        <td>${new Date(reservation.borrowDate).toLocaleDateString()}</td>
        <td>${reservation.returnDate ? new Date(reservation.returnDate).toLocaleDateString() : 'Not Returned'}</td>
      </tr>
    `).join('');
    animateRows(list);
  } catch (error) {
    console.error('Error loading borrowed books:', error);
    list.innerHTML = `<tr><td colspan="3" data-i18n="error">${i18next.t('networkError')}</td></tr>`;
  }
}

// Sidebar Setup
function setupSidebar() {
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
}


// Language Toggle
function setupLanguageToggle() {
  const langBtn = document.getElementById('langToggleBtn');
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      const newLang = i18next.language === 'en' ? 'ar' : 'en';
      i18next.changeLanguage(newLang, (err) => {
        if (err) console.error('Language change error:', err);
        updateContent();
        langBtn.textContent = newLang === 'en' ? 'AR' : 'EN';
      });
    });
  }
}

// Update the DOMContentLoaded listener to include setupLanguageToggle
document.addEventListener('DOMContentLoaded', () => {
  initI18next(() => {
    const path = window.location.pathname;
    if (path.includes('student-home.html')) initHome();
    else if (path.includes('browse-books.html')) initBrowseBooks();
    else if (path.includes('student-books.html')) initStudentBooks();
    else if (path.includes('my-reservations.html')) initReservations();
    else if (path.includes('my-fines.html')) initFines();
    else if (path.includes('student-profile.html')) initProfile();
    else if (path.includes('student-borrow.html')) initBorrow();
    else if (path.includes('student-borrowed.html')) initBorrowed();
    setupLanguageToggle(); // Add this line
  });
});

// Initialize based on page
document.addEventListener('DOMContentLoaded', () => {
  initI18next(() => {
    const path = window.location.pathname;
    if (path.includes('student-home.html')) initHome();
    else if (path.includes('browse-books.html')) initBrowseBooks();
    else if (path.includes('student-books.html')) initStudentBooks();
    else if (path.includes('my-reservations.html')) initReservations();
    else if (path.includes('my-fines.html')) initFines();
    else if (path.includes('student-profile.html')) initProfile();
    else if (path.includes('student-borrow.html')) initBorrow();
    else if (path.includes('student-borrowed.html')) initBorrowed();
  });
});