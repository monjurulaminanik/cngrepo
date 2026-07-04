const mongoose = require('mongoose');

const uri = "mongodb+srv://dawatit:dawatit@cluster0.rmthk1c.mongodb.net/wintech?appName=Cluster0";

async function testConnection() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log("SUCCESS! Connected to MongoDB");
    process.exit(0);
  } catch (error) {
    console.error("ERROR! Failed to connect:", error.message);
    process.exit(1);
  }
}

testConnection();
