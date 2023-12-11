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

function updateFilterButtons() {
    const filterButtons = [filterAll, filterGryffondor, filterPoufsouffle, filterSerdaigle, filterSerpentard]

    filterButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            filterButtons.forEach(function(btn) {
                btn.classList.remove('select');
                btn.classList.add('unselect');
            });
            button.classList.add('select');
            button.classList.remove('unselect');
        });
    });
}


// Search function
function searchCard(selectedType) {
    const searchInput = document.getElementById("search");
    const galleryItems = document.querySelectorAll(".gallery-item");
    searchInput.addEventListener("input", function () {
        const searchValue = searchInput.value.toLowerCase();
        galleryItems.forEach(function (item) {
            const name = item.querySelector("p").textContent.toLowerCase();
            const itemType = item.getAttribute("data-type");
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
    const galleryItems = document.querySelectorAll(".gallery-image");
    galleryItems.forEach(function (item) {
        item.addEventListener("click", function () {
            const cardid = item.dataset.id ;
            window.location.href = `///Users/nicolasbecharat/Documents/GitHub/harrypotter/cartes/${cardid}.html`
        });
    });
}

function buttonAnimation (){
    const scrollTo = document.getElementById("bouncebutton");
    scrollTo.addEventListener("click", function () {
        window.scrollBy ({
            top : 40,
            behavior : "smooth"
        });
    });
}

// Call functions
document.addEventListener("DOMContentLoaded", function () {
    filterType();
    searchCard();
    CardDetails();
    updateFilterButtons();
    buttonAnimation();
});

const bounceContainerButton = document.querySelector('.bounce-container');

bounceContainerButton.addEventListener('click', function(e) {
    e.preventDefault();
    const tirageSection = document.getElementById('tirage');
    tirageSection.scrollIntoView({ behavior: 'smooth' });
});

const heroButton = document.querySelector('.hero-button');
heroButton.addEventListener('click', function(e) {
    e.preventDefault();
    const gallerySection = document.getElementById('gallery-section');
    gallerySection.scrollIntoView({ behavior: 'smooth' });
});

const likeButton = document.querySelectorAll('.like-button');
likeButton.forEach(function(button) {
    button.addEventListener('click', function() {
        button.classList.toggle('like-button--active');
    }
)
     
});