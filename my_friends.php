<?php
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json");
	$con = new SQLite3('exercises.db');
	$dop = $con -> prepare('SELECT * FROM users WHERE hash = :hash');
	$dop -> bindValue(':hash', (float)$_GET['hash'], SQLITE3_FLOAT);
	$records = $dop -> execute() -> fetchArray(SQLITE3_ASSOC);
	$records = explode(' ', $records['friends']);
	$result = [];
	for($i = 1; $i < count($records); $i++){
		$dop = $con -> prepare('SELECT * FROM users WHERE id = :id');
		$dop -> bindValue(':id', $records[$i], SQLITE3_TEXT);
		$row = $dop -> execute() -> fetchArray(SQLITE3_ASSOC);
		array_push($result, ['name' => $row['name'], 'avatar' => $row['avatar'], 'id' => $row['id']]);
	};
	echo json_encode($result);
?>