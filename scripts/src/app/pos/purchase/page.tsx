"use client";
import TopBar from "@/components/layout/TopBar";

export default function Page() {
  return (
    <>
      <TopBar title="ক্রয়" />
      <div className="p-6 max-w-7xl mx-auto w-full">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center justify-center min-h-[400px]">
          <h2 className="text-xl font-medium text-gray-400 text-center flex flex-col gap-2 items-center">
            <span className="w-10 h-10 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></span>
            এই পেজের UI তৈরি হচ্ছে...
          </h2>
        </div>
      </div>
    </>
  );
}