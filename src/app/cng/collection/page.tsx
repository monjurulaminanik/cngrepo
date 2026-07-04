"use client";

import { useState, useEffect, useMemo } from "react";
import TopBar from "@/components/layout/TopBar";
import { Search, DollarSign, Activity, PieChart, FileText, AlertCircle } from "lucide-react";

export default function CollectionPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/transactions?category=cng`);
      const data = await res.json();

      if (data.success) {
        setTransactions(data.data);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("ডেটা লোড করতে সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  const filteredData = useMemo(() => {
    const targetDate = new Date(selectedDate).setHours(0,0,0,0);
    return transactions.filter(t => {
      const tDate = new Date(t.date).setHours(0,0,0,0);
      return tDate === targetDate;
    });
  }, [transactions, selectedDate]);

  const stats = useMemo(() => {
    const totalCollection = filteredData.reduce((sum, t) => sum + t.amount, 0);
    const totalEntries = filteredData.length;
    const avgPerEntry = totalEntries > 0 ? Math.round(totalCollection / totalEntries) : 0;

    return { totalCollection, totalEntries, avgPerEntry };
  }, [filteredData]);

  return (
    <>
      <TopBar title="কালেকশন" />
      <div className="p-6 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-800">দৈনিক কালেকশন রেজিস্টার</h1>
            <span className="bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">আজকের হিসাব</span>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg border border-red-200 flex items-center gap-3">
            <AlertCircle className="w-5 h-5" />
            <p>ডেটাবেস কানেক্ট করা যায়নি। আপনি বর্তমানে অফলাইন মোডে আছেন।</p>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-sm border-l-4 border-l-green-500 p-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">মোট কালেকশন</p>
              <h3 className="text-2xl font-bold text-gray-800">৳{stats.totalCollection.toLocaleString()}</h3>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border-l-4 border-l-blue-500 p-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">সক্রিয় এন্ট্রি</p>
              <h3 className="text-2xl font-bold text-gray-800">{stats.totalEntries}</h3>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
              <Activity className="w-6 h-6 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border-l-4 border-l-orange-500 p-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">গড় প্রতি সিএনজি</p>
              <h3 className="text-2xl font-bold text-gray-800">৳{stats.avgPerEntry.toLocaleString()}</h3>
            </div>
            <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center">
              <PieChart className="w-6 h-6 text-orange-500" />
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <FileText className="w-5 h-5 text-gray-500" />
              গাড়ি অনুযায়ী কালেকশন
            </h2>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input 
                  type="text" 
                  placeholder="খুঁজুন..." 
                  className="pl-9 pr-4 py-1.5 bg-white border border-gray-300 rounded-md text-sm w-48 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
              </div>
              <input 
                type="date" 
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-3 py-1.5 border border-gray-300 rounded-md text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500" 
              />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 text-gray-700 uppercase font-medium border-b border-gray-200">
                <tr>
                  <th scope="col" className="px-6 py-4">বিবরণ</th>
                  <th scope="col" className="px-6 py-4">মোট কালেকশন</th>
                  <th scope="col" className="px-6 py-4">তারিখ</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-12 text-center text-gray-500">
                      <div className="flex justify-center items-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                      </div>
                    </td>
                  </tr>
                ) : filteredData.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-12 text-center text-gray-500">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <DollarSign className="w-8 h-8 text-gray-300" />
                        <p>কোনো ডেটা পাওয়া যায়নি</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredData.map(t => (
                    <tr key={t._id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-800">{t.description || 'সিএনজি কালেকশন'}</td>
                      <td className="px-6 py-4 text-green-600 font-medium">৳{t.amount.toLocaleString()}</td>
                      <td className="px-6 py-4">{new Date(t.date).toLocaleDateString('bn-BD')}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
