<?php
    error_log('Request method: ' . $_SERVER['REQUEST_METHOD']);
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    $con = new SQLite3('exercises.db');
    $hash = 0.0;
    $id = '';
    $first = 0.0;
    $dop -> prepare('SELECT * FROM users WHERE id = :id');
    $dop -> bindValue(':id', $data['id'], SQLITE3_TEXT);
    $records = $dop -> execute() -> fetchArray(SQLITE3_ASSOC);
    $hash = $records['hash'];
    $dop = $con -> prepare('SELECT * FROM users WHERE hash = :hash');
    $dop -> bindValue(':hash', (float)$data['hash'], SQLITE3_FLOAT);
    $records = $dop -> execute() -> fetchArray(SQLITE3_ASSOC);
    $id = $records['id'];
    $records = $con -> query('SELECT * FROM loves');
    while($row = $records -> fetchArray(SQLITE3_ASSOC)){
        if($row['first'] == $hash || $row['second'] == $hash){
            $first = $row['first'];
        }
    }
    $dop = $con -> prepare('UPDATE loves SET status = :status WHERE first = :first');
    $dop -> bindValue(':status', 'married', SQLITE3_TEXT);
    $dop -> bindValue(':first', $first, SQLITE3_FLOAT);
    $dop -> execute();
?>