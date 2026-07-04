"use client";

import { useState, useEffect } from "react";
import TopBar from "@/components/layout/TopBar";
import { Plus, Search, CheckCircle2, CreditCard, AlertCircle } from "lucide-react";

export default function RentCollectionPage() {
  const [transactions, setTransactions] = useState([]);
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));

  const [formData, setFormData] = useState({
    tenantId: "",
    month: selectedMonth,
    utilityBill: 0,
    paidAmount: "",
    paymentMethod: "cash"
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchData();
  }, [selectedMonth]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [transRes, tenantRes] = await Promise.all([
        fetch(`/api/transactions?category=rent`),
        fetch("/api/tenants")
      ]);
      
      const transData = await transRes.json();
      const tenantData = await tenantRes.json();

      if (transData.success) {
        // Filter by month
        const filtered = transData.data.filter(t => t.date.startsWith(selectedMonth));
        setTransactions(filtered);
      } else {
        setError(transData.error);
      }
      
      if (tenantData.success) {
        setTenants(tenantData.data);
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

  const selectedTenant = tenants.find(t => t._id === formData.tenantId);
  const baseRent = selectedTenant ? selectedTenant.rentAmount : 0;
  const totalPayable = baseRent + Number(formData.utilityBill);
  const due = totalPayable - Number(formData.paidAmount || 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.tenantId || !formData.paidAmount) return alert("প্রয়োজনীয় ফিল্ড পূরণ করুন!");
    
    try {
      setSubmitting(true);
      
      const payload = {
        type: "income",
        category: "rent",
        amount: Number(formData.paidAmount),
        date: new Date(formData.month + "-01").toISOString(), // Store the month as date
        description: `মাসের ভাড়া: ${formData.month} | ইউটিলিটি: ৳${formData.utilityBill} | মাধ্যম: ${formData.paymentMethod}`,
        refId: formData.tenantId
      };

      const res = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await res.json();
      if (result.success) {
        alert("ভাড়া সফলভাবে আদায় করা হয়েছে!");
        fetchData();
        setFormData(prev => ({ ...prev, tenantId: "", utilityBill: 0, paidAmount: "" }));
      } else {
        alert("ত্রুটি: " + result.error);
      }
    } catch (err) {
      alert("ভাড়া আদায় করতে সমস্যা হয়েছে");
    } finally {
      setSubmitting(false);
    }
  };

  const totalCollectedThisMonth = transactions.reduce((sum, t) => sum + t.amount, 0);

  return (
    <>
      <TopBar title="ভাড়া সংগ্রহ" />
      <div className="p-6 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-800">ভাড়া আদায় রেজিস্টার</h1>
            <span className="bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">
              এই মাসের আদায়: ৳{totalCollectedThisMonth.toLocaleString()}
            </span>
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
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden h-full flex flex-col">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
                <div className="relative w-64">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input 
                    type="text" 
                    placeholder="খুঁজুন..." 
                    className="pl-9 pr-4 py-2 bg-white border border-gray-300 rounded-md text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  />
                </div>
                <input 
                  type="month" 
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500" 
                />
              </div>
              
              {loading ? (
                <div className="flex-1 p-8 flex justify-center items-center min-h-[400px]">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                </div>
              ) : transactions.length === 0 ? (
                <div className="flex-1 p-8 flex flex-col items-center justify-center text-center min-h-[400px]">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <CreditCard className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">কোনো ভাড়া আদায়ের রেকর্ড নেই</h3>
                  <p className="text-gray-500 text-sm max-w-sm">
                    ভাড়া আদায়ের রেকর্ড যোগ করতে ডানদিকের ফর্মটি ব্যবহার করুন।
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto flex-1">
                  <table className="w-full text-left text-sm text-gray-600">
                    <thead className="bg-gray-50 text-gray-700 font-medium border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-4">ভাড়াটের নাম/দোকান</th>
                        <th className="px-6 py-4">বিবরণ</th>
                        <th className="px-6 py-4">পরিশোধিত</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {transactions.map(t => {
                        const tTenant = tenants.find(te => te._id === t.refId);
                        return (
                          <tr key={t._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 font-medium text-gray-900">
                              {tTenant ? `${tTenant.name} (দোকান: ${tTenant.shopNo})` : 'অজানা ভাড়াটে'}
                            </td>
                            <td className="px-6 py-4 text-xs text-gray-500">{t.description}</td>
                            <td className="px-6 py-4 font-medium text-green-600">৳{t.amount.toLocaleString()}</td>
                          </tr>
                        );
                      })}
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
                  <Plus className="w-5 h-5 text-green-600" />
                  ভাড়া এন্ট্রি
                </h2>
              </div>
              <div className="p-5">
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ভাড়াটে <span className="text-red-500">*</span></label>
                    <select name="tenantId" value={formData.tenantId} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-600 bg-white">
                      <option value="">নির্বাচন করুন</option>
                      {tenants.map(t => (
                        <option key={t._id} value={t._id}>{t.name} (দোকান: {t.shopNo})</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">মাসের নাম <span className="text-red-500">*</span></label>
                    <input name="month" value={formData.month} onChange={handleInputChange} required type="month" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-600" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">মূল ভাড়া (৳)</label>
                      <input type="number" value={baseRent} disabled className="w-full px-3 py-2 border border-gray-200 bg-gray-50 rounded-md text-sm text-gray-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">বিদ্যুৎ/গ্যাস/পানি</label>
                      <input name="utilityBill" value={formData.utilityBill} onChange={handleInputChange} type="number" placeholder="০" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">পেমেন্ট মেথড</label>
                      <select name="paymentMethod" value={formData.paymentMethod} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-600 bg-white">
                        <option value="cash">নগদ</option>
                        <option value="bank">ব্যাংক</option>
                        <option value="bkash">বিকাশ/নগদ</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">পরিশোধিত (৳) <span className="text-red-500">*</span></label>
                      <input name="paidAmount" value={formData.paidAmount} onChange={handleInputChange} required type="number" placeholder="০" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
                    </div>
                  </div>

                  <div className="pt-2 pb-2 border-t border-b border-gray-100 flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">বকেয়া:</span>
                    <span className={`text-lg font-bold ${due > 0 ? 'text-red-500' : 'text-green-500'}`}>
                      ৳{due}
                    </span>
                  </div>

                  <div className="pt-4 flex gap-3">
                    <button type="button" onClick={() => setFormData(prev => ({...prev, tenantId: "", paidAmount: "", utilityBill: 0}))} className="flex-1 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors">
                      বাতিল
                    </button>
                    <button type="submit" disabled={submitting} className="flex-1 bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
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