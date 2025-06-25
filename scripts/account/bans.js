async function bans(){
    fetch('http://sema1903.ru/main/backend/bans.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({'id': localStorage.getItem('id2')})
    })
    .then(res => res.json())
    .then(data => {
        bans_button.style.backgroundColor = 'green';
    })
}