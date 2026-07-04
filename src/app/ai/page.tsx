"use client";

import TopBar from "@/components/layout/TopBar";
import { Send, Bot, Sparkles } from "lucide-react";

export default function AIPage() {
  return (
    <>
      <TopBar title="এআই সহকারী" />
      <div className="p-6 max-w-5xl mx-auto w-full h-[calc(100vh-4rem)] flex flex-col">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
            <Bot className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">ব্যবসায়িক এআই সহকারী</h1>
            <p className="text-gray-500 text-sm mt-1">আপনার ব্যবসার ডেটা বিশ্লেষণ করে যেকোনো প্রশ্নের উত্তর দিতে প্রস্তুত।</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex-1 flex flex-col mb-6">
          <div className="flex-1 p-6 overflow-y-auto">
            {/* Welcome message */}
            <div className="flex gap-4 mb-6">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex-shrink-0 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="bg-gray-100 rounded-2xl rounded-tl-none p-4 max-w-[80%]">
                <p className="text-gray-800 text-sm leading-relaxed">
                  হ্যালো অ্যাডমিন! আমি আপনার এআই সহকারী। আমি আপনার সিএনজি, প্রপার্টি, ড্রাইবার এবং পিওএস ডেটা অ্যাক্সেস করতে পারি। আপনি আমাকে নিচের মতো প্রশ্ন করতে পারেন:
                </p>
                <div className="mt-3 flex flex-col gap-2">
                  <button className="bg-white border border-gray-200 rounded-lg p-2 text-sm text-left text-blue-600 hover:bg-blue-50 transition-colors">
                    "গত মাসে সিএনজি থেকে কত টাকা আয় হয়েছে?"
                  </button>
                  <button className="bg-white border border-gray-200 rounded-lg p-2 text-sm text-left text-blue-600 hover:bg-blue-50 transition-colors">
                    "কোন ভাড়াটেরা এই মাসের ভাড়া এখনও দেয়নি?"
                  </button>
                  <button className="bg-white border border-gray-200 rounded-lg p-2 text-sm text-left text-blue-600 hover:bg-blue-50 transition-colors">
                    "আজকের দিনে কোন গাড়ি সবচেয়ে বেশি কালেকশন করেছে?"
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="relative">
              <input 
                type="text" 
                placeholder="আপনার প্রশ্ন বাংলায় বা ইংরেজিতে লিখুন..." 
                className="w-full pl-4 pr-12 py-3 bg-white border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
                <Send className="w-4 h-4 -ml-0.5" />
              </button>
            </div>
            <p className="text-xs text-center text-gray-400 mt-2">
              এআই সহকারী আপনার ব্যবসার ডেটা ব্যবহার করে উত্তর তৈরি করে, তাই এটি নির্ভুল।
            </p>
          </div>
        </div>
      </div>
    </>
  );
}