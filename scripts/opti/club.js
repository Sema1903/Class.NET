async function club_status(){
    url = new URL('http://sema1903.ru/main/backend/club_status.php');
    url.search = new URLSearchParams(params);
    fetch(url, {headers: {'Accept': 'application/json'}})
    .then(response =>{return response.json()})
    .then(data => {
        club_p.textContent = 'Членство: ' + data['answer'];
        if(data['answer'] != 'не в клубе'){
            club_button.style.display = 'none';
        }
    });
}
async function new_club(){
    window.location.href = 'new_club.html';
}