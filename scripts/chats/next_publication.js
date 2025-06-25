async function next_publication(i){
    let params = {number: i};
    let url = new URL('http://sema1903.ru/main/backend/lent.php');
    url.search = new URLSearchParams(params);
    fetch(url, {headers: {'Accept': 'application/json'}})
        .then(response =>{return response.json()})
        .then(data => {
            if(data['number'] != 0){
                let autor_h3 = document.createElement('h3');
                let text_p = document.createElement('p');
                let main_div = document.createElement('div');
                let head_div = document.createElement('div');
                let avatar = document.createElement('img');
                let file_name = data['file']
                autor_h3.className = 'autor_h3';
                avatar.className = 'avatar';
                text_p.className = 'text_p';
                text_p.style.color = 'black';
                main_div.className = 'main_div';
                head_div.className = 'head_div';
                autor_h3.innerText = data['autor'];
                if(data['avatar'] != ''){
                    avatar.src = data['avatar'];
                }else{
                    avatar.src = 'images/unknown.png';
                }
                text_p.innerText = data['text'];
                head_div.appendChild(avatar);
                head_div.appendChild(autor_h3);
                main_div.appendChild(head_div);
                main_div.appendChild(text_p);
                main.appendChild(main_div);
                head_div.addEventListener('click', () =>{
                    localStorage.setItem('id2', data['id']);
                    localStorage.setItem('action', 'chats');
                    window.location.href = 'account.html';
                })
                if (file_name != 'no' && data['type'] == 'image'){
                    let file = document.createElement('img');
                    file.src = file_name;
                    file.className = 'file';
                    main_div.appendChild(file);
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
                }else if(file_name != 'no' && data['type'] == 'video'){
                    let file = document.createElement('video');
                    file.src = file_name;
                    file.className = 'file';
                    file.autoplay = true;
                    file.controls = true;
                    file.muted = true;
                    file.loop = true;
                    main_div.appendChild(file);
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
                }else if(file_name != 'no' && data['type'] == 'audio'){
                    let file = document.createElement('audio');
                    file.src = file_name;
                    file.controls = true;
                    file.loop = true;
                    file.muted = false;
                    main_div.appendChild(file);
                }else if(file_name != 'no' && data['type'] == 'download'){
                    let file = document.createElement('a');
                    file.href = file_name;
                    file.textContent = 'Скачать файл';
                    file.download = true;
                    main_div.appendChild(file);
                }
            }});
}