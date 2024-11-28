import { useState, useEffect } from 'react';
import Header from '../components/Header';
import { addHousehold } from '../../../businessLogic/AddHouseHoldLogic';

function Content() {
  const [soHoKhau, setSoHoKhau] = useState('');
  const [hoTen, setHoTen] = useState('');
  const [diaChi, setDiaChi] = useState('');
  const [quan, setQuan] = useState('');
  const [phuong, setPhuong] = useState('');
  const [quanData, setQuanData] = useState(null);

  const handleAddHousehold = async () => {
    try {
      await addHousehold(soHoKhau, hoTen, diaChi, quan, phuong);
      alert('Thêm sổ hộ khẩu thành công!');
      setSoHoKhau('');
      setHoTen('');
      setDiaChi('');
      setQuan('');
      setPhuong('');
    } catch (error) {
      alert('Có lỗi xảy ra: ' + error.message);
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetch('/quanData.json')
      .then((response) => response.json())
      .then((data) => setQuanData(data))
      .catch((error) => console.error('Error loading the JSON data:', error));
  }, []);

  if (!quanData) {
    return <div>Loading...</div>;
  }

  const handleQuanChange = (e) => {
    const selectedQuan = e.target.value;
    setQuan(selectedQuan);
    setPhuong(''); // Reset Phường khi thay đổi Quận
  };

  const phuongOptions = quan ? quanData[quan] || [] : [];

  return (
    <div className="min-h-screen pt-8 flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Thêm Sổ Hộ Khẩu</h1>

        <div className="mb-4">
          <label htmlFor="soHoKhau" className="block text-sm font-medium text-gray-700">
            Mã Số Sổ Hộ Khẩu
          </label>
          <input
            type="text"
            id="soHoKhau"
            value={soHoKhau}
            onChange={(e) => setSoHoKhau(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="hoTen" className="block text-sm font-medium text-gray-700">
            Họ và Tên
          </label>
          <input
            type="text"
            id="hoTen"
            value={hoTen}
            onChange={(e) => setHoTen(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="quan" className="block text-sm font-medium text-gray-700">
            Quận
          </label>
          <select
            id="quan"
            value={quan}
            onChange={handleQuanChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">-- Chọn Quận --</option>
            {Object.keys(quanData).map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="phuong" className="block text-sm font-medium text-gray-700">
            Phường
          </label>
          <select
            id="phuong"
            value={phuong}
            onChange={(e) => setPhuong(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            disabled={!quan}
          >
            <option value="">-- Chọn Phường --</option>
            {phuongOptions.map((phuongName) => (
              <option key={phuongName} value={phuongName}>
                {phuongName}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="diaChi" className="block text-sm font-medium text-gray-700">
            Địa Chỉ (Số Nhà, Tên Đường)
          </label>
          <input
            type="text"
            id="diaChi"
            value={diaChi}
            onChange={(e) => setDiaChi(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <button
          type="button"
          onClick={handleAddHousehold}
          className="w-full py-2 px-4 bg-purple-700 font-bold text-white rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Thêm Sổ Hộ Khẩu
        </button>
      </div>
    </div>
  );
}

function AddHousehold() {
  return (
    <div className="bg-white">
      <Header />
      <Content />
    </div>
  );
}

export default AddHousehold;
