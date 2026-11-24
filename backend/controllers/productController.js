import asyncHandler from "express-async-handler";
import Product from "../models/Product.js";
import Review from "../models/Review.js";

export const getProducts = asyncHandler(async (req, res) => {
  const pageSize = parseInt(req.query.limit) || 12;
  const page = parseInt(req.query.page) || 1;
  const filter = {};

  if (req.query.category) filter.category = req.query.category;
  if (req.query.brand) filter.brand = { $regex: req.query.brand, $options: "i" };
  if (req.query.minPrice || req.query.maxPrice) {
    filter.price = {};
    if (req.query.minPrice) filter.price.$gte = Number(req.query.minPrice);
    if (req.query.maxPrice) filter.price.$lte = Number(req.query.maxPrice);
  }
  if (req.query.rating) filter.rating = { $gte: Number(req.query.rating) };
  if (req.query.search) {
    filter.$or = [
      { name: { $regex: req.query.search, $options: "i" } },
      { description: { $regex: req.query.search, $options: "i" } },
      { brand: { $regex: req.query.search, $options: "i" } },
    ];
  }

  let sort = {};
  switch (req.query.sort) {
    case "price_asc": sort = { price: 1 }; break;
    case "price_desc": sort = { price: -1 }; break;
    case "rating": sort = { rating: -1 }; break;
    default: sort = { createdAt: -1 };
  }

  const count = await Product.countDocuments(filter);
  const products = await Product.find(filter).sort(sort).skip(pageSize * (page - 1)).limit(pageSize);
  res.json({ success: true, products, page, pages: Math.ceil(count / pageSize), total: count });
});

export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) { res.status(404); throw new Error("Product not found"); }
  res.json({ success: true, product });
});

export const getFeaturedProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ isFeatured: true }).limit(8);
  res.json({ success: true, products });
});

export const getRelatedProducts = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) { res.status(404); throw new Error("Product not found"); }
  const related = await Product.find({ category: product.category, _id: { $ne: product._id } }).limit(4);
  res.json({ success: true, products: related });
});

export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Product.distinct("category");
  res.json({ success: true, categories });
});

export const createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({ success: true, product });
});

export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!product) { res.status(404); throw new Error("Product not found"); }
  res.json({ success: true, product });
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) { res.status(404); throw new Error("Product not found"); }
  await Product.findByIdAndDelete(req.params.id);
  await Review.deleteMany({ product: req.params.id });
  res.json({ success: true, message: "Product deleted" });
});
