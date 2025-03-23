import { Ship } from "./ship.js";

export function Gameboard() {
    // the array length represents the number of ships on the grid,
    // and each element the size of the ship.
    const arrayOfShipSizes = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];

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

        shipToBePlaced.coordinatesList = generateCoordinates(
            startCoordinates,
            endCoordinates,
        );

        drawShipOnGrid(shipToBePlaced);
        shipsPresentOnGrid.push(shipToBePlaced);
    }

    function generateCoordinates(start, end) {
        let arrayOfCoordinates = [];

        if (start[0] === end[0]) {
            const s = start[1];
            const e = end[1];
            if (s < e) {
                for (let i = s; i <= e; i++) {
                    arrayOfCoordinates.push([start[0], i]);
                }
            } else {
                for (let i = s; i >= e; i--) {
                    arrayOfCoordinates.push([start[0], i]);
                }
            }
        } else if (start[1] === end[1]) {
            const s = start[0];
            const e = end[0];
            if (s < e) {
                for (let i = s; i <= e; i++) {
                    arrayOfCoordinates.push([i, start[1]]);
                }
            } else {
                for (let i = s; i >= e; i--) {
                    arrayOfCoordinates.push([i, start[1]]);
                }
            }
        }

        return arrayOfCoordinates;
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
        // returns true if a ship is hit
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
                return true;
            }
        }
        // a 3 resembles that a water cell has been hit on the grid
        grid[row][col] = 3;
        return false;
    }

    function areAllShipsSunk() {
        for (let ship of shipsPresentOnGrid) {
            if (!ship.isSunk()) {
                return false;
            }
        }
        return true;
    }

    function randomizeShipsPlacement() {
        resetGrid();
        for (let size of arrayOfShipSizes) {
            while (true) {
                const randomCoordinates = generateRandomCoordinates();

                const startAndEndCoordinates = generateShipPlacement(
                    randomCoordinates,
                    size,
                );

                if (!startAndEndCoordinates) {
                    continue;
                }

                const start = startAndEndCoordinates[0];
                const end = startAndEndCoordinates[1];
                placeShip(start, end);
                break;
            }
        }
    }

    function resetGrid() {
        shipsPresentOnGrid = [];
        grid = [
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
    }

    function generateShipPlacement(start, size) {
        // check if size is equal to 1 and check if the coordinates are safe to place the ship
        // if the ship is safe to place return start as the start and end coordinates
        if (size === 1 && isItSafeToPlaceTheShip([start])) {
            return [start, start];
        } else if (size === 1 && !isItSafeToPlaceTheShip([start])) {
            return false;
        }
        // this function calculates if the placement of the ship, from the starting point
        // to the right, left, upwards and downwards is possible. it should return start and end
        // coordinates when one combination is possible.
        const right = [start, [start[0], start[1] + size - 1]];
        const left = [start, [start[0], start[1] - (size - 1)]];
        const upwards = [start, [start[0] + size - 1, start[1]]];
        const downwards = [start, [start[0] - (size - 1), start[1]]];
        const possiblePlacements = [right, upwards, left, downwards];

        for (const placement of possiblePlacements) {
            if (!areCoordinatesValid(placement[0], placement[1])) {
                continue;
            }

            const shipCoordinates = generateCoordinates(
                placement[0],
                placement[1],
            );

            if (isItSafeToPlaceTheShip(shipCoordinates)) {
                return placement;
            }
        }

        return false;
    }

    function isItSafeToPlaceTheShip(shipCoordinates) {
        for (let coordinates of shipCoordinates) {
            const row = coordinates[0];
            const col = coordinates[1];
            if (grid[row][col] === 1) {
                return false;
            }
        }
        return true;
    }

    function randomizeNumber(range) {
        return Math.floor(Math.random() * range);
    }

    function generateRandomCoordinates() {
        return [randomizeNumber(10), randomizeNumber(10)];
    }

    function generateRandomValidCoordinates() {
        // this function generates a pair of coordinates that hasn't been hit yet
        let randomCoordinates;
        while (true) {
            randomCoordinates = generateRandomCoordinates();

            if (
                grid[randomCoordinates[0]][randomCoordinates[1]] === 2 ||
                grid[randomCoordinates[0]][randomCoordinates[1]] === 3
            ) {
                continue;
            }
            break;
        }
        return randomCoordinates;
    }

    return {
        get grid() {
            return grid;
        },
        placeShip,
        print,
        receiveAttack,
        areAllShipsSunk,
        randomizeShipsPlacement,
        get shipsPresentOnGrid() {
            return shipsPresentOnGrid;
        },
        generateRandomCoordinates,
        generateRandomValidCoordinates,
    };
}
