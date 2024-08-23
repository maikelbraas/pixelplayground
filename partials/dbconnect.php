<?php

function connect(){
    $conn = new mysqli('localhost', 'root', '', 'pixelplayground');
    return $conn;
}
?>