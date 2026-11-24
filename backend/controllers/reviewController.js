import asyncHandler from "express-async-handler";
import Review from "../models/Review.js";
import Product from "../models/Product.js";

export const getProductReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ product: req.params.productId }).populate("user", "name").sort({ createdAt: -1 });
  res.json({ success: true, reviews });
});

export const createReview = asyncHandler(async (req, res) => {
  const { rating, title, comment } = req.body;
  const existing = await Review.findOne({ user: req.user._id, product: req.params.productId });
  if (existing) { res.status(400); throw new Error("Already reviewed"); }
  const review = await Review.create({ user: req.user._id, product: req.params.productId, rating: Number(rating), title, comment });
  const reviews = await Review.find({ product: req.params.productId });
  const product = await Product.findById(req.params.productId);
  product.numReviews = reviews.length;
  product.rating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  await product.save();
  const populated = await Review.findById(review._id).populate("user", "name");
  res.status(201).json({ success: true, review: populated });
});

export const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) { res.status(404); throw new Error("Review not found"); }
  if (review.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
    res.status(403); throw new Error("Not authorized");
  }
  const productId = review.product;
  await Review.findByIdAndDelete(req.params.id);
  const reviews = await Review.find({ product: productId });
  const product = await Product.findById(productId);
  product.numReviews = reviews.length;
  product.rating = reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;
  await product.save();
  res.json({ success: true, message: "Review deleted" });
});
