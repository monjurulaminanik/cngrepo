"use client";

import TopBar from "@/components/layout/TopBar";
import { Download, FileText, PieChart, TrendingUp, TrendingDown, Calendar } from "lucide-react";

export default function ReportsPage() {
  return (
    <>
      <TopBar title="রিপোর্ট" />
      <div className="p-6 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-800">বিস্তারিত রিপোর্ট</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <select className="pl-9 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white">
                <option>এই মাস (This Month)</option>
                <option>গত মাস (Last Month)</option>
                <option>এই বছর (This Year)</option>
                <option>কাস্টম (Custom)</option>
              </select>
              <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
              <Download className="w-4 h-4" />
              ডাউনলোড PDF
            </button>
          </div>
        </div>

        {/* Top Summaries */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-blue-500" />
              </div>
              <h3 className="text-gray-500 text-sm font-medium">মোট আয়</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">৳০</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center">
                <TrendingDown className="w-4 h-4 text-red-500" />
              </div>
              <h3 className="text-gray-500 text-sm font-medium">মোট খরচ</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">৳০</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center">
                <PieChart className="w-4 h-4 text-green-500" />
              </div>
              <h3 className="text-gray-500 text-sm font-medium">নিট লাভ</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">৳০</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center">
                <FileText className="w-4 h-4 text-orange-500" />
              </div>
              <h3 className="text-gray-500 text-sm font-medium">মোট বকেয়া</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">৳০</p>
          </div>
        </div>

        {/* Report Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden min-h-[400px]">
          <div className="border-b border-gray-200">
            <div className="flex px-4 py-2 gap-4">
              <button className="px-4 py-2 text-sm font-medium text-blue-600 border-b-2 border-blue-600">সব লেনদেন</button>
              <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">সিএনজি আয়</button>
              <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">ভাড়া আয়</button>
              <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">পিওএস আয়</button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center text-center p-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">কোনো ডেটা নেই</h3>
            <p className="text-gray-500 text-sm max-w-sm">
              এই সময়ের জন্য কোনো লেনদেনের রেকর্ড পাওয়া যায়নি।
            </p>
          </div>
        </div>
      </div>
    </>
  );
}