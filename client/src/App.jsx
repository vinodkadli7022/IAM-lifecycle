import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

import LandingPage from './pages/LandingPage';
import Chatbot from './pages/Chatbot';
import Requests from './pages/Requests';
import Employees from './pages/Employees';
import RoleManager from './pages/RoleManager';
import AuditLog from './pages/AuditLog';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<LandingPage />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/chatbot" element={<Chatbot />} />

              <Route element={<ProtectedRoute allowedRoles={['Manager', 'System Administrator']} />}>
                <Route path="/requests/joiner" element={<Requests type="JOINER" />} />
                <Route path="/requests/mover" element={<Requests type="MOVER" />} />
                <Route path="/requests/leaver" element={<Requests type="LEAVER" />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="/audit" element={<AuditLog />} />
              </Route>

              <Route element={<ProtectedRoute allowedRoles={['System Administrator']} />}>
                <Route path="/roles" element={<RoleManager />} />
              </Route>

            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
