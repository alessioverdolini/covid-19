function initial(data) {
    alive = data.length;
    visits = {};
    iteration = 1;
    paused = false;
    started = false;
    speed = 2000;
    selectable = false;

    data.map(region => {
        visits[region.id] = 0;
    });

    d3.select("#speedRange")
        .attr("value", speed)
        .attr("min", MAX_SPEED)
        .attr("max", MIN_SPEED)
        .on("change", function(d){
        speed = this.value;
    })
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

function pause() {
    d3.select("#pauseBtn")
        .text(function () {return paused ? "Pause" : "Unpause"});

    paused = !paused;
}

function clear() {
    svg.selectAll(".bat")
        .remove();
    svg.selectAll(".blocked")
        .remove();
    svg.selectAll(".region")
        .remove();
}

function reset() {
    clearInterval(loopInterval);
    updateStartResetButton();
    clear();
    init();
}

function updateStartResetButton() {
    d3.select("#startBtn")
        .text(function () {return started ? "Start" : "Reset"})
        .attr("onclick", function(e){return started ? "start()" : "reset()"});

    d3.select("#speedRange")
        .attr("disabled", function () {return started ? null : started});

    started = !started;


}


