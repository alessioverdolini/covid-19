dataset = [];
mosquitos = [];

function init() {
    setTimeout(function (){
        d3.json("resources/position.json",).then(function (data) {
            dataset = data;
            loadData();
            addEventListener();
        });
    }, 500);
}

conf = 1
function loadData() {
    mosquitos = dataset['positions'];
    console.log(mosquitos);
}

function loop() {
    console.log("CIAO");
    console.log(dataset);
}

function start(){
    setTimeout(function () {
        setInterval(loop, 1000);
    }, 2000);
}

function addEventListener() {
    d3.select("body").on("keydown", function () {
        if (d3.event.keyCode === 88) {
            console.log("'X' key pressed")
        }
    });
}


init();

start();
