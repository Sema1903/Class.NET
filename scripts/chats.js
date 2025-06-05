let games_button = document.getElementById('games_button');
let account_button = document.getElementById('account_button');
let account_img = document.getElementById('account_img');
let main = document.getElementById('main');
let chat_button = document.getElementById('chat_button');
let i = 0;
if(localStorage.getItem('hash') != null){
    let params = {hash: localStorage.getItem('hash')};
    let url = new URL('http://sema1903.ru/main/avatar.php');
    url.search = new URLSearchParams(params);
    fetch(url, {headers: {'Accept': 'application/json'}})
        .then(response =>{return response.json()})
        .then(data =>{
            if(data['avatar'] != '' && data['avatar'] != null){
                account_img.src = data['avatar'];
            }
        })
}
i = scr(i);
function scr(i){
    let j = i + 1;
    for(i; i < j; i++){
        next_publication(i);
    return j;
}}
function to_games(){
    localStorage.setItem('action', 'chats')
    window.location.href = 'iceberg.html';
}
function next_publication(i){
    let params = {number: i};
    let url = new URL('http://sema1903.ru/main/lent.php');
    url.search = new URLSearchParams(params);
    fetch(url, {headers: {'Accept': 'application/json'}})
        .then(response =>{return response.json()})
        .then(data => {
            if(data['number'] != 0){
                let autor_h3 = document.createElement('h3');
                let text_p = document.createElement('p');
                let main_div = document.createElement('div');
                let head_div = document.createElement('div');
                let avatar = document.createElement('img');
                let file_name = data['file']
                autor_h3.className = 'autor_h3';
                avatar.className = 'avatar';
                text_p.className = 'text_p';
                text_p.style.color = 'black';
                main_div.className = 'main_div';
                head_div.className = 'head_div';
                autor_h3.innerText = data['autor'];
                if(data['avatar'] != ''){
                    avatar.src = data['avatar'];
                }else{
                    avatar.src = 'images/unknown.png';
                }
                text_p.innerText = data['text'];
                head_div.appendChild(avatar);
                head_div.appendChild(autor_h3);
                main_div.appendChild(head_div);
                main_div.appendChild(text_p);
                main.appendChild(main_div);
                head_div.addEventListener('click', () =>{
                    localStorage.setItem('id2', data['id']);
                    localStorage.setItem('action', 'chats');
                    window.location.href = 'account.html';
                })
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
            }});
}
games_button.addEventListener('click', to_games);
let scrol = 0;
window.addEventListener('scroll', () =>{
    if(window.pageYOffset - scrol > 100){
        i = scr(i);
        scrol = window.pageYOffset;
    }
})
chat_button.addEventListener('click', () =>{
    window.location.href = 'chat.html';
});
account_button.addEventListener('click', ()=>{
    if(localStorage.getItem('hash') == null){
        window.location.href = 'options.html';
    }else{
        localStorage.setItem('action', 'chats');
        window.location.href = 'opti.html';
    }

})