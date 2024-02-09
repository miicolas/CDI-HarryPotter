// Filter function

function updateFilterButtons() {
    const filterButtons = document.querySelectorAll(".filter-button button");
    console.log(filterButtons);
    filterButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            filterButtons.forEach(function (btn) {
                btn.classList.remove("select");
                btn.classList.add("unselect");
            });
            button.classList.add("select");
            button.classList.remove("unselect");
            selectedType = button.getAttribute("data-house");
            console.log(selectedType);
            filterCards(selectedType);
        }); 
    });
}

function filterCards(selectedType) {
    const galleryItems = document.querySelectorAll(".gallery-item");
    console.log(galleryItems);
    galleryItems.forEach(function (item) {
        const itemType = item.getAttribute("data-house");
        console.log(itemType);
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
    console.log(searchInput);

    searchInput.addEventListener("input", function () {
        const galleryItems = document.querySelectorAll(".gallery-item");
        console.log(galleryItems);

        const searchValue = searchInput.value.trim().toLowerCase(); // trim() supprime les espaces avant et après la chaîne de caractères
        console.log("Valeur ", searchValue);
        console.log("Items ", galleryItems);

        galleryItems.forEach(function (item) {// Vérifiez que l'élément possède bien un attribut data-id

            const dataId = item.getAttribute("data-id");
            console.log("Data id: ", dataId);

            // Vérifiez si l'attribut data-id est null ou non
            if (dataId !== null) {
                const lowerCaseDataId = dataId.toLowerCase(); // Convertissez la valeur de l'attribut data-id en minuscules

                if (lowerCaseDataId.includes(searchValue)) { // Vérifiez si la valeur de l'attribut data-id contient la valeur de la recherche
                    item.style.display = "block";
                } else {
                    item.style.display = "none";
                }
            } else {// Si l'attribut data-id est null, affichez un message dans la console pour le signaler
                console.log("Attribut manquant");
            }
        });
    });
}

function BurgerMenu() {
    const menuIcon = document.getElementById("menuIcon");
    const closeIcon = document.getElementById("closeIcon");
    const overlay = document.querySelector(".overlay");

    if (!menuIcon) return;

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

}


function exchangeCard() {
    const exchangeIcon = document.getElementById("exangeIcon");
    const exchangeClose = document.getElementById("exangeClose");
    const exchangeOverlay = document.querySelector(".exange-overlay");

    if (exchangeIcon) {
        exchangeIcon.addEventListener("click", () => {
            exchangeOverlay.style.display = "block";
            exchangeIcon.style.display = "none";
            exchangeClose.style.display = "block";
            console.log("click");
        });
    }

    if (exchangeClose) {
        exchangeClose.addEventListener("click", () => {
            exchangeOverlay.style.display = "none";
            exchangeClose.style.display = "none";
            exchangeIcon.style.display = "block";
        });
    }
}

// Call functions
document.addEventListener("DOMContentLoaded", function () {
    BurgerMenu();
    updateFilterButtons();
    searchCard();

});

    // emailStorage();
    // CardDetails();
    
    
    // const profileOption = document.querySelectorAll(".profile-option");

    // profileOption.forEach(function (option) {
    //     option.addEventListener("click", function () {
    //         profileOption.forEach(function (el) {
    //             el.classList.remove("profile-option-selected");
    //         });
    //         option.classList.add("profile-option-selected");
    //     });
    // });

// const emailInput = document.getElementById("email");
// emailInput.addEventListener("input", function () {
//   const enteredEmail = emailInput.value;
//   localStorage.setItem("savedEmail", enteredEmail);
// });

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

