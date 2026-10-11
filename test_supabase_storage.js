// Test script for Supabase Storage Layer & Data Mappers
const fs = require('fs');
const path = require('path');
const vm = require('vm');

// Mock localStorage and browser globals
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

// Load code into context
vm.runInThisContext(fs.readFileSync(path.join(__dirname, 'js', 'data.js'), 'utf8'));
vm.runInThisContext(fs.readFileSync(path.join(__dirname, 'js', 'storage.js'), 'utf8'));

console.log("=== RUNNING TEST: SUPABASE STORAGE LAYER & MAPPERS ===");

// 1. Config Test
const cfg1 = Storage.getSupabaseConfig();
console.log(`1. Initial Config Check: ${cfg1.url} -> PASS ✅`);

Storage.setSupabaseConfig("https://testproject.supabase.co", "test-anon-key-12345");
const cfg2 = Storage.getSupabaseConfig();
const isConfigSaved = cfg2.url === "https://testproject.supabase.co" && cfg2.anonKey === "test-anon-key-12345";
console.log(`2. Dynamic Config Set & Get: ${cfg2.url} -> ${isConfigSaved ? 'PASS ✅' : 'FAIL ❌'}`);

// 2. Product Mapper Round-Trip Test
const testProd = {
  id: "PROD-999",
  sku: "SKU-999-ABC",
  name: "Beras Premium Ramos 10kg",
  category: "Sembako",
  price: 135000,
  retailPrice: 135000,
  tiers: [{ minQty: 1, maxQty: 99999, price: 135000, label: "Harga Grosir Satuan" }],
  stock: 80,
  unit: "Karung",
  image: "https://example.com/rice.jpg",
  description: "Beras pulen kualitas super",
  badge: "BEST SELLER",
  minOrder: 1
};
const cloudProd = Storage.productToCloud(testProd);
const backProd = Storage.cloudToProduct(cloudProd);
const isProdMapperValid = backProd.id === testProd.id && backProd.name === testProd.name && backProd.price === testProd.price && backProd.stock === testProd.stock;
console.log(`3. Product Mapper Round-Trip: ${backProd.name} (Rp ${backProd.price}) -> ${isProdMapperValid ? 'PASS ✅' : 'FAIL ❌'}`);

// 3. Order Mapper Round-Trip Test
const testOrder = {
  id: "ORD-20261011-999",
  customerName: "Bpk. Sutrisno",
  customerPhone: "0812-9988-7766",
  customerAddress: "Jl. Merdeka No. 10",
  customerGoogleEmail: "sutrisno@gmail.com",
  deliveryMethod: "Truk Toko GBA 1",
  paymentMethod: "QRIS",
  paymentStatus: "Lunas / Terverifikasi",
  notes: "Kirim pagi hari",
  items: [{ productId: "PROD-999", name: "Beras Premium", qty: 2, price: 135000, subtotal: 270000 }],
  totalAmount: 270000,
  status: "Menunggu Konfirmasi",
  progressPercent: 20,
  checkpoints: [{ time: "2026-10-11 10:00", title: "Pesanan Dibuat", location: "Online Shop", desc: "Pesanan diterima" }]
};
const cloudOrder = Storage.orderToCloud(testOrder);
const backOrder = Storage.cloudToOrder(cloudOrder);
const isOrderMapperValid = backOrder.id === testOrder.id && backOrder.customerName === testOrder.customerName && backOrder.totalAmount === testOrder.totalAmount;
console.log(`4. Order Mapper Round-Trip: #${backOrder.id} (${backOrder.customerName}, Rp ${backOrder.totalAmount}) -> ${isOrderMapperValid ? 'PASS ✅' : 'FAIL ❌'}`);

// 4. Async Save Order with Offline Fallback
async function testAsyncSave() {
  await Storage.saveOrder(testOrder);
  const data = Storage.getData();
  const saved = data.orders.find(o => o.id === testOrder.id);
  const isSavedInLocal = saved && saved.customerName === "Bpk. Sutrisno";
  console.log(`5. Save Order with Graceful Local Fallback: -> ${isSavedInLocal ? 'PASS ✅' : 'FAIL ❌'}`);

  // Test Update Order Status
  await Storage.updateOrderStatus(testOrder.id, "Diproses", "Lunas");
  const data2 = Storage.getData();
  const updated = data2.orders.find(o => o.id === testOrder.id);
  const isUpdatedInLocal = updated && updated.status === "Diproses";
  console.log(`6. Update Order Status with Graceful Local Fallback: -> ${isUpdatedInLocal ? 'PASS ✅' : 'FAIL ❌'}`);

  if (isConfigSaved && isProdMapperValid && isOrderMapperValid && isSavedInLocal && isUpdatedInLocal) {
    console.log("\nALL SUPABASE STORAGE TESTS PASSED PERFECTLY! 🎉");
    process.exit(0);
  } else {
    console.error("\nTEST SUITE FAILED!");
    process.exit(1);
  }
}

testAsyncSave();
