async function avatar(){
    params = {hash: localStorage.getItem('hash')};
    url = new URL('http://sema1903.ru/main/backend/avatar.php');
    url.search = new URLSearchParams(params);
    fetch(url, {headers: {'Accept': 'application/json'}})
    .then(response =>{return response.json()})
    .then(data =>{
        if(data['avatar'] != '' && data['avatar'] != null){
            account_img.src = data['avatar'];
        }
        if(data['avatar'] == 'images/baned.gif'){
            localStorage.setItem('hash', null);
        }
    })
}