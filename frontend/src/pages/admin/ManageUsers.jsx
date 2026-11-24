import { useEffect, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import Loader from "../../components/common/Loader";
import API from "../../api/axios";
import toast from "react-hot-toast";
import { FiTrash2 } from "react-icons/fi";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { (async () => { try { const { data } = await API.get("/users"); setUsers(data.users); } catch(e){} finally { setLoading(false); } })(); }, []);
  return (
    <div className="max-w-7xl mx-auto px-4 py-8"><div className="flex flex-col lg:flex-row gap-6"><AdminSidebar /><div className="flex-1">
      <h1 className="text-2xl font-bold mb-6">Users</h1>
      {loading ? <Loader /> : <div className="bg-white rounded-lg shadow-sm overflow-hidden"><table className="w-full text-sm"><thead className="bg-gray-50"><tr className="text-left"><th className="px-4 py-3">Name</th><th className="px-4 py-3">Email</th><th className="px-4 py-3">Role</th><th className="px-4 py-3">Actions</th></tr></thead><tbody>{users.map((u) => (
        <tr key={u._id} className="border-b hover:bg-gray-50">
          <td className="px-4 py-3 font-medium">{u.name}</td>
          <td className="px-4 py-3 text-gray-600">{u.email}</td>
          <td className="px-4 py-3"><span className={"text-xs px-2 py-1 rounded-full " + (u.role === "admin" ? "bg-purple-100 text-purple-800" : "bg-gray-100")}>{u.role}</span></td>
          <td className="px-4 py-3">{u.role !== "admin" ? <button onClick={async () => { if (!window.confirm("Delete?")) return; try { await API.delete("/users/" + u._id); setUsers((p) => p.filter((x) => x._id !== u._id)); toast.success("Deleted"); } catch(e) { toast.error(e.response?.data?.message); } }} className="p-1.5 text-red-600 hover:bg-red-50 rounded"><FiTrash2 /></button> : <span className="text-xs text-gray-400">Admin</span>}</td>
        </tr>
      ))}</tbody></table></div>}
    </div></div></div>
  );
};
export default ManageUsers;
