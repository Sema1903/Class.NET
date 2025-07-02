<?php
    error_log('Request method: ' . $_SERVER['REQUEST_METHOD']);
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    $con = new SQLite3('exercises.db');
    $id = '';
    $first = 0.0;
    $records = $con -> query('SELECT * FROM loves');
    while($row = $records -> fetchArray(SQLITE3_ASSOC)){
        if($row['first'] == (float)$data['hash'] || $row['second'] == (float)$data['hash']){
            $first = $row['first'];
        }
    }
    $dop = $con -> prepare('SELECT * FROM users WHERE hash = :hash');
    $dop -> bindValue(':hash', (float)$data['hash'], SQLITE3_FLOAT);
    $records = $dop -> execute() -> fetchArray(SQLITE3_ASSOC);
    $id = $records['id'];
    $ip = 0;
    $records = $con -> query('SELECT * FROM lent');
    while($row = $records -> fetchArray(SQLITE3_ASSOC)){
        $ip += 1;
    }
    $dop = $con -> prepare('INSERT INTO lent (id, text, file, ip, likes, type) VALUES (:id, :text, :file, :ip, :likes, :type)');
    $dop -> bindValue(':id', $id, SQLITE3_TEXT);
    $dop -> bindValue(':text', 'Теперь я и ' . $data['id'] . ' в браке!', SQLITE3_TEXT);
    $dop -> bindValue(':file', 'images/married.jpg', SQLITE3_TEXT);
    $dop -> bindValue(':ip', $ip + 1, SQLITE3_INTEGER);
    $dop -> bindValue(':likes', 0, SQLITE3_INTEGER);
    $dop -> bindValue(':type', 'image', SQLITE3_TEXT);
    $dop -> execute();
    $dop = $con -> prepare('INSERT INTO lent (id, text, file, ip, likes, type) VALUES (:id, :text, :file, :ip, :likes, :type)');
    $dop -> bindValue(':id', $data['id'], SQLITE3_TEXT);
    $dop -> bindValue(':text', 'Теперь я и ' . $id . ' в браке!', SQLITE3_TEXT);
    $dop -> bindValue(':file', 'images/married.jpg', SQLITE3_TEXT);
    $dop -> bindValue(':ip', $ip + 2, SQLITE3_INTEGER);
    $dop -> bindValue(':likes', 0, SQLITE3_INTEGER);
    $dop -> bindValue(':type', 'image', SQLITE3_TEXT);
    $dop -> execute();
    $dop = $con -> prepare('UPDATE loves SET status = :status WHERE first = :first');
    $dop -> bindValue(':status', 'married', SQLITE3_TEXT);
    $dop -> bindValue(':first', $first, SQLITE3_FLOAT);
    $dop -> execute();
?>