
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Stack } from '@fluentui/react';
import './App.css';
import Navbar from './assets/components/Navbar';
import Header from './assets/components/Header';
import Content from './assets/components/Content';
import Leaves from "./assets/components/Leaves";
import AttendanceRequest from "./assets/components/AttendanceRequest";
import Reports from "./assets/components/Reports";
import Events from "./assets/components/Events";
import CompanyPolicies from "./assets/components/CompanyPolicies";
import Login from "./assets/components/Login";
import { AuthProvider } from "./assets/components/AuthContext"; // AuthContext for user state
import PrivateRoute from "./assets/components/PrivateRoute";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public route for Login */}
          <Route path="/" element={<Login />} />

          {/* Protected routes */}
          <Route
            path="/dashboard/*"
            element={
              <PrivateRoute>
                <Stack horizontal>
                  <Navbar />
                  <Stack verticalFill styles={{ root: { width: 'auto', height: 'auto' } }}>
                    <Header />
                    <Routes>
                      <Route path="/" element={<Content />} />
                      <Route path="/leaves" element={<Leaves />} />
                      <Route path="/attendance-request" element={<AttendanceRequest />} />
                      <Route path="/reports" element={<Reports />} />
                      <Route path="/events" element={<Events />} />
                      <Route path="/company-policies" element={<CompanyPolicies />} />
                    </Routes>
                  </Stack>
                </Stack>
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
