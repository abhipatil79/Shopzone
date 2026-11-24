import express from "express";
import { protect, admin } from "../middleware/auth.js";
import { getUsers, deleteUser, toggleWishlist, getWishlist, getAdminStats } from "../controllers/userController.js";

const router = express.Router();

router.post("/wishlist", protect, toggleWishlist);
router.get("/wishlist", protect, getWishlist);
router.get("/admin/stats", protect, admin, getAdminStats);
router.get("/", protect, admin, getUsers);
router.delete("/:id", protect, admin, deleteUser);

export default router;
