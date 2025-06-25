async function publicate(){
    if(f != 'no' && ['mp4', 'mov', 'mpeg-1', 'mpeg-2', 'mpeg4', 'mpg', 'avi', 'wmv'].includes(file_input.value.split('.')[file_input.value.split('.').length - 1])){
        type = 'video';
    }else if(f != 'no' && ['png', 'jpeg', 'gif', 'raw', 'jpg', 'svg', 'tiff', 'bmp', 'psd'].includes(file_input.value.split('.')[file_input.value.split('.').length - 1])){
        type = 'image';
    }else if(f != 'no' && ['wav', 'aiff', 'ape', 'flac', 'mp3', 'ogg'].includes(file_input.value.split('.')[file_input.value.split('.').length - 1])){
        type = 'audio';
    }else{
        type = 'download';
    }
    fetch('http://sema1903.ru/main/backend/publicate.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({'text': text.value, 'file': f, 'hash': localStorage.getItem('hash'), 'type': type})
    })
        .then(res => res.json())
        .then(data => {
            if (data['answer'] == 'yes'){
                q('Публикация опубликована');
            }
        })
        .catch(error => console.error('Ошибка:', error));
}