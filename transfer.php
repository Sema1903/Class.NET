<?php
    error_log('Request method: ' . $_SERVER['REQUEST_METHOD']);
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    $con = new SQLite3('exercises.db');
    $seller_hash = 0.0;
    $dop = $con -> prepare('SELECT  * FROM users WHERE id = :id');
    $dop -> bindValue(':id', $data['seller'], SQLITE3_TEXT);
    $records = $dop -> execute() -> fetchArray(SQLITE3_ASSOC);
    $seller_hash = $records['hash'];
    $here = false;
    $records = $con -> query('SELECT * FROM nfts');
    while($row = $records -> fetchArray(SQLITE3_ASSOC)){
        if($row['token'] === (int)$data['token']){
            $here = true;
        }
    }
    $balance = 0;
    $dop = $con -> prepare('SELECT * FROM balance WHERE hash = :hash');
    $dop -> bindValue(':hash', (float)$data['giver']);
    $records = $dop -> execute() -> fetchArray(SQLITE3_ASSOC);
    $balance = $records['balance'];
    if((!is_int($data['how'])) || ($seller_hash == (float)$data['giver']) || ($balance < (int)$data['how'])){
        $here = false;
    }
    if(!$here){
        $dop = $con -> prepare('UPDATE nfts SET owner = :owner WHERE token = :token');
        $dop -> bindValue(':owner', (float)$data['giver'], SQLITE3_FLOAT);
        $dop -> bindValue(':token', (float)$data['token'], SQLITE3_FLOAT);
        $dop -> execute();
        $seller_balance = 0;
        $dop = $con -> prepare('SELECT * FROM balance WHERE hash = :hash');
        $dop -> bindValue(':hash', $seller_hash, SQLITE3_FLOAT);
        $records = $dop -> execute() -> fetchArray(SQLITE3_ASSOC);
        $seller_balance = $records['balance'];
        $dop = $con -> prepare('UPDATE balance SET balance = :balance WHERE hash = :hash');
        $dop -> bindValue(':balance', ($balance - (int)$data['how']), SQLITE3_INTEGER);
        $dop -> bindValue(':hash', (float)$data['giver'], SQLITE3_FLOAT);
        $dop -> execute();
        $dop = $con -> prepare('UPDATE balance SET balance = :balance WHERE hash = :hash');
        $dop -> bindValue(':balance', $seller_balance + (int)$data['how'], SQLITE3_INTEGER);
        $dop -> bindValue(':hash', $seller_hash, SQLITE3_FLOAT);
        $dop -> execute();
        $dop = $con -> prepare('UPDATE nfts SET status = :status WHERE token = :token');
        $dop -> bindValue(':status', 'no', SQLITE3_TEXT);
        $dop -> bindValue(':token', (int)$data['token'], SQLITE3_INTEGER);
        $dop -> execute();
        echo json_encode(['answer' => 'yes']);
    }else{
        echo json_encode(['answer' => 'no']);
    }
?>