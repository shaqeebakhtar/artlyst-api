import mongoose, { Schema } from "mongoose";

const tokenSchema = new Schema(
  {
    token: { type: String, required: true, unique: true },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("Token", tokenSchema, "tokens");
