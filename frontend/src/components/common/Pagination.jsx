import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Pagination = ({ page, pages, onPageChange }) => {
  if (pages <= 1) return null;
  return (
    <div className="flex items-center justify-center gap-1 mt-8">
      <button onClick={() => onPageChange(page - 1)} disabled={page === 1} className="p-2 rounded-lg border disabled:opacity-40 hover:bg-gray-50"><FiChevronLeft /></button>
      {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
        <button key={p} onClick={() => onPageChange(p)} className={`px-3 py-1.5 rounded-lg text-sm font-medium ${p === page ? "bg-amazon text-white" : "border hover:bg-gray-50"}`}>{p}</button>
      ))}
      <button onClick={() => onPageChange(page + 1)} disabled={page === pages} className="p-2 rounded-lg border disabled:opacity-40 hover:bg-gray-50"><FiChevronRight /></button>
    </div>
  );
};
export default Pagination;
