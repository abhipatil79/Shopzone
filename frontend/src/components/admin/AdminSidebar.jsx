import { NavLink } from "react-router-dom";
import { FiGrid, FiBox, FiShoppingBag, FiUsers, FiArrowLeft } from "react-icons/fi";

const links = [
  { to: "/admin", icon: FiGrid, label: "Dashboard", end: true },
  { to: "/admin/products", icon: FiBox, label: "Products" },
  { to: "/admin/orders", icon: FiShoppingBag, label: "Orders" },
  { to: "/admin/users", icon: FiUsers, label: "Users" },
];

const AdminSidebar = () => (
  <aside className="w-full lg:w-64 flex-shrink-0">
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h2 className="font-bold text-lg mb-4 text-amazon">Admin Panel</h2>
      <nav className="space-y-1">
        {links.map(({ to, icon: Icon, label, end }) => (
          <NavLink key={to} to={to} end={end} className={({ isActive }) => "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium " + (isActive ? "bg-amazon text-white" : "text-gray-700 hover:bg-gray-100")}>
            <Icon className="text-lg" />{label}
          </NavLink>
        ))}
      </nav>
      <hr className="my-4" />
      <NavLink to="/" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-500 hover:bg-gray-100"><FiArrowLeft /> Back to Store</NavLink>
    </div>
  </aside>
);
export default AdminSidebar;
