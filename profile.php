<?php require_once 'partials/header.php'; 
if(!isset($_SESSION['gebruiker_id']))
    header("Location: login.php");

$user = getUserById($_SESSION['gebruiker_id']);
$games = [
    getGameHighscoresOfUser(1, $_SESSION['gebruiker_id']),
    getGameHighscoresOfUser(2, $_SESSION['gebruiker_id']),
    getGameHighscoresOfUser(3, $_SESSION['gebruiker_id']),
    getGameHighscoresOfUser(4, $_SESSION['gebruiker_id'])
];

if(isset($_POST['change_username'])){
    changeUsername($_POST['new-username']);
}
if(isset($_POST['change_password'])){
    echo changePassword($_SESSION['gebruiker_id'], $_POST, '');
}
?>

<main id="profile-page">
    <section>
        <h3>Profile data:</h3>
        <p>Username: <?= $user['gebruikersnaam'];  ?></p>
    </section>
    <section id="own-friends-container">
        <h3>Friends:</h3>
        <?php foreach(getAllFriends($_SESSION['gebruiker_id']) as $friend){ ?>
            <p><?= $friend['gebruikersnaam'] ?> <button id="<?= $friend['id'] ?>">Remove</button></p>
        <?php } ?>
    </section>
    <section>
        <h3>Change password:</h3>
        <form method="post">
            <label for="password">New password:</label><br>
            <input type="password" name="password" autocomplete="off"><br>
            <label for="conf-password">Confirm new password:</label><br>
            <input type="password" name="passwordConf" autocomplete="off" style="margin-bottom: 20px;">
            <input type="submit" value="Change" name="change_password">
        </form>
    </section>
    <section>
        <h3>Change username:</h3>
        <form method="post">
            <label for="new-username">New username: </label><br>
            <input type="text" name="new-username" value="<?= $user['gebruikersnaam']; ?>" autocomplete="off">
            <input type="submit" value="Change" name="change_username">
        </form>
    </section>
</main>

<?php require_once 'partials/footer.php'; ?>