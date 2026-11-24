import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUser } from "./store/slices/authSlice";
import Layout from "./components/layout/Layout";
import PrivateRoute from "./utils/PrivateRoute";
import AdminRoute from "./utils/AdminRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductDetail from "./pages/ProductDetail";
import SearchResults from "./pages/SearchResults";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import OrderHistory from "./pages/OrderHistory";
import OrderDetail from "./pages/OrderDetail";
import Profile from "./pages/Profile";
import Dashboard from "./pages/admin/Dashboard";
import ManageProducts from "./pages/admin/ManageProducts";
import ManageOrders from "./pages/admin/ManageOrders";
import ManageUsers from "./pages/admin/ManageUsers";

function App() {
  const dispatch = useDispatch();
  useEffect(() => { if (localStorage.getItem("token")) dispatch(loadUser()); }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="product/:id" element={<ProductDetail />} />
        <Route path="search" element={<SearchResults />} />
        <Route element={<PrivateRoute />}>
          <Route path="cart" element={<Cart />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="orders" element={<OrderHistory />} />
          <Route path="orders/:id" element={<OrderDetail />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route element={<AdminRoute />}>
          <Route path="admin" element={<Dashboard />} />
          <Route path="admin/products" element={<ManageProducts />} />
          <Route path="admin/orders" element={<ManageOrders />} />
          <Route path="admin/users" element={<ManageUsers />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
