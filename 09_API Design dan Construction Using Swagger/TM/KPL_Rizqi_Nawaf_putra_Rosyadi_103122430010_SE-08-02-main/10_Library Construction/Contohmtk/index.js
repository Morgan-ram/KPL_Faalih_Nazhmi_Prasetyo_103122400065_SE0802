export function tambah(x, y){
    return x + y;
}

export function kurang(x, y){
    return x - y;
}

export function kali(x, y){
    return x * y;
}

export function bagi(x, y){
    return x / y;
}

export function pangkat(x, y){
    return x ** y;
}
 
/**
 * 
 * @param {string} str 
 */
export function persamaan(str){
    const sisikanan = /\=(.*)/g;
    const sisikiri = /\(.*)=/g;

    const sukukiri = [];
    const sukukanan = [];

    const kiri = sisikanan.exec(str);
    const kanan = sisikanan.exec(str);

    console.log(kiri);
    console.log(kanan);    
    
}