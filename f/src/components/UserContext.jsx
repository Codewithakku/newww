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

  // Load user and selectedUser from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedSelectedUser = localStorage.getItem('selectedUser');

    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedSelectedUser) setSelectedUser(JSON.parse(storedSelectedUser));
  }, []);

  // Persist user in localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // Persist selectedUser in localStorage
  useEffect(() => {
    if (selectedUser) {
      localStorage.setItem('selectedUser', JSON.stringify(selectedUser));
    } else {
      localStorage.removeItem('selectedUser');
    }
  }, [selectedUser]);

  // Persist dark mode toggle
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
