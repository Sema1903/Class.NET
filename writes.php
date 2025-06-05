<?php
    error_log('Request method: ' . $_SERVER['REQUEST_METHOD']);
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
	$con = new SQLite3('exercises.db');
	$dop = $con -> prepare('SELECT * FROM users WHERE hash = :hash');
	$dop -> bindValue(':hash', (float)$data['autor_id'], SQLITE3_FLOAT);
	$records = $dop -> execute() -> fetchArray(SQLITE3_ASSOC);
	$id = $records['id'];
	$dop = $con -> prepare('INSERT INTO chats (autor_id, giver_id, text, file, read, special, type) VALUES (:autor_id, :giver_id, :text, :file, :read, :special, :type)');
	$dop -> bindValue(':autor_id', $id, SQLITE3_TEXT);
	$dop -> bindValue(':giver_id', $data['giver_id'], SQLITE3_TEXT);
	$dop -> bindValue(':text', $data['text'], SQLITE3_TEXT);
	$dop -> bindValue(':file', $data['file'], SQLITE3_TEXT);
	$dop -> bindValue(':read', 'no', SQLITE3_TEXT);
	$dop -> bindValue(':special', 'no', SQLITE3_TEXT);
	$dop -> bindValue(':type', $data['type'], SQLITE3_TEXT);
	$dop -> execute();
	echo json_encode(['answer' => 'yes']);
?>