/**
 * Master Data Toko Grosir Barang
 * File UMKM: 250 Produk & File INVENTARIS: 50 Aset Alat
 */

const DEFAULT_STORE_DATA = {
    "wmsItems":  [
                     {
                         "id":  "WMS-001",
                         "category":  "Sembako",
                         "image":  "https://images.unsplash.com/photo-1621996346565-e3d5d6281691?w=400\u0026auto=format\u0026fit=crop\u0026q=80",
                         "unit":  "Pack",
                         "sku":  "1905260001",
                         "supplier":  "PT Arta Boga Cemerlang",
                         "name":  "BLASTOZ COKLAT ARTA @6",
                         "rack":  "Rak B-01-01",
                         "status":  "Aman",
                         "zone":  "Zona B (Makanan Olahan)",
                         "minStock":  20,
                         "batchNo":  "BATCH-BLASTOZ-01",
                         "notes":  "Rasa Cokelat, 24g, Isi 12 pcs/box, Total 288-300g",
                         "expDate":  "2027-10-15",
                         "stock":  120
                     },
                     {
                         "id":  "WMS-002",
                         "category":  "ATK",
                         "image":  "https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=400\u0026auto=format\u0026fit=crop\u0026q=80",
                         "unit":  "Slop",
                         "sku":  "3001240001",
                         "supplier":  "PT Abadi Tape Indo",
                         "name":  "SOLASI ABADI TAPE MURAH",
                         "rack":  "Rak D-01-02",
                         "status":  "Aman",
                         "zone":  "Zona D (ATK \u0026 Non-Food)",
                         "minStock":  25,
                         "batchNo":  "BATCH-SLS-01",
                         "notes":  "24mm (1 inci) x 72m Bening",
                         "expDate":  "2030-01-01",
                         "stock":  150
                     },
                     {
                         "id":  "WMS-003",
                         "category":  "Palen",
                         "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400\u0026auto=format\u0026fit=crop\u0026q=80",
                         "unit":  "Pcs",
                         "sku":  "B06676",
                         "supplier":  "PT Sinarmas Pulp \u0026 Paper",
                         "name":  "TISU NICE 900gr @20",
                         "rack":  "Rak D-02-01",
                         "status":  "Aman",
                         "zone":  "Zona D (Palen \u0026 Non-Food)",
                         "minStock":  15,
                         "batchNo":  "BATCH-NICE-01",
                         "notes":  "Tisu Wajah 900g",
                         "expDate":  "2030-01-01",
                         "stock":  45
                     },
                     {
                         "id":  "WMS-004",
                         "category":  "ATK",
                         "image":  "https://images.unsplash.com/photo-1585336261026-7f897b6a4163?w=400\u0026auto=format\u0026fit=crop\u0026q=80",
                         "unit":  "Pack",
                         "sku":  "B02136",
                         "supplier":  "PT Standardpen",
                         "name":  "BULPEN AE7 BIRU @240",
                         "rack":  "Rak D-04-02",
                         "status":  "Aman",
                         "zone":  "Zona D (ATK)",
                         "minStock":  10,
                         "batchNo":  "BATCH-AE7-01",
                         "notes":  "AE7 Biru isi 240 pcs",
                         "expDate":  "2032-12-31",
                         "stock":  50
                     }
                 ],
    "inventoryTools":  [
                           {
                               "assignedTo":  "Staff Operasional (22 Unit)",
                               "category":  "Security \u0026 Digital",
                               "condition":  "Baik",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 22 unit terverifikasi BAIK sesuai data aset inventaris."
                                                       }
                                                   ],
                               "status":  "Tersedia",
                               "image":  "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "code":  "AST-001",
                               "specs":  "Kamera pengawas IP/analog, resolusi HD/Full HD, infrared/night vision, dilengkapi DVR/NVR",
                               "id":  "TOOL-001",
                               "qty":  22,
                               "purchaseYear":  "2024",
                               "brand":  "Standar Operasional Toko Grosir",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "lastService":  "2026-08-15",
                               "nextService":  "2026-11-15",
                               "name":  "CCTV",
                               "quantity":  "22 Unit"
                           },
                           {
                               "assignedTo":  "Staff Operasional (1 Unit)",
                               "category":  "Heavy Equipment",
                               "condition":  "Baik",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 1 unit terverifikasi BAIK sesuai data aset inventaris."
                                                       }
                                                   ],
                               "status":  "Tersedia",
                               "image":  "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "code":  "AST-002",
                               "specs":  "Kapasitas angkat Â±2â€“3 ton, tenaga diesel/elektrik, mast hidrolik, garpu adjustable",
                               "id":  "TOOL-002",
                               "qty":  1,
                               "purchaseYear":  "2024",
                               "brand":  "Standar Operasional Toko Grosir",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "lastService":  "2026-08-15",
                               "nextService":  "2026-11-15",
                               "name":  "FORKLIFT",
                               "quantity":  "1 Unit"
                           },
                           {
                               "assignedTo":  "Staff Operasional (10 Unit)",
                               "category":  "Warehouse Tool",
                               "condition":  "Baik",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 10 unit terverifikasi BAIK sesuai data aset inventaris."
                                                       }
                                                   ],
                               "status":  "Tersedia",
                               "image":  "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "code":  "AST-003",
                               "specs":  "Berbahan besi/aluminium, tinggi Â±2â€“4 meter, anak tangga anti-slip, dilengkapi pengaman",
                               "id":  "TOOL-003",
                               "qty":  10,
                               "purchaseYear":  "2024",
                               "brand":  "Standar Operasional Toko Grosir",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "lastService":  "2026-08-15",
                               "nextService":  "2026-11-15",
                               "name":  "TANGGA GUDANG",
                               "quantity":  "10 Unit"
                           },
                           {
                               "assignedTo":  "Staff Operasional (70 Unit)",
                               "category":  "Storage \u0026 Racking",
                               "condition":  "Baik",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 70 unit terverifikasi BAIK sesuai data aset inventaris."
                                                       }
                                                   ],
                               "status":  "Tersedia",
                               "image":  "https://images.unsplash.com/photo-1586528116493-a029325540fa?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "code":  "AST-004",
                               "specs":  "Rak penyimpanan berbahan baja, kapasitas Â±200â€“500 kg/level, tinggi dan susunan rak dapat disesuaikan",
                               "id":  "TOOL-004",
                               "qty":  70,
                               "purchaseYear":  "2024",
                               "brand":  "Standar Operasional Toko Grosir",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "lastService":  "2026-08-15",
                               "nextService":  "2026-11-15",
                               "name":  "RAK",
                               "quantity":  "70 Unit"
                           },
                           {
                               "assignedTo":  "Staff Operasional (100 Unit)",
                               "category":  "Handling Tool",
                               "condition":  "Baik",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 100 unit terverifikasi BAIK sesuai data aset inventaris."
                                                       }
                                                   ],
                               "status":  "Tersedia",
                               "image":  "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "code":  "AST-005",
                               "specs":  "Berbahan plastik/kayu, ukuran Â±110 Ã— 110 cm, kapasitas beban sesuai kebutuhan gudang",
                               "id":  "TOOL-005",
                               "qty":  100,
                               "purchaseYear":  "2024",
                               "brand":  "Standar Operasional Toko Grosir",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "lastService":  "2026-08-15",
                               "nextService":  "2026-11-15",
                               "name":  "PALLET",
                               "quantity":  "100 Unit"
                           },
                           {
                               "assignedTo":  "Staff Operasional (28 Unit)",
                               "category":  "Office \u0026 Admin",
                               "condition":  "Baik",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 28 unit terverifikasi BAIK sesuai data aset inventaris."
                                                       }
                                                   ],
                               "status":  "Tersedia",
                               "image":  "https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "code":  "AST-006",
                               "specs":  "Whiteboard, permukaan melamin/porcelain, ukuran Â±120 Ã— 240 cm, dilengkapi frame",
                               "id":  "TOOL-006",
                               "qty":  28,
                               "purchaseYear":  "2024",
                               "brand":  "Standar Operasional Toko Grosir",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "lastService":  "2026-08-15",
                               "nextService":  "2026-11-15",
                               "name":  "PAPAN TULIS",
                               "quantity":  "28 Unit"
                           },
                           {
                               "assignedTo":  "Staff Operasional (13 Unit)",
                               "category":  "Display \u0026 Shop",
                               "condition":  "Baik",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 13 unit terverifikasi BAIK sesuai data aset inventaris."
                                                       }
                                                   ],
                               "status":  "Tersedia",
                               "image":  "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "code":  "AST-007",
                               "specs":  "Etalase kaca dengan rangka aluminium/besi, beberapa tingkat/rak, digunakan untuk display barang",
                               "id":  "TOOL-007",
                               "qty":  13,
                               "purchaseYear":  "2024",
                               "brand":  "Standar Operasional Toko Grosir",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "lastService":  "2026-08-15",
                               "nextService":  "2026-11-15",
                               "name":  "ETALASE",
                               "quantity":  "13 Unit"
                           },
                           {
                               "assignedTo":  "Staff Operasional (8 Unit)",
                               "category":  "IT \u0026 Digital",
                               "condition":  "Baik",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 8 unit terverifikasi BAIK sesuai data aset inventaris."
                                                       }
                                                   ],
                               "status":  "Tersedia",
                               "image":  "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "code":  "AST-008",
                               "specs":  "Processor minimal Core i3/Ryzen 3, RAM â‰¥8 GB, SSD â‰¥256 GB, dilengkapi sistem operasi",
                               "id":  "TOOL-008",
                               "qty":  8,
                               "purchaseYear":  "2024",
                               "brand":  "Standar Operasional Toko Grosir",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "lastService":  "2026-08-15",
                               "nextService":  "2026-11-15",
                               "name":  "PC",
                               "quantity":  "8 Unit"
                           },
                           {
                               "assignedTo":  "Staff Operasional (4 Unit)",
                               "category":  "IT \u0026 Digital",
                               "condition":  "Baik",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 4 unit terverifikasi BAIK sesuai data aset inventaris."
                                                       }
                                                   ],
                               "status":  "Tersedia",
                               "image":  "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "code":  "AST-009",
                               "specs":  "Barcode scanner USB, teknologi laser/CCD/imager, mendukung barcode 1D/2D",
                               "id":  "TOOL-009",
                               "qty":  4,
                               "purchaseYear":  "2024",
                               "brand":  "Standar Operasional Toko Grosir",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "lastService":  "2026-08-15",
                               "nextService":  "2026-11-15",
                               "name":  "SCANNER BARCODE",
                               "quantity":  "4 Unit"
                           },
                           {
                               "assignedTo":  "Staff Operasional (3 Unit)",
                               "category":  "Material Handling",
                               "condition":  "Baik",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 3 unit terverifikasi BAIK sesuai data aset inventaris."
                                                       }
                                                   ],
                               "status":  "Tersedia",
                               "image":  "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "code":  "AST-010",
                               "specs":  "Troli model L, rangka besi, roda caster, kapasitas Â±200â€“300 kg",
                               "id":  "TOOL-010",
                               "qty":  3,
                               "purchaseYear":  "2024",
                               "brand":  "Standar Operasional Toko Grosir",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "lastService":  "2026-08-15",
                               "nextService":  "2026-11-15",
                               "name":  "TROLLI L",
                               "quantity":  "3 Unit"
                           },
                           {
                               "assignedTo":  "Staff Operasional (20 Unit)",
                               "category":  "Material Handling",
                               "condition":  "Baik",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 20 unit terverifikasi BAIK sesuai data aset inventaris."
                                                       }
                                                   ],
                               "status":  "Tersedia",
                               "image":  "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "code":  "AST-011",
                               "specs":  "Troli dorong manual, rangka besi, 4 roda caster, kapasitas Â±300â€“500 kg",
                               "id":  "TOOL-011",
                               "qty":  20,
                               "purchaseYear":  "2024",
                               "brand":  "Standar Operasional Toko Grosir",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "lastService":  "2026-08-15",
                               "nextService":  "2026-11-15",
                               "name":  "TROLLI DORONG",
                               "quantity":  "20 Unit"
                           },
                           {
                               "assignedTo":  "Staff Operasional (50 Unit)",
                               "category":  "Material Handling",
                               "condition":  "Baik",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 50 unit terverifikasi BAIK sesuai data aset inventaris."
                                                       }
                                                   ],
                               "status":  "Tersedia",
                               "image":  "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "code":  "AST-012",
                               "specs":  "Troli tarik manual, rangka baja, dilengkapi pegangan/towing handle, kapasitas Â±500â€“1.000 kg",
                               "id":  "TOOL-012",
                               "qty":  50,
                               "purchaseYear":  "2024",
                               "brand":  "Standar Operasional Toko Grosir",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "lastService":  "2026-08-15",
                               "nextService":  "2026-11-15",
                               "name":  "TROLLI TARIK",
                               "quantity":  "50 Unit"
                           },
                           {
                               "assignedTo":  "Staff Operasional (4 Unit)",
                               "category":  "Fleet \u0026 Delivery",
                               "condition":  "Baik",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 4 unit terverifikasi BAIK sesuai data aset inventaris."
                                                       }
                                                   ],
                               "status":  "Tersedia",
                               "image":  "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "code":  "AST-013",
                               "specs":  "Kendaraan box ringan, bak tertutup, kapasitas muatan Â±700â€“1.000 kg",
                               "id":  "TOOL-013",
                               "qty":  4,
                               "purchaseYear":  "2024",
                               "brand":  "Standar Operasional Toko Grosir",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "lastService":  "2026-08-15",
                               "nextService":  "2026-11-15",
                               "name":  "MOBIL BOX KECIL",
                               "quantity":  "4 Unit"
                           },
                           {
                               "assignedTo":  "Staff Operasional (2 Unit)",
                               "category":  "Fleet \u0026 Delivery",
                               "condition":  "Baik",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 2 unit terverifikasi BAIK sesuai data aset inventaris."
                                                       }
                                                   ],
                               "status":  "Tersedia",
                               "image":  "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "code":  "AST-014",
                               "specs":  "Truk bak panjang/long chassis, kapasitas muatan Â±4â€“6 ton",
                               "id":  "TOOL-014",
                               "qty":  2,
                               "purchaseYear":  "2024",
                               "brand":  "Standar Operasional Toko Grosir",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "lastService":  "2026-08-15",
                               "nextService":  "2026-11-15",
                               "name":  "TRUK LONG",
                               "quantity":  "2 Unit"
                           },
                           {
                               "assignedTo":  "Staff Operasional (3 Unit)",
                               "category":  "Facility \u0026 Utility",
                               "condition":  "Baik",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 3 unit terverifikasi BAIK sesuai data aset inventaris."
                                                       }
                                                   ],
                               "status":  "Tersedia",
                               "image":  "https://images.unsplash.com/photo-1594818379496-da1e345b0ded?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "code":  "AST-015",
                               "specs":  "Kipas angin industrial, diameter Â±18â€“24 inch, motor listrik, beberapa pilihan kecepatan",
                               "id":  "TOOL-015",
                               "qty":  3,
                               "purchaseYear":  "2024",
                               "brand":  "Standar Operasional Toko Grosir",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "lastService":  "2026-08-15",
                               "nextService":  "2026-11-15",
                               "name":  "KIPAS ANGIN",
                               "quantity":  "3 Unit"
                           },
                           {
                               "assignedTo":  "Staff Operasional (8 Unit)",
                               "category":  "Cleaning Tools",
                               "condition":  "Baik",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 8 unit terverifikasi BAIK sesuai data aset inventaris."
                                                       }
                                                   ],
                               "status":  "Tersedia",
                               "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "code":  "AST-016",
                               "specs":  "Gagang besi/plastik, kepala sapu berbahan nilon, panjang Â±120 cm, untuk area gudang dan kantor",
                               "id":  "TOOL-016",
                               "qty":  8,
                               "purchaseYear":  "2024",
                               "brand":  "Standar Operasional Toko Grosir",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "lastService":  "2026-08-15",
                               "nextService":  "2026-11-15",
                               "name":  "SAPU",
                               "quantity":  "8 Unit"
                           },
                           {
                               "assignedTo":  "Staff Operasional (3 Unit)",
                               "category":  "Cleaning Tools",
                               "condition":  "Baik",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 3 unit terverifikasi BAIK sesuai data aset inventaris."
                                                       }
                                                   ],
                               "status":  "Tersedia",
                               "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "code":  "AST-017",
                               "specs":  "Gagang besi/plastik, kepala pel microfiber/katun, panjang Â±120 cm, cocok untuk berbagai jenis lantai",
                               "id":  "TOOL-017",
                               "qty":  3,
                               "purchaseYear":  "2024",
                               "brand":  "Standar Operasional Toko Grosir",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "lastService":  "2026-08-15",
                               "nextService":  "2026-11-15",
                               "name":  "PEL",
                               "quantity":  "3 Unit"
                           },
                           {
                               "assignedTo":  "Staff Operasional (4 Unit)",
                               "category":  "Cleaning Tools",
                               "condition":  "Baik",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 4 unit terverifikasi BAIK sesuai data aset inventaris."
                                                       }
                                                   ],
                               "status":  "Tersedia",
                               "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "code":  "AST-018",
                               "specs":  "Berbahan plastik kuat, kapasitas Â±10â€“20 liter, dilengkapi pegangan, untuk mengangkat sampah dan kotoran",
                               "id":  "TOOL-018",
                               "qty":  4,
                               "purchaseYear":  "2024",
                               "brand":  "Standar Operasional Toko Grosir",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "lastService":  "2026-08-15",
                               "nextService":  "2026-11-15",
                               "name":  "PENGKI",
                               "quantity":  "4 Unit"
                           },
                           {
                               "assignedTo":  "Staff Operasional (1 Unit)",
                               "category":  "Digital \u0026 Shop",
                               "condition":  "Baik",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 1 unit terverifikasi BAIK sesuai data aset inventaris."
                                                       }
                                                   ],
                               "status":  "Tersedia",
                               "image":  "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "code":  "AST-019",
                               "specs":  "LED Display, ukuran Â±32â€“55 inch, resolusi minimal Full HD (1920 Ã— 1080), teknologi LED, tingkat kecerahan Â±300â€“500 cd/mÂ², rasio aspek 16:9, input HDMI/USB",
                               "id":  "TOOL-019",
                               "qty":  1,
                               "purchaseYear":  "2024",
                               "brand":  "Standar Operasional Toko Grosir",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "lastService":  "2026-08-15",
                               "nextService":  "2026-11-15",
                               "name":  "LED DISPLAY",
                               "quantity":  "1 Unit"
                           },
                           {
                               "assignedTo":  "Staff Operasional (2 Unit)",
                               "category":  "Facility \u0026 Utility",
                               "condition":  "Baik",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 2 unit terverifikasi BAIK sesuai data aset inventaris."
                                                       }
                                                   ],
                               "status":  "Tersedia",
                               "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "code":  "AST-020",
                               "specs":  "Berbahan plastik, kapasitas Â±20â€“50 liter, dilengkapi tutup/pegangan, mudah dibersihkan",
                               "id":  "TOOL-020",
                               "qty":  2,
                               "purchaseYear":  "2024",
                               "brand":  "Standar Operasional Toko Grosir",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "lastService":  "2026-08-15",
                               "nextService":  "2026-11-15",
                               "name":  "TEMPAT SAMPAH",
                               "quantity":  "2 Unit"
                           },
                           {
                               "assignedTo":  "Staff Operasional (5 Unit)",
                               "category":  "Facility \u0026 Storage",
                               "condition":  "Baik",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 5 unit terverifikasi BAIK sesuai data aset inventaris."
                                                       }
                                                   ],
                               "status":  "Tersedia",
                               "image":  "https://images.unsplash.com/photo-1590496793929-36417d3117de?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "code":  "AST-021",
                               "specs":  "Loker besi, Â±6â€“12 pintu, dilengkapi kunci, ventilasi dan label nama",
                               "id":  "TOOL-021",
                               "qty":  5,
                               "purchaseYear":  "2024",
                               "brand":  "Standar Operasional Toko Grosir",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "lastService":  "2026-08-15",
                               "nextService":  "2026-11-15",
                               "name":  "LOKER",
                               "quantity":  "5 Unit"
                           },
                           {
                               "assignedTo":  "Staff Operasional (3 Unit)",
                               "category":  "Safety Equipment",
                               "condition":  "Baik",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 3 unit terverifikasi BAIK sesuai data aset inventaris."
                                                       }
                                                   ],
                               "status":  "Tersedia",
                               "image":  "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "code":  "AST-022",
                               "specs":  "Alat pemadam api ringan, media powder/CO2/foam, kapasitas Â±3â€“6 kg, dilengkapi bracket",
                               "id":  "TOOL-022",
                               "qty":  3,
                               "purchaseYear":  "2024",
                               "brand":  "Standar Operasional Toko Grosir",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "lastService":  "2026-08-15",
                               "nextService":  "2026-11-15",
                               "name":  "APAR",
                               "quantity":  "3 Unit"
                           },
                           {
                               "assignedTo":  "Staff Operasional (8 Unit)",
                               "category":  "Office Furniture",
                               "condition":  "Baik",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 8 unit terverifikasi BAIK sesuai data aset inventaris."
                                                       }
                                                   ],
                               "status":  "Tersedia",
                               "image":  "https://images.unsplash.com/photo-1580481077197-28d098e945c1?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "code":  "AST-023",
                               "specs":  "Kursi kerja/tunggu, rangka besi/plastik, dudukan ergonomis, kuat dan nyaman digunakan",
                               "id":  "TOOL-023",
                               "qty":  8,
                               "purchaseYear":  "2024",
                               "brand":  "Standar Operasional Toko Grosir",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "lastService":  "2026-08-15",
                               "nextService":  "2026-11-15",
                               "name":  "KURSI",
                               "quantity":  "8 Unit"
                           },
                           {
                               "assignedTo":  "Staff Operasional (8 Unit)",
                               "category":  "Office Furniture",
                               "condition":  "Baik",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 8 unit terverifikasi BAIK sesuai data aset inventaris."
                                                       }
                                                   ],
                               "status":  "Tersedia",
                               "image":  "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "code":  "AST-024",
                               "specs":  "Meja kerja berbahan kayu/metal, ukuran Â±120 Ã— 60 Ã— 75 cm, permukaan kerja kuat dan mudah dibersihkan",
                               "id":  "TOOL-024",
                               "qty":  8,
                               "purchaseYear":  "2024",
                               "brand":  "Standar Operasional Toko Grosir",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "lastService":  "2026-08-15",
                               "nextService":  "2026-11-15",
                               "name":  "MEJA",
                               "quantity":  "8 Unit"
                           },
                           {
                               "assignedTo":  "Staff Operasional (3 Unit)",
                               "category":  "Material Handling",
                               "condition":  "Baik",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 3 unit terverifikasi BAIK sesuai data aset inventaris."
                                                       }
                                                   ],
                               "status":  "Tersedia",
                               "image":  "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "code":  "AST-025",
                               "specs":  "Kapasitas Â±2â€“3 ton, panjang fork Â±1.150 mm, sistem hidrolik manual",
                               "id":  "TOOL-025",
                               "qty":  3,
                               "purchaseYear":  "2024",
                               "brand":  "Standar Operasional Toko Grosir",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "lastService":  "2026-08-15",
                               "nextService":  "2026-11-15",
                               "name":  "HAND PALLET",
                               "quantity":  "3 Unit"
                           },
                           {
                               "assignedTo":  "Staff Operasional (2 Unit)",
                               "category":  "Facility \u0026 Storage",
                               "condition":  "Baik",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 2 unit terverifikasi BAIK sesuai data aset inventaris."
                                                       }
                                                   ],
                               "status":  "Tersedia",
                               "image":  "https://images.unsplash.com/photo-1586528116493-a029325540fa?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "code":  "AST-026",
                               "specs":  "Gantungan berbahan besi/stainless, dilengkapi hook, digunakan untuk menggantung alat atau barang",
                               "id":  "TOOL-026",
                               "qty":  2,
                               "purchaseYear":  "2024",
                               "brand":  "Standar Operasional Toko Grosir",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "lastService":  "2026-08-15",
                               "nextService":  "2026-11-15",
                               "name":  "GANTUNGAN",
                               "quantity":  "2 Unit"
                           },
                           {
                               "assignedTo":  "Staff Operasional (25 Unit)",
                               "category":  "Electrical \u0026 Utility",
                               "condition":  "Baik",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 25 unit terverifikasi BAIK sesuai data aset inventaris."
                                                       }
                                                   ],
                               "status":  "Tersedia",
                               "image":  "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "code":  "AST-027",
                               "specs":  "Saklar listrik AC 220â€“250 V, 1/2 gang, material tahan panas, sesuai standar SNI",
                               "id":  "TOOL-027",
                               "qty":  25,
                               "purchaseYear":  "2024",
                               "brand":  "Standar Operasional Toko Grosir",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "lastService":  "2026-08-15",
                               "nextService":  "2026-11-15",
                               "name":  "SAKLAR",
                               "quantity":  "25 Unit"
                           },
                           {
                               "assignedTo":  "Staff Operasional (20 Unit)",
                               "category":  "Electrical \u0026 Utility",
                               "condition":  "Baik",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 20 unit terverifikasi BAIK sesuai data aset inventaris."
                                                       }
                                                   ],
                               "status":  "Tersedia",
                               "image":  "https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "code":  "AST-028",
                               "specs":  "Lampu LED, daya Â±18â€“50 watt, tegangan 220 V, untuk penerangan area gudang",
                               "id":  "TOOL-028",
                               "qty":  20,
                               "purchaseYear":  "2024",
                               "brand":  "Standar Operasional Toko Grosir",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "lastService":  "2026-08-15",
                               "nextService":  "2026-11-15",
                               "name":  "LAMPU",
                               "quantity":  "20 Unit"
                           },
                           {
                               "assignedTo":  "Staff Operasional (10 Unit)",
                               "category":  "Electrical \u0026 Utility",
                               "condition":  "Baik",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 10 unit terverifikasi BAIK sesuai data aset inventaris."
                                                       }
                                                   ],
                               "status":  "Tersedia",
                               "image":  "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "code":  "AST-029",
                               "specs":  "Kabel roll panjang Â±15â€“50 meter, dilengkapi reel, stop kontak dan thermal protection",
                               "id":  "TOOL-029",
                               "qty":  10,
                               "purchaseYear":  "2024",
                               "brand":  "Standar Operasional Toko Grosir",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "lastService":  "2026-08-15",
                               "nextService":  "2026-11-15",
                               "name":  "KABEL ROLL",
                               "quantity":  "10 Unit"
                           },
                           {
                               "assignedTo":  "Staff Operasional (1 Unit)",
                               "category":  "Heavy Utility",
                               "condition":  "Baik",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 1 unit terverifikasi BAIK sesuai data aset inventaris."
                                                       }
                                                   ],
                               "status":  "Tersedia",
                               "image":  "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "code":  "AST-030",
                               "specs":  "Generator diesel/bensin, kapasitas Â±5â€“10 kVA, output 220 V, dilengkapi panel kontrol",
                               "id":  "TOOL-030",
                               "qty":  1,
                               "purchaseYear":  "2024",
                               "brand":  "Standar Operasional Toko Grosir",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "lastService":  "2026-08-15",
                               "nextService":  "2026-11-15",
                               "name":  "GENSET",
                               "quantity":  "1 Unit"
                           },
                           {
                               "assignedTo":  "Staff Operasional (1 Unit)",
                               "category":  "Safety \u0026 Medical",
                               "condition":  "Baik",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 1 unit terverifikasi BAIK sesuai data aset inventaris."
                                                       }
                                                   ],
                               "status":  "Tersedia",
                               "image":  "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "code":  "AST-031",
                               "specs":  "Kotak P3K berisi kasa steril, plester, perban, antiseptik, sarung tangan dan perlengkapan pertolongan pertama",
                               "id":  "TOOL-031",
                               "qty":  1,
                               "purchaseYear":  "2024",
                               "brand":  "Standar Operasional Toko Grosir",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "lastService":  "2026-08-15",
                               "nextService":  "2026-11-15",
                               "name":  "P3K",
                               "quantity":  "1 Unit"
                           },
                           {
                               "assignedTo":  "Staff Operasional (8 Unit)",
                               "category":  "IT \u0026 Digital",
                               "condition":  "Baik",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 8 unit terverifikasi BAIK sesuai data aset inventaris."
                                                       }
                                                   ],
                               "status":  "Tersedia",
                               "image":  "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "code":  "AST-032",
                               "specs":  "Monitor LED/LCD, ukuran Â±22â€“24 inch, resolusi Full HD, koneksi HDMI/VGA",
                               "id":  "TOOL-032",
                               "qty":  8,
                               "purchaseYear":  "2024",
                               "brand":  "Standar Operasional Toko Grosir",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "lastService":  "2026-08-15",
                               "nextService":  "2026-11-15",
                               "name":  "MONITOR",
                               "quantity":  "8 Unit"
                           },
                           {
                               "assignedTo":  "Staff Operasional (8 Unit)",
                               "category":  "IT \u0026 Digital",
                               "condition":  "Baik",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 8 unit terverifikasi BAIK sesuai data aset inventaris."
                                                       }
                                                   ],
                               "status":  "Tersedia",
                               "image":  "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "code":  "AST-033",
                               "specs":  "Keyboard USB, layout QWERTY, koneksi kabel, kompatibel dengan PC",
                               "id":  "TOOL-033",
                               "qty":  8,
                               "purchaseYear":  "2024",
                               "brand":  "Standar Operasional Toko Grosir",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "lastService":  "2026-08-15",
                               "nextService":  "2026-11-15",
                               "name":  "KEYBOARD",
                               "quantity":  "8 Unit"
                           },
                           {
                               "assignedTo":  "Staff Operasional (8 Unit)",
                               "category":  "IT \u0026 Digital",
                               "condition":  "Baik",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 8 unit terverifikasi BAIK sesuai data aset inventaris."
                                                       }
                                                   ],
                               "status":  "Tersedia",
                               "image":  "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "code":  "AST-034",
                               "specs":  "Mouse USB optik, minimal 3 tombol, resolusi sensor Â±800â€“1600 DPI",
                               "id":  "TOOL-034",
                               "qty":  8,
                               "purchaseYear":  "2024",
                               "brand":  "Standar Operasional Toko Grosir",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "lastService":  "2026-08-15",
                               "nextService":  "2026-11-15",
                               "name":  "MOUSE",
                               "quantity":  "8 Unit"
                           },
                           {
                               "assignedTo":  "Staff Operasional (1 Unit)",
                               "category":  "Fleet \u0026 Delivery",
                               "condition":  "Baik",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 1 unit terverifikasi BAIK sesuai data aset inventaris."
                                                       }
                                                   ],
                               "status":  "Tersedia",
                               "image":  "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "code":  "AST-035",
                               "specs":  "Kendaraan/alat operasional roda 3 untuk pengangkutan barang, kapasitas disesuaikan",
                               "id":  "TOOL-035",
                               "qty":  1,
                               "purchaseYear":  "2024",
                               "brand":  "Standar Operasional Toko Grosir",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "lastService":  "2026-08-15",
                               "nextService":  "2026-11-15",
                               "name":  "TOSA",
                               "quantity":  "1 Unit"
                           },
                           {
                               "assignedTo":  "Staff Operasional (3 Unit)",
                               "category":  "Fleet \u0026 Delivery",
                               "condition":  "Baik",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 3 unit terverifikasi BAIK sesuai data aset inventaris."
                                                       }
                                                   ],
                               "status":  "Tersedia",
                               "image":  "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "code":  "AST-036",
                               "specs":  "Kendaraan operasional/angkutan barang, mesin bensin Â±1,3â€“1,5 L, tipe bak/box sesuai kebutuhan",
                               "id":  "TOOL-036",
                               "qty":  3,
                               "purchaseYear":  "2024",
                               "brand":  "Standar Operasional Toko Grosir",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "lastService":  "2026-08-15",
                               "nextService":  "2026-11-15",
                               "name":  "GRANDMAX",
                               "quantity":  "3 Unit"
                           },
                           {
                               "assignedTo":  "Staff Operasional (7 Unit)",
                               "category":  "Electrical \u0026 Utility",
                               "condition":  "Baik",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 7 unit terverifikasi BAIK sesuai data aset inventaris."
                                                       }
                                                   ],
                               "status":  "Tersedia",
                               "image":  "https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "code":  "AST-037",
                               "specs":  "Lampu LED tube/neon panjang, daya Â±18â€“40 watt, tegangan 220 V, panjang Â±60â€“120 cm, cahaya putih",
                               "id":  "TOOL-037",
                               "qty":  7,
                               "purchaseYear":  "2024",
                               "brand":  "Standar Operasional Toko Grosir",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "lastService":  "2026-08-15",
                               "nextService":  "2026-11-15",
                               "name":  "LAMPU LED NEON PANJANG",
                               "quantity":  "7 Unit"
                           },
                           {
                               "assignedTo":  "Staff Operasional (5 Unit)",
                               "category":  "Storage \u0026 Racking",
                               "condition":  "Baik",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 5 unit terverifikasi BAIK sesuai data aset inventaris."
                                                       }
                                                   ],
                               "status":  "Tersedia",
                               "image":  "https://images.unsplash.com/photo-1586528116493-a029325540fa?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "code":  "AST-038",
                               "specs":  "Rak gantung berbahan besi/baja, dilengkapi bracket pengait, kapasitas Â±20â€“50 kg per tingkat",
                               "id":  "TOOL-038",
                               "qty":  5,
                               "purchaseYear":  "2024",
                               "brand":  "Standar Operasional Toko Grosir",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "lastService":  "2026-08-15",
                               "nextService":  "2026-11-15",
                               "name":  "RAK GANTUNG",
                               "quantity":  "5 Unit"
                           },
                           {
                               "assignedTo":  "Staff Operasional (15 Unit)",
                               "category":  "Packing \u0026 Tools",
                               "condition":  "Baik",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 15 unit terverifikasi BAIK sesuai data aset inventaris."
                                                       }
                                                   ],
                               "status":  "Tersedia",
                               "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "code":  "AST-039",
                               "specs":  "Gunting berbahan stainless steel, ukuran Â±7â€“10 inch, pegangan ergonomis, tajam dan tahan karat",
                               "id":  "TOOL-039",
                               "qty":  15,
                               "purchaseYear":  "2024",
                               "brand":  "Standar Operasional Toko Grosir",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "lastService":  "2026-08-15",
                               "nextService":  "2026-11-15",
                               "name":  "GUNTING",
                               "quantity":  "15 Unit"
                           },
                           {
                               "assignedTo":  "Staff Operasional (10 Unit)",
                               "category":  "Packaging Tools",
                               "condition":  "Baik",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 10 unit terverifikasi BAIK sesuai data aset inventaris."
                                                       }
                                                   ],
                               "status":  "Tersedia",
                               "image":  "https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "code":  "AST-040",
                               "specs":  "Lakban perekat berbahan polypropylene, lebar Â±48â€“60 mm, panjang Â±50â€“100 meter, daya rekat kuat",
                               "id":  "TOOL-040",
                               "qty":  10,
                               "purchaseYear":  "2024",
                               "brand":  "Standar Operasional Toko Grosir",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "lastService":  "2026-08-15",
                               "nextService":  "2026-11-15",
                               "name":  "LAKBAN",
                               "quantity":  "10 Unit"
                           },
                           {
                               "assignedTo":  "Staff Operasional (2 Unit)",
                               "category":  "Maintenance Tools",
                               "condition":  "Baik",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 2 unit terverifikasi BAIK sesuai data aset inventaris."
                                                       }
                                                   ],
                               "status":  "Tersedia",
                               "image":  "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "code":  "AST-041",
                               "specs":  "Set peralatan kerja dalam toolbox, terdiri dari obeng, tang, kunci pas/ring, kunci socket dan perlengkapan dasar",
                               "id":  "TOOL-041",
                               "qty":  2,
                               "purchaseYear":  "2024",
                               "brand":  "Standar Operasional Toko Grosir",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "lastService":  "2026-08-15",
                               "nextService":  "2026-11-15",
                               "name":  "TOOLBOX SET",
                               "quantity":  "2 Unit"
                           },
                           {
                               "assignedTo":  "Staff Operasional (4 Unit)",
                               "category":  "Storage \u0026 Display",
                               "condition":  "Baik",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 4 unit terverifikasi BAIK sesuai data aset inventaris."
                                                       }
                                                   ],
                               "status":  "Tersedia",
                               "image":  "https://images.unsplash.com/photo-1590496793929-36417d3117de?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "code":  "AST-042",
                               "specs":  "Panel gantung berbahan besi/plastik berlubang, dilengkapi hook, digunakan untuk penyimpanan alat kerja",
                               "id":  "TOOL-042",
                               "qty":  4,
                               "purchaseYear":  "2024",
                               "brand":  "Standar Operasional Toko Grosir",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "lastService":  "2026-08-15",
                               "nextService":  "2026-11-15",
                               "name":  "PANEL GANTUNG",
                               "quantity":  "4 Unit"
                           },
                           {
                               "assignedTo":  "Staff Operasional (2 Unit)",
                               "category":  "Office Furniture",
                               "condition":  "Baik",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 2 unit terverifikasi BAIK sesuai data aset inventaris."
                                                       }
                                                   ],
                               "status":  "Tersedia",
                               "image":  "https://images.unsplash.com/photo-1580481077197-28d098e945c1?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "code":  "AST-043",
                               "specs":  "Kursi tunggu dengan rangka besi, dudukan dan sandaran empuk/plastik, kapasitas Â±2â€“3 orang",
                               "id":  "TOOL-043",
                               "qty":  2,
                               "purchaseYear":  "2024",
                               "brand":  "Standar Operasional Toko Grosir",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "lastService":  "2026-08-15",
                               "nextService":  "2026-11-15",
                               "name":  "KURSI TUNGGU",
                               "quantity":  "2 Unit"
                           },
                           {
                               "assignedTo":  "Staff Operasional (4 Unit)",
                               "category":  "POS \u0026 IT",
                               "condition":  "Baik",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 4 unit terverifikasi BAIK sesuai data aset inventaris."
                                                       }
                                                   ],
                               "status":  "Tersedia",
                               "image":  "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "code":  "AST-044",
                               "specs":  "Printer struk thermal, metode cetak direct thermal, lebar kertas Â±58â€“80 mm, koneksi USB/LAN/Bluetooth",
                               "id":  "TOOL-044",
                               "qty":  4,
                               "purchaseYear":  "2024",
                               "brand":  "Standar Operasional Toko Grosir",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "lastService":  "2026-08-15",
                               "nextService":  "2026-11-15",
                               "name":  "PRINTER STRUK",
                               "quantity":  "4 Unit"
                           },
                           {
                               "assignedTo":  "Staff Operasional (5 Unit)",
                               "category":  "Packing \u0026 Tools",
                               "condition":  "Baik",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 5 unit terverifikasi BAIK sesuai data aset inventaris."
                                                       }
                                                   ],
                               "status":  "Tersedia",
                               "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "code":  "AST-045",
                               "specs":  "Cutter dengan gagang ergonomis, mata pisau stainless/carbon steel, sistem pengunci dan mata pisau dapat diganti",
                               "id":  "TOOL-045",
                               "qty":  5,
                               "purchaseYear":  "2024",
                               "brand":  "Standar Operasional Toko Grosir",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "lastService":  "2026-08-15",
                               "nextService":  "2026-11-15",
                               "name":  "CUTTER",
                               "quantity":  "5 Unit"
                           },
                           {
                               "assignedTo":  "Staff Operasional (1 Unit)",
                               "category":  "Appliance \u0026 Shop",
                               "condition":  "Baik",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 1 unit terverifikasi BAIK sesuai data aset inventaris."
                                                       }
                                                   ],
                               "status":  "Tersedia",
                               "image":  "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "code":  "AST-046",
                               "specs":  "Kulkas display dengan pintu kaca transparan, kapasitas Â±300â€“500 liter, sistem pendingin elektrik, suhu Â±2â€“8Â°C, rak adjustable, tegangan 220 V",
                               "id":  "TOOL-046",
                               "qty":  1,
                               "purchaseYear":  "2024",
                               "brand":  "Standar Operasional Toko Grosir",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "lastService":  "2026-08-15",
                               "nextService":  "2026-11-15",
                               "name":  "KULKAS DISPLAY",
                               "quantity":  "1 Unit"
                           },
                           {
                               "assignedTo":  "Staff Operasional (2 Unit)",
                               "category":  "IT \u0026 Digital",
                               "condition":  "Baik",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 2 unit terverifikasi BAIK sesuai data aset inventaris."
                                                       }
                                                   ],
                               "status":  "Tersedia",
                               "image":  "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "code":  "AST-047",
                               "specs":  "Printer inkjet/laser, kecepatan cetak Â±15â€“30 ppm, resolusi hingga 1.200 Ã— 1.200 dpi, koneksi USB/Wi-Fi, mendukung kertas A4",
                               "id":  "TOOL-047",
                               "qty":  2,
                               "purchaseYear":  "2024",
                               "brand":  "Standar Operasional Toko Grosir",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "lastService":  "2026-08-15",
                               "nextService":  "2026-11-15",
                               "name":  "PRINTER",
                               "quantity":  "2 Unit"
                           },
                           {
                               "assignedTo":  "Staff Operasional (4 Unit)",
                               "category":  "Office Furniture",
                               "condition":  "Baik",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 4 unit terverifikasi BAIK sesuai data aset inventaris."
                                                       }
                                                   ],
                               "status":  "Tersedia",
                               "image":  "https://images.unsplash.com/photo-1503602642458-232111445657?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "code":  "AST-048",
                               "specs":  "Kursi bar dengan rangka besi/kayu, dudukan ergonomis, tinggi dudukan Â±65â€“75 cm, dilengkapi sandaran kaki",
                               "id":  "TOOL-048",
                               "qty":  4,
                               "purchaseYear":  "2024",
                               "brand":  "Standar Operasional Toko Grosir",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "lastService":  "2026-08-15",
                               "nextService":  "2026-11-15",
                               "name":  "KURSI BAR",
                               "quantity":  "4 Unit"
                           },
                           {
                               "assignedTo":  "Staff Operasional (4 Unit)",
                               "category":  "IT \u0026 Network",
                               "condition":  "Baik",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 4 unit terverifikasi BAIK sesuai data aset inventaris."
                                                       }
                                                   ],
                               "status":  "Tersedia",
                               "image":  "https://images.unsplash.com/photo-1544717305-2782549b5136?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "code":  "AST-049",
                               "specs":  "Wi-Fi router, dual band 2.4 GHz/5 GHz, kecepatan hingga Â±1.200 Mbps, port LAN/WAN, mendukung standar IEEE 802.11 ac/ax",
                               "id":  "TOOL-049",
                               "qty":  4,
                               "purchaseYear":  "2024",
                               "brand":  "Standar Operasional Toko Grosir",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "lastService":  "2026-08-15",
                               "nextService":  "2026-11-15",
                               "name":  "WIFI",
                               "quantity":  "4 Unit"
                           },
                           {
                               "assignedTo":  "Staff Operasional (6 Unit)",
                               "category":  "Office Tools",
                               "condition":  "Baik",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 6 unit terverifikasi BAIK sesuai data aset inventaris."
                                                       }
                                                   ],
                               "status":  "Tersedia",
                               "image":  "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "code":  "AST-050",
                               "specs":  "Kalkulator elektronik, layar LCD 10â€“12 digit, fungsi aritmatika dasar, persentase, memori, menggunakan baterai/tenaga surya",
                               "id":  "TOOL-050",
                               "qty":  6,
                               "purchaseYear":  "2024",
                               "brand":  "Standar Operasional Toko Grosir",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "lastService":  "2026-08-15",
                               "nextService":  "2026-11-15",
                               "name":  "KALKULATOR",
                               "quantity":  "6 Unit"
                           }
                       ],
    "orders":  [
                   {
                       "estimatedArrival":  "Hari ini, Pukul 11:30 WIB (Â±25 menit lagi)",
                       "id":  "ORD-20260902-882",
                       "checkpoints":  [
                                           {
                                               "time":  "2026-09-09 10:45",
                                               "title":  "Armada Melintasi Gerbang Tol Cengkareng Barat",
                                               "location":  "Cengkareng Barat (KM 12)",
                                               "desc":  "Armada truk melaju lancar menuju Kalideres. Posisi sekitar 3 km dari toko pelanggan."
                                           },
                                           {
                                               "time":  "2026-09-09 09:50",
                                               "title":  "Armada Truk Berangkat Keluar Gudang Pusat",
                                               "location":  "Kawasan Pergudangan Niaga Jaya Blok C",
                                               "desc":  "Armada Truk Toko GBA 1 (No. Pol B 9821 GBA) diberangkatkan oleh supir Bpk. Joko Santoso."
                                           },
                                           {
                                               "time":  "2026-09-09 09:20",
                                               "title":  "Selesai Packing \u0026 Pemuatan ke Truk (Loading)",
                                               "location":  "Loading Dock Gudang Utama",
                                               "desc":  "Pemeriksaan QC selesai oleh Agus Prasetyo. 35 paket dimuat ke bak truk berpendingin."
                                           },
                                           {
                                               "time":  "2026-09-09 08:40",
                                               "title":  "Pesanan Dikonfirmasi \u0026 Proses Picking Dimulai",
                                               "location":  "Rak B-01 \u0026 Rak D-02 Gudang",
                                               "desc":  "Admin gudang memverifikasi pembayaran dan menugaskan tim picker."
                                           },
                                           {
                                               "time":  "2026-09-09 08:15",
                                               "title":  "Pesanan Berhasil Dibuat Pelanggan",
                                               "location":  "Online Shop Grosir Berkah Abadi",
                                               "desc":  "Pesanan baru terdaftar dengan metode Truk Toko GBA."
                                           }
                                       ],
                       "paymentMethod":  "Transfer Bank BCA (Otomatis)",
                       "deliveryMethod":  "Truk Toko GBA (Gratis Jabodetabek)",
                       "qcNotes":  "Seluruh 35 barang dicek utuh, masa kedaluwarsa 2027, tersegel kuat",
                       "customerPhone":  "0812-9876-5432",
                       "driverPhone":  "0813-8877-6655",
                       "totalAmount":  1450000,
                       "driverName":  "Bpk. Joko Santoso",
                       "plateNumber":  "B 9821 GBA",
                       "customerName":  "Toko Sembako Berkah Jaya (Ibu Fatimah)",
                       "progressPercent":  75,
                       "items":  [
                                     {
                                         "price":  20500,
                                         "subtotal":  307500,
                                         "unit":  "Pack",
                                         "name":  "BLASTOZ COKLAT ARTA @6",
                                         "qty":  15
                                     },
                                     {
                                         "price":  15500,
                                         "subtotal":  310000,
                                         "unit":  "Rtg",
                                         "name":  "TANGO CRISPY ROLL ARTA @4",
                                         "qty":  20
                                     },
                                     {
                                         "price":  34000,
                                         "subtotal":  340000,
                                         "unit":  "Pcs",
                                         "name":  "TISU NICE 900gr @20",
                                         "qty":  10
                                     },
                                     {
                                         "price":  18250,
                                         "subtotal":  91250,
                                         "unit":  "Pack",
                                         "name":  "BULPEN AE7 BIRU @240",
                                         "qty":  5
                                     },
                                     {
                                         "price":  125000,
                                         "subtotal":  375000,
                                         "unit":  "Pack",
                                         "name":  "PERMEN MINTZ ARTA @24",
                                         "qty":  3
                                     }
                                 ],
                       "customerAddress":  "Jl. Raya Daan Mogot KM 14 No. 28, Kalideres, Jakarta Barat",
                       "vehicle":  "Truk Toko GBA 1 (CDD Box)",
                       "status":  "Dalam Pengiriman",
                       "packingStaff":  "Agus Prasetyo (Gudang Blok B)",
                       "orderDate":  "2026-09-09 08:15",
                       "notes":  "Mohon ditumpuk rapi di bagian depan toko, kirim pagi hari."
                   },
                   {
                       "estimatedArrival":  "Hari ini, Pukul 14:00 WIB",
                       "id":  "ORD-20260902-512",
                       "checkpoints":  [
                                           {
                                               "time":  "2026-09-09 10:00",
                                               "title":  "Proses Packing \u0026 Pelabelan Resi Gudang",
                                               "location":  "Gudang Area Packaging Blok D",
                                               "desc":  "Staff Budi Hartono sedang membungkus pesanan dengan bubble wrap dan kardus segel."
                                           },
                                           {
                                               "time":  "2026-09-09 09:30",
                                               "title":  "Pesanan Diterima oleh Sistem",
                                               "location":  "Online Shop Grosir Berkah Abadi",
                                               "desc":  "Pesanan masuk dan diteruskan ke supervisor gudang."
                                           }
                                       ],
                       "paymentMethod":  "Bayar di Tempat (COD Grosir)",
                       "deliveryMethod":  "Mobil Box Kecil (Gran Max)",
                       "qcNotes":  "Dalam proses verifikasi jumlah dan packing karton tebal",
                       "customerPhone":  "0815-2233-4455",
                       "driverPhone":  "0812-3344-5566",
                       "totalAmount":  850000,
                       "driverName":  "Bpk. Rahmat Hidayat",
                       "plateNumber":  "B 9142 GBA",
                       "customerName":  "Minimarket Barokah Mart (Bpk. H. Sukirno)",
                       "progressPercent":  35,
                       "items":  [
                                     {
                                         "price":  175000,
                                         "subtotal":  525000,
                                         "unit":  "Pack",
                                         "name":  "FRUZZ GUMMY ARTA @12",
                                         "qty":  3
                                     },
                                     {
                                         "price":  44100,
                                         "subtotal":  220500,
                                         "unit":  "Rtg",
                                         "name":  "OOPS CHIPS RTG ARTA @6",
                                         "qty":  5
                                     },
                                     {
                                         "price":  9500,
                                         "subtotal":  95000,
                                         "unit":  "Rtg",
                                         "name":  "OOPS FUGU ARTA @12",
                                         "qty":  10
                                     }
                                 ],
                       "customerAddress":  "Jl. Meruya Ilir Raya No. 88, Kembangan, Jakarta Barat",
                       "vehicle":  "Mobil Box Kecil (Gran Max)",
                       "status":  "Sedang Dipacking",
                       "packingStaff":  "Budi Hartono (Gudang Blok D)",
                       "orderDate":  "2026-09-09 09:30",
                       "notes":  "Siapkan uang pas saat barang sampai."
                   },
                   {
                       "plateNumber":  "B 9821 GBA",
                       "id":  "ORD-20260901-105",
                       "podImage":  "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                       "vehicle":  "Truk Toko GBA 1 (CDD Box)",
                       "totalAmount":  2150000,
                       "orderDate":  "2026-09-08 13:00",
                       "customerAddress":  "Jl. Pos Pengumben No. 12, Kebon Jeruk, Jakarta Barat",
                       "driverName":  "Bpk. Joko Santoso",
                       "estimatedArrival":  "Telah Sampai",
                       "packingStaff":  "Agus Prasetyo",
                       "notes":  "Diterima staf gudang koperasi.",
                       "receivedBy":  "Ibu Siti Rahma (Kepala Koperasi)",
                       "customerName":  "Koperasi Usaha Mandiri Sejahtera",
                       "driverPhone":  "0813-8877-6655",
                       "paymentMethod":  "Transfer Bank Mandiri",
                       "progressPercent":  100,
                       "checkpoints":  [
                                           {
                                               "time":  "2026-09-08 16:30",
                                               "title":  "Pesanan Berhasil Diserahterimakan (Selesai)",
                                               "location":  "Kantor Koperasi Usaha Mandiri Sejahtera",
                                               "desc":  "Barang telah diterima langsung oleh Ibu Siti Rahma dalam keadaan lengkap."
                                           },
                                           {
                                               "time":  "2026-09-08 15:45",
                                               "title":  "Armada Tiba di Lokasi Tujuan Pengiriman",
                                               "location":  "Jl. Pos Pengumben No. 12",
                                               "desc":  "Supir Bpk. Joko memarkirkan truk dan bersiap melakukan pembongkaran muatan."
                                           },
                                           {
                                               "time":  "2026-09-08 14:15",
                                               "title":  "Armada Berangkat Menuju Lokasi",
                                               "location":  "Gudang Niaga Jaya",
                                               "desc":  "Truk berangkat membawa muatan pesanan."
                                           },
                                           {
                                               "time":  "2026-09-08 13:00",
                                               "title":  "Pesanan Dibuat \u0026 Diproses",
                                               "location":  "Online Shop",
                                               "desc":  "Pesanan diproses dan diverifikasi admin."
                                           }
                                       ],
                       "items":  [
                                     {
                                         "price":  24500,
                                         "subtotal":  245000,
                                         "unit":  "Pack",
                                         "name":  "BUKU ALL STAR 38 TULIS @32",
                                         "qty":  10
                                     },
                                     {
                                         "price":  28750,
                                         "subtotal":  287500,
                                         "unit":  "Pack",
                                         "name":  "BUKU BOXY VISION 36 @24",
                                         "qty":  10
                                     },
                                     {
                                         "price":  25000,
                                         "subtotal":  375000,
                                         "unit":  "Biji",
                                         "name":  "HERBORIST BODY LOTION ZATUN 145ML @24",
                                         "qty":  15
                                     },
                                     {
                                         "price":  16750,
                                         "subtotal":  335000,
                                         "unit":  "Slop",
                                         "name":  "TISU BASAH CUSSONS ISI 3 BIRU @12",
                                         "qty":  20
                                     }
                                 ],
                       "status":  "Selesai",
                       "deliveryMethod":  "Truk Toko GBA (Gratis Jabodetabek)",
                       "qcNotes":  "Lulus QC 100%",
                       "customerPhone":  "0818-7766-5544"
                   }
               ],
    "profile":  {
                    "logoUrl":  "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=150\u0026auto=format\u0026fit=crop\u0026q=80",
                    "address":  "Kawasan Pergudangan Niaga Jaya Blok C No. 12-15, Jakarta Barat",
                    "logoText":  "GBA",
                    "bannerImage":  "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200\u0026auto=format\u0026fit=crop\u0026q=80",
                    "bannerTitle":  "KATALOG RESMI 250+ PRODUK UMKM \u0026 50 ASET INVENTARIS",
                    "name":  "GROSIR BERKAH ABADI",
                    "bannerBadge":  "250 PRODUK UMKM TERVERIFIKASI",
                    "tagline":  "Pusat Grosir Sembako, Palen, ATK, Kosmetik, \u0026 Kebutuhan Usaha Terlengkap",
                    "bannerSubtitle":  "Lengkap dengan sistem harga grosir satuan pasti, dokumen faktur, dan manajemen aset gudang terintegrasi.",
                    "npwp":  "01.234.567.8-012.000",
                    "phone":  "0812-3456-7890",
                    "operationalHours":  "Senin - Sabtu: 07.30 - 17.30 WIB",
                    "email":  "kontak@grosirberkahabadi.com"
                },
    "documents":  [
                      {
                          "id":  "DOC-INV-001",
                          "date":  "2026-09-02",
                          "type":  "Faktur Penjualan",
                          "paymentStatus":  "LUNAS",
                          "paymentMethod":  "Transfer Bank BCA",
                          "clientAddress":  "Jl. Pasar Lama No. 24, Jakarta",
                          "dueDate":  "2026-09-16",
                          "discount":  16500,
                          "clientPhone":  "0812-9988-7766",
                          "grandTotal":  730000,
                          "clientName":  "Toko Sembako Barokah UMKM",
                          "docNumber":  "INV/GBA/2026/09/0001",
                          "items":  [
                                        {
                                            "price":  21650,
                                            "subtotal":  216500,
                                            "unit":  "Pack",
                                            "name":  "BLASTOZ COKLAT ARTA @6",
                                            "qty":  10
                                        },
                                        {
                                            "price":  180000,
                                            "subtotal":  360000,
                                            "unit":  "Pack",
                                            "name":  "FRUZZ GUMMY ARTA @12",
                                            "qty":  2
                                        },
                                        {
                                            "price":  34000,
                                            "subtotal":  170000,
                                            "unit":  "Pcs",
                                            "name":  "TISU NICE 900gr @20",
                                            "qty":  5
                                        }
                                    ],
                          "attachmentUrl":  "",
                          "taxPercent":  0,
                          "taxAmount":  0,
                          "signatureName":  "Bagian Penjualan Grosir",
                          "notes":  "Pembayaran telah lunas. Terima kasih atas transaksi grosir Anda."
                      }
                  ],
    "shopProducts":  [
                         {
                             "badge":  "BEST SELLER",
                             "id":  "SHOP-001",
                             "category":  "Sembako",
                             "tiers":  [
                                           {
                                               "price":  21650,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "1905260001",
                             "name":  "BLASTOZ COKLAT ARTA @6",
                             "retailPrice":  21650,
                             "price":  21650,
                             "description":  "Rasa: Cokelat (Chocolate), Berat Bersih per Buah: 24 gram, Isi per Box: 12 pcs, Berat Total per Box: Sekitar 288-300g",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  51
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-002",
                             "category":  "Sembako",
                             "tiers":  [
                                           {
                                               "price":  13000,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "1605260009",
                             "name":  "CANNON BALL ARTA @6",
                             "retailPrice":  13000,
                             "price":  13000,
                             "description":  "Sachet Kecil/Sedang: Berat bersih sekitar 20g/40g, Box/Multipack: Isi 12 pcs (20g) atau isi 24 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  52
                         },
                         {
                             "badge":  "PARTAI",
                             "id":  "SHOP-003",
                             "category":  "Sembako",
                             "tiers":  [
                                           {
                                               "price":  180000,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "1905260002",
                             "name":  "FRUZZ GUMMY ARTA @12",
                             "retailPrice":  180000,
                             "price":  180000,
                             "description":  "1 Dus isi 12 box",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  53
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-004",
                             "category":  "Sembako",
                             "tiers":  [
                                           {
                                               "price":  6000,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "1605260007",
                             "name":  "FULLO ROLL ARTA @6",
                             "retailPrice":  6000,
                             "price":  6000,
                             "description":  "Berat Bersih: Â± 7 gram per pcs. Jumlah Isi: 1 pak isi 6 pcs. Varian: Cokelat, Vanilla Milk, Choco Berry, Blueberry Yogurt",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  54
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-005",
                             "category":  "Sembako",
                             "tiers":  [
                                           {
                                               "price":  88000,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "1807260001",
                             "name":  "FULLO STICKY ARTA @6",
                             "retailPrice":  88000,
                             "price":  88000,
                             "description":  "Berat Bersih: Â±7g/8g per pcs. Varian: Cokelat, Vanilla Milk, Choco Vanilla, Choco Strawberry. Kemasan Grosir: 1 karton isi 6 box @24 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  55
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-006",
                             "category":  "Sembako",
                             "tiers":  [
                                           {
                                               "price":  44100,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Rtg",
                             "sku":  "2006260001",
                             "name":  "OOPS CHIPS RTG ARTA @6",
                             "retailPrice":  44100,
                             "price":  44100,
                             "description":  "Berat Bersih (Netto): 60 gram per bungkus (total 6 pcs). Isi Paket: 6 bungkus",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  56
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-007",
                             "category":  "Sembako",
                             "tiers":  [
                                           {
                                               "price":  10000,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Rtg",
                             "sku":  "2007260002",
                             "name":  "OOPS FUGU ARTA @12",
                             "retailPrice":  10000,
                             "price":  10000,
                             "description":  "Berat Bersih: Sekitar 10â€“12 gram per bungkus kecil (sachet). Kemasan Umum: Dijual per renteng/pak isi 10 sachet",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  57
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-008",
                             "category":  "Sembako",
                             "tiers":  [
                                           {
                                               "price":  18000,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Rtg",
                             "sku":  "2007260001",
                             "name":  "OOPS STAR ARTA @12",
                             "retailPrice":  18000,
                             "price":  18000,
                             "description":  "Kemasan: Renceng atau pak isi beberapa bungkus kecil. Varian: Jagung bakar manis, ayam tomat panggang, mie goreng. Halal",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  58
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-009",
                             "category":  "Sembako",
                             "tiers":  [
                                           {
                                               "price":  210000,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "307260002",
                             "name":  "PERMEN BLASTER ARTA @24",
                             "retailPrice":  210000,
                             "price":  210000,
                             "description":  "Kemasan: 1 Karton / Dus berisi 24 bungkus (zak)",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  59
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-010",
                             "category":  "Sembako",
                             "tiers":  [
                                           {
                                               "price":  82000,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Rtg",
                             "sku":  "1807260002",
                             "name":  "PERMEN BLASTER POP ARTA @4",
                             "retailPrice":  82000,
                             "price":  82000,
                             "description":  "Berat Bersih (Netto): Â±6,3 gram per pcs. Isi Per Pak/Renceng: 36 pcs. Kemasan Grosir: 1 dus isi 4 pak (4 x 36 pcs)",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  60
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-011",
                             "category":  "Sembako",
                             "tiers":  [
                                           {
                                               "price":  210000,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "1807260003",
                             "name":  "PERMEN FRUZZ FRUIT COMBO ARTA @30",
                             "retailPrice":  210000,
                             "price":  210000,
                             "description":  "Berat Bersih per Bungkus: 88 gram atau 100 gram. Isi 30 bungkus per karton",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  61
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-012",
                             "category":  "Sembako",
                             "tiers":  [
                                           {
                                               "price":  130000,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "307260001",
                             "name":  "PERMEN MINTZ ARTA @24",
                             "retailPrice":  130000,
                             "price":  130000,
                             "description":  "Berat per Bungkus: Sekitar 99g â€“ 115g. Varian: Peppermint, Duomint, Barleymint, Cherrymint, Grapemint. Tekstur kenyal, rasa mint segar, halal",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  62
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-013",
                             "category":  "Sembako",
                             "tiers":  [
                                           {
                                               "price":  17000,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Rtg",
                             "sku":  "2703260001",
                             "name":  "PERMEN MINTZ ARTA @25",
                             "retailPrice":  17000,
                             "price":  17000,
                             "description":  "Isi per Kemasan Utuh: 1 bungkus normal berisi 50 pcs. Berat per Butir: Sekitar 2,2g - 2,5g",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  63
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-014",
                             "category":  "Sembako",
                             "tiers":  [
                                           {
                                               "price":  17000,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Rtg",
                             "sku":  "1905260003",
                             "name":  "TANGO CRISPY ROLL ARTA @4",
                             "retailPrice":  17000,
                             "price":  17000,
                             "description":  "Berat Bersih per Pcs/Sachet: 12 gram. Jumlah dalam 1 Renceng: 10 pcs. Total dalam 1 Karton/Dus: 4 renceng",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  64
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-015",
                             "category":  "Sembako",
                             "tiers":  [
                                           {
                                               "price":  18500,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "1605260006",
                             "name":  "TANGO EMOJI ARTA @6",
                             "retailPrice":  18500,
                             "price":  18500,
                             "description":  "Isi per Box: 12 pack plus bonus 1 pack (total 13 pack per box). Isi per Pack: 3 keping plus bonus 1 keping biskuit (total 4 keping / 22,4g)",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  65
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-016",
                             "category":  "Sembako",
                             "tiers":  [
                                           {
                                               "price":  16500,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "3005260001",
                             "name":  "TANGO WAFER BITE BLACKPINK ARTA @6",
                             "retailPrice":  16500,
                             "price":  16500,
                             "description":  "Berat Bersih (Netto): 35 gram per sachet/bungkus. Kemasan Paket: (berisi 6 bungkus kemasan 35 gram)",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  66
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-017",
                             "category":  "Sembako",
                             "tiers":  [
                                           {
                                               "price":  9000,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "1605260005",
                             "name":  "TANGO WAFER ECER 1000 ARTA @12",
                             "retailPrice":  9000,
                             "price":  9000,
                             "description":  "Berat Bersih (Netto): Â±15g â€“ 16g per pcs. Kemasan Jual (@12): 1 pak besar berisi 12 renceng",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  67
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-018",
                             "category":  "Sembako",
                             "tiers":  [
                                           {
                                               "price":  16500,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "1605260002",
                             "name":  "TANGO WAFER ECER 2000 ARTA @6",
                             "retailPrice":  16500,
                             "price":  16500,
                             "description":  "Berat Bersih (Netto): Â±37 gram per bungkus. Harga Jual Eceran (HJE): Rp2.000 per bungkus",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  68
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-019",
                             "category":  "Sembako",
                             "tiers":  [
                                           {
                                               "price":  20000,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "2305260001",
                             "name":  "TANGO WAFFLE ARTA @8",
                             "retailPrice":  20000,
                             "price":  20000,
                             "description":  "Berat Bersih per Sachet: 25 gram. Isi per Box: 12 pcs (+ bonus 1 sachet pada promo tertentu, total 12â€“13 pcs)",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  69
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-020",
                             "category":  "Sembako",
                             "tiers":  [
                                           {
                                               "price":  20000,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "2606260001",
                             "name":  "TANGO WAFFLE WAHH ARTA @6",
                             "retailPrice":  20000,
                             "price":  20000,
                             "description":  "Isi Paket: 6 pcs (per unit atau per ikat penjualan). Berat Bersih: Bervariasi sekitar 22â€“25 gram per buah",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  70
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-021",
                             "category":  "Sembako",
                             "tiers":  [
                                           {
                                               "price":  17500,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "2605260001",
                             "name":  "TANGO WALUT ARTA @6",
                             "retailPrice":  17500,
                             "price":  17500,
                             "description":  "Isi dalam Box: 6 saset / pcs. Berat Bersih per Pcs: 12,5 gram. Berat Bersih Total Box: Â±75 gram",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  71
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-022",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  2500,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Biji",
                             "sku":  "2504260007",
                             "name":  "(ECER) SOLASI HITAM BERRY/ABRO/ABADI/JOM",
                             "retailPrice":  2500,
                             "price":  2500,
                             "description":  "Fungsi Utama: Pelindung sambungan kabel listrik, pencegah korsleting, dan perbaikan darurat rumah tangga. Bahan: PVC lentur atau kain rekat tinggi",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  72
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-023",
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  1500,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Slop",
                             "sku":  "3001240001",
                             "name":  "SOLASI ABADI TAPE MURAH",
                             "retailPrice":  1500,
                             "price":  1500,
                             "description":  "Lebar: 24 mm (1 inci). Panjang: 60 yard, 72 meter, atau hingga 100 yard per rol. Warna: Transparan / Bening. Bahan: OPP film dengan lem akrilik",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  73
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-024",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  8500,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Slop",
                             "sku":  "1508230001",
                             "name":  "SOLASI ABADI TEBAL 1/2X25@80",
                             "retailPrice":  8500,
                             "price":  8500,
                             "description":  "Lebar: 1/2 inci atau 12 mm. Panjang: 25 yard (Â±22,8 meter per roll). Ketebalan: Kategori tebal",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  74
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-025",
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  5250,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Slop",
                             "sku":  "B02107",
                             "name":  "SOLASI BENING GOLDTAPE(1/2X10)@100",
                             "retailPrice":  5250,
                             "price":  5250,
                             "description":  "Lebar: 1/2 inci (sekitar 12 mm). Panjang: 10 meter / 10 yard",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  75
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-026",
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  21750,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Slop",
                             "sku":  "B06992",
                             "name":  "SOLASI BERRY HITAM 300 PVC TBL @60",
                             "retailPrice":  21750,
                             "price":  21750,
                             "description":  "Jenis: Solasi PVC. Warna: Hitam. Ukuran: 300. Isi: 60 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  76
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-027",
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  1500,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Slop",
                             "sku":  "3001240002",
                             "name":  "SOLASI BIMA MURAH",
                             "retailPrice":  1500,
                             "price":  1500,
                             "description":  "Jenis: Solasi. Merk: Bima. Tipe: Murah",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  77
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-028",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  4000,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Slop",
                             "sku":  "B04501",
                             "name":  "SOLASI FANCY/GLITTER @200",
                             "retailPrice":  4000,
                             "price":  4000,
                             "description":  "Jenis: Solasi Fancy/Glitter. Isi: 200 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  78
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-029",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  3250,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Slop",
                             "sku":  "1512250004",
                             "name":  "SOLASI HITAM ABADI @60",
                             "retailPrice":  3250,
                             "price":  3250,
                             "description":  "Jenis: Solasi. Warna: Hitam. Merk: Abadi. Isi: 60 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  79
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-030",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  10750,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Slop",
                             "sku":  "B01354",
                             "name":  "SOLASI HITAM ABRO CLOTH @50",
                             "retailPrice":  10750,
                             "price":  10750,
                             "description":  "Jenis: Solasi Cloth. Warna: Hitam. Merk: Abro. Isi: 50 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  80
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-031",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  12750,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Slop",
                             "sku":  "B02424",
                             "name":  "SOLASI HITAM ABRO PVC @66/54",
                             "retailPrice":  12750,
                             "price":  12750,
                             "description":  "Jenis: Solasi PVC. Warna: Hitam. Merk: Abro. Ukuran: 66/54",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  81
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-032",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  8250,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Slop",
                             "sku":  "B00003",
                             "name":  "SOLASI HITAM GOLDTAPE ASLI II @50",
                             "retailPrice":  8250,
                             "price":  8250,
                             "description":  "Jenis: Solasi. Warna: Hitam. Merk: Goldtape Asli II. Isi: 50 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  82
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-033",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  3750,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Slop",
                             "sku":  "B05220",
                             "name":  "SOLASI HITAM GOLDTOOOOP@77",
                             "retailPrice":  3750,
                             "price":  3750,
                             "description":  "Jenis: Solasi. Warna: Hitam. Merk: Goldtoooop. Isi: 77 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  83
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-034",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  3250,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Slop",
                             "sku":  "1705230001",
                             "name":  "SOLASI HITAM SM/SELA/JOMBO/PAJERO @66",
                             "retailPrice":  3250,
                             "price":  3250,
                             "description":  "Jenis: Solasi. Warna: Hitam. Tipe: SM/Sela/Jombo/Pajero. Isi: 66 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  84
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-035",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  10750,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Slop",
                             "sku":  "2103250003",
                             "name":  "SOLASI HITAM SM @66",
                             "retailPrice":  10750,
                             "price":  10750,
                             "description":  "Jenis: Solasi kertas. Merk: SM. Tipe: Tebal. Ukuran: 54/50/55",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  85
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-036",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  4000,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Slop",
                             "sku":  "604240002",
                             "name":  "SOLASI KERTAS BERRY TIPIS @60",
                             "retailPrice":  4000,
                             "price":  4000,
                             "description":  "Jenis: Solasi kertas. Merk: Berry. Tipe: Tipis. Isi: 60 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  86
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-037",
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  6500,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Slop",
                             "sku":  "B06372",
                             "name":  "SOLASI KERTAS GOLDTAPE @50",
                             "retailPrice":  6500,
                             "price":  6500,
                             "description":  "Jenis: Solasi kertas. Merk: Goldtape. Isi: 50 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  87
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-038",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  3250,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Slop",
                             "sku":  "408250001",
                             "name":  "SOLASI KERTAS JOMBOOO @66",
                             "retailPrice":  3250,
                             "price":  3250,
                             "description":  "Jenis: Solasi kertas. Tipe: Jombooo. Isi: 66 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  88
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-039",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  10500,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Slop",
                             "sku":  "B06621",
                             "name":  "SOLASI KERTAS MACIDA TEBAL@54",
                             "retailPrice":  10500,
                             "price":  10500,
                             "description":  "Jenis: Solasi kertas. Merk: Macida. Tipe: Tebal. Isi: 54 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  89
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-040",
                             "category":  "Parfum",
                             "tiers":  [
                                           {
                                               "price":  3250,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Slop",
                             "sku":  "2103250002",
                             "name":  "SOLASI KERTAS MACIDA TIPIS @60",
                             "retailPrice":  3250,
                             "price":  3250,
                             "description":  "Jenis: Solasi kertas. Merk: Macida. Tipe: Tipis. Isi: 60 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  90
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-041",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  5750,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Slop",
                             "sku":  "2307260006",
                             "name":  "SOLASI KERTAS MILENIUM @50",
                             "retailPrice":  5750,
                             "price":  5750,
                             "description":  "Jenis: Solasi kertas. Merk: Milenium. Isi: 50 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  91
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-042",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  3000,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Slop",
                             "sku":  "808250015",
                             "name":  "SOLASI KERTAS OZZIE TIPIS @60",
                             "retailPrice":  3000,
                             "price":  3000,
                             "description":  "Jenis: Solasi kertas. Merk: Ozzie. Tipe: Tipis. Isi: 60 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  92
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-043",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  17500,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Slop",
                             "sku":  "B04607",
                             "name":  "SOLASI KERTAS PAJERO TEBAL @50",
                             "retailPrice":  17500,
                             "price":  17500,
                             "description":  "Jenis: Solasi kertas. Tipe: Pajero Tebal. Isi: 50 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  93
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-044",
                             "category":  "Bangunan",
                             "tiers":  [
                                           {
                                               "price":  48500,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Slop",
                             "sku":  "B05526",
                             "name":  "LAKBAN OPP ABADI WARNA @72",
                             "retailPrice":  48500,
                             "price":  48500,
                             "description":  "Jenis: Solasi. Merk/Tipe: Sella. Isi: 12 Pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  94
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-045",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  3250,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Slop",
                             "sku":  "B06396",
                             "name":  "SOLASI KERTAS SM @60",
                             "retailPrice":  3250,
                             "price":  3250,
                             "description":  "Jenis: Solasi kertas. Tipe: SM. Isi: 60 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  95
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-046",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  6550,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Biji",
                             "sku":  "905260005",
                             "name":  "KANOE TISU SERBAGUNA @40",
                             "retailPrice":  6550,
                             "price":  6550,
                             "description":  "Jenis: Tisu serbaguna. Merk: Kanoe. Isi: 40 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  96
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-047",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  2000,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "1709240001",
                             "name":  "MINITIKI TISU BASAH IOS @32",
                             "retailPrice":  2000,
                             "price":  2000,
                             "description":  "Jenis: Tisu basah. Merk: Minitiki. Tipe: IOS. Isi: 32 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  97
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-048",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  12250,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "B03182",
                             "name":  "TISU BASAH CUSSONS ISI 2 BIRU @18",
                             "retailPrice":  12250,
                             "price":  12250,
                             "description":  "Jenis: Tisu basah. Merk: Cussons. Isi kemasan: 2. Warna: Biru. Isi: 18 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  98
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-049",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  12250,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "B03184",
                             "name":  "TISU BASAH CUSSONS ISI 2 HIJAU @18",
                             "retailPrice":  12250,
                             "price":  12250,
                             "description":  "Jenis: Tisu basah. Merk: Cussons. Isi kemasan: 2. Warna: Hijau. Isi: 18 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  99
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-050",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  12250,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "B03183",
                             "name":  "TISU BASAH CUSSONS ISI 2 UNGU @18",
                             "retailPrice":  12250,
                             "price":  12250,
                             "description":  "Jenis: Tisu basah. Merk: Cussons. Isi kemasan: 2. Warna: Ungu. Isi: 18 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  100
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-051",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  16750,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Slop",
                             "sku":  "2204260001",
                             "name":  "TISU BASAH CUSSONS ISI 3 BIRU @12",
                             "retailPrice":  16750,
                             "price":  16750,
                             "description":  "Jenis: Tisu basah. Merk: Cussons. Isi kemasan: 3. Warna: Biru. Isi: 12 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  101
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-052",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  16750,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Slop",
                             "sku":  "1104260004",
                             "name":  "TISU BASAH CUSSONS ISI 3 HIJAU @12",
                             "retailPrice":  16750,
                             "price":  16750,
                             "description":  "Jenis: Tisu basah. Merk: Cussons. Isi kemasan: 3. Warna: Hijau. Isi: 12 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  102
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-053",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  16750,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Slop",
                             "sku":  "2510250001",
                             "name":  "TISU BASAH CUSSONS ISI 3 UNGU/PINK @12",
                             "retailPrice":  16750,
                             "price":  16750,
                             "description":  "Jenis: Tisu basah. Merk: Cussons. Isi kemasan: 3. Warna: Ungu/Pink. Isi: 12 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  103
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-054",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  11000,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "710250003",
                             "name":  "TISU BASAH KODOMO ISI 2 @24",
                             "retailPrice":  11000,
                             "price":  11000,
                             "description":  "Jenis: Tisu basah. Merk: Kodomo. Isi kemasan: 2. Isi: 24 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  104
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-055",
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  10000,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "1204250001",
                             "name":  "TISU BASAH MINIKIDI ISI 2+BNS 40S @18",
                             "retailPrice":  10000,
                             "price":  10000,
                             "description":  "Jenis: Tisu basah. Merk: Minikidi. Isi: 2 + bonus 40S. Isi: 18 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  105
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-056",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  11500,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "2807260006",
                             "name":  "TISU BASAH MITU BANDED 2 50\u0027S BIRU @24",
                             "retailPrice":  11500,
                             "price":  11500,
                             "description":  "Jenis: Tisu basah. Merk: Mitu. Tipe: Banded 2. Isi: 50\u0027s. Warna: Biru. Isi: 24 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  106
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-057",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  11500,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "2807260007",
                             "name":  "TISU BASAH MITU BANDED 2 50\u0027S PINK @24",
                             "retailPrice":  11500,
                             "price":  11500,
                             "description":  "Jenis: Tisu basah. Merk: Mitu. Tipe: Banded 2. Isi: 50\u0027s. Warna: Pink. Isi: 24 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  107
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-058",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  11500,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "2807260008",
                             "name":  "TISU BASAH MITU BANDED 2 50\u0027S UNGU @24",
                             "retailPrice":  11500,
                             "price":  11500,
                             "description":  "Jenis: Tisu basah. Merk: Mitu. Tipe: Banded 2. Isi: 50\u0027s. Warna: Ungu. Isi: 24 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  108
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-059",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  4200,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pcs",
                             "sku":  "1912240004",
                             "name":  "TISU BASAH MITU ECER 5000 BIDAN @72",
                             "retailPrice":  4200,
                             "price":  4200,
                             "description":  "Jenis: Tisu basah. Merk: Mitu. Tipe: Ecer 5000 Bidan. Isi: 72 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  109
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-060",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  11250,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "B03171",
                             "name":  "TISU BASAH MITU ISI 2 @24",
                             "retailPrice":  11250,
                             "price":  11250,
                             "description":  "Jenis: Tisu basah. Merk: Mitu. Isi kemasan: 2. Isi: 24 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  110
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-061",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  24500,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Rtg",
                             "sku":  "B03326",
                             "name":  "TISU BASAH MITU ISI 6 (5000) RTG @12",
                             "retailPrice":  24500,
                             "price":  24500,
                             "description":  "Jenis: Tisu basah. Merk: Mitu. Isi kemasan: 6. Keterangan: 5000 RTG. Isi: 12 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  111
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-062",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  18250,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "B03027",
                             "name":  "TISU BASAH MITU RTG BIRU 4\u0027S @12",
                             "retailPrice":  18250,
                             "price":  18250,
                             "description":  "Jenis: Tisu basah. Merk: Mitu. Tipe: RTG. Isi: 4\u0027s. Warna: Biru. Isi: 12 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  112
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-063",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  18250,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "B03028",
                             "name":  "TISU BASAH MITU RTG PING 4\u0027S @12",
                             "retailPrice":  18250,
                             "price":  18250,
                             "description":  "Jenis: Tisu basah. Merk: Mitu. Tipe: RTG. Isi: 4\u0027s. Warna: Pink. Isi: 12 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  113
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-064",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  4000,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "310230001",
                             "name":  "TISU BASAH TIS ISI 2 @72",
                             "retailPrice":  4000,
                             "price":  4000,
                             "description":  "Jenis: Tisu basah. Merk: TIS. Isi kemasan: 2. Isi: 72 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  114
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-065",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  20000,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Rtg",
                             "sku":  "B07080",
                             "name":  "TISU BASAH TINS RENTENG @12",
                             "retailPrice":  20000,
                             "price":  20000,
                             "description":  "Jenis: Tisu basah. Merk: Tins. Tipe: Renteng. Isi: 12 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  115
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-066",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  11250,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "B06859",
                             "name":  "TISU BASAH WETKINS BIRU(2) @12",
                             "retailPrice":  11250,
                             "price":  11250,
                             "description":  "Jenis: Tisu basah. Merk: Wetkins. Isi kemasan: 2. Warna: Biru. Isi: 12 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  116
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-067",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  11250,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "B06860",
                             "name":  "TISU BASAH WETKINS PINK(2) @12",
                             "retailPrice":  11250,
                             "price":  11250,
                             "description":  "Jenis: Tisu basah. Merk: Wetkins. Isi kemasan: 2. Warna: Pink. Isi: 12 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  117
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-068",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  34000,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pcs",
                             "sku":  "B06676",
                             "name":  "TISU NICE 900gr @20",
                             "retailPrice":  34000,
                             "price":  34000,
                             "description":  "Jenis: Tisu Wajah. Merk: Nice. Berat: 900 gram",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  118
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-069",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  15250,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "B06445",
                             "name":  "TISU DAPUR SERVIETTES PIRING @12",
                             "retailPrice":  15250,
                             "price":  15250,
                             "description":  "Jenis: Tisu dapur. Merk/Tipe: Serviettes Piring. Isi: 12 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  119
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-070",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  1500,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pcs",
                             "sku":  "2710230001",
                             "name":  "KOREK LAS VEGAS KOTAK @1000",
                             "retailPrice":  1500,
                             "price":  1500,
                             "description":  "Jenis: Korek. Merk: Las Vegas. Bentuk: Kotak. Isi: 1000 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  50
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-071",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  1500,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pcs",
                             "sku":  "1604250001",
                             "name":  "KOREK LAS VEGAS MARS MAGNIT @1000",
                             "retailPrice":  1500,
                             "price":  1500,
                             "description":  "Jenis: Korek. Merk: Las Vegas. Tipe: Mars Magnit. Isi: 1000 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  51
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-072",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  1500,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pcs",
                             "sku":  "1306250001",
                             "name":  "KOREK API G2000 GEMINI OVAL @1000",
                             "retailPrice":  1500,
                             "price":  1500,
                             "description":  "Jenis: Korek. Merk: G2000. Bentuk: Oval Premium. Isi: 1000 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  52
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-073",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  4000,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pcs",
                             "sku":  "B05832",
                             "name":  "KOREK CRICKET MERAH @1000",
                             "retailPrice":  4000,
                             "price":  4000,
                             "description":  "Jenis: Korek. Merk: Cricket. Warna: Merah. Isi: 1000 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  53
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-074",
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  22000,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Biji",
                             "sku":  "2712250008",
                             "name":  "HERBORIST BODY LOTION EMBOEN",
                             "retailPrice":  22000,
                             "price":  22000,
                             "description":  "Jenis: Body Lotion. Merk: Herborist. Varian: Emboen",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  54
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-075",
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  22000,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Biji",
                             "sku":  "2712250009",
                             "name":  "HERBORIST BODY LOTION SENDJA",
                             "retailPrice":  22000,
                             "price":  22000,
                             "description":  "Jenis: Body Lotion. Merk: Herborist. Varian: Sendja",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  55
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-076",
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  25000,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Biji",
                             "sku":  "B06305",
                             "name":  "HERBORIST BODY LOTION ZATUN 145ML @24",
                             "retailPrice":  25000,
                             "price":  25000,
                             "description":  "Jenis: Body Lotion. Merk: Herborist. Varian: Zaitun. Volume: 145 ml. Isi: 24 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  56
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-077",
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  20000,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pcs",
                             "sku":  "2105250002",
                             "name":  "HERBORIST BODY SCRUB 100gr @36",
                             "retailPrice":  20000,
                             "price":  20000,
                             "description":  "Jenis: Body Scrub. Merk: Herborist. Berat: 100 gram. Isi: 36 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  57
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-078",
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  11000,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pcs",
                             "sku":  "3105250011",
                             "name":  "HERBORIST BODY SCRUB GOLD 100GR @36",
                             "retailPrice":  11000,
                             "price":  11000,
                             "description":  "Jenis: Body Scrub. Merk: Herborist. Varian: Gold. Berat: 100 gram. Isi: 36 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  58
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-079",
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  10000,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Biji",
                             "sku":  "1610250005",
                             "name":  "HERBORIST BODY SCRUB SEA SALT 100GR",
                             "retailPrice":  10000,
                             "price":  10000,
                             "description":  "Jenis: Body Scrub. Merk: Herborist. Varian: Sea Salt. Berat: 100 gram",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  59
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-080",
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  27200,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pcs",
                             "sku":  "B06385",
                             "name":  "HERBORIST BODYSERUM GLUTA SPF30 @12",
                             "retailPrice":  27200,
                             "price":  27200,
                             "description":  "Jenis: Body Serum. Merk: Herborist. Varian: Gluta. SPF: 30. Isi: 12 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  60
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-081",
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  27200,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pcs",
                             "sku":  "B06862",
                             "name":  "HERBORIST BODYSERUM LOTION 180ML @24",
                             "retailPrice":  27200,
                             "price":  27200,
                             "description":  "Jenis: Body Serum Lotion. Merk: Herborist. Volume: 180 ml. Isi: 24 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  61
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-082",
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  27200,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pcs",
                             "sku":  "403250001",
                             "name":  "HERBORIST BODYSERUM STRAW/MEL 180ML @24",
                             "retailPrice":  27200,
                             "price":  27200,
                             "description":  "Jenis: Body Serum. Merk: Herborist. Varian: Straw/Mel. Volume: 180 ml. Isi: 24 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  62
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-083",
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  22500,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pcs",
                             "sku":  "B06861",
                             "name":  "HERBORIST EXFL GEL SCRUB 150ML @24",
                             "retailPrice":  22500,
                             "price":  22500,
                             "description":  "Jenis: Exfoliating Gel Scrub. Merk: Herborist. Volume: 150 ml. Isi: 24 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1585336261026-7f897b6a4163?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  63
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-084",
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  26400,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Biji",
                             "sku":  "707250003",
                             "name":  "HERBORIST HBL COCONUT 200ML @12",
                             "retailPrice":  26400,
                             "price":  26400,
                             "description":  "Jenis: HBL. Merk: Herborist. Varian: Coconut. Volume: 200 ml. Isi: 12 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  64
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-085",
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  20000,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Biji",
                             "sku":  "1610250004",
                             "name":  "HERBORIST LULUR GREENTEA 100G",
                             "retailPrice":  20000,
                             "price":  20000,
                             "description":  "Jenis: Lulur. Merk: Herborist. Varian: Greentea. Berat: 100 gram",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  65
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-086",
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  20000,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pcs",
                             "sku":  "2405250002",
                             "name":  "HERBORIST LULUR ZATUN 100GR @12",
                             "retailPrice":  20000,
                             "price":  20000,
                             "description":  "Jenis: Lulur. Merk: Herborist. Varian: Zaitun. Berat: 100 gram. Isi: 12 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  66
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-087",
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  20000,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pcs",
                             "sku":  "908230002",
                             "name":  "HERBORIST MINERAL BODY SCRUB CUP @12",
                             "retailPrice":  20000,
                             "price":  20000,
                             "description":  "Jenis: Mineral Body Scrub. Merk: Herborist. Bentuk: Cup. Isi: 12 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  67
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-088",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  20000,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pcs",
                             "sku":  "B03537",
                             "name":  "HERBORIST MINYAK ZAITUN 150ML @24",
                             "retailPrice":  20000,
                             "price":  20000,
                             "description":  "Jenis: Minyak Zaitun. Merk: Herborist. Volume: 150 ml. Isi: 24 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  68
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-089",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  35000,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pcs",
                             "sku":  "B03536",
                             "name":  "HERBORIST MINYAK ZAITUN 75ML @48",
                             "retailPrice":  35000,
                             "price":  35000,
                             "description":  "Jenis: Minyak Zaitun. Merk: Herborist. Volume: 75 ml. Isi: 48 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  69
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-090",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  35000,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pcs",
                             "sku":  "1604230002",
                             "name":  "HERBORIST OLIVE OIL 150ML @24",
                             "retailPrice":  35000,
                             "price":  35000,
                             "description":  "Jenis: Olive Oil. Merk: Herborist. Volume: 150 ml. Isi: 24 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  70
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-091",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  35000,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pcs",
                             "sku":  "1604230003",
                             "name":  "HERBORIST OLIVE OIL 75ML @48",
                             "retailPrice":  35000,
                             "price":  35000,
                             "description":  "Jenis: Olive Oil. Merk: Herborist. Volume: 75 ml. Isi: 48 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  71
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-092",
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  18250,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "B02136",
                             "name":  "BULPEN AE7 BIRU @240",
                             "retailPrice":  18250,
                             "price":  18250,
                             "description":  "Jenis: Pulpen. Tipe: AE7. Warna: Biru. Isi: 240 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1585336261026-7f897b6a4163?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  72
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-093",
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  18250,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "B02006",
                             "name":  "BULPEN AE7 HTM @240",
                             "retailPrice":  18250,
                             "price":  18250,
                             "description":  "Jenis: Pulpen. Tipe: AE7. Warna: Hitam. Isi: 240 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1585336261026-7f897b6a4163?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  73
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-094",
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  18250,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "B02137",
                             "name":  "BULPEN AE7 MERAH @240",
                             "retailPrice":  18250,
                             "price":  18250,
                             "description":  "Jenis: Pulpen. Tipe: AE7. Warna: Merah. Isi: 240 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1585336261026-7f897b6a4163?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  74
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-095",
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  22000,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "2207260012",
                             "name":  "BULPEN CETEK ESL GP-234 BIRU @144",
                             "retailPrice":  22000,
                             "price":  22000,
                             "description":  "Jenis: Pulpen Cetek. Merk: ESL. Tipe: GP-234. Warna: Biru. Isi: 144 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1585336261026-7f897b6a4163?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  75
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-096",
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  22000,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "2207260013",
                             "name":  "BULPEN CETEK ESL GP-234 HITAM @144",
                             "retailPrice":  22000,
                             "price":  22000,
                             "description":  "Jenis: Pulpen Cetek. Merk: ESL. Tipe: GP-234. Warna: Hitam. Isi: 144 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1585336261026-7f897b6a4163?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  76
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-097",
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  9000,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pcs",
                             "sku":  "B01753",
                             "name":  "BULPEN CRISTAL LINE",
                             "retailPrice":  9000,
                             "price":  9000,
                             "description":  "Jenis: Pulpen. Tipe: Cristal Line",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1585336261026-7f897b6a4163?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  77
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-098",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  32500,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pcs",
                             "sku":  "B03888",
                             "name":  "BULPEN DEBOZ ISI 50",
                             "retailPrice":  32500,
                             "price":  32500,
                             "description":  "Jenis: Pulpen. Merk: Deboz. Isi: 50 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1585336261026-7f897b6a4163?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  78
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-099",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  11000,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "B04260",
                             "name":  "BULPEN EVERCOSS EV-1H/EV-1 @192",
                             "retailPrice":  11000,
                             "price":  11000,
                             "description":  "Jenis: Pulpen. Merk: Evercoss. Tipe: EV-1H/EV-1. Isi: 192 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1585336261026-7f897b6a4163?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  79
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-100",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  22000,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "B04267",
                             "name":  "BULPEN FANCY 4 WRN @96",
                             "retailPrice":  22000,
                             "price":  22000,
                             "description":  "Jenis: Pulpen. Tipe: Fancy. Warna: 4 warna. Isi: 96 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1585336261026-7f897b6a4163?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  80
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-101",
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  23000,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "B00097",
                             "name":  "BULPEN FASTER C-600 @144",
                             "retailPrice":  23000,
                             "price":  23000,
                             "description":  "Jenis: Pulpen. Merk: Faster. Tipe: C-600. Isi: 144 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1585336261026-7f897b6a4163?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  81
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-102",
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  23000,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "B00725",
                             "name":  "BULPEN FASTER F3 @144",
                             "retailPrice":  23000,
                             "price":  23000,
                             "description":  "Jenis: Pulpen. Merk: Faster. Tipe: F3. Isi: 144 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1585336261026-7f897b6a4163?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  82
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-103",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  18500,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pcs",
                             "sku":  "B03417",
                             "name":  "BULPEN FIRSTMAN MV-1",
                             "retailPrice":  18500,
                             "price":  18500,
                             "description":  "Jenis: Pulpen. Merk: Firstman. Tipe: MV-1",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1585336261026-7f897b6a4163?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  83
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-104",
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  12500,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "B06512",
                             "name":  "BULPEN GEL APEL KOXI 910/913 @144",
                             "retailPrice":  12500,
                             "price":  12500,
                             "description":  "Jenis: Pulpen Gel. Merk: Koxi. Tipe: Apel 910/913. Isi: 144 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1585336261026-7f897b6a4163?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  84
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-105",
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  12750,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "2705230001",
                             "name":  "BULPEN GEL APEL NEON ORLEE 7008 @144",
                             "retailPrice":  12750,
                             "price":  12750,
                             "description":  "Jenis: Pulpen Gel. Tipe: Apel Neon. Merk: Orlee. Model: 7008. Isi: 144 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1585336261026-7f897b6a4163?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  85
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-106",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  12250,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "B03453",
                             "name":  "BULPEN GEL APEL SF-6060/8080",
                             "retailPrice":  12250,
                             "price":  12250,
                             "description":  "Jenis: Pulpen Gel. Tipe: Apel. Model: SF-6060/8080",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1585336261026-7f897b6a4163?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  86
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-107",
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  11000,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "2406230003",
                             "name":  "BULPEN GEL APEL V-TRO 301/302 @144",
                             "retailPrice":  11000,
                             "price":  11000,
                             "description":  "Jenis: Pulpen Gel. Tipe: Apel V-Tro. Model: 301/302. Isi: 144 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1585336261026-7f897b6a4163?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  87
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-108",
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  14000,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pcs",
                             "sku":  "B01542",
                             "name":  "BULPEN GEL BUNGA",
                             "retailPrice":  14000,
                             "price":  14000,
                             "description":  "Jenis: Pulpen Gel. Tipe: Bunga",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1585336261026-7f897b6a4163?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  88
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-109",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  12000,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "B04447",
                             "name":  "BULPEN GEL CHOSCH 766",
                             "retailPrice":  12000,
                             "price":  12000,
                             "description":  "Jenis: Pulpen Gel. Merk/Tipe: Chosch 766",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1585336261026-7f897b6a4163?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  89
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-110",
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  19500,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "2509250006",
                             "name":  "BULPEN GEL CONCEPT CGP-61B @144",
                             "retailPrice":  19500,
                             "price":  19500,
                             "description":  "Jenis: Pulpen Gel. Merk: Concept. Tipe: CGP-61B. Isi: 144 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1585336261026-7f897b6a4163?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  90
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-111",
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  13250,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "2401230003",
                             "name":  "BULPEN GEL DTIAN @192",
                             "retailPrice":  13250,
                             "price":  13250,
                             "description":  "Jenis: Pulpen Gel. Merk: Dtian. Isi: 192 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1585336261026-7f897b6a4163?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  91
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-112",
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  12250,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "3008230002",
                             "name":  "BULPEN GEL EG-V TL6549 + MIKA @192",
                             "retailPrice":  12250,
                             "price":  12250,
                             "description":  "Jenis: Pulpen Gel. Tipe: EG-V TL6549 + Mika. Isi: 192 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1585336261026-7f897b6a4163?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  92
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-113",
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  13750,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "2207260026",
                             "name":  "BULPEN GEL ES-1020 HITAM @144",
                             "retailPrice":  13750,
                             "price":  13750,
                             "description":  "Jenis: Pulpen Gel. Tipe: ES-1020. Warna: Hitam. Isi: 144 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1585336261026-7f897b6a4163?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  93
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-114",
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  9250,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "705250001",
                             "name":  "BULPEN GEL ESCO 82 @144",
                             "retailPrice":  9250,
                             "price":  9250,
                             "description":  "Jenis: Pulpen Gel. Merk: Esco. Tipe: 82. Isi: 144 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1585336261026-7f897b6a4163?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  94
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-115",
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  12000,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pcs",
                             "sku":  "B06091",
                             "name":  "BULPEN GEL ESCO GP-822/830",
                             "retailPrice":  12000,
                             "price":  12000,
                             "description":  "Jenis: Pulpen Gel. Merk: Esco. Tipe: GP-822/830",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1585336261026-7f897b6a4163?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  95
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-116",
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  23750,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "3011240001",
                             "name":  "BUKU ALFA/NEWSTAR 38 TULIS @32",
                             "retailPrice":  23750,
                             "price":  23750,
                             "description":  "Jenis: Buku tulis. Merk: Alfa/Newstar. Ukuran: 38. Isi: 32 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  96
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-117",
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  21000,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "2406260003",
                             "name":  "BUKU ALFA/NEWSTAR TULIS 32 @40",
                             "retailPrice":  21000,
                             "price":  21000,
                             "description":  "Jenis: Buku tulis. Merk: Alfa/Newstar. Ukuran: 32. Isi: 40 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  97
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-118",
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  21250,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "2303240001",
                             "name":  "BUKU ALL STAR 32 TULIS @36",
                             "retailPrice":  21250,
                             "price":  21250,
                             "description":  "Jenis: Buku tulis. Merk: All Star. Ukuran: 32. Isi: 36 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  98
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-119",
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  24500,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "2303240002",
                             "name":  "BUKU ALL STAR 38 TULIS @32",
                             "retailPrice":  24500,
                             "price":  24500,
                             "description":  "Jenis: Buku tulis. Merk: All Star. Ukuran: 38. Isi: 32 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  99
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-120",
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  34250,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "2303240003",
                             "name":  "BUKU ALL STAR 58 TULIS @20",
                             "retailPrice":  34250,
                             "price":  34250,
                             "description":  "Jenis: Buku tulis. Merk: All Star. Ukuran: 58. Isi: 20 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  100
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-121",
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  33250,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "2303240004",
                             "name":  "BUKU ALL STAR BOXY 30 TULIS @24",
                             "retailPrice":  33250,
                             "price":  33250,
                             "description":  "Jenis: Buku tulis. Merk: All Star. Tipe: Boxy. Ukuran: 30. Isi: 24 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  101
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-122",
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  36500,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "2303240005",
                             "name":  "BUKU ALL STAR BOXY 36 TULIS @24",
                             "retailPrice":  36500,
                             "price":  36500,
                             "description":  "Jenis: Buku tulis. Merk: All Star. Tipe: Boxy. Ukuran: 36. Isi: 24 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  102
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-123",
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  39000,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "2303240006",
                             "name":  "BUKU ALL STAR BOXY 42 TULIS @16",
                             "retailPrice":  39000,
                             "price":  39000,
                             "description":  "Jenis: Buku tulis. Merk: All Star. Tipe: Boxy. Ukuran: 42. Isi: 16 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  103
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-124",
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  48750,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "2303240007",
                             "name":  "BUKU ALL STAR BOXY 50 TULIS @20",
                             "retailPrice":  48750,
                             "price":  48750,
                             "description":  "Jenis: Buku tulis. Merk: All Star. Tipe: Boxy. Ukuran: 50. Isi: 20 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  104
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-125",
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  41000,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "406250005",
                             "name":  "BUKU BEST ONE BOXY 50 @16",
                             "retailPrice":  41000,
                             "price":  41000,
                             "description":  "Jenis: Buku. Merk: Best One. Tipe: Boxy. Ukuran: 50. Isi: 16 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  105
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-126",
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  23750,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "406250004",
                             "name":  "BUKU BEST ONE HALUS 38 @32",
                             "retailPrice":  23750,
                             "price":  23750,
                             "description":  "Jenis: Buku. Merk: Best One. Tipe: Halus. Ukuran: 38. Isi: 32 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  106
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-127",
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  20000,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "406250001",
                             "name":  "BUKU BEST ONE KOTAK BSR @48",
                             "retailPrice":  20000,
                             "price":  20000,
                             "description":  "Jenis: Buku. Merk: Best One. Tipe: Kotak BSR. Isi: 48 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  107
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-128",
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  22250,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "2805260003",
                             "name":  "BUKU BEST ONE KOTAK KCL @32",
                             "retailPrice":  22250,
                             "price":  22250,
                             "description":  "Jenis: Buku. Merk: Best One. Tipe: Kotak KCL. Isi: 32 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  108
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-129",
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  18250,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "2805260008",
                             "name":  "BUKU BEST ONE KOTAK TGG @48",
                             "retailPrice":  18250,
                             "price":  18250,
                             "description":  "Jenis: Buku. Merk: Best One. Tipe: Kotak TGG. Isi: 48 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  109
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-130",
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  20000,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "406250002",
                             "name":  "BUKU BEST ONE TULIS 32 @40",
                             "retailPrice":  20000,
                             "price":  20000,
                             "description":  "Jenis: Buku tulis. Merk: Best One. Ukuran: 32. Isi: 40 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  110
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-131",
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  22750,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "1804250002",
                             "name":  "BUKU BEST ONE TULIS 38 @32",
                             "retailPrice":  22750,
                             "price":  22750,
                             "description":  "Jenis: Buku tulis. Merk: Best One. Ukuran: 38. Isi: 32 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  111
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-132",
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  33750,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "406250003",
                             "name":  "BUKU BEST ONE TULIS 58 @24",
                             "retailPrice":  33750,
                             "price":  33750,
                             "description":  "Jenis: Buku tulis. Merk: Best One. Ukuran: 58. Isi: 24 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  112
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-133",
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  35750,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "1207240003",
                             "name":  "BUKU BOXY BIGBOSSSSS SIDU 36 @20",
                             "retailPrice":  35750,
                             "price":  35750,
                             "description":  "Jenis: Buku. Tipe: Boxy. Merk: Sidu. Nama: Bigbosssss. Ukuran: 36. Isi: 20 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  113
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-134",
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  24250,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "B00433",
                             "name":  "BUKU BOXY BIGBOSSS SIDU 42 @24",
                             "retailPrice":  24250,
                             "price":  24250,
                             "description":  "Jenis: Buku. Tipe: Boxy. Merk: Sidu. Nama: Bigbosss. Ukuran: 42. Isi: 24 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  114
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-135",
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  28750,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "2206260001",
                             "name":  "BUKU BOXY VISION 36 @24",
                             "retailPrice":  28750,
                             "price":  28750,
                             "description":  "Jenis: Buku. Tipe: Boxy. Merk: Vision. Ukuran: 36. Isi: 24 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  115
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-136",
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  20000,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "1405250004",
                             "name":  "BUKU BOXY VISION 42 @24",
                             "retailPrice":  20000,
                             "price":  20000,
                             "description":  "Jenis: Buku. Tipe: Boxy. Merk: Vision. Ukuran: 42. Isi: 24 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  116
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-137",
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  37750,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "2206260002",
                             "name":  "BUKU BOXY VISION 50 @16",
                             "retailPrice":  37750,
                             "price":  37750,
                             "description":  "Jenis: Buku. Tipe: Boxy. Merk: Vision. Ukuran: 50. Isi: 16 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  117
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-138",
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  15000,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "1501260006",
                             "name":  "BUKU GAMBAR BIASA",
                             "retailPrice":  15000,
                             "price":  15000,
                             "description":  "Jenis: Buku gambar. Tipe: Biasa",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  118
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-139",
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  48000,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "B00049",
                             "name":  "BUKU GBR A3 DODO @10",
                             "retailPrice":  48000,
                             "price":  48000,
                             "description":  "Jenis: Buku gambar. Merk: Dodo. Ukuran: A3. Isi: 10 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  119
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-140",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  9500,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pcs",
                             "sku":  "B06931",
                             "name":  "HAIR BODY MIST MARINA 100ML @36",
                             "retailPrice":  9500,
                             "price":  9500,
                             "description":  "Jenis: Hair Body Mist. Merk: Marina. Volume: 100 ml. Isi: 36 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  50
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-141",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  23250,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Slop",
                             "sku":  "B04531",
                             "name":  "HBL MARINA NATURAL 100ML HIJAU @12",
                             "retailPrice":  23250,
                             "price":  23250,
                             "description":  "Jenis: HBL. Merk: Marina Natural. Volume: 100 ml. Warna: Hijau. Isi: 12 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  51
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-142",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  23250,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Slop",
                             "sku":  "B04530",
                             "name":  "HBL MARINA NATURAL 100ML KUNING @12",
                             "retailPrice":  23250,
                             "price":  23250,
                             "description":  "Jenis: HBL. Merk: Marina Natural. Volume: 100 ml. Warna: Kuning. Isi: 12 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  52
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-143",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  23250,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Slop",
                             "sku":  "B04584",
                             "name":  "HBL MARINA NATURAL 100ML ORANGE @12",
                             "retailPrice":  23250,
                             "price":  23250,
                             "description":  "Jenis: HBL. Merk: Marina Natural. Volume: 100 ml. Warna: Orange. Isi: 12 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  53
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-144",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  23250,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Slop",
                             "sku":  "B04529",
                             "name":  "HBL MARINA NATURAL 100ML PINK @12",
                             "retailPrice":  23250,
                             "price":  23250,
                             "description":  "Jenis: HBL. Merk: Marina Natural. Volume: 100 ml. Warna: Pink. Isi: 12 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  54
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-145",
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  33500,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Slop",
                             "sku":  "1206240010",
                             "name":  "HBL MARINA NATURAL 150ML+ HIJAU @8",
                             "retailPrice":  33500,
                             "price":  33500,
                             "description":  "Jenis: HBL. Merk: Marina Natural. Volume: 150 ml+. Warna: Hijau. Isi: 8 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  55
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-146",
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  33500,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Slop",
                             "sku":  "1206240011",
                             "name":  "HBL MARINA NATURAL 150ML+ KUNING @8",
                             "retailPrice":  33500,
                             "price":  33500,
                             "description":  "Jenis: HBL. Merk: Marina Natural. Volume: 150 ml+. Warna: Kuning. Isi: 8 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  56
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-147",
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  33500,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Slop",
                             "sku":  "1206240012",
                             "name":  "HBL MARINA NATURAL 150ML+ ORANGE @8",
                             "retailPrice":  33500,
                             "price":  33500,
                             "description":  "Jenis: HBL. Merk: Marina Natural. Volume: 150 ml+. Warna: Orange. Isi: 8 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  57
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-148",
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  33500,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Slop",
                             "sku":  "1206240013",
                             "name":  "HBL MARINA NATURAL 150ML+ PINK @8",
                             "retailPrice":  33500,
                             "price":  33500,
                             "description":  "Jenis: HBL. Merk: Marina Natural. Volume: 150 ml+. Warna: Pink. Isi: 8 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  58
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-149",
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  33500,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Slop",
                             "sku":  "1206240014",
                             "name":  "HBL MARINA NATURAL 150ML+ UNGU @8",
                             "retailPrice":  33500,
                             "price":  33500,
                             "description":  "Jenis: HBL. Merk: Marina Natural. Volume: 150 ml+. Warna: Ungu. Isi: 8 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  59
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-150",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  39000,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Slop",
                             "sku":  "B04586",
                             "name":  "HBL MARINA NATURAL 190ML UNGU @8",
                             "retailPrice":  39000,
                             "price":  39000,
                             "description":  "Jenis: HBL. Merk: Marina Natural. Volume: 190 ml. Warna: Ungu. Isi: 8 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  60
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-151",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  39000,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Slop",
                             "sku":  "B04587",
                             "name":  "HBL MARINA NATURAL 200ML HIJAU @8",
                             "retailPrice":  39000,
                             "price":  39000,
                             "description":  "Jenis: HBL. Merk: Marina Natural. Volume: 200 ml. Warna: Hijau. Isi: 8 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  61
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-152",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  39000,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Slop",
                             "sku":  "B04585",
                             "name":  "HBL MARINA NATURAL 200ML KUNING @8",
                             "retailPrice":  39000,
                             "price":  39000,
                             "description":  "Jenis: HBL. Merk: Marina Natural. Volume: 200 ml. Warna: Kuning. Isi: 8 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  62
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-153",
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  39000,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Slop",
                             "sku":  "B02298",
                             "name":  "HBL MARINA NATURAL 200ML ORANGE @8",
                             "retailPrice":  39000,
                             "price":  39000,
                             "description":  "Jenis: HBL. Merk: Marina Natural. Volume: 200 ml. Warna: Orange. Isi: 8 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  63
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-154",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  39000,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Slop",
                             "sku":  "B04867",
                             "name":  "HBL MARINA NATURAL 200ML PINK @8",
                             "retailPrice":  39000,
                             "price":  39000,
                             "description":  "Jenis: HBL. Merk: Marina Natural. Volume: 200 ml. Warna: Pink. Isi: 8 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  64
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-155",
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  11500,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pcs",
                             "sku":  "704250005",
                             "name":  "HBL MARINA NATURAL 350ML HIJAU @12",
                             "retailPrice":  11500,
                             "price":  11500,
                             "description":  "Jenis: HBL. Merk: Marina Natural. Volume: 350 ml. Warna: Hijau. Isi: 12 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  65
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-156",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  11500,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pcs",
                             "sku":  "707250005",
                             "name":  "HBL MARINA NATURAL 350ML KUNING @12",
                             "retailPrice":  11500,
                             "price":  11500,
                             "description":  "Jenis: HBL. Merk: Marina Natural. Volume: 350 ml. Warna: Kuning. Isi: 12 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  66
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-157",
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  11500,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pcs",
                             "sku":  "704250004",
                             "name":  "HBL MARINA NATURAL 350ML ORANGE @12",
                             "retailPrice":  11500,
                             "price":  11500,
                             "description":  "Jenis: HBL. Merk: Marina Natural. Volume: 350 ml. Warna: Orange. Isi: 12 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  67
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-158",
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  11500,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pcs",
                             "sku":  "704250006",
                             "name":  "HBL MARINA NATURAL 350ML PINK @12",
                             "retailPrice":  11500,
                             "price":  11500,
                             "description":  "Jenis: HBL. Merk: Marina Natural. Volume: 350 ml. Warna: Pink. Isi: 12 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  68
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-159",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  20000,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Slop",
                             "sku":  "1606250004",
                             "name":  "HBL MARINA NATURAL 75ML HIJAU @12",
                             "retailPrice":  20000,
                             "price":  20000,
                             "description":  "Jenis: HBL. Merk: Marina Natural. Volume: 75 ml. Warna: Hijau. Isi: 12 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  69
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-160",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  20000,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Slop",
                             "sku":  "1606250005",
                             "name":  "HBL MARINA NATURAL 75ML KUNING @12",
                             "retailPrice":  20000,
                             "price":  20000,
                             "description":  "Jenis: HBL. Merk: Marina Natural. Volume: 75 ml. Warna: Kuning. Isi: 12 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  70
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-161",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  20000,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Slop",
                             "sku":  "1606250006",
                             "name":  "HBL MARINA NATURAL 75ML ORANGE @12",
                             "retailPrice":  20000,
                             "price":  20000,
                             "description":  "Jenis: HBL. Merk: Marina Natural. Volume: 75 ml. Warna: Orange. Isi: 12 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  71
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-162",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  20000,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Slop",
                             "sku":  "1606250007",
                             "name":  "HBL MARINA NATURAL 75ML PINK @12",
                             "retailPrice":  20000,
                             "price":  20000,
                             "description":  "Jenis: HBL. Merk: Marina Natural. Volume: 75 ml. Warna: Pink. Isi: 12 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  72
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-163",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  23250,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Slop",
                             "sku":  "B02260",
                             "name":  "HBL MARINA NATURAL 95ML UNGU @12",
                             "retailPrice":  23250,
                             "price":  23250,
                             "description":  "Jenis: HBL. Merk: Marina Natural. Volume: 95 ml. Warna: Ungu. Isi: 12 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  73
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-164",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  12750,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pcs",
                             "sku":  "B03053",
                             "name":  "SEMIR MIRANDA KECIL MC-1 @144",
                             "retailPrice":  12750,
                             "price":  12750,
                             "description":  "Jenis: Semir. Merk: Miranda. Ukuran: Kecil. Kode: MC-1. Isi: 144 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  74
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-165",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  12750,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pcs",
                             "sku":  "B04575",
                             "name":  "SEMIR MIRANDA KECIL MC-10 @144",
                             "retailPrice":  12750,
                             "price":  12750,
                             "description":  "Jenis: Semir. Merk: Miranda. Ukuran: Kecil. Kode: MC-10. Isi: 144 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  75
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-166",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  12750,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pcs",
                             "sku":  "B04576",
                             "name":  "SEMIR MIRANDA KECIL MC-11 @144",
                             "retailPrice":  12750,
                             "price":  12750,
                             "description":  "Jenis: Semir. Merk: Miranda. Ukuran: Kecil. Kode: MC-11. Isi: 144 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  76
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-167",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  12750,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pcs",
                             "sku":  "B04577",
                             "name":  "SEMIR MIRANDA KECIL MC-12 @144",
                             "retailPrice":  12750,
                             "price":  12750,
                             "description":  "Jenis: Semir. Merk: Miranda. Ukuran: Kecil. Kode: MC-12. Isi: 144 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  77
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-168",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  12750,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pcs",
                             "sku":  "B04579",
                             "name":  "SEMIR MIRANDA KECIL MC-13 @144",
                             "retailPrice":  12750,
                             "price":  12750,
                             "description":  "Jenis: Semir. Merk: Miranda. Ukuran: Kecil. Kode: MC-13. Isi: 144 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  78
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-169",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  12750,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pcs",
                             "sku":  "B04580",
                             "name":  "SEMIR MIRANDA KECIL MC-14 @144",
                             "retailPrice":  12750,
                             "price":  12750,
                             "description":  "Jenis: Semir. Merk: Miranda. Ukuran: Kecil. Kode: MC-14. Isi: 144 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  79
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-170",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  12750,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pcs",
                             "sku":  "B04581",
                             "name":  "SEMIR MIRANDA KECIL MC-15 @144",
                             "retailPrice":  12750,
                             "price":  12750,
                             "description":  "Jenis: Semir. Merk: Miranda. Ukuran: Kecil. Kode: MC-15. Isi: 144 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  80
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-171",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  12750,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pcs",
                             "sku":  "B04582",
                             "name":  "SEMIR MIRANDA KECIL MC-16 @144",
                             "retailPrice":  12750,
                             "price":  12750,
                             "description":  "Jenis: Semir. Merk: Miranda. Ukuran: Kecil. Kode: MC-16. Isi: 144 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  81
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-172",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  12750,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pcs",
                             "sku":  "B04967",
                             "name":  "SEMIR MIRANDA KECIL MC-17 @144",
                             "retailPrice":  12750,
                             "price":  12750,
                             "description":  "Jenis: Semir. Merk: Miranda. Ukuran: Kecil. Kode: MC-17. Isi: 144 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  82
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-173",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  12750,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pcs",
                             "sku":  "B04966",
                             "name":  "SEMIR MIRANDA KECIL MC-18 @144",
                             "retailPrice":  12750,
                             "price":  12750,
                             "description":  "Jenis: Semir. Merk: Miranda. Ukuran: Kecil. Kode: MC-18. Isi: 144 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  83
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-174",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  12750,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pcs",
                             "sku":  "B04969",
                             "name":  "SEMIR MIRANDA KECIL MC-19 @144",
                             "retailPrice":  12750,
                             "price":  12750,
                             "description":  "Jenis: Semir. Merk: Miranda. Ukuran: Kecil. Kode: MC-19. Isi: 144 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  84
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-175",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  12750,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pcs",
                             "sku":  "B04567",
                             "name":  "SEMIR MIRANDA KECIL MC-2 @144",
                             "retailPrice":  12750,
                             "price":  12750,
                             "description":  "Jenis: Semir. Merk: Miranda. Ukuran: Kecil. Kode: MC-2. Isi: 144 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  85
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-176",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  12750,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pcs",
                             "sku":  "2003240001",
                             "name":  "SEMIR MIRANDA KECIL MC-20 @144",
                             "retailPrice":  12750,
                             "price":  12750,
                             "description":  "Jenis: Semir. Merk: Miranda. Ukuran: Kecil. Kode: MC-20. Isi: 144 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  86
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-177",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  12750,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Biji",
                             "sku":  "311250001",
                             "name":  "SEMIR MIRANDA KECIL MC-21 @144",
                             "retailPrice":  12750,
                             "price":  12750,
                             "description":  "Jenis: Semir. Merk: Miranda. Ukuran: Kecil. Kode: MC-21. Isi: 144 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  87
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-178",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  12750,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Biji",
                             "sku":  "1501260003",
                             "name":  "SEMIR MIRANDA KECIL MC-22 @144",
                             "retailPrice":  12750,
                             "price":  12750,
                             "description":  "Jenis: Semir. Merk: Miranda. Ukuran: Kecil. Kode: MC-22. Isi: 144 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  88
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-179",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  12750,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Biji",
                             "sku":  "1501260004",
                             "name":  "SEMIR MIRANDA KECIL MC-23 @144",
                             "retailPrice":  12750,
                             "price":  12750,
                             "description":  "Jenis: Semir. Merk: Miranda. Ukuran: Kecil. Kode: MC-23. Isi: 144 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  89
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-180",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  12750,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Biji",
                             "sku":  "1501260005",
                             "name":  "SEMIR MIRANDA KECIL MC-24 @144",
                             "retailPrice":  12750,
                             "price":  12750,
                             "description":  "Jenis: Semir. Merk: Miranda. Ukuran: Kecil. Kode: MC-24. Isi: 144 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  90
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-181",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  12750,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pcs",
                             "sku":  "B04568",
                             "name":  "SEMIR MIRANDA KECIL MC-3 @144",
                             "retailPrice":  12750,
                             "price":  12750,
                             "description":  "Jenis: Semir. Merk: Miranda. Ukuran: Kecil. Kode: MC-3. Isi: 144 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  91
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-182",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  12750,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pcs",
                             "sku":  "B04569",
                             "name":  "SEMIR MIRANDA KECIL MC-4 @144",
                             "retailPrice":  12750,
                             "price":  12750,
                             "description":  "Jenis: Semir. Merk: Miranda. Ukuran: Kecil. Kode: MC-4. Isi: 144 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  92
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-183",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  12750,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pcs",
                             "sku":  "B04570",
                             "name":  "SEMIR MIRANDA KECIL MC-5 @144",
                             "retailPrice":  12750,
                             "price":  12750,
                             "description":  "Jenis: Semir. Merk: Miranda. Ukuran: Kecil. Kode: MC-5. Isi: 144 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  93
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-184",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  12750,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pcs",
                             "sku":  "B04571",
                             "name":  "SEMIR MIRANDA KECIL MC-6 @144",
                             "retailPrice":  12750,
                             "price":  12750,
                             "description":  "Jenis: Semir. Merk: Miranda. Ukuran: Kecil. Kode: MC-6. Isi: 144 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  94
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-185",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  12750,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pcs",
                             "sku":  "B04572",
                             "name":  "SEMIR MIRANDA KECIL MC-7 @144",
                             "retailPrice":  12750,
                             "price":  12750,
                             "description":  "Jenis: Semir. Merk: Miranda. Ukuran: Kecil. Kode: MC-7. Isi: 144 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  95
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-186",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  12750,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pcs",
                             "sku":  "B04573",
                             "name":  "SEMIR MIRANDA KECIL MC-8 @144",
                             "retailPrice":  12750,
                             "price":  12750,
                             "description":  "Jenis: Semir. Merk: Miranda. Ukuran: Kecil. Kode: MC-8. Isi: 144 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  96
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-187",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  12750,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pcs",
                             "sku":  "B04574",
                             "name":  "SEMIR MIRANDA KECIL MC-9 @144",
                             "retailPrice":  12750,
                             "price":  12750,
                             "description":  "Jenis: Semir. Merk: Miranda. Ukuran: Kecil. Kode: MC-9. Isi: 144 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  97
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-188",
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  18250,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pcs",
                             "sku":  "B06964",
                             "name":  "LIPCREAM NUFACE NO.10 @192",
                             "retailPrice":  18250,
                             "price":  18250,
                             "description":  "Jenis: Lipcream. Merk: Nuface. No.: 10. Isi: 192 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  98
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-189",
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  18250,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pcs",
                             "sku":  "B06965",
                             "name":  "LIPCREAM NUFACE NO.11 @192",
                             "retailPrice":  18250,
                             "price":  18250,
                             "description":  "Jenis: Lipcream. Merk: Nuface. No.: 11. Isi: 192 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  99
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-190",
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  18250,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pcs",
                             "sku":  "B06966",
                             "name":  "LIPCREAM NUFACE NO.12 @192",
                             "retailPrice":  18250,
                             "price":  18250,
                             "description":  "Jenis: Lipcream. Merk: Nuface. No.: 12. Isi: 192 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  100
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-191",
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  18250,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pcs",
                             "sku":  "B06956",
                             "name":  "LIPCREAM NUFACE NO.2 @192",
                             "retailPrice":  18250,
                             "price":  18250,
                             "description":  "Jenis: Lipcream. Merk: Nuface. No.: 2. Isi: 192 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  101
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-192",
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  18250,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pcs",
                             "sku":  "B06957",
                             "name":  "LIPCREAM NUFACE NO.3 @192",
                             "retailPrice":  18250,
                             "price":  18250,
                             "description":  "Jenis: Lipcream. Merk: Nuface. No.: 3. Isi: 192 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  102
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-193",
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  18250,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pcs",
                             "sku":  "B06958",
                             "name":  "LIPCREAM NUFACE NO.4 @192",
                             "retailPrice":  18250,
                             "price":  18250,
                             "description":  "Jenis: Lipcream. Merk: Nuface. No.: 4. Isi: 192 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  103
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-194",
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  18250,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pcs",
                             "sku":  "B06959",
                             "name":  "LIPCREAM NUFACE NO.5 @192",
                             "retailPrice":  18250,
                             "price":  18250,
                             "description":  "Jenis: Lipcream. Merk: Nuface. No.: 5. Isi: 192 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  104
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-195",
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  18250,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pcs",
                             "sku":  "B06960",
                             "name":  "LIPCREAM NUFACE NO.6 @192",
                             "retailPrice":  18250,
                             "price":  18250,
                             "description":  "Jenis: Lipcream. Merk: Nuface. No.: 6. Isi: 192 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  105
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-196",
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  18250,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pcs",
                             "sku":  "B06961",
                             "name":  "LIPCREAM NUFACE NO.7 @192",
                             "retailPrice":  18250,
                             "price":  18250,
                             "description":  "Jenis: Lipcream. Merk: Nuface. No.: 7. Isi: 192 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  106
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-197",
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  18250,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pcs",
                             "sku":  "B06962",
                             "name":  "LIPCREAM NUFACE NO.8 @192",
                             "retailPrice":  18250,
                             "price":  18250,
                             "description":  "Jenis: Lipcream. Merk: Nuface. No.: 8. Isi: 192 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  107
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-198",
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  18250,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pcs",
                             "sku":  "B06963",
                             "name":  "LIPCREAM NUFACE NO.9 @192",
                             "retailPrice":  18250,
                             "price":  18250,
                             "description":  "Jenis: Lipcream. Merk: Nuface. No.: 9. Isi: 192 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  108
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-199",
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  43500,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Set",
                             "sku":  "1610250002",
                             "name":  "NUFACE LIPCARE SET",
                             "retailPrice":  43500,
                             "price":  43500,
                             "description":  "Merk: Nuface. Jenis: Lipcare Set",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  109
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-200",
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  39250,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pcs",
                             "sku":  "3105250003",
                             "name":  "NUFACE LOOSE POWDER 01 12gr @24",
                             "retailPrice":  39250,
                             "price":  39250,
                             "description":  "Merk: Nuface. Jenis: Loose Powder. No.: 01. Berat: 12 gram. Isi: 24 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  110
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-201",
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  39250,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pcs",
                             "sku":  "3105250004",
                             "name":  "NUFACE LOOSE POWDER 02 12gr @24",
                             "retailPrice":  39250,
                             "price":  39250,
                             "description":  "Merk: Nuface. Jenis: Loose Powder. No.: 02. Berat: 12 gram. Isi: 24 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  111
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-202",
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  28000,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Biji",
                             "sku":  "1002260002",
                             "name":  "NUFACE MICELLAR WATER SOOTHE \u0026 CALM",
                             "retailPrice":  28000,
                             "price":  28000,
                             "description":  "Merk: Nuface. Jenis: Micellar Water. Varian: Soothe \u0026 Calm",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  112
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-203",
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  36050,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Biji",
                             "sku":  "1002260003",
                             "name":  "NUFACE MICELLAR WATER WATERPROOF",
                             "retailPrice":  36050,
                             "price":  36050,
                             "description":  "Merk: Nuface. Jenis: Micellar Water. Varian: Waterproof",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  113
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-204",
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  34750,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pcs",
                             "sku":  "3105250013",
                             "name":  "NUFACE SATZETT GLOWCREAM 30GR @12",
                             "retailPrice":  34750,
                             "price":  34750,
                             "description":  "Merk: Nuface. Jenis: Satzett Glowcream. Berat: 30 gram. Isi: 12 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  114
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-205",
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  61500,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pcs",
                             "sku":  "3105250005",
                             "name":  "NUFACE SERUM CUSHION 01 12gr @24",
                             "retailPrice":  61500,
                             "price":  61500,
                             "description":  "Merk: Nuface. Jenis: Serum Cushion. No.: 01. Berat: 12 gram. Isi: 24 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  115
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-206",
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  61500,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pcs",
                             "sku":  "3105250006",
                             "name":  "NUFACE SERUM CUSHIONS 02 12gr @24",
                             "retailPrice":  61500,
                             "price":  61500,
                             "description":  "Merk: Nuface. Jenis: Serum Cushion. No.: 02. Berat: 12 gram. Isi: 24 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  116
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-207",
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  29750,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pcs",
                             "sku":  "3105250007",
                             "name":  "NUFACE SUNSCREEN 50GR SPF 30 TU @24",
                             "retailPrice":  29750,
                             "price":  29750,
                             "description":  "Merk: Nuface. Jenis: Sunscreen. Berat: 50 gram. SPF: 30. Tipe: TU. Isi: 24 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  117
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-208",
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  28550,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pcs",
                             "sku":  "3105250008",
                             "name":  "NUFACE SUNSCREEN 50GR SPF 50PA @24",
                             "retailPrice":  28550,
                             "price":  28550,
                             "description":  "Merk: Nuface. Jenis: Sunscreen. Berat: 50 gram. SPF: 50PA. Isi: 24 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  118
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-209",
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  49250,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pcs",
                             "sku":  "3105250012",
                             "name":  "NUFACE SUNSCREEN 50GR SPF 50PA++ @24",
                             "retailPrice":  49250,
                             "price":  49250,
                             "description":  "Merk: Nuface. Jenis: Sunscreen. Berat: 50 gram. SPF: 50PA++. Isi: 24 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  119
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-210",
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  84250,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Biji",
                             "sku":  "111250007",
                             "name":  "NUFACE SUNSCREEN SERUM SPF 50",
                             "retailPrice":  84250,
                             "price":  84250,
                             "description":  "Merk: Nuface. Jenis: Sunscreen Serum. SPF: 50",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  50
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-211",
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  17500,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Biji",
                             "sku":  "3101250003",
                             "name":  "NUFACE VIT C SERUM",
                             "retailPrice":  17500,
                             "price":  17500,
                             "description":  "Merk: Nuface. Jenis: Vitamin C Serum",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  51
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-212",
                             "category":  "Keperluan Bayi \u0026 Anak",
                             "tiers":  [
                                           {
                                               "price":  7069,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pcs",
                             "sku":  "B03101",
                             "name":  "BEDAK MITU 100+50GR @36",
                             "retailPrice":  7069,
                             "price":  7069,
                             "description":  "Merk: Mitu. Jenis: Bedak. Berat: 100+50 gram. Isi: 36 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  52
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-213",
                             "category":  "Keperluan Bayi \u0026 Anak",
                             "tiers":  [
                                           {
                                               "price":  11500,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pcs",
                             "sku":  "B06584",
                             "name":  "BEDAK MITU 50GR @36",
                             "retailPrice":  11500,
                             "price":  11500,
                             "description":  "Merk: Mitu. Jenis: Bedak. Berat: 50 gram. Isi: 36 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  53
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-214",
                             "category":  "Keperluan Bayi \u0026 Anak",
                             "tiers":  [
                                           {
                                               "price":  4250,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "B03171",
                             "name":  "TISU BASAH MITU BANDED 2/50\u0027S @24",
                             "retailPrice":  4250,
                             "price":  4250,
                             "description":  "Merk: Mitu. Jenis: Tisu Basah. Tipe: Banded 2. Isi: 50\u0027s. Isi kemasan: 24 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  54
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-215",
                             "category":  "Keperluan Bayi \u0026 Anak",
                             "tiers":  [
                                           {
                                               "price":  11500,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "2807260010",
                             "name":  "TISU BASAH MITU BANDED 2/50\u0027S PINK @24",
                             "retailPrice":  11500,
                             "price":  11500,
                             "description":  "Merk: Mitu. Jenis: Tisu Basah. Tipe: Banded 2. Isi: 50\u0027s. Warna: Pink. Isi kemasan: 24 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  55
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-216",
                             "category":  "Keperluan Bayi \u0026 Anak",
                             "tiers":  [
                                           {
                                               "price":  11500,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "2807260009",
                             "name":  "TISU BASAH MITU BANDED 2/50\u0027S @24",
                             "retailPrice":  11500,
                             "price":  11500,
                             "description":  "Merk: Mitu. Jenis: Tisu Basah. Tipe: Banded 2. Isi: 50\u0027s. Isi kemasan: 24 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  56
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-217",
                             "category":  "Keperluan Bayi \u0026 Anak",
                             "tiers":  [
                                           {
                                               "price":  11500,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "2807260011",
                             "name":  "TISU BASAH MITU BANDED 2/50\u0027S @72",
                             "retailPrice":  11500,
                             "price":  11500,
                             "description":  "Merk: Mitu. Jenis: Tisu Basah. Tipe: Banded 2. Isi: 50\u0027s. Isi kemasan: 72 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  57
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-218",
                             "category":  "Keperluan Bayi \u0026 Anak",
                             "tiers":  [
                                           {
                                               "price":  11500,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pcs",
                             "sku":  "808250008",
                             "name":  "TISU BASAH MITU ECR 5000 25\u0027S @72",
                             "retailPrice":  11500,
                             "price":  11500,
                             "description":  "Merk: Mitu. Jenis: Tisu Basah. Tipe: ECR 5000. Isi: 25\u0027s. Isi kemasan: 72 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  58
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-219",
                             "category":  "Keperluan Bayi \u0026 Anak",
                             "tiers":  [
                                           {
                                               "price":  4200,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Rtg",
                             "sku":  "B03326",
                             "name":  "TISU BASAH MITU 15\u0027S @12",
                             "retailPrice":  4200,
                             "price":  4200,
                             "description":  "Merk: Mitu. Jenis: Tisu Basah. Isi: 15\u0027s. Isi kemasan: 12 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  59
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-220",
                             "category":  "Keperluan Bayi \u0026 Anak",
                             "tiers":  [
                                           {
                                               "price":  24500,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "B03028",
                             "name":  "TISU BASAH MITU 1ST GIRL 4\u0027S @12",
                             "retailPrice":  24500,
                             "price":  24500,
                             "description":  "Merk: Mitu. Jenis: Tisu Basah. Varian: 1st Girl. Isi: 4\u0027s. Isi kemasan: 12 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  60
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-221",
                             "category":  "Keperluan Bayi \u0026 Anak",
                             "tiers":  [
                                           {
                                               "price":  18250,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "B03027",
                             "name":  "TISU BASAH MITU TWIN 4\u0027S @12",
                             "retailPrice":  18250,
                             "price":  18250,
                             "description":  "Merk: Mitu. Jenis: Tisu Basah. Tipe: Twin. Isi: 4\u0027s. Isi kemasan: 12 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  61
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-222",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  9020,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "1804250001",
                             "name":  "PAPAYA BY MAYMAYA BESAR 135GR @96",
                             "retailPrice":  9020,
                             "price":  9020,
                             "description":  "Merk: Maymaya. Jenis: Papaya. Ukuran: Besar. Berat: 135 gram. Isi: 96 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  62
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-223",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  5625,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pcs",
                             "sku":  "B03513",
                             "name":  "PAPAYA BY MAYMAYA KECIL 70GR @PCS",
                             "retailPrice":  5625,
                             "price":  5625,
                             "description":  "Merk: Maymaya. Jenis: Papaya. Ukuran: Kecil. Berat: 70 gram",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  63
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-224",
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  15750,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "1204250001",
                             "name":  "PAPAYE FACEWASH SCRUB LECORA 110ML @PCS",
                             "retailPrice":  15750,
                             "price":  15750,
                             "description":  "Merk: Lecora. Jenis: Papaye Facewash Scrub. Volume: 110 ml",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  64
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-225",
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  13500,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "B00833",
                             "name":  "PAPER CLIP NO.3 ESENLON @50",
                             "retailPrice":  13500,
                             "price":  13500,
                             "description":  "Jenis: Paper Clip. Ukuran: No.3. Merk: Esenlon. Isi: 50 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  65
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-226",
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  13500,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "B06925",
                             "name":  "PAPER CLIP NO.3 ESTIKA @50",
                             "retailPrice":  13500,
                             "price":  13500,
                             "description":  "Jenis: Paper Clip. Ukuran: No.3. Merk: Estika. Isi: 50 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  66
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-227",
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  31500,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "B03885",
                             "name":  "PAPER CLIP WINSTA (12SET) @48",
                             "retailPrice":  31500,
                             "price":  31500,
                             "description":  "Jenis: Paper Clip. Merk: Winsta. Isi: 12 set. Jumlah: 48 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  67
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-228",
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  17750,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "B02102",
                             "name":  "PAPER CLIP WRN TOYKO @24",
                             "retailPrice":  17750,
                             "price":  17750,
                             "description":  "Jenis: Paper Clip. Warna: Warna-warni. Merk: Toyko. Isi: 24 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  68
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-229",
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  34000,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pcs",
                             "sku":  "B05497",
                             "name":  "PAPER: FASTENER COLOR",
                             "retailPrice":  34000,
                             "price":  34000,
                             "description":  "Jenis: Paper Fastener. Warna: Color",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  69
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-230",
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  7500,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "B04710",
                             "name":  "PAPER FASTENER WHITE @100",
                             "retailPrice":  7500,
                             "price":  7500,
                             "description":  "Jenis: Paper Fastener. Warna: Putih. Isi: 100 pcs",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  70
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-231",
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  8250,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pcs",
                             "sku":  "B04709",
                             "name":  "PAPER GET 5070 (3T)",
                             "retailPrice":  8250,
                             "price":  8250,
                             "description":  "Jenis: Paper Get. Kode: 5070. Ukuran: 3T",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1585336261026-7f897b6a4163?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  71
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-232",
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  42000,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pcs",
                             "sku":  "B07045",
                             "name":  "PAPER GIFT METAL (A)",
                             "retailPrice":  42000,
                             "price":  42000,
                             "description":  "Jenis: Paper Gift. Material: Metal. Tipe: A",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1585336261026-7f897b6a4163?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  72
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-233",
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  52500,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pcs",
                             "sku":  "B07058",
                             "name":  "PAPER CLIP KENKO NO.1",
                             "retailPrice":  52500,
                             "price":  52500,
                             "description":  "Jenis: Paper Clip. Merk: Kenko. Ukuran: No.1",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  73
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-234",
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  12500,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pcs",
                             "sku":  "B02637",
                             "name":  "PAPERCLIP :KENKO NO.3",
                             "retailPrice":  12500,
                             "price":  12500,
                             "description":  "Jenis: Paper Clip. Merk: Kenko. Ukuran: No.3",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  74
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-235",
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  8750,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pcs",
                             "sku":  "B02638",
                             "name":  "PAPERCLIP KENKO NO.5",
                             "retailPrice":  8750,
                             "price":  8750,
                             "description":  "Jenis: Paper Clip. Merk: Kenko. Ukuran: No.5",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  75
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-236",
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  44000,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "B02193",
                             "name":  "PAPERCLIP WRN VAN-ART",
                             "retailPrice":  44000,
                             "price":  44000,
                             "description":  "Jenis: Paper Clip. Warna: Warna-warni. Merk: Van-Art",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1585336261026-7f897b6a4163?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  76
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-237",
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  725000,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pcs",
                             "sku":  "B03909",
                             "name":  "PARANET 3MX100M KOKI",
                             "retailPrice":  725000,
                             "price":  725000,
                             "description":  "Jenis: Paranet. Ukuran: 3 m Ã— 100 m. Merk: Koki",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1585336261026-7f897b6a4163?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  77
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-238",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  15000,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "B06218",
                             "name":  "SOFTEX BEARY COOL 23CM WING 14P @PAK",
                             "retailPrice":  15000,
                             "price":  15000,
                             "description":  "Jenis: Softex. Varian: Beary Cool. Ukuran: 23 cm. Tipe: Wing. Isi: 14P. Satuan: Pak",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  78
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-239",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  15000,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "108260017",
                             "name":  "SOFTEX BEARY COOL NIGHT 23CM WING 14P @PAK",
                             "retailPrice":  15000,
                             "price":  15000,
                             "description":  "Jenis: Softex. Varian: Beary Cool Night. Ukuran: 23 cm. Tipe: Wing. Isi: 14P. Satuan: Pak",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  79
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-240",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  15000,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "108260015",
                             "name":  "SOFTEX BEARY COOL NIGHT 36CM WING @PAK",
                             "retailPrice":  15000,
                             "price":  15000,
                             "description":  "Jenis: Softex. Varian: Beary Cool Night. Ukuran: 36 cm. Tipe: Wing. Satuan: Pak",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  80
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-241",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  9000,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "108260016",
                             "name":  "SOFTEX COMFORT NIGHT AB L 29CM WING @PAK",
                             "retailPrice":  9000,
                             "price":  9000,
                             "description":  "Jenis: Softex. Varian: Comfort Night AB. Ukuran: L, 29 cm. Tipe: Wing. Satuan: Pak",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  81
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-242",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  23000,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "108260022",
                             "name":  "SOFTEX COMFORT NIGHT ABL 42CM WING @PAK",
                             "retailPrice":  23000,
                             "price":  23000,
                             "description":  "Jenis: Softex. Varian: Comfort Night ABL. Ukuran: 42 cm. Tipe: Wing. Satuan: Pak",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  82
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-243",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  21750,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Rtg",
                             "sku":  "108260013",
                             "name":  "SOFTEX COMFORT NIGHT ABL 29CM 2P @PAK",
                             "retailPrice":  21750,
                             "price":  21750,
                             "description":  "Jenis: Softex. Varian: Comfort Night ABL. Ukuran: 29 cm. Isi: 2P. Satuan: Pak",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  83
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-244",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  21750,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Rtg",
                             "sku":  "303260004",
                             "name":  "SOFTEX COMFORT NIGHT ABL 36CM WING @PAK",
                             "retailPrice":  21750,
                             "price":  21750,
                             "description":  "Jenis: Softex. Varian: Comfort Night ABL. Ukuran: 36 cm. Tipe: Wing. Satuan: Pak",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  84
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-245",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  16000,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "303260003",
                             "name":  "SOFTEX DAUN SIRIH 23CM 10P @PAK",
                             "retailPrice":  16000,
                             "price":  16000,
                             "description":  "Jenis: Softex. Varian: Daun Sirih. Ukuran: 23 cm. Isi: 10P. Satuan: Pak",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  85
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-246",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  13250,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "108260014",
                             "name":  "SOFTEX DAUN SIRIH 23CM WING 20P @PAK",
                             "retailPrice":  13250,
                             "price":  13250,
                             "description":  "Jenis: Softex. Varian: Daun Sirih. Ukuran: 23 cm. Tipe: Wing. Isi: 20P. Satuan: Pak",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  86
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-247",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  17000,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "108260019",
                             "name":  "SOFTEX DAUN SIRIH 29CM WING 8P @PAK",
                             "retailPrice":  17000,
                             "price":  17000,
                             "description":  "Jenis: Softex. Varian: Daun Sirih. Ukuran: 29 cm. Tipe: Wing. Isi: 8P. Satuan: Pak",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  87
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-248",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  20000,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "108260018",
                             "name":  "SOFTEX DAUN SIRIH 29CM WING 6P @PAK",
                             "retailPrice":  20000,
                             "price":  20000,
                             "description":  "Jenis: Softex. Varian: Daun Sirih. Ukuran: 29 cm. Tipe: Wing. Isi: 6P. Satuan: Pak",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  88
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-249",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  9650,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "108260021",
                             "name":  "SOFTEX DAUN SIRIH PANTY LINER @PAK",
                             "retailPrice":  9650,
                             "price":  9650,
                             "description":  "Jenis: Softex. Varian: Daun Sirih. Jenis: Panty Liner. Satuan: Pak",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  89
                         },
                         {
                             "badge":  "",
                             "id":  "SHOP-250",
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  16000,
                                               "minQty":  1,
                                               "label":  "Harga Grosir Satuan",
                                               "maxQty":  99999
                                           }
                                       ],
                             "unit":  "Pack",
                             "sku":  "108260020",
                             "name":  "SOFTEX DAUN SIRIH PANTYLINER LONG @PAK",
                             "retailPrice":  16000,
                             "price":  16000,
                             "description":  "Jenis: Softex. Varian: Daun Sirih. Jenis: Pantyliner Long. Satuan: Pak",
                             "minOrder":  1,
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "stock":  90
                         }
                     ],
    "wmsLogs":  [
                    {
                        "sku":  "1905260001",
                        "id":  "LOG-001",
                        "type":  "INBOUND",
                        "qty":  "+120 Pack",
                        "refDoc":  "PO-UMKM-001",
                        "notes":  "Penerimaan stok UMKM grosir",
                        "date":  "2026-09-02 08:30",
                        "operator":  "Staff Inbound",
                        "itemName":  "BLASTOZ COKLAT ARTA @6"
                    }
                ]
};

