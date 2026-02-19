let quizData = {};
let currentFolder = "";
let items = [];

// JSON laden
async function loadData() {
  try {
    const response = await fetch("data.json");
    quizData = await response.json();
  } catch (e) {
    console.error("Fehler beim Laden der JSON:", e);
    alert("Fehler beim Laden der Daten! Überprüfe deine data.json");
  }
}

// Menü anzeigen
function showMenu() {
  document.getElementById("menu").style.display = "block";
  document.getElementById("quiz").style.display = "none";
  document.getElementById("backBtn").style.display = "none";
}

// Quiz starten
function startQuiz(folder) {
  currentFolder = folder;
  items = [...quizData[folder]]; // Kopie der Items
  document.getElementById("menu").style.display = "none";
  document.getElementById("quiz").style.display = "block";
  document.getElementById("backBtn").style.display = "inline-block";
  nextQuestion();
}

// Nächste Frage
function nextQuestion() {
  if(items.length === 0) items = [...quizData[currentFolder]]; // reset
  const correct = items[Math.floor(Math.random() * items.length)];

  // 3 falsche Antworten
  let wrong = quizData[currentFolder].filter(i => i !== correct);
  wrong = wrong.sort(() => 0.5 - Math.random()).slice(0, 3);

  // Antworten mischen
  const answers = [correct, ...wrong].sort(() => 0.5 - Math.random());
  showQuestion(correct, answers);
}

// Frage anzeigen
function showQuestion(correct, answers) {
  const quizDiv = document.getElementById("quiz");
  quizDiv.innerHTML = "";

  // Media
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
      setTimeout(nextQuestion, 1000);
    };
    answersDiv.appendChild(btn);
  });

  quizDiv.appendChild(answersDiv);
}

// Event-Listener für Buttons (sicherstellen, dass JSON geladen ist)
document.addEventListener("DOMContentLoaded", async () => {
  await loadData();
  showMenu();
  document.getElementById("audioBtn").onclick = () => startQuiz("Audio Files");
  document.getElementById("partiturBtn").onclick = () => startQuiz("Partituren");
  document.getElementById("backBtn").onclick = showMenu;
});
