"use client";

import { useState, useEffect } from "react";
import TopBar from "@/components/layout/TopBar";
import { Plus, Search, Users, Home, Calendar, CheckCircle2, AlertCircle } from "lucide-react";

export default function TenantsPage() {
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    nid: "",
    shopNo: "",
    rentAmount: "",
    advanceAmount: "",
    joinDate: ""
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchTenants();
  }, []);

  const fetchTenants = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/tenants");
      const result = await res.json();
      if (result.success) {
        setTenants(result.data);
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
      const res = await fetch("/api/tenants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const result = await res.json();
      if (result.success) {
        setTenants([result.data, ...tenants]);
        setFormData({
          name: "",
          mobile: "",
          nid: "",
          shopNo: "",
          rentAmount: "",
          advanceAmount: "",
          joinDate: ""
        });
        alert("ভাড়াটে সফলভাবে যোগ করা হয়েছে!");
      } else {
        alert("ত্রুটি: " + result.error);
      }
    } catch (err) {
      alert("ভাড়াটে যোগ করতে সমস্যা হয়েছে");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <TopBar title="ভাড়াটে তালিকা" />
      <div className="p-6 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-800">ভাড়াটে তালিকা</h1>
            <span className="bg-emerald-100 text-emerald-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">{tenants.length} জন ভাড়াটে</span>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg border border-red-200 flex items-center gap-3">
            <AlertCircle className="w-5 h-5" />
            <p>ডেটাবেস কানেক্ট করা যায়নি। আপনি বর্তমানে অফলাইন মোডে আছেন।</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main List Section (2/3 width) */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
                <div className="relative w-64">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input 
                    type="text" 
                    placeholder="ভাড়াটের নাম খুঁজুন..." 
                    className="pl-9 pr-4 py-2 bg-white border border-gray-300 rounded-md text-sm w-full focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {loading ? (
                <div className="p-8 flex justify-center items-center min-h-[400px]">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
                </div>
              ) : tenants.length === 0 ? (
                <div className="p-8 flex flex-col items-center justify-center text-center min-h-[400px]">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Users className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">কোনো ভাড়াটে পাওয়া যায়নি</h3>
                  <p className="text-gray-500 text-sm max-w-sm">
                    বর্তমানে কোনো ভাড়াটে নেই। নতুন ভাড়াটে যোগ করতে ডানদিকের ফর্মটি ব্যবহার করুন।
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 text-gray-600 text-sm border-b border-gray-200">
                        <th className="p-4 font-medium">ভাড়াটের নাম</th>
                        <th className="p-4 font-medium">দোকান/ফ্ল্যাট নং</th>
                        <th className="p-4 font-medium">মাসিক ভাড়া</th>
                        <th className="p-4 font-medium">স্ট্যাটাস</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {tenants.map(tenant => (
                        <tr key={tenant._id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="p-4">
                            <div className="font-medium text-gray-900">{tenant.name}</div>
                            <div className="text-xs text-gray-500">{tenant.mobile}</div>
                          </td>
                          <td className="p-4 text-gray-600">{tenant.shopNo}</td>
                          <td className="p-4 font-medium">৳{tenant.rentAmount}</td>
                          <td className="p-4">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${tenant.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {tenant.status === 'active' ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
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

          {/* Add New Tenant Form (1/3 width) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden sticky top-24">
              <div className="p-4 border-b border-gray-200 bg-gray-50/50">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <Plus className="w-5 h-5 text-emerald-600" />
                  নতুন ভাড়াটে যোগ করুন
                </h2>
              </div>
              <div className="p-5">
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ভাড়াটের নাম <span className="text-red-500">*</span></label>
                    <input name="name" value={formData.name} onChange={handleInputChange} required type="text" placeholder="যেমন: মোঃ রহিম মিয়া" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">মোবাইল নম্বর <span className="text-red-500">*</span></label>
                    <input name="mobile" value={formData.mobile} onChange={handleInputChange} required type="text" placeholder="০১৭XXXXXXXX" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">জাতীয় পরিচয়পত্র (NID)</label>
                    <input name="nid" value={formData.nid} onChange={handleInputChange} type="text" placeholder="NID নম্বর দিন" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                  </div>

                  <div className="pt-2 pb-1 border-b border-gray-100">
                    <h3 className="text-sm font-medium text-gray-500 flex items-center gap-2">
                      <Home className="w-4 h-4" />
                      ভাড়ার তথ্য
                    </h3>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">দোকান/ফ্ল্যাট নম্বর <span className="text-red-500">*</span></label>
                    <input name="shopNo" value={formData.shopNo} onChange={handleInputChange} required type="text" placeholder="যেমন: A-101" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">মাসিক ভাড়া (৳) <span className="text-red-500">*</span></label>
                      <input name="rentAmount" value={formData.rentAmount} onChange={handleInputChange} required type="number" placeholder="0" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">অগ্রিম জমা (৳)</label>
                      <input name="advanceAmount" value={formData.advanceAmount} onChange={handleInputChange} type="number" placeholder="0" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ভাড়া শুরুর তারিখ</label>
                    <input name="joinDate" value={formData.joinDate} onChange={handleInputChange} type="date" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-600" />
                  </div>

                  <div className="pt-4 flex gap-3">
                    <button type="button" onClick={() => setFormData({name: "", mobile: "", nid: "", shopNo: "", rentAmount: "", advanceAmount: "", joinDate: ""})} className="flex-1 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors">
                      বাতিল
                    </button>
                    <button type="submit" disabled={submitting} className="flex-1 bg-emerald-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
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