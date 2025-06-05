let name_p = document.getElementById('name_p');
let email = document.getElementById('email');
let back_button = document.getElementById('back_button');
let buy_button = document.getElementById('buy_button');
let avatar = document.getElementById('avatar');
let params = {hash: localStorage.getItem('hash')};
let id_p = document.getElementById('id_p');
let about_p = document.getElementById('about_p');
let balance = document.getElementById('balance');
let nfts = document.getElementById('nfts');
let friends = document.getElementById('friends');
let publicate_button = document.getElementById('publicate_button');
function w(){
    money.style.display = 'none';
    location.reload(true);
}
function q(text){
    let p = document.createElement('p');
    p.id = 'p';
    p.textContent = text;
    money.appendChild(p);
    money.style.display = 'block';
    setTimeout(w, 5000);
}
let money = document.getElementById('money');
let reduct_button = document.getElementById('reduct_button');
let url = new URL('http://sema1903.ru/main/opti.php');
localStorage.setItem('action', 'opti');
let gift_ice = document.getElementById('gift_ice');
url.search = new URLSearchParams(params);
fetch(url, {headers: {'Accept': 'application/json'}})
    .then(response =>{return response.json()})
    .then(data => {
        name_p.textContent = 'Имя: ' + data['name'];
        email.textContent = 'Email: ' + data['email'];
        id_p.textContent = 'ID: ' + data['id'];
        if(data['about'] != ''){
        about_p.textContent = 'Обо мне: ' + data['about'];
        }
        else{
            about_p.textContent = 'Обо мне: Привет всем! Я использую Class.NET!'
        }
        balance.textContent = 'Баланс: 0 ICE';
        if(data['avatar'] != ''){
            avatar.src = data['avatar'];
        }else{
            avatar.src = 'images/unknown.png'; 
        }})
url = new URL('http://sema1903.ru/main/iceberg.php');
params = {hash: localStorage.getItem('hash')};
url.search = new URLSearchParams(params)
fetch(url, {headers: {'Accept': 'application/json'}})
        .then(response => {return response.json()})
        .then(data =>{
            console.log(data);
            balance.textContent = 'Баланс: ' + data['balance'] + ' ICE';
        })
