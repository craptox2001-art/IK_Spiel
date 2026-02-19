let data = null;
let currentGame = null;
let currentQuestion = null;

async function loadData() {
    const res = await fetch('data.json');
    data = await res.json();
}

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

function getRandomQuestion(game) {
    const items = data[game];
    const randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
}

function generateAnswers(game, correct) {
    const items = data[game].filter(i => i.title !== correct.title);
    const shuffled = shuffleArray(items).slice(0, 3);
    const answers = shuffled.concat([correct]);
    return shuffleArray(answers);
}

async function startQuiz(game) {
    await loadData();
    currentGame = game;
    showNextQuestion();
    document.getElementById('next-btn').addEventListener('click', showNextQuestion);
}

function showNextQuestion() {
    const questionTitle = document.getElementById('question-title');
    const answersDiv = document.getElementById('answers');

    currentQuestion = getRandomQuestion(currentGame);
    const answers = generateAnswers(currentGame, currentQuestion);

    // Clear previous
    answersDiv.innerHTML = '';

    if (currentGame === 'audio') {
        const audio = document.getElementById('audio-player');
        audio.src = currentQuestion.fileUrl;
        audio.load();
    } else {
        const img = document.getElementById('image-player');
        img.src = currentQuestion.fileUrl;
    }

    answers.forEach(ans => {
        const btn = document.createElement('button');
        btn.textContent = ans.title;
        btn.onclick = () => {
            if (ans.title === currentQuestion.title) {
                alert('✅ Richtig!');
            } else {
                alert(`❌ Falsch! Richtige Antwort: ${currentQuestion.title}`);
            }
            showNextQuestion();
        };
        answersDiv.appendChild(btn);
    });
}
