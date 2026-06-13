import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RoleSelect from "./pages/RoleSelect";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import AdminPanel from "./pages/AdminPanel";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/account" element={<Account />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/admin-login" element={<AdminLogin />} />




      </Routes>
    </BrowserRouter>
  );
}

export default App;
