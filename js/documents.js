/**
 * Document Management Module (DOKUMEN)
 * Generates and manages Faktur Penjualan (Invoice), Surat Jalan (DO), PO, and Receipts
 */

const Documents = {
  currentFilter: "ALL",
  searchQuery: "",
  activeDocId: null,

  init: function() {
    this.render();
  },

  render: function() {
    const data = Storage.getData();
    const isEmployee = Storage.isEmployee();
    const container = document.getElementById("docs-content");
    if (!container) return;

    if (!isEmployee) {
      container.innerHTML = this.renderLockedView();
      return;
    }

    let docs = data.documents || [];
    if (this.currentFilter !== "ALL") {
      docs = docs.filter(d => d.type === this.currentFilter || d.paymentStatus === this.currentFilter);
    }
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      docs = docs.filter(d => 
        d.docNumber.toLowerCase().includes(q) || 
        d.clientName.toLowerCase().includes(q) ||
        d.type.toLowerCase().includes(q)
      );
    }

    // Stats
    const totalDocs = (data.documents || []).length;
    const totalInvoices = (data.documents || []).filter(d => d.type.includes("Faktur")).length;
    const totalSuratJalan = (data.documents || []).filter(d => d.type.includes("Surat Jalan")).length;
    const totalPO = (data.documents || []).filter(d => d.type.includes("PO")).length;

    container.innerHTML = `
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div class="flex items-center gap-2">
            <span class="p-2 bg-indigo-100 text-indigo-700 rounded-lg"><i class="fa-solid fa-file-invoice-dollar text-xl"></i></span>
            <div>
              <h2 class="text-2xl font-bold text-slate-800">Manajemen Dokumen & Faktur Grosir</h2>
              <p class="text-sm text-slate-500">Penerbitan faktur penjualan, surat jalan pengiriman, PO supplier, dan cetak PDF resmi.</p>
            </div>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button onclick="Documents.openDocModal()" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold text-sm shadow-sm transition flex items-center gap-1.5">
            <i class="fa-solid fa-plus"></i> Buat Dokumen Baru
          </button>
        </div>
      </div>

      <!-- Quick Metrics -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div class="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl font-bold">
            <i class="fa-solid fa-folder-open"></i>
          </div>
          <div>
            <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Dokumen</p>
            <h3 class="text-2xl font-bold text-slate-800">${totalDocs} <span class="text-xs font-normal text-slate-500">Berkas</span></h3>
          </div>
        </div>

        <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl font-bold">
            <i class="fa-solid fa-file-invoice"></i>
          </div>
          <div>
            <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Faktur Penjualan</p>
            <h3 class="text-2xl font-bold text-slate-800">${totalInvoices} <span class="text-xs font-normal text-slate-500">Invoice</span></h3>
          </div>
        </div>

        <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div class="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl font-bold">
            <i class="fa-solid fa-truck"></i>
          </div>
          <div>
            <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Surat Jalan (DO)</p>
            <h3 class="text-2xl font-bold text-slate-800">${totalSuratJalan} <span class="text-xs font-normal text-slate-500">Terkirim</span></h3>
          </div>
        </div>

        <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl font-bold">
            <i class="fa-solid fa-cart-flatbed"></i>
          </div>
          <div>
            <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Purchase Order (PO)</p>
            <h3 class="text-2xl font-bold text-slate-800">${totalPO} <span class="text-xs font-normal text-slate-500">Supplier</span></h3>
          </div>
        </div>
      </div>

      <!-- Filter and Document Cards / Table -->
      <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div class="p-4 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-slate-50">
          <div class="flex items-center gap-3">
            <h3 class="font-bold text-slate-800 flex items-center gap-2">
              <i class="fa-solid fa-list text-indigo-600"></i> Arsip & Penerbitan Dokumen Niaga
            </h3>
            <span class="text-xs px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 font-semibold">${docs.length} Dokumen</span>
          </div>

          <div class="flex flex-wrap items-center gap-2">
            <div class="relative min-w-[220px]">
              <i class="fa-solid fa-magnifying-glass absolute left-3 top-2.5 text-slate-400 text-sm"></i>
              <input 
                type="text" 
                placeholder="Cari No. Dokumen / Klien..." 
                value="${Util.escapeHtml(this.searchQuery)}"
                oninput="Documents.handleSearch(this.value)"
                class="w-full pl-9 pr-3 py-1.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <select onchange="Documents.handleFilter(this.value)" class="text-sm border border-slate-300 rounded-lg px-2.5 py-1.5 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="ALL" ${this.currentFilter === 'ALL' ? 'selected' : ''}>Semua Kategori Dokumen</option>
              <option value="Faktur Penjualan" ${this.currentFilter === 'Faktur Penjualan' ? 'selected' : ''}>Faktur Penjualan</option>
              <option value="Surat Jalan (DO)" ${this.currentFilter === 'Surat Jalan (DO)' ? 'selected' : ''}>Surat Jalan (DO)</option>
              <option value="Purchase Order (PO)" ${this.currentFilter === 'Purchase Order (PO)' ? 'selected' : ''}>Purchase Order (PO)</option>
              <option value="LUNAS" ${this.currentFilter === 'LUNAS' ? 'selected' : ''}>Status: LUNAS</option>
              <option value="DIPROSES" ${this.currentFilter === 'DIPROSES' ? 'selected' : ''}>Status: DIPROSES</option>
            </select>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm text-slate-700">
            <thead class="bg-slate-100 text-slate-600 uppercase text-xs font-semibold border-b border-slate-200">
              <tr>
                <th class="py-3 px-4">No. Dokumen & Tipe</th>
                <th class="py-3 px-3">Tanggal / Tempo</th>
                <th class="py-3 px-3">Nama Klien / Supplier</th>
                <th class="py-3 px-3 text-center">Jml Item</th>
                <th class="py-3 px-3 text-right">Nilai Total</th>
                <th class="py-3 px-3 text-center">Status</th>
                <th class="py-3 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200">
              ${docs.length === 0 ? `
                <tr>
                  <td colspan="7" class="text-center py-10 text-slate-400">
                    <i class="fa-solid fa-file-circle-xmark text-3xl mb-2 block"></i>
                    Belum ada dokumen yang sesuai filter.
                  </td>
                </tr>
              ` : docs.map(doc => {
                let badge = "bg-slate-100 text-slate-700";
                if (doc.paymentStatus === "LUNAS") badge = "bg-emerald-100 text-emerald-800 border border-emerald-200";
                if (doc.paymentStatus === "TERKIRIM") badge = "bg-blue-100 text-blue-800 border border-blue-200";
                if (doc.paymentStatus === "DIPROSES") badge = "bg-amber-100 text-amber-800 border border-amber-200";

                return `
                  <tr class="hover:bg-slate-50/80 transition">
                    <td class="py-3 px-4">
                      <div class="font-bold text-slate-800 font-mono">${Util.escapeHtml(doc.docNumber)}</div>
                      <span class="inline-block text-xs font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded mt-0.5">${doc.type}</span>
                    </td>
                    <td class="py-3 px-3">
                      <div class="font-medium text-slate-700">${Util.formatDate(doc.date)}</div>
                      <div class="text-xs text-slate-400">Tempo: ${Util.formatDate(doc.dueDate)}</div>
                    </td>
                    <td class="py-3 px-3">
                      <div class="font-semibold text-slate-800">${Util.escapeHtml(doc.clientName)}</div>
                      <div class="text-xs text-slate-500 truncate max-w-xs">${Util.escapeHtml(doc.clientAddress || '-')}</div>
                    </td>
                    <td class="py-3 px-3 text-center font-medium">
                      ${(doc.items || []).length} Item
                    </td>
                    <td class="py-3 px-3 text-right font-bold text-slate-800">
                      ${Util.formatRupiah(doc.grandTotal)}
                    </td>
                    <td class="py-3 px-3 text-center">
                      <span class="inline-block text-xs px-2.5 py-1 rounded-full font-bold ${badge}">
                        ${doc.paymentStatus}
                      </span>
                    </td>
                    <td class="py-3 px-4 text-center">
                      <div class="flex items-center justify-center gap-1.5">
                        <button 
                          onclick="Documents.previewDocument('${doc.id}')" 
                          class="p-1.5 text-indigo-600 hover:text-white hover:bg-indigo-600 rounded-lg transition border border-indigo-200"
                          title="Lihat & Cetak Dokumen / Faktur"
                        >
                          <i class="fa-solid fa-print"></i>
                        </button>
                        <button 
                          onclick="Documents.openDocModal('${doc.id}')" 
                          class="p-1.5 text-blue-600 hover:text-white hover:bg-blue-600 rounded-lg transition border border-blue-200"
                          title="Edit Teks, Item, dan Foto Dokumen"
                        >
                          <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button 
                          onclick="Documents.deleteDocument('${doc.id}')" 
                          class="p-1.5 text-rose-600 hover:text-white hover:bg-rose-600 rounded-lg transition border border-rose-200"
                          title="Hapus Dokumen"
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

  renderLockedView: function() {
    return `
      <div class="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-xl mx-auto my-12 shadow-sm">
        <div class="w-20 h-20 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 border border-amber-200">
          <i class="fa-solid fa-lock"></i>
        </div>
        <h3 class="text-2xl font-bold text-slate-800 mb-2">Akses Terkunci (Khusus Pegawai)</h3>
        <p class="text-slate-500 text-sm mb-6 leading-relaxed">
          Fitur Generator Dokumen, Faktur Penjualan Grosir, dan Surat Jalan hanya dapat diakses oleh staff administrasi dan pegawai toko.
        </p>
        <button onclick="App.openLoginModal()" class="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-sm shadow-md transition inline-flex items-center gap-2">
          <i class="fa-solid fa-key"></i> Masukkan Password Pegawai
        </button>
      </div>
    `;
  },

  handleSearch: function(val) {
    this.searchQuery = val;
    this.render();
  },

  handleFilter: function(val) {
    this.currentFilter = val;
    this.render();
  },

  // OPEN CREATE / EDIT MODAL
  openDocModal: function(docId = null) {
    const data = Storage.getData();
    let doc = {
      id: "",
      docNumber: `INV/GBA/${new Date().getFullYear()}/${String(new Date().getMonth()+1).padStart(2,'0')}/${Math.floor(1000+Math.random()*9000)}`,
      type: "Faktur Penjualan",
      date: new Date().toISOString().slice(0,10),
      dueDate: new Date(Date.now() + 14*24*60*60*1000).toISOString().slice(0,10),
      clientName: "",
      clientPhone: "",
      clientAddress: "",
      paymentStatus: "LUNAS",
      paymentMethod: "Transfer Bank BCA",
      items: [
        { name: "Beras Premium Ramos Setra 25kg", qty: 10, unit: "Sak", price: 345000, subtotal: 3450000 }
      ],
      discount: 0,
      taxPercent: 0,
      grandTotal: 3450000,
      notes: "Barang yang sudah dibeli tidak dapat ditukar kecuali ada cacat pabrik saat penerimaan.",
      signatureName: "Bagian Penjualan Grosir",
      attachmentUrl: ""
    };

    let isEdit = false;
    if (docId) {
      const found = data.documents.find(d => d.id === docId);
      if (found) {
        doc = JSON.parse(JSON.stringify(found));
        isEdit = true;
      }
    }

    const modalHtml = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop" id="doc-edit-modal">
        <div class="bg-white rounded-2xl max-w-4xl w-full shadow-2xl border border-slate-200 overflow-hidden modal-content-scale max-h-[92vh] flex flex-col">
          <div class="px-6 py-4 bg-gradient-to-r from-indigo-700 to-blue-700 text-white flex items-center justify-between">
            <h3 class="text-lg font-bold flex items-center gap-2">
              <i class="fa-solid ${isEdit ? 'fa-pen-to-square' : 'fa-file-circle-plus'}"></i>
              ${isEdit ? 'Edit Dokumen Niaga' : 'Buat Dokumen / Faktur Grosir Baru'}
            </h3>
            <button onclick="App.closeModal('doc-edit-modal')" class="text-white/80 hover:text-white text-lg">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>

          <form id="doc-main-form" onsubmit="Documents.saveDocument(event, '${doc.id}')" class="p-6 overflow-y-auto space-y-4">
            <!-- Header Section -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Jenis Dokumen *</label>
                <select id="doc-type" onchange="Documents.onTypeChange(this.value)" class="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg bg-white font-medium">
                  <option value="Faktur Penjualan" ${doc.type === 'Faktur Penjualan' ? 'selected' : ''}>Faktur Penjualan (Invoice)</option>
                  <option value="Surat Jalan (DO)" ${doc.type === 'Surat Jalan (DO)' ? 'selected' : ''}>Surat Jalan (Delivery Order)</option>
                  <option value="Purchase Order (PO)" ${doc.type === 'Purchase Order (PO)' ? 'selected' : ''}>Purchase Order (PO Supplier)</option>
                  <option value="Berita Acara Penerimaan" ${doc.type === 'Berita Acara Penerimaan' ? 'selected' : ''}>Berita Acara Penerimaan (BAPB)</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Nomor Dokumen *</label>
                <input type="text" id="doc-number" required value="${Util.escapeHtml(doc.docNumber)}" class="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg font-mono font-bold text-indigo-800" />
              </div>

              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Tanggal Terbit *</label>
                <input type="date" id="doc-date" required value="${doc.date}" class="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg" />
              </div>

              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Jatuh Tempo / Target</label>
                <input type="date" id="doc-due-date" value="${doc.dueDate === '-' ? '' : doc.dueDate}" class="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg" />
              </div>
            </div>

            <!-- Client / Supplier Details -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Nama Pihak / Toko Klien *</label>
                <input type="text" id="doc-client-name" required value="${Util.escapeHtml(doc.clientName)}" placeholder="Contoh: Toko Berkah Jaya / PT Supplier" class="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg" />
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">No. WhatsApp / Kontak</label>
                <input type="text" id="doc-client-phone" value="${Util.escapeHtml(doc.clientPhone || '')}" placeholder="0812-xxxx-xxxx" class="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg" />
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Status Dokumen / Bayar</label>
                <select id="doc-status" class="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg bg-white font-bold text-slate-800">
                  <option value="LUNAS" ${doc.paymentStatus === 'LUNAS' ? 'selected' : ''}>LUNAS</option>
                  <option value="TERKIRIM" ${doc.paymentStatus === 'TERKIRIM' ? 'selected' : ''}>TERKIRIM</option>
                  <option value="DIPROSES" ${doc.paymentStatus === 'DIPROSES' ? 'selected' : ''}>DIPROSES</option>
                  <option value="TEMPO / BELUM LUNAS" ${doc.paymentStatus === 'TEMPO / BELUM LUNAS' ? 'selected' : ''}>TEMPO / BELUM LUNAS</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Alamat Lengkap Pengiriman / Lokasi</label>
              <input type="text" id="doc-client-address" value="${Util.escapeHtml(doc.clientAddress || '')}" placeholder="Jl. Pasar Baru No. 10..." class="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg" />
            </div>

            <!-- Items Table (Dynamic Rows) -->
            <div class="border border-slate-200 rounded-xl overflow-hidden">
              <div class="bg-slate-100 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
                <span class="text-xs font-bold text-slate-700 uppercase tracking-wide">Rincian Barang & Kuantitas</span>
                <button type="button" onclick="Documents.addRow()" class="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-xs font-bold flex items-center gap-1 shadow-xs">
                  <i class="fa-solid fa-plus"></i> Tambah Baris Barang
                </button>
              </div>
              <div class="overflow-x-auto p-2">
                <table class="w-full text-left text-xs" id="doc-items-table">
                  <thead class="text-slate-500 font-semibold border-b border-slate-200">
                    <tr>
                      <th class="py-2 px-2">Nama Barang / Deskripsi</th>
                      <th class="py-2 px-2 w-20 text-center">Qty</th>
                      <th class="py-2 px-2 w-24">Satuan</th>
                      <th class="py-2 px-2 w-32 text-right">Harga Satuan (Rp)</th>
                      <th class="py-2 px-2 w-32 text-right">Subtotal (Rp)</th>
                      <th class="py-2 px-1 w-10 text-center"></th>
                    </tr>
                  </thead>
                  <tbody id="doc-items-tbody" class="divide-y divide-slate-100">
                    ${(doc.items || []).map((it, idx) => `
                      <tr class="item-row">
                        <td class="py-1.5 px-2">
                          <input type="text" value="${Util.escapeHtml(it.name)}" required class="row-name w-full px-2 py-1 border border-slate-300 rounded text-xs" placeholder="Nama barang" />
                        </td>
                        <td class="py-1.5 px-2">
                          <input type="number" value="${it.qty}" min="1" required oninput="Documents.calcTotals()" class="row-qty w-full px-2 py-1 border border-slate-300 rounded text-xs text-center font-bold" />
                        </td>
                        <td class="py-1.5 px-2">
                          <input type="text" value="${Util.escapeHtml(it.unit || 'Dus')}" class="row-unit w-full px-2 py-1 border border-slate-300 rounded text-xs" placeholder="Dus/Sak" />
                        </td>
                        <td class="py-1.5 px-2">
                          <input type="number" value="${it.price}" min="0" required oninput="Documents.calcTotals()" class="row-price w-full px-2 py-1 border border-slate-300 rounded text-xs text-right font-semibold" />
                        </td>
                        <td class="py-1.5 px-2 text-right font-bold text-slate-800 row-subtotal">
                          ${Util.formatRupiah((it.qty || 1) * (it.price || 0))}
                        </td>
                        <td class="py-1.5 px-1 text-center">
                          <button type="button" onclick="Documents.removeRow(this)" class="text-rose-500 hover:text-rose-700 p-1">
                            <i class="fa-solid fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Discount, Total, and Tax Calculation -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-3">
                <div>
                  <label class="block text-xs font-semibold text-slate-700 mb-1">Metode Pembayaran</label>
                  <input type="text" id="doc-payment-method" value="${Util.escapeHtml(doc.paymentMethod || 'Transfer BCA')}" class="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg" placeholder="Transfer Bank BCA / Tunai / Tempo 14 Hari" />
                </div>
                <div>
                  <label class="block text-xs font-semibold text-slate-700 mb-1">Catatan / Keterangan Dokumen</label>
                  <textarea id="doc-notes" rows="2" class="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg">${Util.escapeHtml(doc.notes || '')}</textarea>
                </div>
                <div>
                  <label class="block text-xs font-semibold text-slate-700 mb-1">Penanggung Jawab Tanda Tangan</label>
                  <input type="text" id="doc-signature" value="${Util.escapeHtml(doc.signatureName || 'Kepala Penjualan Grosir')}" class="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg" />
                </div>
              </div>

              <!-- Calculation Box -->
              <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <div class="flex justify-between text-sm text-slate-600">
                  <span>Subtotal Barang:</span>
                  <span id="doc-calc-subtotal" class="font-bold text-slate-800">Rp 0</span>
                </div>
                <div class="flex items-center justify-between text-sm text-slate-600">
                  <span>Potongan Diskon (Rp):</span>
                  <input type="number" id="doc-discount" value="${doc.discount || 0}" min="0" oninput="Documents.calcTotals()" class="w-32 px-2 py-1 text-right text-sm border border-slate-300 rounded font-semibold text-rose-600" />
                </div>
                <div class="flex items-center justify-between text-sm text-slate-600">
                  <span>PPN (%):</span>
                  <input type="number" id="doc-tax-percent" value="${doc.taxPercent || 0}" min="0" max="100" oninput="Documents.calcTotals()" class="w-20 px-2 py-1 text-right text-sm border border-slate-300 rounded font-semibold" />
                </div>
                <div class="border-t border-slate-300 pt-2 flex justify-between text-base font-extrabold text-indigo-900">
                  <span>GRAND TOTAL:</span>
                  <span id="doc-calc-grandtotal" class="text-xl text-indigo-700">Rp 0</span>
                </div>

                <!-- Attachment Proof Image Upload -->
                <div class="pt-3 border-t border-slate-200">
                  <div class="flex items-center justify-between mb-1.5">
                    <label class="block text-xs font-bold text-slate-700">Foto Bukti Fisik / Scan Lampiran</label>
                    <div class="flex items-center gap-1.5">
                      <button type="button" onclick="App.pasteFromClipboard('doc-attachment-url', 'doc-attachment-preview'); document.getElementById('doc-attachment-preview-container').classList.remove('hidden');" class="px-2 py-0.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded text-xs font-bold border border-indigo-200 flex items-center gap-1">
                        <i class="fa-solid fa-paste"></i> Tempel Link (Chrome)
                      </button>
                      <button type="button" onclick="App.copyToClipboard(document.getElementById('doc-attachment-url').value)" class="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded text-xs">
                        <i class="fa-solid fa-copy"></i>
                      </button>
                    </div>
                  </div>
                  <div class="space-y-2">
                    <input type="file" accept="image/*" onchange="Documents.handleAttachmentUpload(event)" class="text-xs text-slate-500 file:mr-2 file:py-1 file:px-2.5 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer" />
                    <input 
                      type="text" 
                      id="doc-attachment-url" 
                      value="${Util.escapeHtml(doc.attachmentUrl || '')}" 
                      oninput="App.handleImageUrlInput(this, 'doc-attachment-preview'); document.getElementById('doc-attachment-preview-container').classList.remove('hidden');"
                      placeholder="Tempel link foto lampiran/faktur dari Chrome / Google..." 
                      class="w-full text-xs px-2.5 py-1.5 border border-slate-300 rounded-lg" 
                    />
                  </div>
                  <div id="doc-attachment-preview-container" class="mt-2 ${doc.attachmentUrl ? '' : 'hidden'}">
                    <img id="doc-attachment-preview" src="${doc.attachmentUrl || ''}" class="h-16 rounded border border-slate-300 object-cover" onerror="this.src='https://via.placeholder.com/150x80?text=Lampiran'" />
                  </div>
                </div>
              </div>
            </div>

            <div class="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
              <button type="button" onclick="App.closeModal('doc-edit-modal')" class="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg">Batal</button>
              <button type="submit" class="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold text-sm shadow-sm transition flex items-center gap-1.5">
                <i class="fa-solid fa-floppy-disk"></i> Simpan Dokumen
              </button>
            </div>
          </form>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
    this.calcTotals();
  },

  onTypeChange: function(val) {
    const docNumberInput = document.getElementById("doc-number");
    const year = new Date().getFullYear();
    const month = String(new Date().getMonth()+1).padStart(2,'0');
    const rand = Math.floor(1000+Math.random()*9000);

    if (val.includes("Faktur")) {
      docNumberInput.value = `INV/GBA/${year}/${month}/${rand}`;
    } else if (val.includes("Surat Jalan")) {
      docNumberInput.value = `SJ/GBA/${year}/${month}/${rand}`;
    } else if (val.includes("Purchase Order")) {
      docNumberInput.value = `PO/GBA/${year}/${month}/${rand}`;
    } else {
      docNumberInput.value = `BAPB/GBA/${year}/${month}/${rand}`;
    }
  },

  addRow: function() {
    const tbody = document.getElementById("doc-items-tbody");
    const tr = document.createElement("tr");
    tr.className = "item-row";
    tr.innerHTML = `
      <td class="py-1.5 px-2">
        <input type="text" required class="row-name w-full px-2 py-1 border border-slate-300 rounded text-xs" placeholder="Nama barang" />
      </td>
      <td class="py-1.5 px-2">
        <input type="number" value="1" min="1" required oninput="Documents.calcTotals()" class="row-qty w-full px-2 py-1 border border-slate-300 rounded text-xs text-center font-bold" />
      </td>
      <td class="py-1.5 px-2">
        <input type="text" value="Dus" class="row-unit w-full px-2 py-1 border border-slate-300 rounded text-xs" placeholder="Dus/Sak" />
      </td>
      <td class="py-1.5 px-2">
        <input type="number" value="100000" min="0" required oninput="Documents.calcTotals()" class="row-price w-full px-2 py-1 border border-slate-300 rounded text-xs text-right font-semibold" />
      </td>
      <td class="py-1.5 px-2 text-right font-bold text-slate-800 row-subtotal">
        Rp 100.000
      </td>
      <td class="py-1.5 px-1 text-center">
        <button type="button" onclick="Documents.removeRow(this)" class="text-rose-500 hover:text-rose-700 p-1">
          <i class="fa-solid fa-trash"></i>
        </button>
      </td>
    `;
    tbody.appendChild(tr);
    this.calcTotals();
  },

  removeRow: function(btn) {
    const tbody = document.getElementById("doc-items-tbody");
    if (tbody.querySelectorAll("tr").length <= 1) {
      App.showToast("Dokumen minimal harus memiliki 1 item barang.", "warning");
      return;
    }
    btn.closest("tr").remove();
    this.calcTotals();
  },

  calcTotals: function() {
    const rows = document.querySelectorAll("#doc-items-tbody .item-row");
    let subtotal = 0;

    rows.forEach(row => {
      const qty = Number(row.querySelector(".row-qty")?.value) || 0;
      const price = Number(row.querySelector(".row-price")?.value) || 0;
      const itemSub = qty * price;
      subtotal += itemSub;
      const subEl = row.querySelector(".row-subtotal");
      if (subEl) subEl.textContent = Util.formatRupiah(itemSub);
    });

    const discount = Number(document.getElementById("doc-discount")?.value) || 0;
    const taxPercent = Number(document.getElementById("doc-tax-percent")?.value) || 0;

    const afterDiscount = Math.max(0, subtotal - discount);
    const taxAmount = (afterDiscount * taxPercent) / 100;
    const grandTotal = afterDiscount + taxAmount;

    const subEl = document.getElementById("doc-calc-subtotal");
    const grandEl = document.getElementById("doc-calc-grandtotal");
    if (subEl) subEl.textContent = Util.formatRupiah(subtotal);
    if (grandEl) grandEl.textContent = Util.formatRupiah(grandTotal);

    return { subtotal, discount, taxPercent, taxAmount, grandTotal };
  },

  handleAttachmentUpload: async function(event) {
    const file = event.target.files[0];
    if (!file) return;
    try {
      const base64 = await Storage.fileToBase64(file);
      document.getElementById('doc-attachment-url').value = base64;
      document.getElementById('doc-attachment-preview').src = base64;
      document.getElementById('doc-attachment-preview-container').classList.remove('hidden');
      App.showToast("Foto bukti lampiran berhasil diunggah!", "info");
    } catch (e) {
      App.showToast("Gagal memuat foto lampiran: " + e.message, "error");
    }
  },

  saveDocument: function(event, existingId) {
    event.preventDefault();
    const data = Storage.getData();
    const { discount, taxPercent, taxAmount, grandTotal } = this.calcTotals();

    const type = document.getElementById("doc-type").value;
    const docNumber = document.getElementById("doc-number").value.trim();
    const date = document.getElementById("doc-date").value;
    const dueDate = document.getElementById("doc-due-date").value || "-";
    const clientName = document.getElementById("doc-client-name").value.trim();
    const clientPhone = document.getElementById("doc-client-phone").value.trim();
    const clientAddress = document.getElementById("doc-client-address").value.trim();
    const paymentStatus = document.getElementById("doc-status").value;
    const paymentMethod = document.getElementById("doc-payment-method").value.trim();
    const notes = document.getElementById("doc-notes").value.trim();
    const signatureName = document.getElementById("doc-signature").value.trim();
    const attachmentUrl = document.getElementById("doc-attachment-url").value.trim();

    // Parse items
    const rows = document.querySelectorAll("#doc-items-tbody .item-row");
    const items = [];
    rows.forEach(row => {
      const name = row.querySelector(".row-name").value.trim();
      const qty = Number(row.querySelector(".row-qty").value) || 0;
      const unit = row.querySelector(".row-unit").value.trim() || "Dus";
      const price = Number(row.querySelector(".row-price").value) || 0;
      if (name) {
        items.push({ name, qty, unit, price, subtotal: qty * price });
      }
    });

    const docObj = {
      id: existingId || ("DOC-" + Date.now().toString().slice(-6)),
      type, docNumber, date, dueDate, clientName, clientPhone, clientAddress,
      paymentStatus, paymentMethod, notes, signatureName, attachmentUrl,
      items, discount, taxPercent, taxAmount, grandTotal
    };

    if (existingId) {
      const idx = data.documents.findIndex(d => d.id === existingId);
      if (idx !== -1) data.documents[idx] = docObj;
    } else {
      if (!data.documents) data.documents = [];
      data.documents.unshift(docObj);
    }

    Storage.saveData(data);
    App.closeModal('doc-edit-modal');
    App.showToast(`Dokumen ${docNumber} berhasil disimpan!`, "success");
    this.render();
  },

  deleteDocument: function(docId) {
    const data = Storage.getData();
    const doc = data.documents.find(d => d.id === docId);
    if (!doc) return;

    if (confirm(`Apakah Anda yakin ingin menghapus dokumen "${doc.docNumber}"?`)) {
      data.documents = data.documents.filter(d => d.id !== docId);
      Storage.saveData(data);
      App.showToast(`Dokumen ${doc.docNumber} telah dihapus.`, "info");
      this.render();
    }
  },

  // PREVIEW & PRINT OFFICIAL DOCUMENT MODAL
  previewDocument: function(docId) {
    const data = Storage.getData();
    const doc = data.documents.find(d => d.id === docId);
    if (!doc) return;

    const profile = data.profile || {};
    const isLunas = doc.paymentStatus === "LUNAS";

    const previewModalHtml = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop" id="doc-preview-modal">
        <div class="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden modal-content-scale max-h-[95vh] flex flex-col">
          <!-- Modal Control Bar (No Print) -->
          <div class="px-6 py-3 bg-slate-800 text-white flex items-center justify-between no-print">
            <div class="flex items-center gap-2">
              <i class="fa-solid fa-file-invoice text-indigo-400"></i>
              <span class="font-bold text-sm">Pratinjau Cetak: ${doc.docNumber}</span>
            </div>
            <div class="flex items-center gap-2">
              <button onclick="window.print()" class="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold text-xs flex items-center gap-1.5 shadow-sm transition">
                <i class="fa-solid fa-print"></i> Cetak Dokumen / PDF
              </button>
              <button onclick="App.closeModal('doc-preview-modal')" class="text-white/80 hover:text-white p-1">
                <i class="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>
          </div>

          <!-- Printable Document Container -->
          <div class="p-8 overflow-y-auto bg-white text-slate-900" id="printable-document">
            <!-- Header Kop Toko -->
            <div class="border-b-2 border-slate-800 pb-4 mb-6 flex items-start justify-between">
              <div>
                <h1 class="text-2xl font-black tracking-tight text-slate-900">${profile.name}</h1>
                <p class="text-xs text-slate-600 font-medium">${profile.tagline}</p>
                <p class="text-xs text-slate-500 mt-1">${profile.address}</p>
                <p class="text-xs text-slate-500">Telp/WA: ${profile.phone} | Email: ${profile.email}</p>
              </div>
              <div class="text-right">
                <span class="inline-block px-3 py-1 bg-slate-900 text-white font-black text-sm uppercase tracking-wider rounded">
                  ${doc.type}
                </span>
                <p class="font-mono font-bold text-sm text-slate-800 mt-2">${doc.docNumber}</p>
                <p class="text-xs text-slate-500">Tanggal: ${Util.formatDate(doc.date)}</p>
                ${doc.dueDate !== '-' ? `<p class="text-xs text-slate-500">Jatuh Tempo: ${Util.formatDate(doc.dueDate)}</p>` : ''}
              </div>
            </div>

            <!-- Client Info & Payment Status -->
            <div class="grid grid-cols-2 gap-6 mb-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div>
                <p class="text-xs uppercase font-bold text-slate-400 mb-1">DITUJUKAN KEPADA:</p>
                <h4 class="text-sm font-bold text-slate-900">${doc.clientName}</h4>
                <p class="text-xs text-slate-600">${doc.clientPhone || '-'}</p>
                <p class="text-xs text-slate-600">${doc.clientAddress || '-'}</p>
              </div>
              <div class="text-right">
                <p class="text-xs uppercase font-bold text-slate-400 mb-1">STATUS & METODE BAYAR:</p>
                <div class="inline-block px-3 py-1 rounded font-extrabold text-xs uppercase border ${isLunas ? 'bg-emerald-50 text-emerald-700 border-emerald-300' : 'bg-amber-50 text-amber-700 border-amber-300'}">
                  ${doc.paymentStatus}
                </div>
                <p class="text-xs font-semibold text-slate-700 mt-1">${doc.paymentMethod || 'Tunai / Transfer'}</p>
              </div>
            </div>

            <!-- Items Table -->
            <table class="w-full text-left text-xs mb-6 border border-slate-300">
              <thead class="bg-slate-200 text-slate-800 font-bold uppercase">
                <tr>
                  <th class="py-2.5 px-3 border border-slate-300 text-center w-10">No</th>
                  <th class="py-2.5 px-3 border border-slate-300">Deskripsi Barang Grosir</th>
                  <th class="py-2.5 px-3 border border-slate-300 text-center w-16">Qty</th>
                  <th class="py-2.5 px-3 border border-slate-300 text-center w-20">Satuan</th>
                  <th class="py-2.5 px-3 border border-slate-300 text-right w-28">Harga Satuan</th>
                  <th class="py-2.5 px-3 border border-slate-300 text-right w-32">Total</th>
                </tr>
              </thead>
              <tbody>
                ${(doc.items || []).map((it, i) => `
                  <tr>
                    <td class="py-2 px-3 border border-slate-300 text-center font-medium">${i + 1}</td>
                    <td class="py-2 px-3 border border-slate-300 font-semibold">${Util.escapeHtml(it.name)}</td>
                    <td class="py-2 px-3 border border-slate-300 text-center font-bold">${it.qty}</td>
                    <td class="py-2 px-3 border border-slate-300 text-center">${it.unit}</td>
                    <td class="py-2 px-3 border border-slate-300 text-right font-mono">${Util.formatRupiah(it.price)}</td>
                    <td class="py-2 px-3 border border-slate-300 text-right font-mono font-bold">${Util.formatRupiah(it.subtotal)}</td>
                  </tr>
                `).join('')}
              </tbody>
              <tfoot class="bg-slate-50 font-semibold">
                ${doc.discount > 0 ? `
                  <tr>
                    <td colspan="5" class="py-1.5 px-3 border border-slate-300 text-right">Potongan Diskon:</td>
                    <td class="py-1.5 px-3 border border-slate-300 text-right font-mono text-rose-600">- ${Util.formatRupiah(doc.discount)}</td>
                  </tr>
                ` : ''}
                ${doc.taxAmount > 0 ? `
                  <tr>
                    <td colspan="5" class="py-1.5 px-3 border border-slate-300 text-right">PPN (${doc.taxPercent}%):</td>
                    <td class="py-1.5 px-3 border border-slate-300 text-right font-mono">+ ${Util.formatRupiah(doc.taxAmount)}</td>
                  </tr>
                ` : ''}
                <tr class="bg-slate-200 text-sm font-black text-slate-900">
                  <td colspan="5" class="py-2.5 px-3 border border-slate-300 text-right">TOTAL PEMBAYARAN:</td>
                  <td class="py-2.5 px-3 border border-slate-300 text-right font-mono text-indigo-900">${Util.formatRupiah(doc.grandTotal)}</td>
                </tr>
              </tfoot>
            </table>

            <!-- Notes & Signatures -->
            <div class="grid grid-cols-2 gap-6 mt-8 pt-4 border-t border-slate-200">
              <div>
                <p class="text-xs font-bold uppercase text-slate-500 mb-1">Catatan Dokumen:</p>
                <p class="text-xs text-slate-600 italic leading-relaxed">${Util.escapeHtml(doc.notes || 'Terima kasih atas kepercayaan Anda bertransaksi dengan Grosir Berkah Abadi.')}</p>
                ${doc.attachmentUrl ? `
                  <div class="mt-4">
                    <p class="text-xs font-bold text-slate-500 mb-1">Lampiran Foto Bukti:</p>
                    <img src="${doc.attachmentUrl}" class="h-24 rounded border border-slate-300 object-cover" />
                  </div>
                ` : ''}
              </div>
              <div class="flex justify-around text-center text-xs">
                <div>
                  <p class="text-slate-500 mb-14">Penerima / Pembeli,</p>
                  <p class="font-bold border-t border-slate-400 pt-1 text-slate-800">( ${Util.escapeHtml(doc.clientName.split('(')[0].trim())} )</p>
                </div>
                <div>
                  <p class="text-slate-500 mb-14">Hormat Kami,</p>
                  <p class="font-bold border-t border-slate-400 pt-1 text-slate-800">( ${Util.escapeHtml(doc.signatureName || profile.name)} )</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', previewModalHtml);
  }
};
