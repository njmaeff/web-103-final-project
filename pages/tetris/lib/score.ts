import { gameState } from "./state";

export type LinesWidget = HTMLSpanElement;
export type LevelWidget = HTMLSpanElement;

export function getLineCountWidget(): LinesWidget {
    return document.querySelector("#tetris-score-lines");
}

export function getLevelCountWidget(): LevelWidget {
    return document.querySelector("#tetris-score-level");
}

export function getLineCount() {
    return parseInt(getLineCountWidget().innerText);
}

export function resetLineCount() {
    getLineCountWidget().innerText = "0";
}

export function resetLevelCount() {
    getLevelCountWidget().innerText = "0";
}

export function addToLineCount(lines: number) {
    const currentLines = getLineCount();
    getLineCountWidget().innerText = `${currentLines + lines}`;
}

export function updateLevelCount() {
    const level = getLevel();
    getLevelCountWidget().innerText = `${level}`;
}

export function getLevel() {
    return Math.floor(getLineCount() / 10);
}

// speed computation
const speedLookupTable = [
    0.01667, 0.021017, 0.026977, 0.035256, 0.04693, 0.06361, 0.0879, 0.1236,
    0.1775, 0.2598, 0.388, 0.59, 0.92, 1.46, 2.36,
];

/**
 * speed curve borrowed from https://harddrop.com/wiki/Tetris_Worlds.
 * We treat 60fps as 1 second in the computation, then multiply by 1000
 * milliseconds per second
 * @param level
 */
function speedsPerLevel(level: number) {
    let gravity = speedLookupTable[level];
    if (!gravity) {
        // we've reached the end of our table and will choose the fastest level
        gravity = speedLookupTable.slice(-1)[0]; // get last element
    }

    return (1 / (gravity * 60)) * 1000;
}

export function getSpeed() {
    return speedsPerLevel(getLevel());
}

export interface HighScore {
    name: string;
    score: number;
    date: string;
}

export function readScoresFromStorage() {
    let scores = localStorage.getItem("tetris-high-scores");
    let highScores = [];
    if (scores) {
        highScores = JSON.parse(scores);
    }
    return highScores;
}

export function saveScoresToStorage() {
    localStorage.setItem(
        "tetris-high-scores",
        JSON.stringify(gameState.highScores)
    );
}

export function saveHighScore(name: string, score: number) {
    gameState.highScores.push({
        name,
        score,
        date: new Date().toLocaleString(),
    });

    const sortedScores = gameState.highScores.sort(function (a, b) {
        return a.score <= b.score ? 1 : -1;
    });

    if (sortedScores.length > 5) {
        //only keep last 5 scores
        sortedScores.pop();
    }

    gameState.highScores = sortedScores;
    saveScoresToStorage();
}

export function isHighScore(): boolean {
    const lines = getLineCount();
    // we will only offer to save a high score if 1 or more lines are scored.
    if (lines > 0) {
        // no high scores saved yet
        if (gameState.highScores.length === 0) {
            return true;
        }

        // we check if our high score is greater than any of our saved scores
        for (const highScore of gameState.highScores) {
            if (lines > highScore.score) {
                return true;
            }
        }
    }
}
