import { uiInterface } from "./index.js";
import { player } from "./index.js";
import { renderShips } from "./rendering.js";
import { startGame } from "./game.js";
import { clearGridCellsContent, resetPlayerGridCellsStyle } from "./game.js";

export function setupUiEventListeners() {
    const randomizeButton = uiInterface.randomizeButton;
    const startButton = uiInterface.playButton;

    // randomizes ship placements of player whenever it is clicked
    randomizeButton.addEventListener("click", randomizeAndRenderPlayerShips);

    startButton.addEventListener("click", () => {
        startGame();
    });
}

export function randomizeAndRenderPlayerShips() {
    clearGridCellsContent();
    resetPlayerGridCellsStyle();

    uiInterface.info.innerText = "";

    player.hasGameboardBeenRandomized = true;
    player.gameboard.randomizeShipsPlacement();
    renderShips(player.gameboard, player);
}
