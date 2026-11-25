const fs = require('fs');
const path = require('path');
const vm = require('vm');

const htmlPath = path.join(__dirname, 'grosir-app-standalone.html');
const html = fs.readFileSync(htmlPath, 'utf8');

console.log('=== TEST SUITE: TIMELESS.GO X ABADI GROSIR SYSTEM UPDATES ===\n');

let passedTests = 0;
let totalTests = 0;

function assert(cond, name, details = '') {
  totalTests++;
  if (cond) {
    console.log(`[PASS] ${name}`);
    passedTests++;
  } else {
    console.error(`[FAIL] ${name} ${details ? '- ' + details : ''}`);
  }
}

// 1. Verify Script and Structure in Standalone HTML
assert(html.includes('WMS.openImportModal'), 'HTML contains WMS.openImportModal trigger');
assert(html.includes('WMS.handleSearchInput'), 'HTML contains WMS.handleSearchInput with debounce');
assert(html.includes('Shop.handleSearchInput'), 'HTML contains Shop.handleSearchInput with debounce');
assert(html.includes('Documents.createSuratJalanFromOrder'), 'HTML contains Documents.createSuratJalanFromOrder');
assert(html.includes('Documents.previewSuratJalan'), 'HTML contains Documents.previewSuratJalan');
assert(html.includes('Bukti Pengeluaran Barang'), 'HTML contains Bukti Pengeluaran Barang support');

// 2. Setup mock browser environment via vm
const mockStorage = {};
const elements = {};

let notificationCreated = null;
class MockNotification {
  constructor(title, options) {
    this.title = title;
    this.options = options;
    notificationCreated = this;
  }
}
MockNotification.permission = "granted";
MockNotification.requestPermission = async () => "granted";

let audioPlayed = false;
class MockAudioContext {
  constructor() {
    this.destination = {};
    this.currentTime = 0;
  }
  createOscillator() {
    return {
      connect: () => {},
      start: () => { audioPlayed = true; },
      stop: () => {},
      frequency: { setValueAtTime: () => {} },
      type: 'sine'
    };
  }
  createGain() {
    return {
      connect: () => {},
      gain: { setValueAtTime: () => {}, exponentialRampToValueAtTime: () => {} }
    };
  }
  close() {}
}

let broadcastMessages = [];
class MockBroadcastChannel {
  constructor(name) {
    this.name = name;
  }
  postMessage(msg) {
    broadcastMessages.push({ channel: this.name, data: msg });
  }
  addEventListener() {}
}

const sandbox = {
  window: {},
  document: {
    getElementById: (id) => {
      if (!elements[id]) {
        elements[id] = {
          value: "",
          focus: () => {},
          setSelectionRange: () => {},
          scrollIntoView: () => {},
          classList: { remove: () => {}, add: () => {} },
          innerHTML: "",
          disabled: false
        };
      }
      return elements[id];
    },
    querySelector: () => null,
    querySelectorAll: () => [],
    addEventListener: () => {},
    body: {
      insertAdjacentHTML: (pos, h) => {
        sandbox._lastInsertedHtml = h;
      }
    }
  },
  localStorage: {
    getItem: (k) => mockStorage[k] || null,
    setItem: (k, v) => { mockStorage[k] = v; },
    removeItem: (k) => { delete mockStorage[k]; }
  },
  navigator: { userAgent: "Node" },
  console: console,
  setTimeout: setTimeout,
  clearTimeout: clearTimeout,
  confirm: () => true,
  alert: () => {},
  print: () => {},
  scrollTo: () => {},
  focus: () => {},
  Notification: MockNotification,
  AudioContext: MockAudioContext,
  webkitAudioContext: MockAudioContext,
  BroadcastChannel: MockBroadcastChannel,
  Date: Date,
  Math: Math,
  JSON: JSON,
  String: String,
  Number: Number,
  Array: Array,
  Object: Object
};
sandbox.window = sandbox;

