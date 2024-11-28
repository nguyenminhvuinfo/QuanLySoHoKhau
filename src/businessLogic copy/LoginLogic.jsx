import { fetchUserByUsername } from '../data/LoginData';

/**
 * Hàm xác thực tài khoản với thông tin đăng nhập.
 * @param {string} username 
 * @param {string} password 
 * @returns {Object} Thông tin tài khoản nếu hợp lệ
 */
export const authenticateUser = async (username, password) => {
  try {
    const user = await fetchUserByUsername(username);

    // Kiểm tra mật khẩu
    if (user.password !== password) {
      throw new Error('Mật khẩu không đúng!');
    }

    return user; // Trả về thông tin tài khoản nếu hợp lệ
  } catch (error) {
    throw new Error(error.message);
  }
};
