import { createClient } from '@supabase/supabase-js';
import { supabaseUrl, supabaseKey } from '../supabaseConfig';

// Khởi tạo client Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

// Hàm cập nhật thông tin hộ khẩu theo householdId
export const updateHousehold = async (householdId, updatedData) => {
    try {
        const { data, error } = await supabase
            .from('household')
            .update(updatedData) // Dữ liệu cần cập nhật
            .eq('householdid', householdId); // Điều kiện cập nhật

        if (error) {
            throw new Error(error.message);
        }
        return data; // Trả về dữ liệu đã cập nhật
    } catch (error) {
        throw new Error(error.message); // Xử lý lỗi
    }
};
