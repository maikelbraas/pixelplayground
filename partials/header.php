<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="robots" content="index, nofollow" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="theme-color" content="#121212" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Project 4 - Pixel Playground</title>
    <link
      rel="icon"
      type="image/x-icon"
      href="/images/favicon_io/favicon.ico" />
    <link
      rel="apple-touch-icon"
      href="/images/favicon_io/apple-touch-icon.png" />
    <link rel="stylesheet" href="/css/style.css">
    <script src="/js/app.js" defer></script>
</head>
<body>
    <?php session_start(); 

require_once $_SERVER['DOCUMENT_ROOT'] . '/partials/functions.php'; ?>
    <header>
        <nav>
            <img src="/images/favicon_io/logo.webp" alt="Logo" width="50" height="50">
            <p>Welcome <?php if(isset($_SESSION['gebruikersnaam'])) echo $_SESSION['gebruikersnaam'] ?></p>
            <a href="/index.php">Home</a>
            <a href="/games.php">Games</a>
            <?php if(checkLogin()){ ?>
            <article>
                <a href="/profile.php">Profile</a> /
                <a href="/highscores.php">Highscores</a> /
                <a href="/friends.php">Friends</a>
            </article>
            <?php } ?>
            <?php if(!checkLogin()){ ?>
            <article>
                <a href="/login.php">Login</a> /
                <a href="/register.php">Register</a>
            </article>
            <?php }else{ ?>
                <a href="/partials/logout.php">Logout</a>
            <?php } ?>
        </nav>
    </header>