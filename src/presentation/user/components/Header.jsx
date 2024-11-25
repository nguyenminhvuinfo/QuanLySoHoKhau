import { useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <header className="fixed w-full bg-red-600 text-yellow-100 font-bold p-4 flex justify-between items-center px-16 py-4 shadow-md z-10">
      {/* Logo và Menu bên trái */}
      <div className="flex items-center">
        <Link to="/" className="flex items-center">
          <img src="logo.png" alt="Logo" className="h-8 w-8 rounded-full inline-block" />
          <span className="px-2">CÔNG AN TP.HCM</span>
        </Link>
        <nav>
          <ul className="flex space-x-6 pl-8">
            <li><a href="/about" className="hover:underline">Giới Thiệu</a></li>
            <li><a href="/search" className="hover:underline">Tra Cứu Sổ Hộ Khẩu</a></li>
            <li><a href="/guide" className="hover:underline">Hướng Dẫn</a></li>
            <li><a href="/contact" className="hover:underline">Liên Hệ</a></li>
          </ul>
        </nav>
      </div>

      {/* Nút đăng nhập, đăng xuất và đăng ký bên phải */}
      <div className="flex items-center space-x-2">
        {isLoggedIn ? (
          <button 
            onClick={handleLogout} 
            className="bg-white text-orange-600 hover:bg-orange-100 px-4 py-2 rounded">
            Đăng Xuất
          </button>
        ) : (
          <>
            <button 
              onClick={handleLogin} 
              className="bg-white text-orange-600 hover:bg-orange-100 px-4 py-2 rounded">
              Đăng Nhập
            </button>
            <button 
              className="bg-red-600 text-yellow-100 hover:underline px-4 py-2 rounded">
              Đăng Ký
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
