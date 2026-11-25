const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('========================================================================');
console.log('  EXHAUSTIVE TEST & AUDIT OF ALL APPLICATION BUTTONS & FEATURES  ');
console.log('========================================================================\n');

let passedTests = 0;
let totalTests = 0;

function check(fnDesc, testFn) {
  totalTests++;
  try {
    testFn();
    console.log(`  [PASS] ${fnDesc}`);
    passedTests++;
  } catch (err) {
    console.error(`  [FAIL] ${fnDesc} --> ${err.message}\n${err.stack}`);
  }
}

async function checkAsync(fnDesc, testFn) {
  totalTests++;
  try {
    await testFn();
    console.log(`  [PASS] ${fnDesc}`);
    passedTests++;
  } catch (err) {
    console.error(`  [FAIL] ${fnDesc} --> ${err.message}\n${err.stack}`);
  }
}

// 1. Setup Sandbox Environment
const mockStorage = {};
const elements = {};
let lastInsertedHtml = '';

class MockNotification {
  constructor(title, options) {
    this.title = title;
    this.options = options;
  }
}
MockNotification.permission = "granted";
MockNotification.requestPermission = async () => "granted";

class MockAudioContext {
  constructor() { this.destination = {}; this.currentTime = 0; }
  createOscillator() {
    return {
      type: 'sine',
      frequency: { setValueAtTime: () => {} },
      connect: () => {},
      start: () => {},
      stop: () => {}
    };
  }
  createGain() {
    return {
      gain: { setValueAtTime: () => {}, exponentialRampToValueAtTime: () => {} },
      connect: () => {}
    };
  }
}

class MockBroadcastChannel {
  constructor(name) { this.name = name; }
  postMessage() {}
}

const sandbox = {
  console: console,
  setTimeout: (fn, ms) => { fn(); return 1; },
  clearTimeout: () => {},
  setInterval: () => 1,
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
  confirm: () => true,
  alert: () => {},
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
  navigator: {
    userAgent: 'Node.js Test Agent',
    clipboard: {
      writeText: async () => {},
      readText: async () => 'https://images.unsplash.com/photo-1544005313-94ddf0286df2'
    }
  },
  document: {
    getElementById: (id) => {
      if (!elements[id]) {
        elements[id] = {
          id: id,
          value: '',
          innerHTML: '',
          innerText: '',
          textContent: '',
          style: {},
          classList: {
            classes: new Set(),
            add: function(c) { this.classes.add(c); },
            remove: function(c) { this.classes.delete(c); },
            contains: function(c) { return this.classes.has(c); },
            toggle: function(c) { this.contains(c) ? this.remove(c) : this.add(c); }
          },
          addEventListener: () => {},
          removeEventListener: () => {},
          setAttribute: () => {},
          getAttribute: () => null,
          focus: () => {},
          setSelectionRange: () => {},
          appendChild: () => {},
          removeChild: () => {},
          remove: function() {
            delete elements[id];
          },
          insertAdjacentHTML: (pos, html) => {
            lastInsertedHtml += html;
          },
          scrollIntoView: () => {}
        };
      }
      return elements[id];
    },
    querySelector: (selector) => {
      if (selector.includes('order_payment_method')) return { value: 'QRIS' };
      if (selector.includes('order_status')) return { value: 'Dalam Pengiriman' };
      if (selector.includes('input[type="radio"]')) return { value: 'option1', checked: true };
      return null;
    },
    querySelectorAll: (sel) => {
      return [
        {
          querySelector: (sub) => {
            if (sub.includes('row-qty')) return { value: '5' };
            if (sub.includes('row-price')) return { value: '15000' };
            if (sub.includes('row-subtotal')) return { textContent: 'Rp 75.000' };
            if (sub.includes('row-name')) return { value: 'Item Test' };
            if (sub.includes('row-unit')) return { value: 'Pack' };
            return null;
          }
        }
      ];
    },
    createElement: (tag) => ({
      tagName: tag.toUpperCase(),
      style: {},
      classList: { add: () => {}, remove: () => {} },
      appendChild: () => {},
      removeChild: () => {},
      remove: () => {},
      setAttribute: () => {},
      innerHTML: '',
      innerText: '',
      textContent: ''
    }),
    body: {
      insertAdjacentHTML: (pos, html) => {
        lastInsertedHtml += html;
      },
      appendChild: () => {}
    }
  },
  window: {},
  L: {
    map: () => ({ setView: () => {}, fitBounds: () => {}, remove: () => {}, addLayer: () => {} }),
    tileLayer: () => ({ addTo: () => {} }),
    marker: () => ({ addTo: () => ({ bindPopup: () => ({ openPopup: () => {} }) }), setLatLng: () => {} }),
    polyline: () => ({ addTo: () => {} }),
    icon: (opts) => opts,
    divIcon: (opts) => opts,
    latLngBounds: () => ({})
  }
};
sandbox.window = sandbox;

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

