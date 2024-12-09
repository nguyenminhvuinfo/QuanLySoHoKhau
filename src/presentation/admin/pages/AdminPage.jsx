// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Content() {
  return (
    <main className="flex-grow py-24 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-purple-700 mb-12 text-center">
          Hệ Thống Quản Lý Hộ Khẩu
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Option 1: Thêm hộ khẩu */}
          <Link
            to="/addHousehold"
            className="group bg-white border border-blue-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-6 flex flex-col items-center justify-center gap-4"
          >
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-500 transition-colors duration-200">
              <i className="fas fa-plus-circle text-blue-500 text-2xl group-hover:text-white"></i>
            </div>
            <span className="font-semibold text-gray-800 text-center group-hover:text-blue-500">
              Đăng Ký Hộ Khẩu
            </span>
          </Link>

          {/* Option 2: Chỉnh sửa thông tin hộ khẩu */}
          <Link
            to="/searchHouseHold"
            className="group bg-white border border-red-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-6 flex flex-col items-center justify-center gap-4"
          >
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center group-hover:bg-red-500 transition-colors duration-200">
              <i className="fas fa-pencil-alt text-red-500 text-2xl group-hover:text-white"></i>
            </div>
            <span className="font-semibold text-gray-800 text-center group-hover:text-red-500">
              Quản Lý Hộ Khẩu
            </span>
          </Link>

          {/* Option 3: Chỉnh sửa thông tin nhân khẩu */}
          <Link
            to="/searchCitizen"
            className="group bg-white border border-green-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-6 flex flex-col items-center justify-center gap-4"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-500 transition-colors duration-200">
              <i className="fas fa-user-edit text-green-500 text-2xl group-hover:text-white"></i>
            </div>
            <span className="font-semibold text-gray-800 text-center group-hover:text-green-500">
              Quản Lý Nhân Khẩu
            </span>
          </Link>

          {/* Option 4: Thống kê nhân khẩu */}
          <Link
            to="/statistics"
            className="group bg-white border border-yellow-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-6 flex flex-col items-center justify-center gap-4"
          >
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center group-hover:bg-yellow-500 transition-colors duration-200">
              <i className="fas fa-chart-line text-yellow-500 text-2xl group-hover:text-white"></i>
            </div>
            <span className="font-semibold text-gray-800 text-center group-hover:text-yellow-500">
              Thống Kê Dân Số
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}

function AdminPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <Content />
      <Footer />
    </div>
  );
}

export default AdminPage;
