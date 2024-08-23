<?php

require_once 'dbconnect.php';

function login($data){
    $username = clearString($data['gebruikersnaam']);
    $password = clearString($data['wachtwoord']);
    $sql = "SELECT * FROM gebruikers WHERE gebruikersnaam = '$username' AND wachtwoord = '$password'";
    $result = connect()->query($sql);
    if($result->num_rows == 1){
        $user = $result->fetch_array(MYSQLI_BOTH);
        $_SESSION['gebruiker_id'] = $user['id'];
        $_SESSION['gebruikersnaam'] = $user['gebruikersnaam'];
        header("Location: profile.php");
    }else{
        return "Er ging iets mis met het inloggen.";
    }
}

function register($data){
    try{
        $username = clearString($data['gebruikersnaam']);
        $password = clearString($data['wachtwoord']);
        $passwordConf = clearString($data['conf-wachtwoord']);
        if($password != $passwordConf){
            return "wachtwoorden komen niet overeen.";
        }
        $sql = "INSERT INTO gebruikers (gebruikersnaam, wachtwoord) VALUES ('$username', '$password')";
        $result = connect()->query($sql);
        if($result){
            $user = getUserByUsername($username);
            $_SESSION['gebruiker_id'] = $user['id'];
            $_SESSION['gebruikersnaam'] = $user['gebruikersnaam'];
            header("Location: profile.php");
        }else{
            return "Er ging iets mis het maken van het account.";
        }
    }catch(Exception $e){
        return "Account already exists";
    }
}

function getUserByUsername($username){
    $sql = "SELECT id, gebruikersnaam, geheime_vraag, antwoord_geheime_vraag FROM gebruikers WHERE gebruikersnaam = '$username'";
    $result = connect()->query($sql);
    if($result->num_rows >= 1)
        return $result->fetch_array(MYSQLI_BOTH);
    else
        return "Gebruiker was niet gevonden.";
}

function getUserById($user_id){
    $sql = "SELECT id, gebruikersnaam FROM gebruikers WHERE id = '$user_id'";
    $result = connect()->query($sql);
    return $result->fetch_array(MYSQLI_BOTH);
}

function getGameById($game_id){
    $sql = "SELECT * FROM games WHERE id = '$game_id'";
    $result = connect()->query($sql);
    return $result->fetch_array(MYSQLI_BOTH);

}

function clearString($string){
    return mysqli_real_escape_string(connect(), $string);
}

function checkLogin(){
    if(isset($_SESSION['gebruiker_id']))
        return true;
    return false;
}

function logout(){
    session_start();
    $_SESSION = null;
    session_destroy();
    header("Location: ../index.php");
}

function getAllHighscores(){
    $sql = "SELECT * FROM highscores ORDER BY timestamp DESC LIMIT 5";
    $result = connect()->query($sql);
    return $result->fetch_all(MYSQLI_BOTH);
}

function getAllHighscoresFromUser($id){
    $sql = "SELECT * FROM highscores WHERE gebruiker_id = '$id' ORDER BY highscore DESC LIMIT 5";
    try{
        $result = connect()->query($sql);
        return $result->fetch_all(MYSQLI_BOTH);
    }catch(Exception $e){
        return "No highscores found";
    }
}

function getGameHighscoresOfUser($game_id, $user_id){
    $sql = "SELECT * FROM highscores WHERE game_id = $game_id AND gebruiker_id = $user_id ORDER BY highscore DESC LIMIT 5";
    $result = connect()->query($sql);
    return $result->fetch_all(MYSQLI_BOTH);
}

function getUserHighscores($user_id){
    $sql = "SELECT * FROM highscores WHERE gebruiker_id = '$user_id'";
    $result = connect()->query($sql);
    return $result->fetch_array(MYSQLI_BOTH);
}

function addFriend($user, $vriend){
    $sql = "INSERT INTO vrienden (gebruiker_id, vriend_id) VALUES ('$user', '$vriend')";
    $result = connect()->query($sql);
    return true;
}

function getAllUsers($id){
    $sql = "SELECT id, gebruikersnaam
    FROM gebruikers
    WHERE id NOT IN (
        SELECT vriend_id FROM vrienden WHERE gebruiker_id = $id
        UNION
        SELECT gebruiker_id FROM vrienden WHERE vriend_id = $id
    )
    AND id != $id;";
    $result = connect()->query($sql);
    return $result->fetch_all(MYSQLI_BOTH);
}

function getAllRequestsSend($id){
    $sql = "SELECT id, gebruikersnaam
    FROM gebruikers
    WHERE id IN (
        SELECT vriend_id FROM vrienden WHERE gebruiker_id = $id

    AND actief = 0
    )
    AND id != '$id';";
    $result = connect()->query($sql);
    return $result->fetch_all(MYSQLI_BOTH);
}

function getAllFriends($id){
    $sql = "SELECT id, gebruikersnaam
    FROM gebruikers
    WHERE id IN (
        SELECT vriend_id FROM vrienden WHERE gebruiker_id = $id

    AND actief = 1
        UNION
        SELECT gebruiker_id FROM vrienden WHERE vriend_id = $id

        AND actief = 1
    )
    AND id != '$id';";
    $result = connect()->query($sql);
    return $result->fetch_all(MYSQLI_BOTH);
}

function getAllRequests($id){
    $sql = "SELECT id, gebruikersnaam as user, vriend_id, gebruiker_id
    FROM vrienden JOIN gebruikers ON gebruiker_id = id WHERE actief = 0 AND vriend_id = '$id'";
    $result = connect()->query($sql);
    return $result->fetch_all(MYSQLI_BOTH);
}

function acceptFriendRequest($user, $vriend){
    $sql = "UPDATE vrienden SET actief = 1 WHERE gebruiker_id = $vriend AND vriend_id = $user";
    connect()->query($sql);
    return true;
}

function denyFriendRequest($user, $vriend){
    $sql = "DELETE FROM vrienden WHERE gebruiker_id = $vriend AND vriend_id = $user";
    connect()->query($sql);
    return true;
}

function removeFriend($user, $vriend){
    $sql = "DELETE FROM vrienden WHERE (gebruiker_id = $vriend AND vriend_id = $user) OR (vriend_id = $vriend AND gebruiker_id = $user)";
    connect()->query($sql);
    return true;
}

function checkAnswer($userAnswer, $fillAnswer){
    if(strtoupper($userAnswer) == strtoupper($fillAnswer))
        return true;
    return false;
}


function changePassword($id, $data, $return){
    $password = $data['password'];
    $passwordConf = $data['passwordConf'];
    if($password != $passwordConf)
        return "Wachtwoorden komen niet overeen.";
    $sql = "UPDATE gebruikers SET wachtwoord = '$password' WHERE id = '$id'";
    connect()->query($sql);
    if($return != "")
    header("Location: $return");
    else
    return "Password changed";
}

function resetSession(){
    $_SESSION = null;
    session_destroy();
}

function changeUsername($username){
    $oldUsername = $_SESSION['gebruikersnaam'];
    $sql = "UPDATE gebruikers SET gebruikersnaam = '$username' WHERE gebruikersnaam = '$oldUsername'";
    connect()->query($sql);
    $_SESSION['gebruikersnaam'] = $username;
    header("Location: profile.php");
}



?>