"use client";

import { useState, useEffect } from "react";
import TopBar from "@/components/layout/TopBar";
import { Plus, Search, FileText, CheckCircle2, Clock, CheckCircle, AlertTriangle, AlertCircle } from "lucide-react";

export default function DailyAttendancePage() {
  const [attendances, setAttendances] = useState([]);
  const [cars, setCars] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  
  const [formData, setFormData] = useState({
    carId: "",
    driverId: "",
    date: selectedDate,
    status: "present",
    shift: "full",
    collection: ""
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchData();
  }, [selectedDate]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [attRes, carRes, driverRes] = await Promise.all([
        fetch(`/api/cng-attendance?date=${selectedDate}`),
        fetch("/api/cars"),
        fetch("/api/drivers")
      ]);
      
      const attData = await attRes.json();
      const carData = await carRes.json();
      const driverData = await driverRes.json();

      if (attData.success) setAttendances(attData.data);
      else if (attData.error === "Database offline") setError("ডেটাবেস কানেক্ট করা যায়নি (Offline)");
      
      if (carData.success) setCars(carData.data);
      if (driverData.success) setDrivers(driverData.data);
      
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
      const res = await fetch("/api/cng-attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const result = await res.json();
      if (result.success) {
        alert("হাজিরা সফলভাবে এন্ট্রি করা হয়েছে!");
        fetchData(); // Refresh data
        setFormData(prev => ({
          ...prev,
          carId: "",
          driverId: "",
          collection: ""
        }));
      } else {
        alert("ত্রুটি: " + result.error);
      }
    } catch (err) {
      alert("এন্ট্রি করতে সমস্যা হয়েছে");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <TopBar title="দৈনিক হাজিরা" />
      <div className="p-6 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-800">দৈনিক হাজিরা এন্ট্রি</h1>
            <span className="bg-purple-100 text-purple-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">আজকের এন্ট্রি: {attendances.length}</span>
          </div>
        </div>
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg border border-red-200 flex items-center gap-3">
            <AlertCircle className="w-5 h-5" />
            <p>{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main List Section (2/3 width) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            
            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium text-gray-500">মোট এন্ট্রি</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">{attendances.length}</h3>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium text-gray-500">উপস্থিত</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">{attendances.filter(a => a.status === 'present').length}</h3>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  <span className="text-sm font-medium text-gray-500">অনুপস্থিত/ছুটি</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">{attendances.filter(a => a.status !== 'present').length}</h3>
              </div>
            </div>

            {/* List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex-1">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
                <div className="relative w-64">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input 
                    type="text" 
                    placeholder="গাড়ি বা ড্রাইভার খুঁজুন..." 
                    className="pl-9 pr-4 py-2 bg-white border border-gray-300 rounded-md text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <input 
                  type="date" 
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
              </div>
              
              {loading ? (
                <div className="p-8 flex justify-center items-center min-h-[300px]">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : attendances.length === 0 ? (
                <div className="p-8 flex flex-col items-center justify-center text-center min-h-[300px]">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Clock className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">কোনো এন্ট্রি নেই</h3>
                  <p className="text-gray-500 text-sm max-w-sm">
                    নতুন হাজিরা এন্ট্রি করতে ডানদিকের ফর্মটি ব্যবহার করুন।
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 text-gray-600 text-sm border-b border-gray-200">
                        <th className="p-4 font-medium">ড্রাইভার</th>
                        <th className="p-4 font-medium">গাড়ি</th>
                        <th className="p-4 font-medium">শিফট</th>
                        <th className="p-4 font-medium">স্ট্যাটাস</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {attendances.map((att) => (
                        <tr key={att._id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="p-4 font-medium text-gray-900">{att.driverId?.name || 'N/A'}</td>
                          <td className="p-4 text-gray-600">{att.carId?.carNo || 'N/A'}</td>
                          <td className="p-4 text-gray-600">
                            {att.shift === 'morning' ? 'সকাল' : att.shift === 'evening' ? 'বিকাল' : 'সারাদিন'}
                          </td>
                          <td className="p-4">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${att.status === 'present' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {att.status === 'present' ? 'উপস্থিত' : 'অনুপস্থিত'}
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

          {/* Add New Attendance Form (1/3 width) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden sticky top-24">
              <div className="p-4 border-b border-gray-200 bg-gray-50/50">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <Plus className="w-5 h-5 text-purple-600" />
                  নতুন হাজিরা এন্ট্রি
                </h2>
              </div>
              <div className="p-5">
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">তারিখ</label>
                    <input name="date" type="date" required value={formData.date} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-600 bg-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">সিএনজি গাড়ি <span className="text-red-500">*</span></label>
                    <select name="carId" value={formData.carId} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-600 bg-white">
                      <option value="">গাড়ি নির্বাচন করুন</option>
                      {cars.map(car => (
                        <option key={car._id} value={car._id}>{car.carNo}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ড্রাইভার <span className="text-red-500">*</span></label>
                    <select name="driverId" value={formData.driverId} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-600 bg-white">
                      <option value="">ড্রাইভার নির্বাচন করুন</option>
                      {drivers.map(driver => (
                        <option key={driver._id} value={driver._id}>{driver.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">শিফট</label>
                    <select name="shift" value={formData.shift} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-600 bg-white">
                      <option value="full">সারাদিন</option>
                      <option value="morning">সকাল</option>
                      <option value="evening">বিকাল</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">অবস্থা</label>
                    <select name="status" value={formData.status} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-600 bg-white">
                      <option value="present">উপস্থিত (Running)</option>
                      <option value="absent">অনুপস্থিত/ছুটি</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">কালেকশন (৳) [ঐচ্ছিক]</label>
                    <input name="collection" value={formData.collection} onChange={handleInputChange} type="number" placeholder="০" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" />
                  </div>

                  <div className="pt-4 flex gap-3">
                    <button type="submit" disabled={submitting} className="w-full bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
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
