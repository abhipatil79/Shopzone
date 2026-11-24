import express from "express";
import { body } from "express-validator";
import validate from "../middleware/validate.js";
import { protect } from "../middleware/auth.js";
import { register, login, getMe, updateProfile, addAddress } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", validate([
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
]), register);

router.post("/login", validate([
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").notEmpty().withMessage("Password is required"),
]), login);

router.get("/me", protect, getMe);
router.put("/profile", protect, updateProfile);
router.post("/address", protect, addAddress);

export default router;
