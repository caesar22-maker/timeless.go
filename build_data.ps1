# PowerShell Script to assemble complete UMKM (250 products) and INVENTARIS (50 tools) dataset into js/data.js

$rawUmkm = @'
1|1905260001|BLASTOZ COKLAT ARTA @6|Sembako|Pack|21650|Rasa: Cokelat (Chocolate), Berat Bersih per Buah: 24 gram, Isi per Box: 12 pcs, Berat Total per Box: Sekitar 288-300g|1905260001|BEST SELLER
2|1605260009|CANNON BALL ARTA @6|Sembako|Pack|13000|Sachet Kecil/Sedang: Berat bersih sekitar 20g/40g, Box/Multipack: Isi 12 pcs (20g) atau isi 24 pcs|1605260009|
3|1905260002|FRUZZ GUMMY ARTA @12|Sembako|Pack|180000|1 Dus isi 12 box|1905260002|PARTAI
4|1605260007|FULLO ROLL ARTA @6|Sembako|Pack|6000|Berat Bersih: ± 7 gram per pcs. Jumlah Isi: 1 pak isi 6 pcs. Varian: Cokelat, Vanilla Milk, Choco Berry, Blueberry Yogurt|1605260007|
5|1807260001|FULLO STICKY ARTA @6|Sembako|Pack|88000|Berat Bersih: ±7g/8g per pcs. Varian: Cokelat, Vanilla Milk, Choco Vanilla, Choco Strawberry. Kemasan Grosir: 1 karton isi 6 box @24 pcs|1807260001|
6|2006260001|OOPS CHIPS RTG ARTA @6|Sembako|Rtg|44100|Berat Bersih (Netto): 60 gram per bungkus (total 6 pcs). Isi Paket: 6 bungkus|2006260001|
7|2007260002|OOPS FUGU ARTA @12|Sembako|Rtg|10000|Berat Bersih: Sekitar 10–12 gram per bungkus kecil (sachet). Kemasan Umum: Dijual per renteng/pak isi 10 sachet|2007260002|
8|2007260001|OOPS STAR ARTA @12|Sembako|Rtg|18000|Kemasan: Renceng atau pak isi beberapa bungkus kecil. Varian: Jagung bakar manis, ayam tomat panggang, mie goreng. Halal|2007260001|
9|307260002|PERMEN BLASTER ARTA @24|Sembako|Pack|210000|Kemasan: 1 Karton / Dus berisi 24 bungkus (zak)|307260002|
10|1807260002|PERMEN BLASTER POP ARTA @4|Sembako|Rtg|82000|Berat Bersih (Netto): ±6,3 gram per pcs. Isi Per Pak/Renceng: 36 pcs. Kemasan Grosir: 1 dus isi 4 pak (4 x 36 pcs)|1807260002|
11|1807260003|PERMEN FRUZZ FRUIT COMBO ARTA @30|Sembako|Pack|210000|Berat Bersih per Bungkus: 88 gram atau 100 gram. Isi 30 bungkus per karton|1807260003|
12|307260001|PERMEN MINTZ ARTA @24|Sembako|Pack|130000|Berat per Bungkus: Sekitar 99g – 115g. Varian: Peppermint, Duomint, Barleymint, Cherrymint, Grapemint. Tekstur kenyal, rasa mint segar, halal|307260001|
13|2703260001|PERMEN MINTZ ARTA @25|Sembako|Rtg|17000|Isi per Kemasan Utuh: 1 bungkus normal berisi 50 pcs. Berat per Butir: Sekitar 2,2g - 2,5g|2703260001|
14|1905260003|TANGO CRISPY ROLL ARTA @4|Sembako|Rtg|17000|Berat Bersih per Pcs/Sachet: 12 gram. Jumlah dalam 1 Renceng: 10 pcs. Total dalam 1 Karton/Dus: 4 renceng|1905260003|
15|1605260006|TANGO EMOJI ARTA @6|Sembako|Pack|18500|Isi per Box: 12 pack plus bonus 1 pack (total 13 pack per box). Isi per Pack: 3 keping plus bonus 1 keping biskuit (total 4 keping / 22,4g)|1605260006|
16|3005260001|TANGO WAFER BITE BLACKPINK ARTA @6|Sembako|Pack|16500|Berat Bersih (Netto): 35 gram per sachet/bungkus. Kemasan Paket: (berisi 6 bungkus kemasan 35 gram)|3005260001|
17|1605260005|TANGO WAFER ECER 1000 ARTA @12|Sembako|Pack|9000|Berat Bersih (Netto): ±15g – 16g per pcs. Kemasan Jual (@12): 1 pak besar berisi 12 renceng|1605260005|
18|1605260002|TANGO WAFER ECER 2000 ARTA @6|Sembako|Pack|16500|Berat Bersih (Netto): ±37 gram per bungkus. Harga Jual Eceran (HJE): Rp2.000 per bungkus|1605260002|
19|2305260001|TANGO WAFFLE ARTA @8|Sembako|Pack|20000|Berat Bersih per Sachet: 25 gram. Isi per Box: 12 pcs (+ bonus 1 sachet pada promo tertentu, total 12–13 pcs)|2305260001|
20|2606260001|TANGO WAFFLE WAHH ARTA @6|Sembako|Pack|20000|Isi Paket: 6 pcs (per unit atau per ikat penjualan). Berat Bersih: Bervariasi sekitar 22–25 gram per buah|2606260001|
21|2605260001|TANGO WALUT ARTA @6|Sembako|Pack|17500|Isi dalam Box: 6 saset / pcs. Berat Bersih per Pcs: 12,5 gram. Berat Bersih Total Box: ±75 gram|2605260001|
22|2504260007|(ECER) SOLASI HITAM BERRY/ABRO/ABADI/JOM|Palen|Biji|2500|Fungsi Utama: Pelindung sambungan kabel listrik, pencegah korsleting, dan perbaikan darurat rumah tangga. Bahan: PVC lentur atau kain rekat tinggi|2504260007|
23|3001240001|SOLASI ABADI TAPE MURAH|ATK|Slop|1500|Lebar: 24 mm (1 inci). Panjang: 60 yard, 72 meter, atau hingga 100 yard per rol. Warna: Transparan / Bening. Bahan: OPP film dengan lem akrilik|3001240001|
24|1508230001|SOLASI ABADI TEBAL 1/2X25@80|Palen|Slop|8500|Lebar: 1/2 inci atau 12 mm. Panjang: 25 yard (±22,8 meter per roll). Ketebalan: Kategori tebal|1508230001|
25|B02107|SOLASI BENING GOLDTAPE(1/2X10)@100|ATK|Slop|5250|Lebar: 1/2 inci (sekitar 12 mm). Panjang: 10 meter / 10 yard|B02107|
26|B06992|SOLASI BERRY HITAM 300 PVC TBL @60|ATK|Slop|21750|Jenis: Solasi PVC. Warna: Hitam. Ukuran: 300. Isi: 60 pcs|B06992|
27|3001240002|SOLASI BIMA MURAH|ATK|Slop|1500|Jenis: Solasi. Merk: Bima. Tipe: Murah|3001240002|
28|B04501|SOLASI FANCY/GLITTER @200|Palen|Slop|4000|Jenis: Solasi Fancy/Glitter. Isi: 200 pcs|B04501|
29|1512250004|SOLASI HITAM ABADI @60|Palen|Slop|3250|Jenis: Solasi. Warna: Hitam. Merk: Abadi. Isi: 60 pcs|1512250004|
30|B01354|SOLASI HITAM ABRO CLOTH @50|Palen|Slop|10750|Jenis: Solasi Cloth. Warna: Hitam. Merk: Abro. Isi: 50 pcs|B01354|
31|B02424|SOLASI HITAM ABRO PVC @66/54|Palen|Slop|12750|Jenis: Solasi PVC. Warna: Hitam. Merk: Abro. Ukuran: 66/54|B02424|
32|B00003|SOLASI HITAM GOLDTAPE ASLI II @50|Palen|Slop|8250|Jenis: Solasi. Warna: Hitam. Merk: Goldtape Asli II. Isi: 50 pcs|B00003|
33|B05220|SOLASI HITAM GOLDTOOOOP@77|Palen|Slop|3750|Jenis: Solasi. Warna: Hitam. Merk: Goldtoooop. Isi: 77 pcs|B05220|
34|1705230001|SOLASI HITAM SM/SELA/JOMBO/PAJERO @66|Palen|Slop|3250|Jenis: Solasi. Warna: Hitam. Tipe: SM/Sela/Jombo/Pajero. Isi: 66 pcs|1705230001|
35|2103250003|SOLASI HITAM SM @66|Palen|Slop|10750|Jenis: Solasi kertas. Merk: SM. Tipe: Tebal. Ukuran: 54/50/55|2103250003|
36|604240002|SOLASI KERTAS BERRY TIPIS @60|Palen|Slop|4000|Jenis: Solasi kertas. Merk: Berry. Tipe: Tipis. Isi: 60 pcs|604240002|
37|B06372|SOLASI KERTAS GOLDTAPE @50|ATK|Slop|6500|Jenis: Solasi kertas. Merk: Goldtape. Isi: 50 pcs|B06372|
38|408250001|SOLASI KERTAS JOMBOOO @66|Palen|Slop|3250|Jenis: Solasi kertas. Tipe: Jombooo. Isi: 66 pcs|408250001|
39|B06621|SOLASI KERTAS MACIDA TEBAL@54|Palen|Slop|10500|Jenis: Solasi kertas. Merk: Macida. Tipe: Tebal. Isi: 54 pcs|B06621|
40|2103250002|SOLASI KERTAS MACIDA TIPIS @60|Parfum|Slop|3250|Jenis: Solasi kertas. Merk: Macida. Tipe: Tipis. Isi: 60 pcs|2103250002|
41|2307260006|SOLASI KERTAS MILENIUM @50|Palen|Slop|5750|Jenis: Solasi kertas. Merk: Milenium. Isi: 50 pcs|2307260006|
42|808250015|SOLASI KERTAS OZZIE TIPIS @60|Palen|Slop|3000|Jenis: Solasi kertas. Merk: Ozzie. Tipe: Tipis. Isi: 60 pcs|808250015|
43|B04607|SOLASI KERTAS PAJERO TEBAL @50|Palen|Slop|17500|Jenis: Solasi kertas. Tipe: Pajero Tebal. Isi: 50 pcs|B04607|
44|B05526|LAKBAN OPP ABADI WARNA @72|Bangunan|Slop|48500|Jenis: Solasi. Merk/Tipe: Sella. Isi: 12 Pcs|B05526|
45|B06396|SOLASI KERTAS SM @60|Palen|Slop|3250|Jenis: Solasi kertas. Tipe: SM. Isi: 60 pcs|B06396|
46|905260005|KANOE TISU SERBAGUNA @40|Palen|Biji|6550|Jenis: Tisu serbaguna. Merk: Kanoe. Isi: 40 pcs|905260005|
47|1709240001|MINITIKI TISU BASAH IOS @32|Palen|Pack|2000|Jenis: Tisu basah. Merk: Minitiki. Tipe: IOS. Isi: 32 pcs|1709240001|
48|B03182|TISU BASAH CUSSONS ISI 2 BIRU @18|Palen|Pack|12250|Jenis: Tisu basah. Merk: Cussons. Isi kemasan: 2. Warna: Biru. Isi: 18 pcs|B03182|
49|B03184|TISU BASAH CUSSONS ISI 2 HIJAU @18|Palen|Pack|12250|Jenis: Tisu basah. Merk: Cussons. Isi kemasan: 2. Warna: Hijau. Isi: 18 pcs|B03184|
50|B03183|TISU BASAH CUSSONS ISI 2 UNGU @18|Palen|Pack|12250|Jenis: Tisu basah. Merk: Cussons. Isi kemasan: 2. Warna: Ungu. Isi: 18 pcs|B03183|
51|2204260001|TISU BASAH CUSSONS ISI 3 BIRU @12|Palen|Slop|16750|Jenis: Tisu basah. Merk: Cussons. Isi kemasan: 3. Warna: Biru. Isi: 12 pcs|2204260001|
52|1104260004|TISU BASAH CUSSONS ISI 3 HIJAU @12|Palen|Slop|16750|Jenis: Tisu basah. Merk: Cussons. Isi kemasan: 3. Warna: Hijau. Isi: 12 pcs|1104260004|
53|2510250001|TISU BASAH CUSSONS ISI 3 UNGU/PINK @12|Palen|Slop|16750|Jenis: Tisu basah. Merk: Cussons. Isi kemasan: 3. Warna: Ungu/Pink. Isi: 12 pcs|2510250001|
54|710250003|TISU BASAH KODOMO ISI 2 @24|Palen|Pack|11000|Jenis: Tisu basah. Merk: Kodomo. Isi kemasan: 2. Isi: 24 pcs|710250003|
55|1204250001|TISU BASAH MINIKIDI ISI 2+BNS 40S @18|Kosmetik|Pack|10000|Jenis: Tisu basah. Merk: Minikidi. Isi: 2 + bonus 40S. Isi: 18 pcs|1204250001|
56|2807260006|TISU BASAH MITU BANDED 2 50'S BIRU @24|Palen|Pack|11500|Jenis: Tisu basah. Merk: Mitu. Tipe: Banded 2. Isi: 50's. Warna: Biru. Isi: 24 pcs|2807260006|
57|2807260007|TISU BASAH MITU BANDED 2 50'S PINK @24|Palen|Pack|11500|Jenis: Tisu basah. Merk: Mitu. Tipe: Banded 2. Isi: 50's. Warna: Pink. Isi: 24 pcs|2807260007|
58|2807260008|TISU BASAH MITU BANDED 2 50'S UNGU @24|Palen|Pack|11500|Jenis: Tisu basah. Merk: Mitu. Tipe: Banded 2. Isi: 50's. Warna: Ungu. Isi: 24 pcs|2807260008|
59|1912240004|TISU BASAH MITU ECER 5000 BIDAN @72|Palen|Pcs|4200|Jenis: Tisu basah. Merk: Mitu. Tipe: Ecer 5000 Bidan. Isi: 72 pcs|1912240004|
60|B03171|TISU BASAH MITU ISI 2 @24|Palen|Pack|11250|Jenis: Tisu basah. Merk: Mitu. Isi kemasan: 2. Isi: 24 pcs|B03171|
61|B03326|TISU BASAH MITU ISI 6 (5000) RTG @12|Palen|Rtg|24500|Jenis: Tisu basah. Merk: Mitu. Isi kemasan: 6. Keterangan: 5000 RTG. Isi: 12 pcs|B03326|
62|B03027|TISU BASAH MITU RTG BIRU 4'S @12|Palen|Pack|18250|Jenis: Tisu basah. Merk: Mitu. Tipe: RTG. Isi: 4's. Warna: Biru. Isi: 12 pcs|B03027|
63|B03028|TISU BASAH MITU RTG PING 4'S @12|Palen|Pack|18250|Jenis: Tisu basah. Merk: Mitu. Tipe: RTG. Isi: 4's. Warna: Pink. Isi: 12 pcs|B03028|
64|310230001|TISU BASAH TIS ISI 2 @72|Palen|Pack|4000|Jenis: Tisu basah. Merk: TIS. Isi kemasan: 2. Isi: 72 pcs|310230001|
65|B07080|TISU BASAH TINS RENTENG @12|Palen|Rtg|20000|Jenis: Tisu basah. Merk: Tins. Tipe: Renteng. Isi: 12 pcs|B07080|
66|B06859|TISU BASAH WETKINS BIRU(2) @12|Palen|Pack|11250|Jenis: Tisu basah. Merk: Wetkins. Isi kemasan: 2. Warna: Biru. Isi: 12 pcs|B06859|
67|B06860|TISU BASAH WETKINS PINK(2) @12|Palen|Pack|11250|Jenis: Tisu basah. Merk: Wetkins. Isi kemasan: 2. Warna: Pink. Isi: 12 pcs|B06860|
68|B06676|TISU NICE 900gr @20|Palen|Pcs|34000|Jenis: Tisu Wajah. Merk: Nice. Berat: 900 gram|B06676|
69|B06445|TISU DAPUR SERVIETTES PIRING @12|Palen|Pack|15250|Jenis: Tisu dapur. Merk/Tipe: Serviettes Piring. Isi: 12 pcs|B06445|
70|2710230001|KOREK LAS VEGAS KOTAK @1000|Palen|Pcs|1500|Jenis: Korek. Merk: Las Vegas. Bentuk: Kotak. Isi: 1000 pcs|2710230001|
71|1604250001|KOREK LAS VEGAS MARS MAGNIT @1000|Palen|Pcs|1500|Jenis: Korek. Merk: Las Vegas. Tipe: Mars Magnit. Isi: 1000 pcs|1604250001|
72|1306250001|KOREK API G2000 GEMINI OVAL @1000|Palen|Pcs|1500|Jenis: Korek. Merk: G2000. Bentuk: Oval Premium. Isi: 1000 pcs|1306250001|
73|B05832|KOREK CRICKET MERAH @1000|Palen|Pcs|4000|Jenis: Korek. Merk: Cricket. Warna: Merah. Isi: 1000 pcs|B05832|
74|2712250008|HERBORIST BODY LOTION EMBOEN|Kosmetik|Biji|22000|Jenis: Body Lotion. Merk: Herborist. Varian: Emboen|2712250008|
75|2712250009|HERBORIST BODY LOTION SENDJA|Kosmetik|Biji|22000|Jenis: Body Lotion. Merk: Herborist. Varian: Sendja|2712250009|
76|B06305|HERBORIST BODY LOTION ZATUN 145ML @24|Kosmetik|Biji|25000|Jenis: Body Lotion. Merk: Herborist. Varian: Zaitun. Volume: 145 ml. Isi: 24 pcs|B06305|
77|2105250002|HERBORIST BODY SCRUB 100gr @36|Kosmetik|Pcs|20000|Jenis: Body Scrub. Merk: Herborist. Berat: 100 gram. Isi: 36 pcs|2105250002|
78|3105250011|HERBORIST BODY SCRUB GOLD 100GR @36|Kosmetik|Pcs|11000|Jenis: Body Scrub. Merk: Herborist. Varian: Gold. Berat: 100 gram. Isi: 36 pcs|3105250011|
79|1610250005|HERBORIST BODY SCRUB SEA SALT 100GR|Kosmetik|Biji|10000|Jenis: Body Scrub. Merk: Herborist. Varian: Sea Salt. Berat: 100 gram|1610250005|
80|B06385|HERBORIST BODYSERUM GLUTA SPF30 @12|Kosmetik|Pcs|27200|Jenis: Body Serum. Merk: Herborist. Varian: Gluta. SPF: 30. Isi: 12 pcs|B06385|
81|B06862|HERBORIST BODYSERUM LOTION 180ML @24|Kosmetik|Pcs|27200|Jenis: Body Serum Lotion. Merk: Herborist. Volume: 180 ml. Isi: 24 pcs|B06862|
82|403250001|HERBORIST BODYSERUM STRAW/MEL 180ML @24|Kosmetik|Pcs|27200|Jenis: Body Serum. Merk: Herborist. Varian: Straw/Mel. Volume: 180 ml. Isi: 24 pcs|403250001|
83|B06861|HERBORIST EXFL GEL SCRUB 150ML @24|Kosmetik|Pcs|22500|Jenis: Exfoliating Gel Scrub. Merk: Herborist. Volume: 150 ml. Isi: 24 pcs|B06861|
84|707250003|HERBORIST HBL COCONUT 200ML @12|Kosmetik|Biji|26400|Jenis: HBL. Merk: Herborist. Varian: Coconut. Volume: 200 ml. Isi: 12 pcs|707250003|
85|1610250004|HERBORIST LULUR GREENTEA 100G|Kosmetik|Biji|20000|Jenis: Lulur. Merk: Herborist. Varian: Greentea. Berat: 100 gram|1610250004|
86|2405250002|HERBORIST LULUR ZATUN 100GR @12|Kosmetik|Pcs|20000|Jenis: Lulur. Merk: Herborist. Varian: Zaitun. Berat: 100 gram. Isi: 12 pcs|2405250002|
87|908230002|HERBORIST MINERAL BODY SCRUB CUP @12|Kosmetik|Pcs|20000|Jenis: Mineral Body Scrub. Merk: Herborist. Bentuk: Cup. Isi: 12 pcs|908230002|
88|B03537|HERBORIST MINYAK ZAITUN 150ML @24|Palen|Pcs|20000|Jenis: Minyak Zaitun. Merk: Herborist. Volume: 150 ml. Isi: 24 pcs|B03537|
89|B03536|HERBORIST MINYAK ZAITUN 75ML @48|Palen|Pcs|35000|Jenis: Minyak Zaitun. Merk: Herborist. Volume: 75 ml. Isi: 48 pcs|B03536|
90|1604230002|HERBORIST OLIVE OIL 150ML @24|Palen|Pcs|35000|Jenis: Olive Oil. Merk: Herborist. Volume: 150 ml. Isi: 24 pcs|1604230002|
91|1604230003|HERBORIST OLIVE OIL 75ML @48|Palen|Pcs|35000|Jenis: Olive Oil. Merk: Herborist. Volume: 75 ml. Isi: 48 pcs|1604230003|
92|B02136|BULPEN AE7 BIRU @240|ATK|Pack|18250|Jenis: Pulpen. Tipe: AE7. Warna: Biru. Isi: 240 pcs|B02136|
93|B02006|BULPEN AE7 HTM @240|ATK|Pack|18250|Jenis: Pulpen. Tipe: AE7. Warna: Hitam. Isi: 240 pcs|B02006|
94|B02137|BULPEN AE7 MERAH @240|ATK|Pack|18250|Jenis: Pulpen. Tipe: AE7. Warna: Merah. Isi: 240 pcs|B02137|
95|2207260012|BULPEN CETEK ESL GP-234 BIRU @144|ATK|Pack|22000|Jenis: Pulpen Cetek. Merk: ESL. Tipe: GP-234. Warna: Biru. Isi: 144 pcs|2207260012|
96|2207260013|BULPEN CETEK ESL GP-234 HITAM @144|ATK|Pack|22000|Jenis: Pulpen Cetek. Merk: ESL. Tipe: GP-234. Warna: Hitam. Isi: 144 pcs|2207260013|
97|B01753|BULPEN CRISTAL LINE|ATK|Pcs|9000|Jenis: Pulpen. Tipe: Cristal Line|B01753|
98|B03888|BULPEN DEBOZ ISI 50|Palen|Pcs|32500|Jenis: Pulpen. Merk: Deboz. Isi: 50 pcs|B03888|
99|B04260|BULPEN EVERCOSS EV-1H/EV-1 @192|Palen|Pack|11000|Jenis: Pulpen. Merk: Evercoss. Tipe: EV-1H/EV-1. Isi: 192 pcs|B04260|
100|B04267|BULPEN FANCY 4 WRN @96|Palen|Pack|22000|Jenis: Pulpen. Tipe: Fancy. Warna: 4 warna. Isi: 96 pcs|B04267|
101|B00097|BULPEN FASTER C-600 @144|ATK|Pack|23000|Jenis: Pulpen. Merk: Faster. Tipe: C-600. Isi: 144 pcs|B00097|
102|B00725|BULPEN FASTER F3 @144|ATK|Pack|23000|Jenis: Pulpen. Merk: Faster. Tipe: F3. Isi: 144 pcs|B00725|
103|B03417|BULPEN FIRSTMAN MV-1|Palen|Pcs|18500|Jenis: Pulpen. Merk: Firstman. Tipe: MV-1|B03417|
104|B06512|BULPEN GEL APEL KOXI 910/913 @144|ATK|Pack|12500|Jenis: Pulpen Gel. Merk: Koxi. Tipe: Apel 910/913. Isi: 144 pcs|B06512|
105|2705230001|BULPEN GEL APEL NEON ORLEE 7008 @144|ATK|Pack|12750|Jenis: Pulpen Gel. Tipe: Apel Neon. Merk: Orlee. Model: 7008. Isi: 144 pcs|2705230001|
106|B03453|BULPEN GEL APEL SF-6060/8080|Palen|Pack|12250|Jenis: Pulpen Gel. Tipe: Apel. Model: SF-6060/8080|B03453|
107|2406230003|BULPEN GEL APEL V-TRO 301/302 @144|ATK|Pack|11000|Jenis: Pulpen Gel. Tipe: Apel V-Tro. Model: 301/302. Isi: 144 pcs|2406230003|
108|B01542|BULPEN GEL BUNGA|ATK|Pcs|14000|Jenis: Pulpen Gel. Tipe: Bunga|B01542|
109|B04447|BULPEN GEL CHOSCH 766|Palen|Pack|12000|Jenis: Pulpen Gel. Merk/Tipe: Chosch 766|B04447|
110|2509250006|BULPEN GEL CONCEPT CGP-61B @144|ATK|Pack|19500|Jenis: Pulpen Gel. Merk: Concept. Tipe: CGP-61B. Isi: 144 pcs|2509250006|
111|2401230003|BULPEN GEL DTIAN @192|ATK|Pack|13250|Jenis: Pulpen Gel. Merk: Dtian. Isi: 192 pcs|2401230003|
112|3008230002|BULPEN GEL EG-V TL6549 + MIKA @192|ATK|Pack|12250|Jenis: Pulpen Gel. Tipe: EG-V TL6549 + Mika. Isi: 192 pcs|3008230002|
113|2207260026|BULPEN GEL ES-1020 HITAM @144|ATK|Pack|13750|Jenis: Pulpen Gel. Tipe: ES-1020. Warna: Hitam. Isi: 144 pcs|2207260026|
114|705250001|BULPEN GEL ESCO 82 @144|ATK|Pack|9250|Jenis: Pulpen Gel. Merk: Esco. Tipe: 82. Isi: 144 pcs|705250001|
115|B06091|BULPEN GEL ESCO GP-822/830|ATK|Pcs|12000|Jenis: Pulpen Gel. Merk: Esco. Tipe: GP-822/830|B06091|
116|3011240001|BUKU ALFA/NEWSTAR 38 TULIS @32|ATK|Pack|23750|Jenis: Buku tulis. Merk: Alfa/Newstar. Ukuran: 38. Isi: 32 pcs|3011240001|
117|2406260003|BUKU ALFA/NEWSTAR TULIS 32 @40|ATK|Pack|21000|Jenis: Buku tulis. Merk: Alfa/Newstar. Ukuran: 32. Isi: 40 pcs|2406260003|
118|2303240001|BUKU ALL STAR 32 TULIS @36|ATK|Pack|21250|Jenis: Buku tulis. Merk: All Star. Ukuran: 32. Isi: 36 pcs|2303240001|
119|2303240002|BUKU ALL STAR 38 TULIS @32|ATK|Pack|24500|Jenis: Buku tulis. Merk: All Star. Ukuran: 38. Isi: 32 pcs|2303240002|
120|2303240003|BUKU ALL STAR 58 TULIS @20|ATK|Pack|34250|Jenis: Buku tulis. Merk: All Star. Ukuran: 58. Isi: 20 pcs|2303240003|
121|2303240004|BUKU ALL STAR BOXY 30 TULIS @24|ATK|Pack|33250|Jenis: Buku tulis. Merk: All Star. Tipe: Boxy. Ukuran: 30. Isi: 24 pcs|2303240004|
122|2303240005|BUKU ALL STAR BOXY 36 TULIS @24|ATK|Pack|36500|Jenis: Buku tulis. Merk: All Star. Tipe: Boxy. Ukuran: 36. Isi: 24 pcs|2303240005|
123|2303240006|BUKU ALL STAR BOXY 42 TULIS @16|ATK|Pack|39000|Jenis: Buku tulis. Merk: All Star. Tipe: Boxy. Ukuran: 42. Isi: 16 pcs|2303240006|
124|2303240007|BUKU ALL STAR BOXY 50 TULIS @20|ATK|Pack|48750|Jenis: Buku tulis. Merk: All Star. Tipe: Boxy. Ukuran: 50. Isi: 20 pcs|2303240007|
125|406250005|BUKU BEST ONE BOXY 50 @16|ATK|Pack|41000|Jenis: Buku. Merk: Best One. Tipe: Boxy. Ukuran: 50. Isi: 16 pcs|406250005|
126|406250004|BUKU BEST ONE HALUS 38 @32|ATK|Pack|23750|Jenis: Buku. Merk: Best One. Tipe: Halus. Ukuran: 38. Isi: 32 pcs|406250004|
127|406250001|BUKU BEST ONE KOTAK BSR @48|ATK|Pack|20000|Jenis: Buku. Merk: Best One. Tipe: Kotak BSR. Isi: 48 pcs|406250001|
128|2805260003|BUKU BEST ONE KOTAK KCL @32|ATK|Pack|22250|Jenis: Buku. Merk: Best One. Tipe: Kotak KCL. Isi: 32 pcs|2805260003|
129|2805260008|BUKU BEST ONE KOTAK TGG @48|ATK|Pack|18250|Jenis: Buku. Merk: Best One. Tipe: Kotak TGG. Isi: 48 pcs|2805260008|
130|406250002|BUKU BEST ONE TULIS 32 @40|ATK|Pack|20000|Jenis: Buku tulis. Merk: Best One. Ukuran: 32. Isi: 40 pcs|406250002|
131|1804250002|BUKU BEST ONE TULIS 38 @32|ATK|Pack|22750|Jenis: Buku tulis. Merk: Best One. Ukuran: 38. Isi: 32 pcs|1804250002|
132|406250003|BUKU BEST ONE TULIS 58 @24|ATK|Pack|33750|Jenis: Buku tulis. Merk: Best One. Ukuran: 58. Isi: 24 pcs|406250003|
133|1207240003|BUKU BOXY BIGBOSSSSS SIDU 36 @20|ATK|Pack|35750|Jenis: Buku. Tipe: Boxy. Merk: Sidu. Nama: Bigbosssss. Ukuran: 36. Isi: 20 pcs|1207240003|
134|B00433|BUKU BOXY BIGBOSSS SIDU 42 @24|ATK|Pack|24250|Jenis: Buku. Tipe: Boxy. Merk: Sidu. Nama: Bigbosss. Ukuran: 42. Isi: 24 pcs|B00433|
135|2206260001|BUKU BOXY VISION 36 @24|ATK|Pack|28750|Jenis: Buku. Tipe: Boxy. Merk: Vision. Ukuran: 36. Isi: 24 pcs|2206260001|
136|1405250004|BUKU BOXY VISION 42 @24|ATK|Pack|20000|Jenis: Buku. Tipe: Boxy. Merk: Vision. Ukuran: 42. Isi: 24 pcs|1405250004|
137|2206260002|BUKU BOXY VISION 50 @16|ATK|Pack|37750|Jenis: Buku. Tipe: Boxy. Merk: Vision. Ukuran: 50. Isi: 16 pcs|2206260002|
138|1501260006|BUKU GAMBAR BIASA|ATK|Pack|15000|Jenis: Buku gambar. Tipe: Biasa|1501260006|
139|B00049|BUKU GBR A3 DODO @10|ATK|Pack|48000|Jenis: Buku gambar. Merk: Dodo. Ukuran: A3. Isi: 10 pcs|B00049|
140|B06931|HAIR BODY MIST MARINA 100ML @36|Palen|Pcs|9500|Jenis: Hair Body Mist. Merk: Marina. Volume: 100 ml. Isi: 36 pcs|B06931|
141|B04531|HBL MARINA NATURAL 100ML HIJAU @12|Palen|Slop|23250|Jenis: HBL. Merk: Marina Natural. Volume: 100 ml. Warna: Hijau. Isi: 12 pcs|B04531|
142|B04530|HBL MARINA NATURAL 100ML KUNING @12|Palen|Slop|23250|Jenis: HBL. Merk: Marina Natural. Volume: 100 ml. Warna: Kuning. Isi: 12 pcs|B04530|
143|B04584|HBL MARINA NATURAL 100ML ORANGE @12|Palen|Slop|23250|Jenis: HBL. Merk: Marina Natural. Volume: 100 ml. Warna: Orange. Isi: 12 pcs|B04584|
144|B04529|HBL MARINA NATURAL 100ML PINK @12|Palen|Slop|23250|Jenis: HBL. Merk: Marina Natural. Volume: 100 ml. Warna: Pink. Isi: 12 pcs|B04529|
145|1206240010|HBL MARINA NATURAL 150ML+ HIJAU @8|Kosmetik|Slop|33500|Jenis: HBL. Merk: Marina Natural. Volume: 150 ml+. Warna: Hijau. Isi: 8 pcs|1206240010|
146|1206240011|HBL MARINA NATURAL 150ML+ KUNING @8|Kosmetik|Slop|33500|Jenis: HBL. Merk: Marina Natural. Volume: 150 ml+. Warna: Kuning. Isi: 8 pcs|1206240011|
147|1206240012|HBL MARINA NATURAL 150ML+ ORANGE @8|Kosmetik|Slop|33500|Jenis: HBL. Merk: Marina Natural. Volume: 150 ml+. Warna: Orange. Isi: 8 pcs|1206240012|
148|1206240013|HBL MARINA NATURAL 150ML+ PINK @8|Kosmetik|Slop|33500|Jenis: HBL. Merk: Marina Natural. Volume: 150 ml+. Warna: Pink. Isi: 8 pcs|1206240013|
149|1206240014|HBL MARINA NATURAL 150ML+ UNGU @8|Kosmetik|Slop|33500|Jenis: HBL. Merk: Marina Natural. Volume: 150 ml+. Warna: Ungu. Isi: 8 pcs|1206240014|
150|B04586|HBL MARINA NATURAL 190ML UNGU @8|Palen|Slop|39000|Jenis: HBL. Merk: Marina Natural. Volume: 190 ml. Warna: Ungu. Isi: 8 pcs|B04586|
151|B04587|HBL MARINA NATURAL 200ML HIJAU @8|Palen|Slop|39000|Jenis: HBL. Merk: Marina Natural. Volume: 200 ml. Warna: Hijau. Isi: 8 pcs|B04587|
152|B04585|HBL MARINA NATURAL 200ML KUNING @8|Palen|Slop|39000|Jenis: HBL. Merk: Marina Natural. Volume: 200 ml. Warna: Kuning. Isi: 8 pcs|B04585|
153|B02298|HBL MARINA NATURAL 200ML ORANGE @8|Kosmetik|Slop|39000|Jenis: HBL. Merk: Marina Natural. Volume: 200 ml. Warna: Orange. Isi: 8 pcs|B02298|
154|B04867|HBL MARINA NATURAL 200ML PINK @8|Palen|Slop|39000|Jenis: HBL. Merk: Marina Natural. Volume: 200 ml. Warna: Pink. Isi: 8 pcs|B04867|
155|704250005|HBL MARINA NATURAL 350ML HIJAU @12|Kosmetik|Pcs|11500|Jenis: HBL. Merk: Marina Natural. Volume: 350 ml. Warna: Hijau. Isi: 12 pcs|704250005|
156|707250005|HBL MARINA NATURAL 350ML KUNING @12|Palen|Pcs|11500|Jenis: HBL. Merk: Marina Natural. Volume: 350 ml. Warna: Kuning. Isi: 12 pcs|707250005|
157|704250004|HBL MARINA NATURAL 350ML ORANGE @12|Kosmetik|Pcs|11500|Jenis: HBL. Merk: Marina Natural. Volume: 350 ml. Warna: Orange. Isi: 12 pcs|704250004|
158|704250006|HBL MARINA NATURAL 350ML PINK @12|Kosmetik|Pcs|11500|Jenis: HBL. Merk: Marina Natural. Volume: 350 ml. Warna: Pink. Isi: 12 pcs|704250006|
159|1606250004|HBL MARINA NATURAL 75ML HIJAU @12|Palen|Slop|20000|Jenis: HBL. Merk: Marina Natural. Volume: 75 ml. Warna: Hijau. Isi: 12 pcs|1606250004|
160|1606250005|HBL MARINA NATURAL 75ML KUNING @12|Palen|Slop|20000|Jenis: HBL. Merk: Marina Natural. Volume: 75 ml. Warna: Kuning. Isi: 12 pcs|1606250005|
161|1606250006|HBL MARINA NATURAL 75ML ORANGE @12|Palen|Slop|20000|Jenis: HBL. Merk: Marina Natural. Volume: 75 ml. Warna: Orange. Isi: 12 pcs|1606250006|
162|1606250007|HBL MARINA NATURAL 75ML PINK @12|Palen|Slop|20000|Jenis: HBL. Merk: Marina Natural. Volume: 75 ml. Warna: Pink. Isi: 12 pcs|1606250007|
163|B02260|HBL MARINA NATURAL 95ML UNGU @12|Palen|Slop|23250|Jenis: HBL. Merk: Marina Natural. Volume: 95 ml. Warna: Ungu. Isi: 12 pcs|B02260|
164|B03053|SEMIR MIRANDA KECIL MC-1 @144|Palen|Pcs|12750|Jenis: Semir. Merk: Miranda. Ukuran: Kecil. Kode: MC-1. Isi: 144 pcs|B03053|
165|B04575|SEMIR MIRANDA KECIL MC-10 @144|Palen|Pcs|12750|Jenis: Semir. Merk: Miranda. Ukuran: Kecil. Kode: MC-10. Isi: 144 pcs|B04575|
166|B04576|SEMIR MIRANDA KECIL MC-11 @144|Palen|Pcs|12750|Jenis: Semir. Merk: Miranda. Ukuran: Kecil. Kode: MC-11. Isi: 144 pcs|B04576|
167|B04577|SEMIR MIRANDA KECIL MC-12 @144|Palen|Pcs|12750|Jenis: Semir. Merk: Miranda. Ukuran: Kecil. Kode: MC-12. Isi: 144 pcs|B04577|
168|B04579|SEMIR MIRANDA KECIL MC-13 @144|Palen|Pcs|12750|Jenis: Semir. Merk: Miranda. Ukuran: Kecil. Kode: MC-13. Isi: 144 pcs|B04579|
169|B04580|SEMIR MIRANDA KECIL MC-14 @144|Palen|Pcs|12750|Jenis: Semir. Merk: Miranda. Ukuran: Kecil. Kode: MC-14. Isi: 144 pcs|B04580|
170|B04581|SEMIR MIRANDA KECIL MC-15 @144|Palen|Pcs|12750|Jenis: Semir. Merk: Miranda. Ukuran: Kecil. Kode: MC-15. Isi: 144 pcs|B04581|
171|B04582|SEMIR MIRANDA KECIL MC-16 @144|Palen|Pcs|12750|Jenis: Semir. Merk: Miranda. Ukuran: Kecil. Kode: MC-16. Isi: 144 pcs|B04582|
172|B04967|SEMIR MIRANDA KECIL MC-17 @144|Palen|Pcs|12750|Jenis: Semir. Merk: Miranda. Ukuran: Kecil. Kode: MC-17. Isi: 144 pcs|B04967|
173|B04966|SEMIR MIRANDA KECIL MC-18 @144|Palen|Pcs|12750|Jenis: Semir. Merk: Miranda. Ukuran: Kecil. Kode: MC-18. Isi: 144 pcs|B04966|
174|B04969|SEMIR MIRANDA KECIL MC-19 @144|Palen|Pcs|12750|Jenis: Semir. Merk: Miranda. Ukuran: Kecil. Kode: MC-19. Isi: 144 pcs|B04969|
175|B04567|SEMIR MIRANDA KECIL MC-2 @144|Palen|Pcs|12750|Jenis: Semir. Merk: Miranda. Ukuran: Kecil. Kode: MC-2. Isi: 144 pcs|B04567|
176|2003240001|SEMIR MIRANDA KECIL MC-20 @144|Palen|Pcs|12750|Jenis: Semir. Merk: Miranda. Ukuran: Kecil. Kode: MC-20. Isi: 144 pcs|2003240001|
177|311250001|SEMIR MIRANDA KECIL MC-21 @144|Palen|Biji|12750|Jenis: Semir. Merk: Miranda. Ukuran: Kecil. Kode: MC-21. Isi: 144 pcs|311250001|
178|1501260003|SEMIR MIRANDA KECIL MC-22 @144|Palen|Biji|12750|Jenis: Semir. Merk: Miranda. Ukuran: Kecil. Kode: MC-22. Isi: 144 pcs|1501260003|
179|1501260004|SEMIR MIRANDA KECIL MC-23 @144|Palen|Biji|12750|Jenis: Semir. Merk: Miranda. Ukuran: Kecil. Kode: MC-23. Isi: 144 pcs|1501260004|
180|1501260005|SEMIR MIRANDA KECIL MC-24 @144|Palen|Biji|12750|Jenis: Semir. Merk: Miranda. Ukuran: Kecil. Kode: MC-24. Isi: 144 pcs|1501260005|
181|B04568|SEMIR MIRANDA KECIL MC-3 @144|Palen|Pcs|12750|Jenis: Semir. Merk: Miranda. Ukuran: Kecil. Kode: MC-3. Isi: 144 pcs|B04568|
182|B04569|SEMIR MIRANDA KECIL MC-4 @144|Palen|Pcs|12750|Jenis: Semir. Merk: Miranda. Ukuran: Kecil. Kode: MC-4. Isi: 144 pcs|B04569|
183|B04570|SEMIR MIRANDA KECIL MC-5 @144|Palen|Pcs|12750|Jenis: Semir. Merk: Miranda. Ukuran: Kecil. Kode: MC-5. Isi: 144 pcs|B04570|
184|B04571|SEMIR MIRANDA KECIL MC-6 @144|Palen|Pcs|12750|Jenis: Semir. Merk: Miranda. Ukuran: Kecil. Kode: MC-6. Isi: 144 pcs|B04571|
185|B04572|SEMIR MIRANDA KECIL MC-7 @144|Palen|Pcs|12750|Jenis: Semir. Merk: Miranda. Ukuran: Kecil. Kode: MC-7. Isi: 144 pcs|B04572|
186|B04573|SEMIR MIRANDA KECIL MC-8 @144|Palen|Pcs|12750|Jenis: Semir. Merk: Miranda. Ukuran: Kecil. Kode: MC-8. Isi: 144 pcs|B04573|
187|B04574|SEMIR MIRANDA KECIL MC-9 @144|Palen|Pcs|12750|Jenis: Semir. Merk: Miranda. Ukuran: Kecil. Kode: MC-9. Isi: 144 pcs|B04574|
188|B06964|LIPCREAM NUFACE NO.10 @192|Kosmetik|Pcs|18250|Jenis: Lipcream. Merk: Nuface. No.: 10. Isi: 192 pcs|B06964|
189|B06965|LIPCREAM NUFACE NO.11 @192|Kosmetik|Pcs|18250|Jenis: Lipcream. Merk: Nuface. No.: 11. Isi: 192 pcs|B06965|
190|B06966|LIPCREAM NUFACE NO.12 @192|Kosmetik|Pcs|18250|Jenis: Lipcream. Merk: Nuface. No.: 12. Isi: 192 pcs|B06966|
191|B06956|LIPCREAM NUFACE NO.2 @192|Kosmetik|Pcs|18250|Jenis: Lipcream. Merk: Nuface. No.: 2. Isi: 192 pcs|B06956|
192|B06957|LIPCREAM NUFACE NO.3 @192|Kosmetik|Pcs|18250|Jenis: Lipcream. Merk: Nuface. No.: 3. Isi: 192 pcs|B06957|
193|B06958|LIPCREAM NUFACE NO.4 @192|Kosmetik|Pcs|18250|Jenis: Lipcream. Merk: Nuface. No.: 4. Isi: 192 pcs|B06958|
194|B06959|LIPCREAM NUFACE NO.5 @192|Kosmetik|Pcs|18250|Jenis: Lipcream. Merk: Nuface. No.: 5. Isi: 192 pcs|B06959|
195|B06960|LIPCREAM NUFACE NO.6 @192|Kosmetik|Pcs|18250|Jenis: Lipcream. Merk: Nuface. No.: 6. Isi: 192 pcs|B06960|
196|B06961|LIPCREAM NUFACE NO.7 @192|Kosmetik|Pcs|18250|Jenis: Lipcream. Merk: Nuface. No.: 7. Isi: 192 pcs|B06961|
197|B06962|LIPCREAM NUFACE NO.8 @192|Kosmetik|Pcs|18250|Jenis: Lipcream. Merk: Nuface. No.: 8. Isi: 192 pcs|B06962|
198|B06963|LIPCREAM NUFACE NO.9 @192|Kosmetik|Pcs|18250|Jenis: Lipcream. Merk: Nuface. No.: 9. Isi: 192 pcs|B06963|
199|1610250002|NUFACE LIPCARE SET|Kosmetik|Set|43500|Merk: Nuface. Jenis: Lipcare Set|1610250002|
200|3105250003|NUFACE LOOSE POWDER 01 12gr @24|Kosmetik|Pcs|39250|Merk: Nuface. Jenis: Loose Powder. No.: 01. Berat: 12 gram. Isi: 24 pcs|3105250003|
201|3105250004|NUFACE LOOSE POWDER 02 12gr @24|Kosmetik|Pcs|39250|Merk: Nuface. Jenis: Loose Powder. No.: 02. Berat: 12 gram. Isi: 24 pcs|3105250004|
202|1002260002|NUFACE MICELLAR WATER SOOTHE & CALM|Kosmetik|Biji|28000|Merk: Nuface. Jenis: Micellar Water. Varian: Soothe & Calm|1002260002|
203|1002260003|NUFACE MICELLAR WATER WATERPROOF|Kosmetik|Biji|36050|Merk: Nuface. Jenis: Micellar Water. Varian: Waterproof|1002260003|
204|3105250013|NUFACE SATZETT GLOWCREAM 30GR @12|Kosmetik|Pcs|34750|Merk: Nuface. Jenis: Satzett Glowcream. Berat: 30 gram. Isi: 12 pcs|3105250013|
205|3105250005|NUFACE SERUM CUSHION 01 12gr @24|Kosmetik|Pcs|61500|Merk: Nuface. Jenis: Serum Cushion. No.: 01. Berat: 12 gram. Isi: 24 pcs|3105250005|
206|3105250006|NUFACE SERUM CUSHIONS 02 12gr @24|Kosmetik|Pcs|61500|Merk: Nuface. Jenis: Serum Cushion. No.: 02. Berat: 12 gram. Isi: 24 pcs|3105250006|
207|3105250007|NUFACE SUNSCREEN 50GR SPF 30 TU @24|Kosmetik|Pcs|29750|Merk: Nuface. Jenis: Sunscreen. Berat: 50 gram. SPF: 30. Tipe: TU. Isi: 24 pcs|3105250007|
208|3105250008|NUFACE SUNSCREEN 50GR SPF 50PA @24|Kosmetik|Pcs|28550|Merk: Nuface. Jenis: Sunscreen. Berat: 50 gram. SPF: 50PA. Isi: 24 pcs|3105250008|
209|3105250012|NUFACE SUNSCREEN 50GR SPF 50PA++ @24|Kosmetik|Pcs|49250|Merk: Nuface. Jenis: Sunscreen. Berat: 50 gram. SPF: 50PA++. Isi: 24 pcs|3105250012|
210|111250007|NUFACE SUNSCREEN SERUM SPF 50|Kosmetik|Biji|84250|Merk: Nuface. Jenis: Sunscreen Serum. SPF: 50|111250007|
211|3101250003|NUFACE VIT C SERUM|Kosmetik|Biji|17500|Merk: Nuface. Jenis: Vitamin C Serum|3101250003|
212|B03101|BEDAK MITU 100+50GR @36|Keperluan Bayi & Anak|Pcs|7069|Merk: Mitu. Jenis: Bedak. Berat: 100+50 gram. Isi: 36 pcs|B03101|
213|B06584|BEDAK MITU 50GR @36|Keperluan Bayi & Anak|Pcs|11500|Merk: Mitu. Jenis: Bedak. Berat: 50 gram. Isi: 36 pcs|B06584|
214|B03171|TISU BASAH MITU BANDED 2/50'S @24|Keperluan Bayi & Anak|Pack|4250|Merk: Mitu. Jenis: Tisu Basah. Tipe: Banded 2. Isi: 50's. Isi kemasan: 24 pcs|B03171|
215|2807260010|TISU BASAH MITU BANDED 2/50'S PINK @24|Keperluan Bayi & Anak|Pack|11500|Merk: Mitu. Jenis: Tisu Basah. Tipe: Banded 2. Isi: 50's. Warna: Pink. Isi kemasan: 24 pcs|2807260010|
216|2807260009|TISU BASAH MITU BANDED 2/50'S @24|Keperluan Bayi & Anak|Pack|11500|Merk: Mitu. Jenis: Tisu Basah. Tipe: Banded 2. Isi: 50's. Isi kemasan: 24 pcs|2807260009|
217|2807260011|TISU BASAH MITU BANDED 2/50'S @72|Keperluan Bayi & Anak|Pack|11500|Merk: Mitu. Jenis: Tisu Basah. Tipe: Banded 2. Isi: 50's. Isi kemasan: 72 pcs|2807260011|
218|808250008|TISU BASAH MITU ECR 5000 25'S @72|Keperluan Bayi & Anak|Pcs|11500|Merk: Mitu. Jenis: Tisu Basah. Tipe: ECR 5000. Isi: 25's. Isi kemasan: 72 pcs|808250008|
219|B03326|TISU BASAH MITU 15'S @12|Keperluan Bayi & Anak|Rtg|4200|Merk: Mitu. Jenis: Tisu Basah. Isi: 15's. Isi kemasan: 12 pcs|B03326|
220|B03028|TISU BASAH MITU 1ST GIRL 4'S @12|Keperluan Bayi & Anak|Pack|24500|Merk: Mitu. Jenis: Tisu Basah. Varian: 1st Girl. Isi: 4's. Isi kemasan: 12 pcs|B03028|
221|B03027|TISU BASAH MITU TWIN 4'S @12|Keperluan Bayi & Anak|Pack|18250|Merk: Mitu. Jenis: Tisu Basah. Tipe: Twin. Isi: 4's. Isi kemasan: 12 pcs|B03027|
222|1804250001|PAPAYA BY MAYMAYA BESAR 135GR @96|Palen|Pack|9020|Merk: Maymaya. Jenis: Papaya. Ukuran: Besar. Berat: 135 gram. Isi: 96 pcs|1804250001|
223|B03513|PAPAYA BY MAYMAYA KECIL 70GR @PCS|Palen|Pcs|5625|Merk: Maymaya. Jenis: Papaya. Ukuran: Kecil. Berat: 70 gram|B03513|
224|1204250001|PAPAYE FACEWASH SCRUB LECORA 110ML @PCS|Kosmetik|Pack|15750|Merk: Lecora. Jenis: Papaye Facewash Scrub. Volume: 110 ml|1204250001|
225|B00833|PAPER CLIP NO.3 ESENLON @50|ATK|Pack|13500|Jenis: Paper Clip. Ukuran: No.3. Merk: Esenlon. Isi: 50 pcs|B00833|
226|B06925|PAPER CLIP NO.3 ESTIKA @50|ATK|Pack|13500|Jenis: Paper Clip. Ukuran: No.3. Merk: Estika. Isi: 50 pcs|B06925|
227|B03885|PAPER CLIP WINSTA (12SET) @48|ATK|Pack|31500|Jenis: Paper Clip. Merk: Winsta. Isi: 12 set. Jumlah: 48 pcs|B03885|
228|B02102|PAPER CLIP WRN TOYKO @24|ATK|Pack|17750|Jenis: Paper Clip. Warna: Warna-warni. Merk: Toyko. Isi: 24 pcs|B02102|
229|B05497|PAPER: FASTENER COLOR|ATK|Pcs|34000|Jenis: Paper Fastener. Warna: Color|B05497|
230|B04710|PAPER FASTENER WHITE @100|ATK|Pack|7500|Jenis: Paper Fastener. Warna: Putih. Isi: 100 pcs|B04710|
231|B04709|PAPER GET 5070 (3T)|ATK|Pcs|8250|Jenis: Paper Get. Kode: 5070. Ukuran: 3T|B04709|
232|B07045|PAPER GIFT METAL (A)|ATK|Pcs|42000|Jenis: Paper Gift. Material: Metal. Tipe: A|B07045|
233|B07058|PAPER CLIP KENKO NO.1|ATK|Pcs|52500|Jenis: Paper Clip. Merk: Kenko. Ukuran: No.1|B07058|
234|B02637|PAPERCLIP :KENKO NO.3|ATK|Pcs|12500|Jenis: Paper Clip. Merk: Kenko. Ukuran: No.3|B02637|
235|B02638|PAPERCLIP KENKO NO.5|ATK|Pcs|8750|Jenis: Paper Clip. Merk: Kenko. Ukuran: No.5|B02638|
236|B02193|PAPERCLIP WRN VAN-ART|ATK|Pack|44000|Jenis: Paper Clip. Warna: Warna-warni. Merk: Van-Art|B02193|
237|B03909|PARANET 3MX100M KOKI|ATK|Pcs|725000|Jenis: Paranet. Ukuran: 3 m × 100 m. Merk: Koki|B03909|
238|B06218|SOFTEX BEARY COOL 23CM WING 14P @PAK|Palen|Pack|15000|Jenis: Softex. Varian: Beary Cool. Ukuran: 23 cm. Tipe: Wing. Isi: 14P. Satuan: Pak|B06218|
239|108260017|SOFTEX BEARY COOL NIGHT 23CM WING 14P @PAK|Palen|Pack|15000|Jenis: Softex. Varian: Beary Cool Night. Ukuran: 23 cm. Tipe: Wing. Isi: 14P. Satuan: Pak|108260017|
240|108260015|SOFTEX BEARY COOL NIGHT 36CM WING @PAK|Palen|Pack|15000|Jenis: Softex. Varian: Beary Cool Night. Ukuran: 36 cm. Tipe: Wing. Satuan: Pak|108260015|
241|108260016|SOFTEX COMFORT NIGHT AB L 29CM WING @PAK|Palen|Pack|9000|Jenis: Softex. Varian: Comfort Night AB. Ukuran: L, 29 cm. Tipe: Wing. Satuan: Pak|108260016|
242|108260022|SOFTEX COMFORT NIGHT ABL 42CM WING @PAK|Palen|Pack|23000|Jenis: Softex. Varian: Comfort Night ABL. Ukuran: 42 cm. Tipe: Wing. Satuan: Pak|108260022|
243|108260013|SOFTEX COMFORT NIGHT ABL 29CM 2P @PAK|Palen|Rtg|21750|Jenis: Softex. Varian: Comfort Night ABL. Ukuran: 29 cm. Isi: 2P. Satuan: Pak|108260013|
244|303260004|SOFTEX COMFORT NIGHT ABL 36CM WING @PAK|Palen|Rtg|21750|Jenis: Softex. Varian: Comfort Night ABL. Ukuran: 36 cm. Tipe: Wing. Satuan: Pak|303260004|
245|303260003|SOFTEX DAUN SIRIH 23CM 10P @PAK|Palen|Pack|16000|Jenis: Softex. Varian: Daun Sirih. Ukuran: 23 cm. Isi: 10P. Satuan: Pak|303260003|
246|108260014|SOFTEX DAUN SIRIH 23CM WING 20P @PAK|Palen|Pack|13250|Jenis: Softex. Varian: Daun Sirih. Ukuran: 23 cm. Tipe: Wing. Isi: 20P. Satuan: Pak|108260014|
247|108260019|SOFTEX DAUN SIRIH 29CM WING 8P @PAK|Palen|Pack|17000|Jenis: Softex. Varian: Daun Sirih. Ukuran: 29 cm. Tipe: Wing. Isi: 8P. Satuan: Pak|108260019|
248|108260018|SOFTEX DAUN SIRIH 29CM WING 6P @PAK|Palen|Pack|20000|Jenis: Softex. Varian: Daun Sirih. Ukuran: 29 cm. Tipe: Wing. Isi: 6P. Satuan: Pak|108260018|
249|108260021|SOFTEX DAUN SIRIH PANTY LINER @PAK|Palen|Pack|9650|Jenis: Softex. Varian: Daun Sirih. Jenis: Panty Liner. Satuan: Pak|108260021|
250|108260020|SOFTEX DAUN SIRIH PANTYLINER LONG @PAK|Palen|Pack|16000|Jenis: Softex. Varian: Daun Sirih. Jenis: Pantyliner Long. Satuan: Pak|108260020|
'@

