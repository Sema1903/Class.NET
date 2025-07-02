async function create_club(){
    fetch('http://sema1903.ru/main/backend/create_club.php', {
        method: 'POST', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({'owner': localStorage.getItem('hash'), 'metadata': {'how': sum_nft.value, 'nft': f, 'creator': localStorage.getItem('hash')}})
    })
    .then(res => res.json())
    .then(data => {
        let dop_p = document.createElement('p');
        if(data['answer'] == 'id'){
            dop_p.textContent = 'Такой ID уже есть';
        }else if(data['answer'] == 'in_club'){
            dop_p.textConten = 'Ты уже состоишь в клубе';
        }else{
            dop_p.textContent = 'Клуб создан!';
        }
        money.appendChild(dop_p);
        money.style.display = 'block';
        setTimeout(() => {
            money.innerHTML = '';
            money.style.display = 'none';
        }, 2500);
    })
}