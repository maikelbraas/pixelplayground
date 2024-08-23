<?php require_once '../../partials/header.php'; ?>
<script src="app.js" defer></script>
<link rel="stylesheet" href="style.css">
<main id="tictactoe-main">
    <h1 id="winner" id="winner">Winner! <br>
        click here to reset <button id="reset">Reset</button>
    </h1>
    <section id="galgjePlayfield">
        <article id="word">
        </article>
        <article id="inputs">
            <label for="answer">Antwoord:</label>
            <input type="text" name="answer" id="answer">
            <label for="letter">Letter:</label>
            <input type="text" name="letter" id="letter" maxlength="1" autofocus>
            <button type="button" id='guess'>Guess</button>
            <button type="button" id="hint">Hint</button>
        </article>
        <article id="guessedLetters">

        </article>
        <article id="error">

        </article>
        <article id="hint_location">

        </article>
    </section>
</main>

<?php require_once '../../partials/footer.php'; ?>