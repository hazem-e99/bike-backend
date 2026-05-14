require("dotenv").config({ path: require("path").join(__dirname, "../.env") });
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);
const mongoose = require("mongoose");
const Product = require("./models/Product");

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected");

  const result = await Product.updateMany(
    { features: "تجي بفرمة تركيب كاملة" },
    { $pull: { features: "تجي بفرمة تركيب كاملة" } }
  );
  console.log(`Updated ${result.modifiedCount} product(s)`);

  // Also fix the other two features in the hybrid product
  const r2 = await Product.updateMany(
    { features: "سهلة إخراج الكفر الأمامي والخلفي يدويًا" },
    { $set: { "features.$": "سهولة فك الكفرات يدويا" } }
  );
  console.log(`Fixed إخراج الكفر in ${r2.modifiedCount} product(s)`);

  const r3 = await Product.updateMany(
    { features: "مناسبة للمشاوير اليومية والطلعات الترفيهية" },
    { $set: { "features.$": "أسلوب حياة جميل .. يضيف لك رشاقة صحية" } }
  );
  console.log(`Fixed مشاوير in ${r3.modifiedCount} product(s)`);

  await mongoose.disconnect();
  console.log("Done!");
}

run().catch(console.error);
