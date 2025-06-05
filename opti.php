<?php
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json");
	header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
	$con = new SQLite3('exercises.db');
	$dop = $con -> prepare('SELECT * FROM users WHERE hash = :hash');
	$dop -> bindValue(':hash', (float)$_GET['hash'], SQLITE3_FLOAT);
	$records = $dop -> execute() -> fetchArray(SQLITE3_ASSOC);
	echo json_encode(['name' => $records['name'], 'email' => $records['email'], 'avatar' => $records['avatar'], 'about' => $records['about'], 'id' => $records['id']]);
?>