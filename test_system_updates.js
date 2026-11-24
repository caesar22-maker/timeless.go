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

  console.log(`\n========================================`);
  console.log(`TEST SUMMARY: ${passedTests} / ${totalTests} PASSED (${Math.round((passedTests/totalTests)*100)}%)`);
  console.log(`========================================\n`);

  if (passedTests === totalTests) {
    process.exit(0);
  } else {
    process.exit(1);
  }
})();
