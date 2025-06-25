async function your_lent(){
    params = {id: localStorage.getItem('id2')};
    url = new URL('http://sema1903.ru/main/backend/your_lent.php');
    url.search = new URLSearchParams(params);
    fetch(url, {headers: {'Accept': 'application/json'}})
    .then(response =>{return response.json()})
    .then(data => {
        for(let i = 0; i < data.length; i++){
            if(data[i]['number'] != 0){
                let autor_h3 = document.createElement('h3');
                let text_p = document.createElement('p');
                let main_div = document.createElement('div');
                let head_div = document.createElement('div');
                let avatar = document.createElement('img');
                let file_name = data[i]['file']
                autor_h3.className = 'autor_h3';
                avatar.className = 'avatar';
                text_p.className = 'text_p';
                main_div.className = 'main_div';
                head_div.className = 'head_div';
                autor_h3.innerText = data[i]['autor'];
                if(data[i]['avatar'] != ''){
                    avatar.src = data[i]['avatar'];
                }else{
                    avatar.src = 'images/unknown.png';
                }
                text_p.innerText = data[i]['text'];
                head_div.appendChild(avatar);
                head_div.appendChild(autor_h3);
                main_div.appendChild(head_div);
                main_div.appendChild(text_p);
                main.appendChild(main_div);
                if (file_name != 'no' && data[i]['type'] == 'image'){
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
                }else if(file_name != 'no' && data[i]['type'] == 'video'){
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
                }else if(file_name != 'no' && data[i]['type'] == 'audio'){
                    let file = document.createElement('audio');
                    file.src = file_name;
                    file.controls = true;
                    file.loop = true;
                    file.muted = false;
                    main_div.appendChild(file);
                }else if(file_name != 'no' && data[i]['type'] == 'download'){
                    let file = document.createElement('a');
                    file.href = file_name;
                    file.textContent = 'Скачать файл';
                    file.download = true;
                    main_div.appendChild(file);
                }
            }        
        }
    });
}