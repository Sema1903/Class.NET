async function friend(){
    if(localStorage.getItem('hash') != null){
        fetch('http://sema1903.ru/main/backend/friend.php', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'hash': localStorage.getItem('hash'), 'id': localStorage.getItem('id2')})
        })
            .then(res => res.json())
            .then(data => {
                if(data['answer'] == 'yes'){
                    friend_button.disabled = true;
                    friend_button.style.background = 'green';
                }
            })
    }
}