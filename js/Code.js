// Variables
// Essa é a mão do usuario
var UserHand = document.getElementById("UserHand");

// Essa é a mão do usuario
var OpponentHand = document.getElementById("OpponentHand");

// Essa é a area das cartas
var TableCards = document.getElementById("TableCards");

// Essa é a area das cartas
var GetCardElement = document.getElementById("GetCard");

var Music = document.getElementById("Music");

// As possiveis cartas atualmente
var PossibleCards = [];

// var LastPlay = "User";
// var NextPlay = "User";

var NextMove = "User";

var OpponentFoundCard = false;

// var GameOver = false;
// var Win = false;

// var qtdeAcumulada = 0; // Disabilitado até chegar nesta parte

var CssFunction =
  "font-size: 1.5em; font-weight: 700; background-color: rgba(255, 255, 255, 0.5); color: black; border-radius: 16px; padding-block: 0.25em; padding-inline: 0.5em;";

var ErrorCss = "background-color: red; color: white; padding-inline: 0.5em;";

var QuantityToGet = 0;

// CONFIGURAÇÕES DE INICIO
function OnStart() {
  // Adiciona as cartas para sua variavel
  // Amarelo - 1, 2, 3, 4, ...
  DefineCards();

  // Dar as cartas do usuario
  for (let c = 1; c <= 7; c++) {
    CreateCard("User");
  }

  // Dar as cartas ao Opponent
  for (let c = 1; c <= 7; c++) {
    CreateCard("Opponent");
  }

  // Colocar a carta inicial do jogo
  CreateCard("TableCards");

  UserCanPlay(true);
}

OnStart();

function DefineCards() {
  // As cores possiveis
  let colors = ["amarelo", "verde", "vermelho", "azul"];
  // Os valores possiveis
  let values = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "+2"];

  // Colocando as cartas possiveis na array
  for (let d = 0; d < colors.length; d++) {
    let CurrentColor = colors[d];
    for (let c = 1; c < values.length; c++) {
      PossibleCards.push([CurrentColor, values[c]]);
    }
  }
}

function RandomizeValues() {
  // Pega um número aleatorio
  let NumeroAleatorio = RandomFrom(0, PossibleCards.length - 1);

  // Ele seleciona a array dentro das cartas
  let Selecionado = PossibleCards[NumeroAleatorio];

  // Retorna a COR, VALOR, NUMERO ESCOLHIDO
  return [Selecionado[0], Selecionado[1], NumeroAleatorio];
}

function CreateCard(WhereTo) {
  // Carta sendo criada
  let Card = document.createElement("div");

  // Pegando valores aleatorios e coloca na variavel posição, ordem: cor, valor, lugar
  let ChosenCard;
  if (WhereTo == "TableCards") {
    do {
      ChosenCard = RandomizeValues();
    } while (ChosenCard[1] == "+2");
  } else {
    ChosenCard = RandomizeValues();
  }

  // cor, valor
  let valores = [ChosenCard[0], ChosenCard[1]];

  // Lugar
  let Lugar = ChosenCard[2];

  // Adicionando as classes
  Card.classList.add("CardItem");
  Card.classList.add(valores[0]);
  if (WhereTo == "Opponent") {
    // Se adicionar a carta para Opponent, vai adicionar a classe Opponent
    Card.classList.add("Opponent");
  }

  if (WhereTo == "User") {
    Card.setAttribute("onclick", `PlayCard(this, 'User')`);
    Card.style.order = valores[1];
  }

  // Adiciona o número da carta
  Card.innerHTML = valores[1];
  Card.setAttribute("data-content", valores[1]);

  if (valores[1] === "+2") {
    Card.classList.add("TipoPescar");
  }

  PossibleCards.splice(Lugar, 1);

  // Adicionando a carta para onde foi escolhido
  let Test2 = "";
  if (WhereTo == "User") {
    UserHand.appendChild(Card);
    Test2 = UserHand;
  } else if (WhereTo == "Opponent") {
    OpponentHand.appendChild(Card);
    Test2 = OpponentHand;
  } else if (WhereTo == "TableCards") {
    TableCards.appendChild(Card);
  } else {
    console.log(`CreateCard('${WhereTo}')`);
    console.log("%cERROR! Trying to add a card to UNDEFINED!", ErrorCss);
    console.log(WhereTo);
  }

  if (Test2 != "" && valores[1] === "+2") {
    Test2.insertBefore(Card, Test2.children[0]);
  }
}

