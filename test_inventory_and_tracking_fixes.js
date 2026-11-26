/**
 * Verification Test: Inventory Sync & Tracking Crosshairs Button
 */
const assert = require('assert');
const fs = require('fs');
const path = require('path');

// Mock localStorage and window DOM
const storageMock = {};
global.localStorage = {
  getItem: (k) => storageMock[k] || null,
  setItem: (k, v) => { storageMock[k] = String(v); },
  removeItem: (k) => { delete storageMock[k]; },
  clear: () => { Object.keys(storageMock).forEach(k => delete storageMock[k]); }
};

global.window = global;
global.document = {
  body: {
    insertAdjacentHTML: (pos, html) => {
      // Mock insert
    }
  },
  getElementById: (id) => {
    return {
      value: "Mock Val",
      innerHTML: "",
      classList: { remove: () => {}, add: () => {} },
      style: {}
    };
  },
  querySelector: (sel) => ({ value: "QRIS", checked: true })
};

// Load Modules
const { DEFAULT_STORE_DATA } = require('./js/data.js');
global.DEFAULT_STORE_DATA = DEFAULT_STORE_DATA;

const { Storage, Util } = require('./js/storage.js');
global.Storage = Storage;
global.Util = Util;

// Provide mock App
global.App = {
  showToast: (msg, type) => { /* console.log(`[TOAST ${type}] ${msg}`); */ },
  closeModal: (id) => {},
  notifyAdminOfNewOrder: () => {}
};

// Provide mock MapService
global.MapService = {
  renderSynchronizedMap: async () => ({ distanceKm: 5.2, polyline: [] }),
  resolveDestinationCoords: async () => [-8.05, 112.63]
};

const { Orders } = require('./js/orders.js');
global.Orders = Orders;

const { Shop } = require('./js/shop.js');
global.Shop = Shop;

