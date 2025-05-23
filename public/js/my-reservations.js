import i18next from 'https://cdn.jsdelivr.net/npm/i18next@23.11.5/dist/umd/i18next.min.js';
import LanguageDetector from 'https://cdn.jsdelivr.net/npm/i18next-browser-languagedetector@8.0.0/dist/umd/i18nextBrowserLanguageDetector.min.js';
import { gsap } from 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';

const API_URL = 'https://univ-lib-backend.onrender.com/api';

document.addEventListener('DOMContentLoaded', () => {
  initI18next();
  checkAuth();
  loadReservations();
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
          bookTitle: 'Book Title',
          startDate: 'Start Date',
          returnDate: 'Return Date',
          status: 'Status',
          actions: 'Actions',
          cancelReservation: 'Cancel Reservation',
          cancel: 'Cancel',
          confirm: 'Confirm'
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
          bookTitle: 'عنوان الكتاب',
          startDate: 'تاريخ البدء',
          returnDate: 'تاريخ الإرجاع',
          status: 'الحالة',
          actions: 'الإجراءات',
          cancelReservation: 'إلغاء الحجز',
          cancel: 'إلغاء',
          confirm: 'تأكيد'
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
    elem.textContent = i18next.t(elem.getAttribute('data-i18n'));
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

// Load reservations
async function loadReservations() {
  try {
    const response = await fetch(`${API_URL}/reservation/user`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    if (!response.ok) throw new Error('Failed to fetch reservations');
    const { data } = await response.json();
    displayReservations(data);
  } catch (error) {
    console.error('Error loading reservations:', error);
    alert('Failed to load reservations');
  }
}

// Display reservations
async function displayReservations(reservations) {
  const tbody = document.getElementById('reservationsTableBody');
  tbody.innerHTML = '';

  for (const res of reservations) {
    try {
      const bookResponse = await fetch(`${API_URL}/book/${res.bookId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
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

// Cancel reservation
async function cancelReservation(id, title) {
  document.getElementById('cancelReservationDetails').textContent = `Are you sure you want to cancel the reservation for "${title}"?`;
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
      alert('Reservation canceled');
      modal.hide();
      loadReservations();
    } catch (error) {
      console.error('Error canceling reservation:', error);
      alert('Error: ' + error.message);
    }
  };
  modal.show();
}

// Logout
document.getElementById('logoutBtn').addEventListener('click', () => {
  localStorage.removeItem('token');
  window.location.href = '/main/login.html';
});