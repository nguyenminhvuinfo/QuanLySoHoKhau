import { useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const handleRegisterClick = () => {
    setIsPopupVisible(true);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };
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
          <span className="px-2">FLEOMA</span>
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
              <Link to="/Login">Đăng Nhập</Link>

            </button>
            <button 
              onClick={handleRegisterClick}
              className="bg-red-600 text-yellow-100 hover:underline px-4 py-2 rounded">
              Đăng Ký
            </button>
            {isPopupVisible && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
                  <h2 className="text-lg text-purple-600 font-bold mb-4">Thông Báo</h2>
                  <p className="text-gray-700 mb-4">
                    Chương trình hiện tại không hỗ trợ đăng ký trực tuyến, vui lòng liên hệ bộ phận công nghệ thông tin để được hỗ trợ!
                  </p>
                  <button
                    onClick={handleClosePopup}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Đóng
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
