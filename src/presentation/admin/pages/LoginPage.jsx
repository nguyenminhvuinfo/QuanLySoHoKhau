// src/pages/LoginPage.js
import React, { useState } from "react";
import { useAuth } from "../../businessLogic/auth/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [role, setRole] = useState(""); // Lưu vai trò đăng nhập
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login(role); // Đăng nhập với vai trò
    if (role === "Admin") {
      navigate("/admin"); // Nếu là Admin, chuyển hướng đến trang Admin
    } else {
      navigate("/user"); // Nếu là User, chuyển hướng đến trang User
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="">Select Role</option>
        <option value="Admin">Admin</option>
        <option value="User">User</option>
      </select>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
