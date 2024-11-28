import { updateHousehold } from '../data/UpdateHouseHoldData'; // Import hàm cập nhật từ data layer

// Hàm xử lý cập nhật hộ khẩu với các logic nghiệp vụ
export const updateHouseholdWithMembers = async (householdId, updatedData) => {
    try {
        // Gọi hàm cập nhật trong data layer
        const data = await updateHousehold(householdId, updatedData);

        return { success: true, data }; // Trả về kết quả thành công
    } catch (error) {
        return { success: false, message: error.message }; // Xử lý lỗi
    }
};
