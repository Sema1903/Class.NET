<?php
    error_log('Request method: ' . $_SERVER['REQUEST_METHOD']);
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    $con = new SQLite3('exercises.db');
    if($data['name'] != ''){
        $dop = $con -> prepare('UPDATE users SET name = :name WHERE hash = :hash');
        $dop -> bindValue(':name', $data['name'] , SQLITE3_TEXT);
        $dop -> bindValue(':hash', (float)$data['hash'], SQLITE3_FLOAT);
        $dop -> execute();
    }
    if($data['avatar'] != ''){
        $dop = $con -> prepare('UPDATE users SET avatar = :avatar WHERE hash = :hash');
        $dop -> bindValue(':avatar', $data['avatar'] , SQLITE3_TEXT);
        $dop -> bindValue(':hash', (float)$data['hash'], SQLITE3_FLOAT);
        $dop -> execute();
    }
    if($data['about'] != ''){
        $dop = $con -> prepare('UPDATE users SET about = :about WHERE hash = :hash');
        $dop -> bindValue(':about', $data['about'] , SQLITE3_TEXT);
        $dop -> bindValue(':hash', (float)$data['hash'], SQLITE3_FLOAT);
        $dop -> execute();
    }
    echo json_encode(['answer' => 'yes']);
?>