import { deleteHousehold } from '../data/DeleteHouseHoldData'; // Import hàm xóa từ data layer

// Hàm xử lý xóa hộ khẩu với các logic nghiệp vụ
export const deleteHouseholdWithMembers = async (householdId) => {
    try {
        const data = await deleteHousehold(householdId); // Gọi hàm xóa trong data layer
        return { success: true, data };
    } catch (error) {
        return { success: false, message: error.message };
    }
};
