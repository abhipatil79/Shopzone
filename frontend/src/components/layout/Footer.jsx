import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-amazon text-gray-300 mt-auto">
    <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="w-full bg-amazon-light hover:bg-gray-600 text-white text-sm py-3">Back to top</button>
    <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
      <div><h4 className="text-white font-bold mb-3">Get to Know Us</h4><Link to="/" className="block hover:text-white">About</Link></div>
      <div><h4 className="text-white font-bold mb-3">Customer Service</h4><Link to="/orders" className="block hover:text-white">Orders</Link></div>
      <div><h4 className="text-white font-bold mb-3">Quick Links</h4><Link to="/cart" className="block hover:text-white">Cart</Link></div>
      <div><h4 className="text-white font-bold mb-3">ShopZone</h4><p>Your everything store.</p></div>
    </div>
    <div className="border-t border-gray-700 py-4 text-center text-xs text-gray-500">© 2024 ShopZone. All rights reserved.</div>
  </footer>
);
export default Footer;