$rawTools = @'
1|CCTV|22|BAIK|Kamera pengawas IP/analog, resolusi HD/Full HD, infrared/night vision, dilengkapi DVR/NVR|Security & Digital|https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=500&auto=format&fit=crop&q=80
2|FORKLIFT|1|BAIK|Kapasitas angkat ±2–3 ton, tenaga diesel/elektrik, mast hidrolik, garpu adjustable|Heavy Equipment|https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=500&auto=format&fit=crop&q=80
3|TANGGA GUDANG|10|BAIK|Berbahan besi/aluminium, tinggi ±2–4 meter, anak tangga anti-slip, dilengkapi pengaman|Warehouse Tool|https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500&auto=format&fit=crop&q=80
4|RAK|70|BAIK|Rak penyimpanan berbahan baja, kapasitas ±200–500 kg/level, tinggi dan susunan rak dapat disesuaikan|Storage & Racking|https://images.unsplash.com/photo-1586528116493-a029325540fa?w=500&auto=format&fit=crop&q=80
5|PALLET|100|BAIK|Berbahan plastik/kayu, ukuran ±110 × 110 cm, kapasitas beban sesuai kebutuhan gudang|Handling Tool|https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=500&auto=format&fit=crop&q=80
6|PAPAN TULIS|28|BAIK|Whiteboard, permukaan melamin/porcelain, ukuran ±120 × 240 cm, dilengkapi frame|Office & Admin|https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?w=500&auto=format&fit=crop&q=80
7|ETALASE|13|BAIK|Etalase kaca dengan rangka aluminium/besi, beberapa tingkat/rak, digunakan untuk display barang|Display & Shop|https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=500&auto=format&fit=crop&q=80
8|PC|8|BAIK|Processor minimal Core i3/Ryzen 3, RAM ≥8 GB, SSD ≥256 GB, dilengkapi sistem operasi|IT & Digital|https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=500&auto=format&fit=crop&q=80
9|SCANNER BARCODE|4|BAIK|Barcode scanner USB, teknologi laser/CCD/imager, mendukung barcode 1D/2D|IT & Digital|https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=500&auto=format&fit=crop&q=80
10|TROLLI L|3|BAIK|Troli model L, rangka besi, roda caster, kapasitas ±200–300 kg|Material Handling|https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=500&auto=format&fit=crop&q=80
11|TROLLI DORONG|20|BAIK|Troli dorong manual, rangka besi, 4 roda caster, kapasitas ±300–500 kg|Material Handling|https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=500&auto=format&fit=crop&q=80
12|TROLLI TARIK|50|BAIK|Troli tarik manual, rangka baja, dilengkapi pegangan/towing handle, kapasitas ±500–1.000 kg|Material Handling|https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=500&auto=format&fit=crop&q=80
13|MOBIL BOX KECIL|4|BAIK|Kendaraan box ringan, bak tertutup, kapasitas muatan ±700–1.000 kg|Fleet & Delivery|https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=500&auto=format&fit=crop&q=80
14|TRUK LONG|2|BAIK|Truk bak panjang/long chassis, kapasitas muatan ±4–6 ton|Fleet & Delivery|https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=500&auto=format&fit=crop&q=80
15|KIPAS ANGIN|3|BAIK|Kipas angin industrial, diameter ±18–24 inch, motor listrik, beberapa pilihan kecepatan|Facility & Utility|https://images.unsplash.com/photo-1594818379496-da1e345b0ded?w=500&auto=format&fit=crop&q=80
16|SAPU|8|BAIK|Gagang besi/plastik, kepala sapu berbahan nilon, panjang ±120 cm, untuk area gudang dan kantor|Cleaning Tools|https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500&auto=format&fit=crop&q=80
17|PEL|3|BAIK|Gagang besi/plastik, kepala pel microfiber/katun, panjang ±120 cm, cocok untuk berbagai jenis lantai|Cleaning Tools|https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500&auto=format&fit=crop&q=80
18|PENGKI|4|BAIK|Berbahan plastik kuat, kapasitas ±10–20 liter, dilengkapi pegangan, untuk mengangkat sampah dan kotoran|Cleaning Tools|https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500&auto=format&fit=crop&q=80
19|LED DISPLAY|1|BAIK|LED Display, ukuran ±32–55 inch, resolusi minimal Full HD (1920 × 1080), teknologi LED, tingkat kecerahan ±300–500 cd/m², rasio aspek 16:9, input HDMI/USB|Digital & Shop|https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&auto=format&fit=crop&q=80
20|TEMPAT SAMPAH|2|BAIK|Berbahan plastik, kapasitas ±20–50 liter, dilengkapi tutup/pegangan, mudah dibersihkan|Facility & Utility|https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500&auto=format&fit=crop&q=80
21|LOKER|5|BAIK|Loker besi, ±6–12 pintu, dilengkapi kunci, ventilasi dan label nama|Facility & Storage|https://images.unsplash.com/photo-1590496793929-36417d3117de?w=500&auto=format&fit=crop&q=80
22|APAR|3|BAIK|Alat pemadam api ringan, media powder/CO2/foam, kapasitas ±3–6 kg, dilengkapi bracket|Safety Equipment|https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=500&auto=format&fit=crop&q=80
23|KURSI|8|BAIK|Kursi kerja/tunggu, rangka besi/plastik, dudukan ergonomis, kuat dan nyaman digunakan|Office Furniture|https://images.unsplash.com/photo-1580481077197-28d098e945c1?w=500&auto=format&fit=crop&q=80
24|MEJA|8|BAIK|Meja kerja berbahan kayu/metal, ukuran ±120 × 60 × 75 cm, permukaan kerja kuat dan mudah dibersihkan|Office Furniture|https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=500&auto=format&fit=crop&q=80
25|HAND PALLET|3|BAIK|Kapasitas ±2–3 ton, panjang fork ±1.150 mm, sistem hidrolik manual|Material Handling|https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=500&auto=format&fit=crop&q=80
26|GANTUNGAN|2|BAIK|Gantungan berbahan besi/stainless, dilengkapi hook, digunakan untuk menggantung alat atau barang|Facility & Storage|https://images.unsplash.com/photo-1586528116493-a029325540fa?w=500&auto=format&fit=crop&q=80
27|SAKLAR|25|BAIK|Saklar listrik AC 220–250 V, 1/2 gang, material tahan panas, sesuai standar SNI|Electrical & Utility|https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&auto=format&fit=crop&q=80
28|LAMPU|20|BAIK|Lampu LED, daya ±18–50 watt, tegangan 220 V, untuk penerangan area gudang|Electrical & Utility|https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?w=500&auto=format&fit=crop&q=80
29|KABEL ROLL|10|BAIK|Kabel roll panjang ±15–50 meter, dilengkapi reel, stop kontak dan thermal protection|Electrical & Utility|https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=500&auto=format&fit=crop&q=80
30|GENSET|1|BAIK|Generator diesel/bensin, kapasitas ±5–10 kVA, output 220 V, dilengkapi panel kontrol|Heavy Utility|https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&auto=format&fit=crop&q=80
31|P3K|1|BAIK|Kotak P3K berisi kasa steril, plester, perban, antiseptik, sarung tangan dan perlengkapan pertolongan pertama|Safety & Medical|https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=500&auto=format&fit=crop&q=80
32|MONITOR|8|BAIK|Monitor LED/LCD, ukuran ±22–24 inch, resolusi Full HD, koneksi HDMI/VGA|IT & Digital|https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop&q=80
33|KEYBOARD|8|BAIK|Keyboard USB, layout QWERTY, koneksi kabel, kompatibel dengan PC|IT & Digital|https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=80
34|MOUSE|8|BAIK|Mouse USB optik, minimal 3 tombol, resolusi sensor ±800–1600 DPI|IT & Digital|https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&auto=format&fit=crop&q=80
35|TOSA|1|BAIK|Kendaraan/alat operasional roda 3 untuk pengangkutan barang, kapasitas disesuaikan|Fleet & Delivery|https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=500&auto=format&fit=crop&q=80
36|GRANDMAX|3|BAIK|Kendaraan operasional/angkutan barang, mesin bensin ±1,3–1,5 L, tipe bak/box sesuai kebutuhan|Fleet & Delivery|https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=500&auto=format&fit=crop&q=80
37|LAMPU LED NEON PANJANG|7|BAIK|Lampu LED tube/neon panjang, daya ±18–40 watt, tegangan 220 V, panjang ±60–120 cm, cahaya putih|Electrical & Utility|https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?w=500&auto=format&fit=crop&q=80
38|RAK GANTUNG|5|BAIK|Rak gantung berbahan besi/baja, dilengkapi bracket pengait, kapasitas ±20–50 kg per tingkat|Storage & Racking|https://images.unsplash.com/photo-1586528116493-a029325540fa?w=500&auto=format&fit=crop&q=80
39|GUNTING|15|BAIK|Gunting berbahan stainless steel, ukuran ±7–10 inch, pegangan ergonomis, tajam dan tahan karat|Packing & Tools|https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500&auto=format&fit=crop&q=80
40|LAKBAN|10|BAIK|Lakban perekat berbahan polypropylene, lebar ±48–60 mm, panjang ±50–100 meter, daya rekat kuat|Packaging Tools|https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=500&auto=format&fit=crop&q=80
41|TOOLBOX SET|2|BAIK|Set peralatan kerja dalam toolbox, terdiri dari obeng, tang, kunci pas/ring, kunci socket dan perlengkapan dasar|Maintenance Tools|https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&auto=format&fit=crop&q=80
42|PANEL GANTUNG|4|BAIK|Panel gantung berbahan besi/plastik berlubang, dilengkapi hook, digunakan untuk penyimpanan alat kerja|Storage & Display|https://images.unsplash.com/photo-1590496793929-36417d3117de?w=500&auto=format&fit=crop&q=80
43|KURSI TUNGGU|2|BAIK|Kursi tunggu dengan rangka besi, dudukan dan sandaran empuk/plastik, kapasitas ±2–3 orang|Office Furniture|https://images.unsplash.com/photo-1580481077197-28d098e945c1?w=500&auto=format&fit=crop&q=80
44|PRINTER STRUK|4|BAIK|Printer struk thermal, metode cetak direct thermal, lebar kertas ±58–80 mm, koneksi USB/LAN/Bluetooth|POS & IT|https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=500&auto=format&fit=crop&q=80
45|CUTTER|5|BAIK|Cutter dengan gagang ergonomis, mata pisau stainless/carbon steel, sistem pengunci dan mata pisau dapat diganti|Packing & Tools|https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500&auto=format&fit=crop&q=80
46|KULKAS DISPLAY|1|BAIK|Kulkas display dengan pintu kaca transparan, kapasitas ±300–500 liter, sistem pendingin elektrik, suhu ±2–8°C, rak adjustable, tegangan 220 V|Appliance & Shop|https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=500&auto=format&fit=crop&q=80
47|PRINTER|2|BAIK|Printer inkjet/laser, kecepatan cetak ±15–30 ppm, resolusi hingga 1.200 × 1.200 dpi, koneksi USB/Wi-Fi, mendukung kertas A4|IT & Digital|https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=500&auto=format&fit=crop&q=80
48|KURSI BAR|4|BAIK|Kursi bar dengan rangka besi/kayu, dudukan ergonomis, tinggi dudukan ±65–75 cm, dilengkapi sandaran kaki|Office Furniture|https://images.unsplash.com/photo-1503602642458-232111445657?w=500&auto=format&fit=crop&q=80
49|WIFI|4|BAIK|Wi-Fi router, dual band 2.4 GHz/5 GHz, kecepatan hingga ±1.200 Mbps, port LAN/WAN, mendukung standar IEEE 802.11 ac/ax|IT & Network|https://images.unsplash.com/photo-1544717305-2782549b5136?w=500&auto=format&fit=crop&q=80
50|KALKULATOR|6|BAIK|Kalkulator elektronik, layar LCD 10–12 digit, fungsi aritmatika dasar, persentase, memori, menggunakan baterai/tenaga surya|Office Tools|https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=500&auto=format&fit=crop&q=80
'@

