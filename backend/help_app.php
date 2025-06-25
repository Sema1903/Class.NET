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
//    $con -> exec('DROP TABLE loves');
//  $con -> exec('CREATE TABLE balance (hash FLOAT, balance INT)');
//	$con -> exec('CREATE TABLE users (name TEXT, email TEXT, password INT, avatar TEXT, id TEXT, about TEXT, hash INT, friends TEXT, bans INT, status TEXT)');
//	$con -> exec('CREATE TABLE lent(id TEXT, text TEXT, file TEXT, ip INT, likes INT, type TEXT)');
//	$con -> exec('CREATE TABLE chats(autor_id TEXT, giver_id TEXT, text TEXT, file TEXT, read TEXT, special TEXT, type TEXT);');
//	$con -> exec('CREATE TABLE balances (hash FLOAT, balance TEXT);');
//	$con -> exec('CREATE TABLE nfts (token FLOAT, owner FLOAT, creator TEXT, cost INT, nft TEXT, status TEXT);');
//  $con -> exec('CREATE TABLE gif (hash FLOAT)');
//  $con -> exec('CREATE TABLE loves (first FLOAT, second FLOAT, status TEXT)');
//con.execute('INSERT INTO users(name, email, password, avatar, id, about, hash, friends, bans, status) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', ('Sophie', 'krismironova04@mail.ru', 1.0672147442793281e+26, '', 'Sophie', 'Твой друг и помощник в социальной сети Друзья 2.0', 6.574042824760661e+28, '', 0, 'active'))*/

/*    $records = $con -> query('SELECT * FROM loves');
    while($row = $records -> fetchArray(SQLITE3_ASSOC)){
        $dop = $con -> prepare('SELECT * FROM users WHERE hash = :hash');
        $dop -> bindValue(':hash', $row['first'], SQLITE3_FLOAT);
        $records2 = $dop -> execute() -> fetchArray(SQLITE3_ASSOC);
        echo $records2['id'] . ' ';
        $dop = $con -> prepare('SELECT * FROM users WHERE hash = :hash');
        $dop -> bindValue(':hash', $row['second'], SQLITE3_FLOAT);
        $records2 = $dop -> execute() -> fetchArray(SQLITE3_ASSOC);
        echo $records2['id'] . ' ';
        echo $row['status'] . '<br>';
    }*/
?>