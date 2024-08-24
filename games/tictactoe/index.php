<?php require_once '../../partials/header.php'; ?>
<script src="appClick.js" defer></script>
<link rel="stylesheet" href="style.css">
<main id="tictactoe-main">
    <h1 id="winner" id="winner"></h1>
    <section class="elements" id="o">
        <div class="element o" draggable="true">O</div>
        <div class="element o" draggable="true">O</div>
        <div class="element o" draggable="true">O</div>
        <div class="element o" draggable="true">O</div>
        <div class="element o" draggable="true">O</div>
        <div class="element o" draggable="true">O</div>
    </section>
    <section id="gamefield" id= "gamefield">
        <div class="space" id="1"></div>
        <div class="space" id="2"></div>
        <div class="space" id="3"></div>
        <div class="space" id="4"></div>
        <div class="space" id="5"></div>
        <div class="space" id="6"></div>
        <div class="space" id="7"></div>
        <div class="space" id="8"></div>
        <div class="space" id="9"></div>
    </section>
    <section class="elements" id="x">
        <div class="element x" draggable="true">X</div>
        <div class="element x" draggable="true">X</div>
        <div class="element x" draggable="true">X</div>
        <div class="element x" draggable="true">X</div>
        <div class="element x" draggable="true">X</div>
        <div class="element x" draggable="true">X</div>
    </section>
</main>

<?php require_once '../../partials/footer.php'; ?>