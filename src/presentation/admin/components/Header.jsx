import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useState } from 'react';

function Header() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [showHouseholdDropdown, setShowHouseholdDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="fixed w-full z-10">
      {/* Thanh thông tin phía trên */}
      <div className="bg-purple-800 text-white px-16 py-1 flex justify-between items-center text-sm">
        <div className="flex items-center space-x-4">
          <span>
            <i className="fas fa-clock mr-2"></i>
            {new Date().toLocaleDateString('vi-VN')}
          </span>
          <span>
            <i className="fas fa-user mr-2"></i>
            Xin chào, {user?.username || 'Admin'}
          </span>
        </div>
      </div>

      {/* Thanh điều hướng chính */}
      <header className="bg-red-600 text-yellow-100 px-16 py-4 shadow-lg">
        <div className="flex justify-between items-center">
          {/* Logo và tên hệ thống */}
          <div className="flex items-center space-x-8">
            <Link to="/admin" className="flex items-center space-x-3">
              <img src="/logo.png" alt="Logo" className="h-10 w-10 rounded-full" />
              <span className="text-xl font-bold">FLAMEO ADMIN</span>
            </Link>

            {/* Menu chính */}
            <nav className="flex space-x-1">
              <Link to="/admin" className="px-4 py-2 rounded-lg hover:bg-red-700 transition">
                Dashboard
              </Link>
              
              {/* Menu Quản lý hộ khẩu */}
              <div className="relative">
                <button 
                  className="px-4 py-2 rounded-lg hover:bg-red-700 transition flex items-center"
                  onClick={() => setShowHouseholdDropdown(!showHouseholdDropdown)}
                >
                  Quản lý hộ khẩu
                  <i className="fas fa-chevron-down ml-2"></i>
                </button>
                {showHouseholdDropdown && (
                  <div className="absolute top-full left-0 mt-1 bg-white text-gray-800 rounded-lg shadow-xl py-2 w-48">
                    <Link to="/admin/search-household" className="block px-4 py-2 hover:bg-gray-100">
                      Quản lý hộ khẩu
                    </Link>
                    <Link to="/admin/add-household" className="block px-4 py-2 hover:bg-gray-100">
                      Đăng ký hộ khẩu
                    </Link>
                  </div>
                )}
              </div>

              <Link to="/admin/search-citizen" className="px-4 py-2 rounded-lg hover:bg-red-700 transition">
                Quản lý nhân khẩu
              </Link>

              <Link to="/admin/statistics" className="px-4 py-2 rounded-lg hover:bg-red-700 transition">
                Thống kê
              </Link>
            </nav>
          </div>

          {/* Nút đăng xuất */}
          <button
            onClick={handleLogout}
            className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-lg transition flex items-center space-x-2"
          >
            <i className="fas fa-sign-out-alt"></i>
            <span>Đăng xuất</span>
          </button>
        </div>
      </header>
    </div>
  );
}

export default Header;
