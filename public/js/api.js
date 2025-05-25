import { API_BASE_URL } from './config.js';
import { showSuccess, showError } from './utils.js';

export async function fetchWithAuth(endpoint, options = {}) {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        ...headers,
        ...options.headers
      },
      credentials: 'include'
    });

    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Server returned non-JSON response');
    }

    const data = await response.json();
    return { ok: response.ok, data };
  } catch (error) {
    console.error(`Fetch error for ${endpoint}:`, error);
    return { ok: false, data: { message: error.message || 'Network error' } };
  }
}

export const login = async ({ email, password }, formElement) => {
  try {
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

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Server returned non-JSON response');
    }

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    localStorage.setItem('token', data.data);
    localStorage.setItem('userRole', data.role);

    showSuccess(formElement, 'Login successful! Redirecting...');

    setTimeout(() => {
      if (data.role === 'ADMIN' || data.role === 'LIBRARIAN') {
        window.location.href = '/admin-librarian/dashboard.html';
      } else if (data.role === 'STUDENT') {
        window.location.href = '/student/home.html';
      } else {
        window.location.href = '/main/home.html';
      }
    }, 1000);

    return { ok: true, role: data.role };
  } catch (error) {
    console.error('Login error:', error);
    showError(formElement, error.message || 'Login failed. Please try again.');
    return { ok: false, message: error.message || 'Login failed' };
  }
};

export const registerUser = async (formData, formElement) => {
  try {
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