import express from "express";
import { protect } from "../middleware/auth.js";
import { getProductReviews, createReview, deleteReview } from "../controllers/reviewController.js";

const router = express.Router();

router.get("/:productId", getProductReviews);
router.post("/:productId", protect, createReview);
router.delete("/:id", protect, deleteReview);

export default router;
