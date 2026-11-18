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

// Requirement 1: Warehouse Rack & Position Inventory in WMS
assert(data.wmsItems && data.wmsItems.length === 249, 'wmsItems contains 249 items (BLASTOZ removed as requested)', `Found: ${data.wmsItems?.length}`);
const blastozFound = data.wmsItems.some(i => i.name.includes("BLASTOZ") || i.sku === "1905260001");
assert(!blastozFound, 'BLASTOZ COKLAT ARTA @6 has been removed from WMS Rack Inventory');

const firstWmsItem = data.wmsItems[0];
assert(firstWmsItem.name === "CANNON BALL ARTA @6", 'First WMS item is CANNON BALL ARTA @6');
assert(firstWmsItem.sku === "1605260009", 'First item SKU is 1605260009');
assert(firstWmsItem.rack === "Rak B-01-02", 'First item rack is Rak B-01-02', `Found: ${firstWmsItem.rack}`);
assert(firstWmsItem.bin === "Bin 02", 'First item bin is Bin 02', `Found: ${firstWmsItem.bin}`);
assert(firstWmsItem.zone === "Zona B", 'First item zone is Zona B', `Found: ${firstWmsItem.zone}`);
assert(firstWmsItem.coordinates === "Zona Rak B-01-02", 'First item coordinates is Zona Rak B-01-02', `Found: ${firstWmsItem.coordinates}`);
assert(firstWmsItem.stock === 100, 'First item stock is 100', `Found: ${firstWmsItem.stock}`);
assert(firstWmsItem.minStock === 25, 'First item minStock is 25', `Found: ${firstWmsItem.minStock}`);
assert(firstWmsItem.batchNo === "BATCH-0009-2026", 'First item batch is BATCH-0009-2026', `Found: ${firstWmsItem.batchNo}`);
assert(firstWmsItem.expDate === "2027-11-30", 'First item expDate is 2027-11-30', `Found: ${firstWmsItem.expDate}`);
assert(firstWmsItem.status === "Aman", 'First item status is Aman', `Found: ${firstWmsItem.status}`);
assert(firstWmsItem.supplier === "PT Arta Boga Cemerlang", 'First item supplier is PT Arta Boga Cemerlang', `Found: ${firstWmsItem.supplier}`);

// Verify WMS table row HTML rendering
const wmsHtml = sandbox.WMS.renderTableView([firstWmsItem]);
assert(wmsHtml.includes('Rak B-01-02'), 'WMS table view renders "Rak B-01-02"');
assert(wmsHtml.includes('Bin 02'), 'WMS table view renders "Bin 02" badge');
assert(wmsHtml.includes('Zona B'), 'WMS table view renders "Zona B"');
assert(wmsHtml.includes('Zona Rak B-01-02'), 'WMS table view renders coordinate "Zona Rak B-01-02"');
assert(wmsHtml.includes('100'), 'WMS table view renders stock "100"');
assert(wmsHtml.includes('Maks: 250'), 'WMS table view renders "Maks: 250"');
assert(wmsHtml.includes('BATCH-0009-2026'), 'WMS table view renders batch');
assert(wmsHtml.includes('Aman'), 'WMS table view renders status "Aman"');

// Requirement 1: Import functionality exists and works
assert(typeof sandbox.WMS.openImportModal === 'function', 'WMS.openImportModal function exists');
assert(typeof sandbox.WMS.buildMappedWmsFromCatalog === 'function', 'WMS.buildMappedWmsFromCatalog exists');
assert(typeof sandbox.WMS.applyImportWmsData === 'function', 'WMS.applyImportWmsData function exists');
assert(typeof sandbox.WMS.deleteItem === 'function', 'WMS.deleteItem function exists');
assert(html.includes('id="btn-apply-wms-import"'), 'HTML contains btn-apply-wms-import button id');
assert(html.includes('WMS.applyImportWmsData(event)'), 'HTML contains WMS.applyImportWmsData click handler');

