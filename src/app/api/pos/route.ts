import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { PosItem } from "@/models/PosItem";

import { dummyPosItems } from "@/lib/dummyData";

export async function GET() {
  try {
    const db = await connectDB();
    if (!db) {
      return NextResponse.json({ success: true, data: dummyPosItems, isMock: true });
    }
    const items = await PosItem.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: items });
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
    const newItem = await PosItem.create(body);
    return NextResponse.json({ success: true, data: newItem });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function PUT(request: Request) {
  try {
    const db = await connectDB();
    if (!db) {
      return NextResponse.json({ success: false, error: "Database offline" }, { status: 503 });
    }
    const body = await request.json();
    
    // Decrease stock amount logic (assuming body comes as { id, quantity })
    if (body.action === 'decrease_stock') {
      const item = await PosItem.findById(body.id);
      if (!item) throw new Error("Item not found");
      if (item.stock < body.quantity) throw new Error("Not enough stock");
      
      item.stock -= body.quantity;
      await item.save();
      
      return NextResponse.json({ success: true, data: item });
    }

    return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 });

  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
