async function search(){
    let params = {id: surch_input.value};
    let url = new URL('http://sema1903.ru/main/backend/search.php');
    url.search = new URLSearchParams(params);
    fetch(url, {headers: {'Accept': 'application/json'}})
        .then(response =>{return response.json()})
        .then(data => {
            let people_div = document.createElement('div');
            people_div.id = 'people_div';
            if(data.length == 0){
                let people_p = document.createElement('p');
                people_p.textContent = 'По этому ID и имени никого не найдено';
                people_p.style.color = 'white';
                people_div.appendChild(people_p);
            }else{
                for(let i = 0; i < data.length; i++){
                    let man_div = document.createElement('div');
                    man_div.className = 'man_div';
                    let man_avatar = document.createElement('img');
                    man_avatar.className = 'man_avatar';
                    if(data[i]['avatar'] != ''){
                        man_avatar.src = data[i]['avatar'];
                    }else{
                        man_avatar.src = 'images/unknown.png';
                    }
                    let man_name = document.createElement('p');
                    man_name.className = 'man_name';
                    man_name.textContent = data[i]['name'];
                    man_div.appendChild(man_avatar);
                    man_div.appendChild(man_name);
                    people_div.appendChild(man_div);
                    man_div.addEventListener('click', () => {
                        localStorage.setItem('id2', data[i]['id']);
                        window.location.href = 'account.html';
                    })
                }
            }
            mainest.appendChild(people_div);
            people_div.addEventListener('click', () => {
                people_div.style.display = 'none';
            })
})}