fetch("/cards")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    let gallery = document.querySelector(".cards_container_gallery");

    for (let i = 0; i < data.length; i++) {
      gallery.innerHTML += `
          <div class="card" data-house="${data[i].house}" data-id="${data[i].name}">
              <img
                class="card_image"
                src="../../img/cartes/${data[i].id_card}.jpg"
                alt="${data[i].name}"
              />
              <div class="card_buttons">
                <a href="">
                  <div class="card_button_readmore">En savoir plus</div>
                </a>
              </div>
            </div>
        `;
    }
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
