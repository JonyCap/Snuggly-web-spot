let selectedPath = [];
let isGameActive = false;
let context;

// Start the game
function startGame() {
    selectedPath = [];
    isGameActive = true;
    document.getElementById("result").innerHTML = "";
    document.getElementById("fuel-bar").style.width = "100%";
    renderMap();
    clearCanvas();
}

// Toggle background music
function toggleMusic() {
    const music = document.getElementById("bg-music");
    if (music.paused) music.play();
    else music.pause();
}

// Render planets as clickable nodes
function renderMap() {
    const mapDiv = document.getElementById("map");
    mapDiv.innerHTML = "";

    gameData.locations.forEach((planet, index) => {
        const btn = document.createElement("div");
        btn.className = "planet";
        btn.innerText = planet;
        if (selectedPath.includes(index)) btn.classList.add("visited");
        btn.onclick = () => {
            if (!isGameActive) return;
            if (!selectedPath.includes(index)) {
                selectedPath.push(index);
                btn.classList.add("visited");
                drawLineToPlanet(index);
                if (selectedPath.length === gameData.locations.length) {
                    selectedPath.push(selectedPath[0]); // loop back
                    finishGame();
                }
            }
        };
        mapDiv.appendChild(btn);
    });
}

// Draw a line between last and current planet
function drawLineToPlanet(currentIndex) {
    if (selectedPath.length < 2) return;
    const mapDiv = document.getElementById("map");
    const buttons = mapDiv.getElementsByClassName("planet");

    const prevIndex = selectedPath[selectedPath.length - 2];
    const fromEl = buttons[prevIndex];
    const toEl = buttons[currentIndex];

    const rect1 = fromEl.getBoundingClientRect();
    const rect2 = toEl.getBoundingClientRect();

    const x1 = rect1.left + rect1.width / 2;
    const y1 = rect1.top + rect1.height / 2;
    const x2 = rect2.left + rect2.width / 2;
    const y2 = rect2.top + rect2.height / 2;

    context.strokeStyle = "#0ff";
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
}

// Clear canvas lines
function clearCanvas() {
    const canvas = document.getElementById("space-canvas");
    context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context.clearRect(0, 0, canvas.width, canvas.height);
}

// Finalize game and display mission result
function finishGame() {
    isGameActive = false;
    let totalCost = 0;
    for (let i = 0; i < selectedPath.length - 1; i++) {
        const from = selectedPath[i];
        const to = selectedPath[i + 1];
        totalCost += gameData.costMatrix[from][to];
    }

    const efficiency = totalCost <= 150 ? "S" : totalCost <= 180 ? "A" : totalCost <= 220 ? "B" : "C";
    const fuelPercent = Math.max(0, 100 - totalCost);
    document.getElementById("fuel-bar").style.width = fuelPercent + "%";

    const routeNames = selectedPath.map(i => gameData.locations[i]);
    document.getElementById("result").innerHTML = `
        <h3>Mission Report</h3>
        <p><strong>Route:</strong> ${routeNames.join(" â ")}</p>
        <p><strong>Distance Traveled:</strong> ${totalCost} units</p>
        <p><strong>Efficiency Rank:</strong> ${efficiency}</p>
        <p><strong>Status:</strong> Mission ${efficiency === "C" ? "Failed" : "Completed"}!</p>
    `;
}

window.onload = () => {
    const canvas = document.getElementById("space-canvas");
    context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    startGame();
};
