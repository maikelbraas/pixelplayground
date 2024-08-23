<?php require_once '../../partials/header.php'; ?>
<script src="app.js" defer></script>
<link rel="stylesheet" href="style.css">
<main id="wordle-main">
    <div id="message" class="feedback">
        <h1 id="message-text">

        </h1>
    </div>
    <section id="wordlePlayfield">
        <article class="row">
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
        </article>
        <article class="row">
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
        </article>
        <article class="row">
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
        </article>
        <article class="row">
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
        </article>
        <article class="row">
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
        </article>
        <article class="row">
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
        </article>
    </section>
    <section id="keys">
        <div>
            <p id="row1">q</p>
            <p>w</p>
            <p>e</p>
            <p>r</p>
            <p>t</p>
            <p>y</p>
            <p>u</p>
            <p>i</p>
            <p>o</p>
            <p>p</p>
        </div>
        <div>
            <p id="row2">a</p>
            <p>s</p>
            <p>d</p>
            <p>f</p>
            <p>g</p>
            <p>h</p>
            <p>j</p>
            <p>k</p>
            <p>l</p>
        </div>
        <div>
            <p id="row3">z</p>
            <p>x</p>
            <p>c</p>
            <p>v</p>
            <p>b</p>
            <p>n</p>
            <p>m</p>
        </div>
    </section>
    <article id="inputs">
        <label for="answer">Antwoord:</label>
        <input type="text" name="answer" id="answer" maxlength="5" autofocus>
        <p>click here to reset <button id="reset">Reset</button></p>
    </article>
</main>

<?php require_once '../../partials/footer.php'; ?>