<?php
    error_log('Request method: ' . $_SERVER['REQUEST_METHOD']);
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
	$con = new SQLite3('exercises.db');
	$dop = $con -> prepare('SELECT * FROM users WHERE hash = :hash');
	$dop -> bindValue(':hash', (float)$data['id1'], SQLITE3_FLOAT);
	$records = $dop -> execute() -> fetchArray(SQLITE3_ASSOC);
	$friends = explode(' ', $records['friends']);
	$id = $records['id'];
	if(!in_array($data['id2'], $friends)){
		array_push($friends, $data['id2']);
		$res = $friends[0];
		for($i = 1; $i < count($friends); $i++){
			$res .= ' ' . $friends[$i];
		}
		$dop = $con -> prepare('UPDATE users SET friends = :res WHERE hash = :hash');
		$dop -> bindValue(':res', $res, SQLITE3_TEXT);
		$dop -> bindValue(':hash', (float)$data['id1'], SQLITE3_FLOAT);
		$dop -> execute();
		$dop = $con -> prepare('SELECT * FROM users WHERE id = :id');
		$dop -> bindValue(':id', $data['id2'], SQLITE3_TEXT);
		$records = $dop -> execute() -> fetchArray(SQLITE3_ASSOC);
		$friends = $records['friends'] . ' ' . $id;
		$dop = $con -> prepare('UPDATE users SET friends = :friends WHERE id = :id');
		$dop -> bindValue(':friends', $friends, SQLITE3_TEXT);
		$dop -> bindValue(':id', $data['id2'], SQLITE3_TEXT);
		$dop -> execute();
		echo json_encode(['answer' => 'yes']);
	}else{
		echo json_encode(['answer' => 'no']);
	}
?>