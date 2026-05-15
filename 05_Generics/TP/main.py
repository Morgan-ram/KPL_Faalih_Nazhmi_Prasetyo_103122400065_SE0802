import math
import random

# =========================
# PARAMETER GA
# =========================
UKURAN_POPULASI = 40
PANJANG_KROMOSOM = 40  # 20 bit x1, 20 bit x2
PROBABILITAS_PC = 0.8
PROBABILITAS_PM = 0.1
MAKS_GENERASI = 100
BATAS_BAWAH = -10
BATAS_ATAS = 10

# =========================
# 1. INISIALISASI POPULASI
# =========================
def inisialisasi_populasi():
    return [[random.randint(0, 1) for _ in range(PANJANG_KROMOSOM)]
            for _ in range(UKURAN_POPULASI)]

# =========================
# 2. DECODE KROMOSOM
# =========================
def decode_kromosom(kromosom):
    setengah = len(kromosom) // 2
    gen_x1 = kromosom[:setengah]
    gen_x2 = kromosom[setengah:]

    def biner_ke_desimal(gen):
        desimal = 0
        for bit in gen:
            desimal = (desimal << 1) | bit
        return desimal

    x1 = BATAS_BAWAH + (biner_ke_desimal(gen_x1) * (BATAS_ATAS - BATAS_BAWAH) / (2**setengah - 1))
    x2 = BATAS_BAWAH + (biner_ke_desimal(gen_x2) * (BATAS_ATAS - BATAS_BAWAH) / (2**setengah - 1))

    return x1, x2

# =========================
# 3. FUNGSI OBJEKTIF (SUDAH DIPERBAIKI)
# =========================
def fungsi_objektif(x1, x2):
    try:
        t = math.tan(x1 + x2)

        # ❗ Penalti untuk menghindari nilai ekstrem
        if abs(t) > 100:
            return 999999

        term1 = math.sin(x1) * math.cos(x2) * t
        term2 = 0.5 * math.exp(1 - abs(x2))

        return -(term1 + term2)

    except:
        return 999999

# =========================
# 4. FITNESS 
# =========================
def hitung_fitness(kromosom):
    x1, x2 = decode_kromosom(kromosom)
    nilai_f = fungsi_objektif(x1, x2)

    # Minimasi → semakin kecil nilai_f → fitness semakin besar
    return 1 / (1 + abs(nilai_f))

# =========================
# 5. SELEKSI (ROULETTE)
# =========================
def pilih_orangtua(populasi, daftar_fitness):
    total = sum(daftar_fitness)
    r = random.uniform(0, total)

    posisi = 0
    for i, f in enumerate(daftar_fitness):
        posisi += f
        if posisi >= r:
            return populasi[i]

    return populasi[-1]

# =========================
# 6. CROSSOVER
# =========================
def crossover(p1, p2):
    if random.random() < PROBABILITAS_PC:
        titik = random.randint(1, PANJANG_KROMOSOM - 1)
        c1 = p1[:titik] + p2[titik:]
        c2 = p2[:titik] + p1[titik:]
        return c1, c2
    return p1[:], p2[:]

# =========================
# 7. MUTASI
# =========================
def mutasi(kromosom):
    for i in range(PANJANG_KROMOSOM):
        if random.random() < PROBABILITAS_PM:
            kromosom[i] = 1 - kromosom[i]
    return kromosom

# =========================
# MAIN LOOP
# =========================
populasi = inisialisasi_populasi()
best_kromosom = None
best_fitness = float('-inf')

print(f"{'Gen':<5} | {'Fitness':<10} | {'f(x)':<10} | {'x1':<8} | {'x2':<8}")
print("-" * 60)

for g in range(MAKS_GENERASI):
    daftar_fitness = [hitung_fitness(k) for k in populasi]

    for i in range(UKURAN_POPULASI):
        if daftar_fitness[i] > best_fitness:
            best_fitness = daftar_fitness[i]
            best_kromosom = populasi[i][:]

    if g % 10 == 0:
        bx1, bx2 = decode_kromosom(best_kromosom)
        obj = fungsi_objektif(bx1, bx2)

        print(f"{g:<5} | {best_fitness:<10.6f} | {obj:<10.6f} | {bx1:<8.4f} | {bx2:<8.4f}")

    # Elitism (biar tidak hilang)
    populasi_baru = [best_kromosom[:]]

    while len(populasi_baru) < UKURAN_POPULASI:
        p1 = pilih_orangtua(populasi, daftar_fitness)
        p2 = pilih_orangtua(populasi, daftar_fitness)

        c1, c2 = crossover(p1, p2)
        populasi_baru.append(mutasi(c1))

        if len(populasi_baru) < UKURAN_POPULASI:
            populasi_baru.append(mutasi(c2))

    populasi = populasi_baru

# =========================
# OUTPUT AKHIR
# =========================
final_x1, final_x2 = decode_kromosom(best_kromosom)
final_obj = fungsi_objektif(final_x1, final_x2)

print("-" * 60)
print("HASIL TERBAIK:")
print(f"Kromosom: {''.join(map(str, best_kromosom))}")
print(f"Nilai x1: {final_x1:.6f}")
print(f"Nilai x2: {final_x2:.6f}")
print(f"Nilai f(x1, x2): {final_obj:.6f}")