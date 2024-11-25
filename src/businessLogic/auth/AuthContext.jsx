import React, { createContext, useContext, useState } from "react";

// Tạo Context
const AuthContext = createContext();

// Cung cấp Context
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // user là null khi chưa đăng nhập

  const login = (role) => {
    setUser({ role }); // Cập nhật thông tin người dùng với vai trò
  };

  const logout = () => {
    setUser(null); // Đăng xuất người dùng
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook để sử dụng AuthContext
export const useAuth = () => useContext(AuthContext);
