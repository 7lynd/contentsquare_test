const drawerService = require('./drawer')

exports.placeMowerInGarden = function(mower, garden) {
    garden[mower.y][mower.x] = "M";
    return garden;
}

exports.changeMowerOrientation = function(mower, direction) {
    switch (mower.orientation) {
        case "N":
            if (direction == 1) {
                mower.orientation = "E"
            } else {
                mower.orientation = "W"
            }
            break;
        case "S":
            if (direction == 1) {
                mower.orientation = "W"
            } else {
                mower.orientation = "E"
            }
            break;
        case "W":
            if (direction == 1) {
                mower.orientation = "N"
            } else {
                mower.orientation = "S" 
            }
            break;
        case "E":
            if (direction == 1) {
                mower.orientation = "S"
            } else {
                mower.orientation = "N"  
            }
            break;
        default:
            break;
    }
    return mower
}

exports.changeMowerPosition = function(mower, direction, garden_size) {
    switch (mower.orientation) {
        case "N":
            if ((direction == 1 && mower.y + 1 <= garden_size.y) || (direction == -1 && mower.y - 1 >= 0)) {
                mower.y += direction
            }
            break;
        case "S":
            if ((direction == 1 && mower.y - 1 >= 0) || (direction == -1 && mower.y + 1 <= garden_size.y)) {
                mower.y -= direction
            }
            break;
        case "W":
            if ((direction == 1 && mower.x - 1 >= 0) || (direction == -1 && mower.x + 1 <= garden_size.x)) {
                mower.x -= direction
            }
            break;
        case "E":
            if ((direction == 1 && mower.x + 1 <= garden_size.x) || (direction == -1 && mower.x - 1 >= 0)) {
                mower.x += direction
            }
            break;
        default:
            break;
    }

    return mower;
}

exports.moveMowerInGarden = function(mower, garden, garden_size) {
    for (let i = 0; i < mower.instructions.length; i++) {
        const movement = mower.instructions[i];

        garden[mower.y][mower.x] = "C";

        switch (movement) {
            case "R":
                mower = this.changeMowerOrientation(mower, 1);
                break;
            case "L":
                mower = this.changeMowerOrientation(mower, -1);
                break;
            case "F":
                mower = this.changeMowerPosition(mower, 1, garden_size);
                break;
            case "R":
                mower = this.changeMowerPosition(mower, -1, garden_size);
                break;
            default:
                break;
        }
        garden[mower.y][mower.x] = "M";
    }
    return ({"mower": mower, "garden": garden});
}

exports.printPosition = function(mower) {
    console.log(`${mower.x} ${mower.y} ${mower.orientation}`);
}

exports.printAllPositions = function(mowers) {
    mowers.forEach(mower => {
        this.printPosition(mower);
    });
}