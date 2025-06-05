<?php
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json");
	$con = new SQLite3('exercises.db');
	$result = [];
	$records = $con -> query('SELECT * from nfts');
	while($row = $records -> fetchArray(SQLITE3_ASSOC)){
		if($row['owner'] == (float)$_GET['hash']){
			array_push($result, ['nft' => $row['nft'], 'creator' => $row['creator'], 'cost' => $row['cost'], 'ip' => $row['token']]);
		}
	}
	echo json_encode($result);
?>