<?php
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json");
	$con = new SQLite3('exercises.db');
	$records = $con -> query('SELECT * FROM users');
	$status = 'active';
	$dop = $con -> prepare('SELECT * FROM users WHERE id = :id');
	$dop -> bindValue(':id', $_GET['id'], SQLITE3_TEXT);
	$records = $dop -> execute();
	$records = $records -> fetchArray(SQLITE3_ASSOC);
	$status = $records['status'];
	$records = explode(' ', $records['friends']);
	$result = [];
	for($i = 1; $i < count($records); $i++){
		$dop = $con -> prepare('SELECT * FROM users WHERE id = :id');
		$dop -> bindValue(':id', $records[$i], SQLITE3_TEXT);
		$row = $dop -> execute() -> fetchArray(SQLITE3_ASSOC);
		if($row['status'] != 'baned'){
		    array_push($result, ['name' => $row['name'], 'avatar' => $row['avatar'], 'id' => $row['id']]);
		}else{
		    array_push($result, ['name' => 'Baned', 'avatar' => 'images/baned.gif', 'id' => $row['id']]);
		}
	};
	if($status != 'baned'){
	    echo json_encode($result);
	}else{
	    echo json_encode([]);
	}
?>