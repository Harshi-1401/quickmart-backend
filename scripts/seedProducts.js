const mongoose = require('mongoose');
const Product = require('../models/Product');
const { initialProducts } = require('../data/products');
require('dotenv').config();

async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert new products
    await Product.insertMany(initialProducts);
    console.log('Products seeded successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
}

seedProducts();