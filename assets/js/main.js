// seleziono l'elemento dove inseriro il markup
const rowEl = document.querySelector(".row");

// URL da dove ottenere i dati salvato in una costante
const endpoinUrl = "https://lanciweb.github.io/demo/api/pictures/";

// richiesta fetch per ottenere i dati dal server
fetch(endpoinUrl)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    // creo un markup per ogni dato ricevuto, da inserire in pagina
    data.forEach((post) => {
      const { title, date, url } = post;
      const postMarkupStr = `
        <div class="col-4">
             <div class="card">
                 <img class="pin" src="./assets/img/pin.svg">
                 <img class="img" src="${url}">
                 <div class="modal hidden">
                   <div class="modal_content">
                     <button class="close-button">✘</button>
                     <img class="modal_image" src="${url}">
                     <div class="arrow-button">
                       <i class="fa-solid fa-circle-chevron-right fa-rotate-180" id="before-button"></i>
                       <i class="fa-solid fa-circle-chevron-right" id="next-button"></i>
                     </div>
                   </div>
                 </div>
                 <h3>${title}</h3>
                 <p>${date}</p>
             </div>
        </div>
      `;
      // inserisco il markup in pagina
      rowEl.insertAdjacentHTML("beforeend", postMarkupStr);
    });

    // creo un array con solo gli URL delle immagini
    const images = data.map((element) => element.url);
    console.log(images);
    // inizializzo l'i dell'immagine corrente a 0
    let currentImageIndex = 0;
    // ---------- creo una funzione per mostrare l'immagine successiva ----------
    function nextImage() {
      // incremento l'i dell'immagine
      currentImageIndex = (currentImageIndex + 1) % images.length;
      // aggiorno l'immagine mostrata nel DOM
      document.querySelector(".modal_image").src = images[currentImageIndex];
    }
    // eseguo la funzione quando si preme un pulsante
    document.getElementById("next-button").addEventListener("click", nextImage);
    // ---------- creo una funzione per mostrare l'immagine precedente ----------
    function prevImage() {
      // decremento l'i dell'immagine
      currentImageIndex =
        (currentImageIndex - 1 + images.length) % images.length;
      // aggiorno l'immagine mostrata nel DOM
      document.querySelector(".modal_image").src = images[currentImageIndex];
    }
    // eseguo la funzione quando si preme un pulsante
    document
      .getElementById("before-button")
      .addEventListener("click", prevImage);

    // seleziono le immagini aggiunte al DOM e l'elemento dell'immagine nel modal
    const imgEl = document.querySelectorAll(".img");
    const modalEl = document.querySelector(".modal");
    const modal_imageEl = document.querySelector(".modal_image");
    // seleziono il pulsante per chiudere il modal
    const closeEL = document.querySelector(".close-button");
    // aggiungo un EventListener a ogni immagine per aprire il modal
    imgEl.forEach((img) => {
      img.addEventListener("click", () => {
        // prendo l'URL dell'immagine cliccata
        const imageSrc = img.getAttribute("src");
        // mostro l'immagine giusta con lo stesso URL dell'immagine cliccata
        modal_imageEl.setAttribute("src", imageSrc);
        // rimuovo la classe che mi nasconde il modal
        modalEl.classList.remove("hidden");
      });
    });
    // aggiungo un EventListener al pulsante di chiusura per nascondere il modal
    closeEL.addEventListener("click", () => {
      modalEl.classList.add("hidden");
    });
    // aggiungo un EventListener per nascondere il modal quando clicco fuori dall'immagine
    modalEl.addEventListener("click", (event) => {
      if (event.target === modalEl) {
        modalEl.classList.add("hidden");
      }
    });
  });
