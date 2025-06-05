let text = document.getElementById('text');
let submit = document.getElementById('submit');
let back = document.getElementById('back_button');
let f = 'no';
let file_input = document.getElementById('file');
let type = 'no';
let money = document.getElementById('money');
function w(){
    money.style.display = 'none';
    text.value = '';
    window.location.href = 'chats.html';
}
function q(text){
    let p = document.createElement('p');
    p.id = 'p';
    p.textContent = text;
    money.appendChild(p);
    money.style.display = 'block';
    setTimeout(w, 5000);
};
document.querySelector('input[type=file]').onchange = (event) => {
    let reader = new FileReader();
    reader.onload = () => f = reader.result;
    reader.readAsDataURL(event.target.files[0]);
}
function to_main(){
    window.location.href = 'opti.html';
}
function publicate(){
    if(f != 'no' && ['mp4', 'mov', 'mpeg-1', 'mpeg-2', 'mpeg4', 'mpg', 'avi', 'wmv'].includes(file_input.value.split('.')[file_input.value.split('.').length - 1])){
        type = 'video';
    }else if(f != 'no' && ['png', 'jpeg', 'gif', 'raw', 'jpg', 'svg', 'tiff', 'bmp', 'psd'].includes(file_input.value.split('.')[file_input.value.split('.').length - 1])){
        type = 'image';
    }else if(f != 'no' && ['wav', 'aiff', 'ape', 'flac', 'mp3', 'ogg'].includes(file_input.value.split('.')[file_input.value.split('.').length - 1])){
        type = 'audio';
    }else{
        type = 'else';
    }
    fetch('http://sema1903.ru/main/publicate.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({'text': text.value, 'file': f, 'hash': localStorage.getItem('hash'), 'type': type})
    })
        .then(res => res.json())
        .then(data => {
            if (data['answer'] == 'yes'){
                q('Публикация опубликована');
            }
        })
        .catch(error => console.error('Ошибка:', error));
}
submit.addEventListener('click', publicate);
back.addEventListener('click', to_main);