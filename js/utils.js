function initEnv(data) {
    alive = data.length;
    visits = {};
    iteration = 1;
    paused = false;
    started = false;
    speed = 2000;
    selectable = false;
    clearInterval(loopInterval);

    data.map(region => {
        visits[region.id] = 0;
    });

    d3.select("#speedRange")
        .attr("value", speed)
        .attr("min", MAX_SPEED)
        .attr("max", MIN_SPEED)
        .on("change", function(d){
            updateSpeed(this.value)
    })
}

function updateSpeed(speedValue){
    speed = speedValue;
    clearInterval(loopInterval);
    launchApplication();
}

function loadData(data) {
    regions = data["regions"];
}

function addEventListener() {
    d3.select("body").on("keydown", function () {
        if (d3.event.keyCode === 88) {
            //DO NOTHING
        }
    });
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}

function clear() {
    interruptAnimation();
    svg.selectAll(".virus")
        .remove();
    svg.selectAll(".blocked")
        .remove();
    svg.selectAll(".region")
        .remove();
}

function updateStartResetButton() {
    d3.select("#startBtn")
        .text(function () {return started ? "Reset" : "Start"})
        .attr("onclick", function(e){return started ? "reset()" : "start()"});
}

function updatePauseUnpauseButton() {
    d3.select("#pauseBtn")
        .text(function () {return paused ? "Unpause" : "Pause"})
        .attr("onclick", function(e){return paused ? "unpause()" : "pause()"});
}

function interruptAnimation() {
    svg.selectAll(".virus")
        .transition()
        .end();
    svg.selectAll(".region")
        .transition()
        .end();
}


