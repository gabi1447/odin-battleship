export function Ship(l) {
    const length = l;
    let coordinatesList;
    let hits = 0;

    function hit() {
        if (hits === length) {
            return;
        }
        hits++;
    }

    function isSunk() {
        return hits === length;
    }

    function generateCoordinates(start, end) {
        let arrayOfCoordinates = [];
        if (start[0] === end[0]) {
            const s = start[1];
            const e = end[1];
            for (let i = s; i <= e; i++) {
                arrayOfCoordinates.push([start[0], i]);
            }
        } else if (start[1] === end[1]) {
            const s = start[0];
            const e = end[0];
            for (let i = s; i <= e; i++) {
                arrayOfCoordinates.push([i, start[1]]);
            }
        }

        return arrayOfCoordinates;
    }

    return {
        length,
        get hits() {
            return hits;
        },
        get coordinatesList() {
            return coordinatesList;
        },
        set coordinatesList(arrayOfCoordinates) {
            coordinatesList = arrayOfCoordinates;
        },
        isSunk,
        hit,
        generateCoordinates,
    };
}
