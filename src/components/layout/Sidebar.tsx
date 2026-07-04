"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Truck,
  Users,
  Building,
  ShoppingCart,
  BarChart2,
  Sparkles,
  ChevronDown,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type MenuItem = {
  name: string;
  icon: any;
  href?: string;
  subItems?: { name: string; href: string }[];
};

const menuItems: MenuItem[] = [
  { name: "ড্যাশবোর্ড", icon: LayoutDashboard, href: "/" },
  {
    name: "সিএনজি ফ্লিট",
    icon: Truck,
    subItems: [
      { name: "গাড়ির তালিকা", href: "/cng/vehicles" },
      { name: "দৈনিক হাজিরা", href: "/cng/attendance" },
      { name: "কালেকশন", href: "/cng/collection" },
      { name: "মেইনটেন্যান্স", href: "/cng/maintenance" },
    ],
  },
  {
    name: "ড্রাইভার",
    icon: Users,
    subItems: [
      { name: "ড্রাইভার তালিকা", href: "/drivers" },
      { name: "উপস্থিতি", href: "/drivers/attendance" },
      { name: "বেতন", href: "/drivers/salary" },
    ],
  },
  {
    name: "সম্পত্তি",
    icon: Building,
    subItems: [
      { name: "সম্পত্তি সমূহ", href: "/property/list" },
      { name: "ভাড়াটে", href: "/property/tenants" },
      { name: "ভাড়া সংগ্রহ", href: "/property/rent" },
      { name: "শূন্য ইউনিট", href: "/property/vacant" },
    ],
  },
  {
    name: "পিওএস",
    icon: ShoppingCart,
    subItems: [
      { name: "বিক্রয়", href: "/pos/sales" },
      { name: "ইনভেন্টরি", href: "/pos/inventory" },
      { name: "ক্রয়", href: "/pos/purchase" },
    ],
  },
  { name: "রিপোর্ট", icon: BarChart2, href: "/reports" },
  { name: "এআই সহকারী", icon: Sparkles, href: "/ai" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpand = (name: string) => {
    setExpandedItems((prev) =>
      prev.includes(name) ? prev.filter((i) => i !== name) : [...prev, name]
    );
  };

  return (
    <div className="w-64 bg-[#111827] text-gray-300 flex flex-col h-screen fixed left-0 top-0 overflow-y-auto">
      {/* Logo Area */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-800">
        <div className="w-8 h-8 bg-blue-600 text-white rounded flex items-center justify-center font-bold">
          D
        </div>
        <div>
          <h1 className="text-white font-bold leading-tight">DAWAT IT</h1>
          <p className="text-xs text-gray-400">মিক্সড ইআরপি</p>
        </div>
      </div>

      {/* Menu Area */}
      <div className="flex-1 py-4 flex flex-col gap-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || item.subItems?.some(sub => pathname.startsWith(sub.href));
          const isExpanded = expandedItems.includes(item.name) || isActive;

          return (
            <div key={item.name} className="px-3">
              {item.href ? (
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                    isActive ? "bg-blue-600 text-white" : "hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.name}</span>
                </Link>
              ) : (
                <div>
                  <button
                    onClick={() => toggleExpand(item.name)}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2 rounded-md transition-colors",
                      isActive ? "text-white" : "hover:bg-gray-800 hover:text-white"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className={cn("w-5 h-5", isActive ? "text-blue-500" : "")} />
                      <span className="text-sm font-medium">{item.name}</span>
                    </div>
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                  
                  {isExpanded && item.subItems && (
                    <div className="mt-1 ml-9 flex flex-col gap-1 border-l border-gray-700 pl-2">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className={cn(
                            "px-3 py-2 text-sm rounded-md transition-colors",
                            pathname === subItem.href
                              ? "bg-blue-600 text-white"
                              : "hover:text-gray-300 hover:bg-gray-800"
                          )}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* User Area */}
      <div className="p-4 border-t border-gray-800 mt-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
            A
          </div>
          <div className="flex-1 overflow-hidden">
            <h4 className="text-white text-sm font-medium truncate">অ্যাডমিন</h4>
            <p className="text-xs text-gray-500 truncate">admin@gmail.com</p>
          </div>
        </div>
        <button className="flex items-center gap-2 mt-4 text-sm text-gray-400 hover:text-white transition-colors">
          <LogOut className="w-4 h-4" /> লগআউট
        </button>
      </div>
    </div>
  );
}
