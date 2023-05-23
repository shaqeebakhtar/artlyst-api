import mongoose, { Schema } from "mongoose";
import { BASE_URL } from "../config";

const ProductSchema = new Schema(
  {
    title: { type: String, required: true },
    imageUrl: {
      type: String,
      required: true,
      get: (image: string) => {
        return `${BASE_URL}/${image}`;
      },
    },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: [{ type: String, required: true }],
    keywords: [{ type: String, required: true }],
    artist: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  },
  { timestamps: true, toJSON: { getters: true } }
);

export default mongoose.model("Product", ProductSchema, "products");
