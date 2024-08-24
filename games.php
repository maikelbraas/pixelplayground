<?php require_once 'partials/header.php'; ?>
<?php  
$games = [
    (object)["name" => 'blockchase', 'highscorecapable' => false],
    (object)["name" => 'connect', 'highscorecapable' => true],
    (object)["name" => 'flappy', 'highscorecapable' => false],
    (object)["name" => 'galgje', 'highscorecapable' => true],
    (object)["name" => 'goalie', 'highscorecapable' => false],
    (object)["name" => 'shootball', 'highscorecapable' => false],
    (object)["name" => 'shootThePig', 'highscorecapable' => true],
    (object)["name" => 'snake', 'highscorecapable' => false],
    (object)["name" => 'spacelite', 'highscorecapable' => false],
    (object)["name" => 'tictactoe', 'highscorecapable' => true],
    (object)["name" => 'wordle', 'highscorecapable' => true],
    (object)["name" => 'breakout', 'highscorecapable' => false]
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
                <p>Highscore aan? <?php if($game->highscorecapable) echo 'Ja'; else echo 'Nee'; ?></p>
            </article>
        </a>
        <?php } ?>
        
    </section>
</main>

<?php require_once 'partials/footer.php'; ?>