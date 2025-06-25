//elements
let balance = document.getElementById('balance');
let number = document.getElementById('number');
let back_button = document.getElementById('back_button');
let main = document.getElementById('main');
let file_input = document.getElementById('nft');
let money = document.getElementById('money');
let bal = 0;
let sum_nft = document.getElementById('sum_nft');
let f = 'no';
document.querySelector('input[type=file]').onchange = (event) => {
    let reader = new FileReader();
    reader.onload = () => f = reader.result;
    reader.readAsDataURL(event.target.files[0]);
};
let nft_button = document.getElementById('nft_button');

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
async function to_back(){
    window.location.href = localStorage.getItem('action') + '.html';
}

//run functions
if(localStorage.getItem('hash') == null){
    to_options;
}

balance_function();

nfts();

back_button.addEventListener('click', to_back);

nft_button.addEventListener('click', mint);