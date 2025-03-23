import { uiInterface } from "./index.js";
import { player, computer } from "./index.js";
import { renderHits } from "./rendering.js";
import { numberTextToInt } from "./generalPurpose.js";
import { randomizeAndRenderPlayerShips } from "./uiEventListeners.js";

export function startGame() {
    uiInterface.info.innerText = "";
    // randomize player's gameboard if it hasn't been randomized
    if (!player.hasGameboardBeenRandomized) {
        randomizeAndRenderPlayerShips();
    }

    player.hasGameboardBeenRandomized = false;

    // remove randomize button once the game starts
    uiInterface.randomButtonPlaceholder.innerText = "";

    // randomize ships in computer's grid
    computer.gameboard.randomizeShipsPlacement();
    // communicate that the game has started to the user.
    uiInterface.info.style.color = "#5353ec";
    uiInterface.info.innerText = "Game has started, it's your turn!";

    computer.table.addEventListener("click", handleClick);
}

function gridCellIdToGridCoordinates(gridCellId) {
    let row = gridCellId.split("-")[0];
    let col = gridCellId.split("-")[1];
    col = col.substring(0, col.length - 1);

    row = numberTextToInt(row);
    col = numberTextToInt(col);

    return [row, col];
}

export function clearGridCellsContent() {
    const gridCells = document.querySelectorAll(uiInterface.gridCellClass);
    gridCells.forEach((gridCell) => {
        gridCell.innerText = "";
    });
}

export function resetPlayerGridCellsStyle() {
    const tableBody = player.table.firstElementChild;
    const gridCells = tableBody.querySelectorAll(
        `${uiInterface.gridCellClass}`,
    );
    gridCells.forEach((gridCell) => {
        gridCell.style = "";
    });
}

function handleClick(event) {
    // check if the id that was clicked is valid
    const gridCellId = event.target.id;
    if (!isGridCellIdValid(gridCellId)) {
        return;
    }

    // check if the cell that was clicked has already been hit
    const gridCellCoordinates = gridCellIdToGridCoordinates(gridCellId);
    if (document.getElementById(gridCellId).innerText.length > 0) {
        return;
    }

    // hit computer's grid coordinate
    if (
        computer.gameboard.receiveAttack(gridCellCoordinates) &&
        computer.gameboard.areAllShipsSunk()
    ) {
        uiInterface.info.style.color = "#4BB543";
        uiInterface.info.innerText = "You have won:)";

        computer.table.removeEventListener("click", handleClick);

        uiInterface.playButton.innerText = "Play again";

        uiInterface.randomButtonPlaceholder.appendChild(
            uiInterface.randomizeButton,
        );
    }
    // render computer hits
    renderHits(computer.gameboard, computer);

    // generate grid coordinates that are not yet hit
    const randomCoordinates = player.gameboard.generateRandomValidCoordinates();

    if (
        player.gameboard.receiveAttack(randomCoordinates) &&
        player.gameboard.areAllShipsSunk()
    ) {
        uiInterface.info.style.color = "#ff0000";
        uiInterface.info.innerText = "The Computer has won:(";

        computer.table.removeEventListener("click", handleClick);

        uiInterface.playButton.innerText = "Play again";
        uiInterface.randomButtonPlaceholder.appendChild(
            uiInterface.randomizeButton,
        );
    }
    // render player hits
    renderHits(player.gameboard, player);
}

function isGridCellIdValid(id) {
    const gridCellIdPattern = /^[a-z]+-[a-z]+c$/m;
    return gridCellIdPattern.test(id);
}
