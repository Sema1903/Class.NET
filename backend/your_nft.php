<?php
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json");
	$con = new SQLite3('exercises.db');
	$result = [];
	$hash = 0;
	$status = 'active';
	$dop = $con -> prepare('SELECT * FROM users WHERE id = :id');
	$dop ->bindValue(':id', $_GET['id'], SQLITE3_TEXT);
	$records = $dop -> execute() -> fetchArray();
	$hash = $records['hash'];
	$status = $records['status'];
	$records = $con -> query('SELECT * from nfts');
	while($row = $records -> fetchArray(SQLITE3_ASSOC)){
		if($row['owner'] == $hash && $row['status'] != 'sale'){
			array_push($result, ['nft' => $row['nft'], 'creator' => $row['creator'], 'cost' => $row['cost'], 'ip' => $row['token']]);
		}
	}
	if($status != 'baned'){
	    echo json_encode($result);
	}else{
	    echo json_encode([]);
	}
?>