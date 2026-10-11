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
            <i class="fa-solid fa-store text-blue-600"></i> Katalog Produk Grosir
            <span class="text-sm font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">${totalItems} Produk</span>
          </h3>
          <p class="text-xs text-slate-500">Harga otomatis semakin murah untuk pembelian kuantitas lebih banyak (Tiered Wholesale Price).</p>
        </div>

        <div class="flex flex-wrap items-center gap-3">
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

          <!-- Employee: Add Product -->
          ${isEmployee ? `
            <button onclick="Shop.openProductModal()" class="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm shadow-md transition flex items-center gap-1.5">
              <i class="fa-solid fa-plus"></i> Tambah Produk Shop
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
            placeholder="Cari kode, nama, varian produk..." 
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
          const defaultTier = product.tiers && product.tiers.length > 0 ? product.tiers[0] : { price: product.retailPrice, label: "Eceran" };
          const lowestTier = product.tiers && product.tiers.length > 0 ? product.tiers[product.tiers.length - 1] : defaultTier;

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

                  <!-- Tiered Price Info Box -->
                  <div class="bg-blue-50/70 border border-blue-100 rounded-xl p-2.5 mb-3">
                    <div class="flex items-baseline justify-between">
                      <span class="text-[11px] text-slate-500 font-medium">Mulai Dari:</span>
                      <span class="text-base font-extrabold text-blue-700 font-mono">${Util.formatRupiah(lowestTier.price)}<span class="text-[10px] font-normal text-slate-500">/${product.unit.split(' ')[0]}</span></span>
                    </div>
                    <div class="text-[10px] text-slate-500 flex items-center justify-between mt-1 pt-1 border-t border-blue-100">
                      <span>Harga Ecer: ${Util.formatRupiah(defaultTier.price)}</span>
                      <span class="font-bold text-emerald-700">Tersedia ${product.tiers ? product.tiers.length : 1} Tier Grosir</span>
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

  // Calculate price based on item quantity and tiered pricing
  getPriceForQty: function(product, qty) {
    if (!product.tiers || product.tiers.length === 0) {
      return product.retailPrice;
    }
    for (let i = product.tiers.length - 1; i >= 0; i--) {
      const tier = product.tiers[i];
      if (qty >= tier.minQty) {
        return tier.price;
      }
    }
    return product.retailPrice;
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

            <!-- Tiered Price Table -->
            <div class="bg-blue-50/70 border border-blue-200 rounded-xl p-4">
              <h4 class="text-xs font-bold uppercase text-blue-900 mb-2 flex items-center gap-1.5">
                <i class="fa-solid fa-tags text-blue-600"></i> Skema Harga Grosir Bertingkat (Tiered Pricing)
              </h4>
              <table class="w-full text-xs text-left">
                <thead class="text-slate-600 border-b border-blue-200">
                  <tr>
                    <th class="py-1.5 px-2">Kuantitas Pembelian</th>
                    <th class="py-1.5 px-2 text-right">Harga per ${product.unit.split(' ')[0]}</th>
                    <th class="py-1.5 px-2 text-right">Hemat / Diskon</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-blue-100">
                  ${(product.tiers || []).map((t, idx) => {
                    const savings = product.retailPrice - t.price;
                    return `
                      <tr class="font-medium">
                        <td class="py-2 px-2 text-slate-800">
                          <span class="font-bold text-blue-700">${t.label || `${t.minQty} - ${t.maxQty || '+'} ${product.unit}`}</span>
                        </td>
                        <td class="py-2 px-2 text-right font-mono font-bold text-slate-900">
                          ${Util.formatRupiah(t.price)}
                        </td>
                        <td class="py-2 px-2 text-right font-semibold text-emerald-600">
                          ${savings > 0 ? `Hemat ${Util.formatRupiah(savings)}` : 'Harga Normal'}
                        </td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
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
                  const normalSubtotal = product.retailPrice * item.qty;
                  const savings = normalSubtotal - subtotal;

                  return `
                    <div class="p-3 bg-white flex items-center justify-between gap-3">
                      <img src="${product.image || 'https://via.placeholder.com/60'}" class="w-14 h-14 rounded-lg object-cover border border-slate-200 flex-shrink-0" />
                      <div class="flex-1 min-w-0">
                        <h4 class="font-bold text-xs text-slate-800 truncate">${Util.escapeHtml(product.name)}</h4>
                        <p class="text-[11px] text-slate-500 font-mono">Harga Grosir: <span class="font-bold text-blue-700">${Util.formatRupiah(unitPrice)}</span> / ${product.unit.split(' ')[0]}</p>
                        ${savings > 0 ? `<span class="text-[10px] text-emerald-600 font-bold">Hemat Grosir: ${Util.formatRupiah(savings)}</span>` : ''}
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

  // OPEN CHECKOUT MODAL
  openCheckoutModal: function() {
    App.closeModal('shop-cart-modal');
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
            <div class="bg-blue-50 p-3 rounded-xl border border-blue-200 flex justify-between items-center text-xs">
              <span class="text-slate-600 font-medium">Total Tagihan (${this.cart.reduce((s,i)=>s+i.qty,0)} Barang):</span>
              <span class="text-base font-black text-blue-800 font-mono">${Util.formatRupiah(totalAmount)}</span>
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Nama Pemesan / Nama Toko Grosir *</label>
              <input type="text" id="order-cust-name" required placeholder="Contoh: Toko Sembako Barokah / Bpk. Hendra" class="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500" />
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Nomor WhatsApp Aktif *</label>
                <input type="text" id="order-cust-phone" required placeholder="0812-xxxx-xxxx" class="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500" />
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
              <textarea id="order-cust-address" required rows="2" class="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500" placeholder="Jl. Pasar Baru No. 45 RT 02/03, Kelurahan..."></textarea>
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Metode Pembayaran *</label>
              <select id="order-payment" class="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg bg-white font-medium text-slate-800">
                <option value="Transfer Bank BCA (Otomatis)">Transfer Bank BCA</option>
                <option value="Transfer Bank Mandiri">Transfer Bank Mandiri</option>
                <option value="Bayar di Tempat (COD Saat Barang Sampai)">Bayar di Tempat (COD Grosir)</option>
                <option value="Tempo Grosir 14 Hari (Khusus Member Terdaftar)">Tempo Grosir 14 Hari</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Catatan Tambahan untuk Petugas Gudang</label>
              <input type="text" id="order-notes" placeholder="Misal: Kirim sebelum jam 12 siang..." class="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg" />
            </div>

            <div class="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
              <button type="button" onclick="App.closeModal('shop-checkout-modal')" class="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg">Batal</button>
              <button type="submit" class="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm shadow-md transition flex items-center gap-2">
                <i class="fa-solid fa-check"></i> Konfirmasi & Kirim Pesanan
              </button>
            </div>
          </form>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
  },

  submitOrder: function(event) {
    event.preventDefault();
    const data = Storage.getData();

    const customerName = document.getElementById("order-cust-name").value.trim();
    const customerPhone = document.getElementById("order-cust-phone").value.trim();
    const customerAddress = document.getElementById("order-cust-address").value.trim();
    const deliveryMethod = document.getElementById("order-delivery").value;
    const paymentMethod = document.getElementById("order-payment").value;
    const notes = document.getElementById("order-notes").value.trim();

    const orderId = "ORD-" + new Date().toISOString().slice(0,10).replace(/-/g,"") + "-" + Math.floor(100+Math.random()*900);
    const orderDate = new Date().toISOString().replace("T", " ").slice(0, 16);

    const orderItems = this.cart.map(it => {
      const p = data.shopProducts.find(prod => prod.id === it.productId);
      const price = p ? this.getPriceForQty(p, it.qty) : 0;
      return {
        name: it.name,
        qty: it.qty,
        unit: it.unit,
        price: price,
        subtotal: price * it.qty
      };
    });

    const totalAmount = orderItems.reduce((s, i) => s + i.subtotal, 0);

    const newOrder = {
      id: orderId,
      customerName, customerPhone, customerAddress, deliveryMethod, paymentMethod, notes,
      items: orderItems,
      totalAmount,
      status: "Diproses",
      orderDate
    };

    if (!data.orders) data.orders = [];
    data.orders.unshift(newOrder);

    // Also automatically create a Faktur in Documents for seamless ERP flow!
    if (!data.documents) data.documents = [];
    data.documents.unshift({
      id: "DOC-INV-" + orderId,
      docNumber: `INV/GBA/${new Date().getFullYear()}/${String(new Date().getMonth()+1).padStart(2,'0')}/${orderId.split('-')[2]}`,
      type: "Faktur Penjualan",
      date: new Date().toISOString().slice(0,10),
      dueDate: new Date(Date.now() + 14*24*60*60*1000).toISOString().slice(0,10),
      clientName: customerName,
      clientPhone: customerPhone,
      clientAddress: customerAddress,
      paymentStatus: paymentMethod.includes("COD") ? "DIPROSES" : "LUNAS",
      paymentMethod: paymentMethod,
      items: orderItems,
      discount: 0,
      taxPercent: 0,
      taxAmount: 0,
      grandTotal: totalAmount,
      notes: `Pesanan Online Shop Grosir [${orderId}]. Pengiriman: ${deliveryMethod}. Catatan: ${notes}`,
      signatureName: "Bagian Pemesanan Grosir",
      attachmentUrl: ""
    });

    Storage.saveData(data);
    this.cart = [];
    App.closeModal('shop-checkout-modal');

    // Show order success modal
    this.showOrderSuccessModal(newOrder);
  },

  showOrderSuccessModal: function(order) {
    const successHtml = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop" id="order-success-modal">
        <div class="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden modal-content-scale p-6 text-center">
          <div class="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-3">
            <i class="fa-solid fa-circle-check"></i>
          </div>
          <h3 class="text-xl font-bold text-slate-800 mb-1">Pesanan Berhasil Dibuat!</h3>
          <p class="text-xs text-slate-500 mb-4 font-mono font-bold text-blue-700">${order.id}</p>
          <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 text-left text-xs space-y-1.5 mb-5">
            <div class="flex justify-between"><span class="text-slate-500">Pemesan:</span><span class="font-bold text-slate-800">${order.customerName}</span></div>
            <div class="flex justify-between"><span class="text-slate-500">WhatsApp:</span><span class="font-bold text-slate-800">${order.customerPhone}</span></div>
            <div class="flex justify-between"><span class="text-slate-500">Total Belanja:</span><span class="font-bold text-blue-700 font-mono">${Util.formatRupiah(order.totalAmount)}</span></div>
            <div class="flex justify-between"><span class="text-slate-500">Pengiriman:</span><span class="font-medium text-slate-700">${order.deliveryMethod}</span></div>
          </div>
          <p class="text-xs text-slate-500 mb-5 leading-relaxed">
            Tim sales & gudang kami akan segera memproses penyiapan barang dan menghubungi WhatsApp Anda untuk konfirmasi jadwal armada.
          </p>
          <button onclick="App.closeModal('order-success-modal'); Shop.render();" class="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-md transition">
            Kembali ke Belanja Grosir
          </button>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', successHtml);
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

            <!-- Tiered Price Editor -->
            <div class="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-2">
              <label class="block text-xs font-bold uppercase text-blue-900">Setting 3 Tingkatan Harga Grosir (Tier Pricing)</label>
              
              <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div class="bg-white p-3 rounded-lg border border-slate-200">
                  <p class="text-xs font-bold text-slate-600 mb-1">Tier 1 (Eceran / Min Order)</p>
                  <input type="text" id="tier-1-label" value="${prod.tiers?.[0]?.label || '1 - 9 Unit'}" placeholder="Label: 1-9 Dus" class="w-full text-xs px-2 py-1 border border-slate-300 rounded mb-1" />
                  <input type="number" id="tier-1-price" value="${prod.tiers?.[0]?.price || prod.retailPrice}" placeholder="Harga (Rp)" class="w-full text-xs px-2 py-1 border border-slate-300 rounded font-bold text-blue-700" />
                </div>

                <div class="bg-white p-3 rounded-lg border border-slate-200">
                  <p class="text-xs font-bold text-slate-600 mb-1">Tier 2 (Grosir Menengah)</p>
                  <input type="text" id="tier-2-label" value="${prod.tiers?.[1]?.label || '10 - 29 Unit'}" placeholder="Label: 10-29 Dus" class="w-full text-xs px-2 py-1 border border-slate-300 rounded mb-1" />
                  <input type="number" id="tier-2-price" value="${prod.tiers?.[1]?.price || Math.round(prod.retailPrice * 0.95)}" placeholder="Harga (Rp)" class="w-full text-xs px-2 py-1 border border-slate-300 rounded font-bold text-blue-700" />
                </div>

                <div class="bg-white p-3 rounded-lg border border-slate-200">
                  <p class="text-xs font-bold text-slate-600 mb-1">Tier 3 (Partai Besar)</p>
                  <input type="text" id="tier-3-label" value="${prod.tiers?.[2]?.label || '30+ Unit'}" placeholder="Label: 30+ Dus" class="w-full text-xs px-2 py-1 border border-slate-300 rounded mb-1" />
                  <input type="number" id="tier-3-price" value="${prod.tiers?.[2]?.price || Math.round(prod.retailPrice * 0.9)}" placeholder="Harga (Rp)" class="w-full text-xs px-2 py-1 border border-slate-300 rounded font-bold text-blue-700" />
                </div>
              </div>
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Deskripsi Lengkap Produk</label>
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

    const tier1Label = document.getElementById("tier-1-label").value.trim() || "1-9 Unit";
    const tier1Price = Number(document.getElementById("tier-1-price").value) || 100000;

    const tier2Label = document.getElementById("tier-2-label").value.trim() || "10-29 Unit";
    const tier2Price = Number(document.getElementById("tier-2-price").value) || 95000;

    const tier3Label = document.getElementById("tier-3-label").value.trim() || "30+ Unit";
    const tier3Price = Number(document.getElementById("tier-3-price").value) || 90000;

    const tiers = [
      { minQty: 1, maxQty: 9, price: tier1Price, label: tier1Label },
      { minQty: 10, maxQty: 29, price: tier2Price, label: tier2Label },
      { minQty: 30, maxQty: 999, price: tier3Price, label: tier3Label }
    ];

    const prodObj = {
      id: existingId || ("SHOP-" + Math.floor(100 + Math.random() * 900)),
      sku, name, category, unit, image,
      retailPrice: tier1Price,
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
  },

  deleteProduct: function(productId) {
    const data = Storage.getData();
    const prod = data.shopProducts.find(p => p.id === productId);
    if (!prod) return;

    if (confirm(`Apakah Anda yakin ingin menghapus produk "${prod.name}" dari Online Shop?`)) {
      data.shopProducts = data.shopProducts.filter(p => p.id !== productId);
      Storage.saveData(data);
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
