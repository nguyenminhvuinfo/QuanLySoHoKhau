import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import UserPage from "./presentation/user/pages/UserPage";
import Search from "./presentation/user/pages/Search";
import Login from "./presentation/user/pages/Login";
import Results from "./presentation/user/pages/Results";


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<UserPage />} />  {/* Trang chính */}
          <Route path="/search" element={<Search />} />
          <Route path="/results" element={<Results />} />
          <Route path="/Login" element={<Login/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
