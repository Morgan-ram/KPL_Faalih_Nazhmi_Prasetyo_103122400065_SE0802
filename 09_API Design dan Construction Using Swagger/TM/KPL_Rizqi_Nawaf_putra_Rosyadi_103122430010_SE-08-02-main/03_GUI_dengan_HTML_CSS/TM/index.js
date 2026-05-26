const editorElement = document.getElementById("editor-kecil");
const charCountElement = document.getElementById("hf");
const upperCountElement = document.getElementById("hb"); 
const lowerCountElement = document.getElementById("hk"); 

function updateStatistik() {
    const teks = editorElement.value;

    charCountElement.textContent = teks.length;

    const hitungBesar = (teks.match(/[A-Z]/g) || []).length;
    upperCountElement.textContent = hitungBesar;

    const hitungKecil = (teks.match(/[a-z]/g) || []).length;
    lowerCountElement.textContent = hitungKecil;
}

editorElement.addEventListener("input", updateStatistik);

document.getElementById("huruf-besar").addEventListener("click", () => {
    editorElement.value = editorElement.value.toUpperCase();
    updateStatistik(); 
});

document.getElementById("huruf-kecil").addEventListener("click", () => {
    editorElement.value = editorElement.value.toLowerCase();
    updateStatistik(); 
});

// document.getElementById("huruf-paragraf").addEventListener("click", () => {
//     let teks = editorElement.value.toLowerCase();
//     if (teks.length > 0) {
//         editorElement.value = teks.charAt(0).toUpperCase() + teks.slice(1);
//     }
//     updateStatistik(); s
// });