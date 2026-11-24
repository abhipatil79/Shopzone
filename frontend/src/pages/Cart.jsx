import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, updateCartItem, removeFromCart } from "../store/slices/cartSlice";
import { FiTrash2, FiShoppingBag } from "react-icons/fi";
import Loader from "../components/common/Loader";
import toast from "react-hot-toast";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, loading } = useSelector((s) => s.cart);
  useEffect(() => { dispatch(fetchCart()); }, [dispatch]);
  const sub = items.reduce((s, i) => s + (i.product?.price || 0) * i.quantity, 0);
  const ship = sub > 100 ? 0 : 9.99;
  const tax = sub * 0.08;
  const total = sub + ship + tax;
  if (loading) return <Loader />;
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      {items.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-lg shadow-sm"><FiShoppingBag className="text-6xl text-gray-300 mx-auto mb-4" /><h2 className="text-xl text-gray-600 mb-2">Cart is empty</h2><Link to="/" className="btn-primary">Shop Now</Link></div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">{items.map((i) => (
            <div key={i._id} className="bg-white rounded-lg shadow-sm p-4 flex gap-4">
              <Link to={"/product/" + i.product?._id} className="w-24 h-24 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden"><img src={i.product?.images?.[0] || ""} alt="" className="w-full h-full object-contain" /></Link>
              <div className="flex-1">
                <Link to={"/product/" + i.product?._id} className="font-medium text-sm hover:text-amazon-blue line-clamp-2">{i.product?.name}</Link>
                <p className="text-lg font-bold mt-1">${i.product?.price?.toFixed(2)}</p>
                <div className="flex items-center gap-4 mt-2">
                  <select value={i.quantity} onChange={(e) => dispatch(updateCartItem({ productId: i.product._id, quantity: Number(e.target.value) }))} className="border rounded px-2 py-1 text-sm">
                    {Array.from({length: Math.min(i.product?.countInStock||10, 10)}, (_,x) => <option key={x+1} value={x+1}>Qty: {x+1}</option>)}
                  </select>
                  <button onClick={() => { dispatch(removeFromCart(i.product._id)); toast.success("Removed"); }} className="text-red-500 text-sm flex items-center gap-1"><FiTrash2 /> Remove</button>
                </div>
              </div>
              <p className="font-bold">${(i.product?.price * i.quantity).toFixed(2)}</p>
            </div>
          ))}</div>
          <div><div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
            <h3 className="text-lg font-bold mb-4">Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span>Subtotal</span><span>${sub.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>{ship === 0 ? "FREE" : "$" + ship.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Tax</span><span>${tax.toFixed(2)}</span></div>
              <hr /><div className="flex justify-between text-lg font-bold"><span>Total</span><span>${total.toFixed(2)}</span></div>
            </div>
            <button onClick={() => navigate("/checkout")} className="btn-primary w-full mt-6 py-3">Checkout</button>
          </div></div>
        </div>
      )}
    </div>
  );
};
export default Cart;
