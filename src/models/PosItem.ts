import mongoose from "mongoose";

const posItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  buyPrice: { type: Number, required: true },
  sellPrice: { type: Number, required: true },
  stock: { type: Number, default: 0 },
}, { timestamps: true });

export const PosItem = mongoose.models.PosItem || mongoose.model("PosItem", posItemSchema);
