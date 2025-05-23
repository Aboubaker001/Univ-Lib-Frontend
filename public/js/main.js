// frontend/public/js/main.js
import { fetchWithAuth } from './api.js';

// Constants
const API_BASE_URL = 'https://univ-lib-backend.onrender.com/api';
const RECENT_SEARCHES_KEY = 'libraryRecentSearches';
const translations = {
  en: {
    home: {
      title: 'UniLibrary | Home',
      hero: {
        title: 'Discover. Learn. Grow.',
        subtitle: 'Your gateway to knowledge with over 250,000 resources at your fingertips',
        searchTitle: 'Search Our Collection',
        searchButton: 'Search',
        advancedSearch: 'Advanced Search',
        browseCatalog: 'Browse Catalog'
      },
      intro: {
        title: 'Welcome to UniLibrary',
        description: 'Explore a world of knowledge with our vast collection of books, digital resources, and community events. UniLibrary is your partner in academic success and research innovation.',
        learnMore: 'Learn More',
        videoDescription: 'A brief introduction to UniLibrary, showcasing our vast collection of books, digital resources, and community events.',
      },
      features: {
        title: 'Our Library Services',
        subtitle: 'Everything you need to support your academic journey',
        bookLending: {
          title: 'Book Lending',
          description: 'Borrow from our extensive collection of books for your studies and research.'
        },
        digitalResources: {
          title: 'Digital Resources',
          description: 'Access e-books, journals, and databases from anywhere on campus.'
        },
        community: {
          title: 'Good Community',
          description: 'Join study groups, workshops, and events to enhance your learning experience.'
        }
      },
      events: {
        title: 'Upcoming Events & Workshops',
        subtitle: 'Join our community events to enhance your skills and knowledge',
        workshop: {
          title: 'Research Skills Workshop',
          description: 'Learn advanced research techniques from our expert librarians.',
          date: 'May 20, 2025'
        },
        bookClub: {
          title: 'Monthly Book Club',
          description: 'Discuss this month\'s featured novel with fellow book lovers.',
          date: 'May 25, 2025'
        },
        techTalk: {
          title: 'Tech Talk: AI in Research',
          description: 'Explore how AI is transforming academic research.',
          date: 'June 1, 2025'
        },
        register: 'Register Now',
        join: 'Join Now'
      },
      collections: {
        title: 'Featured Collections',
        subtitle: 'Explore our curated collections',
        science: {
          title: 'Science & Technology',
          description: '500+ new titles added this semester'
        },
        history: {
          title: 'History & Culture',
          description: 'Rare manuscripts and primary sources'
        },
        art: {
          title: 'Art & Design',
          description: 'Visual resources and design archives'
        },
        literature: {
          title: 'World Literature',
          description: 'Classic and contemporary works'
        },
        explore: 'Explore'
      },
      quickAccess: {
        title: 'Quick Access',
        subtitle: 'Fast links to essential library resources',
        catalog: {
          title: 'Library Catalog',
          description: 'Search our entire collection of books and media.'
        },
        databases: {
          title: 'Research Databases',
          description: 'Access scholarly articles and journals.'
        },
        hours: {
          title: 'Hours & Locations',
          description: 'Find library hours and campus locations.'
        },
        librarian: {
          title: 'Ask a Librarian',
          description: 'Get help from our expert librarians.'
        },
        explore: 'Explore'
      },
      newArrivals: {
        title: 'New Arrivals',
        subtitle: 'Discover the latest additions to our library collection',
        quantum: {
          category: 'Computer Science',
          title: 'Introduction to Quantum Computing',
          description: 'A comprehensive guide to the principles and applications of quantum computing.'
        },
        history: {
          category: 'History',
          title: 'Modern Historical Studies',
          description: 'The latest volume of peer-reviewed articles on global historical events.'
        },
        architecture: {
          category: 'Architecture',
          title: 'Sustainable Architecture',
          description: 'Innovative designs and practices for eco-friendly building solutions.'
        },
        explore: 'Explore Now'
      },
      catalog: {
        title: 'Library Catalog',
        subtitle: 'Search and explore our collection of books, journals, and digital resources',
        searchButton: 'Search',
        filters: {
          category: {
            all: 'All Categories',
            science: 'Science & Technology',
            history: 'History & Culture',
            art: 'Art & Design',
            literature: 'Literature'
          },
          format: {
            all: 'All Formats',
            book: 'Book',
            journal: 'Journal',
            ebook: 'E-Book',
            media: 'Media'
          },
          availability: {
            all: 'All',
            available: 'Available',
            checkedOut: 'Checked Out'
          }
        },
        results: {
          science: {
            category: 'Computer Science',
            title: 'Introduction to Quantum Computing',
            author: 'By Dr. Jane Smith',
            status: 'Available'
          },
          history: {
            category: 'History',
            title: 'Modern Historical Studies',
            author: 'Edited by Prof. John Doe',
            status: 'Checked Out'
          },
          architecture: {
            category: 'Architecture',
            title: 'Sustainable Architecture',
            author: 'By Architect Lisa Brown',
            status: 'Available'
          },
          literature: {
            category: 'Literature',
            title: 'World Literature Classics',
            author: 'Various Authors',
            status: 'Available'
          },
          viewDetails: 'View Details'
        },
        loadMore: 'Load More',
        authors: 'Authors',
        isbn: 'ISBN',
        status: 'Status',
        viewDetails: 'View Details'
      }
    },
    about: {
      title: 'UniLibrary | About Us',
      hero: {
        title: 'About UniLibrary',
        subtitle: 'Empowering knowledge and research at El Oued University since 1995',
        explore: 'Explore Our Story'
      },
      title: 'Our History & Mission',
      history: 'Established in 1995 alongside El Oued University, UniLibrary has grown into a cornerstone of academic excellence in southeastern Algeria. With over 250,000 resources, including books, journals, and digital archives, we support students, faculty, and researchers across disciplines.',
      mission: 'Our mission is to foster a culture of learning and innovation by providing access to world-class resources, cutting-edge technology, and collaborative spaces. We are committed to empowering the university community and beyond.',
      services: 'Discover Our Services',
      team: {
        title: 'Meet Our Team',
        member1: {
          name: 'Dr. Fatima Zohra',
          role: 'Head Librarian',
          bio: 'With 20 years of experience, Dr. Zohra leads our efforts to modernize library services.'
        },
        member2: {
          name: 'Mr. Ahmed Benali',
          role: 'Digital Resources Manager',
          bio: 'Ahmed oversees our e-library platforms and digital archives.'
        },
        member3: {
          name: 'Ms. Sara Khedir',
          role: 'Community Outreach Coordinator',
          bio: 'Sara organizes workshops and events to engage our community.'
        }
      },
      contact: {
        title: 'Get in Touch',
        info: {
          title: 'Contact Information',
          address: 'El Oued University, 39000 El Oued, Algeria'
        },
        form: {
          name: 'Name',
          email: 'Email',
          message: 'Message',
          submit: 'Send Message',
          success: 'Message sent successfully!'
        }
      }
    },
    nav: {
      home: 'Home',
      catalog: 'Library Catalog',
      login: 'Login',
      logout: 'Logout',
      contact: 'Contact',
      dashboard: 'Dashboard',
      services: 'Services',
      researchHelp: 'Research Help',
      about: 'About'
    },
    footer: {
      copyright: '© 2025 UniLibrary. All rights reserved.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Use',
      tagline: 'Empowering knowledge since 1995.',
      links: {
        title: 'Quick Links'
      },
      contact: {
        title: 'Contact Us'
      },
      newsletter: {
        title: 'Subscribe to Newsletter',
        submit: 'Go',
        success: 'Subscribed successfully!'
      }
    }
  },
  ar: {
    home: {
      title: 'مكتبة الجامعة | الرئيسية',
      hero: {
        title: 'اكتشف. تعلم. انمو.',
        subtitle: 'بوابتك إلى المعرفة مع أكثر من 250,000 مورد في متناول يديك',
        searchTitle: 'ابحث في مجموعتنا',
        searchButton: 'بحث',
        advancedSearch: 'بحث متقدم',
        browseCatalog: 'تصفح الكتالوج'
      },
      intro: {
        title: 'مرحبًا بكم في مكتبة الجامعة',
        description: 'استكشف عالم المعرفة مع مجموعتنا الواسعة من الكتب والموارد الرقمية والفعاليات المجتمعية. مكتبة الجامعة هي شريكك في النجاح الأكاديمي والابتكار البحثي.',
        learnMore: 'تعرف على المزيد',
        videoDescription: 'مقدمة موجزة عن مكتبة الجامعة، تعرض مجموعتنا الواسعة من الكتب والموارد الرقمية والفعاليات المجتمعية.',
      },
      features: {
        title: 'خدمات مكتبتنا',
        subtitle: 'كل ما تحتاجه لدعم رحلتك الأكاديمية',
        bookLending: {
          title: 'إعارة الكتب',
          description: 'استعر من مجموعتنا الواسعة من الكتب لدراساتك وأبحاثك.'
        },
        digitalResources: {
          title: 'الموارد الرقمية',
          description: 'الوصول إلى الكتب الإلكترونية والمجلات وقواعد البيانات من أي مكان في الحرم الجامعي.'
        },
        community: {
          title: 'مجتمع رائع',
          description: 'انضم إلى مجموعات الدراسة وورش العمل والفعاليات لتعزيز تجربة التعلم الخاصة بك.'
        }
      },
      events: {
        title: 'الفعاليات وورش العمل القادمة',
        subtitle: 'انضم إلى فعاليات مجتمعنا لتعزيز مهاراتك ومعرفتك',
        workshop: {
          title: 'ورشة مهارات البحث',
          description: 'تعلم تقنيات البحث المتقدمة من أمناء مكتبتنا الخبراء.',
          date: '20 مايو 2025'
        },
        bookClub: {
          title: 'نادي الكتاب الشهري',
          description: 'ناقش الرواية المميزة لهذا الشهر مع عشاق الكتب.',
          date: '25 مايو 2025'
        },
        techTalk: {
          title: 'حديث تقني: الذكاء الاصطناعي في البحث',
          description: 'استكشف كيف يغير الذكاء الاصطناعي البحث الأكاديمي.',
          date: '1 يونيو 2025'
        },
        register: 'سجل الآن',
        join: 'انضم الآن'
      },
      collections: {
        title: 'المجموعات المميزة',
        subtitle: 'استكشف مجموعاتنا المختارة',
        science: {
          title: 'العلوم والتكنولوجيا',
          description: 'أضيف أكثر من 500 عنوان جديد هذا الفصل الدراسي'
        },
        history: {
          title: 'التاريخ والثقافة',
          description: 'مخطوطات نادرة ومصادر أولية'
        },
        art: {
          title: 'الفن والتصميم',
          description: 'موارد بصرية وأرشيفات التصميم'
        },
        literature: {
          title: 'الأدب العالمي',
          description: 'أعمال كلاسيكية ومعاصرة'
        },
        explore: 'استكشف'
      },
      quickAccess: {
        title: 'الوصول السريع',
        subtitle: 'روابط سريعة إلى موارد المكتبة الأساسية',
        catalog: {
          title: 'كتالوج المكتبة',
          description: 'ابحث في مجموعتنا الكاملة من الكتب والوسائط.'
        },
        databases: {
          title: 'قواعد بيانات البحث',
          description: 'الوصول إلى المقالات والمجلات العلمية.'
        },
        hours: {
          title: 'الساعات والمواقع',
          description: 'اعثر على ساعات المكتبة ومواقع الحرم الجامعي.'
        },
        librarian: {
          title: 'اسأل أمين المكتبة',
          description: 'احصل على مساعدة من أمناء مكتبتنا الخبراء.'
        },
        explore: 'استكشف'
      },
      newArrivals: {
        title: 'الوافدون الجدد',
        subtitle: 'اكتشف أحدث الإضافات إلى مجموعة مكتبتنا',
        quantum: {
          category: 'علوم الحاسوب',
          title: 'مدخل إلى الحوسبة الكمية',
          description: 'دليل شامل لمبادئ وتطبيقات الحوسبة الكمية.'
        },
        history: {
          category: 'التاريخ',
          title: 'دراسات تاريخية حديثة',
          description: 'المجلد الأخير من المقالات المراجعة من الأقران حول الأحداث التاريخية العالمية.'
        },
        architecture: {
          category: 'الهندسة المعمارية',
          title: 'الهندسة المعمارية المستدامة',
          description: 'تصاميم وممارسات مبتكرة لحلول البناء الصديقة للبيئة.'
        },
        explore: 'استكشف الآن'
      },
      catalog: {
        title: 'كتالوج المكتبة',
        subtitle: 'ابحث واستكشف مجموعتنا من الكتب والمجلات والموارد الرقمية',
        searchButton: 'بحث',
        filters: {
          category: {
            all: 'جميع الفئات',
            science: 'العلوم والتكنولوجيا',
            history: 'التاريخ والثقافة',
            art: 'الفن والتصميم',
            literature: 'الأدب'
          },
          format: {
            all: 'جميع الصيغ',
            book: 'كتاب',
            journal: 'مجلة',
            ebook: 'كتاب إلكتروني',
            media: 'وسائط'
          },
          availability: {
            all: 'الكل',
            available: 'متوفر',
            checkedOut: 'مُعار'
          }
        },
        results: {
          science: {
            category: 'علوم الحاسوب',
            title: 'مدخل إلى الحوسبة الكمية',
            author: 'بقلم د. جين سميث',
            status: 'متوفر'
          },
          history: {
            category: 'التاريخ',
            title: 'دراسات تاريخية حديثة',
            author: 'تحرير البروفيسور جون دو',
            status: 'مُعار'
          },
          architecture: {
            category: 'الهندسة المعمارية',
            title: 'الهندسة المعمارية المستدامة',
            author: 'بقلم المهندسة ليزا براون',
            status: 'متوفر'
          },
          literature: {
            category: 'الأدب',
            title: 'كلاسيكيات الأدب العالمي',
            author: 'مؤلفون متنوعون',
            status: 'متوفر'
          },
          viewDetails: 'عرض التفاصيل'
        },
        loadMore: 'تحميل المزيد',
        authors: 'المؤلفون',
        isbn: 'ISBN',
        status: 'الحالة',
        viewDetails: 'عرض التفاصيل'
      }
    },
    about: {
      title: 'مكتبة الجامعة | عنا',
      hero: {
        title: 'عن مكتبة الجامعة',
        subtitle: 'تمكين المعرفة والبحث في جامعة الوادي منذ 1995',
        explore: 'استكشف قصتنا'
      },
      title: 'تاريخنا ورسالتنا',
      history: 'تأسست مكتبة الجامعة في عام 1995 مع جامعة الوادي، وأصبحت ركيزة أساسية للتميز الأكاديمي في جنوب شرق الجزائر. مع أكثر من 250,000 مورد، بما في ذلك الكتب والمجلات والأرشيف الرقمي، ندعم الطلاب وأعضاء هيئة التدريس والباحثين عبر التخصصات.',
      mission: 'رسالتنا هي تعزيز ثقافة التعلم والابتكار من خلال توفير الوصول إلى موارد عالمية المستوى، وتكنولوجيا متطورة، ومساحات تعاونية. نحن ملتزمون بتمكين مجتمع الجامعة وما هو أبعد من ذلك.',
      services: 'اكتشف خدماتنا',
      team: {
        title: 'تعرف على فريقنا',
        member1: {
          name: 'د. فاطمة الزهراء',
          role: 'رئيسة المكتبة',
          bio: 'مع 20 عامًا من الخبرة، تقود د. فاطمة جهودنا لتحديث خدمات المكتبة.'
        },
        member2: {
          name: 'السيد أحمد بن علي',
          role: 'مدير الموارد الرقمية',
          bio: 'يشرف أحمد على منصات المكتبة الإلكترونية والأرشيف الرقمي.'
        },
        member3: {
          name: 'الآنسة سارة خدير',
          role: 'منسقة التوعية المجتمعية',
          bio: 'تنظم سارة ورش العمل والفعاليات لإشراك مجتمعنا.'
        }
      },
      contact: {
        title: 'تواصل معنا',
        info: {
          title: 'معلومات الاتصال',
          address: 'جامعة الوادي، 39000 الوادي، الجزائر'
        },
        form: {
          name: 'الاسم',
          email: 'البريد الإلكتروني',
          message: 'الرسالة',
          submit: 'إرسال الرسالة',
          success: 'تم إرسال الرسالة بنجاح!'
        }
      }
    },
    nav: {
      home: 'الرئيسية',
      catalog: 'كتالوج المكتبة',
      login: 'تسجيل الدخول',
      logout: 'تسجيل الخروج',
      contact: 'اتصل بنا',
      dashboard: 'لوحة التحكم',
      services: 'الخدمات',
      researchHelp: 'مساعدة البحث',
      about: 'عن المكتبة'
    },
    footer: {
      copyright: '© 2025 مكتبة الجامعة. جميع الحقوق محفوظة.',
      privacy: 'سياسة الخصوصية',
      terms: 'شروط الاستخدام',
      tagline: 'تمكين المعرفة منذ 1995.',
      links: {
        title: 'روابط سريعة'
      },
      contact: {
        title: 'اتصل بنا'
      },
      newsletter: {
        title: 'اشترك في النشرة الإخبارية',
        submit: 'إرسال',
        success: 'تم الاشتراك بنجاح!'
      }
    }
  }
};

