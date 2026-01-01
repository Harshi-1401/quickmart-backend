const initialProducts = [
  // Fruits & Vegetables
  { id: 1, name: 'Fresh Apples', category: 'fruits', price: 120, unit: '1 kg', emoji: '🍎', stock: 100 },
  { id: 2, name: 'Bananas', category: 'fruits', price: 40, unit: '1 dozen', emoji: '🍌', stock: 150 },
  { id: 3, name: 'Oranges', category: 'fruits', price: 80, unit: '1 kg', emoji: '🍊', stock: 80 },
  { id: 4, name: 'Strawberries', category: 'fruits', price: 150, unit: '250g', emoji: '🍓', stock: 50 },
  { id: 5, name: 'Mangoes', category: 'fruits', price: 200, unit: '1 kg', emoji: '🥭', stock: 60 },
  { id: 6, name: 'Grapes', category: 'fruits', price: 100, unit: '500g', emoji: '🍇', stock: 70 },
  { id: 7, name: 'Watermelon', category: 'fruits', price: 30, unit: '1 kg', emoji: '🍉', stock: 40 },
  { id: 8, name: 'Pomegranate', category: 'fruits', price: 180, unit: '1 kg', emoji: '🍎', stock: 45 },
  
  { id: 9, name: 'Tomatoes', category: 'vegetables', price: 40, unit: '1 kg', emoji: '🍅', stock: 100 },
  { id: 10, name: 'Onions', category: 'vegetables', price: 30, unit: '1 kg', emoji: '🧅', stock: 200 },
  { id: 11, name: 'Potatoes', category: 'vegetables', price: 25, unit: '1 kg', emoji: '🥔', stock: 150 },
  { id: 12, name: 'Carrots', category: 'vegetables', price: 50, unit: '500g', emoji: '🥕', stock: 80 },
  { id: 13, name: 'Broccoli', category: 'vegetables', price: 60, unit: '500g', emoji: '🥦', stock: 60 },
  { id: 14, name: 'Cauliflower', category: 'vegetables', price: 40, unit: '1 pc', emoji: '🥬', stock: 70 },
  { id: 15, name: 'Spinach', category: 'vegetables', price: 30, unit: '500g', emoji: '🥬', stock: 90 },
  { id: 16, name: 'Capsicum', category: 'vegetables', price: 80, unit: '500g', emoji: '🫑', stock: 65 },
  { id: 17, name: 'Green Beans', category: 'vegetables', price: 60, unit: '500g', emoji: '🫘', stock: 55 },
  { id: 18, name: 'Cabbage', category: 'vegetables', price: 30, unit: '1 pc', emoji: '🥬', stock: 75 },

  // Dairy Products
  { id: 19, name: 'Fresh Milk', category: 'dairy', price: 60, unit: '1 L', emoji: '🥛', stock: 200 },
  { id: 20, name: 'Paneer', category: 'dairy', price: 90, unit: '200g', emoji: '🧀', stock: 80 },
  { id: 21, name: 'Curd', category: 'dairy', price: 50, unit: '500g', emoji: '🥄', stock: 120 },
  { id: 22, name: 'Butter', category: 'dairy', price: 55, unit: '100g', emoji: '🧈', stock: 100 },
  { id: 23, name: 'Cheese Slices', category: 'dairy', price: 120, unit: '200g', emoji: '🧀', stock: 70 },
  { id: 24, name: 'Ghee', category: 'dairy', price: 550, unit: '1 L', emoji: '🫙', stock: 50 },
  { id: 25, name: 'Buttermilk', category: 'dairy', price: 30, unit: '500ml', emoji: '🥛', stock: 90 },

  // Flours & Grains
  { id: 26, name: 'Wheat Flour (Atta)', category: 'flours', price: 45, unit: '1 kg', emoji: '🌾', stock: 300 },
  { id: 27, name: 'Rice', category: 'flours', price: 60, unit: '1 kg', emoji: '🍚', stock: 250 },
  { id: 28, name: 'Maida', category: 'flours', price: 40, unit: '1 kg', emoji: '🌾', stock: 150 },
  { id: 29, name: 'Besan', category: 'flours', price: 80, unit: '500g', emoji: '🌾', stock: 100 },
  { id: 30, name: 'Sooji (Rava)', category: 'flours', price: 50, unit: '500g', emoji: '🌾', stock: 120 },
  { id: 31, name: 'Poha', category: 'flours', price: 60, unit: '500g', emoji: '🌾', stock: 80 },
  { id: 32, name: 'Oats', category: 'flours', price: 120, unit: '1 kg', emoji: '🌾', stock: 90 },

  // Pulses & Lentils
  { id: 33, name: 'Toor Dal', category: 'pulses', price: 120, unit: '1 kg', emoji: '🫘', stock: 150 },
  { id: 34, name: 'Moong Dal', category: 'pulses', price: 130, unit: '1 kg', emoji: '🫘', stock: 140 },
  { id: 35, name: 'Chana Dal', category: 'pulses', price: 110, unit: '1 kg', emoji: '🫘', stock: 130 },
  { id: 36, name: 'Masoor Dal', category: 'pulses', price: 100, unit: '1 kg', emoji: '🫘', stock: 120 },
  { id: 37, name: 'Urad Dal', category: 'pulses', price: 140, unit: '1 kg', emoji: '🫘', stock: 110 },
  { id: 38, name: 'Rajma', category: 'pulses', price: 150, unit: '500g', emoji: '🫘', stock: 100 },
  { id: 39, name: 'Kabuli Chana', category: 'pulses', price: 120, unit: '500g', emoji: '🫘', stock: 95 },

  // Spices
  { id: 40, name: 'Turmeric Powder', category: 'spices', price: 80, unit: '100g', emoji: '🌶️', stock: 200 },
  { id: 41, name: 'Red Chilli Powder', category: 'spices', price: 90, unit: '100g', emoji: '🌶️', stock: 180 },
  { id: 42, name: 'Coriander Powder', category: 'spices', price: 60, unit: '100g', emoji: '🌿', stock: 170 },
  { id: 43, name: 'Cumin Seeds', category: 'spices', price: 100, unit: '100g', emoji: '🌿', stock: 150 },
  { id: 44, name: 'Garam Masala', category: 'spices', price: 120, unit: '100g', emoji: '🌶️', stock: 140 },
  { id: 45, name: 'Black Pepper', category: 'spices', price: 150, unit: '100g', emoji: '⚫', stock: 130 },
  { id: 46, name: 'Mustard Seeds', category: 'spices', price: 80, unit: '100g', emoji: '🌿', stock: 120 },
  { id: 47, name: 'Cardamom', category: 'spices', price: 400, unit: '50g', emoji: '🌿', stock: 80 },
  { id: 48, name: 'Cinnamon', category: 'spices', price: 200, unit: '50g', emoji: '🌿', stock: 90 },
  { id: 49, name: 'Cloves', category: 'spices', price: 300, unit: '50g', emoji: '🌿', stock: 85 },

  // Cooking Essentials
  { id: 50, name: 'Cooking Oil', category: 'cooking', price: 180, unit: '1 L', emoji: '🫗', stock: 200 },
  { id: 51, name: 'Mustard Oil', category: 'cooking', price: 200, unit: '1 L', emoji: '🫗', stock: 150 },
  { id: 52, name: 'Salt', category: 'cooking', price: 20, unit: '1 kg', emoji: '🧂', stock: 300 },
  { id: 53, name: 'Sugar', category: 'cooking', price: 45, unit: '1 kg', emoji: '🍬', stock: 250 },
  { id: 54, name: 'Tea Powder', category: 'cooking', price: 250, unit: '500g', emoji: '☕', stock: 180 },
  { id: 55, name: 'Coffee Powder', category: 'cooking', price: 350, unit: '200g', emoji: '☕', stock: 120 },

  // Snacks & Beverages
  { id: 56, name: 'Biscuits', category: 'snacks', price: 30, unit: '200g', emoji: '🍪', stock: 200 },
  { id: 57, name: 'Namkeen', category: 'snacks', price: 50, unit: '200g', emoji: '🥨', stock: 150 },
  { id: 58, name: 'Chips', category: 'snacks', price: 20, unit: '100g', emoji: '🍟', stock: 180 },
  { id: 59, name: 'Chocolate', category: 'snacks', price: 40, unit: '100g', emoji: '🍫', stock: 160 },
  { id: 60, name: 'Soft Drink', category: 'beverages', price: 40, unit: '750ml', emoji: '🥤', stock: 200 },
  { id: 61, name: 'Fruit Juice', category: 'beverages', price: 80, unit: '1 L', emoji: '🧃', stock: 120 },
  { id: 62, name: 'Mineral Water', category: 'beverages', price: 20, unit: '1 L', emoji: '💧', stock: 300 },

  // Personal Care
  { id: 63, name: 'Soap', category: 'personal', price: 35, unit: '125g', emoji: '🧼', stock: 200 },
  { id: 64, name: 'Shampoo', category: 'personal', price: 180, unit: '200ml', emoji: '🧴', stock: 150 },
  { id: 65, name: 'Toothpaste', category: 'personal', price: 80, unit: '200g', emoji: '🪥', stock: 180 },
  { id: 66, name: 'Detergent', category: 'personal', price: 150, unit: '1 kg', emoji: '🧺', stock: 120 },

  // Bakery
  { id: 67, name: 'Bread', category: 'bakery', price: 35, unit: '400g', emoji: '🍞', stock: 100 },
  { id: 68, name: 'Pav', category: 'bakery', price: 20, unit: '6 pcs', emoji: '🥖', stock: 80 },
  { id: 69, name: 'Cake', category: 'bakery', price: 250, unit: '500g', emoji: '🎂', stock: 40 },
  { id: 70, name: 'Cookies', category: 'bakery', price: 60, unit: '200g', emoji: '🍪', stock: 90 }
];

const categories = [
  { id: 'all', name: 'All Products', emoji: '📦' },
  { id: 'fruits', name: 'Fruits', emoji: '🍎' },
  { id: 'vegetables', name: 'Vegetables', emoji: '🥕' },
  { id: 'dairy', name: 'Dairy', emoji: '🥛' },
  { id: 'flours', name: 'Flours & Grains', emoji: '🌾' },
  { id: 'pulses', name: 'Pulses & Lentils', emoji: '🫘' },
  { id: 'spices', name: 'Spices', emoji: '🌶️' },
  { id: 'cooking', name: 'Cooking Essentials', emoji: '🫗' },
  { id: 'snacks', name: 'Snacks', emoji: '🍪' },
  { id: 'beverages', name: 'Beverages', emoji: '🥤' },
  { id: 'personal', name: 'Personal Care', emoji: '🧼' },
  { id: 'bakery', name: 'Bakery', emoji: '🍞' }
];

module.exports = { initialProducts, categories };