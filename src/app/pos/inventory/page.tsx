"use client";

import { useState, useEffect } from "react";
import TopBar from "@/components/layout/TopBar";
import { Plus, Search, Package, Box, AlertCircle, CheckCircle2 } from "lucide-react";

export default function InventoryPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: ""
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/pos");
      const result = await res.json();
      if (result.success) {
        setItems(result.data);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("ডেটা লোড করতে সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const res = await fetch("/api/pos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const result = await res.json();
      if (result.success) {
        setItems([result.data, ...items]);
        setFormData({ name: "", category: "", price: "", stock: "" });
        alert("পণ্য সফলভাবে যোগ করা হয়েছে!");
      } else {
        alert("ত্রুটি: " + result.error);
      }
    } catch (err) {
      alert("পণ্য যোগ করতে সমস্যা হয়েছে");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <TopBar title="ইনভেন্টরি" />
      <div className="p-6 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-800">পণ্যের স্টক</h1>
            <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">{items.length} টি পণ্য</span>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg border border-red-200 flex items-center gap-3">
            <AlertCircle className="w-5 h-5" />
            <p>ডেটাবেস কানেক্ট করা যায়নি। আপনি বর্তমানে অফলাইন মোডে আছেন।</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* List Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
                <div className="relative w-64">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input 
                    type="text" 
                    placeholder="পণ্য খুঁজুন..." 
                    className="pl-9 pr-4 py-2 bg-white border border-gray-300 rounded-md text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {loading ? (
                <div className="p-8 flex justify-center items-center min-h-[400px]">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : items.length === 0 ? (
                <div className="p-8 flex flex-col items-center justify-center text-center min-h-[400px]">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Package className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">কোনো পণ্য পাওয়া যায়নি</h3>
                  <p className="text-gray-500 text-sm max-w-sm">
                    আপনার ইনভেন্টরিতে বর্তমানে কোনো পণ্য নেই। নতুন পণ্য যোগ করতে ডানদিকের ফর্মটি ব্যবহার করুন।
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 text-gray-600 text-sm border-b border-gray-200">
                        <th className="p-4 font-medium">পণ্যের নাম</th>
                        <th className="p-4 font-medium">ক্যাটাগরি</th>
                        <th className="p-4 font-medium">বিক্রয় মূল্য</th>
                        <th className="p-4 font-medium">স্টক</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {items.map(item => (
                        <tr key={item._id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="p-4 font-medium text-gray-900 flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-50 rounded flex items-center justify-center text-blue-600">
                              <Box className="w-4 h-4" />
                            </div>
                            {item.name}
                          </td>
                          <td className="p-4 text-gray-600">{item.category}</td>
                          <td className="p-4 font-medium text-gray-900">৳{item.price.toLocaleString()}</td>
                          <td className="p-4">
                            <span className={`font-medium ${item.stock > 10 ? 'text-green-600' : 'text-red-600'}`}>
                              {item.stock} পিচ
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Add Form Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden sticky top-24">
              <div className="p-4 border-b border-gray-200 bg-gray-50/50">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <Plus className="w-5 h-5 text-blue-600" />
                  নতুন পণ্য যোগ করুন
                </h2>
              </div>
              <div className="p-5">
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">পণ্যের নাম <span className="text-red-500">*</span></label>
                    <input name="name" value={formData.name} onChange={handleInputChange} required type="text" placeholder="যেমন: ইঞ্জিন ওয়েল" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ক্যাটাগরি</label>
                    <select name="category" value={formData.category} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                      <option value="">নির্বাচন করুন</option>
                      <option value="Lubricant">লুব্রিকেন্ট/তেল</option>
                      <option value="Parts">পার্টস</option>
                      <option value="Tools">যন্ত্রাংশ</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">বিক্রয় মূল্য (৳) <span className="text-red-500">*</span></label>
                      <input name="price" value={formData.price} onChange={handleInputChange} required type="number" placeholder="০" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">স্টক পরিমাণ <span className="text-red-500">*</span></label>
                      <input name="stock" value={formData.stock} onChange={handleInputChange} required type="number" placeholder="০" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                  </div>

                  <div className="pt-4 flex gap-3">
                    <button type="button" onClick={() => setFormData({name:"", category:"", price:"", stock:""})} className="flex-1 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors">
                      বাতিল
                    </button>
                    <button type="submit" disabled={submitting} className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
                      <CheckCircle2 className="w-4 h-4" />
                      {submitting ? "সংরক্ষণ হচ্ছে..." : "সংরক্ষণ করুন"}
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