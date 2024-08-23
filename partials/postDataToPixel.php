<?php
session_start();
require_once 'functions.php';

header('Content-Type: application/json');
$data = json_decode(file_get_contents("php://input"));
$state = $data->state;
if($state == "accept"){
    $friendId = $data->id;
    acceptFriendRequest($_SESSION['gebruiker_id'], $friendId);
}

if($state == "deny"){
    $friendId = $data->id;
    denyFriendRequest($_SESSION['gebruiker_id'], $friendId);
}

if($state == "addFriend"){
    $friendId = $data->friendId;
    addFriend($_SESSION['gebruiker_id'], $friendId);
}

if($state == "remove"){
    $friendId = $data->id;
    removeFriend($_SESSION['gebruiker_id'], $friendId);
}
?>