// JOGO
function PlayCard(ClickedElement, WhereItCame) {
  let TestWhere = "";
  if (WhereItCame == "User") {
    TestWhere = UserHand;
  } else if (WhereItCame == "Opponent") {
    TestWhere = OpponentHand;
  } else if (WhereItCame == "TableCards") {
    TestWhere = TableCards;
  } else {
    console.log(`PlayCard('${ClickedElement}', '${WhereItCame}')`);
    console.log("%cERROR! Trying to PlayCard a card that is UNDEFINED!", ErrorCss);
    console.log(ClickedElement);
    console.log(WhereItCame);
    return;
  }

  let UserBefore = UserHand.children.length;
  let OpponentBefore = OpponentHand.children.length;

  // Deleta a carta selecionada
  let PlayedThatCard = TryToPlayTheCard(ClickedElement, TestWhere);

  if (Verify("User", "HasTheCards") == 0) {
    PlayWinAudio();
    Win = true;
    FinishGame();
    return;
  }
  if (Verify("Opponent", "HasTheCards") == 0) {
    PlayLoseAudio();
    Win = false;
    FinishGame();
    return;
  }
  if (Verify("User", "HasTheCards") == 1 && UserBefore == 2) {
    PlayTiagoAudio();
  }
  if (Verify("Opponent", "HasTheCards") == 1 && OpponentBefore == 2) {
    PlayGiovanniAudio();
  }

  // && Tirou == true

  // console.log(`%cPlayCard('${ClickedElement.id}', '${WhereItCame}')`, CssFunction);
  // console.log(ClickedElement);

  // The user clicked on the card and he can play that card
  if (WhereItCame == "User" && PlayedThatCard) {
    // vez = "User";
    // NextPlay = "Opponent";
    // console.warn("Usuário jogou");

    // let WhereToTest = WhereItCame == "User" ? OpponentHand : UserHand;

    // TESTANDO a
    // console.log("----- UpdateNextMove ADVERSARIO ------");

    NextMove = "Opponent";
    UpdateNextMove();

    // setTimeout(() => {
    //   console.log("----- 2s passou ------");
    //   let ELETEMMAISDOIS = Verify(OpponentHand, "TryToGetMoreCards");
    //   console.warn("Fez os baguio zuado");

    //   if (ELETEMMAISDOIS) {
    //     NextMove = "Opponent";
    //     UpdateNextMove();
    //   } else {
    //     NextMove = "Opponent";
    //     UpdateNextMove();
    //   }
    // }, 2000);

    // NextMove = "Opponent";
    // UpdateNextMove(NextMove);
    // console.warn(vez);

    // console.warn("TALVEZ o Adversário vai jogar");
    // if (vez == "User") {
    // let CurrentWhereHasTwo = false;
    // for (let i = 0; i < OpponentHand.children.length; i++) {
    //   const Child = OpponentHand.children[i];

    //   let TemMaisDois = Verify(OpponentHand, "CanPlayTheCard", [Child, "+2"]);
    //   if (TemMaisDois) {
    //     CurrentWhereHasTwo = true;
    //     console.warn("Adversário vai jogar");
    //     break;
    //   }
    // }
    // if (CurrentWhereHasTwo) {
    // setTimeout(Opponent, 1500);
    // }
  }

  // if (WhereItCame == "Opponent" && PlayedThatCard) {
  // }
}

function TryToPlayTheCard(CardToPlay, TestWhere) {
  // Ver se o elemento clicado pode ser jogado
  // E.g. (5 amarelo) == (7 amarelo) -> (Mesmo amarelo | passa)

  let CanPlayTheCard = Verify(TestWhere, "CanPlayTheCard", [CardToPlay]);
  if (CanPlayTheCard) {
    // Remove a carta clicada
    CardToPlay.remove();

    // console.log(TestWhere.id);
    if (TestWhere.id == "OpponentHand") {
      OpponentFoundCard = true;

      // Remove a classe de oponente para conseguir ver a carta
      CardToPlay.classList.remove("Opponent");
    }

    CardToPlay.classList.add(TestWhere.id);

    // if (jogou == "ad") {
    //   jogou = "mao";
    // } else if (jogou == "mao") {
    //   jogou = "ad";
    // }
    // verificacoes(jogou, "CartasDePesca");

    // Joga a carta
    PlayThatCard(CardToPlay);

    let CurrentTableCard = TableCards.children[0];
    let ValorMesa = CurrentTableCard.innerHTML;
    let LastPlay = CurrentTableCard.classList[2];

    // console.log(LastPlay);

    if (ValorMesa == "+2") {
      // console.log("ULTIMA CARTA É +2");
      QuantityToGet += 2;

      let WhereToTest = TestWhere.id == "UserHand" ? OpponentHand : UserHand;

      // console.log(`ELE VEIO DE`, TestWhere);
      // console.log(`ELE VAI TESTAR ALI Ó`, WhereToTest);
      Verify(WhereToTest, "TryToGetMoreCards");
    }
  }

  // TRUE  = O usuário  -> consegue jogar esta carta
  // FALSE = O usuário não consegue jogar esta carta
  return CanPlayTheCard;
}

