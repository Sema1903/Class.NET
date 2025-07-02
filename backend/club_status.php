<?php
    $con = new SQLite('exercises.db');
    $status = 'no';
    $club = '';
    $records = $con -> query('SELECT * FROM clubs');
    while($row = $records -> fetchArray(SQLITE3_ASSOC)){
        if($row['president'] == (float)$_GET['hash']){
            $status = 'president';
            $club = $row['name'];
        }
        if(in_array((float)$_GET['hash'], $explode(' ', $row['memmbers']))){
            $status = 'member';
            $club = $row['name'];
        }
    }
    if($status == 'no'){
        echo json_encode(['answer' => 'не в клубе']);
    }else if($status == 'president'){
        echo json_encode(['answer' => 'президент клуба ' . $club]);
    }else if($status == 'member'){
        echo json_encode(['answer' => 'член клуба ' . $club]);
    }
?>