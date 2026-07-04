import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver', required: true },
  carId: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['present', 'absent', 'leave'], default: 'present' },
  shift: { type: String, enum: ['morning', 'evening', 'full'], default: 'full' },
  notes: { type: String }
}, { timestamps: true });

export const Attendance = mongoose.models.Attendance || mongoose.model("Attendance", attendanceSchema);
