import mongoose from "mongoose";

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/mixed_erp";
  
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts)
      .then((mongoose) => {
        return mongoose;
      })
      .catch(err => {
        console.error("MongoDB Connection Error:", err.message);
        cached.promise = null; // Reset promise on failure
        return null;
      });
  }
  
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    console.error("MongoDB Await Error:", e.message);
    cached.promise = null;
    return null;
  }
  return cached.conn;
}