url = new URL('http://sema1903.ru/main/my_friends.php');
url.search = new URLSearchParams(params);
fetch(url, {headers: {'Accept': 'application/json'}})
    .then(response =>{return response.json()})
    .then(data => {
        if(data.length != 0){
            for(let i = 0; i < data.length; i++){
                let friend = document.createElement('div');
                friend.className = 'friend';
                let favatar = document.createElement('img');
                favatar.id = 'favatar';
                if(data[i]['avatar'] != ''){
                    favatar.src = data[i]['avatar'];
                }else{
                    favatar.src = 'images/unknown.png';
                }
                let fname = document.createElement('p');
                fname.textContent = data[i]['name'];
                friend.appendChild(favatar);
                friend.appendChild(fname);
                friend.addEventListener('click', ()=>{
                    localStorage.setItem('action', 'opti');
                    localStorage.setItem('id2', data[i]['id']);
                    window.location.href = 'account.html';
                });
                friends.appendChild(friend);
            }
        }else{
            let answer = document.createElement('p');
            answer.textContent = 'Друзей пока нет';
            answer.style.marginLeft = '50px';
            friends.appendChild(answer);
        }
});
back_button.addEventListener('click', () => {
    window.location.href = 'chats.html';
});
buy_button.addEventListener('click', () => {
    localStorage.clear();
    window.location.href = 'chats.html';
});
reduct_button.addEventListener('click', ()=>{
    window.location.href = 'reduct.html';
});
let params2 = {hash: localStorage.getItem('hash')};
let url1 = new URL('http://sema1903.ru/main/my_lent.php');
url1.search = new URLSearchParams(params2);
fetch(url1, {headers: {'Accept': 'application/json'}})
    .then(response =>{return response.json()})
    .then(data => {
        for(let i = 0; i < data.length; i++){
            if(data[i]['number'] != 0){
                let autor_h3 = document.createElement('h3');
                let text_p = document.createElement('p');
                let main_div = document.createElement('div');
                let head_div = document.createElement('div');
                let avatar = document.createElement('img');
                let file_name = data[i]['file']
                autor_h3.className = 'autor_h3';
                avatar.className = 'avatar';
                text_p.className = 'text_p';
                main_div.className = 'main_div';
                head_div.className = 'head_div';
                autor_h3.innerText = data[i]['autor'];
                if(data[i]['avatar'] != ''){
                    avatar.src = data[i]['avatar'];
                }else{
                    avatar.src = 'images/unknown.png';
                }
                text_p.innerText = data[i]['text'];
                head_div.appendChild(avatar);
                head_div.appendChild(autor_h3);
                main_div.appendChild(head_div);
                main_div.appendChild(text_p);
                main.appendChild(main_div);
                if (file_name != 'no' && data['type'] == 'image'){
                    let file = document.createElement('img');
                    file.src = file_name;
                    file.className = 'file';
                    main_div.appendChild(file);
                }else if(file_name != 'no' && data['type'] == 'video'){
                    let file = document.createElement('video');
                    file.src = file_name;
                    file.className = 'file';
                    file.autoplay = true;
                    file.controls = true;
                    file.muted = true;
                    file.loop = true;
                    main_div.appendChild(file);
                }else if(file_name != 'no' && data['type'] == 'audio'){
                    let file = document.createElement('audio');
                    file.src = file_name;
                    file.controls = true;
                    file.loop = true;
                    file.muted = false;
                    main_div.appendChild(file);
                }else if(file_name != 'no' && data['type'] == 'download'){
                    let file = document.createElement('a');
                    file.href = file_name;
                    file.textContent = 'Скачать файл';
                    file.download = true;
                    main_div.appendChild(file);
                }
        }        
}});
let url2 = new URL('http://sema1903.ru/main/my_nft.php');
url2.search = new URLSearchParams(params2);
fetch(url2, {headers: {'Accept': 'application/json'}})
    .then(response =>{return response.json()})
    .then(data => {
        for(let i = 0; i < data.length; i++){
            let popup = document.createElement('div');
            popup.id = 'popup';
            let nft_number = document.createElement('h2');
            nft_number.id = 'nft_number';
            let nft_author = document.createElement('p');
            nft_author.id = 'nft_author';
            let nft_img = document.createElement('img');
            nft_img.id = 'nft_img';
            let nft_cost = document.createElement('p');
            nft_cost.id = 'nft_cost';
            let sale_button = document.createElement('button');
            sale_button.id = 'sale_button';
            sale_button.textContent = 'Выставить на продажу';
            let gift_button = document.createElement('button');
            gift_button.id = 'gift';
            let dop_nft = document.createElement('div')
            dop_nft.className = 'dop_div';
            gift_button.textContent = 'Подарить';
            popup.appendChild(nft_img);
            popup.appendChild(dop_nft);
            popup.appendChild(nft_number);
            popup.appendChild(nft_author);
            popup.appendChild(nft_cost);
            popup.appendChild(sale_button);
            popup.appendChild(gift_button);
            let popupest = document.getElementById('popupest');
            popupest.appendChild(popup);
            let nft_button = document.createElement('img');
            nft_button.className = 'nft_img';
            nft_button.src = data[i]['nft'];
            let dopest = document.createElement('div');
            dopest.id = 'dopest';
            dopest.addEventListener('click', ()=>{
                nft_img.src = data[i]['nft'];
                nft_author.textContent = 'Создатель: ' + data[i]['creator'];
                nft_cost.textContent = 'Стоимость: ' + data[i]['cost'] + ' ICE';
                nft_number.textContent = 'Номер NFT: ' + data[i]['ip'];
                popup.style.display = 'block';
            });
            popup.addEventListener('click', ()=>{
                popup.style.display = 'none';
            });
            sale_button.addEventListener('click', ()=>{

                q('Эта функция пока недоступна,но скоро она появится))');

/*                let muny = document.createElement('input');
                let p = document.createElement('p');
                let submit = document.createElement('button');
                p.textContent = 'За сколько ICE хочешь продать?';
                muny.placeholder = 'Введи сумму';
                p.id = 'p';
                submit.textContent = 'Выставить на продажу';
                muny.id = 'muny';
                submit.id = 'submit';
                money.appendChild(p);
                money.appendChild(muny);
                money.appendChild(submit);
                money.style.display = 'block';
                money.addEventListener('dblclick', ()=>{
                    money.style.display = 'none';
                })
                submit.addEventListener('click', ()=>{
                    fetch('http://127.0.0.1:80/buy_nft.php', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({'hash': localStorage.getItem('hash'), 'how': muny.value, 'ip': data[i]['ip'], 'nft': data[i]['nft']})
                    })
                        .then(res => res.json())
                        .then(data => {
                            q('Выслевлено на продажу');
                        })
                })*/
            })
            gift_button.addEventListener('click', ()=>{
                let muny = document.createElement('input');
                let p = document.createElement('p');
                let submit = document.createElement('button');
                p.textContent = 'Введи ID того, кому хочешь подарить';
                muny.placeholder = 'Введи ID';
                p.id = 'p';
                submit.textContent = 'Подарить';
                muny.id = 'muny';
                submit.id = 'submit';
                money.appendChild(p);
                money.appendChild(muny);
                money.appendChild(submit);
                money.addEventListener('dblclick', ()=>{
                    money.style.display = 'none';
                });
                money.style.display = 'block';
                submit.addEventListener('click', ()=>{

                    q('Эта йункция пока ндоступна, но она скоро появится. Ждите)))');


/*                    fetch('http://127.0.0.1:80/gift.php', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({'number': data[i]['ip'], 'adress': muny.value, 'hash': localStorage.getItem('hash')})
                    })
                        .then(res => res.json())
                        .then(data => {
                            if(data['answer'] == 'no'){
                                q("Неверный IP");
                            }else{
                                q('Подарко подарен');
                            }
                        });*/
            })})
            dopest.style.left = String((i % 4)*190) + 'px';
            dopest.style.top = String(Math.trunc((i) / 4) * 180) + 'px';
            dopest.style.zIndex = String(i + 3);
            popup.style.zIndex = String(i + 4);
            nfts.appendChild(nft_button);
            nfts.appendChild(dopest);
        }
    });
gift_ice.addEventListener('click', ()=>{
    
    
    
    q('Эта функция пока недоступна но скоро она появится');



/*    let muny = document.createElement('input');
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
        money.style.display = 'none';
    })
    money.style.display = 'block';
    submit.addEventListener('click', ()=>{
        if(Number(muny.value) > Number(balance.textContent.split(' ')[1])){
            q('Недостаточно средств');
        }else{
            fetch('http://127.0.0.1:5000/gift_ice', {
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
})*/
});
publicate_button.addEventListener('click', ()=>{
    window.location.href = 'publicate.html';
})