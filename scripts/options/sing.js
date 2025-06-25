async function sign(){
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
    fetch('http://sema1903.ru/main/backend/sign.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({'email': email.value, 'password': password1})
    })
        .then(res => res.json())
        .then(data => {
            if (data['answer'] == 'incorrect'){
                q('Вход не выполнен');
            }else if(data['answer'] == 'correct'){
                localStorage.setItem('hash', data['hash']);
                window.location.href = 'chats.html';
            }else{
                e('Твой аккуант был заблокирован');
            }
    })
    email.value = '';
    password.value = '';
}