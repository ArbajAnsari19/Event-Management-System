import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext("");

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const loadToken = async () => {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        setUserToken(token);
        setIsLoggedIn(true);
      }
    };
    loadToken();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch('http://10.81.54.8:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const token = data.token;
      await AsyncStorage.setItem('userToken', token);
      setUserToken(token);
      setUserEmail(email);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Login error', error);
    }
  };

  const register = async (email, password) => {
    try {
      const response = await fetch('http://10.81.54.8:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const token = data.token;
      await AsyncStorage.setItem('userToken', token);
      setUserToken(token);
      setUserEmail(email);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Registration error', error);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('userToken');
    setUserToken(null);
    setIsLoggedIn(false);
    setUserEmail('');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userToken, userEmail, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
