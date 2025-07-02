function back_money1(happy_text){
    money.style.display = 'none';
    happy_text.style.display = 'none';
}
async function yes_love(){
    fetch('http://sema1903.ru/main/backend/yes_love.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({'id': localStorage.getItem('id3'), 'hash': localStorage.getItem('hash')})
    })
        .then(res => res.json())
        .then(data => {
            if(data['answer'] == 'yes'){
                let happy_text = document.createElement('p');
                happy_text.textContent = 'Поздравляем 🎉 Теперь ты состоишь в отношениях! Надеемся, что у на счастливое будущее ❤';
                money.appendChild(happy_text);
                money.style.display = 'block';
                setTimeout(back_money1(happy_text), 2500);
            }else if(data['answer'] == 'your_misstake'){
                let happy_text = document.createElement('p');
                happy_text.textContent = 'Ты уже состоишь в отношениях';
                money.appendChild(happy_text);
                money.style.display = 'block';
                setTimeout(back_money1(happy_text), 2500);  
            }else{
                let happy_text = document.createElement('p');
                happy_text.textContent = 'Увы, но этот пользователь уже состоит в отношениях. У тебя еще все впереди';
                money.appendChild(happy_text);
                money.style.display = 'block';
                setTimeout(back_money1(happy_text), 2500);
            }
        })
}
async function yes_married(){
    fetch('http://sema1903.ru/main/backend/yes_married.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({'id': localStorage.getItem('id3'), 'hash': localStorage.getItem('hash')})
    })
        .then(res => res.json())
        .then(data => {
            
        })
}
async function fall_married(){
    fetch('http://sema1903.ru/main/backend/break_married.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({'id': localStorage.getItem('id3'), 'hash': localStorage.getItem('hash')})
    })
        .then(res => res.json())
        .then(data => {
            
        })
}
async function write(){
    main.textContent = '';
    let params = {id: localStorage.getItem('hash') + ' ' + localStorage.getItem('id3')};
        let url = new URL('http://sema1903.ru/main/backend/write.php');
        url.search = new URLSearchParams(params);
        fetch(url, {headers: {'Accept': 'application/json'}})
            .then(response =>{return response.json()})
            .then(data => {
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
                        file.addEventListener('click', () => {
                            file.className = 'big_file';
                            big_div.appendChild(file);
                            big_div.style.display = 'block';
                            big_div.addEventListener('click', () => {
                                file.className = 'file';
                                main_div.appendChild(file);
                                big_div.style.display = 'none';
                            })
                        })
                        
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
                        file.addEventListener('click', () => {
                            file.className = 'big_file';
                            big_div.appendChild(file);
                            big_div.style.display = 'block';
                            big_div.addEventListener('click', () => {
                                file.className = 'file';
                                main_div.appendChild(file);
                                big_div.style.display = 'none';
                            })
                        })
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
                                fetch('http://sema1903.ru/main/backend/yes_friend.php', {
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
                    if(data['messages'][i]['special'] == 'new_love' && data['messages'][i]['autor_id'] == localStorage.getItem('id3')){
                        let yes_love_button = document.createElement('button');
                        yes_love_button.textContent = 'Встречаться';
                        yes_love_button.addEventListener('click', yes_love);
                        main_div.appendChild(yes_love_button);
                    }
                    if(data['messages'][i]['special'] == 'married' && data['messages'][i]['autor_id'] == localStorage.getItem('id3')){
                        let yes_button = document.createElement('button');
                        yes_button.textContent = 'Согласиться!';
                        yes_button.addEventListener('click', yes_married);
                        main_div.appendChild(yes_button);
                    }
                    if(data['messages'][i]['special'] == 'fall_married' && data['messages'][i]['autor_id'] == localStorage.getItem('id3')){
                        let yes_button = document.createElement('button');
                        yes_button.textContent = 'Развестись';
                        yes_button.addEventListener('click', fall_married);
                        main_div.appendChild(yes_button);
                    }
                    main.appendChild(main_div);
                    window.scrollBy(0, innerHeight);
                }
            })
        }