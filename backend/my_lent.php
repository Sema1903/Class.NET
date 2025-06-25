<?php
	$con = new SQLite3('exercises.db');
	$result = [];
	$autor = '';
	$avatar = '';
	$id = '';
	$dop = $con -> prepare('SELECT * FROM users WHERE hash = :hash');
	$dop -> bindValue(':hash', (float)$_GET['hash'], SQLITE3_FLOAT);
	$records = $dop -> execute() -> fetchArray(SQLITE3_ASSOC);
	$autor = $records['name'];
	$avatar = $records['avatar'];
	$id = $records['id'];
	$records = $con -> query('SELECT * FROM lent');
	while($row = $records -> fetchArray(SQLITE3_ASSOC)){
		if($row['id'] == $id){
			array_push($result, ['number' => $row['ip'], 'autor' => $autor, 'text' => $row['text'], 'avatar' => $avatar, 'file' => $row['file'], 'type' => $row['type'], 'likes' => $row['likes']]);
		}
	}
	$result2 = [];
	for($i = count($result) - 1; $i > -1; $i--){
		array_push($result2, $result[$i]);
	}
	echo json_encode($result2);
?>