# Generate category image map for realistic visuals
$categoryImageMap = @{
    "Sembako" = "https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=500&auto=format&fit=crop&q=80";
    "Palen" = "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500&auto=format&fit=crop&q=80";
    "ATK" = "https://images.unsplash.com/photo-1585336261026-7f897b6a4163?w=500&auto=format&fit=crop&q=80";
    "Kosmetik" = "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&auto=format&fit=crop&q=80";
    "Keperluan Bayi & Anak" = "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500&auto=format&fit=crop&q=80";
    "Bangunan" = "https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=500&auto=format&fit=crop&q=80";
    "Parfum" = "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=500&auto=format&fit=crop&q=80";
}

$umkmLines = $rawUmkm -split "`r?`n"
$toolLines = $rawTools -split "`r?`n"

$productsList = [System.Collections.ArrayList]::new()

foreach ($line in $umkmLines) {
    if ([string]::IsNullOrWhiteSpace($line)) { continue }
    $parts = $line.Split('|')
    if ($parts.Length -ge 7) {
        $no = $parts[0].Trim()
        $sku = $parts[1].Trim()
        $name = $parts[2].Trim()
        $cat = $parts[3].Trim()
        $unit = $parts[4].Trim()
        $price = [int]$parts[5].Trim()
        $desc = $parts[6].Trim()
        $badge = if ($parts.Length -ge 9) { $parts[8].Trim() } else { "" }
        
        $tier1Price = $price
        $tier2Price = [math]::Round($price * 0.95)
        $tier3Price = [math]::Round($price * 0.90)
        
        $img = if ($categoryImageMap.ContainsKey($cat)) { $categoryImageMap[$cat] } else { "https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&auto=format&fit=crop&q=80" }
        
        # Specific image accents based on keywords
        if ($name -match "BLASTOZ|CANNON|FULLO|TANGO|WAFER|WAFFLE") {
            $img = "https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=500&auto=format&fit=crop&q=80"
        } elseif ($name -match "PERMEN|MINTZ|GUMMY|FRUZZ") {
            $img = "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=500&auto=format&fit=crop&q=80"
        } elseif ($name -match "SOLASI|LAKBAN|TAPE") {
            $img = "https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=500&auto=format&fit=crop&q=80"
        } elseif ($name -match "TISU|TISSUE|NICE|KANOE") {
            $img = "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500&auto=format&fit=crop&q=80"
        } elseif ($name -match "BULPEN|PULPEN|GEL") {
            $img = "https://images.unsplash.com/photo-1585336261026-7f897b6a4163?w=500&auto=format&fit=crop&q=80"
        } elseif ($name -match "BUKU|SIDU|VISION|ALL STAR|BEST ONE") {
            $img = "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=80"
        } elseif ($name -match "HERBORIST|LOTION|SCRUB|LULUR|MICELLAR|NUFACE|LIPCREAM|CUSHION|SUNSCREEN") {
            $img = "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&auto=format&fit=crop&q=80"
        } elseif ($name -match "MARINA|SEMIR|MIRANDA") {
            $img = "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&auto=format&fit=crop&q=80"
        } elseif ($name -match "SOFTEX|PANTY") {
            $img = "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500&auto=format&fit=crop&q=80"
        } elseif ($name -match "KOREK|CRICKET|LAS VEGAS") {
            $img = "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=500&auto=format&fit=crop&q=80"
        } elseif ($name -match "PAPER CLIP|FASTENER|KENKO") {
            $img = "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=500&auto=format&fit=crop&q=80"
        }

        $prodObj = @{
            id = "SHOP-" + $no.PadLeft(3, '0')
            sku = $sku
            name = $name
            category = $cat
            unit = $unit
            retailPrice = $price
            stock = [math]::Round(50 + ([int]$no % 70))
            minOrder = 1
            tiers = @(
                @{ minQty = 1; maxQty = 9; price = $tier1Price; label = "1 - 9 $unit" },
                @{ minQty = 10; maxQty = 29; price = $tier2Price; label = "10 - 29 $unit (Grosir)" },
                @{ minQty = 30; maxQty = 999; price = $tier3Price; label = "30+ $unit (Partai Besar)" }
            )
            description = $desc
            badge = $badge
            image = $img
        }
        $null = $productsList.Add($prodObj)
    }
}

