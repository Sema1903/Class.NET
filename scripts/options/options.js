//elements
let back_button = document.getElementById('back_button');
let email = document.getElementById('email');
let password = document.getElementById('password');
let sign_button = document.getElementById('sign_button');
let registration_button = document.getElementById('registration_button');
let momey = document.getElementById('money');

//functions
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
};
async function e(text){
    let p = document.createElement('p');
    p.id = 'p';
    p.textContent = text;
    let image = document.createElement('img');
    image.src = 'images/baned.gif';
    image.style.width = '300px';
    money.appendChild(p);
    money.appendChild(image);
    money.style.display = 'block';
    setTimeout(w, 2500);
};
async function to_registration(){
    window.location.href = 'registration.html';
}
async function to_main(){
    window.location.href = 'chats.html';
}

//run functions
sign_button.addEventListener('click', sign);

back_button.addEventListener('click', to_main);

registration_button.addEventListener('click', to_registration);