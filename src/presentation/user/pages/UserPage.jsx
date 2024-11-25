// src/pages/Home.js
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Content() {
    return (
      <main
        className="flex flex-col justify-center items-center h-screen bg-cover bg-center text-justify text-black"
        style={{ backgroundImage: "url('/bg.png')",
        backgroundSize: "60%", // Giảm kích thước, ảnh giữ tỉ lệ
        backgroundRepeat: "no-repeat",
        
         }}

      >
        <div className="p-8 text-gray-800 bg-slate-50 bg-opacity-50 rounded-lg max-w-screen-lg font-bold">
          <h1 className="text-4xl font-bold mb-6 text-center">CHÀO MỪNG BẠN ĐẾN VỚI </h1>
          <h1 className="text-4xl font-bold mb-6 text-center">HỆ THỐNG TRA CỨU SỔ HỘ KHẨU ĐIỆN TỬ</h1>
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
