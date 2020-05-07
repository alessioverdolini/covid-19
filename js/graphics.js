width = 1920;
height = 900;


/* Initialize canvas */
svg = d3.select(".wrapper")
    .append("svg")
    .classed("canvas", true)
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("viewBox", "0 0 " + width + " " + height + "")
    .attr("preserveAspectRatio", "xMidYMid meet")
    .style("background-color", "gray")
    //.style("background-image", "url(resources/europe4.svg)")
    .style("background-size", "cover");

function draw(batsArrangements) {
    var bats = svg.selectAll(".bat")
        .data(batsArrangements)
        .enter().append("image")
        .classed("bat", true)
        .attr('xlink:href', 'resources/virus.svg')
        .attr('id', function (d) {return "bat" + batsArrangements.indexOf(d)})
        .attr('width', 50)
        .attr('height', 50)
        .attr('x', function (d) {return d.x})
        .attr('y', function (d) {return d.y})
        .on("click", function(e, i){
            block(i)
        });
}

function updateArrangement(batsArrangements) {
    svg.selectAll(".bat")
        .data(batsArrangements)
        .transition()
        .duration(1000)
        .attr('x', function (d, i) {return setPositionX(i, d)})
        .attr('y', function (d, i) {return setPositionY(i, d)});
}

function block(i) {
    svg.select("#bat"+i)
        .attr("blocked", "true")
        .attr('xlink:href', 'resources/no-virus.svg')
    alive--;
    console.log(alive)
    if(alive===0) {
        console.log("callInit")
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
