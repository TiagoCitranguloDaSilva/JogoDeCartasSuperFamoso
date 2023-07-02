// Variáveis
// Essa é a mão do usuario
var UserHand = document.getElementById("mao");

// Essa é a mão do usuario
var maoOpponent = document.getElementById("ad");

// Essa é a area das cartas
var mesaCartas = document.getElementById("cartas");

// Essa é a area das cartas
var BotaoDePescar = document.getElementById("pescar");

var Music = document.getElementById("Music");

// As possiveis cartas atualmente
var cartasPossiveis = [];

var vez = "User";

var OpponentAchouCarta = false;

var CssFunction =
  "font-size: 1.5em; font-weight: 700; background-color: rgba(255, 255, 255, 0.5);" +
  "color: black; border-radius: 16px; padding-block: 0.25em; padding-inline: 0.5em;";

function CreateCard(WhereTo) {
  // console.log(`%cCreateCard('${WhereTo}')`, CssFunction);
  // O lugar atual
  let lugarAtual = document.getElementById(WhereTo);

  // Carta sendo criada
  let Card = document.createElement("div");

  // Pegando valores aleatorios e coloca na variavel posição, ordem: cor, valor, lugar
  let Posicao = RandomizeValues();

  // cor, valor
  let valores = [Posicao[0], Posicao[1]];

  // Lugar
  let Lugar = Posicao[2];

  // Adicionando as classes
  Card.classList.add("CardItem");
  Card.classList.add(valores[0]);
  if (WhereTo == "ad") {
    // Se adicionar a carta pro Opponent, vai adicionar a classe Opponent
    Card.classList.add("Opponent");
  }

  if (WhereTo == "mao") {
    Card.setAttribute("onclick", `PlayCard(this, 'mao')`);
    Card.style.order = valores[1];
  }

  // Adiciona o número da carta
  Card.innerHTML = valores[1];
  Card.setAttribute("data-content", valores[1]);

  cartasPossiveis.splice(Lugar, 1);

  // Adicionando a carta
  lugarAtual.appendChild(Card);
}

function RandomizeValues() {
  // Pega um número aleatorio
  let NumeroAleatorio = RandomFrom(0, cartasPossiveis.length - 1);

  // Ele seleciona a array dentro das cartas
  let Selecionado = cartasPossiveis[NumeroAleatorio];

  // Pega a cor
  let cor = Selecionado[0];

  // Pega o valor
  let valor = Selecionado[1];
  return [cor, valor, NumeroAleatorio];
}

function OnStart() {
  // As cores possiveis
  let cores = ["amarelo", "verde", "vermelho", "azul"];

  // Colocando as cartas possiveis na array
  for (let d = 0; d < cores.length; d++) {
    let atual = cores[d];
    for (let c = 1; c <= 9; c++) {
      cartasPossiveis.push([atual, c]);
    }
  }

  // Dar as cartas do usuario
  for (let c = 1; c <= 7; c++) {
    CreateCard("mao");
  }

  // Dar as cartas ao Opponent
  for (let c = 1; c <= 7; c++) {
    CreateCard("ad");
  }

  // Colocar a carta inicial do jogo
  CreateCard("cartas");

  UserCanPlay(true);
}

OnStart();

// Muda as cartas de lugar
function PlayCard(ElementoClicado, where, Tent = "") {
  AnteriorMao = UserHand.children.length;
  AnteriorAd = maoOpponent.children.length;

  // console.log(`%cPlayCard('${ElementoClicado.classList} + ${ElementoClicado.id}', ${where}')`, CssFunction);
  // Deleta a carta selecionada
  let Tirou = DeleteCard(ElementoClicado, where);

  // if(PrimeiraTent == false && Tent == 'nula'){
  //   console.log('Entrou na falsidade');
  //   if(where == 'mao'){
  //     return;
  //   }
  // }

  if (verificacoes("mao", "TemCartas") == 0) {
    alert("Parabéns, você ganhou!");
    PlayWinAudio();
    window.location.reload();
    return;
  }
  if (verificacoes("ad", "TemCartas") == 0) {
    alert("O adversário ganhou!");
    PlayLoseAudio();
    window.location.reload();
    return;
  }
  if (verificacoes("mao", "TemCartas") == 1 && AnteriorMao == 2) {
    PlayTiagoAudio();
  }
  if (verificacoes("ad", "TemCartas") == 1 && AnteriorAd == 2) {
    PlayGiovanniAudio();
  }

  if (where == "mao" && Tirou == true) {
    vez = "User";
    UserCanPlay(false);

    setTimeout(Opponent, 1500);
  } else {
    vez = "Opponent";
  }
}

function DeleteCard(Elemento, where) {
  // console.log(`%cDeleteCard('${Elemento.classList} + ${Elemento.id}', '${where}')`, CssFunction);
  // Ver se o elemento clicado pode ser jogado
  // E.g. (5 amarelo) == (7 amarelo)
  // (Mesmo amarelo | passa)
  let permissao = verificacoes(where, "PossibilidadeDeJogo", [Elemento]);
  if (permissao) {
    // O usuário consegue jogar esta carta
    // Remove a carta clicada
    Elemento.remove();

    if (where == "ad") {
      OpponentAchouCarta = true;

      Elemento.classList.remove("Opponent");
    }

    // Joga a carta
    JogarCarta(Elemento);
    return true;
  } else {
    // O usuário não consegue jogar esta carta
    return false;
  }
}

