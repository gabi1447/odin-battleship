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

    function horizontalOrVertical() {
        if (coordinatesList[0][0] === coordinatesList[length - 1][0]) {
            return "h";
        }
        return "v";
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
        horizontalOrVertical,
    };
}
