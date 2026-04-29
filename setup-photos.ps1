
# =====================================================================
# SETUP PHOTOS - Jelajah Sejarah Banten
# Salin foto dari folder sumber → nama file yg digunakan oleh web
# Foto 1 → assets/etalase/{id}.jpg       (kartu gallery)
# Foto 2 → assets/detail/{id}-hero.jpg   (header halaman detail)
# =====================================================================

$base = "C:\Antigravity\Web\Jelajah Sejarah Banten"
$etalaseOut = "$base\assets\etalase"
$detailOut  = "$base\assets\detail"

function Copy-Photo {
    param(
        [string]$SrcFolder,   # Folder sumber foto
        [string]$Foto1Name,   # Nama file foto 1 di dalam folder (bisa "foto 1.jpg" dll)
        [string]$Foto2Name,   # Nama file foto 2 di dalam folder
        [string]$Id           # ID situs (mis. "kt-1")
    )

    # Copy Foto 1 → etalase/{id}.jpg
    $src1 = Join-Path $SrcFolder $Foto1Name
    if (Test-Path $src1) {
        Copy-Item -Path $src1 -Destination "$etalaseOut\$Id.jpg" -Force
        Write-Host "  [OK] Etalase: $Id.jpg  ← $Foto1Name" -ForegroundColor Green
    } else {
        Write-Host "  [!!] TIDAK ADA: $src1" -ForegroundColor Red
    }

    # Copy Foto 2 → detail/{id}-hero.jpg
    $src2 = Join-Path $SrcFolder $Foto2Name
    if (Test-Path $src2) {
        Copy-Item -Path $src2 -Destination "$detailOut\$Id-hero.jpg" -Force
        Write-Host "  [OK] Detail : $Id-hero.jpg  ← $Foto2Name" -ForegroundColor Cyan
    } else {
        Write-Host "  [!!] TIDAK ADA: $src2" -ForegroundColor Red
    }
}

# =====================================================================
# --- KOTA TANGERANG ---
# =====================================================================
Write-Host "`n[KOTA TANGERANG]" -ForegroundColor Yellow
$ktBase = "$base\assets\etalase\kota tangerang"

# kt-1 → Masjid dan Makam Kali Pasir
Copy-Photo "$ktBase\Masjid dan Makam Kali Pasir" "Foto 1.jpg" "foto 2.jpg" "kt-1"

# kt-2 → Bendungan Pasar Baru
Copy-Photo "$ktBase\Bendungan Pasar baru" "foto 1.jpeg" "foto 2.jpeg" "kt-2"

# kt-3 → Klenteng Boen Tek Bio
Copy-Photo "$ktBase\Kelenteng Boen tek bio" "foto 1.jpeg" "foto 2.jpeg" "kt-3"

# kt-4 → Klenteng Boen San Bio
Copy-Photo "$ktBase\klenteng boe san bio" "foto 1.jpg" "foto 2.jpg" "kt-4"

# kt-5 → Museum Benteng Heritage
Copy-Photo "$ktBase\Rumah Arsitektur Cina (Benteng Heritage)" "foto 1.jpeg" "foto 2.jpeg" "kt-5"

# kt-6 → Stasiun Kereta Api Tangerang
Copy-Photo "$ktBase\stasiun kreta Tangerang" "foto 1.jpeg" "foto 2.jpeg" "kt-6"

# kt-7 → Lapas Anak Wanita Tangerang
Copy-Photo "$ktBase\Lapas 2A anak dan wanita" "foto 1.jpeg" "foto 2.jpeg" "kt-7"

# kt-8 → Kawasan Pasar Lama
Copy-Photo "$ktBase\Pasar Lama Kota Tangerang" "foto 1.jpeg" "foto 2.jpeg" "kt-8"

# =====================================================================
# --- KABUPATEN TANGERANG ---
# =====================================================================
Write-Host "`n[KABUPATEN TANGERANG]" -ForegroundColor Yellow
$kbtBase = "$base\assets\etalase\Kab. Tangerang"

# kbt-1 → Situs Makam Solear
Copy-Photo "$kbtBase\Situs Makam Solear" "Foto 1.jpg" "foto 2.jpg" "kbt-1"

# kbt-2 → Kelenteng Tjoe Soe Kong Tanjung Kait
Copy-Photo "$kbtBase\Klenteng Kelenteng Co Su Kong Tanjung Kait" "Foto 1.jpeg" "Foto 2.jpeg" "kbt-2"

# =====================================================================
# --- KOTA TANGERANG SELATAN ---
# =====================================================================
Write-Host "`n[KOTA TANGERANG SELATAN]" -ForegroundColor Yellow
$tsBase = "$base\assets\etalase\Kota Tangerang Selatan"

# ts-1 → Monumen Palagan Lengkong
Copy-Photo "$tsBase\Palagan Lengkong" "Foto 1.jpeg" "foto 2.jpeg" "ts-1"

# ts-2 → Makam Keramat Tajug  (foto 2 tidak punya ekstensi → rename saja)
$tajugFolder = "$tsBase\Makam Keramat Tajug"
# Foto 1
$src1 = "$tajugFolder\foto 1.jpg"
if (Test-Path $src1) {
    Copy-Item -Path $src1 -Destination "$etalaseOut\ts-2.jpg" -Force
    Write-Host "  [OK] Etalase: ts-2.jpg" -ForegroundColor Green
}
# Foto 2 (tanpa ekstensi, kita copy paksa sebagai jpg)
$src2 = "$tajugFolder\foto 2"
if (Test-Path $src2) {
    Copy-Item -Path $src2 -Destination "$detailOut\ts-2-hero.jpg" -Force
    Write-Host "  [OK] Detail : ts-2-hero.jpg" -ForegroundColor Cyan
}

# =====================================================================
Write-Host "`n[SELESAI] Semua foto telah disalin!" -ForegroundColor Magenta
Write-Host "Wilayah yang BELUM memiliki foto (ks, kbs, cl, pnd, lbk) masih pakai Picsum fallback." -ForegroundColor DarkYellow
