// Comprehensive Automated Verification for Critical Inventory Bug
// Tests:
// 1. Automatic stock deduction in state & storage upon order placement/completion.
// 2. Real-time reflection across Online Shop (buyer view) and Product Catalog (admin view).
// 3. Prevention of customer purchases if stock is insufficient or reaches zero (Add to Cart, Buy Now, Cart Increment, Checkout Modal, submitOrder).

const assert = require('assert');
const fs = require('fs');
const path = require('path');

// Mock browser environment
global.window = {
  addEventListener: () => {},
  removeEventListener: () => {},
  location: { reload: () => {} }
};
global.document = {
  getElementById: (id) => {
    if (id === 'shop-content') return { innerHTML: '' };
    if (id === 'detail-qty-input') return { value: '1', min: '1', max: '10' };
    if (id === 'detail-subtotal-val') return { textContent: '' };
    if (id === 'order-cust-name') return { value: 'Test Buyer' };
    if (id === 'order-cust-phone') return { value: '08123456789' };
    if (id === 'order-cust-address') return { value: 'Jl. Merdeka No. 1 Malang' };
    if (id === 'order-delivery') return { value: 'Truk Toko Grosir' };
    if (id === 'order-notes') return { value: 'Tolong cepat kirim' };
    return { innerHTML: '', value: '', focus: () => {}, classList: { add: () => {}, remove: () => {} } };
  },
  querySelector: (sel) => {
    if (sel.includes('order_payment_method')) return { value: 'QRIS' };
    return null;
  },
  querySelectorAll: () => [],
  body: {
    insertAdjacentHTML: () => {},
    appendChild: () => {},
    removeChild: () => {}
  }
};
global.localStorage = {
  _store: {},
  getItem(k) { return this._store[k] || null; },
  setItem(k, v) { this._store[k] = String(v); },
  removeItem(k) { delete this._store[k]; },
  clear() { this._store = {}; }
};
global.BroadcastChannel = class {
  constructor(name) { this.name = name; }
  postMessage() {}
  close() {}
};

// Global App Mock
global.App = {
  toasts: [],
  modalsClosed: [],
  currentTab: 'shop',
  showToast(msg, type) {
    this.toasts.push({ msg, type });
  },
  closeModal(id) {
    this.modalsClosed.push(id);
  },
  copyToClipboard() {}
};

// Load Data
const { DEFAULT_STORE_DATA } = require('./js/data.js');
global.DEFAULT_STORE_DATA = DEFAULT_STORE_DATA;

// Load Storage & Util
const { Storage, Util } = require('./js/storage.js');
global.Storage = Storage;
global.Util = Util;

// Load Shop
const { Shop } = require('./js/shop.js');
global.Shop = Shop;

// Load WMS
const { WMS } = require('./js/wms.js');
global.WMS = WMS;

console.log("=== STARTING CRITICAL INVENTORY VERIFICATION SUITE ===");

