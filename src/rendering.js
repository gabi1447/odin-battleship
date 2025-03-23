import { oneDigitNumberToNumberWord } from "./generalPurpose";

export function renderShips(gameboard, typeOfPlayer) {
    // loop over ships present in grid
    gameboard.shipsPresentOnGrid.forEach((ship) => {
        let gridCellIds = [];
        const start = ship.coordinatesList[0];
        const end = ship.coordinatesList[ship.coordinatesList.length - 1];
        // loop over each ships coordinates
        for (let coordinates of ship.coordinatesList) {
            // turn each coordinate into a gridcell id
            const id = `${oneDigitNumberToNumberWord(coordinates[0])}-${oneDigitNumberToNumberWord(coordinates[1])}${typeOfPlayer.id}`;
            gridCellIds.push(id);
        }

        gridCellIds.forEach((id) => {
            document.getElementById(id).style.backgroundColor =
                "rgba(100, 149, 237, 0.5)";
        });

        // handle when the ship is just one gridCell long
        if (gridCellIds.length === 1) {
            document.getElementById(gridCellIds[0]).style.border =
                "3px solid black";
        }

        let counter = 0;
        if (ship.horizontalOrVertical() === "h") {
            if (start[1] < end[1]) {
                for (let i = 0; i < gridCellIds.length; i++) {
                    counter++;
                    const gridCellElement = document.getElementById(
                        gridCellIds[i],
                    );

                    if (counter === 1) {
                        addBordersToElement(
                            gridCellElement,
                            "left",
                            "top",
                            "bottom",
                        );
                        continue;
                    } else if (counter === gridCellIds.length) {
                        addBordersToElement(
                            gridCellElement,
                            "right",
                            "top",
                            "bottom",
                        );
                        break;
                    }
                    addBordersToElement(gridCellElement, "bottom", "top");
                }
            } else {
                for (let i = 0; i < gridCellIds.length; i++) {
                    counter++;
                    const gridCellElement = document.getElementById(
                        gridCellIds[i],
                    );
                    if (counter === 1) {
                        addBordersToElement(
                            gridCellElement,
                            "right",
                            "top",
                            "bottom",
                        );
                        continue;
                    } else if (counter === gridCellIds.length) {
                        addBordersToElement(
                            gridCellElement,
                            "left",
                            "top",
                            "bottom",
                        );
                        break;
                    }
                    addBordersToElement(gridCellElement, "top", "bottom");
                }
            }
        } else {
            if (start[0] < end[0]) {
                for (let i = 0; i < gridCellIds.length; i++) {
                    counter++;
                    const gridCellElement = document.getElementById(
                        gridCellIds[i],
                    );
                    if (counter === 1) {
                        addBordersToElement(
                            gridCellElement,
                            "top",
                            "left",
                            "right",
                        );
                        continue;
                    } else if (counter === gridCellIds.length) {
                        addBordersToElement(
                            gridCellElement,
                            "bottom",
                            "left",
                            "right",
                        );
                        break;
                    }
                    addBordersToElement(gridCellElement, "right", "left");
                }
            } else {
                for (let i = 0; i < gridCellIds.length; i++) {
                    counter++;
                    const gridCellElement = document.getElementById(
                        gridCellIds[i],
                    );
                    if (counter === 1) {
                        addBordersToElement(
                            gridCellElement,
                            "right",
                            "left",
                            "bottom",
                        );
                        continue;
                    } else if (counter === gridCellIds.length) {
                        addBordersToElement(
                            gridCellElement,
                            "right",
                            "top",
                            "left",
                        );
                        break;
                    }
                    addBordersToElement(gridCellElement, "right", "left");
                }
            }
        }
        counter = 0;
    });
}

function addBordersToElement(element, ...positions) {
    for (let position of positions) {
        element.style.cssText += `border-${position}: 3px solid black;`;
    }
}

export function renderHits(gameboard, typeOfPlayer) {
    // loop over gameboard grid
    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
            if (gameboard.grid[row][col] === 2) {
                const gridCellId = `${oneDigitNumberToNumberWord(row)}-${oneDigitNumberToNumberWord(col)}${typeOfPlayer.id}`;
                const gridCellElement = document.getElementById(gridCellId);
                gridCellElement.innerText = "🔴";
            } else if (gameboard.grid[row][col] === 3) {
                const gridCellId = `${oneDigitNumberToNumberWord(row)}-${oneDigitNumberToNumberWord(col)}${typeOfPlayer.id}`;
                const gridCellElement = document.getElementById(gridCellId);
                gridCellElement.innerText = "⚫";
            }
        }
    }
}