$toolsList = [System.Collections.ArrayList]::new()
foreach ($line in $toolLines) {
    if ([string]::IsNullOrWhiteSpace($line)) { continue }
    $parts = $line.Split('|')
    if ($parts.Length -ge 5) {
        $no = $parts[0].Trim()
        $name = $parts[1].Trim()
        $qty = [int]$parts[2].Trim()
        $cond = $parts[3].Trim()
        $specs = $parts[4].Trim()
        $cat = if ($parts.Length -ge 6) { $parts[5].Trim() } else { "Peralatan Gudang" }
        $img = if ($parts.Length -ge 7) { $parts[6].Trim() } else { "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=500&auto=format&fit=crop&q=80" }

        $toolObj = @{
            id = "TOOL-" + $no.PadLeft(3, '0')
            code = "AST-" + $no.PadLeft(3, '0')
            name = $name
            category = $cat
            location = "Gudang Utama & Operasional Toko"
            brand = "Standar Operasional Toko Grosir"
            purchaseYear = "2024"
            status = "Tersedia"
            condition = if ($cond -eq "BAIK") { "Sangat Baik" } else { $cond }
            lastService = "2026-08-15"
            nextService = "2026-11-15"
            assignedTo = "Staff Operasional ($qty Unit)"
            image = $img
            specs = $specs
            maintenanceLogs = @(
                @{ date = "2026-08-15"; type = "Pengecekan Fisik"; technician = "Tim Inventaris"; cost = 0; notes = "Kondisi $qty unit terverifikasi $cond sesuai data aset." }
            )
        }
        $null = $toolsList.Add($toolObj)
    }
}

