/**
 * Main Application Controller (GROSIR BERKAH ABADI)
 * Handles Tab Navigation, Authentication (Role Switcher with Google OAuth & Password Security),
 * Store Settings, Modals, Toasts, and Initialization
 */

const App = {
  currentTab: "shop", // Default tab is "shop"

  init: function() {
    // Initial sync
    this.updateHeaderUI();
    this.switchTab("shop");
    this.bindGlobalEvents();

    // Inisialisasi Supabase Realtime & Sinkronisasi Cloud
    if (typeof Storage !== 'undefined' && Storage.initSupabase) {
      try {
        Storage.initSupabase();
        if (Storage.isSupabaseConfigured()) {
          Storage.fetchFromCloud().then(() => {
            this.updateHeaderUI();
            if (this.currentTab === "shop" && typeof Shop !== 'undefined') Shop.render();
            else if (this.currentTab === "tracking" && typeof Orders !== 'undefined') Orders.renderTrackingPanel();
          }).catch(err => console.warn("Supabase initial cloud fetch:", err));
        }
      } catch (e) {
        console.warn("Storage initSupabase error:", e);
      }
    }
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
  // SWITCH NAVIGATION TABS
  switchTab: function(tabName) {
    const isEmployee = Storage.isEmployee();

    // Check if customer is trying to access protected tabs (only shop and tracking are public)
    if (!isEmployee && tabName !== "shop" && tabName !== "tracking") {
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
    } else if (tabName === "tracking") {
      Orders.renderTrackingPanel();
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

    // Role & Customer Indicator elements
    const customerBadge = document.getElementById("customer-account-badge");
    const roleBadge = document.getElementById("current-role-badge");
    const roleActionBtn = document.getElementById("role-action-btn");
    const lockIcons = document.querySelectorAll(".tab-lock-icon");
    const navOrdersBtn = document.getElementById("nav-employee-orders-btn");
    const navOrderBadge = document.getElementById("nav-order-count-badge");
    const activeOrdersCount = (data.orders || []).filter(o => o.status !== "Selesai").length;

    if (isEmployee) {
      if (customerBadge) {
        customerBadge.innerHTML = '';
      }
      const googleAcc = Storage.getGoogleAccount();
      if (roleBadge) {
        roleBadge.innerHTML = `
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-900 border border-emerald-300">
            <img src="${googleAcc ? googleAcc.avatar : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100'}" class="w-5 h-5 rounded-full object-cover border border-emerald-400" />
            <span class="flex items-center gap-1 font-bold">
              <i class="fa-brands fa-google text-red-500 text-[11px]"></i> ${googleAcc ? Util.escapeHtml(googleAcc.name) : 'Admin Toko'}
            </span>
            <span class="px-1.5 py-0.2 rounded text-[10px] bg-emerald-200 text-emerald-900 font-mono">Akses Penuh</span>
          </div>
        `;
      }
      if (roleActionBtn) {
        roleActionBtn.innerHTML = `
          <button onclick="App.logout()" class="px-3.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold transition flex items-center gap-1.5">
            <i class="fa-solid fa-arrow-right-from-bracket"></i> Keluar (Mode Pelanggan)
          </button>
        `;
      }
      if (navOrdersBtn) {
        navOrdersBtn.classList.remove("hidden");
      }
      if (navOrderBadge) {
        navOrderBadge.textContent = activeOrdersCount;
      }
      // Hide lock icons
      lockIcons.forEach(icon => icon.classList.add("hidden"));
    } else {
      const custAcc = Storage.getCustomerAccount();
      if (customerBadge) {
        if (custAcc && custAcc.googleEmail) {
          customerBadge.innerHTML = `
            <button 
              onclick="App.openCustomerProfileModal()" 
              class="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-white text-slate-800 border border-slate-300 hover:border-blue-500 hover:bg-blue-50/50 shadow-xs transition"
              title="Profil Akun Pembeli: ${Util.escapeHtml(custAcc.name)} (${Util.escapeHtml(custAcc.googleEmail)})"
            >
              <img src="${custAcc.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100'}" class="w-5 h-5 rounded-full object-cover border border-blue-400" />
              <span class="max-w-[120px] sm:max-w-[160px] truncate flex items-center gap-1 font-semibold">
                <i class="fa-brands fa-google text-red-500 text-[11px]"></i> ${Util.escapeHtml(custAcc.name)}
              </span>
              <i class="fa-solid fa-pen text-[10px] text-slate-400 hover:text-blue-600"></i>
            </button>
          `;
        } else {
          customerBadge.innerHTML = `
            <button 
              onclick="App.openCustomerProfileModal()" 
              class="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-amber-50 text-amber-900 border border-amber-300 hover:bg-amber-100 transition shadow-xs"
            >
              <i class="fa-brands fa-google text-red-500"></i>
              <span>Daftar / Akun Pembeli</span>
            </button>
          `;
        }
      }

      if (roleBadge) {
        roleBadge.innerHTML = `
          <span class="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
            <i class="fa-solid fa-user text-blue-600"></i> Mode: Pelanggan
          </span>
        `;
      }
      if (roleActionBtn) {
        roleActionBtn.innerHTML = `
          <button onclick="App.openLoginModal()" class="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm transition flex items-center gap-1.5">
            <i class="fa-solid fa-key"></i> Login Admin
          </button>
        `;
      }
      if (navOrdersBtn) {
        navOrdersBtn.classList.add("hidden");
      }
      // Show lock icons
      lockIcons.forEach(icon => icon.classList.remove("hidden"));
    }

    // Perbarui indikator koneksi Cloud Supabase
    if (typeof Storage !== 'undefined' && Storage.updateSyncBadge) {
      Storage.updateSyncBadge();
    }
  },

  // LOGIN MODAL (GOOGLE AUTH + PASSWORD T1MELESS, PASSWORD NEVER SHOWN)
  openLoginModal: function(intendedTab = null) {
    const googleAcc = Storage.getGoogleAccount();
    const modalHtml = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop" id="auth-login-modal">
        <div class="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden modal-content-scale">
          <div class="px-6 py-4 bg-gradient-to-r from-blue-700 to-indigo-800 text-white flex items-center justify-between">
            <h3 class="text-base font-bold flex items-center gap-2">
              <i class="fa-solid fa-shield-halved text-amber-400"></i> Autentikasi Admin Toko
            </h3>
            <button onclick="App.closeModal('auth-login-modal')" class="text-white/80 hover:text-white text-lg">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>

          <form onsubmit="App.handleLogin(event, '${intendedTab || ''}')" class="p-6 space-y-4">
            <div class="text-center mb-1">
              <div class="w-14 h-14 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-2 border border-blue-200 shadow-xs">
                <i class="fa-solid fa-user-lock"></i>
              </div>
              <h4 class="font-bold text-slate-800 text-base">Akses Khusus Admin & Staff</h4>
              <p class="text-xs text-slate-500 mt-0.5">
                Masuk dengan akun Google terdaftar dan masukkan password keamanan admin untuk membuka akses penuh manajemen toko.
              </p>
            </div>

            <!-- STEP 1: GOOGLE ACCOUNT (REQUIRED) -->
            <div class="rounded-xl border p-3.5 ${googleAcc ? 'bg-emerald-50/70 border-emerald-300' : 'bg-slate-50 border-slate-200'}">
              <div class="flex items-center justify-between mb-2">
                <label class="block text-xs font-bold uppercase text-slate-700 flex items-center gap-1.5">
                  <i class="fa-brands fa-google text-red-500"></i> 1. Akun Google Admin *
                </label>
                ${googleAcc ? `
                  <span class="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <i class="fa-solid fa-circle-check text-emerald-600"></i> Terverifikasi
                  </span>
                ` : `
                  <span class="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                    Wajib Terhubung
                  </span>
                `}
              </div>

              ${googleAcc ? `
                <div class="flex items-center justify-between gap-3 bg-white p-2.5 rounded-lg border border-emerald-200 shadow-xs">
                  <div class="flex items-center gap-2.5 min-w-0">
                    <img src="${googleAcc.avatar}" class="w-9 h-9 rounded-full object-cover border border-emerald-300 flex-shrink-0" />
                    <div class="min-w-0">
                      <p class="text-xs font-bold text-slate-900 truncate">${Util.escapeHtml(googleAcc.name)}</p>
                      <p class="text-[11px] text-slate-500 font-mono truncate">${Util.escapeHtml(googleAcc.email)}</p>
                    </div>
                  </div>
                  <button 
                    type="button" 
                    onclick="App.openGoogleAuthModal('${intendedTab || ''}')" 
                    class="text-xs text-blue-600 hover:text-blue-800 font-bold whitespace-nowrap px-2 py-1 bg-blue-50 hover:bg-blue-100 rounded-lg transition"
                  >
                    Ganti Akun
                  </button>
                </div>
              ` : `
                <button 
                  type="button" 
                  onclick="App.openGoogleAuthModal('${intendedTab || ''}')" 
                  class="w-full py-2.5 px-4 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-xl font-bold text-xs shadow-xs transition flex items-center justify-center gap-2.5 group"
                >
                  <svg class="w-4 h-4 group-hover:scale-110 transition" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg>
                  <span>Daftar atau Login dengan Akun Google</span>
                </button>
              `}
            </div>

            <!-- STEP 2: PASSWORD KEAMANAN (NO PLAIN TEXT PASSWORD DISPLAYED) -->
            <div>
              <label class="block text-xs font-bold uppercase text-slate-700 mb-1.5 flex items-center gap-1.5">
                <i class="fa-solid fa-key text-blue-600"></i> 2. Password Keamanan Admin *
              </label>
              <div class="relative">
                <input 
                  type="password" 
                  id="login-password-input" 
                  required 
                  placeholder="Masukkan Password Keamanan Admin..." 
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
                <i class="fa-solid fa-shield-halved"></i> Verifikasi & Masuk
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

    // 1. Enforce Google Account requirement
    if (!Storage.isGoogleConnected()) {
      this.showToast("Wajib mendaftar atau login dengan Akun Google terlebih dahulu!", "warning");
      this.openGoogleAuthModal(targetTab);
      return;
    }

    // 2. Enforce Password T1MELESS requirement without revealing it
    if (Storage.checkPassword(entered)) {
      Storage.setRole("admin");
      this.closeModal("auth-login-modal");
      const acc = Storage.getGoogleAccount();
      this.showToast(`Autentikasi Admin Berhasil! Selamat bekerja, ${acc.name}.`, "success");
      this.updateHeaderUI();

      if (targetTab && targetTab.startsWith("PROCESS_ORDER_")) {
        const orderId = targetTab.replace("PROCESS_ORDER_", "");
        this.switchTab("tracking");
        setTimeout(() => Orders.openProcessOrderModal(orderId), 250);
      } else if (targetTab && targetTab !== "null" && targetTab !== "") {
        this.switchTab(targetTab);
      } else {
        this.switchTab(this.currentTab);
      }
    } else {
      this.showToast("Password keamanan admin tidak sesuai! Akses ditolak.", "error");
      if (input) {
        input.value = "";
        input.focus();
      }
    }
  },

  // GOOGLE AUTH MODAL (SELECTION & REGISTRATION)
  openGoogleAuthModal: function(targetTab = null) {
    const defaultAccounts = Storage.DEFAULT_GOOGLE_ACCOUNTS;

    const modalHtml = `
      <div class="fixed inset-0 z-[60] flex items-center justify-center p-4 modal-backdrop" id="google-auth-modal">
        <div class="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden modal-content-scale">
          <!-- Google Header -->
          <div class="p-6 border-b border-slate-100 flex flex-col items-center text-center">
            <svg class="w-10 h-10 mb-2" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg>
            <h3 class="text-base font-bold text-slate-800">Login dengan Google</h3>
            <p class="text-xs text-slate-500 mt-1">Pilih akun Google admin terdaftar atau daftarkan akun baru untuk melanjutkan.</p>
          </div>

          <!-- Account Selection -->
          <div class="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
            <span class="text-[11px] font-bold uppercase text-slate-400 tracking-wider block">Pilih Akun Terverifikasi:</span>
            
            <div class="space-y-2">
              ${defaultAccounts.map(acc => `
                <div 
                  onclick="App.selectGoogleAccount('${acc.email}', '${acc.name}', '${acc.role}', '${acc.avatar}', '${targetTab || ''}')"
                  class="p-3 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 cursor-pointer transition flex items-center justify-between group"
                >
                  <div class="flex items-center gap-3">
                    <img src="${acc.avatar}" class="w-10 h-10 rounded-full object-cover border border-slate-300 group-hover:border-blue-500" />
                    <div>
                      <p class="text-xs font-bold text-slate-900 group-hover:text-blue-700">${acc.name}</p>
                      <p class="text-[11px] text-slate-500 font-mono">${acc.email}</p>
                      <span class="text-[10px] text-slate-400">${acc.role}</span>
                    </div>
                  </div>
                  <i class="fa-solid fa-chevron-right text-xs text-slate-300 group-hover:text-blue-600 transition"></i>
                </div>
              `).join('')}
            </div>

            <!-- Custom Account Register / Input -->
            <div class="pt-3 border-t border-slate-100">
              <span class="text-[11px] font-bold uppercase text-slate-400 tracking-wider block mb-2">Atau Gunakan / Daftar Akun Google Lain:</span>
              <form onsubmit="App.registerGoogleAccount(event, '${targetTab || ''}')" class="space-y-2.5">
                <div>
                  <input 
                    type="email" 
                    id="custom-google-email" 
                    required 
                    placeholder="admin.grosir@gmail.com" 
                    class="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-500" 
                  />
                </div>
                <div>
                  <input 
                    type="text" 
                    id="custom-google-name" 
                    required 
                    placeholder="Nama Lengkap Admin..." 
                    class="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-500" 
                  />
                </div>
                <button type="submit" class="w-full py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5">
                  <i class="fa-brands fa-google text-red-400"></i> Sambungkan Akun Ini
                </button>
              </form>
            </div>
          </div>

          <div class="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end">
            <button type="button" onclick="App.closeModal('google-auth-modal')" class="px-4 py-1.5 text-xs text-slate-600 hover:bg-slate-200 rounded-lg font-bold">
              Batal
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
  },

  selectGoogleAccount: function(email, name, role, avatar, targetTab) {
    Storage.setGoogleAccount({ email, name, role, avatar, connectedAt: new Date().toISOString() });
    this.closeModal('google-auth-modal');
    this.closeModal('auth-login-modal');
    this.showToast(`Akun Google "${name}" (${email}) berhasil terhubung!`, "info");
    this.openLoginModal(targetTab);
  },

  registerGoogleAccount: function(event, targetTab) {
    event.preventDefault();
    const email = document.getElementById("custom-google-email")?.value.trim();
    const name = document.getElementById("custom-google-name")?.value.trim();
    if (!email || !name) return;

    const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=2563eb&color=fff&bold=true`;
    Storage.setGoogleAccount({ email, name, role: "Staff Admin Toko", avatar, connectedAt: new Date().toISOString() });
    this.closeModal('google-auth-modal');
    this.closeModal('auth-login-modal');
    this.showToast(`Akun Google "${name}" berhasil terdaftar & terhubung!`, "info");
    this.openLoginModal(targetTab);
  },

  logout: function() {
    Storage.setRole("customer");
    this.showToast("Anda telah beralih ke Mode Pelanggan (Customer). Fitur internal gudang, dokumen, dan inventaris dikunci.", "info");
    this.updateHeaderUI();
    this.switchTab("shop");
  },

  // CUSTOMER ACCOUNT MANAGEMENT MODAL (GOOGLE ACCOUNT, FULL NAME, COMPLETE ADDRESS)
  openCustomerProfileModal: function(callbackOnSuccess = null) {
    const cust = Storage.getCustomerAccount() || {};
    const defaultAccounts = Storage.DEFAULT_CUSTOMER_ACCOUNTS || [];
    window._pendingCustomerCallback = callbackOnSuccess;

    const modalHtml = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop" id="customer-profile-modal">
        <div class="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden modal-content-scale max-h-[92vh] flex flex-col">
          
          <!-- Header -->
          <div class="px-6 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-slate-900 text-white flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-xl text-amber-300 border border-white/20">
                <i class="fa-solid fa-address-card"></i>
              </div>
              <div>
                <h3 class="text-base font-bold flex items-center gap-2">
                  Akun Pembeli (Customer)
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-slate-950 uppercase tracking-wide">Wajib Belanja</span>
                </h3>
                <p class="text-xs text-slate-200">Data akun Google, nama lengkap, dan alamat pengiriman pesanan grosir.</p>
              </div>
            </div>
            <button onclick="App.closeModal('customer-profile-modal')" class="text-white/80 hover:text-white text-lg">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>

          <!-- Body Form -->
          <form onsubmit="App.saveCustomerProfile(event)" class="p-6 overflow-y-auto space-y-4 flex-1">
            
            <!-- Quick Preset Customer Selection -->
            <div class="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <span class="text-[11px] font-bold uppercase text-slate-500 tracking-wider block mb-2">Pilih Cepat Akun Contoh Terdaftar:</span>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
                ${defaultAccounts.map((acc, idx) => `
                  <button 
                    type="button" 
                    onclick="App.selectDefaultCustomer(${idx})"
                    class="p-2.5 rounded-xl border bg-white hover:bg-blue-50/50 hover:border-blue-400 text-left transition text-xs group"
                  >
                    <div class="flex items-center gap-2 mb-1">
                      <img src="${acc.avatar}" class="w-6 h-6 rounded-full object-cover border border-slate-200 group-hover:border-blue-500" />
                      <span class="font-bold text-slate-900 truncate group-hover:text-blue-700">${acc.name.split('(')[0].trim()}</span>
                    </div>
                    <p class="text-[10px] text-slate-500 font-mono truncate">${acc.googleEmail}</p>
                  </button>
                `).join('')}
              </div>
            </div>

            <!-- 1. Google Account Input -->
            <div class="bg-blue-50/60 p-4 rounded-xl border border-blue-200 space-y-2">
              <label class="block text-xs font-bold uppercase text-slate-800 flex items-center justify-between">
                <span class="flex items-center gap-1.5"><i class="fa-brands fa-google text-red-500 text-sm"></i> 1. Akun Google Pembeli *</span>
                <span class="text-[10px] text-blue-700 font-bold bg-white px-2 py-0.5 rounded border border-blue-200">Wajib Terhubung</span>
              </label>
              <div class="relative">
                <input 
                  type="email" 
                  id="cust-google-email" 
                  required 
                  value="${Util.escapeHtml(cust.googleEmail || '')}" 
                  placeholder="nama.pembeli@gmail.com" 
                  class="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white font-mono" 
                />
              </div>
              <p class="text-[11px] text-slate-500">Notifikasi pesanan dan faktur digital akan dikirimkan ke alamat email Google ini.</p>
            </div>

            <!-- 2. Full Name Input -->
            <div>
              <label class="block text-xs font-bold uppercase text-slate-700 mb-1.5 flex items-center gap-1.5">
                <i class="fa-solid fa-user text-blue-600"></i> 2. Nama Lengkap Pemesan / Nama Toko Grosir *
              </label>
              <input 
                type="text" 
                id="cust-full-name" 
                required 
                value="${Util.escapeHtml(cust.name || '')}" 
                placeholder="Contoh: Bpk. Budi Santoso / Toko Berkah Jaya" 
                class="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white font-semibold" 
              />
            </div>

            <!-- 3. Phone / WhatsApp Input -->
            <div>
              <label class="block text-xs font-bold uppercase text-slate-700 mb-1.5 flex items-center gap-1.5">
                <i class="fa-brands fa-whatsapp text-emerald-600"></i> 3. Nomor WhatsApp / Kontak Pengantaran *
              </label>
              <input 
                type="text" 
                id="cust-phone-input" 
                required 
                value="${Util.escapeHtml(cust.phone || '')}" 
                placeholder="Contoh: 0812-9876-5432" 
                class="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white font-mono" 
              />
            </div>

            <!-- 4. Complete Address Input -->
            <div>
              <label class="block text-xs font-bold uppercase text-slate-700 mb-1.5 flex items-center gap-1.5">
                <i class="fa-solid fa-location-dot text-rose-500"></i> 4. Alamat Lengkap Pengiriman / Lokasi Toko *
              </label>
              <textarea 
                id="cust-address-input" 
                required 
                rows="3" 
                placeholder="Contoh: Jl. Daan Mogot KM 11 No. 45 RT 03/RW 04, Kelurahan Cengkareng Timur, Kalideres, Jakarta Barat (Patokan depan Masjid Jami)" 
                class="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white leading-relaxed"
              >${Util.escapeHtml(cust.address || '')}</textarea>
              <p class="text-[11px] text-slate-500 mt-1">Alamat ini akan otomatis dijadikan titik tujuan rute armada pengiriman live GPS.</p>
            </div>

            <!-- Form Actions -->
            <div class="pt-3 border-t border-slate-200 flex items-center justify-between">
              <button 
                type="button" 
                onclick="App.clearCustomerAccountData()"
                class="text-xs text-rose-600 hover:text-rose-800 font-semibold"
              >
                Hapus Akun Pembeli
              </button>
              <div class="flex items-center gap-2">
                <button type="button" onclick="App.closeModal('customer-profile-modal')" class="px-4 py-2 text-xs text-slate-600 hover:bg-slate-100 rounded-xl font-medium">
                  Batal
                </button>
                <button type="submit" class="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs shadow-md transition flex items-center gap-1.5">
                  <i class="fa-solid fa-check"></i> Simpan Data Akun Pembeli
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    `;

    this.closeModal('customer-profile-modal');
    document.body.insertAdjacentHTML('beforeend', modalHtml);
  },

  selectDefaultCustomer: function(index) {
    const acc = Storage.DEFAULT_CUSTOMER_ACCOUNTS[index];
    if (!acc) return;
    document.getElementById("cust-google-email").value = acc.googleEmail;
    document.getElementById("cust-full-name").value = acc.name;
    document.getElementById("cust-phone-input").value = acc.phone;
    document.getElementById("cust-address-input").value = acc.address;
  },

  saveCustomerProfile: function(event) {
    event.preventDefault();
    const googleEmail = document.getElementById("cust-google-email")?.value.trim();
    const name = document.getElementById("cust-full-name")?.value.trim();
    const phone = document.getElementById("cust-phone-input")?.value.trim();
    const address = document.getElementById("cust-address-input")?.value.trim();

    if (!googleEmail || !name || !address) {
      this.showToast("Wajib mengisi Akun Google, Nama Lengkap, dan Alamat Lengkap!", "warning");
      return;
    }

    const currentAcc = Storage.getCustomerAccount() || {};
    const avatar = currentAcc.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0284c7&color=fff&bold=true`;

    const accountObj = {
      googleEmail,
      name,
      phone: phone || "0812-0000-0000",
      address,
      avatar,
      updatedAt: new Date().toISOString()
    };

    Storage.setCustomerAccount(accountObj);
    this.closeModal('customer-profile-modal');
    this.showToast(`Akun Pembeli "${name}" (${googleEmail}) berhasil disimpan!`, "success");
    this.updateHeaderUI();

    if (window._pendingCustomerCallback && typeof window._pendingCustomerCallback === 'function') {
      const cb = window._pendingCustomerCallback;
      window._pendingCustomerCallback = null;
      cb();
    }
  },

  clearCustomerAccountData: function() {
    if (confirm("Hapus data akun pembeli di perangkat ini?")) {
      Storage.clearCustomerAccount();
      this.closeModal('customer-profile-modal');
      this.showToast("Data akun pembeli telah dibersihkan.", "info");
      this.updateHeaderUI();
    }
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

            <!-- Cloud Database (Supabase Real-Time) Section -->
            <div class="bg-gradient-to-br from-slate-900 to-blue-950 p-4 rounded-xl text-white border border-blue-900 shadow-xs space-y-3">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <div class="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm font-bold">
                    <i class="fa-solid fa-cloud"></i>
                  </div>
                  <div>
                    <h4 class="text-xs font-bold uppercase tracking-wide">Database Cloud & Sinkronisasi Real-Time (Supabase)</h4>
                    <p class="text-[11px] text-slate-300">Menghubungkan multi-perangkat (Admin, Kasir, Gudang, & Pembeli Netlify)</p>
                  </div>
                </div>
                <span class="px-2 py-0.5 rounded text-[10px] font-bold ${Storage.cloudConnected && Storage.isSupabaseConfigured() ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'}">
                  ${Storage.cloudConnected && Storage.isSupabaseConfigured() ? '● Terhubung Real-Time' : '○ Mode Lokal / Offline'}
                </span>
              </div>

              <div class="grid grid-cols-1 gap-2 pt-1">
                <div>
                  <label class="block text-[11px] font-medium text-slate-300 mb-1">Supabase Project URL</label>
                  <input 
                    type="text" 
                    id="setting-supabase-url" 
                    value="${Util.escapeHtml((Storage.getSupabaseConfig && Storage.getSupabaseConfig().url) || '')}" 
                    placeholder="https://xyzcompany.supabase.co" 
                    class="w-full text-xs px-3 py-2 bg-slate-800/90 border border-slate-700 text-white rounded-lg focus:ring-1 focus:ring-blue-400 font-mono"
                  />
                </div>
                <div>
                  <label class="block text-[11px] font-medium text-slate-300 mb-1">Supabase Anon Public API Key</label>
                  <div class="relative">
                    <input 
                      type="password" 
                      id="setting-supabase-key" 
                      value="${Util.escapeHtml((Storage.getSupabaseConfig && Storage.getSupabaseConfig().anonKey) || '')}" 
                      placeholder="eyJhbGciOi..." 
                      class="w-full text-xs px-3 py-2 bg-slate-800/90 border border-slate-700 text-white rounded-lg focus:ring-1 focus:ring-blue-400 font-mono pr-10"
                    />
                    <button 
                      type="button" 
                      onclick="App.toggleSupabaseKeyVisibility()" 
                      class="absolute right-2.5 top-2 text-slate-400 hover:text-white text-xs"
                      title="Lihat / Sembunyikan Key"
                    >
                      <i class="fa-solid fa-eye" id="toggle-key-eye"></i>
                    </button>
                  </div>
                </div>
              </div>

              <div class="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800">
                <div class="flex items-center gap-2">
                  <button 
                    type="button" 
                    onclick="App.testSupabaseConnection()" 
                    class="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
                  >
                    <i class="fa-solid fa-plug-circle-check"></i> Tes Koneksi Cloud
                  </button>
                  <button 
                    type="button" 
                    onclick="App.seedSupabaseData()" 
                    class="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
                    title="Unggah 250 master produk dan data awal ke Supabase"
                  >
                    <i class="fa-solid fa-cloud-arrow-up"></i> Unggah Data Awal ke Cloud
                  </button>
                </div>
                <div id="supabase-status-msg" class="text-xs text-slate-300"></div>
              </div>

              <!-- Migration Progress Bar -->
              <div id="supabase-migration-progress" class="hidden space-y-1 pt-1">
                <div class="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div id="supabase-migration-bar" class="bg-gradient-to-r from-emerald-500 to-teal-400 h-2 rounded-full transition-all duration-200" style="width: 0%"></div>
                </div>
                <p id="supabase-migration-text" class="text-[11px] text-emerald-300 font-mono truncate">Menyiapkan pengunggahan...</p>
              </div>
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

  toggleSupabaseKeyVisibility: function() {
    const input = document.getElementById("setting-supabase-key");
    const eye = document.getElementById("toggle-key-eye");
    if (!input || !eye) return;
    if (input.type === "password") {
      input.type = "text";
      eye.classList.remove("fa-eye");
      eye.classList.add("fa-eye-slash");
    } else {
      input.type = "password";
      eye.classList.remove("fa-eye-slash");
      eye.classList.add("fa-eye");
    }
  },

  testSupabaseConnection: async function() {
    const url = document.getElementById("setting-supabase-url").value.trim();
    const key = document.getElementById("setting-supabase-key").value.trim();
    const statusMsg = document.getElementById("supabase-status-msg");
    if (statusMsg) statusMsg.innerHTML = '<span class="text-blue-400"><i class="fa-solid fa-spinner fa-spin"></i> Menghubungkan ke Supabase...</span>';

    const result = await Storage.testSupabaseConnection(url, key);
    if (result.success) {
      if (statusMsg) statusMsg.innerHTML = `<span class="text-emerald-400 font-bold"><i class="fa-solid fa-circle-check"></i> ${result.message}</span>`;
      this.showToast(result.message, "success");
      Storage.setSupabaseConfig(url, key);
    } else {
      if (statusMsg) statusMsg.innerHTML = `<span class="text-rose-400 font-bold"><i class="fa-solid fa-circle-xmark"></i> ${result.message}</span>`;
      this.showToast(result.message, "error");
    }
  },

  seedSupabaseData: async function() {
    if (!confirm("Unggah seluruh master produk (250 items), WMS, dokumen, dan pesanan ke database Supabase sekarang? Proses ini akan menyinkronkan data katalog toko.")) return;
    const progressContainer = document.getElementById("supabase-migration-progress");
    const progressBar = document.getElementById("supabase-migration-bar");
    const progressText = document.getElementById("supabase-migration-text");
    if (progressContainer) progressContainer.classList.remove("hidden");

    try {
      await Storage.seedInitialData((pct, msg) => {
        if (progressBar) progressBar.style.width = pct + "%";
        if (progressText) progressText.textContent = `${pct}% - ${msg}`;
      });
      this.showToast("Berhasil! Seluruh data awal telah termigrasi ke Supabase.", "success");
      if (progressText) progressText.textContent = "100% - Migrasi data berhasil selesai!";
      Storage.updateSyncBadge();
    } catch (e) {
      this.showToast("Gagal migrasi: " + e.message, "error");
      if (progressText) progressText.textContent = "Gagal: " + e.message;
    }
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

    // Simpan Konfigurasi Supabase
    const supaUrlEl = document.getElementById("setting-supabase-url");
    const supaKeyEl = document.getElementById("setting-supabase-key");
    if (supaUrlEl && supaKeyEl) {
      const url = supaUrlEl.value.trim();
      const key = supaKeyEl.value.trim();
      Storage.setSupabaseConfig(url, key);
    }

    Storage.saveData(data);
    this.closeModal("store-settings-modal");
    this.showToast("Profil, branding toko, dan konfigurasi database berhasil diperbarui!", "success");
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
  },

  previewImageModal: function(imageUrl, title = "Foto / Bukti Gambar") {
    if (!imageUrl) return;
    const modalHtml = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop bg-black/70 backdrop-blur-xs" id="img-preview-modal" onclick="App.closeModal('img-preview-modal')">
        <div class="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden modal-content-scale p-4" onclick="event.stopPropagation()">
          <div class="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
            <h4 class="text-sm font-bold text-slate-800 flex items-center gap-2">
              <i class="fa-solid fa-image text-blue-600"></i> ${Util.escapeHtml(title)}
            </h4>
            <button onclick="App.closeModal('img-preview-modal')" class="text-slate-400 hover:text-slate-700 text-lg">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div class="rounded-xl overflow-hidden bg-slate-900 flex items-center justify-center min-h-[220px]">
            <img src="${imageUrl}" class="w-full max-h-[70vh] object-contain" />
          </div>
        </div>
      </div>
    `;
    App.closeModal('img-preview-modal');
    document.body.insertAdjacentHTML('beforeend', modalHtml);
  }
};

// Initialize when DOM ready
document.addEventListener("DOMContentLoaded", () => {
  App.init();
});
