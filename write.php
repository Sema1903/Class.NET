<?php
	$con = new SQLite3('exercises.db');
	$my_id = '';
	$name = '';
	$avatar = '';
	$dop = $con -> prepare('SELECT * FROM users WHERE id = :id');
	$dop -> bindValue(':id', explode(' ', $_GET['id'])[1], SQLITE3_TEXT);
	$records = $dop -> execute() -> fetchArray(SQLITE3_ASSOC);
	$name = $records['name'];
	$avatar = $records['avatar'];
	$result = ['name' => $name, 'avatar' => $avatar, 'messages' => []];
	$dop = $con -> prepare('SELECT * FROM users WHERE hash = :hash');
	$dop -> bindValue(':hash', (float)explode(' ', $_GET['id'])[0], SQLITE3_FLOAT);
	$records = $dop -> execute() -> fetchArray(SQLITE3_ASSOC);
	$my_id = $records['id'];
	$another_id = explode(' ', $_GET['id'])[1];
	$records = $con -> query('SELECT * FROM chats');
	while($row = $records -> fetchArray(SQLITE3_ASSOC)){
		if($row['autor_id'] == $another_id && $row['giver_id'] == $my_id){
			array_push($result['messages'], ['autor_id' => $another_id, 'text' => $row['text'], 'file' => $row['file'], 'special' => $row['special'], 'type' => $row['type']]);
		}else if($row['autor_id'] == $my_id && $row['giver_id'] == $another_id){
			array_push($result['messages'], ['autor_id' => explode(' ', $_GET['id'])[0], 'text' => $row['text'], 'file' => $row['file'], 'special' => $row['special'], 'type' => $row['type']]);
		}
	}
	$dop = $con -> prepare('UPDATE chats SET read = "yes" WHERE autor_id = :autor_id AND giver_id = :giver_id');
	$dop -> bindValue(':autor_id', $another_id, SQLITE3_TEXT);
	$dop -> bindValue(':giver_id', $my_id, SQLITE3_TEXT);
	$dop -> execute();
	echo json_encode($result);
?>