import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrders, updateOrderStatus } from "../../store/slices/orderSlice";
import AdminSidebar from "../../components/admin/AdminSidebar";
import Loader from "../../components/common/Loader";
import Pagination from "../../components/common/Pagination";
import toast from "react-hot-toast";

const ManageOrders = () => {
  const dispatch = useDispatch();
  const { items: orders, loading, page, pages } = useSelector((s) => s.orders);
  useEffect(() => { dispatch(fetchAllOrders({ page: 1, limit: 20 })); }, [dispatch]);
  return (
    <div className="max-w-7xl mx-auto px-4 py-8"><div className="flex flex-col lg:flex-row gap-6"><AdminSidebar /><div className="flex-1">
      <h1 className="text-2xl font-bold mb-6">Orders</h1>
      {loading ? <Loader /> : <div className="bg-white rounded-lg shadow-sm overflow-hidden"><table className="w-full text-sm"><thead className="bg-gray-50"><tr className="text-left"><th className="px-4 py-3">ID</th><th className="px-4 py-3">Customer</th><th className="px-4 py-3">Total</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Date</th></tr></thead><tbody>{orders.map((o) => (
        <tr key={o._id} className="border-b hover:bg-gray-50">
          <td className="px-4 py-3 font-mono text-xs">#{o._id.slice(-8).toUpperCase()}</td>
          <td className="px-4 py-3">{o.user?.name||"N/A"}</td>
          <td className="px-4 py-3 font-medium">${o.totalPrice.toFixed(2)}</td>
          <td className="px-4 py-3"><select value={o.status} onChange={async (e) => { try { await dispatch(updateOrderStatus({ id: o._id, status: e.target.value })).unwrap(); toast.success("Updated"); } catch(e) { toast.error(e); } }} className="text-xs px-2 py-1 rounded border">{["pending","processing","shipped","delivered","cancelled"].map(s => <option key={s} value={s}>{s}</option>)}</select></td>
          <td className="px-4 py-3 text-gray-500">{new Date(o.createdAt).toLocaleDateString()}</td>
        </tr>
      ))}</tbody></table><div className="p-4"><Pagination page={page} pages={pages} onPageChange={(p) => dispatch(fetchAllOrders({ page: p, limit: 20 }))} /></div></div>}
    </div></div></div>
  );
};
export default ManageOrders;
