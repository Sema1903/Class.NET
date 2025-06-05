let avatar = document.getElementById('avatar_img');
let name1 = document.getElementById('name');
let back_button = document.getElementById('back_button');
let write_input = document.getElementById('write_input');
let submit_button = document.getElementById('submit_button');
let file = document.getElementById('file_inpu');
let main = document.getElementById('main');
let head_div = document.getElementById('head_div');
let type = 'no';
let f = 'no';
document.querySelector('input[type=file]').onchange = (event) => {
    let reader = new FileReader();
    reader.onload = () => {f = reader.result;}
    reader.readAsDataURL(event.target.files[0]);
}
write();
function write(){
    main.textContent = '';
    let params = {id: localStorage.getItem('hash') + ' ' + localStorage.getItem('id3')};
        let url = new URL('http://sema1903.ru/main/write.php');
        url.search = new URLSearchParams(params);
        fetch(url, {headers: {'Accept': 'application/json'}})
            .then(response =>{return response.json()})
            .then(data => {
                console.log(data);
                name1.textContent = data['name'];
                if(data['avatar'] != ''){
                    avatar.src = data['avatar'];
                }else{
                    avatar.src = 'images/unknown.png';
                }
                for(let i = 0; i < data['messages'].length; i++){
                    let main_div = document.createElement('div');
                    let text_p = document.createElement('p');
                    text_p.className = 'text_p';
                    text_p.textContent = data['messages'][i]['text'];
                    main_div.appendChild(text_p);
                    if(data['messages'][i]['autor_id'] == localStorage.getItem('hash')){
                        main_div.className = 'my_main_div'
                    }else{
                        main_div.className = 'main_div';
                    }
                    if(data['messages'][i]['file'] != 'no' && data['messages'][i]['type'] == 'image'){
                        let file_img = document.createElement('img');
                        file_img.className = 'file_img'
                        file_img.src = data['messages'][i]['file'];
                        main_div.appendChild(file_img);
                    }
                    if(data['messages'][i]['file'] != 'no' && data['messages'][i]['type'] == 'video'){
                        let file_video = document.createElement('video');
                        file_video.src = data['messages'][i]['file'];
                        file_video.className = 'file_img';
                        file_video.autoplay = true;
                        file_video.controls = true;
                        file_video.muted = true;
                        file_video.loop = true;
                        main_div.appendChild(file_video);
                    }
                    if(data['messages'][i]['file'] != 'no' && data['messages'][i]['type'] == 'audio'){
                        let file_audio = document.createElement('audio');
                        file_audio.src = data['messages'][i]['file'];
                        file_audio.controls = true;
                        file_audio.loop = true;
                        file_audio.muted = false;
                        main_div.appendChild(file_audio);
                    }
                    if(data['messages'][i]['file'] != 'no' && data['messages'][i]['type'] == 'download'){
                        let file_download = document.createElement('a');
                        file_download.href = data['messages'][i]['file'];
                        file_download.textContent = 'Скачать файл';
                        file_download.download = true;
                        main_div.appendChild(file_download);
                    }
                    if(i == data['messages'].length - 1){
                        main_div.style.marginBottom = '150px';
                    };
                    if(data['messages'][i]['special'] == 'friend'){
                        if(data['messages'][i]['autor_id'] == localStorage.getItem('hash')){
                            text_p.textContent = 'Отправлен запрос в дружбу';
                        }else{
                            let answer_button = document.createElement('button');
                            answer_button.textContent = 'Добавить';
                            answer_button.addEventListener('click', ()=>{
                                fetch('http://sema1903.ru/main/yes_friend.php', {
                                    method: 'POST',
                                    headers: {'Content-Type': 'application/json'},
                                    body: JSON.stringify({'id1': localStorage.getItem('hash'), 'id2': localStorage.getItem('id3')})
                                })
                                    .then(res => res.json())
                                    .then(data => {
                                        if(data['answer'] == 'yes'){
                                            write();
                                        }
                            })});
                            main_div.appendChild(answer_button);
                        }
                    };
                    if(data['messages'][i]['special'] == 'ice'){
                        let file_img = document.createElement('img');
                        file_img.className = 'file_img'
                        file_img.src = './images/icon.jpeg';
                        main_div.appendChild(file_img);
                    };
                    if(data['messages'][i]['special'] == 'nft'){
                        let dop = document.createElement('div');
                        dop.className = 'dop';
                        main_div.appendChild(dop);
                    };
                    if(data['messages'][i]['special'] == 'bans'){
                        let file_img = document.createElement('img');
                        file_img.className = 'file_img'
                        file_img.src = './images/bans.gif';
                        main_div.appendChild(file_img);
                    }
                    main.appendChild(main_div);
                    window.scrollBy(0, innerHeight);
                }
            })
        }
submit_button.addEventListener('click', ()=>{
    if(f != 'no' && ['mp4', 'mov', 'mpeg-1', 'mpeg-2', 'mpeg4', 'mpg', 'avi', 'wmv'].includes(file.value.split('.')[file.value.split('.').length - 1])){
        type = 'video';
    }else if(f != 'no' && ['png', 'jpeg', 'gif', 'raw', 'jpg', 'svg', 'tiff', 'bmp', 'psd'].includes(file.value.split('.')[file.value.split('.').length - 1])){
        type = 'image';
    }else if(f != 'no' && ['wav', 'aiff', 'ape', 'flac', 'mp3', 'ogg'].includes(file.value.split('.')[file.value.split('.').length - 1])){
        type = 'audio';
    }else{
        type = 'else';
    }
    fetch('http://sema1903.ru/main/writes.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({'autor_id': localStorage.getItem('hash'), 'giver_id': localStorage.getItem('id3'), 'text': write_input.value, 'file': f, 'type': type})
    })
        .then(res => res.json())
        .then(data => {
            file.value = null;
            write_input.value = null;
            write();
        }
)})
back_button.addEventListener('click', () =>{
    window.location.href = 'chat.html';
});
head_div.addEventListener('click', ()=>{
    localStorage.setItem('id2', localStorage.getItem('id3'));
    localStorage.setItem('action', 'write');
    window.location.href = 'account.html';
})