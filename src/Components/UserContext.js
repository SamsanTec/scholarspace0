import React, { createContext, useState, useEffect } from 'react';

// Create a UserContext for managing user state
export const UserContext = createContext();

// UserProvider component to provide user data to the rest of the app
export const UserProvider = ({ children }) => {
  // Initialize user state from localStorage or set default values
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user');
      return savedUser
        ? JSON.parse(savedUser)
        : {
            userId: null,
            userType: null,
            name: '',
            profilePicture: null, // Default to null if no picture is set
          };
    } catch (error) {
      console.error("Failed to parse user data from localStorage:", error);
      return {
        userId: null,
        userType: null,
        name: '',
        profilePicture: null,
      };
    }
  });

  // Persist user data to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.error("Failed to save user data to localStorage:", error);
    }
  }, [user]);

  // Function to update the user state with new data
  const updateUser = (newUserData) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...newUserData,
    }));
  };

  // Provide the user state and updater function to the rest of the app
  return (
    <UserContext.Provider value={{ user, setUser: updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
