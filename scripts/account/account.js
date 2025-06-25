//elements
let main_div2 = document.getElementById('main_div');
let back_button = document.getElementById('back_button');
let reduct_button = document.getElementById('reduct_button');
let friends_h2 = document.getElementById('friends_h2');
let nft_h2 = document.getElementById('nft_h2');
let applouse_button = document.getElementById('applouse_button');
let bans_button = document.getElementById('bans_button');
let name_p = document.getElementById('name_p');
let big_div = document.getElementById('big_div');
let avatar = document.getElementById('avatar');
let id_p = document.getElementById('id_p');
let about_p = document.getElementById('about_p');
let friend_button = document.getElementById('friend_button');
let balance = document.getElementById('balance');
let friends = document.getElementById('friends');
let nfts = document.getElementById('nfts');
let love_button = document.getElementById('love_button');
let love_p = document.getElementById('love_p');
let money = document.getElementById('money');

//functions
async function to_options(){
    window.location.href = 'options.html';
}
async function to_back(){
    window.location.href = localStorage.getItem('action') + '.html';
}
async function to_write(){
    localStorage.setItem('id3', localStorage.getItem('id2'));
    window.location.href = 'write.html'; 
}
async function friends_function(){
    if(friends.style.display != 'block'){
        friends.style.display = 'block';
    }else{
        friends.style.display = 'none';
    }
}
async function nft_function(){
    if(nfts.style.display != 'block'){
        nfts.style.display = 'block';
    }else{
        nfts.style.display = 'none';
    }
}

//run functions
if(localStorage.getItem('hash') == null){
    to_options();
}

get_data_of_account();

love_status();

get_balance();

your_lent();

your_friends();

your_nft();

back_button.addEventListener('click', to_back);

write_button.addEventListener('click', to_write);

friends_h2.addEventListener('click', friends_function);

nft_h2.addEventListener('click', nft_function);

applouse_button.addEventListener('click', applouse);

bans_button.addEventListener('click', bans);

friend_button.addEventListener('click', friend);