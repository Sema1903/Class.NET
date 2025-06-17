<?php
    error_log('Request method: ' . $_SERVER['REQUEST_METHOD']);
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    $con = new SQLite3('exercises.db');
    $records = $con -> query('SELECT * FROM nfts');
    $token = 0;
    while($row = $records -> fetchArray(SQLITE3_ASSOC)){
        $token += 1;
    }
    if(!is_int((int)$data['metadata']['how'])){
        echo json_encode(['answer' => 'no']);
    }else{
        $creator = '';
        $dop = $con -> prepare('SELECT * FROM users WHERE hash = :hash');
        $dop -> bindValue(':hash', (float)$data['owner'], SQLITE3_FLOAT);
        $records = $dop -> execute() -> fetchArray(SQLITE3_ASSOC);
        $creator = $records['id'];
        $dop = $con -> prepare('INSERT INTO nfts (token, owner, creator, cost, nft, status) VALUES (:token, :owner, :creator, :cost, :nft, :status)');
        $dop -> bindValue(':token', (float)$token, SQLITE3_FLOAT);
        $dop -> bindValue(':owner', (float)$_GET['hash'], SQLITE3_FLOAT);
        $dop -> bindValue(':creator', $creator, SQLITE3_TEXT);
        $dop -> bindValue(':cost', (int)$data['metadata']['how'], SQLITE3_INTEGER);
        $dop -> bindValue(':nft', $data['metadata']['nft'], SQLITE3_TEXT);
        $dop -> bindValue(':status', 'sale', SQLITE3_TEXT);
        $dop -> execute();
        echo json_encode(['answer' => 'yes']);
    }
?>