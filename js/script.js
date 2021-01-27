const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
let isJumping = false;
let position = 0;

function handleKeyUp(event) {
    // Evento do pressionamento do teclado
    if (event.keyCode === 32){
        if(!isJumping){
            jump();
        }
    }
}

function jump(){
    
    isJumping = true;
    let upInterval = setInterval(() => {
        if(position >= 150){
            clearInterval(upInterval);
            // descendo 
            let downInterval = setInterval(() => {
                if(position <= 0){
                    clearInterval(downInterval);
                    isJumping = false;
                }else{
                    position -= 20;
                    dino.style.bottom = position + 'px';
                }
            }, 20);
        }else{
            // subindo
            position += 20;
            dino.style.bottom = position + 'px';
        }
    }, 20);
}

// Criando os cactus;
function createCactus(){
    const cactus = document.createElement('div');
    let cactusPosition = 1800;
    // gerar cactos randomicos 
    let randomTime = Math.random() * 6000;

    //instanciando em nosso index.HTML na tag 'Div' a class 'cactus.
    cactus.classList.add('cactus');
    cactus.style.left = 1800 + 'px';
    background.appendChild(cactus);

    let leftInterval = setInterval(() => {
        if(cactusPosition < -60){
            clearInterval(leftInterval); // Limpa o intervado para que os cactos reaparecem na posição definida
            background.removeChild(cactus);
        }else if(cactusPosition > 0 && cactusPosition < 60 && position < 60){ // atingiu o dinossauro
            // Game Over
            clearInterval(leftInterval);
            document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>';
        }else{
            cactusPosition -= 10;
            cactus.style.left= cactusPosition + 'px';
        }
    }, 20);

    // definindo o tempo 'randomico' de aparições dos cactos
    setTimeout(createCactus, randomTime);
}

// executando a função
createCactus();

document.addEventListener('keyup', handleKeyUp);
 
