import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-white border-t border-purple-200">
      <div className="container mx-auto px-6 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Logo và tên công ty */}
          <div>
            <h3 className="text-lg font-bold text-purple-700">Designed with ❤️ by FLAMEO Team 🐱</h3>
          </div>

          {/* Liên kết nhanh */}
          <div className="flex space-x-6">
            <Link to="/" className="text-gray-600 hover:text-red-600 transition-colors text-sm">
              Trang chủ
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-red-600 transition-colors text-sm">
              Giới thiệu
            </Link>
            <Link to="/guide" className="text-gray-600 hover:text-red-600 transition-colors text-sm">
              Hướng dẫn
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-red-600 transition-colors text-sm">
              Liên hệ
            </Link>
          </div>

          {/* Thông tin liên hệ */}
          <div className="text-gray-600 text-sm">
            Email: contact@flameo.com.vn | Hotline: 1900 xxxx
          </div>

          {/* Mạng xã hội */}
          <div className="flex space-x-6">
            <a href="https://facebook.com/flameoVN" target="_blank" rel="noopener noreferrer" 
               className="text-gray-600 hover:text-red-600 transition-colors text-sm">
              Facebook
            </a>
            <a href="https://linkedin.com/company/flameo" target="_blank" rel="noopener noreferrer"
               className="text-gray-600 hover:text-red-600 transition-colors text-sm">
              LinkedIn
            </a>
            <a href="https://twitter.com/flameoVN" target="_blank" rel="noopener noreferrer"
               className="text-gray-600 hover:text-red-600 transition-colors text-sm">
              Twitter
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
