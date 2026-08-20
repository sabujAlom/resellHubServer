import app from './app.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 5000;

async function startServer() {
  try {
    // Connect to database
    await connectDB();
    
    // Start listening
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  } catch (error) {
    console.error("Critical: Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
