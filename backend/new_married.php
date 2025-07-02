<?php
    error_log('Request method: ' . $_SERVER['REQUEST_METHOD']);
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    $con = new SQLite3('exercises.db');
    $id = '';
    $avatar = '';
    $dop = $con -> prepare('SELECT * FROM users WHERE hash = :hash');
    $dop -> bindValue(':hash', (float)$data['hash'], SQLITE3_FLOAT);
    $records = $dop -> execute() -> fetchArray(SQLITE3_ASSOC);
    $id = $records['id'];
    $avatar = $records['avatar'];
    $dop = $con -> prepare('INSERT INTO chats (autor_id, giver_id, text, file, read, special, type) VALUES (:autor_id, :giver_id, :text, :file, :read, :special, :type)'); 
    $dop -> bindValue(':autor_id', $id, SQLITE3_TEXT);
    $dop -> bindValue(':giver_id', $data['id'], SQLITE3_TEXT);
    $dop -> bindValue(':text', 'Пользователь ' . $id . ' сделал тебе предложение 💍 Это очень ответственное решение!', SQLITE3_TEXT);
    $dop -> bindValue(':file', $avatar, SQLITE3_TEXT);
    $dop -> bindValue(':read', 'no', SQLITE3_TEXT);
    $dop -> bindValue(':special', 'married', SQLITE3_TEXT);
    $dop -> bindValue(':type', 'image', SQLITE3_TEXT);
    $dop -> execute();
    echo json_encode(['answer' => 'yes']);
?>