import express from "express";
import { protect, admin } from "../middleware/auth.js";
import { createOrder, createPaymentIntent, confirmPayment, getMyOrders, getOrderById, getAllOrders, updateOrderStatus } from "../controllers/orderController.js";

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/mine", protect, getMyOrders);
router.get("/:id", protect, getOrderById);
router.post("/:id/pay", protect, createPaymentIntent);
router.put("/:id/confirm", protect, confirmPayment);
router.get("/", protect, admin, getAllOrders);
router.put("/:id/status", protect, admin, updateOrderStatus);

export default router;
