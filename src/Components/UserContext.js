import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Load user from localStorage or set to default state
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : {
      userId: null,
      userType: null,
      fullName: '',
      initials: ''
    };
  });

  useEffect(() => {
    // Persist user state in localStorage whenever it changes
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
