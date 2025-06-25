async function gif_function(){
    if(localStorage.getItem('hash') != null){
        fetch('http://sema1903.ru/main/backend/gif.php', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'hash': localStorage.getItem('hash')})
        })
        .then(res => res.json())
        .then(data => {
            if(data['answer'] == 'yes'){
                let timer;
                let turn = 0;
                function turnOn() {
                  timer = setInterval(turnFan, 200);
                  let gif = document.getElementById("on");
                  gif.disabled = true;
                }
                
                function turnOff() {
                  clearInterval(timer);
                  let gif = document.getElementById("on");
                  gif.disabled = false;
                }
                
                function turnFan() {
                  let gif = document.getElementById("myFan");
                  turn += 60;
                  gif.style.transform = "rotate("+ (turn % 360) +"deg)"
                }
            }
        })
    }
}