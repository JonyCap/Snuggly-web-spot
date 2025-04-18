let selectedPath = [];
let isGameActive = false;

function startGame() {
    selectedPath = [];
    isGameActive = true;
    document.getElementById("result").innerHTML = "";
    renderMap();
}

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
                if (selectedPath.length === gameData.locations.length) {
                    selectedPath.push(selectedPath[0]); // return to start
                    finishGame();
                }
            }
        };
        mapDiv.appendChild(btn);
    });
}

function finishGame() {
    isGameActive = false;
    let totalCost = 0;
    for (let i = 0; i < selectedPath.length - 1; i++) {
        let from = selectedPath[i];
        let to = selectedPath[i + 1];
        totalCost += gameData.costMatrix[from][to];
    }

    const routeNames = selectedPath.map(i => gameData.locations[i]);
    document.getElementById("result").innerHTML = `
        <p><strong>Your Route:</strong> ${routeNames.join(" → ")}</p>
        <p><strong>Total Cost:</strong> ${totalCost} units</p>
        <p>Try again to find a better route!</p>
    `;
}

// Wait until the page loads before assigning function to window
window.onload = () => {
    window.startGame = startGame;
};
