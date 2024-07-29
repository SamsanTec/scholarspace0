// src/utils/getInitials.js
export const getInitials = (name) => {
    if (!name) {
      return ''; // Return an empty string or some default initials if name is undefined
    }
    const nameArray = name.trim().split(' ');
    if (nameArray.length === 1) {
      return nameArray[0].charAt(0).toUpperCase();
    }
    const initials = nameArray[0].charAt(0) + nameArray[nameArray.length - 1].charAt(0);
    return initials.toUpperCase();
  };
  