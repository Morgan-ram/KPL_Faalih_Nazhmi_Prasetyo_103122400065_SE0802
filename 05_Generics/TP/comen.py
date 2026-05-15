import math
import random

# ============================================================
# PARAMETER ALGORITMA GENETIKA [cite: 10, 13]
# ============================================================
# Ukuran populasi menentukan seberapa banyak kandidat solusi yang dievaluasi [cite: 10]
UKURAN_POPULASI = 40
# Kromosom biner 40 bit dibagi 2 agar masing-masing x1 dan x2 mendapat 20 bit [cite: 10]
PANJANG_KROMOSOM = 40 
# Probabilitas Crossover (Pc) menentukan peluang individu bertukar gen [cite: 13]
PROBABILITAS_PC = 0.8
# Probabilitas Mutasi (Pm) menentukan peluang bit berubah secara acak [cite: 13]
PROBABILITAS_PM = 0.1
# Berapa kali siklus evolusi diulang (Kriteria penghentian) [cite: 15]
MAKS_GENERASI = 100
# Batas wilayah pencarian sesuai permintaan soal [cite: 6]
BATAS_BAWAH = -10
BATAS_ATAS = 10

# ============================================================
# 1. INISIALISASI POPULASI [cite: 17]
# ============================================================
def inisialisasi_populasi():
    # Membuat daftar berisi 40 individu acak yang masing-masing memiliki 40 bit (0/1)
    return [[random.randint(0, 1) for _ in range(PANJANG_KROMOSOM)]
            for _ in range(UKURAN_POPULASI)]

# ============================================================
# 2. DEKODE KROMOSOM [cite: 18]
# ============================================================
def decode_kromosom(kromosom):
    # Memisahkan kromosom menjadi dua gen (gen x1 dan gen x2) [cite: 10]
    setengah = len(kromosom) // 2
    gen_x1 = kromosom[:setengah]
    gen_x2 = kromosom[setengah:]

    # Fungsi pembantu untuk mengubah list biner menjadi angka desimal utuh
    def biner_ke_desimal(gen):
        desimal = 0
        for bit in gen:
            desimal = (desimal << 1) | bit # Geser bit ke kiri dan tambahkan bit baru
        return desimal

    # Mengubah angka desimal biner ke rentang real [-10, 10] menggunakan rumus pemetaan [cite: 28]
    # x = g_min + (desimal * (g_max - g_min) / (2^n - 1))
    x1 = BATAS_BAWAH + (biner_ke_desimal(gen_x1) * (BATAS_ATAS - BATAS_BAWAH) / (2**setengah - 1))
    x2 = BATAS_BAWAH + (biner_ke_desimal(gen_x2) * (BATAS_ATAS - BATAS_BAWAH) / (2**setengah - 1))

    return x1, x2

# ============================================================
# 3. FUNGSI OBJEKTIF [cite: 4]
# ============================================================
def fungsi_objektif(x1, x2):
    try:
        # Menghitung tan(x1 + x2) sesuai rumus soal [cite: 4]
        t = math.tan(x1 + x2)

        # Penalti jika nilai tan terlalu besar (ekstrem) agar perhitungan tidak rusak
        if abs(t) > 100:
            return 999999

        # term1 menghitung bagian sin(x1) * cos(x2) * tan(x1+x2) [cite: 4]
        term1 = math.sin(x1) * math.cos(x2) * t
        # term2 menghitung bagian 0.5 * exp(1 - abs(x2)) [cite: 4]
        # abs(x2) digunakan karena akar dari x2 kuadrat adalah nilai mutlak x2
        term2 = 0.5 * math.exp(1 - abs(x2))

        # Fungsi f(x1, x2) memiliki tanda negatif di depannya sesuai soal [cite: 4]
        return -(term1 + term2)

    except:
        # Jika ada error matematika (seperti pembagian nol), beri nilai penalti besar
        return 999999

# ============================================================
# 4. PERHITUNGAN FITNESS [cite: 19]
# ============================================================
def hitung_fitness(kromosom):
    # Mengambil nilai x1 dan x2 dari biner
    x1, x2 = decode_kromosom(kromosom)
    # Menghitung nilai fungsi asli
    nilai_f = fungsi_objektif(x1, x2)

    # Transformasi Minimasi ke Maksimasi:
    # GA selalu mencari fitness terbesar, sedangkan soal meminta nilai f terkecil (minimum).
    # Dengan 1 / (1 + |f|), maka f yang mendekati nol atau negatif akan memberikan fitness besar.
    return 1 / (1 + abs(nilai_f))

