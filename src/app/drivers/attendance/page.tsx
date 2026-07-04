"use client";

import TopBar from "@/components/layout/TopBar";
import { Plus, Search, CheckCircle2, Clock } from "lucide-react";

export default function DriverAttendancePage() {
  return (
    <>
      <TopBar title="ড্রাইভার উপস্থিতি" />
      <div className="p-6 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-800">দৈনিক উপস্থিতি</h1>
            <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">আজকের এন্ট্রি: ০</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden h-full flex flex-col">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
                <div className="relative w-64">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input 
                    type="text" 
                    placeholder="ড্রাইভার খুঁজুন..." 
                    className="pl-9 pr-4 py-2 bg-white border border-gray-300 rounded-md text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <input type="date" className="px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              
              <div className="flex-1 p-8 flex flex-col items-center justify-center text-center min-h-[400px]">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Clock className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">কোনো উপস্থিতি রেকর্ড নেই</h3>
                <p className="text-gray-500 text-sm max-w-sm">
                  নতুন উপস্থিতি রেকর্ড যোগ করতে ডানদিকের ফর্মটি ব্যবহার করুন।
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden sticky top-24">
              <div className="p-4 border-b border-gray-200 bg-gray-50/50">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <Plus className="w-5 h-5 text-blue-600" />
                  নতুন উপস্থিতি এন্ট্রি
                </h2>
              </div>
              <div className="p-5">
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ড্রাইভার <span className="text-red-500">*</span></label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 bg-white">
                      <option value="">নির্বাচন করুন</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">অবস্থা <span className="text-red-500">*</span></label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 bg-white">
                      <option value="present">উপস্থিত (Present)</option>
                      <option value="absent">অনুপস্থিত (Absent)</option>
                      <option value="leave">ছুটি (Leave)</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">ইন টাইম</label>
                      <input type="time" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">আউট টাইম</label>
                      <input type="time" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">মন্তব্য</label>
                    <input type="text" placeholder="যদি কোনো কারণ বা মন্তব্য থাকে" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>

                  <div className="pt-4 flex gap-3">
                    <button type="button" className="flex-1 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors">
                      বাতিল
                    </button>
                    <button type="button" className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      সংরক্ষণ করুন
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}