// State Management
const authState = {
  isLoggedIn: !!localStorage.getItem('token'),
  isAdmin: localStorage.getItem('userRole') === 'admin',
  isLibrarian: localStorage.getItem('userRole') === 'librarian',
  isStudent: localStorage.getItem('userRole') === 'student',
  isAuthenticated: function() {
    return this.isLoggedIn && (this.isAdmin || this.isLibrarian || this.isStudent);
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

const showToast = (message, type = 'info') => {
  const toast = document.createElement('div');
  toast.className = `toast alert-${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  console.log(`Toast displayed: ${message} (${type})`);

  setTimeout(() => {
    toast.classList.add('fade-out');
    setTimeout(() => toast.remove(), 300);
  }, 2700);
};

// Core Functions
function initializeLanguage() {
  const savedLanguage = localStorage.getItem('language') || 'en';
  console.log(`Initializing language: ${savedLanguage}`);
  applyLanguage(savedLanguage);
  document.documentElement.lang = savedLanguage;
  document.documentElement.setAttribute('dir', savedLanguage === 'ar' ? 'rtl' : 'ltr');
  const languageText = document.querySelector('.language-text');
  if (languageText) {
    languageText.textContent = savedLanguage === 'ar' ? 'AR' : 'EN';
  } else {
    console.warn('Language text element (.language-text) not found');
  }
  window.dispatchEvent(new Event('resize'));
}

function applyLanguage(lang) {
  console.log(`Applying language: ${lang}`);
  const page = window.location.pathname.includes('about-us.html') ? 'about' : 'home';

  document.querySelectorAll('[data-i18n]').forEach(element => {
    const keys = element.getAttribute('data-i18n').split('.');
    let value = translations[lang];
    keys.forEach(k => value = value?.[k]);
    if (value) {
      element.textContent = value;
    } else {
      console.warn(`Translation missing for ${lang}.${keys.join('.')}`);
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
    const keys = element.getAttribute('data-i18n-placeholder').split('.');
    let value = translations[lang];
    keys.forEach(k => value = value?.[k]);
    if (value) {
      element.placeholder = value;
    } else {
      console.warn(`Placeholder translation missing for ${lang}.${keys.join('.')}`);
    }
  });

  document.title = translations[lang][page].title || 'UniLibrary';
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

function setupLanguageSelector() {
  const languageItems = document.querySelectorAll('.language-selector .dropdown-item');
  if (!languageItems.length) {
    console.warn('Language selector items (.language-selector .dropdown-item) not found');
    return;
  }

  console.log(`Found ${languageItems.length} language selector items`);
  languageItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const selectedLang = item.getAttribute('data-lang');
      if (!selectedLang) {
        console.warn('Language item missing data-lang attribute');
        return;
      }
      console.log(`Language selected: ${selectedLang}`);
      localStorage.setItem('language', selectedLang);
      applyLanguage(selectedLang);
      document.documentElement.lang = selectedLang;
      document.documentElement.setAttribute('dir', selectedLang === 'ar' ? 'rtl' : 'ltr');
      const languageText = document.querySelector('.language-text');
      if (languageText) {
        languageText.textContent = selectedLang === 'ar' ? 'AR' : 'EN';
      }
      languageItems.forEach(i => i.setAttribute('aria-selected', i.getAttribute('data-lang') === selectedLang));
      // Refresh dynamic content
      setupBookCarousel();
      setupFeaturedCollections();
      setupQuickAccess();
    });
  });
}

// Search Functionality
function setupSearchFunctionality() {
  const searchForm = document.getElementById('searchForm');
  const searchInput = document.getElementById('searchQuery');
  const searchSuggestions = document.querySelector('.search-suggestions');
  if (!searchForm || !searchInput || !searchSuggestions) {
    console.warn('Search elements missing:', { searchForm, searchInput, searchSuggestions });
    return;
  }

  searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = searchInput.value.trim();
    if (query) {
      console.log(`Submitting search: ${query}`);
      await performSearch(query);
    }
  });

  searchInput.addEventListener('input', debounce(async () => {
    const query = searchInput.value.trim();
    if (query.length > 2) {
      console.log(`Fetching suggestions for: ${query}`);
      await fetchSearchSuggestions(query);
    } else {
      clearSearchSuggestions();
    }
  }, 300));

  searchInput.addEventListener('focus', () => {
    const query = searchInput.value.trim();
    if (query.length > 2) {
      fetchSearchSuggestions(query);
    } else {
      showRecentSearches();
    }
  });

  searchInput.addEventListener('keydown', (e) => {
    const suggestions = searchSuggestions.querySelectorAll('.search-suggestion-item');
    if (!suggestions.length) return;

    const currentIndex = Array.from(suggestions).findIndex(s => s.classList.contains('selected'));
    let newIndex = currentIndex;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      newIndex = currentIndex + 1 < suggestions.length ? currentIndex + 1 : 0;
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      newIndex = currentIndex - 1 >= 0 ? currentIndex - 1 : suggestions.length - 1;
    } else if (e.key === 'Enter' && currentIndex >= 0) {
      e.preventDefault();
      const selectedQuery = suggestions[currentIndex].getAttribute('data-query');
      searchInput.value = selectedQuery;
      performSearch(selectedQuery);
      return;
    } else {
      return;
    }

    suggestions.forEach(s => s.classList.remove('selected'));
    suggestions[newIndex].classList.add('selected');
    suggestions[newIndex].scrollIntoView({ block: 'nearest' });
  });

  searchSuggestions.addEventListener('click', (e) => {
    const suggestion = e.target.closest('.search-suggestion-item');
    if (suggestion) {
      const query = suggestion.getAttribute('data-query');
      searchInput.value = query;
      console.log(`Suggestion clicked: ${query}`);
      performSearch(query);
    }
  });

  document.addEventListener('click', (e) => {
    if (!searchForm.contains(e.target)) {
      clearSearchSuggestions();
    }
  });
}

async function performSearch(query) {
  if (!query) return;
  addToRecentSearches(query);
  const searchForm = document.getElementById('searchForm');
  if (searchForm) searchForm.classList.add('search-loading');

  try {
    const { ok, data } = await fetchWithAuth(`/books/search?q=${encodeURIComponent(query)}`);
    if (ok) {
      console.log(`Search successful, redirecting to catalog with query: ${query}`);
      window.location.href = `/main/catalog.html?q=${encodeURIComponent(query)}`;
    } else {
      showToast(data.message || 'Search failed.', 'error');
    }
  } catch (error) {
    console.error('Search error:', error);
    showToast(error.message || 'An error occurred during search.', 'error');
  } finally {
    if (searchForm) searchForm.classList.remove('search-loading');
    clearSearchSuggestions();
  }
}

async function fetchSearchSuggestions(query) {
  try {
    const { ok, data } = await fetchWithAuth(`/books/suggestions?q=${encodeURIComponent(query)}`);
    if (ok) {
      displaySearchSuggestions(data);
    } else {
      clearSearchSuggestions();
    }
  } catch (error) {
    console.error('Suggestions error:', error);
    clearSearchSuggestions();
  }
}

function displaySearchSuggestions(suggestions) {
  const searchSuggestions = document.querySelector('.search-suggestions');
  if (!searchSuggestions) return;

  searchSuggestions.innerHTML = suggestions.length === 0
    ? '<div class="search-suggestion-item text-muted p-3" role="option">No suggestions found</div>'
    : suggestions.map((item, index) => `
        <div class="search-suggestion-item" data-query="${item.title}" role="option" id="suggestion-${index}" tabindex="0">
          <i class="fas fa-book me-2 text-primary"></i>
          ${item.title}
        </div>
      `).join('');

  searchSuggestions.classList.add('show');
}

function showRecentSearches() {
  const searchSuggestions = document.querySelector('.search-suggestions');
  if (!searchSuggestions) return;

  const recentSearches = JSON.parse(localStorage.getItem(RECENT_SEARCHES_KEY)) || [];
  if (recentSearches.length === 0) return;

  searchSuggestions.innerHTML = `
    <div class="p-2 text-muted" role="option">Recent searches</div>
    ${recentSearches.map((item, index) => `
        <div class="search-suggestion-item" data-query="${item}" role="option" id="recent-${index}" tabindex="0">
          <i class="fas fa-history me-2"></i>
          ${item}
        </div>
      `).join('')}
  `;

  searchSuggestions.classList.add('show');
}

function addToRecentSearches(query) {
  const recentSearches = JSON.parse(localStorage.getItem(RECENT_SEARCHES_KEY)) || [];
  if (!recentSearches.includes(query)) {
    recentSearches.unshift(query);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(recentSearches.slice(0, 5)));
  }
}

function clearSearchSuggestions() {
  const searchSuggestions = document.querySelector('.search-suggestions');
  if (searchSuggestions) {
    searchSuggestions.innerHTML = '';
    searchSuggestions.classList.remove('show');
  }
}

// UI Effects
function setupHeaderScrollEffects() {
  const header = document.querySelector('.navbar');
  if (!header) {
    console.warn('Navbar element (.navbar) not found');
    return;
  }

  const handleScroll = debounce(() => {
    header.classList.toggle('scrolled', window.scrollY > 80);
  }, 10);

  window.addEventListener('scroll', handleScroll);
}

function setupSmoothScrolling() {
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href^="#"], .hero-scroll-indicator');
    if (!anchor) return;

    e.preventDefault();
    const targetId = anchor.getAttribute('href')?.substring(1) || 'features';
    if (targetId === '#') return;

    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const headerHeight = document.querySelector('.fixed-header')?.offsetHeight || 0;
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    } else {
      console.warn(`Scroll target #${targetId} not found`);
    }
  });
}

