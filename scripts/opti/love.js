async function love_status(){
    url = new URL('http://sema1903.ru/main/backend/my_love_status.php');
    url.search = new URLSearchParams(params);
    fetch(url, {headers: {'Accept': 'application/json'}})
    .then(response =>{return response.json()})
    .then(data => {
        if(data['answer'] == 'in_love'){
            love_p.textContent = 'Статус отношений: встречаюсь с ' + data['partner'];
        }else if(data['answer'] == 'married'){
            love_p.textContent = 'Статус отношений: в браке с ' + data['partner'];
        }else{
            love_p.textContent = 'Статус отношений: не встречаюсь';
        }
    })
}