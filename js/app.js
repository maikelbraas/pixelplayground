

if (document.location.href.includes('profile')) {
    let ownFriendsContainer = document.getElementById('own-friends-container')

    ownFriendsContainer.addEventListener('click', (event) => {
        if (event.target.tagName == "BUTTON") {
            let ding = event.target.previousSibling.data.slice(0, event.target.previousSibling.data.length - 1);
            if (prompt(`Weet je zeker dat je "${ding}" wilt verwijderen?`) == ding)
                removeFriend(event.target.id);
        }
    })

    function removeFriend(target) {
        let friendInvite = { id: target, state: "remove" };
        fetch('/partials/postDataToPixel.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(friendInvite)
        })
            .then(response => {
                response.text();
                location.reload();
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
}

if (document.location.href.includes('friends')) {
    let vriendInput = document.getElementById('friend-input');
    let userTemplate = document.getElementById('users-template');
    vriendInput.addEventListener('input', searchFriend);
    let data;

    let friendsContainer = document.getElementById('search-friends');
    let requestsContainer = document.getElementById('friend-request');

    window.addEventListener('load', () => {
        getFriendRequestData();
        getUserData();
        getFriendRequestsSend();
    });

    friendsContainer.addEventListener('click', (event) => {
        if (event.target.tagName == "BUTTON") {
            event.preventDefault();
            addFriend(event.target.id);
        }
    })

    requestsContainer.addEventListener('click', (event) => {
        if (event.target.tagName == "BUTTON") {
            event.preventDefault();
            if (event.target.innerHTML == "Accept")
                acceptRequest(parseInt(event.target.closest('.request').querySelector('.user-id').innerHTML));
            if (event.target.innerHTML == "Deny") {
                if (confirm("Are you sure you want to deny the request?"))
                    denyRequest(parseInt(event.target.closest('.request').querySelector('.user-id').innerHTML));
            }
        }
    })


    function searchFriend(event) {
        event.preventDefault();
        document.getElementById('search-friends').innerHTML = "";
        data = getUserData();
        data = JSON.parse(localStorage.getItem('users'));

        for (let user of data) {
            if (user.gebruikersnaam.includes(event.target.value) && event.target.value != "") {
                document.getElementById('search-friends').appendChild(createCard(user));
            }
        }
    }

    function createCard(userInfo) {
        let card = userTemplate.content.cloneNode(true);
        card.querySelector('.user-card-name').innerHTML = userInfo.gebruikersnaam;
        card.querySelector('.add').id = userInfo.id;
        return card;
    }

    function createRequestCard(userInfo) {
        let card = document.getElementById('users-request-template').content.cloneNode(true);
        card.querySelector('.user-name').innerHTML += userInfo.user;
        card.querySelector('.user-id').innerHTML = userInfo.id;
        return card;
    }

    function showFriendRequests(data) {
        document.getElementById('friend-request').innerHTML = "";
        for (let request of data) {
            document.getElementById('friend-request').appendChild(createRequestCard(request));
        }
    }

    function showFriendRequestsSend(data) {
        document.getElementById('friend-request-send').innerHTML = "";
        for (let request of data) {
            document.getElementById('friend-request-send').innerHTML += request.gebruikersnaam + "<br>";
        }
    }

    function getFriendRequestData() {
        fetch("/partials/getDataFromPixel.php?soort=allRequests", { cache: 'no-cache' })
            .then((response) => {
                if (!response.ok) { // Before parsing (i.e. decoding) the JSON data,
                    // check for any errors.
                    // In case of an error, throw.
                    throw new Error("Something went wrong!");
                }

                return response.json(); // Parse the JSON data.
            })
            .then((data) => {
                // This is where you handle what to do with the response.
                showFriendRequests(data);
            })

    }

    function getUserData() {
        fetch("/partials/getDataFromPixel.php?soort=getUsers", { cache: 'no-cache' })
            .then((response) => {
                if (!response.ok) { // Before parsing (i.e. decoding) the JSON data,
                    // check for any errors.
                    // In case of an error, throw.
                    throw new Error("Something went wrong!");
                }

                return response.json(); // Parse the JSON data.
            })
            .then((data) => {
                // This is where you handle what to do with the response.
                localStorage.setItem("users", JSON.stringify(data)); // Will alert: 42
            })
    }

    function getFriendRequestsSend() {
        fetch("/partials/getDataFromPixel.php?soort=requestSend", { cache: 'no-cache' })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Something went wrong!");
                }
                return response.json(); // Parse the JSON data.
            })
            .then((data) => {
                // This is where you handle what to do with the response.
                showFriendRequestsSend(data);
            })
    }

    function addFriend(friend) {
        let friendInvite = { state: "addFriend", friendId: parseInt(friend) };
        fetch('/partials/postDataToPixel.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(friendInvite)
        })
            .then(response => response.text())
            .then(() => {
                vriendInput.value = "";
                document.getElementById('search-friends').innerHTML = "";
                getUserData();
                getFriendRequestsSend();
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    function acceptRequest(target) {
        let friendInvite = { id: target, state: "accept" };
        fetch('/partials/postDataToPixel.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(friendInvite)
        })
            .then(response => response.text())
            .then(() => {
                location.reload();
            })
            .catch(error => {
                console.error('Error:', error);
            });

    }

    function denyRequest(target) {
        let friendInvite = { id: target, state: "deny" };
        fetch('/partials/postDataToPixel.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(friendInvite)
        })
            .then(response => response.text())
            .then(() => {
                location.reload();
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

}