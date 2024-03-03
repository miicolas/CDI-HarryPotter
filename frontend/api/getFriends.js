function fetchFriends() {
  return fetch("/getFriends")
  .then((response) => response.json());
}

async function displayFriends() {
  const data = await fetchFriends();
  const friendsListPending = document.querySelector(".friends_request_content");
  const friendsList = document.querySelector(".friends_accepted_content");

  for (let i = 0; i < data.usernamefriendsPending.length; i++) {
    friendsListPending.innerHTML += `
      <div class="friend" data-username="${data.usernamefriendsPending[i].username}">
        <div class="friend_username">${data.usernamefriendsPending[i].username}</div>
        <div class="friend_buttons">
          <div class="card_button_readmore deleteButton">Décliner</div>
          <div class="card_button_readmore acceptButton">Accepter</div>
        </div>
      </div>
    `;
  }

  for (let i = 0; i < data.usernamefriends.length; i++) {
    friendsList.innerHTML += `
      <div class="friend" data-username="${data.usernamefriends[i].username}">
        <div class="friend_username">${data.usernamefriends[i].username}</div>
        <div class="friend_buttons">
            <div class="card_button_readmore deleteButton">Supprimer</div>
        </div>
      </div>
    `;
  }
}

displayFriends();