function Verify(Where, Type, Params = []) {
  if (Type == "CanPlayTheCard") {
    if (Params[1] === "+2") {
      let ParamPassed = Params[0];
      // let CurrentTableCard = TableCards.children[0];

      let ValorCarta = ParamPassed.innerHTML;

      if (ValorCarta === "+2") {
        // A CARTA É UM +2
        return true;
      } else {
        // A CARTA NÃO É UM +2
        return false;
      }
    } else {
      let ParamPassed = Params[0];
      let CurrentTableCard = TableCards.children[0];

      let ValorMesa = CurrentTableCard.innerHTML;
      let CorMesa = CurrentTableCard.classList[1];

      let CorCarta = ParamPassed.classList[1];
      let ValorCarta = ParamPassed.innerHTML;
      // let ThisPlay = ParamPassed.innerHTML;

      // if(valorMesa == '+2'){
      // let atual = document.getElementById(IDdoLugar)
      // for(let c = 0; c < atual.children.length; c++){
      // if(atual.children[c].innerHTML == '+2')
      // Ignora
      // }
      // }

      if (ValorMesa == ValorCarta || CorCarta == CorMesa) {
        // Cartas são iguais, pode jogar está carta
        return true;
      } else {
        // Cartas não são iguais, não pode jogar está carta
        return false;
      }
    }
  } else if (Type == "HasTheCards") {
    let TestWhere = "";
    if (Where == "User") {
      TestWhere = UserHand;
    } else if (Where == "Opponent") {
      TestWhere = OpponentHand;
    } else if (Where == "TableCards") {
      TestWhere = TableCards;
    } else {
      console.log(`Verify('${Where}', '${Type}', '${Params}')`);
      console.log("%cERROR! Trying to PlayCard a card that is UNDEFINED!", ErrorCss);
      console.log(Where);
      console.log(Type);
      console.log(Params);
      return;
    }

    return TestWhere.children.length;
  } else if (Type == "TryToGetMoreCards") {
    // console.log("Verify(Where, Type, Params = [])");
    // console.log(Where.id);
    // console.log(Where);
    // console.log(Type);
    let CurrentWhereHasTwo = false;
    let CardElement = null;
    let Times = Where.children.length;

    for (let i = 0; i < Times; i++) {
      const Child = Where.children[i];

      let TemMaisDois = Verify(Where, "CanPlayTheCard", [Child, "+2"]);
      if (TemMaisDois) {
        CardElement = Child;
        CurrentWhereHasTwo = true;
        console.log("ELE ACHOU UM +2 NO " + Where.id);
        break;
      }
    }

    if (!CurrentWhereHasTwo) {
      let GetCardsWhere = "";
      if (Where.id == "UserHand") {
        GetCardsWhere = "User";
      } else {
        GetCardsWhere = "Opponent";
      }
      for (let i = 0; i < QuantityToGet; i++) {
        GetNewCard(GetCardsWhere, true);
      }
      QuantityToGet = 0;

      // console.log("Ali Não tem carta", Where.id);
      // let WhereToTest = Where.id == "UserHand" ? "Opponent" : "User";
      // NextMove = WhereToTest;
      // UpdateNextMove();
      return [false, null];
    } else {
      // console.log("Tem carta", Where.id);

      // let WhereToTest = Where.id == "UserHand" ? "User" : "Opponent";
      // NextMove = WhereToTest;
      // UpdateNextMove();
      // if (Where.id == "Opponent") {
      if (QuantityToGet > 0) {
        return [true, CardElement];
      } else {
        return [false, null];
      }
    }
  } else {
    console.log(`%cVerify('${Where.id}', '${Type}', ${JSON.stringify(Params)})`);
    console.log("%cERROR! Trying to Verify a card that is UNDEFINED!", ErrorCss);
    console.log(Where);
    console.log(Type);
    console.log(Params);
    return;
  }
}

function PlayThatCard(Card) {
  // Apaga todas as cartas na mesa
  TableCards.innerHTML = "";

  // Adiciona a carta
  TableCards.appendChild(Card);

  // // if(jogou == 'ad'){
  // //   jogou = 'mao'
  // // }else if(jogou == 'mao'){
  // //   jogou = 'ad'
  // // }
  // // verificacoes(jogou, 'CartasDePesca')
  // // console.log(jogou);
  // if (vez == "Opponent") {
  //   console.log("Ele saiu com a vez do Oponente");
  // } else {
  //   console.log("Ele saiu com a vez do User");
  // }
  // Toca o som da carta sendo jogada
  PlayCardAudio();
}

