import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById, fetchRelatedProducts, clearCurrentProduct } from "../store/slices/productSlice";
import { addToCart } from "../store/slices/cartSlice";
import { toggleWishlistItem } from "../store/slices/wishlistSlice";
import Rating from "../components/common/Rating";
import ProductCard from "../components/product/ProductCard";
import Loader from "../components/common/Loader";
import toast from "react-hot-toast";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import API from "../api/axios";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { current: product, related, loading } = useSelector((s) => s.products);
  const { user } = useSelector((s) => s.auth);
  const { items: wishlist } = useSelector((s) => s.wishlist);
  const [qty, setQty] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [rf, setRf] = useState({ rating: 5, title: "", comment: "" });
  const isW = wishlist.some((i) => i._id === id);

  useEffect(() => { dispatch(fetchProductById(id)); dispatch(fetchRelatedProducts(id)); loadReviews(); return () => dispatch(clearCurrentProduct()); }, [id]);
  const loadReviews = async () => { try { const { data } = await API.get("/reviews/" + id); setReviews(data.reviews); } catch(e){} };

  if (loading) return <Loader />;
  if (!product) return <div className="text-center py-20">Product not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
        <div className="bg-white rounded-lg p-6 aspect-square flex items-center justify-center">
          <img src={product.images?.[0] || "https://via.placeholder.com/500"} alt={product.name} className="max-w-full max-h-full object-contain" />
        </div>
        <div>
          <p className="text-sm text-amazon-blue font-medium mb-1">{product.brand}</p>
          <h1 className="text-2xl lg:text-3xl font-bold mb-3">{product.name}</h1>
          <Rating value={product.rating} count={product.numReviews} size="md" />
          <div className="border-t border-b py-4 my-4">
            <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
            {product.comparePrice > product.price && <span className="text-lg text-gray-400 line-through ml-3">${product.comparePrice.toFixed(2)}</span>}
          </div>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <p className={"text-sm font-semibold mb-4 " + (product.countInStock > 0 ? "text-green-600" : "text-red-600")}>{product.countInStock > 0 ? "In Stock (" + product.countInStock + ")" : "Out of Stock"}</p>
          {product.countInStock > 0 && (
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border rounded-lg">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2 hover:bg-gray-100">-</button>
                <span className="px-4 py-2 border-x">{qty}</span>
                <button onClick={() => setQty(Math.min(product.countInStock, qty + 1))} className="px-3 py-2 hover:bg-gray-100">+</button>
              </div>
              <button onClick={() => { if (!user) return toast.error("Please login"); dispatch(addToCart({ productId: id, quantity: qty })); toast.success("Added!"); }} className="btn-primary flex-1 py-3 flex items-center justify-center gap-2"><FiShoppingCart /> Add to Cart</button>
              <button onClick={() => { if (!user) return toast.error("Please login"); dispatch(toggleWishlistItem(id)); toast.success(isW ? "Removed" : "Added"); }} className="p-3 border rounded-lg hover:bg-gray-50">{isW ? <FaHeart className="text-red-500 text-xl" /> : <FiHeart className="text-xl" />}</button>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-16">
        <div>
          <h3 className="text-xl font-bold mb-4">Write a Review</h3>
          {user ? (
            <form onSubmit={async (e) => { e.preventDefault(); try { await API.post("/reviews/" + id, rf); toast.success("Submitted!"); setRf({ rating: 5, title: "", comment: "" }); loadReviews(); dispatch(fetchProductById(id)); } catch(err) { toast.error(err.response?.data?.message || "Failed"); } }} className="bg-white rounded-lg p-6 shadow-sm space-y-4">
              <select value={rf.rating} onChange={(e) => setRf({...rf, rating: e.target.value})} className="input-field">{[5,4,3,2,1].map(r => <option key={r} value={r}>{r} Star{r>1&&"s"}</option>)}</select>
              <input value={rf.title} onChange={(e) => setRf({...rf, title: e.target.value})} required placeholder="Title" className="input-field" />
              <textarea value={rf.comment} onChange={(e) => setRf({...rf, comment: e.target.value})} required rows={3} placeholder="Comment" className="input-field" />
              <button type="submit" className="btn-primary w-full">Submit</button>
            </form>
          ) : <p className="bg-white rounded-lg p-6 shadow-sm"><Link to="/login" className="text-amazon-blue">Sign in</Link> to review</p>}
        </div>
        <div className="lg:col-span-2">
          <h3 className="text-xl font-bold mb-4">Reviews ({reviews.length})</h3>
          {reviews.length === 0 ? <p className="text-gray-500 bg-white rounded-lg p-6 shadow-sm">No reviews yet.</p> :
            reviews.map((r) => <div key={r._id} className="bg-white rounded-lg p-6 shadow-sm mb-4"><div className="flex items-center gap-2 mb-2"><strong className="text-sm">{r.user?.name}</strong><Rating value={r.rating} /></div><h4 className="font-semibold text-sm">{r.title}</h4><p className="text-gray-600 text-sm">{r.comment}</p></div>)
          }
        </div>
      </div>
      {related.length > 0 && <section><h3 className="text-xl font-bold mb-4">Related Products</h3><div className="grid grid-cols-2 md:grid-cols-4 gap-4">{related.map((p) => <ProductCard key={p._id} product={p} />)}</div></section>}
    </div>
  );
};
export default ProductDetail;
