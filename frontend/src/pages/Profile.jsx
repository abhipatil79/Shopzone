import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../store/slices/authSlice";
import toast from "react-hot-toast";

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.auth);
  const [form, setForm] = useState({ name: user?.name || "", email: user?.email || "", password: "", confirmPassword: "" });
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>
      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-amazon-orange text-white flex items-center justify-center text-2xl font-bold">{user?.name?.[0]?.toUpperCase()}</div>
          <div><h2 className="font-bold">{user?.name}</h2><p className="text-gray-500 text-sm">{user?.email}</p></div>
        </div>
        <form onSubmit={async (e) => { e.preventDefault(); if (form.password && form.password !== form.confirmPassword) return toast.error("Mismatch"); const p = { name: form.name, email: form.email }; if (form.password) p.password = form.password; try { await dispatch(updateProfile(p)).unwrap(); toast.success("Updated!"); } catch(e) { toast.error(e); } }} className="space-y-4">
          <div><label className="block text-sm font-medium mb-1">Name</label><input value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} required className="input-field" /></div>
          <div><label className="block text-sm font-medium mb-1">Email</label><input type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} required className="input-field" /></div>
          <div><label className="block text-sm font-medium mb-1">New Password</label><input type="password" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} className="input-field" /></div>
          {form.password && <div><label className="block text-sm font-medium mb-1">Confirm</label><input type="password" value={form.confirmPassword} onChange={(e) => setForm({...form, confirmPassword: e.target.value})} className="input-field" /></div>}
          <button type="submit" className="btn-primary w-full py-3">Update</button>
        </form>
      </div>
    </div>
  );
};
export default Profile;
