import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  carNo: { type: String, required: true },
  regNo: { type: String },
  modelYear: { type: String },
  dailyTarget: { type: Number, default: 800 },
  fitnessExpiry: { type: Date },
  insuranceExpiry: { type: Date },
  taxTokenExpiry: { type: Date },
}, { timestamps: true });

export const Car = mongoose.models.Car || mongoose.model("Car", carSchema);
