<?php require_once 'partials/header.php'; 
if(!isset($_SESSION['gebruiker_id']))
    header("Location: login.php");

?>

<main id="friends-page">
    <section id='highscore'>
        <form method="POST">
            <input type="search" name="friend_id" id="friend-input" autocomplete="off">
        </form>
            <div>
            <h4>Gebruikers: </h4>
                <div id="search-friends">
                </div>
            </div>
    </section>

    <section>
        <h4>Friend Requests Receive: </h4>
        <article id="friend-request"></article>
    </section>
    <section>
        <h4>Friend Requests Send: </h4>
        <article id="friend-request-send"></article>
    </section>
</main>

<template id="users-template">
    <div class="user-card">
        <p class="user-card-name"></p>
        <button class="add" id="">Add</button>
    </div>
</template>

<template id="friends-template">
    <div class="friend-card">
        <p class="friend-card-name"></p>
        <button class="add" id="">Remove</button>
    </div>
</template>

<template id="users-request-template">
    <div class="request">
        <p class="user-id" style="visibility: hidden;"></p>
        <p class="user-name">Name: </p>
        <button>Accept</button>
        <button>Deny</button>
    </div>
</template>

<?php require_once 'partials/footer.php'; ?>