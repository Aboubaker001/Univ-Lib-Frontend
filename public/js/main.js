import { fetchWithAuth } from './api.js';

const RECENT_SEARCHES_KEY = 'libraryRecentSearches';
const API_BASE_URL = process.env.API_URL || 'https://library-backend.railway.app/api';

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
        submit: 'Go'
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
        submit: 'إرسال'
      }
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
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
  
  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  };


  function initializeLanguage() {
    const savedLanguage = localStorage.getItem('language') || 'en';
    applyLanguage(savedLanguage);
    document.documentElement.lang = savedLanguage;
    document.documentElement.setAttribute('dir', savedLanguage === 'ar' ? 'rtl' : 'ltr');
    document.querySelector('.language-text').textContent = savedLanguage === 'ar' ? 'AR' : 'EN';
    window.dispatchEvent(new Event('resize')); // Ensure RTL styles recalculate
  }

  function applyLanguage(lang) {
    const page = window.location.pathname.includes('about-us.html') ? 'about' : 'home';
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      const keys = key.split('.');
      let value = translations[lang];
      for (const k of keys) {
        value = value?.[k];
        if (!value) break;
      }
      if (value) element.textContent = value;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
      const key = element.getAttribute('data-i18n-placeholder');
      const keys = key.split('.');
      let value = translations[lang];
      for (const k of keys) {
        value = value?.[k];
        if (!value) break;
      }
      if (value) element.placeholder = value;
    });
    document.title = translations[lang][page].title;
    document.getElementById('current-year').textContent = new Date().getFullYear();
  }

  function setupLanguageSelector() {
    const languageItems = document.querySelectorAll('.language-selector .dropdown-item');
    languageItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const selectedLang = item.getAttribute('data-lang');
        localStorage.setItem('language', selectedLang);
        applyLanguage(selectedLang);
        document.documentElement.lang = selectedLang;
        document.documentElement.setAttribute('dir', selectedLang === 'ar' ? 'rtl' : 'ltr');
        document.querySelector('.language-text').textContent = selectedLang === 'ar' ? 'AR' : 'EN';
        languageItems.forEach(i => i.setAttribute('aria-selected', i.getAttribute('data-lang') === selectedLang));
      });
    });
  }

  function setupSearchFunctionality() {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchQuery');
    const searchSuggestions = document.querySelector('.search-suggestions');
    if (!searchForm || !searchInput || !searchSuggestions) return;

    searchForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const query = searchInput.value.trim();
      if (query) await performSearch(query);
    });

    searchInput.addEventListener('input', debounce(async () => {
      const query = searchInput.value.trim();
      if (query.length > 2) await fetchSearchSuggestions(query);
      else clearSearchSuggestions();
    }, 300));

    searchInput.addEventListener('focus', () => {
      const query = searchInput.value.trim();
      if (query.length > 2) fetchSearchSuggestions(query);
      else showRecentSearches();
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
        performSearch(query);
      }
    });

    document.addEventListener('click', (e) => {
      if (!searchForm.contains(e.target)) clearSearchSuggestions();
    });
  }

  async function performSearch(query) {
    if (!query) return;
    addToRecentSearches(query);
    const searchForm = document.getElementById('searchForm');
    if (searchForm) searchForm.classList.add('search-loading');
    try {
      const response = await fetchWithAuth(`${API_BASE_URL}/books/search?q=${encodeURIComponent(query)}`);
      const result = await response.json();
      if (result.ok) {
        window.location.href = `/main/catalog.html?q=${encodeURIComponent(query)}`;
      } else {
        showToast(result.message || 'Search failed.');
      }
    } catch (error) {
      console.error('Search error:', error);
      showToast('An error occurred during search.');
    } finally {
      if (searchForm) searchForm.classList.remove('search-loading');
      clearSearchSuggestions();
    }
  }

  async function fetchSearchSuggestions(query) {
    try {
      const response = await fetchWithAuth(`${API_BASE_URL}/books/suggestions?q=${encodeURIComponent(query)}`);
      const result = await response.json();
      if (result.ok) {
        displaySearchSuggestions(result.data);
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

  function setupNewsletterForm() {
    const newsletterForm = document.getElementById('newsletterForm');
    const newsletterMessage = document.querySelector('.newsletter-message');
    if (!newsletterForm || !newsletterMessage) return;

    newsletterForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = newsletterForm.querySelector('input[type="email"]').value.trim();
      if (!email) return;

      try {
        const response = await fetchWithAuth(`${API_BASE_URL}/newsletter`, {
          method: 'POST',
          body: JSON.stringify({ email })
        });
        const result = await response.json();
        if (result.ok) {
          showToast(translations[localStorage.getItem('language') || 'en'].footer.newsletter.success || 'Subscribed successfully!');
          newsletterForm.reset();
        } else {
          showToast(result.message || 'Subscription failed.');
        }
      } catch (error) {
        console.error('Newsletter error:', error);
        showToast('Subscription failed. Try again.');
      }
    });
  }

  function setupHeaderScrollEffects() {
    const header = document.querySelector('.navbar');
    if (!header) return;
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
      }
    });
  }

  function setupBackToTopButton() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (!backToTopBtn) return;
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
      const card = e.target.closest('.card, .carousel-book-card');
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
    document.addEventListener('mouseleave', (e) => {
      const card = e.target.closest('.card, .carousel-book-card');
      if (!card) return;
      card.style.removeProperty('--mouse-x');
      card.style.removeProperty('--mouse-y');
    });
  }

  function setupAuthUI() {
    const authButton = document.getElementById('authButton');
    const dashboardButton = document.getElementById('dashboardButton');
    if (!authButton || !dashboardButton) return;

    function updateAuthUI() {
      const user = JSON.parse(localStorage.getItem('user'));
      const lang = localStorage.getItem('language') || 'en';
      if (user && user.token) {
        authButton.setAttribute('data-i18n', 'nav.logout');
        authButton.textContent = translations[lang].nav.logout;
        authButton.onclick = handleLogout;
        dashboardButton.style.display = 'block';
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
      window.location.href = './public/login.html';
    }

    async function handleLogout() {
      try {
        const response = await fetchWithAuth(`${API_BASE_URL}/users/logout`, {
          method: 'GET',
          credentials: 'include'
        });
        const result = await response.json();
        if (result.message === 'Logged out successfully') {
          localStorage.removeItem('user');
          updateAuthUI();
        } else {
          showToast(result.message || 'Logout failed.');
        }
      } catch (error) {
        console.error('Logout error:', error);
        showToast('An error occurred during logout.');
      }
    }
  }

  function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('contactName').value;
      const email = document.getElementById('contactEmail').value;
      const message = document.getElementById('contactMessage').value;

      try {
        const response = await fetchWithAuth(`${API_BASE_URL}/contact`, {
          method: 'POST',
          body: JSON.stringify({ name, email, message })
        });
        const result = await response.json();
        if (result.ok) {
          showToast(translations[localStorage.getItem('language') || 'en'].about.contact.form.success);
          contactForm.reset();
        } else {
          showToast(result.message || 'Failed to send message.');
        }
      } catch (error) {
        console.error('Contact form error:', error);
        showToast('An error occurred. Please try again.');
      }
    });
  }

