// public/js/api.js
import { API_URL } from './config.js';

export const login = async ({ email, password }) => {
  try {
    const response = await fetch(`${API_URL}/user/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Login failed');
    localStorage.setItem('token', data.token);
    localStorage.setItem('userRole', data.role);
    // Redirect based on role
    if (data.role === 'admin' || data.role === 'librarian') {
      window.location.href = '/admin-librarian/dashboard.html';
    } else if (data.role === 'student') {
      window.location.href = '/student/home.html';
    } else {
      window.location.href = '/main/home.html';
    }
    return { ok: true, role: data.role };
  } catch (error) {
    console.error('Login error:', error);
    return { ok: false, message: error.message };
  }
};

export const registerUser = async (formData) => {
  try {
    const response = await fetch(`${API_URL}/user/register`, {
      method: 'POST',
      body: formData
    });
    const data = await response.json();
    console.log('Register API response:', data);
    if (!response.ok) throw new Error(data.message || 'Registration failed');
    return { ok: true };
  } catch (error) {
    console.error('Register error:', error);
    return { ok: false, message: error.message };
  }
};