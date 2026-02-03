const riddles = [
  { question: "Énigme 1 💘 : ...", answer: "reponse1", letter: "B" },
  { question: "Énigme 2 🌙 : ...", answer: "reponse2", letter: "E" },
  { question: "Énigme 3 ☕ : ...", answer: "reponse3", letter: "L" },
  { question: "Énigme 4 🌲 : ...", answer: "reponse4", letter: "V" },
  { question: "Énigme 5 🔑 : ...", answer: "reponse5", letter: "E" },
  { question: "Énigme 6 🥧 : ...", answer: "reponse6", letter: "D" },
  { question: "Énigme 7 🎶 : ...", answer: "reponse7", letter: "E" },
  { question: "Énigme 8 ❤️ : ...", answer: "reponse8", letter: "R" },
  { question: "Énigme 9 🌙 : ...", answer: "reponse9", letter: "E" }
];

const finalWord = "BELVEDERE";
let current = 0;
let letters = [];

function startHunt() {
  document.getElementById("music").play();

  document.getElementById("intro").style.display = "none";
  document.getElementById("game").style.display = "block";
  showRiddle();
}

function showRiddle() {
  document.getElementById("question").innerText =
    riddles[current].question;
}

function checkAnswer() {
  let user = document.getElementById("answer").value.toLowerCase().trim();
  let correct = riddles[current].answer.toLowerCase().trim();

  if (user.includes(correct)) {
    document.getElementById("ding").play();
    letters.push(riddles[current].letter);

    document.getElementById("count").innerText = letters.length;
    document.getElementById("result").innerText =
      "✨ Correct… une lettre est ajoutée.";

    current++;
    document.getElementById("answer").value = "";

    if (current < riddles.length) {
      setTimeout(() => {
        document.getElementById("result").innerText = "";
        showRiddle();
      }, 900);
    } else {
      endGame();
    }
  } else {
    document.getElementById("result").innerText =
      "🌙 Pas tout à fait…";
  }
}

function endGame() {
  document.getElementById("game").style.display = "none";
  document.getElementById("final").style.display = "block";

  let shuffled = letters.sort(() => Math.random() - 0.5);

  let pool = document.getElementById("pool");

  shuffled.forEach((l, index) => {
    let div = document.createElement("div");
    div.className = "letter";
    div.innerText = l;
    div.draggable = true;
    div.id = "letter-" + index;

    div.addEventListener("dragstart", dragStart);
    pool.appendChild(div);
  });

  let zone = document.getElementById("dropZone");

  for (let i = 0; i < finalWord.length; i++) {
    let slot = document.createElement("div");
    slot.className = "slot";

    slot.addEventListener("dragover", allowDrop);
    slot.addEventListener("drop", dropLetter);

    zone.appendChild(slot);
  }
}

function dragStart(e) {
  e.dataTransfer.setData("text", e.target.id);
}

function allowDrop(e) {
  e.preventDefault();
}

function dropLetter(e) {
  e.preventDefault();
  let id = e.dataTransfer.getData("text");
  let letter = document.getElementById(id);

  if (e.target.innerHTML === "") {
    e.target.appendChild(letter);
  }
}

function validateFinal() {
  let slots = document.querySelectorAll(".slot");
  let attempt = "";

  slots.forEach(slot => {
    attempt += slot.textContent;
  });

  if (attempt === finalWord) {
    document.getElementById("finalResult").innerText =
      "💘 Lieu final : BELVEDERE.";
    document.getElementById("valentine").style.display = "block";
  } else {
    document.getElementById("finalResult").innerText =
      "🌲 Pas encore… réessaie.";
  }
}

function toggleMusic() {
  let music = document.getElementById("music");
  if (music.paused) music.play();
  else music.pause();
}

function yes() {
  document.getElementById("loveMessage").innerText =
    "❤️ Je savais que tu dirais oui… Rendez-vous au Belvédère.";
}

function moveNo() {
  let btn = document.getElementById("noBtn");
  btn.style.position = "absolute";
  btn.style.left = Math.random() * 250 + "px";
  btn.style.top = Math.random() * 250 + "px";
}
