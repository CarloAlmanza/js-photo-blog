'use strict'

const API_URL = "https://lanciweb.github.io/demo/api/pictures/";

let photosData = [];
let currentIndex = 0;

// elementi overlay
const overlay = document.getElementById("overlay");
const overlayImg = document.getElementById("overlay-img");
const closeBtn = document.getElementById("close-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

// FETCH
fetch(API_URL)
    .then(response => {
        if (!response.ok) throw new Error("Errore API");
        return response.json();
    })
    .then(data => {
        photosData = data;
        renderPhotos(data);
    })
    .catch(error => console.error(error));


// RENDER CARD
function renderPhotos(photos) {
    const container = document.getElementById("photo-container");
    container.innerHTML = "";

    photos.forEach((photo, index) => {

        const col = document.createElement("div");
        col.className = "col-12 col-sm-6 col-md-6 col-lg-4";

        col.innerHTML = `
            <div class="card-custom">
                <div class="pin"></div>
                <img src="${photo.url}" alt="">
                <div class="card-text">${photo.title}</div>
            </div>
        `;

        const img = col.querySelector("img");

        img.addEventListener("click", () => {
            currentIndex = index;
            openOverlay();
        });

        container.appendChild(col);
    });
}


// OPEN OVERLAY
function openOverlay() {
    overlayImg.src = photosData[currentIndex].url;
    overlay.classList.remove("d-none");
}


// CHIUDI
closeBtn.addEventListener("click", () => {
    overlay.classList.add("d-none");
});


// FRECCIA SINISTRA
prevBtn.addEventListener("click", () => {
    currentIndex--;
    if (currentIndex < 0) currentIndex = photosData.length - 1;
    overlayImg.src = photosData[currentIndex].url;
});


// FRECCIA DESTRA
nextBtn.addEventListener("click", () => {
    currentIndex++;
    if (currentIndex >= photosData.length) currentIndex = 0;
    overlayImg.src = photosData[currentIndex].url;
});


// CLICK FUORI IMMAGINE
overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
        overlay.classList.add("d-none");
    }
});


// TASTIERA
document.addEventListener("keydown", (e) => {
    if (overlay.classList.contains("d-none")) return;

    if (e.key === "ArrowRight") nextBtn.click();
    if (e.key === "ArrowLeft") prevBtn.click();
    if (e.key === "Escape") overlay.classList.add("d-none");
});