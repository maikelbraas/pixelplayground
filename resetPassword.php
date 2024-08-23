<?php 
require_once 'partials/header.php'; 
?>

<main>
    <article>
        <?php
            if(isset($_POST['check_user'])){
                $result = gettype($error = getUserByUsername($_POST['gebruikersnaam']));
                if($result == "string")
                    echo $error;
                else
                    $_SESSION['user'] = $error;

            }else if(isset($_POST['check_answer'])){
                $_SESSION['antwoord'] = checkAnswer($_SESSION['user']['antwoord_geheime_vraag'], $_POST['secret_answer']);
            }else if(isset($_POST['change_pass'])){
                echo changePassword($_SESSION['user']['id'], $_POST, 'login.php');
                resetSession();
            }else if(isset($_POST['reset'])){
                resetSession();
            }
        ?>
    </article>
    <?php if(!isset($_SESSION['user']) && !isset($_SESSION['antwoord'])){ ?>
    <form class="forms" method="post" id="user-vraag">
        <label for="gebruikersnaam">Gebruikersnaam:</label>
        <input type="text" name="gebruikersnaam" id="">
        <input type="submit" value="check user" name="check_user">
    </form>
    <?php }else if(isset($_SESSION['antwoord']) && $_SESSION['antwoord']){ ?>
    <form class="forms" method="post" id="vraag-verander-wachtwoord">
        <label for="secret_question">Wachtwoord</label>
        <input type="password" name="password">
        <label for="secret_answer">Wachtwoord conformatie</label>
        <input type="password" name="passwordConf">
        <input type="submit" value="Verander wachtwoord" name="change_pass">
    </form>
    <?php }else if(isset($_SESSION['user'])){ ?>
    <form class="forms" method="post" id="vraag-antwoord">
        <label for="secret_question">Geheime vraag</label>
        <p id="geheime_vraag">De vraag is: <?= $_SESSION['user']['geheime_vraag']; ?></p>
        <label for="secret_answer">Geheime vraag antwoord</label>
        <input type="text" name="secret_answer">
        <input type="submit" value="Antwoord" name="check_answer">
    </form>
    <?php } ?>
    <form method="post">
        <button name="reset">reset</button>
    </form>
    
</main>

<?php require_once 'partials/footer.php'; ?>