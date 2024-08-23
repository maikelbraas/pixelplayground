<?php 
require_once 'partials/header.php'; 
?>

<main>
    <article>
        <?php
        if(isset($_POST['gebruikersnaam']))
            echo register($_POST);
        ?>
    </article>

    <form class="forms" method="post">
        <label for="gebruikersnaam">Gebruikersnaam:</label>
        <input type="text" name="gebruikersnaam" id="">
        
        <label for="wachtwoord"> Wachtwoord:</label>
        <input type="password" name="wachtwoord" id="">
        <label for="conf-wachtwoord"> Wachtwoord Conformation:</label>
        <input type="password" name="conf-wachtwoord" id="">

        <input type="submit" value="Login">
    </form>
</main>

<?php require_once 'partials/footer.php'; ?>