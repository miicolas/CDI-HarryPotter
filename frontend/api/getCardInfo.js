const urlParams = new URLSearchParams(window.location.search); // Récupère les paramètres de l'URL
const cardId = urlParams.get("card"); // Récupère la valeur du paramètre "card"
console.log(cardId);

function fetchCardInfo() {
  console.log("fetchCardInfo", cardId);
  return fetch(`/searchcard?card=${cardId}`).then((response) =>
    response.json()
  );
  
}

async function displayCardInfo() {
  const data = await fetchCardInfo();
  let gallery = document.querySelector(".card_container");
  gallery.innerHTML += `
  <div> 
    <p>${data.name}</p>
  </div>
`;
}

displayCardInfo(); 