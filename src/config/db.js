import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.DB_URI || `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mongodb.net/?retryWrites=true&w=majority`;
console.log("DB_URI being used:", uri);

export const client = new MongoClient(uri, {
  retryWrites: false,
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Dynamic DB retrieval helper
export function getDb() {
  return client.db('resellHubDB');
}

export async function connectDB() {
  try {
    await client.connect();
    // Test the connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged deployment. Successfully connected to MongoDB Atlas!");
    return client.db('resellHubDB');
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}
