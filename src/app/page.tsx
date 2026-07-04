"use client";

import { useEffect, useState } from "react";
import TopBar from "@/components/layout/TopBar";
import { DollarSign, Truck, Home, ShoppingCart, TrendingDown, TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const [data, setData] = useState({
    todayIncome: 0,
    todayCngIncome: 0,
    todayCngCount: 0,
    totalCars: 0,
    monthRent: 0,
    totalTenants: 0,
    todayPosSales: 0,
    monthExpense: 0,
    netProfit: 0,
    chartData: [
      { name: 'শনি', income: 0, expense: 0 },
      { name: 'রবি', income: 0, expense: 0 },
      { name: 'সোম', income: 0, expense: 0 },
      { name: 'মঙ্গল', income: 0, expense: 0 },
      { name: 'বুধ', income: 0, expense: 0 },
      { name: 'বৃহস্পতি', income: 0, expense: 0 },
      { name: 'শুক্র', income: 0, expense: 0 },
    ]
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/dashboard")
      .then(res => res.json())
      .then(result => {
        if (result.success) {
          setData(result.data);
        } else {
          setError("ডেটাবেস কানেক্ট করা যায়নি (Database Offline)");
        }
      })
      .catch(err => {
        setError("ডেটা লোড করতে সমস্যা হয়েছে");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <TopBar title="ড্যাশবোর্ড" />
      
      <div className="p-6 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">ব্যবসার সার-সংক্ষেপ</h1>
            <p className="text-gray-500 text-sm mt-1">{new Date().toLocaleDateString('bn-BD', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          <button className="flex items-center gap-2 bg-green-50 text-green-600 px-4 py-2 rounded-full text-sm font-medium border border-green-200 transition-colors hover:bg-green-100">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            সরাসরি ডেটা
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg border border-red-200">
            {error}. আপনি বর্তমানে অফলাইন মোডে আছেন।
          </div>
        )}

        {/* 6 Top Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {/* Card 1: Today's Income */}
          <div className="bg-[#3B82F6] rounded-xl p-5 text-white shadow-md relative overflow-hidden hover:-translate-y-1 transition-transform duration-300">
            <div className="flex justify-between items-start mb-4">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <span className="bg-white/20 px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                ↗ +আজ
              </span>
            </div>
            <p className="text-blue-100 text-sm mb-1">আজকের মোট আয়</p>
            <h3 className="text-3xl font-bold">৳{data.todayIncome.toLocaleString('en-IN')}</h3>
          </div>

          {/* Card 2: CNG Collection */}
          <div className="bg-[#6366F1] rounded-xl p-5 text-white shadow-md relative overflow-hidden hover:-translate-y-1 transition-transform duration-300">
            <div className="flex justify-between items-start mb-4">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Truck className="w-5 h-5 text-white" />
              </div>
              <span className="bg-white/20 px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                ↗ +আজ
              </span>
            </div>
            <p className="text-indigo-100 text-sm mb-1">আজকের সিএনজি কালেকশন</p>
            <div className="flex items-end justify-between">
              <h3 className="text-3xl font-bold">৳{data.todayCngIncome.toLocaleString('en-IN')}</h3>
              <p className="text-xs text-indigo-200 mb-1">{data.todayCngCount} / {data.totalCars} সিএনজি</p>
            </div>
          </div>

          {/* Card 3: Month's Rent */}
          <div className="bg-[#10B981] rounded-xl p-5 text-white shadow-md relative overflow-hidden hover:-translate-y-1 transition-transform duration-300">
            <div className="flex justify-between items-start mb-4">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Home className="w-5 h-5 text-white" />
              </div>
            </div>
            <p className="text-emerald-100 text-sm mb-1">এই মাসের ভাড়া</p>
            <div className="flex items-end justify-between">
              <h3 className="text-3xl font-bold">৳{data.monthRent.toLocaleString('en-IN')}</h3>
              <p className="text-xs text-emerald-200 mb-1">{data.totalTenants} জন ভাড়াটে</p>
            </div>
          </div>

          {/* Card 4: POS Sales */}
          <div className="bg-[#F59E0B] rounded-xl p-5 text-white shadow-md relative overflow-hidden hover:-translate-y-1 transition-transform duration-300">
            <div className="flex justify-between items-start mb-4">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-white" />
              </div>
            </div>
            <p className="text-amber-100 text-sm mb-1">আজকের পিওএস বিক্রয়</p>
            <h3 className="text-3xl font-bold">৳{data.todayPosSales.toLocaleString('en-IN')}</h3>
          </div>

          {/* Card 5: Month's Expense */}
          <div className="bg-[#EF4444] rounded-xl p-5 text-white shadow-md relative overflow-hidden hover:-translate-y-1 transition-transform duration-300">
            <div className="flex justify-between items-start mb-4">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-white" />
              </div>
              <span className="bg-white/20 px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                ↘ খরচ
              </span>
            </div>
            <p className="text-red-100 text-sm mb-1">এই মাসের খরচ</p>
            <h3 className="text-3xl font-bold">৳{data.monthExpense.toLocaleString('en-IN')}</h3>
          </div>

          {/* Card 6: Net Profit */}
          <div className="bg-[#10B981] rounded-xl p-5 text-white shadow-md relative overflow-hidden hover:-translate-y-1 transition-transform duration-300">
            <div className="flex justify-between items-start mb-4">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="bg-white/20 px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                ↗ +আজ
              </span>
            </div>
            <p className="text-emerald-100 text-sm mb-1">এই মাসের নিট মুনাফা</p>
            <h3 className="text-3xl font-bold">৳{data.netProfit.toLocaleString('en-IN')}</h3>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 lg:col-span-2">
            <h3 className="text-base font-bold text-gray-800 mb-6">আয় বনাম খরচ</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} tickFormatter={(val) => val === 0 ? '0' : `${val/1000}k`} />
                  <Tooltip cursor={{fill: 'transparent'}} />
                  <Line type="monotone" dataKey="income" stroke="#3B82F6" strokeWidth={2} dot={{r: 4, fill: '#3B82F6'}} activeDot={{r: 6}} />
                  <Line type="monotone" dataKey="expense" stroke="#EF4444" strokeWidth={2} dot={{r: 4, fill: '#EF4444'}} activeDot={{r: 6}} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col">
            <h3 className="text-base font-bold text-gray-800 mb-4">আয়ের বিভাজন</h3>
            <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
              এখনো কোনো আয় নেই
            </div>
          </div>
        </div>

        {/* Bottom Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border-t-4 border-t-blue-500 p-5 flex flex-col justify-center items-center">
            <h2 className="text-2xl font-bold text-blue-600 mb-1">{data.totalCars}</h2>
            <p className="text-gray-500 text-sm">মোট গাড়ি</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border-t-4 border-t-green-500 p-5 flex flex-col justify-center items-center">
            <h2 className="text-2xl font-bold text-green-600 mb-1">{data.todayCngCount}</h2>
            <p className="text-gray-500 text-sm">সক্রিয় সিএনজি (আজ)</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border-t-4 border-t-amber-500 p-5 flex flex-col justify-center items-center">
            <h2 className="text-2xl font-bold text-amber-600 mb-1">{data.totalTenants}</h2>
            <p className="text-gray-500 text-sm">মোট ভাড়াটে</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border-t-4 border-t-purple-500 p-5 flex flex-col justify-center items-center">
            <h2 className="text-2xl font-bold text-purple-600 mb-1">0</h2>
            <p className="text-gray-500 text-sm">নোটিশ/অ্যালার্ট</p>
          </div>
        </div>
      </div>
    </>
  );
}
