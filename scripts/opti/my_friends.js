async function my_friends(){
    url = new URL('http://sema1903.ru/main/backend/my_friends.php');
    url.search = new URLSearchParams(params);
    fetch(url, {headers: {'Accept': 'application/json'}})
        .then(response =>{return response.json()})
        .then(data => {
            if(data.length != 0){
                for(let i = 0; i < data.length; i++){
                    let friend = document.createElement('div');
                    friend.className = 'friend';
                    let favatar = document.createElement('img');
                    favatar.id = 'favatar';
                    if(data[i]['avatar'] != ''){
                        favatar.src = data[i]['avatar'];
                    }else{
                        favatar.src = 'images/unknown.png';
                    }
                    let fname = document.createElement('p');
                    fname.textContent = data[i]['name'];
                    friend.appendChild(favatar);
                    friend.appendChild(fname);
                    friend.addEventListener('click', ()=>{
                        localStorage.setItem('action', 'opti');
                        localStorage.setItem('id2', data[i]['id']);
                        window.location.href = 'account.html';
                    });
                    friends.appendChild(friend);
                }
            }else{
                let answer = document.createElement('p');
                answer.textContent = 'Друзей пока нет';
                answer.style.marginLeft = '50px';
                friends.appendChild(answer);
            }
    });
}