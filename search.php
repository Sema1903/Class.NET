<?php
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json");
	header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
	$con = new SQLite3('exercises.db');
	$here = false;
	$records = $con -> query('SELECT * FROM users');
	while($row = $records -> fetchArray(SQLITE3_ASSOC)){
		if($row['id'] == $_GET['id']){
			$here = true;
		}
	}
	if($here == true){
		echo json_encode(['answer' => 'yes']);
	}else{
		echo json_encode(['answer' => 'no']);
	}
?>