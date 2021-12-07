import { gameState, setGameState } from "./state";

export function loadMusic() {
    const music = new Audio("assets/song.ogg");
    music.loop = true;
    return music;
}

export function getMusicSettingFromStorage() {
    return JSON.parse(localStorage.getItem("tetris-is-music-on"));
}

export function toggleMusicSettingAndStore() {
    // we will negate what is stored (so toggle on / off)
    const updateMusicOn = !gameState.musicOn;
    localStorage.setItem("tetris-is-music-on", JSON.stringify(updateMusicOn));
    setGameState({
        musicOn: updateMusicOn,
    });
    if (updateMusicOn) {
        playMusicIfEnabled();
    } else {
        pauseMusic();
    }
}

export function pauseMusic() {
    gameState.music.pause();
}

export function playMusicIfEnabled() {
    if (gameState.musicOn) {
        gameState.music.play();
    }
}