// Extract script content from standalone HTML
const scriptMatch = html.match(/<!-- COMBINED APPLICATION LOGIC -->[\s\S]*?<script>([\s\S]*?)<\/script>/);
assert(scriptMatch && scriptMatch[1], 'Extracted combined script block from standalone HTML');

vm.createContext(sandbox);
vm.runInContext(scriptMatch[1], sandbox);

const data = sandbox.DEFAULT_STORE_DATA;
assert(typeof data !== 'undefined', 'DEFAULT_STORE_DATA loaded successfully in sandbox');

// ============================================================================
// REQUIREMENT 1: Permanent WMS Seed Data (250 Items with Higher Stock)
// ============================================================================
console.log('\n--- Testing Requirement 1: Permanent WMS Seed Data (250 Items with Higher Stock) ---');
assert(data.wmsItems && data.wmsItems.length === 250, 'wmsItems contains all 250 items', `Found: ${data.wmsItems?.length}`);
assert(data.shopProducts && data.shopProducts.length === 250, 'shopProducts contains all 250 products', `Found: ${data.shopProducts?.length}`);

// Verify BLASTOZ COKLAT ARTA @6 is present at WMS-001, Rak B-01-01
const blastozWms = data.wmsItems.find(i => i.id === "WMS-001" || i.sku === "1905260001");
assert(blastozWms !== undefined, 'BLASTOZ COKLAT ARTA @6 is present in WMS inventory as WMS-001');
assert(blastozWms.rack === "Rak B-01-01", 'BLASTOZ is assigned to Rak B-01-01', `Found: ${blastozWms?.rack}`);
assert(blastozWms.bin === "Bin 01", 'BLASTOZ is assigned to Bin 01', `Found: ${blastozWms?.bin}`);
assert(blastozWms.zone === "Zona B", 'BLASTOZ is assigned to Zona B', `Found: ${blastozWms?.zone}`);
assert(blastozWms.coordinates === "Zona Rak B-01-01", 'BLASTOZ coordinates is Zona Rak B-01-01');

const blastozCatalog = data.shopProducts.find(p => p.sku === "1905260001");
assert(blastozCatalog !== undefined, 'BLASTOZ exists in Product Catalog');
assert(blastozWms.stock >= (blastozCatalog.stock + 100), `BLASTOZ WMS stock (${blastozWms.stock}) is higher than catalog stock (${blastozCatalog.stock}) by at least 100 units`);

// Verify EVERY item in WMS has stock >= corresponding Product Catalog stock + 100
let allStockHigherBy100 = true;
let failingItems = [];
for (let i = 0; i < 250; i++) {
  const w = data.wmsItems[i];
  const p = data.shopProducts[i];
  if (!w || !p || w.stock < (p.stock + 100)) {
    allStockHigherBy100 = false;
    failingItems.push({ index: i, name: p?.name, catStock: p?.stock, wmsStock: w?.stock });
  }
}
assert(allStockHigherBy100, 'All 250 WMS items have stock >= Product Catalog stock + 100', JSON.stringify(failingItems.slice(0, 3)));

// Verify Storage.getData() loads persisted inventory without resetting or overwriting catalog stock
const loadedData = sandbox.Storage.getData();
assert(loadedData.wmsItems.length === 250, 'Storage.getData() returns 250 WMS items');
assert(loadedData.shopProducts[0].stock === 150, 'Catalog stock for BLASTOZ remains 150 (not overwritten by WMS stock)', `Found: ${loadedData.shopProducts[0].stock}`);
assert(loadedData.wmsItems[0].stock === 270, 'WMS stock for BLASTOZ remains 270 (independent from catalog stock)', `Found: ${loadedData.wmsItems[0].stock}`);