$fullData = @{
    profile = @{
        name = "GROSIR BERKAH ABADI"
        tagline = "Pusat Grosir Sembako, Palen, ATK, Kosmetik, & Kebutuhan Usaha Terlengkap"
        logoText = "GBA"
        logoUrl = "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=150&auto=format&fit=crop&q=80"
        phone = "0812-3456-7890"
        email = "kontak@grosirberkahabadi.com"
        address = "Kawasan Pergudangan Niaga Jaya Blok C No. 12-15, Jakarta Barat"
        operationalHours = "Senin - Sabtu: 07.30 - 17.30 WIB"
        npwp = "01.234.567.8-012.000"
        bannerTitle = "KATALOG RESMI 250+ PRODUK UMKM & 50 ASET INVENTARIS"
        bannerSubtitle = "Lengkap dengan sistem harga grosir bertingkat, dokumen faktur, dan manajemen aset gudang terintegrasi."
        bannerImage = "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&auto=format&fit=crop&q=80"
        bannerBadge = "250 PRODUK UMKM TERVERIFIKASI"
    }
    wmsItems = @(
        @{
            id = "WMS-001"
            sku = "1905260001"
            name = "BLASTOZ COKLAT ARTA @6"
            category = "Sembako"
            unit = "Pack"
            zone = "Zona B (Makanan Olahan)"
            rack = "Rak B-01-01"
            minStock = 20
            stock = 120
            batchNo = "BATCH-BLASTOZ-01"
            expDate = "2027-10-15"
            supplier = "PT Arta Boga Cemerlang"
            image = "https://images.unsplash.com/photo-1621996346565-e3d5d6281691?w=400&auto=format&fit=crop&q=80"
            status = "Aman"
            notes = "Rasa Cokelat, 24g, Isi 12 pcs/box, Total 288-300g"
        },
        @{
            id = "WMS-002"
            sku = "3001240001"
            name = "SOLASI ABADI TAPE MURAH"
            category = "ATK"
            unit = "Slop"
            zone = "Zona D (ATK & Non-Food)"
            rack = "Rak D-01-02"
            minStock = 25
            stock = 150
            batchNo = "BATCH-SLS-01"
            expDate = "2030-01-01"
            supplier = "PT Abadi Tape Indo"
            image = "https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=400&auto=format&fit=crop&q=80"
            status = "Aman"
            notes = "24mm (1 inci) x 72m Bening"
        },
        @{
            id = "WMS-003"
            sku = "B06676"
            name = "TISU NICE 900gr @20"
            category = "Palen"
            unit = "Pcs"
            zone = "Zona D (Palen & Non-Food)"
            rack = "Rak D-02-01"
            minStock = 15
            stock = 45
            batchNo = "BATCH-NICE-01"
            expDate = "2030-01-01"
            supplier = "PT Sinarmas Pulp & Paper"
            image = "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400&auto=format&fit=crop&q=80"
            status = "Aman"
            notes = "Tisu Wajah 900g"
        },
        @{
            id = "WMS-004"
            sku = "B02136"
            name = "BULPEN AE7 BIRU @240"
            category = "ATK"
            unit = "Pack"
            zone = "Zona D (ATK)"
            rack = "Rak D-04-02"
            minStock = 10
            stock = 50
            batchNo = "BATCH-AE7-01"
            expDate = "2032-12-31"
            supplier = "PT Standardpen"
            image = "https://images.unsplash.com/photo-1585336261026-7f897b6a4163?w=400&auto=format&fit=crop&q=80"
            status = "Aman"
            notes = "AE7 Biru isi 240 pcs"
        }
    )
    wmsLogs = @(
        @{
            id = "LOG-001"
            date = "2026-09-02 08:30"
            type = "INBOUND"
            sku = "1905260001"
            itemName = "BLASTOZ COKLAT ARTA @6"
            qty = "+120 Pack"
            refDoc = "PO-UMKM-001"
            operator = "Staff Inbound"
            notes = "Penerimaan stok UMKM grosir"
        }
    )
    documents = @(
        @{
            id = "DOC-INV-001"
            docNumber = "INV/GBA/2026/09/0001"
            type = "Faktur Penjualan"
            date = "2026-09-02"
            dueDate = "2026-09-16"
            clientName = "Toko Sembako Barokah UMKM"
            clientPhone = "0812-9988-7766"
            clientAddress = "Jl. Pasar Lama No. 24, Jakarta"
            paymentStatus = "LUNAS"
            paymentMethod = "Transfer Bank BCA"
            items = @(
                @{ name = "BLASTOZ COKLAT ARTA @6"; qty = 10; unit = "Pack"; price = 21650; subtotal = 216500 },
                @{ name = "FRUZZ GUMMY ARTA @12"; qty = 2; unit = "Pack"; price = 180000; subtotal = 360000 },
                @{ name = "TISU NICE 900gr @20"; qty = 5; unit = "Pcs"; price = 34000; subtotal = 170000 }
            )
            discount = 16500
            taxPercent = 0
            taxAmount = 0
            grandTotal = 730000
            notes = "Pembayaran telah lunas. Terima kasih atas transaksi grosir Anda."
            signatureName = "Bagian Penjualan Grosir"
            attachmentUrl = ""
        }
    )
    orders = @()
    shopProducts = $productsList
    inventoryTools = $toolsList
}

$jsonOutput = $fullData | ConvertTo-Json -Depth 10 -Compress
$jsContent = "/**`n * Master Data Toko Grosir Barang`n * File UMKM: $($productsList.Count) Produk & File INVENTARIS: $($toolsList.Count) Aset Alat`n */`n`nconst DEFAULT_STORE_DATA = " + ($fullData | ConvertTo-Json -Depth 10) + ";`n"

Set-Content -Path "C:\Users\USER\.gemini\antigravity\scratch\grosir-app\js\data.js" -Value $jsContent -Encoding UTF8
Write-Output "Successfully generated data.js with $($productsList.Count) products and $($toolsList.Count) inventory tools!"
