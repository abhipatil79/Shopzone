import asyncHandler from "express-async-handler";
import Cart from "../models/Cart.js";

export const getCart = asyncHandler(async (req, res) => {
  let cart = await Cart.findOne({ user: req.user._id }).populate("items.product", "name price images countInStock");
  if (!cart) cart = await Cart.create({ user: req.user._id, items: [] });
  res.json({ success: true, cart });
});

export const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity = 1 } = req.body;
  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) cart = new Cart({ user: req.user._id, items: [] });
  const idx = cart.items.findIndex((item) => item.product.toString() === productId);
  if (idx > -1) cart.items[idx].quantity += quantity;
  else cart.items.push({ product: productId, quantity });
  await cart.save();
  cart = await Cart.findOne({ user: req.user._id }).populate("items.product", "name price images countInStock");
  res.json({ success: true, cart });
});

export const updateCartItem = asyncHandler(async (req, res) => {
  const { quantity } = req.body;
  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) { res.status(404); throw new Error("Cart not found"); }
  const item = cart.items.find((i) => i.product.toString() === req.params.productId);
  if (!item) { res.status(404); throw new Error("Item not in cart"); }
  item.quantity = quantity;
  await cart.save();
  cart = await Cart.findOne({ user: req.user._id }).populate("items.product", "name price images countInStock");
  res.json({ success: true, cart });
});

export const removeFromCart = asyncHandler(async (req, res) => {
  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) { res.status(404); throw new Error("Cart not found"); }
  cart.items = cart.items.filter((i) => i.product.toString() !== req.params.productId);
  await cart.save();
  cart = await Cart.findOne({ user: req.user._id }).populate("items.product", "name price images countInStock");
  res.json({ success: true, cart });
});

export const clearCart = asyncHandler(async (req, res) => {
  await Cart.findOneAndUpdate({ user: req.user._id }, { items: [] });
  res.json({ success: true, message: "Cart cleared" });
});
