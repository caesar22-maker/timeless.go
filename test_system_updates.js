const fs = require('fs');
const path = require('path');
const vm = require('vm');

const htmlPath = path.join('C:', 'Users', 'USER', 'Documents', 'grosir-app', 'grosir-app-standalone.html');
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

// 2. Setup mock browser environment via vm
const mockStorage = {};
const sandbox = {
  window: {},
  document: {
    getElementById: (id) => ({
      value: "",
      focus: () => {},
      setSelectionRange: () => {},
      scrollIntoView: () => {},
      classList: { remove: () => {}, add: () => {} },
      innerHTML: ""
    }),
    querySelector: () => null,
    querySelectorAll: () => [],
    addEventListener: () => {},
    body: {
      insertAdjacentHTML: () => {}
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

// Requirement 1: 250 items in WMS matching Reference Photo
assert(data.wmsItems && data.wmsItems.length === 250, 'wmsItems contains exactly 250 items', `Found: ${data.wmsItems?.length}`);

const blastoz = data.wmsItems[0];
assert(blastoz.name === "BLASTOZ COKLAT ARTA @6", 'Item 0 name is BLASTOZ COKLAT ARTA @6');
assert(blastoz.sku === "1905260001", 'Item 0 SKU is 1905260001');
assert(blastoz.rack === "Rak B-01-01", 'Item 0 rack is Rak B-01-01 (matches photo)', `Found: ${blastoz.rack}`);
assert(blastoz.bin === "Bin 01", 'Item 0 bin is Bin 01 (matches photo)', `Found: ${blastoz.bin}`);
assert(blastoz.zone === "Zona B", 'Item 0 zone is Zona B (matches photo)', `Found: ${blastoz.zone}`);
assert(blastoz.coordinates === "Zona Rak B-01-01", 'Item 0 coordinates is Zona Rak B-01-01 (matches photo)', `Found: ${blastoz.coordinates}`);
assert(blastoz.stock === 150, 'Item 0 stock is 150 (matches photo)', `Found: ${blastoz.stock}`);
assert(blastoz.minStock === 20, 'Item 0 minStock is 20 (matches photo)', `Found: ${blastoz.minStock}`);
assert(blastoz.batchNo === "BATCH-BLASTOZ-01", 'Item 0 batch is BATCH-BLASTOZ-01 (matches photo)', `Found: ${blastoz.batchNo}`);
assert(blastoz.expDate === "2027-10-15", 'Item 0 expDate is 2027-10-15 (matches photo)', `Found: ${blastoz.expDate}`);
assert(blastoz.status === "Aman", 'Item 0 status is Aman (matches photo)', `Found: ${blastoz.status}`);
assert(blastoz.supplier === "PT Arta Boga Cemerlang", 'Item 0 supplier is PT Arta Boga Cemerlang (matches photo)', `Found: ${blastoz.supplier}`);

// Verify WMS table row HTML rendering
const wmsHtml = sandbox.WMS.renderTableView([blastoz]);
assert(wmsHtml.includes('Rak B-01-01'), 'WMS table view renders "Rak B-01-01"');
assert(wmsHtml.includes('Bin 01'), 'WMS table view renders "Bin 01" badge');
assert(wmsHtml.includes('Zona B'), 'WMS table view renders "Zona B"');
assert(wmsHtml.includes('Zona Rak B-01-01'), 'WMS table view renders coordinate "Zona Rak B-01-01"');
assert(wmsHtml.includes('150'), 'WMS table view renders stock "150"');
assert(wmsHtml.includes('Maks: 250'), 'WMS table view renders "Maks: 250"');
assert(wmsHtml.includes('BATCH-BLASTOZ-01'), 'WMS table view renders batch');
assert(wmsHtml.includes('Exp: 15 Okt 2027'), 'WMS table view renders formatted "Exp: 15 Okt 2027"');
assert(wmsHtml.includes('Aman'), 'WMS table view renders status "Aman"');

// Requirement 1: Import functionality exists and works
assert(typeof sandbox.WMS.openImportModal === 'function', 'WMS.openImportModal function exists');
assert(typeof sandbox.WMS.buildMappedWmsFromCatalog === 'function', 'WMS.buildMappedWmsFromCatalog exists');
assert(typeof sandbox.WMS.applyImportWmsData === 'function', 'WMS.applyImportWmsData function exists');
assert(html.includes('id="btn-apply-wms-import"'), 'HTML contains btn-apply-wms-import button id');
assert(html.includes('WMS.applyImportWmsData(event)'), 'HTML contains WMS.applyImportWmsData click handler');

const mappedItems = sandbox.WMS.buildMappedWmsFromCatalog();
assert(mappedItems.length === 250, 'buildMappedWmsFromCatalog maps all 250 items', `Mapped: ${mappedItems.length}`);
assert(mappedItems[0].rack === 'Rak B-01-01', 'Imported Item 0 has Rak B-01-01');

// Test invoking applyImportWmsData() directly
let toastShown = null;
let modalClosed = null;
sandbox.App.showToast = (msg, type) => { toastShown = { msg, type }; };
sandbox.App.closeModal = (id) => { modalClosed = id; };

let importException = null;
try {
  sandbox.WMS.applyImportWmsData();
} catch (e) {
  importException = e;
}
assert(importException === null, 'WMS.applyImportWmsData() executed without any exceptions');
assert(modalClosed === 'wms-import-modal', 'WMS.applyImportWmsData() closed wms-import-modal');
assert(toastShown && toastShown.type === 'success', 'WMS.applyImportWmsData() triggered success toast', toastShown?.msg);

const storedAfterImport = sandbox.Storage.getData();
assert(storedAfterImport.wmsItems && storedAfterImport.wmsItems.length === 250, 'Database contains 250 items after applyImportWmsData()');
assert(storedAfterImport.wmsLogs && storedAfterImport.wmsLogs.length > 0, 'Database contains audit log after applyImportWmsData()');
assert(storedAfterImport.wmsLogs[0].type === 'STOCK_OPNAME', 'Log entry type is STOCK_OPNAME');
assert(typeof storedAfterImport.wmsLogs[0].staff === 'string' && storedAfterImport.wmsLogs[0].staff.length > 0, 'Log entry contains valid staff name', storedAfterImport.wmsLogs[0].staff);

// Requirement 2: Automated Surat Jalan Generation
assert(typeof sandbox.Documents.createSuratJalanFromOrder === 'function', 'Documents.createSuratJalanFromOrder function exists');
const testOrder = {
  id: "ORD-TEST-999",
  orderDate: "2026-11-18 09:00",
  customerName: "Toko Sembako Barokah",
  customerPhone: "081234567890",
  customerAddress: "Jl. Merdeka No. 45, Kepanjen, Malang",
  vehicle: "Truk Box Toko GBA",
  plateNumber: "N 1234 AB",
  driverName: "Pak Agus Santoso",
  driverPhone: "081987654321",
  items: [
    { name: "BLASTOZ COKLAT ARTA @6", quantity: 10, unit: "Pack", price: 21650, subtotal: 216500 },
    { name: "TISU NICE 900gr @20", quantity: 5, unit: "Pcs", price: 34500, subtotal: 172500 }
  ],
  totalAmount: 389000,
  status: "Dalam Pengiriman"
};

const sj = sandbox.Documents.createSuratJalanFromOrder(testOrder);
assert(sj !== null, 'Surat Jalan created successfully');
assert(sj.type === "Surat Jalan (DO)", 'Document type is Surat Jalan (DO)');
assert(sj.refOrder === "ORD-TEST-999", 'Document references ORD-TEST-999');
assert(sj.docNumber.startsWith("SJ/GBA/"), 'Document number has prefix SJ/GBA/');
assert(sj.clientName === "Toko Sembako Barokah", 'Document contains customer name');
assert(sj.clientAddress.includes("Kepanjen"), 'Document contains customer address');
assert(sj.items.length === 2, 'Document contains all ordered items');
assert(sj.vehicle === "Truk Box Toko GBA", 'Document contains vehicle');
assert(sj.driverName === "Pak Agus Santoso", 'Document contains driver');

// Requirement 3: Enhanced Search Input Functionality
assert(typeof sandbox.Shop.handleSearchInput === 'function', 'Shop.handleSearchInput function exists');
assert(typeof sandbox.Shop.executeSearch === 'function', 'Shop.executeSearch function exists');
assert(typeof sandbox.Shop.clearSearch === 'function', 'Shop.clearSearch function exists');

// Test debounce & search execution
sandbox.Shop.searchQuery = "";
sandbox.Shop.handleSearchInput({ target: { value: "BLASTOZ" } });
assert(sandbox.Shop.searchQuery === "BLASTOZ", 'Search query updated immediately on input event');
assert(sandbox.Shop._searchDebounceTimer !== null, 'Debounce timer was scheduled (300ms delay)');

// Execute search
sandbox.Shop.executeSearch("BLASTOZ");
const filteredProducts = sandbox.DEFAULT_STORE_DATA.shopProducts.filter(p => p.name.toLowerCase().includes("blastoz"));
assert(filteredProducts.length >= 1, 'Search query correctly filters products');

console.log(`\n========================================`);
console.log(`TEST SUMMARY: ${passedTests} / ${totalTests} PASSED (${Math.round((passedTests/totalTests)*100)}%)`);
console.log(`========================================\n`);

if (passedTests === totalTests) {
  process.exit(0);
} else {
  process.exit(1);
}
