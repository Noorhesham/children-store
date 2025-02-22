  import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    priceInUsd: { type: Number, min: 0 },
    sale: { type: Number, min: 0 },
    stock: { type: Number, required: true, min: 0 },
    category: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Category" },
    images: [
      {
        secure_url: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model("Product", productSchema);
