import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchFeaturedProducts, fetchProducts } from "../store/slices/productSlice";
import ProductCard from "../components/product/ProductCard";
import Loader from "../components/common/Loader";

const Home = () => {
  const dispatch = useDispatch();
  const { featured, items, loading } = useSelector((s) => s.products);
  useEffect(() => { dispatch(fetchFeaturedProducts()); dispatch(fetchProducts({ limit: 8, sort: "newest" })); }, [dispatch]);

  return (
    <div>
      <div className="bg-gradient-to-r from-amazon via-amazon-light to-amazon text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-4">Shop <span className="text-amazon-orange">Smarter</span>, Live Better</h1>
          <p className="text-gray-300 text-lg mb-8">Discover amazing products at great prices. Free shipping over $100.</p>
          <Link to="/search" className="btn-primary text-base py-3 px-8">Shop Now</Link>
        </div>
      </div>
      {featured.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex justify-between mb-6"><h2 className="text-2xl font-bold">Featured Products</h2><Link to="/search?sort=rating" className="text-sm text-amazon-blue hover:underline">See all</Link></div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">{featured.map((p) => <ProductCard key={p._id} product={p} />)}</div>
        </section>
      )}
      <section className="max-w-7xl mx-auto px-4 pb-12">
        <div className="flex justify-between mb-6"><h2 className="text-2xl font-bold">New Arrivals</h2></div>
        {loading ? <Loader /> : <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">{items.map((p) => <ProductCard key={p._id} product={p} />)}</div>}
      </section>
    </div>
  );
};
export default Home;