function setupBackToTopButton() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) {
    console.warn('Back to top button (#back-to-top) not found');
    return;
  }

  const handleScroll = debounce(() => {
    backToTopBtn.classList.toggle('active', window.scrollY > 300);
  }, 10);

  window.addEventListener('scroll', handleScroll);
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function setupCardHoverEffects() {
  document.addEventListener('mousemove', (e) => {
    const card = e.target.closest('.card, .carousel-book-card, .collection-card');
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  });

  document.addEventListener('mouseleave', (e) => {
    const card = e.target.closest('.card, .carousel-book-card, .collection-card');
    if (!card) return;

    card.style.removeProperty('--mouse-x');
    card.style.removeProperty('--mouse-y');
  });
}

// Authentication
function setupAuthUI() {
  const authButton = document.getElementById('authButton');
  const dashboardButton = document.getElementById('dashboardButton');
  if (!authButton || !dashboardButton) {
    console.warn('Auth elements missing:', { authButton, dashboardButton });
    return;
  }

  function updateAuthUI() {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');
    const lang = localStorage.getItem('language') || 'en';

    if (token) {
      authButton.setAttribute('data-i18n', 'nav.logout');
      authButton.textContent = translations[lang].nav.logout;
      authButton.onclick = handleLogout;
      dashboardButton.style.display = 'block';
      dashboardButton.href = userRole === 'student' ? '/student/home.html' : '/admin-librarian/dashboard.html';
    } else {
      authButton.setAttribute('data-i18n', 'nav.login');
      authButton.textContent = translations[lang].nav.login;
      authButton.onclick = handleLogin;
      dashboardButton.style.display = 'none';
    }

    applyLanguage(lang);
  }

  authButton.addEventListener('click', (e) => {
    e.preventDefault();
    authButton.onclick();
  });

  updateAuthUI();

  function handleLogin() {
    console.log('Redirecting to login page');
    window.location.href = './public/login.html';
  }

  async function handleLogout() {
    try {
      const { ok, data } = await fetchWithAuth('/users/logout', {
        method: 'GET',
        credentials: 'include'
      });

      if (ok && data.message === 'Logged out successfully') {
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        showToast('Logged out successfully!', 'success');
        updateAuthUI();
        window.location.href = '/main/home.html';
      } else {
        showToast(data.message || 'Logout failed.', 'error');
      }
    } catch (error) {
      console.error('Logout error:', error);
      showToast(error.message || 'An error occurred during logout.', 'error');
    }
  }
}

