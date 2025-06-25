<?php
    error_log('Request method: ' . $_SERVER['REQUEST_METHOD']);
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
	$s = 0;
	$balance = 0;
	$con = new SQLite3('exercises.db');
	$records = $con -> query('SELECT * FROM lent');
	while($row = $records -> fetchArray(SQLITE3_ASSOC)){
		$s += 1;
	}
	$dop = $con -> prepare('SELECT * FROM users WHERE hash = :hash');
	$dop -> bindValue(':hash', (float)$data['hash'], SQLITE3_FLOAT);
	$records = $dop -> execute() -> fetchArray(SQLITE3_ASSOC);
	$id = $records['id'];
	$dop = $con -> prepare('INSERT INTO lent (id, text, file, ip, likes, type) VALUES (:id, :text, :file, :ip, :likes, :type)');
	$dop -> bindValue(':id', $id, SQLITE3_TEXT);
	$dop -> bindValue(':text', $data['text'], SQLITE3_TEXT);
	$dop -> bindValue(':file', $data['file'], SQLITE3_TEXT);
	$dop -> bindValue(':ip', $s + 1, SQLITE3_INTEGER);
	$dop -> bindValue(':likes', 0, SQLITE3_INTEGER);
	$dop -> bindValue(':type', $data['type'], SQLITE3_TEXT);
	$dop -> execute();
	$dop = $con -> prepare('SELECT * FROM balance WHERE hash = :hash');
	$dop -> bindValue(':hash', (float)$data['hash'], SQLITE3_FLOAT);
	$records = $dop -> execute() -> fetchArray(SQLITE3_ASSOC);
	$balance = $records['balance'];
	$dop = $con -> prepare('UPDATE balance SET balance = :balance WHERE hash = :hash');
	$dop -> bindValue(':balance', $balance + 1, SQLITE3_INTEGER);
	$dop -> bindValue(':hash', (float)$data['hash'], SQLITE3_FLOAT);
	$dop -> execute();
	echo json_encode(['answer' => 'yes']);
?>