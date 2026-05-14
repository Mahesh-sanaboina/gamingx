const User = require('../models/User');
const Product = require('../models/Product');

const products = [
  {
    title: 'NeoSpectre Gaming Headset',
    slug: 'neospectre-gaming-headset',
    category: 'Audio',
    description: 'Ultra-hot neon headset with spatial audio, adaptive noise cancellation, and holographic mic tones.',
    price: 119,
    stock: 34,
    images: ['https://images.unsplash.com/photo-1515902471208-275b143c4f04?auto=format&fit=crop&w=1200&q=80'],
    featured: true,
  },
  {
    title: 'HyperDrive RGB Mouse',
    slug: 'hyperdrive-rgb-mouse',
    category: 'Accessories',
    description: 'Low-latency precision mouse with customizable bio-matrix lighting and turbo grip.',
    price: 79,
    stock: 40,
    images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80'],
    featured: true,
  },
  {
    title: 'PhotonBlade Mechanical Keyboard',
    slug: 'photonblade-mechanical-keyboard',
    category: 'Accessories',
    description: 'A cyberpunk-inspired mechanical keyboard with silent travel switches and dynamic key waves.',
    price: 149,
    stock: 22,
    images: ['https://images.unsplash.com/photo-1585079548763-35cf67e067f9?auto=format&fit=crop&w=1200&q=80'],
    featured: false,
  },
  {
    title: 'Quantum Surge Gaming Chair',
    slug: 'quantum-surge-gaming-chair',
    category: 'Furniture',
    description: 'Ergonomic chair with an adaptive lumbar system, ambient glow strips, and plush support.',
    price: 259,
    stock: 12,
    images: ['https://images.unsplash.com/photo-1505740106531-4243f3831f6d?auto=format&fit=crop&w=1200&q=80'],
    featured: false,
  },
  {
    title: 'Aurora Core PC Bundle',
    slug: 'aurora-core-pc-bundle',
    category: 'Systems',
    description: 'Ready-to-play rig with liquid cooling, RGB matrix case and premium performance tuning.',
    price: 1499,
    stock: 5,
    images: ['https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80'],
    featured: true,
  },
];

const seedDemoData = async () => {
  const existingProducts = await Product.countDocuments();
  if (existingProducts === 0) {
    await Product.create(products);
    console.log('Seeded demo products');
  }

  const adminEmail = 'admin@gamingx.com';
  const admin = await User.findOne({ email: adminEmail });
  if (!admin) {
    await User.create({
      name: 'GamingX Admin',
      email: adminEmail,
      password: 'Admin@1234',
      role: 'admin',
    });
    console.log('Created admin user: admin@gamingx.com / Admin@1234');
  }
};

module.exports = { seedDemoData };
