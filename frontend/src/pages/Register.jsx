import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearError } from "../store/slices/authSlice";
import toast from "react-hot-toast";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((s) => s.auth);

  useEffect(() => { if (user) navigate("/"); }, [user, navigate]);
  useEffect(() => { if (error) { toast.error(error); dispatch(clearError()); } }, [error, dispatch]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-amazon text-center mb-8">Create Account</h1>
        <div className="bg-white rounded-lg shadow-sm border p-8">
          <form onSubmit={(e) => { e.preventDefault(); if (form.password !== form.confirmPassword) return toast.error("Passwords don't match"); dispatch(registerUser({ name: form.name, email: form.email, password: form.password })); }} className="space-y-4">
            <div><label className="block text-sm font-medium mb-1">Name</label><input value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} required className="input-field" /></div>
            <div><label className="block text-sm font-medium mb-1">Email</label><input type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} required className="input-field" /></div>
            <div><label className="block text-sm font-medium mb-1">Password</label><input type="password" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} required minLength={6} className="input-field" /></div>
            <div><label className="block text-sm font-medium mb-1">Confirm Password</label><input type="password" value={form.confirmPassword} onChange={(e) => setForm({...form, confirmPassword: e.target.value})} required className="input-field" /></div>
            <button type="submit" disabled={loading} className="btn-primary w-full py-3">{loading ? "Creating..." : "Create Account"}</button>
          </form>
          <p className="mt-6 text-center text-sm">Have account? <Link to="/login" className="text-amazon-blue hover:underline">Sign in</Link></p>
        </div>
      </div>
    </div>
  );
};
export default Register;
