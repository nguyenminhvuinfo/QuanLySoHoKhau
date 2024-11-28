import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { addCitizen } from '../../../businessLogic/AddCitizenLogic'; // Your existing add citizen logic
import { supabase } from '../../../data/AddCitizenData'; // Initialize Supabase client

function AddCitizen() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    // Get householdid and memberid from URL
    const householdid = searchParams.get('householdid');
    const memberid = searchParams.get('memberid');

    // State to store citizen data
    const [citizenData, setCitizenData] = useState({
        householdid: '',
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
    });

    // State to track loading state
    const [loading, setLoading] = useState(true);

    // Fetch citizen data from Supabase when the component mounts
    useEffect(() => {
        if (householdid && memberid) {
            const fetchCitizenData = async () => {
                try {
                    const { data, error } = await supabase
                        .from('householdmember')
                        .select('*')
                        .eq('householdid', householdid)
                        .eq('memberid', memberid)
                        .single();

                    if (error) throw error;

                    // Set citizen data from fetched result
                    setCitizenData(data);
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching citizen data:', error);
                    alert('Có lỗi khi tải dữ liệu công dân.');
                    setLoading(false);
                }
            };
            fetchCitizenData();
        }
    }, [householdid, memberid]);

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCitizenData({
            ...citizenData,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addCitizen(citizenData); // Assuming you handle both add and update logic here
            alert('Cập nhật công dân thành công!');
            navigate('/searchCitizen');
        } catch (error) {
            console.error('Lỗi khi cập nhật công dân:', error);
            alert(`Lỗi: ${error.message || 'Có lỗi xảy ra, vui lòng thử lại!'}`);
        }
    };

    // Handle cancel action
    const handleCancel = () => {
        navigate('/searchCitizen');
    };

    if (loading) {
        return <div>Loading...</div>; // Loading indicator
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl">
                <h2 className="text-3xl font-semibold text-center text-[#007BFF] mb-6">Cập Nhật Công Dân</h2>
                <form onSubmit={handleSubmit}>
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

                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                        >
                            Cập Nhật Công Dân
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddCitizen;
