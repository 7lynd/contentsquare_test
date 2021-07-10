const parserService = require('./services/parser')
const drawerService = require('./services/drawer')
const mowerService = require('./services/mowers')

function main() {
    const parsed_data = parserService.parseFile();
    let garden = drawerService.drawGarden(parsed_data.garden_size);
    let result;
    for (let i = 0; i < parsed_data.mowers.length; i++) {
        garden = mowerService.placeMowerInGarden(parsed_data.mowers[i], garden);
        result = mowerService.moveMowerInGarden(parsed_data.mowers[i], garden, parsed_data.garden_size)
        garden = result.garden;
        parsed_data.mowers[i] = result.mower;
    }
    mowerService.printAllPositions(parsed_data.mowers);

    // check if --garden parameter is present
    process.argv.forEach(function (val, index, array) {
        if (index === 2 && val === "--garden") {
            drawerService.printGarden(garden);
        }
    });
}

main();
