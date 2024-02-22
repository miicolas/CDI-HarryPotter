fetch("/getFriends")
  .then((response) => response.json())
  .then((data) => {
    const friendsListPending = document.querySelector(
      ".friends_request_container"
    );
    const friendsList = document.querySelector(".friends_accepted_container");

    // Boucle pour les amis en attente
    for (let i = 0; i < data.usernamefriendsPending.length; i++) {
      friendsListPending.innerHTML += `
        <div class="friend" data-username="${data.usernamefriendsPending[i].username}">
          <div class="friend_username">${data.usernamefriendsPending[i].username}</div>
          <div class="friend_buttons">
            <div class="friend_button deleteButton">Décliner</div>
            <div class="friend_button acceptButton">Accepter</div>
          </div>
        </div>
      `;
    }

    for (let i = 0; i < data.usernamefriends.length; i++) {
      friendsList.innerHTML += `
        <div class="friend" data-username="${data.usernamefriends[i].username}">
          <div class="friend_username">${data.usernamefriends[i].username}</div>
          <div class="friend_buttons">
              <div class="friend_button deleteButton">Supprimer</div>

          </div>
        </div>
      `;
    }
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
