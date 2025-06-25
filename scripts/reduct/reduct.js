//elements
let back_button = document.getElementById('back_button');
let name1 = document.getElementById('name');
let registration_button = document.getElementById('registration_button');
let avatar = document.querySelector('input[type=file]');
let ava = '';
let money = document.getElementById('money');
let about = document.getElementById('about');
document.querySelector('input[type=file]').onchange = (event) => {
    toBase64(event.target.files[0], ne);
}

//functions
async function to_options(){
    window.location.href = 'options.html';
}
async function w(){
    money.style.display = 'none';
    window.location.href = 'opti.html';
}
async function q(text){
    let p = document.createElement('p');
    p.id = 'p';
    p.textContent = text;
    money.appendChild(p);
    money.style.display = 'block';
    setTimeout(w, 2500);
};
async function toBase64(file, onSuccess) {
    let reader = new FileReader();
    reader.onload = () => onSuccess(reader.result);
    reader.readAsDataURL(file);
}
async function ne(a){
    ava = a;
}
async function to_main(){
    window.location.href = 'opti.html';
}

//run functions
if(localStorage.getItem('hash') == null){
    to_options;
}

registration_button.addEventListener('click', registration);

back_button.addEventListener('click', to_main);