// Forms
function setupNewsletterForm() {
  const newsletterForm = document.getElementById('newsletterForm');
  if (!newsletterForm) {
    console.warn('Newsletter form (#newsletterForm) not found');
    return;
  }

  newsletterForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input[type="email"]').value.trim();
    if (!email) return;

    try {
      const { ok, data } = await fetchWithAuth('/newsletter', {
        method: 'POST',
        body: JSON.stringify({ email })
      });

      if (ok) {
        showToast(translations[localStorage.getItem('language') || 'en'].footer.newsletter.success, 'success');
        newsletterForm.reset();
      } else {
        showToast(data.message || 'Subscription failed.', 'error');
      }
    } catch (error) {
      console.error('Newsletter error:', error);
      showToast(error.message || 'Subscription failed. Try again.', 'error');
    }
  });
}

function setupContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) {
    console.warn('Contact form (#contactForm) not found');
    return;
  }

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('contactName')?.value;
    const email = document.getElementById('contactEmail')?.value;
    const message = document.getElementById('contactMessage')?.value;

    if (!name || !email || !message) {
      showToast('Please fill all contact form fields.', 'error');
      return;
    }

    try {
      const { ok, data } = await fetchWithAuth('/contact', {
        method: 'POST',
        body: JSON.stringify({ name, email, message })
      });

      if (ok) {
        showToast(translations[localStorage.getItem('language') || 'en'].about.contact.form.success, 'success');
        contactForm.reset();
      } else {
        showToast(data.message || 'Failed to send message.', 'error');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      showToast(error.message || 'An error occurred. Please try again.', 'error');
    }
  });
}

