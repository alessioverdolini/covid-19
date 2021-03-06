let alive;
let regions;
let iteration;
let visits;
let paused;
let started;
let loopInterval;
let speed;
const MAX_SPEED = 1000;
const MIN_SPEED = 5000;
let selectable;

function init() {
    setTimeout(function (){
        d3.json("resources/position.json",).then(function (data) {
            clearScenario();
            loadData(data);
            initEnv(regions);
            drawScenario(regions);
            addEventListener();
        });
    }, 0);
}

function start() {

    started = !started;
    updateStartResetButton();

    launchApplication();
}

function reset() {

    started = !started;
    updateStartResetButton();

    init();
}

function pause() {
    if(!started) {return;}
    interruptAnimation();

    selectable = paused && started;

    paused = !paused;

    updatePauseUnpauseButton();
}

function unpause() {
    if(!started) {return;}
    interruptAnimation();

    selectable = paused && started;

    paused = !paused;

    updatePauseUnpauseButton();
}

function launchApplication() {
    if(started) {
        loop();
        loopInterval = setInterval(loop, speed);
    }
}

function loop() {
    if(!paused) {

        iteration++;

        updateArrangement(shuffle(regions));

        if (alive === 0) {
            init();
        }
    }
}

init();



