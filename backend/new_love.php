<?php
    error_log('Request method: ' . $_SERVER['REQUEST_METHOD']);
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    $con = new SQLite3('exercises.db');
    $here = false;
    $avatar = 'images/unknown.png';
    $id = '';
    $dop = $con -> prepare('SELECT * FROM users WHERE hash = :hash');
    $dop -> bindValue(':hash', (float)$data['hash'], SQLITE3_FLOAT);
    $records = $dop -> execute() -> fetchArray(SQLITE3_ASSOC);
    $id = $records['id'];
    $avatar = $records['avatar'];
    $friends = explode(' ', $records['friends']);
    $answer = 'yes';
    $records = $con -> query('SELECT * FROM loves');
    while($row = $records -> fetchArray(SQLITE3_ASSOC)){
        if(($row['first'] == (float)$data['hash'] || $row['second'] == (float)$data['hash']) && ($row['status'] == 'in_love_private' || $row['status'] == 'in_love_public')){
            $answer = 'in_love';
            $here = true;
        }else if(($row['first'] == (float)$data['hash'] || $row['second'] == (float)$data['hash']) && $row['status'] == 'married'){
            $answer = 'married';
            $here = true;
        }
    }
    $dop = false;
    for($i = 0; $i < count($friends); $i++){
        if($friends[$i] == $data['id']){
            $dop = true;
        }
    }
    if(!$dop){
        $here = true;
        $answer = 'not friend';
    }
    if(!$here){
        $dop = $con -> prepare('INSERT INTO chats (autor_id, giver_id, text, file, read, special, type) VALUES (:autor_id, :giver_id, :text, :file, :read, :special, :type)');
        $dop -> bindValue(':autor_id', $id, SQLITE3_TEXT);
        $dop -> bindValue(':giver_id', $data['id'], SQLITE3_TEXT);
        $dop -> bindValue(':text', 'Пользователь с ID ' . $id . ' предложил тебе встречаться. Возможно это начало чего-то большего ❤', SQLITE3_TEXT);
        $dop -> bindValue(':file', $avatar, SQLITE3_TEXT);
        $dop -> bindValue(':read', 'no', SQLITE3_TEXT);
        $dop -> bindValue(':special', 'new_love', SQLITE3_TEXT);
        $dop -> bindValue(':type', 'image', SQLITE3_TEXT);
        $dop -> execute();
    }
    echo json_encode(['answer' => $answer]);
?>