import express from "express";
import { protect, admin } from "../middleware/auth.js";
import { getProducts, getProductById, getFeaturedProducts, getRelatedProducts, getCategories, createProduct, updateProduct, deleteProduct } from "../controllers/productController.js";

const router = express.Router();

router.get("/categories", getCategories);
router.get("/featured", getFeaturedProducts);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.get("/:id/related", getRelatedProducts);
router.post("/", protect, admin, createProduct);
router.put("/:id", protect, admin, updateProduct);
router.delete("/:id", protect, admin, deleteProduct);

export default router;