// Verify WMS table row HTML rendering
const wmsHtml = sandbox.WMS.renderTableView([blastozWms]);
assert(wmsHtml.includes('Rak B-01-01'), 'WMS table view renders "Rak B-01-01"');
assert(wmsHtml.includes('Bin 01'), 'WMS table view renders "Bin 01"');
assert(wmsHtml.includes('Zona B'), 'WMS table view renders "Zona B"');
assert(wmsHtml.includes('Zona Rak B-01-01'), 'WMS table view renders coordinate "Zona Rak B-01-01"');
assert(wmsHtml.includes('270'), 'WMS table view renders WMS stock 270');

// Verify buildMappedWmsFromCatalog maps all 250 items with stock >= catalog + 100
const mappedItems = sandbox.WMS.buildMappedWmsFromCatalog();
assert(mappedItems.length === 250, 'buildMappedWmsFromCatalog maps all 250 items', `Mapped: ${mappedItems.length}`);
assert(mappedItems[0].name === "BLASTOZ COKLAT ARTA @6", 'Mapped item 0 is BLASTOZ COKLAT ARTA @6');
assert(mappedItems[0].stock >= 250, 'Mapped item 0 stock is >= 250');

// ============================================================================
// REQUIREMENT 2: Automatic WMS Stock Deduction & Goods Issue Document
// ============================================================================
console.log('\n--- Testing Requirement 2: Automatic WMS Stock Deduction & Goods Issue Document ---');

// Mock toast and modal handlers
let toastShown = null;
let modalClosed = null;
sandbox.App.showToast = (msg, type) => { toastShown = { msg, type }; };
sandbox.App.closeModal = (id) => { modalClosed = id; };

// Case A: Validation to prevent negative stock when WMS stock is insufficient
const initialBlastozWmsStock = loadedData.wmsItems[0].stock; // 270
const excessiveQty = initialBlastozWmsStock + 50; // 320

toastShown = null;
const saveResultExcessive = sandbox.Shop.saveProduct(null, null, {
  name: "BLASTOZ COKLAT ARTA @6",
  sku: "1905260001",
  category: "Sembako",
  unit: "Pack",
  stock: excessiveQty,
  price: 21650
});

assert(saveResultExcessive === false, 'Shop.saveProduct rejects addition when requested quantity exceeds WMS stock');
assert(toastShown !== null && toastShown.type === 'error', 'Error toast is displayed for insufficient WMS stock', toastShown?.msg);
assert(loadedData.wmsItems[0].stock === initialBlastozWmsStock, 'WMS stock was not deducted on failed validation');

// Case B: Successful addition, WMS deduction, and automated Bukti Pengeluaran Barang generation
const validAddQty = 25;
const expectedWmsStockAfter = initialBlastozWmsStock - validAddQty;
const initialDocCount = (loadedData.documents || []).length;
const initialWmsLogCount = (loadedData.wmsLogs || []).length;

toastShown = null;
const saveResultSuccess = sandbox.Shop.saveProduct(null, null, {
  name: "BLASTOZ COKLAT ARTA @6",
  sku: "1905260001",
  category: "Sembako",
  unit: "Pack",
  stock: validAddQty,
  price: 21650
});

assert(saveResultSuccess === true, 'Shop.saveProduct succeeds with sufficient WMS stock');
assert(loadedData.wmsItems[0].stock === expectedWmsStockAfter, `WMS stock deducted by ${validAddQty} (from ${initialBlastozWmsStock} to ${expectedWmsStockAfter})`);
assert(loadedData.documents.length === initialDocCount + 1, 'New document generated and saved in database');

