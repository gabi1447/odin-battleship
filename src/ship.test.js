import { ship } from "./ship.js";

describe("ship factory", () => {
    const testShip = ship(4);

    test("length of ship", () => {
        expect(testShip.length).toBe(4);
    });

    test("ship is not sunk", () => {
        expect(testShip.isSunk()).toBeFalsy();
    });

    test("ship is sunk", () => {
        for (let i = 0; i < 4; i++) {
            testShip.hit();
        }
        expect(testShip.isSunk()).toBeTruthy();
    });

    test("hit doesn't increment if hits is equal to length", () => {
        const ship2 = ship(1);
        ship2.hit();
        ship2.hit();
        expect(ship2.hits).toBe(1);
    });

    test("hit increments hits property", () => {
        const ship3 = ship(1);
        ship3.hit();
        expect(ship3.hits).toBe(1);
    });
});
