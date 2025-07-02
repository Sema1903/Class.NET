let text_p = document.createElement('p');
text_p.style.display = 'none';
let button1 = document.createElement('button');
button1.style.display = 'none';
let button2 = document.createElement('button');
button2.style.display = 'none';
let button3 = document.createElement('button');
button3.style.display = 'none';





async function love_status(){
    params = {id_hash: localStorage.getItem('id2') + ' ' + localStorage.getItem('hash')};
    url = new URL('http://sema1903.ru/main/backend/love_status.php');
    url.search = new URLSearchParams(params);
    fetch(url, {headers: {'Accept': 'application/json'}})
    .then(response => {return response.json()})
    .then(data =>{
        if(data['answer'] == 'no'){
            love_p.textContent = 'Статус отношений: не встречаюсь';
            love_button.textContent = 'Встречаться';
            love_button.addEventListener('click', () => {
                fetch('http://sema1903.ru/main/backend/new_love.php', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({'id': localStorage.getItem('id2'), 'hash': localStorage.getItem('hash')})
                })
                .then(res => res.json())
                .then(data => {
                    if(data['answer'] == 'yes'){
                        text_p.style.display = 'block';
                        text_p.textContent = 'Предложение встречаться отправлено';
                        money.appendChild(text_p);
                        money.style.display = 'block';
                        setTimeout(() => {
                            money.innerHTML = '';
                            money.style.display = 'none';
                        }
                        , 2500);
                    }else if(data['answer'] == 'in_love'){
                        text_p.style.display = 'block';
                        text_p.textContent = 'Ты уже встречаешься';
                        money.appendChild(text_p);
                        money.style.display = 'block';
                        setTimeout(() => {
                            money.innerHTML = '';
                            money.style.display = 'none';
                        }, 2500);
                    }else if(data['answer'] == 'married'){
                        text_p.style.display = 'block';
                        text_p.textContent = 'Ты уже состоишь в браке';
                        money.appendChild(text_p);
                        money.style.display = 'block';
                        setTimeout(() => {
                            money.innerHTML = '';
                            money.style.display = 'none';
                        }, 2500);
                    }else if(data['answer'] == 'not friend'){
                        text_p.style.display = 'block'
                        text_p.textContent = 'Сначала необходимо подружиться';
                        money.appendChild(text_p);
                        money.style.display = 'block';
                        setTimeout(() => {
                            money.innerHTML = '';
                            money.style.display = 'none';
                        }, 2500);
                    }
                })
            });
        }else if (data['answer'] == 'in_love_private'){
            love_p.textContent = 'Статус отношений: встречаюсь';
            love_button.style.display = 'none';
        }else if (data['answer'] == 'in_love_public'){
            love_p.textContent = 'Статус отношений: встречаюсь с ' + data['partner'];
            love_button.style.display = 'none';
        }else if (data['answer'] == 'in_married'){
            love_p.textContent = 'Статус отношений: в браке с ' + data['partner'];
            love_button.style.display = 'none';
        }else if (data['answer'] == 'in_love_with_me'){
            love_p.textContent = 'Статус отношений: встречаюсь с тобой';
            love_button.textContent = 'Изменить отношения';
            love_button.addEventListener('click', () => {
                text_p.style.display = 'block';
                text_p.textContent = 'Выбери действие';
                button1.style.display = 'block';
                button1.textContent = 'Расстаться';
                button2.style.display = 'block';
                button2.textContent = 'Сделать предложение 💍';
                button3.style.display = 'block';
                button3.textContent = 'Сделать отношения публичными';
                button1.addEventListener('click', () => {
                    fetch('http://sema1903.ru/main/backend/fall_love.php', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({'id': localStorage.getItem('id2'), 'hash': localStorage.getItem('hash')})
                    })
                    .then(res => res.json())
                    .then(data => {
                        button1.style.display = 'none';
                        button2.style.display = 'none';
                        button3.style.display = 'none';
                        text_p.textContent = 'Вы расстались. Надеемся, так будет лучше';
                        setTimeout(() => {
                            money.innerHTML = '';
                            money.style.display = 'none';
                        }, 2500);
                    })
                });
                button2.addEventListener('click', () => {
                    fetch('http://sema1903.ru/main/backend/new_married.php', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({'id': localStorage.getItem('id2'), 'hash': localStorage.getItem('hash')})
                    })
                    .then(res => res.json())
                    .then(data => {
                        button1.style.display = 'none';
                        button2.style.display = 'none';
                        button3.style.display = 'none';
                        text_p.textContent = 'Предложение руки и сердца отправлено 💍';
                        setTimeout(() => {
                            money.innerHTML = '';
                            money.style.display = 'none';
                        }, 2500);
                    })
                });
                button3.addEventListener('click', () => {
                    fetch('http://sema1903.ru/main/backend/make_public.php', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({'id': localStorage.getItem('id2'), 'hash': localStorage.getItem('hash')})
                    })
                    .then(res => res.json())
                    .then(data => {
                        button1.style.display = 'none';
                        button2.style.display = 'none';
                        button3.style.display = 'none';
                        text_p.textContent = 'Теперь ваши отношения открыты';
                        setTimeout(() => {
                            money.innerHTML = '';
                            money.style.display = 'none';
                        }, 2500);
                    })
                })
                money.appendChild(text_p);
                money.appendChild(button1);
                money.appendChild(button2);
                money.appendChild(button3);
                money.style.display = 'block';
                money.addEventListener('click', () => {
                    money.innerHTML = '';
                    money.style.display = 'none';
                })
            });
        }else if (data['answer'] == 'married_with_me'){
            love_p.textContent = 'Статус отношений: в браке с тобой';
            love_button.textContent = 'Развестись';
            love_button.addEventListener('click', () => {
                    fetch('http://sema1903.ru/main/backend/fall_married.php', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({'id': localStorage.getItem('id2'), 'hash': localStorage.getItem('hash')})
                    })
                    .then(res => res.json())
                    .then(data => {
                        money.innerHTML = '';
                        money.style.display = 'none';
                    })
            })
        }
    })
}