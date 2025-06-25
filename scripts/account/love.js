function back_money(love_text){
    money.style.display = 'none';
    love_text.style.display = 'none'
}
function back_money2(text_p, new_married, fall_love){
    money.style.display = 'none';
    text_p.style.display = 'none';
    new_married.style.display = 'none';
    fall_love.style.display = 'none';
}
function back_maney(text_p, sure_button){
    text_p.style.display = 'none';
    sure_button.style.display = 'none';
    money.style.display = 'none';
}
async function sure_function(text_p, sure_button){
    fetch('http://sema1903.ru/main/backend/new_married.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({'id': localStorage.getItem('id2'), 'hash': localStorage.getItem('hash')})
    })
    .then(res => res.json())
    .then(data => {
        text_p.textContent = 'Предложение руки и сердца отправлено';
        setTimeout(back_maney3(text_p, sure_button), 2500);
    })
}
async function new_married_function(new_married, fall_love, text_p){
    new_married.style.display = 'none';
    fall_love.style.display = 'none';
    text_p.textContent = 'Вы уверены, что хотите сделать предложение? Это очень серьезное и ответственное решение';
    let sure_button = document.createElement('button');
    sure_button.textContent = 'Сделать предложение';
    sure_button.addEventListener('click', sure_function(text_p, sure_button));
}
async function fall_love_function(new_married, fall_love, text_p){
    fetch('http://sema1903.ru/main/backend/fall_love.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({'id': localStorage.getItem('id2'), 'hash': localStorage.getItem('hash')})
    })
    .then(res => res.json())
    .then(data => {
        new_married.style.display = 'none';
        fall_love.style.display = 'none';
        text_p.style.display = 'none';
        let love_text = document.createElement('p');
        love_text.textContent = 'Вы расстались. Надеемся, так будет лучше';
        setTimeout(back_money(love_text), 2500);
    })
}
async function new_love(){
    fetch('http://sema1903.ru/main/backend/new_love.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({'id': localStorage.getItem('id2'), 'hash': localStorage.getItem('hash')})
    })
    .then(res => res.json())
    .then(data => {
        if(data['answer'] == 'yes'){
            let love_text = document.createElement('p');
            love_text.textContent = 'Предложение встречаться отправлено';
            money.appendChild(love_text);
            money.style.display = 'block';
            setTimeout(back_money(love_text), 2500);
        }else if(data['answer'] == 'in_love'){
            let love_text = document.createElement('p');
            love_text.textContent = 'Ты уже встречаешься';
            money.appendChild(love_text);
            money.style.display = 'block';
            setTimeout(back_money(love_text), 2500);
        }else if(data['answer'] == 'married'){
            let love_text = document.createElement('p');
            love_text.textContent = 'Ты уже состоишь в браке';
            money.appendChild(love_text);
            money.style.display = 'block';
            setTimeout(back_money(love_text), 2500);
        }else if(data['answer'] == 'not friend'){
            let love_text = document.createElement('p');
            love_text.textContent = 'Сначала необходимо подружиться';
            money.appendChild(love_text);
            money.style.display = 'block';
            setTimeout(back_money(love_text), 2500); 
        }
    })
}
async function change_love(){
    let text_p = document.createElement('p');
    text_p.textContent = 'Выбери действие';
    let fall_love = document.createElement('button');
    fall_love.textContent = 'Расстаться';
    new_married = document.createElement('button');
    new_married.textContent = 'Сделать предложение 💍';
    fall_love.addEventListener('click', fall_love_function(new_married, fall_love, text_p));
    new_married.addEventListener('click', new_married_function(new_married, fall_love, text_p));
    money.appendChild(text_p);
    money.appendChild(fall_love);
    money.appendChild(new_married);
    money.style.display = 'block';
    money.addEventListener('click', () => {
        setTimeout(back_money2(text_p, new_married, fall_love), 2500);
    })
}
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
            love_button.addEventListener('click', new_love);
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
            love_button.addEventListener('click', change_love);
        }else if (data['answer'] == 'married_with_me'){
            love_p.textContent = 'Статус отношений: в браке с тобой';
            love_button.textContent = 'Развестись';
        }
    })
}