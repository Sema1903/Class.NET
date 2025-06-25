<?php
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json");
	$id = '';
	$con = new SQLite3('exercises.db');
	$dop = $con -> prepare('SELECT * FROM users WHERE hash = :hash');
	$dop -> bindValue(':hash', (float)$_GET['hash'], SQLITE3_FLOAT);
	$records = $dop -> execute() -> fetchArray(SQLITE3_ASSOC);
	$id = $records['id'];
    $records = $con -> query('SELECT * FROM chats');
	$result = [];
	while($row = $records -> fetchArray(SQLITE3_ASSOC)){
		if($row['autor_id'] == $id){
			$dop = $con -> prepare('SELECT * FROM users WHERE id = :id');
			$dop -> bindValue(':id', $row['giver_id'], SQLITE3_TEXT);
			$records2 = $dop -> execute() -> fetchArray(SQLITE3_ASSOC);
			if($records2['status'] != 'baned'){
			    array_push($result, ['name' => $records2['name'], 'id' => $records2['id'], 'avatar' => $records2['avatar'], 'read' => $row['read'], 'my' => 'yes']);
			}
		}else if($row['giver_id'] == $id){
			$dop = $con -> prepare('SELECT * FROM users WHERE id = :id');
			$dop -> bindValue(':id', $row['autor_id'], SQLITE3_TEXT);
			$records2 = $dop -> execute() -> fetchArray(SQLITE3_ASSOC);
			if($records2['status'] != 'baned'){
			    array_push($result, ['name' => $records2['name'], 'id' => $records2['id'], 'avatar' => $records2['avatar'], 'read' => $row['read'], 'my' => 'no']);
			}
		}
	}
	$result2 = [];
	for($i = (count($result) - 1); $i >= 0; $i--){
	    $here = false;
	    for($j = 0; $j < count($result2); $j++){
	        if($result2[$j] == $result[$i]){
	            $here = true;
	        }
	    }
	    if(!$here){
		    array_push($result2, $result[$i]);
	    }
	}
	echo json_encode($result2);
?>