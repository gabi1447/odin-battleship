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
    };
}
