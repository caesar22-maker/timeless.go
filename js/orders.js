/**
 * Order Tracking & Employee Fulfillment / Dispatch Management Module
 * Modul Pelacakan Pesanan Pelanggan & Pemrosesan Distribusi Gudang untuk Pegawai
 */

const Orders = {
  activeFilter: "ALL",
  searchQuery: "",
  selectedTrackingOrderId: null,
  currentMap: null,
  currentTruckMarker: null,
  currentWaypoints: null,
  currentOrderTracked: null,

  // Standard Order Stages
  STAGES: [
    { key: "Menunggu Konfirmasi", label: "Pesanan Masuk", icon: "fa-receipt", step: 1, color: "amber" },
    { key: "Sedang Dipacking", label: "Packing Gudang", icon: "fa-boxes-packing", step: 2, color: "blue" },
    { key: "Siap Dikirim", label: "Muat ke Armada", icon: "fa-truck-ramp-box", step: 3, color: "indigo" },
    { key: "Dalam Pengiriman", label: "Sedang Diantar", icon: "fa-truck-fast", step: 4, color: "purple" },
    { key: "Selesai", label: "Sampai & Diterima", icon: "fa-circle-check", step: 5, color: "emerald" }
  ],

  getStageInfo: function(status) {
    const found = this.STAGES.find(s => s.key === status);
    return found || this.STAGES[0];
  },

  handlePodImageUpload: async function(event) {
    const file = event.target.files[0];
    if (!file) return;
    try {
      const base64 = await Storage.fileToBase64(file);
      const imgEl = document.getElementById('proc-pod-preview');
      if (imgEl) {
        imgEl.src = base64;
        imgEl.classList.remove('hidden');
      }
      const inputEl = document.getElementById('proc-pod-image');
      if (inputEl) {
        inputEl.value = base64;
      }
      App.showToast("Foto bukti serah terima (POD) berhasil dimuat!", "info");
    } catch (e) {
      App.showToast("Gagal memuat foto POD: " + e.message, "error");
    }
  },

  setTrackingOrder: function(orderId) {
    this.selectedTrackingOrderId = orderId;
    localStorage.setItem("GBA_LAST_ORDER_ID", orderId);
    this.renderTrackingPanel();
    const data = Storage.getData();
    const order = (data.orders || []).find(o => o.id === orderId);
    if (order) {
      setTimeout(() => this.initLeafletMap(order), 180);
    }
  },

  // ==========================================
  // REAL LEAFLET GOOGLE MAPS-STYLE LIVE TRACKING
  // ==========================================
  initLeafletMap: function(order) {
    if (!order) return;
    this.currentOrderTracked = order;

    const mapEl = document.getElementById("tracking-leaflet-map");
    if (!mapEl) return;

    if (typeof L === "undefined") {
      console.warn("Leaflet library not loaded yet.");
      return;
    }

    // Clean up previous map instance
    if (this.currentMap) {
      try {
        this.currentMap.remove();
      } catch (e) {
        console.warn("Error removing previous map instance:", e);
      }
      this.currentMap = null;
    }

    // Origin Coordinates: Gudang Niaga Jaya GBA (Daan Mogot, Jakarta Barat)
    const originCoords = [-6.1555, 106.7850];
    
    // Realistic Jakarta route connecting warehouse to destination customer
    const routeWaypoints = [
      [-6.1555, 106.7850], // Gudang Niaga Jaya GBA (KM 11)
      [-6.1585, 106.7905], // Gerbang Tol Daan Mogot
      [-6.1625, 106.7980], // Pesing Simpang Barat
      [-6.1670, 106.8060], // Tomang Interchange
      [-6.1725, 106.8140], // Simpang Cideng Barat
      [-6.1770, 106.8215], // Harmoni Central
      [-6.1820, 106.8280]  // Alamat Toko Pemesan (Tujuan)
    ];
    this.currentWaypoints = routeWaypoints;

    const destinationCoords = routeWaypoints[routeWaypoints.length - 1];

    // Compute progress & truck location along the waypoints
    let progressPercent = order.progressPercent || 15;
    if (order.status === "Selesai") progressPercent = 100;
    else if (order.status === "Menunggu Konfirmasi") progressPercent = 10;
    else if (order.status === "Sedang Dipacking") progressPercent = 30;
    else if (order.status === "Siap Dikirim") progressPercent = 55;
    else if (order.status === "Dalam Pengiriman" && progressPercent < 60) progressPercent = 75;

    const progressRatio = Math.max(0, Math.min(100, progressPercent)) / 100;
    const floatIdx = progressRatio * (routeWaypoints.length - 1);
    const segIdx = Math.min(Math.floor(floatIdx), routeWaypoints.length - 2);
    const subRatio = floatIdx - segIdx;

    const truckLat = routeWaypoints[segIdx][0] + (routeWaypoints[segIdx + 1][0] - routeWaypoints[segIdx][0]) * subRatio;
    const truckLng = routeWaypoints[segIdx][1] + (routeWaypoints[segIdx + 1][1] - routeWaypoints[segIdx][1]) * subRatio;
    const currentTruckCoords = [truckLat, truckLng];

    // Traveled vs Remaining points
    const traveledCoords = [];
    for (let i = 0; i <= segIdx; i++) {
      traveledCoords.push(routeWaypoints[i]);
    }
    traveledCoords.push(currentTruckCoords);

    const remainingCoords = [currentTruckCoords];
    for (let i = segIdx + 1; i < routeWaypoints.length; i++) {
      remainingCoords.push(routeWaypoints[i]);
    }

    try {
      // Initialize Map
      const map = L.map('tracking-leaflet-map', {
        zoomControl: true,
        attributionControl: true
      }).setView(currentTruckCoords, 13);

      // Google Maps-like Clean OpenStreetMap Tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap | Grosir Berkah Abadi'
      }).addTo(map);

      // 1. Warehouse Marker (Origin)
      const warehouseIcon = L.divIcon({
        className: '',
        html: `
          <div class="relative cursor-pointer group">
            <div class="w-10 h-10 rounded-full bg-blue-700 text-white border-2 border-white shadow-xl flex items-center justify-center text-sm font-bold ring-2 ring-blue-400">
              <i class="fa-solid fa-warehouse"></i>
            </div>
            <div class="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow whitespace-nowrap border border-blue-400/80">
              Gudang Pusat GBA
            </div>
          </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 20]
      });

      const warehouseMarker = L.marker(originCoords, { icon: warehouseIcon }).addTo(map);
      warehouseMarker.bindPopup(`
        <div class="p-1 text-xs">
          <b class="text-blue-700 block">Gudang Niaga Jaya GBA (Origin)</b>
          <p class="text-slate-600 text-[11px] mt-0.5">Kawasan Industri & Pergudangan Blok C No. 8, Daan Mogot, Jakarta Barat</p>
          <span class="text-[10px] font-mono text-slate-400 block mt-1">Koordinat: -6.1555, 106.7850</span>
        </div>
      `);

      // 2. Destination Store Marker
      const storeIcon = L.divIcon({
        className: '',
        html: `
          <div class="relative cursor-pointer group animate-bounce">
            <div class="w-10 h-10 rounded-full bg-rose-600 text-white border-2 border-white shadow-xl flex items-center justify-center text-sm font-bold ring-2 ring-rose-400">
              <i class="fa-solid fa-store"></i>
            </div>
            <div class="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-rose-950 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow whitespace-nowrap border border-rose-400/80">
              ${Util.escapeHtml(order.customerName.split('(')[0].trim())}
            </div>
          </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 20]
      });

      const storeMarker = L.marker(destinationCoords, { icon: storeIcon }).addTo(map);
      storeMarker.bindPopup(`
        <div class="p-1 text-xs">
          <b class="text-rose-700 block">${Util.escapeHtml(order.customerName)} (Tujuan)</b>
          <p class="text-slate-600 text-[11px] mt-0.5">${Util.escapeHtml(order.customerAddress || 'Alamat Toko Pemesan')}</p>
          <p class="text-[11px] text-slate-500 mt-1">WhatsApp: <b>${order.customerPhone}</b></p>
        </div>
      `);

      // 3. Polylines
      // Traveled portion (Emerald Green)
      L.polyline(traveledCoords, {
        color: '#10b981',
        weight: 6,
        opacity: 0.95,
        lineCap: 'round',
        lineJoin: 'round'
      }).addTo(map);

      // Remaining portion (Dashed Blue)
      L.polyline(remainingCoords, {
        color: '#3b82f6',
        weight: 5,
        dashArray: '8, 8',
        opacity: 0.75,
        lineCap: 'round',
        lineJoin: 'round'
      }).addTo(map);

      // 4. Moving Fleet Truck Marker
      const truckIcon = L.divIcon({
        className: '',
        html: `
          <div class="relative cursor-pointer group">
            <div class="w-11 h-11 rounded-full bg-amber-400 text-slate-950 border-2 border-white shadow-2xl flex items-center justify-center text-lg font-bold ring-4 ring-amber-300/70">
              <i class="fa-solid fa-truck-fast"></i>
            </div>
            <div class="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-slate-950 text-amber-300 text-[10px] font-mono font-bold px-2 py-0.5 rounded shadow whitespace-nowrap border border-amber-400/80">
              ${order.plateNumber || 'B 9821 GBA'}
            </div>
          </div>
        `,
        iconSize: [44, 44],
        iconAnchor: [22, 22]
      });

      const truckMarker = L.marker(currentTruckCoords, { icon: truckIcon }).addTo(map);
      truckMarker.bindPopup(`
        <div class="p-1.5 text-xs">
          <div class="flex items-center gap-1.5 text-amber-600 font-bold mb-1">
            <i class="fa-solid fa-truck-moving"></i> Posisi Armada: ${Util.escapeHtml(order.vehicle || 'Truk Toko GBA')}
          </div>
          <p class="text-[11px] text-slate-700">No. Polisi: <b class="font-mono">${order.plateNumber || 'B 9821 GBA'}</b></p>
          <p class="text-[11px] text-slate-700">Driver: <b>${Util.escapeHtml(order.driverName || 'Bpk. Joko Santoso')}</b> (${order.driverPhone || '0813-8877-6655'})</p>
          <p class="text-[11px] text-emerald-700 font-bold mt-1">Status: ${order.status} (${progressPercent}% Selesai)</p>
          <p class="text-[10px] text-slate-500 font-mono mt-0.5">GPS: ${truckLat.toFixed(4)}, ${truckLng.toFixed(4)}</p>
        </div>
      `);

      // Fit map bounds with padding
      const allBounds = L.latLngBounds(routeWaypoints);
      map.fitBounds(allBounds, { padding: [50, 50] });

      this.currentMap = map;
      this.currentTruckMarker = truckMarker;

      // Update Telemetry Coords Display
      const coordsEl = document.getElementById("map-telemetry-coords");
      if (coordsEl) {
        coordsEl.textContent = `GPS: ${truckLat.toFixed(4)}, ${truckLng.toFixed(4)} (Live Tracking)`;
      }

      // Invalidate size to ensure proper tile loading
      setTimeout(() => {
        if (this.currentMap) this.currentMap.invalidateSize();
      }, 200);
      setTimeout(() => {
        if (this.currentMap) this.currentMap.invalidateSize();
      }, 450);
    } catch (err) {
      console.error("Leaflet map initialization error:", err);
    }
  },

  centerOnFleet: function() {
    if (this.currentMap && this.currentTruckMarker) {
      const pos = this.currentTruckMarker.getLatLng();
      this.currentMap.setView(pos, 15, { animate: true });
      this.currentTruckMarker.openPopup();
    }
  },

  fitMapBounds: function() {
    if (this.currentMap && this.currentWaypoints) {
      this.currentMap.fitBounds(L.latLngBounds(this.currentWaypoints), { padding: [50, 50], animate: true });
    }
  },

  openInGoogleMaps: function() {
    const origin = "-6.1555,106.7850";
    const dest = "-6.1820,106.8280";
    const url = `https://www.google.com/maps/dir/${origin}/${dest}`;
    window.open(url, "_blank");
  },

  // ==========================================
  // 1. CUSTOMER ORDER TRACKING (LACAK PESANAN)
  // ==========================================
  openCustomerTrackingModal: function(targetOrderId = null) {
    const data = Storage.getData();
    const orders = data.orders || [];

    // Default to targetOrderId, or last placed order, or first available order
    let selectedOrder = null;
    if (targetOrderId) {
      selectedOrder = orders.find(o => o.id === targetOrderId);
    } else {
      const lastId = localStorage.getItem("GBA_LAST_ORDER_ID");
      if (lastId) {
        selectedOrder = orders.find(o => o.id === lastId);
      }
      if (!selectedOrder && orders.length > 0) {
        selectedOrder = orders[0];
      }
    }

    const modalHtml = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop" id="customer-tracking-modal">
        <div class="bg-white rounded-2xl max-w-4xl w-full shadow-2xl border border-slate-200 overflow-hidden modal-content-scale max-h-[92vh] flex flex-col">
          
          <!-- Header -->
          <div class="px-6 py-4 bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 text-white flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-xl text-amber-400 border border-white/20">
                <i class="fa-solid fa-truck-fast"></i>
              </div>
              <div>
                <h3 class="text-base font-bold flex items-center gap-2">
                  Lacak Pengiriman & Status Pesanan
                  <span class="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-400 text-slate-950 uppercase tracking-wide">Live Tracking</span>
                </h3>
                <p class="text-xs text-slate-300">Pantau proses packing gudang, pergerakan armada, dan titik pengantaran barang secara real-time.</p>
              </div>
            </div>
            <button onclick="App.closeModal('customer-tracking-modal')" class="text-white/80 hover:text-white text-xl">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>

          <!-- Body Content -->
          <div class="p-6 overflow-y-auto space-y-6 flex-1 bg-slate-50/50">
            
            <!-- Search / Order Selector Bar -->
            <div class="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-stretch md:items-center gap-3">
              <div class="flex-1 relative">
                <i class="fa-solid fa-magnifying-glass absolute left-3.5 top-3 text-slate-400 text-sm"></i>
                <input 
                  type="text" 
                  id="tracking-search-input" 
                  placeholder="Masukkan Nomor Pesanan (ORD-...) atau No. WhatsApp..." 
                  value="${selectedOrder ? selectedOrder.id : ''}"
                  class="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono font-bold text-slate-800"
                />
              </div>
              <button 
                onclick="Orders.searchCustomerOrder()" 
                class="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-sm transition flex items-center justify-center gap-2"
              >
                <i class="fa-solid fa-location-crosshairs"></i> Lacak Sekarang
              </button>
            </div>

            <!-- Tracking Container -->
            <div id="tracking-detail-container">
              ${selectedOrder ? this.renderTrackingDetailHtml(selectedOrder) : this.renderNoOrderFoundHtml()}
            </div>

          </div>

          <!-- Footer -->
          <div class="px-6 py-3.5 bg-white border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
            <span class="flex items-center gap-1.5 font-medium">
              <i class="fa-solid fa-shield-halved text-emerald-600"></i> Garansi Pengiriman Aman Toko Grosir
            </span>
            <button onclick="App.closeModal('customer-tracking-modal')" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition">
              Tutup Pelacakan
            </button>
          </div>

        </div>
      </div>
    `;

    App.closeModal('customer-tracking-modal');
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    if (selectedOrder) {
      setTimeout(() => this.initLeafletMap(selectedOrder), 220);
    }
  },

  searchCustomerOrder: function(customInputId = null) {
    const inputId = customInputId || (document.getElementById("tracking-panel-search-input") ? "tracking-panel-search-input" : "tracking-search-input");
    const val = document.getElementById(inputId)?.value.trim().toLowerCase();
    if (!val) {
      App.showToast("Silakan masukkan Nomor Pesanan atau Nomor HP WhatsApp!", "warning");
      return;
    }

    const data = Storage.getData();
    const orders = data.orders || [];
    const found = orders.find(o => 
      o.id.toLowerCase() === val || 
      o.id.toLowerCase().includes(val) ||
      (o.customerPhone && o.customerPhone.toLowerCase().includes(val)) ||
      (o.customerName && o.customerName.toLowerCase().includes(val))
    );

    const container = document.getElementById("tracking-panel-detail-container") || document.getElementById("tracking-detail-container");
    if (container) {
      if (found) {
        this.selectedTrackingOrderId = found.id;
        container.innerHTML = this.renderTrackingDetailHtml(found);
        setTimeout(() => this.initLeafletMap(found), 200);
      } else {
        container.innerHTML = this.renderNoOrderFoundHtml(val);
      }
    }
  },

  renderNoOrderFoundHtml: function(query = "") {
    return `
      <div class="text-center py-16 bg-white rounded-2xl border border-slate-200 shadow-xs p-8">
        <div class="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-3">
          <i class="fa-solid fa-box-open"></i>
        </div>
        <h4 class="text-lg font-bold text-slate-800 mb-1">Pesanan Tidak Ditemukan</h4>
        <p class="text-xs text-slate-500 max-w-md mx-auto mb-4">
          ${query ? `Tidak ada data pengiriman dengan kata kunci "<b>${Util.escapeHtml(query)}</b>".` : 'Silakan masukkan nomor pesanan Anda untuk melihat status proses dan lokasi armada pengiriman.'}
        </p>
      </div>
    `;
  },

  renderTrackingDetailHtml: function(order) {
    const stageInfo = this.getStageInfo(order.status);
    const currentStep = stageInfo.step;
    const progressPercent = order.progressPercent || (currentStep === 1 ? 15 : currentStep === 2 ? 35 : currentStep === 3 ? 60 : currentStep === 4 ? 85 : 100);

    const checkpoints = order.checkpoints || [
      {
        time: order.orderDate || new Date().toISOString().replace("T"," ").slice(0,16),
        title: "Pesanan Berhasil Dibuat",
        location: "Sistem Online Shop Grosir",
        desc: "Pesanan masuk ke sistem dan menunggu verifikasi admin gudang."
      }
    ];

    return `
      <div class="space-y-6">
        
        <!-- Summary Card -->
        <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div class="flex items-center gap-2 mb-1">
                <span class="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-lg border border-blue-100">${order.id}</span>
                <span class="text-xs text-slate-400">|</span>
                <span class="text-xs text-slate-500"><i class="fa-regular fa-clock mr-1"></i>${order.orderDate || '-'}</span>
              </div>
              <h3 class="text-lg font-extrabold text-slate-900">${Util.escapeHtml(order.customerName)}</h3>
              <p class="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                <i class="fa-solid fa-location-dot text-rose-500"></i> ${Util.escapeHtml(order.customerAddress || '-')}
              </p>
            </div>

            <div class="flex flex-wrap items-center gap-2">
              <div class="text-right mr-2">
                <span class="text-[11px] text-slate-400 uppercase font-bold tracking-wider block">Status Terkini</span>
                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-${stageInfo.color}-100 text-${stageInfo.color}-800 border border-${stageInfo.color}-200 shadow-xs">
                  <i class="fa-solid ${stageInfo.icon}"></i> ${order.status}
                </span>
              </div>

              ${order.status === "Dalam Pengiriman" ? `
                <button 
                  onclick="Orders.confirmOrderReceived('${order.id}')" 
                  class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-md transition flex items-center gap-1.5"
                >
                  <i class="fa-solid fa-check-double"></i> Konfirmasi Terima Barang
                </button>
              ` : ''}

              <!-- DIRECT EMPLOYEE PROCESSING BUTTON -->
              <button 
                onclick="Shop.directEmployeeProcess('${order.id}')" 
                class="px-3.5 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white rounded-xl text-xs font-bold shadow-sm transition flex items-center gap-1.5"
                title="Proses Pesanan Ini (Ubah Tahapan, Packing Gudang, Supir, Armada, & POD)"
              >
                <i class="fa-solid fa-clipboard-check text-amber-300"></i> Proses Pesanan (Admin)
              </button>

              <button 
                onclick="Documents.previewInvoice('${order.id}')" 
                class="p-2 text-slate-600 hover:text-blue-600 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold transition flex items-center gap-1"
                title="Lihat / Cetak Nota Faktur"
              >
                <i class="fa-solid fa-print"></i> Nota
              </button>
            </div>
          </div>

          <!-- Stepper 5 Stages -->
          <div class="pt-6 pb-2">
            <div class="relative">
              <!-- Background Progress Line -->
              <div class="absolute top-5 left-6 right-6 h-1.5 bg-slate-100 rounded-full z-0 hidden sm:block"></div>
              <!-- Active Progress Line -->
              <div class="absolute top-5 left-6 h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 rounded-full z-0 transition-all duration-500 hidden sm:block" style="width: calc(${Math.min(100, Math.max(0, (currentStep - 1) * 25))}%);"></div>

              <div class="grid grid-cols-2 sm:grid-cols-5 gap-3 relative z-10">
                ${this.STAGES.map((st, idx) => {
                  const isDone = currentStep > st.step;
                  const isCurrent = currentStep === st.step;
                  let circleClass = "bg-slate-100 text-slate-400 border-2 border-slate-200";
                  let textClass = "text-slate-400";

                  if (isDone) {
                    circleClass = "bg-emerald-500 text-white border-2 border-emerald-600 shadow-sm";
                    textClass = "text-emerald-700 font-bold";
                  } else if (isCurrent) {
                    circleClass = `bg-${st.color}-600 text-white ring-4 ring-${st.color}-100 shadow-md animate-pulse`;
                    textClass = `text-${st.color}-700 font-black`;
                  }

                  return `
                    <div class="flex flex-col items-center text-center">
                      <div class="w-10 h-10 rounded-full ${circleClass} flex items-center justify-center text-sm font-bold mb-2 transition-all">
                        <i class="fa-solid ${isDone ? 'fa-check' : st.icon}"></i>
                      </div>
                      <span class="text-[11px] uppercase font-bold text-slate-400 mb-0.5 tracking-wider">Tahap ${st.step}</span>
                      <span class="text-xs ${textClass} leading-tight">${st.label}</span>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          </div>
        </div>

        <!-- REAL GOOGLE MAPS STYLE LIVE LEAFLET MAP VISUALIZER -->
        <div class="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-5 text-white border border-slate-800 shadow-md">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-3 border-b border-slate-700/80">
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></span>
              <h4 class="text-sm font-extrabold tracking-wide uppercase text-slate-200 flex items-center gap-1.5">
                <i class="fa-solid fa-map-location-dot text-emerald-400"></i> Peta Pengiriman Live (Google Maps Style)
              </h4>
            </div>
            
            <!-- Map Interactive Controls -->
            <div class="flex items-center gap-2">
              <button 
                onclick="Orders.centerOnFleet()" 
                class="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold border border-slate-600 transition flex items-center gap-1 shadow-xs"
                title="Pusatkan Peta ke Armada Pengiriman"
              >
                <i class="fa-solid fa-crosshairs text-amber-400"></i> Pusatkan Armada
              </button>
              <button 
                onclick="Orders.fitMapBounds()" 
                class="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold border border-slate-600 transition flex items-center gap-1 shadow-xs"
                title="Tampilkan Seluruh Rute Perjalanan"
              >
                <i class="fa-solid fa-route text-blue-400"></i> Rute Penuh
              </button>
              <button 
                onclick="Orders.openInGoogleMaps()" 
                class="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-xs transition flex items-center gap-1"
                title="Buka Arah Navigasi Langsung di Google Maps"
              >
                <i class="fa-solid fa-arrow-up-right-from-square text-[11px]"></i> Google Maps
              </button>
            </div>
          </div>

          <!-- Interactive Leaflet Map Box -->
          <div class="relative rounded-xl overflow-hidden border border-slate-700 shadow-inner my-2">
            <div id="tracking-leaflet-map" style="height: 380px; width: 100%; border-radius: 0.75rem; z-index: 10;"></div>

            <!-- Floating Live Telemetry Badge -->
            <div class="absolute top-3 left-3 z-[400] bg-slate-900/90 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-slate-700 text-xs shadow-xl space-y-0.5 pointer-events-none">
              <div class="flex items-center gap-2 font-mono font-bold text-amber-400">
                <i class="fa-solid fa-truck-moving animate-pulse"></i> <span>${order.plateNumber || 'B 9821 GBA'}</span>
                <span class="text-slate-400">•</span>
                <span class="text-emerald-400 font-sans">${order.status}</span>
              </div>
              <p class="text-[10px] text-slate-300">Driver: <b>${Util.escapeHtml(order.driverName || 'Bpk. Joko Santoso')}</b></p>
              <p class="text-[10px] text-slate-400 font-mono" id="map-telemetry-coords">GPS: -6.1685, 106.8042 (Live Tracking)</p>
            </div>

            <!-- Floating ETA Badge -->
            <div class="absolute bottom-3 right-3 z-[400] bg-slate-900/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-700 text-xs shadow-xl text-right pointer-events-none">
              <span class="text-[10px] text-slate-400 uppercase font-semibold block">Estimasi Waktu Tiba (ETA)</span>
              <span class="font-bold text-amber-400 font-mono">${order.estimatedArrival || 'Hari ini, dalam estimasi 45 menit'}</span>
            </div>
          </div>

          <!-- Animated Route Bar -->
          <div class="mt-4 mb-2 px-1">
            <div class="relative py-2">
              <div class="h-2.5 bg-slate-700 rounded-full overflow-hidden relative">
                <div class="h-full bg-gradient-to-r from-blue-500 via-amber-400 to-emerald-400 rounded-full transition-all duration-700" style="width: ${progressPercent}%;"></div>
              </div>
              <div class="flex justify-between items-center text-[11px] font-bold text-slate-400 mt-2">
                <span class="flex items-center gap-1 text-blue-300"><i class="fa-solid fa-warehouse"></i> Gudang Niaga Jaya (-6.1555, 106.7850)</span>
                <span class="flex items-center gap-1 ${progressPercent >= 50 ? 'text-amber-300' : 'text-slate-500'}"><i class="fa-solid fa-road"></i> Progres: ${progressPercent}%</span>
                <span class="flex items-center gap-1 ${progressPercent >= 100 ? 'text-emerald-300 font-black' : 'text-slate-400'}"><i class="fa-solid fa-store"></i> Toko Pemesan (Tujuan)</span>
              </div>
            </div>
          </div>

          <!-- Fleet & Driver Card Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
            <div class="bg-slate-800/80 p-3 rounded-xl border border-slate-700 flex items-center gap-3">
              <div class="w-9 h-9 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center text-lg">
                <i class="fa-solid fa-truck"></i>
              </div>
              <div>
                <span class="text-[10px] text-slate-400 uppercase font-semibold block">Armada Pengirim</span>
                <span class="font-bold text-slate-100">${Util.escapeHtml(order.vehicle || order.deliveryMethod || 'Truk Toko Grosir')}</span>
                <span class="text-[10px] text-amber-300 font-mono block">${order.plateNumber || 'No. Pol B 9821 GBA'}</span>
              </div>
            </div>

            <div class="bg-slate-800/80 p-3 rounded-xl border border-slate-700 flex items-center gap-3">
              <div class="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-lg">
                <i class="fa-solid fa-user-tie"></i>
              </div>
              <div>
                <span class="text-[10px] text-slate-400 uppercase font-semibold block">Driver / Kurir Toko</span>
                <span class="font-bold text-slate-100">${Util.escapeHtml(order.driverName || 'Bpk. Joko Santoso (Tim Distribusi)')}</span>
                <span class="text-[10px] text-slate-300 block">${order.driverPhone || '0813-8877-6655'}</span>
              </div>
            </div>

            <div class="bg-slate-800/80 p-3 rounded-xl border border-slate-700 flex items-center gap-3">
              <div class="w-9 h-9 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center text-lg">
                <i class="fa-solid fa-hourglass-half"></i>
              </div>
              <div>
                <span class="text-[10px] text-slate-400 uppercase font-semibold block">Estimasi Tiba (ETA)</span>
                <span class="font-bold text-amber-400">${order.estimatedArrival || 'Hari ini, dalam estimasi 45 menit'}</span>
                <span class="text-[10px] text-slate-300 block">Jalur Bebas Hambatan</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Checkpoint History Timeline & Item Details -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <!-- Timeline Logs (2 Cols) -->
          <div class="lg:col-span-2 bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
            <h4 class="text-sm font-extrabold text-slate-900 uppercase tracking-wide mb-4 flex items-center gap-2">
              <i class="fa-solid fa-list-check text-blue-600"></i> Riwayat Checkpoint & Titik Perjalanan Pengantaran
            </h4>

            <div class="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              ${checkpoints.map((cp, idx) => {
                const isLatest = idx === 0;
                return `
                  <div class="relative group">
                    <!-- Point Dot -->
                    <span class="absolute -left-[27px] top-1 w-4 h-4 rounded-full border-2 ${isLatest ? 'bg-blue-600 border-white ring-4 ring-blue-100 animate-pulse' : 'bg-slate-300 border-white'}"></span>
                    
                    <div class="bg-slate-50 hover:bg-blue-50/50 p-3.5 rounded-xl border border-slate-200 transition">
                      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                        <h5 class="text-xs font-bold text-slate-900">${Util.escapeHtml(cp.title)}</h5>
                        <span class="text-[11px] font-mono text-slate-500 font-semibold bg-white px-2 py-0.5 rounded border border-slate-200">${cp.time}</span>
                      </div>
                      <p class="text-xs text-blue-700 font-semibold mb-0.5 flex items-center gap-1">
                        <i class="fa-solid fa-location-dot text-rose-500 text-[10px]"></i> ${Util.escapeHtml(cp.location || 'Lokasi Distribusi')}
                      </p>
                      <p class="text-xs text-slate-600 leading-relaxed">${Util.escapeHtml(cp.desc || '')}</p>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Items Summary & POD (1 Col) -->
          <div class="space-y-4">
            <!-- Items Box -->
            <div class="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
              <h4 class="text-xs font-bold uppercase text-slate-500 mb-3 flex items-center justify-between">
                <span>Rincian Barang (${(order.items || []).length})</span>
                <span class="text-blue-700 font-mono font-bold">${Util.formatRupiah(order.totalAmount)}</span>
              </h4>

              <div class="divide-y divide-slate-100 max-h-56 overflow-y-auto space-y-2 pr-1">
                ${(order.items || []).map(it => `
                  <div class="pt-2 text-xs flex items-center justify-between gap-2">
                    <div class="min-w-0">
                      <p class="font-bold text-slate-800 truncate">${Util.escapeHtml(it.name)}</p>
                      <p class="text-[11px] text-slate-400 font-mono">${it.qty} ${it.unit} × ${Util.formatRupiah(it.price)}</p>
                    </div>
                    <span class="font-bold font-mono text-slate-900 text-xs">${Util.formatRupiah(it.subtotal)}</span>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Proof of Delivery (POD) Image if exists -->
            ${order.podImage ? `
              <div class="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
                <h4 class="text-xs font-bold uppercase text-emerald-700 mb-2 flex items-center gap-1.5">
                  <i class="fa-solid fa-camera"></i> Bukti Serah Terima (POD)
                </h4>
                <img src="${order.podImage}" class="w-full h-36 object-cover rounded-xl border border-slate-200 shadow-xs" />
                <p class="text-[11px] text-slate-500 mt-2">Diterima oleh: <b class="text-slate-800">${Util.escapeHtml(order.receivedBy || order.customerName)}</b></p>
              </div>
            ` : ''}

            <!-- Help Contact Box -->
            <div class="bg-blue-50/80 rounded-2xl p-4 border border-blue-200 text-xs text-blue-900 space-y-2">
              <h5 class="font-bold flex items-center gap-1.5">
                <i class="fa-brands fa-whatsapp text-emerald-600 text-sm"></i> Bantuan & Layanan Grosir
              </h5>
              <p class="text-slate-600 text-[11px] leading-relaxed">
                Ada kendala atau ingin mengubah jadwal armada pengantaran? Hubungi hotline dispatcher toko kami.
              </p>
              <a href="https://wa.me/6281234567890" target="_blank" class="inline-block w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-center font-bold text-xs shadow-xs transition">
                Hubungi Dispatcher Gudang
              </a>
            </div>
          </div>

        </div>

      </div>
    `;
  },

  confirmOrderReceived: function(orderId) {
    if (!confirm("Konfirmasi bahwa seluruh pesanan dan barang telah sampai dan Anda terima dengan baik?")) {
      return;
    }

    const data = Storage.getData();
    const order = (data.orders || []).find(o => o.id === orderId);
    if (!order) return;

    order.status = "Selesai";
    order.progressPercent = 100;
    order.paymentStatus = "Lunas / Terverifikasi";
    if (!order.checkpoints) order.checkpoints = [];

    // Sinkronisasi status LUNAS ke Faktur Penjualan
    const doc = (data.documents || []).find(d => d.id === "DOC-INV-" + orderId || (d.refDoc && d.refDoc === orderId) || (d.notes && d.notes.includes(orderId)));
    if (doc) {
      doc.paymentStatus = "LUNAS";
    }

    const now = new Date().toISOString().replace("T"," ").slice(0,16);
    order.checkpoints.unshift({
      time: now,
      title: "Pesanan Telah Diterima oleh Pelanggan",
      location: order.customerAddress || "Toko Pelanggan",
      desc: `Barang diterima langsung oleh pelanggan (${order.customerName}). Seluruh paket dalam kondisi lengkap dan baik.`
    });

    Storage.saveData(data);
    if (typeof Storage !== 'undefined' && Storage.saveOrder) Storage.saveOrder(order);
    if (doc && typeof Storage !== 'undefined' && Storage.saveDocument) Storage.saveDocument(doc);

    App.showToast("Terima kasih! Pesanan telah selesai, serah terima berhasil & faktur diperbarui LUNAS.", "success");
    
    // Re-render modal and shop
    const container = document.getElementById("tracking-detail-container");
    if (container) {
      container.innerHTML = this.renderTrackingDetailHtml(order);
    }
    Shop.render();
  },

  // ==========================================
  // 2. EMPLOYEE ORDER MANAGEMENT & DISPATCH
  // ==========================================
  openEmployeeOrdersModal: function() {
    if (!Storage.isEmployee()) {
      App.openLoginModal();
      return;
    }

    const data = Storage.getData();
    const orders = data.orders || [];

    let filtered = orders;
    if (this.activeFilter !== "ALL") {
      filtered = filtered.filter(o => o.status === this.activeFilter);
    }
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      filtered = filtered.filter(o => 
        o.id.toLowerCase().includes(q) || 
        o.customerName.toLowerCase().includes(q) ||
        (o.customerPhone && o.customerPhone.toLowerCase().includes(q)) ||
        (o.customerAddress && o.customerAddress.toLowerCase().includes(q))
      );
    }

    const stageCounts = {
      ALL: orders.length,
      "Menunggu Konfirmasi": orders.filter(o => o.status === "Menunggu Konfirmasi" || o.status === "Diproses").length,
      "Sedang Dipacking": orders.filter(o => o.status === "Sedang Dipacking").length,
      "Siap Dikirim": orders.filter(o => o.status === "Siap Dikirim").length,
      "Dalam Pengiriman": orders.filter(o => o.status === "Dalam Pengiriman").length,
      "Selesai": orders.filter(o => o.status === "Selesai").length
    };

    const modalHtml = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop" id="employee-orders-modal">
        <div class="bg-white rounded-2xl max-w-5xl w-full shadow-2xl border border-slate-200 overflow-hidden modal-content-scale max-h-[92vh] flex flex-col">
          
          <!-- Header -->
          <div class="px-6 py-4 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center text-xl font-bold">
                <i class="fa-solid fa-clipboard-list"></i>
              </div>
              <div>
                <h3 class="text-base font-bold flex items-center gap-2">
                  Manajemen Pemrosesan & Distribusi Pesanan
                  <span class="px-2.5 py-0.5 rounded-full text-xs font-black bg-blue-500/30 text-blue-200 border border-blue-400/30">${orders.length} Total Order</span>
                </h3>
                <p class="text-xs text-slate-300">Alur kerja packing gudang, penugasan armada pengiriman, update checkpoint rute, hingga selesai.</p>
              </div>
            </div>
            <button onclick="App.closeModal('employee-orders-modal')" class="text-white/80 hover:text-white text-xl">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>

          <!-- Controls & Tabs -->
          <div class="p-4 bg-slate-50 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <!-- Filter Pills -->
            <div class="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
              ${[
                { id: "ALL", label: "Semua Pesanan", count: stageCounts.ALL },
                { id: "Menunggu Konfirmasi", label: "Masuk / Baru", count: stageCounts["Menunggu Konfirmasi"] },
                { id: "Sedang Dipacking", label: "Dipacking", count: stageCounts["Sedang Dipacking"] },
                { id: "Siap Dikirim", label: "Muat Armada", count: stageCounts["Siap Dikirim"] },
                { id: "Dalam Pengiriman", label: "Diantar", count: stageCounts["Dalam Pengiriman"] },
                { id: "Selesai", label: "Selesai", count: stageCounts["Selesai"] }
              ].map(tab => `
                <button 
                  onclick="Orders.handleEmployeeFilter('${tab.id}')" 
                  class="px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${this.activeFilter === tab.id ? 'bg-blue-600 text-white shadow-xs' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'}"
                >
                  <span>${tab.label}</span>
                  <span class="px-1.5 py-0.2 rounded-full text-[10px] ${this.activeFilter === tab.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'}">${tab.count}</span>
                </button>
              `).join('')}
            </div>

            <!-- Search -->
            <div class="relative min-w-[240px]">
              <i class="fa-solid fa-magnifying-glass absolute left-3 top-2.5 text-slate-400 text-sm"></i>
              <input 
                type="text" 
                placeholder="Cari ID, toko, atau alamat..." 
                value="${Util.escapeHtml(this.searchQuery)}"
                oninput="Orders.handleEmployeeSearch(this.value)"
                class="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>
          </div>

          <!-- Order Table / List -->
          <div class="p-6 overflow-y-auto flex-1 space-y-4">
            ${filtered.length === 0 ? `
              <div class="text-center py-16 bg-slate-50 rounded-2xl border border-slate-200 text-slate-400">
                <i class="fa-solid fa-inbox text-4xl mb-2 text-slate-300 block"></i>
                <p class="font-bold text-slate-700">Tidak Ada Pesanan pada Kategori Ini</p>
                <p class="text-xs text-slate-400 mt-1">Semua pesanan pada filter ini telah diproses atau belum ada transaksi baru.</p>
              </div>
            ` : filtered.map(order => {
              const stage = this.getStageInfo(order.status);
              const itemsCount = (order.items || []).reduce((s,i) => s + i.qty, 0);

              return `
                <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition duration-200">
                  <div class="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    
                    <div class="space-y-1 flex-1">
                      <div class="flex flex-wrap items-center gap-2 mb-1">
                        <span class="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">${order.id}</span>
                        <span class="text-xs text-slate-400 font-mono">${order.orderDate || '-'}</span>
                        <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-${stage.color}-100 text-${stage.color}-800 border border-${stage.color}-200 flex items-center gap-1">
                          <i class="fa-solid ${stage.icon}"></i> ${order.status}
                        </span>
                      </div>
                      
                      <h4 class="text-base font-extrabold text-slate-900">${Util.escapeHtml(order.customerName)}</h4>
                      <p class="text-xs text-slate-500 flex items-center gap-2">
                        <span><i class="fa-brands fa-whatsapp text-emerald-600"></i> ${Util.escapeHtml(order.customerPhone || '-')}</span>
                        <span>•</span>
                        <span><i class="fa-solid fa-location-dot text-rose-500"></i> ${Util.escapeHtml(order.customerAddress || '-')}</span>
                      </p>

                      <div class="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-xs text-slate-600 flex flex-wrap items-center gap-4 mt-2">
                        <div><span class="text-slate-400">Total:</span> <b class="text-slate-900 font-mono">${Util.formatRupiah(order.totalAmount)}</b> (${itemsCount} barang)</div>
                        <div><span class="text-slate-400">Armada:</span> <span class="font-semibold text-slate-800">${Util.escapeHtml(order.vehicle || order.deliveryMethod || 'Truk Toko')}</span></div>
                        ${order.driverName ? `<div><span class="text-slate-400">Supir:</span> <span class="font-semibold text-blue-700">${Util.escapeHtml(order.driverName)}</span></div>` : ''}
                        ${order.packingStaff ? `<div><span class="text-slate-400">Packer:</span> <span class="font-semibold text-slate-700">${Util.escapeHtml(order.packingStaff)}</span></div>` : ''}
                      </div>
                    </div>

                    <!-- Actions -->
                    <div class="flex flex-row md:flex-col items-end gap-2 shrink-0">
                      <button 
                        onclick="Orders.openProcessOrderModal('${order.id}')" 
                        class="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold text-xs shadow-sm transition flex items-center gap-1.5"
                      >
                        <i class="fa-solid fa-sliders"></i> Proses & Update Status
                      </button>

                      <div class="flex items-center gap-1.5">
                        <button 
                          onclick="Orders.openCustomerTrackingModal('${order.id}')" 
                          class="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition"
                          title="Lihat Tampilan Live Tracking Pelanggan"
                        >
                          <i class="fa-solid fa-eye text-blue-600"></i> Live View
                        </button>

                        <button 
                          onclick="Documents.previewInvoice('${order.id}')" 
                          class="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition"
                          title="Cetak Faktur Penjualan"
                        >
                          <i class="fa-solid fa-file-invoice text-indigo-600"></i> Faktur
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <!-- Footer -->
          <div class="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
            <span>Menampilkan <b>${filtered.length}</b> pesanan pelanggan</span>
            <button onclick="App.closeModal('employee-orders-modal')" class="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl font-bold transition">
              Tutup
            </button>
          </div>

        </div>
      </div>
    `;

    App.closeModal('employee-orders-modal');
    document.body.insertAdjacentHTML('beforeend', modalHtml);
  },

  handleEmployeeFilter: function(filterKey) {
    this.activeFilter = filterKey;
    this.openEmployeeOrdersModal();
  },

  handleEmployeeSearch: function(query) {
    this.searchQuery = query;
    this.openEmployeeOrdersModal();
  },

  // ==========================================
  // 3. STEP-BY-STEP ORDER PROCESSING MODAL
  // ==========================================
  openProcessOrderModal: function(orderId) {
    if (!Storage.isEmployee()) {
      App.openLoginModal();
      return;
    }
    const data = Storage.getData();
    const order = (data.orders || []).find(o => o.id === orderId);
    if (!order) return;

    const stage = this.getStageInfo(order.status);

    const modalHtml = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop" id="process-order-modal">
        <div class="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden modal-content-scale max-h-[92vh] flex flex-col">
          
          <div class="px-6 py-4 bg-gradient-to-r from-blue-700 to-indigo-800 text-white flex items-center justify-between">
            <div>
              <h3 class="text-base font-bold flex items-center gap-2">
                <i class="fa-solid fa-box-open"></i> Pemrosesan Pesanan: <span class="font-mono text-amber-300">${order.id}</span>
              </h3>
              <p class="text-xs text-blue-100">Pemesan: ${Util.escapeHtml(order.customerName)} (${order.customerPhone})</p>
            </div>
            <button onclick="App.closeModal('process-order-modal')" class="text-white/80 hover:text-white text-xl">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>

          <form onsubmit="Orders.saveProcessedOrder(event, '${order.id}')" class="p-6 overflow-y-auto space-y-5 flex-1">
            
            <!-- Current Status Stepper Selector -->
            <div>
              <label class="block text-xs font-bold uppercase text-slate-700 mb-2">Perbarui Status Tahapan Order *</label>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
                ${this.STAGES.map(st => `
                  <label class="flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer transition ${order.status === st.key ? 'bg-blue-50 border-blue-500 text-blue-900 font-bold ring-2 ring-blue-200' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'}">
                    <input 
                      type="radio" 
                      name="order_status" 
                      value="${st.key}" 
                      ${order.status === st.key ? 'checked' : ''} 
                      onchange="Orders.onStatusRadioChange(this.value)"
                      class="text-blue-600 focus:ring-blue-500"
                    />
                    <i class="fa-solid ${st.icon} text-sm"></i>
                    <span class="text-xs">${st.label}</span>
                  </label>
                `).join('')}
              </div>
            </div>

            <!-- Dynamic Section: Customer Recipient Info Editing -->
            <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
              <h4 class="text-xs font-bold text-slate-800 uppercase flex items-center gap-1.5">
                <i class="fa-solid fa-user text-blue-600"></i> Informasi Pelanggan & Alamat Tujuan
              </h4>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-medium text-slate-600 mb-1">Nama Toko / Pemesan *</label>
                  <input type="text" id="proc-cust-name" required value="${Util.escapeHtml(order.customerName)}" class="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white font-semibold" />
                </div>
                <div>
                  <label class="block text-xs font-medium text-slate-600 mb-1">No. WhatsApp Pemesan *</label>
                  <input type="text" id="proc-cust-phone" required value="${Util.escapeHtml(order.customerPhone || '')}" class="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white" />
                </div>
                <div class="sm:col-span-2">
                  <label class="block text-xs font-medium text-slate-600 mb-1">Alamat Lengkap Pengantaran *</label>
                  <input type="text" id="proc-cust-address" required value="${Util.escapeHtml(order.customerAddress || '')}" class="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white" />
                </div>
              </div>
            </div>

            <!-- Dynamic Section: Packing Staff -->
            <div id="section-packing" class="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
              <h4 class="text-xs font-bold text-slate-800 uppercase flex items-center gap-1.5">
                <i class="fa-solid fa-boxes-packing text-blue-600"></i> Informasi Petugas Packing Gudang
              </h4>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-medium text-slate-600 mb-1">Nama Petugas Picker / Packer</label>
                  <input type="text" id="proc-packer" value="${Util.escapeHtml(order.packingStaff || 'Agus S. (Gudang Blok B)')}" class="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white" />
                </div>
                <div>
                  <label class="block text-xs font-medium text-slate-600 mb-1">Catatan Quality Control (QC)</label>
                  <input type="text" id="proc-qc" value="${Util.escapeHtml(order.qcNotes || 'Kondisi kemasan rapi & utuh, tersegel')}" class="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white" />
                </div>
              </div>
            </div>

            <!-- Dynamic Section: Dispatch & Fleet -->
            <div id="section-dispatch" class="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
              <h4 class="text-xs font-bold text-slate-800 uppercase flex items-center gap-1.5">
                <i class="fa-solid fa-truck-fast text-indigo-600"></i> Penugasan Armada & Supir Pengantar
              </h4>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-medium text-slate-600 mb-1">Pilihan Armada Toko / Ekspedisi</label>
                  <select id="proc-vehicle" class="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white font-medium">
                    <option value="Truk Toko GBA 1 (CDD Box)" ${order.vehicle === 'Truk Toko GBA 1 (CDD Box)' ? 'selected' : ''}>Truk Toko GBA 1 (CDD Box)</option>
                    <option value="Truk Toko GBA 2 (Long Chassis)" ${order.vehicle === 'Truk Toko GBA 2 (Long Chassis)' ? 'selected' : ''}>Truk Toko GBA 2 (Long Chassis)</option>
                    <option value="Mobil Box Kecil (Gran Max)" ${order.vehicle === 'Mobil Box Kecil (Gran Max)' ? 'selected' : ''}>Mobil Box Kecil (Gran Max)</option>
                    <option value="Tosa Roda 3 Operasional" ${order.vehicle === 'Tosa Roda 3 Operasional' ? 'selected' : ''}>Tosa Roda 3 Operasional</option>
                    <option value="Kurir Motor Express Toko" ${order.vehicle === 'Kurir Motor Express Toko' ? 'selected' : ''}>Kurir Motor Express Toko</option>
                    <option value="Ekspedisi Cargo Eksternal" ${order.vehicle === 'Ekspedisi Cargo Eksternal' ? 'selected' : ''}>Ekspedisi Cargo Eksternal</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs font-medium text-slate-600 mb-1">Nomor Polisi Armada</label>
                  <input type="text" id="proc-plate" value="${Util.escapeHtml(order.plateNumber || 'B 9821 GBA')}" class="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white font-mono font-bold" />
                </div>
                <div>
                  <label class="block text-xs font-medium text-slate-600 mb-1">Nama Supir / Driver</label>
                  <input type="text" id="proc-driver" value="${Util.escapeHtml(order.driverName || 'Bpk. Joko Santoso')}" class="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white" />
                </div>
                <div>
                  <label class="block text-xs font-medium text-slate-600 mb-1">Nomor Kontak Supir</label>
                  <input type="text" id="proc-driver-phone" value="${Util.escapeHtml(order.driverPhone || '0813-8877-6655')}" class="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white" />
                </div>
                <div class="sm:col-span-2">
                  <label class="block text-xs font-medium text-slate-600 mb-1">Estimasi Waktu Tiba (ETA)</label>
                  <input type="text" id="proc-eta" value="${Util.escapeHtml(order.estimatedArrival || 'Hari ini, dalam estimasi 45 menit')}" class="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white font-semibold text-blue-700" />
                </div>
              </div>
            </div>

            <!-- Dynamic Section: Add Live Checkpoint -->
            <div class="bg-indigo-50/60 p-4 rounded-xl border border-indigo-200 space-y-3">
              <div class="flex items-center justify-between">
                <h4 class="text-xs font-bold text-indigo-900 uppercase flex items-center gap-1.5">
                  <i class="fa-solid fa-location-dot text-rose-600"></i> Tambah Checkpoint Perjalanan Baru (Live Update)
                </h4>
                <span class="text-[10px] text-indigo-600 bg-white px-2 py-0.5 rounded border border-indigo-200 font-bold">Terlihat di Pelanggan</span>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div class="sm:col-span-2">
                  <label class="block text-[11px] font-semibold text-slate-700 mb-1">Keterangan Checkpoint / Lokasi Terkini Armada</label>
                  <input type="text" id="proc-new-cp-title" placeholder="Misal: Armada telah melintasi Pintu Tol Cengkareng Barat..." class="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white" />
                </div>
                <div>
                  <label class="block text-[11px] font-semibold text-slate-700 mb-1">Titik Lokasi</label>
                  <input type="text" id="proc-new-cp-loc" placeholder="Misal: Cengkareng / Jl. Raya Daan Mogot" class="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white" />
                </div>
                <div>
                  <label class="block text-[11px] font-semibold text-slate-700 mb-1">Persentase Rute (% Progres)</label>
                  <input type="number" id="proc-progress-percent" min="10" max="100" value="${order.progressPercent || 50}" class="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white font-mono font-bold" />
                </div>
              </div>
            </div>

            <!-- Dynamic Section: Proof of Delivery (POD) -->
            <div id="section-pod" class="bg-emerald-50/70 p-4 rounded-xl border border-emerald-200 space-y-3">
              <div class="flex items-center justify-between">
                <h4 class="text-xs font-bold text-emerald-900 uppercase flex items-center gap-1.5">
                  <i class="fa-solid fa-camera text-emerald-600"></i> Bukti Serah Terima Pesanan (POD)
                </h4>
                <div class="flex items-center gap-1.5">
                  <button type="button" onclick="App.pasteFromClipboard('proc-pod-image', 'proc-pod-preview')" class="px-2 py-0.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded text-xs font-bold border border-emerald-300">
                    <i class="fa-solid fa-paste"></i> Tempel Link Foto (Chrome)
                  </button>
                </div>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-medium text-slate-700 mb-1">Nama Penerima Barang di Lokasi</label>
                  <input type="text" id="proc-receiver" value="${Util.escapeHtml(order.receivedBy || order.customerName)}" class="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white font-semibold" />
                </div>
                <div>
                  <label class="block text-xs font-medium text-slate-700 mb-1">Unggah Berkas Foto POD</label>
                  <input type="file" accept="image/*" onchange="Orders.handlePodImageUpload(event)" class="w-full text-xs text-slate-500 file:mr-2 file:py-1 file:px-2.5 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-emerald-100 file:text-emerald-800 hover:file:bg-emerald-200 cursor-pointer" />
                </div>
                <div class="sm:col-span-2">
                  <label class="block text-xs font-medium text-slate-700 mb-1">Atau Masukkan URL / Link Foto Bukti Serah Terima</label>
                  <input 
                    type="text" 
                    id="proc-pod-image" 
                    value="${Util.escapeHtml(order.podImage || '')}" 
                    oninput="App.handleImageUrlInput(this, 'proc-pod-preview')"
                    placeholder="https://... atau tempel link foto dari Chrome" 
                    class="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white" 
                  />
                </div>
                <div class="sm:col-span-2">
                  <img id="proc-pod-preview" src="${order.podImage || ''}" class="h-24 rounded-lg border border-slate-300 object-cover ${order.podImage ? '' : 'hidden'}" onerror="this.classList.add('hidden')" />
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
              <button type="button" onclick="App.closeModal('process-order-modal')" class="px-4 py-2 text-xs text-slate-600 hover:bg-slate-100 rounded-xl font-bold">Batal</button>
              <button type="submit" class="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs shadow-md transition flex items-center gap-1.5">
                <i class="fa-solid fa-floppy-disk"></i> Simpan & Kirim Update Live
              </button>
            </div>

          </form>

        </div>
      </div>
    `;

    App.closeModal('process-order-modal');
    document.body.insertAdjacentHTML('beforeend', modalHtml);
  },

  onStatusRadioChange: function(status) {
    // Focus or highlight relevant inputs if needed
  },

  saveProcessedOrder: function(event, orderId) {
    event.preventDefault();
    if (!Storage.isEmployee()) {
      App.openLoginModal();
      return;
    }
    const data = Storage.getData();
    const order = (data.orders || []).find(o => o.id === orderId);
    if (!order) return;

    const statusEl = document.querySelector('input[name="order_status"]:checked');
    const newStatus = statusEl ? statusEl.value : order.status;

    const custName = document.getElementById("proc-cust-name")?.value.trim();
    const custPhone = document.getElementById("proc-cust-phone")?.value.trim();
    const custAddress = document.getElementById("proc-cust-address")?.value.trim();
    const packer = document.getElementById("proc-packer")?.value.trim();
    const qc = document.getElementById("proc-qc")?.value.trim();
    const vehicle = document.getElementById("proc-vehicle")?.value;
    const plate = document.getElementById("proc-plate")?.value.trim();
    const driver = document.getElementById("proc-driver")?.value.trim();
    const driverPhone = document.getElementById("proc-driver-phone")?.value.trim();
    const eta = document.getElementById("proc-eta")?.value.trim();
    const newCpTitle = document.getElementById("proc-new-cp-title")?.value.trim();
    const newCpLoc = document.getElementById("proc-new-cp-loc")?.value.trim();
    const progressPercent = Number(document.getElementById("proc-progress-percent")?.value) || 50;
    const receiver = document.getElementById("proc-receiver")?.value.trim();
    const podImage = document.getElementById("proc-pod-image")?.value.trim();

    if (custName) order.customerName = custName;
    if (custPhone) order.customerPhone = custPhone;
    if (custAddress) order.customerAddress = custAddress;
    order.status = newStatus;
    order.packingStaff = packer;
    order.qcNotes = qc;
    order.vehicle = vehicle;
    order.plateNumber = plate;
    order.driverName = driver;
    order.driverPhone = driverPhone;
    order.estimatedArrival = eta;
    order.progressPercent = progressPercent;
    if (receiver) order.receivedBy = receiver;
    if (podImage) order.podImage = podImage;

    if (!order.checkpoints) order.checkpoints = [];

    const now = new Date().toISOString().replace("T"," ").slice(0,16);

    // If a new checkpoint was typed in, add it
    if (newCpTitle) {
      order.checkpoints.unshift({
        time: now,
        title: newCpTitle,
        location: newCpLoc || "Rute Perjalanan",
        desc: `Pembaruan titik pengantaran armada (${vehicle} - ${plate}). Supir: ${driver}`
      });
    } else {
      // Auto-add checkpoint on status transition if not already latest
      const latestCp = order.checkpoints[0];
      if (!latestCp || !latestCp.title.includes(newStatus)) {
        if (newStatus === "Sedang Dipacking") {
          order.checkpoints.unshift({
            time: now,
            title: "Barang Sedang Dipacking di Gudang",
            location: "Gudang Utama Niaga Jaya",
            desc: `Pesanan sedang disiapkan dan dicek kualitasnya oleh petugas (${packer}). Catatan QC: ${qc}`
          });
        } else if (newStatus === "Siap Dikirim") {
          order.checkpoints.unshift({
            time: now,
            title: "Barang Selesai Dipacking & Dimuat ke Armada",
            location: "Area Muat / Loading Dock Gudang",
            desc: `Barang telah dimuat ke armada ${vehicle} (${plate}). Supir: ${driver}`
          });
        } else if (newStatus === "Dalam Pengiriman") {
          order.checkpoints.unshift({
            time: now,
            title: "Armada Berangkat Mengantar ke Alamat Tujuan",
            location: "Jalur Distribusi Armada Toko",
            desc: `Armada telah keluar dari gudang dan sedang dalam perjalanan pengantaran menuju ${order.customerAddress}. Estimasi tiba: ${eta}`
          });
        } else if (newStatus === "Selesai") {
          order.checkpoints.unshift({
            time: now,
            title: "Pesanan Selesai & Diterima Pelanggan",
            location: order.customerAddress || "Toko Pelanggan",
            desc: `Barang telah diserahkan dengan sukses kepada ${receiver}.`
          });
          order.progressPercent = 100;
        }
      }
    }

    Storage.saveData(data);
    if (typeof Storage !== 'undefined' && Storage.saveOrder) Storage.saveOrder(order);

    App.showToast(`Status pesanan ${order.id} berhasil diperbarui menjadi "${newStatus}"!`, "success");
    App.closeModal('process-order-modal');

    this.selectedTrackingOrderId = order.id;
    this.renderTrackingPanel();
    Shop.render();
  },

  // ==========================================
  // 4. MAIN TRACKING TAB PANEL (CUSTOMER & EMPLOYEE)
  // ==========================================
  renderTrackingPanel: function() {
    const container = document.getElementById("tracking-content");
    if (!container) return;

    const data = Storage.getData();
    const isEmployee = Storage.isEmployee();
    const orders = data.orders || [];

    // Select order: either this.selectedTrackingOrderId or last order id or first order
    let selectedOrder = null;
    if (this.selectedTrackingOrderId) {
      selectedOrder = orders.find(o => o.id === this.selectedTrackingOrderId);
    }
    if (!selectedOrder) {
      const lastId = localStorage.getItem("GBA_LAST_ORDER_ID");
      if (lastId) {
        selectedOrder = orders.find(o => o.id === lastId);
      }
    }
    if (!selectedOrder && orders.length > 0) {
      selectedOrder = orders[0];
    }
    if (selectedOrder) {
      this.selectedTrackingOrderId = selectedOrder.id;
    }

    if (isEmployee) {
      // EMPLOYEE VIEW: Dispatch & Tracking Console
      const stageCounts = {
        ALL: orders.length,
        "Menunggu Konfirmasi": orders.filter(o => o.status === "Menunggu Konfirmasi" || o.status === "Diproses").length,
        "Sedang Dipacking": orders.filter(o => o.status === "Sedang Dipacking").length,
        "Siap Dikirim": orders.filter(o => o.status === "Siap Dikirim").length,
        "Dalam Pengiriman": orders.filter(o => o.status === "Dalam Pengiriman").length,
        "Selesai": orders.filter(o => o.status === "Selesai").length
      };

      let filtered = orders;
      if (this.activeFilter !== "ALL") {
        filtered = filtered.filter(o => o.status === this.activeFilter);
      }
      if (this.searchQuery.trim()) {
        const q = this.searchQuery.toLowerCase();
        filtered = filtered.filter(o => 
          o.id.toLowerCase().includes(q) || 
          o.customerName.toLowerCase().includes(q) ||
          (o.customerPhone && o.customerPhone.toLowerCase().includes(q)) ||
          (o.customerAddress && o.customerAddress.toLowerCase().includes(q)) ||
          (o.plateNumber && o.plateNumber.toLowerCase().includes(q)) ||
          (o.driverName && o.driverName.toLowerCase().includes(q))
        );
      }

      container.innerHTML = `
        <!-- Employee Dispatch Header -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div class="flex items-center gap-3">
            <span class="p-3 bg-blue-100 text-blue-700 rounded-2xl text-2xl"><i class="fa-solid fa-truck-fast"></i></span>
            <div>
              <div class="flex items-center gap-2">
                <h2 class="text-2xl font-black text-slate-800 tracking-tight">Lacak Pengiriman & Distribusi Armada</h2>
                <span class="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-300">
                  <i class="fa-solid fa-user-shield text-emerald-600"></i> Mode Admin (Akses Penuh)
                </span>
              </div>
              <p class="text-xs text-slate-500 mt-0.5">Kelola status pengiriman, penugasan supir & armada, update checkpoint rute, dan upload foto bukti serah terima (POD).</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button onclick="Orders.openNewOrderModal()" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs shadow-md transition flex items-center gap-1.5">
              <i class="fa-solid fa-plus"></i> Buat Pengiriman Baru
            </button>
          </div>
        </div>

        <!-- Key Metrics -->
        <div class="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
          <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Total Pengiriman</span>
            <div class="text-2xl font-black text-slate-800 font-mono mt-0.5">${stageCounts.ALL}</div>
          </div>
          <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <span class="text-[11px] font-bold text-amber-500 uppercase tracking-wider block">1. Masuk / Baru</span>
            <div class="text-2xl font-black text-amber-600 font-mono mt-0.5">${stageCounts["Menunggu Konfirmasi"]}</div>
          </div>
          <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <span class="text-[11px] font-bold text-blue-500 uppercase tracking-wider block">2. Packing Gudang</span>
            <div class="text-2xl font-black text-blue-600 font-mono mt-0.5">${stageCounts["Sedang Dipacking"]}</div>
          </div>
          <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <span class="text-[11px] font-bold text-purple-500 uppercase tracking-wider block">3. Dalam Pengiriman</span>
            <div class="text-2xl font-black text-purple-600 font-mono mt-0.5">${stageCounts["Dalam Pengiriman"]}</div>
          </div>
          <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <span class="text-[11px] font-bold text-emerald-500 uppercase tracking-wider block">4. Selesai (Terkirim)</span>
            <div class="text-2xl font-black text-emerald-600 font-mono mt-0.5">${stageCounts["Selesai"]}</div>
          </div>
        </div>

        <!-- Dispatch Table Section -->
        <div class="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden mb-8">
          <div class="p-4 bg-slate-50 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <!-- Filter Pills -->
            <div class="flex flex-wrap items-center gap-1.5 overflow-x-auto">
              ${[
                { id: "ALL", label: "Semua", count: stageCounts.ALL },
                { id: "Menunggu Konfirmasi", label: "Pesanan Masuk", count: stageCounts["Menunggu Konfirmasi"] },
                { id: "Sedang Dipacking", label: "Packing", count: stageCounts["Sedang Dipacking"] },
                { id: "Siap Dikirim", label: "Muat Armada", count: stageCounts["Siap Dikirim"] },
                { id: "Dalam Pengiriman", label: "Diantar", count: stageCounts["Dalam Pengiriman"] },
                { id: "Selesai", label: "Selesai", count: stageCounts["Selesai"] }
              ].map(tab => `
                <button 
                  onclick="Orders.handlePanelFilter('${tab.id}')" 
                  class="px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${this.activeFilter === tab.id ? 'bg-blue-600 text-white shadow-xs' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'}"
                >
                  <span>${tab.label}</span>
                  <span class="px-1.5 py-0.2 rounded-full text-[10px] ${this.activeFilter === tab.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'}">${tab.count}</span>
                </button>
              `).join('')}
            </div>

            <!-- Search -->
            <div class="relative min-w-[260px]">
              <i class="fa-solid fa-magnifying-glass absolute left-3 top-2.5 text-slate-400 text-sm"></i>
              <input 
                type="text" 
                placeholder="Cari ID resi, toko, plat, sopir..." 
                value="${Util.escapeHtml(this.searchQuery)}"
                oninput="Orders.handlePanelSearch(this.value)"
                class="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>
          </div>

          <!-- Table -->
          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs text-slate-700">
              <thead class="bg-slate-100 text-slate-600 uppercase font-bold text-[11px] border-b border-slate-200">
                <tr>
                  <th class="py-3 px-4">No. Resi / Order</th>
                  <th class="py-3 px-3">Pelanggan / Alamat</th>
                  <th class="py-3 px-3">Armada & Supir</th>
                  <th class="py-3 px-3 text-right">Nilai Pesanan</th>
                  <th class="py-3 px-3 text-center">Status Pengiriman</th>
                  <th class="py-3 px-3 text-center">Bukti POD</th>
                  <th class="py-3 px-4 text-center">Aksi Admin</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                ${filtered.length === 0 ? `
                  <tr>
                    <td colspan="7" class="py-12 text-center text-slate-400">
                      <i class="fa-solid fa-truck-ramp-box text-3xl mb-2 text-slate-300 block"></i>
                      <p class="font-bold text-slate-700">Tidak ada pengiriman yang sesuai filter</p>
                    </td>
                  </tr>
                ` : filtered.map(o => {
                  const stage = this.getStageInfo(o.status);
                  const isSelected = selectedOrder && selectedOrder.id === o.id;

                  return `
                    <tr class="hover:bg-blue-50/40 transition ${isSelected ? 'bg-blue-50/60 font-medium' : ''}">
                      <td class="py-3 px-4">
                        <span class="font-mono font-bold text-blue-700 block">${o.id}</span>
                        <span class="text-[10px] text-slate-400 font-mono">${o.orderDate || '-'}</span>
                      </td>
                      <td class="py-3 px-3 max-w-[220px]">
                        <p class="font-bold text-slate-900 truncate">${Util.escapeHtml(o.customerName)}</p>
                        <p class="text-[11px] text-slate-500 truncate">${Util.escapeHtml(o.customerAddress || '-')}</p>
                        <span class="text-[10px] text-emerald-700 font-mono"><i class="fa-brands fa-whatsapp"></i> ${o.customerPhone || '-'}</span>
                      </td>
                      <td class="py-3 px-3">
                        <p class="font-semibold text-slate-800">${Util.escapeHtml(o.vehicle || 'Truk Toko')}</p>
                        <p class="text-[10px] text-slate-500 font-mono">${o.plateNumber || '-'} • ${Util.escapeHtml(o.driverName || 'Supir Toko')}</p>
                      </td>
                      <td class="py-3 px-3 text-right font-mono font-bold text-slate-900">
                        ${Util.formatRupiah(o.totalAmount)}
                      </td>
                      <td class="py-3 px-3 text-center">
                        <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-${stage.color}-100 text-${stage.color}-800 border border-${stage.color}-200">
                          <i class="fa-solid ${stage.icon}"></i> ${o.status}
                        </span>
                      </td>
                      <td class="py-3 px-3 text-center">
                        ${o.podImage ? `
                          <div class="inline-block relative group cursor-pointer" onclick="App.previewImageModal('${o.podImage}', 'Bukti POD: ${o.id}')">
                            <img src="${o.podImage}" class="w-8 h-8 rounded-lg object-cover border border-emerald-300 mx-auto" />
                            <span class="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 border border-white rounded-full"></span>
                          </div>
                        ` : `
                          <span class="text-[10px] text-slate-400 italic">Belum ada</span>
                        `}
                      </td>
                      <td class="py-3 px-4 text-center">
                        <div class="flex items-center justify-center gap-1">
                          <button 
                            onclick="Orders.openProcessOrderModal('${o.id}')" 
                            class="p-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-bold border border-blue-200 transition"
                            title="Edit Data Pengiriman, Status, & Foto POD"
                          >
                            <i class="fa-solid fa-pen-to-square"></i> Edit
                          </button>
                          <button 
                            onclick="Orders.setTrackingOrder('${o.id}')" 
                            class="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs transition"
                            title="Tinjau Simulasi Rute & Tracking"
                          >
                            <i class="fa-solid fa-location-crosshairs text-indigo-600"></i>
                          </button>
                          <button 
                            onclick="Documents.previewInvoice('${o.id}')" 
                            class="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs transition"
                            title="Cetak Surat Jalan / Nota"
                          >
                            <i class="fa-solid fa-print"></i>
                          </button>
                          <button 
                            onclick="Orders.deleteOrder('${o.id}')" 
                            class="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg text-xs border border-rose-200 transition"
                            title="Hapus Pengiriman"
                          >
                            <i class="fa-solid fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Live Customer Tracking Simulator Section for Selected Order -->
        <div class="bg-white rounded-2xl border border-slate-200 shadow-xs p-6" id="tracking-simulator-section">
          <div class="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
            <div>
              <h3 class="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <i class="fa-solid fa-desktop text-blue-600"></i> Pratinjau Tampilan Pelacakan Pelanggan (Live Preview)
              </h3>
              <p class="text-xs text-slate-500">Tampilan persis yang dilihat pelanggan saat melacak nomor pesanan ini di halaman Lacak Pengiriman.</p>
            </div>
            ${selectedOrder ? `
              <span class="text-xs font-mono font-bold bg-blue-100 text-blue-800 px-3 py-1 rounded-xl">Order Terpilih: ${selectedOrder.id}</span>
            ` : ''}
          </div>

          <div id="tracking-panel-detail-container">
            ${selectedOrder ? this.renderTrackingDetailHtml(selectedOrder) : this.renderNoOrderFoundHtml()}
          </div>
        </div>
      `;
    } else {
      // CUSTOMER VIEW (READ-ONLY, NO EDIT BUTTONS)
      container.innerHTML = `
        <!-- Customer Tracking Hero -->
        <div class="bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 rounded-3xl p-6 sm:p-10 text-white mb-8 shadow-md">
          <div class="max-w-2xl">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-amber-400 text-slate-950 uppercase tracking-wider mb-3">
              <i class="fa-solid fa-truck-fast"></i> Live Tracking Toko Grosir
            </span>
            <h2 class="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight mb-2">
              Lacak Posisi Pengiriman Barang Anda
            </h2>
            <p class="text-slate-200 text-xs sm:text-sm leading-relaxed mb-6">
              Pantau status penyiapan barang di gudang, penugasan armada truk toko, pergerakan sopir, hingga barang sampai di lokasi toko Anda secara transparan.
            </p>

            <!-- Search Bar -->
            <div class="bg-white p-2 rounded-2xl shadow-xl flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <div class="flex-1 relative">
                <i class="fa-solid fa-magnifying-glass absolute left-3.5 top-3 text-slate-400 text-sm"></i>
                <input 
                  type="text" 
                  id="tracking-panel-search-input" 
                  placeholder="Masukkan Nomor Resi (misal: ORD-20260902-101) atau No. WhatsApp..." 
                  value="${selectedOrder ? selectedOrder.id : ''}"
                  onkeydown="if(event.key==='Enter') Orders.searchCustomerOrder('tracking-panel-search-input')"
                  class="w-full pl-10 pr-4 py-2 text-sm rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono font-bold text-slate-800"
                />
              </div>
              <button 
                onclick="Orders.searchCustomerOrder('tracking-panel-search-input')" 
                class="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-sm transition flex items-center justify-center gap-2"
              >
                <i class="fa-solid fa-location-crosshairs"></i> Lacak Sekarang
              </button>
            </div>

            <!-- Quick Clickable Chips of Sample Orders -->
            <div class="mt-4 flex flex-wrap items-center gap-2">
              <span class="text-xs text-slate-300 font-medium">Contoh Pesanan Tersedia:</span>
              ${orders.slice(0, 4).map(o => `
                <button 
                  onclick="Orders.setTrackingOrder('${o.id}')"
                  class="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-white/10 hover:bg-white/20 text-amber-300 border border-white/20 transition flex items-center gap-1"
                >
                  <i class="fa-solid fa-box text-[10px]"></i> ${o.id} (${o.status})
                </button>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Tracking Result Detail -->
        <div id="tracking-panel-detail-container">
          ${selectedOrder ? this.renderTrackingDetailHtml(selectedOrder) : this.renderNoOrderFoundHtml()}
        </div>
      `;
    }

    if (selectedOrder) {
      setTimeout(() => this.initLeafletMap(selectedOrder), 200);
    }
  },

  handlePanelFilter: function(filterKey) {
    this.activeFilter = filterKey;
    this.renderTrackingPanel();
  },

  handlePanelSearch: function(query) {
    this.searchQuery = query;
    this.renderTrackingPanel();
  },

  // ==========================================
  // 5. MANUAL ORDER & SHIPMENT CREATION
  // ==========================================
  openNewOrderModal: function() {
    if (!Storage.isEmployee()) {
      App.openLoginModal();
      return;
    }

    const orderId = "ORD-" + new Date().toISOString().slice(0,10).replace(/-/g,"") + "-" + Math.floor(100+Math.random()*900);
    const orderDate = new Date().toISOString().replace("T", " ").slice(0, 16);

    const modalHtml = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop" id="new-order-modal">
        <div class="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden modal-content-scale max-h-[92vh] flex flex-col">
          <div class="px-6 py-4 bg-gradient-to-r from-blue-700 to-indigo-800 text-white flex items-center justify-between">
            <h3 class="text-base font-bold flex items-center gap-2">
              <i class="fa-solid fa-truck-fast text-amber-400"></i> Buat Pengiriman Baru Manual
            </h3>
            <button onclick="App.closeModal('new-order-modal')" class="text-white/80 hover:text-white text-xl">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>

          <form onsubmit="Orders.saveNewOrder(event)" class="p-6 overflow-y-auto space-y-4 flex-1">
            <div class="bg-blue-50 p-3 rounded-xl border border-blue-200 flex justify-between items-center text-xs">
              <span class="text-slate-600 font-semibold">Nomor Resi / Pengiriman Baru:</span>
              <span class="font-mono font-bold text-blue-700">${orderId}</span>
              <input type="hidden" id="new-order-id" value="${orderId}" />
              <input type="hidden" id="new-order-date" value="${orderDate}" />
            </div>

            <div>
              <label class="block text-xs font-bold uppercase text-slate-700 mb-1">Nama Toko / Penerima *</label>
              <input type="text" id="new-order-cust-name" required placeholder="Contoh: Toko Berkah Jaya / Bpk. Rudi" class="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg" />
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-bold uppercase text-slate-700 mb-1">No. WhatsApp Penerima *</label>
                <input type="text" id="new-order-cust-phone" required placeholder="0812-xxxx-xxxx" class="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg" />
              </div>
              <div>
                <label class="block text-xs font-bold uppercase text-slate-700 mb-1">Nilai Total Tagihan (Rp) *</label>
                <input type="number" id="new-order-total" required value="500000" min="0" class="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg font-mono font-bold" />
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold uppercase text-slate-700 mb-1">Alamat Tujuan Pengiriman *</label>
              <textarea id="new-order-cust-address" required rows="2" placeholder="Jl. Pasar Induk Blok C..." class="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg"></textarea>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-bold uppercase text-slate-700 mb-1">Pilihan Armada *</label>
                <select id="new-order-vehicle" class="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white">
                  <option value="Truk Toko GBA 1 (CDD Box)">Truk Toko GBA 1 (CDD Box)</option>
                  <option value="Truk Toko GBA 2 (Long Chassis)">Truk Toko GBA 2 (Long Chassis)</option>
                  <option value="Mobil Box Kecil (Gran Max)">Mobil Box Kecil (Gran Max)</option>
                  <option value="Tosa Roda 3 Operasional">Tosa Roda 3 Operasional</option>
                  <option value="Kurir Motor Express Toko">Kurir Motor Express Toko</option>
                  <option value="Ekspedisi Cargo Eksternal">Ekspedisi Cargo Eksternal</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-bold uppercase text-slate-700 mb-1">Plat Nomor Armada</label>
                <input type="text" id="new-order-plate" value="B 9821 GBA" class="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg font-mono font-bold" />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-bold uppercase text-slate-700 mb-1">Nama Supir / Driver</label>
                <input type="text" id="new-order-driver" value="Bpk. Joko Santoso" class="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg" />
              </div>
              <div>
                <label class="block text-xs font-bold uppercase text-slate-700 mb-1">No. Kontak Supir</label>
                <input type="text" id="new-order-driver-phone" value="0813-8877-6655" class="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg font-mono" />
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold uppercase text-slate-700 mb-1">Rincian Barang (Deskripsi Singkat) *</label>
              <input type="text" id="new-order-items-desc" required value="Sembako Partai Besar (Minyak, Beras, Gula)" class="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg" />
            </div>

            <div>
              <label class="block text-xs font-bold uppercase text-slate-700 mb-1">Status Awal Pengiriman</label>
              <select id="new-order-status" class="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white font-bold">
                <option value="Menunggu Konfirmasi">1. Menunggu Konfirmasi (Pesanan Masuk)</option>
                <option value="Sedang Dipacking" selected>2. Sedang Dipacking di Gudang</option>
                <option value="Siap Dikirim">3. Siap Dikirim (Muat Armada)</option>
                <option value="Dalam Pengiriman">4. Dalam Pengiriman (Diantar)</option>
                <option value="Selesai">5. Selesai (Terkirim)</option>
              </select>
            </div>

            <div class="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
              <button type="button" onclick="App.closeModal('new-order-modal')" class="px-4 py-2 text-xs text-slate-600 hover:bg-slate-100 rounded-xl font-bold">Batal</button>
              <button type="submit" class="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs shadow-md transition flex items-center gap-1.5">
                <i class="fa-solid fa-floppy-disk"></i> Simpan & Terbitkan Pengiriman
              </button>
            </div>
          </form>
        </div>
      </div>
    `;

    App.closeModal('new-order-modal');
    document.body.insertAdjacentHTML('beforeend', modalHtml);
  },

  saveNewOrder: function(event) {
    event.preventDefault();
    const data = Storage.getData();

    const id = document.getElementById("new-order-id").value;
    const orderDate = document.getElementById("new-order-date").value;
    const customerName = document.getElementById("new-order-cust-name").value.trim();
    const customerPhone = document.getElementById("new-order-cust-phone").value.trim();
    const totalAmount = Number(document.getElementById("new-order-total").value) || 0;
    const customerAddress = document.getElementById("new-order-cust-address").value.trim();
    const vehicle = document.getElementById("new-order-vehicle").value;
    const plateNumber = document.getElementById("new-order-plate").value.trim();
    const driverName = document.getElementById("new-order-driver").value.trim();
    const driverPhone = document.getElementById("new-order-driver-phone").value.trim();
    const itemsDesc = document.getElementById("new-order-items-desc").value.trim();
    const status = document.getElementById("new-order-status").value;

    const newOrder = {
      id,
      orderDate,
      customerName,
      customerPhone,
      customerAddress,
      deliveryMethod: vehicle,
      paymentMethod: "Transfer Bank / Tunai",
      notes: "Pengiriman manual oleh dispatcher toko grosir",
      totalAmount,
      status,
      progressPercent: status === 'Selesai' ? 100 : status === 'Dalam Pengiriman' ? 75 : status === 'Siap Dikirim' ? 50 : status === 'Sedang Dipacking' ? 25 : 10,
      vehicle,
      plateNumber,
      driverName,
      driverPhone,
      estimatedArrival: "Hari ini, dalam estimasi 45 menit",
      items: [
        { name: itemsDesc, qty: 1, unit: "Paket", price: totalAmount, subtotal: totalAmount }
      ],
      checkpoints: [
        {
          time: orderDate,
          title: "Pengiriman Dibuat oleh Admin Gudang",
          location: "Gudang Niaga Jaya GBA",
          desc: `Data pengiriman resmi diterbitkan untuk tujuan ${customerName}. Armada: ${vehicle} (${plateNumber})`
        }
      ]
    };

    if (!data.orders) data.orders = [];
    data.orders.unshift(newOrder);

    // Otomatis terbitkan Faktur Penjualan di Dokumen
    if (!data.documents) data.documents = [];
    const dateOnly = orderDate.slice(0, 10);
    const year = dateOnly.slice(0, 4);
    const month = dateOnly.slice(5, 7);
    data.documents.unshift({
      id: "DOC-INV-" + id,
      docNumber: `INV/GBA/${year}/${month}/${id.split('-')[2] || '001'}`,
      refDoc: id,
      refOrder: id,
      type: "Faktur Penjualan",
      date: dateOnly,
      orderTimestamp: orderDate,
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
      clientName: customerName,
      clientPhone: customerPhone,
      clientAddress: customerAddress,
      paymentStatus: "MENUNGGU PEMBAYARAN",
      paymentMethod: "Transfer Bank / Tunai",
      items: newOrder.items,
      discount: 0,
      taxPercent: 0,
      taxAmount: 0,
      grandTotal: totalAmount,
      notes: `Faktur Penjualan Penerbitan Manual Pengiriman #${id}. Tanggal: ${orderDate}. Armada: ${vehicle} (${plateNumber})`,
      signatureName: "Bagian Logistik & Penjualan",
      attachmentUrl: ""
    });

    Storage.saveData(data);
    if (typeof Storage !== 'undefined' && Storage.saveOrder) Storage.saveOrder(newOrder);
    if (typeof Storage !== 'undefined' && Storage.saveDocument) Storage.saveDocument(data.documents[0]);

    App.closeModal('new-order-modal');
    App.showToast(`Pengiriman baru ${id} & Faktur Penjualan berhasil dibuat!`, "success");
    this.selectedTrackingOrderId = id;
    this.renderTrackingPanel();
  },

  deleteOrder: function(orderId) {
    if (!Storage.isEmployee()) return;
    const data = Storage.getData();
    const order = (data.orders || []).find(o => o.id === orderId);
    if (!order) return;

    if (confirm(`Apakah Anda yakin ingin menghapus data pengiriman "${order.id}" (${order.customerName})?`)) {
      data.orders = data.orders.filter(o => o.id !== orderId);
      Storage.saveData(data);
      if (typeof Storage !== 'undefined' && Storage.deleteOrder) Storage.deleteOrder(orderId);

      App.showToast(`Pengiriman ${order.id} berhasil dihapus.`, "info");
      this.renderTrackingPanel();
    }
  }
};
