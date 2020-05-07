width = 1500;
height = 750;



/* Initialize canvas */
svg = d3.select(".wrapper")
    .append("svg")
    .classed("canvas", true)
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("viewBox", "0 0 " + width + " " + height + "");

function drawItaly(regions) {
    console.log(regions);
    var italy = svg.selectAll(".region")
        .data(regions)
        .enter()
        .append("path")
        .classed("region", true)
        .attr("d", function (d) {return d.d})
        .attr("name", function (d) {return d.name})
        .attr("id", function (d) {return d.id});
}


function draw(data) {
    var bats = svg.selectAll(".bat")
        .data(data)
        .enter().append("g")
        .attr('id', function (d) {return "group" + data.indexOf(d)})
        .append("image")
        .classed("bat", true)
        .attr('xlink:href', 'resources/virus.svg')
        .attr('id', function (d) {return "bat" + data.indexOf(d)})
        .attr('width', 40)
        .attr('height', 40)
        .attr('x', function (d) {return d.x})
        .attr('y', function (d) {return d.y})
        .on("click", function(e, i){
            block(i)
        });
}

function updateArrangement(data) {
    console.log(data);
    svg.selectAll(".bat")
        .data(data)
        .transition()
        .duration(1000)
        .attr('x', function (d, i) {return setPositionX(i, d)})
        .attr('y', function (d, i) {return setPositionY(i, d)});

    svg.select("#region")
        .attr("fill", "#e54c3c");
}

//CAMBIO COLORE
function pippo(i) {
    if(svg.select("#bat"+i).attr("blocked"))
        return svg.select("#bat"+i).attr("xlink:href");
    else
        return "resources/virusr.svg"
}

function block(i) {
    svg.select("#group"+i)
        .attr("z-index", "-1");

    svg.select("#bat"+i)
        .attr("blocked", "true")
        .attr('xlink:href', 'resources/no-virus-r.svg')
        //.attr("opacity", "0.2")
        .attr('width', 40)
        .attr('height', 40)
        .on("click", function(){alert("VOLEVIIII")});

    alive--;
    console.log(alive)
    if(alive===0) {
        svg.selectAll(".bat")
            .data(batsArrangements)
            .exit()
            .remove();
        init();
    }

}

function setPositionX(i, d) {
    if(svg.select("#bat"+i).attr("blocked"))
        return svg.select("#bat"+i).attr("x");
    else
        return d.x
}

function setPositionY(i, d) {
    if(svg.select("#bat"+i).attr("blocked"))
        return svg.select("#bat"+i).attr("y");
    else
        return d.y;
}
