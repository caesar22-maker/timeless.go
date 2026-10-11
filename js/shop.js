/**
 * Online Shop Module (ONLINE SHOP)
 * Wholesale E-Commerce Catalog, Tiered Pricing, Cart, Order Checkout, and Product Management
 */

const Shop = {
  currentCategory: "ALL",
  searchQuery: "",
  cart: [],
  currentPage: 1,
  pageSize: 24,

  init: function() {
    this.render();
  },

  render: function() {
    const data = Storage.getData();
    const isEmployee = Storage.isEmployee();
    const profile = data.profile || {};
    const container = document.getElementById("shop-content");
    if (!container) return;

    let allProducts = data.shopProducts || [];
    let products = allProducts;
    if (this.currentCategory !== "ALL") {
      products = products.filter(p => p.category === this.currentCategory);
    }
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      products = products.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.sku.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q)) ||
        (p.category && p.category.toLowerCase().includes(q))
      );
    }

    const categories = [
      { id: "ALL", name: "Semua Produk", count: allProducts.length },
      { id: "Sembako", name: "Sembako", count: allProducts.filter(p => p.category === "Sembako").length },
      { id: "Palen", name: "Palen", count: allProducts.filter(p => p.category === "Palen").length },
      { id: "ATK", name: "ATK & Buku", count: allProducts.filter(p => p.category === "ATK").length },
      { id: "Kosmetik", name: "Kosmetik & Skincare", count: allProducts.filter(p => p.category === "Kosmetik").length },
      { id: "Keperluan Bayi & Anak", name: "Bayi & Anak", count: allProducts.filter(p => p.category === "Keperluan Bayi & Anak").length },
      { id: "Bangunan", name: "Bangunan", count: allProducts.filter(p => p.category === "Bangunan").length },
      { id: "Parfum", name: "Parfum", count: allProducts.filter(p => p.category === "Parfum").length }
    ];

    const totalCartItems = this.cart.reduce((sum, it) => sum + it.qty, 0);

    // Pagination calculations
    const totalItems = products.length;
    const totalPages = Math.ceil(totalItems / this.pageSize) || 1;
    if (this.currentPage > totalPages) this.currentPage = 1;
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const paginatedProducts = products.slice(startIndex, startIndex + this.pageSize);

    container.innerHTML = `
      <!-- Hero Promo Banner (Editable by Employee) -->
      <div class="relative rounded-2xl overflow-hidden mb-8 shadow-md border border-slate-200 bg-slate-900 min-h-[220px] flex items-center">
        <img 
          src="${profile.bannerImage || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&auto=format&fit=crop&q=80'}" 
          alt="Banner Promo Grosir" 
          class="absolute inset-0 w-full h-full object-cover opacity-35"
        />
        <div class="relative z-10 p-6 md:p-10 max-w-2xl text-white">
          <span class="inline-block px-3 py-1 rounded-full text-xs font-black bg-amber-500 text-slate-900 uppercase tracking-wider mb-2 shadow-xs">
            ${profile.bannerBadge || 'PROMO GROSIR'}
          </span>
          <h2 class="text-2xl md:text-4xl font-extrabold tracking-tight leading-tight mb-2">
            ${Util.escapeHtml(profile.bannerTitle || 'PROMO SUPER GROSIR BULAN INI')}
          </h2>
          <p class="text-slate-200 text-sm md:text-base leading-relaxed mb-4">
            ${Util.escapeHtml(profile.bannerSubtitle || 'Dapatkan potongan harga grosir khusus pembelian bertingkat & gratis pengiriman armada toko.')}
          </p>
          <div class="flex flex-wrap items-center gap-3">
            <a href="#product-grid" class="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-md transition flex items-center gap-2">
              <i class="fa-solid fa-cart-shopping"></i> Belanja Grosir Sekarang
            </a>
            ${isEmployee ? `
              <button onclick="Shop.openBannerEditModal()" class="px-4 py-2.5 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white rounded-xl font-bold text-xs flex items-center gap-1.5 transition border border-white/30">
                <i class="fa-solid fa-image"></i> Edit Banner & Promo
              </button>
            ` : ''}
          </div>
        </div>
      </div>

      <!-- Shop Controls & Actions -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6" id="product-grid">
        <div>
          <h3 class="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            <i class="fa-solid fa-store text-blue-600"></i> Katalog Produk UMKM & Online Shop
            <span class="text-sm font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">${totalItems} Produk UMKM</span>
          </h3>
          <p class="text-xs text-slate-500">Koleksi 250 produk UMKM lengkap dengan 1 tingkatan harga satuan pasti dan transparan.</p>
        </div>

        <div class="flex flex-wrap items-center gap-3">
          <!-- Customer Tracking Button -->
          <button 
            onclick="Orders.openCustomerTrackingModal()" 
            class="px-4 py-2.5 bg-white hover:bg-blue-50 text-blue-700 border border-blue-200 rounded-xl font-bold text-sm shadow-xs transition flex items-center gap-2"
            title="Pantau proses packing gudang & posisi armada pengantaran"
          >
            <i class="fa-solid fa-truck-fast text-blue-600"></i>
            <span>Lacak Pesanan</span>
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </button>

          <!-- Cart Button -->
          <button onclick="Shop.openCartModal()" class="relative px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-md transition flex items-center gap-2">
            <i class="fa-solid fa-cart-shopping"></i>
            <span>Keranjang Belanja</span>
            ${totalCartItems > 0 ? `
              <span class="w-6 h-6 rounded-full bg-amber-500 text-slate-900 text-xs font-black flex items-center justify-center -mr-1">
                ${totalCartItems}
              </span>
            ` : ''}
          </button>

          <!-- Employee Actions -->
          ${isEmployee ? `
            <button onclick="Orders.openEmployeeOrdersModal()" class="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-sm shadow-md transition flex items-center gap-1.5">
              <i class="fa-solid fa-clipboard-list"></i>
              <span>Proses Pesanan</span>
              <span class="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-400 text-slate-950 font-black">${(data.orders || []).filter(o => o.status !== 'Selesai').length}</span>
            </button>

            <button onclick="Shop.openProductModal()" class="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm shadow-md transition flex items-center gap-1.5">
              <i class="fa-solid fa-plus"></i> Tambah Produk UMKM
            </button>
          ` : ''}
        </div>
      </div>

      <!-- Categories & Search Bar -->
      <div class="bg-white rounded-xl border border-slate-200 p-3 shadow-xs mb-6 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <!-- Category Pills -->
        <div class="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          ${categories.map(cat => `
            <button 
              onclick="Shop.handleCategory('${cat.id}')" 
              class="px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap flex items-center gap-1.5 ${this.currentCategory === cat.id ? 'bg-blue-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}"
            >
              <span>${cat.name}</span>
              <span class="px-1.5 py-0.2 rounded-full text-[10px] ${this.currentCategory === cat.id ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'}">${cat.count}</span>
            </button>
          `).join('')}
        </div>

        <!-- Search Input -->
        <div class="relative min-w-[260px]">
          <i class="fa-solid fa-magnifying-glass absolute left-3 top-2.5 text-slate-400 text-sm"></i>
          <input 
            type="text" 
            placeholder="Cari kode, nama, varian produk UMKM..." 
            value="${Util.escapeHtml(this.searchQuery)}"
            oninput="Shop.handleSearch(this.value)"
            class="w-full pl-9 pr-3 py-1.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <!-- Products Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        ${paginatedProducts.length === 0 ? `
          <div class="col-span-full text-center py-16 bg-white rounded-2xl border border-slate-200 text-slate-400">
            <i class="fa-solid fa-basket-shopping text-4xl mb-2 block text-slate-300"></i>
            <p class="text-base font-semibold">Produk tidak ditemukan</p>
            <p class="text-xs text-slate-400 mt-1">Coba ubah kata kunci pencarian atau pilih kategori lain.</p>
          </div>
        ` : paginatedProducts.map(product => {
          const productPrice = product.price || product.retailPrice || (product.tiers && product.tiers[0] ? product.tiers[0].price : 0);

          return `
            <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition duration-200 group">
              <!-- Image & Badges -->
              <div class="relative h-48 bg-slate-100 overflow-hidden cursor-pointer" onclick="Shop.openDetailModal('${product.id}')">
                <img 
                  src="${product.image || 'https://via.placeholder.com/400?text=Produk'}" 
                  alt="${Util.escapeHtml(product.name)}" 
                  class="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  onerror="this.src='https://via.placeholder.com/400?text=Grosir+Produk'"
                />
                ${product.badge ? `
                  <span class="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-md text-[11px] font-black bg-rose-600 text-white uppercase tracking-wider shadow-xs">
                    ${product.badge}
                  </span>
                ` : ''}
                <span class="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-white font-mono text-[10px]">
                  ${product.sku}
                </span>
                <span class="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-md text-xs font-bold bg-white/90 backdrop-blur-md text-slate-800 shadow-xs">
                  ${product.category}
                </span>
              </div>

              <!-- Product Details -->
              <div class="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 
                    onclick="Shop.openDetailModal('${product.id}')" 
                    class="font-bold text-slate-900 hover:text-blue-600 cursor-pointer text-sm leading-snug line-clamp-2 mb-1"
                    title="${Util.escapeHtml(product.name)}"
                  >
                    ${Util.escapeHtml(product.name)}
                  </h4>
                  <p class="text-xs text-slate-400 mb-2">Kemasan: <span class="font-semibold text-slate-600">${product.unit}</span> | Stok: <span class="font-bold ${product.stock < 15 ? 'text-rose-600' : 'text-slate-700'}">${product.stock} ${product.unit}</span></p>

                  <!-- Single Price Box (1 Tingkatan Harga) -->
                  <div class="bg-blue-50/70 border border-blue-100 rounded-xl p-2.5 mb-3">
                    <div class="flex items-baseline justify-between">
                      <span class="text-[11px] text-slate-500 font-medium">Harga Jual:</span>
                      <span class="text-base font-extrabold text-blue-700 font-mono">${Util.formatRupiah(productPrice)}<span class="text-[10px] font-normal text-slate-500">/${product.unit.split(' ')[0]}</span></span>
                    </div>
                    <div class="text-[10px] text-slate-500 flex items-center justify-between mt-1 pt-1 border-t border-blue-100">
                      <span class="text-slate-500"><i class="fa-solid fa-tag text-blue-500 mr-1"></i>1 Tingkat Harga Satuan</span>
                      <span class="font-bold text-emerald-700"><i class="fa-solid fa-circle-check text-[10px]"></i> Produk UMKM</span>
                    </div>
                  </div>
                </div>

                <!-- Add to Cart & Controls -->
                <div class="pt-2 border-t border-slate-100 flex items-center gap-1.5">
                  <button 
                    onclick="Shop.quickAddToCart('${product.id}')" 
                    class="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition"
                  >
                    <i class="fa-solid fa-cart-plus"></i> + Keranjang
                  </button>
                  <button 
                    onclick="App.copyToClipboard('${product.image || ''}', 'Link foto produk ${Util.escapeHtml(product.name)} disalin!')" 
                    class="p-2 text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs transition"
                    title="Salin Link Gambar Produk"
                  >
                    <i class="fa-solid fa-link"></i>
                  </button>
                  <button 
                    onclick="Shop.openDetailModal('${product.id}')" 
                    class="p-2 text-slate-600 hover:text-blue-600 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs transition"
                    title="Lihat Detail & Tingkat Harga"
                  >
                    <i class="fa-solid fa-eye"></i>
                  </button>

                  ${isEmployee ? `
                    <button 
                      onclick="Shop.openProductModal('${product.id}')" 
                      class="p-2 text-blue-600 hover:bg-blue-50 rounded-xl text-xs border border-blue-200 transition"
                      title="Edit Produk (Teks, Gambar, Harga)"
                    >
                      <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button 
                      onclick="Shop.deleteProduct('${product.id}')" 
                      class="p-2 text-rose-600 hover:bg-rose-50 rounded-xl text-xs border border-rose-200 transition"
                      title="Hapus Produk"
                    >
                      <i class="fa-solid fa-trash"></i>
                    </button>
                  ` : ''}
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- Pagination Controls -->
      ${totalPages > 1 ? `
        <div class="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div class="text-xs text-slate-500 font-medium">
            Menampilkan <span class="font-bold text-slate-800">${startIndex + 1}</span> - <span class="font-bold text-slate-800">${Math.min(startIndex + this.pageSize, totalItems)}</span> dari <span class="font-bold text-slate-800">${totalItems}</span> produk
          </div>
          <div class="flex items-center gap-1.5">
            <button 
              onclick="Shop.goToPage(${this.currentPage - 1})" 
              ${this.currentPage === 1 ? 'disabled class="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-300 text-xs font-semibold cursor-not-allowed"' : 'class="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-semibold transition"'}
            >
              <i class="fa-solid fa-chevron-left mr-1"></i> Prev
            </button>
            <div class="flex items-center gap-1">
              ${Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(p => p === 1 || p === totalPages || Math.abs(p - this.currentPage) <= 2)
                .map((p, idx, arr) => {
                  const prev = arr[idx - 1];
                  const showEllipsis = prev && p - prev > 1;
                  return `
                    ${showEllipsis ? '<span class="px-1 text-slate-400 text-xs">...</span>' : ''}
                    <button 
                      onclick="Shop.goToPage(${p})" 
                      class="w-8 h-8 rounded-lg text-xs font-bold transition ${this.currentPage === p ? 'bg-blue-600 text-white shadow-xs' : 'border border-slate-200 text-slate-600 hover:bg-slate-100'}"
                    >
                      ${p}
                    </button>
                  `;
                }).join('')}
            </div>
            <button 
              onclick="Shop.goToPage(${this.currentPage + 1})" 
              ${this.currentPage === totalPages ? 'disabled class="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-300 text-xs font-semibold cursor-not-allowed"' : 'class="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-semibold transition"'}
            >
              Next <i class="fa-solid fa-chevron-right ml-1"></i>
            </button>
          </div>
        </div>
      ` : ''}
    `;
  },

  goToPage: function(page) {
    this.currentPage = page;
    this.render();
    const gridEl = document.getElementById("product-grid");
    if (gridEl) {
      gridEl.scrollIntoView({ behavior: 'smooth' });
    }
  },

  handleCategory: function(cat) {
    this.currentCategory = cat;
    this.currentPage = 1;
    this.render();
  },

  handleSearch: function(val) {
    this.searchQuery = val;
    this.currentPage = 1;
    this.render();
  },

  // Single price tier (1 tingkatan harga)
  getPriceForQty: function(product, qty = 1) {
    return product.price || product.retailPrice || (product.tiers && product.tiers[0] ? product.tiers[0].price : 0);
  },

  quickAddToCart: function(productId, addQty = 1) {
    const data = Storage.getData();
    const product = data.shopProducts.find(p => p.id === productId);
    if (!product) return;

    const existingIndex = this.cart.findIndex(it => it.productId === productId);
    if (existingIndex !== -1) {
      this.cart[existingIndex].qty += addQty;
    } else {
      this.cart.push({
        productId: product.id,
        name: product.name,
        unit: product.unit,
        image: product.image,
        qty: Math.max(product.minOrder || 1, addQty)
      });
    }

    App.showToast(`"${product.name}" ditambahkan ke keranjang belanja!`, "success");
    this.render();
  },

  // OPEN PRODUCT DETAIL MODAL
  openDetailModal: function(productId) {
    const data = Storage.getData();
    const product = data.shopProducts.find(p => p.id === productId);
    if (!product) return;

    const modalHtml = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop" id="shop-detail-modal">
        <div class="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden modal-content-scale max-h-[90vh] flex flex-col">
          <div class="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
            <h3 class="text-base font-bold flex items-center gap-2">
              <i class="fa-solid fa-box-open text-amber-400"></i> Detail Produk Grosir
            </h3>
            <button onclick="App.closeModal('shop-detail-modal')" class="text-white/80 hover:text-white text-lg">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>

          <div class="p-6 overflow-y-auto space-y-5">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div class="rounded-xl overflow-hidden bg-slate-100 border border-slate-200 h-56 flex items-center justify-center relative group">
                <img src="${product.image || 'https://via.placeholder.com/400'}" class="w-full h-full object-cover" onerror="this.src='https://via.placeholder.com/400?text=Produk'" />
                <button 
                  onclick="App.copyToClipboard('${product.image || ''}', 'Link gambar produk berhasil disalin!')" 
                  class="absolute bottom-2 right-2 px-2.5 py-1 bg-black/70 hover:bg-black text-white rounded-lg text-xs font-bold transition flex items-center gap-1 backdrop-blur-xs"
                  title="Salin Link Gambar dari Web"
                >
                  <i class="fa-solid fa-copy"></i> Salin Link
                </button>
              </div>
              <div class="space-y-2">
                <span class="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">${product.sku}</span>
                <h3 class="text-lg font-black text-slate-900 leading-snug">${Util.escapeHtml(product.name)}</h3>
                <p class="text-xs text-slate-500">Kategori: <span class="font-bold text-slate-700">${product.category}</span></p>
                <p class="text-xs text-slate-500">Kemasan: <span class="font-bold text-slate-700">${product.unit}</span></p>
                <p class="text-xs text-slate-500">Stok Tersedia: <span class="font-bold text-emerald-700">${product.stock} ${product.unit}</span></p>
                <p class="text-xs text-slate-500">Minimal Order: <span class="font-bold text-slate-700">${product.minOrder || 1} ${product.unit}</span></p>
              </div>
            </div>

            <!-- Single Price Display -->
            <div class="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 flex items-center justify-between">
              <div>
                <span class="text-xs font-bold uppercase text-blue-900 block mb-0.5 flex items-center gap-1.5">
                  <i class="fa-solid fa-tag text-blue-600"></i> Harga Jual Resmi UMKM (1 Tingkat Harga)
                </span>
                <span class="text-xs text-slate-500">Harga satuan pasti untuk seluruh kuantitas pemesanan</span>
              </div>
              <div class="text-right">
                <span class="text-2xl font-black text-blue-700 font-mono">${Util.formatRupiah(product.price || product.retailPrice || (product.tiers?.[0]?.price || 0))}</span>
                <span class="text-xs text-slate-500 font-medium block">per ${product.unit}</span>
              </div>
            </div>

            <!-- Description -->
            <div>
              <h4 class="text-xs font-bold uppercase text-slate-500 mb-1">Deskripsi Produk:</h4>
              <p class="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200">
                ${Util.escapeHtml(product.description || 'Tidak ada deskripsi.')}
              </p>
            </div>

            <!-- Order Qty Input & Add Button -->
            <div class="flex items-center gap-3 pt-3 border-t border-slate-200">
              <div class="flex items-center border border-slate-300 rounded-xl overflow-hidden">
                <button onclick="Shop.adjustDetailQty(-1)" class="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold">-</button>
                <input type="number" id="detail-qty-input" value="${product.minOrder || 1}" min="${product.minOrder || 1}" class="w-16 text-center text-sm font-bold border-0 focus:ring-0" />
                <button onclick="Shop.adjustDetailQty(1)" class="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold">+</button>
              </div>
              <button 
                onclick="Shop.addFromDetailModal('${product.id}')" 
                class="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
              >
                <i class="fa-solid fa-cart-plus"></i> Tambahkan ke Keranjang
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
  },

  adjustDetailQty: function(delta) {
    const input = document.getElementById("detail-qty-input");
    if (!input) return;
    const current = Number(input.value) || 1;
    const min = Number(input.min) || 1;
    input.value = Math.max(min, current + delta);
  },

  addFromDetailModal: function(productId) {
    const input = document.getElementById("detail-qty-input");
    const qty = Number(input?.value) || 1;
    this.quickAddToCart(productId, qty);
    App.closeModal('shop-detail-modal');
  },

  // OPEN CART MODAL
  openCartModal: function() {
    const data = Storage.getData();
    const modalHtml = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop" id="shop-cart-modal">
        <div class="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden modal-content-scale max-h-[92vh] flex flex-col">
          <div class="px-6 py-4 bg-gradient-to-r from-blue-700 to-indigo-700 text-white flex items-center justify-between">
            <h3 class="text-base font-bold flex items-center gap-2">
              <i class="fa-solid fa-cart-shopping"></i> Keranjang Belanja Grosir
            </h3>
            <button onclick="App.closeModal('shop-cart-modal')" class="text-white/80 hover:text-white text-lg">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>

          <div class="p-6 overflow-y-auto space-y-4 flex-1">
            ${this.cart.length === 0 ? `
              <div class="text-center py-12 text-slate-400">
                <i class="fa-solid fa-cart-arrow-down text-4xl mb-3 text-slate-300 block"></i>
                <p class="font-bold text-slate-700">Keranjang Belanja Masih Kosong</p>
                <p class="text-xs text-slate-400 mt-1">Silakan pilih produk kebutuhan grosir Anda dari katalog.</p>
              </div>
            ` : `
              <div class="divide-y divide-slate-200 border border-slate-200 rounded-xl overflow-hidden" id="cart-items-list">
                ${this.cart.map((item, idx) => {
                  const product = data.shopProducts.find(p => p.id === item.productId);
                  if (!product) return '';
                  const unitPrice = this.getPriceForQty(product, item.qty);
                  const subtotal = unitPrice * item.qty;

                  return `
                    <div class="p-3 bg-white flex items-center justify-between gap-3">
                      <img src="${product.image || 'https://via.placeholder.com/60'}" class="w-14 h-14 rounded-lg object-cover border border-slate-200 flex-shrink-0" />
                      <div class="flex-1 min-w-0">
                        <h4 class="font-bold text-xs text-slate-800 truncate">${Util.escapeHtml(product.name)}</h4>
                        <p class="text-[11px] text-slate-500 font-mono">Harga Satuan: <span class="font-bold text-blue-700">${Util.formatRupiah(unitPrice)}</span> / ${product.unit.split(' ')[0]}</p>
                        <span class="text-[10px] text-slate-400">1 Tingkat Harga Satuan UMKM</span>
                      </div>
                      
                      <!-- Qty changer -->
                      <div class="flex items-center gap-1.5">
                        <button onclick="Shop.updateCartQty(${idx}, -1)" class="w-7 h-7 rounded bg-slate-100 hover:bg-slate-200 font-bold text-slate-700 text-xs">-</button>
                        <span class="w-8 text-center text-xs font-bold font-mono">${item.qty}</span>
                        <button onclick="Shop.updateCartQty(${idx}, 1)" class="w-7 h-7 rounded bg-slate-100 hover:bg-slate-200 font-bold text-slate-700 text-xs">+</button>
                      </div>

                      <div class="text-right min-w-[90px]">
                        <p class="text-xs font-extrabold text-slate-900 font-mono">${Util.formatRupiah(subtotal)}</p>
                        <button onclick="Shop.removeCartItem(${idx})" class="text-[11px] text-rose-500 hover:text-rose-700 mt-1">Hapus</button>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            `}
          </div>

          ${this.cart.length > 0 ? `
            <div class="p-5 bg-slate-50 border-t border-slate-200 space-y-3">
              <div class="flex justify-between items-center text-sm font-bold text-slate-800">
                <span>Total Estimasi Belanja:</span>
                <span class="text-lg font-black text-blue-700 font-mono">${Util.formatRupiah(this.getCartTotal())}</span>
              </div>
              <div class="flex items-center justify-between gap-3">
                <button onclick="Shop.clearCart()" class="px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 rounded-lg font-semibold transition">
                  Kosongkan Keranjang
                </button>
                <button onclick="Shop.openCheckoutModal()" class="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm shadow-md transition flex items-center gap-2">
                  <i class="fa-solid fa-file-signature"></i> Proses Checkout Pesanan Grosir
                </button>
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
  },

  getCartTotal: function() {
    const data = Storage.getData();
    let total = 0;
    this.cart.forEach(it => {
      const product = data.shopProducts.find(p => p.id === it.productId);
      if (product) {
        const unitPrice = this.getPriceForQty(product, it.qty);
        total += unitPrice * it.qty;
      }
    });
    return total;
  },

  updateCartQty: function(index, delta) {
    if (!this.cart[index]) return;
    this.cart[index].qty += delta;
    if (this.cart[index].qty <= 0) {
      this.cart.splice(index, 1);
    }
    App.closeModal('shop-cart-modal');
    this.openCartModal();
    this.render();
  },

  removeCartItem: function(index) {
    this.cart.splice(index, 1);
    App.closeModal('shop-cart-modal');
    this.openCartModal();
    this.render();
  },

  clearCart: function() {
    if (confirm("Kosongkan keranjang belanja?")) {
      this.cart = [];
      App.closeModal('shop-cart-modal');
      this.render();
    }
  },

  // OPEN CHECKOUT MODAL (ENFORCE CUSTOMER ACCOUNT REQUIREMENT)
  openCheckoutModal: function() {
    App.closeModal('shop-cart-modal');
    
    // 1. Enforce Customer Account (Google Account, Name, and Complete Address)
    if (!Storage.hasCustomerAccount()) {
      App.showToast("Sebelum checkout, wajib melengkapi data Akun Google, Nama, dan Alamat Lengkap Anda!", "warning");
      App.openCustomerProfileModal(() => Shop.openCheckoutModal());
      return;
    }

    const cust = Storage.getCustomerAccount();
    const totalAmount = this.getCartTotal();

    const checkoutModalHtml = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop" id="shop-checkout-modal">
        <div class="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden modal-content-scale max-h-[92vh] flex flex-col">
          <div class="px-6 py-4 bg-emerald-600 text-white flex items-center justify-between">
            <h3 class="text-base font-bold flex items-center gap-2">
              <i class="fa-solid fa-truck-fast"></i> Formulir Pemesanan Grosir
            </h3>
            <button onclick="App.closeModal('shop-checkout-modal')" class="text-white/80 hover:text-white text-lg">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>

          <form onsubmit="Shop.submitOrder(event)" class="p-6 overflow-y-auto space-y-4">
            
            <!-- Customer Google Account Verification Box -->
            <div class="bg-emerald-50 border border-emerald-200 p-3.5 rounded-xl flex items-center justify-between gap-3 shadow-xs">
              <div class="flex items-center gap-2.5 min-w-0">
                <img src="${cust.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100'}" class="w-9 h-9 rounded-full object-cover border border-emerald-400 flex-shrink-0" />
                <div class="min-w-0">
                  <p class="text-xs font-bold text-slate-900 truncate">${Util.escapeHtml(cust.name)}</p>
                  <p class="text-[11px] text-slate-600 font-mono truncate flex items-center gap-1">
                    <i class="fa-brands fa-google text-red-500"></i> ${Util.escapeHtml(cust.googleEmail)}
                  </p>
                </div>
              </div>
              <button 
                type="button" 
                onclick="App.openCustomerProfileModal(() => Shop.openCheckoutModal())" 
                class="px-2.5 py-1 text-xs font-bold text-blue-700 bg-white hover:bg-blue-50 border border-blue-200 rounded-lg transition whitespace-nowrap"
              >
                Ubah Profil
              </button>
            </div>

            <!-- Bill Summary -->
            <div class="bg-blue-50 p-3 rounded-xl border border-blue-200 flex justify-between items-center text-xs">
              <span class="text-slate-600 font-medium">Total Tagihan (${this.cart.reduce((s,i)=>s+i.qty,0)} Barang):</span>
              <span class="text-base font-black text-blue-800 font-mono">${Util.formatRupiah(totalAmount)}</span>
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Nama Pemesan / Nama Toko Grosir *</label>
              <input type="text" id="order-cust-name" required value="${Util.escapeHtml(cust.name || '')}" placeholder="Contoh: Toko Sembako Barokah / Bpk. Hendra" class="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 font-semibold" />
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Nomor WhatsApp Aktif *</label>
                <input type="text" id="order-cust-phone" required value="${Util.escapeHtml(cust.phone || '')}" placeholder="0812-xxxx-xxxx" class="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 font-mono" />
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Pilihan Pengiriman / Armada *</label>
                <select id="order-delivery" class="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg bg-white">
                  <option value="Truk Toko Grosir">Truk Toko Grosir (Gratis Khusus Jabodetabek)</option>
                  <option value="Ambil Sendiri di Gudang (Pickup)">Ambil Sendiri di Gudang (Self Pickup)</option>
                  <option value="Ekspedisi Cargo">Ekspedisi Cargo / Truk Eksternal</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Alamat Lengkap Pengiriman / Lokasi Toko *</label>
              <textarea id="order-cust-address" required rows="2" class="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 leading-relaxed" placeholder="Jl. Pasar Baru No. 45 RT 02/03, Kelurahan...">${Util.escapeHtml(cust.address || '')}</textarea>
            </div>

            <!-- PAYMENT METHOD OPTIONS (COD, TRANSFER BANK, QRIS) -->
            <div>
              <label class="block text-xs font-bold uppercase text-slate-700 mb-1.5 flex items-center gap-1.5">
                <i class="fa-solid fa-credit-card text-emerald-600"></i> Pilihan Metode Pembayaran *
              </label>
              <div class="space-y-2">
                <label class="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/30 cursor-pointer transition">
                  <div class="flex items-center gap-3">
                    <input type="radio" name="order_payment_method" value="QRIS" checked class="text-emerald-600 focus:ring-emerald-500" />
                    <div>
                      <span class="text-xs font-bold text-slate-900 block flex items-center gap-1.5">
                        <i class="fa-solid fa-qrcode text-purple-600 text-sm"></i> QRIS (Instan Semua Bank & E-Wallet)
                      </span>
                      <span class="text-[11px] text-slate-500">BCA, Mandiri, BRI, BNI, GoPay, OVO, Dana, ShopeePay</span>
                    </div>
                  </div>
                  <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-700">Verifikasi Cepat</span>
                </label>

                <label class="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/30 cursor-pointer transition">
                  <div class="flex items-center gap-3">
                    <input type="radio" name="order_payment_method" value="Transfer Bank" class="text-emerald-600 focus:ring-emerald-500" />
                    <div>
                      <span class="text-xs font-bold text-slate-900 block flex items-center gap-1.5">
                        <i class="fa-solid fa-building-columns text-blue-600 text-sm"></i> Transfer Bank Manual (BCA / Mandiri / BRI)
                      </span>
                      <span class="text-[11px] text-slate-500">Transfer ke rekening resmi PT Grosir Berkah Abadi</span>
                    </div>
                  </div>
                  <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-700">Rekening Resmi</span>
                </label>

                <label class="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/30 cursor-pointer transition">
                  <div class="flex items-center gap-3">
                    <input type="radio" name="order_payment_method" value="COD" class="text-emerald-600 focus:ring-emerald-500" />
                    <div>
                      <span class="text-xs font-bold text-slate-900 block flex items-center gap-1.5">
                        <i class="fa-solid fa-hand-holding-dollar text-emerald-600 text-sm"></i> Bayar di Tempat (COD Saat Barang Sampai)
                      </span>
                      <span class="text-[11px] text-slate-500">Bayar tunai kepada supir/kurir toko setelah barang dicek</span>
                    </div>
                  </div>
                  <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700">Bayar Tunai</span>
                </label>
              </div>
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Catatan Tambahan untuk Petugas Gudang</label>
              <input type="text" id="order-notes" placeholder="Misal: Kirim sebelum jam 12 siang, patokan depan gang..." class="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg" />
            </div>

            <div class="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
              <button type="button" onclick="App.closeModal('shop-checkout-modal')" class="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg">Batal</button>
              <button type="submit" class="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm shadow-md transition flex items-center gap-2">
                <i class="fa-solid fa-check"></i> Konfirmasi & Lanjut Pembayaran
              </button>
            </div>
          </form>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', checkoutModalHtml);
  },

  submitOrder: function(event) {
    event.preventDefault();
    const data = Storage.getData();
    const cust = Storage.getCustomerAccount() || {};

    const customerName = document.getElementById("order-cust-name").value.trim();
    const customerPhone = document.getElementById("order-cust-phone").value.trim();
    const customerAddress = document.getElementById("order-cust-address").value.trim();
    const deliveryMethod = document.getElementById("order-delivery").value;
    const paymentRadio = document.querySelector('input[name="order_payment_method"]:checked');
    const paymentMethod = paymentRadio ? paymentRadio.value : "QRIS";
    const notes = document.getElementById("order-notes").value.trim();

    const nowObj = new Date();
    const year = nowObj.getFullYear();
    const month = String(nowObj.getMonth() + 1).padStart(2, '0');
    const day = String(nowObj.getDate()).padStart(2, '0');
    const hours = String(nowObj.getHours()).padStart(2, '0');
    const mins = String(nowObj.getMinutes()).padStart(2, '0');
    const orderDate = `${year}-${month}-${day} ${hours}:${mins}`;
    const dateOnly = `${year}-${month}-${day}`;

    const randSuffix = Math.floor(100 + Math.random() * 900);
    const orderId = "ORD-" + `${year}${month}${day}` + "-" + randSuffix;

    const orderItems = this.cart.map(it => {
      const p = data.shopProducts.find(prod => prod.id === it.productId);
      const price = p ? this.getPriceForQty(p, it.qty) : 0;
      return {
        productId: it.productId,
        sku: p ? p.sku : "",
        name: it.name,
        qty: Number(it.qty) || 1,
        unit: it.unit || (p ? p.unit : "Pack"),
        price: price,
        subtotal: price * (Number(it.qty) || 1)
      };
    });

    const totalAmount = orderItems.reduce((s, i) => s + i.subtotal, 0);

    const newOrder = {
      id: orderId,
      customerName, 
      customerPhone, 
      customerAddress, 
      customerGoogleEmail: cust.googleEmail || "",
      deliveryMethod, 
      paymentMethod, 
      paymentStatus: paymentMethod === "COD" ? "Bayar di Tempat (COD)" : (paymentMethod === "QRIS" ? "Lunas / Terverifikasi" : "Menunggu Pembayaran"),
      notes,
      items: orderItems,
      totalAmount,
      status: "Menunggu Konfirmasi",
      orderDate,
      progressPercent: 15,
      vehicle: deliveryMethod.includes("Truk") ? "Truk Toko GBA 1 (CDD Box)" : deliveryMethod,
      plateNumber: "B 9821 GBA",
      driverName: "Bpk. Joko Santoso (Tim Distribusi)",
      driverPhone: "0813-8877-6655",
      estimatedArrival: "Estimasi setelah proses packing gudang selesai",
      checkpoints: [
        {
          time: orderDate,
          title: "Pesanan Baru Masuk ke Sistem",
          location: "Online Shop Toko Grosir",
          desc: `Pesanan telah diterima via ${paymentMethod}. Segera diproses oleh staf gudang dan divisi pengiriman.`
        }
      ]
    };

    if (!data.orders) data.orders = [];
    data.orders.unshift(newOrder);

    // Store last order ID for easy 1-click tracking
    localStorage.setItem("GBA_LAST_ORDER_ID", orderId);

    // ========================================================
    // 1. PENGURANGAN STOK KATALOG & SINKRONISASI STOK FITUR WMS
    // ========================================================
    if (!data.wmsItems) data.wmsItems = [];
    if (!data.wmsLogs) data.wmsLogs = [];

    orderItems.forEach(it => {
      const qtyPurchased = Number(it.qty) || 1;

      // A. Kurangi stok di katalog Online Shop
      const prod = data.shopProducts.find(p => p.id === it.productId || (it.sku && p.sku === it.sku) || (p.name && p.name.trim().toLowerCase() === it.name.trim().toLowerCase()));
      if (prod) {
        const prevShopStock = Number(prod.stock) || 0;
        prod.stock = Math.max(0, prevShopStock - qtyPurchased);
      }

      // B. Cari barang di fitur WMS (wmsItems) atau masukkan otomatis jika belum terdaftar di WMS
      let wmsItem = data.wmsItems.find(w => 
        (it.sku && w.sku && w.sku === it.sku) ||
        (prod && prod.sku && w.sku && w.sku === prod.sku) ||
        (w.name && w.name.trim().toLowerCase() === it.name.trim().toLowerCase()) ||
        (it.productId && w.id === it.productId)
      );

      let prevWmsStock = 0;
      if (wmsItem) {
        prevWmsStock = Number(wmsItem.stock) || 0;
        wmsItem.stock = Math.max(0, prevWmsStock - qtyPurchased);

        // Perbarui status peringatan stok WMS
        const minS = Number(wmsItem.minStock) || 10;
        if (wmsItem.stock <= (minS / 2)) {
          wmsItem.status = "Kritis";
        } else if (wmsItem.stock <= minS) {
          wmsItem.status = "Menipis";
        } else {
          wmsItem.status = "Aman";
        }
      } else {
        // Jika belum tercatat di WMS, daftarkan otomatis ke Master Barang WMS
        const cat = prod ? (prod.category || "Sembako") : "Sembako";
        const rackLetter = cat === "Sembako" ? "A" : cat === "Makanan & Snack" ? "B" : cat === "Minuman" ? "C" : "D";
        const rackNum = String(Math.floor(1 + Math.random() * 5)).padStart(2, '0');
        const remainingStock = prod ? Number(prod.stock) : Math.max(0, 50 - qtyPurchased);
        prevWmsStock = remainingStock + qtyPurchased;

        wmsItem = {
          id: "WMS-" + String((data.wmsItems.length || 0) + 1).padStart(3, '0'),
          name: it.name,
          sku: it.sku || (prod && prod.sku ? prod.sku : ("SKU-" + Math.floor(1000000000 + Math.random() * 9000000000))),
          category: cat,
          rack: `Rak ${rackLetter}-${rackNum}-01`,
          zone: `Zona ${rackLetter} (${cat})`,
          stock: remainingStock,
          minStock: 10,
          unit: it.unit || "Pack",
          status: remainingStock <= 5 ? "Kritis" : remainingStock <= 10 ? "Menipis" : "Aman",
          image: prod ? prod.image : (it.image || "https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=500&auto=format&fit=crop&q=80"),
          supplier: "Distributor Resmi " + cat,
          batchNo: "BATCH-" + dateOnly.replace(/-/g, ""),
          expDate: "2028-12-31",
          notes: prod ? prod.description : "Barang master tersinkronisasi otomatis dari Online Shop"
        };
        data.wmsItems.unshift(wmsItem);
      }

      // C. Catat Riwayat Mutasi Keluar (OUTBOUND) di WMS secara otomatis
      data.wmsLogs.unshift({
        id: "LOG-" + Date.now() + "-" + Math.floor(100 + Math.random() * 900),
        date: orderDate,
        type: "OUTBOUND",
        itemId: wmsItem.id,
        itemName: it.name,
        sku: wmsItem.sku,
        qty: `-${qtyPurchased} ${it.unit}`,
        refDoc: orderId,
        operator: `Sistem Online Shop (${customerName})`,
        notes: `Pengeluaran barang otomatis atas pesanan #${orderId}. Pembeli: ${customerName}. Metode: ${paymentMethod}. Sisa stok fisik gudang: ${wmsItem.stock} ${it.unit}.`
      });
    });

    // ========================================================
    // 2. OTOMATIS MEMBUAT DOKUMEN FAKTUR PENJUALAN DI DOKUMEN
    // ========================================================
    if (!data.documents) data.documents = [];

    const invoiceNumber = `INV/GBA/${year}/${month}/${orderId.split('-')[2] || randSuffix}`;
    const invoiceDoc = {
      id: "DOC-INV-" + orderId,
      docNumber: invoiceNumber,
      refDoc: orderId,
      refOrder: orderId,
      type: "Faktur Penjualan",
      date: dateOnly, // Tanggal ketika customer memesan barang (YYYY-MM-DD)
      orderTimestamp: orderDate, // Tanggal & waktu lengkap saat customer memesan
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
      clientName: customerName,
      clientPhone: customerPhone,
      clientAddress: customerAddress,
      paymentStatus: paymentMethod === "QRIS" ? "LUNAS" : (paymentMethod.includes("COD") ? "COD / BELUM LUNAS" : "MENUNGGU PEMBAYARAN"),
      paymentMethod: paymentMethod,
      items: orderItems.map(i => ({
        name: i.name,
        qty: i.qty,
        unit: i.unit,
        price: i.price,
        subtotal: i.subtotal
      })),
      discount: 0,
      taxPercent: 0,
      taxAmount: 0,
      grandTotal: totalAmount,
      notes: `Faktur Penjualan Resmi atas Pesanan Online Shop #${orderId}. Diterbitkan pada ${orderDate}. Pembeli: ${customerName} (Google: ${cust.googleEmail || '-'}). Alamat Pengiriman: ${customerAddress}. Pengiriman: ${deliveryMethod}. Catatan: ${notes || '-'}`,
      signatureName: "Bagian Penjualan & Kasir Grosir",
      attachmentUrl: ""
    };

    data.documents.unshift(invoiceDoc);

    Storage.saveData(data);
    if (typeof Storage !== 'undefined' && Storage.saveOrder) Storage.saveOrder(newOrder);
    if (typeof Storage !== 'undefined' && Storage.saveDocument) Storage.saveDocument(invoiceDoc);

    this.cart = [];
    App.closeModal('shop-checkout-modal');
    this.render();

    App.showToast(`Pesanan #${orderId} berhasil dibuat! Faktur penjualan otomatis diterbitkan & stok gudang WMS telah diperbarui.`, "success");

    // Show comprehensive payment modal
    this.showOrderPaymentModal(newOrder);
  },

  // COMPREHENSIVE PAYMENT MODAL (COD, TRANSFER BANK, QRIS) WITH DIRECT EMPLOYEE PROCESS BUTTON
  showOrderPaymentModal: function(order) {
    const isQris = order.paymentMethod === "QRIS";
    const isTransfer = order.paymentMethod === "Transfer Bank";
    const isCod = order.paymentMethod === "COD";

    const qrisDataUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent("GBA-QRIS-" + order.id + "-" + order.totalAmount)}`;

    const paymentModalHtml = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop" id="order-payment-modal">
        <div class="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden modal-content-scale max-h-[94vh] flex flex-col">
          
          <!-- Header -->
          <div class="px-6 py-4 bg-gradient-to-r from-emerald-600 to-teal-700 text-white flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              <div class="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-lg">
                <i class="fa-solid fa-receipt"></i>
              </div>
              <div>
                <h3 class="text-base font-bold">Proses Pembayaran Pesanan</h3>
                <p class="text-xs text-emerald-100 font-mono">${order.id}</p>
              </div>
            </div>
            <button onclick="App.closeModal('order-payment-modal')" class="text-white/80 hover:text-white text-lg">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>

          <!-- Body Content -->
          <div class="p-6 overflow-y-auto space-y-4 flex-1">
            
            <!-- Amount Banner -->
            <div class="bg-slate-900 text-white p-4 rounded-xl text-center shadow-xs">
              <span class="text-[11px] uppercase font-bold text-slate-400 tracking-wider block">Total yang Harus Dibayar</span>
              <h2 class="text-2xl font-black text-amber-400 font-mono mt-0.5">${Util.formatRupiah(order.totalAmount)}</h2>
              <div class="text-xs text-slate-300 mt-1 flex items-center justify-center gap-2">
                <span>Metode: <b class="text-white">${order.paymentMethod}</b></span>
                <span>•</span>
                <span>${(order.items || []).length} Jenis Barang</span>
              </div>
            </div>

            <!-- PAYMENT DETAILS BASED ON METHOD -->
            ${isQris ? `
              <!-- QRIS DISPLAY -->
              <div class="bg-slate-50 border border-slate-200 p-4 rounded-xl text-center space-y-3">
                <div class="inline-flex items-center gap-2 px-3 py-1 bg-rose-600 text-white font-black text-xs rounded uppercase tracking-wider">
                  <i class="fa-solid fa-qrcode"></i> QRIS STANDAR INDONESIA
                </div>
                <div class="bg-white p-4 rounded-xl border border-slate-200 inline-block shadow-sm">
                  <img src="${qrisDataUrl}" alt="QRIS Code" class="w-48 h-48 mx-auto object-contain rounded" />
                </div>
                <div class="text-xs space-y-1">
                  <p class="font-bold text-slate-800">Merchant: GROSIR BERKAH ABADI</p>
                  <p class="text-slate-500 font-mono text-[11px]">NMID: ID1020304918239</p>
                  <p class="text-[11px] text-amber-700 font-semibold bg-amber-50 py-1 px-2 rounded border border-amber-200 inline-block">
                    <i class="fa-regular fa-clock mr-1"></i> Berlaku 15 Menit. Buka aplikasi M-Banking / E-Wallet Anda dan scan kode QR di atas.
                  </p>
                </div>
                <button 
                  onclick="Shop.confirmPayment('${order.id}')"
                  class="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-sm transition flex items-center justify-center gap-2"
                >
                  <i class="fa-solid fa-circle-check"></i> Saya Sudah Scan & Bayar QRIS
                </button>
              </div>
            ` : isTransfer ? `
              <!-- TRANSFER BANK DISPLAY -->
              <div class="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-3 text-xs">
                <div class="flex items-center justify-between">
                  <span class="font-bold text-slate-800 uppercase flex items-center gap-1.5">
                    <i class="fa-solid fa-building-columns text-blue-600"></i> Rekening Resmi Transfer Bank
                  </span>
                  <span class="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded">Verifikasi Otomatis</span>
                </div>

                <!-- Bank BCA -->
                <div class="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <span class="font-black text-blue-700 text-sm block">BANK BCA</span>
                    <span class="font-mono font-bold text-slate-900 text-sm">8720-1928-33</span>
                    <span class="text-[10px] text-slate-500 block">a/n PT Grosir Berkah Abadi</span>
                  </div>
                  <button 
                    type="button" 
                    onclick="navigator.clipboard.writeText('8720192833'); App.showToast('No Rekening BCA berhasil disalin!', 'info');"
                    class="px-2.5 py-1.5 bg-slate-100 hover:bg-blue-50 text-blue-700 rounded-lg text-xs font-bold border border-slate-200"
                  >
                    <i class="fa-regular fa-copy"></i> Salin
                  </button>
                </div>

                <!-- Bank Mandiri -->
                <div class="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <span class="font-black text-amber-600 text-sm block">BANK MANDIRI</span>
                    <span class="font-mono font-bold text-slate-900 text-sm">137-00-9821-443</span>
                    <span class="text-[10px] text-slate-500 block">a/n PT Grosir Berkah Abadi</span>
                  </div>
                  <button 
                    type="button" 
                    onclick="navigator.clipboard.writeText('137009821443'); App.showToast('No Rekening Mandiri berhasil disalin!', 'info');"
                    class="px-2.5 py-1.5 bg-slate-100 hover:bg-blue-50 text-blue-700 rounded-lg text-xs font-bold border border-slate-200"
                  >
                    <i class="fa-regular fa-copy"></i> Salin
                  </button>
                </div>

                <button 
                  onclick="Shop.confirmPayment('${order.id}')"
                  class="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs shadow-sm transition flex items-center justify-center gap-2 mt-2"
                >
                  <i class="fa-solid fa-circle-check"></i> Konfirmasi Saya Sudah Transfer
                </button>
              </div>
            ` : `
              <!-- COD DISPLAY -->
              <div class="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-xs space-y-2 text-emerald-950">
                <div class="flex items-center gap-2 font-bold text-sm text-emerald-800">
                  <i class="fa-solid fa-hand-holding-dollar text-xl"></i>
                  <span>Pembayaran di Tempat (COD) Berhasil Didaftarkan</span>
                </div>
                <p class="leading-relaxed text-slate-600">
                  Pesanan Anda akan langsung dipacking oleh staf gudang dan dibawa oleh armada truk toko. Harap siapkan uang tunai sebesar <b class="text-slate-900 font-mono">${Util.formatRupiah(order.totalAmount)}</b> saat pesanan tiba di alamat Anda.
                </p>
              </div>
            `}

            <!-- DIRECT EMPLOYEE PROCESSING BUTTON (HIGH-PRIORITY USER REQUIREMENT) -->
            <div class="bg-gradient-to-br from-indigo-50 to-blue-50 p-4 rounded-xl border border-indigo-200 shadow-xs">
              <div class="flex items-center justify-between mb-2">
                <span class="text-xs font-bold text-indigo-900 flex items-center gap-1.5">
                  <i class="fa-solid fa-bolt text-amber-500"></i> Handoff Cepat ke Petugas Gudang:
                </span>
                <span class="text-[10px] font-bold bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded">Khusus Admin</span>
              </div>
              <p class="text-[11px] text-slate-600 mb-3 leading-relaxed">
                Ingin langsung memproses status packing gudang, penugasan armada supir, dan cetak surat jalan pesanan ini?
              </p>
              <button 
                onclick="Shop.directEmployeeProcess('${order.id}')"
                class="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs shadow-md transition flex items-center justify-center gap-2"
              >
                <i class="fa-solid fa-clipboard-check text-amber-300"></i> ⚡ Proses Pesanan Ini Sekarang (Khusus Admin)
              </button>
            </div>

            <!-- General Action Buttons -->
            <div class="space-y-2 pt-2">
              <button 
                onclick="App.closeModal('order-payment-modal'); Documents.previewInvoice('${order.id}');"
                class="w-full py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-xl font-bold text-xs shadow-xs transition flex items-center justify-center gap-2"
              >
                <i class="fa-solid fa-file-invoice text-indigo-600"></i> Cetak / Lihat Faktur Penjualan (${order.id})
              </button>
              <button 
                onclick="App.closeModal('order-payment-modal'); Orders.openCustomerTrackingModal('${order.id}');"
                class="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
              >
                <i class="fa-solid fa-truck-fast"></i> Lacak Pengiriman (Live Map)
              </button>
              <button 
                onclick="App.closeModal('order-payment-modal'); Shop.render();"
                class="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs transition"
              >
                Kembali ke Belanja Grosir
              </button>
            </div>

          </div>

        </div>
      </div>
    `;

    App.closeModal('order-payment-modal');
    document.body.insertAdjacentHTML('beforeend', paymentModalHtml);
  },

  confirmPayment: function(orderId) {
    const data = Storage.getData();
    const order = (data.orders || []).find(o => o.id === orderId);
    if (order) {
      order.paymentStatus = "Lunas / Terverifikasi";
      if (!order.checkpoints) order.checkpoints = [];
      order.checkpoints.unshift({
        time: new Date().toISOString().replace("T", " ").slice(0, 16),
        title: "Pembayaran Berhasil Dikonfirmasi",
        location: "Payment Gateway Grosir Berkah Abadi",
        desc: `Pembayaran pesanan ${order.id} via ${order.paymentMethod} telah diterima. Pesanan diteruskan ke meja packing gudang.`
      });

      // Sinkronisasi status LUNAS ke Dokumen Faktur Penjualan
      const doc = (data.documents || []).find(d => d.id === "DOC-INV-" + orderId || (d.refDoc && d.refDoc === orderId) || (d.notes && d.notes.includes(orderId)));
      if (doc) {
        doc.paymentStatus = "LUNAS";
      }

      Storage.saveData(data);
      if (typeof Storage !== 'undefined' && Storage.saveOrder) Storage.saveOrder(order);
      if (doc && typeof Storage !== 'undefined' && Storage.saveDocument) Storage.saveDocument(doc);

      App.showToast("Pembayaran berhasil dikonfirmasi! Faktur diperbarui menjadi LUNAS & pesanan siap dipacking.", "success");
      App.closeModal('order-payment-modal');
      Orders.openCustomerTrackingModal(orderId);
    }
  },

  directEmployeeProcess: function(orderId) {
    App.closeModal('order-payment-modal');
    App.closeModal('order-success-modal');
    if (Storage.isEmployee()) {
      Orders.openProcessOrderModal(orderId);
    } else {
      App.showToast("Akses Khusus Admin! Masukkan Akun Google dan password T1MELESS untuk memproses pesanan ini.", "info");
      App.openLoginModal('PROCESS_ORDER_' + orderId);
    }
  },

  // EMPLOYEE: PRODUCT CRUD MODAL
  openProductModal: function(productId = null) {
    const data = Storage.getData();
    let prod = {
      id: "",
      sku: "SKU-" + Math.floor(1000 + Math.random() * 9000),
      name: "",
      category: "Sembako",
      unit: "Dus",
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop&q=80",
      retailPrice: 150000,
      stock: 50,
      minOrder: 1,
      tiers: [
        { minQty: 1, maxQty: 9, price: 150000, label: "1 - 9 Dus" },
        { minQty: 10, maxQty: 29, price: 145000, label: "10 - 29 Dus" },
        { minQty: 30, maxQty: 999, price: 140000, label: "30+ Dus" }
      ],
      description: "",
      badge: ""
    };

    let isEdit = false;
    if (productId) {
      const found = data.shopProducts.find(p => p.id === productId);
      if (found) {
        prod = JSON.parse(JSON.stringify(found));
        isEdit = true;
      }
    }

    const modalHtml = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop" id="shop-prod-modal">
        <div class="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden modal-content-scale max-h-[92vh] flex flex-col">
          <div class="px-6 py-4 bg-gradient-to-r from-blue-700 to-emerald-700 text-white flex items-center justify-between">
            <h3 class="text-base font-bold flex items-center gap-2">
              <i class="fa-solid ${isEdit ? 'fa-pen-to-square' : 'fa-plus-circle'}"></i>
              ${isEdit ? 'Edit Produk Online Shop' : 'Tambah Produk Baru Online Shop'}
            </h3>
            <button onclick="App.closeModal('shop-prod-modal')" class="text-white/80 hover:text-white text-lg">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>

          <form onsubmit="Shop.saveProduct(event, '${prod.id}')" class="p-6 overflow-y-auto space-y-4">
            <!-- Image & Preview -->
            <div class="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div class="flex items-center justify-between mb-2">
                <label class="block text-xs font-bold uppercase text-slate-700">Foto / Gambar Produk</label>
                <div class="flex items-center gap-1.5">
                  <button type="button" onclick="App.pasteFromClipboard('shop-prod-image-url', 'shop-prod-img-preview')" class="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-md text-xs font-bold border border-blue-200 flex items-center gap-1 transition" title="Tempel link yang disalin dari Chrome atau Google">
                    <i class="fa-solid fa-paste"></i> Tempel Link (Chrome / Web)
                  </button>
                  <button type="button" onclick="App.copyToClipboard(document.getElementById('shop-prod-image-url').value)" class="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-md text-xs font-semibold border border-slate-300" title="Salin link foto saat ini">
                    <i class="fa-solid fa-copy"></i>
                  </button>
                </div>
              </div>
              <div class="flex items-center gap-4">
                <img id="shop-prod-img-preview" src="${prod.image || 'https://via.placeholder.com/100'}" class="w-20 h-20 rounded-xl object-cover border border-slate-300 shadow-sm" onerror="this.src='https://via.placeholder.com/100?text=Produk'" />
                <div class="flex-1 space-y-2">
                  <div class="flex items-center gap-2">
                    <input type="file" accept="image/*" onchange="Shop.handleProductImageUpload(event)" class="text-xs text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer" />
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-xs text-slate-500 font-medium whitespace-nowrap"><i class="fa-solid fa-link text-blue-500"></i> Link URL:</span>
                    <input 
                      type="text" 
                      id="shop-prod-image-url" 
                      value="${Util.escapeHtml(prod.image || '')}" 
                      oninput="App.handleImageUrlInput(this, 'shop-prod-img-preview')" 
                      placeholder="Tempel link foto produk dari Chrome, Google, atau web..." 
                      class="flex-1 text-xs px-2.5 py-1.5 border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-500" 
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Nama Produk Grosir *</label>
                <input type="text" id="shop-prod-name" required value="${Util.escapeHtml(prod.name)}" class="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg" />
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Kode SKU *</label>
                <input type="text" id="shop-prod-sku" required value="${Util.escapeHtml(prod.sku)}" class="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg font-mono" />
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Kategori</label>
                <select id="shop-prod-category" class="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg bg-white">
                  <option value="Sembako" ${prod.category === 'Sembako' ? 'selected' : ''}>Sembako</option>
                  <option value="Makanan & Snack" ${prod.category === 'Makanan & Snack' ? 'selected' : ''}>Makanan & Snack</option>
                  <option value="Minuman" ${prod.category === 'Minuman' ? 'selected' : ''}>Minuman</option>
                  <option value="Kebersihan" ${prod.category === 'Kebersihan' ? 'selected' : ''}>Kebersihan</option>
                  <option value="Plastik & Kemasan" ${prod.category === 'Plastik & Kemasan' ? 'selected' : ''}>Plastik & Kemasan</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Satuan Kemasan</label>
                <input type="text" id="shop-prod-unit" value="${Util.escapeHtml(prod.unit)}" placeholder="Dus, Sak, Bal" class="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg" />
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Stok Tersedia</label>
                <input type="number" id="shop-prod-stock" value="${prod.stock}" min="0" class="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg font-bold" />
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Badge Promo (Opsional)</label>
                <input type="text" id="shop-prod-badge" value="${Util.escapeHtml(prod.badge || '')}" placeholder="BEST SELLER / DISKON" class="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg" />
              </div>
            </div>

            <!-- Single Price Editor (1 Tingkatan Harga) -->
            <div class="border border-slate-200 rounded-xl p-4 bg-blue-50/50 space-y-2">
              <label class="block text-xs font-bold uppercase text-blue-900 flex items-center gap-1.5">
                <i class="fa-solid fa-tag text-blue-600"></i> Harga Produk UMKM (1 Tingkatan Harga Satuan) *
              </label>
              
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div class="bg-white p-3 rounded-lg border border-slate-200">
                  <label class="block text-xs font-bold text-slate-700 mb-1">Harga Satuan Jual (Rp) *</label>
                  <input 
                    type="number" 
                    id="shop-prod-price" 
                    required 
                    min="100" 
                    value="${prod.price || prod.retailPrice || (prod.tiers?.[0]?.price || 10000)}" 
                    placeholder="Contoh: 21650" 
                    class="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg font-bold text-blue-700 font-mono focus:ring-2 focus:ring-blue-500" 
                  />
                </div>

                <div class="bg-white p-3 rounded-lg border border-slate-200 flex flex-col justify-center">
                  <span class="text-xs font-bold text-slate-700 mb-0.5">Skema 1 Tingkat Harga</span>
                  <p class="text-xs text-slate-500 leading-relaxed">
                    Sistem menggunakan <b>1 tingkatan harga</b> tetap untuk semua jumlah pesanan UMKM.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Deskripsi / Spesifikasi Produk UMKM</label>
              <textarea id="shop-prod-desc" rows="3" class="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg">${Util.escapeHtml(prod.description || '')}</textarea>
            </div>

            <div class="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
              <button type="button" onclick="App.closeModal('shop-prod-modal')" class="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg">Batal</button>
              <button type="submit" class="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-sm shadow-sm transition flex items-center gap-1.5">
                <i class="fa-solid fa-floppy-disk"></i> Simpan Produk
              </button>
            </div>
          </form>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
  },

  handleProductImageUpload: async function(event) {
    const file = event.target.files[0];
    if (!file) return;
    try {
      const base64 = await Storage.fileToBase64(file);
      document.getElementById('shop-prod-img-preview').src = base64;
      document.getElementById('shop-prod-image-url').value = base64;
      App.showToast("Foto produk berhasil dimuat!", "info");
    } catch (e) {
      App.showToast("Gagal memuat foto: " + e.message, "error");
    }
  },

  saveProduct: function(event, existingId) {
    event.preventDefault();
    const data = Storage.getData();

    const name = document.getElementById("shop-prod-name").value.trim();
    const sku = document.getElementById("shop-prod-sku").value.trim();
    const category = document.getElementById("shop-prod-category").value;
    const unit = document.getElementById("shop-prod-unit").value.trim() || "Dus";
    const stock = Number(document.getElementById("shop-prod-stock").value) || 0;
    const badge = document.getElementById("shop-prod-badge").value.trim();
    const image = document.getElementById("shop-prod-image-url").value.trim() || "https://via.placeholder.com/400?text=" + encodeURIComponent(name);
    const description = document.getElementById("shop-prod-desc").value.trim();
    const price = Number(document.getElementById("shop-prod-price").value) || 0;

    const tiers = [
      { minQty: 1, maxQty: 99999, price: price, label: "Harga Grosir Satuan" }
    ];

    const prodObj = {
      id: existingId || ("SHOP-" + Math.floor(100 + Math.random() * 900)),
      sku, name, category, unit, image,
      price: price,
      retailPrice: price,
      stock,
      minOrder: 1,
      tiers,
      description,
      badge
    };

    if (existingId) {
      const idx = data.shopProducts.findIndex(p => p.id === existingId);
      if (idx !== -1) data.shopProducts[idx] = prodObj;
    } else {
      if (!data.shopProducts) data.shopProducts = [];
      data.shopProducts.push(prodObj);
    }

    Storage.saveData(data);

    App.closeModal('shop-prod-modal');
    App.showToast(`Produk "${name}" berhasil disimpan!`, "success");
    this.render();

    // Sinkronkan ke Supabase Cloud setelah UI di-render (async background)
    if (typeof Storage !== 'undefined' && Storage.saveProduct) {
      Storage._pendingProductSave = prodObj.id; // tandai agar realtime echo tidak re-render ulang
      Storage.saveProduct(prodObj).catch(e => console.warn("Gagal sync produk ke cloud:", e));
    }
  },

  deleteProduct: function(productId) {
    const data = Storage.getData();
    const prod = data.shopProducts.find(p => p.id === productId);
    if (!prod) return;

    if (confirm(`Apakah Anda yakin ingin menghapus produk "${prod.name}" dari Online Shop?`)) {
      data.shopProducts = data.shopProducts.filter(p => p.id !== productId);
      Storage.saveData(data);
      if (typeof Storage !== 'undefined' && Storage.deleteProduct) Storage.deleteProduct(productId);

      App.showToast(`Produk "${prod.name}" berhasil dihapus.`, "info");
      this.render();
    }
  },

  // EMPLOYEE: BANNER EDIT MODAL
  openBannerEditModal: function() {
    const data = Storage.getData();
    const profile = data.profile || {};

    const modalHtml = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop" id="shop-banner-modal">
        <div class="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden modal-content-scale">
          <div class="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
            <h3 class="text-base font-bold flex items-center gap-2">
              <i class="fa-solid fa-image text-amber-400"></i> Edit Banner Promo Toko Online
            </h3>
            <button onclick="App.closeModal('shop-banner-modal')" class="text-white/80 hover:text-white text-lg">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>

          <form onsubmit="Shop.saveBanner(event)" class="p-6 space-y-4">
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Badge Teks Promo</label>
              <input type="text" id="banner-badge-input" value="${Util.escapeHtml(profile.bannerBadge || '')}" class="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg" placeholder="DISKON SPESIAL BULAN INI" />
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Judul Utama Banner *</label>
              <input type="text" id="banner-title-input" required value="${Util.escapeHtml(profile.bannerTitle || '')}" class="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg font-bold" />
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Subjudul / Deskripsi Promo</label>
              <textarea id="banner-subtitle-input" rows="2" class="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg">${Util.escapeHtml(profile.bannerSubtitle || '')}</textarea>
            </div>

            <div>
              <div class="flex items-center justify-between mb-1">
                <label class="block text-xs font-semibold text-slate-700">Upload / Ganti Gambar Latar Banner</label>
                <div class="flex items-center gap-1.5">
                  <button type="button" onclick="App.pasteFromClipboard('banner-image-url', 'banner-img-preview')" class="px-2.5 py-0.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded text-xs font-bold border border-blue-200 flex items-center gap-1">
                    <i class="fa-solid fa-paste"></i> Tempel Link (Chrome)
                  </button>
                  <button type="button" onclick="App.copyToClipboard(document.getElementById('banner-image-url').value)" class="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded text-xs">
                    <i class="fa-solid fa-copy"></i>
                  </button>
                </div>
              </div>
              <div class="space-y-2">
                <img id="banner-img-preview" src="${profile.bannerImage || ''}" class="w-full h-24 object-cover rounded-lg border border-slate-300" onerror="this.src='https://via.placeholder.com/800x300?text=Banner+Promo'" />
                <input type="file" accept="image/*" onchange="Shop.handleBannerImageUpload(event)" class="text-xs text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer" />
                <input 
                  type="text" 
                  id="banner-image-url" 
                  value="${Util.escapeHtml(profile.bannerImage || '')}" 
                  oninput="App.handleImageUrlInput(this, 'banner-img-preview')" 
                  placeholder="Tempel link foto banner dari Chrome / Google..." 
                  class="w-full text-xs px-2.5 py-1.5 border border-slate-300 rounded-lg" 
                />
              </div>
            </div>

            <div class="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
              <button type="button" onclick="App.closeModal('shop-banner-modal')" class="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg">Batal</button>
              <button type="submit" class="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-sm">
                Simpan Perubahan Banner
              </button>
            </div>
          </form>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
  },

  handleBannerImageUpload: async function(event) {
    const file = event.target.files[0];
    if (!file) return;
    try {
      const base64 = await Storage.fileToBase64(file, 1200, 600, 0.75);
      document.getElementById('banner-image-url').value = base64;
      App.showToast("Foto banner berhasil dimuat!", "info");
    } catch (e) {
      App.showToast("Gagal memuat foto banner: " + e.message, "error");
    }
  },

  saveBanner: function(event) {
    event.preventDefault();
    const data = Storage.getData();
    if (!data.profile) data.profile = {};

    data.profile.bannerBadge = document.getElementById("banner-badge-input").value.trim();
    data.profile.bannerTitle = document.getElementById("banner-title-input").value.trim();
    data.profile.bannerSubtitle = document.getElementById("banner-subtitle-input").value.trim();
    data.profile.bannerImage = document.getElementById("banner-image-url").value.trim();

    Storage.saveData(data);
    App.closeModal('shop-banner-modal');
    App.showToast("Banner promo toko online berhasil diperbarui!", "success");
    this.render();
  }
};
