import { randomNumber } from "./util";
import { TETRIS_HEIGHT, TETRIS_WIDTH } from "./constants";
import { gameState } from "./state";

export type Combinations = TetrominoCombination[];
export type Coordinate = { x: number; y: number };
export type Coordinates = Coordinate[];
export type TetrominoCombination = {
    combination: Coordinates;
    leftMostIndex: number;
    rightMostIndex: number;
};
export type TetrominoState = {
    currentIndex: number;
    color: string;
    combinations: Combinations;
};

export function getLateralMove(offset: number): Coordinates {
    let element;
    if (offset <= 0) {
        element = getLeftMostCoordinate(
            getCurrentCombination(gameState.tetromino)
        );
    } else if (offset > 0) {
        element = getRightMostCoordinate(
            getCurrentCombination(gameState.tetromino)
        );
    }

    return [
        {
            x: element.x + offset,
            y: element.y,
        },
    ];
}

export function moveLaterally(offset: number) {
    if (offset !== 0) {
        for (const combination of gameState.tetromino.combinations) {
            for (const combinationElement of combination.combination) {
                // offset x axis
                combinationElement.x += offset;
            }
        }
    }
}

export function getMoveUpOrDown(offset: number): Coordinates {
    const combination = getCurrentCombination(gameState.tetromino);
    if (offset !== 0) {
        return combination.combination.map(function (coordinate) {
            return {
                x: coordinate.x,
                y: coordinate.y + offset,
            };
        });
    } else {
        return combination.combination;
    }
}

export function moveUpOrDown(offset: number) {
    if (offset !== 0) {
        for (const combination of gameState.tetromino.combinations) {
            for (const coordinate of combination.combination) {
                // offset y axis
                coordinate.y += offset;
            }
        }
    }
}

export function getRotation(rotations: number) {
    let index =
        (gameState.tetromino.currentIndex + rotations) %
        gameState.tetromino.combinations.length;

    if (index < 0) {
        index = gameState.tetromino.combinations.length + index;
    }

    return gameState.tetromino.combinations[index].combination;
}

export function rotate(
    tetromino: TetrominoState,
    rotations: number
): TetrominoState {
    let index =
        (tetromino.currentIndex + rotations) % tetromino.combinations.length;

    if (index < 0) {
        index = tetromino.combinations.length + index;
    }

    tetromino.currentIndex = index;
    return tetromino;
}

export function applyOffsetToCoordinates(xOffset: number, yOffset: number) {
    moveLaterally(xOffset);
    moveUpOrDown(yOffset);
}

export function applyRandomRotation(tetromino: TetrominoState) {
    return rotate(
        tetromino,
        randomNumber(0, tetromino.combinations.length - 1)
    );
}

/**
 * Raise to the top of the grid and apply a left or right shift to the element
 * so it spawns somewhere in the center of the grid.
 */
export function applyStartingOffset() {
    const rightMost = getRightMostCoordinate(
        getCurrentCombination(gameState.tetromino)
    );

    const offsetAmount = TETRIS_WIDTH - rightMost.x - 1;

    // min is somewhere in the left center of the grid
    const minOffset = Math.floor(TETRIS_WIDTH / 4);

    // max is somewhere in the right center of the grid
    const maxOffset = Math.floor(minOffset + offsetAmount / 2);

    applyOffsetToCoordinates(randomNumber(minOffset, maxOffset), TETRIS_HEIGHT);
}

export function getCurrentCombination(
    tetromino: TetrominoState
): TetrominoCombination {
    return tetromino.combinations[tetromino.currentIndex];
}

export function getLeftMostCoordinate(
    combination: TetrominoCombination
): Coordinate {
    return combination.combination[combination.leftMostIndex];
}

export function getRightMostCoordinate(
    combination: TetrominoCombination
): Coordinate {
    return combination.combination[combination.rightMostIndex];
}

export const tetrominoColors = {
    CYAN: "cyan",
    RED: "red",
    GREEN: "green",
    BLUE: "blue",
    ORANGE: "orange",
    YELLOW: "yellow",
    PURPLE: "purple",
};

export function createStraightTetromino(): TetrominoState {
    return {
        currentIndex: 0,
        color: tetrominoColors.CYAN,
        combinations: [
            // vertical
            {
                combination: [
                    { x: 0, y: 0 },
                    { x: 0, y: 1 },
                    { x: 0, y: 2 },
                    { x: 0, y: 3 },
                ],
                leftMostIndex: 0,
                rightMostIndex: 0,
            },

            // horizontal
            {
                combination: [
                    { x: 0, y: 0 },
                    { x: 1, y: 0 },
                    { x: 2, y: 0 },
                    { x: 3, y: 0 },
                ],
                leftMostIndex: 0,
                rightMostIndex: 3,
            },
        ],
    };
}

export function createSquareTetromino(): TetrominoState {
    return {
        currentIndex: 0,
        color: tetrominoColors.YELLOW,
        combinations: [
            {
                combination: [
                    { x: 0, y: 0 },
                    { x: 1, y: 0 },
                    { x: 0, y: 1 },
                    { x: 1, y: 1 },
                ],
                leftMostIndex: 0,
                rightMostIndex: 1,
            },
        ],
    };
}

