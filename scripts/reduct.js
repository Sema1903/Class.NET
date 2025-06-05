let back_button = document.getElementById('back_button');
let name1 = document.getElementById('name');
let registration_button = document.getElementById('registration_button');
let avatar = document.querySelector('input[type=file]');
let ava = '';
let money = document.getElementById('money');
let about = document.getElementById('about');
function w(){
    money.style.display = 'none';
    window.location.href = 'opti.html';
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
    fetch('http://sema1903.ru/main/reduct.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({'name': name1.value, 'avatar': ava, 'hash': localStorage.getItem('hash'), 'about': about.value})
    })
        .then(res => res.json())
        .then(data => {
            q('Изменения сохранены');
        })
}
function to_main(){
    window.location.href = 'opti.html';
}
document.querySelector('input[type=file]').onchange = (event) => {
    toBase64(event.target.files[0], ne);
}
registration_button.addEventListener('click', registration);
back_button.addEventListener('click', to_main);