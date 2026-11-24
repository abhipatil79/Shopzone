import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => { e.preventDefault(); if (query.trim()) navigate("/search?q=" + encodeURIComponent(query.trim())); };
  return (
    <form onSubmit={handleSubmit} className="flex-1 max-w-3xl">
      <div className="flex">
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products..." className="flex-1 px-4 py-2.5 rounded-l-md text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-amazon-orange border-0" />
        <button type="submit" className="bg-amazon-orange hover:bg-amazon-yellow px-4 rounded-r-md"><FiSearch className="text-amazon text-xl" /></button>
      </div>
    </form>
  );
};
export default SearchBar;
