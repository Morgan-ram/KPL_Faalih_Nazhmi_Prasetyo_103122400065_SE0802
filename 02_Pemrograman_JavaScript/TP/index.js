let data = [2, 0, 26, 28, -2];
let hasil = 1;

for (let i = 0; i < data.length; i++) {
    if (data[i] > 0) { 
        hasil *= data[i];
    }
}

console.log(hasil);