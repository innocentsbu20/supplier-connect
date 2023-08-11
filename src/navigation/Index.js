import { Routes, Route } from "react-router-dom";
import Main from "../views/main/Main";
import Login from "../views/auth/login/Login";
import Register from "../views/auth/register/Register";

const Dashboard = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default Dashboard;