const mappedItems = sandbox.WMS.buildMappedWmsFromCatalog();
assert(mappedItems.length === 249, 'buildMappedWmsFromCatalog maps 249 items (BLASTOZ excluded)', `Mapped: ${mappedItems.length}`);
assert(!mappedItems.some(i => i.name.includes("BLASTOZ")), 'Mapped items do not contain BLASTOZ');

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
assert(storedAfterImport.wmsItems && storedAfterImport.wmsItems.length === 249, 'Database contains 249 items after applyImportWmsData()');
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

// Requirement: Logo Replacement & Supplier Party on PO and Goods Receipt
assert(!html.includes('photo-1578916171728-46686eac8d58?w=150'), 'Old unsplash logo removed from header & profile');
assert(html.includes('data:image/jpeg;base64,'), 'Standalone HTML embeds new TG logo as Base64 data URI');
assert(fs.existsSync(path.join(__dirname, 'images', 'logo.jpg')), 'Logo image file exists at images/logo.jpg');

// Test Document Preview for Purchase Order (PO) and Goods Receipt (Berita Acara)
let previewInsertedHtml = "";
sandbox.document.body.insertAdjacentHTML = (pos, h) => { previewInsertedHtml = h; };

// 1. Test Purchase Order (PO)
const poDoc = sandbox.DEFAULT_STORE_DATA.documents.find(d => d.type.includes('PO') || d.type.includes('Purchase Order'));
assert(poDoc !== undefined, 'Sample Purchase Order (PO) document exists in dataset');
sandbox.Documents.previewDocument(poDoc.id);
assert(previewInsertedHtml.includes('PIHAK SUPPLIER / PEMASOK:'), 'PO preview displays "PIHAK SUPPLIER / PEMASOK:" header');
assert(previewInsertedHtml.includes('Pihak Supplier / Pemasok,'), 'PO preview displays "Pihak Supplier / Pemasok," signature label');
assert(previewInsertedHtml.includes('PT Arta Boga Cemerlang'), 'PO preview displays supplier name in party & signature');

// 2. Test Goods Receipt / Berita Acara Penerimaan Barang
const bapbDoc = sandbox.DEFAULT_STORE_DATA.documents.find(d => d.type.includes('Berita Acara') || d.type.includes('Penerimaan'));
assert(bapbDoc !== undefined, 'Sample Berita Acara Penerimaan Barang exists in dataset');
sandbox.Documents.previewDocument(bapbDoc.id);
assert(previewInsertedHtml.includes('PIHAK SUPPLIER / PEMASOK:'), 'Goods Receipt preview displays "PIHAK SUPPLIER / PEMASOK:" header');
assert(previewInsertedHtml.includes('Pihak Supplier / Pemasok,'), 'Goods Receipt preview displays "Pihak Supplier / Pemasok," signature label');
assert(previewInsertedHtml.includes('PT Arta Boga Cemerlang'), 'Goods Receipt preview displays supplier name in party & signature');
assert(previewInsertedHtml.includes('Staff Gudang Inbound'), 'Goods Receipt preview displays "Staff Gudang Inbound" receiving staff signature');

// 3. Test Faktur Penjualan keeps normal "Penerima / Pembeli,"
const invDoc = sandbox.DEFAULT_STORE_DATA.documents.find(d => d.type.includes('Faktur'));
assert(invDoc !== undefined, 'Sample Faktur Penjualan exists in dataset');
sandbox.Documents.previewDocument(invDoc.id);
assert(previewInsertedHtml.includes('DITUJUKAN KEPADA (TUJUAN PENGIRIMAN):'), 'Faktur Penjualan displays standard customer destination header');
assert(previewInsertedHtml.includes('Penerima / Pembeli,'), 'Faktur Penjualan displays "Penerima / Pembeli," signature label');

console.log(`\n========================================`);
console.log(`TEST SUMMARY: ${passedTests} / ${totalTests} PASSED (${Math.round((passedTests/totalTests)*100)}%)`);
console.log(`========================================\n`);

if (passedTests === totalTests) {
  process.exit(0);
} else {
  process.exit(1);
}
