import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getHouseholdWithMembers } from '../../../businessLogic/SearcHouseHoldLogic';
import { deleteHouseholdWithMembers } from '../../../businessLogic/DeleteHouseHoldLogic';
import { updateHouseholdWithMembers } from '../../../businessLogic/UpdateHouseHoldLogic';

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

    const [showUpdateModal, setShowUpdateModal] = useState(false); // Modal toggle
    const [soHoKhau, setSoHoKhau] = useState(householdNumber || '');
    const [hoTen, setHoTen] = useState(ownerName || '');
    const [diaChi, setDiaChi] = useState(streetAddress || '');
    const [phuong, setPhuong] = useState(ward || '');
    const [quan, setQuan] = useState(district || '');

    const [quanData, setQuanData] = useState({});
    const [availableWards, setAvailableWards] = useState([]);

    const printRef = useRef();

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const result = await getHouseholdWithMembers({
                    householdnumber: householdNumber,
                    ownername: ownerName,
                    streetaddress: streetAddress,
                    ward: ward,
                    district: district,
                });

                setExists(result.exists);
                setHouseholdMembers(result.householdMembers);
            } catch (error) {
                console.error('Lỗi tải dữ liệu:', error);
                setExists(false);
            }
            setLoading(false);
        };

        loadData();
    }, [householdNumber, ownerName, streetAddress, ward, district]);

    useEffect(() => {
        fetch('/quanData.json')
            .then(response => response.json())
            .then(data => {
                setQuanData(data);
                if (quan) {
                    setAvailableWards(data[quan] || []);
                }
            })
            .catch(error => console.error('Error loading district data:', error));
    }, [quan]);

    const handleDistrictChange = (selectedDistrict) => {
        setQuan(selectedDistrict);
        setPhuong('');
        setAvailableWards(quanData[selectedDistrict] || []);
    };

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

    const handleDelete = async () => {
        if (window.confirm('Bạn có chắc chắn muốn xóa sổ hộ khẩu này không?')) {
            try {
                setLoading(true);
                const householdId = householdMembers[0]?.householdid; // Lấy householdid từ danh sách thành viên
                if (!householdId) {
                    alert('Không tìm thấy ID hộ khẩu.');
                    return;
                }

                await deleteHouseholdWithMembers(householdId); // Gọi delete theo householdid
                alert('Xóa thành công!');
                navigate('/admin/search-household');
            } catch (error) {
                console.error('Lỗi xóa sổ hộ khẩu:', error);
                alert('Xóa thất bại. Vui lòng thử lại.');
            } finally {
                setLoading(false);
            }
        }
    };

    const handleUpdate = () => {
        setShowUpdateModal(true);
    };

    const handleUpdateConfirm = async () => {
        try {
            setLoading(true);
    
            const updatedData = {
                householdnumber: soHoKhau,
                ownername: hoTen,
                streetaddress: diaChi,
                ward: phuong,
                district: quan,
            };
    
            const householdId = householdMembers[0]?.householdid;
            if (!householdId) {
                alert('Không tìm thấy ID hộ khẩu.');
                return;
            }
    
            const result = await updateHouseholdWithMembers(householdId, updatedData);
    
            if (result.success) {
                alert('Cập nhật thành công!');
                setShowUpdateModal(false); // Đóng modal
                navigate('/admin/search-household');
            } else {
                alert(`Cập nhật thất bại: ${result.message}`);
            }
        } catch (error) {
            console.error('Lỗi cập nhật thông tin:', error);
            alert('Có lỗi xảy ra khi cập nhật. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };
    
    
    const handleUpdateCancel = () => {
        setShowUpdateModal(false);
    };

    if (loading) return <div className="text-center text-xl text-gray-600">Đang tải...</div>;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-4xl">
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
                        onClick={() => navigate('/admin/search-household')}
                        className="bg-gray-400 text-white py-2 px-6 rounded-lg hover:bg-gray-500 transition duration-300 ease-in-out"
                    >
                        Tiếp tục tìm kiếm
                    </button>
                    {exists && (
                        <>
                            <button
                                onClick={handleUpdate}
                                className="bg-yellow-500 text-white py-2 px-6 rounded-lg hover:bg-yellow-600 transition duration-300 ease-in-out"
                            >
                                Cập Nhật
                            </button>
                            <button
                                onClick={handleDelete}
                                className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition duration-300 ease-in-out"
                            >
                                Xóa Sổ Hộ Khẩu
                            </button>
                            <button
                                onClick={handlePrint}
                                className="bg-[#007BFF] text-white py-2 px-6 rounded-lg hover:bg-[#0288D1] transition duration-300 ease-in-out"
                            >
                                In Thông Tin
                            </button>
                        </>
                    )}
                </div>
                {showUpdateModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                            <h3 className="text-2xl font-bold text-center mb-4">Cập Nhật Thông Tin</h3>
                            <label className="block text-sm mb-2">
                                Số Hộ Khẩu:
                                <input
                                    type="text"
                                    value={soHoKhau}
                                    onChange={(e) => setSoHoKhau(e.target.value)}
                                    className="w-full border rounded p-2 mt-1"
                                />
                            </label>
                            <label className="block text-sm mb-2">
                                Họ Tên Chủ Hộ:
                                <input
                                    type="text"
                                    value={hoTen}
                                    onChange={(e) => setHoTen(e.target.value)}
                                    className="w-full border rounded p-2 mt-1"
                                />
                            </label>
                            <label className="block text-sm mb-2">
                                Địa Chỉ:
                                <input
                                    type="text"
                                    value={diaChi}
                                    onChange={(e) => setDiaChi(e.target.value)}
                                    className="w-full border rounded p-2 mt-1"
                                />
                            </label>
                            <label className="block text-sm mb-2">
                                Quận:
                                <select
                                    value={quan}
                                    onChange={(e) => handleDistrictChange(e.target.value)}
                                    className="w-full border rounded p-2 mt-1"
                                >
                                    <option value="">Chọn quận</option>
                                    {Object.keys(quanData).map(district => (
                                        <option key={district} value={district}>{district}</option>
                                    ))}
                                </select>
                            </label>
                            <label className="block text-sm mb-2">
                                Phường:
                                <select
                                    value={phuong}
                                    onChange={(e) => setPhuong(e.target.value)}
                                    className="w-full border rounded p-2 mt-1"
                                >
                                    <option value="">Chọn phường</option>
                                    {availableWards.map(ward => (
                                        <option key={ward} value={ward}>{ward}</option>
                                    ))}
                                </select>
                            </label>
                            <div className="flex justify-between mt-4">
                                <button
                                    onClick={handleUpdateCancel}
                                    className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
                                >
                                    Hủy
                                </button>
                                <button
                                    onClick={handleUpdateConfirm}
                                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                                >
                                    Xác Nhận
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Results;
