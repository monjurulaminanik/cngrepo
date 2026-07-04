const fs = require('fs');
const path = require('path');

const basePath = 'e:/cngdawatit/src/app';

const pages = [
  { p: 'drivers/page.tsx', title: 'ড্রাইভার তালিকা' },
  { p: 'drivers/attendance/page.tsx', title: 'ড্রাইভার উপস্থিতি' },
  { p: 'drivers/salary/page.tsx', title: 'বেতন' },
  { p: 'property/list/page.tsx', title: 'সম্পত্তি সমূহ' },
  { p: 'property/tenants/page.tsx', title: 'ভাড়াটে' },
  { p: 'property/rent/page.tsx', title: 'ভাড়া সংগ্রহ' },
  { p: 'property/vacant/page.tsx', title: 'শূন্য ইউনিট' },
  { p: 'pos/sales/page.tsx', title: 'বিক্রয়' },
  { p: 'pos/inventory/page.tsx', title: 'ইনভেন্টরি' },
  { p: 'reports/page.tsx', title: 'রিপোর্ট' },
  { p: 'ai/page.tsx', title: 'এআই সহকারী' },
];

pages.forEach(({p, title}) => {
  const fullPath = path.join(basePath, p);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  const content = `"use client";\n\nimport TopBar from "@/components/layout/TopBar";\nimport { Settings } from "lucide-react";\n\nexport default function Page() {\n  return (\n    <>\n      <TopBar title="${title}" />\n      <div className="p-6 max-w-7xl mx-auto w-full">\n        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex flex-col items-center justify-center min-h-[400px]">\n          <Settings className="w-16 h-16 text-blue-500 mb-4 animate-[spin_3s_linear_infinite]" />\n          <h2 className="text-xl font-medium text-gray-800 mb-2">${title}</h2>\n          <p className="text-gray-500 text-center max-w-md">\n            এই মডিউলের UI তৈরি হচ্ছে। খুব শীঘ্রই এখানে পূর্ণাঙ্গ ফিচার দেখতে পাবেন।\n          </p>\n        </div>\n      </div>\n    </>\n  );\n}`;
  // Overwrite if it doesn't exist or is empty
  fs.writeFileSync(fullPath, content);
});
console.log('All missing pages generated successfully.');