# ============================================================
# 5. PEMILIHAN ORANGTUA (ROULETTE WHEEL) [cite: 11, 20]
# ============================================================
def pilih_orangtua(populasi, daftar_fitness):
    # Menghitung total fitness untuk menentukan ukuran "roda roulette"
    total = sum(daftar_fitness)
    # Menghasilkan angka acak antara 0 sampai total fitness
    r = random.uniform(0, total)

    # Mencari individu mana yang sesuai dengan angka acak r tersebut
    posisi = 0
    for i, f in enumerate(daftar_fitness):
        posisi += f
        if posisi >= r:
            return populasi[i]

    return populasi[-1] # Fallback jika terjadi kesalahan pembulatan

# ============================================================
# 6. CROSSOVER (PINDAH SILANG) [cite: 12, 21]
# ============================================================
def crossover(p1, p2):
    # Hanya melakukan perkawinan jika angka acak lebih kecil dari Pc (0.8)
    if random.random() < PROBABILITAS_PC:
        # Pilih satu titik potong secara acak antara bit 1 sampai 39
        titik = random.randint(1, PANJANG_KROMOSOM - 1)
        # Menukar potongan bit antara dua orangtua untuk menghasilkan dua anak
        c1 = p1[:titik] + p2[titik:]
        c2 = p2[:titik] + p1[titik:]
        return c1, c2
    # Jika tidak terjadi crossover, anak adalah salinan dari orangtua
    return p1[:], p2[:]

# ============================================================
# 7. MUTASI [cite: 12, 22]
# ============================================================
def mutasi(kromosom):
    # Memeriksa setiap bit dalam kromosom
    for i in range(PANJANG_KROMOSOM):
        # Jika angka acak lebih kecil dari Pm (0.1), lakukan perubahan bit
        if random.random() < PROBABILITAS_PM:
            # Mengubah 0 menjadi 1 atau sebaliknya (Bit-Flip)
            kromosom[i] = 1 - kromosom[i]
    return kromosom

# ============================================================
# MAIN LOOP (Siklus Evolusi) [cite: 23]
# ============================================================
populasi = inisialisasi_populasi()
best_kromosom = None
best_fitness = float('-inf')

for g in range(MAKS_GENERASI):
    # Langkah 1: Evaluasi semua individu di generasi saat ini
    daftar_fitness = [hitung_fitness(k) for k in populasi]

    # Langkah 2: Mencatat individu terbaik yang pernah ditemukan (Elitisme)
    for i in range(UKURAN_POPULASI):
        if daftar_fitness[i] > best_fitness:
            best_fitness = daftar_fitness[i]
            best_kromosom = populasi[i][:]

    # Langkah 3: Seleksi Survivor menggunakan Elitisme [cite: 14]
    # Masukkan individu terbaik secara langsung ke populasi generasi berikutnya
    populasi_baru = [best_kromosom[:]]

    # Langkah 4: Reproduksi untuk memenuhi sisa ukuran populasi
    while len(populasi_baru) < UKURAN_POPULASI:
        # Pilih dua calon orangtua
        p1 = pilih_orangtua(populasi, daftar_fitness)
        p2 = pilih_orangtua(populasi, daftar_fitness)

        # Lakukan pindah silang dan mutasi
        c1, c2 = crossover(p1, p2)
        populasi_baru.append(mutasi(c1))

        if len(populasi_baru) < UKURAN_POPULASI:
            populasi_baru.append(mutasi(c2))

    # Ganti populasi lama dengan generasi yang baru dibentuk
    populasi = populasi_baru

# ============================================================
# OUTPUT AKHIR [cite: 25, 27, 28]
# ============================================================
final_x1, final_x2 = decode_kromosom(best_kromosom)
final_obj = fungsi_objektif(final_x1, final_x2)

print("HASIL TERBAIK:")
# Menampilkan kromosom dalam bentuk deret angka biner [cite: 27]
print(f"Kromosom: {''.join(map(str, best_kromosom))}")
# Menampilkan nilai real hasil dekode [cite: 28]
print(f"Nilai x1: {final_x1:.6f}")
print(f"Nilai x2: {final_x2:.6f}")
# Menampilkan nilai fungsi terendah yang ditemukan
print(f"Nilai Minimum f(x1, x2): {final_obj:.6f}")