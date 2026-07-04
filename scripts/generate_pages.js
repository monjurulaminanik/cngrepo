const fs = require('fs');
const path = require('path');

const pages = [
  { path: 'src/app/cng/vehicles/page.tsx', title: 'গাড়ির তালিকা' },
  { path: 'src/app/cng/attendance/page.tsx', title: 'দৈনিক হাজিরা' },
  { path: 'src/app/cng/collection/page.tsx', title: 'কালেকশন' },
  { path: 'src/app/cng/maintenance/page.tsx', title: 'মেইনটেন্যান্স' },
  { path: 'src/app/drivers/page.tsx', title: 'ড্রাইভার তালিকা' },
  { path: 'src/app/drivers/attendance/page.tsx', title: 'ড্রাইভার উপস্থিতি' },
  { path: 'src/app/drivers/salary/page.tsx', title: 'বেতন' },
  { path: 'src/app/property/list/page.tsx', title: 'সম্পত্তি সমূহ' },
  { path: 'src/app/property/tenants/page.tsx', title: 'ভাড়াটে' },
  { path: 'src/app/property/rent/page.tsx', title: 'ভাড়া সংগ্রহ' },
  { path: 'src/app/property/vacant/page.tsx', title: 'শূন্য ইউনিট' },
  { path: 'src/app/pos/sales/page.tsx', title: 'বিক্রয়' },
  { path: 'src/app/pos/inventory/page.tsx', title: 'ইনভেন্টরি' },
  { path: 'src/app/pos/purchase/page.tsx', title: 'ক্রয়' },
  { path: 'src/app/reports/page.tsx', title: 'রিপোর্ট' },
  { path: 'src/app/ai/page.tsx', title: 'এআই সহকারী' },
];

pages.forEach(p => {
  const fullPath = path.join(__dirname, p.path);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  const content = `"use client";
import TopBar from "@/components/layout/TopBar";

export default function Page() {
  return (
    <>
      <TopBar title="${p.title}" />
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
}`;
  if (!fs.existsSync(fullPath)) {
    fs.writeFileSync(fullPath, content);
  }
});
console.log('Placeholders created.');
