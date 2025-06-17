<?php
    echo 'Привет, друг. Без понятия, как ты тут оказался, но рад, что ты заскочил. Пиши на почту nizovcevsemyon@gmail.com следующее сообщение "пароль - омега" и мы тебе ответим )))';
	  $con = new SQLite3('exercises.db');
//    $con -> exec('DROP TABLE users');
//    $con -> exec('DROP TABLE chats');
//    $con -> exec('DROP TABLE lent');
//    $con -> exec('DROP TABLE balances');
//    $con -> exec('DROP TABLE nfts');
//    $con -> exec('DROP TABLE balance');
//    $con -> exec('DROP TABLE gif');
//    $con -> exec('CREATE TABLE balance (hash FLOAT, balance INT)');
//	$con -> exec('CREATE TABLE users (name TEXT, email TEXT, password INT, avatar TEXT, id TEXT, about TEXT, hash INT, friends TEXT, bans INT, status TEXT)');
//	$con -> exec('CREATE TABLE lent(id TEXT, text TEXT, file TEXT, ip INT, likes INT, type TEXT)');
//	$con -> exec('CREATE TABLE chats(autor_id TEXT, giver_id TEXT, text TEXT, file TEXT, read TEXT, special TEXT, type TEXT);');
//	$con -> exec('CREATE TABLE balances (hash FLOAT, balance TEXT);');
//	$con -> exec('CREATE TABLE nfts (token FLOAT, owner FLOAT, creator TEXT, cost INT, nft TEXT, status TEXT);');
//  $con -> exec('CREATE TABLE gif (hash FLOAT)');
//con.execute('INSERT INTO users(name, email, password, avatar, id, about, hash, friends, bans, status) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', ('Sophie', 'krismironova04@mail.ru', 1.0672147442793281e+26, '', 'Sophie', 'Твой друг и помощник в социальной сети Друзья 2.0', 6.574042824760661e+28, '', 0, 'active'))*/
//    $records = $con -> query('SELECT * FROM users');
//    $hashs = [];
//    while($row = $records -> fetchArray(SQLITE3_ASSOC)){
//        array_push($hashs, $row['hash']);
//    }
//    for($i = 0; $i < count($hashs); $i++){
//        $dop = $con -> prepare('INSERT INTO balance (hash, balance) VALUES (:hash, :balance)');
//        $dop -> bindValue(':hash', $hashs[$i], SQLITE3_FLOAT);
//        $dop -> bindValue(':balance', 0, SQLITE3_INTEGER);
//        $dop -> execute();
//        $dop = $con -> prepare('INSERT INTO balances (hash, balance) VALUES (:hash, :balance)');
//        $dop -> bindValue(':hash', $hashs[$i], SQLITE3_FLOAT);
//        $dop -> bindValue(':balance', 'Sophie', SQLITE3_TEXT);
//        $dop -> execute();
//    }
//    $records = $con -> query('SELECT * FROM balances');
//    while($row = $records -> fetchArray(SQLITE3_ASSOC)){
//        echo $row['hash'] . ' ' . $row['balance'] . '<br>';
//    }
//    $hash = 0.0;
//    $dop = $con -> prepare('SELECT * FROM users WHERE name = :name');
//    $dop -> bindValue(':name', 'AdolfHitler', SQLITE3_TEXT);
//    $records = $dop -> execute() -> fetchArray(SQLITE3_ASSOC);
//    $hash = $records['hash'];
//    $dop = $con -> prepare('UPDATE balance SET balance = :balance WHERE hash = :hash');
//    $dop -> bindValue(':hash', $hash, SQLITE3_FLOAT);
//    $dop -> bindValue(':balance', 88, SQLITE3_INTEGER);
//    $dop -> execute();
?>