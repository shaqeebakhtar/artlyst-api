import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isArtist: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema, "users");
