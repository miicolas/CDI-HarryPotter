fetch("/getprofile")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    let profileContent = document.querySelector(".profile_content");

    // Créer une chaîne de caractères pour le contenu HTML
    let htmlContent = `
      <div class="profile_username">

        <h2>Profil de ${data.username}</h2>
    </div>
    <div class="profile_card_container">
        <div class="profile_card">
            <p>${data.username}</p>
        </div>
        <div class="profile_card">
        <p class="profile_card_title">Nombre de cartes</p>
        <div class="profil_card_content">
            ${data.numberCards}
        </div>
        </div>
        <div class="profile_card">
            <p class="profile_card_title">Prochain tirage</p>
            <div class="profil_card_content">
            ${data.remaningTime}
            </div>
        </div>
        </div>
        
        `;

    if (data.remaningTime !== "Tirer vos cartes") {
      htmlContent += `
        
          <div class="draw_button disabled">Tirer vos cartes</div>
        `;
    } else {
      htmlContent += `
        <a href="/draw">
          <div class="draw_button">${data.remaningTime}</div>
        </a>`;
    }

    // Fermer la balise div principale
    // htmlContent += `</div>`;

    // Ajouter le contenu HTML à profileContent une seule fois
    profileContent.innerHTML = htmlContent;
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
