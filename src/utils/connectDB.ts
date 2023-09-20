import mongoose from "mongoose";

// enums
import { MONGO } from "../../enum/mongo.enum";

async function connectDB() {
  if (mongoose.connections[0].readyState) return;
  mongoose.set("strictQuery", false);
  await mongoose.connect(MONGO.MONGO_URI);
  console.log("connected to DB ...");
}

export default connectDB;
