Soal

Buatlah sebuah fungsi bernama fizzBuzz yang menerima input larik (array) dan mengembalikan deretan bilangan dan "Fizz" untuk kelipatan 2, "Buzz" untuk kelipatan 7, dan "FizzBuzz" untuk kelipatan 14. Beri nama berkas program sebagai tm.js dan taruh di direktori TM.

Kode sumber

Tersedia di 
[test.js] (./ts.js)
[tm.js] (./tm.js)

OUtPUT
![alt text](<Screenshot 2026-03-09 133831.png>)

Deskrpsi  program

Fungsi fizzBuzz ini bekerja dengan menerima parameter berupa array yang divalidasi terlebih dahulu menggunakan Array.isArray() untuk memastikan tipe data input benar; jika tidak valid, fungsi akan langsung menghentikan proses dan mengembalikan pesan kesalahan. Setelah validasi, sebuah array kosong bernama result disiapkan untuk menampung hasil transformasi setiap elemen melalui perulangan for yang memanfaatkan operator modulus % untuk mengecek kelipatan angka 14, 7, dan 2 secara berurutan. Di dalam perulangan tersebut, angka yang memenuhi kriteria diubah menjadi teks "FizzBuzz", "Buzz", atau "Fizz", sedangkan angka yang tidak memenuhi kriteria diubah menjadi string menggunakan metode .toString(). Langkah terakhir adalah menentukan format penggabungan (joining) hasil menggunakan metode includes(), di mana jika dalam input asli terdapat angka 1 atau -1, maka elemen-elemen dalam result akan digabung dengan pemisah koma dan spasi (", "), namun jika tidak ada, maka akan digabung menggunakan spasi tunggal (" ") sebelum akhirnya nilai string tersebut dikembalikan dan diekspor menggunakan module.exports.
