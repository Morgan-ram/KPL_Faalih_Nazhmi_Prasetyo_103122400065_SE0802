/**
 * Menghitung jumlah huruf (hanya A-Z, besar dan kecil).
 * Spasi dan karakter non-alfabet tidak dihitung.
 */
export function hitungHuruf(teks) {
  const alfabetHanya = teks.replace(/[^a-zA-Z]/g, '');
  return alfabetHanya.length;
}

/**
 * Menghitung jumlah kata berdasarkan pemisah spasi.
 */
export function hitungKata(teks) {
  // Membersihkan spasi di awal/akhir dan membagi berdasarkan satu atau lebih spasi
  const kataArray = teks.trim().split(/\s+/);
  return teks.trim() === '' ? 0 : kataArray.length;
}