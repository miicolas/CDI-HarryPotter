fetch("/getFriends")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    const friendsList = document.querySelector(".friends_container_list");

    // Boucle pour les amis en attente
    for (let i = 0; i < data.usernamefriendsPending.length; i++) {
      friendsList.innerHTML += `
        <div class="friend" data-username="${data.usernamefriendsPending[i].username}">
          <div class="friend_username">${data.usernamefriendsPending[i].username}</div>
          <div class="friend_buttons">
            <a href="/refusefriend">
              <div class="friend_button_pending">Pas ajouter</div>
            </a>
            <div class="friend_button_pending acceptButton">Accepter</div>
          </div>
        </div>
      `;
    }

    // Boucle pour les amis acceptés
    for (let i = 0; i < data.usernamefriends.length; i++) {
      friendsList.innerHTML += `
        <div class="friend" data-username="${data.usernamefriends[i].username}">
          <div class="friend_username">${data.usernamefriends[i].username}</div>
          <div class="friend_buttons">
            <a href="/deleteFriend">
              <div class="friend_button_delete">Supprimer</div>
            </a>
          </div>
        </div>
      `;
    }

    // Appel de la fonction buttonFriends après la génération des boutons
    
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
