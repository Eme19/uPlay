import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const signUp = async ({ name, email, password }) => {
  const response = await api.post('/auth/signup', { name, email, password });
  return response.data;
};

const logIn = async ({ email, password }) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

const logOut = () => {
  
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
  logIn,
  logOut,
  getCurrentUser,
};

export default authService;
