async function chats(){
    params = {hash: localStorage.getItem('hash')};
    url = new URL('http://sema1903.ru/main/backend/chat.php');
    url.search = new URLSearchParams(params);
    fetch(url, {headers: {'Accept': 'application/json'}})
        .then(response =>{return response.json()})
        .then(data => {
            let q = [];
            for(let i = 0; i < data.length; i++){
                if(!q.includes(data[i]['id'])){
                    q.push(data[i]['id']);
                    let main_div = document.createElement('div');
                    let avatar = document.createElement('img');
                    let name1 = document.createElement('p');
                    avatar.className = 'avatar_img';
                    name1.className = 'name';
                    if(data[i]['avatar'] != ''){
                        avatar.src = data[i]['avatar']
                    }else{
                        avatar.src = 'images/unknown.png';
                    }
                    name1.textContent = data[i]['name'];
                    if(data[i]['read'] == 'no'){
                        main_div.className = 'main_div';
                    }else{
                        main_div.className = 'read_main_div';
                    }
                    if(data[i]['read'] == 'no' && data[i]['my'] == 'yes'){
                        main_div.style.backgroundColor = 'rgb(40, 255, 183)';
                    }
                    main_div.appendChild(name1);
                    main_div.appendChild(avatar);
                    main_div.addEventListener('click', () =>{
                        localStorage.setItem('id3', data[i]['id']);
                        window.location.href = 'write.html';
                    })
                    main.appendChild(main_div);
                }
            }
        })
}