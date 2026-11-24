import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import toast from "react-hot-toast";
import Rating from "../common/Rating";
import { addToCart } from "../../store/slices/cartSlice";
import { toggleWishlistItem } from "../../store/slices/wishlistSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.auth);
  const { items: wishlist } = useSelector((s) => s.wishlist);
  const isW = wishlist.some((i) => i._id === product._id);
  const disc = product.comparePrice ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100) : 0;

  const handleAdd = (e) => { e.preventDefault(); if (!user) return toast.error("Please login"); dispatch(addToCart({ productId: product._id, quantity: 1 })); toast.success("Added to cart!"); };
  const handleWish = (e) => { e.preventDefault(); if (!user) return toast.error("Please login"); dispatch(toggleWishlistItem(product._id)); toast.success(isW ? "Removed" : "Added to wishlist"); };

  return (
    <Link to={"/product/" + product._id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden group flex flex-col">
      <div className="relative aspect-square bg-gray-50 p-4 overflow-hidden">
        <img src={product.images?.[0] || "https://via.placeholder.com/300"} alt={product.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" />
        {disc > 0 && <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">-{disc}%</span>}
        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={handleWish} className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50">{isW ? <FaHeart className="text-red-500" /> : <FiHeart className="text-gray-600" />}</button>
          <button onClick={handleAdd} className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50"><FiShoppingCart className="text-gray-600" /></button>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">{product.brand}</p>
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2 flex-1">{product.name}</h3>
        <Rating value={product.rating} count={product.numReviews} />
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
          {product.comparePrice > product.price && <span className="text-sm text-gray-400 line-through">${product.comparePrice.toFixed(2)}</span>}
        </div>
        {product.countInStock === 0 && <span className="text-xs text-red-600 font-medium mt-1">Out of Stock</span>}
      </div>
    </Link>
  );
};
export default ProductCard;