const generatedBpb = loadedData.documents[0];
assert(generatedBpb.type === "Bukti Pengeluaran Barang", 'Generated document type is "Bukti Pengeluaran Barang"');
assert(generatedBpb.docNumber.startsWith("BPB/GBA/"), 'Document number has BPB/GBA/ prefix', generatedBpb.docNumber);
assert(generatedBpb.refDoc.startsWith("TRF-GUDANG-TOKO-"), 'Reference ID recorded (TRF-GUDANG-TOKO-...)');
assert(generatedBpb.sourceLocation.includes("Rak B-01-01"), 'Source location accurately identifies WMS rack', generatedBpb.sourceLocation);
assert(generatedBpb.destinationLocation.includes("Toko Grosir"), 'Destination location accurately identifies store display', generatedBpb.destinationLocation);
assert(generatedBpb.items && generatedBpb.items[0].qty === validAddQty, `Document records deducted quantity of ${validAddQty}`);
assert(generatedBpb.items[0].sku === "1905260001", 'Document records product SKU');
assert(generatedBpb.date !== undefined && generatedBpb.date.length === 10, 'Document contains valid timestamp/date');

// Verify WMS Audit Log
assert(loadedData.wmsLogs.length === initialWmsLogCount + 1, 'WMS mutation log recorded in database');
const wmsLog = loadedData.wmsLogs[0];
assert(wmsLog.type === "OUTBOUND", 'WMS log type is OUTBOUND');
assert(wmsLog.sku === "1905260001", 'WMS log references SKU 1905260001');
assert(wmsLog.newStock === expectedWmsStockAfter, `WMS log records new stock ${expectedWmsStockAfter}`);

// Test Document Preview for Bukti Pengeluaran Barang
sandbox.Documents.previewDocument(generatedBpb.id);
assert(sandbox._lastInsertedHtml.includes('BUKTI PENGELUARAN BARANG') || sandbox._lastInsertedHtml.includes('Bukti Pengeluaran Barang'), 'Preview modal renders Bukti Pengeluaran Barang');
assert(sandbox._lastInsertedHtml.includes('Asal Gudang:'), 'Preview modal renders Asal Gudang');
assert(sandbox._lastInsertedHtml.includes('Rak B-01-01'), 'Preview modal renders rack source Rak B-01-01');
assert(sandbox._lastInsertedHtml.includes('Toko Grosir'), 'Preview modal renders destination Toko Grosir');
assert(sandbox._lastInsertedHtml.includes('Petugas Gudang (Pengeluar)'), 'Preview modal renders Petugas Gudang (Pengeluar) signature');
assert(sandbox._lastInsertedHtml.includes('Penerima (Toko / Etalase)'), 'Preview modal renders Penerima Toko signature');

// ============================================================================
// REQUIREMENT 3: Map Address Alignment (Store & Buyer Addresses)
// ============================================================================
console.log('\n--- Testing Requirement 3: Map Address Alignment (Store & Buyer Addresses) ---');

assert(typeof sandbox.MapService !== 'undefined', 'MapService exists in sandbox');
const storeOrigin = sandbox.MapService.getStoreOrigin();
assert(storeOrigin.address.includes('Kendalpayak'), 'Store origin address is Kendalpayak Malang');
assert(storeOrigin.coords[0] === -8.0415 && storeOrigin.coords[1] === 112.6315, 'Store origin coordinates match [-8.0415, 112.6315]');

// Verify all 3 demo orders have explicit destinationCoords matching their delivery addresses
const orders = loadedData.orders;
assert(orders && orders.length >= 3, 'At least 3 demo orders exist');

const order1 = orders[0];
assert(Array.isArray(order1.destinationCoords) && order1.destinationCoords.length === 2, 'Order 1 has explicit destinationCoords');
assert(order1.destinationCoords[0] === -7.9948 && order1.destinationCoords[1] === 112.6325, 'Order 1 coords match Gadang Sukun Malang [-7.9948, 112.6325]');
assert(order1.customerAddress.includes('Gadang') || order1.customerAddress.includes('Sukun'), 'Order 1 address matches Gadang/Sukun Malang');

const order2 = orders[1];
assert(Array.isArray(order2.destinationCoords) && order2.destinationCoords.length === 2, 'Order 2 has explicit destinationCoords');
assert(order2.destinationCoords[0] === -7.9980 && order2.destinationCoords[1] === 112.6190, 'Order 2 coords match S. Supriadi Sukun Malang [-7.9980, 112.6190]');
assert(order2.customerAddress.includes('Supriadi') || order2.customerAddress.includes('Sukun'), 'Order 2 address matches S. Supriadi Sukun Malang');

