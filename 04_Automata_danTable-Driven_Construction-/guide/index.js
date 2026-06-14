const buttonLightElement = document.getElementById("tombol-terang");
const buttonDarkElement = document.getElementById("tombol-gelap");

buttonLightElement.addEventListener("click", (event) => {
    document.documentElement.classList.remove("mode-gelap");
    console.log("State berubah ke: Mode Terang");
});

buttonDarkElement.addEventListener("click", (event) => {
    document.documentElement.classList.add("mode-gelap");
    console.log("State berubah ke: Mode Gelap");
});
