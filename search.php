<?php
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json");
	header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
	$con = new SQLite3('exercises.db');
	$here = false;
	$result = [];
	$records = $con -> query('SELECT * FROM users');
	while($row = $records -> fetchArray(SQLITE3_ASSOC)){
		if($row['id'] == $_GET['id'] || in_array($_GET['id'], explode(' ', $row['name']))){
		    array_push($result, ['id' => $row['id'], 'avatar' => $row['avatar'], 'name' => $row['name']]);
		}
	}
	echo json_encode($result);
?>