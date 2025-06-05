<?php
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json");
	header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
	$creator = '';
//	$con = new SQLite3('exercises.db');
//	$dop = $con -> prepare('SELECT * FROM nfts WHERE token = :token');
//	$records = $dop -> bindValue(':token', (float)$_POST['ip'], SQLITE3_FLOAT) -> execute() -> fetchArray(SQLITE3_ASSOC);
//	$creator = $records['creator'];
//	$dop = $con -> prepare('INSERT INTO preds(token, owner, creator, cost, sum, nft) VALUES (:token, :owner, :creator, :cost, :sum, :nft)');
//	$dop -> bindValue(':token', (float)$_POST['token'], SQLITE3_FLOAT);
//	$dop -> bindValue(':owner', (float)$_POST['hash'], SQLITE3_FLOAT);
//	$dop -> bindValue(':creator', $creator, SQLITE3_TEXT);
//	$dop -> bindValue(':cost', (int)$_POST['cost'], SQLITE3_INTEGER);
//	$dop -> bindValue(':sum', 0, SQLITE3_INTEGER);
//	$dop -> bindValue(':nft', $_POST['nft'], SQLITE3_TEXT);
//	$dop -> execute();
	echo json_encode(['answer' => $_POST['ip']]);
?>