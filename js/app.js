/**
 * Main Application Controller (GROSIR BERKAH ABADI)
 * Handles Tab Navigation, Authentication (Role Switcher with Password 12344321),
 * Store Settings, Modals, Toasts, and Initialization
 */

const App = {
  currentTab: "shop", // Default tab is "shop"

  init: function() {
    // Initial sync
    this.updateHeaderUI();
    this.switchTab("shop");
    this.bindGlobalEvents();
  },

  bindGlobalEvents: function() {
    // Close modal on escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        const modals = document.querySelectorAll(".modal-backdrop");
        if (modals.length > 0) {
          modals[modals.length - 1].remove();
        }
      }
    });
  },

  // SWITCH NAVIGATION TABS
  switchTab: function(tabName) {
    const isEmployee = Storage.isEmployee();

    // Check if customer is trying to access protected tabs
    if (!isEmployee && tabName !== "shop") {
      this.openLoginModal(tabName);
      return;
    }

    this.currentTab = tabName;

    // Update active state in nav buttons
    const navButtons = document.querySelectorAll(".nav-tab-btn");
    navButtons.forEach(btn => {
      const target = btn.getAttribute("data-tab");
      if (target === tabName) {
        btn.classList.add("bg-blue-600", "text-white", "shadow-sm");
        btn.classList.remove("text-slate-600", "hover:bg-slate-100", "bg-transparent");
      } else {
        btn.classList.remove("bg-blue-600", "text-white", "shadow-sm");
        btn.classList.add("text-slate-600", "hover:bg-slate-100");
      }
    });

    // Hide all tab panels
    document.querySelectorAll(".tab-pane").forEach(pane => pane.classList.add("hidden"));

    // Show target panel & initialize module
    const activePane = document.getElementById(`${tabName}-panel`);
    if (activePane) {
      activePane.classList.remove("hidden");
    }

    if (tabName === "shop") {
      Shop.render();
    } else if (tabName === "wms") {
      WMS.render();
    } else if (tabName === "docs") {
      Documents.render();
    } else if (tabName === "inventory") {
      Inventory.render();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  // UPDATE HEADER & ROLE BADGES
  updateHeaderUI: function() {
    const isEmployee = Storage.isEmployee();
    const data = Storage.getData();
    const profile = data.profile || {};

    // Update store branding
    const nameEls = document.querySelectorAll(".store-brand-name");
    nameEls.forEach(el => el.textContent = profile.name || "GROSIR BERKAH ABADI");

    const taglineEls = document.querySelectorAll(".store-brand-tagline");
    taglineEls.forEach(el => el.textContent = profile.tagline || "Pusat Grosir & Sembako");

    const logoImg = document.getElementById("header-logo-img");
    if (logoImg && profile.logoUrl) {
      logoImg.src = profile.logoUrl;
    }

    // Role Indicator
    const roleBadge = document.getElementById("current-role-badge");
    const roleActionBtn = document.getElementById("role-action-btn");
    const lockIcons = document.querySelectorAll(".tab-lock-icon");

    if (isEmployee) {
      if (roleBadge) {
        roleBadge.innerHTML = `
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-300">
            <i class="fa-solid fa-user-shield text-emerald-600"></i> Mode: Pegawai Toko
          </span>
        `;
      }
      if (roleActionBtn) {
        roleActionBtn.innerHTML = `
          <button onclick="App.logout()" class="px-3.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold transition flex items-center gap-1.5">
            <i class="fa-solid fa-arrow-right-from-bracket"></i> Keluar (Mode Pelanggan)
          </button>
        `;
      }
      // Hide lock icons
      lockIcons.forEach(icon => icon.classList.add("hidden"));
    } else {
      if (roleBadge) {
        roleBadge.innerHTML = `
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
            <i class="fa-solid fa-user text-blue-600"></i> Mode: Pelanggan (Customer)
          </span>
        `;
      }
      if (roleActionBtn) {
        roleActionBtn.innerHTML = `
          <button onclick="App.openLoginModal()" class="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm transition flex items-center gap-1.5">
            <i class="fa-solid fa-key"></i> Login Pegawai
          </button>
        `;
      }
      // Show lock icons
      lockIcons.forEach(icon => icon.classList.remove("hidden"));
    }
  },

  // LOGIN MODAL (PASSWORD 12344321)
  openLoginModal: function(intendedTab = null) {
    const modalHtml = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop" id="auth-login-modal">
        <div class="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden modal-content-scale">
          <div class="px-6 py-4 bg-gradient-to-r from-blue-700 to-indigo-800 text-white flex items-center justify-between">
            <h3 class="text-base font-bold flex items-center gap-2">
              <i class="fa-solid fa-shield-halved text-amber-400"></i> Autentikasi Pegawai Toko
            </h3>
            <button onclick="App.closeModal('auth-login-modal')" class="text-white/80 hover:text-white text-lg">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>

          <form onsubmit="App.handleLogin(event, '${intendedTab || ''}')" class="p-6 space-y-4">
            <div class="text-center mb-2">
              <div class="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-2 border border-blue-200">
                <i class="fa-solid fa-lock"></i>
              </div>
              <h4 class="font-bold text-slate-800 text-base">Akses Khusus Pegawai & Staff</h4>
              <p class="text-xs text-slate-500 mt-1">
                Masukkan kode password keamanan pegawai untuk membuka akses penuh ke modul <b>WMS, Dokumen Faktur, Online Shop Editor, dan Inventaris Alat</b>.
              </p>
            </div>

            <div class="bg-amber-50 p-3 rounded-xl border border-amber-200 text-xs text-amber-800 flex items-start gap-2">
              <i class="fa-solid fa-circle-info mt-0.5 text-amber-600 flex-shrink-0"></i>
              <span><b>Password Pegawai:</b> <code class="bg-amber-200/80 px-1.5 py-0.5 rounded font-bold font-mono text-slate-900">12344321</code></span>
            </div>

            <div>
              <label class="block text-xs font-bold uppercase text-slate-700 mb-1.5">Password Pegawai *</label>
              <div class="relative">
                <input 
                  type="password" 
                  id="login-password-input" 
                  required 
                  autofocus
                  placeholder="Ketik password di sini..." 
                  class="w-full text-sm px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none pr-10 font-mono tracking-wider"
                />
                <button type="button" onclick="App.togglePasswordVisibility()" class="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600">
                  <i class="fa-solid fa-eye" id="pwd-eye-icon"></i>
                </button>
              </div>
            </div>

            <div class="pt-2 flex items-center justify-end gap-2">
              <button type="button" onclick="App.closeModal('auth-login-modal')" class="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-xl font-medium">
                Batal
              </button>
              <button type="submit" class="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-md transition flex items-center gap-2">
                <i class="fa-solid fa-unlock"></i> Buka Akses Semua Fitur
              </button>
            </div>
          </form>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
    setTimeout(() => {
      document.getElementById('login-password-input')?.focus();
    }, 100);
  },

  togglePasswordVisibility: function() {
    const input = document.getElementById("login-password-input");
    const icon = document.getElementById("pwd-eye-icon");
    if (!input) return;
    if (input.type === "password") {
      input.type = "text";
      icon.className = "fa-solid fa-eye-slash";
    } else {
      input.type = "password";
      icon.className = "fa-solid fa-eye";
    }
  },

  handleLogin: function(event, targetTab) {
    event.preventDefault();
    const input = document.getElementById("login-password-input");
    const entered = input ? input.value.trim() : "";

    if (entered === EMPLOYEE_PASSWORD) {
      Storage.setRole("pegawai");
      this.closeModal("auth-login-modal");
      this.showToast("Login Pegawai Berhasil! Semua fitur manajemen dan editing kini aktif.", "success");
      this.updateHeaderUI();

      if (targetTab && targetTab !== "null" && targetTab !== "") {
        this.switchTab(targetTab);
      } else {
        this.switchTab(this.currentTab);
      }
    } else {
      this.showToast("Password salah! Password yang benar adalah 12344321.", "error");
      if (input) {
        input.value = "";
        input.focus();
      }
    }
  },

  logout: function() {
    Storage.setRole("customer");
    this.showToast("Anda telah beralih ke Mode Pelanggan (Customer). Fitur internal gudang & inventaris dikunci.", "info");
    this.updateHeaderUI();
    this.switchTab("shop");
  },

  // STORE SETTINGS & LOGO / TEXT / IMAGE CUSTOMIZER
  openStoreSettingsModal: function() {
    if (!Storage.isEmployee()) {
      this.openLoginModal();
      return;
    }

    const data = Storage.getData();
    const p = data.profile || {};

    const modalHtml = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop" id="store-settings-modal">
        <div class="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden modal-content-scale max-h-[92vh] flex flex-col">
          <div class="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
            <h3 class="text-base font-bold flex items-center gap-2">
              <i class="fa-solid fa-sliders text-blue-400"></i> Pengaturan Toko & Edit Branding Visual
            </h3>
            <button onclick="App.closeModal('store-settings-modal')" class="text-white/80 hover:text-white text-lg">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>

          <form onsubmit="App.saveStoreSettings(event)" class="p-6 overflow-y-auto space-y-4">
            <!-- Logo Section -->
            <div class="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div class="flex items-center justify-between mb-2">
                <label class="block text-xs font-bold uppercase text-slate-700">Logo Toko Grosir (Gambar & Teks)</label>
                <div class="flex items-center gap-1.5">
                  <button type="button" onclick="App.pasteFromClipboard('setting-logo-url', 'store-logo-preview')" class="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-md text-xs font-bold border border-blue-200 flex items-center gap-1 transition" title="Tempel link yang disalin dari Chrome atau Google">
                    <i class="fa-solid fa-paste"></i> Tempel Link (Chrome / Web)
                  </button>
                  <button type="button" onclick="App.copyToClipboard(document.getElementById('setting-logo-url').value)" class="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-md text-xs font-semibold border border-slate-300" title="Salin link logo saat ini">
                    <i class="fa-solid fa-copy"></i>
                  </button>
                </div>
              </div>
              <div class="flex items-center gap-4">
                <img id="store-logo-preview" src="${p.logoUrl || 'https://via.placeholder.com/80'}" class="w-16 h-16 rounded-xl object-cover border border-slate-300 shadow-sm" onerror="this.src='https://via.placeholder.com/80?text=Logo'" />
                <div class="flex-1 space-y-2">
                  <div class="flex items-center gap-2">
                    <input type="file" accept="image/*" onchange="App.handleLogoUpload(event)" class="text-xs text-slate-500 file:mr-2 file:py-1 file:px-2.5 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer" />
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-xs text-slate-500 font-medium whitespace-nowrap"><i class="fa-solid fa-link text-blue-500"></i> Link URL:</span>
                    <input 
                      type="text" 
                      id="setting-logo-url" 
                      value="${Util.escapeHtml(p.logoUrl || '')}" 
                      oninput="App.handleImageUrlInput(this, 'store-logo-preview')" 
                      placeholder="Tempel link gambar dari Chrome, Google, atau situs web lain..." 
                      class="flex-1 text-xs px-2.5 py-1.5 border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-500" 
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Nama Toko Grosir *</label>
                <input type="text" id="setting-store-name" required value="${Util.escapeHtml(p.name || '')}" class="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg font-bold" />
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Singkatan / Logo Text</label>
                <input type="text" id="setting-logo-text" value="${Util.escapeHtml(p.logoText || 'GBA')}" class="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg uppercase font-bold" />
              </div>
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Slogan / Tagline Usaha</label>
              <input type="text" id="setting-store-tagline" value="${Util.escapeHtml(p.tagline || '')}" class="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg" />
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">No. Kontak / WhatsApp *</label>
                <input type="text" id="setting-store-phone" required value="${Util.escapeHtml(p.phone || '')}" class="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg" />
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Alamat Email Toko</label>
                <input type="email" id="setting-store-email" value="${Util.escapeHtml(p.email || '')}" class="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg" />
              </div>
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Alamat Gudang & Lokasi Toko</label>
              <textarea id="setting-store-address" rows="2" class="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg">${Util.escapeHtml(p.address || '')}</textarea>
            </div>

            <!-- Backup & Restore Data -->
            <div class="pt-3 border-t border-slate-200">
              <label class="block text-xs font-bold uppercase text-slate-700 mb-2">Manajemen & Cadangan Data Sistem</label>
              <div class="flex flex-wrap items-center gap-2">
                <button type="button" onclick="Storage.exportJSON()" class="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold border border-slate-300 flex items-center gap-1.5">
                  <i class="fa-solid fa-download"></i> Ekspor Cadangan JSON
                </button>
                <label class="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold border border-slate-300 cursor-pointer flex items-center gap-1.5">
                  <i class="fa-solid fa-upload"></i> Impor JSON
                  <input type="file" accept=".json" onchange="Storage.importJSON(this)" class="hidden" />
                </label>
                <button type="button" onclick="Storage.resetToDefault()" class="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg text-xs font-bold border border-rose-200 flex items-center gap-1.5 ml-auto">
                  <i class="fa-solid fa-rotate-left"></i> Reset ke Data Default
                </button>
              </div>
            </div>

            <div class="flex items-center justify-end gap-2 pt-4 border-t border-slate-200">
              <button type="button" onclick="App.closeModal('store-settings-modal')" class="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg">Batal</button>
              <button type="submit" class="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-sm shadow-sm transition">
                Simpan Pengaturan
              </button>
            </div>
          </form>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
  },

  handleLogoUpload: async function(event) {
    const file = event.target.files[0];
    if (!file) return;
    try {
      const base64 = await Storage.fileToBase64(file, 400, 400, 0.85);
      document.getElementById('store-logo-preview').src = base64;
      document.getElementById('setting-logo-url').value = base64;
      App.showToast("Logo berhasil dimuat!", "info");
    } catch (e) {
      App.showToast("Gagal memuat logo: " + e.message, "error");
    }
  },

  saveStoreSettings: function(event) {
    event.preventDefault();
    const data = Storage.getData();
    if (!data.profile) data.profile = {};

    data.profile.name = document.getElementById("setting-store-name").value.trim();
    data.profile.logoText = document.getElementById("setting-logo-text").value.trim();
    data.profile.tagline = document.getElementById("setting-store-tagline").value.trim();
    data.profile.phone = document.getElementById("setting-store-phone").value.trim();
    data.profile.email = document.getElementById("setting-store-email").value.trim();
    data.profile.address = document.getElementById("setting-store-address").value.trim();
    data.profile.logoUrl = document.getElementById("setting-logo-url").value.trim();

    Storage.saveData(data);
    this.closeModal("store-settings-modal");
    this.showToast("Profil dan branding toko berhasil diperbarui!", "success");
    this.updateHeaderUI();
    this.switchTab(this.currentTab);
  },

  // IMAGE PREVIEW LIGHTBOX
  previewImage: function(url, title = "Foto") {
    if (!url) return;
    const modalHtml = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop" id="img-lightbox-modal" onclick="App.closeModal('img-lightbox-modal')">
        <div class="bg-white rounded-2xl max-w-2xl w-full p-4 shadow-2xl modal-content-scale" onclick="event.stopPropagation()">
          <div class="flex items-center justify-between mb-3">
            <h4 class="font-bold text-slate-800 text-sm">${Util.escapeHtml(title)}</h4>
            <button onclick="App.closeModal('img-lightbox-modal')" class="text-slate-400 hover:text-slate-600 p-1">
              <i class="fa-solid fa-xmark text-lg"></i>
            </button>
          </div>
          <div class="max-h-[75vh] overflow-hidden rounded-xl bg-slate-100 flex items-center justify-center">
            <img src="${url}" class="max-w-full max-h-[75vh] object-contain" />
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
  },

  // COPY TO CLIPBOARD HELPER
  copyToClipboard: async function(text, successMsg = "Link gambar berhasil disalin ke clipboard!") {
    if (!text) {
      this.showToast("Tidak ada link gambar untuk disalin.", "warning");
      return;
    }
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for non-https or restricted contexts
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      this.showToast(successMsg, "success");
    } catch (err) {
      console.error("Clipboard copy failed:", err);
      // Last resort prompt
      prompt("Salin link gambar berikut:", text);
    }
  },

  // PASTE IMAGE URL FROM BROWSER / CHROME / GOOGLE CLIPBOARD
  pasteFromClipboard: async function(inputId, previewImgId) {
    try {
      let text = "";
      if (navigator.clipboard && navigator.clipboard.readText) {
        text = await navigator.clipboard.readText();
      }
      
      if (text) {
        const clean = Util.cleanImageUrl(text);
        const inputEl = document.getElementById(inputId);
        if (inputEl) {
          inputEl.value = clean;
          this.handleImageUrlInput(inputEl, previewImgId);
        }
        this.showToast("Link gambar dari Chrome/Google berhasil ditempel!", "success");
      } else {
        const inputEl = document.getElementById(inputId);
        if (inputEl) {
          inputEl.focus();
          inputEl.select();
          this.showToast("Silakan tekan Ctrl+V pada kolom URL untuk menempelkan link.", "info");
        }
      }
    } catch (e) {
      console.warn("Clipboard read permission:", e);
      const inputEl = document.getElementById(inputId);
      if (inputEl) {
        inputEl.focus();
        inputEl.select();
        this.showToast("Izin clipboard browser dibatasi. Silakan klik kolom URL dan tekan Ctrl+V.", "info");
      }
    }
  },

  // HANDLE LIVE URL TYPING / PASTING & PREVIEW
  handleImageUrlInput: function(inputEl, previewImgId) {
    if (!inputEl) return;
    const rawVal = inputEl.value;
    const cleaned = Util.cleanImageUrl(rawVal);
    if (cleaned !== rawVal) {
      inputEl.value = cleaned;
    }

    if (previewImgId) {
      const previewImg = document.getElementById(previewImgId);
      if (previewImg) {
        if (cleaned) {
          previewImg.onerror = function() {
            this.onerror = null;
            this.src = "https://via.placeholder.com/300?text=Gambar+Gagal+Dimuat";
          };
          previewImg.src = cleaned;
        } else {
          previewImg.src = "https://via.placeholder.com/100?text=Preview";
        }
      }
    }
  },

  // CLOSE MODAL HELPER
  closeModal: function(modalId) {
    const el = document.getElementById(modalId);
    if (el) el.remove();
  },

  // TOAST NOTIFICATIONS
  showToast: function(message, type = "info") {
    let container = document.getElementById("toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "toast-container";
      document.body.appendChild(container);
    }

    let bg = "bg-slate-800 text-white";
    let icon = "fa-circle-info text-blue-400";
    if (type === "success") {
      bg = "bg-emerald-700 text-white";
      icon = "fa-circle-check text-emerald-300";
    } else if (type === "error") {
      bg = "bg-rose-700 text-white";
      icon = "fa-circle-exclamation text-rose-300";
    } else if (type === "warning") {
      bg = "bg-amber-600 text-white";
      icon = "fa-triangle-exclamation text-amber-200";
    }

    const toast = document.createElement("div");
    toast.className = `p-3.5 rounded-xl shadow-xl flex items-start gap-2.5 text-xs font-semibold ${bg} toast-animate-in border border-white/20`;
    toast.innerHTML = `
      <i class="fa-solid ${icon} text-base mt-0.5 flex-shrink-0"></i>
      <span class="flex-1 leading-snug">${Util.escapeHtml(message)}</span>
      <button onclick="this.parentElement.remove()" class="text-white/70 hover:text-white ml-2 text-sm">
        <i class="fa-solid fa-xmark"></i>
      </button>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.remove("toast-animate-in");
      toast.classList.add("toast-animate-out");
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }
};

// Initialize when DOM ready
document.addEventListener("DOMContentLoaded", () => {
  App.init();
});
