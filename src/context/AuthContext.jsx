import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState('bangla');

  // 🌍 Global Production URL Sync
  // In development, this will be empty (using Vite proxy)
  // In production, you will set VITE_API_URL in Netlify
  const API_URL = 'https://physics-backend-v2.onrender.com';
  axios.defaults.baseURL = API_URL;

  // Configure axios defaults
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  const login = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    setLanguage(userData.languagePreference || 'bangla');
    localStorage.setItem('token', userToken);
    axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  };

  const toggleLanguage = async () => {
    const newLang = language === 'bangla' ? 'english' : 'bangla';
    setLanguage(newLang);
    if (user) {
      try {
        await axios.patch('/api/auth/language', { languagePreference: newLang });
      } catch (err) {
        console.error('Failed to update remote language preference');
      }
    }
  };

  useEffect(() => {
    const verifyUser = async () => {
      if (token) {
        try {
          const res = await axios.get('/api/auth/me');
          setUser(res.data.user);
          setLanguage(res.data.user.languagePreference || 'bangla');
        } catch (err) {
          logout();
        }
      }
      setLoading(false);
    };
    verifyUser();
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, language, toggleLanguage }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
