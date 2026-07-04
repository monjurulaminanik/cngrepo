import mongoose from "mongoose";

const driverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  nid: { type: String },
  licenseNo: { type: String },
  joinDate: { type: Date },
}, { timestamps: true });

export const Driver = mongoose.models.Driver || mongoose.model("Driver", driverSchema);
