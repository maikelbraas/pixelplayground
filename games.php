<?php require_once 'partials/header.php'; ?>
<?php  
$games = [
    (object)["name" => 'blockchase', 'displayname' => 'Block chase', 'highscorecapable' => false],
    (object)["name" => 'connect', 'displayname' => 'Connect 4', 'highscorecapable' => true],
    (object)["name" => 'flappy', 'displayname' => 'Flappy', 'highscorecapable' => false],
    (object)["name" => 'galgje', 'displayname' => 'Hangman', 'highscorecapable' => true],
    (object)["name" => 'goalie', 'displayname' => 'Goalie', 'highscorecapable' => false],
    (object)["name" => 'shootball', 'displayname' => 'Shoot the balls', 'highscorecapable' => false],
    (object)["name" => 'shootThePig', 'displayname' => 'Shoot the pigs', 'highscorecapable' => true],
    (object)["name" => 'snake', 'displayname' => 'Snake', 'highscorecapable' => false],
    (object)["name" => 'spacelite', 'displayname' => 'Space lite', 'highscorecapable' => false],
    (object)["name" => 'tictactoe', 'displayname' => 'Tic Tac Toe', 'highscorecapable' => true],
    (object)["name" => 'wordle', 'displayname' => 'Wordle', 'highscorecapable' => true],
    (object)["name" => 'breakout', 'displayname' => 'Breakout', 'highscorecapable' => false]
];
?>
<main>
    <h1>All games</h1>
    <section id="games">
        <?php foreach($games as $game){ ?>
        <a href="games/<?= $game->name ?>/index.php">
            <article class="game">
                <h2><?= $game->name ?></h2>
                <img src="images/<?= $game->displayname ?>.png" alt="">
                <b>Worden scores opgeslagen: <i><?php if($game->highscorecapable) echo 'Ja'; else echo 'Nee'; ?></i></b>
            </article>
        </a>
        <?php } ?>
        
    </section>
</main>

<?php require_once 'partials/footer.php'; ?>