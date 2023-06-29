var cartas = document.getElementById('cartas');
var mao = document.getElementById('mao');
var vez = 1

CartasPossiveis = [[], [], [], []];

// StartGame
  // Carregado logo ao carregar a pagina
  // Da o valor as arrays de carta
  for (let c = 0; c < 4; c++) {
    for(let e = 0; e < 2; e++){
      for (let d = 0; d < 9; d++) {
        CartasPossiveis[c].push(d + 1);
      }
    }
  }
  console.log(CartasPossiveis);

  // Adiciona a carta inicial
  let valores = Randomize();

  AddCard(valores[0], valores[1], 'cartas')
  console.log(' --> ACABOU O INICIO');

  for (let c = 0; c < 7; c++) {
    CreateCards('mao');
    CreateCards('ad');
  }

// Functions 
function Randomize() {
  // Seleciona uma carta aleatoria das possiveis
  let a = true;
  let cor = 0;

  // Código que analisa se a há carta para escolher 
  while (a) {
    cor = Math.floor(Math.random() * CartasPossiveis.length);
    if (CartasPossiveis[cor].length > 0) {
      break

    } else if (CartasPossiveis[0].length == 0 && CartasPossiveis[1].length == 0 && CartasPossiveis[2].length == 0 && CartasPossiveis[3].length == 0) {
      alert('Acabou as cartas de pesca');
      window.location.reload()
      return -1, -1;

    }
  }

  let valor = Math.floor(Math.random() * CartasPossiveis[cor].length);
  console.log('Randomize : ' + cor + ', ' + valor);
  return [cor, valor];
}

// Adiciona a carta
function AddCard(CardColor, CardValue, Where, switching) {
  let cartas = document.getElementById(Where);
  let carta = document.createElement('div');
  let CardType = 'none';

  valores = [CardColor, CardValue];

  switch (valores[0]) {
    case 0:
      CardType = 'verde';
      carta.id = (valores[1] + 1);
      break

    case 1:
      CardType = 'vermelho';
      carta.id = '1' + (valores[1] + 1);
      break

    case 2:
      CardType = 'azul';
      carta.id = '2' + (valores[1] + 1);
      break

    case 3:
      CardType = 'amarelo';
      carta.id = '3' + (valores[1] + 1);
  }

  if(Where == 'ad'){
    carta.className = `CardItem ${CardType} adver`;

  }else{
    carta.className = `CardItem ${CardType}`;
  }
  
  if(switching){
    carta.innerHTML = CardValue;
    carta.setAttribute('data-content', CardValue);
  } else {
    carta.innerHTML = CartasPossiveis[valores[0]][valores[1]];
    carta.setAttribute('data-content', CartasPossiveis[valores[0]][valores[1]]);

    CartasPossiveis[valores[0]].splice(valores[1], 1);

    if(Where == 'ad'){
      carta.className = `CardItem ${CardType} adver`;
  
    }else{
      if(Number(carta.innerHTML) == 6 || Number(carta.innerHTML) == 9){
        carta.className = `CardItem ${CardType} underline`;
      } else {
        carta.className = `CardItem ${CardType}`;
      }
    }
  }

  if (Where == 'mao') {
    // carta.addEventListener('click', function click() {
    //   Change(this.id);
    // })
    
    carta.setAttribute('onclick', 'Change(this)');
  }

  cartas.appendChild(carta);

  CardAudio();
}

// Create Cards
function CreateCards(where){
  let valores = Randomize();

  AddCard(valores[0], valores[1], where);
}

