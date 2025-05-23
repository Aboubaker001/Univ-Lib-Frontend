import i18next from 'https://cdn.jsdelivr.net/npm/i18next@23.11.5/dist/umd/i18next.min.js';
import LanguageDetector from 'https://cdn.jsdelivr.net/npm/i18next-browser-languagedetector@8.0.0/dist/umd/i18nextBrowserLanguageDetector.min.js';
import { gsap } from 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';

const API_URL = 'https://univ-lib-backend.onrender.com/api';

document.addEventListener('DOMContentLoaded', () => {
  initI18next();
  checkAuth();
  loadBooks();
});

// Initialize i18next
function initI18next() {
  i18next.use(LanguageDetector).init({
    fallbackLng: 'en',
    resources: {
      en: {
        translation: {
          libraryTitle: 'University Library',
          dashboard: 'Dashboard',
          browseBooks: 'Browse Books',
          myReservations: 'My Reservations',
          myFines: 'My Fines',
          profile: 'Profile',
          logout: 'Logout',
          search: 'Search',
          searchPlaceholder: 'Search by title, author, or keyword...',
          reserveBook: 'Reserve Book',
          startDate: 'Start Date',
          returnDate: 'Return Date',
          cancel: 'Cancel',
          reserve: 'Reserve'
        }
      },
      ar: {
        translation: {
          libraryTitle: 'مكتبة الجامعة',
          dashboard: 'لوحة التحكم',
          browseBooks: 'تصفح الكتب',
          myReservations: 'حجوزاتي',
          myFines: 'غراماتي',
          profile: 'الملف الشخصي',
          logout: 'تسجيل الخروج',
          search: 'بحث',
          searchPlaceholder: 'ابحث حسب العنوان، المؤلف، أو الكلمة المفتاحية...',
          reserveBook: 'حجز كتاب',
          startDate: 'تاريخ البدء',
          returnDate: 'تاريخ الإرجاع',
          cancel: 'إلغاء',
          reserve: 'حجز'
        }
      }
    }
  }, (err) => {
    if (err) console.error('i18next error:', err);
    updateContent();
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
}

// Check authentication
async function checkAuth() {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = '/main/login.html';
    return;
  }

  try {
    const response = await fetch(`${API_URL}/user/`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!response.ok) throw new Error('Unauthorized');
    const { data } = await response.json();
    if (data.role !== 'STUDENT') {
      alert('Access denied. Student role required.');
      window.location.href = '/index.html';
    }
  } catch (error) {
    console.error('Auth error:', error);
    localStorage.removeItem('token');
    window.location.href = '/main/login.html';
  }
}

// Load books
async function loadBooks(query = '') {
  try {
    const response = await fetch(`${API_URL}/book/all`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    if (!response.ok) throw new Error('Failed to fetch books');
    const { data } = await response.json();
    const filteredBooks = query ? data.filter(book =>
      book.title.toLowerCase().includes(query) ||
      book.authors.some(a => a.toLowerCase().includes(query)) ||
      book.keywords.some(k => k.toLowerCase().includes(query))
    ) : data;
    displayBooks(filteredBooks);
  } catch (error) {
    console.error('Error loading books:', error);
    alert('Failed to load books');
  }
}

// Display books
function displayBooks(books) {
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
          <button class="btn btn-primary w-100" onclick="reserveBook('${book.id}', '${book.title}')" ${book.status !== 'AVAILABLE' ? 'disabled' : ''} data-i18n="reserve">Reserve</button>
        </div>
      </div>
    </div>
  `).join('');

  gsap.from(grid.children, { opacity: 0, y: 20, stagger: 0.1, duration: 0.5 });
}

// Search books
document.getElementById('searchBtn').addEventListener('click', () => {
  const query = document.getElementById('searchInput').value.toLowerCase();
  loadBooks(query);
});

// Reserve book
async function reserveBook(id, title) {
  document.getElementById('reserveBookDetails').textContent = `Reserve "${title}"`;
  document.getElementById('bookId').value = id;
  document.getElementById('startDate').value = new Date().toISOString().split('T')[0];
  document.getElementById('returnDate').value = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  new bootstrap.Modal(document.getElementById('reserveModal')).show();
}

document.getElementById('reserveForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const bookId = document.getElementById('bookId').value;
  const startDate = document.getElementById('startDate').value;
  const returnDate = document.getElementById('returnDate').value;

  try {
    const response = await fetch(`${API_URL}/reservation/`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ bookId, startDate, returnDate, status: 'PENDING' })
    });
    if (!response.ok) throw new Error('Failed to reserve book');
    alert('Reservation request submitted');
    bootstrap.Modal.getInstance(document.getElementById('reserveModal')).hide();
    loadBooks();
  } catch (error) {
    console.error('Error reserving book:', error);
    alert('Error: ' + error.message);
  }
});

// Logout
document.getElementById('logoutBtn').addEventListener('click', () => {
  localStorage.removeItem('token');
  window.location.href = '/main/login.html';
});