function Opponent() {
  console.log("%cOpponent()", CssFunction);
  OpponentFoundCard = false;

  if (TableCards.children[0].innerText == "+2") {
    // Tem uma carta de mais dois na mesa
    console.log("Tem uma carta de mais dois na mesa");

    // Verifica se o adverário tem uma carta de mais dois
    let CurrentWhereHasTwo = false;

    CurrentWhereHasTwo = Verify(OpponentHand, "TryToGetMoreCards");

    if (CurrentWhereHasTwo[0]) {
      console.log("O adversário tem uma carta de mais dois");

      console.log("Ele vai jogar");
      console.log(CurrentWhereHasTwo[1]);
      console.log([CurrentWhereHasTwo[1]]);

      PlayCard(CurrentWhereHasTwo[1], "Opponent"); // Joga a carta

      NextMove = "User";
      UpdateNextMove();
    } else {
      console.log("O adversário NÃO tem uma carta de mais dois");

      NextMove = "User";
      UpdateNextMove();
    }
  } else {
    console.log("Tem uma carta QUE NÃO É de mais dois na mesa");

    let Trying = 0;
    let OpponentCardsLength = OpponentHand.children.length;

    // Analisa todas as cartas do adversário e vê se ele consegue jogar
    while (Trying < OpponentCardsLength) {
      const TestCard = OpponentHand.children[Trying];
      // console.log(TestCard);
      // console.log(OpponentFoundCard);

      PlayCard(TestCard, "Opponent"); // Tenta jogar a carta
      if (OpponentFoundCard) {
        // console.log("Opponent Found THE Card, and played it!!");
        break;
      }

      Trying++;
    }

    // Se ele não conseguir jogar nenhuma
    if (!OpponentFoundCard) {
      console.log("Opponent Didn't Found THE Card");
      // Pesca e tenta jogar a pescada
      GetNewCard("Opponent", true);
      setTimeout(() => {
        PlayCard(OpponentHand.children[OpponentHand.children.length - 1], "Opponent"); // Tenta jogar a carta
      }, 750);
    }

    // Se ele conseguir ou não conseguir passa a vez para o usuário

    console.warn("Adversário jogou");
    setTimeout(() => {
      NextMove = "User";
      UpdateNextMove();
    }, 1000);
  }
}

function GetNewCard(Where, Required = false) {
  let FoundCard = false;
  if (PossibleCards.length == 0) {
    // Se não tiver mais cartas, define novas
    DefineCards();
  } else {
    if (Where == "User") {
      if (Required) {
        CreateCard(Where);
        PlayCardAudio();

        // UserCanPlay(true);
      } else {
        for (let c = 0; c < UserHand.children.length; c++) {
          if (
            UserHand.children[c].classList[1] == TableCards.children[0].classList[1] ||
            UserHand.children[c].innerHTML == TableCards.children[0].innerHTML
          ) {
            FoundCard = true;
          }
        }
        if (!FoundCard) {
          CreateCard(Where);
          PlayCardAudio();
          for (let c = 0; c < UserHand.children.length; c++) {
            if (
              UserHand.children[c].classList[1] == TableCards.children[0].classList[1] ||
              UserHand.children[c].innerHTML == TableCards.children[0].innerHTML
            ) {
              FoundCard = true;
            }
          }
          if (!FoundCard) {
            UserCanPlay(false);
            setTimeout(Opponent, 1500);
          }
        }
        UserCanPlay(true);
        GetCardElement.classList.remove("TemQuePescar");
      }
    } else {
      CreateCard(Where);
      PlayCardAudio();
    }
  }
}

function UpdateNextMove() {
  if (NextMove == "User") {
    console.warn("Usuário vai jogar");
    UserCanPlay(true);
  } else {
    UserCanPlay(false);
    console.warn("Adversário vai jogar");
    setTimeout(Opponent, 1500);
  }
}

/*
  OnStart         = OnStart
  DefinirCartas   = DefineCards
  RandomizeValues = RandomizeValues
  CreateCard      = CreateCard
  PlayCard        = PlayCard
  DeleteCard      = TryToPlayTheCard
  JogarCarta      = PlayThatCard
  verificacoes    = Verify
  Opponent        = Opponent
  pescar          = GetNewCard
  FinishGame      = FinishGame
*/