// Animations and Media
function setupIntroSection() {
  if (!window.location.pathname.includes('index.html')) return;

  const introVideo = document.querySelector('.intro-video');
  if (!introVideo || introVideo.tagName !== 'VIDEO') {
    console.warn('Intro video (.intro-video) not found or not a video element');
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          introVideo.play();
        } else {
          introVideo.pause();
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(introVideo);
}

function initAnimations() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out-quart',
      once: true,
      offset: 100
    });
    console.log('AOS initialized');
  } else {
    console.warn('AOS library not loaded');
  }

  document.addEventListener('click', (e) => {
    const button = e.target.closest('.btn');
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ripple = document.createElement('span');
    ripple.classList.add('ripple-effect');
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    button.appendChild(ripple);

    setTimeout(() => ripple.remove(), 500);
  });
}

// Data Fetching and Rendering
function setupBookCarousel() {
  const carouselInner = document.querySelector('#bookCarousel .carousel-inner');
  const carouselIndicators = document.querySelector('#bookCarousel .carousel-indicators');
  if (!carouselInner || !carouselIndicators) {
    console.warn('Book carousel elements missing:', { carouselInner, carouselIndicators });
    return;
  }

  async function fetchLatestBooks() {
    carouselInner.innerHTML = '<div class="text-center py-5"><i class="fas fa-spinner fa-spin"></i> Loading...</div>';
    try {
      console.log('Fetching latest books from /books/latest?limit=10');
      const { ok, data } = await fetchWithAuth('/books/latest?limit=10');
      if (ok && Array.isArray(data)) {
        console.log(`Fetched ${data.length} books`);
        populateCarousel(data);
      } else {
        throw new Error(data.message || 'Failed to fetch books');
      }
    } catch (error) {
      console.error('Error fetching books:', error);
      showToast(error.message || 'Failed to load new arrivals.', 'error');
      populateCarousel(getMockBooks());
    }
  }

  function getMockBooks() {
    const lang = localStorage.getItem('language') || 'en';
    console.log('Using mock books for language:', lang);
    return [
      {
        id: '1',
        title: translations[lang].newArrivals.quantum.title,
        authors: ['Dr. Jane Smith'],
        isbn: '978-3-16-148410-0',
        status: 'AVAILABLE',
        coverUrl: 'https://via.placeholder.com/150?text=Quantum+Computing'
      },
      {
        id: '2',
        title: translations[lang].newArrivals.history.title,
        authors: ['Prof. John Doe'],
        isbn: '978-1-234-56789-0',
        status: 'CHECKED_OUT',
        coverUrl: 'https://via.placeholder.com/150?text=Historical+Studies'
      },
      {
        id: '3',
        title: translations[lang].newArrivals.architecture.title,
        authors: ['Architect Lisa Brown'],
        isbn: '978-0-123-45678-9',
        status: 'AVAILABLE',
        coverUrl: 'https://via.placeholder.com/150?text=Sustainable+Architecture'
      }
    ];
  }

  function populateCarousel(books) {
    carouselInner.innerHTML = '';
    carouselIndicators.innerHTML = '';

    if (books.length === 0) {
      carouselInner.innerHTML = `
        <div class="carousel-item active">
          <p class="text-center text-muted py-5">No new arrivals available.</p>
        </div>
      `;
      console.log('No books to display');
      return;
    }

    books.forEach((book, index) => {
      const isActive = index === 0 ? 'active' : '';

      const carouselItem = document.createElement('div');
      carouselItem.className = `carousel-item ${isActive}`;
      carouselItem.innerHTML = `
        <div class="carousel-book-card mx-auto" style="max-width: 300px;">
          <div class="carousel-book-img">
            <img src="${book.coverUrl || 'https://via.placeholder.com/150'}" alt="${book.title}" loading="lazy">
          </div>
          <div class="carousel-book-status status-${book.status.toLowerCase().replace('_', '-')}">
            ${book.status.replace('_', ' ')}
          </div>
          <div class="carousel-book-body">
            <h3 class="carousel-book-title">${book.title}</h3>
            <p class="carousel-book-text" data-i18n="catalog.authors">${translations[localStorage.getItem('language') || 'en'].catalog.authors}: ${book.authors.join(', ')}</p>
            <p class="carousel-book-text" data-i18n="catalog.isbn">${translations[localStorage.getItem('language') || 'en'].catalog.isbn}: ${book.isbn}</p>
            <a href="catalog.html?bookId=${book.id}" class="btn btn-details btn-glow" data-i18n="catalog.viewDetails">${translations[localStorage.getItem('language') || 'en'].catalog.viewDetails}</a>
          </div>
        </div>
      `;
      carouselInner.appendChild(carouselItem);

      const indicator = document.createElement('button');
      indicator.type = 'button';
      indicator.setAttribute('data-bs-target', '#bookCarousel');
      indicator.setAttribute('data-bs-slide-to', index);
      if (isActive) indicator.className = 'active';
      indicator.setAttribute('aria-label', `Slide ${index + 1}`);
      if (isActive) indicator.setAttribute('aria-current', 'true');
      carouselIndicators.appendChild(indicator);
    });

    console.log(`Populated carousel with ${books.length} books`);
    applyLanguage(localStorage.getItem('language') || 'en');
  }

  fetchLatestBooks();
}

