async function get_data_of_account(){
    params = {id: localStorage.getItem('id2')};
    url = new URL('http://sema1903.ru/main/backend/account.php');
    url.search = new URLSearchParams(params);
    fetch(url, {headers: {'Accept': 'application/json'}})
    .then(response => {return response.json()})
    .then(data =>{
        name_p.textContent = 'Имя: ' + data['name'];
        id_p.textContent = 'ID: ' + localStorage.getItem('id2');
        if(data['about'] != ''){
            about_p.textContent = 'Обо мне: ' + data['about'];
        }else{
            about_p.textContent = 'Обо мне: Привет всем! Я использую Class.NET!';
        }
        let ava = '';
        if(data['avatar'] != ''){
            avatar.src = data['avatar'];
            ava = data['avatar'];
        }else{
            avatar.src = 'images/unknown.png'; 
            ava = 'images/unknown.png';
        }
        avatar.addEventListener('click', () => {
            let big_avatar = document.createElement('img');
            big_avatar.className = 'big_file';
            big_avatar.src = ava;
            big_div.appendChild(big_avatar);
            big_div.style.display = 'block';
            big_div.addEventListener('click', () => {
                big_avatar.style.display = 'none';
                big_div.style.display = 'none';
            })
        })
    })
}