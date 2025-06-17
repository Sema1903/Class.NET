<?php
    error_log('Request method: ' . $_SERVER['REQUEST_METHOD']);
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    $con = new SQLite3('exercises.db');
    $here = false;
    $records = $con -> query('SELECT * FROM gif');
    while($row = $records -> fetchArray(SQLITE3_ASSOC)){
        if($row['hash'] == (float)$data['hash']){
            $here = true;
        }
    }
    if($here){
        echo json_encode(['answer' => 'no']);
    }else{
        $dop = $con -> prepare('INSERT INTO gif (hash) VALUES (:hash)');
        $dop -> bindValue(':hash', (float)$data['hash'], SQLITE3_FLOAT);
        $dop -> execute();
        $balance = 0;
        $dop = $con -> prepare('SELECT * FROM balance WHERE hash = :hash');
        $dop -> bindValue(':hash', (float)$data['hash'], SQLITE3_FLOAT);
        $records = $dop -> execute() -> fetchArray(SQLITE3_ASSOC);
        $balance = $records['balance'];
        $dop = $con -> prepare('UPDATE balance SET balance = :balance WHERE hash = :hash');
        $dop -> bindValue(':balance', $balance + 100, SQLITE3_INTEGER);
        $dop -> bindValue(':hash', (float)$data['hash'], SQLITE3_FLOAT);
        $dop -> execute();
        echo json_encode(['answer' => 'yes']);
    }
?>