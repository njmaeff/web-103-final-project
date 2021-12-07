import { dropToBottom, tryMoveLaterally, tryRotate } from "./grid";
import { runGameLoop, stopGameLoop } from "./gameLoop";
import { getSpeed } from "./score";
import {
    renderAboutMenu,
    renderHighScoreMenu,
    renderPauseMenu,
    renderRestartMenu,
} from "./menu";
import {
    pauseMusic,
    playMusicIfEnabled,
    toggleMusicSettingAndStore,
} from "./music";

export function disableSpaceScroll() {
    window.addEventListener("keydown", function (e) {
        if (e.key === " ") {
            e.preventDefault();
        }
    });
}

export function gamePlayBindings(e) {
    // left
    if (e.key === "j") {
        tryMoveLaterally(-1);
    }

    // right
    if (e.key === "l") {
        tryMoveLaterally(1);
    }

    // rotate clockwise
    if (e.key === "i") {
        tryRotate(1);
    }

    // rotate counter clockwise
    if (e.key === "k") {
        tryRotate(-1);
    }

    // space is drop
    if (e.key === " ") {
        dropToBottom();
    }

    // pause
    if (e.key === "p") {
        renderPauseMenu();
    }

    // music
    if (e.key === "m") {
        toggleMusicSettingAndStore();
    }

    // high score
    if (e.key === "h") {
        renderHighScoreMenu();
    }

    // about
    if (e.key === "?") {
        renderAboutMenu();
    }

    // restart
    if (e.key === "e") {
        renderRestartMenu();
    }
}

export function applyDefaultModalKeyBindings(actions: { enter?; escape? }) {
    function onKeyDown(e) {
        if (actions.enter) {
            if (e.key === "Enter") {
                // run the supplied action callback and disable the keybindings
                actions.enter();
                cancel();
            }
        }

        if (actions.escape) {
            if (e.key === "Escape" || e.key === "Esc") {
                actions.escape();
                cancel();
            }
        }
    }

    function cancel() {
        document.removeEventListener("keydown", onKeyDown);
    }

    document.addEventListener("keydown", onKeyDown);

    return {
        cancel,
    };
}

export function applyMainKeyBindings() {
    document.addEventListener("keydown", gamePlayBindings);
}

export function removeMainKeyBindings() {
    document.removeEventListener("keydown", gamePlayBindings);
}

export function resumeFromPause() {
    applyMainKeyBindings();
    playMusicIfEnabled();
    runGameLoop(getSpeed());
}

export function pause() {
    removeMainKeyBindings();
    pauseMusic();
    stopGameLoop();
}

export function disableAllKeyBindings() {
    document.removeEventListener("keydown", gamePlayBindings);
}
