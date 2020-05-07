let dataset = [];
let batsArrangements = [];
let contatore = 0;
let alive = 21;
let regions = [];

function init() {
    contatore = 0;
    alive = 21;
    setTimeout(function (){
        d3.json("resources/position.json",).then(function (data) {
            dataset = data;
            loadData();
            drawItaly(regions)
            draw(regions);
            addEventListener();
        });
    }, 0);
}

function loadData() {
    batsArrangements = dataset['arrangements'];
    regions = dataset["regions"];
}

function addEventListener() {
    d3.select("body").on("keydown", function () {
        if (d3.event.keyCode === 88) {

            if(contatore === 4) {
                contatore = 0
            }else {
                contatore++
            }
            updateArrangement(shuffle(regions))
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


init();


