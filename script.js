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

        container.appendChild(col);
    });
}