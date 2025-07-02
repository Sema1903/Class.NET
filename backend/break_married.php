<?php
    error_log('Request method: ' . $_SERVER['REQUEST_METHOD']);
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    $con = new SQLIte3('exercises.db');
    $id = '';
    $your_hash = 0.0;
    $first = 0.0;
    $records = $con -> query('SELECT * FROM loves');
    while($row = $records -> fetchArray(SQLITE3_ASSOC)){
        if($row['first'] == (float)$data['hash'] || $row['second'] == (float)$data['hash']){
            $first = $row['first'];
        }
    }
    $dop = $con -> prepare('SELECT * FROM users WHERE hash = :hash');
    $dop -> bindValue(':hash', (float)$data['hash'], SQLITE3_ASSOC);
    $records = $dop -> execute() -> fetchArray(SQLITE3_ASSOC);
    $id = $records['id'];
    $dop = $con -> prepare('SELECT * FROM users WHERE id = :id');
    $dop -> bindValue(':id', $data['id'], SQLITE3_TEXT);
    $records = $dop -> execute() -> fetchArray(SQLITE3_ASSOC);
    $ip = 0;
    $records = $con -> query('SELECT * FROM lent');
    while($row = $records -> fetchArray(SQLITE3_ASSOC)){
        $ip += 1;
    }
    $dop = $con -> prepare('INSERT INTO lent (id, text, file, ip, likes, type) VALUES (:id, :text, :file, :ip, :likes, :type)');
    $dop -> bindValue(':id', $id, SQLITE3_TEXT);
    $dop -> bindValue(':text', 'Мы развелись с ' . $data['id'], SQLITE3_TEXT);
    $dop -> bindValue(':file', '', SQLITE3_TEXT);
    $dop -> bindValue(':ip', $ip + 1, SQLITE3_INTEGER);
    $dop -> bindValue(':likes', 0, SQLITE3_INTEGER);
    $dop -> bindValue(':type', 'no', SQLITE3_TEXT);
    $dop -> execute();
    $dop -> bindValue(':id', $data['id'], SQLITE3_TEXT);
    $dop -> bindValue(':text', 'Мы развелись с ' . $id, SQLITE3_TEXT);
    $dop -> bindValue(':file', '', SQLITE3_TEXT);
    $dop -> bindValue(':ip', $ip + 2, SQLITE3_INTEGER);
    $dop -> bindValue(':likes', 0, SQLITE3_INTEGER);
    $dop -> bindValue(':type', 'no', SQLITE3_TEXT);
    $dop -> execute();
    $dop = $con -> prepare('DELETE FROM loves WHERE first = :first');
    $dop -> bindValue(':first', $first, SQLITE3_FLOAT);
    $dop -> execute();
?>