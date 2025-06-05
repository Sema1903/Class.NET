let back_button = document.getElementById('back_button');
let email = document.getElementById('email');
let password = document.getElementById('password');
let sign_button = document.getElementById('sign_button');
let registration_button = document.getElementById('registration_button');
let momey = document.getElementById('money');
function w(){
    money.style.display = 'none';
    location.reload(true);
}
function q(text){
    let p = document.createElement('p');
    p.id = 'p';
    p.textContent = text;
    money.appendChild(p);
    money.style.display = 'block';
    setTimeout(w, 5000);
};
function e(text){
    let p = document.createElement('p');
    p.id = 'p';
    p.textContent = text;
    let image = document.createElement('img');
    image.src = 'images/baned.gif';
    image.style.width = '300px';
    money.appendChild(p);
    money.appendChild(image);
    money.style.display = 'block';
    setTimeout(w, 5000);
};
function to_registration(){
    window.location.href = 'registration.html';
}
function to_main(){
    window.location.href = 'chats.html';
}
function sign(){
    let password1 = 0;
    for(let i = 0; i < password.value.length; i++){
        password1 += password.value.charCodeAt(i);
    }
    password1 += 10
    password1 *= password1;
    password1 *= password1;
    password1 *= password1;
    let dop = 0
    for(let i = 0; i < email.value.length; i++){
        dop += email.value.charCodeAt(i);
    }
    password1 *= dop;
    password1 = password1 % (10**256);
    fetch('http://sema1903.ru/main/sign.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({'email': email.value, 'password': password1})
    })
        .then(res => res.json())
        .then(data => {
            if (data['answer'] == 'incorrect'){
                q('Вход не выполнен');
            }else if(data['answer'] == 'correct'){
                localStorage.setItem('hash', data['hash']);
                window.location.href = 'chats.html';
            }else{
                e('Твой аккуант был заблокирован');
            }
    })
    email.value = '';
    password.value = '';
}
sign_button.addEventListener('click', sign);
back_button.addEventListener('click', to_main);
registration_button.addEventListener('click', to_registration);