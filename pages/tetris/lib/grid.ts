import { TETRIS_HEIGHT, TETRIS_WIDTH } from "./constants";
import {
    Coordinate,
    Coordinates,
    getCurrentCombination,
    getLateralMove,
    getMoveUpOrDown,
    getRotation,
    moveLaterally,
    moveUpOrDown,
    rotate,
} from "./tetromino";
import { addToLineCount } from "./score";
import { padGridRowsTop } from "./util";
import { gameState } from "./state";
import { resetGameLoop } from "./gameLoop";

export type GridSquare = HTMLDivElement;
export type GridMatrix = GridSquare[][];

export function loadPlayingGrid(query: string, width, height): GridMatrix {
    const grid = [] as GridMatrix;

    const blocks = document.querySelectorAll(
        query
    ) as NodeListOf<HTMLDivElement>;

    for (let row = 0; row < height; row++) {
        const rowArray: HTMLDivElement[] = [];

        for (let column = 0; column < width; column++) {
            rowArray.push(blocks[column + width * row]);
        }
        grid.unshift(rowArray);
    }
    return grid;
}

export function maybeGetGridSquareFromCoordinate(
    grid: GridMatrix,
    coordinate: Coordinate
) {
    const row = grid[coordinate.y];
    if (row) {
        return row[coordinate.x];
    }
}

export function maybeSetGridSquareStyle(
    grid: GridMatrix,
    coordinate: Coordinate,
    styles: Partial<HTMLDivElement["style"]>
) {
    // index x, y
    const square = maybeGetGridSquareFromCoordinate(grid, coordinate);
    if (square) {
        Object.assign(square.style, styles);
    }

    return square;
}

export function gridForEachSquare(
    grid: GridMatrix,
    operation: (coordinate: Coordinate, square: GridSquare) => void
) {
    for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
        const row = grid[rowIndex];
        for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
            operation({ x: columnIndex, y: rowIndex }, row[columnIndex]);
        }
    }
}

/**
 * clear lines and update score. Use naive line clear method.
 * https://tetris.fandom.com/wiki/Line_clear
 */
export function commitMove() {
    // lets go through each row and find the ones where all the squares have a
    // background. We will exclude these from our template effectively deleting
    // the row
    const template = [];

    for (const row of gameState.grid) {
        let count = 0;
        for (const square of row) {
            if (square.style.backgroundColor) {
                count++;
            }
        }
        if (count !== TETRIS_WIDTH) {
            template.push(row);
        }
    }

    // pad rows at the top to replace the rows we deleted.
    const rowsRemoved = gameState.grid.length - template.length;
    if (rowsRemoved > 0) {
        addToLineCount(rowsRemoved);
    }

    const paddedTemplate = padGridRowsTop(template, rowsRemoved, () => ({
        style: { backgroundColor: "" },
    }));

    // lets take our template and paint our actual grid.
    gridForEachSquare(paddedTemplate as any, (coordinate, square) => {
        maybeSetGridSquareStyle(gameState.grid, coordinate, {
            backgroundColor: square.style.backgroundColor,
        });
    });

    gameState.currentTetrominoSquares = [];
}

export function paintNextGrid() {
    // clear out previous tetromino colors
    gridForEachSquare(gameState.nextPieceGrid, (coordinate, square) => {
        square.style.backgroundColor = "";
    });

    const nextTetromino =
        gameState.tetrominoLineup[gameState.tetrominoLineup.length - 1]; // last
    // element
    const currentCombination = getCurrentCombination(nextTetromino);

    for (const coordinate of currentCombination.combination) {
        maybeSetGridSquareStyle(gameState.nextPieceGrid, coordinate, {
            backgroundColor: nextTetromino.color,
        });
    }
}

export function paintGrid() {
    const currentCombination = getCurrentCombination(gameState.tetromino);
    for (const lastCoordinate of gameState.currentTetrominoSquares) {
        lastCoordinate.style.backgroundColor = "";
    }

    const nextGridSquares = [];
    for (const currentCombinationElement of currentCombination.combination) {
        const square = maybeSetGridSquareStyle(
            gameState.grid,
            currentCombinationElement,
            {
                backgroundColor: gameState.tetromino.color,
            }
        );
        if (square) {
            nextGridSquares.push(square);
        }
    }

    gameState.currentTetrominoSquares = nextGridSquares;
}

export function checkMove(coordinates: Coordinates): boolean {
    for (const coordinate of coordinates) {
        const square = maybeGetGridSquareFromCoordinate(
            gameState.grid,
            coordinate
        );

        if (
            // conflict with another square
            (square &&
                !gameState.currentTetrominoSquares.includes(square) &&
                square.style.backgroundColor) ||
            // too far down
            coordinate.y === -1 ||
            // too far left
            coordinate.x < 0 ||
            // too far right
            coordinate.x === TETRIS_WIDTH
        ) {
            // we have a conflict
            return false;
        }
    }

    return true;
}

export function tryRotate(rotations: number) {
    if (checkMove(getRotation(rotations))) {
        rotate(gameState.tetromino, rotations);
        paintGrid();
    }
}

export function tryMoveLaterally(offset: number) {
    if (checkMove(getLateralMove(offset))) {
        moveLaterally(offset);
        paintGrid();
    }
}

export function tryMoveDown(offset: number) {
    if (checkMove(getMoveUpOrDown(offset))) {
        moveUpOrDown(offset);
        paintGrid();
    }
}

export function dropToBottom() {
    let offset = -1;
    while (checkMove(getMoveUpOrDown(offset))) {
        offset--;
    }

    tryMoveDown(offset + 1);
}

export function isAboveTopOfGrid() {
    const current = getCurrentCombination(gameState.tetromino);

    let isAboveTop = true;
    for (const coordinate of current.combination) {
        if (!(coordinate.y >= TETRIS_HEIGHT)) {
            isAboveTop = false;
        }
    }

    return isAboveTop;
}

export function clearGrids() {
    gridForEachSquare(gameState.grid, function (coordinate, square) {
        square.style.backgroundColor = "";
    });
    gridForEachSquare(gameState.nextPieceGrid, function (coordinate, square) {
        square.style.backgroundColor = "";
    });
}
