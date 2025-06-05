<?php
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json");
	$id = '';
//	echo (float)$_GET['hash'] . '     ';
	$con = new SQLite3('exercises.db');
	$dop = $con -> prepare('SELECT * FROM users WHERE hash = :hash');
	$dop -> bindValue(':hash', (float)$_GET['hash'], SQLITE3_FLOAT);
	$records = $dop -> execute() -> fetchArray(SQLITE3_ASSOC);
	$id = $records['id'];
//	echo $id;
/*	$records = $con -> query('SELECT * FROM users');
	while($row = $records -> fetchArray(SQLITE3_ASSOC)){
		echo $row['hash'] . ' ';
	}*/
	
	
	$records = $con -> query('SELECT * FROM chats');
	$result = [];
	while($row = $records -> fetchArray(SQLITE3_ASSOC)){
		if($row['autor_id'] == $id){
			$dop = $con -> prepare('SELECT * FROM users WHERE id = :id');
			$dop -> bindValue(':id', $row['giver_id'], SQLITE3_TEXT);
			$records2 = $dop -> execute() -> fetchArray(SQLITE3_ASSOC);
			array_push($result, ['name' => $records2['name'], 'id' => $records2['id'], 'avatar' => $records2['avatar'], 'read' => $row['read'], 'my' => 'yes']);
		}else if($row['giver_id'] == $id){
			$dop = $con -> prepare('SELECT * FROM users WHERE id = :id');
			$dop -> bindValue(':id', $row['autor_id'], SQLITE3_TEXT);
			$records2 = $dop -> execute() -> fetchArray(SQLITE3_ASSOC);
			array_push($result, ['name' => $records2['name'], 'id' => $records2['id'], 'avatar' => $records2['avatar'], 'read' => $row['read'], 'my' => 'no']);
		}
	}
	$result2 = [];
	for($i = (count($result) - 1); $i >= 0; $i--){
		array_push($result2, $result[$i]);
	}
	echo json_encode($result2);
?>