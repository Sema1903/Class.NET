<?php
    $con = new SQLite3('exercises.db');
    $result = [];
    $records = $con -> query('SELECT * FROM nfts');
    while($row = $records -> fetchArray(SQLITE3_ASSOC)){
        if($row['owner'] != (float)$_GET['hash'] && $row['status'] == 'sale'){
            $dop = $con -> prepare('SELECT * FROM users WHERE hash = :hash');
            $dop -> bindValue(':hash', $row['owner'], SQLITE3_FLOAT);
            $records2 = $dop -> execute() -> fetchArray(SQLITE3_ASSOC);
            $owner = $records2['id'];
            $result[$row['token']] = ['owner' => $owner, 'metadata' => ['creator' => $row['creator'], 'how' => $row['cost'], 'nft' => $row['nft']]];
        }
    }
    echo json_encode($result);
?>