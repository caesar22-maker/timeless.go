const fs = require('fs');
const path = require('path');
const vm = require('vm');

// Mock browser environment
const mockStorage = {};
const elements = {};

const sandbox = {
  console: console,
  setTimeout: (fn, ms) => { return 1; },
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
      readText: async () => 'test'
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
    querySelector: () => null,
    querySelectorAll: () => [],
    createElement: (tag) => ({
      tagName: tag.toUpperCase(),
      style: {},
      classList: { add: () => {}, remove: () => {} },
      appendChild: () => {},
      removeChild: () => {},
      remove: () => {},
      setAttribute: () => {},
      innerHTML: '',
      innerText: ''
    }),
    body: {
      insertAdjacentHTML: () => {},
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

console.log('--- CHECKING ALL 143 DETECTED EVENT HANDLERS ---');

const expectedHandlers = [
  'App.clearCustomerAccountData',
  'App.closeModal',
  'App.copyToClipboard',
  'App.debounceSyncProfileMap',
  'App.handleCustomerQuickLogin',
  'App.handleImageUrlInput',
  'App.handleLogin',
  'App.handleLogoUpload',
  'App.logout',
  'App.logoutBuyer',
  'App.markAllNotificationsRead',
  'App.openAdminNotificationsModal',
  'App.openCustomerProfileModal',
  'App.openGoogleAuthModal',
  'App.openLoginModal',
  'App.openStoreSettingsModal',
  'App.pasteFromClipboard',
  'App.previewImage',
  'App.previewImageModal',
  'App.registerGoogleAccount',
  'App.requestNotificationPermission',
  'App.saveCustomerProfile',
  'App.saveStoreSettings',
  'App.seedSupabaseData',
  'App.selectDefaultCustomer',
  'App.selectGoogleAccount',
  'App.switchTab',
  'App.testSupabaseConnection',
  'App.togglePasswordVisibility',
  'App.toggleSupabaseKeyVisibility',
  'App.triggerDirectOAuth',
  'Documents.addRow',
  'Documents.addSelectedProductFromBar',
  'Documents.calcTotals',
  'Documents.deleteDocument',
  'Documents.handleAttachmentUpload',
  'Documents.handleFilter',
  'Documents.handleSearch',
  'Documents.onRowProductSelect',
  'Documents.onTypeChange',
  'Documents.openDocModal',
  'Documents.previewDocument',
  'Documents.previewInvoice',
  'Documents.previewSuratJalan',
  'Documents.removeRow',
  'Documents.saveDocument',
  'Inventory.addMaintenanceLog',
  'Inventory.deleteTool',
  'Inventory.handleFilter',
  'Inventory.handleSearch',
  'Inventory.handleToolImageUpload',
  'Inventory.openAssignModal',
  'Inventory.openMaintenanceModal',
  'Inventory.openToolModal',
  'Inventory.saveAssignment',
  'Inventory.saveTool',
  'MapService.openInGoogleMaps',
  'Orders.centerOnDestination',
  'Orders.centerOnFleet',
  'Orders.centerOnStore',
  'Orders.confirmCancelOrder',
  'Orders.confirmOrderReceived',
  'Orders.deleteOrder',
  'Orders.fitMapBounds',
  'Orders.handleEmployeeFilter',
  'Orders.handleEmployeeSearch',
  'Orders.handlePanelFilter',
  'Orders.handlePanelSearch',
  'Orders.handlePodImageUpload',
  'Orders.onStatusRadioChange',
  'Orders.openCustomerTrackingModal',
  'Orders.openEmployeeOrdersModal',
  'Orders.openInGoogleMaps',
  'Orders.openNewOrderModal',
  'Orders.openProcessOrderModal',
  'Orders.openRouteMapModal',
  'Orders.saveNewOrder',
  'Orders.saveProcessedOrder',
  'Orders.searchCustomerOrder',
  'Orders.setTrackingOrder',
  'Shop.addFromDetailModal',
  'Shop.adjustDetailQty',
  'Shop.buyNowFromDetail',
  'Shop.clearCart',
  'Shop.clearSearch',
  'Shop.confirmPayment',
  'Shop.deleteProduct',
  'Shop.directEmployeeProcess',
  'Shop.goToPage',
  'Shop.handleBannerImageUpload',
  'Shop.handleCategory',
  'Shop.handleProductImageUpload',
  'Shop.handleSearchInput',
  'Shop.openBannerEditModal',
  'Shop.openCartModal',
  'Shop.openCheckoutModal',
  'Shop.openDetailModal',
  'Shop.openProductModal',
  'Shop.previewCheckoutRouteMap',
  'Shop.quickAddToCart',
  'Shop.removeCartItem',
  'Shop.saveBanner',
  'Shop.saveProduct',
  'Shop.submitOrder',
  'Shop.updateCartQty',
  'Shop.updateDetailSubtotal',
  'Storage.exportJSON',
  'Storage.importJSON',
  'Storage.resetToDefault',
  'WMS.applyImportWmsData',
  'WMS.calcInboundTotal',
  'WMS.cancelOutbound',
  'WMS.clearSearch',
  'WMS.deleteItem',
  'WMS.executeFullSyncFromDataset',
  'WMS.handleBarcodeScanInput',
  'WMS.handleFilter',
  'WMS.handleImageUpload',
  'WMS.handleImportFile',
  'WMS.handleInboundItemChange',
  'WMS.handleOpnameSelect',
  'WMS.handleSearchInput',
  'WMS.openBarcodeModal',
  'WMS.openBarcodeScannerModal',
  'WMS.openEditOutboundModal',
  'WMS.openImportModal',
  'WMS.openInboundModal',
  'WMS.openItemModal',
  'WMS.openOutboundModal',
  'WMS.openStockOpnameModal',
  'WMS.saveEditOutbound',
  'WMS.saveInbound',
  'WMS.saveItem',
  'WMS.saveOutbound',
  'WMS.saveStockOpname',
  'WMS.setView',
  'WMS.setZone',
  'WMS.syncItemMasterFromCatalog'
];

let missingCount = 0;
expectedHandlers.forEach(h => {
  const parts = h.split('.');
  let obj = sandbox;
  let exists = true;
  for (const p of parts) {
    if (obj && obj[p] !== undefined) {
      obj = obj[p];
    } else {
      exists = false;
      break;
    }
  }
  if (!exists || typeof obj !== 'function') {
    console.error(`[MISSING/NOT FUNCTION]: ${h} (type: ${typeof obj})`);
    missingCount++;
  } else {
    // console.log(`[OK]: ${h}`);
  }
});

console.log(`\nVerification complete. Missing functions: ${missingCount} / ${expectedHandlers.length}`);
