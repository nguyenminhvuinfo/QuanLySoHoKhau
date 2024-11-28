// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom'; 
import Header from '../components/Header';
import Footer from '../components/Footer';

function Content() {
    return (
        <main className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r text-white">
            <div className="bg-white p-12 rounded-xl shadow-2xl max-w-screen-xl w-full mx-4">
                <h1 className="text-5xl font-extrabold text-center text-purple-800 mb-6">
                    CHÀO MỪNG BẠN ĐẾN VỚI
                </h1>
                <h2 className="text-4xl font-semibold text-center text-red-600 mb-8">
                    HỆ THỐNG TRA CỨU SỔ HỘ KHẨU ĐIỆN TỬ
                </h2>
                <p className="text-lg text-center text-gray-700 mb-6">
                    Hệ thống giúp bạn dễ dàng tra cứu các thông tin về sổ hộ khẩu một cách nhanh chóng và chính xác.
                </p>
                <div className="flex justify-center space-x-6 ">
                  <Link
                        to="/search" // Use the Link component for navigation
                        className="bg-purple-600 text-white py-3 px-8 rounded-lg shadow-lg hover:bg-purple-700 transition duration-300 ease-in-out"
                    >
                        Tìm Kiếm Sổ Hộ Khẩu
                    </Link>
                    <button
                        className="bg-red-600 text-white py-3 px-8 rounded-lg shadow-lg hover:bg-red-700 transition duration-300 ease-in-out"
                    >
                        Hướng Dẫn Sử Dụng
                    </button>
                </div>
            </div>
        </main>
    );
}

// Home Component that combines Header, Content, and Footer
function UserPage() {
    return (
        <div className="bg-white">
            <Header />
            <Content />
            <Footer />
        </div>
    );
}

export default UserPage;
