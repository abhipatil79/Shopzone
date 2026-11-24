import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    comparePrice: { type: Number, min: 0, default: 0 },
    category: {
      type: String,
      required: true,
      enum: ["Electronics","Clothing","Home & Kitchen","Books","Sports","Beauty","Toys","Automotive","Health","Garden"],
    },
    brand: { type: String, required: true, trim: true },
    images: [{ type: String }],
    countInStock: { type: Number, required: true, default: 0, min: 0 },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    numReviews: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

productSchema.index({ name: "text", description: "text", brand: "text" });
productSchema.index({ category: 1, price: 1, rating: -1 });

const Product = mongoose.model("Product", productSchema);
export default Product;
