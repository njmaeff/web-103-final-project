import { loadPlayingGrid, GridMatrix, GridSquare } from "./grid";
import { randomTetromino, TetrominoState } from "./tetromino";
import { TETRIS_HEIGHT, TETRIS_WIDTH } from "./constants";
import { HighScore, readScoresFromStorage } from "./score";
import { getMusicSettingFromStorage, loadMusic } from "./music";

// this is our main state variable. We store everything in a single object so
// hopefully it is easier to understand. We can also update this object with
// settings changes
export let gameState = {} as GameState;

export interface GameState {
    grid?: GridMatrix;
    nextPieceGrid?: GridMatrix;
    tetrominoLineup?: TetrominoState[];
    currentTetrominoSquares: GridSquare[];
    tetromino?: TetrominoState;
    music: HTMLAudioElement;
    musicOn: boolean;
    timer?: NodeJS.Timer;
    highScores?: HighScore[];
}

export function setGameState(newState: Partial<GameState>) {
    Object.assign(gameState, newState);
}

export function initializeGameState() {
    setGameState({
        grid: loadPlayingGrid(
            ".tetris-main-container .tetris-inner",
            TETRIS_WIDTH,
            TETRIS_HEIGHT
        ),
        nextPieceGrid: loadPlayingGrid(
            ".tetris-next-piece-container .tetris-inner",
            4,
            4
        ),
        tetrominoLineup: [randomTetromino()],
        tetromino: randomTetromino(),
        music: loadMusic(),
        musicOn: getMusicSettingFromStorage(),
        currentTetrominoSquares: [],
        highScores: readScoresFromStorage(),
    });
}
