import React, { createContext, useEffect, useState } from 'react';

// Create the context
export const UserContext = createContext();

// Create the provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  // Load user and selectedUser from localStorage safely
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedSelectedUser = localStorage.getItem('selectedUser');

    try {
      if (storedUser && storedUser !== 'undefined') {
        setUser(JSON.parse(storedUser));
      }
    } catch (err) {
      console.warn('Invalid user JSON:', err);
      localStorage.removeItem('user');
    }

    try {
      if (storedSelectedUser && storedSelectedUser !== 'undefined') {
        setSelectedUser(JSON.parse(storedSelectedUser));
      }
    } catch (err) {
      console.warn('Invalid selectedUser JSON:', err);
      localStorage.removeItem('selectedUser');
    }
  }, []);

  // Persist user to localStorage
  useEffect(() => {
    if (user !== undefined && user !== null) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // Persist selectedUser to localStorage
  useEffect(() => {
    if (selectedUser !== undefined && selectedUser !== null) {
      localStorage.setItem('selectedUser', JSON.stringify(selectedUser));
    } else {
      localStorage.removeItem('selectedUser');
    }
  }, [selectedUser]);

  // Persist dark mode state
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  // Toggle function for dark mode
  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        selectedUser,
        setSelectedUser,
        darkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
