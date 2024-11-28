import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authenticateUser } from '../../../businessLogic/LoginLogic';

function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      const user = await authenticateUser(username, password);
      console.log('Đăng nhập thành công!', user);
      window.location.href = '/adminPage';
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-red-500 to-purple-600">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <div className="flex justify-center mb-6">
          <Link to="/">
            <img src="/logo.png" alt="Logo" className="w-24 h-24" />
          </Link>
        </div>
        <h2 className="text-2xl font-bold text-center text-purple-600 mb-6">Đăng Nhập</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
              Tài khoản (Tên người dùng):
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Nhập tên người dùng"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Mật khẩu:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Nhập mật khẩu"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-lg transition ${
              loading
                ? 'bg-gray-400 text-gray-700'
                : 'bg-purple-600 text-yellow-100 hover:bg-purple-700'
            }`}
            disabled={loading}
          >
            {loading ? 'Đang xử lý...' : 'Đăng Nhập'}
          </button>
        </form>
        <div className="mt-4 text-center text-sm text-gray-500">
          Chưa có tài khoản?{' '}
          <Link to="/register" className="text-red-500 hover:underline">
            Đăng ký ngay
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
