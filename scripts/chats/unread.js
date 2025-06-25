async function unread(){
    params = {hash: localStorage.getItem('hash')};
    url = new URL('http://sema1903.ru/main/backend/unread.php');
    url.search = new URLSearchParams(params);
    fetch(url, {headers: {'Accept': 'application/json'}})
        .then(response =>{return response.json()})
        .then(data => {
            if(data['answer'] == 'yes'){
                chat_button.style.display = 'blue';
            }
    })
}