<?php require_once 'partials/header.php'; 
if(!isset($_SESSION['gebruiker_id']))
    header("Location: login.php");
$games = [
    getGameHighscoresOfUser(1, $_SESSION['gebruiker_id']),
    getGameHighscoresOfUser(2, $_SESSION['gebruiker_id']),
    getGameHighscoresOfUser(3, $_SESSION['gebruiker_id']),
    getGameHighscoresOfUser(4, $_SESSION['gebruiker_id'])
];
?>

<main>
    <section id='highscore'>
    <h1>Highscores:</h1>
        <?php
        foreach($games as $highscores){
            if(isset($highscores[0]['game_id'])){ ?>
                <article class="placement">
                <?php echo "<h2>" . getGameById($highscores[0]['game_id'])['game_name'] . "</h2>";
            }
            foreach($highscores as $key => $gameInfo){
                if($gameInfo['gebruiker_id'] == $_SESSION['gebruiker_id']){ ?>
                    <article>
                        <p>Place: <?= $key+1; ?></p>
                        <p>User: <?= getUserById($gameInfo['gebruiker_id'])['gebruikersnaam']; ?></p>
                        <p>Highscore: <?= $gameInfo['highscore']; ?></p>
                    </article>
        <?php   }
            } ?>
            </article>
    <?php } ?>
    </section>
</main>

<?php require_once 'partials/footer.php'; ?>