// --
function Change(element){
    let colorType = Number(element.id,0);
    let color = 0;
    let value = Number(element.innerHTML);

    if(colorType < 10){
        // console.log('verde');
        color = 0;
    } else if (colorType < 20){
        // console.log('vermelho');
        color = 1;
    } else if (colorType < 30){
        // console.log('azul');
        color = 2;
    } else {
        // console.log('amarelo');
        color = 3;
    }

    // console.log('color', color);
    // console.log('CardValue', value);

    
    if((document.getElementById('cartas').children[0].classList[1] == element.classList[1]) || (value == document.getElementById('cartas').innerText)){
        AddCard(color, value, 'cartas', true);
        console.log('a vez é :' + vez)
        if(vez == 0){
            vez = 1
            let algo = document.getElementById('ad')
            algo.removeChild(element)
        }else{
            
            
            console.log('entrou')
            mao.removeChild(element);
            vez = 0
        }
    
        let elementToRemove = cartas.children[0];
    
        console.log(elementToRemove);
    
        color = Number(elementToRemove.id);
    
        console.log('color -- ', color);
        
        if(color < 10){
        color = 0;
        } else if (color < 20){
        color = 1;
        } else if (color < 30){
        color = 2;
        } else {
        color = 3;
        }
    
        value = Number(elementToRemove.innerHTML);
    
        console.log('color', color);
        console.log('value', value);
        
    //   AddCard(color, value, 'mao', true);
    
        cartas.removeChild(elementToRemove);
        if(document.getElementById('mao').children.length == 0){
            document.getElementById('pescar').style.display = 'none'
            alert('Parabéns, você ganhou!')
            window.location.reload()
        }else if(document.getElementById('ad').children.length == 0){
            document.getElementById('pescar').style.display = 'none'
            alert('O adversário ganhou!')
            window.location.reload()
        }else if(document.getElementById('mao').children.length == 1){
          // Som do Tiago Gritando
          let RandomAudio = RandomFrom(1, 4);
          let Audio = document.getElementById(`Tiago${RandomAudio}`);
          Audio.currenTime = 0;
          Audio.play();
        }else if(document.getElementById('ad').children.length == 1){
          // Som do Giovanni gritando
          let RandomAudio = RandomFrom(1, 4);
          let Audio = document.getElementById(`Giovanni${RandomAudio}`);
          Audio.currenTime = 0;
          Audio.play();
        }
    }
        if(vez == 1){
            return
        }
        
        if(vez == 0){
          mao.classList.add('Adversario');
        }

        setTimeout(adversario, 1500);
        
    }
  


    function adversario(){
    let achou = 'nao'
    for(let c = 0; c < document.getElementById('ad').children.length; c++){
        if((document.getElementById('ad').children[c].classList[1] == document.getElementById('cartas').children[0].classList[1]) || (document.getElementById('ad').children[c].innerText == document.getElementById('cartas').children[0].innerText)){
            Change(document.getElementById('ad').children[c])
            achou = 'yep'
            mao.classList.remove('Adversario');
            break
        }
    }
    if(achou =='nao'){
        pescar('ad')
        for(let c = 0; c < document.getElementById('ad').children.length; c++){
            if((document.getElementById('ad').children[c].classList[1] == document.getElementById('cartas').children[0].classList[1]) || (document.getElementById('ad').children[c].innerText == document.getElementById('cartas').children[0].innerText)){
                Change(document.getElementById('ad').children[c])
                achou = 'yep'
                mao.classList.remove('Adversario');
                break
            }
        }
        if(achou == 'nao'){
            vez = 1;
            mao.classList.remove('Adversario');
            return
        }
    }
}

function pescar(algo){
    let achou = 'nao'
    if(algo == 'mao'){
      for(let c = 0; c < document.getElementById('mao').children.length; c++){
        if((document.getElementById('mao').children[c].classList[1] == document.getElementById('cartas').children[0].classList[1]) || (document.getElementById('mao').children[c].innerText == document.getElementById('cartas').children[0].innerText)){
          achou = 'yep'
        }
      }
    }
    if(algo != 'mao' || achou == 'nao'){
      CreateCards(algo)
    if(algo == 'mao'){
      console.log('entrou no verificador')
      let achou = 'nop'
            for(let c = 0; c < document.getElementById('mao').children.length; c++){
              if((document.getElementById('mao').children[c].classList[1] == document.getElementById('cartas').children[0].classList[1]) || (document.getElementById('mao').children[c].innerText == document.getElementById('cartas').children[0].innerText)){
                console.log('Ele achou uma opção')
                achou = 'yep'
              }
    }
      if(achou != 'yep'){
        let mao = document.getElementById('mao')
        console.log('ele n achou uma opção')
        vez = 0;
        mao.classList.add('Adversario');
        setTimeout(adversario, 1500)
        return
      }
  }

    }
    
}

function CardAudio(){
  // Som da carta virando
  let RandomAudio = RandomFrom(1, 4);
  let Audio = document.getElementById(`FlipCard${RandomAudio}`);
  Audio.currenTime = 0;
  Audio.play();
}

/* Random Number Between min and max */
function RandomFrom(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}