<?php
    $con = new SQLite3('exercises.db');
    $answer = 'no';
    $records = $con -> query('SELECT * FROM loves');
    while($row = $records -> fetchArray(SQLITE3_ASSOC)){
        if($row['first'] == (float)$_GET['hash'] && ($row['status'] == 'in_love_private' || $row['status'] == 'in_love_public')){
            $answer = 'in_love';
            $partner = $row['second'];
        }else if($row['second'] == (float)$_GET['hash'] && ($row['status'] == 'in_love_private' || $row['status'] == 'in_love_public')){
            $answer = 'in_love';
            $partner = $row['first'];
        }else if($row['first'] == (float)$_GET['hash'] && $row['status'] == 'married'){
            $answer = 'married';
            $partner = $row['second'];
        }else if($row['second'] == (float)$_GET['hash'] && $row['status'] == 'married'){
            $answer = 'married';
            $partner = $row['first'];
        }
    }
    if($answer != 'no'){
        $dop = $con -> prepare('SELECT * FROM users WHERE hash = :hash');
        $dop -> bindValue(':hash', $partner, SQLITE3_FLOAT);
        $records = $dop -> execute() -> fetchArray(SQLITE3_ASSOC);
        echo json_encode(['answer' => $answer, 'partner' => $records['name']]);
    }else{
        echo json_encode(['answer' => 'no']);
    }
?>