function JogarCarta(carta) {
  // console.log(`%cJogarCarta('${carta.classList}', '${carta.id}')`, CssFunction);
  // Apaga todas as cartas na mesa
  mesaCartas.innerHTML = "";

  // Adiciona a carta
  mesaCartas.appendChild(carta);

  // Toca o som da carta sendo jogada
  PlayCardAudio();
}

function verificacoes(IDdoLugar, ver, arraypassada = []) {
  if ("PossibilidadeDeJogo" == ver) {
    let ElementoUsado = arraypassada[0];
    let CartaDaMesa = mesaCartas.children[0];

    let valorMesa = CartaDaMesa.innerHTML;
    let CorMesa = CartaDaMesa.classList[1];

    let CorCarta = ElementoUsado.classList[1];
    let valorCarta = ElementoUsado.innerHTML;

    if (valorMesa == valorCarta || CorCarta == CorMesa) {
      // Cartas sãoiguais
      return true;
    } else {
      // Cartas não são iguais
      return false;
    }
  }
  if (ver == "TemCartas") {
    let atual = document.getElementById(IDdoLugar);
    return atual.children.length;
  }
}

function Opponent(Tentativa = "nula") {
  // console.log(`%cOpponent('${Tentativa}')`, CssFunction);
  let permissao = true;
  OpponentAchouCarta = false;

  if (permissao) {
    let lugar = 0;
    let tamanho = maoOpponent.children.length;

    while (lugar < tamanho) {
      const childElement = maoOpponent.children[lugar];
      PlayCard(childElement, "ad", Tentativa); // Tenta jogar a carta

      if (OpponentAchouCarta) {
        break;
      }

      // console.log(lugar, tamanho);
      // console.log(lugar < tamanho);
      lugar++;
    }

    if (!OpponentAchouCarta) {
      pescar("ad");
      setTimeout(() => {
        PlayCard(maoOpponent.children[maoOpponent.children.length - 1], "ad", Tentativa); // Tenta jogar a carta
      }, 750);
    }
  }

  setTimeout(() => {
    UserCanPlay(true);
    vez = "User";
  }, 1000);
}

function pescar(where) {
  if (cartasPossiveis.length == 0) {
    for (let d = 0; d < cores.length; d++) {
      let atual = cores[d];
      for (let c = 1; c <= 9; c++) {
        cartasPossiveis.push([atual, c]);
      }
    }
  } else {
    if (where == "mao") {
      let achou = "nop";
      for (let c = 0; c < UserHand.children.length; c++) {
        if (
          UserHand.children[c].classList[1] == mesaCartas.children[0].classList[1] ||
          UserHand.children[c].innerHTML == mesaCartas.children[0].innerHTML
        ) {
          achou = "yep";
        }
      }
      if (achou == "nop") {
        CreateCard(where);
        for (let c = 0; c < UserHand.children.length; c++) {
          if (
            UserHand.children[c].classList[1] == mesaCartas.children[0].classList[1] ||
            UserHand.children[c].innerHTML == mesaCartas.children[0].innerHTML
          ) {
            achou = "yep";
          }
        }
        if (achou == "nop") {
          UserCanPlay(false);
          setTimeout(Opponent, 1500);
        }
      }
      UserCanPlay(true);
      BotaoDePescar.classList.remove("TemQuePescar");
    } else {
      CreateCard(where);
    }
  }
}

/* FUNCOES */
/* Random Number Between min and max */
function RandomFrom(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function clamp(number, min, max) {
  return Math.max(min, Math.min(number, max));
}

function UserCanPlay(Can) {
  if (Can) {
    UserHand.classList.remove("OpponentIsPlaying");
    BotaoDePescar.classList.remove("OpponentIsPlaying");

    let CantPlaySum = 0;

    for (var i = 0; i < UserHand.children.length; i++) {
      var card = UserHand.children[i];

      var CartaDaMesa = mesaCartas.children[0];
      var CorDela = CartaDaMesa.classList[1];
      var ValorDela = CartaDaMesa.innerHTML;

      if (card.classList[1] == CorDela || card.innerHTML == ValorDela) {
        card.classList.remove("CantPlayThisCard");
      } else {
        CantPlaySum += 1;
        card.classList.add("CantPlayThisCard");
      }
    }

    // UserHand.querySelectorAll('.CantPlayThisCard').length

    if (CantPlaySum == UserHand.children.length) {
      // usuário tem que pescar
      BotaoDePescar.classList.add("TemQuePescar");
    } else {
      BotaoDePescar.classList.remove("TemQuePescar");
    }
  } else {
    UserHand.classList.add("OpponentIsPlaying");
    BotaoDePescar.classList.add("OpponentIsPlaying");
    BotaoDePescar.classList.remove("TemQuePescar");
  }
}