// main.js
function setupIntroSection() {
  if (!window.location.pathname.includes('index.html')) return;
  const introVideo = document.querySelector('.intro-video');
  if (!introVideo || introVideo.tagName !== 'VIDEO') return;
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

  function setupCarousels() {
    if (typeof Glide !== 'undefined' && document.querySelector('.featured-collections')) {
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
    }

    if (typeof particlesJS !== 'undefined' && document.querySelector('#particles-js')) {
      particlesJS('particles-js', {
        particles: {
          number: { value: 70, density: { enable: true, value_area: 900 } },
          color: { value: '#ffffff' },
          shape: { type: 'circle' },
          opacity: { value: 0.4, random: true },
          size: { value: 2.5, random: true },
          line_linked: { enable: true, distance: 140, color: '#ffffff', opacity: 0.3, width: 2 },
          move: { enable: true, speed: 1.5, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false }
        },
        interactivity: {
          detect_on: 'canvas',
          events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true },
          modes: { repulse: { distance: 90, duration: 0.3 }, push: { particles_nb: 5 } }
        },
        retina_detect: true
      });
    }

    if (document.querySelector('#bookCarousel')) {
      setupBookCarousel();
    }
  }

  function setupBookCarousel() {
    const carouselInner = document.querySelector('#bookCarousel .carousel-inner');
    const carouselIndicators = document.querySelector('#bookCarousel .carousel-indicators');
    if (!carouselInner || !carouselIndicators) return;

    async function fetchLatestBooks() {
      try {
        const response = await fetchWithAuth(`${API_BASE_URL}/books/latest?limit=10`);
        const result = await response.json();
        if (result.ok) {
          populateCarousel(result.data);
        } else {
          throw new Error(result.message || 'Failed to fetch books');
        }
      } catch (error) {
        console.error('Error fetching books:', error);
        const mockBooks = [
          {
            id: '1',
            title: 'Introduction to Quantum Computing',
            authors: ['Dr. Jane Smith'],
            isbn: '978-3-16-148410-0',
            status: 'AVAILABLE',
            coverUrl: 'https://via.placeholder.com/150'
          },
          {
            id: '2',
            title: 'Modern Historical Studies',
            authors: ['Prof. John Doe'],
            isbn: '978-1-234-56789-0',
            status: 'CHECKED_OUT',
            coverUrl: 'https://via.placeholder.com/150'
          },
          {
            id: '3',
            title: 'Sustainable Architecture',
            authors: ['Architect Lisa Brown'],
            isbn: '978-0-123-45678-9',
            status: 'AVAILABLE',
            coverUrl: 'https://via.placeholder.com/150'
          }
        ];
        populateCarousel(mockBooks);
      }
    }

    function populateCarousel(books) {
      carouselInner.innerHTML = '';
      carouselIndicators.innerHTML = '';
      if (books.length === 0) {
        carouselInner.innerHTML = '<div class="carousel-item"><p class="text-center text-white">No books available.</p></div>';
        return;
      }

      books.forEach((book, index) => {
        const isActive = index === 0 ? 'active' : '';
        const carouselItem = document.createElement('div');
        carouselItem.className = `carousel-item ${isActive}`;
        carouselItem.innerHTML = `
          <div class="carousel-book-card mx-auto" style="max-width: 300px;">
            <div class="carousel-book-img">
              <img src="${book.coverUrl || 'https://via.placeholder.com/150'}" alt="${book.title}">
            </div>
            <div class="carousel-book-status status-${book.status.toLowerCase().replace('_', '-')}">
              ${book.status.replace('_', ' ')}
            </div>
            <div class="carousel-book-body">
              <h3 class="carousel-book-title">${book.title}</h3>
              <p class="carousel-book-text" data-i18n="catalog.authors">Authors: ${book.authors.join(', ')}</p>
              <p class="carousel-book-text" data-i18n="catalog.isbn">ISBN: ${book.isbn}</p>
              <a href="catalog.html?bookId=${book.id}" class="btn btn-details btn-glow" data-i18n="catalog.viewDetails">View Details</a>
            </div>
          </div>
        `;
        carouselInner.appendChild(carouselItem);

        const indicator = document.createElement('button');
        indicator.setAttribute('data-bs-target', '#bookCarousel');
        indicator.setAttribute('data-bs-slide-to', index);
        if (isActive) indicator.className = 'active';
        indicator.setAttribute('aria-label', `Slide ${index + 1}`);
        carouselIndicators.appendChild(indicator);
      });

      applyLanguage(localStorage.getItem('language') || 'en');
    }

    fetchLatestBooks();
  }

  function showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.right = '20px';
    toast.style.padding = '10px 20px';
    toast.style.background = 'var(--primary-color)';
    toast.style.color = 'var(--white)';
    toast.style.borderRadius = 'var(--border-radius)';
    toast.style.zIndex = '1000';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }
});