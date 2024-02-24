fetch("/cards/:id")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    let gallery = document.querySelector(".container_card_info");

 
      gallery.innerHTML += `
      <div class="card" data-house="${data.house}" data-id="${data.id_card}">
      <img
          class="card_image"
          src="../../img/cartes/${data.id_card}.jpg"
          alt="${data.name}"
      />
  </div>
        `;
    
    })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
