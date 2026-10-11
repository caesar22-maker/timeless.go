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
                               "nextService":  "2026-11-15",
                               "id":  "TOOL-001",
                               "category":  "Security \u0026 Digital",
                               "lastService":  "2026-08-15",
                               "assignedTo":  "Staff Operasional (22 Unit)",
                               "code":  "AST-001",
                               "name":  "CCTV",
                               "specs":  "Kamera pengawas IP/analog, resolusi HD/Full HD, infrared/night vision, dilengkapi DVR/NVR",
                               "brand":  "Standar Operasional Toko Grosir",
                               "status":  "Tersedia",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "purchaseYear":  "2024",
                               "condition":  "Sangat Baik",
                               "image":  "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 22 unit terverifikasi BAIK sesuai data aset."
                                                       }
                                                   ]
                           },
                           {
                               "nextService":  "2026-11-15",
                               "id":  "TOOL-002",
                               "category":  "Heavy Equipment",
                               "lastService":  "2026-08-15",
                               "assignedTo":  "Staff Operasional (1 Unit)",
                               "code":  "AST-002",
                               "name":  "FORKLIFT",
                               "specs":  "Kapasitas angkat Â±2â€“3 ton, tenaga diesel/elektrik, mast hidrolik, garpu adjustable",
                               "brand":  "Standar Operasional Toko Grosir",
                               "status":  "Tersedia",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "purchaseYear":  "2024",
                               "condition":  "Sangat Baik",
                               "image":  "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 1 unit terverifikasi BAIK sesuai data aset."
                                                       }
                                                   ]
                           },
                           {
                               "nextService":  "2026-11-15",
                               "id":  "TOOL-003",
                               "category":  "Warehouse Tool",
                               "lastService":  "2026-08-15",
                               "assignedTo":  "Staff Operasional (10 Unit)",
                               "code":  "AST-003",
                               "name":  "TANGGA GUDANG",
                               "specs":  "Berbahan besi/aluminium, tinggi Â±2â€“4 meter, anak tangga anti-slip, dilengkapi pengaman",
                               "brand":  "Standar Operasional Toko Grosir",
                               "status":  "Tersedia",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "purchaseYear":  "2024",
                               "condition":  "Sangat Baik",
                               "image":  "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 10 unit terverifikasi BAIK sesuai data aset."
                                                       }
                                                   ]
                           },
                           {
                               "nextService":  "2026-11-15",
                               "id":  "TOOL-004",
                               "category":  "Storage \u0026 Racking",
                               "lastService":  "2026-08-15",
                               "assignedTo":  "Staff Operasional (70 Unit)",
                               "code":  "AST-004",
                               "name":  "RAK",
                               "specs":  "Rak penyimpanan berbahan baja, kapasitas Â±200â€“500 kg/level, tinggi dan susunan rak dapat disesuaikan",
                               "brand":  "Standar Operasional Toko Grosir",
                               "status":  "Tersedia",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "purchaseYear":  "2024",
                               "condition":  "Sangat Baik",
                               "image":  "https://images.unsplash.com/photo-1586528116493-a029325540fa?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 70 unit terverifikasi BAIK sesuai data aset."
                                                       }
                                                   ]
                           },
                           {
                               "nextService":  "2026-11-15",
                               "id":  "TOOL-005",
                               "category":  "Handling Tool",
                               "lastService":  "2026-08-15",
                               "assignedTo":  "Staff Operasional (100 Unit)",
                               "code":  "AST-005",
                               "name":  "PALLET",
                               "specs":  "Berbahan plastik/kayu, ukuran Â±110 Ã— 110 cm, kapasitas beban sesuai kebutuhan gudang",
                               "brand":  "Standar Operasional Toko Grosir",
                               "status":  "Tersedia",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "purchaseYear":  "2024",
                               "condition":  "Sangat Baik",
                               "image":  "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 100 unit terverifikasi BAIK sesuai data aset."
                                                       }
                                                   ]
                           },
                           {
                               "nextService":  "2026-11-15",
                               "id":  "TOOL-006",
                               "category":  "Office \u0026 Admin",
                               "lastService":  "2026-08-15",
                               "assignedTo":  "Staff Operasional (28 Unit)",
                               "code":  "AST-006",
                               "name":  "PAPAN TULIS",
                               "specs":  "Whiteboard, permukaan melamin/porcelain, ukuran Â±120 Ã— 240 cm, dilengkapi frame",
                               "brand":  "Standar Operasional Toko Grosir",
                               "status":  "Tersedia",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "purchaseYear":  "2024",
                               "condition":  "Sangat Baik",
                               "image":  "https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 28 unit terverifikasi BAIK sesuai data aset."
                                                       }
                                                   ]
                           },
                           {
                               "nextService":  "2026-11-15",
                               "id":  "TOOL-007",
                               "category":  "Display \u0026 Shop",
                               "lastService":  "2026-08-15",
                               "assignedTo":  "Staff Operasional (13 Unit)",
                               "code":  "AST-007",
                               "name":  "ETALASE",
                               "specs":  "Etalase kaca dengan rangka aluminium/besi, beberapa tingkat/rak, digunakan untuk display barang",
                               "brand":  "Standar Operasional Toko Grosir",
                               "status":  "Tersedia",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "purchaseYear":  "2024",
                               "condition":  "Sangat Baik",
                               "image":  "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 13 unit terverifikasi BAIK sesuai data aset."
                                                       }
                                                   ]
                           },
                           {
                               "nextService":  "2026-11-15",
                               "id":  "TOOL-008",
                               "category":  "IT \u0026 Digital",
                               "lastService":  "2026-08-15",
                               "assignedTo":  "Staff Operasional (8 Unit)",
                               "code":  "AST-008",
                               "name":  "PC",
                               "specs":  "Processor minimal Core i3/Ryzen 3, RAM â‰¥8 GB, SSD â‰¥256 GB, dilengkapi sistem operasi",
                               "brand":  "Standar Operasional Toko Grosir",
                               "status":  "Tersedia",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "purchaseYear":  "2024",
                               "condition":  "Sangat Baik",
                               "image":  "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 8 unit terverifikasi BAIK sesuai data aset."
                                                       }
                                                   ]
                           },
                           {
                               "nextService":  "2026-11-15",
                               "id":  "TOOL-009",
                               "category":  "IT \u0026 Digital",
                               "lastService":  "2026-08-15",
                               "assignedTo":  "Staff Operasional (4 Unit)",
                               "code":  "AST-009",
                               "name":  "SCANNER BARCODE",
                               "specs":  "Barcode scanner USB, teknologi laser/CCD/imager, mendukung barcode 1D/2D",
                               "brand":  "Standar Operasional Toko Grosir",
                               "status":  "Tersedia",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "purchaseYear":  "2024",
                               "condition":  "Sangat Baik",
                               "image":  "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 4 unit terverifikasi BAIK sesuai data aset."
                                                       }
                                                   ]
                           },
                           {
                               "nextService":  "2026-11-15",
                               "id":  "TOOL-010",
                               "category":  "Material Handling",
                               "lastService":  "2026-08-15",
                               "assignedTo":  "Staff Operasional (3 Unit)",
                               "code":  "AST-010",
                               "name":  "TROLLI L",
                               "specs":  "Troli model L, rangka besi, roda caster, kapasitas Â±200â€“300 kg",
                               "brand":  "Standar Operasional Toko Grosir",
                               "status":  "Tersedia",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "purchaseYear":  "2024",
                               "condition":  "Sangat Baik",
                               "image":  "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 3 unit terverifikasi BAIK sesuai data aset."
                                                       }
                                                   ]
                           },
                           {
                               "nextService":  "2026-11-15",
                               "id":  "TOOL-011",
                               "category":  "Material Handling",
                               "lastService":  "2026-08-15",
                               "assignedTo":  "Staff Operasional (20 Unit)",
                               "code":  "AST-011",
                               "name":  "TROLLI DORONG",
                               "specs":  "Troli dorong manual, rangka besi, 4 roda caster, kapasitas Â±300â€“500 kg",
                               "brand":  "Standar Operasional Toko Grosir",
                               "status":  "Tersedia",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "purchaseYear":  "2024",
                               "condition":  "Sangat Baik",
                               "image":  "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 20 unit terverifikasi BAIK sesuai data aset."
                                                       }
                                                   ]
                           },
                           {
                               "nextService":  "2026-11-15",
                               "id":  "TOOL-012",
                               "category":  "Material Handling",
                               "lastService":  "2026-08-15",
                               "assignedTo":  "Staff Operasional (50 Unit)",
                               "code":  "AST-012",
                               "name":  "TROLLI TARIK",
                               "specs":  "Troli tarik manual, rangka baja, dilengkapi pegangan/towing handle, kapasitas Â±500â€“1.000 kg",
                               "brand":  "Standar Operasional Toko Grosir",
                               "status":  "Tersedia",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "purchaseYear":  "2024",
                               "condition":  "Sangat Baik",
                               "image":  "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 50 unit terverifikasi BAIK sesuai data aset."
                                                       }
                                                   ]
                           },
                           {
                               "nextService":  "2026-11-15",
                               "id":  "TOOL-013",
                               "category":  "Fleet \u0026 Delivery",
                               "lastService":  "2026-08-15",
                               "assignedTo":  "Staff Operasional (4 Unit)",
                               "code":  "AST-013",
                               "name":  "MOBIL BOX KECIL",
                               "specs":  "Kendaraan box ringan, bak tertutup, kapasitas muatan Â±700â€“1.000 kg",
                               "brand":  "Standar Operasional Toko Grosir",
                               "status":  "Tersedia",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "purchaseYear":  "2024",
                               "condition":  "Sangat Baik",
                               "image":  "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 4 unit terverifikasi BAIK sesuai data aset."
                                                       }
                                                   ]
                           },
                           {
                               "nextService":  "2026-11-15",
                               "id":  "TOOL-014",
                               "category":  "Fleet \u0026 Delivery",
                               "lastService":  "2026-08-15",
                               "assignedTo":  "Staff Operasional (2 Unit)",
                               "code":  "AST-014",
                               "name":  "TRUK LONG",
                               "specs":  "Truk bak panjang/long chassis, kapasitas muatan Â±4â€“6 ton",
                               "brand":  "Standar Operasional Toko Grosir",
                               "status":  "Tersedia",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "purchaseYear":  "2024",
                               "condition":  "Sangat Baik",
                               "image":  "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 2 unit terverifikasi BAIK sesuai data aset."
                                                       }
                                                   ]
                           },
                           {
                               "nextService":  "2026-11-15",
                               "id":  "TOOL-015",
                               "category":  "Facility \u0026 Utility",
                               "lastService":  "2026-08-15",
                               "assignedTo":  "Staff Operasional (3 Unit)",
                               "code":  "AST-015",
                               "name":  "KIPAS ANGIN",
                               "specs":  "Kipas angin industrial, diameter Â±18â€“24 inch, motor listrik, beberapa pilihan kecepatan",
                               "brand":  "Standar Operasional Toko Grosir",
                               "status":  "Tersedia",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "purchaseYear":  "2024",
                               "condition":  "Sangat Baik",
                               "image":  "https://images.unsplash.com/photo-1594818379496-da1e345b0ded?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 3 unit terverifikasi BAIK sesuai data aset."
                                                       }
                                                   ]
                           },
                           {
                               "nextService":  "2026-11-15",
                               "id":  "TOOL-016",
                               "category":  "Cleaning Tools",
                               "lastService":  "2026-08-15",
                               "assignedTo":  "Staff Operasional (8 Unit)",
                               "code":  "AST-016",
                               "name":  "SAPU",
                               "specs":  "Gagang besi/plastik, kepala sapu berbahan nilon, panjang Â±120 cm, untuk area gudang dan kantor",
                               "brand":  "Standar Operasional Toko Grosir",
                               "status":  "Tersedia",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "purchaseYear":  "2024",
                               "condition":  "Sangat Baik",
                               "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 8 unit terverifikasi BAIK sesuai data aset."
                                                       }
                                                   ]
                           },
                           {
                               "nextService":  "2026-11-15",
                               "id":  "TOOL-017",
                               "category":  "Cleaning Tools",
                               "lastService":  "2026-08-15",
                               "assignedTo":  "Staff Operasional (3 Unit)",
                               "code":  "AST-017",
                               "name":  "PEL",
                               "specs":  "Gagang besi/plastik, kepala pel microfiber/katun, panjang Â±120 cm, cocok untuk berbagai jenis lantai",
                               "brand":  "Standar Operasional Toko Grosir",
                               "status":  "Tersedia",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "purchaseYear":  "2024",
                               "condition":  "Sangat Baik",
                               "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 3 unit terverifikasi BAIK sesuai data aset."
                                                       }
                                                   ]
                           },
                           {
                               "nextService":  "2026-11-15",
                               "id":  "TOOL-018",
                               "category":  "Cleaning Tools",
                               "lastService":  "2026-08-15",
                               "assignedTo":  "Staff Operasional (4 Unit)",
                               "code":  "AST-018",
                               "name":  "PENGKI",
                               "specs":  "Berbahan plastik kuat, kapasitas Â±10â€“20 liter, dilengkapi pegangan, untuk mengangkat sampah dan kotoran",
                               "brand":  "Standar Operasional Toko Grosir",
                               "status":  "Tersedia",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "purchaseYear":  "2024",
                               "condition":  "Sangat Baik",
                               "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 4 unit terverifikasi BAIK sesuai data aset."
                                                       }
                                                   ]
                           },
                           {
                               "nextService":  "2026-11-15",
                               "id":  "TOOL-019",
                               "category":  "Digital \u0026 Shop",
                               "lastService":  "2026-08-15",
                               "assignedTo":  "Staff Operasional (1 Unit)",
                               "code":  "AST-019",
                               "name":  "LED DISPLAY",
                               "specs":  "LED Display, ukuran Â±32â€“55 inch, resolusi minimal Full HD (1920 Ã— 1080), teknologi LED, tingkat kecerahan Â±300â€“500 cd/mÂ², rasio aspek 16:9, input HDMI/USB",
                               "brand":  "Standar Operasional Toko Grosir",
                               "status":  "Tersedia",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "purchaseYear":  "2024",
                               "condition":  "Sangat Baik",
                               "image":  "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 1 unit terverifikasi BAIK sesuai data aset."
                                                       }
                                                   ]
                           },
                           {
                               "nextService":  "2026-11-15",
                               "id":  "TOOL-020",
                               "category":  "Facility \u0026 Utility",
                               "lastService":  "2026-08-15",
                               "assignedTo":  "Staff Operasional (2 Unit)",
                               "code":  "AST-020",
                               "name":  "TEMPAT SAMPAH",
                               "specs":  "Berbahan plastik, kapasitas Â±20â€“50 liter, dilengkapi tutup/pegangan, mudah dibersihkan",
                               "brand":  "Standar Operasional Toko Grosir",
                               "status":  "Tersedia",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "purchaseYear":  "2024",
                               "condition":  "Sangat Baik",
                               "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 2 unit terverifikasi BAIK sesuai data aset."
                                                       }
                                                   ]
                           },
                           {
                               "nextService":  "2026-11-15",
                               "id":  "TOOL-021",
                               "category":  "Facility \u0026 Storage",
                               "lastService":  "2026-08-15",
                               "assignedTo":  "Staff Operasional (5 Unit)",
                               "code":  "AST-021",
                               "name":  "LOKER",
                               "specs":  "Loker besi, Â±6â€“12 pintu, dilengkapi kunci, ventilasi dan label nama",
                               "brand":  "Standar Operasional Toko Grosir",
                               "status":  "Tersedia",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "purchaseYear":  "2024",
                               "condition":  "Sangat Baik",
                               "image":  "https://images.unsplash.com/photo-1590496793929-36417d3117de?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 5 unit terverifikasi BAIK sesuai data aset."
                                                       }
                                                   ]
                           },
                           {
                               "nextService":  "2026-11-15",
                               "id":  "TOOL-022",
                               "category":  "Safety Equipment",
                               "lastService":  "2026-08-15",
                               "assignedTo":  "Staff Operasional (3 Unit)",
                               "code":  "AST-022",
                               "name":  "APAR",
                               "specs":  "Alat pemadam api ringan, media powder/CO2/foam, kapasitas Â±3â€“6 kg, dilengkapi bracket",
                               "brand":  "Standar Operasional Toko Grosir",
                               "status":  "Tersedia",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "purchaseYear":  "2024",
                               "condition":  "Sangat Baik",
                               "image":  "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 3 unit terverifikasi BAIK sesuai data aset."
                                                       }
                                                   ]
                           },
                           {
                               "nextService":  "2026-11-15",
                               "id":  "TOOL-023",
                               "category":  "Office Furniture",
                               "lastService":  "2026-08-15",
                               "assignedTo":  "Staff Operasional (8 Unit)",
                               "code":  "AST-023",
                               "name":  "KURSI",
                               "specs":  "Kursi kerja/tunggu, rangka besi/plastik, dudukan ergonomis, kuat dan nyaman digunakan",
                               "brand":  "Standar Operasional Toko Grosir",
                               "status":  "Tersedia",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "purchaseYear":  "2024",
                               "condition":  "Sangat Baik",
                               "image":  "https://images.unsplash.com/photo-1580481077197-28d098e945c1?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 8 unit terverifikasi BAIK sesuai data aset."
                                                       }
                                                   ]
                           },
                           {
                               "nextService":  "2026-11-15",
                               "id":  "TOOL-024",
                               "category":  "Office Furniture",
                               "lastService":  "2026-08-15",
                               "assignedTo":  "Staff Operasional (8 Unit)",
                               "code":  "AST-024",
                               "name":  "MEJA",
                               "specs":  "Meja kerja berbahan kayu/metal, ukuran Â±120 Ã— 60 Ã— 75 cm, permukaan kerja kuat dan mudah dibersihkan",
                               "brand":  "Standar Operasional Toko Grosir",
                               "status":  "Tersedia",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "purchaseYear":  "2024",
                               "condition":  "Sangat Baik",
                               "image":  "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 8 unit terverifikasi BAIK sesuai data aset."
                                                       }
                                                   ]
                           },
                           {
                               "nextService":  "2026-11-15",
                               "id":  "TOOL-025",
                               "category":  "Material Handling",
                               "lastService":  "2026-08-15",
                               "assignedTo":  "Staff Operasional (3 Unit)",
                               "code":  "AST-025",
                               "name":  "HAND PALLET",
                               "specs":  "Kapasitas Â±2â€“3 ton, panjang fork Â±1.150 mm, sistem hidrolik manual",
                               "brand":  "Standar Operasional Toko Grosir",
                               "status":  "Tersedia",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "purchaseYear":  "2024",
                               "condition":  "Sangat Baik",
                               "image":  "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 3 unit terverifikasi BAIK sesuai data aset."
                                                       }
                                                   ]
                           },
                           {
                               "nextService":  "2026-11-15",
                               "id":  "TOOL-026",
                               "category":  "Facility \u0026 Storage",
                               "lastService":  "2026-08-15",
                               "assignedTo":  "Staff Operasional (2 Unit)",
                               "code":  "AST-026",
                               "name":  "GANTUNGAN",
                               "specs":  "Gantungan berbahan besi/stainless, dilengkapi hook, digunakan untuk menggantung alat atau barang",
                               "brand":  "Standar Operasional Toko Grosir",
                               "status":  "Tersedia",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "purchaseYear":  "2024",
                               "condition":  "Sangat Baik",
                               "image":  "https://images.unsplash.com/photo-1586528116493-a029325540fa?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 2 unit terverifikasi BAIK sesuai data aset."
                                                       }
                                                   ]
                           },
                           {
                               "nextService":  "2026-11-15",
                               "id":  "TOOL-027",
                               "category":  "Electrical \u0026 Utility",
                               "lastService":  "2026-08-15",
                               "assignedTo":  "Staff Operasional (25 Unit)",
                               "code":  "AST-027",
                               "name":  "SAKLAR",
                               "specs":  "Saklar listrik AC 220â€“250 V, 1/2 gang, material tahan panas, sesuai standar SNI",
                               "brand":  "Standar Operasional Toko Grosir",
                               "status":  "Tersedia",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "purchaseYear":  "2024",
                               "condition":  "Sangat Baik",
                               "image":  "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 25 unit terverifikasi BAIK sesuai data aset."
                                                       }
                                                   ]
                           },
                           {
                               "nextService":  "2026-11-15",
                               "id":  "TOOL-028",
                               "category":  "Electrical \u0026 Utility",
                               "lastService":  "2026-08-15",
                               "assignedTo":  "Staff Operasional (20 Unit)",
                               "code":  "AST-028",
                               "name":  "LAMPU",
                               "specs":  "Lampu LED, daya Â±18â€“50 watt, tegangan 220 V, untuk penerangan area gudang",
                               "brand":  "Standar Operasional Toko Grosir",
                               "status":  "Tersedia",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "purchaseYear":  "2024",
                               "condition":  "Sangat Baik",
                               "image":  "https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 20 unit terverifikasi BAIK sesuai data aset."
                                                       }
                                                   ]
                           },
                           {
                               "nextService":  "2026-11-15",
                               "id":  "TOOL-029",
                               "category":  "Electrical \u0026 Utility",
                               "lastService":  "2026-08-15",
                               "assignedTo":  "Staff Operasional (10 Unit)",
                               "code":  "AST-029",
                               "name":  "KABEL ROLL",
                               "specs":  "Kabel roll panjang Â±15â€“50 meter, dilengkapi reel, stop kontak dan thermal protection",
                               "brand":  "Standar Operasional Toko Grosir",
                               "status":  "Tersedia",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "purchaseYear":  "2024",
                               "condition":  "Sangat Baik",
                               "image":  "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 10 unit terverifikasi BAIK sesuai data aset."
                                                       }
                                                   ]
                           },
                           {
                               "nextService":  "2026-11-15",
                               "id":  "TOOL-030",
                               "category":  "Heavy Utility",
                               "lastService":  "2026-08-15",
                               "assignedTo":  "Staff Operasional (1 Unit)",
                               "code":  "AST-030",
                               "name":  "GENSET",
                               "specs":  "Generator diesel/bensin, kapasitas Â±5â€“10 kVA, output 220 V, dilengkapi panel kontrol",
                               "brand":  "Standar Operasional Toko Grosir",
                               "status":  "Tersedia",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "purchaseYear":  "2024",
                               "condition":  "Sangat Baik",
                               "image":  "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 1 unit terverifikasi BAIK sesuai data aset."
                                                       }
                                                   ]
                           },
                           {
                               "nextService":  "2026-11-15",
                               "id":  "TOOL-031",
                               "category":  "Safety \u0026 Medical",
                               "lastService":  "2026-08-15",
                               "assignedTo":  "Staff Operasional (1 Unit)",
                               "code":  "AST-031",
                               "name":  "P3K",
                               "specs":  "Kotak P3K berisi kasa steril, plester, perban, antiseptik, sarung tangan dan perlengkapan pertolongan pertama",
                               "brand":  "Standar Operasional Toko Grosir",
                               "status":  "Tersedia",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "purchaseYear":  "2024",
                               "condition":  "Sangat Baik",
                               "image":  "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 1 unit terverifikasi BAIK sesuai data aset."
                                                       }
                                                   ]
                           },
                           {
                               "nextService":  "2026-11-15",
                               "id":  "TOOL-032",
                               "category":  "IT \u0026 Digital",
                               "lastService":  "2026-08-15",
                               "assignedTo":  "Staff Operasional (8 Unit)",
                               "code":  "AST-032",
                               "name":  "MONITOR",
                               "specs":  "Monitor LED/LCD, ukuran Â±22â€“24 inch, resolusi Full HD, koneksi HDMI/VGA",
                               "brand":  "Standar Operasional Toko Grosir",
                               "status":  "Tersedia",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "purchaseYear":  "2024",
                               "condition":  "Sangat Baik",
                               "image":  "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 8 unit terverifikasi BAIK sesuai data aset."
                                                       }
                                                   ]
                           },
                           {
                               "nextService":  "2026-11-15",
                               "id":  "TOOL-033",
                               "category":  "IT \u0026 Digital",
                               "lastService":  "2026-08-15",
                               "assignedTo":  "Staff Operasional (8 Unit)",
                               "code":  "AST-033",
                               "name":  "KEYBOARD",
                               "specs":  "Keyboard USB, layout QWERTY, koneksi kabel, kompatibel dengan PC",
                               "brand":  "Standar Operasional Toko Grosir",
                               "status":  "Tersedia",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "purchaseYear":  "2024",
                               "condition":  "Sangat Baik",
                               "image":  "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 8 unit terverifikasi BAIK sesuai data aset."
                                                       }
                                                   ]
                           },
                           {
                               "nextService":  "2026-11-15",
                               "id":  "TOOL-034",
                               "category":  "IT \u0026 Digital",
                               "lastService":  "2026-08-15",
                               "assignedTo":  "Staff Operasional (8 Unit)",
                               "code":  "AST-034",
                               "name":  "MOUSE",
                               "specs":  "Mouse USB optik, minimal 3 tombol, resolusi sensor Â±800â€“1600 DPI",
                               "brand":  "Standar Operasional Toko Grosir",
                               "status":  "Tersedia",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "purchaseYear":  "2024",
                               "condition":  "Sangat Baik",
                               "image":  "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 8 unit terverifikasi BAIK sesuai data aset."
                                                       }
                                                   ]
                           },
                           {
                               "nextService":  "2026-11-15",
                               "id":  "TOOL-035",
                               "category":  "Fleet \u0026 Delivery",
                               "lastService":  "2026-08-15",
                               "assignedTo":  "Staff Operasional (1 Unit)",
                               "code":  "AST-035",
                               "name":  "TOSA",
                               "specs":  "Kendaraan/alat operasional roda 3 untuk pengangkutan barang, kapasitas disesuaikan",
                               "brand":  "Standar Operasional Toko Grosir",
                               "status":  "Tersedia",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "purchaseYear":  "2024",
                               "condition":  "Sangat Baik",
                               "image":  "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 1 unit terverifikasi BAIK sesuai data aset."
                                                       }
                                                   ]
                           },
                           {
                               "nextService":  "2026-11-15",
                               "id":  "TOOL-036",
                               "category":  "Fleet \u0026 Delivery",
                               "lastService":  "2026-08-15",
                               "assignedTo":  "Staff Operasional (3 Unit)",
                               "code":  "AST-036",
                               "name":  "GRANDMAX",
                               "specs":  "Kendaraan operasional/angkutan barang, mesin bensin Â±1,3â€“1,5 L, tipe bak/box sesuai kebutuhan",
                               "brand":  "Standar Operasional Toko Grosir",
                               "status":  "Tersedia",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "purchaseYear":  "2024",
                               "condition":  "Sangat Baik",
                               "image":  "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 3 unit terverifikasi BAIK sesuai data aset."
                                                       }
                                                   ]
                           },
                           {
                               "nextService":  "2026-11-15",
                               "id":  "TOOL-037",
                               "category":  "Electrical \u0026 Utility",
                               "lastService":  "2026-08-15",
                               "assignedTo":  "Staff Operasional (7 Unit)",
                               "code":  "AST-037",
                               "name":  "LAMPU LED NEON PANJANG",
                               "specs":  "Lampu LED tube/neon panjang, daya Â±18â€“40 watt, tegangan 220 V, panjang Â±60â€“120 cm, cahaya putih",
                               "brand":  "Standar Operasional Toko Grosir",
                               "status":  "Tersedia",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "purchaseYear":  "2024",
                               "condition":  "Sangat Baik",
                               "image":  "https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 7 unit terverifikasi BAIK sesuai data aset."
                                                       }
                                                   ]
                           },
                           {
                               "nextService":  "2026-11-15",
                               "id":  "TOOL-038",
                               "category":  "Storage \u0026 Racking",
                               "lastService":  "2026-08-15",
                               "assignedTo":  "Staff Operasional (5 Unit)",
                               "code":  "AST-038",
                               "name":  "RAK GANTUNG",
                               "specs":  "Rak gantung berbahan besi/baja, dilengkapi bracket pengait, kapasitas Â±20â€“50 kg per tingkat",
                               "brand":  "Standar Operasional Toko Grosir",
                               "status":  "Tersedia",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "purchaseYear":  "2024",
                               "condition":  "Sangat Baik",
                               "image":  "https://images.unsplash.com/photo-1586528116493-a029325540fa?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 5 unit terverifikasi BAIK sesuai data aset."
                                                       }
                                                   ]
                           },
                           {
                               "nextService":  "2026-11-15",
                               "id":  "TOOL-039",
                               "category":  "Packing \u0026 Tools",
                               "lastService":  "2026-08-15",
                               "assignedTo":  "Staff Operasional (15 Unit)",
                               "code":  "AST-039",
                               "name":  "GUNTING",
                               "specs":  "Gunting berbahan stainless steel, ukuran Â±7â€“10 inch, pegangan ergonomis, tajam dan tahan karat",
                               "brand":  "Standar Operasional Toko Grosir",
                               "status":  "Tersedia",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "purchaseYear":  "2024",
                               "condition":  "Sangat Baik",
                               "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 15 unit terverifikasi BAIK sesuai data aset."
                                                       }
                                                   ]
                           },
                           {
                               "nextService":  "2026-11-15",
                               "id":  "TOOL-040",
                               "category":  "Packaging Tools",
                               "lastService":  "2026-08-15",
                               "assignedTo":  "Staff Operasional (10 Unit)",
                               "code":  "AST-040",
                               "name":  "LAKBAN",
                               "specs":  "Lakban perekat berbahan polypropylene, lebar Â±48â€“60 mm, panjang Â±50â€“100 meter, daya rekat kuat",
                               "brand":  "Standar Operasional Toko Grosir",
                               "status":  "Tersedia",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "purchaseYear":  "2024",
                               "condition":  "Sangat Baik",
                               "image":  "https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 10 unit terverifikasi BAIK sesuai data aset."
                                                       }
                                                   ]
                           },
                           {
                               "nextService":  "2026-11-15",
                               "id":  "TOOL-041",
                               "category":  "Maintenance Tools",
                               "lastService":  "2026-08-15",
                               "assignedTo":  "Staff Operasional (2 Unit)",
                               "code":  "AST-041",
                               "name":  "TOOLBOX SET",
                               "specs":  "Set peralatan kerja dalam toolbox, terdiri dari obeng, tang, kunci pas/ring, kunci socket dan perlengkapan dasar",
                               "brand":  "Standar Operasional Toko Grosir",
                               "status":  "Tersedia",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "purchaseYear":  "2024",
                               "condition":  "Sangat Baik",
                               "image":  "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 2 unit terverifikasi BAIK sesuai data aset."
                                                       }
                                                   ]
                           },
                           {
                               "nextService":  "2026-11-15",
                               "id":  "TOOL-042",
                               "category":  "Storage \u0026 Display",
                               "lastService":  "2026-08-15",
                               "assignedTo":  "Staff Operasional (4 Unit)",
                               "code":  "AST-042",
                               "name":  "PANEL GANTUNG",
                               "specs":  "Panel gantung berbahan besi/plastik berlubang, dilengkapi hook, digunakan untuk penyimpanan alat kerja",
                               "brand":  "Standar Operasional Toko Grosir",
                               "status":  "Tersedia",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "purchaseYear":  "2024",
                               "condition":  "Sangat Baik",
                               "image":  "https://images.unsplash.com/photo-1590496793929-36417d3117de?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 4 unit terverifikasi BAIK sesuai data aset."
                                                       }
                                                   ]
                           },
                           {
                               "nextService":  "2026-11-15",
                               "id":  "TOOL-043",
                               "category":  "Office Furniture",
                               "lastService":  "2026-08-15",
                               "assignedTo":  "Staff Operasional (2 Unit)",
                               "code":  "AST-043",
                               "name":  "KURSI TUNGGU",
                               "specs":  "Kursi tunggu dengan rangka besi, dudukan dan sandaran empuk/plastik, kapasitas Â±2â€“3 orang",
                               "brand":  "Standar Operasional Toko Grosir",
                               "status":  "Tersedia",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "purchaseYear":  "2024",
                               "condition":  "Sangat Baik",
                               "image":  "https://images.unsplash.com/photo-1580481077197-28d098e945c1?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 2 unit terverifikasi BAIK sesuai data aset."
                                                       }
                                                   ]
                           },
                           {
                               "nextService":  "2026-11-15",
                               "id":  "TOOL-044",
                               "category":  "POS \u0026 IT",
                               "lastService":  "2026-08-15",
                               "assignedTo":  "Staff Operasional (4 Unit)",
                               "code":  "AST-044",
                               "name":  "PRINTER STRUK",
                               "specs":  "Printer struk thermal, metode cetak direct thermal, lebar kertas Â±58â€“80 mm, koneksi USB/LAN/Bluetooth",
                               "brand":  "Standar Operasional Toko Grosir",
                               "status":  "Tersedia",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "purchaseYear":  "2024",
                               "condition":  "Sangat Baik",
                               "image":  "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 4 unit terverifikasi BAIK sesuai data aset."
                                                       }
                                                   ]
                           },
                           {
                               "nextService":  "2026-11-15",
                               "id":  "TOOL-045",
                               "category":  "Packing \u0026 Tools",
                               "lastService":  "2026-08-15",
                               "assignedTo":  "Staff Operasional (5 Unit)",
                               "code":  "AST-045",
                               "name":  "CUTTER",
                               "specs":  "Cutter dengan gagang ergonomis, mata pisau stainless/carbon steel, sistem pengunci dan mata pisau dapat diganti",
                               "brand":  "Standar Operasional Toko Grosir",
                               "status":  "Tersedia",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "purchaseYear":  "2024",
                               "condition":  "Sangat Baik",
                               "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 5 unit terverifikasi BAIK sesuai data aset."
                                                       }
                                                   ]
                           },
                           {
                               "nextService":  "2026-11-15",
                               "id":  "TOOL-046",
                               "category":  "Appliance \u0026 Shop",
                               "lastService":  "2026-08-15",
                               "assignedTo":  "Staff Operasional (1 Unit)",
                               "code":  "AST-046",
                               "name":  "KULKAS DISPLAY",
                               "specs":  "Kulkas display dengan pintu kaca transparan, kapasitas Â±300â€“500 liter, sistem pendingin elektrik, suhu Â±2â€“8Â°C, rak adjustable, tegangan 220 V",
                               "brand":  "Standar Operasional Toko Grosir",
                               "status":  "Tersedia",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "purchaseYear":  "2024",
                               "condition":  "Sangat Baik",
                               "image":  "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 1 unit terverifikasi BAIK sesuai data aset."
                                                       }
                                                   ]
                           },
                           {
                               "nextService":  "2026-11-15",
                               "id":  "TOOL-047",
                               "category":  "IT \u0026 Digital",
                               "lastService":  "2026-08-15",
                               "assignedTo":  "Staff Operasional (2 Unit)",
                               "code":  "AST-047",
                               "name":  "PRINTER",
                               "specs":  "Printer inkjet/laser, kecepatan cetak Â±15â€“30 ppm, resolusi hingga 1.200 Ã— 1.200 dpi, koneksi USB/Wi-Fi, mendukung kertas A4",
                               "brand":  "Standar Operasional Toko Grosir",
                               "status":  "Tersedia",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "purchaseYear":  "2024",
                               "condition":  "Sangat Baik",
                               "image":  "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 2 unit terverifikasi BAIK sesuai data aset."
                                                       }
                                                   ]
                           },
                           {
                               "nextService":  "2026-11-15",
                               "id":  "TOOL-048",
                               "category":  "Office Furniture",
                               "lastService":  "2026-08-15",
                               "assignedTo":  "Staff Operasional (4 Unit)",
                               "code":  "AST-048",
                               "name":  "KURSI BAR",
                               "specs":  "Kursi bar dengan rangka besi/kayu, dudukan ergonomis, tinggi dudukan Â±65â€“75 cm, dilengkapi sandaran kaki",
                               "brand":  "Standar Operasional Toko Grosir",
                               "status":  "Tersedia",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "purchaseYear":  "2024",
                               "condition":  "Sangat Baik",
                               "image":  "https://images.unsplash.com/photo-1503602642458-232111445657?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 4 unit terverifikasi BAIK sesuai data aset."
                                                       }
                                                   ]
                           },
                           {
                               "nextService":  "2026-11-15",
                               "id":  "TOOL-049",
                               "category":  "IT \u0026 Network",
                               "lastService":  "2026-08-15",
                               "assignedTo":  "Staff Operasional (4 Unit)",
                               "code":  "AST-049",
                               "name":  "WIFI",
                               "specs":  "Wi-Fi router, dual band 2.4 GHz/5 GHz, kecepatan hingga Â±1.200 Mbps, port LAN/WAN, mendukung standar IEEE 802.11 ac/ax",
                               "brand":  "Standar Operasional Toko Grosir",
                               "status":  "Tersedia",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "purchaseYear":  "2024",
                               "condition":  "Sangat Baik",
                               "image":  "https://images.unsplash.com/photo-1544717305-2782549b5136?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 4 unit terverifikasi BAIK sesuai data aset."
                                                       }
                                                   ]
                           },
                           {
                               "nextService":  "2026-11-15",
                               "id":  "TOOL-050",
                               "category":  "Office Tools",
                               "lastService":  "2026-08-15",
                               "assignedTo":  "Staff Operasional (6 Unit)",
                               "code":  "AST-050",
                               "name":  "KALKULATOR",
                               "specs":  "Kalkulator elektronik, layar LCD 10â€“12 digit, fungsi aritmatika dasar, persentase, memori, menggunakan baterai/tenaga surya",
                               "brand":  "Standar Operasional Toko Grosir",
                               "status":  "Tersedia",
                               "location":  "Gudang Utama \u0026 Operasional Toko",
                               "purchaseYear":  "2024",
                               "condition":  "Sangat Baik",
                               "image":  "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                               "maintenanceLogs":  [
                                                       {
                                                           "date":  "2026-08-15",
                                                           "cost":  0,
                                                           "technician":  "Tim Inventaris",
                                                           "type":  "Pengecekan Fisik",
                                                           "notes":  "Kondisi 6 unit terverifikasi BAIK sesuai data aset."
                                                       }
                                                   ]
                           }
                       ],
    "orders":  [

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
                    "bannerSubtitle":  "Lengkap dengan sistem harga grosir bertingkat, dokumen faktur, dan manajemen aset gudang terintegrasi.",
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
                             "image":  "https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "1905260001",
                             "id":  "SHOP-001",
                             "retailPrice":  21650,
                             "minOrder":  1,
                             "category":  "Sembako",
                             "tiers":  [
                                           {
                                               "price":  21650,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  20568,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  19485,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "BLASTOZ COKLAT ARTA @6",
                             "badge":  "BEST SELLER",
                             "description":  "Rasa: Cokelat (Chocolate), Berat Bersih per Buah: 24 gram, Isi per Box: 12 pcs, Berat Total per Box: Sekitar 288-300g",
                             "stock":  51,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "1605260009",
                             "id":  "SHOP-002",
                             "retailPrice":  13000,
                             "minOrder":  1,
                             "category":  "Sembako",
                             "tiers":  [
                                           {
                                               "price":  13000,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  12350,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  11700,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "CANNON BALL ARTA @6",
                             "badge":  "",
                             "description":  "Sachet Kecil/Sedang: Berat bersih sekitar 20g/40g, Box/Multipack: Isi 12 pcs (20g) atau isi 24 pcs",
                             "stock":  52,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "1905260002",
                             "id":  "SHOP-003",
                             "retailPrice":  180000,
                             "minOrder":  1,
                             "category":  "Sembako",
                             "tiers":  [
                                           {
                                               "price":  180000,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  171000,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  162000,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "FRUZZ GUMMY ARTA @12",
                             "badge":  "PARTAI",
                             "description":  "1 Dus isi 12 box",
                             "stock":  53,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "1605260007",
                             "id":  "SHOP-004",
                             "retailPrice":  6000,
                             "minOrder":  1,
                             "category":  "Sembako",
                             "tiers":  [
                                           {
                                               "price":  6000,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  5700,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  5400,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "FULLO ROLL ARTA @6",
                             "badge":  "",
                             "description":  "Berat Bersih: Â± 7 gram per pcs. Jumlah Isi: 1 pak isi 6 pcs. Varian: Cokelat, Vanilla Milk, Choco Berry, Blueberry Yogurt",
                             "stock":  54,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "1807260001",
                             "id":  "SHOP-005",
                             "retailPrice":  88000,
                             "minOrder":  1,
                             "category":  "Sembako",
                             "tiers":  [
                                           {
                                               "price":  88000,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  83600,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  79200,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "FULLO STICKY ARTA @6",
                             "badge":  "",
                             "description":  "Berat Bersih: Â±7g/8g per pcs. Varian: Cokelat, Vanilla Milk, Choco Vanilla, Choco Strawberry. Kemasan Grosir: 1 karton isi 6 box @24 pcs",
                             "stock":  55,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "2006260001",
                             "id":  "SHOP-006",
                             "retailPrice":  44100,
                             "minOrder":  1,
                             "category":  "Sembako",
                             "tiers":  [
                                           {
                                               "price":  44100,
                                               "minQty":  1,
                                               "label":  "1 - 9 Rtg",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  41895,
                                               "minQty":  10,
                                               "label":  "10 - 29 Rtg (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  39690,
                                               "minQty":  30,
                                               "label":  "30+ Rtg (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "OOPS CHIPS RTG ARTA @6",
                             "badge":  "",
                             "description":  "Berat Bersih (Netto): 60 gram per bungkus (total 6 pcs). Isi Paket: 6 bungkus",
                             "stock":  56,
                             "unit":  "Rtg"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "2007260002",
                             "id":  "SHOP-007",
                             "retailPrice":  10000,
                             "minOrder":  1,
                             "category":  "Sembako",
                             "tiers":  [
                                           {
                                               "price":  10000,
                                               "minQty":  1,
                                               "label":  "1 - 9 Rtg",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  9500,
                                               "minQty":  10,
                                               "label":  "10 - 29 Rtg (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  9000,
                                               "minQty":  30,
                                               "label":  "30+ Rtg (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "OOPS FUGU ARTA @12",
                             "badge":  "",
                             "description":  "Berat Bersih: Sekitar 10â€“12 gram per bungkus kecil (sachet). Kemasan Umum: Dijual per renteng/pak isi 10 sachet",
                             "stock":  57,
                             "unit":  "Rtg"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "2007260001",
                             "id":  "SHOP-008",
                             "retailPrice":  18000,
                             "minOrder":  1,
                             "category":  "Sembako",
                             "tiers":  [
                                           {
                                               "price":  18000,
                                               "minQty":  1,
                                               "label":  "1 - 9 Rtg",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  17100,
                                               "minQty":  10,
                                               "label":  "10 - 29 Rtg (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  16200,
                                               "minQty":  30,
                                               "label":  "30+ Rtg (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "OOPS STAR ARTA @12",
                             "badge":  "",
                             "description":  "Kemasan: Renceng atau pak isi beberapa bungkus kecil. Varian: Jagung bakar manis, ayam tomat panggang, mie goreng. Halal",
                             "stock":  58,
                             "unit":  "Rtg"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "307260002",
                             "id":  "SHOP-009",
                             "retailPrice":  210000,
                             "minOrder":  1,
                             "category":  "Sembako",
                             "tiers":  [
                                           {
                                               "price":  210000,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  199500,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  189000,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "PERMEN BLASTER ARTA @24",
                             "badge":  "",
                             "description":  "Kemasan: 1 Karton / Dus berisi 24 bungkus (zak)",
                             "stock":  59,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "1807260002",
                             "id":  "SHOP-010",
                             "retailPrice":  82000,
                             "minOrder":  1,
                             "category":  "Sembako",
                             "tiers":  [
                                           {
                                               "price":  82000,
                                               "minQty":  1,
                                               "label":  "1 - 9 Rtg",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  77900,
                                               "minQty":  10,
                                               "label":  "10 - 29 Rtg (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  73800,
                                               "minQty":  30,
                                               "label":  "30+ Rtg (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "PERMEN BLASTER POP ARTA @4",
                             "badge":  "",
                             "description":  "Berat Bersih (Netto): Â±6,3 gram per pcs. Isi Per Pak/Renceng: 36 pcs. Kemasan Grosir: 1 dus isi 4 pak (4 x 36 pcs)",
                             "stock":  60,
                             "unit":  "Rtg"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "1807260003",
                             "id":  "SHOP-011",
                             "retailPrice":  210000,
                             "minOrder":  1,
                             "category":  "Sembako",
                             "tiers":  [
                                           {
                                               "price":  210000,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  199500,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  189000,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "PERMEN FRUZZ FRUIT COMBO ARTA @30",
                             "badge":  "",
                             "description":  "Berat Bersih per Bungkus: 88 gram atau 100 gram. Isi 30 bungkus per karton",
                             "stock":  61,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "307260001",
                             "id":  "SHOP-012",
                             "retailPrice":  130000,
                             "minOrder":  1,
                             "category":  "Sembako",
                             "tiers":  [
                                           {
                                               "price":  130000,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  123500,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  117000,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "PERMEN MINTZ ARTA @24",
                             "badge":  "",
                             "description":  "Berat per Bungkus: Sekitar 99g â€“ 115g. Varian: Peppermint, Duomint, Barleymint, Cherrymint, Grapemint. Tekstur kenyal, rasa mint segar, halal",
                             "stock":  62,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "2703260001",
                             "id":  "SHOP-013",
                             "retailPrice":  17000,
                             "minOrder":  1,
                             "category":  "Sembako",
                             "tiers":  [
                                           {
                                               "price":  17000,
                                               "minQty":  1,
                                               "label":  "1 - 9 Rtg",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  16150,
                                               "minQty":  10,
                                               "label":  "10 - 29 Rtg (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  15300,
                                               "minQty":  30,
                                               "label":  "30+ Rtg (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "PERMEN MINTZ ARTA @25",
                             "badge":  "",
                             "description":  "Isi per Kemasan Utuh: 1 bungkus normal berisi 50 pcs. Berat per Butir: Sekitar 2,2g - 2,5g",
                             "stock":  63,
                             "unit":  "Rtg"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "1905260003",
                             "id":  "SHOP-014",
                             "retailPrice":  17000,
                             "minOrder":  1,
                             "category":  "Sembako",
                             "tiers":  [
                                           {
                                               "price":  17000,
                                               "minQty":  1,
                                               "label":  "1 - 9 Rtg",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  16150,
                                               "minQty":  10,
                                               "label":  "10 - 29 Rtg (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  15300,
                                               "minQty":  30,
                                               "label":  "30+ Rtg (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "TANGO CRISPY ROLL ARTA @4",
                             "badge":  "",
                             "description":  "Berat Bersih per Pcs/Sachet: 12 gram. Jumlah dalam 1 Renceng: 10 pcs. Total dalam 1 Karton/Dus: 4 renceng",
                             "stock":  64,
                             "unit":  "Rtg"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "1605260006",
                             "id":  "SHOP-015",
                             "retailPrice":  18500,
                             "minOrder":  1,
                             "category":  "Sembako",
                             "tiers":  [
                                           {
                                               "price":  18500,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  17575,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  16650,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "TANGO EMOJI ARTA @6",
                             "badge":  "",
                             "description":  "Isi per Box: 12 pack plus bonus 1 pack (total 13 pack per box). Isi per Pack: 3 keping plus bonus 1 keping biskuit (total 4 keping / 22,4g)",
                             "stock":  65,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "3005260001",
                             "id":  "SHOP-016",
                             "retailPrice":  16500,
                             "minOrder":  1,
                             "category":  "Sembako",
                             "tiers":  [
                                           {
                                               "price":  16500,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  15675,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  14850,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "TANGO WAFER BITE BLACKPINK ARTA @6",
                             "badge":  "",
                             "description":  "Berat Bersih (Netto): 35 gram per sachet/bungkus. Kemasan Paket: (berisi 6 bungkus kemasan 35 gram)",
                             "stock":  66,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "1605260005",
                             "id":  "SHOP-017",
                             "retailPrice":  9000,
                             "minOrder":  1,
                             "category":  "Sembako",
                             "tiers":  [
                                           {
                                               "price":  9000,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  8550,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  8100,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "TANGO WAFER ECER 1000 ARTA @12",
                             "badge":  "",
                             "description":  "Berat Bersih (Netto): Â±15g â€“ 16g per pcs. Kemasan Jual (@12): 1 pak besar berisi 12 renceng",
                             "stock":  67,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "1605260002",
                             "id":  "SHOP-018",
                             "retailPrice":  16500,
                             "minOrder":  1,
                             "category":  "Sembako",
                             "tiers":  [
                                           {
                                               "price":  16500,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  15675,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  14850,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "TANGO WAFER ECER 2000 ARTA @6",
                             "badge":  "",
                             "description":  "Berat Bersih (Netto): Â±37 gram per bungkus. Harga Jual Eceran (HJE): Rp2.000 per bungkus",
                             "stock":  68,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "2305260001",
                             "id":  "SHOP-019",
                             "retailPrice":  20000,
                             "minOrder":  1,
                             "category":  "Sembako",
                             "tiers":  [
                                           {
                                               "price":  20000,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  19000,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  18000,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "TANGO WAFFLE ARTA @8",
                             "badge":  "",
                             "description":  "Berat Bersih per Sachet: 25 gram. Isi per Box: 12 pcs (+ bonus 1 sachet pada promo tertentu, total 12â€“13 pcs)",
                             "stock":  69,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "2606260001",
                             "id":  "SHOP-020",
                             "retailPrice":  20000,
                             "minOrder":  1,
                             "category":  "Sembako",
                             "tiers":  [
                                           {
                                               "price":  20000,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  19000,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  18000,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "TANGO WAFFLE WAHH ARTA @6",
                             "badge":  "",
                             "description":  "Isi Paket: 6 pcs (per unit atau per ikat penjualan). Berat Bersih: Bervariasi sekitar 22â€“25 gram per buah",
                             "stock":  70,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "2605260001",
                             "id":  "SHOP-021",
                             "retailPrice":  17500,
                             "minOrder":  1,
                             "category":  "Sembako",
                             "tiers":  [
                                           {
                                               "price":  17500,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  16625,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  15750,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "TANGO WALUT ARTA @6",
                             "badge":  "",
                             "description":  "Isi dalam Box: 6 saset / pcs. Berat Bersih per Pcs: 12,5 gram. Berat Bersih Total Box: Â±75 gram",
                             "stock":  71,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "2504260007",
                             "id":  "SHOP-022",
                             "retailPrice":  2500,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  2500,
                                               "minQty":  1,
                                               "label":  "1 - 9 Biji",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  2375,
                                               "minQty":  10,
                                               "label":  "10 - 29 Biji (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  2250,
                                               "minQty":  30,
                                               "label":  "30+ Biji (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "(ECER) SOLASI HITAM BERRY/ABRO/ABADI/JOM",
                             "badge":  "",
                             "description":  "Fungsi Utama: Pelindung sambungan kabel listrik, pencegah korsleting, dan perbaikan darurat rumah tangga. Bahan: PVC lentur atau kain rekat tinggi",
                             "stock":  72,
                             "unit":  "Biji"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "3001240001",
                             "id":  "SHOP-023",
                             "retailPrice":  1500,
                             "minOrder":  1,
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  1500,
                                               "minQty":  1,
                                               "label":  "1 - 9 Slop",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  1425,
                                               "minQty":  10,
                                               "label":  "10 - 29 Slop (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  1350,
                                               "minQty":  30,
                                               "label":  "30+ Slop (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "SOLASI ABADI TAPE MURAH",
                             "badge":  "",
                             "description":  "Lebar: 24 mm (1 inci). Panjang: 60 yard, 72 meter, atau hingga 100 yard per rol. Warna: Transparan / Bening. Bahan: OPP film dengan lem akrilik",
                             "stock":  73,
                             "unit":  "Slop"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "1508230001",
                             "id":  "SHOP-024",
                             "retailPrice":  8500,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  8500,
                                               "minQty":  1,
                                               "label":  "1 - 9 Slop",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  8075,
                                               "minQty":  10,
                                               "label":  "10 - 29 Slop (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  7650,
                                               "minQty":  30,
                                               "label":  "30+ Slop (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "SOLASI ABADI TEBAL 1/2X25@80",
                             "badge":  "",
                             "description":  "Lebar: 1/2 inci atau 12 mm. Panjang: 25 yard (Â±22,8 meter per roll). Ketebalan: Kategori tebal",
                             "stock":  74,
                             "unit":  "Slop"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B02107",
                             "id":  "SHOP-025",
                             "retailPrice":  5250,
                             "minOrder":  1,
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  5250,
                                               "minQty":  1,
                                               "label":  "1 - 9 Slop",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  4988,
                                               "minQty":  10,
                                               "label":  "10 - 29 Slop (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  4725,
                                               "minQty":  30,
                                               "label":  "30+ Slop (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "SOLASI BENING GOLDTAPE(1/2X10)@100",
                             "badge":  "",
                             "description":  "Lebar: 1/2 inci (sekitar 12 mm). Panjang: 10 meter / 10 yard",
                             "stock":  75,
                             "unit":  "Slop"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B06992",
                             "id":  "SHOP-026",
                             "retailPrice":  21750,
                             "minOrder":  1,
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  21750,
                                               "minQty":  1,
                                               "label":  "1 - 9 Slop",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  20662,
                                               "minQty":  10,
                                               "label":  "10 - 29 Slop (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  19575,
                                               "minQty":  30,
                                               "label":  "30+ Slop (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "SOLASI BERRY HITAM 300 PVC TBL @60",
                             "badge":  "",
                             "description":  "Jenis: Solasi PVC. Warna: Hitam. Ukuran: 300. Isi: 60 pcs",
                             "stock":  76,
                             "unit":  "Slop"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "3001240002",
                             "id":  "SHOP-027",
                             "retailPrice":  1500,
                             "minOrder":  1,
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  1500,
                                               "minQty":  1,
                                               "label":  "1 - 9 Slop",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  1425,
                                               "minQty":  10,
                                               "label":  "10 - 29 Slop (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  1350,
                                               "minQty":  30,
                                               "label":  "30+ Slop (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "SOLASI BIMA MURAH",
                             "badge":  "",
                             "description":  "Jenis: Solasi. Merk: Bima. Tipe: Murah",
                             "stock":  77,
                             "unit":  "Slop"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B04501",
                             "id":  "SHOP-028",
                             "retailPrice":  4000,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  4000,
                                               "minQty":  1,
                                               "label":  "1 - 9 Slop",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  3800,
                                               "minQty":  10,
                                               "label":  "10 - 29 Slop (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  3600,
                                               "minQty":  30,
                                               "label":  "30+ Slop (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "SOLASI FANCY/GLITTER @200",
                             "badge":  "",
                             "description":  "Jenis: Solasi Fancy/Glitter. Isi: 200 pcs",
                             "stock":  78,
                             "unit":  "Slop"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "1512250004",
                             "id":  "SHOP-029",
                             "retailPrice":  3250,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  3250,
                                               "minQty":  1,
                                               "label":  "1 - 9 Slop",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  3088,
                                               "minQty":  10,
                                               "label":  "10 - 29 Slop (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  2925,
                                               "minQty":  30,
                                               "label":  "30+ Slop (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "SOLASI HITAM ABADI @60",
                             "badge":  "",
                             "description":  "Jenis: Solasi. Warna: Hitam. Merk: Abadi. Isi: 60 pcs",
                             "stock":  79,
                             "unit":  "Slop"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B01354",
                             "id":  "SHOP-030",
                             "retailPrice":  10750,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  10750,
                                               "minQty":  1,
                                               "label":  "1 - 9 Slop",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  10212,
                                               "minQty":  10,
                                               "label":  "10 - 29 Slop (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  9675,
                                               "minQty":  30,
                                               "label":  "30+ Slop (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "SOLASI HITAM ABRO CLOTH @50",
                             "badge":  "",
                             "description":  "Jenis: Solasi Cloth. Warna: Hitam. Merk: Abro. Isi: 50 pcs",
                             "stock":  80,
                             "unit":  "Slop"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B02424",
                             "id":  "SHOP-031",
                             "retailPrice":  12750,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  12750,
                                               "minQty":  1,
                                               "label":  "1 - 9 Slop",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  12112,
                                               "minQty":  10,
                                               "label":  "10 - 29 Slop (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  11475,
                                               "minQty":  30,
                                               "label":  "30+ Slop (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "SOLASI HITAM ABRO PVC @66/54",
                             "badge":  "",
                             "description":  "Jenis: Solasi PVC. Warna: Hitam. Merk: Abro. Ukuran: 66/54",
                             "stock":  81,
                             "unit":  "Slop"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B00003",
                             "id":  "SHOP-032",
                             "retailPrice":  8250,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  8250,
                                               "minQty":  1,
                                               "label":  "1 - 9 Slop",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  7838,
                                               "minQty":  10,
                                               "label":  "10 - 29 Slop (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  7425,
                                               "minQty":  30,
                                               "label":  "30+ Slop (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "SOLASI HITAM GOLDTAPE ASLI II @50",
                             "badge":  "",
                             "description":  "Jenis: Solasi. Warna: Hitam. Merk: Goldtape Asli II. Isi: 50 pcs",
                             "stock":  82,
                             "unit":  "Slop"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B05220",
                             "id":  "SHOP-033",
                             "retailPrice":  3750,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  3750,
                                               "minQty":  1,
                                               "label":  "1 - 9 Slop",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  3562,
                                               "minQty":  10,
                                               "label":  "10 - 29 Slop (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  3375,
                                               "minQty":  30,
                                               "label":  "30+ Slop (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "SOLASI HITAM GOLDTOOOOP@77",
                             "badge":  "",
                             "description":  "Jenis: Solasi. Warna: Hitam. Merk: Goldtoooop. Isi: 77 pcs",
                             "stock":  83,
                             "unit":  "Slop"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "1705230001",
                             "id":  "SHOP-034",
                             "retailPrice":  3250,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  3250,
                                               "minQty":  1,
                                               "label":  "1 - 9 Slop",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  3088,
                                               "minQty":  10,
                                               "label":  "10 - 29 Slop (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  2925,
                                               "minQty":  30,
                                               "label":  "30+ Slop (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "SOLASI HITAM SM/SELA/JOMBO/PAJERO @66",
                             "badge":  "",
                             "description":  "Jenis: Solasi. Warna: Hitam. Tipe: SM/Sela/Jombo/Pajero. Isi: 66 pcs",
                             "stock":  84,
                             "unit":  "Slop"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "2103250003",
                             "id":  "SHOP-035",
                             "retailPrice":  10750,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  10750,
                                               "minQty":  1,
                                               "label":  "1 - 9 Slop",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  10212,
                                               "minQty":  10,
                                               "label":  "10 - 29 Slop (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  9675,
                                               "minQty":  30,
                                               "label":  "30+ Slop (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "SOLASI HITAM SM @66",
                             "badge":  "",
                             "description":  "Jenis: Solasi kertas. Merk: SM. Tipe: Tebal. Ukuran: 54/50/55",
                             "stock":  85,
                             "unit":  "Slop"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "604240002",
                             "id":  "SHOP-036",
                             "retailPrice":  4000,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  4000,
                                               "minQty":  1,
                                               "label":  "1 - 9 Slop",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  3800,
                                               "minQty":  10,
                                               "label":  "10 - 29 Slop (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  3600,
                                               "minQty":  30,
                                               "label":  "30+ Slop (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "SOLASI KERTAS BERRY TIPIS @60",
                             "badge":  "",
                             "description":  "Jenis: Solasi kertas. Merk: Berry. Tipe: Tipis. Isi: 60 pcs",
                             "stock":  86,
                             "unit":  "Slop"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B06372",
                             "id":  "SHOP-037",
                             "retailPrice":  6500,
                             "minOrder":  1,
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  6500,
                                               "minQty":  1,
                                               "label":  "1 - 9 Slop",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  6175,
                                               "minQty":  10,
                                               "label":  "10 - 29 Slop (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  5850,
                                               "minQty":  30,
                                               "label":  "30+ Slop (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "SOLASI KERTAS GOLDTAPE @50",
                             "badge":  "",
                             "description":  "Jenis: Solasi kertas. Merk: Goldtape. Isi: 50 pcs",
                             "stock":  87,
                             "unit":  "Slop"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "408250001",
                             "id":  "SHOP-038",
                             "retailPrice":  3250,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  3250,
                                               "minQty":  1,
                                               "label":  "1 - 9 Slop",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  3088,
                                               "minQty":  10,
                                               "label":  "10 - 29 Slop (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  2925,
                                               "minQty":  30,
                                               "label":  "30+ Slop (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "SOLASI KERTAS JOMBOOO @66",
                             "badge":  "",
                             "description":  "Jenis: Solasi kertas. Tipe: Jombooo. Isi: 66 pcs",
                             "stock":  88,
                             "unit":  "Slop"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B06621",
                             "id":  "SHOP-039",
                             "retailPrice":  10500,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  10500,
                                               "minQty":  1,
                                               "label":  "1 - 9 Slop",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  9975,
                                               "minQty":  10,
                                               "label":  "10 - 29 Slop (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  9450,
                                               "minQty":  30,
                                               "label":  "30+ Slop (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "SOLASI KERTAS MACIDA TEBAL@54",
                             "badge":  "",
                             "description":  "Jenis: Solasi kertas. Merk: Macida. Tipe: Tebal. Isi: 54 pcs",
                             "stock":  89,
                             "unit":  "Slop"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "2103250002",
                             "id":  "SHOP-040",
                             "retailPrice":  3250,
                             "minOrder":  1,
                             "category":  "Parfum",
                             "tiers":  [
                                           {
                                               "price":  3250,
                                               "minQty":  1,
                                               "label":  "1 - 9 Slop",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  3088,
                                               "minQty":  10,
                                               "label":  "10 - 29 Slop (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  2925,
                                               "minQty":  30,
                                               "label":  "30+ Slop (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "SOLASI KERTAS MACIDA TIPIS @60",
                             "badge":  "",
                             "description":  "Jenis: Solasi kertas. Merk: Macida. Tipe: Tipis. Isi: 60 pcs",
                             "stock":  90,
                             "unit":  "Slop"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "2307260006",
                             "id":  "SHOP-041",
                             "retailPrice":  5750,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  5750,
                                               "minQty":  1,
                                               "label":  "1 - 9 Slop",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  5462,
                                               "minQty":  10,
                                               "label":  "10 - 29 Slop (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  5175,
                                               "minQty":  30,
                                               "label":  "30+ Slop (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "SOLASI KERTAS MILENIUM @50",
                             "badge":  "",
                             "description":  "Jenis: Solasi kertas. Merk: Milenium. Isi: 50 pcs",
                             "stock":  91,
                             "unit":  "Slop"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "808250015",
                             "id":  "SHOP-042",
                             "retailPrice":  3000,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  3000,
                                               "minQty":  1,
                                               "label":  "1 - 9 Slop",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  2850,
                                               "minQty":  10,
                                               "label":  "10 - 29 Slop (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  2700,
                                               "minQty":  30,
                                               "label":  "30+ Slop (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "SOLASI KERTAS OZZIE TIPIS @60",
                             "badge":  "",
                             "description":  "Jenis: Solasi kertas. Merk: Ozzie. Tipe: Tipis. Isi: 60 pcs",
                             "stock":  92,
                             "unit":  "Slop"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B04607",
                             "id":  "SHOP-043",
                             "retailPrice":  17500,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  17500,
                                               "minQty":  1,
                                               "label":  "1 - 9 Slop",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  16625,
                                               "minQty":  10,
                                               "label":  "10 - 29 Slop (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  15750,
                                               "minQty":  30,
                                               "label":  "30+ Slop (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "SOLASI KERTAS PAJERO TEBAL @50",
                             "badge":  "",
                             "description":  "Jenis: Solasi kertas. Tipe: Pajero Tebal. Isi: 50 pcs",
                             "stock":  93,
                             "unit":  "Slop"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B05526",
                             "id":  "SHOP-044",
                             "retailPrice":  48500,
                             "minOrder":  1,
                             "category":  "Bangunan",
                             "tiers":  [
                                           {
                                               "price":  48500,
                                               "minQty":  1,
                                               "label":  "1 - 9 Slop",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  46075,
                                               "minQty":  10,
                                               "label":  "10 - 29 Slop (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  43650,
                                               "minQty":  30,
                                               "label":  "30+ Slop (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "LAKBAN OPP ABADI WARNA @72",
                             "badge":  "",
                             "description":  "Jenis: Solasi. Merk/Tipe: Sella. Isi: 12 Pcs",
                             "stock":  94,
                             "unit":  "Slop"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B06396",
                             "id":  "SHOP-045",
                             "retailPrice":  3250,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  3250,
                                               "minQty":  1,
                                               "label":  "1 - 9 Slop",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  3088,
                                               "minQty":  10,
                                               "label":  "10 - 29 Slop (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  2925,
                                               "minQty":  30,
                                               "label":  "30+ Slop (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "SOLASI KERTAS SM @60",
                             "badge":  "",
                             "description":  "Jenis: Solasi kertas. Tipe: SM. Isi: 60 pcs",
                             "stock":  95,
                             "unit":  "Slop"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "905260005",
                             "id":  "SHOP-046",
                             "retailPrice":  6550,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  6550,
                                               "minQty":  1,
                                               "label":  "1 - 9 Biji",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  6222,
                                               "minQty":  10,
                                               "label":  "10 - 29 Biji (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  5895,
                                               "minQty":  30,
                                               "label":  "30+ Biji (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "KANOE TISU SERBAGUNA @40",
                             "badge":  "",
                             "description":  "Jenis: Tisu serbaguna. Merk: Kanoe. Isi: 40 pcs",
                             "stock":  96,
                             "unit":  "Biji"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "1709240001",
                             "id":  "SHOP-047",
                             "retailPrice":  2000,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  2000,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  1900,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  1800,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "MINITIKI TISU BASAH IOS @32",
                             "badge":  "",
                             "description":  "Jenis: Tisu basah. Merk: Minitiki. Tipe: IOS. Isi: 32 pcs",
                             "stock":  97,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B03182",
                             "id":  "SHOP-048",
                             "retailPrice":  12250,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  12250,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  11638,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  11025,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "TISU BASAH CUSSONS ISI 2 BIRU @18",
                             "badge":  "",
                             "description":  "Jenis: Tisu basah. Merk: Cussons. Isi kemasan: 2. Warna: Biru. Isi: 18 pcs",
                             "stock":  98,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B03184",
                             "id":  "SHOP-049",
                             "retailPrice":  12250,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  12250,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  11638,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  11025,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "TISU BASAH CUSSONS ISI 2 HIJAU @18",
                             "badge":  "",
                             "description":  "Jenis: Tisu basah. Merk: Cussons. Isi kemasan: 2. Warna: Hijau. Isi: 18 pcs",
                             "stock":  99,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B03183",
                             "id":  "SHOP-050",
                             "retailPrice":  12250,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  12250,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  11638,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  11025,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "TISU BASAH CUSSONS ISI 2 UNGU @18",
                             "badge":  "",
                             "description":  "Jenis: Tisu basah. Merk: Cussons. Isi kemasan: 2. Warna: Ungu. Isi: 18 pcs",
                             "stock":  100,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "2204260001",
                             "id":  "SHOP-051",
                             "retailPrice":  16750,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  16750,
                                               "minQty":  1,
                                               "label":  "1 - 9 Slop",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  15912,
                                               "minQty":  10,
                                               "label":  "10 - 29 Slop (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  15075,
                                               "minQty":  30,
                                               "label":  "30+ Slop (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "TISU BASAH CUSSONS ISI 3 BIRU @12",
                             "badge":  "",
                             "description":  "Jenis: Tisu basah. Merk: Cussons. Isi kemasan: 3. Warna: Biru. Isi: 12 pcs",
                             "stock":  101,
                             "unit":  "Slop"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "1104260004",
                             "id":  "SHOP-052",
                             "retailPrice":  16750,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  16750,
                                               "minQty":  1,
                                               "label":  "1 - 9 Slop",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  15912,
                                               "minQty":  10,
                                               "label":  "10 - 29 Slop (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  15075,
                                               "minQty":  30,
                                               "label":  "30+ Slop (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "TISU BASAH CUSSONS ISI 3 HIJAU @12",
                             "badge":  "",
                             "description":  "Jenis: Tisu basah. Merk: Cussons. Isi kemasan: 3. Warna: Hijau. Isi: 12 pcs",
                             "stock":  102,
                             "unit":  "Slop"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "2510250001",
                             "id":  "SHOP-053",
                             "retailPrice":  16750,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  16750,
                                               "minQty":  1,
                                               "label":  "1 - 9 Slop",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  15912,
                                               "minQty":  10,
                                               "label":  "10 - 29 Slop (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  15075,
                                               "minQty":  30,
                                               "label":  "30+ Slop (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "TISU BASAH CUSSONS ISI 3 UNGU/PINK @12",
                             "badge":  "",
                             "description":  "Jenis: Tisu basah. Merk: Cussons. Isi kemasan: 3. Warna: Ungu/Pink. Isi: 12 pcs",
                             "stock":  103,
                             "unit":  "Slop"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "710250003",
                             "id":  "SHOP-054",
                             "retailPrice":  11000,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  11000,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  10450,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  9900,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "TISU BASAH KODOMO ISI 2 @24",
                             "badge":  "",
                             "description":  "Jenis: Tisu basah. Merk: Kodomo. Isi kemasan: 2. Isi: 24 pcs",
                             "stock":  104,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "1204250001",
                             "id":  "SHOP-055",
                             "retailPrice":  10000,
                             "minOrder":  1,
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  10000,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  9500,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  9000,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "TISU BASAH MINIKIDI ISI 2+BNS 40S @18",
                             "badge":  "",
                             "description":  "Jenis: Tisu basah. Merk: Minikidi. Isi: 2 + bonus 40S. Isi: 18 pcs",
                             "stock":  105,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "2807260006",
                             "id":  "SHOP-056",
                             "retailPrice":  11500,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  11500,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  10925,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  10350,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "TISU BASAH MITU BANDED 2 50\u0027S BIRU @24",
                             "badge":  "",
                             "description":  "Jenis: Tisu basah. Merk: Mitu. Tipe: Banded 2. Isi: 50\u0027s. Warna: Biru. Isi: 24 pcs",
                             "stock":  106,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "2807260007",
                             "id":  "SHOP-057",
                             "retailPrice":  11500,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  11500,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  10925,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  10350,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "TISU BASAH MITU BANDED 2 50\u0027S PINK @24",
                             "badge":  "",
                             "description":  "Jenis: Tisu basah. Merk: Mitu. Tipe: Banded 2. Isi: 50\u0027s. Warna: Pink. Isi: 24 pcs",
                             "stock":  107,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "2807260008",
                             "id":  "SHOP-058",
                             "retailPrice":  11500,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  11500,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  10925,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  10350,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "TISU BASAH MITU BANDED 2 50\u0027S UNGU @24",
                             "badge":  "",
                             "description":  "Jenis: Tisu basah. Merk: Mitu. Tipe: Banded 2. Isi: 50\u0027s. Warna: Ungu. Isi: 24 pcs",
                             "stock":  108,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "1912240004",
                             "id":  "SHOP-059",
                             "retailPrice":  4200,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  4200,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pcs",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  3990,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pcs (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  3780,
                                               "minQty":  30,
                                               "label":  "30+ Pcs (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "TISU BASAH MITU ECER 5000 BIDAN @72",
                             "badge":  "",
                             "description":  "Jenis: Tisu basah. Merk: Mitu. Tipe: Ecer 5000 Bidan. Isi: 72 pcs",
                             "stock":  109,
                             "unit":  "Pcs"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B03171",
                             "id":  "SHOP-060",
                             "retailPrice":  11250,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  11250,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  10688,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  10125,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "TISU BASAH MITU ISI 2 @24",
                             "badge":  "",
                             "description":  "Jenis: Tisu basah. Merk: Mitu. Isi kemasan: 2. Isi: 24 pcs",
                             "stock":  110,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B03326",
                             "id":  "SHOP-061",
                             "retailPrice":  24500,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  24500,
                                               "minQty":  1,
                                               "label":  "1 - 9 Rtg",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  23275,
                                               "minQty":  10,
                                               "label":  "10 - 29 Rtg (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  22050,
                                               "minQty":  30,
                                               "label":  "30+ Rtg (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "TISU BASAH MITU ISI 6 (5000) RTG @12",
                             "badge":  "",
                             "description":  "Jenis: Tisu basah. Merk: Mitu. Isi kemasan: 6. Keterangan: 5000 RTG. Isi: 12 pcs",
                             "stock":  111,
                             "unit":  "Rtg"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B03027",
                             "id":  "SHOP-062",
                             "retailPrice":  18250,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  18250,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  17338,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  16425,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "TISU BASAH MITU RTG BIRU 4\u0027S @12",
                             "badge":  "",
                             "description":  "Jenis: Tisu basah. Merk: Mitu. Tipe: RTG. Isi: 4\u0027s. Warna: Biru. Isi: 12 pcs",
                             "stock":  112,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B03028",
                             "id":  "SHOP-063",
                             "retailPrice":  18250,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  18250,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  17338,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  16425,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "TISU BASAH MITU RTG PING 4\u0027S @12",
                             "badge":  "",
                             "description":  "Jenis: Tisu basah. Merk: Mitu. Tipe: RTG. Isi: 4\u0027s. Warna: Pink. Isi: 12 pcs",
                             "stock":  113,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "310230001",
                             "id":  "SHOP-064",
                             "retailPrice":  4000,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  4000,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  3800,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  3600,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "TISU BASAH TIS ISI 2 @72",
                             "badge":  "",
                             "description":  "Jenis: Tisu basah. Merk: TIS. Isi kemasan: 2. Isi: 72 pcs",
                             "stock":  114,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B07080",
                             "id":  "SHOP-065",
                             "retailPrice":  20000,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  20000,
                                               "minQty":  1,
                                               "label":  "1 - 9 Rtg",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  19000,
                                               "minQty":  10,
                                               "label":  "10 - 29 Rtg (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  18000,
                                               "minQty":  30,
                                               "label":  "30+ Rtg (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "TISU BASAH TINS RENTENG @12",
                             "badge":  "",
                             "description":  "Jenis: Tisu basah. Merk: Tins. Tipe: Renteng. Isi: 12 pcs",
                             "stock":  115,
                             "unit":  "Rtg"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B06859",
                             "id":  "SHOP-066",
                             "retailPrice":  11250,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  11250,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  10688,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  10125,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "TISU BASAH WETKINS BIRU(2) @12",
                             "badge":  "",
                             "description":  "Jenis: Tisu basah. Merk: Wetkins. Isi kemasan: 2. Warna: Biru. Isi: 12 pcs",
                             "stock":  116,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B06860",
                             "id":  "SHOP-067",
                             "retailPrice":  11250,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  11250,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  10688,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  10125,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "TISU BASAH WETKINS PINK(2) @12",
                             "badge":  "",
                             "description":  "Jenis: Tisu basah. Merk: Wetkins. Isi kemasan: 2. Warna: Pink. Isi: 12 pcs",
                             "stock":  117,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B06676",
                             "id":  "SHOP-068",
                             "retailPrice":  34000,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  34000,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pcs",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  32300,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pcs (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  30600,
                                               "minQty":  30,
                                               "label":  "30+ Pcs (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "TISU NICE 900gr @20",
                             "badge":  "",
                             "description":  "Jenis: Tisu Wajah. Merk: Nice. Berat: 900 gram",
                             "stock":  118,
                             "unit":  "Pcs"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B06445",
                             "id":  "SHOP-069",
                             "retailPrice":  15250,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  15250,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  14488,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  13725,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "TISU DAPUR SERVIETTES PIRING @12",
                             "badge":  "",
                             "description":  "Jenis: Tisu dapur. Merk/Tipe: Serviettes Piring. Isi: 12 pcs",
                             "stock":  119,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "2710230001",
                             "id":  "SHOP-070",
                             "retailPrice":  1500,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  1500,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pcs",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  1425,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pcs (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  1350,
                                               "minQty":  30,
                                               "label":  "30+ Pcs (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "KOREK LAS VEGAS KOTAK @1000",
                             "badge":  "",
                             "description":  "Jenis: Korek. Merk: Las Vegas. Bentuk: Kotak. Isi: 1000 pcs",
                             "stock":  50,
                             "unit":  "Pcs"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "1604250001",
                             "id":  "SHOP-071",
                             "retailPrice":  1500,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  1500,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pcs",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  1425,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pcs (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  1350,
                                               "minQty":  30,
                                               "label":  "30+ Pcs (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "KOREK LAS VEGAS MARS MAGNIT @1000",
                             "badge":  "",
                             "description":  "Jenis: Korek. Merk: Las Vegas. Tipe: Mars Magnit. Isi: 1000 pcs",
                             "stock":  51,
                             "unit":  "Pcs"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "1306250001",
                             "id":  "SHOP-072",
                             "retailPrice":  1500,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  1500,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pcs",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  1425,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pcs (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  1350,
                                               "minQty":  30,
                                               "label":  "30+ Pcs (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "KOREK API G2000 GEMINI OVAL @1000",
                             "badge":  "",
                             "description":  "Jenis: Korek. Merk: G2000. Bentuk: Oval Premium. Isi: 1000 pcs",
                             "stock":  52,
                             "unit":  "Pcs"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B05832",
                             "id":  "SHOP-073",
                             "retailPrice":  4000,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  4000,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pcs",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  3800,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pcs (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  3600,
                                               "minQty":  30,
                                               "label":  "30+ Pcs (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "KOREK CRICKET MERAH @1000",
                             "badge":  "",
                             "description":  "Jenis: Korek. Merk: Cricket. Warna: Merah. Isi: 1000 pcs",
                             "stock":  53,
                             "unit":  "Pcs"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "2712250008",
                             "id":  "SHOP-074",
                             "retailPrice":  22000,
                             "minOrder":  1,
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  22000,
                                               "minQty":  1,
                                               "label":  "1 - 9 Biji",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  20900,
                                               "minQty":  10,
                                               "label":  "10 - 29 Biji (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  19800,
                                               "minQty":  30,
                                               "label":  "30+ Biji (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "HERBORIST BODY LOTION EMBOEN",
                             "badge":  "",
                             "description":  "Jenis: Body Lotion. Merk: Herborist. Varian: Emboen",
                             "stock":  54,
                             "unit":  "Biji"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "2712250009",
                             "id":  "SHOP-075",
                             "retailPrice":  22000,
                             "minOrder":  1,
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  22000,
                                               "minQty":  1,
                                               "label":  "1 - 9 Biji",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  20900,
                                               "minQty":  10,
                                               "label":  "10 - 29 Biji (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  19800,
                                               "minQty":  30,
                                               "label":  "30+ Biji (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "HERBORIST BODY LOTION SENDJA",
                             "badge":  "",
                             "description":  "Jenis: Body Lotion. Merk: Herborist. Varian: Sendja",
                             "stock":  55,
                             "unit":  "Biji"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B06305",
                             "id":  "SHOP-076",
                             "retailPrice":  25000,
                             "minOrder":  1,
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  25000,
                                               "minQty":  1,
                                               "label":  "1 - 9 Biji",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  23750,
                                               "minQty":  10,
                                               "label":  "10 - 29 Biji (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  22500,
                                               "minQty":  30,
                                               "label":  "30+ Biji (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "HERBORIST BODY LOTION ZATUN 145ML @24",
                             "badge":  "",
                             "description":  "Jenis: Body Lotion. Merk: Herborist. Varian: Zaitun. Volume: 145 ml. Isi: 24 pcs",
                             "stock":  56,
                             "unit":  "Biji"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "2105250002",
                             "id":  "SHOP-077",
                             "retailPrice":  20000,
                             "minOrder":  1,
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  20000,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pcs",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  19000,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pcs (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  18000,
                                               "minQty":  30,
                                               "label":  "30+ Pcs (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "HERBORIST BODY SCRUB 100gr @36",
                             "badge":  "",
                             "description":  "Jenis: Body Scrub. Merk: Herborist. Berat: 100 gram. Isi: 36 pcs",
                             "stock":  57,
                             "unit":  "Pcs"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "3105250011",
                             "id":  "SHOP-078",
                             "retailPrice":  11000,
                             "minOrder":  1,
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  11000,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pcs",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  10450,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pcs (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  9900,
                                               "minQty":  30,
                                               "label":  "30+ Pcs (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "HERBORIST BODY SCRUB GOLD 100GR @36",
                             "badge":  "",
                             "description":  "Jenis: Body Scrub. Merk: Herborist. Varian: Gold. Berat: 100 gram. Isi: 36 pcs",
                             "stock":  58,
                             "unit":  "Pcs"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "1610250005",
                             "id":  "SHOP-079",
                             "retailPrice":  10000,
                             "minOrder":  1,
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  10000,
                                               "minQty":  1,
                                               "label":  "1 - 9 Biji",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  9500,
                                               "minQty":  10,
                                               "label":  "10 - 29 Biji (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  9000,
                                               "minQty":  30,
                                               "label":  "30+ Biji (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "HERBORIST BODY SCRUB SEA SALT 100GR",
                             "badge":  "",
                             "description":  "Jenis: Body Scrub. Merk: Herborist. Varian: Sea Salt. Berat: 100 gram",
                             "stock":  59,
                             "unit":  "Biji"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B06385",
                             "id":  "SHOP-080",
                             "retailPrice":  27200,
                             "minOrder":  1,
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  27200,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pcs",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  25840,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pcs (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  24480,
                                               "minQty":  30,
                                               "label":  "30+ Pcs (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "HERBORIST BODYSERUM GLUTA SPF30 @12",
                             "badge":  "",
                             "description":  "Jenis: Body Serum. Merk: Herborist. Varian: Gluta. SPF: 30. Isi: 12 pcs",
                             "stock":  60,
                             "unit":  "Pcs"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B06862",
                             "id":  "SHOP-081",
                             "retailPrice":  27200,
                             "minOrder":  1,
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  27200,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pcs",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  25840,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pcs (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  24480,
                                               "minQty":  30,
                                               "label":  "30+ Pcs (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "HERBORIST BODYSERUM LOTION 180ML @24",
                             "badge":  "",
                             "description":  "Jenis: Body Serum Lotion. Merk: Herborist. Volume: 180 ml. Isi: 24 pcs",
                             "stock":  61,
                             "unit":  "Pcs"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "403250001",
                             "id":  "SHOP-082",
                             "retailPrice":  27200,
                             "minOrder":  1,
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  27200,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pcs",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  25840,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pcs (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  24480,
                                               "minQty":  30,
                                               "label":  "30+ Pcs (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "HERBORIST BODYSERUM STRAW/MEL 180ML @24",
                             "badge":  "",
                             "description":  "Jenis: Body Serum. Merk: Herborist. Varian: Straw/Mel. Volume: 180 ml. Isi: 24 pcs",
                             "stock":  62,
                             "unit":  "Pcs"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1585336261026-7f897b6a4163?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B06861",
                             "id":  "SHOP-083",
                             "retailPrice":  22500,
                             "minOrder":  1,
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  22500,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pcs",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  21375,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pcs (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  20250,
                                               "minQty":  30,
                                               "label":  "30+ Pcs (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "HERBORIST EXFL GEL SCRUB 150ML @24",
                             "badge":  "",
                             "description":  "Jenis: Exfoliating Gel Scrub. Merk: Herborist. Volume: 150 ml. Isi: 24 pcs",
                             "stock":  63,
                             "unit":  "Pcs"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "707250003",
                             "id":  "SHOP-084",
                             "retailPrice":  26400,
                             "minOrder":  1,
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  26400,
                                               "minQty":  1,
                                               "label":  "1 - 9 Biji",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  25080,
                                               "minQty":  10,
                                               "label":  "10 - 29 Biji (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  23760,
                                               "minQty":  30,
                                               "label":  "30+ Biji (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "HERBORIST HBL COCONUT 200ML @12",
                             "badge":  "",
                             "description":  "Jenis: HBL. Merk: Herborist. Varian: Coconut. Volume: 200 ml. Isi: 12 pcs",
                             "stock":  64,
                             "unit":  "Biji"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "1610250004",
                             "id":  "SHOP-085",
                             "retailPrice":  20000,
                             "minOrder":  1,
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  20000,
                                               "minQty":  1,
                                               "label":  "1 - 9 Biji",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  19000,
                                               "minQty":  10,
                                               "label":  "10 - 29 Biji (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  18000,
                                               "minQty":  30,
                                               "label":  "30+ Biji (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "HERBORIST LULUR GREENTEA 100G",
                             "badge":  "",
                             "description":  "Jenis: Lulur. Merk: Herborist. Varian: Greentea. Berat: 100 gram",
                             "stock":  65,
                             "unit":  "Biji"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "2405250002",
                             "id":  "SHOP-086",
                             "retailPrice":  20000,
                             "minOrder":  1,
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  20000,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pcs",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  19000,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pcs (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  18000,
                                               "minQty":  30,
                                               "label":  "30+ Pcs (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "HERBORIST LULUR ZATUN 100GR @12",
                             "badge":  "",
                             "description":  "Jenis: Lulur. Merk: Herborist. Varian: Zaitun. Berat: 100 gram. Isi: 12 pcs",
                             "stock":  66,
                             "unit":  "Pcs"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "908230002",
                             "id":  "SHOP-087",
                             "retailPrice":  20000,
                             "minOrder":  1,
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  20000,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pcs",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  19000,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pcs (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  18000,
                                               "minQty":  30,
                                               "label":  "30+ Pcs (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "HERBORIST MINERAL BODY SCRUB CUP @12",
                             "badge":  "",
                             "description":  "Jenis: Mineral Body Scrub. Merk: Herborist. Bentuk: Cup. Isi: 12 pcs",
                             "stock":  67,
                             "unit":  "Pcs"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B03537",
                             "id":  "SHOP-088",
                             "retailPrice":  20000,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  20000,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pcs",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  19000,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pcs (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  18000,
                                               "minQty":  30,
                                               "label":  "30+ Pcs (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "HERBORIST MINYAK ZAITUN 150ML @24",
                             "badge":  "",
                             "description":  "Jenis: Minyak Zaitun. Merk: Herborist. Volume: 150 ml. Isi: 24 pcs",
                             "stock":  68,
                             "unit":  "Pcs"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B03536",
                             "id":  "SHOP-089",
                             "retailPrice":  35000,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  35000,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pcs",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  33250,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pcs (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  31500,
                                               "minQty":  30,
                                               "label":  "30+ Pcs (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "HERBORIST MINYAK ZAITUN 75ML @48",
                             "badge":  "",
                             "description":  "Jenis: Minyak Zaitun. Merk: Herborist. Volume: 75 ml. Isi: 48 pcs",
                             "stock":  69,
                             "unit":  "Pcs"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "1604230002",
                             "id":  "SHOP-090",
                             "retailPrice":  35000,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  35000,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pcs",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  33250,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pcs (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  31500,
                                               "minQty":  30,
                                               "label":  "30+ Pcs (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "HERBORIST OLIVE OIL 150ML @24",
                             "badge":  "",
                             "description":  "Jenis: Olive Oil. Merk: Herborist. Volume: 150 ml. Isi: 24 pcs",
                             "stock":  70,
                             "unit":  "Pcs"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "1604230003",
                             "id":  "SHOP-091",
                             "retailPrice":  35000,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  35000,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pcs",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  33250,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pcs (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  31500,
                                               "minQty":  30,
                                               "label":  "30+ Pcs (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "HERBORIST OLIVE OIL 75ML @48",
                             "badge":  "",
                             "description":  "Jenis: Olive Oil. Merk: Herborist. Volume: 75 ml. Isi: 48 pcs",
                             "stock":  71,
                             "unit":  "Pcs"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1585336261026-7f897b6a4163?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B02136",
                             "id":  "SHOP-092",
                             "retailPrice":  18250,
                             "minOrder":  1,
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  18250,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  17338,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  16425,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "BULPEN AE7 BIRU @240",
                             "badge":  "",
                             "description":  "Jenis: Pulpen. Tipe: AE7. Warna: Biru. Isi: 240 pcs",
                             "stock":  72,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1585336261026-7f897b6a4163?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B02006",
                             "id":  "SHOP-093",
                             "retailPrice":  18250,
                             "minOrder":  1,
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  18250,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  17338,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  16425,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "BULPEN AE7 HTM @240",
                             "badge":  "",
                             "description":  "Jenis: Pulpen. Tipe: AE7. Warna: Hitam. Isi: 240 pcs",
                             "stock":  73,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1585336261026-7f897b6a4163?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B02137",
                             "id":  "SHOP-094",
                             "retailPrice":  18250,
                             "minOrder":  1,
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  18250,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  17338,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  16425,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "BULPEN AE7 MERAH @240",
                             "badge":  "",
                             "description":  "Jenis: Pulpen. Tipe: AE7. Warna: Merah. Isi: 240 pcs",
                             "stock":  74,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1585336261026-7f897b6a4163?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "2207260012",
                             "id":  "SHOP-095",
                             "retailPrice":  22000,
                             "minOrder":  1,
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  22000,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  20900,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  19800,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "BULPEN CETEK ESL GP-234 BIRU @144",
                             "badge":  "",
                             "description":  "Jenis: Pulpen Cetek. Merk: ESL. Tipe: GP-234. Warna: Biru. Isi: 144 pcs",
                             "stock":  75,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1585336261026-7f897b6a4163?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "2207260013",
                             "id":  "SHOP-096",
                             "retailPrice":  22000,
                             "minOrder":  1,
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  22000,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  20900,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  19800,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "BULPEN CETEK ESL GP-234 HITAM @144",
                             "badge":  "",
                             "description":  "Jenis: Pulpen Cetek. Merk: ESL. Tipe: GP-234. Warna: Hitam. Isi: 144 pcs",
                             "stock":  76,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1585336261026-7f897b6a4163?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B01753",
                             "id":  "SHOP-097",
                             "retailPrice":  9000,
                             "minOrder":  1,
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  9000,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pcs",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  8550,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pcs (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  8100,
                                               "minQty":  30,
                                               "label":  "30+ Pcs (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "BULPEN CRISTAL LINE",
                             "badge":  "",
                             "description":  "Jenis: Pulpen. Tipe: Cristal Line",
                             "stock":  77,
                             "unit":  "Pcs"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1585336261026-7f897b6a4163?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B03888",
                             "id":  "SHOP-098",
                             "retailPrice":  32500,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  32500,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pcs",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  30875,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pcs (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  29250,
                                               "minQty":  30,
                                               "label":  "30+ Pcs (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "BULPEN DEBOZ ISI 50",
                             "badge":  "",
                             "description":  "Jenis: Pulpen. Merk: Deboz. Isi: 50 pcs",
                             "stock":  78,
                             "unit":  "Pcs"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1585336261026-7f897b6a4163?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B04260",
                             "id":  "SHOP-099",
                             "retailPrice":  11000,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  11000,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  10450,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  9900,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "BULPEN EVERCOSS EV-1H/EV-1 @192",
                             "badge":  "",
                             "description":  "Jenis: Pulpen. Merk: Evercoss. Tipe: EV-1H/EV-1. Isi: 192 pcs",
                             "stock":  79,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1585336261026-7f897b6a4163?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B04267",
                             "id":  "SHOP-100",
                             "retailPrice":  22000,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  22000,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  20900,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  19800,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "BULPEN FANCY 4 WRN @96",
                             "badge":  "",
                             "description":  "Jenis: Pulpen. Tipe: Fancy. Warna: 4 warna. Isi: 96 pcs",
                             "stock":  80,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1585336261026-7f897b6a4163?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B00097",
                             "id":  "SHOP-101",
                             "retailPrice":  23000,
                             "minOrder":  1,
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  23000,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  21850,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  20700,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "BULPEN FASTER C-600 @144",
                             "badge":  "",
                             "description":  "Jenis: Pulpen. Merk: Faster. Tipe: C-600. Isi: 144 pcs",
                             "stock":  81,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1585336261026-7f897b6a4163?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B00725",
                             "id":  "SHOP-102",
                             "retailPrice":  23000,
                             "minOrder":  1,
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  23000,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  21850,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  20700,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "BULPEN FASTER F3 @144",
                             "badge":  "",
                             "description":  "Jenis: Pulpen. Merk: Faster. Tipe: F3. Isi: 144 pcs",
                             "stock":  82,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1585336261026-7f897b6a4163?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B03417",
                             "id":  "SHOP-103",
                             "retailPrice":  18500,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  18500,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pcs",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  17575,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pcs (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  16650,
                                               "minQty":  30,
                                               "label":  "30+ Pcs (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "BULPEN FIRSTMAN MV-1",
                             "badge":  "",
                             "description":  "Jenis: Pulpen. Merk: Firstman. Tipe: MV-1",
                             "stock":  83,
                             "unit":  "Pcs"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1585336261026-7f897b6a4163?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B06512",
                             "id":  "SHOP-104",
                             "retailPrice":  12500,
                             "minOrder":  1,
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  12500,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  11875,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  11250,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "BULPEN GEL APEL KOXI 910/913 @144",
                             "badge":  "",
                             "description":  "Jenis: Pulpen Gel. Merk: Koxi. Tipe: Apel 910/913. Isi: 144 pcs",
                             "stock":  84,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1585336261026-7f897b6a4163?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "2705230001",
                             "id":  "SHOP-105",
                             "retailPrice":  12750,
                             "minOrder":  1,
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  12750,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  12112,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  11475,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "BULPEN GEL APEL NEON ORLEE 7008 @144",
                             "badge":  "",
                             "description":  "Jenis: Pulpen Gel. Tipe: Apel Neon. Merk: Orlee. Model: 7008. Isi: 144 pcs",
                             "stock":  85,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1585336261026-7f897b6a4163?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B03453",
                             "id":  "SHOP-106",
                             "retailPrice":  12250,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  12250,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  11638,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  11025,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "BULPEN GEL APEL SF-6060/8080",
                             "badge":  "",
                             "description":  "Jenis: Pulpen Gel. Tipe: Apel. Model: SF-6060/8080",
                             "stock":  86,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1585336261026-7f897b6a4163?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "2406230003",
                             "id":  "SHOP-107",
                             "retailPrice":  11000,
                             "minOrder":  1,
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  11000,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  10450,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  9900,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "BULPEN GEL APEL V-TRO 301/302 @144",
                             "badge":  "",
                             "description":  "Jenis: Pulpen Gel. Tipe: Apel V-Tro. Model: 301/302. Isi: 144 pcs",
                             "stock":  87,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1585336261026-7f897b6a4163?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B01542",
                             "id":  "SHOP-108",
                             "retailPrice":  14000,
                             "minOrder":  1,
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  14000,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pcs",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  13300,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pcs (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  12600,
                                               "minQty":  30,
                                               "label":  "30+ Pcs (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "BULPEN GEL BUNGA",
                             "badge":  "",
                             "description":  "Jenis: Pulpen Gel. Tipe: Bunga",
                             "stock":  88,
                             "unit":  "Pcs"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1585336261026-7f897b6a4163?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B04447",
                             "id":  "SHOP-109",
                             "retailPrice":  12000,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  12000,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  11400,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  10800,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "BULPEN GEL CHOSCH 766",
                             "badge":  "",
                             "description":  "Jenis: Pulpen Gel. Merk/Tipe: Chosch 766",
                             "stock":  89,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1585336261026-7f897b6a4163?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "2509250006",
                             "id":  "SHOP-110",
                             "retailPrice":  19500,
                             "minOrder":  1,
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  19500,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  18525,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  17550,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "BULPEN GEL CONCEPT CGP-61B @144",
                             "badge":  "",
                             "description":  "Jenis: Pulpen Gel. Merk: Concept. Tipe: CGP-61B. Isi: 144 pcs",
                             "stock":  90,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1585336261026-7f897b6a4163?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "2401230003",
                             "id":  "SHOP-111",
                             "retailPrice":  13250,
                             "minOrder":  1,
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  13250,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  12588,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  11925,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "BULPEN GEL DTIAN @192",
                             "badge":  "",
                             "description":  "Jenis: Pulpen Gel. Merk: Dtian. Isi: 192 pcs",
                             "stock":  91,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1585336261026-7f897b6a4163?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "3008230002",
                             "id":  "SHOP-112",
                             "retailPrice":  12250,
                             "minOrder":  1,
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  12250,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  11638,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  11025,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "BULPEN GEL EG-V TL6549 + MIKA @192",
                             "badge":  "",
                             "description":  "Jenis: Pulpen Gel. Tipe: EG-V TL6549 + Mika. Isi: 192 pcs",
                             "stock":  92,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1585336261026-7f897b6a4163?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "2207260026",
                             "id":  "SHOP-113",
                             "retailPrice":  13750,
                             "minOrder":  1,
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  13750,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  13062,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  12375,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "BULPEN GEL ES-1020 HITAM @144",
                             "badge":  "",
                             "description":  "Jenis: Pulpen Gel. Tipe: ES-1020. Warna: Hitam. Isi: 144 pcs",
                             "stock":  93,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1585336261026-7f897b6a4163?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "705250001",
                             "id":  "SHOP-114",
                             "retailPrice":  9250,
                             "minOrder":  1,
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  9250,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  8788,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  8325,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "BULPEN GEL ESCO 82 @144",
                             "badge":  "",
                             "description":  "Jenis: Pulpen Gel. Merk: Esco. Tipe: 82. Isi: 144 pcs",
                             "stock":  94,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1585336261026-7f897b6a4163?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B06091",
                             "id":  "SHOP-115",
                             "retailPrice":  12000,
                             "minOrder":  1,
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  12000,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pcs",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  11400,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pcs (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  10800,
                                               "minQty":  30,
                                               "label":  "30+ Pcs (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "BULPEN GEL ESCO GP-822/830",
                             "badge":  "",
                             "description":  "Jenis: Pulpen Gel. Merk: Esco. Tipe: GP-822/830",
                             "stock":  95,
                             "unit":  "Pcs"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "3011240001",
                             "id":  "SHOP-116",
                             "retailPrice":  23750,
                             "minOrder":  1,
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  23750,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  22562,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  21375,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "BUKU ALFA/NEWSTAR 38 TULIS @32",
                             "badge":  "",
                             "description":  "Jenis: Buku tulis. Merk: Alfa/Newstar. Ukuran: 38. Isi: 32 pcs",
                             "stock":  96,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "2406260003",
                             "id":  "SHOP-117",
                             "retailPrice":  21000,
                             "minOrder":  1,
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  21000,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  19950,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  18900,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "BUKU ALFA/NEWSTAR TULIS 32 @40",
                             "badge":  "",
                             "description":  "Jenis: Buku tulis. Merk: Alfa/Newstar. Ukuran: 32. Isi: 40 pcs",
                             "stock":  97,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "2303240001",
                             "id":  "SHOP-118",
                             "retailPrice":  21250,
                             "minOrder":  1,
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  21250,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  20188,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  19125,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "BUKU ALL STAR 32 TULIS @36",
                             "badge":  "",
                             "description":  "Jenis: Buku tulis. Merk: All Star. Ukuran: 32. Isi: 36 pcs",
                             "stock":  98,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "2303240002",
                             "id":  "SHOP-119",
                             "retailPrice":  24500,
                             "minOrder":  1,
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  24500,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  23275,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  22050,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "BUKU ALL STAR 38 TULIS @32",
                             "badge":  "",
                             "description":  "Jenis: Buku tulis. Merk: All Star. Ukuran: 38. Isi: 32 pcs",
                             "stock":  99,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "2303240003",
                             "id":  "SHOP-120",
                             "retailPrice":  34250,
                             "minOrder":  1,
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  34250,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  32538,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  30825,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "BUKU ALL STAR 58 TULIS @20",
                             "badge":  "",
                             "description":  "Jenis: Buku tulis. Merk: All Star. Ukuran: 58. Isi: 20 pcs",
                             "stock":  100,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "2303240004",
                             "id":  "SHOP-121",
                             "retailPrice":  33250,
                             "minOrder":  1,
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  33250,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  31588,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  29925,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "BUKU ALL STAR BOXY 30 TULIS @24",
                             "badge":  "",
                             "description":  "Jenis: Buku tulis. Merk: All Star. Tipe: Boxy. Ukuran: 30. Isi: 24 pcs",
                             "stock":  101,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "2303240005",
                             "id":  "SHOP-122",
                             "retailPrice":  36500,
                             "minOrder":  1,
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  36500,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  34675,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  32850,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "BUKU ALL STAR BOXY 36 TULIS @24",
                             "badge":  "",
                             "description":  "Jenis: Buku tulis. Merk: All Star. Tipe: Boxy. Ukuran: 36. Isi: 24 pcs",
                             "stock":  102,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "2303240006",
                             "id":  "SHOP-123",
                             "retailPrice":  39000,
                             "minOrder":  1,
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  39000,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  37050,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  35100,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "BUKU ALL STAR BOXY 42 TULIS @16",
                             "badge":  "",
                             "description":  "Jenis: Buku tulis. Merk: All Star. Tipe: Boxy. Ukuran: 42. Isi: 16 pcs",
                             "stock":  103,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "2303240007",
                             "id":  "SHOP-124",
                             "retailPrice":  48750,
                             "minOrder":  1,
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  48750,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  46312,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  43875,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "BUKU ALL STAR BOXY 50 TULIS @20",
                             "badge":  "",
                             "description":  "Jenis: Buku tulis. Merk: All Star. Tipe: Boxy. Ukuran: 50. Isi: 20 pcs",
                             "stock":  104,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "406250005",
                             "id":  "SHOP-125",
                             "retailPrice":  41000,
                             "minOrder":  1,
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  41000,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  38950,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  36900,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "BUKU BEST ONE BOXY 50 @16",
                             "badge":  "",
                             "description":  "Jenis: Buku. Merk: Best One. Tipe: Boxy. Ukuran: 50. Isi: 16 pcs",
                             "stock":  105,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "406250004",
                             "id":  "SHOP-126",
                             "retailPrice":  23750,
                             "minOrder":  1,
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  23750,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  22562,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  21375,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "BUKU BEST ONE HALUS 38 @32",
                             "badge":  "",
                             "description":  "Jenis: Buku. Merk: Best One. Tipe: Halus. Ukuran: 38. Isi: 32 pcs",
                             "stock":  106,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "406250001",
                             "id":  "SHOP-127",
                             "retailPrice":  20000,
                             "minOrder":  1,
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  20000,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  19000,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  18000,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "BUKU BEST ONE KOTAK BSR @48",
                             "badge":  "",
                             "description":  "Jenis: Buku. Merk: Best One. Tipe: Kotak BSR. Isi: 48 pcs",
                             "stock":  107,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "2805260003",
                             "id":  "SHOP-128",
                             "retailPrice":  22250,
                             "minOrder":  1,
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  22250,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  21138,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  20025,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "BUKU BEST ONE KOTAK KCL @32",
                             "badge":  "",
                             "description":  "Jenis: Buku. Merk: Best One. Tipe: Kotak KCL. Isi: 32 pcs",
                             "stock":  108,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "2805260008",
                             "id":  "SHOP-129",
                             "retailPrice":  18250,
                             "minOrder":  1,
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  18250,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  17338,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  16425,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "BUKU BEST ONE KOTAK TGG @48",
                             "badge":  "",
                             "description":  "Jenis: Buku. Merk: Best One. Tipe: Kotak TGG. Isi: 48 pcs",
                             "stock":  109,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "406250002",
                             "id":  "SHOP-130",
                             "retailPrice":  20000,
                             "minOrder":  1,
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  20000,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  19000,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  18000,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "BUKU BEST ONE TULIS 32 @40",
                             "badge":  "",
                             "description":  "Jenis: Buku tulis. Merk: Best One. Ukuran: 32. Isi: 40 pcs",
                             "stock":  110,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "1804250002",
                             "id":  "SHOP-131",
                             "retailPrice":  22750,
                             "minOrder":  1,
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  22750,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  21612,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  20475,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "BUKU BEST ONE TULIS 38 @32",
                             "badge":  "",
                             "description":  "Jenis: Buku tulis. Merk: Best One. Ukuran: 38. Isi: 32 pcs",
                             "stock":  111,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "406250003",
                             "id":  "SHOP-132",
                             "retailPrice":  33750,
                             "minOrder":  1,
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  33750,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  32062,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  30375,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "BUKU BEST ONE TULIS 58 @24",
                             "badge":  "",
                             "description":  "Jenis: Buku tulis. Merk: Best One. Ukuran: 58. Isi: 24 pcs",
                             "stock":  112,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "1207240003",
                             "id":  "SHOP-133",
                             "retailPrice":  35750,
                             "minOrder":  1,
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  35750,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  33962,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  32175,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "BUKU BOXY BIGBOSSSSS SIDU 36 @20",
                             "badge":  "",
                             "description":  "Jenis: Buku. Tipe: Boxy. Merk: Sidu. Nama: Bigbosssss. Ukuran: 36. Isi: 20 pcs",
                             "stock":  113,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B00433",
                             "id":  "SHOP-134",
                             "retailPrice":  24250,
                             "minOrder":  1,
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  24250,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  23038,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  21825,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "BUKU BOXY BIGBOSSS SIDU 42 @24",
                             "badge":  "",
                             "description":  "Jenis: Buku. Tipe: Boxy. Merk: Sidu. Nama: Bigbosss. Ukuran: 42. Isi: 24 pcs",
                             "stock":  114,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "2206260001",
                             "id":  "SHOP-135",
                             "retailPrice":  28750,
                             "minOrder":  1,
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  28750,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  27312,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  25875,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "BUKU BOXY VISION 36 @24",
                             "badge":  "",
                             "description":  "Jenis: Buku. Tipe: Boxy. Merk: Vision. Ukuran: 36. Isi: 24 pcs",
                             "stock":  115,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "1405250004",
                             "id":  "SHOP-136",
                             "retailPrice":  20000,
                             "minOrder":  1,
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  20000,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  19000,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  18000,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "BUKU BOXY VISION 42 @24",
                             "badge":  "",
                             "description":  "Jenis: Buku. Tipe: Boxy. Merk: Vision. Ukuran: 42. Isi: 24 pcs",
                             "stock":  116,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "2206260002",
                             "id":  "SHOP-137",
                             "retailPrice":  37750,
                             "minOrder":  1,
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  37750,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  35862,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  33975,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "BUKU BOXY VISION 50 @16",
                             "badge":  "",
                             "description":  "Jenis: Buku. Tipe: Boxy. Merk: Vision. Ukuran: 50. Isi: 16 pcs",
                             "stock":  117,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "1501260006",
                             "id":  "SHOP-138",
                             "retailPrice":  15000,
                             "minOrder":  1,
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  15000,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  14250,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  13500,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "BUKU GAMBAR BIASA",
                             "badge":  "",
                             "description":  "Jenis: Buku gambar. Tipe: Biasa",
                             "stock":  118,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B00049",
                             "id":  "SHOP-139",
                             "retailPrice":  48000,
                             "minOrder":  1,
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  48000,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  45600,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  43200,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "BUKU GBR A3 DODO @10",
                             "badge":  "",
                             "description":  "Jenis: Buku gambar. Merk: Dodo. Ukuran: A3. Isi: 10 pcs",
                             "stock":  119,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B06931",
                             "id":  "SHOP-140",
                             "retailPrice":  9500,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  9500,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pcs",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  9025,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pcs (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  8550,
                                               "minQty":  30,
                                               "label":  "30+ Pcs (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "HAIR BODY MIST MARINA 100ML @36",
                             "badge":  "",
                             "description":  "Jenis: Hair Body Mist. Merk: Marina. Volume: 100 ml. Isi: 36 pcs",
                             "stock":  50,
                             "unit":  "Pcs"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B04531",
                             "id":  "SHOP-141",
                             "retailPrice":  23250,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  23250,
                                               "minQty":  1,
                                               "label":  "1 - 9 Slop",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  22088,
                                               "minQty":  10,
                                               "label":  "10 - 29 Slop (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  20925,
                                               "minQty":  30,
                                               "label":  "30+ Slop (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "HBL MARINA NATURAL 100ML HIJAU @12",
                             "badge":  "",
                             "description":  "Jenis: HBL. Merk: Marina Natural. Volume: 100 ml. Warna: Hijau. Isi: 12 pcs",
                             "stock":  51,
                             "unit":  "Slop"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B04530",
                             "id":  "SHOP-142",
                             "retailPrice":  23250,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  23250,
                                               "minQty":  1,
                                               "label":  "1 - 9 Slop",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  22088,
                                               "minQty":  10,
                                               "label":  "10 - 29 Slop (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  20925,
                                               "minQty":  30,
                                               "label":  "30+ Slop (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "HBL MARINA NATURAL 100ML KUNING @12",
                             "badge":  "",
                             "description":  "Jenis: HBL. Merk: Marina Natural. Volume: 100 ml. Warna: Kuning. Isi: 12 pcs",
                             "stock":  52,
                             "unit":  "Slop"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B04584",
                             "id":  "SHOP-143",
                             "retailPrice":  23250,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  23250,
                                               "minQty":  1,
                                               "label":  "1 - 9 Slop",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  22088,
                                               "minQty":  10,
                                               "label":  "10 - 29 Slop (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  20925,
                                               "minQty":  30,
                                               "label":  "30+ Slop (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "HBL MARINA NATURAL 100ML ORANGE @12",
                             "badge":  "",
                             "description":  "Jenis: HBL. Merk: Marina Natural. Volume: 100 ml. Warna: Orange. Isi: 12 pcs",
                             "stock":  53,
                             "unit":  "Slop"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B04529",
                             "id":  "SHOP-144",
                             "retailPrice":  23250,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  23250,
                                               "minQty":  1,
                                               "label":  "1 - 9 Slop",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  22088,
                                               "minQty":  10,
                                               "label":  "10 - 29 Slop (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  20925,
                                               "minQty":  30,
                                               "label":  "30+ Slop (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "HBL MARINA NATURAL 100ML PINK @12",
                             "badge":  "",
                             "description":  "Jenis: HBL. Merk: Marina Natural. Volume: 100 ml. Warna: Pink. Isi: 12 pcs",
                             "stock":  54,
                             "unit":  "Slop"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "1206240010",
                             "id":  "SHOP-145",
                             "retailPrice":  33500,
                             "minOrder":  1,
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  33500,
                                               "minQty":  1,
                                               "label":  "1 - 9 Slop",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  31825,
                                               "minQty":  10,
                                               "label":  "10 - 29 Slop (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  30150,
                                               "minQty":  30,
                                               "label":  "30+ Slop (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "HBL MARINA NATURAL 150ML+ HIJAU @8",
                             "badge":  "",
                             "description":  "Jenis: HBL. Merk: Marina Natural. Volume: 150 ml+. Warna: Hijau. Isi: 8 pcs",
                             "stock":  55,
                             "unit":  "Slop"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "1206240011",
                             "id":  "SHOP-146",
                             "retailPrice":  33500,
                             "minOrder":  1,
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  33500,
                                               "minQty":  1,
                                               "label":  "1 - 9 Slop",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  31825,
                                               "minQty":  10,
                                               "label":  "10 - 29 Slop (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  30150,
                                               "minQty":  30,
                                               "label":  "30+ Slop (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "HBL MARINA NATURAL 150ML+ KUNING @8",
                             "badge":  "",
                             "description":  "Jenis: HBL. Merk: Marina Natural. Volume: 150 ml+. Warna: Kuning. Isi: 8 pcs",
                             "stock":  56,
                             "unit":  "Slop"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "1206240012",
                             "id":  "SHOP-147",
                             "retailPrice":  33500,
                             "minOrder":  1,
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  33500,
                                               "minQty":  1,
                                               "label":  "1 - 9 Slop",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  31825,
                                               "minQty":  10,
                                               "label":  "10 - 29 Slop (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  30150,
                                               "minQty":  30,
                                               "label":  "30+ Slop (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "HBL MARINA NATURAL 150ML+ ORANGE @8",
                             "badge":  "",
                             "description":  "Jenis: HBL. Merk: Marina Natural. Volume: 150 ml+. Warna: Orange. Isi: 8 pcs",
                             "stock":  57,
                             "unit":  "Slop"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "1206240013",
                             "id":  "SHOP-148",
                             "retailPrice":  33500,
                             "minOrder":  1,
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  33500,
                                               "minQty":  1,
                                               "label":  "1 - 9 Slop",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  31825,
                                               "minQty":  10,
                                               "label":  "10 - 29 Slop (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  30150,
                                               "minQty":  30,
                                               "label":  "30+ Slop (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "HBL MARINA NATURAL 150ML+ PINK @8",
                             "badge":  "",
                             "description":  "Jenis: HBL. Merk: Marina Natural. Volume: 150 ml+. Warna: Pink. Isi: 8 pcs",
                             "stock":  58,
                             "unit":  "Slop"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "1206240014",
                             "id":  "SHOP-149",
                             "retailPrice":  33500,
                             "minOrder":  1,
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  33500,
                                               "minQty":  1,
                                               "label":  "1 - 9 Slop",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  31825,
                                               "minQty":  10,
                                               "label":  "10 - 29 Slop (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  30150,
                                               "minQty":  30,
                                               "label":  "30+ Slop (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "HBL MARINA NATURAL 150ML+ UNGU @8",
                             "badge":  "",
                             "description":  "Jenis: HBL. Merk: Marina Natural. Volume: 150 ml+. Warna: Ungu. Isi: 8 pcs",
                             "stock":  59,
                             "unit":  "Slop"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B04586",
                             "id":  "SHOP-150",
                             "retailPrice":  39000,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  39000,
                                               "minQty":  1,
                                               "label":  "1 - 9 Slop",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  37050,
                                               "minQty":  10,
                                               "label":  "10 - 29 Slop (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  35100,
                                               "minQty":  30,
                                               "label":  "30+ Slop (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "HBL MARINA NATURAL 190ML UNGU @8",
                             "badge":  "",
                             "description":  "Jenis: HBL. Merk: Marina Natural. Volume: 190 ml. Warna: Ungu. Isi: 8 pcs",
                             "stock":  60,
                             "unit":  "Slop"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B04587",
                             "id":  "SHOP-151",
                             "retailPrice":  39000,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  39000,
                                               "minQty":  1,
                                               "label":  "1 - 9 Slop",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  37050,
                                               "minQty":  10,
                                               "label":  "10 - 29 Slop (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  35100,
                                               "minQty":  30,
                                               "label":  "30+ Slop (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "HBL MARINA NATURAL 200ML HIJAU @8",
                             "badge":  "",
                             "description":  "Jenis: HBL. Merk: Marina Natural. Volume: 200 ml. Warna: Hijau. Isi: 8 pcs",
                             "stock":  61,
                             "unit":  "Slop"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B04585",
                             "id":  "SHOP-152",
                             "retailPrice":  39000,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  39000,
                                               "minQty":  1,
                                               "label":  "1 - 9 Slop",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  37050,
                                               "minQty":  10,
                                               "label":  "10 - 29 Slop (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  35100,
                                               "minQty":  30,
                                               "label":  "30+ Slop (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "HBL MARINA NATURAL 200ML KUNING @8",
                             "badge":  "",
                             "description":  "Jenis: HBL. Merk: Marina Natural. Volume: 200 ml. Warna: Kuning. Isi: 8 pcs",
                             "stock":  62,
                             "unit":  "Slop"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B02298",
                             "id":  "SHOP-153",
                             "retailPrice":  39000,
                             "minOrder":  1,
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  39000,
                                               "minQty":  1,
                                               "label":  "1 - 9 Slop",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  37050,
                                               "minQty":  10,
                                               "label":  "10 - 29 Slop (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  35100,
                                               "minQty":  30,
                                               "label":  "30+ Slop (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "HBL MARINA NATURAL 200ML ORANGE @8",
                             "badge":  "",
                             "description":  "Jenis: HBL. Merk: Marina Natural. Volume: 200 ml. Warna: Orange. Isi: 8 pcs",
                             "stock":  63,
                             "unit":  "Slop"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B04867",
                             "id":  "SHOP-154",
                             "retailPrice":  39000,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  39000,
                                               "minQty":  1,
                                               "label":  "1 - 9 Slop",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  37050,
                                               "minQty":  10,
                                               "label":  "10 - 29 Slop (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  35100,
                                               "minQty":  30,
                                               "label":  "30+ Slop (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "HBL MARINA NATURAL 200ML PINK @8",
                             "badge":  "",
                             "description":  "Jenis: HBL. Merk: Marina Natural. Volume: 200 ml. Warna: Pink. Isi: 8 pcs",
                             "stock":  64,
                             "unit":  "Slop"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "704250005",
                             "id":  "SHOP-155",
                             "retailPrice":  11500,
                             "minOrder":  1,
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  11500,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pcs",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  10925,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pcs (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  10350,
                                               "minQty":  30,
                                               "label":  "30+ Pcs (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "HBL MARINA NATURAL 350ML HIJAU @12",
                             "badge":  "",
                             "description":  "Jenis: HBL. Merk: Marina Natural. Volume: 350 ml. Warna: Hijau. Isi: 12 pcs",
                             "stock":  65,
                             "unit":  "Pcs"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "707250005",
                             "id":  "SHOP-156",
                             "retailPrice":  11500,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  11500,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pcs",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  10925,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pcs (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  10350,
                                               "minQty":  30,
                                               "label":  "30+ Pcs (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "HBL MARINA NATURAL 350ML KUNING @12",
                             "badge":  "",
                             "description":  "Jenis: HBL. Merk: Marina Natural. Volume: 350 ml. Warna: Kuning. Isi: 12 pcs",
                             "stock":  66,
                             "unit":  "Pcs"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "704250004",
                             "id":  "SHOP-157",
                             "retailPrice":  11500,
                             "minOrder":  1,
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  11500,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pcs",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  10925,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pcs (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  10350,
                                               "minQty":  30,
                                               "label":  "30+ Pcs (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "HBL MARINA NATURAL 350ML ORANGE @12",
                             "badge":  "",
                             "description":  "Jenis: HBL. Merk: Marina Natural. Volume: 350 ml. Warna: Orange. Isi: 12 pcs",
                             "stock":  67,
                             "unit":  "Pcs"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "704250006",
                             "id":  "SHOP-158",
                             "retailPrice":  11500,
                             "minOrder":  1,
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  11500,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pcs",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  10925,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pcs (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  10350,
                                               "minQty":  30,
                                               "label":  "30+ Pcs (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "HBL MARINA NATURAL 350ML PINK @12",
                             "badge":  "",
                             "description":  "Jenis: HBL. Merk: Marina Natural. Volume: 350 ml. Warna: Pink. Isi: 12 pcs",
                             "stock":  68,
                             "unit":  "Pcs"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "1606250004",
                             "id":  "SHOP-159",
                             "retailPrice":  20000,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  20000,
                                               "minQty":  1,
                                               "label":  "1 - 9 Slop",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  19000,
                                               "minQty":  10,
                                               "label":  "10 - 29 Slop (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  18000,
                                               "minQty":  30,
                                               "label":  "30+ Slop (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "HBL MARINA NATURAL 75ML HIJAU @12",
                             "badge":  "",
                             "description":  "Jenis: HBL. Merk: Marina Natural. Volume: 75 ml. Warna: Hijau. Isi: 12 pcs",
                             "stock":  69,
                             "unit":  "Slop"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "1606250005",
                             "id":  "SHOP-160",
                             "retailPrice":  20000,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  20000,
                                               "minQty":  1,
                                               "label":  "1 - 9 Slop",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  19000,
                                               "minQty":  10,
                                               "label":  "10 - 29 Slop (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  18000,
                                               "minQty":  30,
                                               "label":  "30+ Slop (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "HBL MARINA NATURAL 75ML KUNING @12",
                             "badge":  "",
                             "description":  "Jenis: HBL. Merk: Marina Natural. Volume: 75 ml. Warna: Kuning. Isi: 12 pcs",
                             "stock":  70,
                             "unit":  "Slop"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "1606250006",
                             "id":  "SHOP-161",
                             "retailPrice":  20000,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  20000,
                                               "minQty":  1,
                                               "label":  "1 - 9 Slop",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  19000,
                                               "minQty":  10,
                                               "label":  "10 - 29 Slop (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  18000,
                                               "minQty":  30,
                                               "label":  "30+ Slop (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "HBL MARINA NATURAL 75ML ORANGE @12",
                             "badge":  "",
                             "description":  "Jenis: HBL. Merk: Marina Natural. Volume: 75 ml. Warna: Orange. Isi: 12 pcs",
                             "stock":  71,
                             "unit":  "Slop"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "1606250007",
                             "id":  "SHOP-162",
                             "retailPrice":  20000,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  20000,
                                               "minQty":  1,
                                               "label":  "1 - 9 Slop",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  19000,
                                               "minQty":  10,
                                               "label":  "10 - 29 Slop (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  18000,
                                               "minQty":  30,
                                               "label":  "30+ Slop (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "HBL MARINA NATURAL 75ML PINK @12",
                             "badge":  "",
                             "description":  "Jenis: HBL. Merk: Marina Natural. Volume: 75 ml. Warna: Pink. Isi: 12 pcs",
                             "stock":  72,
                             "unit":  "Slop"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B02260",
                             "id":  "SHOP-163",
                             "retailPrice":  23250,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  23250,
                                               "minQty":  1,
                                               "label":  "1 - 9 Slop",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  22088,
                                               "minQty":  10,
                                               "label":  "10 - 29 Slop (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  20925,
                                               "minQty":  30,
                                               "label":  "30+ Slop (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "HBL MARINA NATURAL 95ML UNGU @12",
                             "badge":  "",
                             "description":  "Jenis: HBL. Merk: Marina Natural. Volume: 95 ml. Warna: Ungu. Isi: 12 pcs",
                             "stock":  73,
                             "unit":  "Slop"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B03053",
                             "id":  "SHOP-164",
                             "retailPrice":  12750,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  12750,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pcs",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  12112,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pcs (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  11475,
                                               "minQty":  30,
                                               "label":  "30+ Pcs (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "SEMIR MIRANDA KECIL MC-1 @144",
                             "badge":  "",
                             "description":  "Jenis: Semir. Merk: Miranda. Ukuran: Kecil. Kode: MC-1. Isi: 144 pcs",
                             "stock":  74,
                             "unit":  "Pcs"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B04575",
                             "id":  "SHOP-165",
                             "retailPrice":  12750,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  12750,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pcs",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  12112,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pcs (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  11475,
                                               "minQty":  30,
                                               "label":  "30+ Pcs (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "SEMIR MIRANDA KECIL MC-10 @144",
                             "badge":  "",
                             "description":  "Jenis: Semir. Merk: Miranda. Ukuran: Kecil. Kode: MC-10. Isi: 144 pcs",
                             "stock":  75,
                             "unit":  "Pcs"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B04576",
                             "id":  "SHOP-166",
                             "retailPrice":  12750,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  12750,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pcs",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  12112,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pcs (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  11475,
                                               "minQty":  30,
                                               "label":  "30+ Pcs (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "SEMIR MIRANDA KECIL MC-11 @144",
                             "badge":  "",
                             "description":  "Jenis: Semir. Merk: Miranda. Ukuran: Kecil. Kode: MC-11. Isi: 144 pcs",
                             "stock":  76,
                             "unit":  "Pcs"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B04577",
                             "id":  "SHOP-167",
                             "retailPrice":  12750,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  12750,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pcs",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  12112,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pcs (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  11475,
                                               "minQty":  30,
                                               "label":  "30+ Pcs (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "SEMIR MIRANDA KECIL MC-12 @144",
                             "badge":  "",
                             "description":  "Jenis: Semir. Merk: Miranda. Ukuran: Kecil. Kode: MC-12. Isi: 144 pcs",
                             "stock":  77,
                             "unit":  "Pcs"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B04579",
                             "id":  "SHOP-168",
                             "retailPrice":  12750,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  12750,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pcs",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  12112,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pcs (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  11475,
                                               "minQty":  30,
                                               "label":  "30+ Pcs (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "SEMIR MIRANDA KECIL MC-13 @144",
                             "badge":  "",
                             "description":  "Jenis: Semir. Merk: Miranda. Ukuran: Kecil. Kode: MC-13. Isi: 144 pcs",
                             "stock":  78,
                             "unit":  "Pcs"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B04580",
                             "id":  "SHOP-169",
                             "retailPrice":  12750,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  12750,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pcs",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  12112,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pcs (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  11475,
                                               "minQty":  30,
                                               "label":  "30+ Pcs (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "SEMIR MIRANDA KECIL MC-14 @144",
                             "badge":  "",
                             "description":  "Jenis: Semir. Merk: Miranda. Ukuran: Kecil. Kode: MC-14. Isi: 144 pcs",
                             "stock":  79,
                             "unit":  "Pcs"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B04581",
                             "id":  "SHOP-170",
                             "retailPrice":  12750,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  12750,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pcs",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  12112,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pcs (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  11475,
                                               "minQty":  30,
                                               "label":  "30+ Pcs (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "SEMIR MIRANDA KECIL MC-15 @144",
                             "badge":  "",
                             "description":  "Jenis: Semir. Merk: Miranda. Ukuran: Kecil. Kode: MC-15. Isi: 144 pcs",
                             "stock":  80,
                             "unit":  "Pcs"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B04582",
                             "id":  "SHOP-171",
                             "retailPrice":  12750,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  12750,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pcs",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  12112,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pcs (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  11475,
                                               "minQty":  30,
                                               "label":  "30+ Pcs (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "SEMIR MIRANDA KECIL MC-16 @144",
                             "badge":  "",
                             "description":  "Jenis: Semir. Merk: Miranda. Ukuran: Kecil. Kode: MC-16. Isi: 144 pcs",
                             "stock":  81,
                             "unit":  "Pcs"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B04967",
                             "id":  "SHOP-172",
                             "retailPrice":  12750,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  12750,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pcs",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  12112,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pcs (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  11475,
                                               "minQty":  30,
                                               "label":  "30+ Pcs (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "SEMIR MIRANDA KECIL MC-17 @144",
                             "badge":  "",
                             "description":  "Jenis: Semir. Merk: Miranda. Ukuran: Kecil. Kode: MC-17. Isi: 144 pcs",
                             "stock":  82,
                             "unit":  "Pcs"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B04966",
                             "id":  "SHOP-173",
                             "retailPrice":  12750,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  12750,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pcs",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  12112,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pcs (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  11475,
                                               "minQty":  30,
                                               "label":  "30+ Pcs (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "SEMIR MIRANDA KECIL MC-18 @144",
                             "badge":  "",
                             "description":  "Jenis: Semir. Merk: Miranda. Ukuran: Kecil. Kode: MC-18. Isi: 144 pcs",
                             "stock":  83,
                             "unit":  "Pcs"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B04969",
                             "id":  "SHOP-174",
                             "retailPrice":  12750,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  12750,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pcs",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  12112,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pcs (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  11475,
                                               "minQty":  30,
                                               "label":  "30+ Pcs (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "SEMIR MIRANDA KECIL MC-19 @144",
                             "badge":  "",
                             "description":  "Jenis: Semir. Merk: Miranda. Ukuran: Kecil. Kode: MC-19. Isi: 144 pcs",
                             "stock":  84,
                             "unit":  "Pcs"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B04567",
                             "id":  "SHOP-175",
                             "retailPrice":  12750,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  12750,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pcs",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  12112,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pcs (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  11475,
                                               "minQty":  30,
                                               "label":  "30+ Pcs (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "SEMIR MIRANDA KECIL MC-2 @144",
                             "badge":  "",
                             "description":  "Jenis: Semir. Merk: Miranda. Ukuran: Kecil. Kode: MC-2. Isi: 144 pcs",
                             "stock":  85,
                             "unit":  "Pcs"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "2003240001",
                             "id":  "SHOP-176",
                             "retailPrice":  12750,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  12750,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pcs",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  12112,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pcs (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  11475,
                                               "minQty":  30,
                                               "label":  "30+ Pcs (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "SEMIR MIRANDA KECIL MC-20 @144",
                             "badge":  "",
                             "description":  "Jenis: Semir. Merk: Miranda. Ukuran: Kecil. Kode: MC-20. Isi: 144 pcs",
                             "stock":  86,
                             "unit":  "Pcs"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "311250001",
                             "id":  "SHOP-177",
                             "retailPrice":  12750,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  12750,
                                               "minQty":  1,
                                               "label":  "1 - 9 Biji",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  12112,
                                               "minQty":  10,
                                               "label":  "10 - 29 Biji (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  11475,
                                               "minQty":  30,
                                               "label":  "30+ Biji (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "SEMIR MIRANDA KECIL MC-21 @144",
                             "badge":  "",
                             "description":  "Jenis: Semir. Merk: Miranda. Ukuran: Kecil. Kode: MC-21. Isi: 144 pcs",
                             "stock":  87,
                             "unit":  "Biji"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "1501260003",
                             "id":  "SHOP-178",
                             "retailPrice":  12750,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  12750,
                                               "minQty":  1,
                                               "label":  "1 - 9 Biji",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  12112,
                                               "minQty":  10,
                                               "label":  "10 - 29 Biji (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  11475,
                                               "minQty":  30,
                                               "label":  "30+ Biji (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "SEMIR MIRANDA KECIL MC-22 @144",
                             "badge":  "",
                             "description":  "Jenis: Semir. Merk: Miranda. Ukuran: Kecil. Kode: MC-22. Isi: 144 pcs",
                             "stock":  88,
                             "unit":  "Biji"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "1501260004",
                             "id":  "SHOP-179",
                             "retailPrice":  12750,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  12750,
                                               "minQty":  1,
                                               "label":  "1 - 9 Biji",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  12112,
                                               "minQty":  10,
                                               "label":  "10 - 29 Biji (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  11475,
                                               "minQty":  30,
                                               "label":  "30+ Biji (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "SEMIR MIRANDA KECIL MC-23 @144",
                             "badge":  "",
                             "description":  "Jenis: Semir. Merk: Miranda. Ukuran: Kecil. Kode: MC-23. Isi: 144 pcs",
                             "stock":  89,
                             "unit":  "Biji"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "1501260005",
                             "id":  "SHOP-180",
                             "retailPrice":  12750,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  12750,
                                               "minQty":  1,
                                               "label":  "1 - 9 Biji",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  12112,
                                               "minQty":  10,
                                               "label":  "10 - 29 Biji (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  11475,
                                               "minQty":  30,
                                               "label":  "30+ Biji (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "SEMIR MIRANDA KECIL MC-24 @144",
                             "badge":  "",
                             "description":  "Jenis: Semir. Merk: Miranda. Ukuran: Kecil. Kode: MC-24. Isi: 144 pcs",
                             "stock":  90,
                             "unit":  "Biji"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B04568",
                             "id":  "SHOP-181",
                             "retailPrice":  12750,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  12750,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pcs",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  12112,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pcs (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  11475,
                                               "minQty":  30,
                                               "label":  "30+ Pcs (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "SEMIR MIRANDA KECIL MC-3 @144",
                             "badge":  "",
                             "description":  "Jenis: Semir. Merk: Miranda. Ukuran: Kecil. Kode: MC-3. Isi: 144 pcs",
                             "stock":  91,
                             "unit":  "Pcs"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B04569",
                             "id":  "SHOP-182",
                             "retailPrice":  12750,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  12750,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pcs",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  12112,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pcs (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  11475,
                                               "minQty":  30,
                                               "label":  "30+ Pcs (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "SEMIR MIRANDA KECIL MC-4 @144",
                             "badge":  "",
                             "description":  "Jenis: Semir. Merk: Miranda. Ukuran: Kecil. Kode: MC-4. Isi: 144 pcs",
                             "stock":  92,
                             "unit":  "Pcs"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B04570",
                             "id":  "SHOP-183",
                             "retailPrice":  12750,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  12750,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pcs",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  12112,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pcs (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  11475,
                                               "minQty":  30,
                                               "label":  "30+ Pcs (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "SEMIR MIRANDA KECIL MC-5 @144",
                             "badge":  "",
                             "description":  "Jenis: Semir. Merk: Miranda. Ukuran: Kecil. Kode: MC-5. Isi: 144 pcs",
                             "stock":  93,
                             "unit":  "Pcs"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B04571",
                             "id":  "SHOP-184",
                             "retailPrice":  12750,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  12750,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pcs",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  12112,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pcs (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  11475,
                                               "minQty":  30,
                                               "label":  "30+ Pcs (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "SEMIR MIRANDA KECIL MC-6 @144",
                             "badge":  "",
                             "description":  "Jenis: Semir. Merk: Miranda. Ukuran: Kecil. Kode: MC-6. Isi: 144 pcs",
                             "stock":  94,
                             "unit":  "Pcs"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B04572",
                             "id":  "SHOP-185",
                             "retailPrice":  12750,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  12750,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pcs",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  12112,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pcs (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  11475,
                                               "minQty":  30,
                                               "label":  "30+ Pcs (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "SEMIR MIRANDA KECIL MC-7 @144",
                             "badge":  "",
                             "description":  "Jenis: Semir. Merk: Miranda. Ukuran: Kecil. Kode: MC-7. Isi: 144 pcs",
                             "stock":  95,
                             "unit":  "Pcs"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B04573",
                             "id":  "SHOP-186",
                             "retailPrice":  12750,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  12750,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pcs",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  12112,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pcs (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  11475,
                                               "minQty":  30,
                                               "label":  "30+ Pcs (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "SEMIR MIRANDA KECIL MC-8 @144",
                             "badge":  "",
                             "description":  "Jenis: Semir. Merk: Miranda. Ukuran: Kecil. Kode: MC-8. Isi: 144 pcs",
                             "stock":  96,
                             "unit":  "Pcs"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B04574",
                             "id":  "SHOP-187",
                             "retailPrice":  12750,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  12750,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pcs",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  12112,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pcs (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  11475,
                                               "minQty":  30,
                                               "label":  "30+ Pcs (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "SEMIR MIRANDA KECIL MC-9 @144",
                             "badge":  "",
                             "description":  "Jenis: Semir. Merk: Miranda. Ukuran: Kecil. Kode: MC-9. Isi: 144 pcs",
                             "stock":  97,
                             "unit":  "Pcs"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B06964",
                             "id":  "SHOP-188",
                             "retailPrice":  18250,
                             "minOrder":  1,
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  18250,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pcs",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  17338,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pcs (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  16425,
                                               "minQty":  30,
                                               "label":  "30+ Pcs (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "LIPCREAM NUFACE NO.10 @192",
                             "badge":  "",
                             "description":  "Jenis: Lipcream. Merk: Nuface. No.: 10. Isi: 192 pcs",
                             "stock":  98,
                             "unit":  "Pcs"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B06965",
                             "id":  "SHOP-189",
                             "retailPrice":  18250,
                             "minOrder":  1,
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  18250,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pcs",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  17338,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pcs (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  16425,
                                               "minQty":  30,
                                               "label":  "30+ Pcs (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "LIPCREAM NUFACE NO.11 @192",
                             "badge":  "",
                             "description":  "Jenis: Lipcream. Merk: Nuface. No.: 11. Isi: 192 pcs",
                             "stock":  99,
                             "unit":  "Pcs"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B06966",
                             "id":  "SHOP-190",
                             "retailPrice":  18250,
                             "minOrder":  1,
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  18250,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pcs",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  17338,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pcs (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  16425,
                                               "minQty":  30,
                                               "label":  "30+ Pcs (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "LIPCREAM NUFACE NO.12 @192",
                             "badge":  "",
                             "description":  "Jenis: Lipcream. Merk: Nuface. No.: 12. Isi: 192 pcs",
                             "stock":  100,
                             "unit":  "Pcs"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B06956",
                             "id":  "SHOP-191",
                             "retailPrice":  18250,
                             "minOrder":  1,
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  18250,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pcs",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  17338,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pcs (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  16425,
                                               "minQty":  30,
                                               "label":  "30+ Pcs (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "LIPCREAM NUFACE NO.2 @192",
                             "badge":  "",
                             "description":  "Jenis: Lipcream. Merk: Nuface. No.: 2. Isi: 192 pcs",
                             "stock":  101,
                             "unit":  "Pcs"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B06957",
                             "id":  "SHOP-192",
                             "retailPrice":  18250,
                             "minOrder":  1,
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  18250,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pcs",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  17338,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pcs (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  16425,
                                               "minQty":  30,
                                               "label":  "30+ Pcs (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "LIPCREAM NUFACE NO.3 @192",
                             "badge":  "",
                             "description":  "Jenis: Lipcream. Merk: Nuface. No.: 3. Isi: 192 pcs",
                             "stock":  102,
                             "unit":  "Pcs"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B06958",
                             "id":  "SHOP-193",
                             "retailPrice":  18250,
                             "minOrder":  1,
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  18250,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pcs",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  17338,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pcs (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  16425,
                                               "minQty":  30,
                                               "label":  "30+ Pcs (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "LIPCREAM NUFACE NO.4 @192",
                             "badge":  "",
                             "description":  "Jenis: Lipcream. Merk: Nuface. No.: 4. Isi: 192 pcs",
                             "stock":  103,
                             "unit":  "Pcs"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B06959",
                             "id":  "SHOP-194",
                             "retailPrice":  18250,
                             "minOrder":  1,
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  18250,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pcs",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  17338,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pcs (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  16425,
                                               "minQty":  30,
                                               "label":  "30+ Pcs (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "LIPCREAM NUFACE NO.5 @192",
                             "badge":  "",
                             "description":  "Jenis: Lipcream. Merk: Nuface. No.: 5. Isi: 192 pcs",
                             "stock":  104,
                             "unit":  "Pcs"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B06960",
                             "id":  "SHOP-195",
                             "retailPrice":  18250,
                             "minOrder":  1,
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  18250,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pcs",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  17338,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pcs (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  16425,
                                               "minQty":  30,
                                               "label":  "30+ Pcs (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "LIPCREAM NUFACE NO.6 @192",
                             "badge":  "",
                             "description":  "Jenis: Lipcream. Merk: Nuface. No.: 6. Isi: 192 pcs",
                             "stock":  105,
                             "unit":  "Pcs"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B06961",
                             "id":  "SHOP-196",
                             "retailPrice":  18250,
                             "minOrder":  1,
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  18250,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pcs",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  17338,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pcs (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  16425,
                                               "minQty":  30,
                                               "label":  "30+ Pcs (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "LIPCREAM NUFACE NO.7 @192",
                             "badge":  "",
                             "description":  "Jenis: Lipcream. Merk: Nuface. No.: 7. Isi: 192 pcs",
                             "stock":  106,
                             "unit":  "Pcs"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B06962",
                             "id":  "SHOP-197",
                             "retailPrice":  18250,
                             "minOrder":  1,
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  18250,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pcs",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  17338,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pcs (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  16425,
                                               "minQty":  30,
                                               "label":  "30+ Pcs (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "LIPCREAM NUFACE NO.8 @192",
                             "badge":  "",
                             "description":  "Jenis: Lipcream. Merk: Nuface. No.: 8. Isi: 192 pcs",
                             "stock":  107,
                             "unit":  "Pcs"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B06963",
                             "id":  "SHOP-198",
                             "retailPrice":  18250,
                             "minOrder":  1,
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  18250,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pcs",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  17338,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pcs (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  16425,
                                               "minQty":  30,
                                               "label":  "30+ Pcs (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "LIPCREAM NUFACE NO.9 @192",
                             "badge":  "",
                             "description":  "Jenis: Lipcream. Merk: Nuface. No.: 9. Isi: 192 pcs",
                             "stock":  108,
                             "unit":  "Pcs"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "1610250002",
                             "id":  "SHOP-199",
                             "retailPrice":  43500,
                             "minOrder":  1,
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  43500,
                                               "minQty":  1,
                                               "label":  "1 - 9 Set",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  41325,
                                               "minQty":  10,
                                               "label":  "10 - 29 Set (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  39150,
                                               "minQty":  30,
                                               "label":  "30+ Set (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "NUFACE LIPCARE SET",
                             "badge":  "",
                             "description":  "Merk: Nuface. Jenis: Lipcare Set",
                             "stock":  109,
                             "unit":  "Set"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "3105250003",
                             "id":  "SHOP-200",
                             "retailPrice":  39250,
                             "minOrder":  1,
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  39250,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pcs",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  37288,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pcs (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  35325,
                                               "minQty":  30,
                                               "label":  "30+ Pcs (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "NUFACE LOOSE POWDER 01 12gr @24",
                             "badge":  "",
                             "description":  "Merk: Nuface. Jenis: Loose Powder. No.: 01. Berat: 12 gram. Isi: 24 pcs",
                             "stock":  110,
                             "unit":  "Pcs"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "3105250004",
                             "id":  "SHOP-201",
                             "retailPrice":  39250,
                             "minOrder":  1,
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  39250,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pcs",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  37288,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pcs (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  35325,
                                               "minQty":  30,
                                               "label":  "30+ Pcs (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "NUFACE LOOSE POWDER 02 12gr @24",
                             "badge":  "",
                             "description":  "Merk: Nuface. Jenis: Loose Powder. No.: 02. Berat: 12 gram. Isi: 24 pcs",
                             "stock":  111,
                             "unit":  "Pcs"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "1002260002",
                             "id":  "SHOP-202",
                             "retailPrice":  28000,
                             "minOrder":  1,
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  28000,
                                               "minQty":  1,
                                               "label":  "1 - 9 Biji",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  26600,
                                               "minQty":  10,
                                               "label":  "10 - 29 Biji (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  25200,
                                               "minQty":  30,
                                               "label":  "30+ Biji (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "NUFACE MICELLAR WATER SOOTHE \u0026 CALM",
                             "badge":  "",
                             "description":  "Merk: Nuface. Jenis: Micellar Water. Varian: Soothe \u0026 Calm",
                             "stock":  112,
                             "unit":  "Biji"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "1002260003",
                             "id":  "SHOP-203",
                             "retailPrice":  36050,
                             "minOrder":  1,
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  36050,
                                               "minQty":  1,
                                               "label":  "1 - 9 Biji",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  34248,
                                               "minQty":  10,
                                               "label":  "10 - 29 Biji (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  32445,
                                               "minQty":  30,
                                               "label":  "30+ Biji (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "NUFACE MICELLAR WATER WATERPROOF",
                             "badge":  "",
                             "description":  "Merk: Nuface. Jenis: Micellar Water. Varian: Waterproof",
                             "stock":  113,
                             "unit":  "Biji"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "3105250013",
                             "id":  "SHOP-204",
                             "retailPrice":  34750,
                             "minOrder":  1,
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  34750,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pcs",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  33012,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pcs (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  31275,
                                               "minQty":  30,
                                               "label":  "30+ Pcs (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "NUFACE SATZETT GLOWCREAM 30GR @12",
                             "badge":  "",
                             "description":  "Merk: Nuface. Jenis: Satzett Glowcream. Berat: 30 gram. Isi: 12 pcs",
                             "stock":  114,
                             "unit":  "Pcs"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "3105250005",
                             "id":  "SHOP-205",
                             "retailPrice":  61500,
                             "minOrder":  1,
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  61500,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pcs",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  58425,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pcs (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  55350,
                                               "minQty":  30,
                                               "label":  "30+ Pcs (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "NUFACE SERUM CUSHION 01 12gr @24",
                             "badge":  "",
                             "description":  "Merk: Nuface. Jenis: Serum Cushion. No.: 01. Berat: 12 gram. Isi: 24 pcs",
                             "stock":  115,
                             "unit":  "Pcs"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "3105250006",
                             "id":  "SHOP-206",
                             "retailPrice":  61500,
                             "minOrder":  1,
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  61500,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pcs",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  58425,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pcs (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  55350,
                                               "minQty":  30,
                                               "label":  "30+ Pcs (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "NUFACE SERUM CUSHIONS 02 12gr @24",
                             "badge":  "",
                             "description":  "Merk: Nuface. Jenis: Serum Cushion. No.: 02. Berat: 12 gram. Isi: 24 pcs",
                             "stock":  116,
                             "unit":  "Pcs"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "3105250007",
                             "id":  "SHOP-207",
                             "retailPrice":  29750,
                             "minOrder":  1,
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  29750,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pcs",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  28262,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pcs (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  26775,
                                               "minQty":  30,
                                               "label":  "30+ Pcs (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "NUFACE SUNSCREEN 50GR SPF 30 TU @24",
                             "badge":  "",
                             "description":  "Merk: Nuface. Jenis: Sunscreen. Berat: 50 gram. SPF: 30. Tipe: TU. Isi: 24 pcs",
                             "stock":  117,
                             "unit":  "Pcs"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "3105250008",
                             "id":  "SHOP-208",
                             "retailPrice":  28550,
                             "minOrder":  1,
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  28550,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pcs",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  27122,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pcs (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  25695,
                                               "minQty":  30,
                                               "label":  "30+ Pcs (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "NUFACE SUNSCREEN 50GR SPF 50PA @24",
                             "badge":  "",
                             "description":  "Merk: Nuface. Jenis: Sunscreen. Berat: 50 gram. SPF: 50PA. Isi: 24 pcs",
                             "stock":  118,
                             "unit":  "Pcs"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "3105250012",
                             "id":  "SHOP-209",
                             "retailPrice":  49250,
                             "minOrder":  1,
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  49250,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pcs",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  46788,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pcs (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  44325,
                                               "minQty":  30,
                                               "label":  "30+ Pcs (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "NUFACE SUNSCREEN 50GR SPF 50PA++ @24",
                             "badge":  "",
                             "description":  "Merk: Nuface. Jenis: Sunscreen. Berat: 50 gram. SPF: 50PA++. Isi: 24 pcs",
                             "stock":  119,
                             "unit":  "Pcs"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "111250007",
                             "id":  "SHOP-210",
                             "retailPrice":  84250,
                             "minOrder":  1,
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  84250,
                                               "minQty":  1,
                                               "label":  "1 - 9 Biji",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  80038,
                                               "minQty":  10,
                                               "label":  "10 - 29 Biji (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  75825,
                                               "minQty":  30,
                                               "label":  "30+ Biji (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "NUFACE SUNSCREEN SERUM SPF 50",
                             "badge":  "",
                             "description":  "Merk: Nuface. Jenis: Sunscreen Serum. SPF: 50",
                             "stock":  50,
                             "unit":  "Biji"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "3101250003",
                             "id":  "SHOP-211",
                             "retailPrice":  17500,
                             "minOrder":  1,
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  17500,
                                               "minQty":  1,
                                               "label":  "1 - 9 Biji",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  16625,
                                               "minQty":  10,
                                               "label":  "10 - 29 Biji (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  15750,
                                               "minQty":  30,
                                               "label":  "30+ Biji (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "NUFACE VIT C SERUM",
                             "badge":  "",
                             "description":  "Merk: Nuface. Jenis: Vitamin C Serum",
                             "stock":  51,
                             "unit":  "Biji"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B03101",
                             "id":  "SHOP-212",
                             "retailPrice":  7069,
                             "minOrder":  1,
                             "category":  "Keperluan Bayi \u0026 Anak",
                             "tiers":  [
                                           {
                                               "price":  7069,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pcs",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  6716,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pcs (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  6362,
                                               "minQty":  30,
                                               "label":  "30+ Pcs (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "BEDAK MITU 100+50GR @36",
                             "badge":  "",
                             "description":  "Merk: Mitu. Jenis: Bedak. Berat: 100+50 gram. Isi: 36 pcs",
                             "stock":  52,
                             "unit":  "Pcs"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B06584",
                             "id":  "SHOP-213",
                             "retailPrice":  11500,
                             "minOrder":  1,
                             "category":  "Keperluan Bayi \u0026 Anak",
                             "tiers":  [
                                           {
                                               "price":  11500,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pcs",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  10925,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pcs (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  10350,
                                               "minQty":  30,
                                               "label":  "30+ Pcs (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "BEDAK MITU 50GR @36",
                             "badge":  "",
                             "description":  "Merk: Mitu. Jenis: Bedak. Berat: 50 gram. Isi: 36 pcs",
                             "stock":  53,
                             "unit":  "Pcs"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B03171",
                             "id":  "SHOP-214",
                             "retailPrice":  4250,
                             "minOrder":  1,
                             "category":  "Keperluan Bayi \u0026 Anak",
                             "tiers":  [
                                           {
                                               "price":  4250,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  4038,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  3825,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "TISU BASAH MITU BANDED 2/50\u0027S @24",
                             "badge":  "",
                             "description":  "Merk: Mitu. Jenis: Tisu Basah. Tipe: Banded 2. Isi: 50\u0027s. Isi kemasan: 24 pcs",
                             "stock":  54,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "2807260010",
                             "id":  "SHOP-215",
                             "retailPrice":  11500,
                             "minOrder":  1,
                             "category":  "Keperluan Bayi \u0026 Anak",
                             "tiers":  [
                                           {
                                               "price":  11500,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  10925,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  10350,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "TISU BASAH MITU BANDED 2/50\u0027S PINK @24",
                             "badge":  "",
                             "description":  "Merk: Mitu. Jenis: Tisu Basah. Tipe: Banded 2. Isi: 50\u0027s. Warna: Pink. Isi kemasan: 24 pcs",
                             "stock":  55,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "2807260009",
                             "id":  "SHOP-216",
                             "retailPrice":  11500,
                             "minOrder":  1,
                             "category":  "Keperluan Bayi \u0026 Anak",
                             "tiers":  [
                                           {
                                               "price":  11500,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  10925,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  10350,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "TISU BASAH MITU BANDED 2/50\u0027S @24",
                             "badge":  "",
                             "description":  "Merk: Mitu. Jenis: Tisu Basah. Tipe: Banded 2. Isi: 50\u0027s. Isi kemasan: 24 pcs",
                             "stock":  56,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "2807260011",
                             "id":  "SHOP-217",
                             "retailPrice":  11500,
                             "minOrder":  1,
                             "category":  "Keperluan Bayi \u0026 Anak",
                             "tiers":  [
                                           {
                                               "price":  11500,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  10925,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  10350,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "TISU BASAH MITU BANDED 2/50\u0027S @72",
                             "badge":  "",
                             "description":  "Merk: Mitu. Jenis: Tisu Basah. Tipe: Banded 2. Isi: 50\u0027s. Isi kemasan: 72 pcs",
                             "stock":  57,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "808250008",
                             "id":  "SHOP-218",
                             "retailPrice":  11500,
                             "minOrder":  1,
                             "category":  "Keperluan Bayi \u0026 Anak",
                             "tiers":  [
                                           {
                                               "price":  11500,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pcs",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  10925,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pcs (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  10350,
                                               "minQty":  30,
                                               "label":  "30+ Pcs (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "TISU BASAH MITU ECR 5000 25\u0027S @72",
                             "badge":  "",
                             "description":  "Merk: Mitu. Jenis: Tisu Basah. Tipe: ECR 5000. Isi: 25\u0027s. Isi kemasan: 72 pcs",
                             "stock":  58,
                             "unit":  "Pcs"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B03326",
                             "id":  "SHOP-219",
                             "retailPrice":  4200,
                             "minOrder":  1,
                             "category":  "Keperluan Bayi \u0026 Anak",
                             "tiers":  [
                                           {
                                               "price":  4200,
                                               "minQty":  1,
                                               "label":  "1 - 9 Rtg",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  3990,
                                               "minQty":  10,
                                               "label":  "10 - 29 Rtg (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  3780,
                                               "minQty":  30,
                                               "label":  "30+ Rtg (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "TISU BASAH MITU 15\u0027S @12",
                             "badge":  "",
                             "description":  "Merk: Mitu. Jenis: Tisu Basah. Isi: 15\u0027s. Isi kemasan: 12 pcs",
                             "stock":  59,
                             "unit":  "Rtg"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B03028",
                             "id":  "SHOP-220",
                             "retailPrice":  24500,
                             "minOrder":  1,
                             "category":  "Keperluan Bayi \u0026 Anak",
                             "tiers":  [
                                           {
                                               "price":  24500,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  23275,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  22050,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "TISU BASAH MITU 1ST GIRL 4\u0027S @12",
                             "badge":  "",
                             "description":  "Merk: Mitu. Jenis: Tisu Basah. Varian: 1st Girl. Isi: 4\u0027s. Isi kemasan: 12 pcs",
                             "stock":  60,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B03027",
                             "id":  "SHOP-221",
                             "retailPrice":  18250,
                             "minOrder":  1,
                             "category":  "Keperluan Bayi \u0026 Anak",
                             "tiers":  [
                                           {
                                               "price":  18250,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  17338,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  16425,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "TISU BASAH MITU TWIN 4\u0027S @12",
                             "badge":  "",
                             "description":  "Merk: Mitu. Jenis: Tisu Basah. Tipe: Twin. Isi: 4\u0027s. Isi kemasan: 12 pcs",
                             "stock":  61,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "1804250001",
                             "id":  "SHOP-222",
                             "retailPrice":  9020,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  9020,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  8569,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  8118,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "PAPAYA BY MAYMAYA BESAR 135GR @96",
                             "badge":  "",
                             "description":  "Merk: Maymaya. Jenis: Papaya. Ukuran: Besar. Berat: 135 gram. Isi: 96 pcs",
                             "stock":  62,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B03513",
                             "id":  "SHOP-223",
                             "retailPrice":  5625,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  5625,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pcs",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  5344,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pcs (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  5062,
                                               "minQty":  30,
                                               "label":  "30+ Pcs (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "PAPAYA BY MAYMAYA KECIL 70GR @PCS",
                             "badge":  "",
                             "description":  "Merk: Maymaya. Jenis: Papaya. Ukuran: Kecil. Berat: 70 gram",
                             "stock":  63,
                             "unit":  "Pcs"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "1204250001",
                             "id":  "SHOP-224",
                             "retailPrice":  15750,
                             "minOrder":  1,
                             "category":  "Kosmetik",
                             "tiers":  [
                                           {
                                               "price":  15750,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  14962,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  14175,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "PAPAYE FACEWASH SCRUB LECORA 110ML @PCS",
                             "badge":  "",
                             "description":  "Merk: Lecora. Jenis: Papaye Facewash Scrub. Volume: 110 ml",
                             "stock":  64,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B00833",
                             "id":  "SHOP-225",
                             "retailPrice":  13500,
                             "minOrder":  1,
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  13500,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  12825,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  12150,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "PAPER CLIP NO.3 ESENLON @50",
                             "badge":  "",
                             "description":  "Jenis: Paper Clip. Ukuran: No.3. Merk: Esenlon. Isi: 50 pcs",
                             "stock":  65,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B06925",
                             "id":  "SHOP-226",
                             "retailPrice":  13500,
                             "minOrder":  1,
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  13500,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  12825,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  12150,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "PAPER CLIP NO.3 ESTIKA @50",
                             "badge":  "",
                             "description":  "Jenis: Paper Clip. Ukuran: No.3. Merk: Estika. Isi: 50 pcs",
                             "stock":  66,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B03885",
                             "id":  "SHOP-227",
                             "retailPrice":  31500,
                             "minOrder":  1,
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  31500,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  29925,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  28350,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "PAPER CLIP WINSTA (12SET) @48",
                             "badge":  "",
                             "description":  "Jenis: Paper Clip. Merk: Winsta. Isi: 12 set. Jumlah: 48 pcs",
                             "stock":  67,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B02102",
                             "id":  "SHOP-228",
                             "retailPrice":  17750,
                             "minOrder":  1,
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  17750,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  16862,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  15975,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "PAPER CLIP WRN TOYKO @24",
                             "badge":  "",
                             "description":  "Jenis: Paper Clip. Warna: Warna-warni. Merk: Toyko. Isi: 24 pcs",
                             "stock":  68,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B05497",
                             "id":  "SHOP-229",
                             "retailPrice":  34000,
                             "minOrder":  1,
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  34000,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pcs",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  32300,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pcs (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  30600,
                                               "minQty":  30,
                                               "label":  "30+ Pcs (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "PAPER: FASTENER COLOR",
                             "badge":  "",
                             "description":  "Jenis: Paper Fastener. Warna: Color",
                             "stock":  69,
                             "unit":  "Pcs"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B04710",
                             "id":  "SHOP-230",
                             "retailPrice":  7500,
                             "minOrder":  1,
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  7500,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  7125,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  6750,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "PAPER FASTENER WHITE @100",
                             "badge":  "",
                             "description":  "Jenis: Paper Fastener. Warna: Putih. Isi: 100 pcs",
                             "stock":  70,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1585336261026-7f897b6a4163?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B04709",
                             "id":  "SHOP-231",
                             "retailPrice":  8250,
                             "minOrder":  1,
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  8250,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pcs",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  7838,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pcs (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  7425,
                                               "minQty":  30,
                                               "label":  "30+ Pcs (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "PAPER GET 5070 (3T)",
                             "badge":  "",
                             "description":  "Jenis: Paper Get. Kode: 5070. Ukuran: 3T",
                             "stock":  71,
                             "unit":  "Pcs"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1585336261026-7f897b6a4163?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B07045",
                             "id":  "SHOP-232",
                             "retailPrice":  42000,
                             "minOrder":  1,
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  42000,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pcs",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  39900,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pcs (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  37800,
                                               "minQty":  30,
                                               "label":  "30+ Pcs (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "PAPER GIFT METAL (A)",
                             "badge":  "",
                             "description":  "Jenis: Paper Gift. Material: Metal. Tipe: A",
                             "stock":  72,
                             "unit":  "Pcs"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B07058",
                             "id":  "SHOP-233",
                             "retailPrice":  52500,
                             "minOrder":  1,
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  52500,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pcs",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  49875,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pcs (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  47250,
                                               "minQty":  30,
                                               "label":  "30+ Pcs (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "PAPER CLIP KENKO NO.1",
                             "badge":  "",
                             "description":  "Jenis: Paper Clip. Merk: Kenko. Ukuran: No.1",
                             "stock":  73,
                             "unit":  "Pcs"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B02637",
                             "id":  "SHOP-234",
                             "retailPrice":  12500,
                             "minOrder":  1,
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  12500,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pcs",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  11875,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pcs (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  11250,
                                               "minQty":  30,
                                               "label":  "30+ Pcs (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "PAPERCLIP :KENKO NO.3",
                             "badge":  "",
                             "description":  "Jenis: Paper Clip. Merk: Kenko. Ukuran: No.3",
                             "stock":  74,
                             "unit":  "Pcs"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B02638",
                             "id":  "SHOP-235",
                             "retailPrice":  8750,
                             "minOrder":  1,
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  8750,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pcs",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  8312,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pcs (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  7875,
                                               "minQty":  30,
                                               "label":  "30+ Pcs (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "PAPERCLIP KENKO NO.5",
                             "badge":  "",
                             "description":  "Jenis: Paper Clip. Merk: Kenko. Ukuran: No.5",
                             "stock":  75,
                             "unit":  "Pcs"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1585336261026-7f897b6a4163?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B02193",
                             "id":  "SHOP-236",
                             "retailPrice":  44000,
                             "minOrder":  1,
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  44000,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  41800,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  39600,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "PAPERCLIP WRN VAN-ART",
                             "badge":  "",
                             "description":  "Jenis: Paper Clip. Warna: Warna-warni. Merk: Van-Art",
                             "stock":  76,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1585336261026-7f897b6a4163?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B03909",
                             "id":  "SHOP-237",
                             "retailPrice":  725000,
                             "minOrder":  1,
                             "category":  "ATK",
                             "tiers":  [
                                           {
                                               "price":  725000,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pcs",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  688750,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pcs (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  652500,
                                               "minQty":  30,
                                               "label":  "30+ Pcs (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "PARANET 3MX100M KOKI",
                             "badge":  "",
                             "description":  "Jenis: Paranet. Ukuran: 3 m Ã— 100 m. Merk: Koki",
                             "stock":  77,
                             "unit":  "Pcs"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "B06218",
                             "id":  "SHOP-238",
                             "retailPrice":  15000,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  15000,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  14250,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  13500,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "SOFTEX BEARY COOL 23CM WING 14P @PAK",
                             "badge":  "",
                             "description":  "Jenis: Softex. Varian: Beary Cool. Ukuran: 23 cm. Tipe: Wing. Isi: 14P. Satuan: Pak",
                             "stock":  78,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "108260017",
                             "id":  "SHOP-239",
                             "retailPrice":  15000,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  15000,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  14250,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  13500,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "SOFTEX BEARY COOL NIGHT 23CM WING 14P @PAK",
                             "badge":  "",
                             "description":  "Jenis: Softex. Varian: Beary Cool Night. Ukuran: 23 cm. Tipe: Wing. Isi: 14P. Satuan: Pak",
                             "stock":  79,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "108260015",
                             "id":  "SHOP-240",
                             "retailPrice":  15000,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  15000,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  14250,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  13500,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "SOFTEX BEARY COOL NIGHT 36CM WING @PAK",
                             "badge":  "",
                             "description":  "Jenis: Softex. Varian: Beary Cool Night. Ukuran: 36 cm. Tipe: Wing. Satuan: Pak",
                             "stock":  80,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "108260016",
                             "id":  "SHOP-241",
                             "retailPrice":  9000,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  9000,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  8550,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  8100,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "SOFTEX COMFORT NIGHT AB L 29CM WING @PAK",
                             "badge":  "",
                             "description":  "Jenis: Softex. Varian: Comfort Night AB. Ukuran: L, 29 cm. Tipe: Wing. Satuan: Pak",
                             "stock":  81,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "108260022",
                             "id":  "SHOP-242",
                             "retailPrice":  23000,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  23000,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  21850,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  20700,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "SOFTEX COMFORT NIGHT ABL 42CM WING @PAK",
                             "badge":  "",
                             "description":  "Jenis: Softex. Varian: Comfort Night ABL. Ukuran: 42 cm. Tipe: Wing. Satuan: Pak",
                             "stock":  82,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "108260013",
                             "id":  "SHOP-243",
                             "retailPrice":  21750,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  21750,
                                               "minQty":  1,
                                               "label":  "1 - 9 Rtg",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  20662,
                                               "minQty":  10,
                                               "label":  "10 - 29 Rtg (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  19575,
                                               "minQty":  30,
                                               "label":  "30+ Rtg (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "SOFTEX COMFORT NIGHT ABL 29CM 2P @PAK",
                             "badge":  "",
                             "description":  "Jenis: Softex. Varian: Comfort Night ABL. Ukuran: 29 cm. Isi: 2P. Satuan: Pak",
                             "stock":  83,
                             "unit":  "Rtg"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "303260004",
                             "id":  "SHOP-244",
                             "retailPrice":  21750,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  21750,
                                               "minQty":  1,
                                               "label":  "1 - 9 Rtg",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  20662,
                                               "minQty":  10,
                                               "label":  "10 - 29 Rtg (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  19575,
                                               "minQty":  30,
                                               "label":  "30+ Rtg (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "SOFTEX COMFORT NIGHT ABL 36CM WING @PAK",
                             "badge":  "",
                             "description":  "Jenis: Softex. Varian: Comfort Night ABL. Ukuran: 36 cm. Tipe: Wing. Satuan: Pak",
                             "stock":  84,
                             "unit":  "Rtg"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "303260003",
                             "id":  "SHOP-245",
                             "retailPrice":  16000,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  16000,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  15200,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  14400,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "SOFTEX DAUN SIRIH 23CM 10P @PAK",
                             "badge":  "",
                             "description":  "Jenis: Softex. Varian: Daun Sirih. Ukuran: 23 cm. Isi: 10P. Satuan: Pak",
                             "stock":  85,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "108260014",
                             "id":  "SHOP-246",
                             "retailPrice":  13250,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  13250,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  12588,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  11925,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "SOFTEX DAUN SIRIH 23CM WING 20P @PAK",
                             "badge":  "",
                             "description":  "Jenis: Softex. Varian: Daun Sirih. Ukuran: 23 cm. Tipe: Wing. Isi: 20P. Satuan: Pak",
                             "stock":  86,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "108260019",
                             "id":  "SHOP-247",
                             "retailPrice":  17000,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  17000,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  16150,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  15300,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "SOFTEX DAUN SIRIH 29CM WING 8P @PAK",
                             "badge":  "",
                             "description":  "Jenis: Softex. Varian: Daun Sirih. Ukuran: 29 cm. Tipe: Wing. Isi: 8P. Satuan: Pak",
                             "stock":  87,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "108260018",
                             "id":  "SHOP-248",
                             "retailPrice":  20000,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  20000,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  19000,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  18000,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "SOFTEX DAUN SIRIH 29CM WING 6P @PAK",
                             "badge":  "",
                             "description":  "Jenis: Softex. Varian: Daun Sirih. Ukuran: 29 cm. Tipe: Wing. Isi: 6P. Satuan: Pak",
                             "stock":  88,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "108260021",
                             "id":  "SHOP-249",
                             "retailPrice":  9650,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  9650,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  9168,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  8685,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "SOFTEX DAUN SIRIH PANTY LINER @PAK",
                             "badge":  "",
                             "description":  "Jenis: Softex. Varian: Daun Sirih. Jenis: Panty Liner. Satuan: Pak",
                             "stock":  89,
                             "unit":  "Pack"
                         },
                         {
                             "image":  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500\u0026auto=format\u0026fit=crop\u0026q=80",
                             "sku":  "108260020",
                             "id":  "SHOP-250",
                             "retailPrice":  16000,
                             "minOrder":  1,
                             "category":  "Palen",
                             "tiers":  [
                                           {
                                               "price":  16000,
                                               "minQty":  1,
                                               "label":  "1 - 9 Pack",
                                               "maxQty":  9
                                           },
                                           {
                                               "price":  15200,
                                               "minQty":  10,
                                               "label":  "10 - 29 Pack (Grosir)",
                                               "maxQty":  29
                                           },
                                           {
                                               "price":  14400,
                                               "minQty":  30,
                                               "label":  "30+ Pack (Partai Besar)",
                                               "maxQty":  999
                                           }
                                       ],
                             "name":  "SOFTEX DAUN SIRIH PANTYLINER LONG @PAK",
                             "badge":  "",
                             "description":  "Jenis: Softex. Varian: Daun Sirih. Jenis: Pantyliner Long. Satuan: Pak",
                             "stock":  90,
                             "unit":  "Pack"
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

