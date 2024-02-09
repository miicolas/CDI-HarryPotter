function darkMode() {
  const darkModeButton = document.querySelectorAll(".dark_mode_button");
  const rulesContent = document.querySelectorAll(".rules_content");
  const body = document.querySelector("body");

  if (localStorage.getItem("darkMode") === "true") {
    body.classList.add("dark-mode");
    rulesContent.forEach((container) => {
      container.classList.add("dark-mode");
    });
  } else {
    body.classList.remove("dark-mode");
    rulesContent.forEach((container) => {
      container.classList.remove("dark-mode");
    });
  }
  darkModeButton.forEach((button) => {
    button.addEventListener("click", function () {
      body.classList.toggle("dark-mode");
      rulesContent.forEach((container) => {
        container.classList.toggle("dark-mode");
      });
      localStorage.setItem("darkMode", body.classList.contains("dark-mode"));
      localStorage.setItem("darkMode", rulesContent.classList.contains("dark-mode"));
    });
  });
}

function Carousel() {
  const swiper = new Swiper(".mySwiper", {
    loop: true,
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
  if (!swiper) return;
}

function navTap() {
  const btnOpen = document.getElementById("btn_open");
  const btnClose = document.getElementById("btn_close");
  const navContent = document.getElementById("nav_content");
  if (!navContent) return;
  console.log(btnOpen);
  btnOpen.addEventListener("click", function () {
    btnOpen.style.display = "none";
    navContent.style.display = "block";
    navContent.classList.remove("closeTab");
    navContent.classList.add("openTab");
  });

  btnClose.addEventListener("click", function () {
    navContent.classList.remove("openTab");
    navContent.classList.add("closeTab");
  });

  navContent.addEventListener("animationend", function () {
    if (navContent.classList.contains("closeTab")) {
      navContent.style.display = "none";
      btnOpen.style.display = "flex";
    }
  });
}

<<<<<<< Updated upstream
<<<<<<< Updated upstream
function openTab(e, tabName) {
  let i = 0;
  const tabcontent = document.getElementsByClassName("tab_content");
  const tabbutton = document.getElementsByClassName("account_tab_button");
=======

function openTab() {
  
// Register event listeners for tab buttons
document.querySelectorAll(".account_tab_button").forEach(button => {
  button.addEventListener("click", function() {
    // Remove 'active' class from all tab buttons
    document.querySelectorAll(".account_tab_button").forEach(btn => {
      btn.classList.remove("active");
    });
    // Add 'active' class to the clicked tab button
    button.classList.add("active");
>>>>>>> Stashed changes

    // Hide all tab contents
    document.querySelectorAll(".tab_content").forEach(content => {
      content.style.display = "none";
    });

    // Display the corresponding tab content
    const tabName = button.dataset.tab;
    document.getElementById(tabName).style.display = "block";
  });
});

// Initially display the first tab content
document.getElementById("signin").style.display = "block";

}
=======

>>>>>>> Stashed changes

function formVerification() {
  const form = document.getElementById("signup_form");
<<<<<<< Updated upstream
  if (!form) return;
=======
  if (!form) return
>>>>>>> Stashed changes
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let email = document.querySelector("#email_signup");
    let name = document.querySelector("#name");
    let password = document.querySelector("#password_signup");
    let confirmPassword = document.querySelector("#confirmPassword");

    const errorList = document.getElementById("error_list");
    errorList.innerHTML = "";

    if (name.value === "" || name.value.length < 6) {
      addErrorToList("Le nom doit contenir au moins 6 caractères");
    }

    if (email.value === "" || email.value.indexOf("@") === -1) {
      addErrorToList("L'adresse email n'est pas valide");
    }

    const regexPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-+_!@#$%^&*.,?]).{8,}$/;

    if (
      password.value.length < 8 ||
      regexPassword.test(password.value) === false
    ) {
      addErrorToList(
        "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial"
      );
    }

    if (
      password.value !== confirmPassword.value ||
      confirmPassword.value === ""
    ) {
      addErrorToList("Les mots de passe ne correspondent pas");
    }

    if (errorList.children.length > 0) {
      const errorMessage = document.querySelector(".error_form");
      errorMessage.style.display = "block";
    } else {
      const successMessage = document.querySelector(".success_form");
      successMessage.style.display = "block";
      setTimeout(() => {
        form.submit();
      }, 2000);
    }

    console.log("Formulaire envoyé");
  });

  function addErrorToList(errorMessage) {
    const errorList = document.getElementById("error_list");
    const errorItem = document.createElement("li");
    errorItem.textContent = errorMessage;
    errorList.appendChild(errorItem);
  }
}

function burgerMenu() {
  const burgerIcon = document.getElementById("menuIcon");
  const overlay = document.getElementById("overlay");
  const closeIcon = document.getElementById("closeIcon");

<<<<<<< Updated upstream
  if (!burgerIcon) return;
=======
  if (!burgerIcon) return

>>>>>>> Stashed changes

  burgerIcon.addEventListener("click", function () {
    overlay.style.display = "flex";
    burgerIcon.style.display = "none";
    closeIcon.style.display = "block";
  });
  closeIcon.addEventListener("click", function () {
    overlay.style.display = "none";
    closeIcon.style.display = "none";
    burgerIcon.style.display = "block";
  });
}
function openTab() {

const tabButtons = document.querySelectorAll(".account_tab_button");
const tabContent = document.querySelectorAll(".tab_content");
tabButtons.forEach(button => {
  button.addEventListener("click", function() {
    tabButtons.forEach(btn => {
      btn.classList.remove("active");
    });
    button.classList.add("active");
    tabContent.forEach(content => {
      content.style.display = "none";
    });

<<<<<<< Updated upstream
    const tabName = button.dataset.tab;
    const tabActive = document.getElementById(tabName);
    tabActive.style.display = "block";
  });
=======
document.addEventListener("DOMContentLoaded", function () {
  burgerMenu();
  darkMode();
  Carousel();
  navTap();
  formVerification();

>>>>>>> Stashed changes
});
}

document.addEventListener("DOMContentLoaded", function () {
  navTap();
  openTab();
  burgerMenu();
  darkMode();
  formVerification();
  Carousel();
});
