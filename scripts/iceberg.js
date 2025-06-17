let balance = document.getElementById('balance');
let number = document.getElementById('number');
let params = {hash: localStorage.getItem('hash')};
let back_button = document.getElementById('back_button');
let main = document.getElementById('main');
let file_input = document.getElementById('nft');
let url = new URL('http://sema1903.ru/main/iceberg.php');
let momey = document.getElementById('money');
let bal = 0;
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
    setTimeout(w, 2500);
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
        balance.textContent = 'Баланс: ' + data['balance'] + ' 👏';
    });
back_button.addEventListener('click', ()=>{
    window.location.href = localStorage.getItem('action') + '.html';
});
nft_button.addEventListener('click', ()=>{
    if(['png', 'jpeg', 'gif', 'raw', 'jpg', 'svg', 'tiff', 'bmp', 'psd'].includes(file_input.value.split('.')[file_input.value.split('.').length - 1])){
        fetch('http://sema1903.ru/main/mint.php', {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'owner': localStorage.getItem('hash'), 'metadata': {'how': sum_nft.value, 'nft': f, 'creator': localStorage.getItem('hash')}})
        })
        .then(res => res.json())
        .then(data => {
            if(data['answer'] == 'yes'){
                q('Выставленно на продажу!');
            }else{
                q('Что-то пошло не так');
            }
        })
    }
})
url = new URL('http://sema1903.ru/main/nfts.php');
url.search = new URLSearchParams(params);
fetch(url, {headers: {'Accept': 'application/json'}})
    .then(response =>{return response.json()})
    .then(data => {
        for(let i in data){
            let main_div = document.createElement('div');
            main_div.className = 'main_div';
            let new_how = document.createElement('p');
            new_how.style.color = 'black';
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
            main.appendChild(main_div);
            main_div.addEventListener('click', ()=>{
                let submit = document.createElement('button');
                submit.textContent = 'Преобрести';
                submit.id = 'submit';
                money.appendChild(submit);
                money.style.display = 'block';
                money.addEventListener('dblclick', ()=>{
                    money.style.display = 'none';
                    submit.style.display = 'none';
                })
                submit.addEventListener('click', ()=>{
                    fetch('http://sema1903.ru/main/transfer.php', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({'giver': localStorage.getItem('hash'), 'seller': data[i]['owner'], 'token': Number(i), 'how': Number(data[i]['metadata']['how']), 'nft': data[i]['metadata']['nft']})
                    })
                        .then(res => res.json())
                        .then(data1 => {
                            if(data1['answer'] == 'yes'){
                                q('Покупка совершена');
                            }else{
                                q('Что-то пошло не так');
                            }
                    })
                })
            })
        }
    }
)