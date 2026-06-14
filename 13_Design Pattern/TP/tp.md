**Nama:** Faalih Nazhmi Prasetyo
**NIM:** 103122400065
**Kelas:** SE-08-02

## Soal
Bukalah repostori kode tugas besarmu dan carilah satu saja design pattern yang digunakan di dalamnya (boleh design pattern apa saja, akan direviu kasus-per-kasus). Sertakan kodenya di tugas ini dan coba jelaskan desainnya.

## Deskripsi
**Singleton Pattern** merupakan salah satu *design pattern* yang digunakan untuk memastikan bahwa sebuah kelas hanya memiliki satu objek (*instance*) selama aplikasi berjalan. Dengan demikian, setiap kali kelas tersebut dipanggil, sistem akan menggunakan objek yang sama, bukan membuat objek baru.

Pattern ini umumnya diterapkan pada komponen yang harus digunakan secara bersama oleh seluruh aplikasi, seperti:

1. Koneksi database
2. Konfigurasi aplikasi
3. Sistem logging
4. Penyimpanan cache global

### Penerapan pada Proyek

Dalam proyek backend berbasis **Node.js/TypeScript**, Singleton sering digunakan untuk mengelola **koneksi database**. Tujuannya adalah agar aplikasi tidak terus-menerus membuat koneksi baru yang dapat membebani server.

Manfaat utamanya meliputi:

* Mengurangi pembuatan koneksi database yang berulang.
* Menghemat penggunaan memori dan sumber daya sistem.
* Menjamin seluruh bagian aplikasi menggunakan koneksi yang sama.

### Contoh Implementasi

```javascript
class Database {
  static instance;

  constructor() {
    if (Database.instance) {
      return Database.instance;
    }

    this.connection = this.connect();
    Database.instance = this;
  }

  connect() {
    console.log("Membuat koneksi database...");
    return {
      status: "connected",
      time: new Date()
    };
  }

  getConnection() {
    return this.connection;
  }
}

// Penggunaan
const db1 = new Database();
const db2 = new Database();

console.log(db1 === db2);
// true

console.log(db1.getConnection());
console.log(db2.getConnection());
```

### Mekanisme Kerja Singleton

1. Ketika `new Database()` dipanggil untuk pertama kali:

   * Sistem membuat objek baru.
   * Koneksi database diinisialisasi.
   * Objek tersebut disimpan sebagai instance tunggal.

2. Ketika `new Database()` dipanggil kembali:

   * Sistem tidak membuat objek baru.
   * Instance yang sudah ada langsung dikembalikan.

### Alasan Memilih Singleton

Penggunaan Singleton memberikan beberapa keuntungan, antara lain:

1. Mencegah terbentuknya banyak koneksi database secara bersamaan.
2. Mengoptimalkan penggunaan memori dan resource server.
3. Menjaga konsistensi akses data di seluruh aplikasi.
4. Sangat sesuai diterapkan pada sistem backend, termasuk aplikasi perpustakaan yang membutuhkan akses database secara terpusat dan stabil.

### Kesimpulan

Menurut saya, Singleton Pattern sangat efektif untuk mengelola objek yang hanya perlu dibuat satu kali selama aplikasi berjalan. Pada sistem backend, khususnya untuk koneksi database, pattern ini membantu meningkatkan efisiensi, menjaga konsistensi, serta mengurangi beban server karena semua modul menggunakan instance yang sama.
