// frontend/public/js/api.js
import { API_URL } from './config.js';

export async function fetchWithAuth(url, options = {}) {
    const fullUrl = `${API_URL}${url}`;
    const headers = { ...options.headers, 'Content-Type': 'application/json' };
    return fetch(fullUrl, { ...options, headers, credentials: 'include' });
}


document.addEventListener('DOMContentLoaded', () => {
    const API_BASE_URL = 'https://univ-lib-backend.onrender.com/api';
    const RECENT_SEARCHES_KEY = 'libraryRecentSearches';

    // Initialize catalog page
    setupCatalogSearch();
    loadInitialResults();
    initAnimations();

    // Set up catalog search and filter functionality
    function setupCatalogSearch() {
        const searchForm = document.getElementById('catalogSearchForm');
        const searchInput = document.getElementById('catalogSearchQuery');
        const searchSuggestions = document.querySelector('.search-suggestions');
        const filterCategory = document.getElementById('filterCategory');
        const filterFormat = document.getElementById('filterFormat');
        const filterAvailability = document.getElementById('filterAvailability');
        const loadMoreBtn = document.getElementById('loadMoreResults');

        if (!searchForm || !searchInput || !searchSuggestions || !loadMoreBtn) return;

        // Debounce utility
        const debounce = (func, wait) => {
            let timeout;
            return (...args) => {
                clearTimeout(timeout);
                timeout = setTimeout(() => func.apply(this, args), wait);
            };
        };

        // Handle form submission
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const query = searchInput.value.trim();
            const filters = getFilters();
            if (query || filters.category !== 'all' || filters.format !== 'all' || filters.availability !== 'all') {
                performCatalogSearch(query, filters);
            }
        });

        // Handle input for suggestions
        searchInput.addEventListener('input', debounce(() => {
            const query = searchInput.value.trim();
            if (query.length > 2) fetchSearchSuggestions(query);
            else clearSearchSuggestions();
        }, 250));

        // Handle focus for recent searches
        searchInput.addEventListener('focus', () => {
            const query = searchInput.value.trim();
            if (query.length > 2) fetchSearchSuggestions(query);
            else showRecentSearches();
        });

        // Handle keyboard navigation for suggestions
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
                performCatalogSearch(selectedQuery, getFilters());
                return;
            } else {
                return;
            }

            suggestions.forEach(s => s.classList.remove('selected'));
            suggestions[newIndex].classList.add('selected');
            suggestions[newIndex].scrollIntoView({ block: 'nearest' });
        });

        // Handle suggestion click
        searchSuggestions.addEventListener('click', (e) => {
            const suggestion = e.target.closest('.search-suggestion-item');
            if (suggestion) {
                const query = suggestion.getAttribute('data-query');
                searchInput.value = query;
                performCatalogSearch(query, getFilters());
            }
        });

        // Handle filter changes
        [filterCategory, filterFormat, filterAvailability].forEach(filter => {
            filter.addEventListener('change', () => {
                const query = searchInput.value.trim();
                performCatalogSearch(query, getFilters());
            });
        });

        // Handle load more
        loadMoreBtn.addEventListener('click', () => {
            loadMoreResults(getFilters());
        });

        // Close suggestions on outside click
        document.addEventListener('click', (e) => {
            if (!searchForm.contains(e.target)) clearSearchSuggestions();
        });
    }

    // Get current filter values
    function getFilters() {
        return {
            category: document.getElementById('filterCategory').value,
            format: document.getElementById('filterFormat').value,
            availability: document.getElementById('filterAvailability').value
        };
    }

    // Perform catalog search
    function performCatalogSearch(query, filters) {
        if (!query && filters.category === 'all' && filters.format === 'all' && filters.availability === 'all') return;

        const searchForm = document.getElementById('catalogSearchForm');
        if (searchForm) searchForm.classList.add('search-loading');

        addToRecentSearches(query);

        setTimeout(() => {
            const mockResults = [
                {
                    id: 'book1',
                    isbn: '9780131103627',
                    title: 'The C Programming Language',
                    edition: '2nd Edition',
                    publisher: 'Prentice Hall',
                    publicationYear: 1988,
                    pageCount: 272,
                    language: 'English',
                    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780131103627-L.jpg',
                    authors: ['Brian W. Kernighan', 'Dennis M. Ritchie'],
                    status: 'AVAILABLE'
                },
                {
                    id: 'book2',
                    isbn: '9780262033848',
                    title: 'Introduction to Algorithms',
                    edition: '3rd Edition',
                    publisher: 'MIT Press',
                    publicationYear: 2009,
                    pageCount: 1312,
                    language: 'English',
                    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780262033848-L.jpg',
                    authors: ['Thomas H. Cormen', 'Charles E. Leiserson', 'Ronald L. Rivest', 'Clifford Stein'],
                    status: 'CHECKED_OUT'
                },
                {
                    id: 'book3',
                    isbn: '9780201633610',
                    title: 'Design Patterns: Elements of Reusable Object-Oriented Software',
                    edition: '1st Edition',
                    publisher: 'Addison-Wesley',
                    publicationYear: 1994,
                    pageCount: 395,
                    language: 'English',
                    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780201633610-L.jpg',
                    authors: ['Erich Gamma', 'Richard Helm', 'Ralph Johnson', 'John Vlissides'],
                    status: 'AVAILABLE'
                },
                {
                    id: 'book4',
                    isbn: '9780596007126',
                    title: 'Head First Design Patterns',
                    edition: '1st Edition',
                    publisher: 'O\'Reilly Media',
                    publicationYear: 2004,
                    pageCount: 694,
                    language: 'English',
                    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780596007126-L.jpg',
                    authors: ['Eric Freeman', 'Elisabeth Robson'],
                    status: 'RESERVED'
                },
                {
                    id: 'book5',
                    isbn: '9780321127426',
                    title: 'Refactoring: Improving the Design of Existing Code',
                    edition: '1st Edition',
                    publisher: 'Addison-Wesley',
                    publicationYear: 1999,
                    pageCount: 464,
                    language: 'English',
                    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780321127426-L.jpg',
                    authors: ['Martin Fowler', 'Kent Beck'],
                    status: 'AVAILABLE'
                },
                {
                    id: 'book6',
                    isbn: '9780132350884',
                    title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
                    edition: '1st Edition',
                    publisher: 'Prentice Hall',
                    publicationYear: 2008,
                    pageCount: 464,
                    language: 'English',
                    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780132350884-L.jpg',
                    authors: ['Robert C. Martin'],
                    status: 'CHECKED_OUT'
                },
                {
                    id: 'book7',
                    isbn: '9780201485677',
                    title: 'The Pragmatic Programmer: From Journeyman to Master',
                    edition: '1st Edition',
                    publisher: 'Addison-Wesley',
                    publicationYear: 1999,
                    pageCount: 352,
                    language: 'English',
                    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780201485677-L.jpg',
                    authors: ['Andrew Hunt', 'David Thomas'],
                    status: 'AVAILABLE'
                },
                {
                    id: 'book8',
                    isbn: '9780137081073',
                    title: 'The Art of Computer Programming, Volume 1: Fundamental Algorithms',
                    edition: '3rd Edition',
                    publisher: 'Addison-Wesley',
                    publicationYear: 1997,
                    pageCount: 672,
                    language: 'English',
                    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780137081073-L.jpg',
                    authors: ['Donald E. Knuth'],
                    status: 'RESERVED'
                },
                {
                    id: 'book9',
                    isbn: '9780596517748',
                    title: 'JavaScript: The Good Parts',
                    edition: '1st Edition',
                    publisher: 'O\'Reilly Media',
                    publicationYear: 2008,
                    pageCount: 176,
                    language: 'English',
                    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780596517748-L.jpg',
                    authors: ['Douglas Crockford'],
                    status: 'AVAILABLE'
                },
                {
                    id: 'book10',
                    isbn: '9780321714114',
                    title: 'Effective Java',
                    edition: '2nd Edition',
                    publisher: 'Addison-Wesley',
                    publicationYear: 2008,
                    pageCount: 368,
                    language: 'English',
                    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780321714114-L.jpg',
                    authors: ['Joshua Bloch'],
                    status: 'CHECKED_OUT'
                }
            ];

            // You can filter mockResults here based on `query` or `filters`
            displayCatalogResults(mockResults);
            if (searchForm) searchForm.classList.remove('search-loading');
            clearSearchSuggestions();
        }, 600);
    }


    // Fetch search suggestions (mock)
    function fetchSearchSuggestions(query) {
        // TODO: Replace with actual API call
        setTimeout(() => {
            const mockSuggestions = [
                { title: `${query} - Books`, type: 'book' },
                { title: `${query} - Journals`, type: 'journal' },
                { title: `${query} - E-Books`, type: 'ebook' }
            ];
            displaySearchSuggestions(mockSuggestions);
        }, 200);
    }

    // Display search suggestions
    function displaySearchSuggestions(suggestions) {
        const searchSuggestions = document.querySelector('.search-suggestions');
        if (!searchSuggestions) return;
        searchSuggestions.innerHTML = suggestions.length === 0
            ? '<div class="search-suggestion-item text-muted p-3" role="option">No suggestions found</div>'
            : suggestions.map((item, index) => `
                <div class="search-suggestion-item" data-query="${item.title}" role="option" id="suggestion-${index}" tabindex="0">
                    <i class="fas fa-${getIconForType(item.type)} me-2 text-primary"></i>
                    ${item.title}
                </div>
            `).join('');
        searchSuggestions.classList.add('show');
    }

    // Show recent searches
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

    // Add to recent searches
    function addToRecentSearches(query) {
        if (!query) return;
        const recentSearches = JSON.parse(localStorage.getItem(RECENT_SEARCHES_KEY)) || [];
        if (!recentSearches.includes(query)) {
            recentSearches.unshift(query);
            localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(recentSearches.slice(0, 5)));
        }
    }

    // Clear search suggestions
    function clearSearchSuggestions() {
        const searchSuggestions = document.querySelector('.search-suggestions');
        if (searchSuggestions) {
            searchSuggestions.innerHTML = '';
            searchSuggestions.classList.remove('show');
        }
    }

    // Get icon for suggestion type
    function getIconForType(type) {
        const icons = {
            book: 'book',
            journal: 'newspaper',
            ebook: 'tablet-alt',
            media: 'film'
        };
        return icons[type] || 'search';
    }

    // Load initial results
    function loadInitialResults() {
        // TODO: Replace with actual API call
        const initialResults = [
            {
                id: '1',
                category: 'science',
                title: 'Introduction to Quantum Computing',
                author: 'Dr. Jane Smith',
                status: 'available',
                image: 'https://images.unsplash.com/photo-1589994965851-a8f43a9d939c'
            },
            {
                id: '2',
                category: 'history',
                title: 'Modern Historical Studies',
                author: 'Edited by Prof. John Doe',
                status: 'checked-out',
                image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73'
            },
            {
                id: '3',
                category: 'architecture',
                title: 'Sustainable Architecture',
                author: 'Architect Lisa Brown',
                status: 'available',
                image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f'
            }
        ];
        displayCatalogResults(initialResults);
    }

    // Display catalog results
    function displayCatalogResults(results) {
        const resultsContainer = document.getElementById('catalogResults');
        if (!resultsContainer) return;
        resultsContainer.innerHTML = results.map((item, index) => `
            <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="${100 + index * 100}">
                <div class="catalog-card card h-100">
                    <div class="catalog-img">
                        <img src="${item.image}" alt="${item.title}" loading="lazy">
                    </div>
                    <div class="catalog-body p-3">
                        <p class="catalog-category text-muted" data-i18n="catalog.results.${item.category}.category">${item.category.charAt(0).toUpperCase() + item.category.slice(1)}</p>
                        <h4 class="catalog-title" data-i18n="catalog.results.${item.category}.title">${item.title}</h4>
                        <p class="catalog-author" data-i18n="catalog.results.${item.category}.author">${item.author}</p>
                        <p class="catalog-status text-${item.status === 'available' ? 'success' : 'danger'}" data-i18n="catalog.results.${item.category}.status">${item.status === 'available' ? 'Available' : 'Checked Out'}</p>
                        <a href="#" class="btn btn-sm btn-outline-primary" data-i18n="catalog.results.viewDetails" aria-label="View details for ${item.title}">View Details</a>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Load more results (mock)
    function loadMoreResults(filters) {
        // TODO: Replace with actual API call with pagination
        setTimeout(() => {
            const moreResults = [
                {
                    id: '4',
                    category: 'literature',
                    title: 'World Literature Classics',
                    author: 'Various Authors',
                    status: 'available',
                    image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66'
                }
            ];
            const resultsContainer = document.getElementById('catalogResults');
            moreResults.forEach((item, index) => {
                const card = document.createElement('div');
                card.className = 'col-lg-4 col-md-6';
                card.setAttribute('data-aos', 'fade-up');
                card.setAttribute('data-aos-delay', `${100 + index * 100}`);
                card.innerHTML = `
                    <div class="catalog-card card h-100">
                        <div class="catalog-img">
                            <img src="${item.image}" alt="${item.title}" loading="lazy">
                        </div>
                        <div class="catalog-body p-3">
                            <p class="catalog-category text-muted" data-i18n="catalog.results.${item.category}.category">${item.category.charAt(0).toUpperCase() + item.category.slice(1)}</p>
                            <h4 class="catalog-title" data-i18n="catalog.results.${item.category}.title">${item.title}</h4>
                            <p class="catalog-author" data-i18n="catalog.results.${item.category}.author">${item.author}</p>
                            <p class="catalog-status text-${item.status === 'available' ? 'success' : 'danger'}" data-i18n="catalog.results.${item.category}.status">${item.status === 'available' ? 'Available' : 'Checked Out'}</p>
                            <a href="#" class="btn btn-sm btn-outline-primary" data-i18n="catalog.results.viewDetails" aria-label="View details for ${item.title}">View Details</a>
                        </div>
                    </div>
                `;
                resultsContainer.appendChild(card);
            });
        }, 600);
    }

    // Initialize AOS animations
    function initAnimations() {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'ease-out-quart',
                once: true,
                offset: 100
            });
        }
    }
});