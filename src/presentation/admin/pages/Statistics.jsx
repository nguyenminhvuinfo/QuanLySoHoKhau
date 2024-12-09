import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import Header from '../components/Header';
import Footer from '../components/Footer';

const supabaseUrl = "https://akanejbovkcionftceem.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFrYW5lamJvdmtjaW9uZnRjZWVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE5MTgyNTMsImV4cCI6MjA0NzQ5NDI1M30.Agqs-lyFaD2n3R16o4Mcd7ePhclTBsOc1R2IUmEcNoE";

const supabase = createClient(supabaseUrl, supabaseKey);

function App() {
  const [countData, setCountData] = useState({}); // Object để lưu số lượng đếm cho từng điều kiện
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hàm để đếm số lượng cho các điều kiện khác nhau
    const fetchCount = async () => {
      try {
        // Đếm các điều kiện khác nhau
        const conditions = [
          { changetype: "Tăng", changereason: "Sinh con" },
          { changetype: "Giảm", changereason: "Qua đời" },
          { changetype: "Giảm", changereason: "Chuyển đi" },
          { changetype: "Tăng", changereason: "Chuyển đến" },
        ];

        const counts = {};
        for (let condition of conditions) {
          const { changetype, changereason } = condition;
          let { count, error } = await supabase
            .from("statistics")
            .select("*", { count: "exact" })
            .eq("changetype", changetype)
            .eq("changereason", changereason);

          if (error) throw error;
          counts[`${changetype}_${changereason}`] = count; // Lưu kết quả đếm cho mỗi điều kiện
        }
        setCountData(counts);
      } catch (error) {
        console.error("Error fetching count:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCount();
  }, []); // Chạy một lần khi component mount

  return (
    <div className="min-h-screen bg-white p-5 pt-24">
      <h1 className="text-3xl font-bold text-center mb-8 text-red-700 drop-shadow-lg">
        Dữ Liệu Thống Kê
      </h1>
      {loading ? (
        <div className="text-center text-xl text-red-600">Đang tải...</div>
      ) : (
        <div className="overflow-x-auto max-w-4xl mx-auto">
          <table className="min-w-full table-auto bg-white shadow-xl rounded-lg border border-purple-200">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left font-semibold bg-purple-600 text-white rounded-tl-lg">
                  Loại Thay Đổi
                </th>
                <th className="px-4 py-3 text-left font-semibold bg-purple-600 text-white">
                  Lý Do Thay Đổi
                </th>
                <th className="px-4 py-3 text-center font-semibold bg-purple-600 text-white rounded-tr-lg">
                  Số Lượng
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                { changetype: "Tăng", changereason: "Sinh con" },
                { changetype: "Tăng", changereason: "Chuyển đến" },
                { changetype: "Giảm", changereason: "Qua đời" },
                { changetype: "Giảm", changereason: "Chuyển đi" },
              ].map((condition, index) => (
                <tr 
                  key={`${condition.changetype}_${condition.changereason}`} 
                  className={`border-b border-purple-100 ${
                    index % 2 === 0 ? 'bg-red-50' : 'bg-purple-50'
                  } hover:bg-white transition-colors`}
                >
                  <td className="px-4 py-3 text-sm font-medium text-red-700">
                    {condition.changetype}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-purple-700">
                    {condition.changereason}
                  </td>
                  <td className="px-4 py-3 text-sm text-center font-semibold text-red-600">
                    {countData[`${condition.changetype}_${condition.changereason}`] || 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function Statistics() {
  return (
    <div className="bg-gradient-to-r from-red-100 via-white to-purple-100 min-h-screen">
      <Header />
      <App />
      <Footer />
    </div>
  );
}

export default Statistics;
