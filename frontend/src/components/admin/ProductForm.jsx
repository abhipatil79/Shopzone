import { useState, useEffect } from "react";

const CATS = ["Electronics","Clothing","Home & Kitchen","Books","Sports","Beauty","Toys","Automotive","Health","Garden"];

const ProductForm = ({ product, onSubmit, onCancel, loading }) => {
  const [form, setForm] = useState({ name: "", description: "", price: "", comparePrice: "", category: "Electronics", brand: "", images: [""], countInStock: "", isFeatured: false });
  useEffect(() => { if (product) setForm({ name: product.name || "", description: product.description || "", price: product.price || "", comparePrice: product.comparePrice || "", category: product.category || "Electronics", brand: product.brand || "", images: product.images?.length ? product.images : [""], countInStock: product.countInStock ?? "", isFeatured: product.isFeatured || false }); }, [product]);

  const handleChange = (e) => { const { name, value, type, checked } = e.target; setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value })); };
  const handleSubmit = (e) => { e.preventDefault(); onSubmit({ ...form, price: Number(form.price), comparePrice: Number(form.comparePrice) || 0, countInStock: Number(form.countInStock), images: form.images.filter((u) => u.trim()) }); };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div><label className="block text-sm font-medium mb-1">Name *</label><input name="name" value={form.name} onChange={handleChange} required className="input-field" /></div>
        <div><label className="block text-sm font-medium mb-1">Brand *</label><input name="brand" value={form.brand} onChange={handleChange} required className="input-field" /></div>
      </div>
      <div><label className="block text-sm font-medium mb-1">Description *</label><textarea name="description" value={form.description} onChange={handleChange} required rows={3} className="input-field" /></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div><label className="block text-sm font-medium mb-1">Price *</label><input name="price" type="number" step="0.01" value={form.price} onChange={handleChange} required className="input-field" /></div>
        <div><label className="block text-sm font-medium mb-1">Compare Price</label><input name="comparePrice" type="number" step="0.01" value={form.comparePrice} onChange={handleChange} className="input-field" /></div>
        <div><label className="block text-sm font-medium mb-1">Stock *</label><input name="countInStock" type="number" value={form.countInStock} onChange={handleChange} required className="input-field" /></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div><label className="block text-sm font-medium mb-1">Category</label><select name="category" value={form.category} onChange={handleChange} className="input-field">{CATS.map((c) => <option key={c} value={c}>{c}</option>)}</select></div>
        <div className="flex items-center gap-2 pt-6"><input type="checkbox" name="isFeatured" checked={form.isFeatured} onChange={handleChange} /><label className="text-sm">Featured</label></div>
      </div>
      <div><label className="block text-sm font-medium mb-1">Image URL</label>{form.images.map((img, i) => <input key={i} value={img} onChange={(e) => { const imgs = [...form.images]; imgs[i] = e.target.value; setForm((p) => ({ ...p, images: imgs })); }} className="input-field mb-2" />)}<button type="button" onClick={() => setForm((p) => ({ ...p, images: [...p.images, ""] }))} className="text-sm text-amazon-blue hover:underline">+ Add image</button></div>
      <div className="flex gap-3"><button type="submit" disabled={loading} className="btn-primary">{loading ? "Saving..." : product ? "Update" : "Create"}</button>{onCancel && <button type="button" onClick={onCancel} className="btn-secondary">Cancel</button>}</div>
    </form>
  );
};
export default ProductForm;
