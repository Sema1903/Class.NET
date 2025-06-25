<?php
    error_log('Request method: ' . $_SERVER['REQUEST_METHOD']);
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
	$con = new SQLite3('exercises.db');
	if(is_int((int)$data['how']) && (int)$data['how'] >= 0){
	    $dop = $con -> prepare('UPDATE nfts SET cost = :cost WHERE token = :token');
        $dop -> bindValue(':cost', (int)$data['how'], SQLITE3_INTEGER);
        $dop -> bindValue(':token', (float)$data['token'], SQLITE3_FLOAT);
        $dop -> execute();
        $dop = $con -> prepare('UPDATE nfts SET status = :status WHERE token = :token');
        $dop -> bindValue(':status', 'sale', SQLITE3_TEXT);
        $dop -> bindValue(':token', (float)$data['token'], SQLITE3_FLOAT);
        $dop -> execute();
	    echo json_encode(['answer' => $_POST['ip']]);
	}
?>