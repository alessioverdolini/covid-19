let contatore;
let alive;
let regions;
let ciclo;
let visits;

function init() {
    setTimeout(function (){
        d3.json("resources/position.json",).then(function (data) {
            loadData(data);
            initial(regions);
            drawScenario(regions);
            addEventListener();
        });
    }, 0);
}

function initial(data) {
    contatore = 0;
    alive = data.length;
    visits = {};
    ciclo = 1;

    data.map(region => {
        visits[region.id] = 0;
    });
}

function loadData(data) {
    regions = data["regions"];
}

function addEventListener() {
    d3.select("body").on("keydown", function () {
        if (d3.event.keyCode === 88) {

            if(contatore === 4) {
                contatore = 0
            }else {
                contatore++
            }
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

function loop() {
    updateArrangement(shuffle(regions));
}

function start() {
    setTimeout(function () {
        setInterval(loop, 3000);
    }, 0);
}


init();

start();


