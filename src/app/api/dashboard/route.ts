import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Transaction } from "@/models/Transaction";
import { Car } from "@/models/Car";
import { Tenant } from "@/models/Tenant";

import { dummyTransactions } from "@/lib/dummyData";

export async function GET() {
  try {
    const db = await connectDB();
    if (!db) {
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);

      const todayIncome = dummyTransactions.filter(t => t.type === 'income' && new Date(t.date) >= todayStart).reduce((sum, t) => sum + t.amount, 0);
      const monthExpense = dummyTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
      const monthIncome = dummyTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
      const todayCngIncome = dummyTransactions.filter(t => t.type === 'income' && t.category === 'cng' && new Date(t.date) >= todayStart).reduce((sum, t) => sum + t.amount, 0);
      const monthRent = dummyTransactions.filter(t => t.type === 'income' && t.category === 'rent').reduce((sum, t) => sum + t.amount, 0);
      const todayPosSales = dummyTransactions.filter(t => t.type === 'income' && t.category === 'pos' && new Date(t.date) >= todayStart).reduce((sum, t) => sum + t.amount, 0);
      
      const chartData = [];
      for (let i = 0; i < 7; i++) {
        chartData.push({
          name: ['রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহস্পতি', 'শুক্র', 'শনি'][i],
          income: Math.floor(Math.random() * 5000) + 1000,
          expense: Math.floor(Math.random() * 2000) + 500
        });
      }

      return NextResponse.json({
        success: true,
        isMock: true,
        data: {
          todayIncome,
          todayCngIncome,
          todayCngCount: 12,
          totalCars: 15,
          monthRent,
          totalTenants: 10,
          todayPosSales,
          monthExpense,
          netProfit: monthIncome - monthExpense,
          chartData
        }
      });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    // 1. Today's Income
    const todayIncomeAgg = await Transaction.aggregate([
      { $match: { type: "income", date: { $gte: today } } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);
    const todayIncome = todayIncomeAgg[0]?.total || 0;

    // 2. Today's CNG Collection
    const todayCngAgg = await Transaction.aggregate([
      { $match: { type: "income", category: "cng", date: { $gte: today } } },
      { $group: { _id: null, total: { $sum: "$amount" }, count: { $sum: 1 } } }
    ]);
    const todayCngIncome = todayCngAgg[0]?.total || 0;
    const todayCngCount = todayCngAgg[0]?.count || 0;

    const totalCars = await Car.countDocuments({ status: "active" });

    // 3. This Month's Rent
    const monthRentAgg = await Transaction.aggregate([
      { $match: { type: "income", category: "rent", date: { $gte: firstDayOfMonth } } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);
    const monthRent = monthRentAgg[0]?.total || 0;
    const totalTenants = await Tenant.countDocuments({ status: "active" });

    // 4. Today's POS Sales
    const todayPosAgg = await Transaction.aggregate([
      { $match: { type: "income", category: "pos", date: { $gte: today } } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);
    const todayPosSales = todayPosAgg[0]?.total || 0;

    // 5. This Month's Expense
    const monthExpenseAgg = await Transaction.aggregate([
      { $match: { type: "expense", date: { $gte: firstDayOfMonth } } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);
    const monthExpense = monthExpenseAgg[0]?.total || 0;

    // 6. This Month's Total Income
    const monthIncomeAgg = await Transaction.aggregate([
      { $match: { type: "income", date: { $gte: firstDayOfMonth } } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);
    const monthIncome = monthIncomeAgg[0]?.total || 0;
    const netProfit = monthIncome - monthExpense;

    // 7. Chart Data (Last 7 Days)
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 6);

    const dailyTransactions = await Transaction.aggregate([
      { $match: { date: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          income: { $sum: { $cond: [{ $eq: ["$type", "income"] }, "$amount", 0] } },
          expense: { $sum: { $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0] } }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Format chart data for Recharts
    const chartData = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(sevenDaysAgo);
      d.setDate(d.getDate() + i);
      const dateStr = d.toISOString().split('T')[0];
      const dayName = d.toLocaleDateString('bn-BD', { weekday: 'short' });
      
      const found = dailyTransactions.find(t => t._id === dateStr);
      chartData.push({
        name: dayName,
        income: found ? found.income : 0,
        expense: found ? found.expense : 0
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        todayIncome,
        todayCngIncome,
        todayCngCount,
        totalCars,
        monthRent,
        totalTenants,
        todayPosSales,
        monthExpense,
        netProfit,
        chartData
      }
    });

  } catch (error) {
    console.error("Dashboard API Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
