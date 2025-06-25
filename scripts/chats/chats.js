//elements
let games_button = document.getElementById('games_button');
let account_button = document.getElementById('account_button');
let account_img = document.getElementById('account_img');
let main = document.getElementById('main');
let chat_button = document.getElementById('chat_button');
let big_div = document.getElementById('big_div');
let gif = document.getElementById('gif');
let i = 0;
let scrol = 0;

//functions
async function to_options(){
    window.location.href = 'options.html';
}
function scr(i){
    let j = i + 1;
    for(i; i < j; i++){
        next_publication(i);
    return j;
}}
async function to_games(){
    localStorage.setItem('action', 'chats')
    window.location.href = 'iceberg.html';
}
async function scrolling(){
    if(window.pageYOffset - scrol > 100){
        i = scr(i);
        scrol = window.pageYOffset;
    }
}
async function to_chat(){
    window.location.href = 'chat.html';   
}
async function to_opti(){
    if(localStorage.getItem('hash') == null){
        window.location.href = 'options.html';
    }else{
        localStorage.setItem('action', 'chats');
        window.location.href = 'opti.html';
    }
}

//run functions
if(localStorage.getItem('hash') == null){
    to_options;
}

avatar();

unread();

i = scr(i);

games_button.addEventListener('click', to_games);

window.addEventListener('scroll', scrolling);

chat_button.addEventListener('click', to_chat);

account_button.addEventListener('click', to_opti);

gif.addEventListener('click', gif_function);