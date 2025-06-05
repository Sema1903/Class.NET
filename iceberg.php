<?php
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json");
	header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
	$con = new SQLite3('exercises.db');
	$dop = $con -> prepare('SELECT * FROM balances WHERE hash = :hash');
	$records = $dop -> bindValue(':hash', (float)$_GET['hash'], SQLITE3_FLOAT) -> execute() -> fetchArray(SQLITE3_ASSOC);
	echo json_encode(['balance' => $records['balance']]);
?>