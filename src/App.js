import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import UserPage from "./presentation/user/pages/UserPage";
import Search from "./presentation/user/pages/Search";
import Login from "./presentation/user/pages/Login";
import Results from "./presentation/user/pages/Results";
import AdminPage from "./presentation/admin/pages/AdminPage";
import SearchHouseHold from "./presentation/admin/pages/SearchHouseHold";
import AddHousehold from "./presentation/admin/pages/AddHouseHold";
import EditHouseHold from "./presentation/admin/pages/EditHouseHold";
import SearchCitizen from "./presentation/admin/pages/SearchCitizen";
import EditCitizen from "./presentation/admin/pages/EditCitizen";
import EditCitizenPage from "./presentation/admin/pages/EditCitizenPage";
import AddCitizen from "./presentation/admin/pages/AddCitizen";
import Statistics from "./presentation/admin/pages/Statistics";
import About from "./presentation/user/pages/About";
import Guide from "./presentation/user/pages/Guide";
import Contact from "./presentation/user/pages/Contact";
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './presentation/components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<UserPage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/results" element={<Results />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/contact" element={<Contact />} />

          {/* Admin Routes */}
          <Route path="/admin/*" element={
            <ProtectedRoute>
              <Routes>
                <Route path="/" element={<AdminPage />} />
                <Route path="search-household" element={<SearchHouseHold />} />
                <Route path="search-citizen" element={<SearchCitizen />} />
                <Route path="add-household" element={<AddHousehold />} />
                <Route path="edit-household" element={<EditHouseHold />} />
                <Route path="edit-citizen" element={<EditCitizen />} />
                <Route path="edit-citizen-page" element={<EditCitizenPage />} />
                <Route path="add-citizen" element={<AddCitizen />} />
                <Route path="statistics" element={<Statistics />} />
              </Routes>
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
