import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyOrders } from "../store/slices/orderSlice";
import Loader from "../components/common/Loader";
import { FiPackage } from "react-icons/fi";

const OrderHistory = () => {
  const dispatch = useDispatch();
  const { items: orders, loading } = useSelector((s) => s.orders);
  useEffect(() => { dispatch(fetchMyOrders()); }, [dispatch]);
  if (loading) return <Loader />;
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Order History</h1>
      {orders.length === 0 ? <div className="text-center py-20 bg-white rounded-lg"><FiPackage className="text-6xl text-gray-300 mx-auto mb-4" /><p className="text-gray-600">No orders</p><Link to="/" className="btn-primary mt-4 inline-block">Shop</Link></div> :
        <div className="space-y-4">{orders.map((o) => (
          <Link key={o._id} to={"/orders/" + o._id} className="block bg-white rounded-lg shadow-sm p-6 hover:shadow-md">
            <div className="flex justify-between items-center">
              <div><p className="text-sm text-gray-500">#{o._id.slice(-8).toUpperCase()}</p><p className="text-xs text-gray-400">{new Date(o.createdAt).toLocaleDateString()}</p></div>
              <div className="flex items-center gap-4"><span className="text-xs capitalize bg-gray-100 px-3 py-1 rounded-full">{o.status}</span><span className="font-bold">${o.totalPrice.toFixed(2)}</span></div>
            </div>
          </Link>
        ))}</div>
      }
    </div>
  );
};
export default OrderHistory;
