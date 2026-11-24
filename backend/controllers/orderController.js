import asyncHandler from "express-async-handler";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export const createOrder = asyncHandler(async (req, res) => {
  const { shippingAddress, paymentMethod = "stripe" } = req.body;
  const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");
  if (!cart || cart.items.length === 0) { res.status(400); throw new Error("Cart is empty"); }

  const orderItems = cart.items.map((item) => ({
    product: item.product._id, name: item.product.name,
    image: item.product.images[0] || "", price: item.product.price, quantity: item.quantity,
  }));

  const itemsPrice = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const taxPrice = Math.round(itemsPrice * 0.08 * 100) / 100;
  const shippingPrice = itemsPrice > 100 ? 0 : 9.99;
  const totalPrice = Math.round((itemsPrice + taxPrice + shippingPrice) * 100) / 100;

  for (const item of cart.items) {
    const product = await Product.findById(item.product._id);
    if (product.countInStock < item.quantity) {
      res.status(400);
      throw new Error(product.name + " is out of stock");
    }
    product.countInStock -= item.quantity;
    await product.save();
  }

  const order = await Order.create({
    user: req.user._id, orderItems, shippingAddress, paymentMethod,
    itemsPrice, taxPrice, shippingPrice, totalPrice,
  });

  cart.items = [];
  await cart.save();
  res.status(201).json({ success: true, order });
});

export const createPaymentIntent = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) { res.status(404); throw new Error("Order not found"); }
  order.isPaid = true;
  order.paidAt = Date.now();
  order.status = "processing";
  order.paymentResult = {
    id: "mock_" + Date.now(), status: "succeeded",
    updateTime: new Date().toISOString(), email: req.user.email,
  };
  await order.save();
  res.json({ success: true, clientSecret: "mock_secret", mockPayment: true, order });
});

export const confirmPayment = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) { res.status(404); throw new Error("Order not found"); }
  order.isPaid = true;
  order.paidAt = Date.now();
  order.status = "processing";
  order.paymentResult = {
    id: req.body.paymentIntentId || "mock_" + Date.now(), status: "succeeded",
    updateTime: new Date().toISOString(), email: req.user.email,
  };
  const updated = await order.save();
  res.json({ success: true, order: updated });
});

export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json({ success: true, orders });
});

export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate("user", "name email");
  if (!order) { res.status(404); throw new Error("Order not found"); }
  if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== "admin") {
    res.status(403); throw new Error("Not authorized");
  }
  res.json({ success: true, order });
});

export const getAllOrders = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const count = await Order.countDocuments();
  const orders = await Order.find().populate("user", "name email").sort({ createdAt: -1 }).skip(limit * (page - 1)).limit(limit);
  res.json({ success: true, orders, page, pages: Math.ceil(count / limit), total: count });
});

export const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) { res.status(404); throw new Error("Order not found"); }
  order.status = req.body.status;
  if (req.body.status === "delivered") order.deliveredAt = Date.now();
  const updated = await order.save();
  res.json({ success: true, order: updated });
});
