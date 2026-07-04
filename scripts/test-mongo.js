const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://anikwitinstitute_db_user:anikwitinstitutegmailcom@d360crm.s0ebokd.mongodb.net/wintech?appName=D360CRM";

const client = new MongoClient(uri, {
  serverSelectionTimeoutMS: 5000,
  family: 4
});

async function run() {
  try {
    await client.connect();
    console.log("Connected successfully to server");
  } catch (error) {
    console.error("Connection failed:", error.message);
  } finally {
    await client.close();
  }
}
run();
