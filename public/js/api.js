// frontend/public/js/api.js
import { API_BASE_URL } from './config.js';
import { fetchWithAuth, showSuccess, showError } from './utils.js';

// frontend/public/js/api.js
export async function fetchWithAuth(endpoint, options = {}) {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };

  try {
    const response = await fetch(`${'https://univ-lib-backend.onrender.com/api'}${endpoint}`, {
      ...options,
      headers: {
        ...headers,
        ...options.headers
      },
      credentials: 'include'
    });

    const data = await response.json();
    return { ok: response.ok, data };
  } catch (error) {
    console.error(`Fetch error for ${endpoint}:`, error);
    return { ok: false, data: { message: error.message || 'Network error' } };
  }
}

export const login = async ({ email, password }, formElement) => {
  try {
    // Use plain fetch for public login endpoint (no auth token needed)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    localStorage.setItem('token', data.token);
    localStorage.setItem('userRole', data.role);

    // Show success message
    showSuccess(formElement, 'Login successful! Redirecting...');

    // Redirect based on role
    setTimeout(() => {
      if (data.role === 'admin' || data.role === 'librarian') {
        window.location.href = '/admin-librarian/dashboard.html';
      } else if (data.role === 'student') {
        window.location.href = '/student/home.html';
      } else {
        window.location.href = '/main/home.html';
      }
    }, 1000); // Delay redirect to show success message

    return { ok: true, role: data.role };
  } catch (error) {
    console.error('Login error:', error);
    showError(formElement, error.message || 'Login failed. Please try again.');
    return { ok: false, message: error.message || 'Login failed' };
  }
};

export const registerUser = async (formData, formElement) => {
  try {
    // Use plain fetch for public register endpoint
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(`${API_BASE_URL}/users/register`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Registration failed');
    }

    showSuccess(formElement, 'Registration successful! Please log in.');
    return { ok: true, data };
  } catch (error) {
    console.error('Register error:', error);
    showError(formElement, error.message || 'Registration failed. Please try again.');
    return { ok: false, message: error.message || 'Registration failed' };
  }
};