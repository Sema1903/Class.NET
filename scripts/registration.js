let back_button = document.getElementById('back_button');
let name1 = document.getElementById('name');
let password = document.getElementById('password');
let email = document.getElementById('email');
let registration_button = document.getElementById('registration_button');
let avatar = document.querySelector('input[type=file]');
let id = document.getElementById('id');
let hash = 0;
let money = document.getElementById('money');
let ava = '';
let about = document.getElementById('about');
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
function toBase64(file, onSuccess) {
    let reader = new FileReader();
    reader.onload = () => onSuccess(reader.result);
    reader.readAsDataURL(file);
}
function ne(a){
    ava = a;
}
function registration(){
    if(password.value.length < 8 || id.value.length == 0 || email.value.length == 0){
        q('Пароль должен быть не короче 8-ми символов, а поля с ID и email должны быть заполненны');
    }
    else{
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
        dop = 0
        for(let i = 0; i < id.value.length; i++){
            dop += id.value.charCodeAt(i);
        }
        hash = password1 * dop;
        fetch('http://sema1903.ru/main/registration.php', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'email': email.value, 'name': name1.value, 'password': password1, 'avatar': ava, 'id': id.value, 'about': about.value, 'hash': hash})
        })
            .then(response =>{return response.json()})
            .then(data => {
                if (data['answer'] == 'no'){
                    q('Пользователь с таким email или ip уже есть или неверно ззаполненая форма');
                }else{
                    localStorage.setItem('hash', hash);
                    window.location.href = 'chats.html';
                    localStorage.setItem('action', 'registration');
                }
        })
    }
}
function to_main(){
    window.location.href = 'chats.html';
}
document.querySelector('input[type=file]').onchange = (event) => {
    toBase64(event.target.files[0], ne);
}
registration_button.addEventListener('click', registration);
back_button.addEventListener('click', to_main);