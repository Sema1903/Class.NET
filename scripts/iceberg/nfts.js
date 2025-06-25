async function nfts(){
    url = new URL('http://sema1903.ru/main/backend/nfts.php');
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
                        fetch('http://sema1903.ru/main/backend/transfer.php', {
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
}