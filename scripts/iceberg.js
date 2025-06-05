let balance = document.getElementById('balance');
let buy = document.getElementById('buy');
let how = document.getElementById('how');
let sum = document.getElementById('sum');
let number = document.getElementById('number');
let params = {hash: localStorage.getItem('hash')};
let back_button = document.getElementById('back_button');
let main = document.getElementById('main');
let url = new URL('http://127.0.0.1:5000/iceberg');
let momey = document.getElementById('money');
let bal = 0;
function create_token(token){
    let token1 = 0;
    for(let i = 0; i < token.length; i++){
        token1 += token.charCodeAt(i);
    }
    token1 += 10
    token1 *= token1;
    token1 *= token1;
    token1 *= token1;
    return token1;
}
url.search = new URLSearchParams(params);
function w(){
    money.style.display = 'none';
    location.reload(true);
}
function q(text){
    let p = document.createElement('p');
    p.id = 'p';
    p.textContent = text;
    money.appendChild(p);
    money.style.display = 'block';
    setTimeout(w, 1000);
}
let sum_nft = document.getElementById('sum_nft');
let f = 'no';
document.querySelector('input[type=file]').onchange = (event) => {
    let reader = new FileReader();
    reader.onload = () => f = reader.result;
    reader.readAsDataURL(event.target.files[0]);
};
let nft_button = document.getElementById('nft_button');
url.search = new URLSearchParams(params);
fetch(url, {headers: {'Accept': 'application/json'}})
    .then(response =>{return response.json()})
    .then(data => {
        balance.textContent = 'Баланс: ' + data['balance'] + ' ICE';
    });
buy.addEventListener('click', ()=>{
    fetch('http://127.0.0.1:5000/mint', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({'owner': localStorage.getItem('hash'), 'token_id': Math.random() * (10^1000000000), 'metadata': {'how': how.value, 'sum': sum.value, 'number': number.value, 'nft': '', 'status': 'sale', 'creator': localStorage.getItem('hash')}})
    })
        .then(res => res.json())
        .then(data => {
            q('Выставлено на продажу');
        });
});
back_button.addEventListener('click', ()=>{
    window.location.href = localStorage.getItem('action') + '.html';
});
nft_button.addEventListener('click', ()=>{
    fetch('http://127.0.0.1:5000/mint', {
        method: 'POST', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({'owner': localStorage.getItem('hash'), 'token_id': Math.random() * (10^1000000000), 'metadata': {'how': sum_nft.value, 'sum': 0, 'number': number.value, 'nft': f, 'status': 'sale', 'creator': localStorage.getItem('hash')}})
    })
    .then(res => res.json())
    .then(data => {
        q('Выставленно на продажу!');
    })
})
fetch('http://127.0.0.1:5000/nfts', {headers: {'Accept': 'application/json'}})
    .then(response =>{return response.json()})
    .then(data => {
        for(let i in data){
            let main_div = document.createElement('div');
            main_div.className = 'main_div';
            let new_how = document.createElement('p');
            new_how.style.color = 'black';
            if(data[i]['metadata']['nft'] == ''){
                let new_sum = document.createElement('p');
                new_sum.style.color = 'black';
                new_how.textContent = data[i]['metadata']['how'] + ' ICE';
                new_sum.textContent = 'За ' + data[i]['metadata']['sum'] + ' руб.';
                main_div.appendChild(new_how);
                main_div.appendChild(new_sum);
            }else{
                let new_img = document.createElement('img');
                new_img.src = data[i]['metadata']['nft'];
                new_img.className = 'nft_img';
                let creator = document.createElement('p');
                creator.textContent = 'Автор работы: ' + data[i]['metadata']['creator'];
                creator.style.color = 'black';
                let dop = document.createElement('div');
                dop.className = 'dop';
                new_how.textContent = 'За ' + data[i]['metadata']['how'] + ' ICE';
                main_div.appendChild(creator);
                main_div.appendChild(new_how);
                main_div.appendChild(dop);
                main_div.appendChild(new_img);
            };
            if(data[i]['metadata']['creator'] != 'friends2.0' && Number(data[i]['owner']) != localStorage.getItem('hash')){
                main.appendChild(main_div);
            }
            main_div.addEventListener('click', ()=>{
                let muny = document.createElement('input');
                let p = document.createElement('p');
                let submit = document.createElement('button');
                p.textContent = 'Введи номер карты ';
                muny.placeholder = 'Номер карты';
                p.id = 'p';
                submit.textContent = 'Перевести';
                muny.id = 'muny';
                submit.id = 'submit';
                money.appendChild(p);
                money.appendChild(muny);
                money.appendChild(submit);
                money.style.display = 'block';
                money.addEventListener('dblclick', ()=>{
                    money.style.display = 'none';
                })
                submit.addEventListener('click', ()=>{
                    fetch('http://127.0.0.1:5000/transfer', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({'receiver': localStorage.getItem('hash'), 'sender': data[i]['owner'], 'token_id': Number(i), 'how': Number(data[i]['metadata']['how']), 'nft': data[i]['metadata']['nft']})
                    })
                        .then(res => res.json())
                        .then(data1 => {
                            q('Покупка совершена');
                    })
                })
            })
        }
    })