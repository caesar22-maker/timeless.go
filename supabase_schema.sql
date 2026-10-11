-- ==============================================================================
-- GROSIR BERKAH ABADI - SUPABASE DATABASE SCHEMA & REALTIME SETUP
-- ==============================================================================
-- Petunjuk Penggunaan:
-- 1. Buka Supabase Dashboard (https://supabase.com/dashboard)
-- 2. Pilih Project Anda -> Masuk ke menu "SQL Editor"
-- 3. Tempel (Paste) seluruh skrip SQL di bawah ini, lalu klik "Run"
-- 4. Buka menu "Settings" -> "API" untuk mendapatkan SUPABASE_URL dan SUPABASE_ANON_KEY
-- 5. Masukkan URL dan Anon Key ke js/storage.js atau via menu "Pengaturan Toko" di aplikasi
-- ==============================================================================

-- 1. TABEL PRODUCTS (Katalog Produk & UMKM)
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    sku TEXT,
    name TEXT NOT NULL,
    category TEXT DEFAULT 'Sembako',
    price NUMERIC DEFAULT 0,
    retail_price NUMERIC DEFAULT 0,
    wholesale_tiers JSONB DEFAULT '[]'::jsonb,
    stock INTEGER DEFAULT 0,
    unit TEXT DEFAULT 'Pack',
    image_url TEXT,
    description TEXT,
    badge TEXT,
    min_order INTEGER DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- Index pencarian produk
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_products_sku ON public.products(sku);
CREATE INDEX IF NOT EXISTS idx_products_name ON public.products(name);

-- 2. TABEL ORDERS (Pesanan Pelanggan & Pengiriman Multi-User)
CREATE TABLE IF NOT EXISTS public.orders (
    id TEXT PRIMARY KEY,
    order_number TEXT,
    customer_id TEXT,
    customer_name TEXT NOT NULL,
    customer_phone TEXT,
    customer_email TEXT,
    delivery_address TEXT,
    delivery_method TEXT DEFAULT 'Truk Toko GBA 1',
    payment_method TEXT DEFAULT 'QRIS',
    payment_status TEXT DEFAULT 'Menunggu Pembayaran',
    status TEXT DEFAULT 'Menunggu Konfirmasi',
    total_amount NUMERIC DEFAULT 0,
    notes TEXT,
    items_json JSONB DEFAULT '[]'::jsonb,
    checkpoints JSONB DEFAULT '[]'::jsonb,
    progress_percent INTEGER DEFAULT 15,
    vehicle TEXT,
    plate_number TEXT,
    driver_name TEXT,
    driver_phone TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- Index pencarian pesanan
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_customer_phone ON public.orders(customer_phone);
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON public.orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders(created_at DESC);

-- 3. TABEL WAREHOUSE_RECORDS (Master Stok Gudang WMS)
CREATE TABLE IF NOT EXISTS public.warehouse_records (
    id TEXT PRIMARY KEY,
    sku TEXT,
    name TEXT NOT NULL,
    category TEXT DEFAULT 'Sembako',
    rack TEXT,
    zone TEXT,
    stock INTEGER DEFAULT 0,
    min_stock INTEGER DEFAULT 10,
    unit TEXT DEFAULT 'Pack',
    status TEXT DEFAULT 'Aman',
    image_url TEXT,
    supplier TEXT,
    batch_no TEXT,
    exp_date TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_warehouse_records_sku ON public.warehouse_records(sku);
CREATE INDEX IF NOT EXISTS idx_warehouse_records_category ON public.warehouse_records(category);

-- 4. TABEL INVENTORY_LOGS (Audit Mutasi Stok WMS: Inbound, Outbound, Penyesuaian)
CREATE TABLE IF NOT EXISTS public.inventory_logs (
    id TEXT PRIMARY KEY,
    log_type TEXT DEFAULT 'OUTBOUND',
    item_id TEXT,
    item_name TEXT,
    sku TEXT,
    qty TEXT,
    ref_doc TEXT,
    operator TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_inventory_logs_created_at ON public.inventory_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_inventory_logs_ref_doc ON public.inventory_logs(ref_doc);

-- 5. TABEL USER_PROFILES (Profil Pembeli & Pegawai / Admin)
CREATE TABLE IF NOT EXISTS public.user_profiles (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE,
    name TEXT NOT NULL,
    phone TEXT,
    address TEXT,
    role TEXT DEFAULT 'customer', -- 'customer' atau 'pegawai'
    avatar TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON public.user_profiles(email);
CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON public.user_profiles(role);

-- 6. TABEL DOCUMENTS (Faktur Penjualan & Surat Jalan Otomatis)
CREATE TABLE IF NOT EXISTS public.documents (
    id TEXT PRIMARY KEY,
    doc_number TEXT NOT NULL,
    ref_doc TEXT,
    type TEXT DEFAULT 'Faktur Penjualan',
    doc_date TEXT,
    order_timestamp TEXT,
    due_date TEXT,
    client_name TEXT,
    client_phone TEXT,
    client_address TEXT,
    payment_status TEXT DEFAULT 'BELUM LUNAS',
    payment_method TEXT,
    items_json JSONB DEFAULT '[]'::jsonb,
    grand_total NUMERIC DEFAULT 0,
    notes TEXT,
    signature_name TEXT DEFAULT 'Bagian Penjualan & Kasir Grosir',
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_documents_ref_doc ON public.documents(ref_doc);
CREATE INDEX IF NOT EXISTS idx_documents_doc_number ON public.documents(doc_number);

-- ==============================================================================
-- KEAMANAN: ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
-- Mengizinkan pembacaan publik & penulisan terautentikasi / public anon
-- agar pelanggan web remote dapat berbelanja & admin langsung menerima update.

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.warehouse_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

-- Products Policies
DROP POLICY IF EXISTS "Public can view products" ON public.products;
CREATE POLICY "Public can view products" ON public.products FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can insert products" ON public.products;
CREATE POLICY "Public can insert products" ON public.products FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public can update products" ON public.products;
CREATE POLICY "Public can update products" ON public.products FOR UPDATE USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public can delete products" ON public.products;
CREATE POLICY "Public can delete products" ON public.products FOR DELETE USING (true);

-- Orders Policies
DROP POLICY IF EXISTS "Public can view orders" ON public.orders;
CREATE POLICY "Public can view orders" ON public.orders FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can insert orders" ON public.orders;
CREATE POLICY "Public can insert orders" ON public.orders FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public can update orders" ON public.orders;
CREATE POLICY "Public can update orders" ON public.orders FOR UPDATE USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public can delete orders" ON public.orders;
CREATE POLICY "Public can delete orders" ON public.orders FOR DELETE USING (true);

-- Warehouse Records Policies
DROP POLICY IF EXISTS "Public can view warehouse_records" ON public.warehouse_records;
CREATE POLICY "Public can view warehouse_records" ON public.warehouse_records FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can modify warehouse_records" ON public.warehouse_records;
CREATE POLICY "Public can modify warehouse_records" ON public.warehouse_records FOR ALL USING (true) WITH CHECK (true);

-- Inventory Logs Policies
DROP POLICY IF EXISTS "Public can view inventory_logs" ON public.inventory_logs;
CREATE POLICY "Public can view inventory_logs" ON public.inventory_logs FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can insert inventory_logs" ON public.inventory_logs;
CREATE POLICY "Public can insert inventory_logs" ON public.inventory_logs FOR INSERT WITH CHECK (true);

-- User Profiles Policies
DROP POLICY IF EXISTS "Public can view user_profiles" ON public.user_profiles;
CREATE POLICY "Public can view user_profiles" ON public.user_profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can modify user_profiles" ON public.user_profiles;
CREATE POLICY "Public can modify user_profiles" ON public.user_profiles FOR ALL USING (true) WITH CHECK (true);

-- Documents Policies
DROP POLICY IF EXISTS "Public can view documents" ON public.documents;
CREATE POLICY "Public can view documents" ON public.documents FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can modify documents" ON public.documents;
CREATE POLICY "Public can modify documents" ON public.documents FOR ALL USING (true) WITH CHECK (true);

-- ==============================================================================
-- AKTIFKAN SUPABASE REALTIME (POSTGRES CHANGES BROADCAST)
-- ==============================================================================
-- Mengaktifkan broadcast perubahan database ke websocket realtime
-- agar pesanan masuk dari pembeli langsung muncul di layar Admin seketika.

DO $$
BEGIN
    BEGIN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.products;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END;
    BEGIN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END;
    BEGIN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.warehouse_records;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END;
    BEGIN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.inventory_logs;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END;
    BEGIN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.documents;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END;
END $$;
