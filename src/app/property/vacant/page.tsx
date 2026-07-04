"use client";

import TopBar from "@/components/layout/TopBar";
import { DoorOpen } from "lucide-react";

export default function VacantPage() {
  return (
    <>
      <TopBar title="শূন্য ইউনিট" />
      <div className="p-6 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-800">ফাঁকা ইউনিট সমূহ</h1>
            <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">মোট শূন্য: ০</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden h-full flex flex-col">
          <div className="flex-1 p-8 flex flex-col items-center justify-center text-center min-h-[500px]">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <DoorOpen className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">কোনো শূন্য ইউনিট নেই</h3>
            <p className="text-gray-500 text-sm max-w-sm">
              আপনার সমস্ত সম্পত্তি এবং ইউনিট বর্তমানে ভাড়া দেওয়া আছে।
            </p>
          </div>
        </div>
      </div>
    </>
  );
}