async function runTests() {
  console.log("=== STARTING TESTS: INVENTORY SYNC & ORDER TRACKING BUTTON ===");

  // Reset Storage with fresh mock data
  const testData = JSON.parse(JSON.stringify(DEFAULT_STORE_DATA));
  Storage.saveData(testData);

  const initialProducts = Storage.getData().shopProducts;
  const initialWms = Storage.getData().wmsItems;
  const targetProd = initialProducts[0]; // e.g. BLASTOZ COKLAT ARTA @6
  const targetWms = initialWms.find(w => w.sku === targetProd.sku);

  const initialShopStock = Number(targetProd.stock);
  const initialWmsStock = Number(targetWms.stock);

  console.log(`Initial Catalog Stock: ${initialShopStock}, Initial WMS Stock: ${initialWmsStock}`);

  // -------------------------------------------------------------
  // Test 1: Deduct Stock for Order via Storage.deductStockForOrder
  // -------------------------------------------------------------
  console.log("\n--- TEST 1: Storage.deductStockForOrder ---");
  const testOrder = {
    id: "ORD-TEST-001",
    customerName: "Budi Santoso",
    items: [
      {
        productId: targetProd.id,
        sku: targetProd.sku,
        name: targetProd.name,
        qty: 5,
        unit: targetProd.unit
      }
    ],
    status: "Menunggu Konfirmasi"
  };

  const deductRes = Storage.deductStockForOrder(testOrder);
  assert.strictEqual(deductRes.success, true, "Deduct stock should succeed");
  assert.strictEqual(testOrder.stockDeducted, true, "Order should be marked as stockDeducted");

  const postDeductData = Storage.getData();
  const postShopProd = postDeductData.shopProducts.find(p => p.id === targetProd.id);
  const postWmsProd = postDeductData.wmsItems.find(w => w.sku === targetProd.sku);

  assert.strictEqual(postShopProd.stock, initialShopStock - 5, `Shop stock should decrease by 5 (expected ${initialShopStock - 5}, got ${postShopProd.stock})`);
  assert.strictEqual(postWmsProd.stock, initialWmsStock - 5, `WMS stock should decrease by 5 (expected ${initialWmsStock - 5}, got ${postWmsProd.stock})`);
  console.log(`✓ Test 1 Passed: Stock decreased accurately. New Shop: ${postShopProd.stock}, New WMS: ${postWmsProd.stock}`);

  // -------------------------------------------------------------
  // Test 2: Idempotency (Cannot Double Deduct)
  // -------------------------------------------------------------
  console.log("\n--- TEST 2: Idempotency Protection ---");
  const repeatDeductRes = Storage.deductStockForOrder(testOrder);
  assert.strictEqual(repeatDeductRes.alreadyDeducted, true, "Repeat deduction should return alreadyDeducted");

  const repeatData = Storage.getData();
  const repeatShopProd = repeatData.shopProducts.find(p => p.id === targetProd.id);
  assert.strictEqual(repeatShopProd.stock, initialShopStock - 5, "Stock must NOT decrease again on repeat call");
  console.log("✓ Test 2 Passed: Safe idempotency prevents double deduction");

  // -------------------------------------------------------------
  // Test 3: Payment Confirmation Deducts Stock if not already deducted
  // -------------------------------------------------------------
  console.log("\n--- TEST 3: Shop.confirmPayment Stock Sync ---");
  const testOrder2 = {
    id: "ORD-TEST-002",
    customerName: "Siti Rahma",
    items: [
      {
        productId: targetProd.id,
        sku: targetProd.sku,
        name: targetProd.name,
        qty: 3,
        unit: targetProd.unit
      }
    ],
    status: "Menunggu Pembayaran",
    paymentMethod: "QRIS",
    stockDeducted: false
  };

  const currentData = Storage.getData();
  currentData.orders.unshift(testOrder2);
  Storage.saveData(currentData);

  const prevShopStockBeforeConfirm = Storage.getData().shopProducts.find(p => p.id === targetProd.id).stock;
  Shop.confirmPayment(testOrder2.id);

  const afterConfirmData = Storage.getData();
  const afterConfirmOrder = afterConfirmData.orders.find(o => o.id === testOrder2.id);
  const afterConfirmShopProd = afterConfirmData.shopProducts.find(p => p.id === targetProd.id);

  assert.strictEqual(afterConfirmOrder.paymentStatus, "Lunas / Terverifikasi", "Order payment status should be Lunas");
  assert.strictEqual(afterConfirmOrder.stockDeducted, true, "Order stockDeducted flag should be true");
  assert.strictEqual(afterConfirmShopProd.stock, prevShopStockBeforeConfirm - 3, `Stock should be deducted upon payment confirmation`);
  console.log("✓ Test 3 Passed: Payment confirmation successfully deducted stock and updated state");

  // -------------------------------------------------------------
  // Test 4: Order Cancellation Restores Stock Safely
  // -------------------------------------------------------------
  console.log("\n--- TEST 4: Orders.cancelOrder Stock Restoration ---");
  Storage.setSession('admin'); // set employee role for cancellation
  const stockBeforeCancel = Storage.getData().shopProducts.find(p => p.id === targetProd.id).stock;

  Orders.cancelOrder(testOrder2.id);

  const afterCancelData = Storage.getData();
  const afterCancelOrder = afterCancelData.orders.find(o => o.id === testOrder2.id);
  const afterCancelShopProd = afterCancelData.shopProducts.find(p => p.id === targetProd.id);

  assert.strictEqual(afterCancelOrder.status, "Dibatalkan", "Order status should be Dibatalkan");
  assert.strictEqual(afterCancelOrder.stockDeducted, false, "Order stockDeducted flag should be reset to false");
  assert.strictEqual(afterCancelShopProd.stock, stockBeforeCancel + 3, "Stock should be restored upon cancellation");
  console.log("✓ Test 4 Passed: Stock restored correctly upon order cancellation");

  // -------------------------------------------------------------
  // Test 5: Track Delivery Crosshairs Button Functionality
  // -------------------------------------------------------------
  console.log("\n--- TEST 5: Track Delivery Crosshairs Button ---");
  let modalOpenedOrderId = null;
  Orders.openCustomerTrackingModal = function(orderId) {
    modalOpenedOrderId = (typeof orderId === 'object') ? orderId.id : orderId;
  };

  // Calling setTrackingOrder should open the modal directly
  Orders.setTrackingOrder("ORD-20261125-898");
  assert.strictEqual(modalOpenedOrderId, "ORD-20261125-898", "setTrackingOrder must open Customer Tracking Modal");
  console.log("✓ Test 5 Passed: setTrackingOrder properly opens Customer Tracking Modal");

  // -------------------------------------------------------------
  // Test 6: Verify HTML Button markup in js/orders.js
  // -------------------------------------------------------------
  console.log("\n--- TEST 6: HTML Button Markup Verification ---");
  const ordersJsContent = fs.readFileSync(path.join(__dirname, 'js', 'orders.js'), 'utf8');

  // Verify that the table button calls openCustomerTrackingModal
  const buttonCallPattern = /onclick="Orders\.openCustomerTrackingModal\('\$\{o\.id\}'\)"[\s\S]*?fa-location-crosshairs/;
  assert.ok(buttonCallPattern.test(ordersJsContent), "Tracking table action button must invoke Orders.openCustomerTrackingModal('${o.id}')");
  console.log("✓ Test 6 Passed: Table button correctly calls Orders.openCustomerTrackingModal");

  // -------------------------------------------------------------
  // Test 7: Verify Distinct Map Container IDs (Modal vs Panel)
  // -------------------------------------------------------------
  console.log("\n--- TEST 7: Leaflet Map Container IDs ---");
  const modalDetailHtml = Orders.renderTrackingDetailHtml(testOrder, 'modal');
  const panelDetailHtml = Orders.renderTrackingDetailHtml(testOrder, 'panel');

  assert.ok(modalDetailHtml.includes('id="tracking-leaflet-map-modal"'), "Modal context must use tracking-leaflet-map-modal ID");
  assert.ok(panelDetailHtml.includes('id="tracking-leaflet-map"'), "Panel context must use tracking-leaflet-map ID");
  console.log("✓ Test 7 Passed: Context-aware map container IDs prevent Leaflet DOM collisions");

  console.log("\n========================================================");
  console.log("ALL 7 TEST SUITES PASSED FLAWLESSLY! 100% SUCCESS RATE");
  console.log("========================================================\n");
}

runTests().catch(err => {
  console.error("Test failed:", err);
  process.exit(1);
});
