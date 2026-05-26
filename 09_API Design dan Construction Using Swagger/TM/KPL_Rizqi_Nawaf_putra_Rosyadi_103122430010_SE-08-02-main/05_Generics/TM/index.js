/**
 * Mengevaluasi apakah sebuah angka adalah kelipatan 3, 5, atau keduanya.
 * @param {number} value - Angka bulat tunggal yang akan dicek.
 * @returns {string|number} Mengembalikan "FizzBuzz", "Fizz", "Buzz", atau angka itu sendiri.
 */
function zzzzOrNum(value) {
    if (value % 3 === 0 && value % 5 === 0) {
        return "FizzBuzz";
    } else if (value % 3 === 0) {
        return "Fizz";
    } else if (value % 5 === 0) {
        return "Buzz";
    } else {
        return value;
    }
}

/**
 * Mengubah larik angka menjadi larik berisi string "Fizz", "Buzz", "FizzBuzz", atau angka asli.
 * @param {number[]} sequence - Larik yang semua elemennya terdiri dari bilangan bulat.
 * @returns {(string|number)[]} Larik hasil transformasi.
 */
function fizzBuzz(sequence) {
    const newSequence = sequence.map((e) => zzzzOrNum(e));
    return newSequence;
}

module.exports = {
    fizzBuzz: fizzBuzz,
    zzzzOrNum: zzzzOrNum,
};

// Tambahkan ini di baris paling akhir untuk tes cepat
const data = [1, 2, 3, 5, 15];
console.log(fizzBuzz(data));