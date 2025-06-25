async function registration(){
    fetch('http://sema1903.ru/main/backend/reduct.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({'name': name1.value, 'avatar': ava, 'hash': localStorage.getItem('hash'), 'about': about.value})
    })
        .then(res => res.json())
        .then(data => {
            q('Изменения сохранены');
        })
}