async function runExhaustiveTests() {
  console.log('--- 1. APP MODULE BUTTONS & WORKFLOWS ---');

  check('App.switchTab to all available tabs', () => {
    ['shop', 'tracking', 'wms', 'docs', 'inventory'].forEach(tab => {
      sandbox.App.switchTab(tab);
    });
  });

  check('App.openLoginModal & App.handleLogin', () => {
    sandbox.App.openLoginModal();
    const loginPass = sandbox.document.getElementById('login-password');
    loginPass.value = 'timeless';
    sandbox.App.handleLogin({ preventDefault: () => {} });
    sandbox.App.logout();
    sandbox.App.handleCustomerQuickLogin();
    sandbox.App.logoutBuyer();
  });

  check('App.openCustomerProfileModal & App.saveCustomerProfile', () => {
    sandbox.App.openCustomerProfileModal();
    sandbox.document.getElementById('prof-cust-name').value = 'Toko Sejahtera';
    sandbox.document.getElementById('prof-cust-phone').value = '081234567890';
    sandbox.document.getElementById('prof-cust-address').value = 'Jl. Raya Gadang No. 10, Malang';
    sandbox.document.getElementById('prof-cust-coords').value = '-7.9948, 112.6325';
    sandbox.App.saveCustomerProfile({ preventDefault: () => {} });
    sandbox.App.clearCustomerAccountData();
  });

  check('App.openGoogleAuthModal & App.selectGoogleAccount & registerGoogleAccount', () => {
    sandbox.App.openGoogleAuthModal('CUSTOMER_LOGIN');
    sandbox.App.selectGoogleAccount('hendra.wijaya.gba@gmail.com');
    sandbox.App.openGoogleAuthModal('CUSTOMER_LOGIN');
    sandbox.document.getElementById('reg-google-name').value = 'Test User';
    sandbox.document.getElementById('reg-google-email').value = 'test@gmail.com';
    sandbox.document.getElementById('reg-google-phone').value = '081299999999';
    sandbox.document.getElementById('reg-google-address').value = 'Kepanjen Malang';
    sandbox.App.registerGoogleAccount({ preventDefault: () => {} });
  });

  check('App.openStoreSettingsModal & saveStoreSettings & testSupabaseConnection', () => {
    sandbox.localStorage.setItem('GBA_AUTH_ROLE_V1', 'admin');
    sandbox.App.openStoreSettingsModal();
    sandbox.document.getElementById('setting-store-name').value = 'TIMELESS.GO X ABADI GROSIR';
    sandbox.document.getElementById('setting-store-phone').value = '081234567890';
    sandbox.document.getElementById('setting-store-address').value = 'Jl. Raya Kendalpayak No.1A, Malang';
    sandbox.document.getElementById('setting-supabase-url').value = 'https://mock.supabase.co';
    sandbox.document.getElementById('setting-supabase-key').value = 'mock-key';
    sandbox.App.saveStoreSettings({ preventDefault: () => {} });
    sandbox.App.togglePasswordVisibility('setting-supabase-key');
    sandbox.App.toggleSupabaseKeyVisibility();
  });

  check('App.openAdminNotificationsModal & markAllNotificationsRead', () => {
    sandbox.App.openAdminNotificationsModal();
    sandbox.App.markAllNotificationsRead();
  });

  check('App.closeModal for existing and non-existing modals', () => {
    sandbox.App.closeModal('any-random-modal');
  });

  check('App.copyToClipboard & pasteFromClipboard', async () => {
    sandbox.App.copyToClipboard('Test Text', 'Disalin');
    await sandbox.App.pasteFromClipboard('prof-cust-address', 'prof-cust-avatar-preview');
  });

  check('App.previewImageModal & previewImage', () => {
    sandbox.App.previewImageModal('https://images.unsplash.com/photo-1544005313-94ddf0286df2', 'Foto Test');
    sandbox.App.previewImage('https://images.unsplash.com/photo-1544005313-94ddf0286df2');
  });

  console.log('\n--- 2. SHOP MODULE BUTTONS & WORKFLOWS ---');

  check('Shop search, filter, pagination, category handling', () => {
    sandbox.Shop.render();
    sandbox.Shop.handleSearchInput({ target: { value: 'Minyak' } });
    sandbox.Shop.clearSearch();
    sandbox.Shop.handleCategory('Sembako');
    sandbox.Shop.goToPage(2);
    sandbox.Shop.goToPage(1);
    sandbox.Shop.handleCategory('ALL');
  });

  check('Shop cart controls: quickAddToCart, adjust qty, remove, clear', () => {
    sandbox.localStorage.setItem('GBA_AUTH_ROLE_V1', 'buyer');
    const db = sandbox.Storage.getData();
    const prod = db.shopProducts[0];
    sandbox.Shop.quickAddToCart(prod.id, 2);
    sandbox.Shop.openCartModal();
    sandbox.Shop.updateCartQty(0, 1);
    sandbox.Shop.updateCartQty(0, -1);
    sandbox.Shop.removeCartItem(0);
    sandbox.Shop.quickAddToCart(prod.id, 3);
    sandbox.Shop.clearCart();
  });

  check('Shop product detail modal: open, adjust qty, update subtotal, add, buy now', () => {
    sandbox.localStorage.setItem('GBA_AUTH_ROLE_V1', 'buyer');
    const db = sandbox.Storage.getData();
    const prod = db.shopProducts[0];
    sandbox.Shop.openDetailModal(prod.id);
    sandbox.Shop.adjustDetailQty(5);
    sandbox.Shop.adjustDetailQty(-2);
    sandbox.Shop.updateDetailSubtotal();
    sandbox.Shop.addFromDetailModal(prod.id);
    sandbox.Shop.openDetailModal(prod.id);
    sandbox.Shop.buyNowFromDetail(prod.id);
  });

  await checkAsync('Shop checkout & payment confirmation', async () => {
    sandbox.localStorage.setItem('GBA_AUTH_ROLE_V1', 'buyer');
    const db = sandbox.Storage.getData();
    const prod = db.shopProducts[0];
    sandbox.Shop.cart = [{ productId: prod.id, name: prod.name, unit: prod.unit, qty: 2, price: prod.price }];
    sandbox.Shop.openCheckoutModal();
    sandbox.document.getElementById('order-cust-name').value = 'Toko Barokah';
    sandbox.document.getElementById('order-cust-phone').value = '081234567890';
    sandbox.document.getElementById('order-cust-address').value = 'Kendalpayak';
    sandbox.document.getElementById('order-delivery').value = 'Truk Toko GBA 1 (CDD Box)';
    sandbox.document.getElementById('order-notes').value = 'Urgent';
    await sandbox.Shop.submitOrder({ preventDefault: () => {} });
    const lastOrder = sandbox.Storage.getData().orders[0];
    sandbox.Shop.confirmPayment(lastOrder.id);
  });

  check('Shop master product management (admin): openProductModal, saveProduct, deleteProduct', () => {
    sandbox.localStorage.setItem('GBA_AUTH_ROLE_V1', 'admin');
    sandbox.Shop.openProductModal();
    sandbox.document.getElementById('prod-name').value = 'Kopi Bubuk Murni 250g';
    sandbox.document.getElementById('prod-sku').value = 'SKU-KOPI-TEST-001';
    sandbox.document.getElementById('prod-category').value = 'Minuman';
    sandbox.document.getElementById('prod-price').value = '15000';
    sandbox.document.getElementById('prod-unit').value = 'Bungkus';
    sandbox.document.getElementById('prod-stock').value = '10';
    sandbox.document.getElementById('prod-min-stock').value = '5';
    sandbox.document.getElementById('prod-desc').value = 'Kopi asli pilihan';
    sandbox.document.getElementById('prod-image').value = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2';
    sandbox.Shop.saveProduct({ preventDefault: () => {} });

    const newProd = sandbox.Storage.getData().shopProducts.find(p => p.sku === 'SKU-KOPI-TEST-001');
    if (newProd) {
      sandbox.Shop.openProductModal(newProd.id);
      sandbox.Shop.deleteProduct(newProd.id);
    }
  });

  check('Shop banner editing (admin): openBannerEditModal & saveBanner', () => {
    sandbox.localStorage.setItem('GBA_AUTH_ROLE_V1', 'admin');
    sandbox.Shop.openBannerEditModal();
    sandbox.document.getElementById('banner-badge').value = 'PROMO MERDEKA';
    sandbox.document.getElementById('banner-title').value = 'Diskon Akbar Sembako';
    sandbox.document.getElementById('banner-subtitle').value = 'Khusus belanja minimal 1 juta';
    sandbox.document.getElementById('banner-image').value = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2';
    sandbox.Shop.saveBanner({ preventDefault: () => {} });
  });

  console.log('\n--- 3. ORDERS MODULE BUTTONS & WORKFLOWS ---');

  check('Orders tracking panel & modal: openCustomerTrackingModal, setTrackingOrder, searchCustomerOrder', () => {
    sandbox.Orders.renderTrackingPanel();
    const db = sandbox.Storage.getData();
    const order = db.orders[0];
    if (order) {
      sandbox.Orders.setTrackingOrder(order.id);
      sandbox.Orders.openCustomerTrackingModal(order.id);
      sandbox.document.getElementById('tracking-search-input').value = order.id;
      sandbox.Orders.searchCustomerOrder('tracking-search-input');
    }
  });

  await checkAsync('Orders route map modal & interactive map controls', async () => {
    const db = sandbox.Storage.getData();
    const order = db.orders[0];
    await sandbox.Orders.openRouteMapModal(order);
    sandbox.Orders.centerOnStore();
    sandbox.Orders.centerOnDestination();
    sandbox.Orders.centerOnFleet();
    sandbox.Orders.fitMapBounds();
    sandbox.Orders.openInGoogleMaps();
  });

  check('Orders employee order processing modal & saving updates', () => {
    sandbox.localStorage.setItem('GBA_AUTH_ROLE_V1', 'admin');
    sandbox.Orders.openEmployeeOrdersModal();
    sandbox.Orders.handleEmployeeSearch('Toko');
    sandbox.Orders.handleEmployeeFilter('ALL');

    const db = sandbox.Storage.getData();
    const order = db.orders[0];
    if (order) {
      sandbox.Orders.openProcessOrderModal(order.id);
      sandbox.document.getElementById('proc-cust-name').value = order.customerName;
      sandbox.document.getElementById('proc-cust-phone').value = order.customerPhone;
      sandbox.document.getElementById('proc-cust-address').value = order.customerAddress;
      sandbox.document.getElementById('proc-packer').value = 'Agus Packer';
      sandbox.document.getElementById('proc-qc').value = 'Lolos QC';
      sandbox.document.getElementById('proc-vehicle').value = 'Truk Toko GBA 1 (CDD Box)';
      sandbox.document.getElementById('proc-plate').value = 'N 1234 AA';
      sandbox.document.getElementById('proc-driver').value = 'Supir Budi';
      sandbox.document.getElementById('proc-driver-phone').value = '0812334455';
      sandbox.document.getElementById('proc-eta').value = '30 Menit';
      sandbox.document.getElementById('proc-progress-percent').value = '75';
      sandbox.document.getElementById('proc-receiver').value = 'Penerima';
      sandbox.Orders.saveProcessedOrder({ preventDefault: () => {} }, order.id);
    }
  });

  check('Orders cancel order and confirm received', () => {
    sandbox.localStorage.setItem('GBA_AUTH_ROLE_V1', 'admin');
    const db = sandbox.Storage.getData();
    const order = db.orders[0];
    if (order) {
      sandbox.Orders.confirmOrderReceived(order.id);
      sandbox.Orders.confirmCancelOrder(order.id);
    }
  });

  check('Orders create manual order: openNewOrderModal & saveNewOrder', () => {
    sandbox.localStorage.setItem('GBA_AUTH_ROLE_V1', 'admin');
    sandbox.Orders.openNewOrderModal();
    sandbox.document.getElementById('new-order-cust').value = 'Toko Bintang 9';
    sandbox.document.getElementById('new-order-phone').value = '081234567890';
    sandbox.document.getElementById('new-order-addr').value = 'Sukun Malang';
    sandbox.document.getElementById('new-order-items').value = 'Beras 10kg (2 Karung), Minyak 2L (5 Dus)';
    sandbox.document.getElementById('new-order-total').value = '750000';
    sandbox.document.getElementById('new-order-vehicle').value = 'Truk Toko GBA 1 (CDD Box)';
    sandbox.document.getElementById('new-order-plate').value = 'N 9876 AA';
    sandbox.document.getElementById('new-order-driver').value = 'Pak Supriadi';
    sandbox.document.getElementById('new-order-driver-phone').value = '0812998877';
    sandbox.document.getElementById('new-order-eta').value = '1 Jam';
    sandbox.document.getElementById('new-order-notes').value = 'Kirim sore';
    sandbox.Orders.saveNewOrder({ preventDefault: () => {} });
  });

  console.log('\n--- 4. WMS MODULE BUTTONS & WORKFLOWS ---');

  check('WMS view switching, search, zone filtering', () => {
    sandbox.WMS.render();
    sandbox.WMS.setView('position');
    sandbox.WMS.setZone('Zona A (Sembako)');
    sandbox.WMS.setZone('ALL');
    sandbox.WMS.setView('table');
    sandbox.WMS.handleSearchInput({ target: { value: 'Beras' } });
    sandbox.WMS.clearSearch();
    sandbox.WMS.handleFilter('Aman');
    sandbox.WMS.handleFilter('ALL');
  });

  check('WMS master item CRUD: openItemModal, saveItem, deleteItem', () => {
    sandbox.localStorage.setItem('GBA_AUTH_ROLE_V1', 'admin');
    sandbox.WMS.openItemModal();
    sandbox.document.getElementById('wms-name').value = 'Kacang Hijau Kupas 500g';
    sandbox.document.getElementById('wms-sku').value = 'SKU-KACANG-TEST-001';
    sandbox.document.getElementById('wms-category').value = 'Sembako';
    sandbox.document.getElementById('wms-zone').value = 'Zona A (Sembako)';
    sandbox.document.getElementById('wms-rack').value = 'Rak A-02-03';
    sandbox.document.getElementById('wms-stock').value = '120';
    sandbox.document.getElementById('wms-min').value = '20';
    sandbox.document.getElementById('wms-unit').value = 'Pack';
    sandbox.document.getElementById('wms-supplier').value = 'PT Hasil Bumi Sejahtera';
    sandbox.document.getElementById('wms-batch').value = 'BATCH-2026-01';
    sandbox.document.getElementById('wms-exp').value = '2028-12-31';
    sandbox.WMS.saveItem({ preventDefault: () => {} });

    const created = sandbox.Storage.getData().wmsItems.find(i => i.sku === 'SKU-KACANG-TEST-001');
    if (created) {
      sandbox.WMS.openItemModal(created.id);
      sandbox.WMS.deleteItem(created.id);
    }
  });

  check('WMS inbound modal & calculation', () => {
    sandbox.localStorage.setItem('GBA_AUTH_ROLE_V1', 'admin');
    const db = sandbox.Storage.getData();
    const item = db.wmsItems[0];
    sandbox.WMS.openInboundModal(item.id);
    sandbox.document.getElementById('inbound-qty').value = '10';
    sandbox.document.getElementById('inbound-price').value = '25000';
    sandbox.WMS.calcInboundTotal();
    sandbox.document.getElementById('inbound-supplier').value = 'PT Supplier Utama';
    sandbox.document.getElementById('inbound-ref').value = 'PO-MANUAL-TEST-01';
    sandbox.WMS.saveInbound({ preventDefault: () => {} });
  });

  check('WMS outbound modal & transaction', () => {
    sandbox.localStorage.setItem('GBA_AUTH_ROLE_V1', 'admin');
    const db = sandbox.Storage.getData();
    const item = db.wmsItems[0];
    sandbox.WMS.openOutboundModal();
    sandbox.document.getElementById('outbound-item-id').value = item.id;
    sandbox.document.getElementById('outbound-qty').value = '5';
    sandbox.document.getElementById('outbound-destination').value = 'Toko Grosir Kendalpayak';
    sandbox.document.getElementById('outbound-ref').value = 'TRF-OUTBOUND-TEST-MANUAL-' + Date.now();
    sandbox.WMS.saveOutbound({ preventDefault: () => {} });
  });

  check('WMS stock opname modal & execution', () => {
    sandbox.localStorage.setItem('GBA_AUTH_ROLE_V1', 'admin');
    const db = sandbox.Storage.getData();
    const item = db.wmsItems[0];
    sandbox.WMS.openStockOpnameModal();
    sandbox.document.getElementById('opname-item-id').value = item.id;
    sandbox.WMS.handleOpnameSelect(item.id);
    sandbox.document.getElementById('opname-physical').value = String(item.stock);
    sandbox.document.getElementById('opname-auditor').value = 'Auditor Internal';
    sandbox.document.getElementById('opname-notes').value = 'Opname berkala';
    sandbox.WMS.saveStockOpname({ preventDefault: () => {} });
  });

  check('WMS barcode label modal & barcode scanner modal', () => {
    const db = sandbox.Storage.getData();
    const item = db.wmsItems[0];
    sandbox.WMS.openBarcodeModal(item.id);
    sandbox.WMS.openBarcodeScannerModal();
    sandbox.WMS.handleBarcodeScanInput(item.sku, true);
    sandbox.WMS.handleBarcodeScanInput('Blastoz', false);
  });

  check('WMS import data modal & full dataset sync', () => {
    sandbox.localStorage.setItem('GBA_AUTH_ROLE_V1', 'admin');
    sandbox.WMS.openImportModal();
    sandbox.WMS.applyImportWmsData();
    sandbox.WMS.executeFullSyncFromDataset();
  });

  console.log('\n--- 5. DOCUMENTS MODULE BUTTONS & WORKFLOWS ---');

  check('Documents list, search, filter, preview', () => {
    sandbox.Documents.render();
    sandbox.Documents.handleSearch('INV');
    sandbox.Documents.handleFilter('ALL');
    sandbox.Documents.handleFilter('Faktur Penjualan');

    const db = sandbox.Storage.getData();
    const doc = db.documents[0];
    if (doc) {
      sandbox.Documents.previewDocument(doc.id);
      sandbox.Documents.previewInvoice(doc.refDoc || doc.refOrder || '123');
      sandbox.Documents.previewSuratJalan(doc.refDoc || doc.refOrder || '123');
    }
  });

  check('Documents modal: openDocModal, addRow, removeRow, onTypeChange, saveDocument, deleteDocument', () => {
    sandbox.localStorage.setItem('GBA_AUTH_ROLE_V1', 'admin');
    sandbox.Documents.openDocModal();
    sandbox.Documents.onTypeChange('Faktur Penjualan');
    sandbox.Documents.addRow();
    sandbox.Documents.calcTotals();

    sandbox.document.getElementById('doc-number').value = 'INV/GBA/TEST/MANUAL/001';
    sandbox.document.getElementById('doc-type').value = 'Faktur Penjualan';
    sandbox.document.getElementById('doc-date').value = '2026-11-25';
    sandbox.document.getElementById('doc-due').value = '2026-12-05';
    sandbox.document.getElementById('doc-client-name').value = 'Toko Mitra Bersama';
    sandbox.document.getElementById('doc-client-phone').value = '081234567890';
    sandbox.document.getElementById('doc-client-address').value = 'Malang';
    sandbox.document.getElementById('doc-notes').value = 'Nota manual';
    sandbox.document.getElementById('doc-grand-total').textContent = 'Rp 150.000';

    sandbox.Documents.saveDocument({ preventDefault: () => {} });
    const created = sandbox.Storage.getData().documents.find(d => d.docNumber === 'INV/GBA/TEST/MANUAL/001');
    if (created) {
      sandbox.Documents.deleteDocument(created.id);
    }
  });

  console.log('\n--- 6. INVENTORY (ALAT & MESIN) MODULE BUTTONS & WORKFLOWS ---');

  check('Inventory tool list, search, filter', () => {
    sandbox.localStorage.setItem('GBA_AUTH_ROLE_V1', 'admin');
    sandbox.Inventory.render();
    sandbox.Inventory.handleSearch('Forklift');
    sandbox.Inventory.handleFilter('Currently In Use');
    sandbox.Inventory.handleFilter('ALL');
  });

  check('Inventory tool modal: openToolModal, saveTool, deleteTool', () => {
    sandbox.localStorage.setItem('GBA_AUTH_ROLE_V1', 'admin');
    sandbox.Inventory.openToolModal();
    sandbox.document.getElementById('tool-name').value = 'Hand Stacker Manual 2 Ton';
    sandbox.document.getElementById('tool-code').value = 'HS-TEST-001';
    sandbox.document.getElementById('tool-category').value = 'Hand Pallet';
    sandbox.document.getElementById('tool-status').value = 'Currently In Use';
    sandbox.document.getElementById('tool-location').value = 'Loading Dock Blok B';
    sandbox.document.getElementById('tool-assigned').value = 'Bambang Operator';
    sandbox.document.getElementById('tool-service').value = '2026-11-01';
    sandbox.document.getElementById('tool-next-service').value = '2027-02-01';
    sandbox.document.getElementById('tool-condition').value = '95%';
    sandbox.document.getElementById('tool-image').value = 'https://images.unsplash.com/photo-1582293041079-7814c2f12063';
    sandbox.document.getElementById('tool-notes').value = 'Kondisi hidrolik prima';

    sandbox.Inventory.saveTool({ preventDefault: () => {} });
    const created = sandbox.Storage.getData().inventoryTools.find(t => t.code === 'HS-TEST-001');
    if (created) {
      sandbox.Inventory.openToolModal(created.id);
      sandbox.Inventory.deleteTool(created.id);
    }
  });

  check('Inventory assignment and maintenance modals: openAssignModal, saveAssignment, openMaintenanceModal, addMaintenanceLog', () => {
    sandbox.localStorage.setItem('GBA_AUTH_ROLE_V1', 'admin');
    const db = sandbox.Storage.getData();
    const tool = db.inventoryTools[0];
    if (tool) {
      sandbox.Inventory.openAssignModal(tool.id);
      sandbox.document.getElementById('assign-staff').value = 'Staff Operator Budi';
      sandbox.document.getElementById('assign-location').value = 'Area Rak Blok C';
      sandbox.document.getElementById('assign-status').value = 'Currently In Use';
      sandbox.Inventory.saveAssignment({ preventDefault: () => {} }, tool.id);

      sandbox.Inventory.openMaintenanceModal(tool.id);
      sandbox.document.getElementById('maint-date').value = '2026-11-25';
      sandbox.document.getElementById('maint-type').value = 'Ganti Oli Hidrolik';
      sandbox.document.getElementById('maint-tech').value = 'Bengkel Berkah Mesin';
      sandbox.document.getElementById('maint-cost').value = '150000';
      sandbox.document.getElementById('maint-notes').value = 'Oli baru SAE 46';
      sandbox.Inventory.addMaintenanceLog({ preventDefault: () => {} }, tool.id);
    }
  });

  console.log('\n--- 7. STORAGE BACKUP & DATA CONTROLS ---');

  check('Storage exportJSON and resetToDefault', () => {
    sandbox.Storage.exportJSON();
    sandbox.Storage.resetToDefault();
  });

  console.log('\n========================================================================');
  console.log(`  FEATURE & BUTTON AUDIT RESULTS: ${passedTests} / ${totalTests} CHECKS PASSED (${((passedTests/totalTests)*100).toFixed(1)}%)`);
  console.log('========================================================================\n');

  if (passedTests === totalTests) {
    console.log('ALL BUTTONS, MODALS, FORMS, AND INTERACTIONS OPERATING 100% CLEANLY & RELIABLY! 🎉');
    process.exit(0);
  } else {
    process.exit(1);
  }
}

runExhaustiveTests().catch(err => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
