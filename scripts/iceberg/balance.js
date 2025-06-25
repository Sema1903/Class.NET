async function balance_function(){
    params = {hash: localStorage.getItem('hash')};
    url = new URL('http://sema1903.ru/main/backend/iceberg.php');
    url.search = new URLSearchParams(params);
    fetch(url, {headers: {'Accept': 'application/json'}})
    .then(response =>{return response.json()})
    .then(data => {
        balance.textContent = 'Баланс: ' + data['balance'] + ' 👏';
    });
}