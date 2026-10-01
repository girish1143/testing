/**
 * Database & Environment Configuration for Grand Aurelia Resort & Suites
 * Reads MongoDB parameters from .env and exposes connection helpers.
 */

export const DB_CONFIG = {
  // MongoDB database name from Vite environment or fallback
  databaseName: import.meta.env?.VITE_MONGODB_DATABASE || 'grand_aurelia_hotel',
  
  // API base URL if connected to an external Express / MongoDB backend
  apiBaseUrl: import.meta.env?.VITE_API_BASE_URL || 'http://localhost:5000/api',
  
  // Storage mode
  enableFallback: import.meta.env?.VITE_ENABLE_STORAGE_FALLBACK !== 'false',
  
  // Display name
  hotelName: import.meta.env?.VITE_APP_NAME || 'Grand Aurelia Resort & Suites',
};

/**
 * Example Node.js / Express Mongoose connection snippet (for backend usage):
 * 
 * ```javascript
 * import mongoose from 'mongoose';
 * import dotenv from 'dotenv';
 * dotenv.config();
 * 
 * const connectDB = async () => {
 *   try {
 *     const conn = await mongoose.connect(process.env.MONGODB_URI);
 *     console.log(`MongoDB Connected: ${conn.connection.host}`);
 *   } catch (error) {
 *     console.error(`MongoDB Connection Error: ${error.message}`);
 *     process.exit(1);
 *   }
 * };
 * 
 * export default connectDB;
 * ```
 */

export default DB_CONFIG;
