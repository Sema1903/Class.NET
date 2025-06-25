<?php
    error_log('Request method: ' . $_SERVER['REQUEST_METHOD']);
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    $con = new SQLite3('exercises.db');
    $id = '';
    $avatar = '';
    $your_hash = 0.0;
    $answer = 'yes';
    $dop = $con -> prepare('SELECT * FROM users WHERE hash = :hash');
    $dop -> bindValue(':hash', (float)$data['hash'], SQLITE3_FLOAT);
    $records = $dop -> execute() -> fetchArray(SQLITE3_ASSOC);
    $id = $records['id'];
    $avatar = $records['avatar'];
    $dop = $con -> prepare('SELECT * FROM users WHERE id = :id');
    $dop -> bindValue(':id', $data['id'], SQLITE3_TEXT);
    $records = $dop -> execute() -> fetchArray(SQLITE3_ASSOC);
    $your_hash = $records['hash'];
    $records = $con -> query('SELECT * FROM loves');
    while($row = $records -> fetchArray(SQLITE3_ASSOC)){
        if($row['first'] == $your_hash || $row['second'] == $your_hash){
            $answer = 'his_misstake';
        }else if($row['first'] == (float)$data['hash'] || $row['second'] == (float)$data['hash']){
            $answer = 'your_misstake';
        }
    }
    if($answer == 'yes'){
        $dop = $con -> prepare('INSERT INTO loves (first, second, status) VALUES (:first, :second, :status)');
        $dop -> bindValue(':first', $your_hash, SQLITE3_FLOAT);
        $dop -> bindValue(':second', (float)$data['hash'], SQLITE3_FLOAT);
        $dop -> bindValue(':status', 'in_love_private', SQLITE3_TEXT);
        $dop -> execute();
        $dop = $con -> prepare('INSERT INTO chats (autor_id, giver_id, text, file, read, special, type) VALUES (:autor_id, :giver_id, :text, :file, :read, :special, :type)');
        $dop -> bindValue(':autor_id', 'Sophie', SQLITE3_TEXT);
        $dop -> bindValue(':giver_id', $data['id'], SQLITE3_TEXT);
        $dop -> bindValue(':text', 'Поздравляем 🎉 Теперь ты состоишь в отношениях с пользователем ' . $id . ' ❤', SQLITE3_TEXT);
        $dop -> bindValue(':file', $avatar, SQLITE3_TEXT);
        $dop -> bindValue(':read', 'no', SQLITE3_TEXT);
        $dop -> bindValue(':special', 'no', SQLITE3_TEXT);
        $dop -> bindValue(':type', 'image', SQLITE3_TEXT);
        $dop -> execute();
    }
    echo json_encode(['answer' => $answer])
?>