'use strict'

const API_URL = "https://lanciweb.github.io/demo/api/pictures/";

fetch(API_URL)
    .then(response => {
        if (!response.ok) {
            throw new Error("Errore nella risposta API");
        }
        return response.json();
    })
    .then(data => {
        console.log("DATI:", data);

        renderPhotos(data);
    })
    .catch(error => {
        console.error("Errore:", error);
    })
    .finally(() => {
        console.log("Chiamata completata");
    });


// funzione per stampare le card
function renderPhotos(photos) {
    const container = document.getElementById("photo-container");

    container.innerHTML = "";

    photos.forEach(photo => {
        const col = document.createElement("div");
        col.className = "col-12 col-sm-6 col-md-6 col-lg-4";

        col.innerHTML = `
      <div class="card-custom">
        <div class="pin"></div>
        <img src="${photo.url}" alt="">
        <div class="card-text">
          ${photo.title}
        </div>
      </div>
    `;

        // EVENTO CLICK
        const img = col.querySelector("img");
        img.addEventListener("click", () => {
            openOverlay(photo.url);
        });

        container.appendChild(col);
    });
}

const overlay = document.getElementById("overlay");
const overlayImg = document.getElementById("overlay-img");
const closeBtn = document.getElementById("close-btn");

function openOverlay(url) {
    overlayImg.src = url;
    overlay.classList.remove("d-none");
}

closeBtn.addEventListener("click", () => {
    overlay.classList.add("d-none");
});