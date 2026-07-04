import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Driver } from "@/models/Driver";

import { dummyDrivers } from "@/lib/dummyData";

export async function GET() {
  try {
    const db = await connectDB();
    if (!db) {
      return NextResponse.json({ success: true, data: dummyDrivers, isMock: true });
    }
    const drivers = await Driver.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: drivers });
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
    const newDriver = await Driver.create(body);
    return NextResponse.json({ success: true, data: newDriver });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
