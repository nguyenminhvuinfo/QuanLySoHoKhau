import React from 'react';
import Header from '../components/Header';
import Footer from '../../admin/components/Footer';

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white mt-10 rounded-xl shadow-lg p-8 max-w-4xl mx-auto border border-purple-200">
          <h1 className="text-4xl font-bold text-center mb-8 text-red-600">
            Liên Hệ Flameo
          </h1>
          
          <div className="space-y-8 text-gray-800">
            <section>
              <h2 className="text-2xl font-bold mb-4 text-purple-700 border-b border-purple-200 pb-2">
                Thông Tin Liên Hệ
              </h2>
              <div className="space-y-4 pl-4">
                <p className="flex items-center font-semibold">
                  <span className="text-red-600 mr-3 font-bold">•</span>
                  Địa chỉ: Tòa nhà Flameo, 123 Đường Nguyễn Huệ, Quận 1, TP.HCM
                </p>
                <p className="flex items-center font-semibold">
                  <span className="text-red-600 mr-3 font-bold">•</span>
                  Điện thoại: (028) 3822 XXXX
                </p>
                <p className="flex items-center font-semibold">
                  <span className="text-red-600 mr-3 font-bold">•</span>
                  Email: contact@flameo.com.vn
                </p>
                <p className="flex items-center font-semibold">
                  <span className="text-red-600 mr-3 font-bold">•</span>
                  Hotline: 1900 xxxx (24/7)
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-purple-700 border-b border-purple-200 pb-2">
                Giờ Làm Việc
              </h2>
              <div className="space-y-4 pl-4">
                <p className="flex items-center font-semibold">
                  <span className="text-red-600 mr-3 font-bold">•</span>
                  Thứ Hai - Thứ Sáu: 8:00 - 17:30
                </p>
                <p className="flex items-center font-semibold">
                  <span className="text-red-600 mr-3 font-bold">•</span>
                  Thứ Bảy: 8:00 - 12:00
                </p>
                <p className="flex items-center font-semibold">
                  <span className="text-red-600 mr-3 font-bold">•</span>
                  Chủ Nhật: Nghỉ
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-purple-700 border-b border-purple-200 pb-2">
                Phòng Ban Hỗ Trợ
              </h2>
              <div className="space-y-4 pl-4">
                <p className="flex items-center font-semibold">
                  <span className="text-red-600 mr-3 font-bold">•</span>
                  Hỗ trợ kỹ thuật: support@flameo.com.vn
                </p>
                <p className="flex items-center font-semibold">
                  <span className="text-red-600 mr-3 font-bold">•</span>
                  Chăm sóc khách hàng: customer.care@flameo.com.vn
                </p>
                <p className="flex items-center font-semibold">
                  <span className="text-red-600 mr-3 font-bold">•</span>
                  Góp ý, khiếu nại: feedback@flameo.com.vn
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-purple-700 border-b border-purple-200 pb-2">
                Mạng Xã Hội
              </h2>
              <div className="space-y-4 pl-4">
                <p className="flex items-center font-semibold">
                  <span className="text-red-600 mr-3 font-bold">•</span>
                  Facebook: facebook.com/flameoVN
                </p>
                <p className="flex items-center font-semibold">
                  <span className="text-red-600 mr-3 font-bold">•</span>
                  LinkedIn: linkedin.com/company/flameo
                </p>
                <p className="flex items-center font-semibold">
                  <span className="text-red-600 mr-3 font-bold">•</span>
                  Twitter: twitter.com/flameoVN
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

export default Contact;
