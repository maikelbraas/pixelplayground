<?php require_once 'partials/header.php'; ?>
<?php  
$games = [
    (object)["name" => 'blockchase'],
    (object)["name" => 'connect'],
    (object)["name" => 'flappy'],
    (object)["name" => 'galgje'],
    (object)["name" => 'goalie'],
    (object)["name" => 'shootball'],
    (object)["name" => 'shootThePig'],
    (object)["name" => 'snake'],
    (object)["name" => 'spacelite'],
    (object)["name" => 'tictactoe'],
    (object)["name" => 'wordle'],
    (object)["name" => 'breakout']
];
?>
<main>
    <h1>All games</h1>
    <section id="games">
        <?php foreach($games as $game){ ?>
        <a href="games/<?= $game->name ?>/index.php">
            <article class="game">
                <h2><?= $game->name ?></h2>
                <img src="images/<?= $game->name ?>.png" alt="">
            </article>
        </a>
        <?php } ?>
        
    </section>
</main>

<?php require_once 'partials/footer.php'; ?>