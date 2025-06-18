const rowEl = document.querySelector(".row");

const imgEl = document.querySelector(".img");
const modalEl = document.querySelector(".modal");
const modal_immagineEl = document.querySelector("modal_immagine");

const endpoinUrl = "https://lanciweb.github.io/demo/api/pictures/";

fetch(endpoinUrl)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    data.forEach((post) => {
      const { title, date, url } = post;
      const postMarkupStr = `
        <div class="col-4">
             <div class="card">
                 <img class="pin" src="./assets/img/pin.svg">
                 <img class= "img" src="${url}">
                 <div class="modal">
                   <div class="modal_content">
                     <button class= "close">X</button>
                     <img class="modal_immagine" src="${url}">
                   </div>
                 </div>
                 <p>${title}</p>
                 <p>${date}</p>
             </div>
        </div>
      `;
      rowEl.insertAdjacentHTML("beforeend", postMarkupStr);
    });
  });
