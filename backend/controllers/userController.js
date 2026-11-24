import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import Product from "../models/Product.js";

export const getUsers = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const count = await User.countDocuments();
  const users = await User.find().select("-password").sort({ createdAt: -1 }).skip(limit * (page - 1)).limit(limit);
  res.json({ success: true, users, page, pages: Math.ceil(count / limit), total: count });
});

export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) { res.status(404); throw new Error("User not found"); }
  if (user.role === "admin") { res.status(400); throw new Error("Cannot delete admin"); }
  await User.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: "User deleted" });
});

export const toggleWishlist = asyncHandler(async (req, res) => {
  const { productId } = req.body;
  const user = await User.findById(req.user._id);
  const index = user.wishlist.indexOf(productId);
  if (index > -1) user.wishlist.splice(index, 1);
  else user.wishlist.push(productId);
  await user.save();
  const populated = await User.findById(req.user._id).populate("wishlist", "name price images rating");
  res.json({ success: true, wishlist: populated.wishlist });
});

export const getWishlist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate("wishlist", "name price images rating numReviews countInStock");
  res.json({ success: true, wishlist: user.wishlist });
});

export const getAdminStats = asyncHandler(async (req, res) => {
  const Order = (await import("../models/Order.js")).default;
  const totalUsers = await User.countDocuments();
  const totalProducts = await Product.countDocuments();
  const totalOrders = await Order.countDocuments();
  const revenue = await Order.aggregate([{ $match: { isPaid: true } }, { $group: { _id: null, total: { $sum: "$totalPrice" } } }]);
  const recentOrders = await Order.find().populate("user", "name email").sort({ createdAt: -1 }).limit(5);
  res.json({ success: true, stats: { totalUsers, totalProducts, totalOrders, totalRevenue: revenue[0]?.total || 0, recentOrders } });
});
