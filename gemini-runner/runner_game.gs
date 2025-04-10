const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let ship = { x: 400, y: 300, width: 40, height: 40, speed: 3 };
let keys = {};
let parcels = [];
let collected = 0;
let fuel = 100;
let gameActive = true;

let base = { x: 380, y: 50, width: 50, height: 50 };
let gameEnded = false;

// Initialize parcels in random spots
for (let i = 0; i < 5; i++) {
    parcels.push({
        x: Math.random() * 750 + 25,
        y: Math.random() * 550 + 25,
        collected: false
    });
}

document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);

function drawShip() {
    ctx.fillStyle = "#00ffe1";
    ctx.fillRect(ship.x, ship.y, ship.width, ship.height);
}

function drawParcels() {
    ctx.fillStyle = "#ffff00";
    parcels.forEach(p => {
        if (!p.collected) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, 10, 0, Math.PI * 2);
            ctx.fill();
        }
    });
}

function drawBase() {
    ctx.fillStyle = "#5555ff";
    ctx.fillRect(base.x, base.y, base.width, base.height);
}

function update() {
    if (!gameActive) return;

    if (keys["ArrowUp"] || keys["w"]) ship.y -= ship.speed;
    if (keys["ArrowDown"] || keys["s"]) ship.y += ship.speed;
    if (keys["ArrowLeft"] || keys["a"]) ship.x -= ship.speed;
    if (keys["ArrowRight"] || keys["d"]) ship.x += ship.speed;

    // Keep inside canvas
    ship.x = Math.max(0, Math.min(canvas.width - ship.width, ship.x));
    ship.y = Math.max(0, Math.min(canvas.height - ship.height, ship.y));

    // Fuel decreases as you move
    fuel -= 0.05;
    if (fuel <= 0) {
        endGame(false);
        return;
    }

    // Parcel collection
    parcels.forEach(p => {
        if (!p.collected &&
            ship.x < p.x + 10 &&
            ship.x + ship.width > p.x - 10 &&
            ship.y < p.y + 10 &&
            ship.y + ship.height > p.y - 10) {
            p.collected = true;
            collected++;
            document.getElementById("score").innerText = Parcels: ${collected} / 5;
        }
    });

    // Check win
    if (collected === 5 &&
        ship.x < base.x + base.width &&
        ship.x + ship.width > base.x &&
        ship.y < base.y + base.height &&
        ship.y + ship.height > base.y) {
        endGame(true);
    }

    // Update HUD
    document.getElementById("fuel").innerText = Fuel: ${Math.max(0, fuel.toFixed(0))}%;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBase();
    drawParcels();
    drawShip();
}

function loop() {
    update();
    draw();
    if (!gameEnded) requestAnimationFrame(loop);
}

function endGame(won) {
    gameActive = false;
    gameEnded = true;
    document.getElementById("missionComplete").style.display = "block";
    document.getElementById("finalScore").innerText = won ? ${Math.round(fuel)}% : "0% â Ran out of fuel!";
}

loop();
