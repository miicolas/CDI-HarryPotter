function fetchCard (){
  return fetch("/cards").then ((response) => response.json());
}
async function displayCard() {

  const data = await fetchCard();
  let gallery = document.querySelector(".cards_container_gallery");

  for (let i = 0; i < data.length; i++) {
    gallery.innerHTML += 
    `
      <div class="card" data-house="${data[i].house}" data-id="${data[i].id_card}">
        <img
          class="card_image"
          src="../../img/cartes/${data[i].id_card}.jpg"
          alt="${data[i].name}"
        />
        <div class="card_buttons">
            <div class="card_button_readmore">En savoir plus</div>
        </div>
      </div>
    `;
  }
}

displayCard();
