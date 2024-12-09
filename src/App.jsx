import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './presentation/components/ProtectedRoute';
// Import các components khác...

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route 
          path="/adminPage" 
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminPage />
            </ProtectedRoute>
          } 
        />
        {/* Các routes khác... */}
      </Routes>
    </Router>
  );
}

export default App; 