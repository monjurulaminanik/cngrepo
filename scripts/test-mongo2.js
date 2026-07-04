const { MongoClient } = require('mongodb');

const uri = "mongodb://anikwitinstitute_db_user:anikwitinstitute%40gmail.com@ac-f1aojbt-shard-00-00.s0ebokd.mongodb.net:27017,ac-f1aojbt-shard-00-01.s0ebokd.mongodb.net:27017,ac-f1aojbt-shard-00-02.s0ebokd.mongodb.net:27017/wintech?ssl=true&replicaSet=atlas-f1aojbt-shard-0&authSource=admin&retryWrites=true&w=majority";

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
