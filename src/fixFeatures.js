require("dotenv").config({ path: require("path").join(__dirname, "../.env") });
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);
const mongoose = require("mongoose");
const Product = require("./models/Product");
const Banner = require("./models/Banner");

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected");

  const r = await Banner.updateOne(
    { key: "hybrid-bike-banner" },
    { $set: { label: "دراجات هجين" } }
  );
  console.log(`Updated banner label: ${r.modifiedCount}`);

  await mongoose.disconnect();
  console.log("Done!");
}

run().catch(console.error);
