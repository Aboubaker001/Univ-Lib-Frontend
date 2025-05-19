export const login = async ({ email, password }) => {
  try {
    const response = await fetch('http://localhost:5000/api/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    console.log('Login API response:', data);
    if (!response.ok) throw new Error(data.message || 'Login failed');
    localStorage.setItem('token', data.token);
    localStorage.setItem('userRole', data.role);
    return { ok: true, role: data.role };
  } catch (error) {
    console.error('Login error:', error);
    return { ok: false, message: error.message };
  }
};

export const registerUser = async (formData) => {
  try {
    const response = await fetch('http://localhost:5000/api/user/register', {
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