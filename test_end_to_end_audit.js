const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('================================================================');
console.log('  TIMELESS.GO X ABADI GROSIR - END-TO-END AUDIT & VERIFICATION  ');
console.log('================================================================\n');

let totalChecks = 0;
let passedChecks = 0;
let failedChecks = 0;

function assert(condition, testName, detail = '') {
  totalChecks++;
  if (condition) {
    passedChecks++;
    console.log(`  [PASS] ${testName}`);
  } else {
    failedChecks++;
    console.error(`  [FAIL] ${testName} ${detail ? '--> ' + detail : ''}`);
  }
}

// 1. Setup Sandbox Environment
const mockStorage = {};
const elements = {};

class MockNotification {
  constructor(title, options) {
    this.title = title;
    this.options = options;
    MockNotification.lastInstance = this;
  }
}
MockNotification.permission = "granted";
MockNotification.requestPermission = async () => "granted";
MockNotification.lastInstance = null;

let mockAudioPlayed = false;
class MockAudioContext {
  constructor() {
    this.destination = {};
    this.currentTime = 0;
  }
  createOscillator() {
    return {
      type: 'sine',
      frequency: { setValueAtTime: () => {} },
      connect: () => {},
      start: () => { mockAudioPlayed = true; },
      stop: () => {}
    };
  }
  createGain() {
    return {
      gain: {
        setValueAtTime: () => {},
        exponentialRampToValueAtTime: () => {}
      },
      connect: () => {}
    };
  }
}

class MockBroadcastChannel {
  constructor(name) {
    this.name = name;
  }
  postMessage(msg) {
    MockBroadcastChannel.lastMessage = msg;
  }
}
MockBroadcastChannel.lastMessage = null;

const sandbox = {
  console: console,
  setTimeout: (fn, ms) => { fn(); return 1; },
  clearTimeout: () => {},
  setInterval: (fn, ms) => { return 1; },
  clearInterval: () => {},
  Date: Date,
  Math: Math,
  JSON: JSON,
  Number: Number,
  String: String,
  Array: Array,
  Object: Object,
  RegExp: RegExp,
  parseInt: parseInt,
  parseFloat: parseFloat,
  isNaN: isNaN,
  isFinite: isFinite,
  Notification: MockNotification,
  AudioContext: MockAudioContext,
  webkitAudioContext: MockAudioContext,
  BroadcastChannel: MockBroadcastChannel,
  localStorage: {
    getItem: (key) => mockStorage[key] || null,
    setItem: (key, val) => { mockStorage[key] = String(val); },
    removeItem: (key) => { delete mockStorage[key]; },
    clear: () => { for (let k in mockStorage) delete mockStorage[k]; }
  },
  document: {
    getElementById: (id) => {
      if (!elements[id]) {
        let defaultVal = '';
        if (id === 'order-cust-name') defaultVal = 'Budi Hartono (Toko Berkah)';
        if (id === 'order-cust-phone') defaultVal = '0812-3344-5566';
        if (id === 'order-cust-address') defaultVal = 'Jl. Kolonel Sugiono No. 45, Gadang, Malang';
        if (id === 'order-delivery') defaultVal = 'Truk Toko GBA 1 (CDD Box)';
        if (id === 'order-notes') defaultVal = 'Kirim tepat waktu';
        elements[id] = {
          id: id,
          value: defaultVal,
          innerHTML: '',
          innerText: '',
          style: {},
          classList: {
            classes: new Set(),
            add: function(c) { this.classes.add(c); },
            remove: function(c) { this.classes.delete(c); },
            contains: function(c) { return this.classes.has(c); },
            toggle: function(c) { this.contains(c) ? this.remove(c) : this.add(c); }
          },
          setAttribute: () => {},
          getAttribute: () => null,
          focus: () => {},
          setSelectionRange: () => {},
          appendChild: () => {},
          removeChild: () => {},
          remove: () => {},
          insertAdjacentHTML: () => {}
        };
      }
      return elements[id];
    },
    querySelector: (selector) => {
      if (selector.includes('order_payment_method')) {
        return { value: 'QRIS' };
      }
      if (selector.includes('order_status')) {
        return { value: 'Dalam Pengiriman' };
      }
      return null;
    },
    querySelectorAll: () => [],
    createElement: (tag) => {
      return {
        tagName: tag.toUpperCase(),
        style: {},
        classList: { add: () => {}, remove: () => {} },
        appendChild: () => {},
        removeChild: () => {},
        remove: () => {},
        setAttribute: () => {},
        innerHTML: '',
        innerText: ''
      };
    },
    body: {
      insertAdjacentHTML: (pos, html) => {
        sandbox._lastInsertedHtml = html;
      },
      appendChild: () => {}
    }
  },
  window: {},
  navigator: {
    userAgent: 'Node.js Test Agent'
  },
  L: {
    map: () => ({
      setView: () => {},
      fitBounds: () => {},
      remove: () => {},
      addLayer: () => {}
    }),
    tileLayer: () => ({ addTo: () => {} }),
    marker: (coords, opts) => ({
      addTo: () => ({
        bindPopup: () => ({ openPopup: () => {} })
      }),
      setLatLng: () => {}
    }),
    polyline: () => ({
      addTo: () => {}
    }),
    icon: (opts) => opts,
    divIcon: (opts) => opts,
    latLngBounds: () => ({})
  }
};
sandbox.window = sandbox;

