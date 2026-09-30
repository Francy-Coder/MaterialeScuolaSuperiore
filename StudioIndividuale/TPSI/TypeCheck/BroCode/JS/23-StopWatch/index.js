const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");

const display = document.getElementById("display");

let timer = null;
let startTime = 0;
let enlapsedTime = 0;
let isRunning = false;

// START
startBtn.addEventListener("click", function start() {
    if (!isRunning) {
        startTime = Date.now() - enlapsedTime;
        timer = setInterval(update, 10);
        isRunning = true;
    }
});

// STOP
stopBtn.addEventListener("click", function stop() {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
    }
});

// RESET
resetBtn.addEventListener("click", function reset() {
    clearInterval(timer);
    enlapsedTime = 0;
    isRunning = false;
    display.textContent = "00:00:00.000";
});

// UPDATE DISPLAY
function update() {
    const currentTime = Date.now();
    enlapsedTime = currentTime - startTime;

    let hours = Math.floor(enlapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor(enlapsedTime / (1000 * 60) % 60);
    let seconds = Math.floor(enlapsedTime / 1000 % 60);
    let milliseconds = Math.floor(enlapsedTime % 1000);

    // formato con leading zeros
    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliseconds = String(milliseconds).padStart(3, "0");

    display.textContent = `${hours}:${minutes}:${seconds}.${milliseconds}`;
}