const order3 = orders[2];
assert(Array.isArray(order3.destinationCoords) && order3.destinationCoords.length === 2, 'Order 3 has explicit destinationCoords');
assert(order3.destinationCoords[0] === -8.1320 && order3.destinationCoords[1] === 112.5720, 'Order 3 coords match Kepanjen Malang [-8.1320, 112.5720]');
assert(order3.customerAddress.includes('Kepanjen'), 'Order 3 address matches Kepanjen Malang');

// Test asynchronous geocoding resolver
(async () => {
  // Test resolve explicit coords
  const resExplicit = await sandbox.MapService.resolveDestinationCoords(order1.customerAddress, order1.destinationCoords);
  assert(resExplicit[0] === -7.9948 && resExplicit[1] === 112.6325, 'resolveDestinationCoords returns explicit coords when provided');

  // Test resolve from known address dictionary
  const resDictionary = await sandbox.MapService.resolveDestinationCoords("Jl. Raya S. Supriadi No. 88, Sukun, Malang");
  assert(resDictionary[0] === -7.9980 && resDictionary[1] === 112.6190, 'resolveDestinationCoords accurately resolves S. Supriadi address via dictionary');

  const resKepanjen = await sandbox.MapService.resolveDestinationCoords("Kepanjen Malang");
  assert(resKepanjen[0] === -8.1320 && resKepanjen[1] === 112.5720, 'resolveDestinationCoords accurately resolves Kepanjen address via dictionary');

  // Test distance calculation between Kendalpayak and Sukun
  const dist = sandbox.MapService.calculateDistanceKm(storeOrigin.coords, order1.destinationCoords);
  assert(dist > 3 && dist < 10, `Calculated distance between store and Order 1 is realistic (${dist.toFixed(1)} km)`);

  // ============================================================================
  // COMPREHENSIVE SUITE: FIVE REQUESTED CORE CAPABILITIES
  // ============================================================================

  // ----------------------------------------------------------------------------
  // Requirement 1: WMS Item Master Sync (Starting from Item #1)
  // ----------------------------------------------------------------------------
  console.log('\n--- Testing Core Requirement 1: WMS Item Master Sync from Item #1 ---');
  const syncCount = sandbox.WMS.syncItemMasterFromCatalog(false);
  assert(syncCount === 250, 'WMS.syncItemMasterFromCatalog synchronizes all 250 items', `Count: ${syncCount}`);

  const syncedData = sandbox.Storage.getData();
  const itemFirst = syncedData.wmsItems[0];
  const prodFirst = syncedData.shopProducts[0];
  assert(itemFirst.id === "WMS-001", 'First WMS item has ID WMS-001', itemFirst.id);
  assert(itemFirst.sku === prodFirst.sku, 'First WMS item SKU matches Product Catalog Item #1 SKU', `${itemFirst.sku} === ${prodFirst.sku}`);
  assert(itemFirst.name === prodFirst.name, 'First WMS item Name matches Product Catalog Item #1 Name', `${itemFirst.name} === ${prodFirst.name}`);
  assert(itemFirst.category === prodFirst.category, 'First WMS item Category matches Product Catalog Item #1 Category');
  assert(itemFirst.unit === prodFirst.unit, 'First WMS item Unit matches Product Catalog Item #1 Unit');
  assert(itemFirst.stock >= prodFirst.stock + 100, 'First WMS item stock remains higher by at least 100 units');

  const itemLast = syncedData.wmsItems[249];
  const prodLast = syncedData.shopProducts[249];
  assert(itemLast.id === "WMS-250", '250th WMS item has ID WMS-250', itemLast.id);
  assert(itemLast.sku === prodLast.sku, '250th WMS item SKU matches Product Catalog Item #250 SKU');
  assert(itemLast.name === prodLast.name, '250th WMS item Name matches Product Catalog Item #250 Name');
  assert(itemLast.category === prodLast.category, '250th WMS item Category matches Product Catalog Item #250 Category');

  // ----------------------------------------------------------------------------
  // Requirement 2: Automated Outbound Stock Sync (Product Catalog & Online Shop)
  // ----------------------------------------------------------------------------
  console.log('\n--- Testing Core Requirement 2: Automated Outbound Stock Sync & Idempotency ---');
  const wmsTargetBefore = syncedData.wmsItems[0];
  const shopTargetBefore = syncedData.shopProducts[0];
  const initialWmsStock = wmsTargetBefore.stock;
  const initialShopStock = shopTargetBefore.stock;
  const outboundQty = 12;
  const testRefDoc = "REF-TEST-OUTBOUND-SYNC-100";

  // Execute outbound transaction
  const outboundSuccess = sandbox.WMS.saveOutbound(null, {
    itemId: wmsTargetBefore.id,
    qty: outboundQty,
    refDoc: testRefDoc,
    operator: "Dispatcher Test",
    destination: "Toko Retail & Online Shop",
    notes: "Test stock transfer to store"
  });

  assert(outboundSuccess === true, 'WMS.saveOutbound executes successfully');
  const dataAfterOutbound = sandbox.Storage.getData();
  const wmsTargetAfter = dataAfterOutbound.wmsItems[0];
  const shopTargetAfter = dataAfterOutbound.shopProducts[0];

  assert(wmsTargetAfter.stock === initialWmsStock - outboundQty, `WMS stock deducted by ${outboundQty} (from ${initialWmsStock} to ${wmsTargetAfter.stock})`);
  assert(shopTargetAfter.stock === initialShopStock + outboundQty, `Product Catalog & Online Shop stock INCREASED by ${outboundQty} (from ${initialShopStock} to ${shopTargetAfter.stock})`);

  // Test Idempotency / Double-counting protection:
  let doubleCountErrorCaught = false;
  try {
    const resDuplicate = sandbox.WMS.saveOutbound(null, {
      itemId: wmsTargetBefore.id,
      qty: outboundQty,
      refDoc: testRefDoc,
      operator: "Dispatcher Test",
      destination: "Toko Retail & Online Shop"
    });
    if (!resDuplicate) doubleCountErrorCaught = true;
  } catch (e) {
    doubleCountErrorCaught = true;
  }
  const dataAfterRetry = sandbox.Storage.getData();
  assert(doubleCountErrorCaught || dataAfterRetry.shopProducts[0].stock === shopTargetAfter.stock, 'Safe DB update prevents double-counting on duplicate refDoc');
  assert(dataAfterRetry.shopProducts[0].stock === shopTargetAfter.stock, 'Catalog stock was not incremented twice');
  assert(dataAfterRetry.wmsItems[0].stock === wmsTargetAfter.stock, 'WMS stock was not decremented twice');

  // Test Safe Reversal via cancelOutbound
  const outboundLog = dataAfterOutbound.wmsLogs.find(l => l.refDoc === testRefDoc && l.type === 'OUTBOUND');
  assert(outboundLog !== undefined, 'Outbound transaction log found in WMS logs');
  const cancelResult = sandbox.WMS.cancelOutbound(outboundLog.id);
  assert(cancelResult !== false, 'WMS.cancelOutbound executes successfully');

  const dataAfterCancel = sandbox.Storage.getData();
  assert(dataAfterCancel.wmsItems[0].stock === initialWmsStock, `WMS stock restored to initial ${initialWmsStock}`);
  assert(dataAfterCancel.shopProducts[0].stock === initialShopStock, `Catalog & Shop stock reverted to initial ${initialShopStock}`);
  const cancelledLog = dataAfterCancel.wmsLogs.find(l => l.id === outboundLog.id);
  assert(cancelledLog.status === "DIBATALKAN", 'Outbound log status updated to DIBATALKAN');

  // ----------------------------------------------------------------------------
  // Requirement 3: Automatic Goods Outbound Proof Document (Surat Bukti Pengeluaran Barang)
  // ----------------------------------------------------------------------------
  console.log('\n--- Testing Core Requirement 3: Automatic Goods Outbound Proof Document ---');
  const proofRefDoc = "REF-PROOF-DOC-200";
  const proofQty = 15;
  sandbox.WMS.saveOutbound(null, {
    itemId: "WMS-001",
    qty: proofQty,
    refDoc: proofRefDoc,
    operator: "Kepala Dispatch Gudang",
    destination: "Etalase Toko Grosir & Display",
    notes: "Pengeluaran resmi display toko"
  });

  const dataAfterProof = sandbox.Storage.getData();
  const outboundDoc = dataAfterProof.documents.find(d => d.refDoc === proofRefDoc || (d.notes && d.notes.includes(proofRefDoc)));
  assert(outboundDoc !== undefined, 'Outbound Goods Voucher document automatically generated in database');
  assert(outboundDoc.type === "Surat Bukti Pengeluaran Barang", 'Document type is "Surat Bukti Pengeluaran Barang"', outboundDoc.type);
  assert(outboundDoc.docNumber && outboundDoc.docNumber.startsWith('BPPB/GBA/'), 'Document number starts with BPPB/GBA/', outboundDoc.docNumber);
  assert(outboundDoc.date && outboundDoc.date.length === 10, 'Document has valid date formatted YYYY-MM-DD', outboundDoc.date);
  assert(outboundDoc.destinationLocation.includes('Etalase Toko Grosir') || outboundDoc.clientName.includes('Etalase Toko Grosir'), 'Destination accurately recorded in voucher');
  assert(Array.isArray(outboundDoc.items) && outboundDoc.items.length >= 1, 'Document contains item list starting from Item #1');
  assert(outboundDoc.items[0].no === 1, 'Item list index starts from 1');
  assert(outboundDoc.items[0].name === "BLASTOZ COKLAT ARTA @6", 'Item name correctly listed');
  assert(outboundDoc.items[0].qty === proofQty, `Item outbound quantity matches ${proofQty}`);
  assert(outboundDoc.items[0].unit === "Pack", 'Item unit of measurement correctly listed');
  assert(outboundDoc.approval && outboundDoc.approval.dispatcher && outboundDoc.approval.receiver, 'Document contains approval signatures structure');

  // Test Document Preview & Printable View
  sandbox.Documents.previewDocument(outboundDoc.id);
  assert(sandbox._lastInsertedHtml.includes('BUKTI PENGELUARAN BARANG') || sandbox._lastInsertedHtml.includes('Bukti Pengeluaran Barang'), 'Preview modal renders Outbound Goods Voucher title');
  assert(sandbox._lastInsertedHtml.includes('window.print()') || sandbox._lastInsertedHtml.includes('Cetak Dokumen'), 'Preview modal includes printable view action');
  assert(sandbox._lastInsertedHtml.includes(outboundDoc.docNumber), 'Preview modal contains exact document number');

  // ----------------------------------------------------------------------------
  // Requirement 4: Map Locations Alignment (Store & Customer Account Addresses)
  // ----------------------------------------------------------------------------
  console.log('\n--- Testing Core Requirement 4: Map Locations & Customer Account Addresses ---');
  const accounts = sandbox.Storage.DEFAULT_CUSTOMER_ACCOUNTS;
  assert(Array.isArray(accounts) && accounts.length >= 3, 'Storage.DEFAULT_CUSTOMER_ACCOUNTS contains demo accounts');

  const fatimah = accounts.find(a => a.name.includes('Fatimah'));
  assert(fatimah !== undefined, 'Customer Ibu Hajjah Fatimah account exists');
  assert(fatimah.address.includes('Gadang') && fatimah.address.includes('Malang'), 'Fatimah address corresponds to Gadang Sukun Malang');
  assert(Array.isArray(fatimah.coords) && fatimah.coords[0] === -7.9948 && fatimah.coords[1] === 112.6325, 'Fatimah coordinates accurately match Gadang [-7.9948, 112.6325]');

  const bambang = accounts.find(a => a.name.includes('Bambang'));
  assert(bambang !== undefined, 'Customer Bpk. Bambang account exists');
  assert(bambang.address.includes('Tangerang'), 'Bambang address corresponds to Pasar Anyar Tangerang');
  assert(Array.isArray(bambang.coords) && bambang.coords[0] === -6.1783 && bambang.coords[1] === 106.6319, 'Bambang coordinates accurately match Tangerang [-6.1783, 106.6319]');

  const anita = accounts.find(a => a.name.includes('Anita'));
  assert(anita !== undefined, 'Customer Ibu Anita account exists');
  assert(anita.address.includes('Jakarta'), 'Anita address corresponds to Gambir Jakarta');
  assert(Array.isArray(anita.coords) && anita.coords[0] === -6.1674 && anita.coords[1] === 106.8249, 'Anita coordinates accurately match Jakarta [-6.1674, 106.8249]');

  // ----------------------------------------------------------------------------
  // Requirement 5: Automatic Administrator Device Notifications on Purchase
  // ----------------------------------------------------------------------------
  console.log('\n--- Testing Core Requirement 5: Automatic Admin Device Notifications on Purchase ---');
  assert(typeof sandbox.App.notifyAdminOfNewOrder === 'function', 'App.notifyAdminOfNewOrder is defined');

  audioPlayed = false;
  notificationCreated = null;
  broadcastMessages = [];
  sandbox.Storage.setRole('admin');

  const testOrder = {
    id: "ORD-TEST-9999",
    customerName: "Ibu Hajjah Fatimah",
    customerPhone: "0812-9988-7766",
    customerAddress: "Jl. Kolonel Sugiono No. 120, Gadang, Kec. Sukun, Kota Malang, Jawa Timur 65149",
    destinationCoords: [-7.9948, 112.6325],
    totalAmount: 350000,
    paymentMethod: "Transfer Bank BCA",
    orderDate: "2026-11-25 10:15",
    items: [
      { sku: "1905260001", name: "BLASTOZ COKLAT ARTA @6", qty: 10, price: 35000 }
    ]
  };

  // Trigger admin notification
  sandbox.App.notifyAdminOfNewOrder(testOrder);

  assert(audioPlayed === true, 'Audio chime played on administrator device');
  assert(notificationCreated !== null, 'Native Web Push / Desktop Notification triggered on admin device');
  assert(notificationCreated && notificationCreated.title.includes('ORD-TEST-9999'), 'Notification title contains new order ID');
  assert(notificationCreated && notificationCreated.options.body.includes('Ibu Hajjah Fatimah'), 'Notification body contains customer name');

  const adminNotifData = sandbox.Storage.getData();
  const recordedAdminNotif = (adminNotifData.adminNotifications || []).find(n => n.orderId === testOrder.id);
  assert(recordedAdminNotif !== undefined, 'Notification persisted in database adminNotifications inbox');
  assert(recordedAdminNotif.read === false, 'Notification is marked as unread');
  assert(recordedAdminNotif.totalAmount === 350000, 'Notification records accurate order amount');

  assert(broadcastMessages.length > 0 || mockStorage["GBA_ADMIN_NEW_ORDER_ALERT"] !== undefined, 'Cross-device / cross-tab broadcast message dispatched');

  console.log(`\n========================================`);
  console.log(`TEST SUMMARY: ${passedTests} / ${totalTests} PASSED (${Math.round((passedTests/totalTests)*100)}%)`);
  console.log(`========================================\n`);

  if (passedTests === totalTests) {
    process.exit(0);
  } else {
    process.exit(1);
  }
})();
