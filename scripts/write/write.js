//elements
let avatar = document.getElementById('avatar_img');
let big_div = document.getElementById('big_div');
let name1 = document.getElementById('name');
let back_button = document.getElementById('back_button');
let write_input = document.getElementById('write_input');
let submit_button = document.getElementById('submit_button');
let file = document.getElementById('file_inpu');
let main = document.getElementById('main');
let head_div = document.getElementById('head_div');
let type = 'no';
let f = 'no';
let money = document.getElementById('money');
document.querySelector('input[type=file]').onchange = (event) => {
    let reader = new FileReader();
    reader.onload = () => {f = reader.result;}
    reader.readAsDataURL(event.target.files[0]);
}

//functions
async function to_options(){
    window.location.href = 'options.html';
}
async function to_chat(){
    window.location.href = 'chat.html';
}
async function head_function(){
    localStorage.setItem('id2', localStorage.getItem('id3'));
    localStorage.setItem('action', 'write');
    window.location.href = 'account.html';
}
//run functions
if(localStorage.getItem('hash') == null){
    to_options;
}

write();

submit_button.addEventListener('click', writes)

back_button.addEventListener('click', to_chat);

head_div.addEventListener('click', head_function);