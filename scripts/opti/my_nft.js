async function my_nft(){
    url = new URL('http://sema1903.ru/main/backend/my_nft.php');
    url.search = new URLSearchParams(params);
    fetch(url, {headers: {'Accept': 'application/json'}})
        .then(response =>{return response.json()})
        .then(data => {
            for(let i = 0; i < data.length; i++){
                let popup = document.createElement('div');
                popup.id = 'popup';
                let nft_number = document.createElement('h2');
                nft_number.id = 'nft_number';
                let nft_author = document.createElement('p');
                nft_author.id = 'nft_author';
                let nft_img = document.createElement('img');
                nft_img.id = 'nft_img';
                let nft_cost = document.createElement('p');
                nft_cost.id = 'nft_cost';
                let sale_button = document.createElement('button');
                sale_button.id = 'sale_button';
                sale_button.textContent = 'Выставить на продажу';
                let gift_button = document.createElement('button');
                gift_button.id = 'gift';
                let dop_nft = document.createElement('div')
                dop_nft.className = 'dop_div';
                gift_button.textContent = 'Подарить';
                popup.appendChild(nft_img);
                popup.appendChild(dop_nft);
                popup.appendChild(nft_number);
                popup.appendChild(nft_author);
                popup.appendChild(nft_cost);
                popup.appendChild(sale_button);
                popup.appendChild(gift_button);
                let popupest = document.getElementById('popupest');
                popupest.appendChild(popup);
                let nft_button = document.createElement('img');
                nft_button.className = 'nft_img';
                nft_button.src = data[i]['nft'];
                let dopest = document.createElement('div');
                dopest.id = 'dopest';
                dopest.addEventListener('click', ()=>{
                    nft_img.src = data[i]['nft'];
                    nft_author.textContent = 'Создатель: ' + data[i]['creator'];
                    nft_cost.textContent = 'Стоимость: ' + data[i]['cost'] + ' ICE';
                    nft_number.textContent = 'Номер NFT: ' + data[i]['ip'];
                    popup.style.display = 'block';
                });
                popup.addEventListener('click', ()=>{
                    popup.style.display = 'none';
                });
                sale_button.addEventListener('click', ()=>{
                    let muny = document.createElement('input');
                    let p = document.createElement('p');
                    let submit = document.createElement('button');
                    p.textContent = 'За сколько 👏 хочешь продать?';
                    muny.placeholder = 'Введи сумму';
                    p.id = 'p';
                    submit.textContent = 'Выставить на продажу';
                    muny.id = 'muny';
                    submit.id = 'submit';
                    money.appendChild(p);
                    money.appendChild(muny);
                    money.appendChild(submit);
                    money.style.display = 'block';
                    money.addEventListener('dblclick', ()=>{
                        money.style.display = 'none';
                        submit.style.display = 'none';
                        muny.style.display = 'none';
                        p.style.display = 'none';
                    })
                    submit.addEventListener('click', ()=>{
                        fetch('http://sema1903.ru/main/backend/buy_nft.php', {
                            method: 'POST',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({'hash': localStorage.getItem('hash'), 'how': muny.value, 'token': data[i]['ip']})
                        })
                            .then(res => res.json())
                            .then(data => {
                                q('Выслевлено на продажу');
                            })
                    })
                })
                gift_button.addEventListener('click', ()=>{
                    let muny = document.createElement('input');
                    let p = document.createElement('p');
                    let submit = document.createElement('button');
                    p.textContent = 'Введи ID того, кому хочешь подарить';
                    muny.placeholder = 'Введи ID';
                    p.id = 'p';
                    submit.textContent = 'Подарить';
                    muny.id = 'muny';
                    submit.id = 'submit';
                    money.appendChild(p);
                    money.appendChild(muny);
                    money.appendChild(submit);
                    money.addEventListener('dblclick', ()=>{
                        money.style.display = 'none';
                        submit.style.display = 'none';
                        muny.style.display = 'none';
                        p.style.display = 'none';
                    });
                    money.style.display = 'block';
                    submit.addEventListener('click', ()=>{
                        fetch('http://sema1903.ru/main/backend/gift.php', {
                            method: 'POST',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({'token': data[i]['ip'], 'adress': muny.value, 'hash': localStorage.getItem('hash')})
                        })
                            .then(res => res.json())
                            .then(data => {
                                if(data['answer'] == 'no'){
                                    q("Неверный IP");
                                }else{
                                    q('Подарoк подарен');
                                }
                            });
                })})
                dopest.style.left = String((i % 4)*190) + 'px';
                dopest.style.top = String(Math.trunc((i) / 4) * 180) + 'px';
                dopest.style.zIndex = String(i + 3);
                popup.style.zIndex = String(i + 4);
                nfts.appendChild(nft_button);
                nfts.appendChild(dopest);
            }
        });
}