import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, createProduct, updateProduct, deleteProduct } from "../../store/slices/productSlice";
import AdminSidebar from "../../components/admin/AdminSidebar";
import ProductForm from "../../components/admin/ProductForm";
import Loader from "../../components/common/Loader";
import Pagination from "../../components/common/Pagination";
import toast from "react-hot-toast";
import { FiPlus, FiEdit, FiTrash2 } from "react-icons/fi";

const ManageProducts = () => {
  const dispatch = useDispatch();
  const { items, loading, page, pages } = useSelector((s) => s.products);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [fl, setFl] = useState(false);
  useEffect(() => { dispatch(fetchProducts({ page: 1, limit: 10 })); }, [dispatch]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8"><div className="flex flex-col lg:flex-row gap-6"><AdminSidebar /><div className="flex-1">
      <div className="flex justify-between mb-6"><h1 className="text-2xl font-bold">Products</h1><button onClick={() => { setShowForm(true); setEditing(null); }} className="btn-primary flex items-center gap-2"><FiPlus /> Add</button></div>
      {(showForm || editing) && <div className="bg-white rounded-lg shadow-sm p-6 mb-6"><ProductForm product={editing} onSubmit={async (d) => { setFl(true); try { if (editing) { await dispatch(updateProduct({ id: editing._id, productData: d })).unwrap(); toast.success("Updated"); setEditing(null); } else { await dispatch(createProduct(d)).unwrap(); toast.success("Created"); setShowForm(false); } dispatch(fetchProducts({ page: 1, limit: 10 })); } catch(e) { toast.error(e); } setFl(false); }} onCancel={() => { setShowForm(false); setEditing(null); }} loading={fl} /></div>}
      {loading ? <Loader /> : <div className="bg-white rounded-lg shadow-sm overflow-hidden"><table className="w-full text-sm"><thead className="bg-gray-50"><tr className="text-left"><th className="px-4 py-3">Product</th><th className="px-4 py-3">Price</th><th className="px-4 py-3">Stock</th><th className="px-4 py-3">Actions</th></tr></thead><tbody>{items.map((p) => (
        <tr key={p._id} className="border-b hover:bg-gray-50">
          <td className="px-4 py-3"><div className="flex items-center gap-3"><img src={p.images?.[0]||""} alt="" className="w-10 h-10 object-contain rounded bg-gray-50" /><span className="font-medium line-clamp-1">{p.name}</span></div></td>
          <td className="px-4 py-3">${p.price.toFixed(2)}</td>
          <td className="px-4 py-3">{p.countInStock}</td>
          <td className="px-4 py-3"><div className="flex gap-2"><button onClick={() => setEditing(p)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"><FiEdit /></button><button onClick={async () => { if (!window.confirm("Delete?")) return; try { await dispatch(deleteProduct(p._id)).unwrap(); toast.success("Deleted"); } catch(e) { toast.error(e); } }} className="p-1.5 text-red-600 hover:bg-red-50 rounded"><FiTrash2 /></button></div></td>
        </tr>
      ))}</tbody></table><div className="p-4"><Pagination page={page} pages={pages} onPageChange={(p) => dispatch(fetchProducts({ page: p, limit: 10 }))} /></div></div>}
    </div></div></div>
  );
};
export default ManageProducts;
