async function loadQuiz() {
    try {
        const response = await fetch("data.json");
        const quizData = await response.json();

        const container = document.getElementById("quiz-container");
        container.innerHTML = "";

        quizData.forEach((item, index) => {
            console.log("Lade Quiz-Item:", item);

            const div = document.createElement("div");
            div.className = "quiz-item";

            // Titel
            const h2 = document.createElement("h2");
            h2.textContent = `Frage ${index + 1}`;
            div.appendChild(h2);

            // Partitur
            if (item.partitur) {
                const img = document.createElement("img");
                img.src = item.partitur;   // WICHTIG: NUR SO funktioniert der GitHub-Link
                img.alt = "Partitur";
                div.appendChild(img);
            }

            // Audio
            const audio = document.createElement("audio");
            audio.controls = true;
            audio.src = item.audio;
            div.appendChild(audio);

            // Antwortmöglichkeiten
            const answersDiv = document.createElement("div");
            answersDiv.className = "answers";

            item.answers.forEach(answer => {
                const btn = document.createElement("button");
                btn.textContent = answer;

                btn.onclick = () => {
                    if (answer === item.correct) {
                        btn.classList.add("correct");
                    } else {
                        btn.classList.add("wrong");
                    }
                };

                answersDiv.appendChild(btn);
            });

            div.appendChild(answersDiv);
            container.appendChild(div);
        });

    } catch (error) {
        console.error("Fehler beim Laden der JSON:", error);
    }
}

loadQuiz();
