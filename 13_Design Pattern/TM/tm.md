**Nama:** Faalih Nazhmi Prasetyo
**NIM:** 103122400065
**Kelas:** SE-08-02

## Soal
Jelaskan dengan kemampuanmu apa itu event delegation dalam design pattern JavaScript. Tidak ada batas bobot kata dalam menjawab tugas ini, tetapi penilaian akan bergantung dari sepaham apa dan sebagus apa kamu menyajikan jawabanmu.

## Deskripsi
**Event Delegation dalam JavaScript**

Event Delegation adalah sebuah teknik dalam JavaScript yang memanfaatkan mekanisme **event bubbling** dengan cara memasang satu event listener pada elemen induk (parent), kemudian event tersebut digunakan untuk menangani interaksi yang terjadi pada elemen-elemen anak (child) di dalamnya.

### Konsep Dasar

Saat sebuah event, seperti `click`, terjadi pada suatu elemen, event tersebut tidak hanya dijalankan pada elemen yang diklik saja. Event akan bergerak naik melalui hirarki DOM menuju parent, grandparent, hingga objek `document`. Proses ini disebut **event bubbling**.

Event Delegation memanfaatkan perilaku tersebut sehingga kita tidak perlu memasang event listener pada setiap elemen anak secara terpisah. Cukup satu listener pada parent yang akan menangani semua event dari child.

### Contoh Kasus

Misalkan terdapat daftar menu berikut:

```html
<ul id="menu">
  <li>Home</li>
  <li>Produk</li>
  <li>Kontak</li>
</ul>
```

### Cara Biasa

Setiap elemen `<li>` diberi event listener sendiri:

```javascript
document.querySelectorAll("li").forEach(item => {
  item.addEventListener("click", () => {
    console.log("Menu diklik");
  });
});
```

Cara ini dapat menjadi kurang efisien jika jumlah elemen sangat banyak atau elemen ditambahkan secara dinamis.

### Menggunakan Event Delegation

```javascript
document.getElementById("menu").addEventListener("click", function(event) {
  if (event.target.tagName === "LI") {
    console.log("Menu yang diklik:", event.target.textContent);
  }
});
```

### Cara Kerja

1. Pengguna mengklik salah satu elemen `<li>`.
2. Event `click` terjadi pada elemen tersebut.
3. Event kemudian naik (bubble) ke elemen `<ul>`.
4. Event listener yang dipasang pada `<ul>` menangkap event tersebut.
5. Melalui `event.target`, program dapat mengetahui elemen mana yang sebenarnya diklik.
6. Program menjalankan aksi sesuai elemen target.

### Keuntungan Event Delegation

* Mengurangi jumlah event listener yang digunakan.
* Menghemat penggunaan memori.
* Kode menjadi lebih sederhana dan mudah dikelola.
* Dapat menangani elemen yang ditambahkan secara dinamis tanpa perlu menambahkan listener baru.
* Meningkatkan performa aplikasi ketika jumlah elemen cukup banyak.

### Kesimpulan

Menurut saya, Event Delegation merupakan teknik yang sangat berguna dalam JavaScript untuk mengelola event secara lebih efisien. Dengan memanfaatkan event bubbling, kita cukup memasang satu event listener pada parent dan membiarkannya menangani event dari seluruh child di dalamnya. Teknik ini membuat kode lebih ringkas, mudah dipelihara, serta lebih optimal dibandingkan memasang event listener pada setiap elemen secara terpisah.
