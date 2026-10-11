/**
 * Storage & Utility Module for Toko Grosir
 * Manages LocalStorage, Base64 Image Conversion, Export/Import JSON, and Helpers
 */

const STORAGE_KEY = "GBA_GROSIR_STORE_V2"; // Updated to V2 for 250 UMKM Products & 50 Inventaris Tools
const AUTH_KEY = "GBA_AUTH_ROLE_V1"; // "customer" or "pegawai"
const EMPLOYEE_PASSWORD = "12344321";

const Storage = {
  // Get all store data
  getData: function() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.shopProducts && parsed.shopProducts.length >= 200) {
          return parsed;
        }
      }
    } catch (e) {
      console.error("Failed to parse localStorage data:", e);
    }
    // Initialize default if empty or outdated
    this.saveData(DEFAULT_STORE_DATA);
    return JSON.parse(JSON.stringify(DEFAULT_STORE_DATA));
  },

  // Save full state
  saveData: function(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return true;
    } catch (e) {
      console.error("Failed to save to localStorage:", e);
      App.showToast("Gagal menyimpan data ke penyimpanan lokal browser: " + e.message, "error");
      return false;
    }
  },

  // Auth role get/set
  getCurrentRole: function() {
    return localStorage.getItem(AUTH_KEY) || "customer";
  },

  setRole: function(role) {
    localStorage.setItem(AUTH_KEY, role);
  },

  isEmployee: function() {
    return this.getCurrentRole() === "pegawai";
  },

  // Reset to default data
  resetToDefault: function() {
    if (confirm("Apakah Anda yakin ingin mereset seluruh data aplikasi ke data demo awal? Semua perubahan teks, gambar, dan data yang Anda buat akan dikembalikan.")) {
      localStorage.removeItem(STORAGE_KEY);
      this.saveData(DEFAULT_STORE_DATA);
      App.showToast("Data aplikasi berhasil direset ke pengaturan awal!", "success");
      setTimeout(() => location.reload(), 600);
    }
  },

  // Export JSON backup
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
    App.showToast("Cadangan data JSON berhasil diekspor!", "success");
  },

  // Import JSON backup
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
        App.showToast("Data cadangan berhasil diimpor!", "success");
        setTimeout(() => location.reload(), 600);
      } catch (err) {
        App.showToast("Gagal mengimpor berkas JSON: " + err.message, "error");
      }
    };
    reader.readAsText(file);
  },

  // Convert uploaded image file to compressed Base64 Data URL
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
          // Resize with canvas to save storage space
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

          // Get base64 string
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

  // Sanitize and extract real image URL from Chrome, Google Image search, or external sites
  cleanImageUrl: function(rawUrl) {
    if (!rawUrl || typeof rawUrl !== 'string') return "";
    let url = rawUrl.trim();

    // Strip leading/trailing quotes or brackets
    url = url.replace(/^["'<(\[]+|["'>)\]]+$/g, '');

    // If copied from Google Images search result page (e.g. google.com/imgres?imgurl=...)
    if ((url.includes("google.") || url.includes("/imgres")) && url.includes("imgurl=")) {
      try {
        const match = url.match(/[?&]imgurl=([^&]+)/);
        if (match && match[1]) {
          const decoded = decodeURIComponent(match[1]);
          return decoded;
        }
      } catch (e) {
        console.warn("Error decoding Google Image URL:", e);
      }
    }

    // If it's a markdown image format: ![alt](url)
    const mdMatch = url.match(/!\[.*?\]\((https?:\/\/[^\s\)]+)\)/);
    if (mdMatch && mdMatch[1]) {
      return mdMatch[1];
    }

    // If it's an HTML tag format: <img src="url">
    const htmlMatch = url.match(/<img[^>]+src=["'](https?:\/\/[^"']+)["']/i);
    if (htmlMatch && htmlMatch[1]) {
      return htmlMatch[1];
    }

    return url;
  }
};

