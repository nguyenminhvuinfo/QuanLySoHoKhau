import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getHouseholdWithMembers } from '../../../businessLogic/SearcHouseHoldLogic';

function Results() {
    const location = useLocation();
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search);

    const householdNumber = params.get('soHoKhau');
    const ownerName = params.get('hoTen');
    const streetAddress = params.get('diaChi');
    const ward = params.get('phuong');
    const district = params.get('quan');

    const [exists, setExists] = useState(null);
    const [householdMembers, setHouseholdMembers] = useState([]);
    const [loading, setLoading] = useState(true);

    const printRef = useRef();

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            const result = await getHouseholdWithMembers({
                householdnumber: householdNumber,
                ownername: ownerName,
                streetaddress: streetAddress,
                ward: ward,
                district: district,
            });

            if (result.exists) {
                setExists(true);
                setHouseholdMembers(result.householdMembers);
            } else {
                setExists(false);
            }
            setLoading(false);
        };

        loadData();
    }, [householdNumber, ownerName, streetAddress, ward, district]);

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
                        .title { font-size: 20px; font-weight: bold; margin-bottom: 10px; color: #007BFF; }
                        .info { margin-bottom: 5px; font-weight: bold; }
                        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                        th, td { padding: 8px; text-align: left; border: 1px solid #ddd; }
                        th { background-color: #E1F5FE; font-weight: bold; color: #007BFF; }
                        td { font-weight: bold; }
                        tr:hover { background-color: #E1F5FE; }
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

    if (loading) return <div className="text-center text-xl text-gray-600">Loading...</div>;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-7xl">
                <div ref={printRef}>
                    <h2 className="text-3xl font-semibold text-center text-[#007BFF] mb-6">CÔNG AN THÀNH PHỐ HỒ CHÍ MINH</h2>
                    {exists ? (
                        <div>
                            <p className="text-lg text-gray-700 mb-4"><strong className="font-bold">Mã Sổ Hộ Khẩu:</strong> {householdNumber}</p>
                            <p className="text-lg text-gray-700 mb-4"><strong className="font-bold">Chủ Hộ:</strong> {ownerName}</p>
                            <p className="text-lg text-gray-700 mb-6"><strong className="font-bold">Nơi Thường Trú:</strong> {`${streetAddress}, ${ward}, ${district}`}</p>
                            <h3 className="text-xl font-semibold text-[#007BFF] mb-4">Danh Sách Thành Viên:</h3>
                            <table className="min-w-full table-auto bg-white shadow-md rounded-lg overflow-hidden">
                                <thead>
                                    <tr className="bg-[#E1F5FE] text-[#007BFF]">
                                        <th className="px-4 py-2 text-left">Mối Quan Hệ</th>
                                        <th className="px-4 py-2 text-left">Họ và Tên</th>
                                        <th className="px-4 py-2 text-left">Tên Gọi Khác</th>
                                        <th className="px-4 py-2 text-left">Ngày Sinh</th>
                                        <th className="px-4 py-2 text-left">Nguyên Quán</th>
                                        <th className="px-4 py-2 text-left">Dân Tộc</th>
                                        <th className="px-4 py-2 text-left">Nghề Nghiệp</th>
                                        <th className="px-4 py-2 text-left">Nơi Làm Việc</th>
                                        <th className="px-4 py-2 text-left">Số CMND</th>
                                        <th className="px-4 py-2 text-left">Ngày Cấp CMND</th>
                                        <th className="px-4 py-2 text-left">Nơi Cấp CMND</th>
                                        <th className="px-4 py-2 text-left">Ngày Đăng Ký Thường Trú</th>
                                        <th className="px-4 py-2 text-left">Địa Chỉ Trước Khi Chuyển Đến</th>
                                    
                                    </tr>
                                </thead>
                                <tbody>
                                    {householdMembers.map((member, index) => (
                                        <tr key={index} className="border-b hover:bg-[#E1F5FE]">
                                            <td className="px-4 py-2">{member.relationshipwithowner}</td>
                                            <td className="px-4 py-2">{member.fullname}</td>
                                            <td className="px-4 py-2">{member.alias || 'Không có'}</td>
                                            <td className="px-4 py-2">{member.dateofbirth}</td>
                                            <td className="px-4 py-2">{member.placeofbirth}</td>
                                            <td className="px-4 py-2">{member.ethnicity}</td>
                                            <td className="px-4 py-2">{member.occupation || 'Chưa có'}</td>
                                            <td className="px-4 py-2">{member.workplace || 'Chưa có'}</td>
                                            <td className="px-4 py-2">{member.idnumber || 'Chưa có'}</td>
                                            <td className="px-4 py-2">{member.idissuedate ? new Date(member.idissuedate).toLocaleDateString() : 'Chưa có'}</td>
                                            <td className="px-4 py-2">{member.idissueplace || 'Chưa có'}</td>
                                            <td className="px-4 py-2">{member.registrationdate ? new Date(member.registrationdate).toLocaleDateString() : 'Chưa có'}</td>
                                            <td className="px-4 py-2">{member.previousaddress || 'Chưa có'}</td>
                                            
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        </div>
                    ) : (
                        <p className="text-red-500 text-xl text-center">Không tìm thấy dữ liệu phù hợp.</p>
                    )}
                </div>
                <div className="flex justify-between mt-6">
                    <button
                        onClick={() => navigate('/search')}
                        className="bg-gray-400 text-white py-2 px-6 rounded-lg hover:bg-gray-500 transition duration-300 ease-in-out"
                    >
                        Tiếp tục tìm kiếm
                    </button>
                    {exists && (
                        <button
                            onClick={handlePrint}
                            className="bg-[#007BFF] text-white py-2 px-6 rounded-lg hover:bg-[#0288D1] transition duration-300 ease-in-out"
                        >
                            In Thông Tin
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Results;