function setupFeaturedCollections() {
  const collectionsContainer = document.querySelector('.featured-collections .glide__slides');
  if (!collectionsContainer) {
    console.warn('Featured collections container (.featured-collections .glide__slides) not found');
    return;
  }

  async function fetchFeaturedCollections() {
    try {
      console.log('Fetching featured collections from /collections/featured');
      const { ok, data } = await fetchWithAuth('/collections/featured');
      if (ok && Array.isArray(data)) {
        console.log(`Fetched ${data.length} collections`);
        populateCollections(data);
      } else {
        throw new Error(data.message || 'Failed to fetch collections');
      }
    } catch (error) {
      console.error('Error fetching collections:', error);
      showToast(error.message || 'Failed to load featured collections.', 'error');
      populateCollections(getMockCollections());
    }
  }

  function getMockCollections() {
    const lang = localStorage.getItem('language') || 'en';
    console.log('Using mock collections for language:', lang);
    return [
      {
        id: 'science',
        title: translations[lang].collections.science.title,
        description: translations[lang].collections.science.description,
        imageUrl: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31'
      },
      {
        id: 'history',
        title: translations[lang].collections.history.title,
        description: translations[lang].collections.history.description,
        imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da'
      },
      {
        id: 'art',
        title: translations[lang].collections.art.title,
        description: translations[lang].collections.art.description,
        imageUrl: 'https://images.unsplash.com/photo-1515405295579-ba7b45403062'
      },
      {
        id: 'literature',
        title: translations[lang].collections.literature.title,
        description: translations[lang].collections.literature.description,
        imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd5c'
      }
    ];
  }

  function populateCollections(collections) {
    collectionsContainer.innerHTML = '';

    if (collections.length === 0) {
      collectionsContainer.innerHTML = '<div class="glide__slide"><p class="text-center text-muted py-5">No collections available.</p></div>';
      console.log('No collections to display');
      return;
    }

    collections.forEach(collection => {
      const slide = document.createElement('div');
      slide.className = 'glide__slide';
      slide.innerHTML = `
        <div class="collection-card">
          <div class="collection-img">
            <img src="${collection.imageUrl || 'https://via.placeholder.com/300'}" alt="${collection.title}" loading="lazy">
            <div class="collection-overlay"></div>
          </div>
          <div class="collection-content">
            <h3>${collection.title}</h3>
            <p>${collection.description}</p>
            <a href="catalog.html?collection=${collection.id}" class="btn btn-primary btn-glow" data-i18n="collections.explore">${
              translations[localStorage.getItem('language') || 'en'].collections.explore
            }</a>
          </div>
        </div>
      `;
      collectionsContainer.appendChild(slide);
    });

    if (typeof Glide !== 'undefined') {
      new Glide('.featured-collections', {
        type: 'carousel',
        perView: 3,
        focusAt: 'center',
        gap: 24,
        breakpoints: {
          991: { perView: 2 },
          575: { perView: 1 }
        },
        autoplay: 4000,
        hoverpause: true,
        keyboard: true
      }).mount();
      console.log('Glide carousel initialized for featured collections');
    } else {
      console.warn('Glide.js not loaded, featured collections carousel not initialized');
    }

    applyLanguage(localStorage.getItem('language') || 'en');
  }

  fetchFeaturedCollections();
}