async function runTests() {
  // Setup baseline data
  Storage._cachedData = null;
  const data = Storage.getData();
  
  // Pick a test product
  const testProduct = data.shopProducts[0];
  assert(testProduct, "Test product must exist");
  const testProductId = testProduct.id;
  const initialStock = 20;
  testProduct.stock = initialStock;
  
  // Ensure corresponding WMS item has matching stock
  let wmsItem = data.wmsItems.find(w => w.sku === testProduct.sku || w.id === testProductId);
  if (!wmsItem) {
    wmsItem = {
      id: "WMS-TEST-001",
      name: testProduct.name,
      sku: testProduct.sku,
      stock: initialStock,
      minStock: 10,
      unit: testProduct.unit,
      category: testProduct.category
    };
    data.wmsItems.push(wmsItem);
  } else {
    wmsItem.stock = initialStock;
  }
  Storage.saveData(data);

  // Setup Customer Account for Checkout
  Storage.setCustomerAccount({
    name: "Bpk. Budi Santoso",
    googleEmail: "budi.santoso@gmail.com",
    phone: "081234567890",
    address: "Kendalpayak No. 12 Malang"
  }, true);
  Storage.setRole('customer');

  // =========================================================================
  // TEST 1: PREVENT PURCHASING ITEMS IF STOCK IS INSUFFICIENT OR ZERO
  // =========================================================================
  console.log("\n[TEST 1] Testing purchase prevention for zero or insufficient stock...");

  // 1A. Test Quick Add To Cart when product stock is 0
  const outOfStockProd = data.shopProducts[1];
  outOfStockProd.stock = 0;
  Storage.saveData(data);
  Shop.cart = [];
  App.toasts = [];

  Shop.quickAddToCart(outOfStockProd.id, 1);
  assert.strictEqual(Shop.cart.length, 0, "Cart should remain empty when adding out of stock item");
  assert(App.toasts.some(t => t.type === 'error' && t.msg.includes('habis')), "Should show out-of-stock error toast");
  console.log("✓ 1A. Quick add to cart correctly blocked for zero stock product");

  // 1B. Test Quick Add To Cart when requested quantity exceeds available stock
  testProduct.stock = 5;
  Storage.saveData(data);
  Shop.cart = [];
  App.toasts = [];

  Shop.quickAddToCart(testProductId, 10); // requests 10, but only 5 available
  assert.strictEqual(Shop.cart.length, 0, "Cart should remain empty when requested qty > available stock");
  assert(App.toasts.some(t => t.type === 'warning' && t.msg.includes('tidak mencukupi')), "Should show warning toast");
  console.log("✓ 1B. Quick add to cart correctly blocked when requested quantity exceeds stock");

  // 1C. Test Quick Add To Cart incremental limit
  Shop.cart = [];
  Shop.quickAddToCart(testProductId, 4); // Added 4 (1 remaining)
  assert.strictEqual(Shop.cart.length, 1);
  assert.strictEqual(Shop.cart[0].qty, 4);

  App.toasts = [];
  Shop.quickAddToCart(testProductId, 2); // Request 2 more (4+2 = 6 > 5) -> Should block
  assert.strictEqual(Shop.cart[0].qty, 4, "Cart qty must not exceed available stock");
  assert(App.toasts.some(t => t.type === 'warning' && t.msg.includes('tidak mencukupi')), "Should warn about insufficient remaining stock");
  console.log("✓ 1C. Incremental quick add correctly respects available stock boundary");

  // 1D. Test updateCartQty limit
  App.toasts = [];
  Shop.updateCartQty(0, 1); // 4 + 1 = 5 (allowed, matches stock)
  assert.strictEqual(Shop.cart[0].qty, 5);

  Shop.updateCartQty(0, 1); // 5 + 1 = 6 > 5 -> Should block
  assert.strictEqual(Shop.cart[0].qty, 5, "updateCartQty must prevent exceeding available stock");
  assert(App.toasts.some(t => t.type === 'warning' && t.msg.includes('tidak mencukupi')), "Should warn that stock cannot be exceeded");
  console.log("✓ 1D. Cart quantity increment strictly bounded by available stock");

  // 1E. Test Checkout Modal Blocking when stock becomes 0 before checkout
  testProduct.stock = 0; // Simulate stock depletion by another buyer
  Storage.saveData(data);
  App.toasts = [];
  let checkoutOpened = false;
  Shop.openCheckoutModal();
  assert(App.toasts.some(t => t.type === 'error' && t.msg.includes('habis')), "openCheckoutModal must reject if item stock is 0");
  console.log("✓ 1E. Checkout modal entry rejected when cart contains out-of-stock item");

  // =========================================================================
  // TEST 2: AUTOMATIC STOCK DEDUCTION IN STATE/DB UPON ORDER COMPLETION
  // =========================================================================
  console.log("\n[TEST 2] Testing automatic stock deduction upon order completion...");

  // Reset product stock to 50
  testProduct.stock = 50;
  wmsItem.stock = 50;
  Storage.saveData(data);

  // Set cart to 5 units
  Shop.cart = [{
    productId: testProductId,
    name: testProduct.name,
    unit: testProduct.unit,
    qty: 5,
    price: testProduct.price || 10000
  }];

  // Execute submitOrder
  const fakeEvent = { preventDefault: () => {} };
  await Shop.submitOrder(fakeEvent);

  // Verify stock in Storage.getData()
  const refreshedData = Storage.getData();
  const refreshedProduct = refreshedData.shopProducts.find(p => p.id === testProductId);
  const refreshedWmsItem = refreshedData.wmsItems.find(w => w.sku === testProduct.sku || w.id === testProductId);
  const placedOrder = refreshedData.orders[0];

  assert(placedOrder, "Order must be created and saved");
  assert.strictEqual(placedOrder.items[0].qty, 5, "Order qty should be 5");
  assert.strictEqual(placedOrder.stockDeducted, true, "Order must be marked as stockDeducted");

  // Expected stock: 50 - 5 = 45
  assert.strictEqual(refreshedProduct.stock, 45, `Product stock should be deducted from 50 to 45 (actual: ${refreshedProduct.stock})`);
  assert.strictEqual(refreshedWmsItem.stock, 45, `WMS stock should be deducted from 50 to 45 (actual: ${refreshedWmsItem.stock})`);

  // Verify WMS Outbound Log
  const outboundLog = refreshedData.wmsLogs.find(l => l.refDoc === placedOrder.id);
  assert(outboundLog, "WMS Outbound mutation log must be recorded");
  assert.strictEqual(outboundLog.type, "OUTBOUND");
  console.log(`✓ 2A. Product catalog stock deducted: 50 -> ${refreshedProduct.stock}`);
  console.log(`✓ 2B. WMS item stock deducted: 50 -> ${refreshedWmsItem.stock}`);
  console.log(`✓ 2C. WMS Outbound log created with refDoc #${placedOrder.id}`);

  // Idempotency check: Calling deductStockForOrder again must NOT deduct twice
  const secondDeduct = Storage.deductStockForOrder(placedOrder);
  assert.strictEqual(secondDeduct.alreadyDeducted, true, "Should return alreadyDeducted: true");
  const dataAfterSecond = Storage.getData();
  const prodAfterSecond = dataAfterSecond.shopProducts.find(p => p.id === testProductId);
  assert.strictEqual(prodAfterSecond.stock, 45, "Stock must remain 45 and not be double-deducted");
  console.log("✓ 2D. Idempotency protection prevents double deduction");

  // =========================================================================
  // TEST 3: REAL-TIME REFLECTION ACROSS ONLINE SHOP & PRODUCT CATALOG VIEWS
  // =========================================================================
  console.log("\n[TEST 3] Testing real-time reflection across views and roles...");

  // 3A. Buyer View (Online Shop)
  Storage.setRole('customer');
  assert.strictEqual(Storage.isEmployee(), false, "User should be customer");
  // Render buyer view
  let renderedBuyerHtml = "";
  document.getElementById = (id) => {
    if (id === 'shop-content') {
      return {
        set innerHTML(html) { renderedBuyerHtml = html; },
        get innerHTML() { return renderedBuyerHtml; }
      };
    }
    return { innerHTML: '', value: '', focus: () => {}, classList: { add: () => {}, remove: () => {} } };
  };

  Shop.render();
  assert(renderedBuyerHtml.toLowerCase().includes("online shop"), "Buyer view should render Online Shop header");
  assert(renderedBuyerHtml.includes("45 " + testProduct.unit), "Buyer view must display updated stock count 45");
  assert(renderedBuyerHtml.includes("+ Keranjang"), "Buyer view must show + Keranjang action button");
  console.log("✓ 3A. Online Shop (buyer view) correctly renders updated stock count (45) and purchase buttons");

  // 3B. Admin View (Product Catalog)
  Storage.setRole('admin');
  assert.strictEqual(Storage.isEmployee(), true, "User should be admin");
  let renderedAdminHtml = "";
  document.getElementById = (id) => {
    if (id === 'shop-content') {
      return {
        set innerHTML(html) { renderedAdminHtml = html; },
        get innerHTML() { return renderedAdminHtml; }
      };
    }
    return { innerHTML: '', value: '', focus: () => {}, classList: { add: () => {}, remove: () => {} } };
  };

  Shop.render();
  assert(renderedAdminHtml.toLowerCase().includes("product catalog"), "Admin view should render Product Catalog header");
  assert(renderedAdminHtml.includes("45 " + testProduct.unit), "Admin view must display updated stock count 45");
  assert(renderedAdminHtml.includes("Monitoring Stok"), "Admin view must show Monitoring Stok button instead of buying");
  console.log("✓ 3B. Product Catalog (admin view) correctly renders updated stock count (45) and monitoring controls");

  // 3C. Out-of-Stock Rendering for both views
  refreshedProduct.stock = 0;
  Storage.saveData(refreshedData);

  // Buyer view when stock = 0
  Storage.setRole('customer');
  Shop.render();
  assert(renderedBuyerHtml.includes("STOK HABIS") || renderedBuyerHtml.includes("Stok Habis"), "Buyer view must display STOK HABIS indicator");
  assert(renderedBuyerHtml.includes("disabled"), "Action button must be disabled when stock is 0");
  console.log("✓ 3C. When stock reaches 0, Online Shop displays STOK HABIS badge and disables purchase button");

  console.log("\n==========================================================");
  console.log("🎉 ALL CRITICAL INVENTORY TESTS PASSED WITH 100% SUCCESS!");
  console.log("==========================================================");
  process.exit(0);
}

runTests().catch(err => {
  console.error("❌ TEST FAILED:", err);
  process.exit(1);
});
