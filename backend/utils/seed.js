import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";
import Product from "../models/Product.js";

dotenv.config();

const users = [
  { name: "Admin User", email: "admin@example.com", password: "password123", role: "admin" },
  { name: "John Doe", email: "john@example.com", password: "password123", role: "user" },
];

const products = [
  { name: "Apple iPhone 15 Pro Max", description: "The iPhone 15 Pro Max features titanium design, A17 Pro chip, 48MP camera system with 5x zoom.", price: 1199.99, comparePrice: 1299.99, category: "Electronics", brand: "Apple", images: ["https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500"], countInStock: 50, rating: 4.8, numReviews: 230, isFeatured: true, tags: ["smartphone"] },
  { name: "Samsung 65 inch 4K QLED Smart TV", description: "Experience breathtaking 4K resolution with Samsung QLED technology.", price: 899.99, comparePrice: 1199.99, category: "Electronics", brand: "Samsung", images: ["https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500"], countInStock: 30, rating: 4.5, numReviews: 180, isFeatured: true, tags: ["tv"] },
  { name: "Sony WH-1000XM5 Headphones", description: "Industry-leading noise canceling headphones with 30 hours battery life.", price: 349.99, comparePrice: 399.99, category: "Electronics", brand: "Sony", images: ["https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500"], countInStock: 100, rating: 4.7, numReviews: 420, isFeatured: true, tags: ["headphones"] },
  { name: "Nike Air Max 270 Running Shoes", description: "The Nike Air Max 270 delivers visible cushioning under every step.", price: 149.99, comparePrice: 179.99, category: "Clothing", brand: "Nike", images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"], countInStock: 200, rating: 4.4, numReviews: 310, isFeatured: false, tags: ["shoes"] },
  { name: "Levis 501 Original Fit Jeans", description: "The original jean with iconic straight fit and signature button fly.", price: 69.99, comparePrice: 89.99, category: "Clothing", brand: "Levis", images: ["https://images.unsplash.com/photo-1542272604-787c3835535d?w=500"], countInStock: 150, rating: 4.3, numReviews: 560, isFeatured: false, tags: ["jeans"] },
  { name: "Instant Pot Duo 7-in-1 Pressure Cooker", description: "7 appliances in 1: pressure cooker, slow cooker, rice cooker, steamer.", price: 89.99, comparePrice: 119.99, category: "Home & Kitchen", brand: "Instant Pot", images: ["https://images.unsplash.com/photo-1585515320310-259814833e62?w=500"], countInStock: 75, rating: 4.6, numReviews: 890, isFeatured: true, tags: ["kitchen"] },
  { name: "Atomic Habits by James Clear", description: "A revolutionary system for getting 1 percent better every day.", price: 16.99, comparePrice: 27.99, category: "Books", brand: "Penguin", images: ["https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500"], countInStock: 500, rating: 4.9, numReviews: 1200, isFeatured: true, tags: ["self-help"] },
  { name: "YETI Rambler 20 oz Tumbler", description: "Double-wall vacuum insulated tumbler for hot or cold drinks.", price: 34.99, comparePrice: 39.99, category: "Home & Kitchen", brand: "YETI", images: ["https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500"], countInStock: 300, rating: 4.8, numReviews: 670, isFeatured: false, tags: ["tumbler"] },
  { name: "Yoga Mat Premium 6mm Non-Slip", description: "High-density exercise mat with non-slip texture for yoga and pilates.", price: 29.99, comparePrice: 49.99, category: "Sports", brand: "Gaiam", images: ["https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500"], countInStock: 250, rating: 4.5, numReviews: 340, isFeatured: false, tags: ["yoga"] },
  { name: "MacBook Air M3 13-inch", description: "Supercharged by M3 chip. Up to 18 hours battery. Liquid Retina display.", price: 1099.00, comparePrice: 1199.00, category: "Electronics", brand: "Apple", images: ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500"], countInStock: 40, rating: 4.9, numReviews: 150, isFeatured: true, tags: ["laptop"] },
  { name: "The North Face Puffer Jacket", description: "Warm lightweight insulated jacket with water-repellent finish.", price: 199.99, comparePrice: 249.99, category: "Clothing", brand: "The North Face", images: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500"], countInStock: 80, rating: 4.6, numReviews: 220, isFeatured: false, tags: ["jacket"] },
  { name: "Dyson V15 Detect Cordless Vacuum", description: "Most powerful cordless vacuum with laser dust detection. HEPA filtration.", price: 649.99, comparePrice: 749.99, category: "Home & Kitchen", brand: "Dyson", images: ["https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500"], countInStock: 25, rating: 4.7, numReviews: 190, isFeatured: true, tags: ["vacuum"] },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
    await User.deleteMany();
    await Product.deleteMany();
    const createdUsers = await User.create(users);
    console.log("Seeded " + createdUsers.length + " users");
    const createdProducts = await Product.create(products);
    console.log("Seeded " + createdProducts.length + " products");
    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Seed error: " + error.message);
    process.exit(1);
  }
};

seedDB();
