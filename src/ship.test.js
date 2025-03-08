import { Ship } from "./ship.js";

describe("ship factory", () => {
    let testShip;
    const shipLength = 4;

    beforeEach(() => {
        testShip = Ship(shipLength);
    });

    test("length of ship", () => {
        expect(testShip.length).toBe(shipLength);
    });

    test("ship is not sunk", () => {
        expect(testShip.isSunk()).toBeFalsy();
    });

    test("ship is sunk", () => {
        for (let i = 0; i < shipLength; i++) {
            testShip.hit();
        }
        expect(testShip.isSunk()).toBeTruthy();
    });

    test("hit doesn't increment if hits is equal to ship length", () => {
        const ship2 = Ship(1);
        ship2.hit();
        ship2.hit();
        expect(ship2.hits).toBe(1);
    });

    test("hit increments hits property", () => {
        const ship3 = Ship(1);
        ship3.hit();
        expect(ship3.hits).toBe(1);
    });

    test("generateCoordinates returns the right coordinates when start and end are horizontal to each other", () => {
        expect(testShip.generateCoordinates([2, 4], [2, 7])).toEqual([
            [2, 4],
            [2, 5],
            [2, 6],
            [2, 7],
        ]);
    });

    test("generateCoordinates returns the right coordinates when start and end are vertical to each other", () => {
        expect(testShip.generateCoordinates([4, 3], [7, 3])).toEqual([
            [4, 3],
            [5, 3],
            [6, 3],
            [7, 3],
        ]);
    });
});
