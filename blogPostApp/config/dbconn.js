import mongoose from "mongoose";

const DB = {
  db: async () => {
    try {
      mongoose.connect("mongodb://localhost:27017/InkPress");
      console.log("✅ MongoDB connected");
    } catch (err) {
      console.error("❌ MongoDB connection error: ", err.message);
    }
  },
};

export default DB;
