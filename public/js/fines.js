import i18next from 'https://cdn.jsdelivr.net/npm/i18next@23.11.5/dist/umd/i18next.min.js';
import LanguageDetector from 'https://cdn.jsdelivr.net/npm/i18next-browser-languagedetector@8.0.0/dist/umd/i18nextBrowserLanguageDetector.min.js';
import { gsap } from 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';

const API_URL = 'https://univ-lib-backend.onrender.com/api';

document.addEventListener('DOMContentLoaded', () => {
  initI18next();
  checkAuth();
  setupSidebarToggle();
  loadFines();
});

// Initialize i18next
function initI18next() {
  i18next
    .use(LanguageDetector)
    .init({
      fallbackLng: 'en',
      resources: {
        en: {
          translation: {
            dashboard: 'Dashboard',
            manageLibrarians: 'Manage Librarians',
            manageStudents: 'Manage Students',
            manageBooks: 'Manage Books',
            manageReservations: 'Manage Reservations',
            manageFines: 'Manage Fines',
            homepage: 'Homepage',
            logout: 'Logout'
          }
        },
        ar: {
          translation: {
            dashboard: 'لوحة التحكم',
            manageLibrarians: 'إدارة المكتبيين',
            manageStudents: 'إدارة الطلاب',
            manageBooks: 'إدارة الكتب',
            manageReservations: 'إدارة الحجوزات',
            manageFines: 'إدارة الغرامات',
            homepage: 'الصفحة الرئيسية',
            logout: 'تسجيل الخروج'
          }
        }
      }
    }, (err) => {
      if (err) return console.error('i18next init error:', err);
      updateContent();
    });
}

// Update content with translations
function updateContent() {
  document.querySelectorAll('[data-i18n]').forEach(elem => {
    elem.textContent = i18next.t(elem.getAttribute('data-i18n'));
  });
}

// Check authentication and role
async function checkAuth() {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = '/main/login.html';
    return;
  }

  try {
    const response = await fetch(`${API_URL}/users/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Unauthorized');
    const { data } = await response.json();
    if (!['ADMIN', 'LIBRARIAN'].includes(data.role)) {
      alert('Access denied. Admin or Librarian role required.');
      window.location.href = '/main/dashboard.html';
    }
  } catch (error) {
    console.error('Auth error:', error);
    localStorage.removeItem('token');
    window.location.href = '/main/login.html';
  }
}

// Setup sidebar toggle
function setupSidebarToggle() {
  const toggleBtn = document.getElementById('toggleBtn');
  const sidebar = document.getElementById('sidebar');
  const mainContent = document.getElementById('mainContent');

  toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
    toggleBtn.classList.toggle('collapsed');
  });
}

// Load fines
async function loadFines() {
  try {
    const response = await fetch(`${API_URL}/fines/all`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    if (!response.ok) throw new Error('Failed to fetch fines');
    const { data } = await response.json();
    const enrichedFines = await enrichFinesData(data);
    displayFines(enrichedFines);

    // Setup filter
    document.getElementById('paymentFilter').addEventListener('change', (e) => {
      const filter = e.target.value;
      const filteredFines = filter === 'all' ? enrichedFines :
        enrichedFines.filter(fine => filter === 'paid' ? fine.paid : !fine.paid);
      displayFines(filteredFines);
    });
  } catch (error) {
    console.error('Error loading fines:', error);
    alert('Failed to load fines');
  }
}

// Enrich fines with user and book data
async function enrichFinesData(fines) {
  const enriched = [];
  for (const fine of fines) {
    try {
      const userResponse = await fetch(`${API_URL}/users/${fine.userId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      const reservationResponse = await fetch(`${API_URL}/reservations/${fine.reservationId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      if (!userResponse.ok || !reservationResponse.ok) continue;

      const { data: user } = await userResponse.json();
      const { data: reservation } = await reservationResponse.json();
      const bookResponse = await fetch(`${API_URL}/books/${reservation.bookId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      const { data: book } = await bookResponse.json();

      enriched.push({
        ...fine,
        studentName: `${user.firstName} ${user.familyName}`,
        bookTitle: book.title
      });
    } catch (error) {
      console.error(`Error enriching fine ${fine.id}:`, error);
      enriched.push({ ...fine, studentName: 'Unknown', bookTitle: 'Unknown' });
    }
  }
  return enriched;
}

// Display fines in table
function displayFines(fines) {
  const tbody = document.getElementById('finesTableBody');
  tbody.innerHTML = '';
  fines.forEach(fine => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${fine.studentName}</td>
      <td>${fine.bookTitle}</td>
      <td>$${fine.amount.toFixed(2)}</td>
      <td><span class="badge badge-${fine.paid ? 'success' : 'danger'}">${fine.paid ? 'Paid' : 'Unpaid'}</span></td>
      <td>${new Date(fine.createdAt).toLocaleDateString()}</td>
      <td>
        ${!fine.paid ? `<button class="btn btn-sm btn-outline-success me-1" onclick="markPaid('${fine.id}')"><i class="fas fa-check"></i> Mark Paid</button>` : ''}
        <button class="btn btn-sm btn-outline-danger" onclick="deleteFine('${fine.id}')"><i class="fas fa-trash"></i> Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  // Animate rows
  gsap.from(tbody.children, {
    opacity: 0,
    y: 20,
    stagger: 0.1,
    duration: 0.5,
    ease: 'power2.out'
  });
}

// Mark fine as paid
async function markPaid(id) {
  const modal = new bootstrap.Modal(document.getElementById('confirmModal'));
  document.getElementById('confirmModalBody').textContent = 'Are you sure you want to mark this fine as paid?';
  document.getElementById('confirmActionBtn').onclick = async () => {
    try {
      const response = await fetch(`${API_URL}/fines/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ paid: true })
      });
      if (!response.ok) throw new Error('Failed to mark fine as paid');
      alert('Fine marked as paid');
      modal.hide();
      loadFines();
    } catch (error) {
      console.error('Error marking fine as paid:', error);
      alert('Error: ' + error.message);
    }
  };
  modal.show();
}

// Delete fine
async function deleteFine(id) {
  const modal = new bootstrap.Modal(document.getElementById('confirmModal'));
  document.getElementById('confirmModalBody').textContent = 'Are you sure you want to delete this fine?';
  document.getElementById('confirmActionBtn').onclick = async () => {
    try {
      const response = await fetch(`${API_URL}/fines/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      if (!response.ok) throw new Error('Failed to delete fine');
      alert('Fine deleted successfully');
      modal.hide();
      loadFines();
    } catch (error) {
      console.error('Error deleting fine:', error);
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