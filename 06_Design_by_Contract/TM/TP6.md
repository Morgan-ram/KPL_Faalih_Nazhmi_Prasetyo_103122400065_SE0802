# Tugas Pendahuluan 06 : Design by Control

**Nama:** Faalih Nazhmi Prasetyo
**NIM:** 103122400065
**Kelas:** SE-08-02

**Soal**
Diberikan dua kode yang sama-sama melakukan operasi pembagian. Pertama menggunakan asersi, kedua menggunakan eksepsi.

```
const assert = require('assert');

function divide(a, b) {
  assert(typeof a === 'number' && typeof b === 'number', 'Nilai harus bilangan bulat');

  assert(b !== 0, 'Tidak bisa pembagian dengan nol');

  return a / b;
}
```

```
function divide(a, b) {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new TypeError("Nilai harus bilangan bulat");
  }

  if (b === 0) {
    throw new Error("Tidak bisa pembagian dengan nol");
  }

  return a / b;
}

try {
  const result = divide(10, 2);
  console.log("Hasilnya adalah:", result);
} catch (error) {
  console.error("Error:", error);
}
```

Menurutmu, kapankah kita saatnya menggunakan asersi atau eksepsi untuk fungsi seperti ini di atas? Apakah kita harus sepenuhnya asersi, atau sepenuhnya eksepsi? Lakukan riset dan berikan jawabannya dalam bentuk esai minimal 300 kata.

## Jawaban
Perbedaan utama terletak pada siapa yang bertanggung jawab atas kesalahan tersebut: Asersi menangkap bug yang dibuat oleh programmer (internal), sedangkan eksepsi menangkap kesalahan operasional yang mungkin terjadi saat runtime (eksternal).

## Asersi (Assertion)
Gunakan asersi ketika pemanggil fungsi adalah kode yang Anda kendalikan sendiri dan Anda yakin input seharusnya sudah valid berdasarkan alur logika program.

Tujuan: Memastikan asumsi internal program tetap benar selama proses pengembangan dan debugging.

Pada contoh fungsi divide(), asersi cocok digunakan jika fungsi tersebut hanya dipakai secara internal oleh modul lain yang sudah menjamin bahwa parameter a dan b selalu berupa angka yang valid. Jika asersi gagal, itu menandakan adanya bug dalam implementasi program, bukan kesalahan dari pengguna.

Contoh:

```
assert(typeof a === 'number' && typeof b === 'number', 'Input harus berupa angka');
```

Dalam konteks ini, programmer sedang menyatakan: “Kondisi ini seharusnya selalu benar. Jika tidak, berarti ada kesalahan pada logika program.”

## Eksepsi (Exception)
Gunakan eksepsi ketika input berasal dari luar kendali langsung program, seperti input pengguna, respons API pihak ketiga, file, database, atau kondisi runtime lain yang memang berpotensi gagal.

Tujuan: Menangani kondisi error yang realistis terjadi saat aplikasi berjalan agar dapat ditangani dengan baik tanpa merusak keseluruhan sistem.

Pada fungsi divide(), pembagian dengan nol atau input non-number merupakan kondisi yang bisa saja terjadi dalam penggunaan nyata. Karena itu, eksepsi lebih sesuai.

Contoh:

```
if (typeof a !== "number" || typeof b !== "number") {
  throw new TypeError("Input harus berupa angka");
}

if (b === 0) {
  throw new Error("Tidak bisa pembagian dengan nol");
}
```

Dengan pendekatan ini, error dapat ditangkap menggunakan try...catch, sehingga aplikasi tetap dapat memberikan respons yang sesuai kepada pengguna.
