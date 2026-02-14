function normalize(text) {
  return text
    .toLowerCase()
    .trim()
    .normalize("NFD")                // sépare les accents
    .replace(/[\u0300-\u036f]/g, "") // supprime accents
    .replace(/[^a-z0-9\s]/g, "");    // enlève ponctuation
}

const riddles = [
  { question: "Énigme 1 📜 : Quelle activité sur notre liste des choses à faire ensemble avons nous complété en premier ?", answer: "pique", letter: "M" },
  { question: "Énigme 2 🍔 : Quel est le nom du premier restaurant que nous avons fait ensemble ?", answer: "pastel", letter: "I" },
  { question: "Énigme 3 ☕ : Quelle était ma boisson favorite au distributeur de l'université Jean Jaurès ?", answer: "vanille", letter: "S" },
  { question: "Énigme 4 🌲 : Combien de mètres de hauteur font les arbres d'Ecosse ?", answer: "100", letter: "T" },
  { question: "Énigme 5 🔑 : Où m'a-tu officiellement demandé d'amménager dans notre appartement ?", answer: "biche", letter: "E" },
  { question: "Énigme 6 💐 : De quelle couleur était la rose que je t'ai offerte après ton semi marathon à Montpellier ?", answer: "blanche", letter: "R" },
  { question: "Énigme 7 🎶 : Quel est le titre de la chanson qui nous passionnait au cours d'un certain trajet en métro ?", answer: "infirmière", letter: "S" },
  { question: "Énigme 8 ❤️ : Dans quel lieu nos doigts ce sont-ils enlacés pour la première fois ?", answer: "prairie", letter: "T" },
  { question: "Énigme 9 🌙 : Quelles sont les coordonnées exactes de notre nuit de rencontre ?", answer: "43.5586N", letter: "E" }
{ question: "Énigme 10 🧸 : Quels sont les noms de mes trois peluches fétiches ?", answer: "Alice" "Albert" "Nelson", letter: "E" },
{ question: "Énigme 11 🏰 : Quelle activité avons-nous faite le soir de notre toute première Saint Valentin ?", answer: "Camera Obscura", letter: "R" }
];

const finalWord = "MISTERSTEER";
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
  let user = normalize(document.getElementById("answer").value);
  let correct = normalize(riddles[current].answer);

  if (user.includes(correct) && user.length > 0) {

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
  let pool = document.getElementById("pool");

  let allCorrect = true;

  slots.forEach((slot, index) => {
    let letter = slot.textContent;

    if (letter === finalWord[index]) {

      slot.style.background = "#2e7d32"; // vert
      slot.style.color = "white";
      slot.style.border = "2px solid #66bb6a";

    } else {

      if (letter !== "") {
        let letterDiv = slot.firstChild;
        pool.appendChild(letterDiv);
      }

      slot.style.background = "";
      slot.style.border = "2px solid #999";
      allCorrect = false;
    }
  });

  if (allCorrect) {
    document.getElementById("finalResult").innerText =
      "🍔 Lieu final : MISTER STEER.";
    document.getElementById("valentine").style.display = "block";
  } else {
    document.getElementById("finalResult").innerText =
      "🌙 Certaines lettres sont incorrectes… réessaie chéri.";
  }
}

function toggleMusic() {
  let music = document.getElementById("music");
  if (music.paused) music.play();
  else music.pause();
}

function yes() {
  document.getElementById("loveMessage").innerText =
    "❤️ Je savais que tu dirais oui… Allons nous remplir le bidou !";
}

function moveNo() {
  let btn = document.getElementById("noBtn");
  btn.style.position = "absolute";
  btn.style.left = Math.random() * 250 + "px";
  btn.style.top = Math.random() * 250 + "px";
}
