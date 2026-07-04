"use client";

import { useState, useEffect } from "react";
import TopBar from "@/components/layout/TopBar";
import { Search, ShoppingCart, Trash2, CheckCircle2, User, FileText, AlertCircle } from "lucide-react";

export default function POSSalesPage() {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    mobile: ""
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
        setItems(result.data.filter(i => i.stock > 0)); // Only show items in stock
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("ডেটা লোড করতে সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem._id === item._id);
    if (existingItem) {
      if (existingItem.quantity >= item.stock) {
        alert("স্টকের চেয়ে বেশি পরিমাণ নির্বাচন করা যাবে না!");
        return;
      }
      setCart(cart.map(c => c._id === item._id ? { ...c, quantity: c.quantity + 1 } : c));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(c => c._id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    const item = items.find(i => i._id === id);
    if (item && newQuantity > item.stock) {
      alert("স্টকের চেয়ে বেশি পরিমাণ নির্বাচন করা যাবে না!");
      return;
    }
    setCart(cart.map(c => c._id === id ? { ...c, quantity: newQuantity } : c));
  };

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = async () => {
    if (cart.length === 0) return alert("কার্টে কোনো পণ্য নেই!");
    
    try {
      setSubmitting(true);
      
      // 1. Create Transaction
      const transPayload = {
        type: "income",
        category: "pos",
        amount: totalAmount,
        date: new Date().toISOString(),
        description: `পিওএস বিক্রয় - কাস্টমার: ${customerInfo.name || 'অজানা'} | আইটেম: ${cart.map(c => c.name).join(", ")}`
      };
      
      const transRes = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transPayload)
      });
      const transResult = await transRes.json();
      
      if (!transResult.success) throw new Error(transResult.error);

      // 2. Decrease Stock for each item
      for (const item of cart) {
        await fetch("/api/pos", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "decrease_stock", id: item._id, quantity: item.quantity })
        });
      }

      alert("বিক্রয় সফলভাবে সম্পন্ন হয়েছে!");
      setCart([]);
      setCustomerInfo({ name: "", mobile: "" });
      fetchItems(); // Refresh stock

    } catch (err) {
      alert("বিক্রয় সম্পন্ন করতে সমস্যা হয়েছে: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <TopBar title="পিওএস বিক্রয়" />
      <div className="p-4 lg:p-6 max-w-7xl mx-auto w-full h-[calc(100vh-64px)] flex flex-col">
        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg border border-red-200 flex items-center gap-3">
            <AlertCircle className="w-5 h-5" />
            <p>ডেটাবেস কানেক্ট করা যায়নি। আপনি বর্তমানে অফলাইন মোডে আছেন।</p>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
          {/* Left Side: Product Selection (2/3 width) */}
          <div className="lg:w-2/3 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50/50">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Search className="w-5 h-5 text-gray-500" />
                পণ্য নির্বাচন করুন
              </h2>
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input 
                  type="text" 
                  placeholder="পণ্য খুঁজুন..." 
                  className="pl-9 pr-4 py-2 bg-white border border-gray-300 rounded-md text-sm w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
            
            <div className="p-4 flex-1 overflow-y-auto bg-gray-50/30">
              {loading ? (
                <div className="h-full flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
                </div>
              ) : items.length === 0 ? (
                <div className="h-full flex items-center justify-center text-gray-500">
                  কোনো পণ্য পাওয়া যায়নি
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {items.map(item => (
                    <div 
                      key={item._id} 
                      onClick={() => addToCart(item)}
                      className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-orange-500 hover:shadow-md transition-all group flex flex-col h-full"
                    >
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-800 group-hover:text-orange-600 line-clamp-2">{item.name}</h3>
                        <p className="text-xs text-gray-500 mt-1">{item.category}</p>
                      </div>
                      <div className="mt-3 flex items-end justify-between">
                        <span className="font-bold text-gray-900">৳{item.price.toLocaleString()}</span>
                        <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">স্টক: {item.stock}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Side: Cart & Checkout (1/3 width) */}
          <div className="lg:w-1/3 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col overflow-hidden">
            <div className="p-4 border-b border-gray-200 bg-orange-50/50 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-orange-600" />
                কার্ট ({cart.length})
              </h2>
              {cart.length > 0 && (
                <button onClick={() => setCart([])} className="text-xs text-red-500 hover:text-red-700 font-medium">
                  কার্ট ক্লিয়ার করুন
                </button>
              )}
            </div>
            
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-gray-50/30">
              {cart.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                  <ShoppingCart className="w-12 h-12 mb-2 opacity-20" />
                  <p className="text-sm">কার্টে কোনো পণ্য নেই</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item._id} className="bg-white border border-gray-200 rounded-lg p-3 flex gap-3 items-center">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm text-gray-800 truncate">{item.name}</h4>
                      <p className="text-xs text-gray-500 font-medium mt-0.5">৳{item.price.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQuantity(item._id, item.quantity - 1)} className="w-7 h-7 rounded bg-gray-100 text-gray-600 hover:bg-gray-200 flex items-center justify-center font-medium">-</button>
                      <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="w-7 h-7 rounded bg-gray-100 text-gray-600 hover:bg-gray-200 flex items-center justify-center font-medium">+</button>
                    </div>
                    <div className="text-sm font-bold text-gray-900 w-16 text-right">
                      ৳{(item.price * item.quantity).toLocaleString()}
                    </div>
                    <button onClick={() => removeFromCart(item._id)} className="text-red-400 hover:text-red-600 p-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Checkout Form */}
            <div className="border-t border-gray-200 p-4 bg-white">
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <input type="text" placeholder="কাস্টমারের নাম (ঐচ্ছিক)" value={customerInfo.name} onChange={e => setCustomerInfo({...customerInfo, name: e.target.value})} className="flex-1 text-sm border-none focus:ring-0 p-0 text-gray-700 placeholder-gray-400 bg-transparent" />
                </div>
                <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
                  <FileText className="w-4 h-4 text-gray-400" />
                  <input type="text" placeholder="মোবাইল নম্বর (ঐচ্ছিক)" value={customerInfo.mobile} onChange={e => setCustomerInfo({...customerInfo, mobile: e.target.value})} className="flex-1 text-sm border-none focus:ring-0 p-0 text-gray-700 placeholder-gray-400 bg-transparent" />
                </div>
              </div>

              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600 font-medium">মোট বিল:</span>
                <span className="text-2xl font-bold text-orange-600">৳{totalAmount.toLocaleString()}</span>
              </div>
              
              <button 
                onClick={handleCheckout}
                disabled={cart.length === 0 || submitting}
                className={`w-full py-3 rounded-lg font-bold text-white flex justify-center items-center gap-2 transition-colors ${
                  cart.length > 0 && !submitting ? 'bg-orange-600 hover:bg-orange-700' : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                <CheckCircle2 className="w-5 h-5" />
                {submitting ? 'প্রসেস হচ্ছে...' : 'পেমেন্ট গ্রহণ করুন'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}