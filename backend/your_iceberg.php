<?php
    $con = new SQLite3('exercises.db');
    $dop = $con -> prepare('SELECT * FROM users WHERE id = :id');
    $dop -> bindValue(':id', $_GET['id'], SQLITE3_TEXT);
    $records = $dop -> execute() -> fetchArray(SQLITE3_ASSOC);
    $hash = $records['hash'];
    $status = $records['status'];
    $result = ['balance' => 0];
    $records = $con -> query('SELECT * FROM balance');
    while($row = $records -> fetchArray(SQLITE3_ASSOC)){
        if($row['hash'] == $hash){
            $result['balance'] = $row['balance'];
        }
    }
    if($status != 'baned'){
        echo json_encode($result);
    }else{
        echo json_encode(['balance' => 'недостоин']);
    }
?>