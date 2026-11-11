/**
 * Storage & Database Module for Toko Grosir
 * Supports Supabase Real-Time Cloud Database with LocalStorage Fallback,
 * Multi-Device Sync, Offline Cache, Base64 Image Processing, and Export/Import.
 */

// ==============================================================================
// 1. KONFIGURASI SUPABASE & LOCAL STORAGE
// ==============================================================================
// Ganti nilai default di bawah ini dengan kredensial Supabase Anda,
// ATAU atur langsung melalui menu UI "Pengaturan Toko & Cloud Database".
const SUPABASE_URL = "https://urijgftkzmgsiaxvakcc.supabase.co"; // Supabase Project URL Anda
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVyaWpnZnRrem1nc2lheHZha2NjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE2Nzg1MjEsImV4cCI6MjEwNzI1NDUyMX0.Li6yDInP34L3117wVg9Z_psumZGrjJQXpKJZZDeLppE"; // Supabase Anon Public Key Anda

const SUPABASE_CONFIG_KEY = "GBA_SUPABASE_CONFIG_V1";
const STORAGE_KEY = "GBA_GROSIR_STORE_V5";
const AUTH_KEY = "GBA_AUTH_ROLE_V1";
const GOOGLE_AUTH_KEY = "GBA_GOOGLE_EMPLOYEE_ACC_V1";
const CUSTOMER_ACCOUNT_KEY = "GBA_CUSTOMER_ACCOUNT_V1";
const EMPLOYEE_PASSWORD = "T1MELESS";

