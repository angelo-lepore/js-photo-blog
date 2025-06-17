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
                 <img class= "img" src="${url}">
                 <p>${title}</p>
                 <p>${date}</p>
             </div>
        </div>
      `;
      rowEl.insertAdjacentHTML("beforeend", postMarkupStr);
    });
  });
