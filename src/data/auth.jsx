import { createClient } from '@supabase/supabase-js';
import { supabaseUrl, supabaseKey } from '../supabaseConfig';

// Tạo Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Hàm lấy thông tin tài khoản từ cơ sở dữ liệu dựa trên username.
 * @param {string} username 
 * @returns {Object} Dữ liệu tài khoản hoặc lỗi
 */
export const fetchUserByUsername = async (username) => {
  const { data, error } = await supabase
    .from('employeeaccount')
    .select('employeeid, username, password')
    .eq('username', username)
    .single();

  if (error) {
    throw new Error('Tài khoản không tồn tại!');
  }

  return data;
};
