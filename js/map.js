/**
 * MapService - Sistem Integrasi Peta & Sinkronisasi Rute Pengiriman
 * Grosir Berkah Abadi (GBA)
 *
 * Mengelola titik asal (Alamat Resmi Toko/Gudang Kendalpayak Malang),
 * titik tujuan (Alamat Pengiriman Pelanggan), geocoding alamat,
 * serta kalkulasi dan visualisasi rute interaktif (Leaflet + OSRM).
 */

const MapService = {
  // 1. DATA RESMI TOKO (TITIK ASAL / ORIGIN)
  STORE_ORIGIN: {
    name: "Grosir Berkah Abadi (Gudang Pusat)",
    address: "Jl. Raya Kendalpayak No.1A, Segaran, Kendalpayak, Kec. Pakisaji, Kabupaten Malang, Jawa Timur 65162",
    coords: [-8.0415, 112.6315], // Latitude, Longitude resmi Kendalpayak Pakisaji Malang
    phone: "0812-3456-7890",
    city: "Kabupaten Malang",
    province: "Jawa Timur",
    postalCode: "65162"
  },

  // 2. KAMUS KOORDINAT LOKAL (OFFLINE & FAST RESOLVER)
  // Menjamin akurasi instan tanpa ketergantungan internet untuk Malang Raya & sekitarnya
  KNOWN_LOCATIONS: {
    // Wilayah Malang Raya (Prioritas Utama Toko)
    "kendalpayak": [-8.0415, 112.6315],
    "pakisaji": [-8.0620, 112.5980],
    "gadang": [-8.0150, 112.6280],
    "sukun": [-7.9950, 112.6230],
    "klojen": [-7.9825, 112.6308],
    "alun-alun malang": [-7.9825, 112.6308],
    "kotalama": [-7.9948, 112.6325],
    "kolonel sugiono": [-7.9948, 112.6325],
    "bumiayu": [-8.0180, 112.6345],
    "lowokwaru": [-7.9450, 112.6180],
    "soekarno hatta": [-7.9450, 112.6180],
    "blimbing": [-7.9420, 112.6450],
    "kedungkandang": [-8.0050, 112.6550],
    "kepanjen": [-8.1320, 112.5720],
    "singosari": [-7.8920, 112.6650],
    "lawang": [-7.8350, 112.6980],
    "batu": [-7.8710, 112.5270],
    "kota batu": [-7.8710, 112.5270],
    "wagir": [-8.0210, 112.5750],
    "bululawang": [-8.0750, 112.6520],
    "turen": [-8.1720, 112.7000],
    "dampit": [-8.2120, 112.7530],
    "daan mogot": [-6.1555, 106.7850], // Legacy demo compatibility
    "pasar anyar": [-6.1783, 106.6319],
    "tangerang": [-6.1783, 106.6319],
    "jakarta": [-6.1754, 106.8272],
    "gambir": [-6.1760, 106.8300],
    "hayam wuruk": [-6.1620, 106.8200],
    "surabaya": [-7.2575, 112.7521],
    "sidoarjo": [-7.4478, 112.7183],
    "pasuruan": [-7.6450, 112.9070],
    "probolinggo": [-7.7540, 113.2160]
  },

  // Cache geocoding dinamis
  _geocodeCache: {},

  /**
   * Mendapatkan Titik Asal Resmi Toko (Store Origin)
   */
  getStoreOrigin: function() {
    try {
      if (typeof Storage !== "undefined" && Storage.getData) {
        const storeData = Storage.getData();
        if (storeData && storeData.profile) {
          const prof = storeData.profile;
          return {
            name: prof.name || this.STORE_ORIGIN.name,
            address: prof.address || this.STORE_ORIGIN.address,
            coords: this.STORE_ORIGIN.coords,
            phone: prof.phone || this.STORE_ORIGIN.phone
          };
        }
      }
    } catch (e) {}
    return { ...this.STORE_ORIGIN };
  },

  /**
   * Geocoding Alamat Pengiriman Pelanggan menjadi Koordinat [lat, lng]
   * Berurutan: Parsing Explicit Coords -> Local Dictionary -> Cache -> OpenStreetMap Nominatim -> Fallback
   */
  resolveDestinationCoords: async function(addressStr, explicitCoords = null) {
    // 1. Jika koordinat sudah diberikan secara eksplisit
    if (Array.isArray(explicitCoords) && explicitCoords.length === 2 && !isNaN(explicitCoords[0]) && !isNaN(explicitCoords[1])) {
      return [Number(explicitCoords[0]), Number(explicitCoords[1])];
    }

    if (!addressStr || typeof addressStr !== "string") {
      // Default: Gadang - Sukun Malang (titik rute terdekat ke toko)
      return [-8.0050, 112.6320];
    }

    const cleanStr = addressStr.trim();

    // 2. Cek apakah ada format angka koordinat di dalam string alamat (misal "-8.0123, 112.6456")
    const coordRegex = /(-?\d+\.\d+)\s*,\s*(-?\d+\.\d+)/;
    const match = cleanStr.match(coordRegex);
    if (match) {
      const lat = parseFloat(match[1]);
      const lng = parseFloat(match[2]);
      if (lat >= -11 && lat <= 6 && lng >= 95 && lng <= 141) {
        return [lat, lng];
      }
    }

    // 3. Cek memori cache
    if (this._geocodeCache[cleanStr]) {
      return this._geocodeCache[cleanStr];
    }

    const lower = cleanStr.toLowerCase();

    // 4. Cek Kamus Lokal Cepat (Matching Kata Kunci)
    for (const [key, coords] of Object.entries(this.KNOWN_LOCATIONS)) {
      if (lower.includes(key)) {
        this._geocodeCache[cleanStr] = coords;
        return coords;
      }
    }

    // 5. Query Asinkron ke OpenStreetMap Nominatim (jika browser online)
    if (typeof window !== "undefined" && window.navigator && window.navigator.onLine) {
      try {
        // Optimasi query: buang nomor RT/RW dan patokan dalam kurung agar Nominatim lebih akurat
        const simplified = cleanStr
          .replace(/\(.*?\)/g, "")
          .replace(/rt\s*\d+\s*\/?\s*rw\s*\d+/gi, "")
          .replace(/no\.\s*\d+/gi, "")
          .trim();

        const query = simplified.length > 5 ? simplified : cleanStr;
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`;
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2500);

        const res = await fetch(url, {
          signal: controller.signal,
          headers: { "Accept-Language": "id,en" }
        });
        clearTimeout(timeoutId);

        if (res.ok) {
          const list = await res.json();
          if (list && list.length > 0 && list[0].lat && list[0].lon) {
            const resolved = [parseFloat(list[0].lat), parseFloat(list[0].lon)];
            this._geocodeCache[cleanStr] = resolved;
            return resolved;
          }
        }
      } catch (netErr) {
        // Abaikan kesalahan jaringan, beralih ke fallback deterministik
      }
    }

    // 6. Fallback Cerdas: Posisi area Malang Raya dengan sedikit variasi deterministik
    // sehingga setiap alamat baru tidak bertumpuk di titik yang sama persis
    let hash = 0;
    for (let i = 0; i < lower.length; i++) {
      hash = (hash << 5) - hash + lower.charCodeAt(i);
      hash |= 0;
    }
    const offsetLat = ((Math.abs(hash) % 100) / 100) * 0.05 - 0.025; // Rentang +/- ~2.5 km
    const offsetLng = (((Math.abs(hash) >> 3) % 100) / 100) * 0.05 - 0.025;

    const fallbackCoords = [-7.9850 + offsetLat, 112.6300 + offsetLng];
    this._geocodeCache[cleanStr] = fallbackCoords;
    return fallbackCoords;
  },

  /**
   * Menghitung Jarak Lurus (Haversine Distance) dalam Kilometer
   */
  calculateDistanceKm: function(coord1, coord2) {
    const lat1 = coord1[0];
    const lon1 = coord1[1];
    const lat2 = coord2[0];
    const lon2 = coord2[1];

    const R = 6371; // Radius bumi dalam km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  },

  /**
   * Menghitung Rute Berkendara Realistis antara Titik Asal Toko & Titik Tujuan Pelanggan
   * Menghasilkan Waypoint Jalan (OSRM atau Interpolasi Halus), Jarak (KM), dan Estimasi Waktu (Menit).
   */
  calculateRoute: async function(originCoords, destCoords) {
    const straightDist = this.calculateDistanceKm(originCoords, destCoords);

    // 1. Buat Waypoint Awal (Interpolasi Kurva Halus) agar rute dapat dirender secara instan (0ms latency)
    const baseWaypoints = this._generateCurvedWaypoints(originCoords, destCoords);
    let result = {
      waypoints: baseWaypoints,
      distanceKm: Number((straightDist * 1.25).toFixed(1)), // Estimasi jarak jalan darat
      durationMinutes: Math.max(8, Math.round((straightDist * 1.25 / 35) * 60)), // Rata-rata 35 km/jam kota
      isRealRoadGeometry: false,
      summary: `Rute Darat Kendalpayak ke Tujuan (${(straightDist * 1.25).toFixed(1)} km)`
    };

    // 2. Upayakan Memperoleh Geometri Jalan Nyata dari OSRM Routing API Publik
    if (typeof window !== "undefined" && window.navigator && window.navigator.onLine) {
      try {
        const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${originCoords[1]},${originCoords[0]};${destCoords[1]},${destCoords[0]}?overview=full&geometries=geojson`;
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);

        const res = await fetch(osrmUrl, { signal: controller.signal });
        clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          if (data && data.code === "Ok" && data.routes && data.routes[0]) {
            const routeData = data.routes[0];
            // OSRM mengembalikan koordinat [lng, lat], balikkan menjadi [lat, lng] untuk Leaflet
            const rawCoords = routeData.geometry.coordinates || [];
            if (rawCoords.length >= 2) {
              const leafletPoints = rawCoords.map(pt => [pt[1], pt[0]]);
              result.waypoints = leafletPoints;
              result.distanceKm = Number((routeData.distance / 1000).toFixed(1));
              result.durationMinutes = Math.max(5, Math.round(routeData.duration / 60));
              result.isRealRoadGeometry = true;
              result.summary = `Jalur Jalan Raya (${result.distanceKm} km, ±${result.durationMinutes} menit)`;
            }
          }
        }
      } catch (err) {
        // Gunakan fallback waypoints jika OSRM timeout / offline
      }
    }

    return result;
  },

  /**
   * Generator Waypoints Halus untuk Rute Pengiriman Cepat (Fallback)
   */
  _generateCurvedWaypoints: function(start, end) {
    const points = [start];
    const steps = 7;
    const latDiff = end[0] - start[0];
    const lngDiff = end[1] - start[1];

    for (let i = 1; i < steps; i++) {
      const ratio = i / steps;
      // Berikan lengkungan kurva halus yang menyerupai pola jalan raya
      const curve = Math.sin(ratio * Math.PI) * 0.004;
      const ptLat = start[0] + latDiff * ratio + curve;
      const ptLng = start[1] + lngDiff * ratio + (i % 2 === 0 ? 0.001 : -0.001);
      points.push([Number(ptLat.toFixed(5)), Number(ptLng.toFixed(5))]);
    }
    points.push(end);
    return points;
  },

  /**
   * Membuat Icon Marker Pin Toko Resmi (Origin Pin)
   */
  createStorePinIcon: function() {
    if (typeof L === "undefined") return null;
    return L.divIcon({
      className: "origin-store-pin",
      html: `
        <div class="relative cursor-pointer group select-none">
          <div class="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-700 to-indigo-600 text-white border-2 border-white shadow-2xl flex items-center justify-center text-lg font-bold ring-4 ring-blue-400/40 transition-transform group-hover:scale-110">
            <i class="fa-solid fa-warehouse"></i>
          </div>
          <div class="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-slate-950 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-lg whitespace-nowrap border border-blue-400/80 flex items-center gap-1">
            <span class="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
            Toko Asal (Kendalpayak)
          </div>
        </div>
      `,
      iconSize: [44, 44],
      iconAnchor: [22, 22]
    });
  },

  /**
   * Membuat Icon Marker Pin Alamat Pembeli (Destination Pin)
   */
  createCustomerPinIcon: function(customerName = "Pelanggan", isDraggable = false) {
    if (typeof L === "undefined") return null;
    const shortName = customerName ? customerName.split("(")[0].trim() : "Pelanggan";
    return L.divIcon({
      className: "destination-customer-pin",
      html: `
        <div class="relative cursor-pointer group select-none">
          <div class="w-11 h-11 rounded-2xl bg-gradient-to-tr from-rose-600 to-red-500 text-white border-2 border-white shadow-2xl flex items-center justify-center text-lg font-bold ring-4 ring-rose-400/40 transition-transform group-hover:scale-110 animate-bounce">
            <i class="fa-solid fa-location-dot"></i>
          </div>
          <div class="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-rose-950 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-lg whitespace-nowrap border border-rose-400/80 flex items-center gap-1">
            <i class="fa-solid fa-store text-rose-300 text-[9px]"></i>
            <span class="max-w-[120px] truncate">${shortName} (Tujuan)</span>
            ${isDraggable ? '<span class="text-[9px] text-amber-300 font-normal">[Geser Pin]</span>' : ''}
          </div>
        </div>
      `,
      iconSize: [44, 44],
      iconAnchor: [22, 22]
    });
  },

  /**
   * Membuat Icon Marker Truk Armada Bergerak (Fleet Pin)
   */
  createTruckPinIcon: function(plateNumber = "B 9821 GBA") {
    if (typeof L === "undefined") return null;
    return L.divIcon({
      className: "fleet-truck-pin",
      html: `
        <div class="relative cursor-pointer group select-none">
          <div class="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 border-2 border-white shadow-2xl flex items-center justify-center text-lg font-black ring-4 ring-amber-300/60 transition-transform group-hover:scale-110">
            <i class="fa-solid fa-truck-fast"></i>
          </div>
          <div class="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-slate-950 text-amber-300 text-[10px] font-mono font-bold px-2 py-0.5 rounded-md shadow-lg whitespace-nowrap border border-amber-400/80 flex items-center gap-1">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            ${plateNumber}
          </div>
        </div>
      `,
      iconSize: [48, 48],
      iconAnchor: [24, 24]
    });
  },

  /**
   * Inisialisasi Peta Interaktif Lengkap dengan Dua Pin Tersinkronisasi & Rute
   * 
   * @param {string} containerId - ID elemen DOM peta
   * @param {Object} config - Pengaturan peta
   *    - customerAddress: string
   *    - customerName: string
   *    - customerPhone: string
   *    - destinationCoords: [lat, lng] (opsional)
   *    - progressPercent: number (0 - 100)
   *    - isLiveTracking: boolean
   *    - allowDragDestination: boolean
   *    - onDestinationMoved: function(newCoords, distanceKm, etaMins)
   */
  renderSynchronizedMap: async function(containerId, config = {}) {
    const mapEl = document.getElementById(containerId);
    if (!mapEl) return null;

    if (typeof L === "undefined") {
      console.warn("Leaflet library belum siap.");
      return null;
    }

    // Bersihkan instance Leaflet lama pada kontainer
    if (mapEl._leaflet_id && mapEl._leaflet_instance) {
      try {
        mapEl._leaflet_instance.remove();
      } catch (e) {}
      mapEl._leaflet_instance = null;
    }

    const store = this.getStoreOrigin();
    const originCoords = store.coords; // [-8.0415, 112.6315]

    // Selesaikan koordinat tujuan pelanggan
    const destCoords = await this.resolveDestinationCoords(config.customerAddress, config.destinationCoords);

    // Hitung rute jalan & jarak
    const routeInfo = await this.calculateRoute(originCoords, destCoords);
    const waypoints = routeInfo.waypoints;

    // Inisialisasi Map Leaflet
    const map = L.map(containerId, {
      zoomControl: true,
      attributionControl: true
    }).setView(originCoords, 13);

    mapEl._leaflet_instance = map;

    // Layer OpenStreetMap yang jernih dan responsif
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "&copy; OpenStreetMap | Grosir Berkah Abadi"
    }).addTo(map);

    // 1. PLOT PIN ASAL: Toko Resmi Grosir Berkah Abadi
    const storeMarker = L.marker(originCoords, {
      icon: this.createStorePinIcon(),
      zIndexOffset: 1000
    }).addTo(map);

    storeMarker.bindPopup(`
      <div class="p-1 text-xs">
        <div class="flex items-center gap-1.5 text-blue-700 font-bold mb-1">
          <i class="fa-solid fa-warehouse"></i> ${store.name}
        </div>
        <div class="px-2 py-0.5 mb-1.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 inline-block uppercase">
          Titik Asal Pengiriman (Origin)
        </div>
        <p class="text-slate-700 text-[11px] leading-relaxed"><b>Alamat Resmi:</b> ${store.address}</p>
        <p class="text-[11px] text-slate-500 mt-1">Kontak Toko: <b>${store.phone}</b></p>
        <span class="text-[10px] font-mono text-slate-400 block mt-1">GPS: ${originCoords[0].toFixed(5)}, ${originCoords[1].toFixed(5)}</span>
      </div>
    `);

    // 2. PLOT PIN TUJUAN: Alamat Pengiriman Pelanggan
    const customerName = config.customerName || "Alamat Toko Pemesan";
    const destMarker = L.marker(destCoords, {
      icon: this.createCustomerPinIcon(customerName, Boolean(config.allowDragDestination)),
      draggable: Boolean(config.allowDragDestination),
      zIndexOffset: 900
    }).addTo(map);

    const updateDestPopup = (coords, dist, eta) => {
      destMarker.bindPopup(`
        <div class="p-1 text-xs">
          <div class="flex items-center gap-1.5 text-rose-700 font-bold mb-1">
            <i class="fa-solid fa-store"></i> ${customerName}
          </div>
          <div class="px-2 py-0.5 mb-1.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800 inline-block uppercase">
            Titik Tujuan Pengiriman (Destination)
          </div>
          <p class="text-slate-700 text-[11px] leading-relaxed"><b>Alamat Pengiriman:</b> ${config.customerAddress || 'Lokasi Terpilih'}</p>
          ${config.customerPhone ? `<p class="text-[11px] text-slate-500 mt-0.5">WhatsApp: <b>${config.customerPhone}</b></p>` : ''}
          <div class="mt-2 pt-2 border-t border-slate-200 flex items-center justify-between text-[11px]">
            <span class="text-slate-600">Jarak dari Toko:</span>
            <b class="text-blue-700 font-mono">${dist} km</b>
          </div>
          <div class="flex items-center justify-between text-[11px]">
            <span class="text-slate-600">Estimasi Perjalanan:</span>
            <b class="text-amber-600 font-mono">±${eta} Menit</b>
          </div>
          <span class="text-[10px] font-mono text-slate-400 block mt-1">GPS: ${coords[0].toFixed(5)}, ${coords[1].toFixed(5)}</span>
          ${config.allowDragDestination ? '<p class="text-[10px] text-blue-600 font-semibold mt-1">💡 Anda dapat menggeser pin ini atau klik peta untuk mengubah titik antar.</p>' : ''}
        </div>
      `);
    };

    updateDestPopup(destCoords, routeInfo.distanceKm, routeInfo.durationMinutes);

    // 3. PLOT RUTE PENGIRIMAN (POLYLINE)
    let polylines = [];
    const drawRoute = (wps, progressRatio = 0) => {
      // Hapus polyline sebelumnya jika ada
      polylines.forEach(p => map.removeLayer(p));
      polylines = [];

      if (!wps || wps.length < 2) return;

      if (config.isLiveTracking && progressRatio > 0) {
        // Mode Live Tracking: Pecah rute menjadi yang sudah ditempuh (Hijau) & sisa rute (Biru Putus-putus)
        const floatIdx = Math.max(0, Math.min(1, progressRatio)) * (wps.length - 1);
        const segIdx = Math.min(Math.floor(floatIdx), wps.length - 2);
        const subRatio = floatIdx - segIdx;

        const currentTruckLat = wps[segIdx][0] + (wps[segIdx + 1][0] - wps[segIdx][0]) * subRatio;
        const currentTruckLng = wps[segIdx][1] + (wps[segIdx + 1][1] - wps[segIdx][1]) * subRatio;
        const truckCoords = [currentTruckLat, currentTruckLng];

        const traveled = [];
        for (let i = 0; i <= segIdx; i++) traveled.push(wps[i]);
        traveled.push(truckCoords);

        const remaining = [truckCoords];
        for (let i = segIdx + 1; i < wps.length; i++) remaining.push(wps[i]);

        // Bagian yang telah ditempuh (Hijau Zamrud Tegas)
        const poly1 = L.polyline(traveled, {
          color: "#10b981",
          weight: 6,
          opacity: 0.95,
          lineCap: "round",
          lineJoin: "round"
        }).addTo(map);

        // Bagian sisa perjalanan (Biru Bergaris Putus-putus)
        const poly2 = L.polyline(remaining, {
          color: "#3b82f6",
          weight: 5,
          dashArray: "8, 8",
          opacity: 0.8,
          lineCap: "round",
          lineJoin: "round"
        }).addTo(map);

        polylines.push(poly1, poly2);
      } else {
        // Mode Normal / Rute Penuh (Biru Indigo Bergradasi Halus)
        const poly = L.polyline(wps, {
          color: "#2563eb",
          weight: 6,
          opacity: 0.88,
          lineCap: "round",
          lineJoin: "round"
        }).addTo(map);

        // Garis batas luar (shadow border)
        const shadow = L.polyline(wps, {
          color: "#1e3a8a",
          weight: 8,
          opacity: 0.25,
          lineCap: "round",
          lineJoin: "round"
        }).addTo(map);

        polylines.push(shadow, poly);
      }
    };

    const progressRatio = config.isLiveTracking ? (Math.max(0, Math.min(100, Number(config.progressPercent) || 15)) / 100) : 0;
    drawRoute(waypoints, progressRatio);

    // 4. PLOT TRUK ARMADA (JIKA DALAM MODE LIVE TRACKING)
    let truckMarker = null;
    if (config.isLiveTracking) {
      const floatIdx = progressRatio * (waypoints.length - 1);
      const segIdx = Math.min(Math.floor(floatIdx), waypoints.length - 2);
      const subRatio = floatIdx - segIdx;

      const truckLat = waypoints[segIdx][0] + (waypoints[segIdx + 1][0] - waypoints[segIdx][0]) * subRatio;
      const truckLng = waypoints[segIdx][1] + (waypoints[segIdx + 1][1] - waypoints[segIdx][1]) * subRatio;
      const truckCoords = [truckLat, truckLng];

      truckMarker = L.marker(truckCoords, {
        icon: this.createTruckPinIcon(config.plateNumber || "B 9821 GBA"),
        zIndexOffset: 1200
      }).addTo(map);

      truckMarker.bindPopup(`
        <div class="p-1.5 text-xs">
          <div class="flex items-center gap-1.5 text-amber-600 font-bold mb-1">
            <i class="fa-solid fa-truck-moving"></i> Posisi Armada: ${config.vehicle || 'Truk Toko GBA'}
          </div>
          <p class="text-[11px] text-slate-700">No. Polisi: <b class="font-mono">${config.plateNumber || 'B 9821 GBA'}</b></p>
          <p class="text-[11px] text-slate-700">Driver: <b>${config.driverName || 'Bpk. Joko Santoso'}</b> (${config.driverPhone || '0813-8877-6655'})</p>
          <p class="text-[11px] text-emerald-700 font-bold mt-1">Status: ${config.status || 'Dalam Pengiriman'} (${Math.round(progressRatio * 100)}% Selesai)</p>
          <p class="text-[10px] text-slate-500 font-mono mt-0.5">GPS: ${truckLat.toFixed(5)}, ${truckLng.toFixed(5)}</p>
        </div>
      `);
    }

    // 5. FIT BOUNDS: Sesuaikan batas pandangan agar kedua Pin dan seluruh rute muat proporsional
    const allPoints = [originCoords, destCoords, ...waypoints];
    map.fitBounds(L.latLngBounds(allPoints), { padding: [45, 45] });

    // 6. INTERAKTIVITAS: SINKRONISASI PIN TUJUAN SECARA REAL-TIME JIKA DIUBAH / DIGESER
    if (config.allowDragDestination) {
      const handleDestinationUpdate = async (newLatLng) => {
        const newCoords = [newLatLng.lat, newLatLng.lng];
        // Hitung ulang rute secara real-time
        const updatedRoute = await MapService.calculateRoute(originCoords, newCoords);
        drawRoute(updatedRoute.waypoints, 0);
        updateDestPopup(newCoords, updatedRoute.distanceKm, updatedRoute.durationMinutes);
        map.fitBounds(L.latLngBounds([originCoords, newCoords, ...updatedRoute.waypoints]), { padding: [45, 45] });

        if (typeof config.onDestinationMoved === "function") {
          config.onDestinationMoved({
            coords: newCoords,
            distanceKm: updatedRoute.distanceKm,
            durationMinutes: updatedRoute.durationMinutes,
            summary: updatedRoute.summary
          });
        }
      };

      // Event geser pin (dragend)
      destMarker.on("dragend", function(e) {
        handleDestinationUpdate(e.target.getLatLng());
      });

      // Event klik di area peta untuk memindahkan pin tujuan secara langsung
      map.on("click", function(e) {
        destMarker.setLatLng(e.latlng);
        handleDestinationUpdate(e.latlng);
      });
    }

    // Perbaiki rendering tile saat modal dibuka
    setTimeout(() => {
      try { map.invalidateSize(); } catch (e) {}
    }, 250);
    setTimeout(() => {
      try { map.invalidateSize(); } catch (e) {}
    }, 500);

    return {
      map,
      storeMarker,
      destMarker,
      truckMarker,
      originCoords,
      destCoords,
      routeInfo,
      waypoints,
      fitBounds: () => map.fitBounds(L.latLngBounds([originCoords, destCoords, ...waypoints]), { padding: [45, 45] }),
      centerStore: () => { map.setView(originCoords, 15, { animate: true }); storeMarker.openPopup(); },
      centerDestination: () => { map.setView(destCoords, 15, { animate: true }); destMarker.openPopup(); },
      centerTruck: () => {
        if (truckMarker) {
          map.setView(truckMarker.getLatLng(), 15, { animate: true });
          truckMarker.openPopup();
        }
      }
    };
  },

  /**
   * Buka Navigasi Arah Lengkap Langsung di Google Maps
   */
  openInGoogleMaps: function(destAddressOrCoords) {
    const origin = encodeURIComponent(this.STORE_ORIGIN.address);
    let dest = "";
    if (Array.isArray(destAddressOrCoords) && destAddressOrCoords.length === 2) {
      dest = `${destAddressOrCoords[0]},${destAddressOrCoords[1]}`;
    } else if (typeof destAddressOrCoords === "string") {
      dest = encodeURIComponent(destAddressOrCoords);
    } else {
      dest = "-7.9950,112.6230"; // Default Kota Malang
    }
    const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${dest}&travelmode=driving`;
    if (typeof window !== "undefined" && typeof window.open === "function") {
      window.open(url, "_blank");
    }
    return url;
  }
};

// Pasang ke window scope
if (typeof window !== "undefined") {
  window.MapService = MapService;
}
