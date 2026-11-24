import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderById } from "../store/slices/orderSlice";
import Loader from "../components/common/Loader";

const OrderDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { current: order, loading } = useSelector((s) => s.orders);
  useEffect(() => { dispatch(fetchOrderById(id)); }, [id]);
  if (loading) return <Loader />;
  if (!order) return <div className="text-center py-20">Not found</div>;
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between mb-6"><div><h1 className="text-2xl font-bold">Order Details</h1><p className="text-gray-500 text-sm">#{order._id.slice(-8).toUpperCase()}</p></div><Link to="/orders" className="text-sm text-amazon-blue">← Back</Link></div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-lg shadow-sm p-6">{order.orderItems.map((i, idx) => <div key={idx} className="flex gap-4 py-3 border-b last:border-0"><img src={i.image||""} alt="" className="w-16 h-16 object-contain bg-gray-50 rounded" /><div className="flex-1"><p className="text-sm font-medium">{i.name}</p><p className="text-xs text-gray-500">Qty: {i.quantity}</p></div><p className="font-bold text-sm">${(i.price*i.quantity).toFixed(2)}</p></div>)}</div>
          <div className="bg-white rounded-lg shadow-sm p-6"><h3 className="font-bold mb-2">Shipping</h3><p className="text-sm text-gray-600">{order.shippingAddress.fullName}<br/>{order.shippingAddress.address}<br/>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p></div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="font-bold mb-4">Summary</h3>
          <div className="text-sm space-y-2">
            <div className="flex justify-between"><span>Status</span><span className="capitalize font-semibold">{order.status}</span></div>
            <div className="flex justify-between"><span>Paid</span><span className={order.isPaid ? "text-green-600" : "text-red-600"}>{order.isPaid ? "Yes" : "No"}</span></div>
            <hr />
            <div className="flex justify-between"><span>Items</span><span>${order.itemsPrice.toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>{order.shippingPrice === 0 ? "FREE" : "$" + order.shippingPrice.toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Tax</span><span>${order.taxPrice.toFixed(2)}</span></div>
            <hr /><div className="flex justify-between font-bold text-lg"><span>Total</span><span>${order.totalPrice.toFixed(2)}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrderDetail;
