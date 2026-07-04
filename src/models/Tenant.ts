import mongoose from "mongoose";

const tenantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  nid: { type: String },
  property: { type: String, required: true },
  unit: { type: String, required: true },
  rentAmount: { type: Number, required: true },
  advance: { type: Number, default: 0 },
  joinDate: { type: Date },
}, { timestamps: true });

export const Tenant = mongoose.models.Tenant || mongoose.model("Tenant", tenantSchema);
