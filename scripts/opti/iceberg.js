async function iceberg(){
    url = new URL('http://sema1903.ru/main/backend/iceberg.php');
    params = {hash: localStorage.getItem('hash')};
    url.search = new URLSearchParams(params)
    fetch(url, {headers: {'Accept': 'application/json'}})
    .then(response => {return response.json()})
    .then(data =>{
        balance.textContent = 'Баланс: ' + data['balance'] + ' 👏';
    })
}