const Storage = {
  // Supabase State
  client: null,
  realtimeChannel: null,
  cloudConnected: false,
  lastSyncTime: null,
  _cachedData: null,
  _syncTimeout: null,

  // Pre-configured Verified Employee Google Accounts
  DEFAULT_GOOGLE_ACCOUNTS: [
    {
      email: "hendra.wijaya.gba@gmail.com",
      name: "Bpk. Hendra Wijaya",
      role: "Kepala Gudang & Logistik",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80"
    },
    {
      email: "siti.rahma.gba@gmail.com",
      name: "Ibu Siti Rahma",
      role: "Admin E-Commerce & UMKM",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80"
    },
    {
      email: "budi.santoso.gba@gmail.com",
      name: "Bpk. Budi Santoso",
      role: "Supervisor Operasional & Aset",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"
    }
  ],

  // Pre-configured Verified Customer Google Accounts
  DEFAULT_CUSTOMER_ACCOUNTS: [
    {
      googleEmail: "toko.fatimah.berkah@gmail.com",
      name: "Toko Sembako Berkah (Ibu Fatimah)",
      address: "Jl. Daan Mogot KM 11 No. 45 RT 03/RW 04, Kalideres, Jakarta Barat",
      phone: "0812-9876-5432",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80"
    },
    {
      googleEmail: "bambang.sumberrezeki@gmail.com",
      name: "Toko Grosir Sumber Rezeki (Bpk. Bambang)",
      address: "Jl. Pasar Anyar No. 88, Sukasari, Kota Tangerang, Banten",
      phone: "0813-2233-4455",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"
    },
    {
      googleEmail: "warung.anita.berkah@gmail.com",
      name: "Warung Kelontong Berkah (Ibu Anita)",
      address: "Jl. Hayam Wuruk No. 12 RT 02/RW 01, Kebon Kelapa, Gambir, Jakarta Pusat",
      phone: "0856-7890-1234",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
    }
  ],

  // ============================================================================
  // 2. SUPABASE INITIALIZATION & CONFIGURATION
  // ============================================================================
  getSupabaseConfig: function() {
    try {
      if (typeof localStorage !== 'undefined') {
        const stored = localStorage.getItem(SUPABASE_CONFIG_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed && parsed.url && parsed.anonKey) {
            return parsed;
          }
        }
      }
    } catch (e) {
      console.warn("Error reading Supabase config from localStorage:", e);
    }
    return {
      url: SUPABASE_URL,
      anonKey: SUPABASE_ANON_KEY
    };
  },

  setSupabaseConfig: function(url, anonKey) {
    const config = {
      url: (url || "").trim(),
      anonKey: (anonKey || "").trim()
    };
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(SUPABASE_CONFIG_KEY, JSON.stringify(config));
      }
    } catch (e) {
      console.error("Error saving Supabase config:", e);
    }
    this.initSupabase();
    return config;
  },

  isSupabaseConfigured: function() {
    const cfg = this.getSupabaseConfig();
    return Boolean(
      cfg.url &&
      cfg.anonKey &&
      !cfg.url.includes("your-project-id") &&
      !cfg.anonKey.includes("eyJhbGciOi...") &&
      cfg.url.startsWith("https://")
    );
  },

  initSupabase: function() {
    const cfg = this.getSupabaseConfig();
    const isBrowser = typeof window !== 'undefined';
    const hasSupabaseLib = isBrowser && window.supabase && typeof window.supabase.createClient === 'function';

    if (this.isSupabaseConfigured() && hasSupabaseLib) {
      try {
        this.client = window.supabase.createClient(cfg.url, cfg.anonKey, {
          auth: { persistSession: true, autoRefreshToken: true },
          realtime: { params: { eventsPerSecond: 10 } }
        });
        this.cloudConnected = true;
        this.setupRealtimeListeners();
        this.updateSyncBadge();
        console.log("✅ Supabase Client terhubung ke:", cfg.url);
        return this.client;
      } catch (err) {
        console.warn("⚠️ Gagal inisialisasi Supabase client:", err);
        this.client = null;
        this.cloudConnected = false;
        this.updateSyncBadge();
      }
    } else {
      this.client = null;
      this.cloudConnected = false;
      this.updateSyncBadge();
    }
    return null;
  },

  testSupabaseConnection: async function(overrideUrl, overrideKey) {
    const isBrowser = typeof window !== 'undefined';
    if (!isBrowser || !window.supabase || typeof window.supabase.createClient !== 'function') {
      return { success: false, message: "Pustaka Supabase JS CDN belum dimuat di browser." };
    }

    const testUrl = (overrideUrl || this.getSupabaseConfig().url || "").trim();
    const testKey = (overrideKey || this.getSupabaseConfig().anonKey || "").trim();

    if (!testUrl || !testKey || testUrl.includes("your-project-id")) {
      return { success: false, message: "URL atau Anon Key Supabase masih kosong atau belum diisi." };
    }

    try {
      const testClient = window.supabase.createClient(testUrl, testKey);
      const { data, error } = await testClient.from('products').select('id').limit(1);
      if (error) {
        return { success: false, message: `Koneksi gagal: ${error.message}` };
      }
      return { success: true, message: "Koneksi ke Supabase berhasil! Tabel products dapat diakses." };
    } catch (e) {
      return { success: false, message: `Kesalahan jaringan: ${e.message}` };
    }
  },

  updateSyncBadge: function() {
    if (typeof document === 'undefined') return;
    const badgeEl = document.getElementById("cloud-sync-badge");
    if (!badgeEl) return;

    if (this.cloudConnected && this.isSupabaseConfigured()) {
      badgeEl.innerHTML = `
        <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-sky-50 text-sky-800 border border-sky-300 shadow-2xs hover:bg-sky-100 transition cursor-pointer">
          <i class="fa-solid fa-cloud text-sky-600"></i>
          <span>Cloud Realtime</span>
          <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        </div>
      `;
    } else {
      badgeEl.innerHTML = `
        <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-300 hover:bg-slate-200 transition cursor-pointer">
          <i class="fa-solid fa-hard-drive text-slate-500"></i>
          <span>Mode Lokal</span>
          <span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
        </div>
      `;
    }
  },

  playOrderChime: function() {
    try {
      if (typeof window === 'undefined') return;
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // Tone D5
      osc.frequency.setValueAtTime(880.00, ctx.currentTime + 0.15); // Tone A5

      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.6);
    } catch (e) {
      // Browser audio restriction before user interaction
    }
  },

  // ============================================================================
  // 3. MULTI-USER REAL-TIME SUBSCRIPTION
  // ============================================================================
  setupRealtimeListeners: function() {
    if (!this.client) return;

    try {
      if (this.realtimeChannel) {
        this.client.removeChannel(this.realtimeChannel);
        this.realtimeChannel = null;
      }

      this.realtimeChannel = this.client
        .channel('gba-realtime-database-sync')
        // A. Perubahan Pesanan (Orders)
        .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, payload => {
          this.handleRealtimeOrder(payload);
        })
        // B. Perubahan Produk (Products & Stock)
        .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, payload => {
          this.handleRealtimeProduct(payload);
        })
        // C. Perubahan Master Stok Gudang WMS (Warehouse Records)
        .on('postgres_changes', { event: '*', schema: 'public', table: 'warehouse_records' }, payload => {
          this.handleRealtimeWarehouse(payload);
        })
        // D. Dokumen & Faktur Penjualan (Documents)
        .on('postgres_changes', { event: '*', schema: 'public', table: 'documents' }, payload => {
          this.handleRealtimeDocument(payload);
        })
        .subscribe((status) => {
          console.log("📡 Status Supabase Realtime Channel:", status);
          this.cloudConnected = (status === 'SUBSCRIBED');
          this.updateSyncBadge();
        });
    } catch (e) {
      console.warn("⚠️ Gagal menyambungkan channel Supabase Realtime:", e);
    }
  },

  handleRealtimeOrder: function(payload) {
    console.log("⚡ Realtime Order Event:", payload.eventType, payload.new || payload.old);
    const data = this.getData();
    if (!data.orders) data.orders = [];

    const isEmployee = this.isEmployee();

    if (payload.eventType === 'INSERT' && payload.new) {
      const incomingOrder = this.cloudToOrder(payload.new);
      const existingIdx = data.orders.findIndex(o => o.id === incomingOrder.id);
      if (existingIdx === -1) {
        data.orders.unshift(incomingOrder);
      } else {
        data.orders[existingIdx] = incomingOrder;
      }
      this.saveLocalData(data);

      // Mainkan suara chime & tampilkan notifikasi toast jika Admin / Pegawai
      if (isEmployee) {
        this.playOrderChime();
        if (typeof App !== 'undefined' && App.showToast) {
          App.showToast(`🔔 Pesanan Baru Masuk! #${incomingOrder.id} dari ${incomingOrder.customerName} (${Util.formatRupiah(incomingOrder.totalAmount)})`, "success");
        }
      }

      // Perbarui tampilan jika sedang di tab tracking
      if (typeof App !== 'undefined' && App.currentTab === 'tracking' && typeof Orders !== 'undefined') {
        Orders.renderTrackingPanel();
      }
      if (typeof App !== 'undefined' && App.updateHeaderUI) {
        App.updateHeaderUI();
      }
    } else if (payload.eventType === 'UPDATE' && payload.new) {
      const updatedOrder = this.cloudToOrder(payload.new);
      const existingIdx = data.orders.findIndex(o => o.id === updatedOrder.id);
      if (existingIdx !== -1) {
        data.orders[existingIdx] = updatedOrder;
        this.saveLocalData(data);
      }
      if (typeof App !== 'undefined' && App.currentTab === 'tracking' && typeof Orders !== 'undefined') {
        Orders.renderTrackingPanel();
      }
    } else if (payload.eventType === 'DELETE' && payload.old) {
      data.orders = data.orders.filter(o => o.id !== payload.old.id);
      this.saveLocalData(data);
      if (typeof App !== 'undefined' && App.currentTab === 'tracking' && typeof Orders !== 'undefined') {
        Orders.renderTrackingPanel();
      }
    }
  },

  handleRealtimeProduct: function(payload) {
    console.log("🔄 Realtime Product Event:", payload.eventType, payload.new || payload.old);

    // Abaikan echo dari update kita sendiri (sudah di-render sebelumnya oleh saveProduct)
    const incomingId = payload.new ? payload.new.id : (payload.old ? payload.old.id : null);
    if (this._pendingProductSave && incomingId && this._pendingProductSave === incomingId) {
      this._pendingProductSave = null;
      console.log("⏭️ Lewati re-render realtime (echo dari update sendiri):", incomingId);
      return;
    }

    const data = this.getData();
    if (!data.shopProducts) data.shopProducts = [];

    if (payload.eventType === 'INSERT' && payload.new) {
      const incoming = this.cloudToProduct(payload.new);
      const idx = data.shopProducts.findIndex(p => p.id === incoming.id);
      if (idx === -1) data.shopProducts.unshift(incoming);
      else data.shopProducts[idx] = incoming;
      this.saveLocalData(data);
      if (typeof App !== 'undefined' && App.currentTab === 'shop' && typeof Shop !== 'undefined') {
        Shop.render();
      }
    } else if (payload.eventType === 'UPDATE' && payload.new) {
      const incoming = this.cloudToProduct(payload.new);
      const idx = data.shopProducts.findIndex(p => p.id === incoming.id);
      if (idx !== -1) {
        data.shopProducts[idx] = incoming;
        this.saveLocalData(data);
        if (typeof App !== 'undefined' && App.currentTab === 'shop' && typeof Shop !== 'undefined') {
          Shop.render();
        }
      }
    } else if (payload.eventType === 'DELETE' && payload.old) {
      data.shopProducts = data.shopProducts.filter(p => p.id !== payload.old.id);
      this.saveLocalData(data);
      if (typeof App !== 'undefined' && App.currentTab === 'shop' && typeof Shop !== 'undefined') {
        Shop.render();
      }
    }
  },

  handleRealtimeWarehouse: function(payload) {
    console.log("⚡ Realtime WMS Event:", payload.eventType, payload.new || payload.old);
    const data = this.getData();
    if (!data.wmsItems) data.wmsItems = [];

    if ((payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') && payload.new) {
      const incoming = this.cloudToWms(payload.new);
      const idx = data.wmsItems.findIndex(w => w.id === incoming.id);
      if (idx === -1) data.wmsItems.unshift(incoming);
      else data.wmsItems[idx] = incoming;
      this.saveLocalData(data);
      if (typeof App !== 'undefined' && App.currentTab === 'wms' && typeof WMS !== 'undefined') {
        WMS.render();
      }
    }
  },

  handleRealtimeDocument: function(payload) {
    console.log("⚡ Realtime Document Event:", payload.eventType, payload.new || payload.old);
    const data = this.getData();
    if (!data.documents) data.documents = [];

    if ((payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') && payload.new) {
      const incoming = this.cloudToDoc(payload.new);
      const idx = data.documents.findIndex(d => d.id === incoming.id);
      if (idx === -1) data.documents.unshift(incoming);
      else data.documents[idx] = incoming;
      this.saveLocalData(data);
      if (typeof App !== 'undefined' && App.currentTab === 'docs' && typeof Documents !== 'undefined') {
        Documents.render();
      }
    }
  },

  // ============================================================================
  // 4. DATA MAPPERS (JS CAMELCASE <-> POSTGRESQL SNAKE_CASE)
  // ============================================================================
  productToCloud: function(p) {
    return {
      id: p.id,
      sku: p.sku || "",
      name: p.name || "",
      category: p.category || "Sembako",
      price: Number(p.price || p.retailPrice || 0),
      retail_price: Number(p.retailPrice || p.price || 0),
      wholesale_tiers: Array.isArray(p.tiers) ? p.tiers : [{ minQty: 1, maxQty: 99999, price: Number(p.price || 0), label: "Harga Grosir Satuan" }],
      stock: Number(p.stock || 0),
      unit: p.unit || "Pack",
      image_url: p.image || "",
      description: p.description || "",
      badge: p.badge || "",
      min_order: Number(p.minOrder || 1),
      updated_at: new Date().toISOString()
    };
  },

  cloudToProduct: function(row) {
    const singlePrice = Number(row.price || row.retail_price || 0);
    return {
      id: row.id,
      sku: row.sku || "",
      name: row.name,
      category: row.category || "Sembako",
      price: singlePrice,
      retailPrice: Number(row.retail_price || singlePrice),
      tiers: Array.isArray(row.wholesale_tiers) && row.wholesale_tiers.length > 0
        ? row.wholesale_tiers
        : [{ minQty: 1, maxQty: 99999, price: singlePrice, label: "Harga Grosir Satuan" }],
      stock: Number(row.stock || 0),
      unit: row.unit || "Pack",
      image: row.image_url || "https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=500",
      description: row.description || "",
      badge: row.badge || "",
      minOrder: Number(row.min_order || 1)
    };
  },

  orderToCloud: function(o) {
    return {
      id: o.id,
      order_number: o.id,
      customer_id: o.customerGoogleEmail || o.customerPhone || "CUST",
      customer_name: o.customerName || "Pelanggan",
      customer_phone: o.customerPhone || "",
      customer_email: o.customerGoogleEmail || "",
      delivery_address: o.customerAddress || "",
      delivery_method: o.deliveryMethod || "Truk Toko GBA 1",
      payment_method: o.paymentMethod || "QRIS",
      payment_status: o.paymentStatus || "Menunggu Pembayaran",
      status: o.status || "Menunggu Konfirmasi",
      total_amount: Number(o.totalAmount || 0),
      notes: o.notes || "",
      items_json: Array.isArray(o.items) ? o.items : [],
      checkpoints: Array.isArray(o.checkpoints) ? o.checkpoints : [],
      progress_percent: Number(o.progressPercent || 15),
      vehicle: o.vehicle || "Truk Toko GBA 1 (CDD Box)",
      plate_number: o.plateNumber || "B 9821 GBA",
      driver_name: o.driverName || "Bpk. Joko Santoso",
      driver_phone: o.driverPhone || "0813-8877-6655",
      updated_at: new Date().toISOString()
    };
  },

  cloudToOrder: function(row) {
    const rawItems = Array.isArray(row.items_json) ? row.items_json : [];
    const formattedDate = row.created_at
      ? new Date(row.created_at).toISOString().replace('T', ' ').slice(0, 16)
      : new Date().toISOString().replace('T', ' ').slice(0, 16);

    return {
      id: row.id,
      customerName: row.customer_name,
      customerPhone: row.customer_phone || "",
      customerAddress: row.delivery_address || "",
      customerGoogleEmail: row.customer_email || "",
      deliveryMethod: row.delivery_method || "Truk Toko GBA 1",
      paymentMethod: row.payment_method || "QRIS",
      paymentStatus: row.payment_status || "Menunggu Pembayaran",
      notes: row.notes || "",
      items: rawItems,
      totalAmount: Number(row.total_amount || 0),
      status: row.status || "Menunggu Konfirmasi",
      orderDate: formattedDate,
      progressPercent: Number(row.progress_percent || 15),
      vehicle: row.vehicle || "Truk Toko GBA 1 (CDD Box)",
      plateNumber: row.plate_number || "B 9821 GBA",
      driverName: row.driver_name || "Bpk. Joko Santoso (Tim Distribusi)",
      driverPhone: row.driver_phone || "0813-8877-6655",
      checkpoints: Array.isArray(row.checkpoints) ? row.checkpoints : []
    };
  },

  wmsToCloud: function(w) {
    return {
      id: w.id,
      sku: w.sku || "",
      name: w.name,
      category: w.category || "Sembako",
      rack: w.rack || "Rak A-01-01",
      zone: w.zone || "Zona A",
      stock: Number(w.stock || 0),
      min_stock: Number(w.minStock || 10),
      unit: w.unit || "Pack",
      status: w.status || "Aman",
      image_url: w.image || "",
      supplier: w.supplier || "",
      batch_no: w.batchNo || "",
      exp_date: w.expDate || "",
      notes: w.notes || "",
      updated_at: new Date().toISOString()
    };
  },

  cloudToWms: function(row) {
    return {
      id: row.id,
      sku: row.sku || "",
      name: row.name,
      category: row.category || "Sembako",
      rack: row.rack || "Rak A-01-01",
      zone: row.zone || "Zona A",
      stock: Number(row.stock || 0),
      minStock: Number(row.min_stock || 10),
      unit: row.unit || "Pack",
      status: row.status || "Aman",
      image: row.image_url || "https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=500",
      supplier: row.supplier || "",
      batchNo: row.batch_no || "",
      expDate: row.exp_date || "",
      notes: row.notes || ""
    };
  },

  docToCloud: function(d) {
    return {
      id: d.id,
      doc_number: d.docNumber,
      ref_doc: d.refDoc || "",
      type: d.type || "Faktur Penjualan",
      doc_date: d.date || new Date().toISOString().slice(0, 10),
      order_timestamp: d.orderTimestamp || new Date().toISOString().slice(0, 16),
      due_date: d.dueDate || "",
      client_name: d.clientName || "",
      client_phone: d.clientPhone || "",
      client_address: d.clientAddress || "",
      payment_status: d.paymentStatus || "BELUM LUNAS",
      payment_method: d.paymentMethod || "",
      items_json: Array.isArray(d.items) ? d.items : [],
      grand_total: Number(d.grandTotal || 0),
      notes: d.notes || "",
      signature_name: d.signatureName || "Bagian Penjualan & Kasir Grosir"
    };
  },

  cloudToDoc: function(row) {
    return {
      id: row.id,
      docNumber: row.doc_number,
      refDoc: row.ref_doc || "",
      refOrder: row.ref_doc || "",
      type: row.type || "Faktur Penjualan",
      date: row.doc_date || "",
      orderTimestamp: row.order_timestamp || "",
      dueDate: row.due_date || "",
      clientName: row.client_name,
      clientPhone: row.client_phone || "",
      clientAddress: row.client_address || "",
      paymentStatus: row.payment_status || "BELUM LUNAS",
      paymentMethod: row.payment_method || "",
      items: Array.isArray(row.items_json) ? row.items_json : [],
      grandTotal: Number(row.grand_total || 0),
      notes: row.notes || "",
      signatureName: row.signature_name || "Bagian Penjualan & Kasir Grosir",
      attachmentUrl: ""
    };
  },

  logToCloud: function(l) {
    return {
      id: l.id,
      log_type: l.type || "OUTBOUND",
      item_id: l.itemId || "",
      item_name: l.itemName || "",
      sku: l.sku || "",
      qty: l.qty || "",
      ref_doc: l.refDoc || "",
      operator: l.operator || "",
      notes: l.notes || ""
    };
  },

  cloudToLog: function(row) {
    return {
      id: row.id,
      type: row.log_type || "OUTBOUND",
      itemId: row.item_id || "",
      itemName: row.item_name || "",
      sku: row.sku || "",
      qty: row.qty || "",
      refDoc: row.ref_doc || "",
      operator: row.operator || "",
      notes: row.notes || "",
      date: row.created_at ? new Date(row.created_at).toISOString().replace('T', ' ').slice(0, 16) : new Date().toISOString().slice(0, 16)
    };
  },

  // ============================================================================
  // 5. ASYNC CLOUD DATA OPERATIONS (WITH TRANSPARENT CACHE & FALLBACK)
  // ============================================================================
  fetchFromCloud: async function() {
    if (!this.client || !this.isSupabaseConfigured()) {
      return this.getData();
    }

    try {
      console.log("🔄 Mengambil data terbaru dari Supabase Cloud...");
      const [productsRes, ordersRes, wmsRes, docsRes, logsRes] = await Promise.allSettled([
        this.client.from('products').select('*').order('name'),
        this.client.from('orders').select('*').order('created_at', { ascending: false }),
        this.client.from('warehouse_records').select('*').order('name'),
        this.client.from('documents').select('*').order('created_at', { ascending: false }),
        this.client.from('inventory_logs').select('*').order('created_at', { ascending: false }).limit(200)
      ]);

      const localData = this.getData();

      if (productsRes.status === 'fulfilled' && productsRes.value.data && productsRes.value.data.length > 0) {
        localData.shopProducts = productsRes.value.data.map(r => this.cloudToProduct(r));
      }

      if (ordersRes.status === 'fulfilled' && ordersRes.value.data) {
        localData.orders = ordersRes.value.data.map(r => this.cloudToOrder(r));
      }

      if (wmsRes.status === 'fulfilled' && wmsRes.value.data && wmsRes.value.data.length > 0) {
        localData.wmsItems = wmsRes.value.data.map(r => this.cloudToWms(r));
      }

      if (docsRes.status === 'fulfilled' && docsRes.value.data && docsRes.value.data.length > 0) {
        localData.documents = docsRes.value.data.map(r => this.cloudToDoc(r));
      }

      if (logsRes.status === 'fulfilled' && logsRes.value.data && logsRes.value.data.length > 0) {
        localData.wmsLogs = logsRes.value.data.map(r => this.cloudToLog(r));
      }

      this.saveLocalData(localData);
      this.lastSyncTime = new Date();
      console.log("✅ Data Cloud berhasil disinkronisasi ke browser.");
      return localData;
    } catch (e) {
      console.warn("⚠️ Gagal mengambil data dari Supabase, menggunakan cache lokal:", e);
      return this.getData();
    }
  },

  // Save / Update Single Order to Supabase
  saveOrder: async function(order) {
    // 1. Simpan ke local cache terlebih dahulu untuk responsivitas seketika
    const data = this.getData();
    if (!data.orders) data.orders = [];
    const idx = data.orders.findIndex(o => o.id === order.id);
    if (idx === -1) {
      data.orders.unshift(order);
    } else {
      data.orders[idx] = order;
    }
    this.saveLocalData(data);

    // 2. Unggah ke Supabase Cloud jika terhubung
    if (this.client && this.isSupabaseConfigured()) {
      try {
        const payload = this.orderToCloud(order);
        const { error } = await this.client.from('orders').upsert(payload, { onConflict: 'id' });
        if (error) {
          console.error("Supabase order upsert error:", error);
        } else {
          console.log(`☁️ Pesanan #${order.id} berhasil tersinkron ke Supabase Cloud.`);
        }
      } catch (err) {
        console.warn("Gagal menyinkronkan pesanan ke Cloud:", err);
      }
    }
    return order;
  },

  // Update Status Order
  updateOrderStatus: async function(orderId, newStatus, paymentStatus, checkpoints) {
    const data = this.getData();
    const order = (data.orders || []).find(o => o.id === orderId);
    if (order) {
      if (newStatus) order.status = newStatus;
      if (paymentStatus) order.paymentStatus = paymentStatus;
      if (checkpoints) order.checkpoints = checkpoints;
      this.saveLocalData(data);
    }

    if (this.client && this.isSupabaseConfigured()) {
      try {
        const updatePayload = {
          updated_at: new Date().toISOString()
        };
        if (newStatus) updatePayload.status = newStatus;
        if (paymentStatus) updatePayload.payment_status = paymentStatus;
        if (checkpoints) updatePayload.checkpoints = checkpoints;

        const { error } = await this.client.from('orders').update(updatePayload).eq('id', orderId);
        if (error) console.error("Supabase update order status error:", error);
      } catch (e) {
        console.warn("Error updating order status in Supabase:", e);
      }
    }
    return order;
  },

  // Delete Order
  deleteOrder: async function(orderId) {
    const data = this.getData();
    data.orders = (data.orders || []).filter(o => o.id !== orderId);
    this.saveLocalData(data);

    if (this.client && this.isSupabaseConfigured()) {
      try {
        await this.client.from('orders').delete().eq('id', orderId);
      } catch (e) {
        console.warn("Error deleting order from Supabase:", e);
      }
    }
    return true;
  },

  // Save / Update Single Product to Supabase (hanya cloud — local sudah dihandle saveData())
  saveProduct: async function(product) {
    if (this.client && this.isSupabaseConfigured()) {
      try {
        const cloudProd = this.productToCloud(product);
        const { error } = await this.client.from('products').upsert(cloudProd, { onConflict: 'id' });
        if (error) console.error("Supabase product upsert error:", error);
      } catch (e) {
        console.warn("Error saving product to Supabase:", e);
      }
    }
    return product;
  },

  // Delete Product
  deleteProduct: async function(productId) {
    const data = this.getData();
    data.shopProducts = (data.shopProducts || []).filter(p => p.id !== productId);
    this.saveLocalData(data);

    if (this.client && this.isSupabaseConfigured()) {
      try {
        await this.client.from('products').delete().eq('id', productId);
      } catch (e) {
        console.warn("Error deleting product from Supabase:", e);
      }
    }
    return true;
  },

  // Save / Update Warehouse Record
  saveWarehouseRecord: async function(item) {
    const data = this.getData();
    if (!data.wmsItems) data.wmsItems = [];
    const idx = data.wmsItems.findIndex(w => w.id === item.id);
    if (idx === -1) {
      data.wmsItems.unshift(item);
    } else {
      data.wmsItems[idx] = item;
    }
    this.saveLocalData(data);

    if (this.client && this.isSupabaseConfigured()) {
      try {
        const cloudWms = this.wmsToCloud(item);
        await this.client.from('warehouse_records').upsert(cloudWms, { onConflict: 'id' });
      } catch (e) {
        console.warn("Error saving WMS item to Supabase:", e);
      }
    }
    return item;
  },

  // Save Inventory Log
  saveInventoryLog: async function(log) {
    const data = this.getData();
    if (!data.wmsLogs) data.wmsLogs = [];
    data.wmsLogs.unshift(log);
    this.saveLocalData(data);

    if (this.client && this.isSupabaseConfigured()) {
      try {
        const cloudLog = this.logToCloud(log);
        await this.client.from('inventory_logs').insert(cloudLog);
      } catch (e) {
        console.warn("Error saving inventory log to Supabase:", e);
      }
    }
    return log;
  },

  // Save Document (Faktur Penjualan)
  saveDocument: async function(doc) {
    const data = this.getData();
    if (!data.documents) data.documents = [];
    const idx = data.documents.findIndex(d => d.id === doc.id);
    if (idx === -1) {
      data.documents.unshift(doc);
    } else {
      data.documents[idx] = doc;
    }
    this.saveLocalData(data);

    if (this.client && this.isSupabaseConfigured()) {
      try {
        const cloudDoc = this.docToCloud(doc);
        await this.client.from('documents').upsert(cloudDoc, { onConflict: 'id' });
      } catch (e) {
        console.warn("Error saving document to Supabase:", e);
      }
    }
    return doc;
  },

  // ============================================================================
  // 6. ONE-TIME INITIAL DATA SEEDING UTILITY (MIGRASI DATA.JS KE SUPABASE)
  // ============================================================================
  seedInitialData: async function(onProgress) {
    if (!this.client || !this.isSupabaseConfigured()) {
      throw new Error("Supabase client belum terhubung. Pastikan URL dan Anon Key sudah benar.");
    }

    const data = this.getData();
    const products = data.shopProducts || [];
    const wmsItems = data.wmsItems || [];
    const documents = data.documents || [];
    const orders = data.orders || [];

    const totalSteps = products.length + wmsItems.length + documents.length + orders.length;
    let completedSteps = 0;

    const reportProgress = (msg) => {
      completedSteps++;
      if (typeof onProgress === 'function') {
        const pct = Math.min(100, Math.round((completedSteps / (totalSteps || 1)) * 100));
        onProgress(pct, msg);
      }
    };

    console.log(`🚀 Memulai migrasi data ke Supabase: ${products.length} produk, ${wmsItems.length} WMS items...`);

    // 1. Batch Seed Products (50 items per batch)
    const BATCH_SIZE = 50;
    for (let i = 0; i < products.length; i += BATCH_SIZE) {
      const chunk = products.slice(i, i + BATCH_SIZE).map(p => this.productToCloud(p));
      const { error } = await this.client.from('products').upsert(chunk, { onConflict: 'id' });
      if (error) console.warn("Seed products chunk error:", error);
      for (let j = 0; j < chunk.length; j++) {
        reportProgress(`Mengunggah produk ${i + j + 1}/${products.length}...`);
      }
    }

    // 2. Batch Seed Warehouse Records
    for (let i = 0; i < wmsItems.length; i += BATCH_SIZE) {
      const chunk = wmsItems.slice(i, i + BATCH_SIZE).map(w => this.wmsToCloud(w));
      const { error } = await this.client.from('warehouse_records').upsert(chunk, { onConflict: 'id' });
      if (error) console.warn("Seed WMS chunk error:", error);
      for (let j = 0; j < chunk.length; j++) {
        reportProgress(`Mengunggah master WMS ${i + j + 1}/${wmsItems.length}...`);
      }
    }

    // 3. Batch Seed Documents
    if (documents.length > 0) {
      const chunk = documents.map(d => this.docToCloud(d));
      await this.client.from('documents').upsert(chunk, { onConflict: 'id' });
      documents.forEach(() => reportProgress("Mengunggah dokumen faktur..."));
    }

    // 4. Batch Seed Orders
    if (orders.length > 0) {
      const chunk = orders.map(o => this.orderToCloud(o));
      await this.client.from('orders').upsert(chunk, { onConflict: 'id' });
      orders.forEach(() => reportProgress("Mengunggah data pesanan..."));
    }

    console.log("🎉 Migrasi data awal ke Supabase selesai!");
    return { success: true, count: products.length };
  },

  // ============================================================================
  // 7. USER & ACCOUNT MANAGEMENT (GOOGLE AUTH & CUSTOMER ACCOUNT)
  // ============================================================================
  getCustomerAccount: function() {
    try {
      if (typeof localStorage !== 'undefined') {
        const stored = localStorage.getItem(CUSTOMER_ACCOUNT_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed && parsed.googleEmail && parsed.name && parsed.address) {
            return parsed;
          }
        }
      }
      const defaultCust = this.DEFAULT_CUSTOMER_ACCOUNTS[0];
      this.setCustomerAccount(defaultCust);
      return defaultCust;
    } catch (e) {
      return null;
    }
  },

  setCustomerAccount: function(acc) {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(CUSTOMER_ACCOUNT_KEY, JSON.stringify(acc));
      }
      // Simpan juga ke user_profiles di Supabase jika terhubung
      if (this.client && this.isSupabaseConfigured() && acc && acc.googleEmail) {
        this.client.from('user_profiles').upsert({
          id: acc.googleEmail,
          email: acc.googleEmail,
          name: acc.name,
          phone: acc.phone || "",
          address: acc.address || "",
          role: "customer",
          avatar: acc.avatar || "",
          updated_at: new Date().toISOString()
        }, { onConflict: 'email' }).then(() => {}).catch(err => console.warn("Supabase user_profile sync:", err));
      }
      return true;
    } catch (e) {
      console.error("Error storing customer account:", e);
      return false;
    }
  },

  clearCustomerAccount: function() {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(CUSTOMER_ACCOUNT_KEY);
    }
  },

  hasCustomerAccount: function() {
    const acc = this.getCustomerAccount();
    return Boolean(acc && acc.googleEmail && acc.name && acc.address);
  },

  getGoogleAccount: function() {
    try {
      if (typeof localStorage !== 'undefined') {
        const stored = localStorage.getItem(GOOGLE_AUTH_KEY);
        return stored ? JSON.parse(stored) : null;
      }
      return null;
    } catch (e) {
      return null;
    }
  },

  setGoogleAccount: function(acc) {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(GOOGLE_AUTH_KEY, JSON.stringify(acc));
      }
      // Simpan role pegawai ke Supabase user_profiles
      if (this.client && this.isSupabaseConfigured() && acc && acc.email) {
        this.client.from('user_profiles').upsert({
          id: acc.email,
          email: acc.email,
          name: acc.name,
          role: "pegawai",
          avatar: acc.avatar || "",
          updated_at: new Date().toISOString()
        }, { onConflict: 'email' }).then(() => {}).catch(err => console.warn("Supabase employee profile sync:", err));
      }
      return true;
    } catch (e) {
      console.error("Error storing Google account:", e);
      return false;
    }
  },

  clearGoogleAccount: function() {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(GOOGLE_AUTH_KEY);
    }
  },

  isGoogleConnected: function() {
    return Boolean(this.getGoogleAccount());
  },

  checkPassword: function(inputPass) {
    if (!inputPass) return false;
    const cleanInput = String(inputPass).trim();
    return cleanInput === EMPLOYEE_PASSWORD || cleanInput.toLowerCase() === EMPLOYEE_PASSWORD.toLowerCase();
  },

  // ============================================================================
  // 8. SYNCHRONOUS LOCAL STORAGE COMPATIBILITY LAYER
  // ============================================================================
  getData: function() {
    if (this._cachedData) {
      return this._cachedData;
    }

    try {
      if (typeof localStorage !== 'undefined') {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed && parsed.shopProducts && parsed.shopProducts.length >= 200 && parsed.inventoryTools && parsed.inventoryTools.length >= 40) {
            if (!parsed.wmsItems || !Array.isArray(parsed.wmsItems)) parsed.wmsItems = JSON.parse(JSON.stringify(DEFAULT_STORE_DATA.wmsItems || []));
            if (!parsed.wmsLogs || !Array.isArray(parsed.wmsLogs)) parsed.wmsLogs = JSON.parse(JSON.stringify(DEFAULT_STORE_DATA.wmsLogs || []));
            if (!parsed.documents || !Array.isArray(parsed.documents)) parsed.documents = JSON.parse(JSON.stringify(DEFAULT_STORE_DATA.documents || []));
            if (!parsed.orders || !Array.isArray(parsed.orders)) parsed.orders = JSON.parse(JSON.stringify(DEFAULT_STORE_DATA.orders || []));

            parsed.shopProducts.forEach(p => {
              const singlePrice = p.price || p.retailPrice || (p.tiers && p.tiers[0] ? p.tiers[0].price : 0);
              p.price = singlePrice;
              p.retailPrice = singlePrice;
              p.tiers = [{ minQty: 1, maxQty: 99999, price: singlePrice, label: "Harga Grosir Satuan" }];
            });
            this._cachedData = parsed;
            return parsed;
          }
        }
      }
    } catch (e) {
      console.error("Failed to parse localStorage data:", e);
    }

    // Fallback initialize default
    const defaultCopy = (typeof DEFAULT_STORE_DATA !== 'undefined') ? JSON.parse(JSON.stringify(DEFAULT_STORE_DATA)) : {};
    if (defaultCopy && defaultCopy.shopProducts) {
      defaultCopy.shopProducts.forEach(p => {
        const singlePrice = p.price || p.retailPrice || (p.tiers && p.tiers[0] ? p.tiers[0].price : 0);
        p.price = singlePrice;
        p.retailPrice = singlePrice;
        p.tiers = [{ minQty: 1, maxQty: 99999, price: singlePrice, label: "Harga Grosir Satuan" }];
      });
    }
    this.saveLocalData(defaultCopy);
    this._cachedData = defaultCopy;
    return defaultCopy;
  },

  saveLocalData: function(data) {
    this._cachedData = data;
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      }
      return true;
    } catch (e) {
      console.error("Failed to save to localStorage:", e);
      return false;
    }
  },

  // Synchronous saveData that also debounces background sync to Supabase
  saveData: function(data) {
    const success = this.saveLocalData(data);

    // Otomatis sinkronkan mutasi ke Supabase Cloud di latar belakang (tanpa memblokir UI)
    if (this.client && this.isSupabaseConfigured()) {
      clearTimeout(this._syncTimeout);
      this._syncTimeout = setTimeout(() => {
        this.syncMutationsToCloud(data);
      }, 500);
    }

    return success;
  },

  syncMutationsToCloud: async function(data) {
    if (!this.client || !this.isSupabaseConfigured()) return;
    try {
      // Sync recent orders
      if (Array.isArray(data.orders) && data.orders.length > 0) {
        const topOrders = data.orders.slice(0, 10).map(o => this.orderToCloud(o));
        await this.client.from('orders').upsert(topOrders, { onConflict: 'id' });
      }
      // Sync recent documents
      if (Array.isArray(data.documents) && data.documents.length > 0) {
        const topDocs = data.documents.slice(0, 10).map(d => this.docToCloud(d));
        await this.client.from('documents').upsert(topDocs, { onConflict: 'id' });
      }
    } catch (e) {
      console.warn("Background sync error:", e);
    }
  },

  // Auth role get/set
  getCurrentRole: function() {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(AUTH_KEY) || "customer";
    }
    return "customer";
  },

  setRole: function(role) {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(AUTH_KEY, role);
    }
  },

  isEmployee: function() {
    const role = this.getCurrentRole();
    return (role === "pegawai" || role === "admin") && this.isGoogleConnected();
  },

  isAdmin: function() {
    return this.isEmployee();
  },

  resetToDefault: function() {
    if (confirm("Apakah Anda yakin ingin mereset seluruh data aplikasi ke data demo awal? Semua perubahan teks, gambar, dan data yang Anda buat akan dikembalikan.")) {
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem(STORAGE_KEY);
      }
      this._cachedData = null;
      this.saveLocalData(DEFAULT_STORE_DATA);
      if (typeof App !== 'undefined' && App.showToast) {
        App.showToast("Data aplikasi berhasil direset ke pengaturan awal!", "success");
      }
      setTimeout(() => {
        if (typeof location !== 'undefined') location.reload();
      }, 600);
    }
  },

  exportJSON: function() {
    const data = this.getData();
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const dateStr = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `backup_grosir_berkah_abadi_${dateStr}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    if (typeof App !== 'undefined' && App.showToast) {
      App.showToast("Cadangan data JSON berhasil diekspor!", "success");
    }
  },

  importJSON: function(fileInput) {
    const file = fileInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result);
        if (!importedData.profile || !importedData.wmsItems || !importedData.shopProducts) {
          throw new Error("Format berkas JSON tidak sesuai struktur toko grosir.");
        }
        this.saveData(importedData);
        if (typeof App !== 'undefined' && App.showToast) {
          App.showToast("Data cadangan berhasil diimpor!", "success");
        }
        setTimeout(() => {
          if (typeof location !== 'undefined') location.reload();
        }, 600);
      } catch (err) {
        if (typeof App !== 'undefined' && App.showToast) {
          App.showToast("Gagal mengimpor berkas JSON: " + err.message, "error");
        }
      }
    };
    reader.readAsText(file);
  },

  fileToBase64: function(file, maxWidth = 800, maxHeight = 800, quality = 0.8) {
    return new Promise((resolve, reject) => {
      if (!file || !file.type.startsWith('image/')) {
        reject(new Error("File bukan gambar yang valid."));
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxWidth) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          const dataUrl = canvas.toDataURL(file.type || 'image/jpeg', quality);
          resolve(dataUrl);
        };
        img.onerror = () => reject(new Error("Gagal memproses gambar."));
        img.src = event.target.result;
      };
      reader.onerror = () => reject(new Error("Gagal membaca file."));
      reader.readAsDataURL(file);
    });
  }
};

// Formatting utilities
const Util = {
  formatRupiah: function(num) {
    if (isNaN(num)) return "Rp 0";
    return "Rp " + Number(num).toLocaleString("id-ID");
  },

  formatNumber: function(num) {
    if (isNaN(num)) return "0";
    return Number(num).toLocaleString("id-ID");
  },

  formatDate: function(dateStr) {
    if (!dateStr || dateStr === "-") return "-";
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric"
      });
    } catch (e) {
      return dateStr;
    }
  },

  generateId: function(prefix = "ID") {
    return `${prefix}-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`;
  },

  escapeHtml: function(str) {
    if (typeof str !== 'string') return str;
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  },

  cleanImageUrl: function(rawUrl) {
    if (!rawUrl || typeof rawUrl !== 'string') return "";
    let url = rawUrl.trim();
    url = url.replace(/^["'<(\[]+|["'>)\]]+$/g, '');

    if ((url.includes("google.") || url.includes("/imgres")) && url.includes("imgurl=")) {
      try {
        const match = url.match(/[?&]imgurl=([^&]+)/);
        if (match && match[1]) {
          return decodeURIComponent(match[1]);
        }
      } catch (e) {
        console.warn("Error decoding Google Image URL:", e);
      }
    }

    const mdMatch = url.match(/!\[.*?\]\((https?:\/\/[^\s\)]+)\)/);
    if (mdMatch && mdMatch[1]) {
      return mdMatch[1];
    }

    const htmlMatch = url.match(/<img[^>]+src=["'](https?:\/\/[^"']+)["']/i);
    if (htmlMatch && htmlMatch[1]) {
      return htmlMatch[1];
    }

    return url;
  }
};
