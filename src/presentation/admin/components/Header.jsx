import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Giả sử người dùng đã đăng nhập
  const [isLogoutConfirmVisible, setIsLogoutConfirmVisible] = useState(false); // Trạng thái cho hộp thoại xác nhận đăng xuất
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    setIsLogoutConfirmVisible(true); // Hiển thị hộp thoại xác nhận đăng xuất
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // Đặt lại trạng thái đăng nhập thành false
    setIsLogoutConfirmVisible(false); // Ẩn hộp thoại xác nhận
    navigate('/'); // Điều hướng về trang chủ sau khi đăng xuất
  };

  const handleCancelLogout = () => {
    setIsLogoutConfirmVisible(false); // Ẩn hộp thoại xác nhận nếu người dùng hủy
  };

  return (
    <header className="fixed w-full bg-red-600 text-yellow-100 font-bold p-4 flex justify-between items-center px-16 py-4 shadow-md z-10">
      {/* Logo và Menu bên trái */}
      <div className="flex items-center">
        <Link to="/adminPage" className="flex items-center">
          <img src="logo.png" alt="Logo" className="h-8 w-8 rounded-full inline-block" />
          <span className="px-2">FLEOMA</span>
        </Link>
        <nav>
          <ul className="flex space-x-6 pl-8">
            <li><a href="/adminPage" className="hover:underline">Trang chủ</a></li>
            <li><a href="/about" className="hover:underline">Giới Thiệu</a></li>
            <li><a href="/guide" className="hover:underline">Hướng Dẫn</a></li>
            <li><a href="/contact" className="hover:underline">Liên Hệ</a></li>
          </ul>
        </nav>
      </div>

      {/* Nút đăng xuất bên phải */}
      <div className="flex items-center space-x-2">
        {isLoggedIn ? (
          <>
            <button
              onClick={handleLogoutClick}
              className="bg-white text-orange-600 hover:bg-orange-100 px-4 py-2 rounded">
              Đăng Xuất
            </button>
            {/* Hộp thoại xác nhận đăng xuất */}
            {isLogoutConfirmVisible && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
                  <h2 className="text-lg text-purple-600 font-bold mb-4">Xác nhận đăng xuất</h2>
                  <p className="text-gray-700 mb-4">Bạn có chắc chắn muốn đăng xuất?</p>
                  <button
                    onClick={handleLogout}
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                    Đăng xuất
                  </button>
                  <button
                    onClick={handleCancelLogout}
                    className="mt-4 px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 ml-2">
                    Hủy
                  </button>
                </div>
              </div>
            )}
          </>
        ) : null}
      </div>
    </header>
  );
}

export default Header;
