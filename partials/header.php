<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Project 4 - Pixel Playground</title>
    <link rel="stylesheet" href="/p4project-Pixelplayground/css/style.css">
    <script src="/p4project-Pixelplayground/js/app.js" defer></script>
</head>
<body>
    <?php session_start(); 

require_once $_SERVER['DOCUMENT_ROOT'] . '/p4project-pixelplayground/partials/functions.php'; ?>
    <header>
        <nav>
            <p>Welcome <?php if(isset($_SESSION['gebruikersnaam'])) echo $_SESSION['gebruikersnaam'] ?></p>
            <a href="/p4project-pixelplayground/index.php">Home</a>
            <a href="/p4project-pixelplayground/games.php">Games</a>
            <?php if(checkLogin()){ ?>
            <article>
                <a href="/p4project-pixelplayground/profile.php">Profile</a> /
                <a href="/p4project-pixelplayground/highscores.php">Highscores</a> /
                <a href="/p4project-pixelplayground/friends.php">Friends</a>
            </article>
            <?php } ?>
            <?php if(!checkLogin()){ ?>
            <article>
                <a href="/p4project-pixelplayground/login.php">Login</a> /
                <a href="/p4project-pixelplayground/register.php">Register</a>
            </article>
            <?php }else{ ?>
                <a href="/p4project-pixelplayground/partials/logout.php">Logout</a>
            <?php } ?>
        </nav>
    </header>