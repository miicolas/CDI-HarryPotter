document.getElementById("defaultOpen").click();

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
  console.log (form);
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    const errorMessage = document.querySelector(".error_form");
    console.log(errorMessage);

    const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    if (password.length < 8 || !regexPassword.test(password)) {
      errorMessage.style.display = "block";
      console.log("Mot de passe invalide");
    }
    else {
      // Envoi du formulaire
      form.submit();
      console.log("Formulaire envoyé");
    }

  });
}

document.addEventListener("DOMContentLoaded", function () {
  formVerification();

});


