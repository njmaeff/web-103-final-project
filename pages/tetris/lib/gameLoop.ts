import {
    clearGrids,
    commitMove,
    isAboveTopOfGrid,
    paintNextGrid,
    tryMoveDown,
} from "./grid";
import { applySpawnPosition, cycleNextTetromino } from "./tetromino";
import {
    getSpeed,
    resetLevelCount,
    resetLineCount,
    updateLevelCount,
} from "./score";
import { activateGameOverMenu } from "./menu";
import { gameState, initializeGameState } from "./state";
import { applyMainKeyBindings } from "./keybindings";
import { playMusicIfEnabled } from "./music";

export function runGameLoop(speed) {
    // this is our game loop
    gameState.timer = setInterval(function () {
        const previousTetrominoSquares = gameState.currentTetrominoSquares;

        tryMoveDown(-1);

        // this is our game over condition
        if (isAboveTopOfGrid()) {
            stopGameLoop();
            activateGameOverMenu();
        }

        // this tells use we've either hit a another square or at the bottom of
        // the grid
        if (previousTetrominoSquares === gameState.currentTetrominoSquares) {
            // we've reached the bottom when the squares don't update
            commitMove();
            // spawn the next tetromino
            cycleNextTetromino();
            paintNextGrid();
            applySpawnPosition();

            // check if we need to increase the level
            const speedAfterUpdate = getSpeed();
            if (speedAfterUpdate !== speed) {
                updateLevelCount();
                resetGameLoop();
            }
        }
    }, speed);
}

export function stopGameLoop() {
    clearInterval(gameState.timer);
}

export function resetGameLoop() {
    stopGameLoop();
    runGameLoop(getSpeed());
}

export function runGame() {
    initializeGameState();
    resetLineCount();
    resetLevelCount();
    clearGrids();
    applySpawnPosition();
    paintNextGrid();
    applyMainKeyBindings();
    playMusicIfEnabled();
    runGameLoop(getSpeed());
}
