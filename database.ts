import mongoose from "mongoose";
import { DB_URL } from "./utils";

const connectDB = () => {
  mongoose.connect(DB_URL as string);
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "Database connection error:"));
  db.once("open", () => {
    console.log("Connected to database...");
  });
};

export default connectDB;
