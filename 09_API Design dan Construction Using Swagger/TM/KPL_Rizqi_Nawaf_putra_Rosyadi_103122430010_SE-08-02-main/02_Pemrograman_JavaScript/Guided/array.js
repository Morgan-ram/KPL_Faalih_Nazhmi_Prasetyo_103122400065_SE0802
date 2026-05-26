// buat tiga elemen kota kota yang kamu pernah kunjungi
const cities = ["Jakarta", "Bandung", "Surabaya"];
cities.unshift("yogyakarta");
cities.push("solo");
cities.pop(); //hapus array dari belakang
cities.reverse();
cities.slice(0,1);

console.log(cities.slice(0,1));
