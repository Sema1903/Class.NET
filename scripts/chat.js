let chats_button = document.getElementById('chats_button');
let games_button = document.getElementById('games_button');
let surch_button = document.getElementById('surch_button');
let surch_input = document.getElementById('surch_input');
let mainest = document.getElementById('mainest');
let main = document.getElementById('main');
let gif = document.getElementById('gif');
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
            let people_div = document.createElement('div');
            people_div.id = 'people_div';
            if(data.length == 0){
                let people_p = document.createElement('p');
                people_p.textContent = 'По этому ID и имени никого не найдено';
                people_p.style.color = 'white';
                people_div.appendChild(people_p);
            }else{
                for(let i = 0; i < data.length; i++){
                    let man_div = document.createElement('div');
                    man_div.className = 'man_div';
                    let man_avatar = document.createElement('img');
                    man_avatar.className = 'man_avatar';
                    if(data[i]['avatar'] != ''){
                        man_avatar.src = data[i]['avatar'];
                    }else{
                        man_avatar.src = 'images/unknown.png';
                    }
                    let man_name = document.createElement('p');
                    man_name.className = 'man_name';
                    man_name.textContent = data[i]['name'];
                    man_div.appendChild(man_avatar);
                    man_div.appendChild(man_name);
                    people_div.appendChild(man_div);
                    man_div.addEventListener('click', () => {
                        localStorage.setItem('id2', data[i]['id']);
                        window.location.href = 'account.html';
                    })
                }
            }
            mainest.appendChild(people_div);
            people_div.addEventListener('click', () => {
                people_div.style.display = 'none';
            })
})});
gif.addEventListener('click', () => {
    if(localStorage.getItem('hash') != null){
        fetch('http://sema1903.ru/main/gif.php', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'hash': localStorage.getItem('hash')})
        })
        .then(res => res.json())
        .then(data => {
            if(data['answer'] == 'yes'){
                let timer;
                let turn = 0;
                function turnOn() {
                  timer = setInterval(turnFan, 200);
                  let gif = document.getElementById("on");
                  gif.disabled = true;
                }
                
                function turnOff() {
                  clearInterval(timer);
                  let gif = document.getElementById("on");
                  gif.disabled = false;
                }
                
                function turnFan() {
                  let gif = document.getElementById("myFan");
                  turn += 60;
                  gif.style.transform = "rotate("+ (turn % 360) +"deg)"
                }
            }
        })
    }
})