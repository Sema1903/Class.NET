async function mint(){
    if(['png', 'jpeg', 'gif', 'raw', 'jpg', 'svg', 'tiff', 'bmp', 'psd'].includes(file_input.value.split('.')[file_input.value.split('.').length - 1])){
        fetch('http://sema1903.ru/main/backend/mint.php', {
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
}