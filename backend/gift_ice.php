<?php
    error_log('Request method: ' . $_SERVER['REQUEST_METHOD']);
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    $con = new SQLite3('exercises.db');
    $here = false;
    $hash = 0.0;
    $avatar = '';
    $id = '';
    $records = $con -> query('SELECT * FROM users');
    while($row = $records -> fetchArray(SQLITE3_ASSOC)){
        if($row['id'] == $data['id_giver']){
            $here = true;
            $hash = $row['hash'];
        }
        if($row['hash'] == (float)$data['id_seller']){
            $id = $row['id'];
            $avatar = $row['avatar'];
        }
    }
    $dop = $con -> prepare('SELECT * FROM balance WHERE hash = :hash');
    $dop -> bindValue(':hash', (float)$data['id_seller'], SQLITE3_FLOAT);
    $records = $dop -> execute() -> fetchArray(SQLITE3_ASSOC);
    if($records['balance'] < (int)$data['how'] || $hash == (float)$data['id_seller']){
        $here = false;
    }
    if(!$here){
        echo json_encode(['answer' => 'no']);
    }else{
        $balance_seller = 0;
        $balance_giver = 0;
        $dop = $con -> prepare('SELECT * FROM balance WHERE hash = :hash');
        $dop -> bindValue(':hash', $hash, SQLITE3_FLOAT);
        $records = $dop -> execute() -> fetchArray(SQLITE3_ASSOC);
        $balance_giver = $records['balance'];
        $dop = $con -> prepare('SELECT * FROM balance WHERE hash = :hash');
        $dop -> bindValue(':hash', (float)$data['id_seller'], SQLITE3_FLOAT);
        $records = $dop -> execute() -> fetchArray(SQLITE3_ASSOC);
        $balance_seller = $records['balance'];
        $dop = $con -> prepare('UPDATE balance SET balance = :balance WHERE hash = :hash');
        $dop -> bindValue(':balance', $balance_seller - (int)$data['how'], SQLITE3_INTEGER);
        $dop -> bindValue(':hash', (float)$data['id_seller'], SQLITE3_FLOAT);
        $dop -> execute();
        $dop = $con -> prepare('UPDATE balance SET balance = :balance WHERE hash = :hash');
        $dop -> bindValue(':balance', $balance_giver + (int)$data['how'], SQLITE3_INTEGER);
        $dop -> bindValue(':hash', $hash, SQLITE3_FLOAT);
        $dop -> execute();
        $dop = $con -> prepare('INSERT INTO chats (autor_id, giver_id, text, file, read, special, type) VALUES (:autor_id, :giver_id, :text, :file, :read, :special, :type)');
        $dop -> bindValue(':autor_id', 'Sophie', SQLITE3_TEXT);
        $dop -> bindValue(':giver_id', $data['id_giver'], SQLITE3_TEXT);
        $dop -> bindValue(':text', 'Пользователь ' . $id . ' перевел тебе ' . $data['how'] . ' 👏', SQLITE3_TEXT);
        $dop -> bindValue(':file', $avatar, SQLITE3_TEXT);
        $dop -> bindValue(':read', 'no', SQLITE3_TEXT);
        $dop -> bindValue(':special', 'no', SQLITE3_TEXT);
        $dop -> bindValue(':type', 'image', SQLITE3_TEXT);
        $dop -> execute();
        echo json_encode(['answer' => 'yes']);
    }
?>