export function createTTetromino(): TetrominoState {
    return {
        currentIndex: 0,
        color: tetrominoColors.PURPLE,
        combinations: [
            {
                combination: [
                    { x: 0, y: 0 },
                    { x: 1, y: 0 },
                    { x: 1, y: 1 },
                    { x: 2, y: 0 },
                ],
                leftMostIndex: 0,
                rightMostIndex: 3,
            },

            {
                combination: [
                    { x: 0, y: 0 },
                    { x: 0, y: 1 },
                    { x: 1, y: 1 },
                    { x: 0, y: 2 },
                ],
                leftMostIndex: 0,
                rightMostIndex: 2,
            },

            {
                combination: [
                    { x: 0, y: 1 },
                    { x: 1, y: 1 },
                    { x: 1, y: 0 },
                    { x: 2, y: 1 },
                ],
                leftMostIndex: 0,
                rightMostIndex: 3,
            },

            {
                combination: [
                    { x: 1, y: 0 },
                    { x: 0, y: 1 },
                    { x: 1, y: 1 },
                    { x: 1, y: 2 },
                ],
                leftMostIndex: 1,
                rightMostIndex: 0,
            },
        ],
    };
}

export function createJTetromino(): TetrominoState {
    return {
        currentIndex: 0,
        color: tetrominoColors.BLUE,
        combinations: [
            {
                combination: [
                    { x: 0, y: 0 },
                    { x: 1, y: 0 },
                    { x: 1, y: 1 },
                    { x: 1, y: 2 },
                ],
                leftMostIndex: 0,
                rightMostIndex: 3,
            },

            {
                combination: [
                    { x: 0, y: 0 },
                    { x: 0, y: 1 },
                    { x: 1, y: 0 },
                    { x: 2, y: 0 },
                ],
                leftMostIndex: 0,
                rightMostIndex: 3,
            },

            {
                combination: [
                    { x: 0, y: 0 },
                    { x: 0, y: 1 },
                    { x: 0, y: 2 },
                    { x: 1, y: 2 },
                ],
                leftMostIndex: 0,
                rightMostIndex: 3,
            },

            {
                combination: [
                    { x: 0, y: 1 },
                    { x: 1, y: 1 },
                    { x: 2, y: 1 },
                    { x: 2, y: 0 },
                ],
                leftMostIndex: 0,
                rightMostIndex: 3,
            },
        ],
    };
}

export function createLTetromino(): TetrominoState {
    return {
        currentIndex: 0,
        color: tetrominoColors.ORANGE,
        combinations: [
            {
                combination: [
                    { x: 0, y: 0 },
                    { x: 0, y: 1 },
                    { x: 0, y: 2 },
                    { x: 1, y: 0 },
                ],
                leftMostIndex: 0,
                rightMostIndex: 3,
            },

            {
                combination: [
                    { x: 0, y: 0 },
                    { x: 0, y: 1 },
                    { x: 1, y: 1 },
                    { x: 2, y: 1 },
                ],
                leftMostIndex: 0,
                rightMostIndex: 3,
            },

            {
                combination: [
                    { x: 0, y: 2 },
                    { x: 1, y: 2 },
                    { x: 1, y: 1 },
                    { x: 1, y: 0 },
                ],
                leftMostIndex: 0,
                rightMostIndex: 3,
            },

            {
                combination: [
                    { x: 0, y: 0 },
                    { x: 1, y: 0 },
                    { x: 2, y: 0 },
                    { x: 2, y: 1 },
                ],
                leftMostIndex: 0,
                rightMostIndex: 3,
            },
        ],
    };
}

export function createSTetromino(): TetrominoState {
    return {
        currentIndex: 0,
        color: tetrominoColors.GREEN,
        combinations: [
            {
                combination: [
                    { x: 0, y: 2 },
                    { x: 0, y: 1 },
                    { x: 1, y: 1 },
                    { x: 1, y: 0 },
                ],
                leftMostIndex: 0,
                rightMostIndex: 3,
            },

            {
                combination: [
                    { x: 0, y: 0 },
                    { x: 1, y: 0 },
                    { x: 1, y: 1 },
                    { x: 2, y: 1 },
                ],
                leftMostIndex: 0,
                rightMostIndex: 3,
            },
        ],
    };
}

export function createZTetromino(): TetrominoState {
    return {
        currentIndex: 0,
        color: tetrominoColors.RED,
        combinations: [
            {
                combination: [
                    { x: 0, y: 0 },
                    { x: 0, y: 1 },
                    { x: 1, y: 1 },
                    { x: 1, y: 2 },
                ],
                leftMostIndex: 0,
                rightMostIndex: 3,
            },

            {
                combination: [
                    { x: 0, y: 1 },
                    { x: 1, y: 1 },
                    { x: 1, y: 0 },
                    { x: 2, y: 0 },
                ],
                leftMostIndex: 0,
                rightMostIndex: 3,
            },
        ],
    };
}

export function randomTetromino() {
    const tetrominoList = [
        createStraightTetromino,
        createSquareTetromino,
        createTTetromino,
        createLTetromino,
        createSTetromino,
        createJTetromino,
        createZTetromino,
    ];

    return applyRandomRotation(
        tetrominoList[randomNumber(0, tetrominoList.length - 1)]()
    );
}

export function applySpawnPosition() {
    applyStartingOffset();
}

export function cycleNextTetromino() {
    gameState.tetrominoLineup.unshift(randomTetromino());
    gameState.tetromino = gameState.tetrominoLineup.pop();
}
