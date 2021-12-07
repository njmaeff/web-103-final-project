import React from "react";
import {Page} from "./components/page";
import Styles from "./styles.scss";
import {Link} from "@njmaeff/webpack-static-site/components/link";
import {TETRIS_HEIGHT, TETRIS_WIDTH} from "./lib/constants";
import About from "./components/about.mdx";
import {controlKeys, menuKeys} from "./components/const";
import {Keys} from "./components/keys";
import {Comment} from "@njmaeff/webpack-static-site/components/comment";
import {ModalTemplate} from "./components/modal";

export const TetrisBoardWithBorder: React.FC<{
    width: number;
    height: number;
}> = ({width, height}) => {
    const blocks = [];

    for (let row = 0; row < height; row++) {
        for (let column = 0; column < width; column++) {
            if (row === 0 || row === height - 1) {
                blocks.push(
                    <div className={"tetris-border"} key={`${row},${column}`}/>
                );
            } else if (column === 0 || column === width - 1) {
                blocks.push(
                    <div className={"tetris-border"} key={`${row},${column}`}/>
                );
            } else {
                blocks.push(
                    <div className={"tetris-inner"} key={`${row},${column}`}/>
                );
            }
        }
    }

    return <>{blocks}</>;
};

export const TetrisBoard: React.FC<{ width: number; height: number }> = ({
                                                                             width,
                                                                             height
                                                                         }) => {
    const blocks = [];

    for (let row = 0; row < height; row++) {
        for (let column = 0; column < width; column++) {
            blocks.push(
                <div className={"tetris-inner"} key={`${row},${column}`}/>
            );
        }
    }

    return <>{blocks}</>;
};

export default () => {
    return (
        <Page
            title={"Tetris"}
            extraTags={[
                <Link href={Styles} type={"text/css"} rel="stylesheet"/>,
                <script type={"module"} src={'js/tetris.js'}/>,
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />,
                <Comment>Connect Google fonts</Comment>,
                <link rel="preconnect" href="https://fonts.googleapis.com"/>,
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin={"anonymous"}
                />,
                <link
                    href="https://fonts.googleapis.com/css2?family=Lobster&display=swap"
                    rel="stylesheet"
                />,
                <link
                    href="https://fonts.googleapis.com/css2?family=Lobster&family=Roboto&display=swap"
                    rel="stylesheet"
                />,
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="favicon/apple-touch-icon.png"
                />,
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="favicon/favicon-32x32.png"
                />,
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="favicon/favicon-16x16.png"
                />,
                <link rel="manifest" href="favicon/site.webmanifest"/>
            ]}
        >
            <div className="main-container">
                <div className={"tetris-layout"}>
                    <h1>Tetris</h1>
                    <div className="tetris-main-container">
                        <TetrisBoardWithBorder
                            width={TETRIS_WIDTH + 2}
                            height={TETRIS_HEIGHT + 2}
                        />
                    </div>
                    <div className={"tetris-controls-keys"}>
                        {controlKeys.map(([className, _, label]) => (
                            <button className={className} aria-label={label}/>
                        ))}
                    </div>
                </div>

                <div>
                    <h2>Next</h2>
                    <div className={"tetris-next-piece-container"}>
                        <TetrisBoard width={4} height={4}/>
                    </div>
                    <h2>
                        Lines: <span id={"tetris-score-lines"}>0</span>
                    </h2>
                    <h2>
                        Level: <span id={"tetris-score-level"}>0</span>
                    </h2>
                    <div className={"tetris-controls-menu"}>
                        {menuKeys.map(([className, _, label]) => (
                            <button className={className} aria-label={label}/>
                        ))}
                    </div>
                </div>
            </div>

            <ModalTemplate id={"template-modal-game-over"}>
                <h2>Game Over</h2>
                <button>Play Again</button>
            </ModalTemplate>

            <ModalTemplate id={"template-modal-pause"}>
                <h2>Paused</h2>
                <button>Resume</button>
            </ModalTemplate>

            <ModalTemplate id={"template-modal-restart"}>
                <h2>Restart</h2>
                <p>Are you sure you want to restart?</p>
                <div className={"layout-horizontal"}>
                    <button id={"modal-restart-no"}>No</button>
                    <button id={"modal-restart-yes"}>Yes</button>
                </div>
            </ModalTemplate>

            <ModalTemplate
                id={"template-modal-about"}
                className={"modal modal-about"}
            >
                <div>
                    <About/>
                </div>
                <button>Close</button>
            </ModalTemplate>

            <ModalTemplate id={"template-modal-high-score"}>
                <h2>Top 5 Scores</h2>
                <table className="styled-table">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Lines</th>
                    </tr>
                    </thead>
                    <tbody/>
                </table>
                <button>Close</button>
            </ModalTemplate>

            <ModalTemplate id={"template-modal-save-high-score"}>
                <h2>New High Score</h2>
                <p>
                    Line Count: <span id={"new-high-score"}/>
                </p>
                <input type="text" placeholder={"Name"}/>
                <button>Save</button>
            </ModalTemplate>

            <ModalTemplate id={"template-modal-start-menu"}>
                <h2>Welcome to Tetris!</h2>
                <Keys/>
                <button>Play</button>
            </ModalTemplate>
        </Page>
    );
};
