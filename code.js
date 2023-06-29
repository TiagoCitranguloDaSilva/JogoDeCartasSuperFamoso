// Variáveis
// Essa é a mão do usuario
var maoUsuario = document.getElementById('mao');

// Essa é a mão do usuario
var maoAdversario = document.getElementById('ad');

// Essa é a area das cartas
var mesaCartas = document.getElementById('cartas');

// As possiveis cartas atualmente
var cartasPossiveis = [];

function addCarta(where){
    // O lugar atual
    let lugarAtual = document.getElementById(where);

    // Carta sendo criada
    let carta = document.createElement('div')
    
    // Pegando valores aleatorios e coloca na variavel posição, ordem: cor, valor, lugar
    let Posicao = aleatorizarValores();
    
    // cor, valor
    let valores = [Posicao[0], Posicao[1]];

    // Lugar
    let Lugar = Posicao[2];

    // Adicionando as classes
    carta.classList.add('CardItem')
    carta.classList.add(valores[0])
    if(where == 'ad'){
        // Se adicionar a carta pro adversario, vai adicionar a classe adversario
        carta.classList.add('Adversario')
    }

    if(where == 'mao'){
        carta.addEventListener('click', change('mao'))
    }

    // Adiciona o número da carta
    carta.innerHTML = valores[1];

    // Retira a carta selecionada anteriormente das possiveis
    cartasPossiveis.splice(Lugar, 1);

    lugarAtual.appendChild(carta)
}

function aleatorizarValores(){
    // Seleciona a array
    let NumeroAleatorio = RandomFrom(0, (cartasPossiveis.length - 1));
    let Selecionado = cartasPossiveis[NumeroAleatorio];
    
    // Pega a cor
    let cor = Selecionado[0]
    
    // Pega o valor
    let valor = Selecionado[1]
    console.log('Cor aleatorizar: ' + cor + ', valor: ' + valor);
    return [cor, valor, NumeroAleatorio] 
}

function OnStart(){
    // As cores possiveis
    let cores = ['amarelo', 'verde', 'vermelho', 'azul'];

    // Colocando as cartas possiveis na array
    for(let d = 0; d < cores.length; d++){
        let atual = cores[d];
        for(let c = 1; c <= 9; c++){
            cartasPossiveis.push([atual, c]);
        }
    }
    console.log(cartasPossiveis);

    // Dar as cartas do usuario
    for(let c = 1; c <= 7; c++){
        addCarta('mao');
    }

    // Dar as cartas ao adversario
    for(let c = 1; c <= 7; c++){
        addCarta('ad');
    }

    // Colocar a carta inicial do jogo
    addCarta('cartas')
}


OnStart();

/* Random Number Between min and max */
function RandomFrom(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function change(where){
    
}