function setupQuickAccess() {
  const quickAccessContainer = document.querySelector('.quick-access-section .row');
  if (!quickAccessContainer) {
    console.warn('Quick access container (.quick-access-section .row) not found');
    return;
  }

  async function fetchQuickAccessLinks() {
    try {
      console.log('Fetching quick access links from /quick-access');
      const { ok, data } = await fetchWithAuth('/quick-access');
      if (ok && Array.isArray(data)) {
        console.log(`Fetched ${data.length} quick access links`);
        populateQuickAccess(data);
      } else {
        throw new Error(data.message || 'Failed to fetch quick access links');
      }
    } catch (error) {
      console.error('Error fetching quick access links:', error);
      showToast(error.message || 'Failed to load quick access links.', 'error');
      populateQuickAccess(getMockQuickAccess());
    }
  }

  function getMockQuickAccess() {
    const lang = localStorage.getItem('language') || 'en';
    console.log('Using mock quick access links for language:', lang);
    return [
      {
        id: 'catalog',
        title: translations[lang].quickAccess.catalog.title,
        description: translations[lang].quickAccess.catalog.description,
        url: 'catalog.html',
        icon: 'fas fa-book'
      },
      {
        id: 'databases',
        title: translations[lang].quickAccess.databases.title,
        description: translations[lang].quickAccess.databases.description,
        url: 'databases.html',
        icon: 'fas fa-database'
      },
      {
        id: 'hours',
        title: translations[lang].quickAccess.hours.title,
        description: translations[lang].quickAccess.hours.description,
        url: 'hours.html',
        icon: 'fas fa-clock'
      },
      {
        id: 'librarian',
        title: translations[lang].quickAccess.librarian.title,
        description: translations[lang].quickAccess.librarian.description,
        url: 'contact.html',
        icon: 'fas fa-user'
      }
    ];
  }

  function populateQuickAccess(links) {
    quickAccessContainer.innerHTML = '';

    if (links.length === 0) {
      quickAccessContainer.innerHTML = '<p class="text-center text-muted py-5">No quick access links available.</p>';
      console.log('No quick access links to display');
      return;
    }

    links.forEach(link => {
      const col = document.createElement('div');
      col.className = 'col-lg-3 col-md-6 mb-4';
      col.innerHTML = `
        <div class="quick-access-card">
          <i class="${link.icon} quick-access-icon"></i>
          <h3 class="quick-access-title">${link.title}</h3>
          <p class="quick-access-text">${link.description}</p>
          <a href="${link.url}" class="btn btn-primary btn-glow" data-i18n="quickAccess.explore">${
            translations[localStorage.getItem('language') || 'en'].quickAccess.explore
          }</a>
        </div>
      `;
      quickAccessContainer.appendChild(col);
    });

    console.log(`Populated quick access with ${links.length} links`);
    applyLanguage(localStorage.getItem('language') || 'en');
  }

  fetchQuickAccessLinks();
}

