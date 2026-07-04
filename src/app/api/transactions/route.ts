import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Transaction } from "@/models/Transaction";

import { dummyTransactions } from "@/lib/dummyData";

export async function GET(request: Request) {
  try {
    const db = await connectDB();
    if (!db) {
      const { searchParams } = new URL(request.url);
      const category = searchParams.get('category');
      let filtered = dummyTransactions;
      if (category) {
        filtered = filtered.filter(t => t.category === category);
      }
      return NextResponse.json({ success: true, data: filtered, isMock: true });
    }

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    let query = {};
    if (category) {
      query = { category };
    }

    const transactions = await Transaction.find(query).sort({ date: -1, createdAt: -1 });
    return NextResponse.json({ success: true, data: transactions });
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
    const newTransaction = await Transaction.create(body);
    return NextResponse.json({ success: true, data: newTransaction });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
