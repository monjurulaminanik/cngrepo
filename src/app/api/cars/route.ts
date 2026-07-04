import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Car } from "@/models/Car";

import { dummyCars } from "@/lib/dummyData";

export async function GET() {
  try {
    const db = await connectDB();
    if (!db) {
      return NextResponse.json({ success: true, data: dummyCars, isMock: true });
    }
    const cars = await Car.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: cars });
  } catch (error: any) {
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
    const newCar = await Car.create(body);
    return NextResponse.json({ success: true, data: newCar });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
