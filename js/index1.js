let cont = 1;

d3.json("position.json", function (d) {
    start(d);
});

let body = d3.select('dody')
    .on("keypress", function () {
        console.log("ciao");
    });

let worldArea = document.getElementById('pippo');
worldArea.addEventListener('keydown',(e) => {
    if (e.key==='x') {
        console.log("CLICK");
    }
});

function start(data) {
    //console.log(data[1]['positions']);
    let svg = d3.select('svg');


    let insects = svg.selectAll('image')
        .data(data[cont]['positions'])
        .enter()
        .append('image')
        .attr('xlink:href', 'alive.svg')
        .attr('width', 50)
        .attr('height', 50)
        .attr('x', function (p) {
            return p.x
        })
        .attr('y', function (p) {
            return p.y
        })
        .on('click', function () {
            ext(this)
        });

    cont++;
}

/*
insects = svg.selectAll('image')
    .

var myimage = svg.append('image')
    .attr('xlink:href', 'alive.svg')
    .attr('width', 75)
    .attr('height', 75)
    .attr('')
*/
