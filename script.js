let score = 0;
let currentIndex = 0;
let correctAnswers = 0;

const images = [
    { src: "pictures/ai1.webp", isAI: true },
    { src: "pictures/ai2.webp", isAI: true },
    { src: "pictures/ai3.webp", isAI: true },
    { src: "pictures/ai4.webp", isAI: true },
    { src: "pictures/ai5.webp", isAI: true },
    { src: "pictures/ai6.jpg", isAI: true },
    { src: "pictures/ai7.jpg", isAI: true },
    { src: "pictures/ai8.jpg", isAI: true },
    { src: "pictures/real1.webp", isAI: false },
    { src: "pictures/real2.webp", isAI: false },
    { src: "pictures/real3.webp", isAI: false },
    { src: "pictures/real4.webp", isAI: false },
    { src: "pictures/real5.webp", isAI: false },
    { src: "pictures/real6.webp", isAI: false },
    { src: "pictures/real7.jpg", isAI: false },
    { src: "pictures/real8.jpg", isAI: false },
    { src: "pictures/real9.jpg", isAI: false },
    { src: "pictures/real10.jpg", isAI: false }
];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function loadImage() {
    if (currentIndex >= images.length) {
        endGame();
        return;
    }

    const imageObj = images[currentIndex];
    const imgElement = document.getElementById("image");
    imgElement.src = imageObj.src;
    imgElement.dataset.isAI = imageObj.isAI;

    // Обновление текста прогресса
    document.getElementById("progress-text").textContent = `Bild ${currentIndex + 1} von ${images.length}`;

    // Обновление прогресс-бара
    const progressBar = document.getElementById("progress-bar");
    progressBar.style.width = ((currentIndex + 1) / images.length) * 100 + "%";
}

function makeChoice(choice) {
    const isAI = document.getElementById("image").dataset.isAI === "true";
    if (choice === isAI) {
        score++;
        correctAnswers++;
        document.getElementById("result").textContent = "Richtig!";
        document.getElementById("result").classList.add("text-success");
        document.getElementById("result").classList.remove("text-danger");
    } else {
        document.getElementById("result").textContent = "Falsch!";
        document.getElementById("result").classList.add("text-danger");
        document.getElementById("result").classList.remove("text-success");
    }
    document.getElementById("score").textContent = score;
    currentIndex++;
    loadImage();
}

function endGame() {
    let accuracy = ((correctAnswers / images.length) * 100).toFixed(1);
    document.getElementById("game-container").innerHTML = `
        <h1 class="text-primary">Spiel beendet!</h1>
        <p class="fs-4">Dein Ergebnis: <span class="fw-bold text-success">${score}</span> Punkte</p>
        <p class="fs-4">Genauigkeit: <span class="fw-bold text-info">${accuracy}%</span></p>
        <button class="btn btn-success" id="restart-btn">Nochmal spielen</button>
    `;
    document.getElementById("restart-btn").addEventListener("click", restartGame);
}

function restartGame() {
    score = 0;
    currentIndex = 0;
    correctAnswers = 0;
    shuffle(images);

    // Обновляем контент с прогресс-баром при рестарте
    document.getElementById("game-container").innerHTML = `
        <h1 class="mb-4 text-primary">Erkenne die KI oder das Original</h1>
        <p class="text-muted">Ist dieses Foto echt oder von einer KI generiert?</p>
        <img id="image" src="" class="img-thumbnail">
        <div class="my-3">
            <p id="progress-text" class="mb-1 text-secondary">Bild 1 von 18</p>
            <div class="progress" style="height: 10px;">
                <div id="progress-bar" class="progress-bar bg-info" role="progressbar" style="width: 0%;"></div>
            </div>
        </div>
        <div class="mt-4 d-flex flex-column flex-md-row justify-content-center gap-3">
            <button class="btn btn-primary" onclick="makeChoice(false)">Echt</button>
            <button class="btn btn-primary" onclick="makeChoice(true)">Generiert</button>
        </div>
        <p id="result" class="mt-4 fw-bold"></p>
        <p class="fs-4">Punkte: <span id="score" class="fw-bold text-success">0</span></p>
    `;

    loadImage();
}

document.addEventListener("DOMContentLoaded", () => {
    shuffle(images);
    loadImage();
});