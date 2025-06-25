async function registration(){
    if(password.value.length < 8 || id.value.length == 0 || email.value.length == 0){
        q('Пароль должен быть не короче 8-ми символов, а поля с ID и email должны быть заполненны');
    }
    else{
        let password1 = 0;
        for(let i = 0; i < password.value.length; i++){
            password1 += password.value.charCodeAt(i);
        }
        password1 += 10
        password1 *= password1;
        password1 *= password1;
        password1 *= password1;
        let dop = 0
        for(let i = 0; i < email.value.length; i++){
            dop += email.value.charCodeAt(i);
        }
        password1 *= dop;
        password1 = password1 % (10**256);
        dop = 0
        for(let i = 0; i < id.value.length; i++){
            dop += id.value.charCodeAt(i);
        }
        hash = password1 * dop;
        fetch('http://sema1903.ru/main/backend/registration.php', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'email': email.value, 'name': name1.value, 'password': password1, 'avatar': ava, 'id': id.value, 'about': about.value, 'hash': hash})
        })
            .then(response =>{return response.json()})
            .then(data => {
                if (data['answer'] == 'no'){
                    q('Пользователь с таким email или ip уже есть или неверно ззаполненая форма');
                }else{
                    localStorage.setItem('hash', hash);
                    window.location.href = 'chats.html';
                    localStorage.setItem('action', 'registration');
                }
        })
    }
}