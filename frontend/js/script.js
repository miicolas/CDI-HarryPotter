// Filter function
function filterType() { // Récupérez les boutons de filtre
  const filterAll = document.getElementById("filterAll"); 
  const filterGryffondor = document.getElementById("filterGryffondor");
  const filterPoufsouffle = document.getElementById("filterPoufsouffle");
  const filterSerdaigle = document.getElementById("filterSerdaigle");
  const filterSerpentard = document.getElementById("filterSerpentard");

  // Ajoutez un écouteur d'événement à chaque bouton de filtre
  filterAll.addEventListener("click", function () { 
    filterCards("Tous");
  });
  filterGryffondor.addEventListener("click", function () {
    filterCards("Gryffondor");
  });
  filterPoufsouffle.addEventListener("click", function () {
    filterCards("Poufsouffle");
  });
  filterSerdaigle.addEventListener("click", function () {
    filterCards("Serdaigle");
  });
  filterSerpentard.addEventListener("click", function () {
    filterCards("Serpentard");
  });
}
function filterCards(selectedType) { // Récupérez tous les éléments de la galerie
  const galleryItems = document.querySelectorAll(".gallery-item");
  console.log(galleryItems);
  galleryItems.forEach(function (item) { // Parcourez chaque élément de la galerie
    const itemType = item.getAttribute("data-type");

    if (selectedType === "Tous" || selectedType === itemType) { // Vérifiez si l'élément est du type sélectionné
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

function updateFilterButtons() { 
  const filterButtons = [ // Récupérez les boutons de filtre
    filterAll,
    filterGryffondor,
    filterPoufsouffle,
    filterSerdaigle,
    filterSerpentard,
  ];

  filterButtons.forEach(function (button) { // Ajoutez un écouteur d'événement à chaque bouton de filtre
    button.addEventListener("click", function () { 
      filterButtons.forEach(function (btn) {  // Parcourez chaque bouton de filtre
        btn.classList.remove("select"); // Supprimez la classe "select" de tous les boutons de filtre
        btn.classList.add("unselect"); // Ajoutez la classe "unselect" à tous les boutons de filtre
      });
      button.classList.add("select"); // Ajoutez la classe "select" au bouton de filtre sélectionné
      button.classList.remove("unselect"); // Supprimez la classe "unselect" du bouton de filtre sélectionné
    });
  });
}

// Search function
function searchCard() {
  const searchInput = document.getElementById("search");
  console.log(searchInput);

  searchInput.addEventListener("input", function () {
    const galleryItems = document.querySelectorAll(".gallery-item");
    console.log(galleryItems);
    
    const searchValue = searchInput.value.trim().toLowerCase(); // trim() supprime les espaces avant et après la chaîne de caractères
    console.log("Search value: ", searchValue);
    console.log("Gallery items: ", galleryItems);

    galleryItems.forEach(function (item) {// Vérifiez que l'élément possède bien un attribut data-id
  
      const dataId = item.getAttribute("data-id");
      console.log("Data ID: ", dataId);

      // Vérifiez si l'attribut data-id est null ou non
      if (dataId !== null) {
        const lowerCaseDataId = dataId.toLowerCase(); // Convertissez la valeur de l'attribut data-id en minuscules
        console.log("Lowercase Data ID: ", lowerCaseDataId);

        if (lowerCaseDataId.includes(searchValue)) { // Vérifiez si la valeur de l'attribut data-id contient la valeur de la recherche
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      } else {// Si l'attribut data-id est null, affichez un message dans la console pour le signaler
        console.log("Missing data-id attribute");
      }
    });
  });
}

// Call functions
document.addEventListener("DOMContentLoaded", function () {
  filterType();
  searchCard();
  updateFilterButtons();
});

const menuIcon = document.getElementById("menuIcon");
const closeIcon = document.getElementById("closeIcon");
const overlay = document.querySelector(".overlay");

menuIcon.addEventListener("click", () => {
  overlay.style.display = "block";
  menuIcon.style.display = "none";
  closeIcon.style.display = "block";
  console.log("click");
});

closeIcon.addEventListener("click", () => {
  overlay.style.display = "none";
  closeIcon.style.display = "none";
  menuIcon.style.display = "block";
});

const profileOption = document.querySelectorAll(".profile-option");

profileOption.forEach(function (option) {
  option.addEventListener("click", function () {
    profileOption.forEach(function (el) {
      el.classList.remove("profile-option-selected");
    });
    option.classList.add("profile-option-selected");
  });
});

const exangeIcon = document.getElementById("exangeIcon");
const exangeClose = document.getElementById("exangeClose");
const exangeOverlay = document.querySelector(".exange-overlay");

if (exangeIcon) {
  exangeIcon.addEventListener("click", () => {
    exangeOverlay.style.display = "block";
    exangeIcon.style.display = "none";
    exangeClose.style.display = "block";
    console.log("click");
  });
}

if (exangeClose) {
  exangeClose.addEventListener("click", () => {
    exangeOverlay.style.display = "none";
    exangeClose.style.display = "none";
    exangeIcon.style.display = "block";
  });
}
