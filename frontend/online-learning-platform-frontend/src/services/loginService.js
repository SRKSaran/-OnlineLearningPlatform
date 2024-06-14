import axios from "axios";
import { setUserIdCookie } from '../utils';

const loginService = async (email, password) => {
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
    window.location.href = "/student";

  } catch (err) {
    console.log("error");

    console.error("Login error:", err);
  }
};

export default loginService;
