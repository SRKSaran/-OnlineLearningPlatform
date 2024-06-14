import axios from "axios";

const logoutService = async (token) => {
  const apiUrl = "http://localhost:8000";
  try {
    await axios.post(
      `${apiUrl}/api/user/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Clear the JWT token from the cookie
    document.cookie = `jwtToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; Secure`;

    window.location.href = "/"; 
  } catch (err) {
    console.error("Logout error:", err);
  }
};

export default logoutService;
