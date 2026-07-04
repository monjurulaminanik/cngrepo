export const dummyCars = [
  { _id: "c1", carNo: "ঢাকা মেট্রো-থ ১১-২২৩৩", regNo: "REG-2023-001", modelYear: "2018", dailyTarget: 1000 },
  { _id: "c2", carNo: "ঢাকা মেট্রো-থ ১৪-৫৫৬৬", regNo: "REG-2022-045", modelYear: "2019", dailyTarget: 1000 },
  { _id: "c3", carNo: "ঢাকা মেট্রো-থ ১৫-৭৭৮৮", regNo: "REG-2021-089", modelYear: "2020", dailyTarget: 1200 },
  { _id: "c4", carNo: "ঢাকা মেট্রো-থ ১২-৯৯০০", regNo: "REG-2023-112", modelYear: "2021", dailyTarget: 1200 },
  { _id: "c5", carNo: "ঢাকা মেট্রো-থ ১৩-৪৪৩৩", regNo: "REG-2020-003", modelYear: "2017", dailyTarget: 900 },
  { _id: "c6", carNo: "ঢাকা মেট্রো-থ ১১-৮৮৯৯", regNo: "REG-2019-100", modelYear: "2019", dailyTarget: 1000 },
  { _id: "c7", carNo: "ঢাকা মেট্রো-থ ১৬-২১৪৫", regNo: "REG-2021-230", modelYear: "2020", dailyTarget: 1100 },
  { _id: "c8", carNo: "ঢাকা মেট্রো-থ ১৭-৬৬৭৭", regNo: "REG-2024-001", modelYear: "2023", dailyTarget: 1300 },
  { _id: "c9", carNo: "সিলেট মেট্রো-থ ১১-০০১১", regNo: "REG-2015-44", modelYear: "2016", dailyTarget: 800 },
  { _id: "c10", carNo: "কুমিল্লা মেট্রো-থ ১২-৩৩৪৪", regNo: "REG-2018-99", modelYear: "2018", dailyTarget: 950 },
];

export const dummyDrivers = [
  { _id: "d1", name: "মোঃ রহিম মিয়া", mobile: "01711223344", licenseNo: "DL-DH-123", status: "active" },
  { _id: "d2", name: "করিম উদ্দিন", mobile: "01822334455", licenseNo: "DL-DH-456", status: "active" },
  { _id: "d3", name: "আব্দুল জব্বার", mobile: "01933445566", licenseNo: "DL-DH-789", status: "active" },
  { _id: "d4", name: "শফিকুল ইসলাম", mobile: "01644556677", licenseNo: "DL-DH-012", status: "active" },
  { _id: "d5", name: "হাবিবুর রহমান", mobile: "01555667788", licenseNo: "DL-DH-345", status: "active" },
  { _id: "d6", name: "জাকির হোসেন", mobile: "01788990011", licenseNo: "DL-DH-101", status: "active" },
  { _id: "d7", name: "নুরুল ইসলাম", mobile: "01877665544", licenseNo: "DL-DH-102", status: "active" },
];

export const dummyTenants = [
  { _id: "t1", name: "আহমেদ আলি", mobile: "01799887766", property: "রহমান ভিলা", shopNo: "A1", rentAmount: 15000 },
  { _id: "t2", name: "নজরুল ইসলাম", mobile: "01888776655", property: "রহমান ভিলা", shopNo: "B2", rentAmount: 12000 },
  { _id: "t3", name: "ফাতেমা বেগম", mobile: "01977665544", property: "হাজী ম্যানশন", shopNo: "F-Right", rentAmount: 20000 },
  { _id: "t4", name: "কাজী তারেক", mobile: "01666554433", property: "হাজী ম্যানশন", shopNo: "S-Left", rentAmount: 18000 },
  { _id: "t5", name: "সায়েম রহমান", mobile: "01711122233", property: "খন্দকার প্লাজা", shopNo: "Shop-1", rentAmount: 8000 },
];

export const dummyPosItems = [
  { _id: "p1", name: "মবিল সুপার (1L)", category: "Lubricant", price: 500, stock: 50 },
  { _id: "p2", name: "মবিল সুপার (5L)", category: "Lubricant", price: 2200, stock: 20 },
  { _id: "p3", name: "বাজাজ ব্রেক শু", category: "Parts", price: 400, stock: 30 },
  { _id: "p4", name: "এনজিকে স্পার্ক প্লাগ", category: "Parts", price: 200, stock: 100 },
  { _id: "p5", name: "সিএনজি এয়ার ফিল্টার", category: "Parts", price: 350, stock: 40 },
  { _id: "p6", name: "গাজী সিএনজি টায়ার", category: "Parts", price: 1500, stock: 15 },
];

// Generate 50 dummy transactions for dashboard
export const dummyTransactions = [];
const today = new Date();
for(let i=0; i<30; i++) {
  const d = new Date(today);
  d.setDate(today.getDate() - (i % 7)); // Spread over 7 days
  
  // CNG Incomes
  dummyTransactions.push({ _id: `tx_cng_${i}`, type: "income", category: "cng", amount: 900 + Math.floor(Math.random() * 300), date: d.toISOString(), description: "দৈনিক জমা" });
  
  // POS Incomes
  dummyTransactions.push({ _id: `tx_pos_${i}`, type: "income", category: "pos", amount: 200 + Math.floor(Math.random() * 800), date: d.toISOString(), description: "পার্টস বিক্রয়" });
  
  // Rent Incomes
  if (i < 5) {
    dummyTransactions.push({ _id: `tx_rent_${i}`, type: "income", category: "rent", amount: 12000 + Math.floor(Math.random() * 5000), date: d.toISOString(), description: "ভাড়া আদায়", refId: `t${i+1}` });
  }

  // Expenses
  if (i % 3 === 0) {
    dummyTransactions.push({ _id: `tx_exp_${i}`, type: "expense", category: "maintenance", amount: 500 + Math.floor(Math.random() * 1500), date: d.toISOString(), description: "গাড়ি মেরামত" });
  }
}

export const dummyAttendances = [];
for(let i=0; i<15; i++) {
  const d = new Date();
  dummyAttendances.push({
    _id: `att_${i}`,
    driverId: dummyDrivers[i%dummyDrivers.length]._id,
    carId: dummyCars[i%dummyCars.length]._id,
    shift: i%2===0 ? 'morning' : 'evening',
    status: 'present',
    date: d.toISOString()
  });
}
