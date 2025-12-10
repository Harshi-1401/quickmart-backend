const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config();

const products = [
  // Fruits & Vegetables
  { name: 'Fresh Apples', category: 'fruits', price: 120, unit: '1 kg', emoji: '🍎', stock: 100 },
  { name: 'Bananas', category: 'fruits', price: 40, unit: '1 dozen', emoji: '🍌', stock: 150 },
  { name: 'Oranges', category: 'fruits', price: 80, unit: '1 kg', emoji: '🍊', stock: 80 },
  { name: 'Strawberries', category: 'fruits', price: 150, unit: '250g', emoji: '🍓', stock: 50 },
  { name: 'Mangoes', category: 'fruits', price: 200, unit: '1 kg', emoji: '🥭', stock: 60 },
  { name: 'Grapes', category: 'fruits', price: 100, unit: '500g', emoji: '🍇', stock: 70 },
  { name: 'Watermelon', category: 'fruits', price: 30, unit: '1 kg', emoji: '🍉', stock: 40 },
  { name: 'Pomegranate', category: 'fruits', price: 180, unit: '1 kg', emoji: '🍎', stock: 45 },
  
  { name: 'Tomatoes', category: 'vegetables', price: 40, unit: '1 kg', emoji: '🍅', stock: 100 },
  { name: 'Onions', category: 'vegetables', price: 30, unit: '1 kg', emoji: '🧅', stock: 200 },
  { name: 'Potatoes', category: 'vegetables', price: 25, unit: '1 kg', emoji: '🥔', stock: 150 },
  { name: 'Carrots', category: 'vegetables', price: 50, unit: '500g', emoji: '🥕', stock: 80 },
  { name: 'Broccoli', category: 'vegetables', price: 60, unit: '500g', emoji: '🥦', stock: 60 },
  { name: 'Cauliflower', category: 'vegetables', price: 40, unit: '1 pc', emoji: '🥬', stock: 70 },
  { name: 'Spinach', category: 'vegetables', price: 30, unit: '500g', emoji: '🥬', stock: 90 },
  { name: 'Capsicum', category: 'vegetables', price: 80, unit: '500g', emoji: '🫑', stock: 65 },
  { name: 'Green Beans', category: 'vegetables', price: 60, unit: '500g', emoji: '🫘', stock: 55 },
  { name: 'Cabbage', category: 'vegetables', price: 30, unit: '1 pc', emoji: '🥬', stock: 75 },

  // Dairy Products
  { name: 'Fresh Milk', category: 'dairy', price: 60, unit: '1 L', emoji: '🥛', stock: 200 },
  { name: 'Paneer', category: 'dairy', price: 90, unit: '200g', emoji: '🧀', stock: 80 },
  { name: 'Curd', category: 'dairy', price: 50, unit: '500g', emoji: '🥄', stock: 120 },
  { name: 'Butter', category: 'dairy', price: 55, unit: '100g', emoji: '🧈', stock: 100 },
  { name: 'Cheese Slices', category: 'dairy', price: 120, unit: '200g', emoji: '🧀', stock: 70 },
  { name: 'Ghee', category: 'dairy', price: 550, unit: '1 L', emoji: '🫙', stock: 50 },
  { name: 'Buttermilk', category: 'dairy', price: 30, unit: '500ml', emoji: '🥛', stock: 90 },

  // Flours & Grains
  { name: 'Wheat Flour (Atta)', category: 'flours', price: 45, unit: '1 kg', emoji: '🌾', stock: 300 },
  { name: 'Rice', category: 'flours', price: 60, unit: '1 kg', emoji: '🍚', stock: 250 },
  { name: 'Maida', category: 'flours', price: 40, unit: '1 kg', emoji: '🌾', stock: 150 },
  { name: 'Besan', category: 'flours', price: 80, unit: '500g', emoji: '🌾', stock: 100 },
  { name: 'Sooji (Rava)', category: 'flours', price: 50, unit: '500g', emoji: '🌾', stock: 120 },
  { name: 'Poha', category: 'flours', price: 60, unit: '500g', emoji: '🌾', stock: 80 },
  { name: 'Oats', category: 'flours', price: 120, unit: '1 kg', emoji: '🌾', stock: 90 },

  // Pulses & Lentils
  { name: 'Toor Dal', category: 'pulses', price: 120, unit: '1 kg', emoji: '🫘', stock: 150 },
  { name: 'Moong Dal', category: 'pulses', price: 130, unit: '1 kg', emoji: '🫘', stock: 140 },
  { name: 'Chana Dal', category: 'pulses', price: 110, unit: '1 kg', emoji: '🫘', stock: 130 },
  { name: 'Masoor Dal', category: 'pulses', price: 100, unit: '1 kg', emoji: '🫘', stock: 120 },
  { name: 'Urad Dal', category: 'pulses', price: 140, unit: '1 kg', emoji: '🫘', stock: 110 },
  { name: 'Rajma', category: 'pulses', price: 150, unit: '500g', emoji: '🫘', stock: 100 },
  { name: 'Kabuli Chana', category: 'pulses', price: 120, unit: '500g', emoji: '🫘', stock: 95 },

  // Spices
  { name: 'Turmeric Powder', category: 'spices', price: 80, unit: '100g', emoji: '🌶️', stock: 200 },
  { name: 'Red Chilli Powder', category: 'spices', price: 90, unit: '100g', emoji: '🌶️', stock: 180 },
  { name: 'Coriander Powder', category: 'spices', price: 60, unit: '100g', emoji: '🌿', stock: 170 },
  { name: 'Cumin Seeds', category: 'spices', price: 100, unit: '100g', emoji: '🌿', stock: 150 },
  { name: 'Garam Masala', category: 'spices', price: 120, unit: '100g', emoji: '🌶️', stock: 140 },
  { name: 'Black Pepper', category: 'spices', price: 150, unit: '100g', emoji: '⚫', stock: 130 },
  { name: 'Mustard Seeds', category: 'spices', price: 80, unit: '100g', emoji: '🌿', stock: 120 },
  { name: 'Cardamom', category: 'spices', price: 400, unit: '50g', emoji: '🌿', stock: 80 },
  { name: 'Cinnamon', category: 'spices', price: 200, unit: '50g', emoji: '🌿', stock: 90 },
  { name: 'Cloves', category: 'spices', price: 300, unit: '50g', emoji: '🌿', stock: 85 },

  // Cooking Essentials
  { name: 'Cooking Oil', category: 'cooking', price: 180, unit: '1 L', emoji: '🫗', stock: 200 },
  { name: 'Mustard Oil', category: 'cooking', price: 200, unit: '1 L', emoji: '🫗', stock: 150 },
  { name: 'Salt', category: 'cooking', price: 20, unit: '1 kg', emoji: '🧂', stock: 300 },
  { name: 'Sugar', category: 'cooking', price: 45, unit: '1 kg', emoji: '🍬', stock: 250 },
  { name: 'Tea Powder', category: 'cooking', price: 250, unit: '500g', emoji: '☕', stock: 180 },
  { name: 'Coffee Powder', category: 'cooking', price: 350, unit: '200g', emoji: '☕', stock: 120 },

  // Snacks & Beverages
  { name: 'Biscuits', category: 'snacks', price: 30, unit: '200g', emoji: '🍪', stock: 200 },
  { name: 'Namkeen', category: 'snacks', price: 50, unit: '200g', emoji: '🥨', stock: 150 },
  { name: 'Chips', category: 'snacks', price: 20, unit: '100g', emoji: '🍟', stock: 180 },
  { name: 'Chocolate', category: 'snacks', price: 40, unit: '100g', emoji: '🍫', stock: 160 },
  { name: 'Soft Drink', category: 'beverages', price: 40, unit: '750ml', emoji: '🥤', stock: 200 },
  { name: 'Fruit Juice', category: 'beverages', price: 80, unit: '1 L', emoji: '🧃', stock: 120 },
  { name: 'Mineral Water', category: 'beverages', price: 20, unit: '1 L', emoji: '💧', stock: 300 },

  // Personal Care
  { name: 'Soap', category: 'personal', price: 35, unit: '125g', emoji: '🧼', stock: 200 },
  { name: 'Shampoo', category: 'personal', price: 180, unit: '200ml', emoji: '🧴', stock: 150 },
  { name: 'Toothpaste', category: 'personal', price: 80, unit: '200g', emoji: '🪥', stock: 180 },
  { name: 'Detergent', category: 'personal', price: 150, unit: '1 kg', emoji: '🧺', stock: 120 },

  // Bakery
  { name: 'Bread', category: 'bakery', price: 35, unit: '400g', emoji: '🍞', stock: 100 },
  { name: 'Pav', category: 'bakery', price: 20, unit: '6 pcs', emoji: '🥖', stock: 80 },
  { name: 'Cake', category: 'bakery', price: 250, unit: '500g', emoji: '🎂', stock: 40 },
  { name: 'Cookies', category: 'bakery', price: 60, unit: '200g', emoji: '🍪', stock: 90 }
];

async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert new products
    await Product.insertMany(products);
    console.log('Products seeded successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
}

seedProducts();