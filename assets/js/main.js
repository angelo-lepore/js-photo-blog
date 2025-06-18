const rowEl = document.querySelector(".row");

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
                 <img class="img" src="${url}">
                 <div class="modal hidden">
                   <div class="modal_content">
                     <button class="close-button">✘</button>
                     <img class="modal_image" src="${url}">
                   </div>
                 </div>
                 <p>${title}</p>
                 <p>${date}</p>
             </div>
        </div>
      `;
      rowEl.insertAdjacentHTML("beforeend", postMarkupStr);
    });

    const imgEl = document.querySelectorAll(".img");
    const modalEl = document.querySelector(".modal");
    const modal_imageEl = document.querySelector(".modal_image");
    const closeEL = document.querySelector(".close-button");

    imgEl.forEach((img) => {
      img.addEventListener("click", () => {
        const imageSrc = img.getAttribute("src");
        modal_imageEl.setAttribute("src", imageSrc);
        modalEl.classList.remove("hidden");
      });
    });
    closeEL.addEventListener("click", () => {
      modalEl.classList.add("hidden");
    });
  });
