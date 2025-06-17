<?php
    error_log('Request method: ' . $_SERVER['REQUEST_METHOD']);
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    $con = new SQLite3('exercises.db');
    $here = false;
    $my_id = '';
    $hash = 0.0;
    $file = '';
    $records = $con -> query('SELECT * FROM users');
    while($row = $records -> fetchArray(SQLITE3_ASSOC)){
        if($row['id'] == $data['adress']){
            $hash = $row['hash'];
            $here = true;
        }
    }
    if($here){
        $dop = $con -> prepare('SELECT * FROM users WHERE hash = :hash');
        $dop -> bindValue(':hash', (float)$data['hash'], SQLITE3_FLOAT);
        $records = $dop -> execute() -> fetchArray(SQLITE3_ASSOC);
        $my_id = $records['id'];
        $dop = $con -> prepare('UPDATE nfts SET owner = :owner WHERE token = :token');
        $dop -> bindValue(':owner', $hash, SQLITE3_FLOAT);
        $dop -> bindValue(':token', (float)$data['token'], SQLITE3_FLOAT);
        $dop -> execute();
        $dop = $con -> prepare('SELECT * FROM nfts WHERE token = :token');
        $dop -> bindValue(':token', (float)$data['token'], SQLITE3_FLOAT);
        $records = $dop -> execute() -> fetchArray(SQLITE3_ASSOC);
        $file = $records['nft'];
        $dop = $con -> prepare('INSERT INTO chats (autor_id, giver_id, text, file, read, special, type) VALUES (:autor_id, :giver_id, :text, :file, :read, :special, :type)');
        $dop -> bindValue(':autor_id', 'Sophie', SQLITE3_TEXT);
        $dop -> bindValue(':giver_id', $data['adress'], SQLITE3_TEXT);
        $dop -> bindValue(':text', 'Пользователь ' . $my_id . ' подарил тебе подарок', SQLITE3_TEXT);
        $dop -> bindValue(':file', $file, SQLITE3_TEXT);
        $dop -> bindValue(':read', 'no', SQLITE3_TEXT);
        $dop -> bindValue(':special', 'nft', SQLITE3_TEXT);
        $dop -> bindValue(':type', 'image', SQLITE3_TEXT);
        $dop -> execute();
        echo json_encode(['answer' => 'yes']);
    }else{
        echo json_encode(['answer' => 'no']);
    }
?>