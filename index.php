<?php require_once 'partials/header.php'; ?>

<main>
    <h1>Welcome!</h1>
    <section id="index-messages">
        <article class="message">
            <h2>Welcome!</h2>
            <p>Dit is een website om spelletjes te spelen met vrienden.</p>
            <p>Je kunt ook met je vrienden toernooien maken! Nodig er een paar uit!</p>
            <p>Laat zien wat je kan bij de verschillende games, word jij de uiteindelijke winaar?</p>
        </article>
        <article class="message">
            <h2>Latest Highscores</h2>
            <?php foreach(getAllHighscores() as $highscore){  ?>
                <h3><?= getGameById($highscore['game_id'])['game_name'] ?></h3>
                <?php if($highscore['gebruiker_id'] != 0){ ?>
                <p>User: <?= getUserById($highscore['gebruiker_id'])['gebruikersnaam'] ?></p>
                <?php }else{ ?>
                <p>User: Anonymous</p>
                <?php } ?>
                <p>Highscore: <?= $highscore['highscore'] ?></p>
            <?php } ?>
        </article>
    </section>
</main>

<?php require_once 'partials/footer.php'; ?>