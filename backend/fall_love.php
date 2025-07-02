<?php
    error_log('Request method: ' . $_SERVER['REQUEST_METHOD']);
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    $con = new SQLite3('exercises.db');
    $records = $con -> query('SELECT * FROM loves');
    $first = 0.0;
    while($row = $records -> fetchArray(SQLITE3_ASSOC)){
        if($row['first'] == (float)$data['hash'] || $row['second'] == (float)$data['hash']){
            $first = $row['first'];
        }
    }
    $dop = $con -> prepare('DELETE FROM loves WHERE first = :first');
    $dop -> bindValue(':first', $first, SQLITE3_FLOAT);
    $dop -> execute();
    echo json_encode(['answer' => 'yes']);
?>