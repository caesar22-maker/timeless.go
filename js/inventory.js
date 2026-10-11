/**
 * Equipment & Tools Inventory Module (INVENTARIS ALAT)
 * Manages Warehouse Machinery, Hand Pallets, Forklifts, Barcode Scanners, Maintenance Logs & Tool Assignment
 */

const Inventory = {
  currentFilter: "ALL",
  searchQuery: "",

  init: function() {
    this.render();
  },

  render: function() {
    const data = Storage.getData();
    const isEmployee = Storage.isEmployee();
    const container = document.getElementById("inventory-content");
    if (!container) return;

    if (!isEmployee) {
      container.innerHTML = this.renderLockedView();
      return;
    }

    let tools = data.inventoryTools || [];
    if (this.currentFilter !== "ALL") {
      tools = tools.filter(t => t.status === this.currentFilter || t.category === this.currentFilter);
    }
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      tools = tools.filter(t => 
        t.name.toLowerCase().includes(q) || 
        t.code.toLowerCase().includes(q) || 
        t.location.toLowerCase().includes(q) ||
        (t.assignedTo && t.assignedTo.toLowerCase().includes(q))
      );
    }

    // Stats
    const totalTools = (data.inventoryTools || []).length;
    const availableCount = (data.inventoryTools || []).filter(t => t.status === "Tersedia").length;
    const inUseCount = (data.inventoryTools || []).filter(t => t.status === "Sedang Digunakan").length;
    const maintenanceCount = (data.inventoryTools || []).filter(t => t.status === "Dalam Perawatan" || t.condition.includes("Perlu Servis")).length;

    container.innerHTML = `
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div class="flex items-center gap-2">
            <span class="p-2 bg-amber-100 text-amber-700 rounded-lg"><i class="fa-solid fa-toolbox text-xl"></i></span>
            <div>
              <h2 class="text-2xl font-bold text-slate-800">Inventaris Peralatan & Mesin Gudang</h2>
              <p class="text-sm text-slate-500">Pemantauan kondisi forklift, hand pallet, scanner, timbangan, dan log servis berkala.</p>
            </div>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button onclick="Inventory.openToolModal()" class="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-bold text-sm shadow-sm transition flex items-center gap-1.5">
            <i class="fa-solid fa-plus"></i> Tambah Alat / Aset Baru
          </button>
        </div>
      </div>

      <!-- Quick Metrics -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div class="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center text-xl font-bold">
            <i class="fa-solid fa-truck-ramp-box"></i>
          </div>
          <div>
            <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Aset Alat</p>
            <h3 class="text-2xl font-bold text-slate-800">${totalTools} <span class="text-xs font-normal text-slate-500">Unit</span></h3>
          </div>
        </div>

        <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl font-bold">
            <i class="fa-solid fa-circle-check"></i>
          </div>
          <div>
            <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Siap Pakai (Standby)</p>
            <h3 class="text-2xl font-bold text-emerald-700">${availableCount} <span class="text-xs font-normal text-slate-500">Unit</span></h3>
          </div>
        </div>

        <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl font-bold">
            <i class="fa-solid fa-person-digging"></i>
          </div>
          <div>
            <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Sedang Digunakan</p>
            <h3 class="text-2xl font-bold text-blue-700">${inUseCount} <span class="text-xs font-normal text-slate-500">Unit</span></h3>
          </div>
        </div>

        <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div class="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center text-xl font-bold">
            <i class="fa-solid fa-wrench"></i>
          </div>
          <div>
            <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Dalam Perawatan / Servis</p>
            <h3 class="text-2xl font-bold ${maintenanceCount > 0 ? 'text-rose-600' : 'text-slate-800'}">${maintenanceCount} <span class="text-xs font-normal text-slate-500">Unit</span></h3>
          </div>
        </div>
      </div>

      <!-- Controls & Search -->
      <div class="bg-white rounded-xl border border-slate-200 p-3 shadow-xs mb-6 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div class="flex flex-wrap items-center gap-2">
          <button 
            onclick="Inventory.handleFilter('ALL')" 
            class="px-3 py-1.5 rounded-lg text-xs font-bold transition ${this.currentFilter === 'ALL' ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}"
          >
            Semua Aset (${totalTools})
          </button>
          <button 
            onclick="Inventory.handleFilter('Tersedia')" 
            class="px-3 py-1.5 rounded-lg text-xs font-bold transition ${this.currentFilter === 'Tersedia' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}"
          >
            Tersedia (${availableCount})
          </button>
          <button 
            onclick="Inventory.handleFilter('Sedang Digunakan')" 
            class="px-3 py-1.5 rounded-lg text-xs font-bold transition ${this.currentFilter === 'Sedang Digunakan' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}"
          >
            Sedang Digunakan (${inUseCount})
          </button>
          <button 
            onclick="Inventory.handleFilter('Dalam Perawatan')" 
            class="px-3 py-1.5 rounded-lg text-xs font-bold transition ${this.currentFilter === 'Dalam Perawatan' ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}"
          >
            Dalam Servis
          </button>
        </div>

        <div class="relative min-w-[240px]">
          <i class="fa-solid fa-magnifying-glass absolute left-3 top-2.5 text-slate-400 text-sm"></i>
          <input 
            type="text" 
            placeholder="Cari kode alat, nama, lokasi..." 
            value="${Util.escapeHtml(this.searchQuery)}"
            oninput="Inventory.handleSearch(this.value)"
            class="w-full pl-9 pr-3 py-1.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
      </div>

      <!-- Tools Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        ${tools.length === 0 ? `
          <div class="col-span-full text-center py-16 bg-white rounded-2xl border border-slate-200 text-slate-400">
            <i class="fa-solid fa-screwdriver-wrench text-4xl mb-2 block text-slate-300"></i>
            <p class="text-base font-semibold">Tidak ada inventaris alat yang cocok</p>
          </div>
        ` : tools.map(tool => {
          let statusBadge = "bg-emerald-100 text-emerald-800 border border-emerald-200";
          if (tool.status === "Sedang Digunakan") statusBadge = "bg-blue-100 text-blue-800 border border-blue-200";
          if (tool.status === "Dalam Perawatan") statusBadge = "bg-rose-100 text-rose-800 border border-rose-200 pulse-badge";

          return `
            <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition">
              <!-- Top Image & Badges -->
              <div class="relative h-44 bg-slate-100 overflow-hidden">
                <img 
                  src="${tool.image || 'https://via.placeholder.com/400?text=Alat+Gudang'}" 
                  alt="${Util.escapeHtml(tool.name)}" 
                  class="w-full h-full object-cover"
                  onerror="this.src='https://via.placeholder.com/400?text=Alat+Inventaris'"
                />
                <span class="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md text-xs font-bold ${statusBadge} shadow-xs">
                  ${tool.status}
                </span>
                <span class="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded bg-black/70 backdrop-blur-md text-white font-mono text-xs font-bold">
                  ${tool.code}
                </span>
                <span class="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded bg-white/90 backdrop-blur-md text-slate-800 text-[11px] font-semibold">
                  <i class="fa-solid fa-location-dot text-rose-500"></i> ${Util.escapeHtml(tool.location)}
                </span>
              </div>

              <!-- Content -->
              <div class="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 class="font-bold text-slate-900 text-base leading-snug mb-1">${Util.escapeHtml(tool.name)}</h4>
                  <p class="text-xs text-slate-500 mb-2">${tool.brand || '-'} (${tool.purchaseYear ? 'Tahun ' + tool.purchaseYear : ''})</p>

                  <div class="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs space-y-1 mb-3">
                    <div class="flex justify-between">
                      <span class="text-slate-500">Jumlah Aset:</span>
                      <span class="font-bold text-blue-700">${tool.qty || tool.quantity || 1} Unit</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-slate-500">Kondisi Fisik:</span>
                      <span class="font-bold text-emerald-700">${tool.condition}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-slate-500">Operator/Pemegang:</span>
                      <span class="font-medium text-slate-800 truncate max-w-[140px]">${Util.escapeHtml(tool.assignedTo || 'Belum ditugaskan')}</span>
                    </div>
                    <div class="flex justify-between pt-1 border-t border-slate-200">
                      <span class="text-slate-500">Servis Berikutnya:</span>
                      <span class="font-mono font-semibold text-amber-700">${Util.formatDate(tool.nextService)}</span>
                    </div>
                  </div>

                  <p class="text-[11px] text-slate-500 line-clamp-2 italic mb-3">
                    "${Util.escapeHtml(tool.specs || 'Tidak ada spesifikasi khusus.')}"
                  </p>
                </div>

                <!-- Action Buttons -->
                <div class="pt-3 border-t border-slate-100 flex items-center justify-between gap-1.5">
                  <button 
                    onclick="App.copyToClipboard('${tool.image || ''}', 'Link foto alat ${Util.escapeHtml(tool.name)} disalin!')" 
                    class="p-1.5 text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs transition"
                    title="Salin Link Gambar Alat"
                  >
                    <i class="fa-solid fa-link"></i>
                  </button>

                  <button 
                    onclick="Inventory.openAssignModal('${tool.id}')" 
                    class="flex-1 py-1.5 px-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-bold text-xs transition flex items-center justify-center gap-1"
                    title="Ubah Penugasan / Operator"
                  >
                    <i class="fa-solid fa-user-gear"></i> Penugasan
                  </button>

                  <button 
                    onclick="Inventory.openMaintenanceModal('${tool.id}')" 
                    class="py-1.5 px-2.5 bg-amber-50 hover:bg-amber-100 text-amber-800 rounded-lg font-bold text-xs border border-amber-200 transition flex items-center gap-1"
                    title="Catat Riwayat Servis / Perawatan"
                  >
                    <i class="fa-solid fa-wrench"></i> Servis (${(tool.maintenanceLogs || []).length})
                  </button>

                  <button 
                    onclick="Inventory.openToolModal('${tool.id}')" 
                    class="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg text-xs border border-blue-200 transition"
                    title="Edit Teks & Foto Alat"
                  >
                    <i class="fa-solid fa-pen-to-square"></i>
                  </button>

                  <button 
                    onclick="Inventory.deleteTool('${tool.id}')" 
                    class="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg text-xs border border-rose-200 transition"
                    title="Hapus Alat"
                  >
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          `;
        }).join('')}
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
          Fitur Inventaris Alat, Mesin Pergudangan, dan Jadwal Maintenance hanya dapat diakses oleh staff operasional dan admin toko.
        </p>
        <button onclick="App.openLoginModal()" class="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold text-sm shadow-md transition inline-flex items-center gap-2">
          <i class="fa-solid fa-key"></i> Masukkan Password Admin
        </button>
      </div>
    `;
  },

  handleFilter: function(val) {
    this.currentFilter = val;
    this.render();
  },

  handleSearch: function(val) {
    this.searchQuery = val;
    this.render();
  },

  // OPEN ADD / EDIT TOOL MODAL
  openToolModal: function(toolId = null) {
    const data = Storage.getData();
    let tool = {
      id: "",
      code: "AST-" + Math.floor(100 + Math.random() * 900),
      name: "",
      category: "Manual Equipment",
      location: "Gudang Utama",
      brand: "",
      purchaseYear: String(new Date().getFullYear()),
      status: "Tersedia",
      condition: "Sangat Baik",
      lastService: new Date().toISOString().slice(0,10),
      nextService: new Date(Date.now() + 90*24*60*60*1000).toISOString().slice(0,10),
      assignedTo: "",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=500&auto=format&fit=crop&q=80",
      specs: "",
      maintenanceLogs: []
    };

    let isEdit = false;
    if (toolId) {
      const found = data.inventoryTools.find(t => t.id === toolId);
      if (found) {
        tool = JSON.parse(JSON.stringify(found));
        isEdit = true;
      }
    }

    const modalHtml = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop" id="tool-edit-modal">
        <div class="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden modal-content-scale max-h-[92vh] flex flex-col">
          <div class="px-6 py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white flex items-center justify-between">
            <h3 class="text-base font-bold flex items-center gap-2">
              <i class="fa-solid ${isEdit ? 'fa-pen-to-square' : 'fa-plus-circle'}"></i>
              ${isEdit ? 'Edit Data Alat / Mesin' : 'Tambah Aset Alat Operasional Baru'}
            </h3>
            <button onclick="App.closeModal('tool-edit-modal')" class="text-white/80 hover:text-white text-lg">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>

          <form onsubmit="Inventory.saveTool(event, '${tool.id}')" class="p-6 overflow-y-auto space-y-4">
            <!-- Image & Preview -->
            <div class="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div class="flex items-center justify-between mb-2">
                <label class="block text-xs font-bold uppercase text-slate-700">Foto Alat / Mesin</label>
                <div class="flex items-center gap-1.5">
                  <button type="button" onclick="App.pasteFromClipboard('tool-image-url', 'tool-img-preview')" class="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-800 rounded-md text-xs font-bold border border-amber-200 flex items-center gap-1 transition" title="Tempel link yang disalin dari Chrome atau Google">
                    <i class="fa-solid fa-paste"></i> Tempel Link (Chrome / Web)
                  </button>
                  <button type="button" onclick="App.copyToClipboard(document.getElementById('tool-image-url').value)" class="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-md text-xs font-semibold border border-slate-300" title="Salin link gambar saat ini">
                    <i class="fa-solid fa-copy"></i>
                  </button>
                </div>
              </div>
              <div class="flex items-center gap-4">
                <img id="tool-img-preview" src="${tool.image || 'https://via.placeholder.com/100'}" class="w-20 h-20 rounded-xl object-cover border border-slate-300 shadow-sm" onerror="this.src='https://via.placeholder.com/100?text=Alat'" />
                <div class="flex-1 space-y-2">
                  <input type="file" accept="image/*" onchange="Inventory.handleToolImageUpload(event)" class="text-xs text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100 cursor-pointer" />
                  <div class="flex items-center gap-2">
                    <span class="text-xs text-slate-500 font-medium whitespace-nowrap"><i class="fa-solid fa-link text-amber-600"></i> Link URL:</span>
                    <input 
                      type="text" 
                      id="tool-image-url" 
                      value="${Util.escapeHtml(tool.image || '')}" 
                      oninput="App.handleImageUrlInput(this, 'tool-img-preview')" 
                      placeholder="Tempel link gambar dari Chrome, Google, atau internet..." 
                      class="flex-1 text-xs px-2.5 py-1.5 border border-slate-300 rounded-lg" 
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Nama Alat / Peralatan *</label>
                <input type="text" id="tool-name" required value="${Util.escapeHtml(tool.name)}" placeholder="Forklift Reach Truck / Hand Pallet" class="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg" />
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Kode Aset / Nomor Registrasi *</label>
                <input type="text" id="tool-code" required value="${Util.escapeHtml(tool.code)}" class="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg font-mono font-bold" />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Kategori</label>
                <select id="tool-category" class="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg bg-white">
                  <option value="Security & Digital" ${tool.category === 'Security & Digital' ? 'selected' : ''}>Security & Digital (CCTV)</option>
                  <option value="Heavy Equipment" ${tool.category === 'Heavy Equipment' ? 'selected' : ''}>Heavy Equipment (Forklift)</option>
                  <option value="Warehouse Tool" ${tool.category === 'Warehouse Tool' ? 'selected' : ''}>Warehouse Tool (Tangga)</option>
                  <option value="Storage & Racking" ${tool.category === 'Storage & Racking' ? 'selected' : ''}>Storage & Racking (Rak)</option>
                  <option value="Material Handling" ${tool.category === 'Material Handling' ? 'selected' : ''}>Material Handling (Troli/Pallet)</option>
                  <option value="Fleet & Delivery" ${tool.category === 'Fleet & Delivery' ? 'selected' : ''}>Fleet & Delivery (Mobil/Truk)</option>
                  <option value="IT & Digital" ${tool.category === 'IT & Digital' ? 'selected' : ''}>IT & Digital (PC/Scanner/Printer)</option>
                  <option value="Electrical & Utility" ${tool.category === 'Electrical & Utility' ? 'selected' : ''}>Electrical & Utility (Lampu/Kabel)</option>
                  <option value="Safety Equipment" ${tool.category === 'Safety Equipment' ? 'selected' : ''}>Safety Equipment (APAR/P3K)</option>
                  <option value="Office Furniture" ${tool.category === 'Office Furniture' ? 'selected' : ''}>Office Furniture (Meja/Kursi)</option>
                  <option value="Cleaning Tools" ${tool.category === 'Cleaning Tools' ? 'selected' : ''}>Cleaning Tools (Sapu/Pel)</option>
                  <option value="Facility & Utility" ${tool.category === 'Facility & Utility' ? 'selected' : ''}>Facility & Utility</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Jumlah Unit *</label>
                <input type="number" id="tool-qty" min="1" required value="${tool.qty || parseInt(tool.quantity) || 1}" class="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg font-bold text-blue-700" />
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Status Operasional</label>
                <select id="tool-status" class="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg bg-white font-bold text-slate-800">
                  <option value="Tersedia" ${tool.status === 'Tersedia' ? 'selected' : ''}>Tersedia (Ready)</option>
                  <option value="Sedang Digunakan" ${tool.status === 'Sedang Digunakan' ? 'selected' : ''}>Sedang Digunakan</option>
                  <option value="Dalam Perawatan" ${tool.status === 'Dalam Perawatan' ? 'selected' : ''}>Dalam Perawatan (Servis)</option>
                  <option value="Rusak" ${tool.status === 'Rusak' ? 'selected' : ''}>Rusak</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Kondisi Fisik</label>
                <select id="tool-condition" class="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg bg-white">
                  <option value="Baik" ${tool.condition === 'Baik' || tool.condition === 'Sangat Baik' ? 'selected' : ''}>Baik</option>
                  <option value="Perlu Servis Ringan" ${tool.condition === 'Perlu Servis Ringan' ? 'selected' : ''}>Perlu Servis Ringan</option>
                  <option value="Rusak Ringan" ${tool.condition === 'Rusak Ringan' ? 'selected' : ''}>Rusak Ringan</option>
                  <option value="Afkir" ${tool.condition === 'Afkir' ? 'selected' : ''}>Afkir</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Lokasi Penempatan Gudang</label>
                <input type="text" id="tool-location" value="${Util.escapeHtml(tool.location)}" placeholder="Gudang Utama Loading Bay" class="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg" />
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Merk / Tipe Mesin</label>
                <input type="text" id="tool-brand" value="${Util.escapeHtml(tool.brand || '')}" placeholder="Toyota / Krisbow" class="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg" />
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Tahun Pengadaan</label>
                <input type="text" id="tool-year" value="${Util.escapeHtml(tool.purchaseYear || '')}" placeholder="2024" class="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg" />
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Jadwal Servis Terakhir</label>
                <input type="date" id="tool-last-service" value="${tool.lastService || ''}" class="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg" />
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Jadwal Servis Berkala Berikutnya</label>
                <input type="date" id="tool-next-service" value="${tool.nextService || ''}" class="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg" />
              </div>
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Spesifikasi Teknis & Kapasitas</label>
              <textarea id="tool-specs" rows="2" class="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg">${Util.escapeHtml(tool.specs || '')}</textarea>
            </div>

            <div class="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
              <button type="button" onclick="App.closeModal('tool-edit-modal')" class="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg">Batal</button>
              <button type="submit" class="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-bold text-sm shadow-sm transition flex items-center gap-1.5">
                <i class="fa-solid fa-floppy-disk"></i> Simpan Data Alat
              </button>
            </div>
          </form>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
  },

  handleToolImageUpload: async function(event) {
    const file = event.target.files[0];
    if (!file) return;
    try {
      const base64 = await Storage.fileToBase64(file);
      document.getElementById('tool-img-preview').src = base64;
      document.getElementById('tool-image-url').value = base64;
      App.showToast("Foto alat berhasil dimuat!", "info");
    } catch (e) {
      App.showToast("Gagal memuat foto alat: " + e.message, "error");
    }
  },

  saveTool: function(event, existingId) {
    event.preventDefault();
    const data = Storage.getData();

    const name = document.getElementById("tool-name").value.trim();
    const code = document.getElementById("tool-code").value.trim();
    const category = document.getElementById("tool-category").value;
    const qty = Number(document.getElementById("tool-qty")?.value) || 1;
    const status = document.getElementById("tool-status").value;
    const condition = document.getElementById("tool-condition").value;
    const location = document.getElementById("tool-location").value.trim();
    const brand = document.getElementById("tool-brand").value.trim();
    const purchaseYear = document.getElementById("tool-year").value.trim();
    const lastService = document.getElementById("tool-last-service").value;
    const nextService = document.getElementById("tool-next-service").value;
    const specs = document.getElementById("tool-specs").value.trim();
    const image = document.getElementById("tool-image-url").value.trim() || "https://via.placeholder.com/400?text=" + encodeURIComponent(name);

    if (existingId) {
      const idx = data.inventoryTools.findIndex(t => t.id === existingId);
      if (idx !== -1) {
        data.inventoryTools[idx] = {
          ...data.inventoryTools[idx],
          name, code, category, qty, quantity: qty + " Unit", status, condition, location, brand, purchaseYear, lastService, nextService, specs, image
        };
      }
    } else {
      if (!data.inventoryTools) data.inventoryTools = [];
      data.inventoryTools.push({
        id: "TOOL-" + Math.floor(100 + Math.random() * 900),
        name, code, category, qty, quantity: qty + " Unit", status, condition, location, brand, purchaseYear, lastService, nextService, specs, image,
        assignedTo: "",
        maintenanceLogs: []
      });
    }

    Storage.saveData(data);
    App.closeModal('tool-edit-modal');
    App.showToast(`Alat "${name}" berhasil disimpan!`, "success");
    this.render();
  },

  deleteTool: function(toolId) {
    const data = Storage.getData();
    const tool = data.inventoryTools.find(t => t.id === toolId);
    if (!tool) return;

    if (confirm(`Apakah Anda yakin ingin menghapus alat "${tool.name}" (${tool.code}) dari inventaris?`)) {
      data.inventoryTools = data.inventoryTools.filter(t => t.id !== toolId);
      Storage.saveData(data);
      App.showToast(`Alat "${tool.name}" berhasil dihapus.`, "info");
      this.render();
    }
  },

  // PENUGASAN OPERATOR MODAL
  openAssignModal: function(toolId) {
    const data = Storage.getData();
    const tool = data.inventoryTools.find(t => t.id === toolId);
    if (!tool) return;

    const modalHtml = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop" id="tool-assign-modal">
        <div class="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden modal-content-scale p-6">
          <h3 class="text-base font-bold text-slate-800 mb-2 flex items-center gap-2">
            <i class="fa-solid fa-user-gear text-amber-600"></i> Penugasan Alat: ${tool.code}
          </h3>
          <p class="text-xs text-slate-500 mb-4">${Util.escapeHtml(tool.name)}</p>

          <form onsubmit="Inventory.saveAssignment(event, '${tool.id}')" class="space-y-3.5">
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Status Pemakaian</label>
              <select id="assign-status" class="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg bg-white font-bold">
                <option value="Sedang Digunakan" ${tool.status === 'Sedang Digunakan' ? 'selected' : ''}>Sedang Digunakan (In Use)</option>
                <option value="Tersedia" ${tool.status === 'Tersedia' ? 'selected' : ''}>Tersedia (Ready / Standby)</option>
                <option value="Dalam Perawatan" ${tool.status === 'Dalam Perawatan' ? 'selected' : ''}>Dalam Perawatan (Servis)</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Nama Operator / Tim Pemegang</label>
              <input type="text" id="assign-operator" value="${Util.escapeHtml(tool.assignedTo || '')}" placeholder="Contoh: Joko Santoso (Regu A)" class="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg" />
            </div>

            <div class="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
              <button type="button" onclick="App.closeModal('tool-assign-modal')" class="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg">Batal</button>
              <button type="submit" class="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-bold text-sm">
                Simpan Penugasan
              </button>
            </div>
          </form>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
  },

  saveAssignment: function(event, toolId) {
    event.preventDefault();
    const data = Storage.getData();
    const tool = data.inventoryTools.find(t => t.id === toolId);
    if (!tool) return;

    tool.status = document.getElementById("assign-status").value;
    tool.assignedTo = document.getElementById("assign-operator").value.trim();

    Storage.saveData(data);
    App.closeModal('tool-assign-modal');
    App.showToast(`Penugasan alat "${tool.name}" berhasil diperbarui!`, "success");
    this.render();
  },

  // MAINTENANCE & SERVIS LOG MODAL
  openMaintenanceModal: function(toolId) {
    const data = Storage.getData();
    const tool = data.inventoryTools.find(t => t.id === toolId);
    if (!tool) return;

    const modalHtml = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop" id="tool-maint-modal">
        <div class="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden modal-content-scale max-h-[90vh] flex flex-col">
          <div class="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
            <div>
              <h3 class="text-base font-bold flex items-center gap-2">
                <i class="fa-solid fa-wrench text-amber-400"></i> Log Servis & Pemeliharaan Alat
              </h3>
              <p class="text-xs text-slate-300">${Util.escapeHtml(tool.name)} (${tool.code})</p>
            </div>
            <button onclick="App.closeModal('tool-maint-modal')" class="text-white/80 hover:text-white text-lg">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>

          <div class="p-6 overflow-y-auto space-y-5">
            <!-- Add New Log Form -->
            <form onsubmit="Inventory.addMaintenanceLog(event, '${tool.id}')" class="bg-amber-50/70 p-4 rounded-xl border border-amber-200 space-y-3">
              <h4 class="text-xs font-bold uppercase text-amber-900 flex items-center gap-1">
                <i class="fa-solid fa-plus"></i> Tambah Catatan Servis Baru
              </h4>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
                <div>
                  <label class="block text-[11px] font-semibold text-slate-700">Tanggal Servis *</label>
                  <input type="date" id="maint-date" required value="${new Date().toISOString().slice(0,10)}" class="w-full text-xs px-2 py-1.5 border border-slate-300 rounded" />
                </div>
                <div>
                  <label class="block text-[11px] font-semibold text-slate-700">Jenis Perawatan</label>
                  <input type="text" id="maint-type" placeholder="Servis Rutin / Ganti Oli" class="w-full text-xs px-2 py-1.5 border border-slate-300 rounded" />
                </div>
                <div>
                  <label class="block text-[11px] font-semibold text-slate-700">Teknisi / Bengkel</label>
                  <input type="text" id="maint-tech" placeholder="PT Traktor Nusantara" class="w-full text-xs px-2 py-1.5 border border-slate-300 rounded" />
                </div>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
                <div>
                  <label class="block text-[11px] font-semibold text-slate-700">Biaya Servis (Rp)</label>
                  <input type="number" id="maint-cost" min="0" value="0" class="w-full text-xs px-2 py-1.5 border border-slate-300 rounded font-mono" />
                </div>
                <div class="md:col-span-2">
                  <label class="block text-[11px] font-semibold text-slate-700">Keterangan / Part yang Diganti</label>
                  <input type="text" id="maint-notes" required placeholder="Ganti filter hidrolik & pelumasan roda" class="w-full text-xs px-2 py-1.5 border border-slate-300 rounded" />
                </div>
              </div>
              <div class="flex justify-end">
                <button type="submit" class="px-4 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-bold text-xs shadow-xs">
                  Simpan Log Servis
                </button>
              </div>
            </form>

            <!-- Past Logs History -->
            <div>
              <h4 class="text-xs font-bold uppercase text-slate-500 mb-2">Riwayat Pemeliharaan Sebelumnya:</h4>
              ${(!tool.maintenanceLogs || tool.maintenanceLogs.length === 0) ? `
                <p class="text-xs text-slate-400 italic py-4 text-center">Belum ada riwayat servis tercatat.</p>
              ` : `
                <div class="divide-y divide-slate-200 border border-slate-200 rounded-xl overflow-hidden">
                  ${tool.maintenanceLogs.map(log => `
                    <div class="p-3 bg-white text-xs space-y-1">
                      <div class="flex justify-between font-bold text-slate-800">
                        <span>${Util.formatDate(log.date)} - ${log.type || 'Servis'}</span>
                        <span class="font-mono text-amber-700">${log.cost > 0 ? Util.formatRupiah(log.cost) : 'Gratis / Internal'}</span>
                      </div>
                      <p class="text-slate-600">${Util.escapeHtml(log.notes)}</p>
                      <p class="text-[10px] text-slate-400">Teknisi: ${Util.escapeHtml(log.technician || 'Internal Staff')}</p>
                    </div>
                  `).join('')}
                </div>
              `}
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
  },

  addMaintenanceLog: function(event, toolId) {
    event.preventDefault();
    const data = Storage.getData();
    const tool = data.inventoryTools.find(t => t.id === toolId);
    if (!tool) return;

    const date = document.getElementById("maint-date").value;
    const type = document.getElementById("maint-type").value.trim() || "Servis Berkala";
    const technician = document.getElementById("maint-tech").value.trim() || "Teknisi Internal";
    const cost = Number(document.getElementById("maint-cost").value) || 0;
    const notes = document.getElementById("maint-notes").value.trim();

    if (!tool.maintenanceLogs) tool.maintenanceLogs = [];
    tool.maintenanceLogs.unshift({ date, type, technician, cost, notes });
    tool.lastService = date;

    Storage.saveData(data);
    App.closeModal('tool-maint-modal');
    App.showToast("Log servis berhasil dicatat!", "success");
    this.render();
  }
};
