import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/slices/productSlice";
import ProductCard from "../components/product/ProductCard";
import ProductFilters from "../components/product/ProductFilters";
import Pagination from "../components/common/Pagination";
import Loader from "../components/common/Loader";

const SearchResults = () => {
  const [sp, setSp] = useSearchParams();
  const dispatch = useDispatch();
  const { items, loading, page, pages, total } = useSelector((s) => s.products);
  const [filters, setFilters] = useState({ search: sp.get("q") || "", category: sp.get("category") || "", minPrice: sp.get("minPrice") || "", maxPrice: sp.get("maxPrice") || "", rating: sp.get("rating") || "", sort: sp.get("sort") || "newest", page: sp.get("page") || 1 });

  useEffect(() => { setFilters({ search: sp.get("q") || "", category: sp.get("category") || "", minPrice: sp.get("minPrice") || "", maxPrice: sp.get("maxPrice") || "", rating: sp.get("rating") || "", sort: sp.get("sort") || "newest", page: sp.get("page") || 1 }); }, [sp]);

  useEffect(() => {
    const p = {}; if (filters.search) p.search = filters.search; if (filters.category) p.category = filters.category;
    if (filters.minPrice) p.minPrice = filters.minPrice; if (filters.maxPrice) p.maxPrice = filters.maxPrice;
    if (filters.rating) p.rating = filters.rating; if (filters.sort) p.sort = filters.sort; p.page = filters.page; p.limit = 12;
    dispatch(fetchProducts(p));
  }, [filters, dispatch]);

  const handleFilter = (nf) => { const u = { ...filters, ...nf }; setFilters(u); const p = new URLSearchParams(); if (u.search) p.set("q", u.search); if (u.category) p.set("category", u.category); if (u.sort) p.set("sort", u.sort); setSp(p); };
  const handleClear = () => { const c = { ...filters, category: "", minPrice: "", maxPrice: "", rating: "", sort: "newest", page: 1 }; setFilters(c); setSp(c.search ? { q: c.search } : {}); };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-2">{filters.search ? 'Results for "' + filters.search + '"' : filters.category || "All Products"}</h1>
      <p className="text-gray-500 text-sm mb-6">{total} products found</p>
      <div className="flex flex-col lg:flex-row gap-6">
        <ProductFilters filters={filters} onFilterChange={handleFilter} onClear={handleClear} />
        <div className="flex-1">
          {loading ? <Loader /> : items.length === 0 ? <div className="text-center py-20 bg-white rounded-lg"><p className="text-gray-500">No products found</p></div> :
            <><div className="grid grid-cols-2 md:grid-cols-3 gap-4">{items.map((p) => <ProductCard key={p._id} product={p} />)}</div><Pagination page={page} pages={pages} onPageChange={(p) => handleFilter({ page: p })} /></>
          }
        </div>
      </div>
    </div>
  );
};
export default SearchResults;
