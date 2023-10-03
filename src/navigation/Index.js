import { Routes, Route } from "react-router-dom";
import Main from "../views/main/Main";
import Login from "../views/auth/login/Login";
import Register from "../views/auth/register/Register";
import NotFound from "../views/main/not-found/NotFound";
import SpecialOffers from "../views/main/special-offers/SpecialOffers";
import OrderHistory from "../views/main/order-history/OrderHistory";
import { useUserStore } from '../store/Index';
import ForgotPassword from "../views/auth/forgot-password/ForgotPassword";

const Dashboard = () => {
  const { loginResponse } = useUserStore(store => store);

  return (
    <Routes>
      <Route path="/" element={(loginResponse && loginResponse.isLogged) ? <Main /> : <Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/history" element={<OrderHistory />} />
      <Route path="/offers" element={<SpecialOffers />} />
      <Route path="/history" element={<OrderHistory />} />
      <Route path="/forgot" element={<ForgotPassword />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Dashboard;
