import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: Number,
  description: String,
  category: String,
});

export default mongoose.model("Product", productSchema);
