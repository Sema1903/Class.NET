<?php
    $con = new SQLite3('exercises.db');
    $here = false;
    $id = '';
    $dop = $con -> prepare('SELECT * FROM users WHERE hash = :hash');
    $dop -> bindValue(':hash', (float)$_GET['hash']);
    $records = $dop -> execute() -> fetchArray(SQLITE3_FLOAT);
    $id = $records['id'];
    $records = $con -> query('SELECT * FROM chats');
    while($row = $records -> fetchArray(SQLITE3_ASSOC)){
        if($row['giver_id'] == $id && $row['read'] == 'no'){
            $here = true;
        }
    }
    if($here){
        echo json_encode(['answer' => 'yes']);
    }else{
        echo json_encode(['answer' => 'no']);
    }
?>