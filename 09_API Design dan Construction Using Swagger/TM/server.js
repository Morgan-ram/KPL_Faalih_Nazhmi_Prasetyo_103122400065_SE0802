const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

/**
 * Fungsi untuk menghasilkan angka "acak" tetap (1-100) berdasarkan string nama.
 * Menggunakan algoritma sederhana berbasis nilai ASCII karakter.
 */
function getDeterministicRandomNumber(name) {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        // Menghitung nilai total karakter (case-sensitive)
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    // Memastikan angka positif dan berada dalam rentang 1-100
    return (Math.abs(hash) % 100) + 1;
}

app.post('/', (req, res) => {
    const { nama, tebakan } = req.body;

    // Validasi input sederhana
    if (!nama || tebakan === undefined) {
        return res.status(400).json({ error: "Format request tidak lengkap." });
    }

    // Ambil angka target yang sudah ditentukan khusus untuk nama tersebut
    const angkaBenar = getDeterministicRandomNumber(nama);

    let responJawaban = "";

    if (tebakan === angkaBenar) {
        responJawaban = `Benar sekali! Tebakannya adalah ${angkaBenar}.`;
    } else if (tebakan > angkaBenar) {
        responJawaban = "Tebakanmu terlalu tinggi!";
    } else {
        responJawaban = "Tebakanmu terlalu rendah!";
    }

    res.json({
        jawaban: responJawaban
    });
});

app.listen(port, () => {
    console.log(`API Tebak Angka berjalan di http://localhost:${port}`);
});
app.get('/', (req, res) => {
    res.send('Server sudah jalan! Tapi gunakan POST untuk bermain tebak angka.');
});