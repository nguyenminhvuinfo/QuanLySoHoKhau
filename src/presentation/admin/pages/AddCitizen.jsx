import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { createClient } from "@supabase/supabase-js";
import { addCitizen } from '../../../businessLogic/AddCitizenLogic'; // Giả sử bạn có một hàm thêm công dân.

const supabaseUrl = "https://akanejbovkcionftceem.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFrYW5lamJvdmtjaW9uZnRjZWVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE5MTgyNTMsImV4cCI6MjA0NzQ5NDI1M30.Agqs-lyFaD2n3R16o4Mcd7ePhclTBsOc1R2IUmEcNoE";

const supabase = createClient(supabaseUrl, supabaseKey);

function AddCitizen() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    // Lấy householdid từ URL
    const householdid = searchParams.get('householdid');

    // State để lưu thông tin công dân
    const [citizenData, setCitizenData] = useState({
        householdid: '', // Sẽ được gán từ URL
        fullname: '',
        alias: '',
        dateofbirth: '',
        placeofbirth: '',
        ethnicity: '',
        occupation: '',
        workplace: '',
        idnumber: '',
        idissuedate: '',
        idissueplace: '',
        registrationdate: '',
        previousaddress: '',
        reason: "",
    });

    // Gán householdid vào citizenData khi component được mount
    useEffect(() => {
        if (householdid) {
            setCitizenData((prevData) => ({
                ...prevData,
                householdid,
            }));
        }
    }, [householdid]);

    // Hàm xử lý khi người dùng nhập dữ liệu vào form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCitizenData({
            ...citizenData,
            [name]: value,
        });
    };
    const addToStatistics = async (changeReason) => {
        try {
          const { data, error } = await supabase.from("statistics").insert([
            {
              changetype: "Tăng",
              changereason: changeReason,
            },
          ]);
          if (error) throw error;
          console.log("Đã cập nhật thống kê:", data);
        } catch (err) {
          console.error("Lỗi cập nhật thống kê:", err.message);
          throw new Error("Không thể cập nhật thống kê.");
        }
      };
    
    // Hàm gửi form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Gọi hàm thêm công dân và chuyển hướng về trang kết quả
            await addToStatistics(citizenData.reason);
            await addCitizen(citizenData);
            alert('Thêm công dân thành công!');
            navigate('/admin/search-citizen'); // Điều hướng về trang kết quả
        } catch (error) {
            console.error('Lỗi khi thêm công dân:', error);
            alert(`Lỗi: ${error.message || 'Có lỗi xảy ra, vui lòng thử lại!'}`);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl">
                <h2 className="text-3xl font-semibold text-center text-[#007BFF] mb-6">Thêm Công Dân</h2>
                <form onSubmit={handleSubmit}>
                    {/* Không cần nhập HouseholdID, giá trị này đã được lấy từ URL */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Họ và Tên:</label>
                        <input
                            type="text"
                            name="fullname"
                            value={citizenData.fullname}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Tên Gọi Khác:</label>
                        <input
                            type="text"
                            name="alias"
                            value={citizenData.alias}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Ngày Sinh:</label>
                        <input
                            type="date"
                            name="dateofbirth"
                            value={citizenData.dateofbirth}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Nguyên Quán:</label>
                        <input
                            type="text"
                            name="placeofbirth"
                            value={citizenData.placeofbirth}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Dân Tộc:</label>
                        <input
                            type="text"
                            name="ethnicity"
                            value={citizenData.ethnicity}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Nghề Nghiệp:</label>
                        <input
                            type="text"
                            name="occupation"
                            value={citizenData.occupation}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Nơi Làm Việc:</label>
                        <input
                            type="text"
                            name="workplace"
                            value={citizenData.workplace}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Số CMND:</label>
                        <input
                            type="text"
                            name="idnumber"
                            value={citizenData.idnumber}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Ngày Cấp CMND:</label>
                        <input
                            type="date"
                            name="idissuedate"
                            value={citizenData.idissuedate}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Nơi Cấp CMND:</label>
                        <input
                            type="text"
                            name="idissueplace"
                            value={citizenData.idissueplace}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Ngày Đăng Ký Thường Trú:</label>
                        <input
                            type="date"
                            name="registrationdate"
                            value={citizenData.registrationdate}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Địa Chỉ Trước Khi Chuyển Đến:</label>
                        <input
                            type="text"
                            name="previousaddress"
                            value={citizenData.previousaddress}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Lý Do Tăng:</label>
                        <select
                            name="reason"
                            value={citizenData.reason}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        >
                            <option value="">-- Chọn Lý Do --</option>
                            <option value="Chuyển đến">Chuyển đến</option>
                            <option value="Sinh con">Sinh con</option>
                        </select>
                    </div>

                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={() => navigate('/results')}
                            className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                        >
                            Trở về
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                        >
                            Thêm Công Dân
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddCitizen;
