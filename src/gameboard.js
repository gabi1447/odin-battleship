import { Ship } from "./ship.js";

export function Gameboard() {
    // keys represent the size of the ship and values the number of them present in the grid
    const shipSizesAvailable = {
        1: 4,
        2: 3,
        3: 2,
        4: 1,
    };

    let shipsPresentOnGrid = [];

    /* 
    0 -> water
    1 -> ships
    2 -> ship hit
    3 -> water hit
    */
    let grid = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];

    function print() {
        for (let row of grid) {
            for (let cell of row) {
                process.stdout.write(`${cell} `);
            }
            console.log("");
        }
    }

    function placeShip(startCoordinates, endCoordinates) {
        if (!areCoordinatesValid(startCoordinates, endCoordinates)) {
            return false;
        }

        const shipLength = returnLengthOfShip(startCoordinates, endCoordinates);
        const shipToBePlaced = Ship(shipLength);

        shipToBePlaced.coordinatesList = shipToBePlaced.generateCoordinates(
            startCoordinates,
            endCoordinates,
        );

        drawShipOnGrid(shipToBePlaced);
        shipsPresentOnGrid.push(shipToBePlaced);
    }

    function drawShipOnGrid(shipInstance) {
        for (let coordinates of shipInstance.coordinatesList) {
            const row = coordinates[0];
            const col = coordinates[1];
            grid[row][col] = 1;
        }
    }

    function areCoordinatesValid(start, end) {
        if (!isCoordinateInsideGrid(start) || !isCoordinateInsideGrid(end)) {
            return false;
        }
        // start and end coordinates have to have one axis with the same number,
        // otherwise the ship won't be placed vertically or horizontally
        if (start[0] !== end[0] && start[1] !== end[1]) {
            return false;
        }

        const shipLength = returnLengthOfShip(start, end);
        // ship length must not exceed 4
        return shipLength > 4 || shipLength < 1 ? false : true;
    }

    function isCoordinateInsideGrid(coordinate) {
        if (
            coordinate[0] > 9 ||
            coordinate[0] < 0 ||
            coordinate[1] > 9 ||
            coordinate[1] < 0
        ) {
            return false;
        }
        return true;
    }

    function returnLengthOfShip(startCoordinates, endCoordinates) {
        if (startCoordinates[0] === endCoordinates[0]) {
            return Math.abs(endCoordinates[1] - startCoordinates[1]) + 1;
        } else {
            return Math.abs(endCoordinates[0] - startCoordinates[0]) + 1;
        }
    }

    function areArraysEqual(arr1, arr2) {
        return JSON.stringify(arr1) === JSON.stringify(arr2);
    }

    function receiveAttack(coordinates) {
        const row = coordinates[0];
        const col = coordinates[1];
        let shipHit = false;
        for (let ship of shipsPresentOnGrid) {
            for (let shipCoordinates of ship.coordinatesList) {
                if (areArraysEqual(coordinates, shipCoordinates)) {
                    // a 2 resembles that a ship cell has been hit on the grid
                    grid[row][col] = 2;
                    shipHit = true;
                    ship.hit();
                    break;
                }
            }
            if (shipHit) {
                return;
            }
        }
        // a 3 resembles that a water cell has been hit on the grid
        grid[row][col] = 3;
    }

    function areAllShipsSunk() {
        for (let ship of shipsPresentOnGrid) {
            if (!ship.isSunk()) {
                return false;
            }
        }
        return true;
    }

    return {
        get grid() {
            return grid;
        },
        placeShip,
        print,
        receiveAttack,
        areAllShipsSunk,
    };
}
