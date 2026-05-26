**Nama:** Faalih Nazhmi Prasetyo

**NIM:** 103122400065

**Kelas:** SE-08-02

## Soal
Waktunya menukar uang!

Pada tugas ini kamu akan membuat program yang menampilkan kurs rupiah (IDR) terhadap renminbi luar Tiongkok (CNH) dan euro (EUR). Gunakan link API ini untuk mengambil data.
Tantangan:

1. Simpanlah URL API ke dalam .env sebagai BASE_API
2. Gunakan Intl untuk memformat nilai mata uang dan waktu kamu mengambil data kurs.
3. Hapus pesan promosi dotenv

## Output

![Hasil Output](./Cuplikan%20layar%202026-05-26%20150915.png)

## Deskripsi    
Kode tersebut menerapkan konsep Runtime Configuration dan Internationalization dengan memanfaatkan variabel lingkungan untuk menyimpan URL API secara aman melalui pustaka dotenv, yang diakses menggunakan process.env.BASE_API. Pada proses pengolahan data, kode ini menggunakan objek bawaan JavaScript Intl untuk menghasilkan tampilan informasi yang sesuai dengan konteks lokal pengguna. Fungsi Intl.NumberFormat digunakan untuk mengubah nilai numerik mentah menjadi format mata uang yang sesuai dengan standar masing-masing negara, seperti penggunaan simbol Rp, CNH, dan €, lengkap dengan aturan penulisan angka desimal yang tepat. Selain itu, Intl.DateTimeFormat berperan dalam mengubah data tanggal dari API menjadi format tanggal berbahasa Indonesia yang lebih mudah dipahami. Dengan pendekatan ini, aplikasi mampu menampilkan informasi finansial secara lebih aman, terstruktur, dan menyesuaikan preferensi wilayah pengguna.