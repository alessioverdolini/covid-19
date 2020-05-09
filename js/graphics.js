width = 750;
height = 800;

let svg = d3.select("#wrapper")
    .append("svg")
    .classed("canvas", true)
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("viewBox", "0 0 " + width + " " + height + "");

function drawScenario(data) {
    let italy = svg.selectAll(".region")
        .data(data)
        .enter()
        .append("path")
        .classed("region", true)
        .attr("d", function (d) {return d.d})
        .attr("name", function (d) {return d.name})
        .attr("id", function (d) {return d.id})
        .attr("stroke", "blue")
        .attr("fill", function () {return d3.interpolateReds(0)});

    let virus = svg.selectAll(".virus")
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
}

function drawGui() {
    d3.select("#startBtn")
        .text("Start")
        .attr("onclick", "start()");

    d3.select("#pauseBtn")
        .text("Pause")
        .attr("onclick", "pause()");
}

function updateArrangement(data) {
    svg.selectAll(".virus")
        .data(data)
        .transition()
        .duration(speed-800)
        .on("start", function (){updateImmunity(true)})
        .attr('id', function (d) {return "virus" + d.id})
        .attr('x', function (d) {return d.x})
        .attr('y', function (d) {return d.y})
        .on("end", function (){updateImmunity(false)});

    data.map(region => {visits[region.id]++;});

    svg.selectAll(".region")
        .transition()
        .duration(speed-800)
        .attr("fill", function (e) {return d3.interpolateReds(visits[e.id]/iteration);});
}

function block(e) {
    if(!selectable) {
        return;
    }

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
