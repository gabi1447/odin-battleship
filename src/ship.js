export function ship(l) {
    const length = l;
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
        isSunk,
        hit,
    };
}
