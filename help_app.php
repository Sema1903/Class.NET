<?php
	$con = new SQLite3('exercises.db');
    $con -> exec('DROP TABLE users');
    $con -> exec('DROP TABLE chats');
    $con -> exec('DROP TABLE price');
    $con -> exec('DROP TABLE lent');
    $con -> exec('DROP TABLE balances');
    $con -> exec('DROP TABLE nfts');
    $con -> exec('DROP TABLE preds');
	$con -> exec('CREATE TABLE users (name TEXT, email TEXT, password INT, avatar TEXT, id TEXT, about TEXT, hash INT, friends TEXT, bans INT, status TEXT)');
	$con -> exec('CREATE TABLE lent(id TEXT, text TEXT, file TEXT, ip INT, likes INT, type TEXT)');
	$con -> exec('CREATE TABLE chats(autor_id TEXT, giver_id TEXT, text TEXT, file TEXT, read TEXT, special TEXT, type TEXT);');
	$con -> exec('CREATE TABLE price(id INT, price TEXT);');
	$con -> exec('CREATE TABLE balances (hash FLOAT, balance INT);');
	$con -> exec('CREATE TABLE nfts (token FLOAT, owner FLOAT, creator TEXT, cost INT, nft TEXT);');
	$con -> exec('CREATE TABLE preds (token FLOAT, owner FLOAT, creator TEXT, cost INT, sum INT, nft TEXT)');
//con.execute('INSERT INTO balances (hash, balance) VALUES (?, ?)', (6.574042824760661e+28, 1000000))
//con.execute('INSERT INTO price(id, price) VALUES(?, ?);', (1, '2.0'))
//con.execute('INSERT INTO users(name, email, password, avatar, id, about, hash, friends, bans, status) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', ('Sophie', 'krismironova04@mail.ru', 1.0672147442793281e+26, '', 'Sophie', 'Твой друг и помощник в социальной сети Друзья 2.0', 6.574042824760661e+28, '', 0, 'active'))
?>