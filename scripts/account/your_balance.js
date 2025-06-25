async function get_balance(){
    params = {id: localStorage.getItem('id2')};
    url = new URL('http://sema1903.ru/main/backend/your_iceberg.php');
    url.search = new URLSearchParams(params);
    fetch(url, {headers: {'Accept': 'application/json'}})
    .then(response => {return response.json()})
    .then(data =>{
        balance.textContent = 'Баланс: ' + data['balance'] + ' 👏';
    })
}