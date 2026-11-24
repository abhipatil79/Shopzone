import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearError } from "../store/slices/authSlice";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((s) => s.auth);

  useEffect(() => { if (user) navigate("/"); }, [user, navigate]);
  useEffect(() => { if (error) { toast.error(error); dispatch(clearError()); } }, [error, dispatch]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-amazon text-center mb-8">Sign In</h1>
        <div className="bg-white rounded-lg shadow-sm border p-8">
          <form onSubmit={(e) => { e.preventDefault(); dispatch(loginUser({ email, password })); }} className="space-y-4">
            <div><label className="block text-sm font-medium mb-1">Email</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="input-field" /></div>
            <div><label className="block text-sm font-medium mb-1">Password</label><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="input-field" /></div>
            <button type="submit" disabled={loading} className="btn-primary w-full py-3">{loading ? "Signing in..." : "Sign In"}</button>
          </form>
          <p className="mt-6 text-center text-sm">New? <Link to="/register" className="text-amazon-blue hover:underline">Create account</Link></p>
        </div>
        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
          <p className="font-semibold text-blue-800">Demo:</p>
          <p className="text-blue-700">Admin: admin@example.com / password123</p>
          <p className="text-blue-700">User: john@example.com / password123</p>
        </div>
      </div>
    </div>
  );
};
export default Login;
