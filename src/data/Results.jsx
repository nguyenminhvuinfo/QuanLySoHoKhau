import React, { useEffect, useState, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useLocation } from 'react-router-dom';

// URL và Key từ Supabase Dashboard
const supabaseUrl = 'https://akanejbovkcionftceem.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFrYW5lamJvdmtjaW9uZnRjZWVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE5MTgyNTMsImV4cCI6MjA0NzQ5NDI1M30.Agqs-lyFaD2n3R16o4Mcd7ePhclTBsOc1R2IUmEcNoE';

// Tạo Supabase Client
const supabase = createClient(supabaseUrl, supabaseKey);

function Results() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
  
    const householdNumber = params.get('soHoKhau');
    const ownerName = params.get('hoTen');
    const streetAddress = params.get('diaChi');
    const ward = params.get('phuong');
    const district = params.get('quan');
  
    const [exists, setExists] = useState(null);
    const [householdData, setHouseholdData] = useState(null); // Lưu thông tin kết quả tìm được
    const [householdMembers, setHouseholdMembers] = useState([]); // Lưu danh sách thành viên
    const [loading, setLoading] = useState(true);
  
    const printRef = useRef(); // Tham chiếu đến nội dung cần in
  
    // Kiểm tra dữ liệu tồn tại trong bảng
    useEffect(() => {
      const checkData = async () => {
        setLoading(true);
  
        // Truy vấn kiểm tra dữ liệu trong bảng household
        const { data, error } = await supabase
          .from('household')
          .select('*')
          .match({
            householdnumber: householdNumber,
            ownername: ownerName,
            streetaddress: streetAddress,
            ward: ward,
            district: district,
          });
  
        if (error) {
          console.error('Error checking data:', error);
          setExists(false);
        } else if (data.length > 0) {
          setExists(true);
          setHouseholdData(data[0]); // Lấy household đầu tiên (nếu tồn tại)
  
          // Truy vấn thêm bảng householdmember dựa trên householdid
          const householdid = data[0].householdid;
          const { data: members, error: membersError } = await supabase
            .from('householdmember')
            .select(
            )
            .eq('householdid', householdid)
            .order('memberid', { ascending: true });
          if (membersError) {
            console.error('Error fetching household members:', membersError);
          } else {
            setHouseholdMembers(members); // Lưu danh sách các thành viên
          }
        } else {
          setExists(false);
        }
        setLoading(false);
      };
  
      checkData();
    }, [householdNumber, ownerName, streetAddress, ward, district]);
  
    // Hàm in nội dung
    const handlePrint = () => {
      const printContent = printRef.current;
      const printWindow = window.open('', '_blank');
      printWindow.document.open();
      printWindow.document.write(`
        <html>
          <head>
            <title>In Thông Tin</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              .title { font-size: 20px; font-weight: bold; margin-bottom: 10px; }
              .info { margin-bottom: 5px; }
            </style>
          </head>
          <body>
            ${printContent.innerHTML}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    };
  
    if (loading) return <div>Loading...</div>;
  
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
          <div ref={printRef}>
            <h2 className="text-2xl font-bold text-center mb-6">CÔNG AN THÀNH PHỐ HỒ CHÍ MINH</h2>
            {exists ? (
              <div>
                <p className="info"><strong>Mã Sổ Hộ Khẩu:</strong> {householdNumber}</p>
                <p className="info"><strong>Chủ Hộ:</strong> {ownerName}</p>
                <p><strong>Nơi Thường Trú:</strong> {`${streetAddress}, ${ward}, ${district}`}</p>
                <h3 className="text-lg font-bold mt-4">Danh Sách Thành Viên:</h3>
                <ul>
                  {householdMembers.map((member, index) => (
                    <li key={index} className="mt-2 border-b pb-2">
                      <p><strong>Mối Quan Hệ:</strong> {member.relationshipwithowner}</p>
                      <p><strong>Họ và Tên:</strong> {member.fullname}</p>
                      <p><strong>Tên Gọi Khác:</strong> {member.alias || 'Không có'}</p>
                      <p><strong>Ngày Sinh:</strong> {member.dateofbirth}</p>
                      <p><strong>Nguyên Quán:</strong> {member.planceofbirth}</p>
                      <p><strong>Dân Tộc:</strong> {member.ethnicity}</p>
                      <p><strong>Nghề Nghiệp:</strong> {member.occupation}</p>
                      <p><strong>Nơi Làm Việc:</strong> {member.workplace}</p>
                      <p><strong>Số CCCD:</strong> {member.idnumber}</p>
                      <p><strong>Địa chỉ trước khi chuyển đến:</strong> {member.PreviousAddress}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-red-500 text-center">Không tìm thấy dữ liệu phù hợp.</p>
            )}
          </div>
          {exists && (
            <button
              onClick={handlePrint}
              className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
            >
              In Thông Tin
            </button>
          )}
        </div>
      </div>
    );
  }
  
  export default Results;
  