let quizData = {};
let currentFolder = "";
let items = [];

async function loadData() {
  try {
    const response = await fetch("data.json"); // JSON muss im gleichen Ordner liegen
    quizData = await response.json();
  } catch (e) {
    console.error("Fehler beim Laden der JSON:", e);
    alert("Fehler beim Laden der Daten! Überprüfe deine data.json");
  }
}

function showMenu() {
  document.getElementById("menu").style.display = "block";
  document.getElementById("quiz").style.display = "none";
  document.getElementById("backBtn").style.display = "none";
}

function startQuiz(folder) {
  currentFolder = folder;
  items = [...quizData[folder]]; // Kopie der Items
  document.getElementById("menu").style.display = "none";
  document.getElementById("quiz").style.display = "block";
  document.getElementById("backBtn").style.display = "inline-block";
  nextQuestion();
}

function nextQuestion() {
  if(items.length === 0) { 
    // reset, falls alle Fragen durch
    items = [...quizData[currentFolder]];
  }

  const correct = items[Math.floor(Math.random() * items.length)];

  // 3 falsche Antworten
  let wrong = quizData[currentFolder].filter(i => i !== correct);
  wrong = wrong.sort(() => 0.5 - Math.random()).slice(0, 3);

  // Antworten mischen
  const answers = [correct, ...wrong].sort(() => 0.5 - Math.random());

  showQuestion(correct, answers);
}

function showQuestion(correct, answers) {
  const quizDiv = document.getElementById("quiz");
  quizDiv.innerHTML = "";

  // Audio oder Bild
  if(currentFolder === "Audio Files") {
    const audio = document.createElement("audio");
    audio.controls = true;
    audio.src = correct.fileUrl;
    quizDiv.appendChild(audio);
  } else {
    const img = document.createElement("img");
    img.src = correct.fileUrl;
    img.alt = "Partitur";
    quizDiv.appendChild(img);
  }

  // Antwortbuttons
  const answersDiv = document.createElement("div");
  answersDiv.className = "answers";

  answers.forEach(ans => {
    const btn = document.createElement("button");
    btn.textContent = ans.title;
    btn.onclick = () => {
      if(ans.title === correct.title){
        btn.classList.add("correct");
      } else {
        btn.classList.add("wrong");
      }
      setTimeout(nextQuestion, 1000); // nächste Frage nach 1s
    };
    answersDiv.appendChild(btn);
  });

  quizDiv.appendChild(answersDiv);
}

// Lade JSON direkt beim Start
loadData().then(showMenu);
