import { useEffect, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import Loader from "../../components/common/Loader";
import API from "../../api/axios";
import { FiUsers, FiBox, FiShoppingBag, FiDollarSign } from "react-icons/fi";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => { (async () => { try { const { data } = await API.get("/users/admin/stats"); setStats(data.stats); } catch(e){} finally { setLoading(false); } })(); }, []);
  if (loading) return <Loader />;
  const cards = [
    { label: "Revenue", value: "$" + (stats?.totalRevenue||0).toFixed(2), icon: FiDollarSign, color: "bg-green-500" },
    { label: "Orders", value: stats?.totalOrders||0, icon: FiShoppingBag, color: "bg-blue-500" },
    { label: "Products", value: stats?.totalProducts||0, icon: FiBox, color: "bg-purple-500" },
    { label: "Users", value: stats?.totalUsers||0, icon: FiUsers, color: "bg-orange-500" },
  ];
  return (
    <div className="max-w-7xl mx-auto px-4 py-8"><div className="flex flex-col lg:flex-row gap-6"><AdminSidebar /><div className="flex-1">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">{cards.map((c) => <div key={c.label} className="bg-white rounded-lg shadow-sm p-6"><div className="flex items-center gap-4"><div className={c.color + " p-3 rounded-lg text-white"}><c.icon className="text-xl" /></div><div><p className="text-sm text-gray-500">{c.label}</p><p className="text-2xl font-bold">{c.value}</p></div></div></div>)}</div>
    </div></div></div>
  );
};
export default Dashboard;
