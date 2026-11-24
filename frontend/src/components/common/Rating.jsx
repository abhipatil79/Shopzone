import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Rating = ({ value, count, size = "sm" }) => {
  const sizeClass = size === "sm" ? "text-sm" : "text-base";
  const stars = Array.from({ length: 5 }, (_, i) => {
    const num = i + 1;
    if (value >= num) return <FaStar key={i} className="text-amazon-orange" />;
    if (value >= num - 0.5) return <FaStarHalfAlt key={i} className="text-amazon-orange" />;
    return <FaRegStar key={i} className="text-amazon-orange" />;
  });
  return <div className={`flex items-center gap-1 ${sizeClass}`}><div className="flex">{stars}</div>{count !== undefined && <span className="text-amazon-blue text-xs ml-1">({count.toLocaleString()})</span>}</div>;
};
export default Rating;
