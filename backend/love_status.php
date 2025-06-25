<?php
    $con = new SQLite3('exercises.db');
    $hash = (float)explode(' ', $_GET['id_hash'])[1];
    $status = 'no';
    $partner = 0.0;
    $id = explode(' ', $_GET['id_hash'])[0];
    $dop = $con -> prepare('SELECT * FROM users WHERE id = :id');
    $dop -> bindValue(':id', $id, SQLITE3_TEXT);
    $records = $dop -> execute() -> fetchArray(SQLITE3_ASSOC);
    $your_hash = $records['hash'];
    $records = $con -> query('SELECT * FROM loves');
    while($row = $records -> fetchArray(SQLITE3_ASSOC)){
        if($row['first'] == $your_hash && $row['second'] == $hash && ($row['status'] == 'in_love_private' || $row['status'] == 'in_love_public')){
            $status = 'in_love_with_me';
        }else if ($row['first'] == $your_hash && $row['second'] == $hash && $row['status'] == 'married'){
            $status = 'married_with_me';
        }else if ($row['first'] == $your_hash && $row['second'] != $hash && $row['status'] == 'in_love_private'){
            $status = 'in_love_private';
        }else if ($row['first'] == $your_hash && $row['second'] != $hash && $row['status'] == 'in_love_public'){
            $status = 'in_love_public';
            $partner = $row['second'];
        }else if ($row['first'] == $your_hash && $row['second'] != $hash && $row['status'] == 'married'){
            $status = 'married';
            $partner = $row['second'];
        }else if($row['first'] == $hash && $row['second'] == $your_hash && ($row['status'] == 'in_love_private' || $row['status'] == 'in_love_public')){
            $status = 'in_love_with_me';
        }else if ($row['first'] == $hash && $row['second'] == $your_hash && $row['status'] == 'married'){
            $status = 'married_with_me';
        }else if ($row['first'] == $hash && $row['second'] != $your_hash && $row['status'] == 'in_love_private'){
            $status = 'in_love_private';
        }else if ($row['first'] == $hash && $row['second'] != $your_hash && $row['status'] == 'in_love_public'){
            $status = 'in_love_public';
            $partner = $row['second'];
        }else if ($row['first'] == $hash && $row['second'] != $your_hash && $row['status'] == 'married'){
            $status = 'married';
            $partner = $row['second'];
        }
    }
    if ($partner == 0.0){
        echo json_encode(['answer' => $status, 'partner' => '']);
    }else{
        $dop = $con -> prepare('SELECT * FROM users WHERE hash = :hash');
        $dop -> bindValue(':hash', $partner, SQLITE3_FLOAT);
        $records = $dop -> execute() -> fetchArray(SQLITE3_ASSOC);
        echo json_encode(['answer' => $status, 'partner' => $records['name']]);
    }
?>