**Nama:** Rizqi Nawaf Putra Rosyadi

**NIM:** 103122430010

**Kelas:** SE-08-02

## Soal
Dari dua kode di bawah ini, mana yang kamu ingin cari masalahnya dan perbaiki di tengah-tengah malam, katakanlah jam 1 malam? Mengapa?
```
function processUser(user) {
  if (user) {
    if (user.isActive) {
      if (user.hasPermission) {
        return doSomething(user)
      }
    }
  }
  return null
}
```
```
function processUser(user) {
  if (!isValidCandidate(user)) return null;
  return doSomething(user);
}

function isValidCandidate(user) {
  return user && user.isActive && user.hasPermission;
}
```
## Deskripsi
Saya akan memilih kode kedua untuk dicari masalahnya dan diperbaiki pada jam 1 malam.

Alasannya karena kode kedua lebih mudah dibaca, lebih ringkas, dan memiliki struktur yang jelas. Logika validasi dipisahkan ke dalam fungsi isValidCandidate(), sehingga ketika terjadi masalah saya bisa langsung memeriksa bagian validasi atau bagian proses utama tanpa harus menelusuri banyak percabangan yang bertingkat.

Pada kode pertama, terdapat beberapa nested if yang membuat alur program lebih sulit diikuti. Saat debugging, saya harus memeriksa satu per satu kondisi user, user.isActive, dan user.hasPermission untuk mengetahui di mana proses berhenti. Semakin banyak percabangan yang bersarang, semakin besar kemungkinan terjadi kesalahan atau terlewat saat proses perbaikan.