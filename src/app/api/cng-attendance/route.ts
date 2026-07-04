import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Attendance } from "@/models/Attendance";
import { Transaction } from "@/models/Transaction";

import { dummyAttendances } from "@/lib/dummyData";

export async function GET(request: Request) {
  try {
    const db = await connectDB();
    if (!db) {
      return NextResponse.json({ success: true, data: dummyAttendances, isMock: true });
    }

    const { searchParams } = new URL(request.url);
    const dateParam = searchParams.get('date');
    
    let dateQuery = {};
    if (dateParam) {
      const dateStart = new Date(dateParam);
      dateStart.setHours(0, 0, 0, 0);
      const dateEnd = new Date(dateStart);
      dateEnd.setDate(dateStart.getDate() + 1);
      dateQuery = { date: { $gte: dateStart, $lt: dateEnd } };
    }

    const attendances = await Attendance.find(dateQuery)
      .populate('driverId', 'name mobile')
      .populate('carId', 'carNo')
      .sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: attendances });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const db = await connectDB();
    if (!db) {
      return NextResponse.json({ success: false, error: "Database offline" }, { status: 503 });
    }
    const body = await request.json();
    const { driverId, carId, date, status, shift, collection } = body;

    // Create attendance record
    const newAttendance = await Attendance.create({
      driverId,
      carId,
      date,
      status,
      shift,
    });

    // If there is collection, create a Transaction as well
    if (collection && Number(collection) > 0) {
      await Transaction.create({
        type: "income",
        category: "cng",
        amount: Number(collection),
        date: date,
        description: `দৈনিক জমা - শিফট: ${shift}`,
        refId: newAttendance._id
      });
    }

    return NextResponse.json({ success: true, data: newAttendance });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
