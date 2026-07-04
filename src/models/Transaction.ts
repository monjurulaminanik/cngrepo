import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  type: { type: String, enum: ["income", "expense"], required: true },
  category: { type: String, enum: ["cng", "rent", "pos", "maintenance", "salary", "other"], required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  description: { type: String },
  referenceId: { type: mongoose.Schema.Types.ObjectId }, // Can link to a specific Sale/Rent/Collection
}, { timestamps: true });

export const Transaction = mongoose.models.Transaction || mongoose.model("Transaction", transactionSchema);
