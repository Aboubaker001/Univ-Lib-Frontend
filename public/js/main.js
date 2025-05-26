// Base API URL for all API calls (change to production URL as needed, e.g., 'https://your-domain.com/api')
const API_BASE_URL = 'https://univ-lib-backend.onrender.com/api';

// Translation data
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

// Initialize language functionality
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

// Apply translations to the page
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

// Setup language selector dropdown
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
    });
  });
}

// Setup search bar functionality
async function setupSearchBar() {
  const searchForm = document.getElementById('searchForm');
  const searchQueryInput = document.getElementById('searchQuery');
  const searchSuggestions = document.querySelector('.search-suggestions');

  if (!searchForm || !searchQueryInput || !searchSuggestions) {
    console.warn('Search bar elements not found');
    return;
  }

  console.log('Setting up search bar functionality');

  // Enhance accessibility
  searchQueryInput.setAttribute('aria-autocomplete', 'list');
  searchQueryInput.setAttribute('aria-controls', 'search-suggestions');
  searchSuggestions.setAttribute('role', 'listbox');

  // Debounce function to limit API calls
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Fetch search suggestions with authentication and timeout
  async function fetchSuggestions(query) {
    if (query.length < 2) {
      searchSuggestions.innerHTML = '';
      searchSuggestions.style.display = 'none';
      return;
    }

    // Sanitize query to prevent injection
    const sanitizedQuery = query.replace(/[<>"'&]/g, '');

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 10s timeout
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/books/search?q=${encodeURIComponent(sanitizedQuery)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        credentials: 'include',
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 401) {
          searchSuggestions.innerHTML = '<div class="suggestion-item text-warning" role="option">Please log in to search</div>';
          searchSuggestions.style.display = 'block';
          return;
        }
        throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
      }

      const { data: books } = await response.json();
      displaySuggestions(books);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      const errorMessage = error.name === 'AbortError' ? 'Search request timed out' : error.message || 'Error loading suggestions';
      searchSuggestions.innerHTML = `<div class="suggestion-item text-danger" role="option">${errorMessage}</div>`;
      searchSuggestions.style.display = 'block';
    }
  }

  // Display search suggestions with accessibility
  function displaySuggestions(books) {
    searchSuggestions.innerHTML = '';
    if (!books || books.length === 0) {
      searchSuggestions.innerHTML = '<div class="suggestion-item" role="option">No results found</div>';
      searchSuggestions.style.display = 'block';
      return;
    }

    books.forEach((book, index) => {
      const suggestion = document.createElement('div');
      suggestion.className = 'suggestion-item';
      suggestion.setAttribute('role', 'option');
      suggestion.setAttribute('id', `suggestion-${index}`);
      suggestion.setAttribute('tabindex', '0');
      suggestion.innerHTML = `
        <strong>${book.title}</strong> by ${book.authors.join(', ')}<br>
        <small>Language: ${book.language} | Status: ${book.status}</small>
      `;
      suggestion.addEventListener('click', () => {
        window.location.href = `/public/main/public-book-details.html?id=${book.id}`;
      });
      suggestion.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === 'Space') {
          e.preventDefault();
          window.location.href = `/public/main/public-book-details.html?id=${book.id}`;
        }
      });
      searchSuggestions.appendChild(suggestion);
    });
    searchSuggestions.style.display = 'block';
  }

  // Handle form submission
  searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = searchQueryInput.value.trim();
    if (query.length < 2) {
      searchSuggestions.innerHTML = '<div class="suggestion-item text-warning" role="option">Please enter at least 2 characters</div>';
      searchSuggestions.style.display = 'block';
      return;
    }

    // Sanitize query
    const sanitizedQuery = query.replace(/[<>"'&]/g, '');

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/books/search?q=${encodeURIComponent(sanitizedQuery)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        credentials: 'include',
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 401) {
          searchSuggestions.innerHTML = '<div class="suggestion-item text-warning" role="option">Please log in to search</div>';
          searchSuggestions.style.display = 'block';
          return;
        }
        throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
      }

      const { data: books } = await response.json();
      window.location.href = `/public/main/search-results.html?q=${encodeURIComponent(sanitizedQuery)}`;
    } catch (error) {
      console.error('Error during search:', error);
      const errorMessage = error.name === 'AbortError' ? 'Search request timed out' : error.message || 'Error performing search';
      searchSuggestions.innerHTML = `<div class="suggestion-item text-danger" role="option">${errorMessage}</div>`;
      searchSuggestions.style.display = 'block';
    }
  });

  // Handle input for real-time suggestions
  searchQueryInput.addEventListener('input', debounce(async () => {
    const query = searchQueryInput.value.trim();
    await fetchSuggestions(query);
  }, 300));

  // Hide suggestions when clicking outside
  document.addEventListener('click', (e) => {
    if (!searchForm.contains(e.target) && !searchSuggestions.contains(e.target)) {
      searchSuggestions.style.display = 'none';
    }
  });
}

 async function loadNewArrivals() {
      try {
        const response = await fetch(`${API_BASE_URL}/books/latest?limit=10`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            ...(localStorage.getItem('token') ? { Authorization: `Bearer ${localStorage.getItem('token')}` } : {}),
          },
          credentials: 'include',
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
        }

        const { data: books } = await response.json();
        populateCarousel(books);
      } catch (error) {
        console.error('Error fetching new arrivals:', error);
        document.getElementById('carousel-error').textContent = error.message || 'Failed to load new arrivals';
        document.getElementById('carousel-error').classList.remove('d-none');
      }
    }

    function populateCarousel(books) {
      const carouselInner = document.getElementById('bookCarousel').querySelector('.carousel-inner');
      const carouselIndicators = document.getElementById('bookCarousel').querySelector('.carousel-indicators');
      carouselInner.innerHTML = '';
      carouselIndicators.innerHTML = '';

      if (!books || books.length === 0) {
        carouselInner.innerHTML = '<div class="carousel-item active"><div class="text-center py-5">No new arrivals found</div></div>';
        return;
      }

      // Group books into slides (2 books per slide)
      const booksPerSlide = 2;
      const slides = [];
      for (let i = 0; i < books.length; i += booksPerSlide) {
        slides.push(books.slice(i, i + booksPerSlide));
      }

      slides.forEach((slideBooks, index) => {
        const carouselItem = document.createElement('div');
        carouselItem.className = `carousel-item ${index === 0 ? 'active' : ''}`;
        carouselItem.setAttribute('role', 'group');
        carouselItem.setAttribute('aria-label', `Slide ${index + 1} of ${slides.length}`);

        const row = document.createElement('div');
        row.className = 'row';

        slideBooks.forEach(book => {
          const bookCard = document.createElement('div');
          bookCard.className = 'col-md-6';
          bookCard.innerHTML = `
            <div class="card h-100 book-card" role="article" aria-labelledby="book-title-${book.id}">
              ${book.coverUrl ? `
                <img src="${book.coverUrl}" class="card-img-top" alt="${book.title} cover">
              ` : `
                <div class="fallback-image">No Cover Available</div>
              `}
              <div class="card-body">
                <h5 class="card-title" id="book-title-${book.id}">${book.title}</h5>
                <p class="card-text">By ${book.authors.join(', ')}</p>
                <p class="card-text">
                  <small>
                    Language: ${book.language} | 
                    <span class="status-badge ${book.status === 'AVAILABLE' ? 'status-available' : 'status-checked-out'}" 
                          data-bs-toggle="tooltip" 
                          title="${book.status === 'AVAILABLE' ? 'Ready to borrow' : 'Currently borrowed'}">
                      Status: ${book.status}
                    </span>
                  </small>
                </p>
                <a href="/public/main/public-book-details.html?id=${book.id}" 
                   class="btn btn-primary" 
                   aria-label="View details for ${book.title}">
                  View Details
                </a>
              </div>
            </div>
          `;
          row.appendChild(bookCard);
        });

        carouselItem.appendChild(row);
        carouselInner.appendChild(carouselItem);

        // Add indicator
        const indicator = document.createElement('button');
        indicator.type = 'button';
        indicator.setAttribute('data-bs-target', '#bookCarousel');
        indicator.setAttribute('data-bs-slide-to', index);
        if (index === 0) indicator.className = 'active';
        indicator.setAttribute('aria-label', `Slide ${index + 1}`);
        if (index === 0) indicator.setAttribute('aria-current', 'true');
        carouselIndicators.appendChild(indicator);
      });

      // Initialize tooltips
      const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
      tooltipTriggerList.forEach(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
    }

    document.addEventListener('DOMContentLoaded', () => {
      loadNewArrivals();
      document.getElementById('current-year').textContent = new Date().getFullYear();
    });

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM content loaded, initializing functionality');
  initializeLanguage();
  setupLanguageSelector();
  setupSearchBar();
});