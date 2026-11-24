import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../components/common/Loader";

const PrivateRoute = () => {
  const { user, loading } = useSelector((s) => s.auth);
  if (loading) return <Loader />;
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};
export default PrivateRoute;
