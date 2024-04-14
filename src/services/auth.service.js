import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const signUp = async ({ username, email, password,  }) => {
  const response = await api.post('/auth/signup', { username, email, password });
  return response.data;
};





const getCurrentUser = async () => {
  const storedToken = localStorage.getItem('authToken');
  if (!storedToken) {
    return null;
  }
  try {
    const response = await api.get('/api/users', {
      headers: { Authorization: `Bearer ${storedToken}` },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const authService = {
  signUp,
  getCurrentUser,
};

export default authService;
