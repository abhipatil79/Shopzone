import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishlist, toggleWishlistItem } from "../store/slices/wishlistSlice";
import { addToCart } from "../store/slices/cartSlice";
import { Link } from "react-router-dom";
import { FiHeart, FiShoppingCart, FiTrash2 } from "react-icons/fi";
import Rating from "../components/common/Rating";
import Loader from "../components/common/Loader";
import toast from "react-hot-toast";

const Wishlist = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((s) => s.wishlist);
  useEffect(() => { dispatch(fetchWishlist()); }, [dispatch]);
  if (loading) return <Loader />;
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Wishlist ({items.length})</h1>
      {items.length === 0 ? <div className="text-center py-20 bg-white rounded-lg"><FiHeart className="text-6xl text-gray-300 mx-auto mb-4" /><p className="text-gray-600">Empty wishlist</p><Link to="/" className="btn-primary mt-4 inline-block">Browse</Link></div> :
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{items.map((p) => (
          <div key={p._id} className="bg-white rounded-lg shadow-sm p-4 flex gap-4">
            <Link to={"/product/" + p._id} className="w-24 h-24 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden"><img src={p.images?.[0] || ""} alt="" className="w-full h-full object-contain" /></Link>
            <div className="flex-1">
              <Link to={"/product/" + p._id} className="font-medium text-sm hover:text-amazon-blue line-clamp-2">{p.name}</Link>
              <Rating value={p.rating} count={p.numReviews} />
              <p className="font-bold mt-1">${p.price?.toFixed(2)}</p>
              <div className="flex gap-2 mt-2">
                <button onClick={() => { dispatch(addToCart({ productId: p._id, quantity: 1 })); toast.success("Added!"); }} className="text-xs btn-primary py-1 px-3"><FiShoppingCart className="inline" /> Add</button>
                <button onClick={() => { dispatch(toggleWishlistItem(p._id)); toast.success("Removed"); }} className="text-xs text-red-500"><FiTrash2 className="inline" /> Remove</button>
              </div>
            </div>
          </div>
        ))}</div>
      }
    </div>
  );
};
export default Wishlist;
