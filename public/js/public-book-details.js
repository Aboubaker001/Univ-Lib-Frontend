import i18next from 'https://cdn.jsdelivr.net/npm/i18next@23.11.5/dist/umd/i18next.min.js';
import LanguageDetector from 'https://cdn.jsdelivr.net/npm/i18next-browser-languagedetector@8.0.0/dist/umd/i18nextBrowserLanguageDetector.min.js';
import { gsap } from 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';

const API_URL = 'https://univ-lib-backend.onrender.com/api';

document.addEventListener('DOMContentLoaded', () => {
  initI18next();
  loadBookDetails();
});

// Initialize i18next
function initI18next() {
  i18next.use(LanguageDetector).init({
    fallbackLng: 'en',
    resources: {
      en: {
        translation: {
          libraryTitle: 'University Library',
          books: 'Books',
          login: 'Login',
          authors: 'Authors',
          isbn: 'ISBN',
          edition: 'Edition',
          publisher: 'Publisher',
          publicationYear: 'Publication Year',
          pageCount: 'Page Count',
          language: 'Language',
          keywords: 'Keywords',
          status: 'Status',
          backToBrowse: 'Back to Browse'
        }
      },
      ar: {
        translation: {
          libraryTitle: 'مكتبة الجامعة',
          books: 'الكتب',
          login: 'تسجيل الدخول',
          authors: 'المؤلفون',
          isbn: 'رقم ISBN',
          edition: 'الطبعة',
          publisher: 'الناشر',
          publicationYear: 'سنة النشر',
          pageCount: 'عدد الصفحات',
          language: 'اللغة',
          keywords: 'الكلمات المفتاحية',
          status: 'الحالة',
          backToBrowse: 'العودة إلى التصفح'
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

// Load book details
async function loadBookDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const bookId = urlParams.get('id');
  if (!bookId) {
    alert('No book ID provided');
    window.location.href = '/public/public-books.html';
    return;
  }

  try {
    const response = await fetch(`${API_URL}/books/${bookId}`);
    if (!response.ok) throw new Error('Failed to fetch book details');
    const { data } = await response.json();
    displayBookDetails(data);
  } catch (error) {
    console.error('Error loading book details:', error);
    alert('Failed to load book details');
    window.location.href = '/public/public-books.html';
  }
}

// Display book details
function displayBookDetails(book) {
  document.getElementById('bookTitle').textContent = book.title;
  document.getElementById('bookAuthors').textContent = book.authors.join(', ');
  document.getElementById('bookIsbn').textContent = book.isbn;
  document.getElementById('bookEdition').textContent = book.edition;
  document.getElementById('bookPublisher').textContent = book.publisher;
  document.getElementById('bookPublicationYear').textContent = book.publicationYear;
  document.getElementById('bookPageCount').textContent = book.pageCount;
  document.getElementById('bookLanguage').textContent = book.language;
  document.getElementById('bookKeywords').textContent = book.keywords.join(', ');
  const statusBadge = document.getElementById('bookStatus');
  statusBadge.textContent = book.status;
  statusBadge.className = `badge badge-${book.status === 'AVAILABLE' ? 'success' : 'danger'}`;
  document.getElementById('bookCover').src = book.coverUrl || 'https://via.placeholder.com/300';

  // GSAP animations
  gsap.from('.book-details-card', { opacity: 0, y: 50, duration: 0.8, ease: 'power2.out' });
  gsap.from('.book-cover', { opacity: 0, scale: 0.8, duration: 0.6, delay: 0.2, ease: 'back.out(1.7)' });
  gsap.from('.card-body > *', { opacity: 0, x: -20, stagger: 0.1, duration: 0.5, delay: 0.4, ease: 'power2.out' });
}