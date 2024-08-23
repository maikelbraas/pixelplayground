<?php 
session_start();
require_once 'functions.php';
// die(var_dump(getAllUsers($_SESSION['gebruiker_id'])));
if($_GET['soort'] == "requestSend"){
    $data = getAllRequestsSend($_SESSION['gebruiker_id']);
    header('Content-Type: application/json');
    echo json_encode($data);
}
if($_GET['soort'] == "allRequests"){
    $data = getAllRequests($_SESSION['gebruiker_id']);
    header('Content-Type: application/json');
    echo json_encode($data);
}

if($_GET['soort'] == "getUsers"){
    $data = getAllUsers($_SESSION['gebruiker_id']);
    header('Content-Type: application/json');
    echo json_encode($data); 
}
?>