// Carousels
function setupCarousels() {
  if (document.querySelector('#bookCarousel')) {
    console.log('Setting up book carousel');
    setupBookCarousel();
  } else {
    console.warn('Book carousel (#bookCarousel) not found');
  }
}

// Counter Animation
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  if (!counters.length) {
    console.warn('No stat counters (.stat-number) found');
    return;
  }

  const speed = 200;
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-count');
    const count = +counter.innerText;
    const increment = target / speed;

    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(animateCounters, 1);
    } else {
      counter.innerText = target;
    }
  });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM content loaded, initializing application');
  initializeLanguage();
  setupLanguageSelector();
  setupSearchFunctionality();
  setupNewsletterForm();
  setupHeaderScrollEffects();
  setupSmoothScrolling();
  setupBackToTopButton();
  setupCardHoverEffects();
  setupAuthUI();
  setupContactForm();
  setupIntroSection();
  initAnimations();
  setupCarousels();
  setupFeaturedCollections();
  setupQuickAccess();

  const authButton = document.getElementById('authButton');
  const dashboardButton = document.getElementById('dashboardButton');
  if (authButton && dashboardButton) {
    authButton.style.display = authState.isLoggedIn ? 'none' : 'inline-block';
    dashboardButton.style.display = authState.isLoggedIn ? 'inline-block' : 'none';
  } else {
    console.warn('Auth buttons missing:', { authButton, dashboardButton });
  }
});