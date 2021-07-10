exports.drawGarden = function(garden_size) {
    let garden = [];
    let line = [];
    for (let y = 0; y <= garden_size.y; y++) {
        for (let x = 0; x <= garden_size.x; x++) {
            line.push("G");
        }
        garden.push(line);
        line = [];
    }
    return garden;
}

exports.printGarden = function(garden) {
    for (let y = garden.length - 1; y >= 0 ; y--) {
        console.log(garden[y]);
    }
}