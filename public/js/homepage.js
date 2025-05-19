// homepage.js
document.addEventListener('DOMContentLoaded', () => {
  setupSidebar();
  setupDashboard();
  setupLogout();
  setupSidebarToggle();
});

function setupSidebarToggle() {
  const sidebar = document.getElementById('sidebar');
  const toggleBtn = document.getElementById('sidebarToggle');

  toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('active');
  });
}

function setupLogout() {
  const logoutBtn = document.getElementById('logoutBtn');
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
  });
}

function setupSidebar() {
  const sidebarLinks = document.getElementById('sidebar-links');
  const welcomeMsg = document.getElementById('welcome-msg');

  // Simulate token retrieval and decoding
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = 'login.html';
    return;
  }

  // Decode token payload (assuming JWT)
  const payload = JSON.parse(atob(token.split('.')[1]));
  const role = payload.role;
  const username = payload.username || 'User';

  welcomeMsg.textContent = `Welcome, ${username}!`;

  // Define role-based links
  const links = {
    ADMIN: [
      { href: 'admin-dashboard.html', icon: 'fas fa-home', label: 'Dashboard' },
      { href: 'admin-librarians.html', icon: 'fas fa-user-tie', label: 'Manage Librarians' },
      { href: 'admin-students.html', icon: 'fas fa-user-graduate', label: 'Manage Students' },
      { href: 'admin-books.html', icon: 'fas fa-book', label: 'Manage Books' },
      { href: 'admin-reservations.html', icon: 'fas fa-calendar-check', label: 'Manage Reservations' },
      { href: 'homepage.html', icon: 'fas fa-globe', label: 'Home' }
    ],
    LIBRARIAN: [
      { href: 'librarian-dashboard.html', icon: 'fas fa-home', label: 'Dashboard' },
      { href: 'librarian-students.html', icon: 'fas fa-user-graduate', label: 'Manage Students' },
      { href: 'librarian-books.html', icon: 'fas fa-book', label: 'Manage Books' },
      { href: 'librarian-reservations.html', icon: 'fas fa-calendar-check', label: 'Manage Reservations' },
      { href: 'homepage.html', icon: 'fas fa-globe', label: 'Home' }
    ],
    STUDENT: [
      { href: 'student-dashboard.html', icon: 'fas fa-home', label: 'Dashboard' },
      { href: 'student-borrow.html', icon: 'fas fa-book', label: 'Borrow Book' },
      { href: 'student-borrowed.html', icon: 'fas fa-book-open', label: 'My Borrowed Books' },
      { href: 'homepage.html', icon: 'fas fa-globe', label: 'Home' }
    ]
  };

  // Render sidebar links
  sidebarLinks.innerHTML = links[role].map(link => `
    <li><a href="${link.href}" class="${link.href.endsWith('homepage.html') ? 'active' : ''}">
      <i class="${link.icon}"></i> ${link.label}
    </a></li>
  `).join('');
}

function setupDashboard() {
  const token = localStorage.getItem('token');
  if (!token) return;
  const payload = JSON.parse(atob(token.split('.')[1]));
  const role = payload.role;

  const dashboardContent = document.getElementById('dashboard-content');
  let contentHTML = '';

  if (role === 'STUDENT') {
    contentHTML = `
      <div class="col-md-6 col-lg-4">
        <div class="card">
          <h5>My Borrowed Books</h5>
          <p>You currently have <strong>3</strong> books borrowed.</p>
        </div>
      </div>
      <div class="col-md-6 col-lg-4">
        <div class="card">
          <h5>Recommended for You</h5>
          <ul>
            <li>Introduction to Algorithms</li>
            <li>Modern Web Development</li>
            <li>Database Systems</li>
          </ul>
        </div>
      </div>
    `;
  } else if (role === 'LIBRARIAN') {
    contentHTML = `
      <div class="col-md-6 col-lg-4">
        <div class="card">
          <h5>Today's Loans</h5>
          <p><strong>25</strong> books loaned today.</p>
        </div>
      </div>
      <div class="col-md-6 col-lg-4">
        <div class="card">
          <h5>Overdue Books</h5>
          <p><strong>3</strong> books are overdue.</p>
        </div>
      </div>
      <div class="col-md-6 col-lg-4">
        <div class="card">
          <h5>Low Stock Books</h5>
          <p><strong>5</strong> books need restocking.</p>
        </div>
      </div>
      <div class="col-12">
        <div class="card">
          <h5>Quick Actions</h5>
          <button class="btn btn-primary me-2">Add New Book</button>
          <button class="btn btn-primary">Manage Reservations</button>
        </div>
      </div>
    `;
  } else if (role === 'ADMIN') {
    contentHTML = `
      <div class="col-md-6 col-lg-4">
        <div class="card">
          <h5>System Health</h5>
          <p>All systems operational</p>
        </div>
      </div>
      <div class="col-md-6 col-lg-4">
        <div class="card">
          <h5>Recent Activity</h5>
          <p>Last login: 2 hours ago</p>
        </div>
      </div>
      <div class="col-md-6 col-lg-4">
        <div class="card">
          <h5>User Statistics</h5>
          <ul>
            <li>Students: 1500</li>
            <li>Librarians: 10</li>
            <li>Admins: 2</li>
          </ul>
        </div>
      </div>
    `;
  }

  dashboardContent.innerHTML = contentHTML;
}