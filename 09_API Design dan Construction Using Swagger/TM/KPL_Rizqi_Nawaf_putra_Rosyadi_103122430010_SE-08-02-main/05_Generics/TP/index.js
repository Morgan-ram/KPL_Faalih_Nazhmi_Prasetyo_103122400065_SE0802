function hitung(teks, mode) {
    let jumlah = 0;

    for (const c of teks) {
        if (mode === "huruf" && c === ' ') {
            continue; 
        }
        jumlah++;
    }

    return jumlah;
}
const str = "Bar bar bar";

console.log(
   hitung(str, "semua") 
);

console.log(
  hitung(str, "huruf") 
);

hitung(str, "huruf"); 