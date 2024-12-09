import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Guide = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      
      <main className="flex-grow py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl mt-10 font-bold text-center text-red-600 mb-10">
            Hướng Dẫn Sử Dụng
          </h1>

          <div className="bg-white rounded-xl shadow-lg p-8 border border-purple-200">
            <h2 className="text-2xl font-bold text-purple-700 mb-8 border-b border-purple-200 pb-4">
              Các bước tra cứu sổ hộ khẩu:
            </h2>

            <div className="space-y-4 ml-4">
              <div className="flex items-start group hover:bg-red-50 p-3 rounded-lg transition-colors duration-200">
                <h3 className="text-xl font-bold text-red-600 w-8">1.</h3>
                <span className="ml-4 text-gray-800 group-hover:text-purple-700 font-semibold">
                  Nháy chuột vào mục "Tra cứu sổ hộ khẩu" trên thanh menu
                </span>
              </div>

              <div className="flex items-start group hover:bg-red-50 p-3 rounded-lg transition-colors duration-200">
                <h3 className="text-xl font-bold text-red-600 w-8">2.</h3>
                <span className="ml-4 text-gray-800 group-hover:text-purple-700 font-semibold">
                  Nhập các thông tin của sổ hộ khẩu cần tra cứu vào form
                </span>
              </div>

              <div className="flex items-start group hover:bg-red-50 p-3 rounded-lg transition-colors duration-200">
                <h3 className="text-xl font-bold text-red-600 w-8">3.</h3>
                <span className="ml-4 text-gray-800 group-hover:text-purple-700 font-semibold">
                  Nhấp chuột vào nút "Tra cứu" để xem kết quả
                </span>
              </div>

              <div className="flex items-start group hover:bg-red-50 p-3 rounded-lg transition-colors duration-200">
                <h3 className="text-xl font-bold text-red-600 w-8">4.</h3>
                <span className="ml-4 text-gray-800 group-hover:text-purple-700 font-semibold">
                  Sau khi có kết quả, bạn có thể:
                </span>
              </div>

              <div className="ml-12 space-y-3 bg-purple-50 p-5 rounded-lg">
                <p className="flex items-center text-gray-800 hover:text-red-600 transition-colors duration-200 font-semibold">
                  <span className="text-purple-700 mr-3 font-bold">•</span>
                  In thông tin bằng cách nhấn vào nút "In"
                </p>
                <p className="flex items-center text-gray-800 hover:text-red-600 transition-colors duration-200 font-semibold">
                  <span className="text-purple-700 mr-3 font-bold">•</span>
                  Tiếp tục tìm kiếm thông tin khác
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Guide;
