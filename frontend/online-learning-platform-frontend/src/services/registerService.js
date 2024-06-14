import axios from 'axios';

const signupService = async (name, address,date, email, phone, password) => {
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

export default signupService;