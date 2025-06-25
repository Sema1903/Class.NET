//elements
let text = document.getElementById('text');
let submit = document.getElementById('submit');
let back = document.getElementById('back_button');
let f = 'no';
let file_input = document.getElementById('file');
let type = 'no';
let money = document.getElementById('money');
document.querySelector('input[type=file]').onchange = (event) => {
    let reader = new FileReader();
    reader.onload = () => f = reader.result;
    reader.readAsDataURL(event.target.files[0]);
}

//functions
async function to_options(){
    window.location.href = 'options.html';
}
async function w(){
    money.style.display = 'none';
    text.value = '';
    window.location.href = 'chats.html';
}
async function q(text){
    let p = document.createElement('p');
    p.id = 'p';
    p.textContent = text;
    money.appendChild(p);
    money.style.display = 'block';
    setTimeout(w, 2500);
};
async function to_main(){
    window.location.href = 'opti.html';
}

//run functions
if(localStorage.getItem('hash') == null){
    to_options;
}

submit.addEventListener('click', publicate);

back.addEventListener('click', to_main);