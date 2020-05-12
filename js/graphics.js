let viewBoxWidth = 750;
let viewBoxHeight = 800;

let screenWidth = 0;
let screenHeight = 0;

computeScreenSize();

let svg;
let italy;
let virus;
let gui;
let startBtn;
let pauseBtn;
let controlPanel;

function drawScenario(data) {
    svg = d3.select(".wrapper")
        .append("div")
        .classed("main", true)
        .append("svg")
        .classed("canvas", true)
        .attr("width", "100%")
        .attr("height", screenHeight+"px")
        .attr("viewBox", "-50 -50 " + viewBoxWidth + " " + viewBoxHeight + "");

    italy = svg.selectAll(".region")
        .data(data)
        .enter()
        .append("path")
        .classed("region", true)
        .attr("d", function (d) {return d.d})
        .attr("name", function (d) {return d.name})
        .attr("id", function (d) {return d.id})
        .attr("stroke", "blue")
        .attr("fill", function () {return d3.interpolateReds(0)});

    virus = svg.selectAll(".virus")
        .data(data)
        .enter()
        .append("image")
        .classed("virus", true)
        .attr('xlink:href', 'resources/virus.svg')
        .attr('id', function (d) {return "virus" + d.id})
        .attr('width', 40)
        .attr('height', 40)
        .attr('x', function (d) {return d.x})
        .attr('y', function (d) {return d.y})
        .on("click", function(e){
            block(e)
        });

    gui = d3.select(".wrapper")
        .append("div")
        .classed("gui", true);

    controlPanel = gui
        .append("div")
        .classed("controlPanel", true);

    startBtn = controlPanel
        .append("button")
        .classed("button", true)
        .attr("id", "startBtn")
        .text("Start")
        .attr("onclick", "start()");

    pauseBtn = controlPanel
        .append("button")
        .classed("button", true)
        .attr("id", "pauseBtn")
        .text("Pause")
        .attr("onclick", "pause()")
        .attr("disabled", true);

    controlPanel.append("span")
        .classed("rangeLabel", true)
        .text("Slow");

    controlPanel.append("input")
        .attr("type", "range")
        .attr("id", "speedRange")
        .attr("value", speed/1000)
        .attr("min", MAX_SPEED/1000)
        .attr("max", MIN_SPEED/1000)
        .on("change", function(d){
            updateSpeed(this.value)
        });

    controlPanel.append("span")
        .classed("rangeLabel", true)
        .text("Fast");
}

function clearScenario() {
    try {
        interruptAnimation();
        d3.select(".gui").remove();
        d3.select(".main").remove();
    }catch (e) {
        //Catch object not found exceptions
    }
}

function updateArrangement(data) {
    svg.selectAll(".virus")
        .data(data)
        .transition()
        .duration(speed*0.7)
        .on("start", function (){updateImmunity(true)})
        .attr('id', function (d) {return "virus" + d.id})
        .attr('x', function (d) {return d.x})
        .attr('y', function (d) {return d.y})
        .on("end", function (){updateImmunity(false)});

    data.map(region => {visits[region.id]++;});

    svg.selectAll(".region")
        .transition()
        .duration(speed*0.7)
        .attr("fill", function (e) {return d3.interpolateReds(visits[e.id]/iteration);});
}

function block(e) {
    if(!selectable) {return;}

    alive--;

    svg.select("#virus" + e.id)
        .attr("class", "blocked")
        .attr('xlink:href', 'resources/no-virus.svg')
        .on("click", function () {});

    regions = regions.filter(value => value.id !== e.id);
}

function updateImmunity(boolean) {
    selectable = !boolean;

    if(boolean){
        svg.selectAll(".virus")
            .attr('xlink:href', 'resources/shield.svg')
    }
    else{
        svg.selectAll(".virus")
            .attr('xlink:href', 'resources/virus.svg')
    }
}

function screenResized() {
    computeScreenSize();
    svg.attr("height", screenHeight+"px");
}

function computeScreenSize(){
    screenHeight = window.innerHeight-20;
    screenWidth = window.innerWidth-20;
}
