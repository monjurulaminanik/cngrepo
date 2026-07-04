"use client";

import { useState, useEffect } from "react";
import TopBar from "@/components/layout/TopBar";
import { Plus, Search, Car, Calendar, CheckCircle2, AlertTriangle, AlertCircle } from "lucide-react";

export default function VehiclesPage() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    carNo: "",
    regNo: "",
    modelYear: "",
    dailyTarget: 800,
    fitnessExpiry: "",
    insuranceExpiry: "",
    taxTokenExpiry: ""
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/cars");
      const result = await res.json();
      if (result.success) {
        setCars(result.data);
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
      const res = await fetch("/api/cars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const result = await res.json();
      if (result.success) {
        setCars([result.data, ...cars]);
        setFormData({
          carNo: "",
          regNo: "",
          modelYear: "",
          dailyTarget: 800,
          fitnessExpiry: "",
          insuranceExpiry: "",
          taxTokenExpiry: ""
        });
        alert("গাড়ি সফলভাবে যোগ করা হয়েছে!");
      } else {
        alert("ত্রুটি: " + result.error);
      }
    } catch (err) {
      alert("গাড়ি যোগ করতে সমস্যা হয়েছে");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <TopBar title="গাড়ির তালিকা" />
      <div className="p-6 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-800">সিএনজি ফ্লিট তালিকা</h1>
            <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">
              {cars.length} টি গাড়ি
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
          {/* Main List Section (2/3 width) */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
                <div className="relative w-64">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input 
                    type="text" 
                    placeholder="গাড়ির নম্বর দিয়ে খুঁজুন..." 
                    className="pl-9 pr-4 py-2 bg-white border border-gray-300 rounded-md text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
              
              {loading ? (
                <div className="p-8 flex justify-center items-center min-h-[400px]">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : cars.length === 0 ? (
                <div className="p-8 flex flex-col items-center justify-center text-center min-h-[400px]">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Car className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">কোনো গাড়ি পাওয়া যায়নি</h3>
                  <p className="text-gray-500 text-sm max-w-sm">
                    আপনার ফ্লিটে বর্তমানে কোনো গাড়ি নেই। নতুন গাড়ি যোগ করতে ডানদিকের ফর্মটি ব্যবহার করুন।
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 text-gray-600 text-sm border-b border-gray-200">
                        <th className="p-4 font-medium">গাড়ির নম্বর</th>
                        <th className="p-4 font-medium">মডেল</th>
                        <th className="p-4 font-medium">স্ট্যাটাস</th>
                        <th className="p-4 font-medium">দৈনিক লক্ষ্যমাত্রা</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {cars.map((car) => (
                        <tr key={car._id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="p-4">
                            <div className="font-medium text-gray-900">{car.carNo}</div>
                            <div className="text-xs text-gray-500">{car.regNo}</div>
                          </td>
                          <td className="p-4 text-gray-600">{car.modelYear || '-'}</td>
                          <td className="p-4">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${car.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {car.status === 'active' ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
                            </span>
                          </td>
                          <td className="p-4 font-medium">৳{car.dailyTarget}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Add New Car Form (1/3 width) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden sticky top-24">
              <div className="p-4 border-b border-gray-200 bg-gray-50/50">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <Plus className="w-5 h-5 text-blue-600" />
                  নতুন গাড়ি যোগ করুন
                </h2>
              </div>
              <div className="p-5">
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">গাড়ির নম্বর <span className="text-red-500">*</span></label>
                    <input name="carNo" value={formData.carNo} onChange={handleInputChange} required type="text" placeholder="যেমন: ঢাকা থ ১১-২২৩৩" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">রেজিস্ট্রেশন নম্বর</label>
                    <input name="regNo" value={formData.regNo} onChange={handleInputChange} type="text" placeholder="রেজিস্ট্রেশন নম্বর দিন" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">মডেল বছর</label>
                      <input name="modelYear" value={formData.modelYear} onChange={handleInputChange} type="text" placeholder="যেমন: 2023" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">দৈনিক লক্ষ্যমাত্রা (৳)</label>
                      <input name="dailyTarget" value={formData.dailyTarget} onChange={handleInputChange} type="number" required className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                  </div>

                  <div className="pt-2 pb-1 border-b border-gray-100">
                    <h3 className="text-sm font-medium text-gray-500 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      কাগজপত্রের মেয়াদ
                    </h3>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ফিটনেস মেয়াদ</label>
                    <input name="fitnessExpiry" value={formData.fitnessExpiry} onChange={handleInputChange} type="date" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">বীমার মেয়াদ</label>
                      <input name="insuranceExpiry" value={formData.insuranceExpiry} onChange={handleInputChange} type="date" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">ট্যাক্স টোকেন</label>
                      <input name="taxTokenExpiry" value={formData.taxTokenExpiry} onChange={handleInputChange} type="date" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600" />
                    </div>
                  </div>

                  <div className="pt-4 flex gap-3">
                    <button type="button" onClick={() => setFormData({carNo: "", regNo: "", modelYear: "", dailyTarget: 800, fitnessExpiry: "", insuranceExpiry: "", taxTokenExpiry: ""})} className="flex-1 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors">
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
