const Loader = ({ size = "lg" }) => {
  const s = { sm: "h-5 w-5 border-2", md: "h-8 w-8 border-3", lg: "h-12 w-12 border-4" };
  return <div className="flex items-center justify-center py-12"><div className={`${s[size]} border-gray-300 border-t-amazon-orange rounded-full animate-spin`} /></div>;
};
export default Loader;
