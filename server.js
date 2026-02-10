const adminSetup = require('./routes/adminSetup');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const userRoutes = require('./routes/users');

const app = express();

// Middleware
const corsOptions = {
  origin: [
    'http://localhost:3000', // Local development
    'https://quickmart-c77puv6q2-harshinis-projects-99997810.vercel.app',
    'https://quickmart-harshinis-projects-99997810.vercel.app',
    'https://quickmart-gamma.vercel.app',
    /^https:\/\/quickmart-.*\.vercel\.app$/, // Any Vercel deployment with quickmart prefix
    /^https:\/\/.*\.vercel\.app$/, // All Vercel deployments
    'https://quickmart-backend-tvuf.onrender.com'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/setup", adminSetup);

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('✅ Connected to MongoDB Atlas');
  console.log('📍 Database:', mongoose.connection.name);
  
  // Auto-seed database if empty (for first deployment)
  await autoSeedDatabase();
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});

// Auto-seed function
async function autoSeedDatabase() {
  try {
    const Product = require('./models/Product');
    const User = require('./models/User');
    
    // Check if products exist
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      console.log('📦 Database is empty, seeding products...');
      
      // Import and run seed data
      const { initialProducts } = require('../src/data/products');
      await Product.insertMany(initialProducts);
      console.log(`✅ Seeded ${initialProducts.length} products`);
    } else {
      console.log(`📦 Found ${productCount} products in database`);
    }
    
    // Check if admin user exists
    const adminExists = await User.findOne({ role: 'admin' });
    if (!adminExists) {
      console.log('👤 Creating admin user...');
      
      const adminUser = new User({
        name: 'Admin',
        email: 'admin@quickmart.com',
        password: 'admin123',
        phone: '9876543210',
        address: 'QuickMart HQ',
        role: 'admin'
      });
      
      await adminUser.save();
      console.log('✅ Admin user created');
    } else {
      console.log('👤 Admin user already exists');
    }
    
  } catch (error) {
    console.error('❌ Auto-seed error:', error.message);
  }
}

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/setup', require('./routes/setup'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'QuickMart API is running!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    version: '1.0.1' // Updated version to trigger redeploy
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'QuickMart API Server',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      products: '/api/products',
      orders: '/api/orders',
      users: '/api/users'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'production' ? {} : err.message
  });
});

// Handle 404 routes
app.use('*', (req, res) => {
  res.status(404).json({ 
    message: 'Route not found',
    availableRoutes: ['/api/health', '/api/auth', '/api/products', '/api/orders', '/api/users']
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 QuickMart API Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/api/health`);
});
