<?php
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json");
	$con = new SQLite3('exercises.db');
	$dop = $con -> prepare('SELECT * FROM users WHERE id = :id');
	$dop -> bindValue(':id', $_GET['id'], SQLITE3_TEXT);
	$records = $dop -> execute();
	$records = $records -> fetchArray(SQLITE3_ASSOC);
	if($records['status'] != 'baned'){
	    echo json_encode(['name' => $records['name'], 'avatar' => $records['avatar'], 'about' => $records['about']]);
	}else{
	    echo json_encode(['name' => 'Baned', 'avatar' => 'images/baned.gif', 'about' => 'Этот пользователь был заблокирован']);
	}
?>