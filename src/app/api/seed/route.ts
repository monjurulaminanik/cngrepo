import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Car } from "@/models/Car";
import { Driver } from "@/models/Driver";
import { Tenant } from "@/models/Tenant";
import { PosItem } from "@/models/PosItem";
import { Transaction } from "@/models/Transaction";
import { Attendance } from "@/models/Attendance";

export async function GET() {
  try {
    const db = await connectDB();
    if (!db) {
      return NextResponse.json({ success: false, error: "Database offline" }, { status: 503 });
    }

    // Clear existing data
    await Car.deleteMany({});
    await Driver.deleteMany({});
    await Tenant.deleteMany({});
    await PosItem.deleteMany({});
    await Transaction.deleteMany({});
    await Attendance.deleteMany({});

    // 1. Seed 15 Cars
    const cars = await Car.insertMany([
      { carNo: "ঢাকা মেট্রো-থ ১১-২২৩৩", regNo: "REG-2023-001", modelYear: "2018", dailyTarget: 1000 },
      { carNo: "ঢাকা মেট্রো-থ ১৪-৫৫৬৬", regNo: "REG-2022-045", modelYear: "2019", dailyTarget: 1000 },
      { carNo: "ঢাকা মেট্রো-থ ১৫-৭৭৮৮", regNo: "REG-2021-089", modelYear: "2020", dailyTarget: 1200 },
      { carNo: "ঢাকা মেট্রো-থ ১২-৯৯০০", regNo: "REG-2023-112", modelYear: "2021", dailyTarget: 1200 },
      { carNo: "ঢাকা মেট্রো-থ ১৩-৪৪৩৩", regNo: "REG-2020-003", modelYear: "2017", dailyTarget: 900 },
      { carNo: "ঢাকা মেট্রো-থ ১১-৮৮৯৯", regNo: "REG-2019-100", modelYear: "2019", dailyTarget: 1000 },
      { carNo: "ঢাকা মেট্রো-থ ১৬-২১৪৫", regNo: "REG-2021-230", modelYear: "2020", dailyTarget: 1100 },
      { carNo: "ঢাকা মেট্রো-থ ১৭-৬৬৭৭", regNo: "REG-2024-001", modelYear: "2023", dailyTarget: 1300 },
      { carNo: "সিলেট মেট্রো-থ ১১-০০১১", regNo: "REG-2015-44", modelYear: "2016", dailyTarget: 800 },
      { carNo: "কুমিল্লা মেট্রো-থ ১২-৩৩৪৪", regNo: "REG-2018-99", modelYear: "2018", dailyTarget: 950 },
      { carNo: "ঢাকা মেট্রো-থ ১৫-১১২২", regNo: "REG-2020-40", modelYear: "2021", dailyTarget: 1150 },
      { carNo: "ঢাকা মেট্রো-থ ১৪-৭৭৮৮", regNo: "REG-2017-09", modelYear: "2018", dailyTarget: 1000 },
      { carNo: "ঢাকা মেট্রো-থ ১৩-৫৫০০", regNo: "REG-2022-01", modelYear: "2022", dailyTarget: 1250 },
      { carNo: "নারায়ণগঞ্জ থ ১২-৬৬৭৭", regNo: "REG-2019-80", modelYear: "2019", dailyTarget: 950 },
      { carNo: "ঢাকা মেট্রো-থ ১৭-৯৯০০", regNo: "REG-2024-05", modelYear: "2024", dailyTarget: 1400 },
    ]);

    // 2. Seed 15 Drivers
    const drivers = await Driver.insertMany([
      { name: "মোঃ রহিম মিয়া", mobile: "01711223344", nid: "1990123456789", licenseNo: "DL-DH-123", joinDate: new Date("2023-01-15") },
      { name: "করিম উদ্দিন", mobile: "01822334455", nid: "1988123456789", licenseNo: "DL-DH-456", joinDate: new Date("2023-03-10") },
      { name: "আব্দুল জব্বার", mobile: "01933445566", nid: "1985123456789", licenseNo: "DL-DH-789", joinDate: new Date("2022-11-05") },
      { name: "শফিকুল ইসলাম", mobile: "01644556677", nid: "1992123456789", licenseNo: "DL-DH-012", joinDate: new Date("2024-02-20") },
      { name: "হাবিবুর রহমান", mobile: "01555667788", nid: "1989123456789", licenseNo: "DL-DH-345", joinDate: new Date("2023-08-12") },
      { name: "জাকির হোসেন", mobile: "01788990011", nid: "1991123456780", licenseNo: "DL-DH-101", joinDate: new Date("2021-05-10") },
      { name: "নুরুল ইসলাম", mobile: "01877665544", nid: "1984123456781", licenseNo: "DL-DH-102", joinDate: new Date("2020-12-01") },
      { name: "শাহীন আলম", mobile: "01966554433", nid: "1995123456782", licenseNo: "DL-DH-103", joinDate: new Date("2024-01-05") },
      { name: "মিরাজুল খন্দকার", mobile: "01655443322", nid: "1993123456783", licenseNo: "DL-DH-104", joinDate: new Date("2022-04-18") },
      { name: "কামরুল হাসান", mobile: "01544332211", nid: "1987123456784", licenseNo: "DL-DH-105", joinDate: new Date("2019-09-22") },
      { name: "রফিকুল ইসলাম", mobile: "01733221100", nid: "1986123456785", licenseNo: "DL-DH-106", joinDate: new Date("2023-11-11") },
      { name: "আলী আকবর", mobile: "01822110099", nid: "1994123456786", licenseNo: "DL-DH-107", joinDate: new Date("2022-07-30") },
      { name: "সাদ্দাম হোসেন", mobile: "01911009988", nid: "1990123456787", licenseNo: "DL-DH-108", joinDate: new Date("2021-02-14") },
      { name: "বাপ্পি চৌধুরী", mobile: "01600998877", nid: "1996123456788", licenseNo: "DL-DH-109", joinDate: new Date("2024-03-01") },
      { name: "শরিফুল মুন্সী", mobile: "01599887766", nid: "1982123456799", licenseNo: "DL-DH-110", joinDate: new Date("2018-06-20") },
    ]);

    // 3. Seed 10 Tenants
    const tenants = await Tenant.insertMany([
      { name: "আহমেদ আলি", mobile: "01799887766", nid: "1980123456789", property: "রহমান ভিলা", shopNo: "A1", rentAmount: 15000, advanceAmount: 30000, joinDate: new Date("2022-01-01") },
      { name: "নজরুল ইসলাম", mobile: "01888776655", nid: "1982123456789", property: "রহমান ভিলা", shopNo: "B2", rentAmount: 12000, advanceAmount: 24000, joinDate: new Date("2023-05-15") },
      { name: "ফাতেমা বেগম", mobile: "01977665544", nid: "1990123456789", property: "হাজী ম্যানশন", shopNo: "F-Right", rentAmount: 20000, advanceAmount: 50000, joinDate: new Date("2021-10-01") },
      { name: "কাজী তারেক", mobile: "01666554433", nid: "1985123456789", property: "হাজী ম্যানশন", shopNo: "S-Left", rentAmount: 18000, advanceAmount: 36000, joinDate: new Date("2024-01-01") },
      { name: "সায়েম রহমান", mobile: "01711122233", nid: "1988123456701", property: "খন্দকার প্লাজা", shopNo: "Shop-1", rentAmount: 8000, advanceAmount: 16000, joinDate: new Date("2023-08-01") },
      { name: "মুনির হোসেন", mobile: "01822233344", nid: "1991123456702", property: "খন্দকার প্লাজা", shopNo: "Shop-2", rentAmount: 8500, advanceAmount: 17000, joinDate: new Date("2022-11-15") },
      { name: "খাদিজা আক্তার", mobile: "01933344455", nid: "1995123456703", property: "আয়েশা ভবন", shopNo: "Ground-A", rentAmount: 25000, advanceAmount: 60000, joinDate: new Date("2020-05-10") },
      { name: "রতন সাহা", mobile: "01644455566", nid: "1983123456704", property: "আয়েশা ভবন", shopNo: "Ground-B", rentAmount: 22000, advanceAmount: 55000, joinDate: new Date("2021-03-22") },
      { name: "শফিক এন্টারপ্রাইজ", mobile: "01555566677", nid: "1979123456705", property: "মোল্লা মার্কেট", shopNo: "M-101", rentAmount: 35000, advanceAmount: 100000, joinDate: new Date("2019-01-01") },
      { name: "হাবিব স্টোর", mobile: "01766677788", nid: "1986123456706", property: "মোল্লা মার্কেট", shopNo: "M-102", rentAmount: 30000, advanceAmount: 80000, joinDate: new Date("2019-06-15") },
    ]);

    // 4. Seed 15 POS Items
    const posItems = await PosItem.insertMany([
      { name: "মবিল সুপার (1L)", category: "Lubricant", price: 500, stock: 50 },
      { name: "মবিল সুপার (5L)", category: "Lubricant", price: 2200, stock: 20 },
      { name: "বাজাজ ব্রেক শু", category: "Parts", price: 400, stock: 30 },
      { name: "এনজিকে স্পার্ক প্লাগ", category: "Parts", price: 200, stock: 100 },
      { name: "সিএনজি এয়ার ফিল্টার", category: "Parts", price: 350, stock: 40 },
      { name: "গাজী সিএনজি টায়ার", category: "Parts", price: 1500, stock: 15 },
      { name: "ম্যাক্স গিয়ার অয়েল", category: "Lubricant", price: 450, stock: 25 },
      { name: "হেডলাইট বাল্ব", category: "Parts", price: 150, stock: 60 },
      { name: "ইন্ডিকেটর লাইট", category: "Parts", price: 120, stock: 80 },
      { name: "ক্লাচ ক্যাবল", category: "Parts", price: 250, stock: 35 },
      { name: "ব্রেক ক্যাবল", category: "Parts", price: 220, stock: 45 },
      { name: "সিট কভার", category: "Tools", price: 800, stock: 10 },
      { name: "লুকিং গ্লাস (জোড়া)", category: "Parts", price: 600, stock: 18 },
      { name: "স্ক্রু ড্রাইভার সেট", category: "Tools", price: 450, stock: 12 },
      { name: "সিএনজি বাম্পার", category: "Parts", price: 1200, stock: 8 },
    ]);

    // 5. Seed Daily Attendance and Transactions for the last 7 days
    const today = new Date();
    today.setHours(0,0,0,0);
    
    let allTransactions = [];
    let allAttendances = [];

    // Loop through the last 7 days
    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      
      // Daily CNG Collections
      for (let j = 0; j < 12; j++) {
        // Randomly pick driver and car
        const car = cars[j];
        const driver = drivers[j];
        const shift = j % 2 === 0 ? 'morning' : 'evening';
        const isPresent = Math.random() > 0.1; // 90% present
        
        const att = {
          driverId: driver._id,
          carId: car._id,
          date: new Date(d),
          status: isPresent ? 'present' : 'absent',
          shift: shift
        };
        allAttendances.push(att);

        if (isPresent) {
          const amount = car.dailyTarget - (Math.floor(Math.random() * 200)); // Target minus some random shortfall
          allTransactions.push({
            type: "income", 
            category: "cng", 
            amount: amount, 
            date: new Date(d), 
            description: `দৈনিক জমা - ${car.carNo}` 
          });
        }
      }

      // Random Rent Collections (mostly towards beginning of month, but let's scatter them)
      if (i % 3 === 0) {
        allTransactions.push({ 
          type: "income", 
          category: "rent", 
          amount: tenants[i % tenants.length].rentAmount, 
          date: new Date(d), 
          description: `ভাড়া আদায় - ${tenants[i % tenants.length].name} (${tenants[i % tenants.length].shopNo})` 
        });
      }

      // Random POS Sales
      for(let k = 0; k < 3; k++) {
        const item = posItems[Math.floor(Math.random() * posItems.length)];
        allTransactions.push({ 
          type: "income", 
          category: "pos", 
          amount: item.price * (Math.floor(Math.random() * 3) + 1), 
          date: new Date(d), 
          description: `পার্টস বিক্রয় - ${item.name}` 
        });
      }

      // Random Expenses (Maintenance, Salary, Others)
      if (i % 2 === 0) {
         allTransactions.push({ type: "expense", category: "maintenance", amount: 1500, date: new Date(d), description: `গাড়ি মেরামত - ${cars[0].carNo}` });
      }
      allTransactions.push({ type: "expense", category: "other", amount: Math.floor(Math.random() * 500) + 100, date: new Date(d), description: "অফিস খরচ ও চা-নাস্তা" });
    }

    // Insert Attendances
    await Attendance.insertMany(allAttendances);
    
    // Insert Transactions
    const insertedTransactions = await Transaction.insertMany(allTransactions);

    return NextResponse.json({ 
      success: true, 
      message: "Database seeded successfully with massive Bangladeshi dummy data!",
      data: {
        cars: cars.length,
        drivers: drivers.length,
        tenants: tenants.length,
        posItems: posItems.length,
        attendances: allAttendances.length,
        transactions: insertedTransactions.length
      }
    });

  } catch (error) {
    console.error("Seeding error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
