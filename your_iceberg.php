<?php
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json");
	$con = new SQLite3('exercises.db');
	$hash = 0;
	$dop = $con -> prepare('SELECT * FROM users WHERE id = :id');
	$records = $dop -> bindValue(':id', $_GET['id'], SQLITE3_TEXT) -> execute() -> fetchArray(SQLITE3_ASSOC);
//	$hash = $records['hash'];
//	$dop = $con -> prepare('SELECT * FROM balances WHERE hash = :hash');
//	$dop -> bindValue(':hash', $hash, SQLITE3_FLOAT);
//	$result = $dop -> execute();
//	$result = $result -> fetchArray(SQLITE3_ASSOC);
//	echo json_encode(['balance' => $result['balance']]);
?>