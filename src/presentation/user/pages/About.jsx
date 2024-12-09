import React from 'react';
import Header from '../components/Header';
import Footer from '../../admin/components/Footer';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white mt-10 rounded-xl shadow-lg p-8 max-w-4xl mx-auto border border-purple-200">
          <h1 className="text-4xl font-bold text-center mb-8 text-red-600">
            Giới thiệu về Hệ thống Quản lý Hộ khẩu
          </h1>
          
          <div className="space-y-6 text-gray-800">
            <section>
              <h2 className="text-2xl font-bold mb-4 text-purple-700 border-b border-purple-200 pb-2">Mục tiêu</h2>
              <p className="font-semibold">
                Hệ thống Quản lý Hộ khẩu được phát triển nhằm số hóa và hiện đại hóa công tác quản lý hộ khẩu,
                giúp việc đăng ký, quản lý và tra cứu thông tin hộ khẩu được thuận tiện, nhanh chóng và chính xác hơn.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-purple-700 border-b border-purple-200 pb-2">Tính năng chính</h2>
              <ul className="list-none space-y-3 pl-4">
                <li className="flex items-center font-semibold">
                  <span className="text-red-600 mr-3 font-bold">•</span>
                  Quản lý sổ hộ khẩu và thông tin thành viên trong hộ
                </li>
                <li className="flex items-center font-semibold">
                  <span className="text-red-600 mr-3 font-bold">•</span>
                  Đăng ký thường trú, tạm trú
                </li>
                <li className="flex items-center font-semibold">
                  <span className="text-red-600 mr-3 font-bold">•</span>
                  Tra cứu thông tin hộ khẩu
                </li>
                <li className="flex items-center font-semibold">
                  <span className="text-red-600 mr-3 font-bold">•</span>
                  Cập nhật thay đổi thông tin hộ khẩu
                </li>
                <li className="flex items-center font-semibold">
                  <span className="text-red-600 mr-3 font-bold">•</span>
                  Thống kê theo địa bàn và các tiêu chí khác
                </li>
                <li className="flex items-center font-semibold">
                  <span className="text-red-600 mr-3 font-bold">•</span>
                  Bảo mật thông tin hộ khẩu
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-purple-700 border-b border-purple-200 pb-2">Đối tượng sử dụng</h2>
              <ul className="list-none space-y-3 pl-4">
                <li className="flex items-center font-semibold">
                  <span className="text-red-600 mr-3 font-bold">•</span>
                  Cán bộ quản lý hộ khẩu tại các phường/xã
                </li>
                <li className="flex items-center font-semibold">
                  <span className="text-red-600 mr-3 font-bold">•</span>
                  Công dân có nhu cầu tra cứu thông tin hộ khẩu
                </li>
                <li className="flex items-center font-semibold">
                  <span className="text-red-600 mr-3 font-bold">•</span>
                  Cơ quan công an quản lý địa bàn
                </li>
                <li className="flex items-center font-semibold">
                  <span className="text-red-600 mr-3 font-bold">•</span>
                  Các cơ quan hành chính có liên quan
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-purple-700 border-b border-purple-200 pb-2">Liên hệ</h2>
              <div className="space-y-2 font-semibold pl-4">
                <p className="flex items-center">
                  <span className="text-red-600 mr-3 font-bold">•</span>
                  Email: support@quanlyhokhau.vn
                </p>
                <p className="flex items-center">
                  <span className="text-red-600 mr-3 font-bold">•</span>
                  Điện thoại: 1900 xxxx
                </p>
                <p className="flex items-center">
                  <span className="text-red-600 mr-3 font-bold">•</span>
                  Địa chỉ: 123 Đường ABC, Quận XYZ, Thành phố HCM
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
