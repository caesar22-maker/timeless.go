const fs = require('fs');
const path = require('path');

const dataFile = path.join('C:', 'Users', 'USER', 'Documents', 'grosir-app', 'js', 'data.js');
const rawCode = fs.readFileSync(dataFile, 'utf8');

// Safely execute to extract DEFAULT_STORE_DATA
const fn = new Function(rawCode + '; return DEFAULT_STORE_DATA;');
const data = fn();

console.log('Original shopProducts:', (data.shopProducts || []).length);
console.log('Original wmsItems:', (data.wmsItems || []).length);

// 5 physical zones mapping
// Zona A: Sembako & Bahan Pokok
// Zona B: Makanan Olahan & Palen (Blastoz is Zona B, Rak B-01-01)
// Zona C: ATK & Buku
// Zona D: Kosmetik & Perawatan
// Zona E: Bayi & Anak
const zoneConfigs = {
  'Sembako': { code: 'B', name: 'Zona B', startAisle: 1 },
  'Palen': { code: 'B', name: 'Zona B', startAisle: 6 },
  'ATK': { code: 'C', name: 'Zona C', startAisle: 1 },
  'Kosmetik': { code: 'D', name: 'Zona D', startAisle: 1 },
  'Keperluan Bayi & Anak': { code: 'E', name: 'Zona E', startAisle: 1 }
};

const itemCounters = { 'A': 0, 'B': 0, 'C': 0, 'D': 0, 'E': 0 };

const updatedWmsItems = data.shopProducts.map((p, idx) => {
  const cfg = zoneConfigs[p.category] || { code: 'A', name: 'Zona A', startAisle: 1 };
  const zCode = cfg.code;
  itemCounters[zCode]++;
  const c = itemCounters[zCode];
  const aisle = Math.floor((c - 1) / 4) + cfg.startAisle;
  const shelf = ((c - 1) % 4) + 1;
  const aisleStr = String(aisle).padStart(2, '0');
  const shelfStr = String(shelf).padStart(2, '0');
  const rack = `Rak ${zCode}-${aisleStr}-${shelfStr}`;
  const bin = `Bin ${shelfStr}`;
  const coord = `Zona Rak ${zCode}-${aisleStr}-${shelfStr}`;

  if (idx === 0) {
    // Exact match to user provided reference photo media_1794916853007_1eedc192.png
    return {
      id: "WMS-001",
      sku: "1905260001",
      name: "BLASTOZ COKLAT ARTA @6",
      category: "Sembako",
      unit: "Pack",
      stock: 150,
      minStock: 20,
      maxStock: 250,
      capacity: 250,
      zone: "Zona B",
      zoneCode: "B",
      aisle: "Lorong B-01",
      rack: "Rak B-01-01",
      bin: "Bin 01",
      tier: "Level 1",
      level: 1,
      coordinates: "Zona Rak B-01-01",
      gridPosition: { zone: "B", aisle: "01", bay: "01", level: 1, slot: "01" },
      status: "Aman",
      batchNo: "BATCH-BLASTOZ-01",
      expDate: "2027-10-15",
      supplier: "PT Arta Boga Cemerlang",
      image: p.image || "images/products/SHOP-001.jpg",
      notes: p.description || "Rasa: Cokelat (Chocolate), Berat Bersih per Buah: 24 gram, Isi per Box: 12 pcs, Berat Total per Box: Sekitar 288-300g"
    };
  }

  const existing = (data.wmsItems && data.wmsItems[idx]) ? data.wmsItems[idx] : {};
  const stock = existing.stock && existing.stock > 0 ? existing.stock : (50 + ((idx * 7) % 150));
  const minStock = existing.minStock || 20;
  const status = stock <= (minStock / 2) ? "Kritis" : stock <= minStock ? "Menipis" : "Aman";

  return {
    id: `WMS-${String(idx + 1).padStart(3, '0')}`,
    sku: p.sku,
    name: p.name,
    category: p.category,
    unit: p.unit,
    stock: stock,
    minStock: minStock,
    maxStock: 250,
    capacity: 250,
    zone: cfg.name,
    zoneCode: zCode,
    aisle: `Lorong ${zCode}-${aisleStr}`,
    rack: rack,
    bin: bin,
    tier: `Level ${shelf}`,
    level: shelf,
    coordinates: coord,
    gridPosition: { zone: zCode, aisle: aisleStr, bay: aisleStr, level: shelf, slot: shelfStr },
    status: status,
    batchNo: existing.batchNo || `BATCH-${String(idx + 1).padStart(4, '0')}-2026`,
    expDate: existing.expDate || "2028-10-25",
    supplier: existing.supplier || p.supplier || (zCode === 'B' ? "PT Arta Boga Cemerlang" : zCode === 'C' ? "PT Standardpen / Sinar Dunia" : zCode === 'D' ? "PT Victoria Care Indonesia" : "PT Kimberly-Clark Indonesia"),
    image: p.image || `images/products/SHOP-${String(idx + 1).padStart(3, '0')}.jpg`,
    notes: p.description || existing.notes || ""
  };
});

console.log('Generated new wmsItems count:', updatedWmsItems.length);
console.log('Item 0:', updatedWmsItems[0]);
console.log('Item 1:', updatedWmsItems[1]);

// Synchronize shopProducts stock with wmsItems stock
data.shopProducts.forEach((p, i) => {
  if (updatedWmsItems[i]) {
    p.stock = updatedWmsItems[i].stock;
  }
});

data.wmsItems = updatedWmsItems;

// Save back to data.js cleanly
const newCode = `/**
 * Master Data Toko Grosir Barang
 * File UMKM: 250 Produk & File INVENTARIS: 50 Aset Alat
 * TIMELESS.GO X ABADI GROSIR
 */

const DEFAULT_STORE_DATA = ${JSON.stringify(data, null, 4)};

if (typeof window !== 'undefined') {
  window.DEFAULT_STORE_DATA = DEFAULT_STORE_DATA;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { DEFAULT_STORE_DATA };
}
`;

fs.writeFileSync(dataFile, newCode, 'utf8');
console.log('data.js updated successfully!');
