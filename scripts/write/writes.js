async function writes(){
    if(f != 'no' && ['mp4', 'mov', 'mpeg-1', 'mpeg-2', 'mpeg4', 'mpg', 'avi', 'wmv'].includes(file.value.split('.')[file.value.split('.').length - 1])){
            type = 'video';
        }else if(f != 'no' && ['png', 'jpeg', 'gif', 'raw', 'jpg', 'svg', 'tiff', 'bmp', 'psd'].includes(file.value.split('.')[file.value.split('.').length - 1])){
            type = 'image';
        }else if(f != 'no' && ['wav', 'aiff', 'ape', 'flac', 'mp3', 'ogg'].includes(file.value.split('.')[file.value.split('.').length - 1])){
            type = 'audio';
        }else{
            type = 'else';
        }
        fetch('http://sema1903.ru/main/backend/writes.php', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'autor_id': localStorage.getItem('hash'), 'giver_id': localStorage.getItem('id3'), 'text': write_input.value, 'file': f, 'type': type})
        })
            .then(res => res.json())
            .then(data => {
                file.value = null;
                write_input.value = null;
                write();
            }
    )
}