<?php
  session_start();
    $conn = new mysqli('localhost', 'root', '', 'pixelplayground');
    $data = json_decode(file_get_contents("php://input"));
    $info = $data->highscore;
    $game = $data->game_id;
    if(isset($_SESSION['gebruiker_id'])){
    $id = $_SESSION['gebruiker_id'];
    $sql = "INSERT INTO highscores (gebruiker_id, game_id, highscore)
     VALUES
      ($id, $game, '$info')";
    }else{
    $sql = "INSERT INTO highscores (gebruiker_id, game_id, highscore)
    VALUES
     (0, $game, '$info')";
    }
    $conn->query($sql);
?>