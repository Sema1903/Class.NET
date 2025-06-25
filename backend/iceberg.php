<?php
    $con = new SQLite3('exercises.db');
    $records = $con -> query('SELECT * FROM balance');
    $result = ['balance' => 0];
    while($row = $records -> fetchArray(SQLITE3_ASSOC)){
        if($row['hash'] == (float)$_GET['hash']){
            $result['balance'] = $row['balance'];
        }
    }
    echo json_encode($result);
?>