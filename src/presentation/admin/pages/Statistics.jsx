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
    <div className="min-h-screen bg-gray-100 p-5 pt-24">
      <h1 className="text-2xl font-bold text-center mb-6">Dữ Liệu Thống Kê</h1>
      {loading ? (
        <div className="text-center text-xl text-blue-500">Đang tải...</div>
      ) : (
        <div className="overflow-x-auto max-w-4xl mx-auto">
          <table className="min-w-full table-auto bg-white shadow-md rounded-lg border-collapse">
            <thead>
              <tr className="bg-blue-600 text-white text-sm">
                <th className="px-3 py-2 text-left">Loại Thay Đổi</th>
                <th className="px-3 py-2 text-left">Lý Do Thay Đổi</th>
                <th className="px-3 py-2 text-center">Số Lượng</th> {/* Cột số lượng */}
              </tr>
            </thead>
            <tbody>
              {[
                { changetype: "Tăng", changereason: "Sinh con" },
                { changetype: "Tăng", changereason: "Chuyển đến" },
                { changetype: "Giảm", changereason: "Qua đời" },
                { changetype: "Giảm", changereason: "Chuyển đi" },
              ].map((condition) => (
                <tr key={`${condition.changetype}_${condition.changereason}`} className="border-b hover:bg-blue-50 transition-colors">
                  <td className="px-3 py-2 text-sm">{condition.changetype}</td>
                  <td className="px-3 py-2 text-sm">{condition.changereason}</td>
                  <td className="px-3 py-2 text-sm text-center">
                    {countData[`${condition.changetype}_${condition.changereason}`] || 0} {/* Hiển thị số lượng dựa trên điều kiện */}
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
    <div className="bg-white min-h-screen">
      <Header />
      <App />
      <Footer />
    </div>
  );
}

export default Statistics;
