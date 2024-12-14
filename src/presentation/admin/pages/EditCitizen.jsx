import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getHouseholdWithMembers } from '../../../businessLogic/SearcHouseHoldLogic';
import { deleteCitizen } from '../../../businessLogic/DeleteCitizenLogic';
import { supabase } from '../../../data/DeleteCitizenData';

function Results() {
    const location = useLocation();
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search);

    const householdNumber = params.get('soHoKhau');
    const ownerName = params.get('hoTen');
    const streetAddress = params.get('diaChi');
    const ward = params.get('phuong');
    const district = params.get('quan');
    const householdid = params.get('householdid');

    const [exists, setExists] = useState(null);
    const [householdMembers, setHouseholdMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMember, setSelectedMember] = useState(null); // Công dân được chọn
    const [deleteReason, setDeleteReason] = useState(""); // Lý do xóa
    const [showModal, setShowModal] = useState(false); // Trạng thái modal

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

    const handleAddCitizen = () => {
    if (!householdid) {
        alert('Mã hộ khẩu không tồn tại!');
        return;
    }
    navigate(`/admin/add-citizen?householdid=${householdid}`);
};


    const handleDeleteCitizen = async () => {
        if (!selectedMember) {
            alert('Vui lòng chọn một công dân.');
            return;
        }

        setShowModal(true); // Hiển thị modal để chọn lý do xóa
    };

    const handleConfirmDelete = async () => {
        if (!deleteReason) {
            alert('Vui lòng chọn lý do xóa.');
            return;
        }
    
        if (window.confirm('Bạn có chắc chắn muốn xóa công dân này không?')) {
            try {
                setLoading(true);
    
                // Gọi API xóa công dân (giả sử hàm deleteCitizen đã thực hiện)
                await deleteCitizen(selectedMember, deleteReason);
    
                // Thêm dữ liệu vào bảng statistics trong Supabase
                const { error } = await supabase
                    .from('statistics')
                    .insert([
                        {
                            changetype: 'Giảm',
                            changereason: deleteReason,
                          
                        },
                    ]);
    
                if (error) {
                    throw error;
                }
    
                alert('Xóa thành công và đã ghi nhận thay đổi!');
    
                // Cập nhật lại danh sách thành viên
                const updatedMembers = householdMembers.filter(member => member.memberid !== selectedMember);
                setHouseholdMembers(updatedMembers);
                setSelectedMember(null);
                setShowModal(false); // Đóng modal sau khi xóa thành công
            } catch (error) {
                console.error('Lỗi xóa công dân:', error);
                alert(`Xóa thất bại: ${error.message || 'Vui lòng thử lại.'}`);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleUpdateCitizen = () => {
        if (!selectedMember) {
            alert('Vui lòng chọn một công dân.');
            return;
        }
        navigate(`/admin/edit-citizen-page?householdid=${householdid}&memberid=${selectedMember}`);
    };

    if (loading) return <div className="text-center text-xl text-gray-600">Đang tải...</div>;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-8xl">
                <div ref={printRef}>
                    <h2 className="text-3xl font-semibold text-center text-[#007BFF] mb-6">CÔNG AN THÀNH PHỐ HỒ CHÍ MINH</h2>
                    {exists ? (
                        <div>
                            <p className="text-lg text-gray-700 mb-4"><strong>Mã Sổ Hộ Khẩu:</strong> {householdNumber}</p>
                            <p className="text-lg text-gray-700 mb-4"><strong>Chủ Hộ:</strong> {ownerName}</p>
                            <p className="text-lg text-gray-700 mb-6"><strong>Nơi Thường Trú:</strong> {`${streetAddress}, ${ward}, ${district}`}</p>
                            <h3 className="text-xl font-semibold text-[#007BFF] mb-4">Danh Sách Thành Viên:</h3>

                            <table className="min-w-full table-auto bg-white shadow-md rounded-lg overflow-hidden">
                                <thead>
                                    <tr className="bg-[#E1F5FE] text-[#007BFF]">
                                        <th className="px-4 py-2 text-left">Chọn</th>
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
                                        <th className="px-4 py-2 text-left">Mã Thành Viên</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {householdMembers.map((member, index) => (
                                        <tr key={index} className="border-b hover:bg-[#E1F5FE]">
                                            <td className="px-4 py-2 text-center">
                                                <input
                                                    type="radio"
                                                    name="selectedMember"
                                                    value={member.memberid || ''}
                                                    onChange={() => setSelectedMember(member.memberid)}
                                                    className="form-radio"
                                                />
                                            </td>
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
                                            <td className="px-4 py-2">{member.memberid || 'Chưa có'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-red-500 text-xl text-center">Không tìm thấy dữ liệu phù hợp.</p>
                    )}
                </div>

                {/* Modal yêu cầu lý do xóa */}
                {showModal && (
                    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                            <h3 className="text-xl font-semibold mb-4">Chọn lý do xóa công dân</h3>
                            <div>
                                <input
                                    type="radio"
                                    id="death"
                                    name="deleteReason"
                                    value="Qua đời"
                                    onChange={(e) => setDeleteReason(e.target.value)}
                                    className="mr-2"
                                />
                                <label htmlFor="death">Qua đời</label>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    id="moved"
                                    name="deleteReason"
                                    value="Chuyển đi"
                                    onChange={(e) => setDeleteReason(e.target.value)}
                                    className="mr-2"
                                />
                                <label htmlFor="moved">Chuyển đi</label>
                            </div>
                            <div className="mt-4">
                                <button
                                    onClick={handleConfirmDelete}
                                    className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition duration-300"
                                >
                                    Xóa
                                </button>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="ml-4 px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition duration-300"
                                >
                                    Hủy
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex justify-between mt-6">
                    <div>
                        <button
                            onClick={() => navigate(-1)}
                            className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition duration-300"
                        >
                            Trở về
                        </button>
                    </div>
                    <div className="space-x-4">
                        <button
                            onClick={handleAddCitizen}
                            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700 transition duration-300"
                        >
                            Thêm Công Dân
                        </button>
                        <button
                            onClick={handleUpdateCitizen}
                            className="px-6 py-2 bg-[#007BFF] text-white rounded-lg hover:bg-[#0056b3] transition duration-300"
                        >
                            Sửa Công Dân
                        </button>
                        <button
                            onClick={handleDeleteCitizen}
                            className="px-10 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition duration-300"
                        >
                            Xóa Công Dân
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Results;
