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
  });
