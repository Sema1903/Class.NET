<?php
    error_log('Request method: ' . $_SERVER['REQUEST_METHOD']);
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
	$bans = 0;
	$con = new SQLite3('exercises.db');
	$dop = $con -> prepare('SELECT * FROM users WHERE id = :id');
	$dop -> bindValue(':id', $_POST['id'], SQLITE3_TEXT);
	$records = $dop -> execute() -> fetchArray(SQLITE3_ASSOC);
	$bans = $records['bans'];
	$dop = $con -> prepare('UPDATE users SET bans = :bans WHERE id = :id');
	$dop -> bindValue(':bans', $bans + 1, SQLITE3_INTEGER);
	$dop -> bindValue(':id', $_POST['id'], SQLITE3_TEXT);
	echo json_encode(['answer' => 'yes']);
?>