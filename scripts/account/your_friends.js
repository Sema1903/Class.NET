async function your_friends(){
    params = {id: localStorage.getItem('id2')};
    url = new URL('http://sema1903.ru/main/backend/your_friends.php');
    url.search = new URLSearchParams(params);
    fetch(url, {headers: {'Accept': 'application/json'}})
    .then(response =>{return response.json()})
    .then(data => { 
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
                localStorage.setItem('id2', data[i]['id']);
                window.location.href = 'account.html';
            });
            friends.appendChild(friend);
        }
        if(data.length == 0){
            let answer = document.createElement('p');
            answer.textContent = 'Друзей пока нет';
            answer.style.marginLeft = '50px';
            friends.appendChild(answer);
        }
    });
}