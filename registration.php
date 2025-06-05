<?php
    error_log('Request method: ' . $_SERVER['REQUEST_METHOD']);
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
	$con = new SQLite3('exercises.db');
	$here = false;
	$records = $con -> query('SELECT * FROM users');
	while($row = $records -> fetchArray(SQLITE3_ASSOC)){
		if($row['password'] === (float)$data['password'] || $row['email'] == $data['email']){
			$here = true;
			echo json_encode(['answer' => 'no']);
		}
	}
	if($here == false){
		$dop = $con -> prepare('INSERT INTO users (name, email, password, avatar, id, about, hash, friends, bans, status) VALUES (:name, :email, :password, :avatar, :id, :about, :hash, :friends, :bans, :status)');
		$dop -> bindValue(':name', $data['name'], SQLITE3_TEXT);
		$dop -> bindValue(':email', $data['email'], SQLITE3_TEXT);
		$dop -> bindValue(':password', (float)$data['password'], SQLITE3_FLOAT);
		$dop -> bindValue(':avatar', $data['avatar'], SQLITE3_TEXT);
		$dop -> bindValue(':id', $data['id'], SQLITE3_TEXT);
		$dop -> bindValue(':about', $data['about'], SQLITE3_TEXT);
		$dop -> bindValue(':hash', (float)$data['hash'], SQLITE3_FLOAT);
		$dop -> bindValue(':friends', 'Sophie', SQLITE3_TEXT);
		$dop -> bindValue(':bans', 0, SQLITE3_INTEGER);
		$dop -> bindValue(':status', 'active', SQLITE3_TEXT);
		$dop -> execute();
		echo json_encode(['answer' => 'yes']);
	}
?>