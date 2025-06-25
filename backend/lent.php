<?php
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json");
	$con = new SQLite3('exercises.db');
	$records = $con -> query('SELECT * FROM lent');
	$s = 0;
	while($row = $records -> fetchArray(SQLITE3_ASSOC)){
		$s += 1;
	}
	if($s - $_GET['number'] <= 0){
		echo json_encode(['number' => 0, 'autor' => 'EasyPass', 'text' => 'Ты посмотрел все публикации)']);
	}
	while($row = $records -> fetchArray(SQLITE3_ASSOC)){
		if($s - $_GET['number'] == $row['ip']){
			$dop = $con ->	prepare('SELECT * FROM users WHERE id = :id');
			$dop -> bindValue(':id', $row['id'], SQLITE3_TEXT);
			$result = $dop -> execute();
			$result = $result -> fetchArray(SQLITE3_ASSOC);
			if($result['status'] != 'baned'){
			    echo json_encode(['number' => $row['ip'], 'autor' => $result['name'], 'text' => $row['text'], 'avatar' => $result['avatar'], 'file' => $row['file'], 'id' => $result['id'], 'likes' => $row['likes'], 'type' => $row['type']]);
			}else{
			    echo json_encode(['number' => $row['ip'], 'autor' => 'Baned', 'text' => 'Этот автор был заблокирован', 'avatar' => 'images/baned.gif', 'file' => 'images/baned.gif', 'id' => $result['id'], 'likes' => $row['likes'], 'type' => 'image']);
			}
		}
	}
?>