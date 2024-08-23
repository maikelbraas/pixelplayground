<?php 
require_once 'partials/header.php'; 
?>

<main>
    <article>
        <?php
            if(isset($_POST['gebruikersnaam']))
                echo login($_POST);
        ?>
    </article>
    <form class="forms" method="post">
        <label for="gebruikersnaam">Gebruikersnaam:</label>
        <input type="text" name="gebruikersnaam" id="">
        
        <label for="wachtwoord"> Wachtwoord:</label>
        <input type="password" name="wachtwoord" id="">

        <input type="submit" value="Login">
    </form>
    <article>
        <a href="resetPassword.php">Forget password?</a>
    </article>
</main>

<?php require_once 'partials/footer.php'; ?>