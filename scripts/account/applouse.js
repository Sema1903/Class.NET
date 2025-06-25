async function applouse(){
    if(localStorage.getItem('hash') != null){
        fetch('http://sema1903.ru/main/backend/applouse.php', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'id': localStorage.getItem('id2'), 'hash': localStorage.getItem('hash')})
        })
        .then(res => res.json())
        .then(data => {
            if(data['answer'] == 'yes'){
                applouse_button.style.backgroundColor = 'green';
            }else{
                applouse_button.style.backgroundColor = 'red';
            }
        })
    }
}