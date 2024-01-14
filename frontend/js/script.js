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
    console.log(galleryItems);
    galleryItems.forEach(function (item) {
        const itemType = item.getAttribute("data-type");

        if (selectedType === "Tous" || selectedType === itemType) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
}

function updateFilterButtons() {
    const filterButtons = [
        filterAll,
        filterGryffondor,
        filterPoufsouffle,
        filterSerdaigle,
        filterSerpentard,
    ];

    filterButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            filterButtons.forEach(function (btn) {
                btn.classList.remove("select");
                btn.classList.add("unselect");
            });
            button.classList.add("select");
            button.classList.remove("unselect");
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

// Email function
// function emailStorage() {
//   const savedEmail = localStorage.getItem("savedEmail");
//   if (savedEmail) {
//     const emailInput = document.getElementById("email");
//     emailInput.value = savedEmail;
//   }
// }

// CardDetails function
// function CardDetails (){
//   const galleryItems = document.querySelectorAll(".gallery-item");

//   galleryItems.forEach(function (item) {
//       item.addEventListener("click", function () {
//           const cardid = item.dataset.id ;
//           window.location.href = `///Users/nicolasbecharat/Documents/GitHub/harrypotter/cartes/${cardid}.html`
//       });
//   });
// }


// Call functions
document.addEventListener("DOMContentLoaded", function () {
    filterType();
    searchCard();

    // emailStorage();
    // CardDetails();
    updateFilterButtons();
});

const menuIcon = document.getElementById("menuIcon");
const closeIcon = document.getElementById("closeIcon");
const overlay = document.querySelector(".overlay");

menuIcon.addEventListener("click", () => {
    overlay.style.display = "block";
    menuIcon.style.display = "none";
    closeIcon.style.display = "block";
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

/*const likeButton = document.querySelectorAll(".like-button");
console.log(likeButton);

likeButton.forEach(function (button) {

  button.addEventListener("click", function () {
    button.classList.toggle("like-button--active");
  });
});*/


// const emailInput = document.getElementById("email");
// emailInput.addEventListener("input", function () {
//   const enteredEmail = emailInput.value;
//   localStorage.setItem("savedEmail", enteredEmail);
// });

