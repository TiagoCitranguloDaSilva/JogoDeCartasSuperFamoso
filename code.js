// Variáveis
// Essa é a mão do usuario
var maoUsuario = document.getElementById('mao');

// Essa é a mão do usuario
var maoAdversario = document.getElementById('ad');

// Essa é a area das cartas
var mesaCartas = document.getElementById('cartas');

// Essa é a area das cartas
var BotaoDePescar = document.getElementById('pescar');

// As possiveis cartas atualmente
var cartasPossiveis = [];

var vez = 0;

var AdversarioAchouCarta = false;

function addCarta(where){
    // O lugar atual
    let lugarAtual = document.getElementById(where);

    // Carta sendo criada
    let carta = document.createElement('div');
    
    // Pegando valores aleatorios e coloca na variavel posição, ordem: cor, valor, lugar
    let Posicao = aleatorizarValores();
    
    // cor, valor
    let valores = [Posicao[0], Posicao[1]];

    // Lugar
    let Lugar = Posicao[2];

    // Adicionando as classes
    carta.classList.add('CardItem');
    carta.classList.add(valores[0]);
    if(where == 'ad'){
        // Se adicionar a carta pro adversario, vai adicionar a classe adversario
        carta.classList.add('Adversario');
    }

    if(where == 'mao'){
        carta.setAttribute('onclick', `change(this, 'mao')`);
        carta.style.order = valores[1];
    }

    // Adiciona o número da carta
    carta.innerHTML = valores[1];
    carta.setAttribute('data-content', valores[1]);

    // Retira a carta selecionada anteriormente das possiveis
    cartasPossiveis.splice(Lugar, 1);

    // Adicionando a carta
    lugarAtual.appendChild(carta);
}

function aleatorizarValores(){
    // Pega um número aleatorio
    let NumeroAleatorio = RandomFrom(0, (cartasPossiveis.length - 1));
    
    // Ele seleciona a array dentro das cartas
    let Selecionado = cartasPossiveis[NumeroAleatorio];
    
    // Pega a cor
    let cor = Selecionado[0];
    
    // Pega o valor
    let valor = Selecionado[1];
    return [cor, valor, NumeroAleatorio];
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

    // Dar as cartas do usuario
    for(let c = 1; c <= 7; c++){
        addCarta('mao');
    }

    // Dar as cartas ao adversario
    for(let c = 1; c <= 7; c++){
        addCarta('ad');
    }

    // Colocar a carta inicial do jogo
    addCarta('cartas');
}


OnStart();

// Muda as cartas de lugar
function change(ElementoClicado, where){
    // Deleta a carta selecionada
    deletarCarta(ElementoClicado, where);

    if(where == 'mao'){
      vez = 0;
      maoUsuario.classList.add('Adversario');
      BotaoDePescar.classList.add('Adversario');
    } else {
      vez = 1;
    }

    // vez = 1
    if(vez == 0){
        setTimeout(adversario, 1500);
        vez = 1;
    }
}


function deletarCarta(Elemento, where){
    // Ver se o elemento clicado pode ser jogado
    // E.g. (5 amarelo) == (7 amarelo)
    // (Mesmo amarelo | passa)
    let permissao = verificacoes(where, 'PossibilidadeDeJogo', [Elemento]);
    if (permissao) {
        // O usuário consegue jogar esta carta
        // Remove a carta clicada
        Elemento.remove();

        // Joga a carta
        JogarCarta(Elemento);

        if(where == 'ad'){
          AdversarioAchouCarta = true;
        }

    } else {
        // O usuário não consegue jogar esta carta
        return;
    }

}

function JogarCarta(carta){
    // Apaga todas as cartas na mesa
    mesaCartas.innerHTML = "";

    // Adiciona a carta
    mesaCartas.appendChild(carta);

    // Toca o som da carta sendo jogada
    PlayCardAudio();
}

function verificacoes(IDdoLugar, ver, arraypassada = []){
    if('PossibilidadeDeJogo' == ver){
        let ElementoUsado = arraypassada[0];
        let CartaDaMesa = mesaCartas.children[0];
        
        let valorMesa = CartaDaMesa.innerHTML;
        let CorMesa = CartaDaMesa.classList[1];
        
        let CorCarta = ElementoUsado.classList[1];
        let valorCarta = ElementoUsado.innerHTML;
        
        if((valorMesa == valorCarta) || (CorCarta == CorMesa)){
          // Cartas sãoiguais
          return true;
        }else{
          // Cartas não são iguais
          return false;
        }
    }
}

function adversario(){
    console.log('adversario()');
    // let permissao //= verificacoes('CartasPossiveis');
    let permissao = true;

    AdversarioAchouCarta = false;

    if(permissao){
      let lugar = 0;
      let tamanho = maoAdversario.children.length;

      while(lugar < tamanho) {
        const childElement = maoAdversario.children[lugar];
        change(childElement, 'ad');

        if(AdversarioAchouCarta){
          console.warn("ACHOU A BOSTA DA CARTA");
          break;
        }

        console.log(lugar, tamanho);
        console.log(lugar < tamanho);
        lugar++;
      }

      if(!AdversarioAchouCarta){
        // tenta pescar
      }
    }

    maoUsuario.classList.remove('Adversario');
    BotaoDePescar.classList.remove('Adversario');
}

/* FUNCOES */
/* Random Number Between min and max */
function RandomFrom(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function PlayCardAudio(){
  // Som da carta virando
  let RandomAudio = RandomFrom(1, 4);
  let Audio = document.getElementById(`FlipCard${RandomAudio}`);
  Audio.currenTime = 0;
  Audio.play();
}

// document.onkeydown = (e) => {
//     let RandomTest = RandomFrom(1, 3);
//     if(RandomTest == 0){
//         // Som do Tiago Gritando
//         let RandomAudio = RandomFrom(1, 4);
//         let Audio = document.getElementById(`Tiago${RandomAudio}`);
//         Audio.currenTime = 0;
//     Audio.play();
//     } else if(RandomTest == 1){
//         // Som do Giovanni gritando
//         let RandomAudio = RandomFrom(1, 4);
//         let Audio = document.getElementById(`Giovanni${RandomAudio}`);
//         Audio.currenTime = 0;
//         Audio.play();
//     } else {
//         // Som da carta virando
//         let RandomAudio = RandomFrom(1, 4);
//         let Audio = document.getElementById(`FlipCard${RandomAudio}`);
//         Audio.currenTime = 0;
//         Audio.play();
//     } 
// }