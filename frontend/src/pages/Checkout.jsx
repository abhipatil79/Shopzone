import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, payOrder, confirmPayment } from "../store/slices/orderSlice";
import { fetchCart } from "../store/slices/cartSlice";
import toast from "react-hot-toast";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((s) => s.cart);
  const { loading } = useSelector((s) => s.orders);
  const { user } = useSelector((s) => s.auth);
  const [step, setStep] = useState(1);
  const [addr, setAddr] = useState({ fullName: user?.name || "", address: "", city: "", state: "", zipCode: "", country: "US" });
  useEffect(() => { dispatch(fetchCart()); }, [dispatch]);
  const sub = items.reduce((s, i) => s + (i.product?.price || 0) * i.quantity, 0);
  const ship = sub > 100 ? 0 : 9.99;
  const total = sub + (sub * 0.08) + ship;

  const place = async () => {
    try {
      const r = await dispatch(createOrder({ shippingAddress: addr })).unwrap();
      const p = await dispatch(payOrder(r.order._id)).unwrap();
      if (p.mockPayment) { toast.success("Order placed!"); navigate("/orders/" + r.order._id); }
      else { await dispatch(confirmPayment({ orderId: r.order._id, paymentIntentId: "pi_mock" })).unwrap(); toast.success("Order placed!"); navigate("/orders/" + r.order._id); }
    } catch (e) { toast.error(e || "Failed"); }
  };

  if (!items.length) return <div className="text-center py-16"><p>Cart is empty</p></div>;
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {step === 1 && <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="bg-white rounded-lg shadow-sm p-6 space-y-4">
            <h2 className="text-lg font-bold">Shipping</h2>
            <input value={addr.fullName} onChange={(e) => setAddr({...addr, fullName: e.target.value})} required placeholder="Full Name" className="input-field" />
            <input value={addr.address} onChange={(e) => setAddr({...addr, address: e.target.value})} required placeholder="Address" className="input-field" />
            <div className="grid grid-cols-2 gap-4">
              <input value={addr.city} onChange={(e) => setAddr({...addr, city: e.target.value})} required placeholder="City" className="input-field" />
              <input value={addr.state} onChange={(e) => setAddr({...addr, state: e.target.value})} required placeholder="State" className="input-field" />
            </div>
            <input value={addr.zipCode} onChange={(e) => setAddr({...addr, zipCode: e.target.value})} required placeholder="ZIP" className="input-field" />
            <button type="submit" className="btn-primary">Continue</button>
          </form>}
          {step === 2 && <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-bold mb-4">Review & Pay</h2>
            <p className="text-sm mb-4">{addr.fullName}, {addr.address}, {addr.city} {addr.state} {addr.zipCode}</p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4"><p className="text-sm text-blue-800">Demo: Payment will be simulated.</p></div>
            <div className="flex gap-3"><button onClick={() => setStep(1)} className="btn-secondary">Back</button><button onClick={place} disabled={loading} className="btn-primary flex-1">{loading ? "Processing..." : "Place Order - $" + total.toFixed(2)}</button></div>
          </div>}
        </div>
        <div><div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
          <h3 className="font-bold mb-4">Summary</h3>
          <div className="text-sm space-y-2">
            <div className="flex justify-between"><span>Items</span><span>${sub.toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>{ship === 0 ? "FREE" : "$" + ship.toFixed(2)}</span></div>
            <hr /><div className="flex justify-between font-bold text-lg"><span>Total</span><span>${total.toFixed(2)}</span></div>
          </div>
        </div></div>
      </div>
    </div>
  );
};
export default Checkout;
