/**
 * WMS (Warehouse Management System) Module
 * Handles Warehouse Stock, Rack Map, Inbound/Outbound, Stock Opname, and Mutation Logs
 * Fully synchronized with 250 Products & Automatic Goods Receipt Report (BAPB) Generation
 */

const WMS = {
  currentFilter: "ALL",
  currentZone: "ALL",
  currentView: "TABLE", // "TABLE" or "POSITION"
  searchQuery: "",

  init: function() {
    this.render();
  },

  setZone: function(zone) {
    this.currentZone = zone;
    this.render();
  },

  setView: function(view) {
    this.currentView = view;
    this.render();
  },

  handleSearch: function(val) {
    this.searchQuery = val;
    this.render();
  },

  handleFilter: function(val) {
    this.currentFilter = val;
    this.render();
  },

  render: function() {
    const data = Storage.getData();
    const isEmployee = Storage.isEmployee();
    const container = document.getElementById("wms-content");
    if (!container) return;

    if (!isEmployee) {
      container.innerHTML = this.renderLockedView();
      return;
    }

    // Filter items
    let items = data.wmsItems || [];
    
    // Filter by Zone
    if (this.currentZone !== "ALL") {
      items = items.filter(i => (i.zone || "").includes(this.currentZone));
    }

    // Filter by Status / Category
    if (this.currentFilter !== "ALL") {
      items = items.filter(i => i.status === this.currentFilter || i.category === this.currentFilter);
    }

    // Search query
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      items = items.filter(i => 
        (i.name && i.name.toLowerCase().includes(q)) || 
        (i.sku && i.sku.toLowerCase().includes(q)) || 
        (i.rack && i.rack.toLowerCase().includes(q)) ||
        (i.supplier && i.supplier.toLowerCase().includes(q)) ||
        (i.zone && i.zone.toLowerCase().includes(q))
      );
    }

    // Statistics across all 250 items
    const allItems = data.wmsItems || [];
    const totalSku = allItems.length;
    const totalPhysical = allItems.reduce((acc, i) => acc + (Number(i.stock) || 0), 0);
    const lowStockCount = allItems.filter(i => (Number(i.stock) <= Number(i.minStock))).length;
    const totalLogs = (data.wmsLogs || []).length;

    // Zone counts
    const zoneACount = allItems.filter(i => (i.zone || "").includes("Zona A")).length;
    const zoneBCount = allItems.filter(i => (i.zone || "").includes("Zona B")).length;
    const zoneCCount = allItems.filter(i => (i.zone || "").includes("Zona C")).length;
    const zoneDCount = allItems.filter(i => (i.zone || "").includes("Zona D")).length;
    const zoneECount = allItems.filter(i => (i.zone || "").includes("Zona E")).length;

    container.innerHTML = `
      <!-- WMS Header & Actions -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div class="flex items-center gap-2">
            <span class="p-2.5 bg-blue-100 text-blue-700 rounded-xl"><i class="fa-solid fa-warehouse text-2xl"></i></span>
            <div>
              <h2 class="text-2xl font-black text-slate-800 tracking-tight">Warehouse Management System (WMS)</h2>
              <p class="text-xs text-slate-500">250 Produk Terintegrasi di Inventaris Rak, Denah Posisi Gudang, Inbound Otomatis BAPB & Opname Fisik.</p>
            </div>
          </div>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <button onclick="WMS.openInboundModal()" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-sm transition">
            <i class="fa-solid fa-box-archive"></i> + Inbound Masuk (Auto BAPB)
          </button>
          <button onclick="WMS.openOutboundModal()" class="px-3.5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-sm transition">
            <i class="fa-solid fa-truck-ramp-box"></i> - Outbound Keluar
          </button>
          <button onclick="WMS.openStockOpnameModal()" class="px-3.5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-sm transition">
            <i class="fa-solid fa-clipboard-check"></i> Stock Opname
          </button>
          <button onclick="WMS.openItemModal()" class="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-sm transition">
            <i class="fa-solid fa-plus"></i> Tambah Master Barang
          </button>
        </div>
      </div>

      <!-- Key Metrics -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl font-bold">
            <i class="fa-solid fa-boxes-stacked"></i>
          </div>
          <div>
            <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Master SKU</p>
            <h3 class="text-2xl font-black text-slate-800">${totalSku} <span class="text-xs font-normal text-slate-500">Item Produk</span></h3>
          </div>
        </div>

        <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl font-bold">
            <i class="fa-solid fa-layer-group"></i>
          </div>
          <div>
            <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Stok Fisik</p>
            <h3 class="text-2xl font-black text-slate-800">${Util.formatNumber(totalPhysical)} <span class="text-xs font-normal text-slate-500">Unit/Pcs</span></h3>
          </div>
        </div>

        <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div class="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center text-xl font-bold">
            <i class="fa-solid fa-triangle-exclamation"></i>
          </div>
          <div>
            <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Stok Menipis / Kritis</p>
            <h3 class="text-2xl font-black ${lowStockCount > 0 ? 'text-rose-600' : 'text-slate-800'}">${lowStockCount} <span class="text-xs font-normal text-slate-500">Perlu PO Restok</span></h3>
          </div>
        </div>

        <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div class="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-xl font-bold">
            <i class="fa-solid fa-clock-rotate-left"></i>
          </div>
          <div>
            <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Riwayat Mutasi WMS</p>
            <h3 class="text-2xl font-black text-slate-800">${totalLogs} <span class="text-xs font-normal text-slate-500">Log Tercatat</span></h3>
          </div>
        </div>
      </div>

      <!-- Warehouse Zones & View Selector Section -->
      <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-4 mb-6">
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-slate-100 pb-3 mb-3">
          <div>
            <h3 class="text-sm font-bold text-slate-800 flex items-center gap-2">
              <i class="fa-solid fa-map-location-dot text-blue-600"></i> Pembagian Zona Gudang & Posisi Rak (5 Zona Terdaftar)
            </h3>
            <p class="text-[11px] text-slate-500">Setiap barang memiliki lokasi rak spesifik (Aisle, Rack, Shelf) dan posisi zona penyimpanan yang terstandarisasi.</p>
          </div>
          <!-- View Toggle -->
          <div class="inline-flex rounded-lg border border-slate-200 p-0.5 bg-slate-100 self-start lg:self-auto">
            <button 
              onclick="WMS.setView('TABLE')" 
              class="px-3 py-1.5 rounded-md text-xs font-bold transition flex items-center gap-1.5 ${this.currentView === 'TABLE' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'}"
            >
              <i class="fa-solid fa-table-list"></i> Tabel Inventaris Rak
            </button>
            <button 
              onclick="WMS.setView('POSITION')" 
              class="px-3 py-1.5 rounded-md text-xs font-bold transition flex items-center gap-1.5 ${this.currentView === 'POSITION' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'}"
            >
              <i class="fa-solid fa-border-all"></i> Denah & Posisi Gudang
            </button>
          </div>
        </div>

        <!-- Zone Filter Pills -->
        <div class="flex flex-wrap items-center gap-2">
          <button 
            onclick="WMS.setZone('ALL')" 
            class="px-3 py-1.5 rounded-lg text-xs font-bold transition ${this.currentZone === 'ALL' ? 'bg-blue-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}"
          >
            Semua Zona (${totalSku})
          </button>
          <button 
            onclick="WMS.setZone('Zona A')" 
            class="px-3 py-1.5 rounded-lg text-xs font-bold transition ${this.currentZone === 'Zona A' ? 'bg-amber-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}"
          >
            Zona A - Sembako (${zoneACount})
          </button>
          <button 
            onclick="WMS.setZone('Zona B')" 
            class="px-3 py-1.5 rounded-lg text-xs font-bold transition ${this.currentZone === 'Zona B' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}"
          >
            Zona B - Palen (${zoneBCount})
          </button>
          <button 
            onclick="WMS.setZone('Zona C')" 
            class="px-3 py-1.5 rounded-lg text-xs font-bold transition ${this.currentZone === 'Zona C' ? 'bg-indigo-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}"
          >
            Zona C - ATK & Buku (${zoneCCount})
          </button>
          <button 
            onclick="WMS.setZone('Zona D')" 
            class="px-3 py-1.5 rounded-lg text-xs font-bold transition ${this.currentZone === 'Zona D' ? 'bg-pink-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}"
          >
            Zona D - Kosmetik (${zoneDCount})
          </button>
          <button 
            onclick="WMS.setZone('Zona E')" 
            class="px-3 py-1.5 rounded-lg text-xs font-bold transition ${this.currentZone === 'Zona E' ? 'bg-purple-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}"
          >
            Zona E - Bayi & Anak (${zoneECount})
          </button>
        </div>
      </div>

      <!-- MAIN CONTENT: TABLE OR POSITION MATRIX -->
      ${this.currentView === 'TABLE' ? this.renderTableView(items) : this.renderPositionView(items)}

      <!-- Mutation Logs History -->
      <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-4 mt-6">
        <div class="flex items-center justify-between mb-3">
          <h4 class="font-bold text-slate-800 flex items-center gap-2">
            <i class="fa-solid fa-list-check text-purple-600"></i> Riwayat Mutasi Gudang & Inbound Otomatis BAPB
          </h4>
          <span class="text-xs text-slate-400">Otomatis mencatat nomor dokumen BAPB pada setiap penambahan stok</span>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs text-slate-600">
            <thead class="bg-slate-50 text-slate-500 uppercase font-semibold border-y border-slate-200">
              <tr>
                <th class="py-2.5 px-3">Waktu</th>
                <th class="py-2.5 px-3">Tipe</th>
                <th class="py-2.5 px-3">Nama Barang / SKU</th>
                <th class="py-2.5 px-3 text-center">Perubahan Qty</th>
                <th class="py-2.5 px-3">No. Dokumen Ref / BAPB</th>
                <th class="py-2.5 px-3">Petugas</th>
                <th class="py-2.5 px-3">Keterangan</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${(data.wmsLogs || []).slice().reverse().slice(0, 50).map(log => {
                let badge = "bg-blue-100 text-blue-700";
                if (log.type === "INBOUND") badge = "bg-emerald-100 text-emerald-700 font-bold";
                if (log.type === "OUTBOUND") badge = "bg-amber-100 text-amber-700 font-bold";
                if (log.type === "STOCK_OPNAME") badge = "bg-purple-100 text-purple-700 font-bold";

                return `
                  <tr class="hover:bg-slate-50">
                    <td class="py-2 px-3 whitespace-nowrap font-medium text-slate-500">${log.date}</td>
                    <td class="py-2 px-3"><span class="px-2 py-0.5 rounded text-[10px] ${badge}">${log.type}</span></td>
                    <td class="py-2 px-3 font-semibold text-slate-800">${Util.escapeHtml(log.itemName)} <span class="text-slate-400 font-normal">(${log.sku})</span></td>
                    <td class="py-2 px-3 text-center font-bold ${String(log.qty).startsWith('+') ? 'text-emerald-600' : 'text-rose-600'}">${log.qty}</td>
                    <td class="py-2 px-3 font-mono font-semibold text-slate-700">${log.refDoc || '-'}</td>
                    <td class="py-2 px-3 font-medium text-slate-700">${log.operator || '-'}</td>
                    <td class="py-2 px-3 text-slate-500">${Util.escapeHtml(log.notes || '-')}</td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  renderTableView: function(items) {
    return `
      <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-6">
        <div class="p-4 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-slate-50">
          <div class="flex items-center gap-3">
            <h3 class="font-bold text-slate-800 flex items-center gap-2">
              <i class="fa-solid fa-cubes text-blue-600"></i> Inventaris Rak & Posisi Gudang
            </h3>
            <span class="text-xs px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 font-semibold">${items.length} Data Ditampilkan</span>
          </div>

          <div class="flex flex-wrap items-center gap-2">
            <!-- Search -->
            <div class="relative min-w-[220px]">
              <i class="fa-solid fa-magnifying-glass absolute left-3 top-2.5 text-slate-400 text-sm"></i>
              <input 
                type="text" 
                id="wms-search-input"
                placeholder="Cari SKU, nama, rak, supplier..." 
                value="${Util.escapeHtml(this.searchQuery)}"
                oninput="WMS.handleSearch(this.value)"
                class="w-full pl-9 pr-3 py-1.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <!-- Filter status -->
            <select onchange="WMS.handleFilter(this.value)" class="text-sm border border-slate-300 rounded-lg px-2.5 py-1.5 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="ALL" ${this.currentFilter === 'ALL' ? 'selected' : ''}>Semua Status / Kategori</option>
              <option value="Aman" ${this.currentFilter === 'Aman' ? 'selected' : ''}>Status: Aman</option>
              <option value="Menipis" ${this.currentFilter === 'Menipis' ? 'selected' : ''}>Status: Menipis</option>
              <option value="Kritis" ${this.currentFilter === 'Kritis' ? 'selected' : ''}>Status: Kritis</option>
              <option value="Sembako" ${this.currentFilter === 'Sembako' ? 'selected' : ''}>Kategori: Sembako</option>
              <option value="Palen" ${this.currentFilter === 'Palen' ? 'selected' : ''}>Kategori: Palen</option>
              <option value="ATK" ${this.currentFilter === 'ATK' ? 'selected' : ''}>Kategori: ATK & Buku</option>
              <option value="Kosmetik" ${this.currentFilter === 'Kosmetik' ? 'selected' : ''}>Kategori: Kosmetik</option>
              <option value="Keperluan Bayi & Anak" ${this.currentFilter === 'Keperluan Bayi & Anak' ? 'selected' : ''}>Kategori: Bayi & Anak</option>
            </select>
          </div>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm text-slate-700">
            <thead class="bg-slate-100 text-slate-600 uppercase text-xs font-semibold border-b border-slate-200">
              <tr>
                <th class="py-3 px-4">Gambar & Nama Barang</th>
                <th class="py-3 px-3">SKU & Kategori</th>
                <th class="py-3 px-3">Lokasi Rak & Posisi Gudang</th>
                <th class="py-3 px-3 text-center">Stok Fisik</th>
                <th class="py-3 px-3 text-center">Min. Stok</th>
                <th class="py-3 px-3">Batch & Exp Date</th>
                <th class="py-3 px-3 text-center">Status</th>
                <th class="py-3 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200">
              ${items.length === 0 ? `
                <tr>
                  <td colspan="8" class="text-center py-10 text-slate-400">
                    <i class="fa-solid fa-box-open text-3xl mb-2 block"></i>
                    Tidak ada data barang yang sesuai kriteria pencarian.
                  </td>
                </tr>
              ` : items.map(item => {
                const isLow = Number(item.stock) <= Number(item.minStock);
                const isCritical = Number(item.stock) <= (Number(item.minStock) / 2);
                let badgeClass = "bg-emerald-100 text-emerald-800 border-emerald-200";
                let statusLabel = item.status || "Aman";

                if (isCritical || item.status === "Kritis") {
                  badgeClass = "bg-rose-100 text-rose-800 border-rose-200 pulse-badge";
                  statusLabel = "Kritis";
                } else if (isLow || item.status === "Menipis") {
                  badgeClass = "bg-amber-100 text-amber-800 border-amber-200";
                  statusLabel = "Menipis";
                }

                return `
                  <tr class="hover:bg-slate-50/80 transition">
                    <td class="py-3 px-4">
                      <div class="flex items-center gap-3">
                        <img 
                          src="${item.image || 'https://via.placeholder.com/60?text=Barang'}" 
                          alt="${Util.escapeHtml(item.name)}" 
                          class="w-12 h-12 rounded-lg object-cover border border-slate-200 shadow-xs flex-shrink-0 cursor-pointer"
                          onclick="App.previewImage('${item.image || ''}', '${Util.escapeHtml(item.name)}')"
                          title="Klik untuk lihat foto"
                        />
                        <div>
                          <p class="font-bold text-slate-800 leading-tight">${Util.escapeHtml(item.name)}</p>
                          <p class="text-xs text-slate-400">Satuan: <span class="text-slate-600 font-medium">${item.unit}</span> | Supplier: <span class="text-slate-600 font-medium">${Util.escapeHtml(item.supplier || '-')}</span></p>
                        </div>
                      </div>
                    </td>
                    <td class="py-3 px-3">
                      <span class="inline-block font-mono text-xs px-2 py-0.5 bg-slate-100 rounded text-slate-700 font-semibold">${item.sku}</span>
                      <p class="text-xs text-slate-500 mt-0.5">${item.category}</p>
                    </td>
                    <td class="py-3 px-3">
                      <div class="flex items-center gap-1.5">
                        <span class="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                        <span class="font-bold font-mono text-blue-900">${item.rack}</span>
                      </div>
                      <p class="text-xs text-slate-500 font-medium">${item.zone}</p>
                    </td>
                    <td class="py-3 px-3 text-center">
                      <span class="text-base font-bold ${isCritical ? 'text-rose-600' : isLow ? 'text-amber-600' : 'text-slate-800'}">
                        ${Util.formatNumber(item.stock)}
                      </span>
                    </td>
                    <td class="py-3 px-3 text-center text-slate-500 font-medium">
                      ${Util.formatNumber(item.minStock)}
                    </td>
                    <td class="py-3 px-3">
                      <p class="text-xs font-mono text-slate-600">${item.batchNo || '-'}</p>
                      <p class="text-xs text-slate-500">Exp: ${Util.formatDate(item.expDate)}</p>
                    </td>
                    <td class="py-3 px-3 text-center">
                      <span class="inline-block text-xs px-2.5 py-1 rounded-full font-semibold border ${badgeClass}">
                        ${statusLabel}
                      </span>
                    </td>
                    <td class="py-3 px-4 text-center">
                      <div class="flex items-center justify-center gap-1.5">
                        <button 
                          onclick="WMS.openInboundModal('${item.id}')" 
                          class="p-1.5 text-emerald-600 hover:text-white hover:bg-emerald-600 rounded-lg transition border border-emerald-200"
                          title="Restok Inbound (Otomatis Buat BAPB)"
                        >
                          <i class="fa-solid fa-box-archive"></i>
                        </button>
                        <button 
                          onclick="WMS.openItemModal('${item.id}')" 
                          class="p-1.5 text-blue-600 hover:text-white hover:bg-blue-600 rounded-lg transition border border-blue-200"
                          title="Edit Teks, Rak & Detail Barang"
                        >
                          <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button 
                          onclick="WMS.deleteItem('${item.id}')" 
                          class="p-1.5 text-rose-600 hover:text-white hover:bg-rose-600 rounded-lg transition border border-rose-200"
                          title="Hapus Barang"
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
    `;
  },

  renderPositionView: function(items) {
    return `
      <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h4 class="text-base font-bold text-slate-800 flex items-center gap-2">
              <i class="fa-solid fa-grip text-blue-600"></i> Matriks Posisi Gudang & Penataan Rak (${items.length} Rak Terpetakan)
            </h4>
            <p class="text-xs text-slate-500">Visualisasi tata letak rak per lorong (Aisle), tingkat rak (Shelf), serta posisi fisik barang.</p>
          </div>
          <div class="flex items-center gap-3 text-xs">
            <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded bg-emerald-500"></span> Stok Aman</span>
            <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded bg-amber-500"></span> Stok Menipis</span>
            <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded bg-rose-500"></span> Stok Kritis</span>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3.5">
          ${items.map(item => {
            const isLow = Number(item.stock) <= Number(item.minStock);
            const isCritical = Number(item.stock) <= (Number(item.minStock) / 2);
            let statusColor = "bg-emerald-500";
            let borderClass = "border-slate-200 hover:border-blue-400";

            if (isCritical) {
              statusColor = "bg-rose-500 animate-pulse";
              borderClass = "border-rose-200 bg-rose-50/20";
            } else if (isLow) {
              statusColor = "bg-amber-500";
              borderClass = "border-amber-200 bg-amber-50/20";
            }

            return `
              <div class="rounded-xl border ${borderClass} p-3 transition shadow-2xs hover:shadow-sm bg-white flex flex-col justify-between">
                <div>
                  <div class="flex items-center justify-between gap-1 mb-1.5">
                    <span class="font-mono text-[11px] font-black px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200">
                      ${item.rack}
                    </span>
                    <span class="w-2.5 h-2.5 rounded-full ${statusColor}" title="Status: ${item.status}"></span>
                  </div>
                  <p class="font-bold text-xs text-slate-800 line-clamp-1" title="${Util.escapeHtml(item.name)}">${Util.escapeHtml(item.name)}</p>
                  <p class="font-mono text-[10px] text-slate-400 mb-2">${item.sku} | ${item.zone.split(' ')[0]}</p>
                </div>

                <div class="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <span class="text-[10px] text-slate-400">Stok:</span>
                    <span class="font-bold ${isCritical ? 'text-rose-600' : isLow ? 'text-amber-600' : 'text-slate-800'}">${item.stock}</span>
                    <span class="text-[10px] text-slate-500">${item.unit}</span>
                  </div>
                  <button 
                    onclick="WMS.openItemModal('${item.id}')" 
                    class="text-blue-600 hover:text-blue-800 text-[11px] font-bold"
                  >
                    Detail &raquo;
                  </button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  },

  renderLockedView: function() {
    return `
      <div class="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-xl mx-auto my-12 shadow-sm">
        <div class="w-20 h-20 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 border border-amber-200">
          <i class="fa-solid fa-lock"></i>
        </div>
        <h3 class="text-2xl font-bold text-slate-800 mb-2">Akses Terkunci (Khusus Admin)</h3>
        <p class="text-slate-500 text-sm mb-6 leading-relaxed">
          Fitur Warehouse Management System (WMS) dan Inventaris Rak hanya dapat diakses oleh staff gudang dan admin toko. 
          Silakan masukkan password admin untuk membuka semua fitur manajemen grosir.
        </p>
        <button onclick="App.openLoginModal()" class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-md transition inline-flex items-center gap-2">
          <i class="fa-solid fa-key"></i> Masukkan Password Admin
        </button>
      </div>
    `;
  },

  // MODAL INBOUND (BARANG MASUK DENGAN AUTO GENERATE BAPB)
  openInboundModal: function(preselectedId = null) {
    const data = Storage.getData();
    const wmsItems = data.wmsItems || [];
    const shopProducts = data.shopProducts || [];
    
    const selectedItem = preselectedId ? wmsItems.find(i => i.id === preselectedId) : (wmsItems[0] || null);
    const matchingProd = selectedItem ? shopProducts.find(p => p.sku === selectedItem.sku || p.name.toLowerCase() === selectedItem.name.toLowerCase()) : null;
    const defaultPrice = matchingProd ? (matchingProd.price || matchingProd.retailPrice || 0) : 50000;
    const defaultSupplier = selectedItem ? (selectedItem.supplier || "PT Mitra Distributor Grosir") : "PT Mitra Distributor Grosir";

    const modalHtml = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop" id="wms-inbound-modal">
        <div class="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden modal-content-scale max-h-[92vh] flex flex-col">
          <div class="px-6 py-4 bg-gradient-to-r from-emerald-600 to-teal-700 text-white flex items-center justify-between">
            <div>
              <h3 class="text-lg font-bold flex items-center gap-2">
                <i class="fa-solid fa-box-archive"></i> Penerimaan Barang Masuk (Inbound)
              </h3>
              <p class="text-xs text-emerald-100">Otomatis menerbitkan Berita Acara Penerimaan Barang (BAPB) resmi</p>
            </div>
            <button onclick="App.closeModal('wms-inbound-modal')" class="text-white/80 hover:text-white text-lg">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>

          <form onsubmit="WMS.saveInbound(event)" class="p-6 overflow-y-auto space-y-4">
            <!-- Product Selector (250 Products) -->
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">Pilih Master Barang (250 Produk Terintegrasi) *</label>
              <select id="inbound-item-id" required onchange="WMS.handleInboundItemChange(this.value)" class="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white font-medium focus:ring-2 focus:ring-emerald-500">
                ${wmsItems.map(i => `
                  <option value="${i.id}" ${selectedItem && selectedItem.id === i.id ? 'selected' : ''}>
                    [${i.rack}] ${Util.escapeHtml(i.name)} (${i.sku}) - Stok Kini: ${i.stock} ${i.unit}
                  </option>
                `).join('')}
              </select>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Nama Pemasok / Supplier *</label>
                <input type="text" id="inbound-supplier" required value="${Util.escapeHtml(defaultSupplier)}" class="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500" />
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">No. PO / Ref Surat Jalan *</label>
                <input type="text" id="inbound-ref" required value="PO-${new Date().getFullYear()}-${Math.floor(100+Math.random()*900)}" class="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg font-mono" />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Jumlah Masuk (<span id="inbound-unit-label">${selectedItem ? selectedItem.unit : 'Unit'}</span>) *</label>
                <input type="number" id="inbound-qty" required min="1" value="10" oninput="WMS.calcInboundTotal()" class="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg font-bold text-emerald-700 focus:ring-2 focus:ring-emerald-500" />
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Harga Satuan (Rp) *</label>
                <input type="number" id="inbound-price" required min="0" value="${defaultPrice}" oninput="WMS.calcInboundTotal()" class="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500" />
              </div>
            </div>

            <!-- Total Transaction Value Highlight -->
            <div class="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center justify-between">
              <div>
                <span class="text-xs font-semibold text-emerald-800 uppercase tracking-wide">Total Nilai Transaksi Penerimaan:</span>
                <p class="text-[11px] text-emerald-600">Akan otomatis tercantum pada Berita Acara Penerimaan Barang</p>
              </div>
              <span id="inbound-total-val" class="text-lg font-black text-emerald-700">${Util.formatRupiah(10 * defaultPrice)}</span>
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Nama Petugas Penerima Gudang *</label>
              <input type="text" id="inbound-operator" required value="Staff Gudang Inbound" class="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg" />
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Catatan Pemeriksaan Fisik & Segel</label>
              <textarea id="inbound-notes" rows="2" class="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg" placeholder="Kondisi kemasan utuh, tersegel baik, tanggal exp sesuai spesifikasi."></textarea>
            </div>

            <div class="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
              <button type="button" onclick="App.closeModal('wms-inbound-modal')" class="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg">Batal</button>
              <button type="submit" class="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-sm flex items-center gap-1.5 shadow-sm transition">
                <i class="fa-solid fa-check"></i> Simpan Inbound & Terbitkan BAPB
              </button>
            </div>
          </form>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
  },

  handleInboundItemChange: function(itemId) {
    const data = Storage.getData();
    const item = (data.wmsItems || []).find(i => i.id === itemId);
    if (!item) return;

    const matchingProd = (data.shopProducts || []).find(p => p.sku === item.sku || p.name.toLowerCase() === item.name.toLowerCase());
    const price = matchingProd ? (matchingProd.price || matchingProd.retailPrice || 0) : 50000;

    const suppInput = document.getElementById("inbound-supplier");
    const priceInput = document.getElementById("inbound-price");
    const unitLabel = document.getElementById("inbound-unit-label");

    if (suppInput && item.supplier) suppInput.value = item.supplier;
    if (priceInput) priceInput.value = price;
    if (unitLabel) unitLabel.textContent = item.unit || "Unit";

    this.calcInboundTotal();
  },

  calcInboundTotal: function() {
    const qty = Number(document.getElementById("inbound-qty")?.value) || 0;
    const price = Number(document.getElementById("inbound-price")?.value) || 0;
    const totalEl = document.getElementById("inbound-total-val");
    if (totalEl) {
      totalEl.textContent = Util.formatRupiah(qty * price);
    }
  },

  saveInbound: function(event) {
    event.preventDefault();
    const data = Storage.getData();
    const itemId = document.getElementById("inbound-item-id").value;
    const qty = Number(document.getElementById("inbound-qty").value) || 0;
    const price = Number(document.getElementById("inbound-price").value) || 0;
    const supplier = document.getElementById("inbound-supplier").value.trim();
    const refDoc = document.getElementById("inbound-ref").value.trim();
    const operator = document.getElementById("inbound-operator").value.trim() || "Staff Penerima Gudang";
    const notes = document.getElementById("inbound-notes").value.trim();

    const item = (data.wmsItems || []).find(i => i.id === itemId);
    if (!item) return;

    // 1. Update WMS Item stock
    item.stock = (Number(item.stock) || 0) + qty;
    if (supplier) item.supplier = supplier;
    if (item.stock > item.minStock && item.status !== "Aman") {
      item.status = "Aman";
    }

    // 2. Synchronize stock to shopProducts
    const shopProd = (data.shopProducts || []).find(p => p.sku === item.sku || p.id === item.id || p.name.toLowerCase() === item.name.toLowerCase());
    if (shopProd) {
      shopProd.stock = item.stock;
    }

    // 3. Automatically generate Goods Receipt Report (Berita Acara Penerimaan Barang)
    const todayStr = new Date().toISOString().slice(0, 10);
    const docNumber = `BAPB-${todayStr.replace(/-/g, '')}-${Math.floor(1000 + Math.random() * 9000)}`;
    const totalValue = qty * price;

    const receiptDoc = {
      id: "DOC-" + Date.now().toString().slice(-6),
      docNumber: docNumber,
      type: "Berita Acara Penerimaan Barang",
      date: todayStr,
      dueDate: todayStr,
      clientName: supplier || item.supplier || "PT Distributor Resmi",
      clientPhone: "0812-3456-7890",
      clientAddress: "Gudang Pemasok / Distributor Rekanan",
      paymentStatus: "LUNAS",
      paymentMethod: "Penerimaan Fisik Gudang",
      items: [
        {
          name: item.name,
          qty: qty,
          unit: item.unit || "Dus",
          price: price,
          subtotal: totalValue
        }
      ],
      discount: 0,
      taxPercent: 0,
      grandTotal: totalValue,
      notes: `Berita Acara Penerimaan Barang otomatis dari Inbound WMS. No. Ref/PO: ${refDoc || '-'}. Petugas Penerima: ${operator}. ${notes || ''}`.trim(),
      signatureName: operator,
      attachmentUrl: ""
    };

    if (!data.documents) data.documents = [];
    data.documents.unshift(receiptDoc);

    // 4. Log WMS mutation
    if (!data.wmsLogs) data.wmsLogs = [];
    data.wmsLogs.push({
      id: "LOG-" + Date.now().toString().slice(-5),
      date: new Date().toISOString().replace("T", " ").slice(0, 16),
      type: "INBOUND",
      sku: item.sku,
      itemName: item.name,
      qty: `+${qty} ${item.unit}`,
      refDoc: refDoc || docNumber,
      operator: operator,
      notes: `Penerimaan stok dari ${supplier || item.supplier}. Dokumen: ${docNumber}. ${notes || ''}`.trim()
    });

    Storage.saveData(data);
    if (typeof Storage !== 'undefined' && Storage.saveDocument) Storage.saveDocument(receiptDoc);
    if (typeof Storage !== 'undefined' && Storage.saveWarehouseRecord) Storage.saveWarehouseRecord(item);

    App.closeModal('wms-inbound-modal');
    App.showToast(`Berhasil menambah ${qty} ${item.unit} ${item.name}! Dokumen ${docNumber} (Berita Acara Penerimaan Barang) otomatis diterbitkan di menu Dokumen.`, "success", 6000);
    this.render();
  },

  // MODAL OUTBOUND (BARANG KELUAR)
  openOutboundModal: function() {
    const data = Storage.getData();
    const modalHtml = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop" id="wms-outbound-modal">
        <div class="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden modal-content-scale">
          <div class="px-6 py-4 bg-amber-600 text-white flex items-center justify-between">
            <h3 class="text-lg font-bold flex items-center gap-2">
              <i class="fa-solid fa-truck-ramp-box"></i> Pengeluaran Barang (Outbound)
            </h3>
            <button onclick="App.closeModal('wms-outbound-modal')" class="text-white/80 hover:text-white text-lg">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
          <form onsubmit="WMS.saveOutbound(event)" class="p-6 space-y-3.5">
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Pilih Barang yang Dikeluarkan *</label>
              <select id="outbound-item-id" required class="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg bg-white">
                ${data.wmsItems.map(i => `<option value="${i.id}">[${i.rack}] ${Util.escapeHtml(i.name)} (${i.sku}) - Tersedia: ${i.stock} ${i.unit}</option>`).join('')}
              </select>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Jumlah Keluar *</label>
                <input type="number" id="outbound-qty" required min="1" value="5" class="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg font-bold text-amber-700" />
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">No. Surat Jalan / Pesanan</label>
                <input type="text" id="outbound-ref" value="SJ-${new Date().getFullYear()}-${Math.floor(100+Math.random()*900)}" class="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg font-mono" />
              </div>
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Petugas Pengeluaran / Driver</label>
              <input type="text" id="outbound-operator" value="Staff Dispatch Gudang" class="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Tujuan Pengiriman / Catatan</label>
              <textarea id="outbound-notes" rows="2" class="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg" placeholder="Pengiriman pesanan grosir langganan"></textarea>
            </div>
            <div class="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
              <button type="button" onclick="App.closeModal('wms-outbound-modal')" class="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg">Batal</button>
              <button type="submit" class="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-bold text-sm flex items-center gap-1.5">
                <i class="fa-solid fa-truck-fast"></i> Kurangi Stok & Catat Outbound
              </button>
            </div>
          </form>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
  },

  saveOutbound: function(event) {
    event.preventDefault();
    const data = Storage.getData();
    const itemId = document.getElementById("outbound-item-id").value;
    const qty = Number(document.getElementById("outbound-qty").value) || 0;
    const refDoc = document.getElementById("outbound-ref").value.trim();
    const operator = document.getElementById("outbound-operator").value.trim();
    const notes = document.getElementById("outbound-notes").value.trim();

    const item = data.wmsItems.find(i => i.id === itemId);
    if (!item) return;

    if (item.stock < qty) {
      App.showToast(`Stok tidak mencukupi! Stok saat ini hanya ${item.stock} ${item.unit}.`, "error");
      return;
    }

    item.stock = (Number(item.stock) || 0) - qty;
    if (item.stock <= item.minStock / 2) {
      item.status = "Kritis";
    } else if (item.stock <= item.minStock) {
      item.status = "Menipis";
    }

    // Sync to shopProducts
    const shopProd = (data.shopProducts || []).find(p => p.sku === item.sku || p.id === item.id || p.name.toLowerCase() === item.name.toLowerCase());
    if (shopProd) {
      shopProd.stock = item.stock;
    }

    // Add log
    if (!data.wmsLogs) data.wmsLogs = [];
    data.wmsLogs.push({
      id: "LOG-" + Date.now().toString().slice(-5),
      date: new Date().toISOString().replace("T", " ").slice(0, 16),
      type: "OUTBOUND",
      sku: item.sku,
      itemName: item.name,
      qty: `-${qty} ${item.unit}`,
      refDoc: refDoc,
      operator: operator,
      notes: notes
    });

    Storage.saveData(data);
    if (typeof Storage !== 'undefined' && Storage.saveWarehouseRecord) Storage.saveWarehouseRecord(item);

    App.closeModal('wms-outbound-modal');
    App.showToast(`Berhasil mengeluarkan ${qty} ${item.unit} dari stok ${item.name}!`, "success");
    this.render();
  },

  // MODAL STOCK OPNAME
  openStockOpnameModal: function() {
    const data = Storage.getData();
    const modalHtml = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop" id="wms-opname-modal">
        <div class="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden modal-content-scale">
          <div class="px-6 py-4 bg-purple-600 text-white flex items-center justify-between">
            <h3 class="text-lg font-bold flex items-center gap-2">
              <i class="fa-solid fa-clipboard-check"></i> Stock Opname (Penyesuaian Fisik)
            </h3>
            <button onclick="App.closeModal('wms-opname-modal')" class="text-white/80 hover:text-white text-lg">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
          <form onsubmit="WMS.saveStockOpname(event)" class="p-6 space-y-3.5">
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Pilih Barang yang Dihitung Fisik *</label>
              <select id="opname-item-id" required onchange="WMS.handleOpnameSelect(this.value)" class="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg bg-white">
                ${data.wmsItems.map(i => `<option value="${i.id}" data-stock="${i.stock}" data-unit="${i.unit}">[${i.rack}] ${Util.escapeHtml(i.name)} (${i.sku})</option>`).join('')}
              </select>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Stok di Sistem</label>
                <input type="number" id="opname-sys-stock" readonly class="w-full text-sm px-3 py-2 bg-slate-100 border border-slate-300 rounded-lg font-bold text-slate-600" />
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Hasil Hitung Fisik Nyata *</label>
                <input type="number" id="opname-real-stock" required min="0" class="w-full text-sm px-3 py-2 border border-purple-400 rounded-lg font-bold text-purple-700 focus:ring-2 focus:ring-purple-500" />
              </div>
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Alasan Penyesuaian / Keterangan</label>
              <textarea id="opname-notes" required rows="2" class="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg" placeholder="Contoh: Selisih fisik karena ada kemasan rusak saat bongkar muat..."></textarea>
            </div>
            <div class="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
              <button type="button" onclick="App.closeModal('wms-opname-modal')" class="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg">Batal</button>
              <button type="submit" class="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-bold text-sm flex items-center gap-1.5">
                <i class="fa-solid fa-floppy-disk"></i> Simpan Penyesuaian Opname
              </button>
            </div>
          </form>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    if (data.wmsItems.length > 0) {
      this.handleOpnameSelect(data.wmsItems[0].id);
    }
  },

  handleOpnameSelect: function(itemId) {
    const data = Storage.getData();
    const item = data.wmsItems.find(i => i.id === itemId);
    if (item) {
      document.getElementById("opname-sys-stock").value = item.stock;
      document.getElementById("opname-real-stock").value = item.stock;
    }
  },

  saveStockOpname: function(event) {
    event.preventDefault();
    const data = Storage.getData();
    const itemId = document.getElementById("opname-item-id").value;
    const realStock = Number(document.getElementById("opname-real-stock").value) || 0;
    const notes = document.getElementById("opname-notes").value.trim();

    const item = data.wmsItems.find(i => i.id === itemId);
    if (!item) return;

    const oldStock = Number(item.stock) || 0;
    const diff = realStock - oldStock;
    item.stock = realStock;

    // Sync to shopProducts
    const shopProd = (data.shopProducts || []).find(p => p.sku === item.sku || p.id === item.id || p.name.toLowerCase() === item.name.toLowerCase());
    if (shopProd) {
      shopProd.stock = item.stock;
    }

    if (!data.wmsLogs) data.wmsLogs = [];
    data.wmsLogs.push({
      id: "LOG-" + Date.now().toString().slice(-5),
      date: new Date().toISOString().replace("T", " ").slice(0, 16),
      type: "STOCK_OPNAME",
      sku: item.sku,
      itemName: item.name,
      qty: (diff >= 0 ? `+${diff}` : `${diff}`) + ` ${item.unit}`,
      refDoc: "OPNAME-" + new Date().toISOString().slice(0,10),
      operator: "Tim Audit Opname",
      notes: notes + ` (Dari ${oldStock} menjadi ${realStock})`
    });

    Storage.saveData(data);
    App.closeModal('wms-opname-modal');
    App.showToast(`Stock opname untuk "${item.name}" berhasil disimpan! Stok fisik kini ${realStock} ${item.unit}.`, "success");
    this.render();
  },

  // OPEN ITEM ADD/EDIT MODAL
  openItemModal: function(itemId = null) {
    const data = Storage.getData();
    let item = {
      id: "",
      sku: "SKU-" + Math.floor(1000 + Math.random() * 9000),
      name: "",
      category: "Sembako",
      unit: "Karton / Dus",
      zone: "Zona A (Pangan Pokok)",
      rack: "Rak A-01-01",
      minStock: 20,
      stock: 50,
      batchNo: "BATCH-" + new Date().toISOString().slice(0,7).replace("-","") + "-01",
      expDate: "2027-12-31",
      supplier: "PT Mitra Distributor Grosir",
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&auto=format&fit=crop&q=80",
      status: "Aman",
      notes: ""
    };

    let isEdit = false;
    if (itemId) {
      const found = data.wmsItems.find(i => i.id === itemId);
      if (found) {
        item = { ...found };
        isEdit = true;
      }
    }

    const modalHtml = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop" id="wms-item-modal">
        <div class="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden modal-content-scale max-h-[90vh] flex flex-col">
          <div class="px-6 py-4 bg-gradient-to-r from-blue-700 to-indigo-700 text-white flex items-center justify-between">
            <h3 class="text-lg font-bold flex items-center gap-2">
              <i class="fa-solid ${isEdit ? 'fa-pen-to-square' : 'fa-plus-circle'}"></i>
              ${isEdit ? 'Edit Master Barang Gudang' : 'Tambah Master Barang Baru (WMS)'}
            </h3>
            <button onclick="App.closeModal('wms-item-modal')" class="text-white/80 hover:text-white text-lg">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>

          <form id="wms-item-form" onsubmit="WMS.saveItem(event, '${item.id}')" class="p-6 overflow-y-auto space-y-4">
            <!-- Image & Preview -->
            <div class="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div class="flex items-center justify-between mb-2">
                <label class="block text-xs font-bold uppercase text-slate-700">Gambar / Foto Barang</label>
                <div class="flex items-center gap-1.5">
                  <button type="button" onclick="App.pasteFromClipboard('wms-image-url', 'wms-img-preview')" class="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-md text-xs font-bold border border-blue-200 flex items-center gap-1 transition" title="Tempel link yang disalin dari Chrome atau Google">
                    <i class="fa-solid fa-paste"></i> Tempel Link (Chrome / Web)
                  </button>
                  <button type="button" onclick="App.copyToClipboard(document.getElementById('wms-image-url').value)" class="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-md text-xs font-semibold border border-slate-300" title="Salin link gambar saat ini">
                    <i class="fa-solid fa-copy"></i>
                  </button>
                </div>
              </div>
              <div class="flex items-center gap-4">
                <img id="wms-img-preview" src="${item.image || 'https://via.placeholder.com/100?text=Preview'}" class="w-20 h-20 rounded-xl object-cover border border-slate-300 shadow-sm" onerror="this.src='https://via.placeholder.com/100?text=Barang'" />
                <div class="flex-1 space-y-2">
                  <div class="flex items-center gap-2">
                    <input type="file" id="wms-file-input" accept="image/*" onchange="WMS.handleImageUpload(event)" class="text-xs text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer" />
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-xs text-slate-500 font-medium whitespace-nowrap"><i class="fa-solid fa-link text-blue-500"></i> Link URL:</span>
                    <input 
                      type="text" 
                      id="wms-image-url" 
                      value="${Util.escapeHtml(item.image || '')}" 
                      oninput="App.handleImageUrlInput(this, 'wms-img-preview')" 
                      placeholder="Tempel link foto barang dari Chrome, Google, atau internet..." 
                      class="flex-1 text-xs px-2.5 py-1.5 border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-500" 
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Basic Info -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Nama Barang *</label>
                <input type="text" id="wms-name" required value="${Util.escapeHtml(item.name)}" class="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Contoh: Beras Ramos 25kg" />
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Kode SKU *</label>
                <input type="text" id="wms-sku" required value="${Util.escapeHtml(item.sku)}" class="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono" />
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Kategori</label>
                <select id="wms-category" class="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white">
                  <option value="Sembako" ${item.category === 'Sembako' ? 'selected' : ''}>Sembako</option>
                  <option value="Palen" ${item.category === 'Palen' ? 'selected' : ''}>Palen</option>
                  <option value="ATK" ${item.category === 'ATK' ? 'selected' : ''}>ATK & Buku</option>
                  <option value="Kosmetik" ${item.category === 'Kosmetik' ? 'selected' : ''}>Kosmetik & Skincare</option>
                  <option value="Keperluan Bayi & Anak" ${item.category === 'Keperluan Bayi & Anak' ? 'selected' : ''}>Keperluan Bayi & Anak</option>
                  <option value="Lainnya" ${item.category === 'Lainnya' ? 'selected' : ''}>Lainnya</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Satuan Kemasan</label>
                <input type="text" id="wms-unit" value="${Util.escapeHtml(item.unit)}" placeholder="Dus, Sak, Bal, Karton, Pack" class="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Status Stok</label>
                <select id="wms-status" class="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white">
                  <option value="Aman" ${item.status === 'Aman' ? 'selected' : ''}>Aman</option>
                  <option value="Menipis" ${item.status === 'Menipis' ? 'selected' : ''}>Menipis</option>
                  <option value="Kritis" ${item.status === 'Kritis' ? 'selected' : ''}>Kritis</option>
                </select>
              </div>
            </div>

            <!-- Location & Stock -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Zona Gudang *</label>
                <select id="wms-zone" class="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white">
                  <option value="Zona A (Pangan Pokok)" ${(item.zone || '').includes('Zona A') ? 'selected' : ''}>Zona A (Pangan Pokok - Sembako)</option>
                  <option value="Zona B (Kebutuhan Rumah Tangga & Palen)" ${(item.zone || '').includes('Zona B') ? 'selected' : ''}>Zona B (Kebutuhan Rumah Tangga & Palen)</option>
                  <option value="Zona C (Alat Tulis Kantor & Buku)" ${(item.zone || '').includes('Zona C') ? 'selected' : ''}>Zona C (Alat Tulis Kantor & Buku)</option>
                  <option value="Zona D (Kosmetik & Perawatan Tubuh)" ${(item.zone || '').includes('Zona D') ? 'selected' : ''}>Zona D (Kosmetik & Perawatan Tubuh)</option>
                  <option value="Zona E (Keperluan Bayi & Anak)" ${(item.zone || '').includes('Zona E') ? 'selected' : ''}>Zona E (Keperluan Bayi & Anak)</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Lokasi Rak Bins *</label>
                <input type="text" id="wms-rack" value="${Util.escapeHtml(item.rack)}" placeholder="Rak A-01-01" class="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono font-bold" />
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Stok Fisik Saat Ini *</label>
                <input type="number" id="wms-stock" required min="0" value="${item.stock}" class="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-bold text-blue-700" />
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Batas Minimum Stok (Re-order point)</label>
                <input type="number" id="wms-minstock" required min="0" value="${item.minStock}" class="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">No. Batch</label>
                <input type="text" id="wms-batch" value="${Util.escapeHtml(item.batchNo || '')}" class="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono" />
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Tanggal Kedaluwarsa (Exp)</label>
                <input type="date" id="wms-exp" value="${item.expDate || ''}" class="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Supplier / Pabrikan</label>
                <input type="text" id="wms-supplier" value="${Util.escapeHtml(item.supplier || '')}" class="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Catatan Penataan Rak & Penyimpanan</label>
              <textarea id="wms-notes" rows="2" class="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Keterangan penumpukan atau suhu penyimpanan...">${Util.escapeHtml(item.notes || '')}</textarea>
            </div>

            <div class="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
              <button type="button" onclick="App.closeModal('wms-item-modal')" class="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition">
                Batal
              </button>
              <button type="submit" class="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-sm shadow-sm transition flex items-center gap-1.5">
                <i class="fa-solid fa-floppy-disk"></i> Simpan Master Barang
              </button>
            </div>
          </form>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
  },

  handleImageUpload: async function(event) {
    const file = event.target.files[0];
    if (!file) return;
    try {
      const base64 = await Storage.fileToBase64(file);
      document.getElementById('wms-img-preview').src = base64;
      document.getElementById('wms-image-url').value = base64;
      App.showToast("Foto barang berhasil dimuat!", "info");
    } catch (e) {
      App.showToast("Gagal memuat gambar: " + e.message, "error");
    }
  },

  saveItem: function(event, existingId) {
    event.preventDefault();
    const data = Storage.getData();

    const name = document.getElementById("wms-name").value.trim();
    const sku = document.getElementById("wms-sku").value.trim();
    const category = document.getElementById("wms-category").value;
    const unit = document.getElementById("wms-unit").value.trim() || "Dus";
    const status = document.getElementById("wms-status").value;
    const zone = document.getElementById("wms-zone").value.trim() || "Zona A (Pangan Pokok)";
    const rack = document.getElementById("wms-rack").value.trim() || "Rak A-01-01";
    const stock = Number(document.getElementById("wms-stock").value) || 0;
    const minStock = Number(document.getElementById("wms-minstock").value) || 0;
    const batchNo = document.getElementById("wms-batch").value.trim();
    const expDate = document.getElementById("wms-exp").value;
    const supplier = document.getElementById("wms-supplier").value.trim();
    const notes = document.getElementById("wms-notes").value.trim();
    const image = document.getElementById("wms-image-url").value.trim() || "https://via.placeholder.com/200?text=" + encodeURIComponent(name);

    if (existingId) {
      const index = data.wmsItems.findIndex(i => i.id === existingId);
      if (index !== -1) {
        data.wmsItems[index] = {
          ...data.wmsItems[index],
          name, sku, category, unit, status, zone, rack, stock, minStock, batchNo, expDate, supplier, notes, image
        };
      }
    } else {
      const newItem = {
        id: "WMS-" + Math.floor(100 + Math.random() * 900),
        name, sku, category, unit, status, zone, rack, stock, minStock, batchNo, expDate, supplier, notes, image
      };
      data.wmsItems.push(newItem);
    }

    // Also sync to shopProducts if exists
    const sp = (data.shopProducts || []).find(p => p.sku === sku || p.name.toLowerCase() === name.toLowerCase());
    if (sp) {
      sp.stock = stock;
    }

    Storage.saveData(data);
    App.closeModal('wms-item-modal');
    App.showToast(`Barang "${name}" berhasil disimpan di posisi ${rack}!`, "success");
    this.render();
  },

  deleteItem: function(itemId) {
    const data = Storage.getData();
    const item = data.wmsItems.find(i => i.id === itemId);
    if (!item) return;

    if (confirm(`Apakah Anda yakin ingin menghapus barang "${item.name}" dari sistem gudang?`)) {
      data.wmsItems = data.wmsItems.filter(i => i.id !== itemId);
      Storage.saveData(data);
      App.showToast(`Barang "${item.name}" berhasil dihapus.`, "info");
      this.render();
    }
  }
};
