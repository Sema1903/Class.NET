//elements
let chats_button = document.getElementById('chats_button');
let games_button = document.getElementById('games_button');
let surch_button = document.getElementById('surch_button');
let surch_input = document.getElementById('surch_input');
let mainest = document.getElementById('mainest');
let gif = document.getElementById('gif');

//functions
async function to_chats(){
    window.location.href = 'chats.html';
}
async function to_games(){
    localStorage.setItem('action', 'chat');
    window.location.href = 'iceberg.html';
}
async function to_options(){
    window.location.href = 'options.html';
}

//run functions
if(localStorage.getItem('hash') == null){
    to_options();
}
chats();
unread();

chats_button.addEventListener('click', to_chats);
games_button.addEventListener('click', to_games);

surch_button.addEventListener('click', search);

gif.addEventListener('click', gif_function);