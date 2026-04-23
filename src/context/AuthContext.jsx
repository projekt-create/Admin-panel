import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const [adminUser, setAdminUser] = useState(() => {
    const saved = localStorage.getItem('adminUser');
    return saved ? JSON.parse(saved) : null;
  });

  const loginUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const loginAdmin = (adminData) => {
    setAdminUser(adminData);
    localStorage.setItem('adminUser', JSON.stringify(adminData));
  };

  const logout = () => {
    setUser(null);
    setAdminUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('adminUser');
    localStorage.removeItem('token');
  };

  const isAdmin = !!adminUser;
  const isUser = !!user;

  return (
    <AuthContext.Provider value={{ user, adminUser, loginUser, loginAdmin, logout, isAdmin, isUser }}>
      {children}
    </AuthContext.Provider>
  );
};
