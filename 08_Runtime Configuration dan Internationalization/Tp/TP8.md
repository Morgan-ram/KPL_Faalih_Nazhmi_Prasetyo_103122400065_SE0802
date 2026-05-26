**Nama:** Faalih Nazhmi Prasetyo

**NIM:** 103122400065

**Kelas:** SE-08-02

## Soal
Tampilkan tanggal sekarang dengan format seperti ini:
```
Sabtu, 18 April 2026
```
Nilai waktu tidak harus sama, asalkan formatnya benar dan bisa tampil di komputer terpisah pada waktu tertentu. Gunakan `Intl.DateTimeFormat` (bukan string manual).

## Output
![hasil](./Cuplikan%20layar%202026-05-26%20151524.png)

## Deskripsi
Objek Intl.DateTimeFormat dengan lokalitas 'id-ID' digunakan untuk memformat objek tanggal (Date) secara otomatis sesuai dengan standar penanggalan Indonesia. Dengan menentukan properti seperti weekday, day, month, dan year menggunakan nilai 'long' atau 'numeric', JavaScript dapat menghasilkan format tanggal lengkap yang mencakup nama hari dan bulan tanpa perlu membuat pemetaan string secara manual. Metode ini sangat disarankan karena mampu menjaga konsistensi tampilan tanggal di berbagai lingkungan runtime sekaligus menyesuaikan aturan format dan tata bahasa lokal secara otomatis.