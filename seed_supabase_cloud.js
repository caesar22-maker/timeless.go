const fs = require('fs');
const path = require('path');
const vm = require('vm');

// Mock browser globals for Storage
const storageMock = {};
global.localStorage = {
  getItem: (k) => storageMock[k] || null,
  setItem: (k, v) => { storageMock[k] = String(v); },
  removeItem: (k) => { delete storageMock[k]; }
};
global.window = {};
global.document = {
  getElementById: () => null,
  querySelectorAll: () => [],
  body: { insertAdjacentHTML: () => {} }
};
global.App = {
  showToast: (msg, type) => console.log(`[Toast ${type}]: ${msg}`),
  updateHeaderUI: () => {}
};

// Load data & storage
vm.runInThisContext(fs.readFileSync(path.join(__dirname, 'js', 'data.js'), 'utf8'));
vm.runInThisContext(fs.readFileSync(path.join(__dirname, 'js', 'storage.js'), 'utf8'));

const SUPABASE_URL = "https://urijgftkzmgsiaxvakcc.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVyaWpnZnRrem1nc2lheHZha2NjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE2Nzg1MjEsImV4cCI6MjEwNzI1NDUyMX0.Li6yDInP34L3117wVg9Z_psumZGrjJQXpKJZZDeLppE";

async function postData(endpoint, items) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${endpoint}`, {
    method: "POST",
    headers: {
      "apikey": SUPABASE_ANON_KEY,
      "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
      "Prefer": "resolution=merge-duplicates"
    },
    body: JSON.stringify(items)
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Failed to insert into ${endpoint}: ${res.status} - ${errText}`);
  }
}

async function runSeed() {
  console.log("🚀 Memulai upload data katalog ke Supabase Cloud...");
  const data = Storage.getData();
  const products = (data.shopProducts || []).map(p => Storage.productToCloud(p));
  const wmsItems = (data.wmsItems || []).map(w => Storage.wmsToCloud(w));
  const documents = (data.documents || []).map(d => Storage.docToCloud(d));

  // 1. Upload Products in chunks of 50
  const BATCH_SIZE = 50;
  for (let i = 0; i < products.length; i += BATCH_SIZE) {
    const chunk = products.slice(i, i + BATCH_SIZE);
    await postData('products', chunk);
    console.log(`✅ Uploaded products batch ${i + 1} - ${Math.min(i + BATCH_SIZE, products.length)} of ${products.length}`);
  }

  // 2. Upload WMS Items
  for (let i = 0; i < wmsItems.length; i += BATCH_SIZE) {
    const chunk = wmsItems.slice(i, i + BATCH_SIZE);
    await postData('warehouse_records', chunk);
    console.log(`✅ Uploaded WMS records batch ${i + 1} - ${Math.min(i + BATCH_SIZE, wmsItems.length)} of ${wmsItems.length}`);
  }

  // 3. Upload Documents
  if (documents.length > 0) {
    await postData('documents', documents);
    console.log(`✅ Uploaded ${documents.length} initial documents`);
  }

  console.log("\n🎉 SELURUH DATA AWAL BERHASIL DI-SEED KE DATABASE SUPABASE CLOUD!");
}

runSeed().catch(err => {
  console.error("❌ Seed Error:", err);
  process.exit(1);
});
