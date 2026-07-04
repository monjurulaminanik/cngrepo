"use client";

import { useState, useEffect } from "react";
import TopBar from "@/components/layout/TopBar";
import { Plus, Search, Users, CheckCircle2, AlertCircle } from "lucide-react";

export default function DriversPage() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    licenseNo: "",
    nid: "",
    address: ""
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/drivers");
      const result = await res.json();
      if (result.success) {
        setDrivers(result.data);
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
      const res = await fetch("/api/drivers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const result = await res.json();
      if (result.success) {
        setDrivers([result.data, ...drivers]);
        setFormData({ name: "", mobile: "", licenseNo: "", nid: "", address: "" });
        alert("ড্রাইভার সফলভাবে যোগ করা হয়েছে!");
      } else {
        alert("ত্রুটি: " + result.error);
      }
    } catch (err) {
      alert("ড্রাইভার যোগ করতে সমস্যা হয়েছে");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <TopBar title="ড্রাইভার তালিকা" />
      <div className="p-6 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-800">ড্রাইভার প্রোফাইল সমূহ</h1>
            <span className="bg-indigo-100 text-indigo-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">{drivers.length} জন ড্রাইভার</span>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg border border-red-200 flex items-center gap-3">
            <AlertCircle className="w-5 h-5" />
            <p>ডেটাবেস কানেক্ট করা যায়নি। আপনি বর্তমানে অফলাইন মোডে আছেন।</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
                <div className="relative w-64">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input 
                    type="text" 
                    placeholder="নাম বা মোবাইল নম্বর খুঁজুন..." 
                    className="pl-9 pr-4 py-2 bg-white border border-gray-300 rounded-md text-sm w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {loading ? (
                <div className="p-8 flex justify-center items-center min-h-[400px]">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                </div>
              ) : drivers.length === 0 ? (
                <div className="p-8 flex flex-col items-center justify-center text-center min-h-[400px]">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Users className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">কোনো ড্রাইভার পাওয়া যায়নি</h3>
                  <p className="text-gray-500 text-sm max-w-sm">
                    আপনার সিস্টেমে বর্তমানে কোনো ড্রাইভার নেই। নতুন ড্রাইভার যোগ করতে ডানদিকের ফর্মটি ব্যবহার করুন।
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 text-gray-600 text-sm border-b border-gray-200">
                        <th className="p-4 font-medium">ড্রাইভারের নাম</th>
                        <th className="p-4 font-medium">মোবাইল নম্বর</th>
                        <th className="p-4 font-medium">লাইসেন্স নম্বর</th>
                        <th className="p-4 font-medium">স্ট্যাটাস</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {drivers.map(driver => (
                        <tr key={driver._id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="p-4 font-medium text-gray-900 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
                              {driver.name.charAt(0)}
                            </div>
                            {driver.name}
                          </td>
                          <td className="p-4 text-gray-600">{driver.mobile}</td>
                          <td className="p-4 text-gray-600">{driver.licenseNo || '-'}</td>
                          <td className="p-4">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${driver.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {driver.status === 'active' ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
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

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden sticky top-24">
              <div className="p-4 border-b border-gray-200 bg-gray-50/50">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <Plus className="w-5 h-5 text-indigo-600" />
                  নতুন ড্রাইভার যোগ করুন
                </h2>
              </div>
              <div className="p-5">
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ড্রাইভারের নাম <span className="text-red-500">*</span></label>
                    <input name="name" value={formData.name} onChange={handleInputChange} required type="text" placeholder="যেমন: মোঃ আব্দুল্লাহ" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">মোবাইল নম্বর <span className="text-red-500">*</span></label>
                    <input name="mobile" value={formData.mobile} onChange={handleInputChange} required type="text" placeholder="০১৭XXXXXXXX" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">লাইসেন্স নম্বর (ঐচ্ছিক)</label>
                    <input name="licenseNo" value={formData.licenseNo} onChange={handleInputChange} type="text" placeholder="ড্রাইভিং লাইসেন্স নম্বর দিন" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">জাতীয় পরিচয়পত্র (NID) (ঐচ্ছিক)</label>
                    <input name="nid" value={formData.nid} onChange={handleInputChange} type="text" placeholder="NID নম্বর দিন" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">বর্তমান ঠিকানা (ঐচ্ছিক)</label>
                    <textarea name="address" value={formData.address} onChange={handleInputChange} rows={2} placeholder="ঠিকানা লিখুন" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"></textarea>
                  </div>

                  <div className="pt-4 flex gap-3">
                    <button type="button" onClick={() => setFormData({name:"", mobile:"", licenseNo:"", nid:"", address:""})} className="flex-1 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors">
                      বাতিল
                    </button>
                    <button type="submit" disabled={submitting} className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
                      <CheckCircle2 className="w-4 h-4" />
                      {submitting ? "সংরক্ষণ..." : "সংরক্ষণ করুন"}
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