width = 750;
height = 800;



/* Initialize canvas */
svg = d3.select("#wrapper")
    .append("svg")
    .classed("canvas", true)
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("viewBox", "0 0 " + width + " " + height + "");

function initial(data) {
    data.map(region => {
            visits[region.id] = 0;
    });
}

function drawItaly(regions) {
    console.log(regions);
    let italy = svg.selectAll(".region")
        .data(regions)
        .enter()
        .append("path")
        .classed("region", true)
        .attr("d", function (d) {return d.d})
        .attr("name", function (d) {return d.name})
        .attr("id", function (d) {return d.id})
        .attr("stroke", "blue")
        .attr("fill", function () {return d3.interpolateReds(0)});
}


function draw(data) {
    let bats = svg.selectAll(".bat")
        .data(data)
        .enter()
        .append("image")
        .classed("bat", true)
        .attr('xlink:href', 'resources/virus.svg')
        .attr('id', function (d) {return "bat" + d.id})
        .attr('width', 40)
        .attr('height', 40)
        .attr('x', function (d) {return d.x})
        .attr('y', function (d) {return d.y})
        .on("click", function(e){
            block(e)
        });
}


function updateArrangement(data) {
    ciclo++;

    svg.selectAll(".bat")
        .data(data)
        .transition()
        .duration(1000)
        .attr('id', function (d) {return "bat" + d.id})
        .attr('x', function (d) {return d.x})
        .attr('y', function (d) {return d.y});

    data.map(region => {visits[region.id]++;});

    svg.selectAll(".region")
        .transition()
        .duration(1000)
        .attr("fill", function (e) {return d3.interpolateReds(visits[e.id]/ciclo);});
}

function block(e) {
    console.log("regions")
    console.log(regions);
    regions = regions.filter(value => value.id !== e.id);

    svg.select("#bat"+e.id)
        .attr("class", "blocked")
        .attr('xlink:href', 'resources/no-virus.svg')
        .attr('width', 40)
        .attr('height', 40)
        .on("click", function(){alert("VOLEVIIII")})
        .exit();

    alive--;

    if(alive===0) {
        alert("STATE A CASA!")
        svg.selectAll(".blocked")
            .remove();
        svg.selectAll(".region")
            .remove();
        init();
    }

}
