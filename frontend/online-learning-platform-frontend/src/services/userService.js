import axios from "axios";
import { setUserIdCookie } from '../utils';

export const loginService = async (email, password) => {
  console.log(email, password);
  const apiUrl = "http://localhost:8000";
  try {
    const response = await axios.post(`${apiUrl}/api/user/login`, {
      email,
      password,
    });
    const token = response.data.token;
    console.log("JWT Token:", token);

    document.cookie = `jwtToken=${encodeURIComponent(token)}; path=/; Secure`;
    setUserIdCookie(response.data.userId);
    if(response.data.role === "admin") window.location.href = "/admin";
    else window.location.href = "/student";

  } catch (err) {
    console.log("error");

    console.error("Login error:", err);
  }
};

export const logoutService = async (token) => {
  try {
    await api.post(
      `/api/user/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (err) {
    console.error("Logout error:", err);
  } finally {
    // Clear the JWT token from the cookie
    document.cookie = `jwtToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; Secure`;

    window.location.href = "/login"; 
  }
};

export const signupService = async (name, address,date, email, phone, password) => {
  console.log(name, address,date, email, phone, password);
  const apiUrl = "http://localhost:8000";

  try {
    const response = await axios.post(`${apiUrl}/api/user/register`, { name, address, date, email, phone, password });
    const data = response.data; 
    console.log(response);

    if (data === 'User registered successfully') {
      window.location.href = '/login';
    } else {
      console.error(data.message || 'Signup failed');
    }
  } catch (err) {
    console.error('Signup error:', err);
  }
};
