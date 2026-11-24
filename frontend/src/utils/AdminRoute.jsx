import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../components/common/Loader";

const AdminRoute = () => {
  const { user, loading } = useSelector((s) => s.auth);
  if (loading) return <Loader />;
  if (!user) return <Navigate to="/login" replace />;
  return user.role === "admin" ? <Outlet /> : <Navigate to="/" replace />;
};
export default AdminRoute;
