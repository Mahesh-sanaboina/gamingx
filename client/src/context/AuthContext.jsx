import { createContext, useContext, useEffect, useState } from 'react';
import { login as loginRequest, signup as signupRequest, fetchProfile } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('gamingx_token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const response = await fetchProfile(token);
        setUser(response.user || response);
      } catch (error) {
        console.error(error);
        setToken(null);
        localStorage.removeItem('gamingx_token');
      } finally {
        setLoading(false);
      }
    };

    initialize();
  }, [token]);

  const login = async (credentials) => {
    const response = await loginRequest(credentials);
    setUser(response.user);
    setToken(response.token);
    localStorage.setItem('gamingx_token', response.token);
    return response;
  };

  const signup = async (credentials) => {
    const response = await signupRequest(credentials);
    setUser(response.user);
    setToken(response.token);
    localStorage.setItem('gamingx_token', response.token);
    return response;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('gamingx_token');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
