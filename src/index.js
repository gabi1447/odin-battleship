import "./styles.css";
import { Gameboard } from "./gameboard.js";
import { oneDigitNumberToNumberWord } from "./generalPurpose.js";
import { renderShips } from "./rendering.js";
import { setupUiEventListeners } from "./uiEventListeners.js";

export const player = (function () {
    let hasGameboardBeenRandomized = false;
    return {
        table: document.getElementById("playerTable"),
        id: "p",
        gameboard: Gameboard(),
        get hasGameboardBeenRandomized() {
            return hasGameboardBeenRandomized;
        },
        set hasGameboardBeenRandomized(bool) {
            hasGameboardBeenRandomized = bool;
        },
    };
})();

export const computer = (function () {
    return {
        table: document.getElementById("computerTable"),
        id: "c",
        gameboard: Gameboard(),
    };
})();

export const uiInterface = (function () {
    return {
        randomButtonPlaceholder: document.querySelector(
            ".randomButtonPlaceholder",
        ),
        playButtonPlaceholder: document.querySelector(".playButtonPlaceholder"),
        playButton: generateButton("playButton", "Play"),
        randomizeButton: generateButton("randomizeButton", "Randomize"),
        info: document.querySelector(".info"),
        gridCellClass: ".cellContent",
    };
})();

function buildInterface() {
    buildEmptyGrid(player);
    buildEmptyGrid(computer);

    uiInterface.playButtonPlaceholder.appendChild(uiInterface.playButton);
    uiInterface.randomButtonPlaceholder.appendChild(
        uiInterface.randomizeButton,
    );

    player.gameboard.randomizeShipsPlacement();
    player.hasGameboardBeenRandomized = true;
    renderShips(player.gameboard, player);

    setupUiEventListeners();
}

export function buildEmptyGrid(typeOfPlayer) {
    const rows = 9;
    const cols = 9;

    const tableBody = typeOfPlayer.table.firstElementChild;

    for (let i = 0; i <= rows; i++) {
        const tableRow = document.createElement("tr");
        for (let j = 0; j <= cols; j++) {
            const gridCell = document.createElement("td");
            const cellContent = document.createElement("div");
            gridCell.appendChild(cellContent);

            const col = oneDigitNumberToNumberWord(i);
            const row = oneDigitNumberToNumberWord(j);

            cellContent.classList.add("cellContent");
            cellContent.id = `${col}-${row}${typeOfPlayer.id}`;

            gridCell.setAttribute("data-x", j);
            gridCell.setAttribute("data-y", i);
            tableRow.appendChild(gridCell);
        }
        tableBody.appendChild(tableRow);
    }
}

function generateButton(idName, text) {
    const button = document.createElement("button");
    button.id = idName;
    button.className = "button";
    button.innerText = text;

    return button;
}

buildInterface();
