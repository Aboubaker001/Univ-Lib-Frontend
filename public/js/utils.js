import { gsap } from 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';

export function showError(element, message) {
    const alert = document.createElement('div');
    alert.className = 'alert alert-danger bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative';
    alert.textContent = message;
    element.prepend(alert);
    gsap.from(alert, { opacity: 0, y: -20, duration: 0.5 });
    setTimeout(() => alert.remove(), 3000);
}

export function showSuccess(element, message) {
    const alert = document.createElement('div');
    alert.className = 'alert alert-success bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative';
    alert.textContent = message;
    element.prepend(alert);
    gsap.from(alert, { opacity: 0, y: -20, duration: 0.5 });
    setTimeout(() => alert.remove(), 3000);
}

export function debounce(func, wait) {
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

// Logout functionality
document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            try {
                const response = await fetch('/api/users/logout', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.ok) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    window.location.href = '/login.html';
                } else {
                    throw new Error('Logout failed');
                }
            } catch (error) {
                console.error('Logout error:', error);
                alert('Logout failed. Please try again.');
            }
        });
    }
});