async function gift_function(){
    let muny = document.createElement('input');
    let p = document.createElement('p');
    let submit = document.createElement('button');
    p.textContent = 'Введи данные перевода';
    muny.placeholder = 'Введи сумму';
    let adress = document.createElement('input');
    adress.placeholder = 'Введи ID получателя';
    adress.id = 'muny';
    p.id = 'p';
    submit.textContent = 'Перевести';
    muny.id = 'muny';
    submit.id = 'submit';
    money.appendChild(p);
    money.appendChild(muny);
    money.appendChild(adress);
    money.appendChild(submit);
    money.addEventListener('dblclick', ()=>{
        submit.style.display = 'none';
        p.style.display = 'none';
        money.style.display = 'none';
        adress.style.display = 'none';
        muny.style.display = 'none';
    })
    money.style.display = 'block';
    submit.addEventListener('click', ()=>{
        if(Number(muny.value) > Number(balance.textContent.split(' ')[1])){
            q('Недостаточно средств');
        }else if(!Number.isInteger(Number(muny.value)) || Number(muny.value) <= 0){
            q('Некоректный ввод');
        }else{
            fetch('http://sema1903.ru/main/backend/gift_ice.php', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({'id_seller': localStorage.getItem('hash'), 'how': muny.value, 'id_giver': adress.value})
            })
                .then(res => res.json())
                .then(data => {
                    if(data['answer'] == 'no'){
                        q('Такого ID не найдено');
                    }else{
                        q('Перевод прошел успешно');
                    }})
    }
})
}