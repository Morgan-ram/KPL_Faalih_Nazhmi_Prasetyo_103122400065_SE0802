const editorElement = document.getElementById("editor-kecil");
const charCountElement = document.getElementById("hf");  
const upperCountElement = document.getElementById("hb"); 
const lowerCountElement = document.getElementById("hk"); 

const btnBesar = document.getElementById("btn-besar");
const btnKecil = document.getElementById("btn-kecil");

const buttonLightElement = document.getElementById("tombol-terang");
const buttonDarkElement = document.getElementById("tombol-gelap");
const buttonSepiaElement = document.getElementById("tombol-sepia"); // Tambah ini

function updateStatistik() {
    const teks = editorElement.value;

    charCountElement.textContent = teks.length;

    const hitungBesar = (teks.match(/[A-Z]/g) || []).length;
    upperCountElement.textContent = hitungBesar;

    const hitungKecil = (teks.match(/[a-z]/g) || []).length;
    lowerCountElement.textContent = hitungKecil;
}

editorElement.addEventListener("input", updateStatistik);

btnBesar.addEventListener("click", () => {
    editorElement.value = editorElement.value.toUpperCase();
    updateStatistik(); 
});

btnKecil.addEventListener("click", () => {
    editorElement.value = editorElement.value.toLowerCase();
    updateStatistik();
});

// Logika pindah mode
buttonLightElement.addEventListener("click", () => {
    document.documentElement.classList.remove("mode-gelap", "mode-sepia");
    console.log("State: Mode Terang diaktifkan");
});

buttonDarkElement.addEventListener("click", () => {
    document.documentElement.classList.remove("mode-sepia");
    document.documentElement.classList.add("mode-gelap");
    console.log("State: Mode Gelap diaktifkan");
});

buttonSepiaElement.addEventListener("click", () => {
    document.documentElement.classList.remove("mode-gelap");
    document.documentElement.classList.add("mode-sepia");
    console.log("State: Mode Sepia diaktifkan");
});