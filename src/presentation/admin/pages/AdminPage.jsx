// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Content() {
  return (
    <main className="pb-10 pt-24 px-6 bg-gray-100">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-purple-600 mb-6">
          Quản lý Nhân Khẩu và Hộ Khẩu
        </h1>
        <div className="grid grid-cols-1 font-bold sm:grid-cols-4 gap-6">
          {/* Option 1: Thêm hộ khẩu */}
          <Link
            to="/addHousehold"
            className="bg-blue-500 text-white py-4 px-6 rounded-lg shadow-lg hover:bg-blue-600 transition"
          >
            Thêm Hộ Khẩu
          </Link>
          {/* Option 4: Chỉnh sửa thông tin hộ khẩu */}
          <Link
            to="/searchHouseHold"
            className="bg-purple-500 text-white py-4 px-6 rounded-lg shadow-lg hover:bg-purple-600 transition"
          >
            Chỉnh sửa, xoá thông tin Hộ Khẩu
          </Link>
          {/* Option 2: Chỉnh sửa thông tin nhân khẩu */}
          <Link
            to="/searchCitizen"
            className="bg-green-500 text-white py-4 px-6 rounded-lg shadow-lg hover:bg-green-600 transition"
          >
            Chỉnh sửa Thông Tin Nhân Khẩu
          </Link>

          {/* Option 3: Thống kê nhân khẩu */}
          <Link
            to="/statistics"
            className="bg-yellow-500 text-white py-4 px-6 rounded-lg shadow-lg hover:bg-yellow-600 transition"
          >
            Thống kê Nhân Khẩu theo Lý Do Tăng Giảm
          </Link>

          
        </div>
      </div>
    </main>
  );
}

// Home Component that combines Header, Content, and Footer
function UserPage() {
  return (
    <div className="bg-white min-h-screen">
      <Header />
      <Content />
      <Footer />
    </div>
  );
}

export default UserPage;
