import { supabase } from '../data/DeleteCitizenData';

// Hàm xóa công dân theo memberId
export const deleteCitizen = async (memberId) => {
    try {
        // Gửi yêu cầu xóa công dân trong bảng 'citizens' dựa trên memberId
        const { data, error } = await supabase
            .from('householdmember')  // Tên bảng công dân
            .delete()
            .eq('memberid', memberId);  // Trường memberid trong bảng citizens

        if (error) {
            throw new Error(error.message);  // Nếu có lỗi, ném ra lỗi
        }

        return data;  // Trả về dữ liệu xóa thành công
    } catch (error) {
        throw new Error(error.message);  // Ném lỗi nếu có lỗi xảy ra
    }
};
