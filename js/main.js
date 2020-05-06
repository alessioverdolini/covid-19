let dataset = [];
let batsArrangements = [];
let contatore = 0;
let alive = 6;

function init() {
    contatore = 0;
    alive = 6;
    setTimeout(function (){
        d3.json("resources/position.json",).then(function (data) {
            dataset = data;
            loadData();
            draw(batsArrangements["0"]);
            addEventListener();
        });
    }, 1000);
}

function loadData() {
    batsArrangements = dataset['arrangements'];
}

function addEventListener() {
    d3.select("body").on("keydown", function () {
        if (d3.event.keyCode === 88) {

            if(contatore === 4) {
                contatore = 0
            }else {
                contatore++
            }
            updateArrangement(batsArrangements[contatore])
        }
    });
}


init();


