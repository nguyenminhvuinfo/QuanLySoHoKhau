import { createClient } from '@supabase/supabase-js';
import { supabaseUrl, supabaseKey } from '../supabaseConfig';

// Khởi tạo client Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

// Hàm xóa hộ khẩu theo householdId
export const deleteHousehold = async (householdId) => {
    try {
        const { data, error } = await supabase
            .from('household')
            .delete()
            .eq('householdid', householdId);

        if (error) {
            throw new Error(error.message);
        }
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};
