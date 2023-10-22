// Filter function
function filterType() {
  const filterAll = document.getElementById("filterAll");
  const filterGryffondor = document.getElementById("filterGryffondor");
  const filterPoufsouffle = document.getElementById("filterPoufsouffle");
  const filterSerdaigle = document.getElementById("filterSerdaigle");
  const filterSerpentard = document.getElementById("filterSerpentard");

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
function filterCards(selectedType) {
  const galleryItems = document.querySelectorAll(".gallery-item");
  galleryItems.forEach(function (item) {
    const itemType = item.getAttribute("data-type"); 
    if (selectedType === "Tous" || selectedType === itemType) {

      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

// Search function
function searchCard() {

  const searchInput = document.getElementById("search");
  const galleryItems = document.querySelectorAll(".gallery-item");

  searchInput.addEventListener("input", function () {
    const searchValue = searchInput.value.toLowerCase();

    galleryItems.forEach(function (item) {
      const name = item.querySelector("p").textContent.toLowerCase(); // Get the text content of the paragraph element

      if (name.includes(searchValue)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
}

// CardDetails function
function CardDetails (){
  const galleryItems = document.querySelectorAll(".gallery-item");

  galleryItems.forEach(function (item) {
    item.addEventListener("click", function () {
      const cardid = item.dataset.id ; 
      window.location.href = `///Users/nicolasbecharat/Documents/GitHub/harrypotter/cartes/${cardid}.html`
      
    });
  });
}


// Call functions
document.addEventListener("DOMContentLoaded", function () {
  filterType();
  searchCard();
  CardDetails();

});


