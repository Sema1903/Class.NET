<?php
	$con = new SQLite3('exercises.db');
	$result = [];
	$autor = '';
	$avatar = '';
	$dop = $con -> prepare('SELECT * FROM users WHERE id = :id');
	$dop -> bindValue(':id', $_GET['id'], SQLITE3_TEXT);
	$records = $dop -> execute() -> fetchArray(SQLITE3_ASSOC);
	$autor = $records['name'];
	$avatar = $records['avatar'];
	$records1 = $con -> query('SELECT * FROM lent');
	while($row = $records1 -> fetchArray(SQLITE3_ASSOC)){
		if($row['id'] == $_GET['id']){
			array_push($result, ['number' => $row['ip'], 'autor' => $autor, 'text' => $row['text'], 'avatar' => $avatar, 'file' => $row['file'], 'type' => $row['type'], 'likes' => $row['likes']]);
		}
	}
	$result2 = [];
	for($i = count($result) - 1; $i > -1; $i--){
		array_push($result2, $result[$i]);
	}
	echo json_encode($result2);
?>