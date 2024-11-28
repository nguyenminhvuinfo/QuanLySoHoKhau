import { insertHousehold } from '../data/AddHouseHoldData';

export const addHousehold = async (soHoKhau, hoTen, diaChi, quan, phuong) => {
  if (!soHoKhau || !hoTen || !diaChi || !quan || !phuong) {
    throw new Error('Vui lòng nhập đầy đủ thông tin sổ hộ khẩu!');
  }

  const household = {
    householdnumber: soHoKhau,
    ownername: hoTen,
    streetaddress: diaChi,
    ward: phuong,
    district: quan,
  };

  const result = await insertHousehold(household);
  return result;
};
