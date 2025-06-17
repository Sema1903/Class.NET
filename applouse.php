<?php
    error_log('Request method: ' . $_SERVER['REQUEST_METHOD']);
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    $con = new SQLite3('exercises.db');
    $hash = 0;
    $id = '';
    $apps = [];
    $avatar = '';
    $dop = $con -> prepare('SELECT * FROM users WHERE id = :id');
    $dop -> bindValue(':id', $data['id'], SQLITE3_TEXT);
    $records = $dop -> execute() -> fetchArray(SQLITE3_ASSOC);
    $hash = $records['hash'];
    $dop = $con -> prepare('SELECT * FROM balances WHERE hash = :hash');
    $dop -> bindValue(':hash', $hash, SQLITE3_FLOAT);
    $records = $dop -> execute() -> fetchArray(SQLITE3_ASSOC);
    $apps = explode(' ', $records['balance']);
    if(!in_array($data['hash'], $apps)){
        $result = '';
        for($i = 0; $i < count($apps); $i++){
            $result .= $apps[$i] . ' ';
        }
        $result .= $data['hash'];
        $dop = $con -> prepare('UPDATE balances SET balance = :balance WHERE hash = :hash');
        $dop -> bindValue(':balance', $result, SQLITE3_TEXT);
        $dop -> bindValue(':hash', $hash, SQLITE3_FLOAT);
        $dop -> execute();
        $dop = $con -> prepare('SELECT * FROM users WHERE hash = :hash');
        $dop -> bindValue(':hash', (float)$data['hash'], SQLITE3_FLOAT);
        $records = $dop -> execute() -> fetchArray(SQLITE3_ASSOC);
        $id = $records['id'];
        $avatar = $records['avatar'];
        $dop = $con -> prepare('SELECT * FROM balance WHERE hash = :hash');
        $dop -> bindValue(':hash', $hash, SQLITE3_FLOAT);
        $records = $dop -> execute() -> fetchArray(SQLITE3_ASSOC);
        $apps_int = $records['balance'];
        $dop = $con -> prepare('UPDATE balance SET balance = :balance WHERE hash = :hash');
        $dop -> bindValue(':balance', $apps_int + 1, SQLITE3_INTEGER);
        $dop -> bindValue(':hash', $hash, SQLITE3_FLOAT);
        $dop -> execute();
        $dop = $con -> prepare('INSERT INTO chats (autor_id, giver_id, text, file, read, special, type) VALUES (:autor_id, :giver_id, :text, :file, :read, :special, :type)');
        $dop -> bindValue(':autor_id', 'Sophie', SQLITE3_TEXT);
        $dop -> bindValue(':giver_id', $data['id'], SQLITE3_TEXT);
        $dop -> bindValue(':text', 'Пользователь ' . $id . ' поставил тебе 👏', SQLITE3_TEXT);
        $dop -> bindValue(':file', $avatar, SQLITE3_TEXT);
        $dop -> bindValue(':read', 'no', SQLITE3_TEXT);
        $dop -> bindValue(':special', 'no', SQLITE3_TEXT);
        $dop -> bindValue(':type', 'image', SQLITE3_TEXT);
        $dop -> execute();
        echo json_encode(['answer' => 'yes']);
    }else{
        echo json_encode(['answer' => 'no']);
    }
?>