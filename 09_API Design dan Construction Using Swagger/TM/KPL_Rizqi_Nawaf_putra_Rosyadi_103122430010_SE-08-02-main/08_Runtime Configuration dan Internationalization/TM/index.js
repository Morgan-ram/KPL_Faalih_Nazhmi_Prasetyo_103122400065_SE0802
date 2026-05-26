require('dotenv').config(); // Load environment variables

// Data Simulasi dari API yang kamu berikan
const apiData = {
    "date": "2026-04-27",
    "idr": {
        "cnh": 0.00039638808,
        "eur": 0.000049509626,
        "idr": 1
    }
};

const inputIDR = [25000, 50000, 100000];

// 1. Fungsi Format Mata Uang menggunakan Intl
const formatCurrency = (value, currency, locale) => {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    }).format(value);
};

// 2. Fungsi Format Tanggal menggunakan Intl
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }).format(date);
};

// Main Process
console.log(`Mengambil data dari: ${process.env.BASE_API}\n`);

inputIDR.forEach(jumlah => {
    const nilaiCNH = jumlah * apiData.idr.cnh;
    const nilaiEUR = jumlah * apiData.idr.eur;

    const formattedIDR = formatCurrency(jumlah, 'IDR', 'id-ID');
    const formattedCNH = formatCurrency(nilaiCNH, 'CNH', 'zh-CN').replace('CNH', 'CNH ');
    const formattedEUR = formatCurrency(nilaiEUR, 'EUR', 'de-DE');
    const formattedDate = formatDate(apiData.date);

    console.log(`Kurs ${formattedIDR} pada ${formattedDate} adalah ${formattedCNH} dan ${formattedEUR}`);
});