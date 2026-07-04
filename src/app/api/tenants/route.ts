import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Tenant } from "@/models/Tenant";

import { dummyTenants } from "@/lib/dummyData";

export async function GET() {
  try {
    const db = await connectDB();
    if (!db) {
      return NextResponse.json({ success: true, data: dummyTenants, isMock: true });
    }
    const tenants = await Tenant.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: tenants });
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
    const newTenant = await Tenant.create(body);
    return NextResponse.json({ success: true, data: newTenant });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
