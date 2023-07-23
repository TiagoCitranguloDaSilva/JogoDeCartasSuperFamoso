function PlayCardAudio() {
  // Som da carta virando
  let RandomAudio = RandomFrom(1, 4);
  let Audio = document.getElementById(`FlipCard${RandomAudio}`);
  Audio.currenTime = 0;
  Audio.play();
}

function PlayGiovanniAudio() {
  // Som do Giovanni gritando
  let RandomAudio = RandomFrom(1, 4);
  let Audio = document.getElementById(`Giovanni${RandomAudio}`);
  Audio.currenTime = 0;
  Audio.play();
}

function PlayTiagoAudio() {
  // Som do Tiago Gritando
  let RandomAudio = RandomFrom(1, 4);
  let Audio = document.getElementById(`Tiago${RandomAudio}`);
  Audio.currenTime = 0;
  Audio.play();
}

function PlayWinAudio() {
  let Win = document.getElementById("Win");
  Win.currenTime = 0;
  Win.play();
}

function PlayLoseAudio() {
  let Lose = document.getElementById("Lose");
  Lose.currenTime = 0;
  Lose.play();
}

document.onkeydown = (e) => {
  if (e.code == "ArrowUp") {
    let value = Music.volume + 0.1;
    Music.volume = clamp(value, 0, 1);
  } else if (e.code == "ArrowDown") {
    let value = Music.volume - 0.1;
    Music.volume = clamp(value, 0, 1);
  } else if (e.code == "ArrowLeft") {
    let value = Music.playbackRate - 0.1;
    Music.playbackRate = clamp(value, 0.1, 2);
  } else if (e.code == "ArrowRight") {
    let value = Music.playbackRate + 0.1;
    Music.playbackRate = clamp(value, 0.1, 2);
  } else if (e.code == "KeyM") {
    Music.muted = !Music.muted;
    Music.playbackRate = 1;
  }
};

function StartMusic() {
  Music.currenTime = 0;
  Music.loop = "true";
  Music.volume = 0.3;
  // Music.playbackRate = 1;
  // Music.play();

  document.getElementsByTagName("body")[0].removeAttribute("onclick");
}
