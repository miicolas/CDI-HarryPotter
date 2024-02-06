document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("defaultOpen").click();
  formVerification();
});

function openTab(e, tabName) {
  let i = 0;
  const tabcontent = document.getElementsByClassName("tab_content");
  const tabbutton = document.getElementsByClassName("account_tab_button");

  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  for (i = 0; i < tabbutton.length; i++) {
    tabbutton[i].classList.remove("active");
  }

  document.getElementById(tabName).style.display = "block";
  e.currentTarget.classList.add("active");
}

function formVerification() {
  const form = document.getElementById("signup_form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let email = document.querySelector("#email_signup");
    let password = document.querySelector("#password_signup");
    let confirmPassword = document.querySelector("#confirmPassword");

    const errorList = document.getElementById("error_list");
    errorList.innerHTML = ""; // Clear any previous errors

    if (email.value === "" || email.value.indexOf("@") === -1) {
      addErrorToList("L'adresse email n'est pas valide");
    }

    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-+_!@#$%^&*.,?]).{8,}$/;

    if (password.value.length < 8 || regexPassword.test(password.value) === false) {
      addErrorToList("Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial");
    }

    if (password.value !== confirmPassword.value || confirmPassword.value === "") {
      addErrorToList("Les mots de passe ne correspondent pas");
    }

    if (errorList.children.length > 0) {
      // If there are errors, display them and prevent form submission
      const errorMessage = document.querySelector(".error_form");
      errorMessage.style.display = "block";
    } else {
      // If no errors, submit the form
      const successMessage = document.querySelector(".success_form");
      successMessage.style.display = "block";
      setTimeout(() => {
        form.submit();
      }, 3000);
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

