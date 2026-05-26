import { pangkat } from './lib/pangkat.js';
import { bulat } from './lib/bulat.js';
import { kuadrat } from './lib/kuadrat.js';

// Bagian export untuk kebutuhan pustaka
export { pangkat, bulat, kuadrat };

// --- TAMBAHKAN KODE DI BAWAH INI ---
// Kode ini yang akan mencetak hasil ke terminal
const hasilKuadrat = kuadrat(12);
const hasilBulat = bulat(hasilKuadrat);
const hasilPangkat = pangkat(2, 10);

const narasi = `Seorang insinyur menetapkan luas panel ${hasilBulat} meter persegi, lalu menggunakan kapasitas penyimpanan sebesar ${hasilPangkat} watt-jam.`;

console.log(narasi);