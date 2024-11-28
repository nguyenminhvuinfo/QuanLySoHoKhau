import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import UserPage from "./presentation/user/pages/UserPage";
import Search from "./presentation/user/pages/Search";
import Login from "./presentation/user/pages/Login";
import Results from "./presentation/user/pages/Results";
import AdminPage from "./presentation/admin/pages/AdminPage";
import SearchHouseHold from "./presentation/admin/pages/SearchHouseHold";
import AddHousehold from "./presentation/admin/pages/AddHouseHold"; // Đảm bảo bạn đã import đúng
import EditHouseHold from "./presentation/admin/pages/EditHouseHold";
import SearchCitizen from "./presentation/admin/pages/SearchCitizen";
import EditCitizen from "./presentation/admin/pages/EditCitizen";
import EditCitizenPage from "./presentation/admin/pages/EditCitizenPage";
import AddCitizen from "./presentation/admin/pages/AddCitizen";
import Statistics from "./presentation/admin/pages/Statistics";


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<UserPage />} />  {/* Trang chính */}
          <Route path="/search" element={<Search />} />
          <Route path="/results" element={<Results />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/adminPage" element={<AdminPage />} />
          <Route path="/searchHouseHold" element={<SearchHouseHold />} />
          <Route path="/searchCitizen" element={<SearchCitizen />} />
          <Route path="/addHousehold" element={<AddHousehold />} /> {/* Trang mới */}
          <Route path="/editHouseHold" element={<EditHouseHold />} />
          <Route path="/editCitizen" element={<EditCitizen />} />
          <Route path="/editCitizenPage" element={<EditCitizenPage />} />
          <Route path="/addCitizen" element={<AddCitizen />} />
          <Route path="/statistics" element={<Statistics />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
