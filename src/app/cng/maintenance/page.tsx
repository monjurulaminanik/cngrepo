"use client";

import TopBar from "@/components/layout/TopBar";
import { Plus, Search, Wrench, CheckCircle2, FileText } from "lucide-react";

export default function MaintenancePage() {
  return (
    <>
      <TopBar title="মেইনটেন্যান্স" />
      <div className="p-6 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-800">মেইনটেন্যান্স ও খরচ লগ</h1>
            <span className="bg-red-100 text-red-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">মোট খরচ: ৳০</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main List Section (2/3 width) */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden h-full flex flex-col">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
                <div className="relative w-64">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input 
                    type="text" 
                    placeholder="গাড়ি বা সমস্যা খুঁজুন..." 
                    className="pl-9 pr-4 py-2 bg-white border border-gray-300 rounded-md text-sm w-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  />
                </div>
                <input type="month" className="px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500" />
              </div>
              
              <div className="flex-1 p-8 flex flex-col items-center justify-center text-center min-h-[400px]">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Wrench className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">কোনো মেইনটেন্যান্স রেকর্ড নেই</h3>
                <p className="text-gray-500 text-sm max-w-sm">
                  নতুন মেইনটেন্যান্স বা মেরামতের রেকর্ড যোগ করতে ডানদিকের ফর্মটি ব্যবহার করুন।
                </p>
              </div>
            </div>
          </div>

          {/* Add Maintenance Form (1/3 width) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden sticky top-24">
              <div className="p-4 border-b border-gray-200 bg-gray-50/50">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <Plus className="w-5 h-5 text-red-600" />
                  মেইনটেন্যান্স রেকর্ড যোগ করুন
                </h2>
              </div>
              <div className="p-5">
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">গাড়ি <span className="text-red-500">*</span></label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-600 bg-white">
                        <option value="">নির্বাচন করুন</option>
                      </select>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">তারিখ <span className="text-red-500">*</span></label>
                      <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-600" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">বিভাগ <span className="text-red-500">*</span></label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-600 bg-white">
                        <option value="repair">মেরামত (Repair)</option>
                        <option value="parts">পার্টস পরিবর্তন (Parts)</option>
                        <option value="wash">গাড়ি ধোয়া (Wash)</option>
                        <option value="other">অন্যান্য (Other)</option>
                      </select>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">খরচ (৳) <span className="text-red-500">*</span></label>
                      <input type="number" placeholder="০" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">সমস্যার বিবরণ</label>
                    <textarea rows={3} placeholder="সমস্যা বা কাজের বিস্তারিত লিখুন..." className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500"></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ওয়ার্কশপ / গ্যারেজ</label>
                    <input type="text" placeholder="ওয়ার্কশপের নাম" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ব্যবহৃত যন্ত্রাংশ (যদি থাকে)</label>
                    <input type="text" placeholder="যেমন: মবিল, ব্রেক শু" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500" />
                  </div>

                  <div className="pt-4 flex gap-3">
                    <button type="button" className="flex-1 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors">
                      বাতিল
                    </button>
                    <button type="button" className="flex-1 bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors flex items-center justify-center gap-2">
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
