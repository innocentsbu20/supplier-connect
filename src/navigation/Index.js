import { Routes, Route } from "react-router-dom";
import Main from "../views/main/Main";
import Login from "../views/auth/login/Login";
import Register from "../views/auth/register/Register";
import NotFound from "../views/main/not-found/NotFound";
import SpecialOffers from "../views/main/special-offers/SpecialOffers";
import OrderHistory from "../views/main/order-history/OrderHistory";

const Dashboard = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/history" element={<OrderHistory />} />
      <Route path="/offers" element={<SpecialOffers />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Dashboard;
