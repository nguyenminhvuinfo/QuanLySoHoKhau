import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { fetchHouseholdData } from '../../../data/SearchHouseHoldData';

function Content() {
  const [soHoKhau, setSoHoKhau] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedHousehold, setSelectedHousehold] = useState(null);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!soHoKhau.trim()) {
      alert('Vui lòng nhập số hộ khẩu');
      return;
    }

    try {
      const results = await fetchHouseholdData({ householdnumber: soHoKhau });
      setSearchResults(results);
    } catch (error) {
      console.error('Lỗi khi tìm kiếm:', error);
      alert('Có lỗi xảy ra khi tìm kiếm');
    }
  };

  const handleContinue = () => {
    if (!selectedHousehold) {
      alert('Vui lòng chọn một hộ khẩu');
      return;
    }

    const params = new URLSearchParams({
      soHoKhau: selectedHousehold.householdnumber,
      hoTen: selectedHousehold.ownername,
      diaChi: selectedHousehold.streetaddress,
      quan: selectedHousehold.district,
      phuong: selectedHousehold.ward,
      householdId: selectedHousehold.householdid
    }).toString();

    navigate(`/admin/edit-household?${params}`);
  };

  return (
    <div className="min-h-screen  pt-8 flex flex-col items-center bg-gray-100">
      <div className="bg-white mt-10 p-6 rounded-lg shadow-lg w-full max-w-4xl mb-6">
        {/* Thanh tìm kiếm một dòng */}
        <div className="flex items-center space-x-4">
          <div className="flex-grow">
            <div className="relative">
              <input
                type="text"
                id="soHoKhau"
                value={soHoKhau}
                onChange={(e) => setSoHoKhau(e.target.value)}
                placeholder="Nhập số hộ khẩu..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={handleSearch}
            className="px-6 py-2 bg-purple-700 text-white font-bold rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 whitespace-nowrap"
          >
            Tra Cứu
          </button>
        </div>
      </div>

      {/* Hiển thị kết quả tìm kiếm */}
      {searchResults.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
          <h2 className="text-xl font-bold mb-4">Kết quả tìm kiếm</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Chọn
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Số sổ hộ khẩu
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Chủ hộ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Địa chỉ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phường/Xã
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quận/Huyện
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {searchResults.map((household) => (
                  <tr
                    key={household.householdid}
                    className={`cursor-pointer hover:bg-purple-50 transition-colors duration-150 ${
                      selectedHousehold?.householdid === household.householdid
                        ? 'bg-purple-100 border-l-4 border-purple-500'
                        : ''
                    }`}
                    onClick={() => setSelectedHousehold(household)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center justify-center">
                        <input
                          type="radio"
                          name="household-selection"
                          checked={selectedHousehold?.householdid === household.householdid}
                          onChange={() => setSelectedHousehold(household)}
                          className="h-4 w-4 text-purple-600 focus:ring-purple-500 cursor-pointer"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {household.householdnumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {household.ownername}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {household.streetaddress}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {household.ward}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {household.district}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <button
            type="button"
            onClick={handleContinue}
            className="w-full mt-4 py-2 px-4 bg-purple-700 font-bold text-white rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={!selectedHousehold}
          >
            Tiếp tục
          </button>
        </div>
      )}

      {searchResults.length === 0 && soHoKhau && (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <p className="text-center text-gray-500">Không tìm thấy kết quả</p>
        </div>
      )}
    </div>
  );
}

function Search() {
  return (
    <div className="bg-white">
      <Header />
      <Content />
    </div>
  );
}

export default Search;
