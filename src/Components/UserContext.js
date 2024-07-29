// src/components/UserContext.js
import React, { createContext, useState } from 'react';
import { getInitials } from '../utils/getInitials';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    userId: null,
    userType: null,
    fullName: '',
    initials: '',
  });

  const setUserWithInitials = (userData) => {
    const initials = getInitials(userData.name);
    setUser({ ...userData, initials });
  };

  return (
    <UserContext.Provider value={{ user, setUser: setUserWithInitials }}>
      {children}
    </UserContext.Provider>
  );
};
