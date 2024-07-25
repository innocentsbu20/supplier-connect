import { Routes, Route } from "react-router-dom";
import Main from "../views/main/Main";
import Login from "../views/auth/login/Login";
import Register from "../views/auth/register/Register";
import NotFound from "../views/main/not-found/NotFound";
import SpecialOffers from "../views/main/special-offers/SpecialOffers";
import OrderHistory from "../views/main/order-history/OrderHistory";
import AboutUs from "../views/main/about-us/AboutUs";
import Account from "../views/main/account/Account";

import { EXPIRED_TOKKEN } from 'utils/Index';
import { useUserStore } from '../store/Index';
import ForgotPassword from "../views/auth/forgot-password/ForgotPassword";

const Dashboard = () => {
  const { user } = useUserStore(store => store);

  const isLogged = () => {

  }

  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/history" element={<OrderHistory />} />
      <Route path="/offers" element={<SpecialOffers />} />
      <Route path="/forgot" element={<ForgotPassword />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/account" element={<Account />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Dashboard;
