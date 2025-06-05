let chats_button = document.getElementById('chats_button');
let games_button = document.getElementById('games_button');
let surch_button = document.getElementById('surch_button');
let surch_input = document.getElementById('surch_input');
let main = document.getElementById('main');
let params = {hash: localStorage.getItem('hash')};
    let url = new URL('http://sema1903.ru/main/chat.php');
    url.search = new URLSearchParams(params);
    fetch(url, {headers: {'Accept': 'application/json'}})
        .then(response =>{return response.json()})
        .then(data => {
            let q = [];
            for(let i = 0; i < data.length; i++){
                if(!q.includes(data[i]['id'])){
                    q.push(data[i]['id']);
                    let main_div = document.createElement('div');
                    let avatar = document.createElement('img');
                    let name1 = document.createElement('p');
                    avatar.className = 'avatar_img';
                    name1.className = 'name';
                    if(data[i]['avatar'] != ''){
                        avatar.src = data[i]['avatar']
                    }else{
                        avatar.src = 'images/unknown.png';
                    }
                    name1.textContent = data[i]['name'];
                    if(data[i]['read'] == 'no'){
                        main_div.className = 'main_div';
                    }else{
                        main_div.className = 'read_main_div';
                    }
                    if(data[i]['read'] == 'no' && data[i]['my'] == 'yes'){
                        main_div.style.backgroundColor = 'rgb(40, 255, 183)';
                    }
                    main_div.appendChild(name1);
                    main_div.appendChild(avatar);
                    main_div.addEventListener('click', () =>{
                        localStorage.setItem('id3', data[i]['id']);
                        window.location.href = 'write.html';
                    })
                    main.appendChild(main_div);
                }
            }
        })
chats_button.addEventListener('click', () =>{
    window.location.href = 'chats.html';
});
games_button.addEventListener('click', () =>{
    localStorage.setItem('action', 'chat');
    window.location.href = 'iceberg.html';
});
surch_button.addEventListener('click', ()=>{
    let params = {id: surch_input.value};
    let url = new URL('http://sema1903.ru/main/search.php');
    url.search = new URLSearchParams(params);
    fetch(url, {headers: {'Accept': 'application/json'}})
        .then(response =>{return response.json()})
        .then(data => {
            if(data['answer'] == 'no'){
                alert('Такого ID не найдено');
            }else{
                localStorage.setItem('id2', surch_input.value);
                localStorage.setItem('action', 'chat');
                window.location.href = 'account.html';
            }
})})