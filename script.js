// Filter function
function filterType() {
  const filterAll = document.getElementById("filterAll");
  const filterCharacter = document.getElementById("filterCharacter");
  const filterGirl = document.getElementById("filterGirl");

  filterAll.addEventListener("click", function () {
    filterCards("All");
  });
  filterCharacter.addEventListener("click", function () {
    filterCards("Character");
  });
  filterGirl.addEventListener("click", function () {
    filterCards("Girl");
  });
}
function filterCards(selectedType) {
  const galleryItems = document.querySelectorAll(".gallery-item");
  galleryItems.forEach(function (item) {
    const itemType = item.getAttribute("data-type"); 
    if (selectedType === "All" || selectedType === itemType) {

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

document.addEventListener("DOMContentLoaded", function () {
  filterType();
  searchCard();
});
