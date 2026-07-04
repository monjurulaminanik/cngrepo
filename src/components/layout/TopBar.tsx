"use client";

import { Bell, Search } from "lucide-react";

export default function TopBar({ title = "ড্যাশবোর্ড" }: { title?: string }) {
  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-10">
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      
      <div className="flex items-center gap-6">
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="খুঁজুন..." 
            className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
        
        <button className="text-gray-500 hover:text-gray-700 relative transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>
        
        <div className="flex items-center gap-3 border-l pl-6">
          <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
            A
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-bold text-gray-700 leading-none">অ্যাডমিন</p>
            <p className="text-xs text-blue-500 mt-1">সুপার অ্যাডমিন</p>
          </div>
        </div>
      </div>
    </div>
  );
}
