/**
 * use html templates for modals
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template
 */
import {
    applyDefaultModalKeyBindings,
    disableAllKeyBindings,
    disableSpaceScroll,
    pause,
    resumeFromPause,
} from "./keybindings";
import { getLineCount, isHighScore, saveHighScore } from "./score";
import { runGame } from "./gameLoop";
import { gameState } from "./state";
import { applyTetrisControlButtons } from "./controlButtons";

/**
 * Retrieve the inner div of our template. All our html templates have this
 * structure.
 * @param id - the html id on the template
 */
export function getModalByTemplateByID<
    T extends HTMLDivElement = HTMLDivElement
>(id: string): T {
    const template = document.getElementById(id) as HTMLTemplateElement;
    const fragment = template.content.cloneNode(true) as DocumentFragment;
    return fragment.firstElementChild as T;
}

export function activateGameOverMenu() {
    if (isHighScore()) {
        renderSaveHighScoreMenu(getLineCount());
    } else {
        renderGameOverMenu();
    }
}

export function renderSaveHighScoreMenu(score: number) {
    const modal = getModalByTemplateByID("template-modal-save-high-score");
    const saveButton = modal.querySelector("button");
    modal.querySelector<HTMLParagraphElement>(
        "#new-high-score"
    ).innerText = `${score}`;
    const input = modal.querySelector("input");

    function onClick() {
        if (input.value) {
            saveHighScore(input.value, score);
            modal.remove();
            renderGameOverMenu();
        } else {
            alert("You must provide a name for the high score!");
        }
    }

    const menuBindings = applyDefaultModalKeyBindings({
        enter: onClick,
        escape: onClick,
    });
    saveButton.addEventListener("click", function () {
        onClick();
        menuBindings.cancel();
    });
    document.body.appendChild(modal);
    disableAllKeyBindings();

    input.focus();
}

export function renderGameOverMenu() {
    const modal = getModalByTemplateByID("template-modal-game-over");
    const playAgainButton = modal.querySelector("button");

    function onClick() {
        modal.remove();
        runGame();
    }

    const menuBindings = applyDefaultModalKeyBindings({
        enter: onClick,
        escape: onClick,
    });
    playAgainButton.addEventListener("click", function () {
        onClick();
        menuBindings.cancel();
    });

    document.body.appendChild(modal);
    disableAllKeyBindings();
    modal.focus();
}

export function renderHighScoreMenu() {
    pause();
    const modal = getModalByTemplateByID("template-modal-high-score");
    const tableBody = modal.querySelector("tbody");
    for (const highScore of gameState.highScores) {
        const tr = document.createElement("tr");

        const name = document.createElement("td");
        name.innerText = highScore.name;
        const date = document.createElement("td");
        date.innerText = highScore.date;
        const score = document.createElement("td");
        score.innerText = `${highScore.score}`;

        tr.append(name, date, score);
        tableBody.appendChild(tr);
    }

    function onClick() {
        resumeFromPause();
        modal.remove();
    }

    const menuBindings = applyDefaultModalKeyBindings({
        enter: onClick,
        escape: onClick,
    });
    modal.querySelector("button").addEventListener("click", function () {
        onClick();
        menuBindings.cancel();
    });
    document.body.appendChild(modal);
    modal.focus();
}

export function renderPauseMenu() {
    const modal = getModalByTemplateByID("template-modal-pause");
    pause();

    function onClick() {
        resumeFromPause();
        modal.remove();
    }

    const menuBindings = applyDefaultModalKeyBindings({
        enter: onClick,
        escape: onClick,
    });

    modal.querySelector("button").addEventListener("click", function () {
        onClick();
        menuBindings.cancel();
    });

    document.body.appendChild(modal);
    modal.focus();
}

export function renderAboutMenu() {
    const modal = getModalByTemplateByID("template-modal-about");
    pause();

    function onClick() {
        resumeFromPause();
        modal.remove();
    }

    const menuBindings = applyDefaultModalKeyBindings({
        enter: onClick,
        escape: onClick,
    });

    modal.querySelector("button").addEventListener("click", function () {
        onClick();
        menuBindings.cancel();
    });

    document.body.appendChild(modal);
    modal.focus();
}

export function renderRestartMenu() {
    pause();

    const modal = getModalByTemplateByID("template-modal-restart");

    function onClickYes() {
        modal.remove();
        runGame();
    }

    function onClickNo() {
        resumeFromPause();
        modal.remove();
    }

    const menuBindings = applyDefaultModalKeyBindings({
        enter: onClickYes,
        escape: onClickNo,
    });

    modal
        .querySelector("#modal-restart-no")
        .addEventListener("click", function () {
            onClickNo();
            menuBindings.cancel();
        });

    modal
        .querySelector("#modal-restart-yes")
        .addEventListener("click", function () {
            onClickYes();
            menuBindings.cancel();
        });

    document.body.appendChild(modal);
    modal.focus();
}

export function renderStartMenu() {
    const modal = getModalByTemplateByID("template-modal-start-menu");

    function onClick() {
        applyTetrisControlButtons();
        disableSpaceScroll();
        runGame();
        modal.remove();
    }

    const menuBindings = applyDefaultModalKeyBindings({
        enter: onClick,
    });

    modal.querySelector("button").addEventListener("click", function () {
        onClick();
        menuBindings.cancel();
    });

    document.body.appendChild(modal);
    modal.focus();
}
