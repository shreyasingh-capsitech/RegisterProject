import React, { createContext, useContext, useState } from "react";

// Create the context
const AuthContext = createContext<any>({});

// AuthProvider component to wrap the app and provide context to the components
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null); // Stores user details
  const [token, setToken] = useState(localStorage.getItem("token") || null); // Stores JWT token
  const [name, setName] = useState(localStorage.getItem("name") || null); // Stores JWT token

  // Login function
  const login = (userData: any, token: string) => {
    setUser(userData);
    setToken(token);
    setName(name);
    localStorage.setItem("token", token); // Store token in localStorage
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setToken(null);
    setName(null);
    localStorage.removeItem("token"); // Remove token from localStorage
  };

  return (
    <AuthContext.Provider value={{ user, name, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access the auth context
export const useAuth = () => useContext(AuthContext);



