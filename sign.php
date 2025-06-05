<?php
    error_log('Request method: ' . $_SERVER['REQUEST_METHOD']);
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
	$con = new SQLite3('exercises.db');
	$status = 'no';
	$records = $con -> query('SELECT * FROM users');
	while($row = $records -> fetchArray(SQLITE3_ASSOC)){
		if($row['password'] === (float)$data['password'] && $row['email'] === $data['email'] && $row['status'] === 'active'){
			$status = 'yes';
			echo json_encode(['hash' => $row['hash'], 'answer' => 'correct']);
		}else if($row['password'] === $data['password'] && $row['email'] === $data['email'] && $row['status'] === 'baned'){
			$status = 'yes';
			echo json_encode(['answer' => 'baned']);
		}
	}
	if($status == 'no')	{
		echo json_encode(['answer' => 'incorrect']);
	}
?>