const fs = require('fs');
const { exit } = require('process');

function isAlphanumeric(str) {
    if (str.match(/^[0-9a-z]+$/)) {
        return true;
    }
    return false;
}

exports.parseFile = function() {
    const file = fs.readFileSync('instructions.txt', 'utf-8');
    const instructions = file.split('\n');

    if (instructions[0].length > 2 || instructions[0].length < 2) {
        console.log("The data of the garden must contain two parameters, please correct to start the program");
        exit();
    }

    if (!isAlphanumeric(instructions[0][0]) || !isAlphanumeric(instructions[0][1])) {
        console.log("The data of the garden are wrong, please correct to start the program");
        exit();
    }

    const garden_size = {
        "x": parseInt(instructions[0][0]),
        "y": parseInt(instructions[0][1]),
    };
    instructions.shift();

    let mowers = [];
    let mower = {};
    let positions = ["N", "S", "W", "E"];
    for (let i = 0; i < instructions.length; i++) {

        if (instructions[0].length > 3 || instructions[0].length < 3) {
            console.log("The data of the mower must contain 3 parameters (x, y and orientation), please correct to start the program");
            exit();
        }

        mower = {
            "x": parseInt(instructions[0][0]),
            "y": parseInt(instructions[0][1]),
            "orientation": instructions[0][2],
            "instructions": instructions[1].split('')
        };

        if (mower.x > garden_size.x || mower.y > garden_size.y || positions.indexOf(mower.orientation) == -1) {
            console.log("The data of a mower are wrong, please correct to start the program");
            exit();
        }
        instructions.splice(0, 2);
        mowers.push(mower);
    }

    const parsed_data = {
        "garden_size": garden_size,
        "mowers": mowers
    };
    return(parsed_data);
}