import { useState } from "react";

const CATS = ["Electronics","Clothing","Home & Kitchen","Books","Sports","Beauty","Toys","Automotive","Health","Garden"];

const ProductFilters = ({ filters, onFilterChange, onClear }) => {
  const [price, setPrice] = useState({ min: filters.minPrice || "", max: filters.maxPrice || "" });

  return (
    <aside className="w-full lg:w-64 flex-shrink-0">
      <div className="bg-white rounded-lg shadow-sm p-5">
        <div className="flex items-center justify-between mb-4"><h3 className="font-bold text-lg">Filters</h3><button onClick={onClear} className="text-sm text-amazon-blue hover:underline">Clear</button></div>
        <div className="mb-6"><h4 className="font-semibold text-sm mb-2">Category</h4>
          {CATS.map((c) => <label key={c} className="flex items-center gap-2 text-sm cursor-pointer mb-1"><input type="checkbox" checked={filters.category === c} onChange={() => onFilterChange({ category: filters.category === c ? "" : c, page: 1 })} className="rounded" />{c}</label>)}
        </div>
        <div className="mb-6"><h4 className="font-semibold text-sm mb-2">Price</h4>
          <div className="flex gap-2"><input type="number" placeholder="Min" value={price.min} onChange={(e) => setPrice({...price, min: e.target.value})} className="input-field text-xs py-1.5" /><input type="number" placeholder="Max" value={price.max} onChange={(e) => setPrice({...price, max: e.target.value})} className="input-field text-xs py-1.5" /></div>
          <button onClick={() => onFilterChange({ minPrice: price.min, maxPrice: price.max, page: 1 })} className="mt-2 text-xs btn-secondary py-1 px-3">Apply</button>
        </div>
        <div className="mb-6"><h4 className="font-semibold text-sm mb-2">Rating</h4>
          {[4,3,2,1].map((s) => <label key={s} className="flex items-center gap-2 text-sm cursor-pointer mb-1"><input type="radio" name="rating" checked={Number(filters.rating) === s} onChange={() => onFilterChange({ rating: filters.rating == s ? "" : s, page: 1 })} />{s}★ & up</label>)}
        </div>
        <div><h4 className="font-semibold text-sm mb-2">Sort</h4>
          <select value={filters.sort || "newest"} onChange={(e) => onFilterChange({ sort: e.target.value, page: 1 })} className="input-field text-xs py-1.5">
            <option value="newest">Newest</option><option value="price_asc">Price: Low-High</option><option value="price_desc">Price: High-Low</option><option value="rating">Rating</option>
          </select>
        </div>
      </div>
    </aside>
  );
};
export default ProductFilters;
