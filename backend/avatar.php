<?php
	$con = new SQLite3('exercises.db');
	$dop = $con -> prepare('SELECT * FROM users WHERE hash = :hash');
	$dop -> bindValue(':hash', (float)$_GET['hash'], SQLITE3_FLOAT);
    $records = $dop -> execute();
	$records = $records -> fetchArray(SQLITE3_ASSOC);
	if($records['status'] != 'baned'){
	    echo json_encode(['avatar' => $records['avatar']]);
	}else {
	    echo json_encode(['avatar' => 'images/baned.gif']);
	}
?>