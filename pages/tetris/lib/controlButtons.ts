// left
import { dropToBottom, tryMoveLaterally, tryRotate } from "./grid";
import {
    renderAboutMenu,
    renderHighScoreMenu,
    renderPauseMenu,
    renderRestartMenu
} from "./menu";
import { toggleMusicSettingAndStore } from "./music";

export function applyTetrisControlButtons() {
    // rotate clockwise
    document
        .querySelector(".tetris-controls-keys .icon-cw")
        .addEventListener("click", function() {
            tryRotate(1);
        });

    // rotate counter clockwise
    document
        .querySelector(".tetris-controls-keys .icon-ccw")
        .addEventListener("click", function() {
            tryRotate(-1);
        });

    // left
    document
        .querySelector(".tetris-controls-keys .icon-left-big")
        .addEventListener("click", function() {
            tryMoveLaterally(-1);
        });

    // right
    document
        .querySelector(".tetris-controls-keys .icon-right-big")
        .addEventListener("click", function() {
            tryMoveLaterally(1);
        });

    // drop to bottom
    document
        .querySelector(".tetris-controls-keys .icon-down-big")
        .addEventListener("click", function() {
            dropToBottom();
        });

    // pause
    document
        .querySelector(".tetris-controls-menu .icon-pause")
        .addEventListener("click", function() {
            renderPauseMenu();
        });

    // music
    document
        .querySelector(".tetris-controls-menu .icon-music")
        .addEventListener("click", function(e) {
            toggleMusicSettingAndStore();
        });

    // high score
    document
        .querySelector(".tetris-controls-menu .icon-award")
        .addEventListener("click", function() {
            renderHighScoreMenu();
        });

    // about
    document
        .querySelector(".tetris-controls-menu .icon-help-circled")
        .addEventListener("click", function() {
            renderAboutMenu();
        });

    // restart
    document
        .querySelector(".tetris-controls-menu .icon-to-end")
        .addEventListener("click", function() {
            renderRestartMenu();
        });
}
