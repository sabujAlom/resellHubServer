import { getDb, client } from './src/config/db.js';
import dotenv from 'dotenv';

dotenv.config();

const mockProducts = [
  {
    title: "iPhone 14 Pro Max (128GB, Space Black)",
    category: "mobile phones",
    condition: "excellent",
    price: 799,
    images: ["https://images.unsplash.com/photo-1678652197831-2d180705cd2c?q=80&w=600&auto=format&fit=crop"],
    description: "Selling my iPhone 14 Pro Max in excellent condition. Battery health is at 94%. No scratches, always kept in a case with a screen protector. Includes original box and charging cable.",
    sellerId: "648e89f07b1a238f4d99c42b",
    sellerInfo: {
      name: "Sadrul Hasan",
      email: "sadrul@seller.com",
      verified: true,
      phone: "+1 (555) 123-4567",
      location: "Dhaka, Bangladesh"
    },
    status: "available",
    createdAt: new Date(Date.now() - 3600000 * 2) // 2 hours ago
  },
  {
    title: "MacBook Pro 14\" M1 Pro (16GB/512GB)",
    category: "electronics",
    condition: "excellent",
    price: 1199,
    images: ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=600&auto=format&fit=crop"],
    description: "MacBook Pro 14-inch with M1 Pro chip, 8-core CPU, 14-core GPU, 16GB RAM, and 512GB SSD. Perfect condition, used only for office tasks. AppleCare valid until end of year.",
    sellerId: "648e89f07b1a238f4d99c42b",
    sellerInfo: {
      name: "Sadrul Hasan",
      email: "sadrul@seller.com",
      verified: true,
      phone: "+1 (555) 123-4567",
      location: "Dhaka, Bangladesh"
    },
    status: "available",
    createdAt: new Date(Date.now() - 3600000 * 4) // 4 hours ago
  },
  {
    title: "Honda Civic Sedan (2018 EX)",
    category: "vehicles",
    condition: "good",
    price: 14500,
    images: ["https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=600&auto=format&fit=crop"],
    description: "2018 Honda Civic EX in good condition. Driven 42,000 miles. Single owner, clean title, and regular maintenance at authorized dealerships. Excellent fuel economy.",
    sellerId: "648e89f07b1a238f4d99c42c",
    sellerInfo: {
      name: "Jane Smith",
      email: "jane@seller.com",
      verified: true,
      phone: "+1 (555) 987-6543",
      location: "Chittagong, Bangladesh"
    },
    status: "available",
    createdAt: new Date(Date.now() - 3600000 * 10)
  },
  {
    title: "Retro Leather Biker Jacket (Large)",
    category: "fashion",
    condition: "good",
    price: 120,
    images: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=600&auto=format&fit=crop"],
    description: "Vintage genuine leather biker jacket in size L. High-quality thick leather, distressed retro look, all zippers in perfect working condition. Very stylish and warm.",
    sellerId: "648e89f07b1a238f4d99c42c",
    sellerInfo: {
      name: "Jane Smith",
      email: "jane@seller.com",
      verified: true,
      phone: "+1 (555) 987-6543",
      location: "Chittagong, Bangladesh"
    },
    status: "available",
    createdAt: new Date(Date.now() - 3600000 * 15)
  },
  {
    title: "Solid Oak Wooden Coffee Table",
    category: "furniture",
    condition: "excellent",
    price: 180,
    images: ["https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=600&auto=format&fit=crop"],
    description: "Beautiful solid oak coffee table. Handcrafted with modern design. Minimalist clean look, very heavy and sturdy. No scratches or water stains.",
    sellerId: "648e89f07b1a238f4d99c42d",
    sellerInfo: {
      name: "Dider Alam",
      email: "dider@seller.com",
      verified: false,
      phone: "+1 (555) 444-5555",
      location: "Sylhet, Bangladesh"
    },
    status: "available",
    createdAt: new Date(Date.now() - 3600000 * 24)
  },
  {
    title: "The Great Gatsby (Hardcover Collector's Edition)",
    category: "books",
    condition: "excellent",
    price: 25,
    images: ["https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop"],
    description: "Collector's hardcover edition of F. Scott Fitzgerald's Classic. Mint condition, crisp clean pages, no folds or highlights. Perfect addition to any bookshelf.",
    sellerId: "648e89f07b1a238f4d99c42d",
    sellerInfo: {
      name: "Dider Alam",
      email: "dider@seller.com",
      verified: false,
      phone: "+1 (555) 444-5555",
      location: "Sylhet, Bangladesh"
    },
    status: "available",
    createdAt: new Date(Date.now() - 3600000 * 30)
  },
  {
    title: "Wilson Pro Staff 97 V13 Tennis Racket",
    category: "sports",
    condition: "fair",
    price: 95,
    images: ["https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=600&auto=format&fit=crop"],
    description: "Wilson Pro Staff tennis racket. Weight 315g, grip size 3. Has some frame scuffs from normal match play but structurally sound. Re-strung last month with Luxilon Alu Power.",
    sellerId: "648e89f07b1a238f4d99c42e",
    sellerInfo: {
      name: "Rafiq Islam",
      email: "rafiq@seller.com",
      verified: false,
      phone: "+1 (555) 666-7777",
      location: "Khulna, Bangladesh"
    },
    status: "available",
    createdAt: new Date(Date.now() - 3600000 * 48)
  },
  {
    title: "Smart Indoor Hydroponic Garden Kit",
    category: "home & garden",
    condition: "excellent",
    price: 75,
    images: ["https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=600&auto=format&fit=crop"],
    description: "Grow fresh herbs and vegetables indoors all year round. Features smart LED grow light panels, auto water circulation pump, and alerts for low water level.",
    sellerId: "648e89f07b1a238f4d99c42e",
    sellerInfo: {
      name: "Rafiq Islam",
      email: "rafiq@seller.com",
      verified: false,
      phone: "+1 (555) 666-7777",
      location: "Khulna, Bangladesh"
    },
    status: "available",
    createdAt: new Date(Date.now() - 3600000 * 72)
  }
];

const seedDatabase = async () => {
  try {
    await client.connect();
    console.log("Connected to MongoDB database for seeding...");
    const db = getDb();
    
    // Clear existing products
    await db.collection('products').deleteMany({});
    console.log("Cleared existing products.");
    
    // Insert mock products
    const result = await db.collection('products').insertMany(mockProducts);
    console.log(`Successfully seeded ${result.insertedCount} products into database!`);
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await client.close();
    console.log("Database connection closed.");
  }
};

seedDatabase();
