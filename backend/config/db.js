import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()
const mongoUrl = process.env.MONGOURI
const connectDb = async () => {
  try {
    await mongoose.connect(mongoUrl);
    console.log("Daatabase Connected...")
  } catch (error) {
    console.log(error);
    process.exit(1)
  }
}

export default connectDb;