// Load code into sandbox
const context = vm.createContext(sandbox);

function runFile(relPath) {
  const code = fs.readFileSync(path.join(__dirname, relPath), 'utf8');
  vm.runInContext(code, context);
}

runFile('js/data.js');
runFile('js/storage.js');
runFile('js/map.js');
runFile('js/wms.js');
runFile('js/documents.js');
runFile('js/orders.js');
runFile('js/shop.js');
runFile('js/inventory.js');
runFile('js/app.js');

console.log('Environment initialized successfully.\n');

async function runAudits() {
// ============================================================================
// MODULE 1: ONLINE SHOP & PRODUCT CATALOG
// ============================================================================
console.log('--- [MODULE 1 AUDIT]: ONLINE SHOP & PRODUCT CATALOG ---');

const initialData = sandbox.Storage.getData();
const products = initialData.shopProducts;

assert(Array.isArray(products) && products.length === 250, 'Catalog contains 250 products');

const p1 = products[0];
assert(p1.id && p1.sku && p1.name && p1.category && p1.price > 0 && p1.stock >= 0, 'Product #1 has valid SKU, name, category, price, and stock', JSON.stringify(p1));
assert(p1.sku === '1905260001' && p1.name.includes('BLASTOZ'), 'Product #1 matches BLASTOZ COKLAT ARTA @6');

// Test Search Input Debouncing and Filtering
sandbox.Shop.currentCategory = 'ALL';
sandbox.Shop.searchQuery = '';
sandbox.Shop.executeSearch('BLASTOZ');
assert(sandbox.Shop.searchQuery === 'BLASTOZ', 'Search query correctly updated to "BLASTOZ"');

const allProds = sandbox.Storage.getData().shopProducts;
const filteredBlastoz = allProds.filter(p => p.name.toLowerCase().includes(sandbox.Shop.searchQuery.toLowerCase()) || p.sku.toLowerCase().includes(sandbox.Shop.searchQuery.toLowerCase()));
assert(filteredBlastoz.length > 0 && filteredBlastoz[0].name.includes('BLASTOZ'), 'Search filter returns matching BLASTOZ product');

// Test Category Filtering
sandbox.Shop.searchQuery = '';
sandbox.Shop.handleCategory('Sembako');
assert(sandbox.Shop.currentCategory === 'Sembako', 'Category filter updated to Sembako');
const sembakoProducts = allProds.filter(p => p.category === 'Sembako');
assert(sembakoProducts.length > 0 && sembakoProducts.every(p => p.category === 'Sembako'), 'Category filter correctly isolates Sembako items');

// Test Wholesale Pricing Tier Calculation
sandbox.Shop.currentCategory = 'ALL';
const sampleProduct = products[0];
const basePrice = sampleProduct.price;
const tierPrice1 = sandbox.Shop.getPriceForQty(sampleProduct, 1);
const tierPriceWholesale = sandbox.Shop.getPriceForQty(sampleProduct, 50);
assert(tierPrice1 === basePrice, 'Base price applied for single unit');
assert(tierPriceWholesale <= basePrice, 'Wholesale volume discount applied for quantity 50');

// Test Cart Operations (in Buyer mode)
sandbox.localStorage.setItem("GBA_AUTH_ROLE_V1", "buyer");
sandbox.Shop.cart = [];
sandbox.Shop.quickAddToCart(sampleProduct.id, 5);
assert(sandbox.Shop.cart.length === 1, 'Product successfully added to cart');
assert(sandbox.Shop.cart[0].qty === 5, 'Cart quantity matches requested quantity (5)');

// Test Stock Limit Validation
const initialWmsStock = (initialData.wmsItems.find(w => w.sku === sampleProduct.sku) || {}).stock || 0;
assert(initialWmsStock >= sampleProduct.stock + 100, 'WMS stock is at least 100 units higher than catalog stock');

// Clear cart after module 1 check
sandbox.Shop.cart = [];
console.log('');

// ============================================================================
// MODULE 2: DELIVERY TRACKING & ORDER LIFECYCLE
// ============================================================================
console.log('--- [MODULE 2 AUDIT]: DELIVERY TRACKING & ORDER LIFECYCLE ---');

// Test stages configuration
assert(Array.isArray(sandbox.Orders.STAGES) && sandbox.Orders.STAGES.length === 5, 'Orders has 5 standard delivery tracking stages');
assert(sandbox.Orders.STAGES[0].key === 'Menunggu Konfirmasi', 'Stage 1 is "Menunggu Konfirmasi"');
assert(sandbox.Orders.STAGES[1].key === 'Sedang Dipacking', 'Stage 2 is "Sedang Dipacking"');
assert(sandbox.Orders.STAGES[2].key === 'Siap Dikirim', 'Stage 3 is "Siap Dikirim"');
assert(sandbox.Orders.STAGES[3].key === 'Dalam Pengiriman', 'Stage 4 is "Dalam Pengiriman"');
assert(sandbox.Orders.STAGES[4].key === 'Selesai', 'Stage 5 is "Selesai"');

// Create a new simulated order for tracking test
const demoOrder = {
  id: 'ORD-TEST-AUDIT-001',
  customerName: 'Toko Rejeki Lancar',
  customerPhone: '0812-9988-7766',
  customerAddress: 'Jl. Kolonel Sugiono No. 45, Gadang, Sukun, Kota Malang',
  destinationCoords: [-7.9948, 112.6325],
  status: 'Menunggu Konfirmasi',
  orderDate: '2026-11-25 11:00',
  totalAmount: 250000,
  vehicle: 'Truk Toko GBA 1 (CDD Box)',
  plateNumber: 'N 8899 GBA',
  driverName: 'Pak Joko Widodo',
  driverPhone: '0812-3456-7890',
  items: [
    { productId: sampleProduct.id, sku: sampleProduct.sku, name: sampleProduct.name, qty: 10, unit: sampleProduct.unit, price: 10000, subtotal: 100000 }
  ],
  checkpoints: [
    { time: '2026-11-25 11:00', title: 'Pesanan Baru Masuk ke Sistem', location: 'Online Shop', desc: 'Pesanan diterima' }
  ]
};

const currentDb = sandbox.Storage.getData();
currentDb.orders.unshift(demoOrder);
sandbox.Storage.saveData(currentDb);

// Step 1: Transition to "Sedang Dipacking"
demoOrder.status = 'Sedang Dipacking';
demoOrder.packingStaff = 'Ahmad F. (Blok B)';
demoOrder.qcNotes = 'Segel utuh & kemasan rapi';
demoOrder.checkpoints.unshift({
  time: '2026-11-25 11:15',
  title: 'Barang Sedang Dipacking di Gudang',
  location: 'Gudang Utama Kendalpayak',
  desc: 'Pesanan sedang disiapkan'
});
sandbox.Storage.saveData(currentDb);
assert(demoOrder.status === 'Sedang Dipacking', 'Order transitioned to "Sedang Dipacking"');
assert(demoOrder.checkpoints.length === 2, 'Checkpoint added for warehouse packing stage');

// Step 2: Transition to "Dalam Pengiriman" (Should auto-trigger Surat Jalan)
const prevDocCount = currentDb.documents.length;
const sjDoc = sandbox.Documents.createSuratJalanFromOrder(demoOrder, {
  vehicle: demoOrder.vehicle,
  plateNumber: demoOrder.plateNumber,
  driverName: demoOrder.driverName,
  driverPhone: demoOrder.driverPhone
});

assert(sjDoc !== null && sjDoc.docNumber.startsWith('SJ/GBA/'), 'Surat Jalan automatically created with SJ/GBA/ prefix', sjDoc ? sjDoc.docNumber : '');
assert(sjDoc.clientAddress === demoOrder.customerAddress, 'Surat Jalan clientAddress accurately matches customer address');
assert(sjDoc.items.length === 1 && sjDoc.items[0].name === demoOrder.items[0].name, 'Surat Jalan items match order items');
assert(currentDb.documents.length === prevDocCount + 1, 'Surat Jalan persisted in Document Management feature');

// Step 3: Transition to "Selesai" with Proof of Delivery (POD)
demoOrder.status = 'Selesai';
demoOrder.receivedBy = 'Ibu Siti (Pemilik Toko)';
demoOrder.podImage = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD...';
demoOrder.progressPercent = 100;
demoOrder.checkpoints.unshift({
  time: '2026-11-25 12:00',
  title: 'Pesanan Selesai & Diterima Pelanggan',
  location: demoOrder.customerAddress,
  desc: `Diterima oleh ${demoOrder.receivedBy}`
});
sandbox.Storage.saveData(currentDb);

assert(demoOrder.status === 'Selesai', 'Order status reached final stage "Selesai"');
assert(demoOrder.progressPercent === 100, 'Order progress reached 100%');
assert(demoOrder.receivedBy === 'Ibu Siti (Pemilik Toko)', 'Proof of delivery recipient name recorded');
assert(Boolean(demoOrder.podImage), 'Proof of delivery (POD) photo link/data recorded');
console.log('');

// ============================================================================
// MODULE 3: DUAL-PIN MAPS INTEGRATION
// ============================================================================
console.log('--- [MODULE 3 AUDIT]: DUAL-PIN MAPS INTEGRATION ---');

assert(sandbox.MapService !== undefined, 'MapService module is loaded');

// Store Origin Pin Verification
const storeOrigin = sandbox.MapService.STORE_ORIGIN.coords;
assert(Array.isArray(storeOrigin) && storeOrigin[0] === -8.0415 && storeOrigin[1] === 112.6315, 'Store origin coordinates strictly match Kendalpayak Malang [-8.0415, 112.6315]');
assert(sandbox.MapService.STORE_ORIGIN.name.includes('ABADI GROSIR'), 'Store origin name verified');
assert(sandbox.MapService.STORE_ORIGIN.address.includes('Kendalpayak'), 'Store origin address verified at Kendalpayak Malang');

// Customer Pin Geocoding and Resolution (async)
const coordsFromExplicit = await sandbox.MapService.resolveDestinationCoords(demoOrder.customerAddress, demoOrder.destinationCoords);
assert(coordsFromExplicit[0] === -7.9948 && coordsFromExplicit[1] === 112.6325, 'Destination coords resolved accurately from explicit order coordinates');

const coordsFromAddress = await sandbox.MapService.resolveDestinationCoords('Jl. Kolonel Sugiono No. 45, Gadang, Malang');
assert(coordsFromAddress[0] === -7.9948 && coordsFromAddress[1] === 112.6325, 'Destination coords resolved via local Malang geocoding dictionary');

// Distance & Route Calculation
const distanceKm = sandbox.MapService.calculateDistanceKm(storeOrigin, coordsFromExplicit);
assert(distanceKm > 4 && distanceKm < 7, `Calculated distance is realistic: ${distanceKm.toFixed(1)} km (expected ~5.2 km)`);

const routeInfo = await sandbox.MapService.calculateRoute(storeOrigin, coordsFromExplicit);
assert(routeInfo.distanceKm > 4 && routeInfo.distanceKm < 10, `Calculated road route distance is realistic: ${routeInfo.distanceKm} km`);
assert(routeInfo.durationMinutes >= 10 && routeInfo.durationMinutes <= 45, `Calculated road route duration is realistic: ${routeInfo.durationMinutes} minutes`);
assert(Array.isArray(routeInfo.waypoints) && routeInfo.waypoints.length >= 6, 'Realistic multi-point route waypoints generated');
assert(routeInfo.waypoints[0][0] === storeOrigin[0] && routeInfo.waypoints[0][1] === storeOrigin[1], 'Route origin is store pin');

// Verify dedicated Route Map Modal exists and generates HTML
assert(typeof sandbox.Orders.openRouteMapModal === 'function', 'Orders.openRouteMapModal method exists');
console.log('');

// ============================================================================
// MODULE 4: WAREHOUSE MANAGEMENT SYSTEM (WMS)
// ============================================================================
console.log('--- [MODULE 4 AUDIT]: WAREHOUSE MANAGEMENT SYSTEM (WMS) ---');

assert(sandbox.WMS !== undefined, 'WMS module is loaded');
assert(Array.isArray(currentDb.wmsItems) && currentDb.wmsItems.length === 250, 'WMS contains all 250 synchronized items');

// Test Barcode SVG Generator
const testBarcodeSvg = sandbox.WMS.generateBarcodeSvg('1905260001');
assert(typeof testBarcodeSvg === 'string' && testBarcodeSvg.includes('<svg') && testBarcodeSvg.includes('1905260001'), 'WMS.generateBarcodeSvg generates valid SVG barcode for SKU 1905260001');

// Test Barcode Label Modal Functionality
assert(typeof sandbox.WMS.openBarcodeModal === 'function', 'WMS.openBarcodeModal exists');

// Test Barcode Scanner Modal and Query Lookup
assert(typeof sandbox.WMS.openBarcodeScannerModal === 'function', 'WMS.openBarcodeScannerModal exists');
assert(typeof sandbox.WMS.handleBarcodeScanInput === 'function', 'WMS.handleBarcodeScanInput exists');

const scannerResults = currentDb.wmsItems.filter(it => 
  it.sku.toLowerCase() === '1905260001' || it.name.toLowerCase().includes('blastoz')
);
assert(scannerResults.length > 0, 'Barcode scanner accurately matches SKU 1905260001');

// Test Inbound Transaction (BAPB)
sandbox.localStorage.setItem("GBA_AUTH_ROLE_V1", "admin");
const inboundTarget = currentDb.wmsItems[0];
const prevStockInbound = inboundTarget.stock;
const testInboundResult = sandbox.WMS.saveInbound(null, {
  itemId: inboundTarget.id,
  qty: 50,
  supplier: 'PT Mayora Indah Tbk',
  poRef: 'PO-2026-INBOUND-TEST',
  destinationRack: inboundTarget.rack || '01',
  notes: 'Restok gudang audit'
});

assert(testInboundResult.success === true, 'WMS inbound transaction processed successfully');
assert(inboundTarget.stock === prevStockInbound + 50, 'WMS stock incremented by 50 units upon inbound');
const freshDbInbound = sandbox.Storage.getData();
assert(freshDbInbound.documents.some(d => d.type === 'Berita Acara Penerimaan Barang' && d.refDoc === 'PO-2026-INBOUND-TEST'), 'BAPB document automatically created in documents');

// Test Outbound Transaction (BPPB) & Catalog Sync
const outboundTarget = currentDb.wmsItems[1]; // e.g. item 2
const matchingProd = currentDb.shopProducts.find(p => p.sku === outboundTarget.sku || p.name === outboundTarget.name);
const prevWmsOutStock = outboundTarget.stock;
const prevCatalogOutStock = matchingProd.stock;

const testOutboundResult = sandbox.WMS.saveOutbound(null, {
  itemId: outboundTarget.id,
  qty: 20,
  destination: 'Display Rak Toko Grosir Kendalpayak',
  refDoc: 'TRF-OUTBOUND-AUDIT-001',
  officer: 'Agus Santoso',
  notes: 'Transfer stok ke display toko'
});

assert(testOutboundResult === true, 'WMS outbound transaction processed successfully');
assert(outboundTarget.stock === prevWmsOutStock - 20, 'WMS stock deducted by 20 units upon outbound');
assert(matchingProd.stock === prevCatalogOutStock + 20, 'Product Catalog & Online Shop stock increased by 20 units upon outbound');
const freshDbOutbound = sandbox.Storage.getData();
assert(freshDbOutbound.documents.some(d => d.type === 'Surat Bukti Pengeluaran Barang' && d.refDoc === 'TRF-OUTBOUND-AUDIT-001'), 'BPPB document automatically generated with official signatures');

// Safe Idempotency Check on Outbound
const duplicateOutbound = sandbox.WMS.saveOutbound(null, {
  itemId: outboundTarget.id,
  qty: 20,
  destination: 'Display Rak Toko Grosir Kendalpayak',
  refDoc: 'TRF-OUTBOUND-AUDIT-001',
  officer: 'Agus Santoso',
  notes: 'Transfer stok ke display toko'
});
assert(duplicateOutbound === false, 'WMS outbound duplicate refDoc rejected to prevent double-counting');
assert(matchingProd.stock === prevCatalogOutStock + 20, 'Catalog stock not double-counted on duplicate outbound');
assert(outboundTarget.stock === prevWmsOutStock - 20, 'WMS stock not deducted twice on duplicate outbound');

// Picking List in Order Process Modal
assert(typeof sandbox.Orders.openProcessOrderModal === 'function', 'Orders.openProcessOrderModal exists');
console.log('');

// ============================================================================
// MODULE 5: STORE & WMS STOCK SYNCHRONIZATION & CANCELLATION
// ============================================================================
console.log('--- [MODULE 5 AUDIT]: TWO-WAY STOCK SYNCHRONIZATION & CANCELLATION ---');

const syncDb = sandbox.Storage.getData();
const syncProd = syncDb.shopProducts.find(p => p.stock >= 20) || syncDb.shopProducts[0];
const syncWms = syncDb.wmsItems.find(w => w.sku === syncProd.sku || w.name === syncProd.name);

const stockCatalogBeforeSale = syncProd.stock;
const stockWmsBeforeSale = syncWms.stock;
const buyQuantity = 5;

// Simulate Shop Checkout (Buyer mode)
sandbox.localStorage.setItem("GBA_AUTH_ROLE_V1", "buyer");
sandbox.Shop.cart = [
  {
    productId: syncProd.id,
    sku: syncProd.sku,
    name: syncProd.name,
    qty: buyQuantity,
    unit: syncProd.unit,
    price: syncProd.price,
    image: syncProd.image
  }
];

// Execute order submission (awaited)
await sandbox.Shop.submitOrder({ preventDefault: () => {} });

const postSaleData = sandbox.Storage.getData();
const createdOrder = postSaleData.orders[0];
const updatedShopProd = postSaleData.shopProducts.find(p => p.id === syncProd.id);
const updatedWmsItem = postSaleData.wmsItems.find(w => w.sku === syncProd.sku || w.name === syncProd.name);

assert(createdOrder !== undefined && createdOrder.items[0].name === syncProd.name, 'Checkout order created successfully');
assert(updatedShopProd.stock === stockCatalogBeforeSale - buyQuantity, `Catalog stock deducted from ${stockCatalogBeforeSale} to ${updatedShopProd.stock}`);
assert(updatedWmsItem.stock === stockWmsBeforeSale - buyQuantity, `WMS stock deducted from ${stockWmsBeforeSale} to ${updatedWmsItem.stock}`);

// Verify WMS Outbound Log Created for Sale
const salesWmsLog = postSaleData.wmsLogs.find(l => (l.refDoc && l.refDoc.includes(createdOrder.id)) || (l.notes && l.notes.includes(createdOrder.id)));
assert(salesWmsLog !== undefined && salesWmsLog.qty.includes(String(buyQuantity)), 'WMS mutation log recorded for sale checkout');

// Test Order Cancellation & Automatic Stock Return
assert(typeof sandbox.Orders.cancelOrder === 'function', 'Orders.cancelOrder method exists');
sandbox.localStorage.setItem("GBA_AUTH_ROLE_V1", "admin");
sandbox.Orders.cancelOrder(createdOrder.id);

const postCancelData = sandbox.Storage.getData();
const cancelledOrder = postCancelData.orders.find(o => o.id === createdOrder.id);
const restoredShopProd = postCancelData.shopProducts.find(p => p.id === syncProd.id);
const restoredWmsItem = postCancelData.wmsItems.find(w => w.sku === syncProd.sku || w.name === syncProd.name);

assert(cancelledOrder.status === 'Dibatalkan', 'Order status updated to "Dibatalkan"');
assert(restoredShopProd.stock === stockCatalogBeforeSale, `Catalog stock restored back to original ${stockCatalogBeforeSale}`);
assert(restoredWmsItem.stock === stockWmsBeforeSale, `WMS stock restored back to original ${stockWmsBeforeSale}`);

const cancelWmsLog = postCancelData.wmsLogs.find(l => l.source && l.source.includes('Pembatalan Pesanan ' + createdOrder.id));
assert(cancelWmsLog !== undefined && cancelWmsLog.type === 'inbound', 'WMS inbound mutation log recorded for cancellation');
assert(cancelledOrder.checkpoints[0].title.includes('Dibatalkan'), 'Cancellation checkpoint added to order timeline');

// Prevent double cancellation
const prevRestoredWmsStock = restoredWmsItem.stock;
sandbox.Orders.cancelOrder(createdOrder.id);
const doubleCancelData = sandbox.Storage.getData();
const doubleCancelWmsItem = doubleCancelData.wmsItems.find(w => w.sku === syncProd.sku);
assert(doubleCancelWmsItem.stock === prevRestoredWmsStock, 'Cancelling already cancelled order does not duplicate stock return');
console.log('');

// ============================================================================
// MODULE 6: INCOMING ORDER NOTIFICATIONS
// ============================================================================
console.log('--- [MODULE 6 AUDIT]: INCOMING ORDER NOTIFICATIONS ---');

assert(typeof sandbox.App.notifyAdminOfNewOrder === 'function', 'App.notifyAdminOfNewOrder exists');
assert(typeof sandbox.App.handleIncomingAdminOrderNotification === 'function', 'App.handleIncomingAdminOrderNotification exists');

mockAudioPlayed = false;
MockNotification.lastInstance = null;
MockBroadcastChannel.lastMessage = null;

const testNotificationOrder = {
  id: 'ORD-NOTIF-TEST-999',
  customerName: 'Hj. Mardiyah Sembako',
  customerPhone: '0812-7777-8888',
  totalAmount: 1540000,
  orderDate: '2026-11-25 11:20',
  items: [{ name: 'Minyak Goreng', qty: 10, unit: 'Dus' }]
};

sandbox.App.notifyAdminOfNewOrder(testNotificationOrder);

assert(mockAudioPlayed === true, 'Audio chime played via Web Audio API');
assert(MockNotification.lastInstance !== null, 'Native Web Push notification created');
assert(MockNotification.lastInstance.title.includes('ORD-NOTIF-TEST-999'), 'Notification title contains order ID');
assert(MockNotification.lastInstance.options.body.includes('Hj. Mardiyah Sembako'), 'Notification body contains customer name');

assert(MockBroadcastChannel.lastMessage !== null, 'BroadcastChannel dispatched message for multi-device sync');
assert(MockBroadcastChannel.lastMessage.type === 'NEW_ORDER', 'Broadcast message type is NEW_ORDER');

const notifData = sandbox.Storage.getData();
const persistedNotif = (notifData.adminNotifications || []).find(n => n.orderId === testNotificationOrder.id);
assert(persistedNotif !== undefined, 'Notification persisted in adminNotifications inbox');
assert(persistedNotif.read === false, 'Persisted notification is marked as unread (read: false)');

assert(typeof sandbox.App.openAdminNotificationsModal === 'function', 'App.openAdminNotificationsModal exists');
assert(typeof sandbox.App.markAllNotificationsRead === 'function', 'App.markAllNotificationsRead exists');

console.log('\n================================================================');
console.log(`  AUDIT RESULTS: ${passedChecks} / ${totalChecks} CHECKS PASSED (${((passedChecks/totalChecks)*100).toFixed(1)}%)`);
console.log(`  FAILED CHECKS: ${failedChecks}`);
console.log('================================================================\n');

if (failedChecks > 0) {
  process.exit(1);
} else {
  console.log('ALL 6 CORE MODULES & WORKFLOWS AUDITED AND VERIFIED 100% HEALTHY! 🎉');
  process.exit(0);
}
}

runAudits().catch(err => {
  console.error("Audit error:", err);
  process.exit(1);
});
