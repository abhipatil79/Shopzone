import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FiShoppingCart, FiHeart, FiUser, FiLogOut, FiPackage, FiSettings } from "react-icons/fi";
import { useState, useRef, useEffect } from "react";
import { logout } from "../../store/slices/authSlice";
import { resetCart } from "../../store/slices/cartSlice";
import { resetWishlist } from "../../store/slices/wishlistSlice";
import SearchBar from "../common/SearchBar";

const Header = () => {
  const { user } = useSelector((s) => s.auth);
  const { items: cartItems } = useSelector((s) => s.cart);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartCount = cartItems.reduce((sum, i) => sum + (i.quantity || 0), 0);

  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const handleLogout = () => { dispatch(logout()); dispatch(resetCart()); dispatch(resetWishlist()); setOpen(false); navigate("/"); };

  return (
    <header className="bg-amazon text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center gap-4">
        <Link to="/" className="flex-shrink-0"><span className="text-2xl font-bold">Shop<span className="text-amazon-orange">Zone</span></span></Link>
        <SearchBar />
        <nav className="flex items-center gap-3">
          {user ? (
            <div className="relative" ref={ref}>
              <button onClick={() => setOpen(!open)} className="flex flex-col items-start text-xs hover:text-amazon-orange px-2 py-1">
                <span className="text-gray-300">Hello, {user.name.split(" ")[0]}</span>
                <span className="font-bold text-sm">Account ▾</span>
              </button>
              {open && (
                <div className="absolute right-0 top-full mt-1 w-56 bg-white rounded-lg shadow-xl border text-gray-800 py-2 z-50">
                  <Link to="/profile" onClick={() => setOpen(false)} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-sm"><FiUser /> Profile</Link>
                  <Link to="/orders" onClick={() => setOpen(false)} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-sm"><FiPackage /> Orders</Link>
                  {user.role === "admin" && <Link to="/admin" onClick={() => setOpen(false)} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-sm"><FiSettings /> Admin</Link>}
                  <hr className="my-1" />
                  <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-sm w-full text-left text-red-600"><FiLogOut /> Sign Out</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="flex flex-col items-start text-xs hover:text-amazon-orange px-2 py-1">
              <span className="text-gray-300">Hello, Sign in</span>
              <span className="font-bold text-sm">Account</span>
            </Link>
          )}
          <Link to="/wishlist" className="flex items-center gap-1 hover:text-amazon-orange px-2 py-1"><FiHeart className="text-xl" /></Link>
          <Link to="/cart" className="flex items-center gap-1 hover:text-amazon-orange px-2 py-1 relative">
            <div className="relative">
              <FiShoppingCart className="text-2xl" />
              {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-amazon-orange text-amazon text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">{cartCount}</span>}
            </div>
          </Link>
        </nav>
      </div>
      <div className="bg-amazon-light px-4 py-1.5">
        <div className="max-w-7xl mx-auto flex items-center gap-4 text-sm overflow-x-auto">
          {["Electronics","Clothing","Home & Kitchen","Books","Sports","Beauty"].map(c => (
            <Link key={c} to={"/search?category=" + encodeURIComponent(c)} className="whitespace-nowrap hover:text-amazon-orange">{c}</Link>
          ))}
        </div>
      </div>
    </header>
  );
};
export default Header;
