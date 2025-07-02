//elements
let love_p = document.getElementById('love_p');
let club_p = document.getElementById('club_p');
let club_button = document.getElementById('club_button');
let name_p = document.getElementById('name_p');
let big_div = document.getElementById('big_div');
let main_div2 = document.getElementById('main_div');
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
let friends_h2 = document.getElementById('friends_h2');
let nft_h2 = document.getElementById('nft_h2');
let money = document.getElementById('money');
let reduct_button = document.getElementById('reduct_button');
let gift_ice = document.getElementById('gift_ice');

//functions
async function to_options(){
    window.location.href = 'options.html';   
}
async function w(){
    money.style.display = 'none';
    location.reload(true);
}
async function q(text){
    let p = document.createElement('p');
    p.id = 'p';
    p.textContent = text;
    money.appendChild(p);
    money.style.display = 'block';
    setTimeout(w, 2500);
}
async function to_chats(){
    window.location.href = 'chats.html';
}
async function good_buy(){
    localStorage.clear();
    window.location.href = 'chats.html'; 
}
async function to_reduct(){
    window.location.href = 'reduct.html';
}
async function to_publicate(){
    window.location.href = 'publicate.html';
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
    to_options;
}

get_data();

love_status();

my_lent();

club_status();

iceberg();

my_friends();

my_nft();

back_button.addEventListener('click', to_chats);

club_button.addEventListener('click', new_club);

buy_button.addEventListener('click', good_buy);

reduct_button.addEventListener('click', to_reduct);

gift_ice.addEventListener('click', gift_function);

publicate_button.addEventListener('click', to_publicate);

friends_h2.addEventListener('click', friends_function);

nft_h2.addEventListener('click', nft_function);