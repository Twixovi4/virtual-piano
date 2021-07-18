const notes = document.querySelectorAll(".piano-key");
const piano = document.querySelector(".piano");
const btnSwitch = document.querySelectorAll(".btn");

function switchLetter(e) {
  let btn = e.target;
  let btnActive = document.querySelector(".btn-active");
  if (e.target.className == "btn btn-letters") {
    btn.classList.add("btn-active");
    btnActive.classList.remove("btn-active");
    notes.forEach((items) => {
      items.classList.add("piano-key-letter");
    });
  } else if (e.target.className == "btn btn-notes") {
    btn.classList.add("btn-active");
    btnActive.classList.remove("btn-active");
    notes.forEach((items) => {
      items.classList.remove("piano-key-letter");
    });
  }
}
function toggleScreen() {
  if (document.fullscreenElement === null) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.fullscreenEnabled) {
      document.exitFullscreen();
    }
  }
}
function playAudioKeyboard(e) {
  if (e.repeat) {
    return;
  }
  let flag = e.code;
  notes.forEach((key) => {
    if (flag == key.dataset.key) {
      let audio = new Audio(`./assets/audio/${key.dataset.note}.mp3`);
      audio.currentTime = 0;
      audio.play();
      key.classList.add("piano-key-active");
    }
  });
}
function returnAudioKeyboard(e) {
  let flag = e.code;
  notes.forEach((key) => {
    if (flag == key.dataset.key) {
      key.classList.remove("piano-key-active");
    }
  });
}
function playAudio(e) {
  let key = e.target;
  key.classList.add("piano-key-active");
  key.classList.add("piano-key-active-pseudo");
  let note = document.getElementById(key.dataset.note);
  note.currentTime = 0;
  note.play();
}
function stopAudio(e) {
  let key = e.target;
  key.classList.remove("piano-key-active");
  key.classList.remove("piano-key-active-pseudo");
}
function startCorrespondOver(event) {
  if (event.target.classList.contains("piano-key")) {
    event.target.classList.add("piano-key-active");
    let note = document.getElementById(event.target.dataset.note);
    note.currentTime = 0;
    note.play();
  }
  notes.forEach((key) => {
    key.addEventListener("mousedown", playAudio);
    key.addEventListener("mouseup", stopAudio);
    key.addEventListener("mouseover", playAudio);
    key.addEventListener("mouseout", stopAudio);
  });
}
function stopCorrespondOver() {
  notes.forEach((key) => {
    key.classList.remove("piano-key-active");
    key.removeEventListener("mouseover", playAudio);
    key.removeEventListener("mouseout", stopAudio);
  });
}

btnSwitch.forEach((items) => {
  items.addEventListener("click", switchLetter);
});
document.addEventListener("keydown", playAudioKeyboard);
document.addEventListener("keyup", returnAudioKeyboard);
document.querySelector(".fullscreen").addEventListener("click", toggleScreen);
piano.addEventListener("mousedown", startCorrespondOver, false);
document.addEventListener("mouseup", stopCorrespondOver, false);
