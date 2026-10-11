// Test script to verify automatic invoice creation and WMS stock deduction
const fs = require('fs');
const path = require('path');

// Mock localStorage and window/document for node test
const storageMock = {};
global.localStorage = {
  getItem: (k) => storageMock[k] || null,
  setItem: (k, v) => { storageMock[k] = v; },
  removeItem: (k) => { delete storageMock[k]; }
};
global.window = {};
global.document = {
  getElementById: (id) => {
    if (id === 'order-cust-name') return { value: 'Budi Hartono (Toko Berkah)' };
    if (id === 'order-cust-phone') return { value: '0812-3344-5566' };
    if (id === 'order-cust-address') return { value: 'Jl. Surya Kencana No. 42, Bogor' };
    if (id === 'order-delivery') return { value: 'Armada Truk Toko GBA (CDD Box)' };
    if (id === 'order-notes') return { value: 'Tolong kirim sebelum jam 2 siang' };
    return null;
  },
  querySelector: (sel) => {
    if (sel.includes('order_payment_method')) return { value: 'QRIS' };
    return null;
  },
  body: {
    insertAdjacentHTML: () => {}
  }
};
global.App = {
  showToast: (msg, type) => console.log(`[TOAST - ${type}]: ${msg}`),
  closeModal: (id) => console.log(`[CLOSE MODAL]: ${id}`)
};
global.Orders = {
  openCustomerTrackingModal: () => {}
};

const vm = require('vm');
// Load modules into global context
vm.runInThisContext(fs.readFileSync(path.join(__dirname, 'js', 'data.js'), 'utf8'));
vm.runInThisContext(fs.readFileSync(path.join(__dirname, 'js', 'storage.js'), 'utf8'));
vm.runInThisContext(fs.readFileSync(path.join(__dirname, 'js', 'documents.js'), 'utf8'));
vm.runInThisContext(fs.readFileSync(path.join(__dirname, 'js', 'wms.js'), 'utf8'));
vm.runInThisContext(fs.readFileSync(path.join(__dirname, 'js', 'shop.js'), 'utf8'));

console.log("=== RUNNING AUTOMATED TEST: CHECKOUT -> INVOICE & WMS SYNC ===");

const initialData = Storage.getData();
const targetProduct = initialData.shopProducts[0]; // e.g. BLASTOZ COKLAT ARTA @6
const initialStockShop = targetProduct.stock;
const targetWms = initialData.wmsItems.find(w => w.sku === targetProduct.sku || w.name === targetProduct.name);
const initialStockWms = targetWms ? targetWms.stock : 0;
const initialLogsCount = initialData.wmsLogs.length;
const initialDocsCount = initialData.documents.length;

console.log(`Initial Product: ${targetProduct.name} (SKU: ${targetProduct.sku})`);
console.log(`- Shop Stock: ${initialStockShop}`);
console.log(`- WMS Stock: ${initialStockWms}`);
console.log(`- Total WMS Logs: ${initialLogsCount}`);
console.log(`- Total Documents: ${initialDocsCount}`);

// Simulate adding 5 units to cart
const buyQty = 5;
Shop.cart = [
  {
    productId: targetProduct.id,
    name: targetProduct.name,
    unit: targetProduct.unit,
    qty: buyQty,
    image: targetProduct.image
  }
];

// Trigger checkout submit
Shop.submitOrder({ preventDefault: () => {} });

// Inspect updated state
const updatedData = Storage.getData();
const updatedProduct = updatedData.shopProducts.find(p => p.id === targetProduct.id);
const updatedWms = updatedData.wmsItems.find(w => w.sku === targetProduct.sku || w.name === targetProduct.name);
const latestDoc = updatedData.documents[0];
const latestLog = updatedData.wmsLogs[0];
const latestOrder = updatedData.orders[0];

console.log("\n=== VERIFICATION RESULTS ===");

// 1. Stock deduction in Shop
const expectedShopStock = initialStockShop - buyQty;
const isShopStockCorrect = updatedProduct.stock === expectedShopStock;
console.log(`1. Shop Stock Reduced: ${updatedProduct.stock} (Expected: ${expectedShopStock}) -> ${isShopStockCorrect ? 'PASS ✅' : 'FAIL ❌'}`);

// 2. Stock deduction in WMS
const expectedWmsStock = initialStockWms - buyQty;
const isWmsStockCorrect = updatedWms && updatedWms.stock === expectedWmsStock;
console.log(`2. WMS Stock Reduced: ${updatedWms ? updatedWms.stock : 'NONE'} (Expected: ${expectedWmsStock}) -> ${isWmsStockCorrect ? 'PASS ✅' : 'FAIL ❌'}`);

// 3. Outbound WMS Log created
const isLogCreated = latestLog && latestLog.type === 'OUTBOUND' && latestLog.itemName === targetProduct.name && latestLog.qty === `-${buyQty} ${targetProduct.unit}`;
console.log(`3. WMS Outbound Log Created: [${latestLog.type}] ${latestLog.itemName} ${latestLog.qty} (Ref: ${latestLog.refDoc}) -> ${isLogCreated ? 'PASS ✅' : 'FAIL ❌'}`);

// 4. Sales Invoice (Faktur Penjualan) Document created
const isDocCreated = latestDoc && latestDoc.type === 'Faktur Penjualan' && latestDoc.clientName === 'Budi Hartono (Toko Berkah)';
console.log(`4. Faktur Penjualan Created: No: ${latestDoc.docNumber}, Klien: ${latestDoc.clientName}, Total: Rp ${latestDoc.grandTotal} -> ${isDocCreated ? 'PASS ✅' : 'FAIL ❌'}`);

// 5. Items in Invoice match purchased items
const isItemsMatch = latestDoc.items.length === 1 && latestDoc.items[0].name === targetProduct.name && latestDoc.items[0].qty === buyQty;
console.log(`5. Invoice Items Match Cart: ${latestDoc.items[0].name} x ${latestDoc.items[0].qty} -> ${isItemsMatch ? 'PASS ✅' : 'FAIL ❌'}`);

// 6. Date matches order date
const todayStr = new Date().toISOString().slice(0, 10);
const isDateMatch = latestDoc.date === todayStr && latestDoc.orderTimestamp.startsWith(todayStr);
console.log(`6. Invoice Date Matches Order Date: ${latestDoc.date} (${latestDoc.orderTimestamp}) -> ${isDateMatch ? 'PASS ✅' : 'FAIL ❌'}`);

if (isShopStockCorrect && isWmsStockCorrect && isLogCreated && isDocCreated && isItemsMatch && isDateMatch) {
  console.log("\nALL 6 VERIFICATION CHECKS PASSED PERFECTLY! 🎉");
  process.exit(0);
} else {
  console.error("\nSOME CHECKS FAILED!");
  process.exit(1);
}
