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
    GetCardElement.classList.remove("OpponentIsPlaying");

    let CantPlaySum = 0;

    for (var i = 0; i < UserHand.children.length; i++) {
      var card = UserHand.children[i];

      var CartaDaMesa = TableCards.children[0];
      var CorDela = CartaDaMesa.classList[1];
      var ValorDela = CartaDaMesa.innerHTML;
      // card.classList.contains('TipoPescar')

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
      GetCardElement.classList.add("TemQuePescar");
    } else {
      GetCardElement.classList.remove("TemQuePescar");
    }
  } else {
    UserHand.classList.add("OpponentIsPlaying");
    GetCardElement.classList.add("OpponentIsPlaying");
    GetCardElement.classList.remove("TemQuePescar");
  }
}

function FinishGame() {
  if (Win) {
    alert("Parabéns, você ganhou!");
  } else {
    alert("O adversário ganhou!");
  }

  GameOver = true;
  UserCanPlay(false);

  // setTimeout(() => {
  //   window.location.reload();
  // }, 2000);
}

function CRIARCARTA() {
  var Onde = document.getElementById("Onde");
  var Valor = document.getElementById("Valor");
  var Cor = document.getElementById("Cor");

  Onde = Onde.selectedOptions[0].innerText;
  Valor = Valor.value;
  Cor = Cor.selectedOptions[0].innerText;

  // --

  // O lugar atual
  let lugarAtual = document.getElementById(Onde);
  // Carta sendo criada
  let Card = document.createElement("div");
  // Pegando valores aleatorios e coloca na variavel posição, ordem: cor, valor, lugar

  // cor, valor
  let valores = [Cor, Valor];

  // Adicionando as classes
  Card.classList.add("CardItem");
  Card.classList.add(valores[0]);
  if (Onde == "OpponentHand") {
    // Se adicionar a carta pro Opponent, vai adicionar a classe Opponent
    Card.classList.add("Opponent");
  }

  if (Onde == "UserHand") {
    Card.setAttribute("onclick", `PlayCard(this, 'User')`);
    Card.style.order = valores[1];
  }

  // Adiciona o número da carta
  Card.innerHTML = valores[1];
  Card.setAttribute("data-content", valores[1]);

  if (valores[1] === "+2") {
    Card.classList.add("TipoPescar");
  }

  // Adicionando a carta para onde foi escolhido
  let Test2 = "";
  if (Onde == "UserHand") {
    UserHand.appendChild(Card);
    Test2 = UserHand;
  } else if (Onde == "OpponentHand") {
    OpponentHand.appendChild(Card);
    Test2 = OpponentHand;
  } else {
    console.log(`CreateCard('${WhereTo}')`);
    console.log("%cERROR! Trying to add a card to UNDEFINED!", ErrorCss);
    console.log(WhereTo);
  }

  if (Test2 != "" && valores[1] === "+2") {
    Test2.insertBefore(Card, Test2.children[0]);
  }
}
